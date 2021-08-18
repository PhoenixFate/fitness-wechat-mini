import * as echarts from '../../ec-canvas/echarts';

const app = getApp()

Page({
  data: {
    curClass: 2,
    planCourse: [
      { status: true },
      { status: true },
      { status: true },
      { status: true },
      { status: true },
      { status: true },
      { status: true },
      { status: false },
      { status: false },
      { status: false },
      { status: false },
      { status: false },
      { status: false },
      { status: false },
      { status: false },
      { status: false },
      { status: false },
      { status: false },
      { status: false },
      { status: false }
    ],
    trainDetail: ['热身30分钟', '哑铃卧推X2组', '史密斯卧推X2组', '蝴蝶嘉兴X2组', '仰卧屈臂X2组', '哑铃静候臂屈伸X2组'],
    starNum: ['../../images/icon-star.png', '../../images/icon-star.png', '../../images/icon-star.png', '../../images/icon-star.png', '../../images/icon-star.png'],
    ecBar: {
      onInit: initChart,
    }
  },
  onShow: function () {

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
  }
})

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  chart.on('touchstart', function (params) {
    console.log(params);
  });
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
      formatter: '{c}KG',
      backgroundColor: ' #edeeee',
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
      left: '-15%',
      right: '-5%',
      bottom: '0%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['周日', '周一', '周二', '周三', '周四', '周五', '周六', '周日', '周一'],
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: { color: '#9b9b9b' },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#fff',
            type: 'dashed'
          }
        }
      }
    ],
    yAxis: { show: false },
    series: [
      {
        name: 'Line 1',
        type: 'line',
        smooth: true,
        lineStyle: {
          width: 0
        },
        showSymbol: false,
        symbol: 'triangle',
        symbolSize: 10,
        markPoint: {
          symbol: 'circle',
          data: [
            {
              name: '起始体重',
              coord: [1, '300'],
              itemStyle: {
                color: 'none'
              },
              label: {
                show: true,
                color: '#ed6847',
                formatter: [
                  '{a|起始体重}',
                  '80KG',
                  '-----'
                ].join('\n'),
                rich: {
                  a: {
                    fontSize: 8,
                    color: '#ed6847'
                  }
                }
              }
            }, {
              name: '目标体重',
              coord: [1, '200'],
              itemStyle: {
                color: 'none'
              },
              label: {
                show: true,
                color: '#fff',
                formatter: [
                  '{a|目标体重}',
                  '70KG',
                  '-----'
                ].join('\n'),
                rich: {
                  a: {
                    fontSize: 8,
                    color: '#fff'
                  }
                }
              }
            }
          ]
        },
        markLine: {
          symbol: 'none',
          lineStyle: {
            type: 'solid',
            width: 2
          },
          data: [
            [
              {
                coord: [1, '0'],
                x: '1%'
              },
              {
                coord: [1, '400'],
                x: '1%'
              }
            ]
          ]
        },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(243,170,52)'
          }, {
            offset: 1,
            color: 'rgba(239,134,104)'
          }])
        },
        emphasis: {
          focus: 'series'
        },
        data: [120, 140, 232, 101, 264, 90, 340, 250, 180]
      }
    ]
  };

  chart.setOption(option);
  return chart;
}