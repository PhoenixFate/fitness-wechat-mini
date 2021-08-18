import echarts from '../../ec-canvas/echarts'

const oneRepMax = {
  1: 1,
  2: 0.95,
  3: 0.93,
  4: 0.90,
  5: 0.87,
  6: 0.85,
  7: 0.83,
  8: 0.80,
  9: 0.77,
  10: 0.75
}

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // 像素
  });
  canvas.setChart(chart);
  const renderData = handleData()
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    toolbox: {
      // feature: {
      //   dataView: {show: true, readOnly: false},
      //   magicType: {show: true, type: ['line', 'bar']},
      //   restore: {show: true},
      //   saveAsImage: {show: true}
      // }
    },
    legend: {
      data: renderData.legendData
    },
    xAxis: [
      {
        type: 'category',
        data: renderData.xAxisData,
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: renderData.yAxis,
    series: renderData.series
  };

  chart.setOption(option);
  return chart;
}

function handleData() {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]

  const currentDonePlan = wx.getStorageSync('trainingAid')
  const exerciseList = currentDonePlan.classInfo.exercises
  const actionSetsArr = exerciseList.map(item => item.actionSets).flat()
  currentPage.setData({actionSetsArr})
  const currentActionSet = actionSetsArr.filter(item => String(item.actionSetCustomerId) === currentPage.data.actionSetId)[0] || {}
  /*-------*/
  const legendData = currentActionSet.actions.map(item => item.actionName)

  /*-------*/
  const xAxisDataNumber = currentActionSet.actions[0].oneSets.length
  let xAxisDataArr = []
  for (let i = 0; i < xAxisDataNumber; i++) {
    xAxisDataArr.push(`第${i + 1}组`)
  }
  /*-------*/
  const yAxis = [{
    splitLine: {
      show: false
    },
    type: 'value',
    name: '容量',
    // min: 0,
    // max: 250,
    // interval: 50,
    axisLabel: {
      formatter: '{value}'
    }
  }]
  const series = []
  const createSeriesItem = ({name, data}) => ({
    name: name,
    barGap: 0,
    type: 'bar',
    data: data,
    label: {
      show: true,
      position: 'inside'
    },
  })
  currentActionSet.actions.forEach(item => {
    const actionName = item.actionName
    const data = []
    item.oneSets.forEach(value => {
      data.push(value.realCount * value.realWeight)
    })
    series.push(createSeriesItem({name: actionName, data}))
  })
  if (currentActionSet.actionSetType === 'COMMON_SET') {
    // 普通组增加 这先谢谢标签
    legendData.push('最大重量')
    // 增加Y轴
    yAxis.push({
      splitLine: {
        show: false
      },
      type: 'value',
      name: '最大重量',
      // min: 0,
      // max: 25,
      // interval: 5,
      axisLabel: {
        formatter: '{value} kg'
      }
    })
    // 增加X轴数据
    const data = []
    currentActionSet.actions.forEach(item => {
      item.oneSets.forEach(value => {
        data.push((value.realWeight / (oneRepMax[value.realCount])).toFixed(2))
      })
    })
    series.push({
      name: '最大重量',
      type: 'line',
      yAxisIndex: 1,
      label: {
        show: true,
        position: 'top'
      },
      data: data
    })
  }
  return {
    legendData,
    xAxisData: xAxisDataArr,
    yAxis,
    series
  }
}

Page({
  data: {
    actionSetId: '',
    actionSetsArr: [],
    ec: {
      onInit: initChart
    }
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({actionSetId: options.actionSetId})
  }
});
