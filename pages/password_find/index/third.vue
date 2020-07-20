<template>
  <div>
    <Steps :steps-active="2" />

    <div class="third-form-content">
      <div class="text">
        <h1>恭喜！密码找回成功</h1>
        <p>
          <span>{{ time }}</span>秒跳回首页
        </p>
      </div>
      <div class="form-submit">
        <el-button type="primary" @click="handleLogin">完成</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Steps from '@/components/password_find/steps'

export default {
  name: 'PasswordFindSecond',
  components: {
    Steps
  },
  data () {
    return {
      time: 5,
      timeer: null
    }
  },
  created () {
    this.timeer = setInterval(() => {
      if (this.time === 0) {
        clearInterval(this.timeer)
        this.handleLogin()
      }
      this.time -= 1
    }, 1000)
  },
  destroyed () {
    this.timeer = null
  },
  methods: {
    handleLogin () {
      this.$router.replace('/')
    }
  }
}
</script>

<style lang="scss" scoped>
$color: #1c223a;
$bg-color: #f3f4f8;

.third-form-content {
  padding: 100px 127px;

  .text {
    text-align: center;

    h1 {
      font-size: 40px;
      color: $color;
      font-weight: normal;
      margin-bottom: 40px;
    }

    p {
      font-size: 20px;
      color: $color;

      span {
        margin-right: 30px;
        display: inline-block;
      }
    }
  }

  .form-submit {
    padding: 100px 70px 0;

    button {
      width: 100%;
      border-radius: 0;
      background-color: #1ca7ec;
      border-color: #1ca7ec;
    }
  }
}
</style>
