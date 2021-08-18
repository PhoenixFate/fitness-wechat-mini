import getNowFormatDate, {getFormatDate} from '../../utils/get-now-date'

const getDateArr = () => {
  const arr = []
  let startIndex = 0
  if (new Date().getHours() > 15) {
    startIndex = 1
  }
  const endIndex = startIndex + 14
  for (let i = startIndex; i < endIndex; i++) {
    arr.push(getFormatDate(i))
  }
  return arr
}
Page({
  data: {
    show: false,
    maskShow: false,
    calendarShow: false,
    active: 0,
    mealArr: [],
    multiIndex: [0, 0],
    multiArray: [getDateArr(), ['午餐', '晚餐']],
  },
  onClickShow() {
    this.setData({maskShow: !this.data.maskShow});
  },

  onClickHide() {
    this.setData({maskShow: false});
  },
  bindMultiPickerChange: function (e) {
    console.log('自定义参数：', e.target.dataset.itemid)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    const arr = this.data.mealArr

    arr.push({
      id: e.target.dataset.itemid,
      value: `${this.data.multiArray[0][e.detail.value[0]]}${this.data.multiArray[1][e.detail.value[1]]}`
    })
    console.log(arr)
    this.setData({
      mealArr: arr,
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    console.log(1, data.multiIndex);
    this.setData(data);
  },
  showPopup() {
    this.setData({show: true});
  },

  onClose() {
    this.setData({show: false});
  },
  onChange(event) {
  },
  onLoad: function (options) {

  },
  goAddMealPage() {
    wx.navigateTo({url: '/pages/add-meal/add-meal'})
  }
});
