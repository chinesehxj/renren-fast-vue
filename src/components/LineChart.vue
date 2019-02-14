<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '190px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object
    }
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.initChart()
    if (this.autoResize) {
      this.__resizeHanlder = () => {
        if (this.chart) {
          this.chart.resize()
        }
      }
      window.addEventListener('resize', this.__resizeHanlder)
    }

    // 监听侧边栏的变化
    const sidebarElm = document.getElementsByClassName('site-sidebar')[0]
    // modified by hexiaojun 2018-12-18
    if (sidebarElm) {
      sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler (val) {
        this.setOptions(val)
      }
    }
  },
  methods: {
    setOptions ({ xAxisName, countName, tableData } = {}) {
      this.chart.setOption({
        grid: {
          x2: 1000,
          left: 20,
          right: 20,
          bottom: 40,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        xAxis: {
          data: xAxisName,
          textStyle: {
            color: 'red'
          },
          boundaryGap: false,
          axisTick: {
            show: false
          },
          type: 'category'
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        dataZoom: [{
          type: 'slider',
          start: 90,
          end: 100,
          bottom: 5
        }],
        series: [{
          name: countName,
          itemStyle: {
            normal: {
              color: '#66FFFF',
              lineStyle: {
                color: '#66FFFF',
                width: 2
              }
            }
          },
          areaStyle: {
            color: '#99FFFF',
            opacity: 0.5
          },
          smooth: true,
          type: 'line',
          data: tableData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        }]
      })
    },
    initChart () {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    }
  }
}
</script>
