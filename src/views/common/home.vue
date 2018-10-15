<template>
  <div >
    <div style="height: 20px;margin-top: -20px;margin-right: -20px;"> <i class="iconfont el-icon-dms-quanping" style="color:rgba(0, 0, 0, 0.45); font-size:25px; float:right;" @click="showBoard"></i></div>
    <el-row class="panel-group" :gutter="40">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class='card-panel' @click="handleRouterPush('list')">
          <div class="card-panel-icon-wrapper icon-people">
            <i class="iconfont el-icon-dms-zaixian" style="font-size:65px;"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">当前在线数</div>
            <count-to class="card-panel-num" :startVal="0" :endVal="parseInt(fourCount.onlineCount)" :duration="2000"></count-to>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleRouterPush('list')">
          <div class="card-panel-icon-wrapper icon-message">
            <i class="iconfont el-icon-dms-lixian" style="font-size:65px;"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">当前离线数</div>
            <count-to class="card-panel-num" :startVal="0" :endVal="parseInt(fourCount.offlineCount)" :duration="2000"></count-to>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12" class="card-panel-col">
        <div class="card-panel" @click="handleRouterPush('breathData')">
        <el-row>
          <el-col :xs="12" :sm="12" :lg="12">
            <div class="card-panel-icon-wrapper icon-money">
              <i class="iconfont el-icon-dms-gaojing" style="font-size:65px;"></i>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">今日告警总数</div>
              <count-to class="card-panel-num" :startVal="0" :endVal="parseInt(fourCount.totalCautionCount)" :duration="2000"></count-to>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <div class="card-panel-location" style="margin-top:5px; margin-bottom:0px;">
              <i class="iconfont el-icon-dms-lixian" style="color:#6699FF;font-size:16px;margin-left:15px;"></i><span class="card-panel-text" style="margin-left:5px;">下线告警</span><span style="font-size:18px; color: red; margin-left:2px;">{{fourCount.offlineCautionCount}}</span><span class="card-panel-text" style="margin-left:2px;">次</span>
            </div>
            <div class="card-panel-location" style="margin-top:5px; margin-bottom:0px;">
              <i class="iconfont el-icon-dms-cpu1" style="color:green;font-size:20px;margin-left:15px;"></i><span class="card-panel-text" style="margin-left:5px;">CPU温度过高告警</span><span style="font-size:18px; color: red; margin-left:2px;">{{fourCount.cpuCautionCount}}</span><span class="card-panel-text" style="margin-left:2px;">次</span>
            </div>
            <div class="card-panel-location" style="margin-top:5px; margin-bottom:0px;">
              <i class="iconfont el-icon-dms-xuniyingpan" style="color:orange;font-size:16px;margin-left:15px;"></i><span class="card-panel-text" style="margin-left:5px;">磁盘可用空间过低告警</span><span style="font-size:18px; color: red; margin-left:2px;">{{fourCount.diskCautionCount}}</span><span class="card-panel-text" style="margin-left:2px;">次</span>
            </div>
          </el-col>
        </el-row>
        </div>
      </el-col>
    </el-row>
    <div v-loading="dataListLoading">
      <el-row style="background:#fff;margin-bottom:10px;" :gutter="10" v-for="(serItem,index) in servers"  :key="index">
        <div v-if="index % 2 == 0">
          <el-col :xs="24" :sm="24" :lg="12" style="margin-top:10px;" :key="index">
            <el-card shadow='hover' :body-style="{padding:'10px'}">
              <div class="div_item_title" >
                <el-button v-if="servers[index].serverInfo.isOnline == 1" size="mini" type="success" style="padding:5px;" circle><i class="iconfont el-icon-dms-zaixian" style="font-size:14px;"></i></el-button>
                <el-button v-if="servers[index].serverInfo.isOnline == 0" size="mini" type="info"  style="padding:5px;"  circle><i class="iconfont el-icon-dms-lixian" style="font-size:14px;"></i></el-button>
                <span style="line-height: 18px;color: rgba(0, 0, 0, 0.45);font-size: 14px;">{{servers[index].serverInfo.computerName}}</span>
                <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-delete" round @click="removeServer(servers[index].serverInfo.carrierpsn)">移除</el-button>
              </div>
              <line-chart :chart-data="servers[index].cpuChartData"></line-chart>
              <div>
                <el-row >
                  <el-col :xs="8" :sm="8" :lg="8">
                    <div class="card-panel-location">
                      <i class="iconfont el-icon-dms-icon-test" style="color:#36a3f7;font-size:16px;margin-left:5px;"></i><span style="margin-left:5px;line-height: 18px;color: rgba(0, 0, 0, 0.45);font-size: 14px;">温度:</span>
                    </div>
                    <div v-if="servers[index].serverInfo.Temperature == null || servers[index].serverInfo.Temperature == ''">
                        <p  style="height:20px;line-height:20px;font-size:10px;color: rgba(0, 0, 0, 0.45);"><span>暂无数据</span></p>
                    </div>
                    <div v-else>
                        <div style="height:auto;padding:5px 15px 0px 10px;" v-for="item in servers[index].serverInfo.Temperature">
                            <p style="font-size:10px;color: rgba(0, 0, 0, 0.45);"><span>{{item.deviceName}}</span><span style="float:right;font-size:12px;color: #666;">{{item.sensorValue}} ℃</span></p>
                        </div>
                    </div>
                  </el-col>
                  <el-col :xs="6" :sm="6" :lg="6">
                    <div class="card-panel-location">
                      <i class="iconfont el-icon-dms-neicun" style="color:#36a3f7;font-size:16px;margin-left:5px;"></i><span style="margin-left:5px; line-height: 18px;color: rgba(0, 0, 0, 0.45);font-size: 14px;">内存占用率:</span>
                    </div>
                    <div v-if="servers[index].serverInfo.Mainboard == null || servers[index].serverInfo.Mainboard == ''">
                        <p  style="height:20px;line-height:20px;font-size:10px;color: rgba(0, 0, 0, 0.45);"><span>暂无数据</span></p>
                    </div>
                    <div v-else>
                        <div style="height:auto;padding:5px 15px 0px 25px; text-aligh:center;" v-for="item in servers[index].serverInfo.Mainboard">
                            <p style="height:20px" v-show="item.sensorClass == 'Utilization'">
                                <el-progress :stroke-width="6" type="circle" :width="50" :percentage="parseFloat(item.sensorValue)" color="#8e71c7"></el-progress>
                            </p>
                        </div>
                    </div> 
                  </el-col>
                  <el-col :xs="10" :sm="10" :lg="10">
                    <div class="card-panel-location">
                      <i class="iconfont el-icon-dms-yingpan" style="color:#36a3f7;font-size:16px;margin-left:5px;"></i><span style="margin-left:5px;line-height: 18px;color: rgba(0, 0, 0, 0.45);font-size: 14px;">硬盘占用率:</span>
                    </div>
                    <div v-if="servers[index].serverInfo.Drive == null || servers[index].serverInfo.Drive == ''">
                        <p  style="height:20px;line-height:20px;font-size:10px;color: rgba(0, 0, 0, 0.45);"><span>暂无数据</span></p>
                    </div>
                    <div v-else>
                        <div v-for="item in servers[index].serverInfo.Drive">
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

          <el-col v-if="index < servers.length - 1" :xs="24" :sm="24" :lg="12" style="margin-top:10px;" :key="(index+1)" >
            <el-card shadow='hover' :body-style="{padding:'10px'}">
              <div class="div_item_title">
                <el-button v-if="servers[index + 1].serverInfo.isOnline == 1" size="mini" type="success" style="padding:5px;" circle><i class="iconfont el-icon-dms-zaixian" style="font-size:14px;"></i></el-button>
                <el-button v-if="servers[index + 1].serverInfo.isOnline == 0" size="mini" type="info"  style="padding:5px;"  circle><i class="iconfont el-icon-dms-lixian" style="font-size:14px;"></i></el-button>
                <span style="line-height: 18px;color: rgba(0, 0, 0, 0.45);font-size: 14px;">{{servers[index + 1].serverInfo.computerName}}</span>
                <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-delete" round @click="removeServer(servers[index + 1].serverInfo.carrierpsn)">移除</el-button>
              </div>
              <line-chart :chart-data="servers[index + 1].cpuChartData"></line-chart>
              <div>
                <el-row >
                  <el-col :xs="8" :sm="8" :lg="8">
                    <div class="card-panel-location">
                      <i class="iconfont el-icon-dms-icon-test" style="color:#36a3f7;font-size:16px;margin-left:5px;"></i><span style="margin-left:5px;line-height: 18px;color: rgba(0, 0, 0, 0.45);font-size: 14px;">温度:</span>
                    </div>
                    <div v-if="servers[index + 1].serverInfo.Temperature == null || servers[index + 1].serverInfo.Temperature == ''">
                        <p  style="height:20px;line-height:20px;font-size:10px;color: rgba(0, 0, 0, 0.45);"><span>暂无数据</span></p>
                    </div>
                    <div v-else>
                        <div style="height:auto;padding:5px 15px 0px 10px;" v-for="item in servers[index + 1].serverInfo.Temperature">
                            <p style="font-size:10px;color: rgba(0, 0, 0, 0.45);"><span>{{item.deviceName}}</span><span style="float:right;font-size:12px;color: #666;">{{item.sensorValue}} ℃</span></p>
                        </div>
                    </div>
                  </el-col>
                  <el-col :xs="6" :sm="6" :lg="6">
                    <div class="card-panel-location">
                      <i class="iconfont el-icon-dms-neicun" style="color:#36a3f7;font-size:16px;margin-left:5px;"></i><span style="margin-left:5px; line-height: 18px;color: rgba(0, 0, 0, 0.45);font-size: 14px;">内存占用率:</span>
                    </div>
                    <div v-if="servers[index + 1].serverInfo.Mainboard == null || servers[index + 1].serverInfo.Mainboard == ''">
                        <p  style="height:20px;line-height:20px;font-size:10px;color: rgba(0, 0, 0, 0.45);"><span>暂无数据</span></p>
                    </div>
                    <div v-else>
                        <div style="height:auto;padding:5px 15px 0px 25px; text-aligh:center;" v-for="item in servers[index + 1].serverInfo.Mainboard">
                            <p style="height:20px" v-show="item.sensorClass == 'Utilization'">
                                <el-progress :stroke-width="6" type="circle" :width="50" :percentage="parseFloat(item.sensorValue)" color="#8e71c7"></el-progress>
                            </p>
                        </div>
                    </div> 
                  </el-col>
                  <el-col :xs="10" :sm="10" :lg="10">
                    <div class="card-panel-location">
                      <i class="iconfont el-icon-dms-yingpan" style="color:#36a3f7;font-size:16px;margin-left:5px;"></i><span style="margin-left:5px;line-height: 18px;color: rgba(0, 0, 0, 0.45);font-size: 14px;">硬盘占用率:</span>
                    </div>
                    <div v-if="servers[index + 1].serverInfo.Drive == null || servers[index + 1].serverInfo.Drive == ''">
                        <p  style="height:20px;line-height:20px;font-size:10px;color: rgba(0, 0, 0, 0.45);"><span>暂无数据</span></p>
                    </div>
                    <div v-else>
                        <div v-for="item in servers[index + 1].serverInfo.Drive">
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
        </div>

        <el-col v-if="index == servers.length - 1" :xs="24" :sm="24" :lg="12" style="margin-top:10px;">
          <el-card shadow='hover' :body-style="{padding:'10px'}">
            <div class="div_item_title" >
              <el-button size="mini" type="primary"  style="padding:5px;"  circle><i class="el-icon-plus" style="font-size:14px;font-weight:bold;"></i></el-button>
              <span style="line-height: 18px;color: rgba(0, 0, 0, 0.45);font-size: 14px;">添加关注服务器</span>
            </div>
            <div style="height:260px;">
              <el-row class="panel-add">
                <el-col :xs="24" :sm="24" :lg="24">
                  <div class="card-add-panel" @click="addServer">
                    <span><i class="el-icon-plus card-add-panel-icon-wrapper icon-add"></i></span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
    
      <el-row v-if="servers.length == 0" style="background:#fff;margin-bottom:10px;" :gutter="10">
        <el-col :xs="24" :sm="24" :lg="12" style="margin-top:10px;">
          <el-card shadow='hover' :body-style="{padding:'10px'}">
            <div class="div_item_title" >
              <el-button size="mini" type="primary"  style="padding:5px;"  circle><i class="el-icon-plus" style="font-size:14px;font-weight:bold;"></i></el-button>
              <span style="line-height: 18px;color: rgba(0, 0, 0, 0.45);font-size: 14px;">添加关注服务器</span>
            </div>
            <div style="height:260px;">
              <el-row class="panel-add">
                <el-col :xs="24" :sm="24" :lg="24">
                  <div class="card-add-panel" @click="addServer">
                    <span><i class="el-icon-plus card-add-panel-icon-wrapper icon-add"></i></span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <server-list v-if="serverListVisible" ref="showServerList" @refreshDataList="getDataList(false)"></server-list>
  </div>
</template>

<script>
  import CountTo from 'vue-count-to'
  import LineChart from '@/components/LineChart'
  import serverList from '@/components/home-server-component'
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
        serverInfo: '',
        dataListLoading: false,
        carrierPSNList: '',
        cpuChartData: {
          xAxisName: [],
          countName: 'cpu使用率',
          tableData: []
        },
        servers: [],
        serverListVisible: false
      }
    },
    mounted () {
      var vmObject = this
      vmObject.getDataList(false)
      setInterval(
        function () {
          vmObject.getDataList(true)
        }, 120000)
    },
    methods: {
      // 获取首页数据
      getDataList (intervalFlag) {
        console.log(new Date())
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
                'carrierPSNList': data.info
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
          this.$refs.showServerList.getServerList(psnList)
        })
      },
      showBoard () {
        let {href} = this.$router.resolve({path: `/board`})
        window.open(href, '_blank')
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
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .mod-home {
    line-height: 1.5;
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

