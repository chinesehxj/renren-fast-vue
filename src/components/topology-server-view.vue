<template>
  <div >
    <el-dialog
      title="服务器详情"
      :visible.sync="visible"
      :close-on-click-modal="false" width="600px"
      :before-close="handleClose" >
    <div v-loading="dataListLoading" style="margin-top:-25px; margin-left:-10px; margin-right:-10px; margin-bottom:-25px;">
      <el-row style="background:#fff;margin-bottom:10px;" :gutter="10">
          <el-col :xs="24" :sm="24" :lg="12" style="margin-top:-5px;width:100%;">
            <el-card shadow='hover' :body-style="{padding:'10px'}">
              <div class="div_item_title" >
                <el-button v-if="serverInfo.isOnline == 1" size="mini" type="success" style="padding:5px;" circle><i class="iconfont el-icon-dms-zaixian" style="font-size:14px;"></i></el-button>
                <el-button v-if="serverInfo.isOnline == 0" size="mini" type="info"  style="padding:5px;"  circle><i class="iconfont el-icon-dms-lixian" style="font-size:14px;"></i></el-button>
                <span style="line-height: 18px;color: rgba(0, 0, 0, 0.45);font-size: 14px;">{{serverInfo.computerName}}</span>
                <span v-if="serverInfo.isOnline == 1" style="line-height: 18px;color: #67C23A;font-size: 12px;">(在线)</span>
                <span v-if="serverInfo.isOnline == 0" style="line-height: 18px;color: gray;font-size: 12px;">(离线)</span>
              </div>
              <line-chart :chart-data="cpuChartData"></line-chart>
              <div>
                <el-row >
                  <el-col :xs="8" :sm="8" :lg="8">
                    <div class="card-panel-location">
                      <i class="iconfont el-icon-dms-icon-test" style="color:#36a3f7;font-size:16px;margin-left:5px;"></i><span style="margin-left:5px;line-height: 18px;color: rgba(0, 0, 0, 0.45);font-size: 14px;">温度:</span>
                    </div>
                    <div v-if="serverInfo.Temperature == null || serverInfo.Temperature == ''">
                        <p  style="height:20px;line-height:20px;font-size:10px;color: rgba(0, 0, 0, 0.45);"><span>暂无数据</span></p>
                    </div>
                    <div v-else>
                        <div style="height:auto;padding:5px 15px 0px 10px;" v-for="item in serverInfo.Temperature">
                            <p style="font-size:10px;color: rgba(0, 0, 0, 0.45);"><span>{{item.deviceName}}</span><span style="float:right;font-size:12px;color: #666;">{{item.sensorValue}} ℃</span></p>
                        </div>
                    </div>
                  </el-col>
                  <el-col :xs="6" :sm="6" :lg="6">
                    <div class="card-panel-location">
                      <i class="iconfont el-icon-dms-neicun" style="color:#36a3f7;font-size:16px;margin-left:5px;"></i><span style="margin-left:5px; line-height: 18px;color: rgba(0, 0, 0, 0.45);font-size: 14px;">内存占用率:</span>
                    </div>
                    <div v-if="serverInfo.Mainboard == null || serverInfo.Mainboard == ''">
                        <p  style="height:20px;line-height:20px;font-size:10px;color: rgba(0, 0, 0, 0.45);"><span>暂无数据</span></p>
                    </div>
                    <div v-else>
                        <div style="height:auto;padding:5px 15px 0px 25px; text-aligh:center;" v-for="item in serverInfo.Mainboard">
                            <p style="height:20px" v-show="item.sensorClass == 'Utilization'">
                                <el-progress :stroke-width="6" type="circle" :width="70" :percentage="parseFloat(item.sensorValue)" color="#8e71c7"></el-progress>
                            </p>
                        </div>
                    </div> 
                  </el-col>
                  <el-col :xs="10" :sm="10" :lg="10">
                    <div class="card-panel-location">
                      <i class="iconfont el-icon-dms-yingpan" style="color:#36a3f7;font-size:16px;margin-left:5px;"></i><span style="margin-left:5px;line-height: 18px;color: rgba(0, 0, 0, 0.45);font-size: 14px;">硬盘占用率:</span>
                    </div>
                    <div v-if="serverInfo.Drive == null || serverInfo.Drive == ''">
                        <p  style="height:20px;line-height:20px;font-size:10px;color: rgba(0, 0, 0, 0.45);"><span>暂无数据</span></p>
                    </div>
                    <div v-else>
                        <div v-for="item in serverInfo.Drive">
                            <div>
                              <span style="font-size:10px;color: rgba(0, 0, 0, 0.45);">{{item.sensorName}}</span><span style="float:right;font-size:12px;color: #666;">{{item.sensorValue}} %</span>
                            </div>
                            <div>
                              <el-progress :stroke-width='8' :percentage="parseFloat(item.sensorValue)" :show-text="false" color="#67C23A"></el-progress>
                            </div>
                        </div> 
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </el-col>
      </el-row>
    </div>
    </el-dialog>
  </div>
</template>

