import request from "~/plugins/request";

/**
 * 行业路由
 * @param {*} params 
 */
export const getIndexTrade = (params) => {
  return request.get(`index/trade/${params}`)
}

/**
 * 展商列表
 * @param {*} params 
 */
export const getTrade = (pagesize, exhibiton, trade_id, page) => {
  return request.get(`index/exhibitors?pagesize=${pagesize}&exhibiton=${exhibiton}&trade_id=${trade_id}&page=${page}`)
}

/**
 * 展商列表
 * @param {*} params 
 */
export const getDetails = (params) => {
  return request.get(`index/exhibitors/${params}`)
}

/**
 * 产品分类列表
 * @param {*} params 
 */
export const getPtrade = () => {
  return request.get(`index/p_trade`)
}

/**
 * 推荐新闻
 * @param {*} params 
 */
export const getNews = () => {
  return request.get(`index/news`)
}

/**
 * 新闻详情
 * @param {*} params 
 */
export const getNewsData = (params) => {
  return request.get(`index/news/${params}`)
}

/**
 * 推荐商品
 * @param {*} params 
 */
export const getRecommend = (params) => {
  return request.get(`index/goods/recommend?page=${params.page}&pagesize=${params.pageSize}`)
}

/**
 * 首页推荐展商
 * @param {*} params 
 */
export const getExhibRecommend = () => {
  return request.get(`/index/exhibitors/recommend`)
}

/**
 * 推荐云展
 * @param {*} params 
 */
export const getLive = () => {
  return request.get(`index/Cloudexhibition/recommend`)
}

/**
 * 云展列表
 * @param {*} params 
 */
export const getLiveList = () => {
  return request.get(`index/cloudexhibition`)
}

/**
 * 展馆列表
 * @param {*} params 
 */
export const getPavilion = () => {
  return request.get(`index/pavilion`)
}

/**
 * 展馆列表
 * @param {*} params 
 */
export const getReview = () => {
  return request.get(`index/review`)
}

/**
 * 采购询盘表单提交
 * @param {*} params 
 */
export const getAdvisory = (params) => {
  return request.post(`index/advisory`, params)
}

/**
 * 采购询盘-获取供应商的资料
 * @param {*} params 
 */
export const getProduct = (params) => {
  return request.get(`index/product/${params}`)
}

/**
 * 推荐视频
 * @param {*} params 
 */
export const getVideo = () => {
  return request.get(`index/video/recommend`)
}

/**
 * 推荐视频
 * @param {*} params 
 */
export const getHelp = () => {
  return request.get(`index/news/help/`)
}

/**
 * 首页合作品牌
 * @param {*} params 
 */
export const getCooper = () => {
  return request.get(`index/cooperate/recommend`)
}

/**
 * 网站基本信息
 * @param {*} params 
 */
export const getWebset = () => {
  return request.get(`index/webset/1`)
}

/**
 * 首页新闻接口
 * @param {*} params 
 */
export const getNewsindex = () => {
  return request.get(`index/news/recommend`)
}

/**
 * 搜索产品
 * @param {*} params 
 */
export const getSearchGoods = (keyword, page = 1) => {
  return request.get(`index/goods/search?keyword=${keyword}&page=${page}`)
}

/**
 * 获取直播
 * @param {*} params 
 */
export const getLiveVideo = () => {
  return request.get(`index/cludeExhibitionListLater`)
  // return request.get(`index/onlineLiveList`)
}
