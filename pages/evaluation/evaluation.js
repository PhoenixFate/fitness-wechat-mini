// pages/evaluate/evaluate.js
import { getTrainingListByCustomId} from '../../utils/api'
Page({

  /**
   * Page initial data
   */
  data: {
    value: 0,
    comment: '',
    userInfo: {},
    trainDetail: {}
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
    let trainDetail = wx.getStorageSync('trainDetail');
    this.setData({userInfo: userInfo})
    this.setData({trainDetail: trainDetail})
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
  changeRate: function () {
    
  },
  confirmCourse: function (){
    getTrainingListByCustomId({
      "customerId": this.data.userInfo.customerId,
      "detailDate": this.data.trainDetail.detailDate,
      "commentScore": this.data.value,
      "comment": this.data.comment
    }).then(res =>{
      if(res && res.msg == 'success'){
        wx.showToast({
          title:'确认课程结束成功',
          icon:'success',//默认
          duration:2000
        });
        wx.navigateBack();
      }
    })
  }
})