// pages/plan-list/list.js
import { handleMovementListArrFromDayPlan } from '../../utils/handlers'
import { getTrainingListByCustomId, getHealthyMealList, getTrainingAidByCustomerPlanDayId } from '../../utils/api'
const moment=require('../../utils/moment.min.js')
Page({

  /**
   * Page initial data
   */
  data: {
    trainingList: []
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
    let trainingList = wx.getStorageSync('trainingList');
    let arr = []
    trainingList.forEach(item =>{
      arr.push(getTrainingAidByCustomerPlanDayId({ customerPlanDayId: item.customerPlanDayId }));
    })
    Promise.all(arr).then(res =>{
      let list = [];
      res.forEach(value =>{
        if (value.code === 0) {
          let obj = value.data;
          const trainDetail = handleMovementListArrFromDayPlan(value.data)
          obj['trainDetail'] = trainDetail;
          list.push(obj)
        }
      })
      this.setData({trainingList: list});
    })

    // console.log(arr);
    // this.setData({trainingList: arr});
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

  }
})