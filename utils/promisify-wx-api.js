/* 对wx api进行promise化 */

/**
 *
 * @returns {Promise<any>}
 */
export const wx_login = () => new Promise((resolve, reject) => {
  return wx.login({
    success(res) {
      resolve(res)
    },
    fail(res) {
      reject(res)
    }
  })
})

/**
 *
 * @returns {Promise<unknown>}
 */
export const wx_getSetting = () => new Promise((resolve, reject) => {
  return wx.getSetting({
    success(res) {
      resolve(res)
    },
    fail(res) {
      reject(res)
    }
  })
})

/**
 *
 * @returns {Promise<unknown>}
 */
export const wx_getUserInfo = () => new Promise((resolve, reject) => {
  return wx.getUserInfo({
    success(res) {
      resolve(res)
    },
    fail(res) {
      reject(res)
    }
  })
})
/**
 *
 * @param param
 * @returns {Promise<unknown>}
 */
export const wx_request = param => new Promise((resolve, reject) => {
  return wx.request({
    url: param.url,
    data: param.data,
    header: {
      'content-type': 'application/json', // 默认值
      'Authorization': `Token:${wx.getStorageSync('AccessToken')}`
    },
    method: param.method === undefined ? 'GET' : param.method,
    success(res) {
      resolve(res.data)
    },
    fail(res) {
      reject(res.data)
    }
  })
})
