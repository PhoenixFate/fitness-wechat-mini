// pages/coach.js
import { getCoachDayPlan } from '../../utils/api'
const moment=require('../../utils/moment.min.js')
Page({

  /**
   * Page initial data
   */
  data: {
    userInfo: {},
    list: [{
      time: '10:00-11:00',
      status: true,
      plan: ''
    },{
      time: '11:00-12:00',
      status: false,
      plan: '进行腿部训练'
    }],
    activeIndex: 0,
    currentDate: new Date(),
    weekArr: [],
    coachInfo: {},
    dayPlan: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
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
    let nowDate = new Date(new Date().toLocaleDateString());
    let obj = {
      '0': '周日',
      '1': '周一',
      '2': '周二',
      '3': '周三',
      '4': '周四',
      '5': '周五',
      '6': '周六'
    }
    this.weekArr = [];
    let arr = [];
    for(var i=0; i<7; i++){
      let tempDate = new Date(nowDate.getTime() + 24*60*60*1000 * i);
      arr.push({
        key: i,
        weekDay: obj[tempDate.getDay()],
        date: tempDate.getDate()
      })
    }
    console.log(arr);
    this.setData({weekArr: arr});

    this.setData({coachInfo: wx.getStorageSync('coachInfo')});

    let date = moment(this.data.currentDate).format("YYYY-MM-DD")
    getCoachDayPlan({
      "coachId": this.data.coachInfo.coachId,
      "date": date
    }).then(res =>{
      let arr = res.data.map(i => {
        i['startTime'] = moment(date + ' ' + i['startTime']).format('HH:mm')
        i['endTime'] = moment(date + ' ' + i['endTime']).format('HH:mm')
        let temp = i['classInfo']['className'];
        i['classInfo']['className'] =  temp && temp.length > 6 ? temp.substring(0, 5)+'...' : temp
        return i
      })
      this.setData({
        dayPlan: arr
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
  changeDate: function (e) {
    let activeIndex = e.currentTarget.dataset['detail'].key
    this.setData({
      activeIndex: activeIndex
    })
    console.log(activeIndex);
    let date = moment().add(activeIndex ,'days').format("YYYY-MM-DD")
    getCoachDayPlan({
      "coachId": this.data.coachInfo.coachId,
      "date": date
    }).then(res =>{
      let arr = res.data.map(i => {
        i['startTime'] = moment(date + ' ' + i['startTime']).format('HH:mm')
        i['endTime'] = moment(date + ' ' + i['endTime']).format('HH:mm')
        let temp = i['classInfo']['className'];
        i['classInfo']['className'] =  temp && temp.length > 6 ? temp.substring(0, 5)+'...' : temp
        return i
      })
      this.setData({
        dayPlan: arr
      })
    })

  },
  toCoachList: function(){
    wx.navigateTo({
      url: '/pages/coach-list/list'
    })
  }
})