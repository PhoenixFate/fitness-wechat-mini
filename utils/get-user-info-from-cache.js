export default function () {
  return wx.getStorageSync('userInfo') || {}
}
