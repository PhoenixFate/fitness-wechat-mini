// pages/purchase/purchase.js
import { getAvailableCard, wxPayOrder } from '../../utils/api'
Page({

  /**
   * Page initial data
   */
  data: {
    radio: '2',
    list: [],
    currentIndex: 0,
    price: 0,
    userInfo: {},
    loading: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({userInfo: userInfo})
    getAvailableCard().then(res=>{
      console.log(res.data);
      this.setData({
        list: res.data.list
      })
      this.setData({
        card: res.data.list[0],
        price: parseFloat(res.data.list[0].price).toFixed(2)
      })
    })
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },
  selectAliPay: function(){
    this.setData({radio: '1'})
  },
  selectWechatPay: function(){
    this.setData({radio: '2'})
  },
  swipeCard: function(value){
    let card = this.data.list[value.detail.current];
    this.setData({
      card: card,
      price: parseFloat(card.price).toFixed(2)
    })
  },
  buyCard: function(){
    this.setData({loading: true});
    wxPayOrder({
      "customerId":this.data.userInfo.customerId,
      "coachId": this.data.userInfo.coachId,
      "orderType":"OPEN_VIP",
      "orderItems":[
          {
              "itemCount":1,
              "orderItemType":"VIP_CARD",
              "vipCardId": this.data.card.vipCardId
          }
      ]
  }).then(res =>{
    if(res.code == 0){
      let data = res.data;
      let self = this;
      wx.requestPayment({
        appId: data.appId,
        nonceStr: data.nonceStr,
        package: data.package,
        paySign: data.paySign,
        timeStamp: data.timeStamp,
        signType: data.signType,
        success: function(res){
          wx.navigateBack();
          self.setData({loading: true});
        },
        fail: function(){
          self.setData({loading: false});
        }
      })
    }
  })
    
  }
})