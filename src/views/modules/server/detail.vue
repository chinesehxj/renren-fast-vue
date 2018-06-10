<style>
.div_title {
  margin-top: -20px;
  margin-left: -20px;
  margin-right: -20px;
  height: 50px;
  border-bottom: 1px solid #eaeef2;
  background-color: white;
}
.span_serverName {
  margin-left: 20px;
  line-height: 50px;
  font-size: 18px;
  font-weight: bold;
  color: dimgrey;
}
.content {
  margin-top: 20px;
}
.div_item_title {
  margin-top: -20px;
  margin-left: -20px;
  margin-right: -20px;
  height: 30px;
  text-align: center;
  border-bottom: 1px solid #eaeef2;
}
.span_item_title {
  line-height: 30px;
  font-size: 14px;
}
.div_temp {
  overflow: hidden;
  margin-top: 8px;
}
.div_temp_name {
  width:100px;
  float:left;
}
.div_temp_progress {
  width:400px;
  float:left;
}
.temp_card {
    background-color: #b3d8ff;
}
.vol_card {
    background-color: #c2e7b0;
}
.p_content_item {
    line-height: 30px;height:30px;font-size:14px;
}
.userate_card {
    background-color: #f5dab1;
}
</style>
<template>
    <div>
        <Affix :offset-top="120">
            <div class='div_title'>
                
                <span class='span_serverName'>{{computerName}} 详情信息</span>
                <span style="font-size: 14px;margin-left: 10px;color: #919191;">(最新数据采集于:{{collectTime}})</span>
                <span class='span_serverName' style="float:right;margin-right:10px;">
                    <el-button @click="goBack" size="small" icon="el-icon-back" type="primary" plain>返回</el-button>
                </span>
            </div>
        </Affix>
        <div class='content'>
            <el-row style="margin-top:15px;">
                <el-col :span='24'>
                    <el-card shadow='hover'>
                        <div class='div_item_title'>
                            <span class='span_item_title'>cpu信息</span>
                        </div>
                        <div>
                            <el-row :gutter='8' >
                                <el-col :span="18" style="margin-top:15px;">
                                    <el-card shadow='hover'>
                                        <div class='div_item_title userate_card'>
                                            <span class='span_item_title '>使用率</span>
                                        </div>
                                        <div>
                                            <el-row>
                                                <el-col :span="5" style="text-align:center;padding-top:10px;">
                                                    <!-- <el-progress type="circle" :percentage="80" :stroke-width="10" :width="200" color="#8e71c7"></el-progress> -->
                                                    <div id="gaugeChart" style='width:150px;height:150px' >
                                                    </div>
                                                </el-col>
                                                <el-col :span="19">
                                                    <div id="lineChart" style="width:650px;height:300px;" ></div>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </el-card>
                                </el-col>
                                <el-col :span="6" style="margin-top:15px;">
                                    <el-card shadow='hover'>
                                        <div class='div_item_title temp_card'>
                                            <span class='span_item_title '>温度</span>
                                        </div>
                                        <div>
                                            <div v-if="cpuInfo.Temperature == null || cpuInfo.Temperature == ''">
                                                <p  style="height:20px;line-height:20px;font-size:12px;"><span>暂无数据</span></p>
                                            </div>
                                            <div v-else>
                                                <el-row>
                                                    <div v-for="item in cpuInfo.Temperature">
                                                        <el-col :span='12' >
                                                            <div style="margin-top:10px;">
                                                                <i-circle :size="110" :trail-width="4" :stroke-width="5" :percent="item.sensorValue" stroke-linecap="round" stroke-color="#43a3fb">
                                                                    <div class="">
                                                                        
                                                                        <Icon type="thermometer" size="25" color="#43a3fb"></Icon>
                                                                        <h1 style="color:#43a3fb">{{item.sensorValue}}℃</h1>
                                                                    </div>
                                                                </i-circle>
                                                                <p class="p_content_item" style="font-size:12px;text-align: center;">{{item.deviceName}}</p>
                                                            </div>
                                                        </el-col>
                                                    </div>
                                                </el-row>
                                            </div>
                                        </div>
                                   </el-card>
                                </el-col>
                                <el-col :span="6" style="margin-top:15px;">
                                    <el-card shadow='hover'>
                                        <div class='div_item_title vol_card'>
                                            <span class='span_item_title '>电压</span>
                                        </div>
                                        <div v-if="cpuInfo.Voltage == null || cpuInfo.Voltage == ''">
                                            <p  style="height:20px;line-height:20px;font-size:12px;"><span>暂无数据</span></p>
                                        </div>
                                        <div v-else>
                                            <div v-for="VoltageItem in cpuInfo.Voltage">
                                                <div v-show="isNewItem(VoltageItem.deviceName)" style="height:30px; margin-top:10px;  border-bottom:1px solid #eaeef2">
                                                    <p class="p_content_item">{{VoltageItem.deviceName}}</p>
                                                </div>
                                                <div>
                                                    <p class="p_content_item" style="font-size:12px;"><span>{{VoltageItem.sensorName}}</span><span style="float:right;">{{VoltageItem.sensorValue}} V</span></p>
                                                </div>
                                            </div>
                                        </div>
                                   </el-card>
                                </el-col>
                            </el-row>
                        </div> 
                    </el-card>
                </el-col>
            </el-row>
            <el-row :gutter='12' style="margin-top:15px">
                <el-col :span='6'>
                    <el-card shadow='hover'>
                        <div class='div_item_title'>
                            <span class='span_item_title'>主板信息</span>
                        </div>
                        <div>
                            <div style="height:30px; margin-top:10px;  border-bottom:1px solid #eaeef2">
                                <p class="p_content_item" style="font-size:14px;"><span>计算机名:</span><span style="float:right;">{{computerName}}</span></p>
                            </div>
                            <div style="height:30px; margin-top:10px;  border-bottom:1px solid #eaeef2">
                                <p class="p_content_item" style="font-size:14px;"><span>主板型号:</span><span style="float:right;">{{mainBoardVender}}</span></p>
                            </div>
                            <div style="height:auto;margin-top:10px;  border-bottom:1px solid #eaeef2" v-for="item in mainBoardList">
                                <p class="p_content_item" style="font-size:14px;"><span>{{item.sensorName}}</span><span style="float:right;">{{item.sensorValue}}{{item.sensorUnit}}</span></p>
                                <p style="height:20px" v-show="item.sensorClass == 'Utilization'">
                                    <el-progress :stroke-width="8" :percentage="item.sensorValue" :show-text="false" color="#67C23A"></el-progress>
                                </p>
                            </div>
                        </div> 
                    </el-card>
                    <el-card shadow='hover' style="margin-top:15px">
                        <div class='div_item_title'>
                            <span class='span_item_title'>内存信息</span>
                        </div>
                        <div v-if="memoryList == null || memoryList == ''">
                            <p  style="height:20px;line-height:20px;font-size:12px;"><span>暂无数据</span></p>
                        </div>
                        <div v-else>
                            <div v-for="item in memoryList">
                                <div style="height:30px; margin-top:10px;  border-bottom:1px solid #eaeef2">
                                    <p class="p_content_item">{{item.deviceName}}</p>
                                </div>
                                <div>
                                    <p class="p_content_item"><span>{{item.sensorName}}</span><span style="float:right;">{{item.sensorValue}} {{item.sensorUnit}}</span></p>
                                </div>
                            </div> 
                        </div>
                        
                    </el-card>
                </el-col>
                <el-col :span='6'>
                    <el-card shadow='hover'>
                        <div class='div_item_title'>
                            <span class='span_item_title'>网卡信息</span>
                        </div>
                        <div v-for="(item,index) in networkIntface">
                            <div v-if="(index % 2) == 0">
                            <div style="height:auto;margin-top:10px;  border-bottom:1px solid #eaeef2" >
                                <p class="p_content_item" style="font-size:14px; height:auto;" >{{item.deviceName}}</p>
                            </div>
                            <div>
                                <p class="p_content_item" style="font-size:12px; height:auto;"><span>{{item.sensorName}}</span><span style="float:right;">{{item.sensorValue}} {{item.sensorUnit}}</span></p>
                            </div>
                            </div>
                            <div style="height:auto; border-bottom:1px solid #eaeef2" v-else>
                                <p class="p_content_item" style="font-size:12px; height:auto;"><span>{{item.sensorName}}</span><span style="float:right;">{{item.sensorValue}} {{item.sensorUnit}}</span></p>
                            </div>
                        </div> 
                    </el-card>
                </el-col>
                <el-col :span='6'>
                    <el-card shadow='hover'>
                        <div class='div_item_title'>
                            <span class='span_item_title'>硬盘信息</span>
                        </div>
                        <div v-for="item in driverList">
                            <div style="height:30px; margin-top:10px; border-bottom:1px solid #eaeef2" v-show="isNewItem(item.deviceName)">
                                <p class="p_content_item" style="font-size:14px;">{{item.deviceName}}</p>
                            </div>
                            <div>
                                <p class="p_content_item" style="font-size:12px;"><span>{{item.sensorName}}</span><span style="float:right;">{{item.sensorValue}} {{item.sensorUnit}}</span></p>
                                <p style="height:20px" >
                                    <el-progress :stroke-width='8' :percentage="item.sensorValue" :show-text='false' color="#67C23A"></el-progress>
                                </p>
                            </div>
                        </div> 
                    </el-card>
                </el-col>
                
                <el-col :span='6'>
                    <el-card shadow='hover'>
                        <div class='div_item_title'>
                            <span class='span_item_title'>显卡信息</span>
                        </div>
                        <div>
                            <div style="height:30px; margin-top:10px; border-bottom:1px solid #eaeef2">
                                <p class="p_content_item" style="font-size:14px;">NVIDIA GeForce GT 630</p>
                            </div>
                            <div>
                                <p class="p_content_item"><span>GPU Temperature</span><span style="float:right;">31℃</span></p>
                            </div>
                            <div>
                                <p class="p_content_item"><span>FANPWMIN0</span><span style="float:right;">25</span></p>
                            </div>
                            <div>
                                <p class="p_content_item"><span>GPU Utilization</span><span style="float:right;">0.0%</span></p>
                                <p class="p_content_item" >
                                    <el-progress :stroke-width='8' :percentage='0.0' :show-text='false' color="#67C23A"></el-progress>
                                </p>
                            </div>
                            <div>
                                <p class="p_content_item"><span>Frame Buffer</span><span style="float:right;">4.0%</span></p>
                                <p class="p_content_item" >
                                    <el-progress :stroke-width='8' :percentage='4.0' :show-text='false' color="#67C23A"></el-progress>
                                </p>
                            </div>
                            <div>
                                <p class="p_content_item"><span>Video Engine</span><span style="float:right;">0.0%</span></p>
                                <p class="p_content_item" >
                                    <el-progress :stroke-width='8' :percentage='0.0' :show-text='false' color="#67C23A"></el-progress>
                                </p>
                            </div>
                            <div>
                                <p class="p_content_item"><span>Bus Interface</span><span style="float:right;">0.0%</span></p>
                                <p class="p_content_item" >
                                    <el-progress :stroke-width='8' :percentage='0.0' :show-text='false' color="#67C23A"></el-progress>
                                </p>
                            </div>
                            <div>
                                <p class="p_content_item"><span>Memory</span><span style="float:right;">16.1%</span></p>
                                <p class="p_content_item" >
                                    <el-progress :stroke-width='8' :percentage='16.1' :show-text='false' color="#67C23A"></el-progress>
                                </p>
                            </div>
                        </div> 
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons')
let newItemNameFlag = ''
var xAxisData = []
var legendData = []
var seriesData = []
export default {
  data () {
    return {
      collectTime: '',
      networkIntfaceName: '',
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      mainBoardList: [],
      networkIntface: [],
      memoryList: [],
      driverList: [],
      cpuInfo: '',
      viewerList: [],
      computerName: '',
      mainBoardVender: '',
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      paramsPsn: ''
    }
  },
  mounted () {
    // this.initChart()
    // this.initTempChart()
    // this.initMutiLineChart()
  },
  methods: {
    goBack () {
      this.$emit('refreshDataList')
    },
    isNewItem (itemName) {
      if (newItemNameFlag === itemName) {
        return false
      } else {
        newItemNameFlag = itemName
        return true
      }
    },
    initView (psn) {
      // 初始化数据
      xAxisData.splice(0, xAxisData.length)
      legendData.splice(0, legendData.length)
      seriesData.splice(0, seriesData.length)
      this.paramsPsn = psn
      this.getDataList()
      var vmObject = this
      setInterval(
        function () {
          vmObject.getDataList()
        }, 120000)
    },
    getDataList () {
      this.$http({
        url: this.$http.adornUrl('/device/info'),
        method: 'get',
        params: this.$http.adornParams({
          'carrierpsn': this.paramsPsn
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          console.log(data)
          this.mainBoardList = data.info.Mainboard
          // this.serverName = data.info.Mainboard[0].computerName
          this.collectTime = data.info.Mainboard[0].dateTimeStr
          this.computerName = data.info.Mainboard[0].computerName
          this.mainBoardVender = data.info.Mainboard[0].deviceName
          this.networkIntface = data.info.NetworkInterface
          this.memoryList = data.info.MemoryModule
          this.driverList = data.info.Drive
        } else {}
      })
      this.$http({
        url: this.$http.adornUrl('/device/cpuInfo'),
        method: 'get',
        params: this.$http.adornParams({
          'carrierpsn': this.paramsPsn
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          console.log(data)
          this.cpuInfo = data.info
          charData(data.info.Utilization)
        } else {}
      })
    }
  }
}
function charData (dataList) {
  var utilValue = 0
  xAxisData.push(dataList[0].timeString)
  for (var i = 0; i < dataList.length; i++) {
    var legName = dataList[i].deviceName
    var arrIndex = legendData.indexOf(legName)
    utilValue = parseFloat(utilValue) + parseFloat(dataList[i].sensorValue)
    if (arrIndex === -1) {
      legendData.push(legName)
      seriesData.push({'name': legName, 'type': 'line', 'smooth': false, 'data': [dataList[i].sensorValue]})
    } else {
      seriesData[arrIndex].data.push(dataList[i].sensorValue)
    }
  }
  normalLineChart('lineChart', 'cpu使用率', JSON.stringify(legendData), '%', JSON.stringify(xAxisData), JSON.stringify(seriesData))
  initGaugeChart(utilValue / dataList.length)
}
function normalLineChart (domId, title, legendData, unitStr, xAxisData, seriesData) {
  var myChart = echarts.init(document.getElementById(domId), 'macarons')
  // 指定图表的配置项和数据
  var option = {
    title: {
      text: title,
      textStyle: {
        align: 'center',
        fontSize: 14
      },
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: 40,
      containLabel: true
    },
    legend: {
      top: 'bottom',
      data: (new Function('return ' + legendData))(),
      textStyle: {
        fontSize: 10
      }
    },
    backgroundColor: 'rgba(128, 128, 128, 0.0)',
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: (new Function('return ' + xAxisData))()
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} ' + unitStr
      }
    },
    series: (new Function('return ' + seriesData))()
  }
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option)
}
// 加载小仪表
function initGaugeChart (utilizationValue) {
  var chartVar = echarts.init(document.getElementById('gaugeChart'), 'macarons')
  var option = {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}'
    },
    title: {
      text: 'cpu平均使用率',
      textStyle: {
        align: 'center',
        fontSize: 14
      },
      x: 'center',
      y: 'bottom'
    },
    series: [{
      name: '使用率',
      type: 'gauge',
      grid: {
        right: 10,
        top: 10,
        bottom: 10,
        left: 10
      },
      detail: { formatter: '{value}', fontSize: 10 },
      axisLabel: { fontSize: 8 },
      axisLine: {
        lineStyle: {
          width: 5
        }
      },
      axisTick: {
        length: 7
      },
      splitLine: {
        length: 10
      },
      data: [{ value: utilizationValue, name: '' }]
    }]
  }
  chartVar.setOption(option, true)
}
</script>