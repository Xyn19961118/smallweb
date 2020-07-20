import Vue from 'vue'
import LoginComponent from "~/components/common/login";
const Login = {
  install: function (Vue) {
    Vue.component('Login', LoginComponent)
  }
}
Vue.use(Login)
