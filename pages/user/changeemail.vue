<template>
  <div class="email">
    <div class="email-title">重置邮箱</div>
    <div class="email-items">
      <div class="email-item">
        <div class="email-label">
          新邮箱地址
          <i>*</i>
        </div>
        <div class="email-right">
          <input
            class="email-input"
            type="email"
            placeholder
            v-model="emailFirst"
            @blur="getEmail(0)"
          />
        </div>
      </div>
      <div class="email-item">
        <div class="email-label">
          确认新邮箱地址
          <i>*</i>
        </div>
        <div class="email-right">
          <input
            class="email-input"
            type="email"
            placeholder
            v-model="emailSecond"
            @blur="getEmail(1)"
          />
        </div>
      </div>
    </div>
    <div class="email-submit" @click="changeEmail">确定并修改</div>
  </div>
</template>

<script>
import { changeEmail } from "~/api/user";
export default {
  name: "changeemail",
  components: {},
  data() {
    return {
      emailFirst: "", //第一次填入
      emailSecond: "", //第二次填入
      isTypeTrue: false //判断邮箱格式是否正确
    };
  },
  created() {},
  mounted() {},
  methods: {
    //验证邮箱格式
    getEmail(index) {
      let value = index ? this.emailSecond : this.emailFirst;

      // let value = e.target.value;

      let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;

      if (!reg.test(value)) {
        this.$message.error("请输入正确的邮箱格式");
        this.isTypeTrue = false;
        return false;
      } else {
        this.isTypeTrue = true;
      }
    },
    //确定修改
    async changeEmail() {
      let { emailFirst, emailSecond, isTypeTrue } = this;
      if (emailFirst == "" || emailSecond == "") {
        this.$message.error("请填写新邮箱");
        return false;
      }
      if (isTypeTrue) {
        if (emailFirst !== emailSecond) {
          //两次输入不一致
          this.$message.error("两次邮箱输入不一致");
          return false;
        } else {
          //输入一致,提交
          let params = {
            email: emailFirst,
            email_ok: emailSecond
          };
          let data = await changeEmail(params);
          if(data.status == "200"){
            this.$message.success(data.mag);
          }else{
            this.$message.error(data.mag);
          }

        }
      } else {
        //邮箱格式错误,阻止提交
        this.$message.error("请输入正确的邮箱格式");
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.email {
  padding: 40px;
  background: #fff;
  height: 510px;
}
.email .email-title {
  font-size: 20px;
  color: #222;
  font-weight: bold;
}

.email-items {
  margin-top: 20px;
}
.email-items .email-item {
  margin-bottom: 20px;
  height: 30px;
  display: flex;
  align-items: center;
}
.email-item .email-label {
  width: 120px;
  line-height: 30px;
  font-size: 14px;
  color: #999;
  text-align: right;
  i {
    color: #eb0004;
  }
}
.email-input {
  width: 290px;
  height: 35px;
  padding: 0 10px;
  outline: none;
  border: none;
  background: #f3f3f7;
  margin-left: 10px;
}
.email-submit {
  width: 200px;
  height: 40px;
  background: #5b7fa3;
  color: #fff;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  margin-left: 130px;
  cursor: pointer;
}
</style>
