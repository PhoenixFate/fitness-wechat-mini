import getUserInfoFromCache from "../../utils/get-user-info-from-cache";

Page({
  data: {
    userInfo: getUserInfoFromCache(),
    currentDonePlan: {},
    exerciseList: []
  },
  onLoad: function (options) {
  },
  onShow() {
    const dayPlan = wx.getStorageSync('dayPlan')
    this.setData({
      currentDonePlan: dayPlan,
      exerciseList: wx.getStorageSync('trainingAid').classInfo.exercises
    })
  },
  viewItemDetail(e) {
    const id = e.currentTarget.dataset['id']
    wx.navigateTo({url: `/pages/report-detail/index?actionSetId=${id}`})
  },
});
