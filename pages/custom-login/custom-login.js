import {wechatLogin} from "../../utils/api";

Page({
  data: {
    accountNum: '',
  },
  onLoad: function (options) {

  },
  getUserInfo() {
    const wx_userInfo = wx.getStorageSync('wx_userInfo')
    return wechatLogin({
      mobile: this.data.accountNum,
      nickName: wx_userInfo.nickName,
      gender: wx_userInfo.gender,
      avatarUrl: wx_userInfo.avatarUrl,
      openId: wx.getStorageSync('codeData').openid
    })
      .then(value => {
        if (value.code !== 0) {
          wx.showToast({
            title: value.msg,
            icon: 'none',
            duration: 1000
          })
          return
        }
        if (value.data) {
          wx.setStorageSync('userInfo', value.data)
          wx.switchTab({url: '/pages/plan/plan'})
        }
        if (!value.data) {
          wx.showToast({
            title: '暂无此用户',
            icon: 'none',
            duration: 1000
          })
        }
      })
      .catch(reason => reason)
  },
  bindKeyInput(e) {
    this.setData({
      accountNum: e.detail.value
    })
  },
});
