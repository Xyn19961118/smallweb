<template>
  <div>
    <Steps :steps-active="0" />

    <div class="find-form-content">
      <el-form ref="formRules" :rules="formRules" :model="form" label-width="100px">
        <el-form-item label="注册手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" maxlength="11" />
        </el-form-item>
        <el-form-item label="验证码" prop="checkout">
          <div class="item-left">
            <el-input v-model="form.checkout" placeholder="请输入验证码" maxlength="8" />
          </div>
          <div class="item-checkout" @click="changeImgCode">
            <img :src="imgCode" alt="验证码" />
          </div>
          <div class="item-span" @click="changeImgCode">
            <span>换一张</span>
          </div>
        </el-form-item>
        <el-form-item label="短信验证码" prop="code">
          <el-input v-model="form.code" placeholder="请输入短信验证码" maxlength="8" />
          <div class="send-code" :class="{'readonly': codeText !== '获取动态码'}" @click="handleSend">
            <span>{{ codeText }}</span>
          </div>
        </el-form-item>
      </el-form>
      <div class="form-submit">
        <el-button type="primary" @click="handleNext">确认，下一步</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Steps from '@/components/password_find/steps'
import { forgetSendCode, forgetOneSub } from '~/api/login'
export default {
  name: 'PasswordFindFirst',
  components: {
    Steps
  },
  data () {
    const myreg = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/
    const validatePhone = (rule, value, callback) => {
      if (!myreg.test(value)) {
        callback(new Error('手机号格式不正确'))
      } else {
        callback()
      }
    }
    return {
      form: {
        phone: '',
        checkout: '',
        code: ''
      },
      imgCode: this.$store.state.codeImgUrl + 'index/user/code',
      codeText: '获取动态码',
      codeStatus: true, // 是否可以发送验证码
      formRules: {
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        checkout: [
          { required: true, trigger: 'blur', message: '验证码不能为空!' }
        ],
        code: [{ required: true, trigger: 'blur', message: '动态码不能为空!' }]
      }
    }
  },
  created() {
    this.changeLoginMask(false)
  },
  methods: {
    ...mapMutations([
      'setToken',
      'changeLoginMask'
    ]),
    async handleSend () {
      // 发送验证码
      const myreg = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/
      const { phone, checkout } = this.form
      if (!myreg.test(phone)) {
        this.$message.warning('请输入正确的手机号')
        return false
      }
      if (checkout == '') {
        this.$message.warning('请输入图片验证码')
        return false
      }

      if (!this.codeStatus) { return false }
      const data = await forgetSendCode({ mobile: phone, captcha: checkout })
      if (data.status == 2000) {
        this.$message.success(data.msg)
      } else {
        this.$message.error(data.msg)
        this.codeStatus = false
      }
      this.codeStatus = false
      let time = 61
      const timeSet = setInterval(() => {
        const timeer = --time
        this.codeText = `${timeer}s后重发`
        if (time === 0) {
          clearInterval(timeSet)
          this.codeText = '获取动态码'
          this.codeStatus = true
        }
      }, 1000)
    },
    changeImgCode () {
      // 更换验证码
      const num = Math.ceil(Math.random() * 10) // 生成一个随机数（防止缓存）
      this.imgCode = this.$store.state.codeImgUrl + 'index/user/code?id=' + num
    },
    handleNext () {
      this.$refs.formRules.validate((valid) => {
        if (valid) {
          const { phone, code } = this.form
          forgetOneSub({ mobile: phone, code }).then((res) => {
            if (res.status == 2000) {
              this.$router.push('/password_find/second')
              this.setToken(res.data)
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          console.log('error submit!!')
          this.$message.error('请填写完整')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
$color: #1ca7ec;
$bg-color: #f3f4f8;

// 清除elementui默认样式
.find-form-content {
  input {
    background-color: $bg-color;
    border: 0;
    border-radius: 0;
  }

  .el-form-item {
    margin-bottom: 40px;

    .el-form-item__content {
      display: flex;
      justify-content: space-between;

      &::before,
      &::after {
        content: none;
      }

      .item- {
        &left {
          width: 260px;
        }

        &checkout {
          width: 128px;
          height: 40px;
          cursor: pointer;

          img {
            width: 100%;
            height: 100%;
          }
        }

        &span {
          cursor: pointer;
        }
      }
    }
  }

  .el-form-item__error {
    color: $color;
    padding-left: 20px;

    &::before {
      content: "";
      position: absolute;
      top: 3px;
      left: 0;
      background-size: 14px;
      width: 14px;
      height: 14px;
    }
  }
  // background: url("~@/static/images/login-del.png") no-repeat;
}
</style>

<style lang="scss" scoped>
$color: #1ca7ec;
$bg-color: #f3f4f8;

.find-form-content {
  padding: 60px 127px;

  .send-code {
    color: #e91c35;
    width: 130px;
    background-color: $bg-color;
    float: right;

    &.readonly {
      color: #999;
    }

    span {
      display: inline-block;
      line-height: 25px;
      border-left: 1px solid #d5d5d5;
      padding: 0 12px;
      cursor: pointer;
    }
  }

  .form-submit {
    padding-top: 15px;
    padding-left: 100px;

    button {
      width: 100%;
      border-radius: 0;
      background-color: #1ca7ec;
      border-color: #1ca7ec;
    }
  }
}
</style>
