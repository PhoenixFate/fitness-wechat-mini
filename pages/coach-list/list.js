// pages/coach-list/list.js
import { getCoachList, changeCoach } from '../../utils/api'
Page({

  /**
   * Page initial data
   */
  data: {
    currentCoach: {

    },
    coachList: [],
    userInfo: {},
    currentIndex: 0
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
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
    this.setData({currentCoach: wx.getStorageSync('coachInfo')})
    getCoachList({
      page: 1,
      limit: 10
    }).then(res =>{
      let arr = res.data.list;
      console.log(arr);
      arr.forEach((item,index) =>{
        if(item['coachId'] == 57){ //wb
          item['avatar'] = "http://picture.lifting.ren/coach_wb.jpeg"
        }else if (item['coachId'] == 54){
          item['avatar'] = "http://picture.lifting.ren/coach_hbe.jpeg"
        }else if (item['coachId'] == 52){
          item['avatar'] = "http://picture.lifting.ren/coach_psy.jpeg"
        }else if (item['coachId'] == 51){
          item['avatar'] = "http://picture.lifting.ren/coach_sy.jpeg"
        }else if (item['coachId'] == 50){
          item['avatar'] = "http://picture.lifting.ren/coach_lyc.jpeg"
        }else if (item['coachId'] == 49){
          item['avatar'] = "http://picture.lifting.ren/coach_chn.jpeg"
        }
      })
      this.setData({coachList: arr})
      let index = res.data.list.findIndex(item =>item.coachId == this.data.userInfo.coachId);
      console.log(index);
      this.setData({
        currentIndex: index > 0 ? index : 0
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
  changeCoachRequest: function (){
    console.log(this.data.currentCoach);
    changeCoach({
      "customerId": this.data.userInfo.customerId,
      "coachId": this.data.currentCoach.coachId
    }).then(res =>{
      if(res == ''){
        wx.showToast({
          title:'更换教练成功',
          icon:'success',//默认
          duration:2000
        });
        let temp = this.data.userInfo;
        temp.coachId = this.data.currentCoach.coachId;
        wx.setStorageSync('userInfo', temp);
        wx.setStorageSync('coachInfo', this.data.currentCoach);
        wx.navigateBack();
      }else {
        wx.showToast({
          title:res.msg,
          icon:'error',//默认
          duration:2000
        });
      }
    })
  },
  swipeCoach: function(value , e ){
    this.setData({
      currentIndex: value.detail.current,
      currentCoach: this.data.coachList[value.detail.current]
    })
  }
})