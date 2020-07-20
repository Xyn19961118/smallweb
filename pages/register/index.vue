<template>
  <div>
    <Header />

    <div class="content">
      <div class="wrap">
        <el-form ref="ruleForm" :model="form" :rules="rules" label-width="150px">
          <div class="title">快速注册</div>
          <el-form-item label="上传营业执照">
            <el-upload :action="$store.state.codeImgUrl + '/qiniu/upimage'"
              name="image"
              :on-success="handleUpload"
              :on-change="handleChange"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :before-upload="beforeAvatarUpload"
              :class="{ hide: hideUpload }"
              :file-list="avatorList"
            >
              <div class="add">
                <img src="@/static/images/upload.png" alt="上传图片" />
                <span class="add-text">上传</span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogImg" append-to-body>
              <img width="100%" :src="form.avator" alt />
            </el-dialog>
            <div class="radio">
              <!-- <span @click="form.business = '0'">
                <img v-if="form.business === '0'" src="@/static/images/yes.png" alt="我是个人" />
                <img v-else src="@/static/images/no.png" alt="我是个人" />
                我是个人
              </span>-->
              <span @click="form.business = '1'">
                <img v-if="form.business === '1'" src="@/static/images/yes.png" alt="我是卖家" />
                <img v-else src="@/static/images/no.png" alt="我是卖家" />
                我是卖家
              </span>
              <span @click="form.business = '2'">
                <img v-if="form.business === '2'" src="@/static/images/yes.png" alt="我是买家" />
                <img v-else src="@/static/images/no.png" alt="我是买家" />
                我是买家
              </span>
            </div>
          </el-form-item>
          <el-form-item prop="nickname" label="真实姓名">
            <el-input v-model="form.nickname" placeholder="请输入您的真实姓名" />
          </el-form-item>
          <el-form-item prop="company" label="公司名称">
            <el-input v-model="form.company" placeholder="请输入公司名称" />
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
            <el-input v-model="form.email" placeholder="请输入邮箱" />
          </el-form-item>
          <el-form-item prop="mobile" label="手机号">
            <el-input v-model="form.mobile" placeholder="请输入手机号" />
          </el-form-item>
          <el-form-item prop="captcha" label="图片验证码">
            <el-input v-model="form.captcha" placeholder="请输入图片验证码">
              <template slot="append">
                <div class="imgcode-wrap">
                  <img :src="imgCode" alt @click="changeImgCode" />
                  <span @click="changeImgCode">换一张</span>
                </div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="mobile_captcha" label="短信验证码">
            <el-input v-model="form.mobile_captcha" placeholder="请输入短信动态码" maxlength="8" />
            <div class="send-code" :class="{'readonly': codeText !== '获取动态码'}" @click="handleSend">
              <span>{{ codeText }}</span>
            </div>
          </el-form-item>
          <el-form-item prop="password" label="登录密码">
            <el-input v-model="form.password" type="password" placeholder="请输入登录密码" />
          </el-form-item>
          <el-form-item prop="repassword" label="确认密码">
            <el-input v-model="form.repassword" type="password" placeholder="请确认密码" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit">确定</el-button>
            <div class="tip" @click="isSelected = !isSelected">
              <img v-if="!isSelected" src="@/static/images/no.png" alt />
              <img v-else src="@/static/images/agree.png" alt />
              我已同意并阅读
              <a href="#">《象圈Showguide用户注册协议》</a>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Header from '~/components/common/header'
import Footer from '~/components/common/footer'
import {
  register,
  sendCode
} from '@/api/login'

