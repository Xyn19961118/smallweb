import request from "~/plugins/request";

/**
 * 详细信息
 * @id {*} id
 */
export const getGoodesDetails = (id = '') => {
  return request.get(`index/goods/${id}`)
}

/**
 * 取消收藏
 * @id {*} id
 */
export const deleteColl = (id) => {
  return request.get(`index/collection/collectDel?g_id=${id}`)
}
