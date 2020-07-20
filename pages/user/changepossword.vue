<template>
  <div class="email">
    <div class="email-title">修改密码</div>
    <div class="email-items">
      <div class="email-item">
        <div class="email-label">当前登录密码<i>*</i></div>
        <div class="email-right">
          <input
            class="email-input"
            type="password"
            v-model="oldPassword"
            @blur="getPassword"
            maxlength="16"
          />
        </div>
      </div>

      <div class="email-item">
        <div class="email-label">新登录密码<i>*</i></div>
        <div class="email-right">
          <input
            class="email-input"
            type="password"
            v-model="newPasswordFirst"
            @blur="getPassword"
            maxlength="16"
          />
        </div>
      </div>

      <div class="email-item">
        <div class="email-label">确认新登录密码<i>*</i></div>
        <div class="email-right">
          <input
            class="email-input"
            type="password"
            v-model="newPasswordSecond"
            @blur="getPassword"
            maxlength="16"
          />
        </div>
      </div>
    </div>
    <div class="email-submit" @click="passwordSubmit">确定并修改</div>
  </div>
</template>

<script>
import { changePassword } from "~/api/user";
export default {
  name: "changepossword",
  data() {
    return {
      oldPassword: "",
      newPasswordFirst: "",
      newPasswordSecond: ""
    };
  },
  methods: {
    //确定修改
    async passwordSubmit() {
      let { oldPassword, newPasswordFirst, newPasswordSecond } = this;

      if (
        oldPassword == "" ||
        newPasswordFirst == "" ||
        newPasswordSecond == ""
      ) {
        //某项密码为空
        this.$message.error("密码不能为空");
        return false;
      } else {
        //判断两次密码输入是否一致
        if (
          newPasswordFirst.length >= 6 &&
          newPasswordSecond.length >= 6 &&
          newPasswordFirst == newPasswordSecond
        ) {
          //执行修改请求
          // this.$message.success("修改成功");
          let params = {
            ipwd: oldPassword,
            password: newPasswordFirst,
            password_ok: newPasswordSecond
          }
          let data = await changePassword(params);
          if(data.status=="200") {
            this.$message.success(data.mag);
          }else{
            this.$message.error(data.mag);
          }

        } else {
          this.$message.error("两次密码输入不一致");
          return false;
        }
      }
    },
    getPassword() {
      console.log("aa");
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
    color: #EB0004;
  }
}
.email-input {
  width: 290px;
  height: 35px;
  padding: 0 10px;
  margin-left: 10px;
  outline: none;
  // border: #d1d1d1 1px solid;
  border: none;
  background: #F3F3F7;
}
.email-submit {
  width: 200px;
  height: 40px;
  background: #5B7FA3;
  color: #fff;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  margin-left: 130px;
  cursor: pointer;
}
</style>
