import {
  GET_TOKEN,
  SET_TOKEN,
  REMOVE_TOKEN
} from "~/plugins/auth";

export const state = () => {
  return {
    linkCurrent: 0,
    showLoginMask: false, // 是否显示登录遮罩层
    userToken: GET_TOKEN(), // token
    isShowLogin: Boolean(GET_TOKEN()), // 判断是否登陆过
    business: '', // 用户身份
    nickname: '', // 用户昵称
    headFooter: {},
    // imgUrl: 'http://live.file.olshow.cn',
    imgUrl: 'http://app.antiepidemic.file.itifexpo.com',
    // codeImgUrl: 'http://app.health.olshow.cn/',
    codeImgUrl: 'http://uat.health.olshow.cn/',
  }
}

export const mutations = {
  changeheadFooter(state, parms) {
    state.headFooter = parms;
  },
  // 设置token
  setToken(state, parms) {
    state.userToken = parms.token || parms.userToken;
    state.business = parms.business;
    state.nickname = parms.nickname;
    state.isShowLogin = Boolean(parms);
    SET_TOKEN(parms.token || parms.userToken)
  },
  // 退出登录
  removeToken(state) {
    state.userToken = '';
    state.business = '';
    state.nickname = '';
    state.isShowLogin = false;
    REMOVE_TOKEN()
  },
  // 改变登录弹框显隐
  changeLoginMask(state, params) {
    if (params === false) {
      state.showLoginMask = false
    } else {
      state.showLoginMask = !state.showLoginMask
    }
  }
}

export const getters = {
  isShowLogin: state => state.isShowLogin,
  userToken: state => state.userToken,
  nickname: state => state.nickname,
  business: state => state.business,
  showLoginMask: state => state.showLoginMask
}
