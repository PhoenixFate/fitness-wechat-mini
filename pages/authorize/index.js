//获取应用实例
import {getMobileInCode, getOpenIdByWeChatCode, wechatLogin} from "../../utils/api";
import {wx_login} from "../../utils/promisify-wx-api";

const app = getApp()
Page({
  data: {
    step: 1,
    showFlag: false,
  },
  onLoad: function (options) {
    wx_login()
      .then(res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          return getOpenIdByWeChatCode({code: res.code})
        }
      )
      .then((value) => {
        console.log(value);
        if (value.code === 0) {
          wx.setStorageSync('codeData', value.data)
        }
        // 判断用户信息是否存在
        if (wx.getStorageSync('userInfo')) {
          wx.switchTab({
            url: '/pages/home/home'
          })
          return
        }
        this.setData({showFlag: true})
        if (wx.getStorageSync('wx_userInfo')) {
          this.setData({step: 2})
        }
      })
  },
  getUserInfo: function (e) {
    const {userInfo} = e.detail
    if (userInfo) {
      app.globalData.wx_userInfo = userInfo
      wx.setStorageSync('wx_userInfo', userInfo)
      this.setData({step: 2})
      return
    }
    wx.showToast({
      title: '亲，麻烦同意一下！',
      icon: 'none',
      duration: 1000
    })
  },
  getPhoneNumber(e) {
    if (this.data.step !== 2) {
      return
    }
    console.log(e.detail)
    const {encryptedData, iv} = e.detail
    if (!encryptedData) {
      wx.showToast({
        title: '亲，麻烦同意一下！',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    const codeData = wx.getStorageSync('codeData')
    return getMobileInCode({
      encryptedData: encryptedData,
      sessionKey: codeData.session_key,
      iv: iv
    })
      .then(value => {
        if (value.code === 0) {
          const wx_userInfo = wx.getStorageSync('wx_userInfo')
          const {nickName, gender, avatarUrl} = wx_userInfo
          return wechatLogin({
            mobile: value.data.purePhoneNumber,
            nickName: nickName,
            gender: gender,
            avatarUrl: avatarUrl,
            openId: codeData.openid
          })
        }
        return {}
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
            duration: 1000,
          })
          setTimeout(() => {
            wx.navigateTo({url: '/pages/custom-login/custom-login'})
          }, 1000)
        }
      })
  },
  goCustomLoginPage() {
    wx.navigateTo({url: '/pages/custom-login/custom-login'})
  },
  getUserProfile() {
    let self = this;
    if(self.data.step != 1){
      return;
    }
    wx.showModal({
      title: '温馨提示',
      content: '正在请求您的个人信息',
      success(res) {
        if (res.confirm) {
          wx.getUserProfile({
          desc: "获取你的昵称、头像、地区及性别",
          success: res => {
            console.log(res)
            let wxUserInfo = res.userInfo;
            wx.setStorageSync('wx_userInfo', wxUserInfo)
            self.setData({step: 2})
          },
          fail: res => {
             //拒绝授权
            that.showErrorModal('您拒绝了请求');
            return;
          }
        })} else if (res.cancel) {
          //拒绝授权 showErrorModal是自定义的提示
          that.showErrorModal('您拒绝了请求');
          return;
        }
      }
    })
  }
});
