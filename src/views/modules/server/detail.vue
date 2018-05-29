<style>
.div_title {
  margin-top: -20px;
  margin-left: -20px;
  margin-right: -20px;
  height: 50px;
  border-bottom: 1px solid #eaeef2;
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
        <div class='div_title'>
            <span class='span_serverName'>{{serverName}}</span>
        </div>
        <div class='content'>
            <el-row style="margin-top:15px;">
                <el-col :span='24'>
                    <el-card shadow='hover'>
                        <div class='div_item_title'>
                            <span class='span_item_title'>cpu信息(Intel Xeon v4 #2)</span>
                        </div>
                        <div>
                            <el-row :gutter='8' style="margin-top:15px;">
                                <el-col :span="14">
                                    <el-card shadow='hover'>
                                        <div class='div_item_title userate_card'>
                                            <span class='span_item_title '>使用率</span>
                                        </div>
                                        <div>
                                            <el-row>
                                                <el-col :span="6" style="text-align:center;padding-top:10px;">
                                                    <!-- <el-progress type="circle" :percentage="80" :stroke-width="10" :width="200" color="#8e71c7"></el-progress> -->
                                                    <i-circle :size="150" :trail-width="4" :stroke-width="5" :percent="80" stroke-linecap="round" stroke-color="#43a3fb">
                                                        <div class="">
                                                            <p class="p_content_item">CPU总使用率</p>
                                                            <h1>80%</h1>
                                                        </div>
                                                    </i-circle>
                                                </el-col>
                                                <el-col :span="18">
                                                    <el-row>
                                                        <el-col :span="6">
                                                            <div id="useRateMutiLine" style="width:500px;height:300px;"></div>
                                                        </el-col>
                                                    </el-row>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </el-card>
                                </el-col>
                                <el-col :span="6">
                                    <el-card shadow='hover'>
                                        <div class='div_item_title temp_card'>
                                            <span class='span_item_title '>温度</span>
                                        </div>
                                        <div>
                                            <el-row>
                                                <el-col :span='18'>
                                                    <div id='tempChart' style='width:150px;height:150px'>
                                                    </div>
                                                </el-col>
                                                <el-col :span='6'>
                                                    <div >
                                                        <p style="height:20px;line-height:20px;font-size:10px">Core #0:20℃</p>
                                                        <p style="height:20px;line-height:20px;font-size:10px">Core #1:10℃</p>
                                                        <p style="height:20px;line-height:20px;font-size:10px">Core #2:60℃</p>
                                                        <p style="height:20px;line-height:20px;font-size:10px">Core #3:70℃</p>
                                                        <p style="height:20px;line-height:20px;font-size:10px">Core #4:50℃</p>
                                                        <p style="height:20px;line-height:20px;font-size:10px">Core #5:90℃</p>
                                                        <p style="height:20px;line-height:20px;font-size:10px">Core #6:50℃</p>
                                                        <p style="height:20px;line-height:20px;font-size:10px">Core #7:40℃</p>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </div>
                                   </el-card>
                                </el-col>
                                <el-col :span="4">
                                    <el-card shadow='hover'>
                                        <div class='div_item_title vol_card'>
                                            <span class='span_item_title '>电压</span>
                                        </div>
                                        <div >
                                            <p style="height:20px;line-height:20px;font-size:10px"><span>VID:</span><span style="color:red">0.757V</span></p>
                                            <p style="height:20px;line-height:20px;font-size:10px"><span>IA Offset:</span><span  style="color:red">0.000V</span></p>
                                            <p style="height:20px;line-height:20px;font-size:10px"><span>GT Offset:</span><span style="color:red">0.000V</span></p>
                                            <p style="height:20px;line-height:20px;font-size:10px"><span>LLC/Ring Offset:</span><span style="color:red">0.000V</span></p>
                                            <p style="height:20px;line-height:20px;font-size:10px"><span>System Agent Offset:</span><span style="color:red">0.000V</span></p>
                                        </div>
                                   </el-card>
                                </el-col>
                            </el-row>
                        </div> 
                    </el-card>
                </el-col>
            </el-row>
            <el-row style="margin-top:15px;">
                <el-col :span='24'>
                    <el-card shadow='never'>
                        <div class='div_item_title'>
                            <span class='span_item_title'>cpu信息(Intel Xeon v4)</span>
                        </div>
                        <div >
                            <el-row style="margin-top:15px;">
                                <el-col :span="24">
                                    <el-card shadow='hover'>
                                        <div class='div_item_title userate_card'>
                                            <span class='span_item_title '>使用率</span>
                                        </div>
                                        <div>
                                            <el-row>
                                                <el-col :span="6" style="text-align:center;padding-top:10px;">
                                                    <!-- <el-progress type="circle" :percentage="80" :stroke-width="10" :width="200" color="#8e71c7"></el-progress> -->
                                                    <i-circle :size="200" :trail-width="4" :stroke-width="5" :percent="80" stroke-linecap="round" stroke-color="#43a3fb">
                                                        <div class="">
                                                            <p class="p_content_item">CPU总使用率</p>
                                                            <h1>80%</h1>
                                                        </div>
                                                    </i-circle>
                                                </el-col>
                                                <el-col :span="18">
                                                    <el-row>
                                                        <el-col :span="6">
                                                            <div id="useRate0" style="width:200px;height:150px;"></div>
                                                        </el-col>
                                                        <el-col :span="6">
                                                            <div id="useRate1" style="width:200px;height:150px;"></div>
                                                        </el-col>
                                                        <el-col :span="6">
                                                            <div id="useRate2" style="width:200px;height:150px;"></div>
                                                        </el-col>
                                                        <el-col :span="6">
                                                            <div id="useRate3" style="width:200px;height:150px;"></div>
                                                        </el-col>
                                                        <el-col :span="6">
                                                            <div id="useRate4" style="width:200px;height:150px;"></div>
                                                        </el-col>
                                                        <el-col :span="6">
                                                            <div id="useRate5" style="width:200px;height:150px;"></div>
                                                        </el-col>
                                                        <el-col :span="6">
                                                            <div id="useRate6" style="width:200px;height:150px;"></div>
                                                        </el-col>
                                                        <el-col :span="6">
                                                            <div id="useRate7" style="width:200px;height:150px;"></div>
                                                        </el-col>
                                                        <el-col :span="6">
                                                            <div id="useRate8" style="width:200px;height:150px;"></div>
                                                        </el-col>
                                                        <el-col :span="6">
                                                            <div id="useRate9" style="width:200px;height:150px;"></div>
                                                        </el-col>
                                                        <el-col :span="6">
                                                            <div id="useRate10" style="width:200px;height:150px;"></div>
                                                        </el-col>
                                                        <el-col :span="6">
                                                            <div id="useRate11" style="width:200px;height:150px;"></div>
                                                        </el-col>
                                                        <el-col :span="6">
                                                            <div id="useRate12" style="width:200px;height:150px;"></div>
                                                        </el-col>
                                                        <el-col :span="6">
                                                            <div id="useRate13" style="width:200px;height:150px;"></div>
                                                        </el-col>
                                                        <el-col :span="6">
                                                            <div id="useRate14" style="width:200px;height:150px;"></div>
                                                        </el-col>
                                                        <el-col :span="6">
                                                            <div id="useRate15" style="width:200px;height:150px;"></div>
                                                        </el-col>
                                                    </el-row>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </el-card>
                                </el-col>
                            </el-row>
                           <el-row :gutter='12' style="margin-top:15px">
                               <el-col :span='18'>
                                   <el-card shadow='hover'>
                                        <div class='div_item_title temp_card'>
                                            <span class='span_item_title '>温度</span>
                                        </div>
                                        <div>
                                            <el-row>
                                                <el-col :span='8'>
                                                    <div id='chart' style='width:300px;height:200px'>
                                                    </div>
                                                </el-col>
                                                <el-col :span='16'>
                                                    <div class="div_temp" style="">
                                                        <div class="div_temp_name" style=""><p>Core #0:20℃</p></div>
                                                        <div class="div_temp_progress" style="">
                                                            <el-progress :stroke-width='16' :percentage='20' :show-text='false'></el-progress>
                                                        </div>
                                                    </div>
                                                    <div class="div_temp" style="">
                                                        <div class="div_temp_name" style=""><p>Core #1:10℃</p></div>
                                                        <div class="div_temp_progress" style="">
                                                            <el-progress :stroke-width='16' :percentage='10' :show-text='false'></el-progress>
                                                        </div>
                                                    </div>
                                                    <div class="div_temp" style="">
                                                        <div class="div_temp_name" style=""><p>Core #2:60℃</p></div>
                                                        <div class="div_temp_progress" style="">
                                                            <el-progress :stroke-width='16' :percentage='60' :show-text='false'></el-progress>
                                                        </div>
                                                    </div>
                                                    <div class="div_temp" style="">
                                                        <div class="div_temp_name" style=""><p>Core #3:70℃</p></div>
                                                        <div class="div_temp_progress" style="">
                                                            <el-progress :stroke-width='16' :percentage='70' :show-text='false'></el-progress>
                                                        </div>
                                                    </div>
                                                    <div class="div_temp" style="">
                                                        <div class="div_temp_name" style=""><p>Core #4:50℃</p></div>
                                                        <div class="div_temp_progress" style="">
                                                            <el-progress :stroke-width='16' :percentage='50' :show-text='false'></el-progress>
                                                        </div>
                                                    </div>
                                                    <div class="div_temp" style="">
                                                        <div class="div_temp_name" style="color:red"><p>Core #5:90℃</p></div>
                                                        <div class="div_temp_progress" style="">
                                                            <el-progress :stroke-width='16' :percentage='90' color="#F56C6C" :show-text='false'></el-progress>
                                                        </div>
                                                    </div>
                                                    <div class="div_temp" style="">
                                                        <div class="div_temp_name" style=""><p>Core #6:50℃</p></div>
                                                        <div class="div_temp_progress" style="">
                                                            <el-progress :stroke-width='16' :percentage='50' :show-text='false'></el-progress>
                                                        </div>
                                                    </div>
                                                    <div class="div_temp" style="">
                                                        <div class="div_temp_name" style=""><p>Core #7:40℃</p></div>
                                                        <div class="div_temp_progress" style="">
                                                            <el-progress :stroke-width='16' :percentage='40' :show-text='false'></el-progress>
                                                        </div>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </div>
                                   </el-card>
                               </el-col>
                               <el-col :span='6'>
                                   <el-card shadow='hover'>
                                        <div class='div_item_title vol_card'>
                                            <span class='span_item_title '>电压</span>
                                        </div>
                                        <div >
                                            <p class="p_content_item"><span>VID:&nbsp;</span><span style="color:red">0.757 V</span></p>
                                            <p class="p_content_item"><span>IA Offset:&nbsp;</span><span  style="color:red">0.000 V</span></p>
                                            <p class="p_content_item"><span>GT Offset:&nbsp;</span><span style="color:red">0.000 V</span></p>
                                            <p class="p_content_item"><span>LLC/Ring Offset:&nbsp;</span><span style="color:red">0.000 V</span></p>
                                            <p class="p_content_item"><span>System Agent Offset:&nbsp;</span><span style="color:red">0.000 V</span></p>
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
                            <div style="height:30px; border-bottom:1px solid #eaeef2">
                                <p class="p_content_item" style="font-size:14px;">HP ProLiant DL388 Gen9</p>
                            </div>
                            <div>
                                <p class="p_content_item" style="font-size:14px;"><span>System Memory:</span><span style="float:right;">15.0%</span></p>
                                <p class="p_content_item" >
                                    <el-progress :stroke-width='8' :percentage='15' :show-text='false' color="#67C23A"></el-progress>
                                </p>
                            </div>
                        </div> 
                    </el-card>
                    <el-card shadow='hover' style="margin-top:15px">
                        <div class='div_item_title'>
                            <span class='span_item_title'>网卡信息</span>
                        </div>
                        <div>
                            <div style="height:30px; border-bottom:1px solid #eaeef2">
                                <p class="p_content_item" style="font-size:14px;">HP Ethernet 1Gb 4-port 331i Adapter</p>
                            </div>
                            <div>
                                <p class="p_content_item" style="font-size:14px;"><span>Sent</span><span style="float:right;">680283801 Bytes</span></p>
                                <p class="p_content_item" style="font-size:14px;"><span>Received</span><span style="float:right;">4629440693 Bytes</span></p>
                            </div>
                        </div> 
                    </el-card>
                </el-col>
                <el-col :span='6'>
                    <el-card shadow='hover'>
                        <div class='div_item_title'>
                            <span class='span_item_title'>内存信息</span>
                        </div>
                        <div>
                            <div style="height:30px; border-bottom:1px solid #eaeef2">
                                <p class="p_content_item">Hyundai Electronics DDR4-2400</p>
                            </div>
                            <div>
                                <p class="p_content_item"><span>Temperature</span><span style="float:right;">27℃</span></p>
                            </div>
                            <div style="height:30px; border-bottom:1px solid #eaeef2">
                                <p class="p_content_item">Hyundai Electronics DDR4-2400 #2</p>
                            </div>
                            <div>
                                <p class="p_content_item"><span>Temperature</span><span style="float:right;">25℃</span></p>
                            </div>
                        </div> 
                    </el-card>
                </el-col>
                <el-col :span='6'>
                    <el-card shadow='hover'>
                        <div class='div_item_title'>
                            <span class='span_item_title'>硬盘信息</span>
                        </div>
                        <div>
                            <div style="height:30px; border-bottom:1px solid #eaeef2">
                                <p class="p_content_item" style="font-size:14px;">HP LOGICAL VOLUME</p>
                            </div>
                            <div>
                                <p class="p_content_item" style="font-size:14px;"><span>Space (c:)</span><span style="float:right;">51.3%</span></p>
                                <p class="p_content_item" >
                                    <el-progress :stroke-width='8' :percentage='51.3' :show-text='false' color="#67C23A"></el-progress>
                                </p>
                            </div>
                            <div>
                                <p class="p_content_item" style="font-size:14px;"><span>Space (d:)</span><span style="float:right;">44.7%</span></p>
                                <p class="p_content_item" >
                                    <el-progress :stroke-width='8' :percentage='44.7' :show-text='false' color="#67C23A"></el-progress>
                                </p>
                            </div>
                            <div>
                                <p class="p_content_item" style="font-size:14px;"><span>Space (e:)</span><span style="float:right;">77.0%</span></p>
                                <p class="p_content_item" >
                                    <el-progress :stroke-width='8' :percentage='77' :show-text='false' color="#67C23A"></el-progress>
                                </p>
                            </div>
                            <div style="height:30px; border-bottom:1px solid #eaeef2">
                                <p class="p_content_item" style="font-size:14px;">HP LOGICAL VOLUME #2</p>
                            </div>
                            <div>
                                <p class="p_content_item" style="font-size:14px;"><span>Space (f:)</span><span style="float:right;">0.1%</span></p>
                                <p class="p_content_item" >
                                    <el-progress :stroke-width='8' :percentage='0.1' :show-text='false' color="#67C23A"></el-progress>
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
                            <div style="height:30px; border-bottom:1px solid #eaeef2">
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
export default {
  data () {
    return {
      serverName: '服务器详情',
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  mounted () {
    this.initChart()
    this.initTempChart()
    this.initMutiLineChart()
    this.initLineChart(0)
    this.initLineChart(1)
    this.initLineChart(2)
    this.initLineChart(3)
    this.initLineChart(4)
    this.initLineChart(5)
    this.initLineChart(6)
    this.initLineChart(7)
    this.initLineChart(8)
    this.initLineChart(9)
    this.initLineChart(10)
    this.initLineChart(11)
    this.initLineChart(12)
    this.initLineChart(13)
    this.initLineChart(14)
    this.initLineChart(15)
  },
  methods: {
    // 加载仪表盘图
    initChart () {
      var chartVar = echarts.init(document.getElementById('chart'), 'macarons')

      var option = {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}'
        },
        series: [
          {
            name: '温度',
            type: 'gauge',
            detail: { formatter: '{value}', fontSize: 10 },
            axisLabel: { fontSize: 10 },
            data: [{ value: 50, name: '' }]
          }
        ]
      }
      setInterval(function () {
        option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0
        chartVar.setOption(option, true)
      }, 2000)
    },
    // 加载折线图
    initLineChart (num) {
      var lineChart = echarts.init(document.getElementById('useRate' + num), 'macarons')
      var lineOption = {
        title: {
          text: 'core #' + num,
          textStyle: {
            align: 'center',
            fontSize: 10
          },
          left: 'center'
        },
        grid: {
          top: 20
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            fontSize: 10
          },
          data: ['10:01:54', '10:02:54', '10:03:54', '10:04:54', '10:05:54', '10:06:54', '10:07:54', '10:08:54', '10:09:54', '10:10:54']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            fontSize: 10
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        series: [{
          data: [10, 20, 60, 30, 80, 40, 10, 35, 20, 45],
          type: 'line',
          smooth: false
        }]
      }
      lineChart.setOption(lineOption)
    },
    // 加载小仪表
    initTempChart () {
      var chartVar = echarts.init(document.getElementById('tempChart'), 'macarons')

      var option = {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}'
        },
        series: [
          {
            name: '温度',
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
            data: [{ value: 50, name: '' }]
          }
        ]
      }
      setInterval(function () {
        option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0
        chartVar.setOption(option, true)
      }, 2000)
    },
    // 加载多折线
    initMutiLineChart () {
      var mutiLineChart = echarts.init(document.getElementById('useRateMutiLine'), 'macarons')
      var option = {
        title: {
          text: 'CPU使用率',
          textStyle: {
            align: 'center',
            fontSize: 14
          },
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: 'bottom',
          data: ['core #0', 'core #1', 'core #2', 'core #3', 'core #4', 'core #5', 'core #6', 'core #7']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          top: 30,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['16:47:24', '16:48:24', '16:49:24', '16:50:24', '16:51:24', '16:52:24', '16:53:24', '16:54:24', '16:55:24', '16:56:24']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'core #0',
            type: 'line',
            stack: 'a',
            data: [10, 20, 60, 30, 80, 40, 10, 35, 20, 45],
            smooth: false
          },
          {
            name: 'core #1',
            type: 'line',
            stack: 'b',
            data: [10, 25, 60, 70, 40, 60, 20, 55, 10, 25],
            smooth: false
          },
          {
            name: 'core #2',
            type: 'line',
            stack: 'c',
            data: [30, 50, 20, 40, 70, 10, 30, 55, 25, 85],
            smooth: false
          },
          {
            name: 'core #3',
            type: 'line',
            stack: 'd',
            data: [20, 30, 50, 40, 30, 14, 25, 15, 15, 45],
            smooth: false
          },
          {
            name: 'core #4',
            type: 'line',
            stack: 'e',
            data: [60, 20, 50, 30, 33, 41, 65, 5, 55, 25],
            smooth: false
          },
          {
            name: 'core #5',
            type: 'line',
            stack: 'f',
            data: [70, 40, 60, 20, 0, 14, 13, 14, 15, 15],
            smooth: false
          },
          {
            name: 'core #6',
            type: 'line',
            stack: 'g',
            data: [15, 25, 24, 26, 35, 13, 14, 11, 22, 23],
            smooth: false
          },
          {
            name: 'core #7',
            type: 'line',
            stack: 'h',
            data: [34, 35, 23, 24, 25, 12, 12, 11, 1, 2],
            smooth: false
          }
        ]
      }
      mutiLineChart.setOption(option)
    }
  }
}
</script>