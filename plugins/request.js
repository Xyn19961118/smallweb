import qs from 'qs'
import axios from 'axios'

import {
  GET_TOKEN
} from '@/plugins/auth'

// eslint-disable-next-line no-unused-vars
// const baseURI = 'http://uat.small.tianyuyezi.com/'
const baseURI = 'http://uat.health.olshow.cn/'
// const baseURI = 'http://app.health.olshow.cn/'
// const baseURI = 'http://zb.data.itifexpo.com/'


// console.log(process.env.NODE_ENV)
// if (process.env.NODE_ENV === 'development') {
//   // 开发环境
//   baseURI = ''
// } else{
//   // 生产环境
//   baseURI = ''
// }

const request = axios.create({
  // 自定义的请求头
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  // },
  // 超时设置
  timeout: 10000,
  // 是否是可信任(表示跨域请求时是否需要使用凭证)
  withCredentials: true,
  crossDomain: true

})

request.defaults.headers.post['Content-Type'] = 'text/plain;charset=UTF-8'

// POST 传参序列化
request.interceptors.request.use(
  (config) => {
    config.baseURL = baseURI

    const token = GET_TOKEN()

    if (token) {
      config.headers = {
        userToken: token
      }
      // config.headers["userToken"] = token
    }
    if (config.method === 'post') {
      config.data = qs.parse(config.data)
    }
    if (config.method === 'get') {
      config.params = Object.assign({}, config.params)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// 返回状态判断
request.interceptors.response.use(
  (res) => {
    // 返回这里，根据你自己的情况进行调整
    // if(res.data.msg == "尚未登录") {

    // }
    return res.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default request
