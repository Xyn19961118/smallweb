import request from "~/plugins/request";

/**
 * 获取采购列表
 * @param {*} params
 */
export const getList = (create_time = '1', end_time = '1', delivery_area_id = '', page = '1', trade_id = '', pagesize = '10', keyword = "") => {
  return request.get(`index/demand?pagesize=${pagesize}&create_time=${create_time}&end_time=${end_time}&delivery_area_id=${delivery_area_id}&page=${page}&trade_id=${trade_id}&keyword=${keyword}`)
}

/**
 * 获取采购数据详情
 * @param {*} params
 */
export const getDynamicDetails = (id) => {
  return request.get(`index/demand/${id}`)
}

/**
 * 发布需求
 * @param {*} params
 */
export const release = (params) => {
  return request.post(`index/demand`, params)
}

/**
 * 更新发布需求
 * @param {*} params
 */
export const updateRelease = (params, id) => {
  return request.post(`index/demand/update/${id}`, params)
}


/**
 * 交货地
 * @param {*} id
 */
export const addressCity = (id) => {
  return request.get(`index/city/${id}`)
}

/**
 * 热门需求
 * @param {*}
 */
export const goodsHotOffer = () => {
  return request.get(`index/goodsHotOffer`)
}

/**
 * 报价
 * @param
 */
export const goodsOfferInsert = (param) => {
  return request.post(`index/goodsOfferInsert`, param)
}
