import request from "~/plugins/request";
/**
 * 获取个人信息
 * @param {*} params 
 */
export const getUserInfo = () => {
  return request.get(`index/user`)
}

/**
 * 修改个人信息
 * @param {*} params 
 */
export const getUserOne = () => {
  return request.get(`index/userOne`)
}

/**
 * 修改个人信息
 * @param {*} params 
 */
export const changeUserOne = (params) => {
  return request.post(`index/userUpd`, params)
}



/**
 * 用户收藏
 * @param {*} params 
 */
export const getUserCollect = (params) => {
  return request.get(`index/collection/collectionList?page=${params.page}&pagesize=${params.pagesize}`)
}

/**
 * 修改密码
 * @param {*} params 
 */
export const changePassword = (params) => {
  return request.post(`index/user/changePassword`, params)
}

/**
 * 修改邮箱
 * @param {*} params 
 */
export const changeEmail = (params) => {
  return request.post(`index/user/emailUpd`, params)
}

/**
 * 取消收藏
 * @param {*} params 
 */
export const deleteUserCollect = (params) => {
  return request.post(`index/collection/collectDelAll`, params)
}

/**
 * 收藏
 * @param {*} params 
 */
export const setCollect = (params) => {
  return request.post(`index/collection/goodsCollection`, params)
}

/**
 * 发布报价列表
 * @param {*} params 
 */
export const getUserOffer = (params) => {
  return request.get(`index/goodsofferSelect?userRole=${params.userRole}&pageSize=10&page=${params.page}`)
}

/**
 * 删除发布需求
 * @param {*} params 
 */
export const deleteUserDemand = (params) => {
  return request.get(`index/demandDel?id=${params.id}`)
}

/**
 * 删除发布报价
 * @param {*} params 
 */
export const deleteUserOffer = (params) => {
  return request.get(`index/offerDel?id=${params.id}`)
}


/**
 * 报价消息列表
 * @param {*} params 
 */
export const getPriceNews = (page) => {
  return request.get(`index/demandOffer?page=${page}`)
}

/**
 * 删除报价消息
 * @param {*} params 
 */
export const deletePriceNews = (id) => {
  return request.get(`index/delUserOfferMsg/${id}`)
}



