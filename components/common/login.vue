<template>
  <div>
    <div v-show="showLoginMask" class="mask" @click="handdleLogin" />
    <transition name="bounce">
      <div v-show="showLoginMask" class="login-wrap">
        <div class="login-close" @click="handdleLogin">
          <!-- <i class="el-icon-circle-close" /> -->
          <img src="~static/images/login-close.png" alt />
        </div>
        <div class="login-nav">
          <div class="login-nav-it" :class="current ? '' : 'active'" @click="changeTab(0)">买家登录</div>
          <div class="login-nav-it" :class="current ? 'active' : ''" @click="changeTab(1)">卖家登录</div>
        </div>
        <div class="login-content">
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="ruleForm">
            <div class="login-item">
              <div class="login-item-cont">
                <el-form-item prop="mobile">
                  <el-input v-model="ruleForm.mobile" placeholder="请输入手机号">
                    <div slot="prefix" class="login-icon">
                      <img src="~static/images/login-icon01.png" alt />
                    </div>
                  </el-input>
                </el-form-item>
              </div>
            </div>
            <div class="login-item">
              <div class="login-item-cont">
                <el-form-item prop="password">
                  <el-input v-model="ruleForm.password" placeholder="请输入密码" show-password>
                    <div slot="prefix" class="login-icon">
                      <img src="~static/images/login-icon02.png" alt />
                    </div>
                  </el-input>
                </el-form-item>
              </div>
            </div>
            <div class="login-item verification">
              <div class="login-item-cont">
                <el-form-item prop="captcha">
                  <el-input v-model="ruleForm.captcha" placeholder="请输入验证码" @keyup.enter.native="submitForm('ruleForm')">
                    <div slot="prefix" class="login-icon">
                      <img src="~static/images/login-icon03.png" alt />
                    </div>
                  </el-input>
                </el-form-item>
              </div>
              <div class="verification-pic">
                <img class="verification-img" :src="imgCode" alt @click="changeImgCode" />
              </div>
              <div class="verification-btn" @click="changeImgCode">换一换</div>
            </div>
            <el-button class="login-submit" @click="submitForm('ruleForm')">登录</el-button>
            <!-- <button type="button" class="login-submit">登录</button> -->
            <div class="login-oth">
              <nuxt-link to="/password_find" class="login-forget">忘记密码？</nuxt-link>
              <nuxt-link to="/register" class="login-re">免费注册></nuxt-link>
            </div>
          </el-form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import { login } from '@/api/login'

export default {
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
      current: 0, // 0为买家登录，1为卖家登陆
      // isLogin: false,

      imgCode: this.$store.state.codeImgUrl + 'index/user/code',
      ruleForm: {
        mobile: '',
        password: '',
        captcha: ''
      },
      rules: {
        mobile: [{ required: true, validator: checkPhone, trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'showLoginMask'
    ])
  },
  // watch: {
  //   isLogin () {
  //     this.$router.go(0)
  //   }
  // },
  methods: {
    ...mapMutations([
      'setToken',
      'changeLoginMask'
    ]),
    changeTab (index) {
      this.current = index
    },
    // 隐藏登录
    handdleLogin () {
      this.changeLoginMask()
    },
    changeImgCode () {
      // 更换图片验证码

      const num = Math.ceil(Math.random() * 10) // 生成一个随机数（防止缓存）
      this.imgCode =
        this.$store.state.codeImgUrl + 'index/user/code?random=' + num
    },

    // 点击提交
    submitForm (formName) {
      const { current } = this
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let business = '1'
          if (current) {
            // 卖家登陆
            business = '1'
          } else {
            // 买家登陆
            business = '2'
          }
          this.ruleForm.business = business
          const moule = await login(this.ruleForm)
          if (moule.status != 2000) {
            this.$message.warning(moule.msg)
            return false
          }

          this.$message.success(moule.msg)
          this.setToken(moule.data)
          this.changeLoginMask()
          // this.$emit('handdleLogin')
          // this.isLogin = true
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.mask {
  width: 100%;
  position: fixed;
  height: 100%;
  background: rgba(0, 0, 0, 0.56);
  left: 0;
  top: 0;
  z-index: 998;
}
.login-wrap {
  width: 500px;
  height: 476px;
  background: #f8f8f8;
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 999;
  // transform: translate(-50%, -50%);
  margin-left: -250px;
  margin-top: -238px;
  .login-nav {
    width: 100%;
    height: 70px;
    background: #f8f8f8;
    display: flex;
    border-bottom: #eee 1px solid;
    .login-nav-it {
      width: 50%;
      height: 70px;
      text-align: center;
      line-height: 70px;
      position: relative;
      font-size: 18px;
      color: #333;
      cursor: pointer;
      &.active {
        color: #1ca7ec;
        font-weight: bold;
      }
      &:first-child::after {
        content: "";
        width: 1px;
        height: 36px;
        background: #e5e5e5;
        display: block;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -18px;
      }
    }
  }
  .login-content {
    padding: 40px 65px;
    background: #fff;
    .login-item {
      margin-bottom: 20px;
      width: 370px;
      height: 35px;
      &.verification {
        width: 370px;
        height: 35px;
        display: flex;
        .login-item-cont {
          width: 180px;
        }
        .verification-pic {
          width: 100px;
          height: 35px;
          margin-left: 20px;
          .verification-img {
            width: 100px;
            height: 35px;
          }
        }
        .verification-btn {
          margin-left: auto;
          line-height: 35px;
          cursor: pointer;
          color: #333;
          -moz-user-select: none; /*火狐*/
          -webkit-user-select: none; /*webkit浏览器*/
          -ms-user-select: none; /*IE10*/
          -khtml-user-select: none; /*早期浏览器*/
          user-select: none;
        }
      }
      .login-item-cont {
        width: 370px;
        height: 35px;
        background: #f3f4f8;
        .login-icon {
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    .login-submit {
      width: 100%;
      height: 40px;
      background: #1ca7ec;
      color: #fff;
      border: none;
      outline: none;
      cursor: pointer;
      margin-top: 20px;
    }
    .login-oth {
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      .login-forget {
        color: #999;
      }
      .login-re {
        color: #ec0004;
      }
    }
  }
}

.login-close {
  position: absolute;
  right: -32px;
  top: -32px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 32px;
  cursor: pointer;

  img {
    width: 24px;
  }
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>

<style lang="scss">
.login-content {
  .el-form-item__content {
    line-height: 35px;
  }
  .el-input__inner {
    border: none;
    background: none;
    height: 35px;
    line-height: 35px;
  }
  .el-input--prefix .el-input__inner {
    padding-left: 40px;
  }
  .el-form-item__error {
    color: #ec0004;
  }
}
</style>
