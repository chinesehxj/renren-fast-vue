<template>
  <div class="dashboard-editor-container">
    <el-row style="margin-top:20px;">
      <el-col :xs="7" :sm="7" :lg="7" >
        <div style="margin-left:30px;margin-top:20px;">
          <span style="font-size:18px;color:#2ACEF4">{{ nowTime | formatDate }}</span>
        </div>
      </el-col>
      <el-col :xs="10" :sm="10" :lg="10" >
        <el-row >
          <el-col :xs="4" :sm="4" :lg="4" >
            <div style="text-align:right;height:50px;">
              <img src="~@/assets/img/title_left.png"/>
            </div>
          </el-col>
          <el-col :xs="16" :sm="16" :lg="16">
            <div style="text-align:center;height:45px;" @click="gotoNext">
              <span style="line-height:45px;color:white;font-size:30px;letter-spacing:3px;font-weight:bold;margin-left:10px;margin-right:10px">HORUS平台大屏监控</span>
            </div>
          </el-col>
          <el-col :xs="4" :sm="4" :lg="4">
            <div style="text-align:left;height:50px;">
              <img src="~@/assets/img/title_right.png"/>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xs="7" :sm="7" :lg="7" >

      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top:20px;">
      <el-col :xs="9" :sm="9" :lg="9" >
        <div class="sumDataLeft">
          <el-row>
            <el-col :xs="5" :sm="5" :lg="5" >
              <div style="height:137px;">
                <img style="margin-top:35px;margin-left:30px;" src="~@/assets/img/online.png" />
              </div>
            </el-col>
            <el-col :xs="7" :sm="7" :lg="7">
              <div style="height:58px;margin-top:10px;border-right:1px dashed #FFFFFD;padding-top: 20px;">
                <span style="font-size:20px;color:#FFFFFD;letter-spacing:2px;">当前在线数</span>
              </div>
              <div style="height:69px;margin-top:-10px;border-right:1px dashed #FFFFFD;">
                <count-to style="font-size:35px;font-weight:bold;color:#FFFFFD;" :startVal="0" :endVal="parseInt(fourCount.onlineCount)" :duration="2000"></count-to>
              </div>
            </el-col>
            <el-col :xs="5" :sm="5" :lg="5" >
              <div style="height:137px;">
                <img style="margin-top:35px;margin-left:30px;" src="~@/assets/img/offline.png" />
              </div>
            </el-col>
            <el-col :xs="7" :sm="7" :lg="7" >
              <div style="height:58px;margin-top:10px;padding-top: 20px;">
                <span style="font-size:20px;color:#FFFFFD;letter-spacing:2px;">当前离线数</span>
              </div>
              <div style="height:69px;margin-top:-10px;">
                <count-to style="font-size:35px;font-weight:bold;color:#FFFFFD;" :startVal="0" :endVal="parseInt(fourCount.offlineCount)" :duration="2000"></count-to>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :xs="15" :sm="15" :lg="15" >
        <div class="sumDataRight"> 
          <el-row>
            <el-col :xs="3" :sm="3" :lg="3" >
              <div style="height:137px;">
                <img style="margin-top:43px;margin-left:35px;" src="~@/assets/img/alarm.png" />
              </div>
            </el-col>
            <el-col :xs="4" :sm="4" :lg="4" >
              <div style="height:58px;margin-top:10px;border-right:1px dashed #FFFFFD;padding-top: 20px;">
                <span style="font-size:20px;color:#FFFFFD;letter-spacing:2px;">今日告警总数</span>
              </div>
              <div style="height:69px;margin-top:-10px;border-right:1px dashed #FFFFFD;">
                <count-to style="font-size:35px;font-weight:bold;color:#FFFFFD;" :startVal="0" :endVal="parseInt(fourCount.totalCautionCount)" :duration="2000"></count-to>
              </div>
            </el-col>
            <el-col :xs="5" :sm="5" :lg="5" >
              <div style="height:58px;margin-top:10px;padding-top: 20px;">
                <img style="margin-left:20px;" src="~@/assets/img/offline_s.png" />
                <span style="font-size:14px;margin-left:5px;color:#FFFFFD;letter-spacing:2px;line-height: 38px;">下线告警总数</span>
              </div>
              <div style="height:69px;margin-top:-10px;">
                <count-to style="font-size:35px;font-weight:bold;color:#FFFFFD;margin-left: 65px;" :startVal="0" :endVal="parseInt(fourCount.offlineCautionCount)" :duration="2000"></count-to>
                <span style="font-size:14px;color:#FFFFFD;">次</span>
              </div>
            </el-col>
            <el-col :xs="6" :sm="6" :lg="6" >
              <div style="height:58px;margin-top:10px;padding-top: 20px;">
                <img style="" src="~@/assets/img/chip.png" />
                <span style="font-size:14px;margin-left:5px;color:#FFFFFD;letter-spacing:2px;line-height: 38px;">CPU温度过高告警数</span>
              </div>
              <div style="height:69px;margin-top:-10px;">
                <count-to style="font-size:35px;font-weight:bold;color:#FFFFFD;margin-left: 65px;" :startVal="0" :endVal="parseInt(fourCount.cpuCautionCount)" :duration="2000"></count-to>
                <span style="font-size:14px;color:#FFFFFD;">次</span>
              </div>
            </el-col>
            <el-col :xs="6" :sm="6" :lg="6" >
              <div style="height:58px;margin-top:10px;padding-top: 20px;">
                <img style="" src="~@/assets/img/disk.png" />
                <span style="font-size:14px;margin-left:5px;color:#FFFFFD;letter-spacing:2px;line-height: 38px;">磁盘可用空间过低告警数</span>
              </div>
              <div style="height:69px;margin-top:-10px;">
                <count-to style="font-size:35px;font-weight:bold;color:#FFFFFD;margin-left: 65px;" :startVal="0" :endVal="parseInt(fourCount.diskCautionCount)" :duration="2000"></count-to>
                <span style="font-size:14px;color:#FFFFFD;">次</span>
              </div>
            </el-col>
          </el-row>

        </div>
      </el-col>
    </el-row>





    <div v-loading="dataListLoading" style="height: 840px;">
      <el-row style="" :gutter="10" v-for="(serItem,index) in servers"  :key="index">
        <div v-if="index % 2 == 0">
          <el-col :xs="24" :sm="24" :lg="12" style="margin-top:10px;" :key="index">
            <div style="border-radius:10px; padding: 10px;background-color:#1C1E4F">
              <div class="div_item_title" >
                <el-button v-if="servers[index].serverInfo.isOnline == 1" size="mini" type="primary" style="padding:5px;" circle><i class="iconfont el-icon-dms-zaixian" style="font-size:14px;"></i></el-button>
                <el-button v-if="servers[index].serverInfo.isOnline == 0" size="mini" type="info"  style="padding:5px;"  circle><i class="iconfont el-icon-dms-lixian" style="font-size:14px;"></i></el-button>
                <span style="line-height: 18px;color: white ;font-size: 14px;">{{servers[index].serverInfo.computerName}}</span>
                <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-delete" round @click="removeServer(servers[index].serverInfo.carrierpsn)">移除</el-button>
              </div>
              <line-chart :chart-data="servers[index].cpuChartData"></line-chart>
              <div>
                <el-row style="margin-top:10px;height: 160px;">
                  <el-col :xs="8" :sm="8" :lg="8" style="border-right:1px dashed white;">
                    <div class="card-panel-location">
                      <i class="iconfont el-icon-dms-icon-test" style="color:#66FFFF;font-size:16px;margin-left:5px;"></i><span style="margin-left:5px;line-height: 18px;color: white;font-size: 14px;">温度:</span>
                    </div>
                    <div v-if="servers[index].serverInfo.Temperature == null || servers[index].serverInfo.Temperature == ''">
                        <p  style="height:20px;line-height:20px;font-size:10px;color: white;"><span>暂无数据</span></p>
                    </div>
                    <div style="height:130px;" v-else>
                      <el-row>
                        <el-col :xs="12" :sm="12" :lg="12" v-for="item in servers[index].serverInfo.Temperature" :key="index">
                          <div style="height:auto;padding:5px 15px 0px 10px;">
                            <p style="font-size:10px;color: white;"><span>{{item.deviceName}}</span></p>
                            <p><span style="font-size:20px; color: #2ACBF3;">{{item.sensorValue}} ℃</span></p>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                  <el-col :xs="6" :sm="6" :lg="6" style="border-right:1px dashed white;">
                    <div class="card-panel-location" style="margin-left:10px;">
                      <i class="iconfont el-icon-dms-neicun" style="color:#66FFFF;font-size:16px;margin-left:5px;"></i><span style="margin-left:5px; line-height: 18px;color: white;font-size: 14px;">内存占用率:</span>
                    </div>
                    <div v-if="servers[index].serverInfo.Mainboard == null || servers[index].serverInfo.Mainboard == ''">
                        <p  style="height:20px;line-height:20px;font-size:10px;color: white;"><span>暂无数据</span></p>
                    </div>
                    <div v-else>
                        <div style="height:130px;margin-top: 10px;text-align:center; " v-for="item in servers[index].serverInfo.Mainboard">
                            <p style="" v-show="item.sensorClass == 'Utilization'">
                                <el-progress :stroke-width="8" type="circle" :width="120" :percentage="parseFloat(item.sensorValue)" color="#FBB03B"></el-progress>
                            </p>
                        </div>
                    </div> 
                  </el-col>
                  <el-col :xs="10" :sm="10" :lg="10">
                    <div class="card-panel-location"  style="margin-left:10px;">
                      <i class="iconfont el-icon-dms-yingpan" style="color:#66FFFF;font-size:16px;margin-left:5px;"></i><span style="margin-left:5px;line-height: 18px;color: white;font-size: 14px;">硬盘占用率:</span>
                    </div>
                    <div v-if="servers[index].serverInfo.Drive == null || servers[index].serverInfo.Drive == ''">
                        <p  style="height:20px;line-height:20px;font-size:10px;color: white;"><span>暂无数据</span></p>
                    </div>
                    <div v-else style="height:130px;overflow-y: auto;">
                        <div style="margin-left:20px; margin-top:6px; width:90%;" v-for="item in servers[index].serverInfo.Drive">
                            <div>
                              <span style="font-size:10px;color:white;">{{item.sensorName}}</span><span style="float:right;font-size:12px;color: #66FFFF;">{{item.sensorValue}} %</span>
                            </div>
                            <div>
                              <el-progress :stroke-width='8' :percentage="parseFloat(item.sensorValue)" :show-text="false" color="#67C23A"></el-progress>
                            </div>
                        </div> 
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>

          <el-col v-if="index < servers.length - 1" :xs="24" :sm="24" :lg="12" style="margin-top:10px;" :key="(index+1)" >
            <div style="border-radius:10px; padding: 10px;background-color:#1C1E4F">
              <div class="div_item_title">
                <el-button v-if="servers[index + 1].serverInfo.isOnline == 1" size="mini" type="primary" style="padding:5px;" circle><i class="iconfont el-icon-dms-zaixian" style="font-size:14px;"></i></el-button>
                <el-button v-if="servers[index + 1].serverInfo.isOnline == 0" size="mini" type="info"  style="padding:5px;"  circle><i class="iconfont el-icon-dms-lixian" style="font-size:14px;"></i></el-button>
                <span style="line-height: 18px;color: white;font-size: 14px;">{{servers[index + 1].serverInfo.computerName}}</span>
                <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-delete" round @click="removeServer(servers[index + 1].serverInfo.carrierpsn)">移除</el-button>
              </div>
              <line-chart :chart-data="servers[index + 1].cpuChartData"></line-chart>
              <div>
                <el-row style="margin-top:10px;height: 160px;">
                  <el-col :xs="8" :sm="8" :lg="8" style="border-right:1px dashed white;">
                    <div class="card-panel-location">
                      <i class="iconfont el-icon-dms-icon-test" style="color:#66FFFF;font-size:16px;margin-left:5px;"></i><span style="margin-left:5px;line-height: 18px;color: white;font-size: 14px;">温度:</span>
                    </div>
                    <div v-if="servers[index + 1].serverInfo.Temperature == null || servers[index + 1].serverInfo.Temperature == ''">
                        <p  style="height:20px;line-height:20px;font-size:10px;color: white;"><span>暂无数据</span></p>
                    </div>
                    <div style="height:130px;" v-else>
                      <el-row>
                        <el-col :xs="12" :sm="12" :lg="12" v-for="item in servers[index + 1].serverInfo.Temperature" :key="index">
                          <div style="height:auto;padding:5px 15px 0px 10px;">
                            <p style="font-size:10px;color: white;"><span>{{item.deviceName}}</span></p>
                            <p><span style="font-size:20px; color: #2ACBF3;">{{item.sensorValue}} ℃</span></p>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                  <el-col :xs="6" :sm="6" :lg="6" style="border-right:1px dashed white;">
                    <div class="card-panel-location" style="margin-left:10px;">
                      <i class="iconfont el-icon-dms-neicun" style="color:#66FFFF;font-size:16px;margin-left:5px;"></i><span style="margin-left:5px; line-height: 18px;color: white;font-size: 14px;">内存占用率:</span>
                    </div>
                    <div v-if="servers[index + 1].serverInfo.Mainboard == null || servers[index + 1].serverInfo.Mainboard == ''">
                        <p  style="height:20px;line-height:20px;font-size:10px;color: white;"><span>暂无数据</span></p>
                    </div>
                    <div v-else>
                        <div style="height:130px;margin-top: 10px; text-align:center;" v-for="item in servers[index + 1].serverInfo.Mainboard">
                            <p style="" v-show="item.sensorClass == 'Utilization'">
                                <el-progress :stroke-width="8" type="circle" :width="120" :percentage="parseFloat(item.sensorValue)" color="#FBB03B"></el-progress>
                            </p>
                        </div>
                    </div> 
                  </el-col>
                  <el-col :xs="10" :sm="10" :lg="10">
                    <div class="card-panel-location" style="margin-left:10px;">
                      <i class="iconfont el-icon-dms-yingpan" style="color:#66FFFF;font-size:16px;margin-left:5px;"></i><span style="margin-left:5px;line-height: 18px;color: white;font-size: 14px;">硬盘占用率:</span>
                    </div>
                    <div v-if="servers[index + 1].serverInfo.Drive == null || servers[index + 1].serverInfo.Drive == ''">
                        <p  style="height:20px;line-height:20px;font-size:10px;color: white;"><span>暂无数据</span></p>
                    </div>
                    <div v-else style="height:130px;overflow-y: auto;">
                        <div style="margin-left:20px; margin-top:6px; width:90%;" v-for="item in servers[index + 1].serverInfo.Drive">
                            <div>
                              <span style="font-size:10px;color: white;">{{item.sensorName}}</span><span style="float:right;font-size:12px;color: #66FFFF;">{{item.sensorValue}} %</span>
                            </div>
                            <div>
                              <el-progress :stroke-width='8' :percentage="parseFloat(item.sensorValue)" :show-text="false" color="#67C23A"></el-progress>
                            </div>
                        </div> 
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
        </div>
      </el-row>
    </div>
    <server-list v-if="serverListVisible" ref="showServerList" @refreshDataList="getDataList(false)"></server-list>
  </div>
