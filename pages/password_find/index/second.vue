<template>
  <div>
    <Steps :steps-active="1" />

    <div class="find-form-content">
      <div v-if="passGrade !== -1" class="tip">
        <div class="tip-p">
          <p v-for="(item, index) in ['低', '中', ' ']" :key="index">
            <template v-if="passGrade >= 3 && index === 2">高</template>
            <template v-else>
              <template v-if="passGrade === index">{{ item }}</template>
            </template>
          </p>
        </div>
        <div class="input-tip">
          <div class="input-tip-item" :style="inputGrade" />
        </div>
      </div>
      <el-form ref="formRules" :rules="formRules" :model="form" label-width="100px">
        <el-form-item label="设置新密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            maxlength="16"
            @input="handleInput"
            @paste.native.capture.prevent="handlePaste"
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="conPassword">
          <el-input
            v-model="form.conPassword"
            type="password"
            placeholder="再次确认密码"
            maxlength="16"
            @paste.native.capture.prevent="handlePaste"
          />
        </el-form-item>
      </el-form>
      <div class="form-submit">
        <el-button type="primary" @click="handleNext">确认，下一步</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Steps from '@/components/password_find/steps'
import { forgetSecSub } from '~/api/login'

export default {
  name: 'PasswordFindSecond',
  components: {
    Steps
  },
  data () {
    return {
      form: {
        password: '',
        conPassword: ''
      },
      passGrade: -1,
      formRules: {
        password: [
          { required: true, trigger: 'blur', message: '密码不能为空!' }
        ],
        conPassword: [
          { required: true, trigger: 'blur', message: '确认密码不能为空!' }
        ]
      }
    }
  },
  watch: {
    passGrade () {
      const tempValue = this.passGrade + 1 <= 3 ? this.passGrade + 1 : 3
      this.inputGrade = { width: `${tempValue * 33.3}%` }
    }
  },
  methods: {
    handleInput () {
      const { password } = this.form
      this.passGrade = Math.floor(password.length / 10)
    },
    handleNext () {
      const { password, conPassword } = this.form

      // 下一步
      this.$refs.formRules.validate((valid) => {
        if (valid) {
          forgetSecSub({ password, repassword: conPassword }).then((res) => {
            if (res.status == 2000) {
              this.$message.success(res.msg)
              this.$router.push('/password_find/third')
            } else {
              this.$message.error(res.msg)
            }
          })
          //
        } else {
          this.$message.error('请填写完整内容')
          return false
        }
      })
    },
    handlePaste () {
      // 粘贴会触发这里
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
    // background: url("~@/static/images/login-del.png") no-repeat;
  }
}
</style>

<style lang="scss" scoped>
$color: #1ca7ec;
$bg-color: #f3f4f8;

.find-form-content {
  padding: 100px 127px;
  position: relative;

  // 输入框输入提示
  .tip {
    position: absolute;
    top: 55px;
    width: 100%;
    padding: 0 254px 0 100px;

    .tip-p {
      height: 30px;
      overflow: hidden;

      p {
        float: left;
        width: 33.3%;
        font-size: 16px;
        color: #666;
        text-align: center;
        padding-bottom: 11px;
      }
    }
  }
  .input-tip {
    background-color: rgba(236, 0, 4, 0.1);
    height: 5px;
    border-radius: 2px;

    &-item {
      width: 33.3%;
      height: 5px;
      background-color: rgba(236, 0, 4, 0.56);
      border-radius: 2px;
    }
  }

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
