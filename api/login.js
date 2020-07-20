import request from "~/plugins/request";

/**
 * 登录
 * @param {*} params
 */
export const login = (params) => {
	return request.post(`index/user/login`, params)
}

/**
 * 注册
 */
export const register = (params) => {
	return request.post(`index/user/register`, params)
}

/**
 * 发送
 */
export const sendCode = (params) => {
	return request.post(`index/sandsms`, params)
}




/**
 * 忘记密码发送验证码
 */
export const forgetSendCode = (params) => {
	return request.post(`index/cpwdsms`, params)
}

/**
 * 忘记密码第一步提交
 */
export const forgetOneSub = (params) => {
	return request.post(`index/user/changepwd`, params)
}

/**
 * 忘记密码第二步提交
 */
export const forgetSecSub = (params) => {
	return request.post(`index/user/uppwd`, params)
}