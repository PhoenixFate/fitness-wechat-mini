import { getCoachList, getCustomerDetailById } from '../../utils/api'
const moment=require('../../utils/moment.min.js')

Page({
  data: {
    userInfo: {},
    selectStatus: false,
    selectedHall: '乐基健身房',
    selectContent: ['乐基健身房', '金吉鸟健身房', '好的健身房'],
    planName: '暂无计划',
    progressPercent: 0,
    coachInfo: {
      coachName: '暂无教练'
    },
    planTime: '',
    endDateDesc: ''
  },
  onShow: function () {
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({userInfo: userInfo})
    if(moment(userInfo.vipEndDate).isBefore(moment())){
      this.setData({
        endDateDesc: '已过期'
      })
    }else {
      this.setData({
        endDateDesc: '有效期：'+userInfo.vipEndDate
      })
    }
    this.setData({progressPercent: Math.round((userInfo.currentClass * 100)/userInfo.totalClass) })
    let trainingList = wx.getStorageSync('trainingList');
    if(trainingList && trainingList.length>0){
      let temp = trainingList.filter(item =>moment(item.detailDate).isAfter(moment()));
      if(temp.length > 0){
        let planTime = moment(temp[0].detailDate+ " "+ temp[0].startTime).format("MM-DD HH:mm");
        this.setData({planTime: planTime})
      }
    }
    


    getCustomerDetailById({
      Id: wx.getStorageSync('userInfo').customerId
    }).then(res =>{
      if(res.data.customerPlan.trainingPlan){
        let name = res.data.customerPlan.trainingPlan.trainingPlanName
        this.setData({planName: name.length > 9 ? name.substring(0, 8)+ '...': name})
      }
    })
    getCoachList({
      page: 1,
      limit: 10
    }).then(res =>{
      let arr = res.data.list.filter(item => item.coachId == userInfo.coachId)
      if(arr && arr.length >0){
        this.setData({
          coachInfo: arr[0]
        })
        wx.setStorageSync('coachInfo', arr[0])
        console.log(arr[0])
      }
    })
  },
  handleClickSelect: function () {
    let temp = this.data.selectStatus
    this.setData({
      selectStatus: !temp
    })
  },
  handleSelectHall: function (e) {
    this.setData({
      selectedHall: e.target.dataset.item
    })
  },
  toNewPage(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },
  logout(){
    console.log('log out');
    wx.clearStorage({
      success: (res) => {
        wx.navigateTo({
          url: '/pages/login/login'
        })
      },
    })
  },
  toMyCoach() {
    if(!this.data.userInfo){
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
    if(this.data.coachInfo.coachName == "暂无教练"){
      wx.navigateTo({
        url: '/pages/coach-list/list'
      })
    }else {
      wx.navigateTo({
        url: '/pages/coach/coach'
      })
    }
    
  },
  toPlanList() {
    if(!this.data.userInfo){
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
    wx.navigateTo({
      url: '/pages/plan-list/list'
    })
  },
  viewBodyInfo() {
    if(!this.data.userInfo){
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
    wx.navigateTo({
      url: '/pages/body/body'
    })
  },
  viewUserInfo() {
    if(!this.data.userInfo){
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
    wx.navigateTo({
      url: '/pages/user-info/user'
    })
  },
  purchaseCard() {
    wx.navigateTo({
      url: '/pages/purchase/purchase'
    })
  },
  viewMealInfo() {
    wx.navigateTo({
      url: '/pages/meal-list/list'
    })
  }
})
