import {img_my_coach} from '../../config/remote-source'
import { getCoachList } from '../../utils/api'

//获取应用实例
const app = getApp()

Page({
  data: {
    img_my_coach,
    cocahList: [
    ]
  },
  onLoad: function () {
  },
  onShow: function () {
    getCoachList({ page: 1, limit: 10 }).then(res => {
      console.log('getCoachList', res)
    })
  }
})