</template>

<script>
  import CountTo from 'vue-count-to'
  import LineChart from '@/components/LineChart'
  import serverList from '@/components/home-server-component'

  // 在月份、日期、小时等小于10前面补0
  var padDate = function (value) {
    return value < 10 ? '0' + value : value
  }
  export default {
    components: {
      CountTo,
      LineChart,
      serverList
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
        nowTime: new Date(),
        serverInfo: '',
        dataListLoading: false,
        carrierPSNList: [],
        cpuChartData: {
          xAxisName: [],
          countName: 'cpu使用率',
          tableData: []
        },
        servers: [],
        serverListVisible: false
      }
    },
    filters: {
      formatDate (value) {
        var date = new Date(value)
        var year = date.getFullYear()
        var month = padDate(date.getMonth() + 1)
        var day = padDate(date.getDate())
        var hours = padDate(date.getHours())
        var minutes = padDate(date.getMinutes())
        var seconds = padDate(date.getSeconds())
        return year + '年' + month + '月' + day + '日' + ' ' + hours + ':' + minutes + ':' + seconds
      }
    },
    mounted () {
      var vmObject = this
      vmObject.getDataList(false)
      this.$message('按【F11】键全屏')
      this.refreshList = setInterval(
        function () {
          vmObject.getDataList(true)
        }, 120000)
      this.timer = setInterval(
        function () {
          // 修改数据date
          vmObject.nowTime = new Date()
        }, 1000)
    },
    methods: {
      // 设置全屏
      requestFullScreen () {
        let element = document.documentElement
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen()
        }
      },
      // 获取首页数据
      getDataList (intervalFlag) {
        this.$http({
          url: this.$http.adornUrl('/home/getSummariseData'),
          method: 'get',
          params: this.$http.adornParams({}, false)
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.carrierPSNList = data.info
            // 获取汇总数据
            this.$http({
              url: this.$http.adornUrl('/home/sumData'),
              method: 'post',
              data: this.$http.adornData({
                'carrierPSNList': this.carrierPSNList
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.fourCount.onlineCount = data.info.onlineCount
                this.fourCount.offlineCount = data.info.offlineCount
                this.fourCount.totalCautionCount = data.info.totalCautionCount
                this.fourCount.diskCautionCount = data.info.diskCautionCount
                this.fourCount.cpuCautionCount = data.info.cpuCautionCount
                this.fourCount.offlineCautionCount = data.info.offlineCautionCount
              } else {}
            })
            // 获取每个服务器数据
            if (!intervalFlag) {
              this.dataListLoading = true
            }
            this.$http({
              url: this.$http.adornUrl('/home/getCpuUseRate'),
              method: 'post',
              data: this.$http.adornData({
                'carrierPSNList': this.carrierPSNList.slice(0, 4)
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.servers = []
                for (var i = 0; i < data.info.length; i++) {
                  this.serverInfo = data.info[i]
                  this.charData(data.info[i].Processor)
                }
              } else {}
              this.dataListLoading = false
            })
          }
        })
      },
      removeServer (psnNo) {
        this.$confirm(`确定要移除吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/home/delete'),
            method: 'get',
            params: this.$http.adornParams({
              'carrierpsn': psnNo
            }, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '移除成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  // this.servers = []
                  this.getDataList(false)
                }
              })
            }
          })
        })
      },
      addServer () {
        this.serverListVisible = true
        var psnList = this.carrierPSNList
        this.$nextTick(() => {
          this.$refs.showServerList.getDataList(psnList)
        })
      },
      gotoNext () {
        let routeData = this.$router.resolve({path: '/boardNext', query: { index: 2 }})
        window.open(routeData.href, '_blank')
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
          // this.cpuChartData.xAxisName = xAxisData
          // this.cpuChartData.tableData = seriesData[0].data
          this.servers.push({'serverInfo': this.serverInfo, 'cpuChartData': {'xAxisName': xAxisData, 'countName': 'cpu使用率', 'tableData': seriesData[0].data}})
        } else {
          this.servers.push({'serverInfo': this.serverInfo, 'cpuChartData': {'xAxisName': '', 'countName': 'cpu使用率', 'tableData': ''}})
        }
      }
    },
    beforeDestroy: function () {
      if (this.timer) {
        clearInterval(this.timer)
      }
      if (this.refreshList) {
        clearInterval(this.refreshList)
      }
    }
  }
</script>
<style>  
  .el-progress__text {
    color:white;
    font-size: 24px!important;
  }

</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  .mod-home {
    line-height: 1.5;
  }
  .dashboard-editor-container {
    padding: 32px 32px 11px 32px;
    margin-top: -30px;
    background: url('~@/assets/img/bg.png');
    /*background-color: #052850;*/
    background-size:100% 100%;
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }
  .div_item_title {
    height: 30px;
    /*border-bottom: 1px solid #eaeef2;*/
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
      color: #FFF;
      border: 1px solid #7bc2f8;
      border-radius: 10px;
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
          color: #f2f2f2;
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
    
    margin-bottom: 5px;
    .card-panel-text {
      line-height: 18px;
      color: #f2f2f2;
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
  .sumDataLeft {
    height:137px;
    width: 100%;
    background:url('~@/assets/img/sum_left.png');
    background-size:100% 100%;
  }
  .sumDataRight {
    height:137px;
    width: 100%;
    background:url('~@/assets/img/sum_right.png');
    background-size:100% 100%;
  }
</style>

