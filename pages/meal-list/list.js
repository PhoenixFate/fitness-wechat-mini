// pages/meal-list/list.js
import { getHealthyMealList } from '../../utils/api'
Page({

  /**
   * Page initial data
   */
  data: {
    list: [],
    activeKey: 0,
    selectedItem: {
      healthyMealItems: []
    }
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
    getHealthyMealList({
      page: 1,
      limit: 100
    }).then(res =>{
      console.log(res.data.list);
      if(res.data.list.length > 0){
        this.setData({
          list: res.data.list,
          selectedItem: res.data.list[0]
        })
      }
      
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
  selectMeal: function (event) {
    console.log(this.data.list[event.detail].healthyMealItems);
    this.setData({
      selectedItem: this.data.list[event.detail]
    })
  },
})