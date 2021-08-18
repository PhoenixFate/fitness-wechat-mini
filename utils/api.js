import {wx_request} from './promisify-wx-api'
import host from '../config/host'

/**
 * 解码code
 * @param param
 * @returns {Promise<*>}
 */
export const getOpenIdByWeChatCode = (param) => {
  return wx_request({
    url: `${host}/code?code=${param.code}`,
  })
}
/**
 * 解码手机
 * @param param
 * @returns {Promise<*>}
 */
export const getMobileInCode = (param) => {
  return wx_request({
    url: `${host}/code/mobile`,
    data: param,
    method: 'POST'
  })
}
/**
 * 顾客-登录
 * @param param
 * @returns {Promise<*>}
 */
export const wechatLogin = (param) => {
  return wx_request({
    url: `${host}/customer/login`,
    data: param,
    method: 'POST'
  })
}
/**
 * 顾客-根据客户编号获得客户信息-customerNumber
 * @param param
 * @returns {Promise<*>}
 */
export const getCustomerInfoByNum = (param) => {
  return wx_request({
    url: `${host}/customer/number/${param.customerNumber}`,
  })
}
/**
 * 顾客-根据手机号查询客户信息-mobile
 * @param param
 * @returns {Promise<*>}
 */
export const getCustomerInfoByMobile = (param) => {
  return wx_request({
    url: `${host}/customer/mobile/${param.mobile}`,
  })
}
/**
 * 顾客-根据顾客id获取顾客详情-customerId
 * @param param
 * @returns {Promise<*>}
 */
export const getCustomerDetailById = (param) => {
  return wx_request({
    url: `${host}/customer/${param.Id}`,
  })
}

/**
 * 教练-列表
 * @param param
 * @returns {Promise<*>}
 */
export const getCoachList = (param) => {
  return wx_request({
    url: `${host}/coach?page=${param.page}&limit=${param.limit}`,
  })
}
/**
 * 健身房-列表
 * @param param
 * @returns {Promise<*>}
 */
export const getGymList = (param) => {
  return wx_request({
    url: `${host}/gym?page=${param.page}&limit=${param.limit}`,
  })
}
/**
 * 健康餐-列表
 * @param param
 * @returns {Promise<*>}
 */
export const getHealthyMealList = (param) => {
  return wx_request({
    url: `${host}/healthyMeal?page=${param.page}&limit=${param.limit}`,
  })
}
/**
 * 训练辅助-根据顾客id查询该顾客下面所有的训练-customerId
 * @param param
 * @returns {Promise<*>}
 */
export const getTrainingListByCustomId = (param) => {
  return wx_request({
    url: `${host}/trainingAid/customer/${param.customerId}`,
  })
}

/**
 * 训练辅助-根据顾客训练计划id下面所有的训练日-customerPlanId
 * @param param
 * @returns {Promise<*>}
 */
export const getTrainingDayListByCustomerPlanId = (param) => {
  return wx_request({
    url: `${host}/trainingAid/customer/plan/${param.customerPlanId}`,
  })
}

/**
 * 训练辅助-顾客确认某天的训练
 * @param param
 * @returns {Promise<*>}
 */
export const trainingCustomerSure = (param) => {
  return wx_request({
    url: `${host}/trainingAid/customer/sure`,
    data: param,
    method: 'PUT'
  })
}

/**
 * 顾客分享-列表-某个顾客的分享列表-customerId
 * @param param
 * @returns {Promise<*>}
 */
export const getCustomShareListByCustomerId = (param) => {
  return wx_request({
    url: `${host}/customerShare/customer/${param.customId}?page=${param.page}&limit=${param.limit}`,
    data: param,
    method: 'PUT'
  })
}

/**
 * 顾客分享-新增
 * @param param
 * @returns {Promise<*>}
 */
export const addCustomShare = (param) => {
  return wx_request({
    url: `${host}/customerShare`,
    data: param,
    method: 'POST'
  })
}

/**
 * 顾客分享-修改
 * @param param
 * @returns {Promise<*>}
 */
export const updateCustomShare = (param) => {
  return wx_request({
    url: `${host}/customerShare`,
    data: param,
    method: 'PUT'
  })
}

/**
 * 顾客分享-删除
 * @param param
 * @returns {Promise<*>}
 */
export const deleteCustomShareByCustomerShareId = (param) => {
  return wx_request({
    url: `${host}/customerShare/${param.customerShareId}`,
    data: param,
    method: 'DELETE'
  })
}

/**
 * 文件上传
 * @param param formData
 * @returns {Promise<*>}
 */
export const fileUpload = (param) => {
  return wx_request({
    url: `${host}/oss`,
    data: param,
    method: 'POST'
  })
}

/**
 * 文件上传-多文件
 * @param param formData
 * @returns {Promise<*>}
 */
export const fileUploadMulti = (param) => {
  return wx_request({
    url: `${host}/oss/multi`,
    data: param,
    method: 'POST'
  })
}

/**
 * 训练辅助-查询某一天训练的详情数据-customerPlanDayId
 * @param param
 * @returns {Promise<*>}
 */
export const getTrainingAidByCustomerPlanDayId = (param) => {
  return wx_request({
    url: `${host}/trainingAid/${param.customerPlanDayId}`,
  })
}

/**
 * 获取教练一天安排
 * @param param
 * @returns {Promise<*>}
 */
export const getCoachDayPlan = (param) => {
  return wx_request({
    url: `${host}/coach/day`,
    data: param,
    method: 'POST'
  })
}

/**
 * 获取体测数据
 * @param param
 * @returns {Promise<*>}
 */
export const getBodyTest = (param) => {
  return wx_request({
    url: `${host}/customer/bodyTest`,
    data: param,
    method: 'POST'
  })
}

/**
 * 更改教练
 * @param param
 * @returns {Promise<*>}
 */
export const changeCoach = (param) => {
  return wx_request({
    url: `${host}/customer/coach/change`,
    data: param,
    method: 'PUT'
  })
}

/**
 * 获取所有会员卡类型
 * @param param
 * @returns {Promise<*>}
 */
export const getAvailableCard = (param) => {
  return wx_request({
    url: `${host}/vipCard?page=1&limit=10`,
  })
}

/**
 * 小程序预下单
 * @param param
 * @returns {Promise<*>}
 */
export const wxPayOrder = (param) => {
  return wx_request({
    url: `${host}/pay/preOrder`,
    data: param,
    method: 'POST'
  })
}
