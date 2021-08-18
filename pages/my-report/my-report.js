import {img_my_report} from'../../config/remote-source'
//获取应用实例
const app = getApp()

Page({
  data: {
    img_my_report,
    reportList: [
      {
        time: '2018年5月30日',
        desc: '初次体测'
      }, {
        time: '2018年5月30日',
        desc: '初次体测'
      }, {
        time: '2018年5月30日',
        desc: '初次体测'
      }, {
        time: '2018年5月30日',
        desc: '初次体测'
      }, {
        time: '2018年5月30日',
        desc: '初次体测'
      }, {
        time: '2018年5月30日',
        desc: '初次体测'
      },
    ]
  },
  onLoad: function () {
  },
})
