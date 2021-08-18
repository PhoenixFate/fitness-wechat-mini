import {getTrainingAidByCustomerPlanDayId} from "../../utils/api";
import {handleMovementListArrFromDayPlan} from '../../utils/handlers'
import {dateFormat} from '../../utils/date-format'

Page({
  data: {
    minDate: new Date(2020, 11, 1).getTime(),
    defaultDate: new Date().getTime(),
    donePlanArr: [],
    undoPlanArr: [],
    customerPlanDaysArr: [],
    dayPlan: null,
    trainingList: [],
    movementListArr: [],
    formatterDate: null,
    userInfo: {},
    progressPercent: 0,
    currentDate: '',
    imageUrls: []
  },
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({userInfo: userInfo})
    this.setData({progressPercent: Math.round((userInfo.currentClass * 100)/userInfo.totalClass) })
    if(!this.data.progressPercent){
      this.setData({progressPercent: 0 })
    }
  },
  onShow() {
    console.log(this.formatterDate);
    this.setData({formatterDate: this.formatter})
    try {
      this.onDateSelect({detail: new Date()})
    } catch (e) {

    }
  },
  formatter(day) {
    const trainingList = wx.getStorageSync('trainingList')
    if (!trainingList) {
      return day
    }
    const trainDays = trainingList.map(i => i.detailDate)
    const fullDay = dateFormat(day.date)
    if (trainDays.indexOf(fullDay) === -1) {
      return day;
    }
    const training = trainingList.find(i => i.detailDate === fullDay)
    if (training.status === 1) {
      day.bottomInfo = '已完成'
      return day
    }
    day.bottomInfo = '未完成'
    return day
  },
  onDateSelect(data) {
    console.log(data);
    const date = dateFormat(data.detail)
    this.setData({currentDate: this.formatDay(data.detail)});
    const trainingList = wx.getStorageSync('trainingList')
    const userInfo = wx.getStorageSync('userInfo')
    const dayPlan = trainingList.find(i => i.detailDate === date)
    console.log(dayPlan);
    if (!dayPlan) {
      wx.showToast({
        title: '当前日期暂无计划',
        icon: "none"
      })
      return
    }
    this.setData({dayPlan})
    return getTrainingAidByCustomerPlanDayId({customerPlanDayId: dayPlan.customerPlanDayId})
      .then(value => {
        if (value.code === 0) {
          const actionSets = value.data.classInfo.exercises.map(i => i.actionSets)
          const actionSetsArr = actionSets.flat()
          const imageUrls = actionSetsArr.map(i =>i.imageUrls).flat();
          console.log(imageUrls);
          this.setData({
            trainingAid: value.data,
            movementListArr: handleMovementListArrFromDayPlan(value.data),
            imageUrls: imageUrls
          })
        }
      })
      .catch(reason => reason)
  },
  findPlanByDate(date) {
    const {customerPlanDaysArr} = this.data
    return customerPlanDaysArr.find(item => item.detailDate === dateFormat(date)) || null
  },
  viewDetail(e) {
    const date = e.target.dataset.date
    const {dayPlan} = this.data
    wx.setStorageSync('dayPlan', dayPlan)
    wx.setStorageSync('trainingAid', this.data.trainingAid)
    wx.navigateTo({url: `/pages/report/report?date=${date}`})
  },
  formatDay(t){
    const date = new Date(t);
    const month = date.getMonth() + 1;
    const day = date.getDate()
    return month + '月' + day +'日';
  },
  preview(event) {
    console.log(event.currentTarget.dataset.src)
    let currentUrl = event.currentTarget.dataset.src
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: this.data.imageUrls // 需要预览的图片http链接列表
    })
  }
});
