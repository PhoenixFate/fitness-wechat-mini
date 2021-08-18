// pages/day-plan/day-plan.js
Page({

  /**
   * Page initial data
   */
  data: {
    trainDetail: {},
    actionSetsArr: [],
    currentDate: '',
    className: '',
    totalClass: 0,
    userInfo: {}
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();
    let date = now.getDate();
    month = month + 1;
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    this.setData({currentDate: year + '.'+ month+ '.'+ date})

    if(wx.getStorageSync('trainDetail').classInfo){
      this.setData({className: wx.getStorageSync('trainDetail').classInfo.className})
    }
    this.setData({totalClass: wx.getStorageSync('userInfo').totalClass})
    this.setData({userInfo: wx.getStorageSync('userInfo')})
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
    let trainDetail = wx.getStorageSync('trainDetail');
    this.setData({trainDetail});
    if(trainDetail.classInfo){
      const exerciseList = trainDetail.classInfo.exercises
    const actionSets = exerciseList.map(i => i.actionSets)
    let actionSetsArr = actionSets.flat()
    actionSetsArr.forEach(item=>{
      let actions = item['actions'];
      actions.map(action=>{
        let list = []
        if(item['oneSets']){
          item['oneSets'].forEach(set =>{
            if(set['oneSetDetails']){
              set['oneSetDetails'].forEach(detail =>{
                if(detail['actionId'] == action['actionId'] && detail['status']!= 0){
                  list.push(detail);
                }
              })
            }
          })
        }
        action['organizedArr'] = list
        return action
      })
    })
    console.log(actionSetsArr)
    this.setData({actionSetsArr});
    }
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