<script>
  import LineChart from '@/components/LineChart'
  export default {
    components: {
      LineChart
    },
    data () {
      return {
        fourCount: {
          onlineCount: 0,
          offlineCount: 0,
          totalCautionCount: 0,
          diskCautionCount: 0,
          offlineCautionCount: 0,
          cpuCautionCount: 0
        },
        serverInfo: '',
        timer: null,
        dataListLoading: false,
        carrierPSNList: '',
        cpuChartData: {
          xAxisName: [],
          countName: 'cpu使用率',
          tableData: []
        },
        servers: [],
        visible: false,
        serverListVisible: false
      }
    },
    methods: {
      init (psn) {
        var vmObject = this
        vmObject.carrierPSNList = psn
        vmObject.visible = true
        vmObject.getDataList(false)
        vmObject.timer = setInterval(
          function () {
            vmObject.getDataList(true)
          }, 120000)
      },
      handleClose (done) {
        if (this.timer) { // 如果定时器还在运行 或者直接关闭，不用判断
          clearInterval(this.timer) // 关闭
        }
        done()
      },
      // 获取首页数据
      getDataList (intervalFlag) {
        console.log(new Date())
        // 获取每个服务器数据
        if (!intervalFlag) {
          this.dataListLoading = true
        }
        this.$http({
          url: this.$http.adornUrl('/home/getCpuUseRate'),
          method: 'post',
          data: this.$http.adornData({
            'carrierPSNList': this.carrierPSNList
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            console.log(data.info[0])
            this.servers = []
            for (var i = 0; i < data.info.length; i++) {
              console.log(data.info[i])
              this.serverInfo = data.info[i]
              this.charData(data.info[i].Processor)
            }
          } else {}
          this.dataListLoading = false
        })
      },
      // 封装走势图数据
      charData (dataList) {
        var xAxisData = []
        var legendData = []
        var seriesData = []
        for (var i = 0; i < dataList.length; i++) {
          var j = i * 2
          if (j < dataList.length) {
            xAxisData.push(dataList[j].timeString)
          }
          var legName = dataList[i].deviceName
          var arrIndex = legendData.indexOf(legName)
          if (arrIndex === -1) {
            legendData.push(legName)
            seriesData.push({'name': legName, 'type': 'line', 'smooth': false, 'data': [dataList[i].sensorValue]})
          } else {
            seriesData[arrIndex].data.push(dataList[i].sensorValue)
          }
        }
        // console.log(xAxisData.length)
        // console.log(seriesData[0].data.length)
        if (xAxisData.length !== 0) {
          this.cpuChartData.xAxisName = xAxisData
          this.cpuChartData.tableData = seriesData[0].data
          // this.servers.push({'serverInfo': this.serverInfo, 'cpuChartData': {'xAxisName': xAxisData, 'countName': 'cpu使用率', 'tableData': seriesData[0].data}})
        } else {
          // this.servers.push({'serverInfo': this.serverInfo, 'cpuChartData': {'xAxisName': '', 'countName': 'cpu使用率', 'tableData': ''}})
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .mod-home {
    line-height: 1.5;
  }
  .el-dialog__body {
    padding: 5px 10px;
  }
  .dashboard-editor-container {
    padding: 32px;
    margin-top: -30px;
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }
  .div_item_title {
    height: 30px;
    border-bottom: 1px solid #eaeef2;
  }
  .panel-group {
    margin-top: 18px;
    .card-panel-col{
      margin-bottom: 32px;
    }
    .icon-svg {
      width: 1em;
      height: 1em;
      fill: currentColor;
      overflow: hidden;
    }
    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);
      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }
        .icon-people {
          background: #40c9c6;
        }
        .icon-message {
          background: #36a3f7;
        }
        .icon-money {
          background: #f4516c;
        }
        .icon-shoppingCard {
          background: #34bfa3
        }
      }
      .icon-people {
        color: #40c9c6;
      }
      .icon-message {
        color: #36a3f7;
      }
      .icon-money {
        color: #f4516c;
      }
      .icon-shoppingCard {
        color: #34bfa3
      }
      .card-panel-icon-wrapper {
        width: 75px;
        height: 75px;
        float: left;
        margin: 14px 0 0 14px;
        padding: 5px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
        font-size: 45px;
      }
      .card-panel-icon {
        float: left;
        font-size: 48px;
      }
      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;
        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
          margin-bottom: 12px;
        }
        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }
  .card-panel-location {
    margin-top: 10px;
    margin-bottom: 5px;
    margin-left: 0px;
    .card-panel-text {
      line-height: 18px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
      margin-bottom: 12px;
    }
    .card-panel-num {
      font-size: 20px;
    }
  }
  .panel-add {
    .card-add-panel {
      cursor: pointer;
      position: relative;
      overflow: hidden;
      background: #fff;
      height: 90px;
      width: 90px;
      margin: 70px auto;
      &:hover {
        .card-add-panel-icon-wrapper {
          color: #fff;
        }
        .icon-add {
          background: rgba(0, 0, 0, 0.45);;
        }
      }
      .icon-add {
        color: rgba(0, 0, 0, 0.45);
        font-weight: 1000;
      }
      .card-add-panel-icon-wrapper {
        width: 75px;
        height: 75px;
        float: left;
        margin: 14px 0 0 14px;
        padding: 5px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
        font-size: 65px;
        border: 1px solid #f2f2f2;
      }
    }
  }
</style>