export default {
  name: 'Register',
  components: {
    Header,
    Footer
  },
  data () {
    const checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        const reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
    return {
      codeStatus: true, // 是否可以发送验证码
      codeText: '获取动态码',
      isSelected: false,
      // imgCode: "http://intranetsexpo.com/api/codeverification",

      imgCode: this.$store.state.codeImgUrl + 'index/user/code',

      form: {
        avator: '',
        business: '1',
        nickname: '',
        company: '',
        email: '',
        mobile: '',
        captcha: '',
        mobile_captcha: '',
        password: '',
        repassword: ''
      },
      rules: {
        nickname: [
          { required: true, message: '请输入您的真实姓名', trigger: 'blur' }
        ],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        mobile: [{ required: true, validator: checkPhone, trigger: 'blur' }],
        mobile_captcha: [
          { required: true, message: '请输入短信动态码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        repassword: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ]
      },
      // 上传图片
      dialogImageUrl: '',
      dialogImg: false,
      hideUpload: false,
      limitCount: 1,
      avatorShow: []
    }
  },
  computed: {
    avatorList () {
      return this.avatorShow
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
    // 移除文件
    handleRemove (file, fileList) {
      this.hideUpload = fileList.length >= this.limitCount
    },
    // 文件状态改变
    handleChange (file, fileList) {
      this.hideUpload = fileList.length >= this.limitCount
    },
    // 点击文件列表中已上传的文件
    handlePictureCardPreview (file, fileList) {
      this.dialogImageUrl = file.url
      this.dialogImg = true
    },
    // 文件上传之前调用做一些拦截限制
    beforeAvatarUpload (file) {
      const isJPG = true
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 上传成功
    handleUpload (res, file) {
      this.form.avator = res.data
    },
    changeImgCode () {
      // 更换图片验证码

      const num = Math.ceil(Math.random() * 10) // 生成一个随机数（防止缓存）
      this.imgCode = this.$store.state.codeImgUrl + 'index/user/code?random=' + num
    },
    // 发送验证码
    async handleSend () {
      const myreg = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/
      const { mobile, captcha } = this.form
      if (!myreg.test(mobile)) {
        this.$message.warning('请输入正确的手机号')
        return false
      }
      if (!captcha) {
        this.$message.warning('请输入图片验证码')
        return false
      }
      if (!this.codeStatus) { return false }
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
      const moule = await sendCode(this.form)
      if (moule.status != 2000) {
        this.$message.warning(moule.msg)
        return false
      }
      this.$message.success(moule.msg)
    },
    // 提交
    handleSubmit () {
      const { isSelected } = this
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) {
          return false
        }
        if (!isSelected) {
          this.$message.warning('请同意用户注册协议')
          return false
        }
        const moule = await register(this.form)
        if (moule.status != 2000) {
          this.$message.warning(moule.msg)
          return false
        }

        this.setToken(moule.data)
        // sessionStorage.setItem('token', moule.data.token)
        // sessionStorage.setItem('nickname', moule.data.nickname)
        // sessionStorage.setItem('business', moule.data.business)
        this.$message.success(moule.msg)
        this.$router.push('/')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$color: #1ca7ec;
$red-color: #1ca7ec;

.content {
  background: url("../../static/images/register.png") no-repeat;
  background-size: 1920px 1027px;
  padding: 66px 0;
  height: 1027px;

  /deep/ .el-form {
    width: 570px;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    margin: 0 0 0 auto;

    .el-form-item__error {
      font-size: 14px;
      color: #1ca7ec;
      line-height: 16px;

      &::before {
        content: "";
        width: 16px;
        height: 16px;
        display: inline-block;
        background-size: 16px 16px;
        background: url("../../static/images/warn.png") no-repeat;
        vertical-align: middle;
        position: relative;
        top: -2px;
      }
    }

    .title {
      font-size: 18px;
      color: $color;
      font-weight: bold;
      line-height: 70px;
      text-align: center;
      background-color: #f8f8f8;
      margin-bottom: 50px;
    }

    .el-form-item {
      padding-right: 50px;
      position: relative;

      .el-input {
        input {
          border: 0;
          border-radius: 0;
          background-color: #f3f4f8;
        }
      }

      // 发送验证码
      .send-code {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1;
        width: 94px;
        text-align: center;
        cursor: pointer;
        background-color: #f3f4f8;

        span {
          color: #1ca7ec;
          display: block;
          line-height: 24px;
          margin: 8px 0;
          border-left: 1px solid #d5d5d5;

          &.readonly {
            color: #999;
          }
        }
      }

      .el-upload-list--picture-card .el-upload-list__item {
        width: 100px;
        height: 100px;
      }

      .el-upload--picture-card {
        width: 100px;
        height: 100px;
        border: 0;
        background-color: #f3f4f8;
        position: relative;

        .add {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          line-height: 1;

          img {
            width: 20px;
            height: 20px;
            margin: 0 auto 10px;
          }

          &-text {
            font-size: 14px;
            color: #999;
            line-height: 1;
          }
        }
      }

      .radio {
        line-height: 1;
        padding-top: 20px;

        span {
          margin-right: 30px;
          display: inline-block;
          line-height: 18px;
          cursor: pointer;
        }

        img {
          width: 18px;
          display: inline-block;
          vertical-align: middle;
          margin-right: 10px;
        }
      }

      .hide {
        height: 100px;
        /deep/ .el-upload--picture-card {
          display: none;
        }
      }

      .el-button {
        width: 100%;
        background-color: $color;
        border-color: $color;
        border-radius: 0;
      }

      .tip {
        color: #999fb1;
        line-height: 1;
        margin: 23px 0 20px;
        cursor: pointer;

        img {
          width: 14px;
          height: 14px;
          display: inline-block;
          margin-right: 4px;
          vertical-align: middle;
        }

        a {
          color: $red-color;
        }
      }
    }
  }

  /deep/ .el-input-group__append {
    background: #fff;
    padding: 0 !important;
    border: none;
  }

  .imgcode-wrap {
    display: flex;
    img {
      width: 94px;
      height: 40px;
      margin-left: 20px;
    }
    span {
      color: #333;
      margin-left: 20px;
      display: block;
      line-height: 40px;
      cursor: pointer;
      user-select: none;
      -webkit-user-select: none;
    }
  }
}
</style>
