import * as echarts from '../../ec-canvas/echarts';
import { getTrainingListByCustomId, getHealthyMealList, getTrainingAidByCustomerPlanDayId,getBodyTest } from '../../utils/api'
import getUserInfoFromCache from '../../utils/get-user-info-from-cache'
import { dateFormat } from '../../utils/date-format'
import { handleMovementListArrFromDayPlan } from '../../utils/handlers'
const moment=require('../../utils/moment.min.js')

const app = getApp()

Page({
  data: {
    curClass: 2,
    planCourse: [
      {status: true},
      {status: true},
      {status: true},
      {status: true},
      {status: true},
      {status: true},
      {status: true},
      {status: false},
      {status: false},
      {status: false},
      {status: false},
      {status: false},
      {status: false},
      {status: false},
      {status: false},
      {status: false},
      {status: false},
      {status: false},
      {status: false},
      {status: false}
    ],
    undoPlan: 0,
    donePlan: 0,
    mealRecommand: [],
    trainDetail: [],
    starNum: ['../../images/icon-star.png', '../../images/icon-star.png', '../../images/icon-star.png', '../../images/icon-star.png', '../../images/icon-star.png'],
    ecBar1: {
      lazyLoad: true
    },
    star: 5,
    weight: [{
      id: 1,
      range: '3/29-4/4',
      value: '64'
    },{
      id: 2,
      range: '4/5-4/11',
      value: '58'
    },{
      id: 3,
      range: '4/12-4/18',
      value: '66'
    }],
    today: '',
    preMonth: '',
    currentWeight: 0,
    bodyInfo: {},
    userInfo: {}
  },
  onLoad: function () {
    // 获取组件
    this.ecComponent = this.selectComponent('#mychart-dom-bar');
  },
  onShow: function () {
    // console.log(moment().format("YYYY-MM-DD"))
    let userInfo = wx.getStorageSync('userInfo');
    console.log(userInfo)
    this.setData({userInfo: userInfo})
    getTrainingListByCustomId({ customerId: getUserInfoFromCache().customerId }).then(res => {
      console.log('getTrainingListByCustomId', res)
      if (res.code === 0) {
        const trainingList = res.data
        wx.setStorageSync('trainingList', trainingList)
        const date = dateFormat(new Date())
        const dayPlan = trainingList.find(i => i.detailDate === date)
        if(dayPlan){
          getTrainingAidByCustomerPlanDayId({ customerPlanDayId: dayPlan.customerPlanDayId }).then(value => {
            if (value.code === 0) {
              wx.setStorageSync('trainDetail', value.data)
              const trainDetail = handleMovementListArrFromDayPlan(value.data)
              console.log(trainDetail);
              this.setData({ trainDetail })
            }
          })
        }else {
          wx.setStorageSync('trainDetail', {})
        }
      }
    })
    //获取体测数据
    let today = moment().format('YYYY-MM-DD');
    let preMonth = moment(new Date()).subtract(1,'months').format('YYYY-MM-DD')
    this.setData({today: moment(today).format("MM月DD日")});
    this.setData({preMonth: moment(preMonth).format("MM月DD日")});
    let xData = [];
    let yData = [];
    getBodyTest({ "customerId": getUserInfoFromCache().customerId,
    "startDate":preMonth,
    "endDate":today
    }).then(res=>{
      console.log(res);
      res.data.forEach(item =>{
        xData.push(moment(item['addTime']).format("MM-DD"));
        yData.push(item['weight']);
      })
      app.globalData.xData = xData;
      app.globalData.yData = yData;
      if(res.data.length > 0){
        let obj = res.data.pop();
        this.setData({currentWeight: obj.weight});
        this.setData({bodyInfo: obj});
        wx.setStorageSync('bodyInfo', obj)
      }
      
      this.init();
    })

    getHealthyMealList({page: 1, limit: 10}).then(res => {
      let data = res.data.list
      let result = []
      for (var i = 0, len = data.length; i < len; i += 4) {
        result.push(data.slice(i, i + 4))
      }
      this.setData({
        mealRecommand: result
      })
    })
  
  
  },
  handleLeft: function () {
    if (this.data.curClass === 1) {
      this.setData({
        curClass: 3
      })
    } else {
      this.setData({
        curClass: this.data.curClass - 1
      })
    }
  },
  handleRight: function () {
    if (this.data.curClass === 3) {
      this.setData({
        curClass: 1
      })
    } else {
      this.setData({
        curClass: this.data.curClass + 1
      })
    }
  },
  handleClickStar: function (e) {
    let index = e.target.dataset.index
    console.log('index: ', 5 - index);
    let newList = []
    for (let item in this.data.starNum) {
      if (item <= index - 1) {
        newList[item] = '../../images/icon-star.png'
      } else {
        newList[item] = '../../images/icon-star-selected.png'
      }
    }
    this.setData({
      starNum: newList
    })
  },
  viewDayPlan: function(){
    if(!this.data.userInfo){
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
    if(this.data.trainDetail){
      wx.navigateTo({
        url: '/pages/day-plan/day-plan'
      })
    }
  },
  evaluate: function(){
    wx.navigateTo({
      url: '/pages/evaluation/evaluation'
    })
  },
  viewBodyInfo: function(){
    if(!this.data.userInfo){
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
    wx.navigateTo({
      url: '/pages/body/body'
    })
  },
  init: function(){
    this.ecComponent.init((canvas, width, height, dpr) =>{
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
      })
      canvas.setChart(chart);
    
    
      let option = {
        tooltip: {
          trigger: 'axis',
          textStyle: {
            color: '#ed6847'
          },
          position: function (point, params, dom, rect, size) {
            // 固定在顶部
            return [point[0], '10%'];
          },
          formatter: '{c}',
          backgroundColor: '#edeeee',
          axisPointer: {
            type: 'cross',
            label: {
              color: '#ed6847',
              backgroundColor: '#fff'
            },
            crossStyle: {
              opacity: 0
            }
          }
        },
        grid: {
          bottom: '0%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: app.globalData.xData,
            axisTick: {show: false},
            axisLine: {show: false},
            axisLabel: {color: '#9b9b9b'},
            splitLine: {
              show: true,
              lineStyle: {
                color: '#fff',
                type: 'dashed'
              }
            }
          }
        ],
        yAxis: {show: false},
        series: [
          {
            name: 'Line 1',
            type: 'bar',
            lineStyle: {
              width: 0
            },
            itemStyle:{                 
              color:'#f4af4a',
              barBorderRadius:[18,18,0,0],
            },
            barWidth:'15',  
            showSymbol: false,
            symbol: 'triangle',
            symbolSize: 10,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(19,139,209)'
              }, {
                offset: 1,
                color: 'rgba(29,125,150)'
              }])
            },
            emphasis: {
              focus: 'series'
            },
            data: app.globalData.yData
          }
        ]
      };
    
      chart.setOption(option);
      return chart;
    })
    
  }
})

