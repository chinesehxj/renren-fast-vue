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
            <div style="text-align:center;height:45px;">
              <span style="line-height:45px;color:white;font-size:30px;letter-spacing:3px;font-weight:bold;margin-left:10px;margin-right:10px">统一数据监控中心</span>
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
    <!-- <el-row :gutter="20" style="margin-top:20px;">
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
    </el-row> -->
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :lg="18">
        
        <el-row>
          <div style="width: 600px;position: relative;top: 10px;">
            <el-row style="border-radius:10px; background-color:#002973;margin-top:20px;">
              <el-col :xs="2" :sm="2" :lg="2" >
                  <div style="margin: 15px 10px 15px 20px;">
                    <el-button type="primary" style="padding:5px;" circle><i class="iconfont el-icon-dms-zaixian" style="font-size:30px;"></i></el-button>
                  </div>
                </el-col>
                <el-col :xs="10" :sm="10" :lg="10">
                  <div style="height:58px;margin-left:20px;margin-top:10px;border-right:1px dashed #FFFFFD;">
                    <span style="font-size:20px;color:#FFFFFD;letter-spacing:2px;">当前在线数</span>
                    <count-to style="font-size:35px;font-weight:bold;color:#FFFFFD;margin-left:35px;" :startVal="0" :endVal="parseInt(fourCount.onlineCount)" :duration="2000"></count-to>
                  </div>
                </el-col>
                <el-col :xs="2" :sm="2" :lg="2" >
                  <div style="margin: 15px 10px 15px 20px;">
                    <el-button type="info" style="padding:5px;" circle><i class="iconfont el-icon-dms-lixian" style="font-size:30px;"></i></el-button>
                  </div>
                </el-col>
                <el-col :xs="10" :sm="10" :lg="10" >
                  <div style="height:58px;margin-left:20px;margin-top:10px;">
                    <span style="font-size:20px;color:#FFFFFD;letter-spacing:2px;">当前离线数</span>
                    <count-to style="font-size:35px;font-weight:bold;color:#FFFFFD;margin-left:35px;" :startVal="0" :endVal="parseInt(fourCount.offlineCount)" :duration="2000"></count-to>
                  </div>
                </el-col>
            </el-row>
          </div>
          <ve-map :data="chartData" :settings="chartSettings" :visualMap="visualSetting"  :legend-visible="false" height="884px"></ve-map>
        </el-row>
      </el-col>  
      <el-col :xs="24" :sm="24" :lg="6">
        <el-row style="margin-top: 20px;">
          <el-col :xs="24" :sm="24" :lg="24">
            <div style="padding: 5px 0px 5px 10px; border: 1px solid #26CCE2; background-color:#084F8D;">
              <span style="font-size:16px; color:white;">告警次数分布</span>
            </div>
            <div style="padding: 5px 0px 0px 0px; border-left: 1px solid #26CCE2;border-right: 1px solid #26CCE2;border-bottom: 1px solid #26CCE2;background-color:#044A88;">
              <ve-pie :data="pieChartData" height="350px" :settings="pieChartSetting" :legend="legendSetting"></ve-pie>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px;">
          <el-col :xs="24" :sm="24" :lg="24">
            <div style="padding: 5px 0px 5px 10px; border: 1px solid #26CCE2; background-color:#084F8D;">
              <span style="font-size:16px; color:white;">各电视台终端数</span>
            </div>
            <div style="padding: 5px 0px 0px 0px; border-left: 1px solid #26CCE2;border-right: 1px solid #26CCE2;border-bottom: 1px solid #26CCE2;background-color:#044A88;">
              <el-table
                :data="serverCountList"
                style="width: 100%"
                :header-cell-style="headerClass"
                :row-style="rowClass"
                :cell-style="cellClass">
                <el-table-column
                  type="index"
                  align="center"
                  width="50"
                  label="序号">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="电视台"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="contact"
                  label="联系人"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="serverCount"
                  label="终端数"
                  >
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="24" :lg="24">
          </el-col>
        </el-row>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import CountTo from 'vue-count-to'
  // 在月份、日期、小时等小于10前面补0
  var padDate = function (value) {
    return value < 10 ? '0' + value : value
  }
  export default {
    components: {
      CountTo
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
        carrierPSNList: '',
        serverCountList: [],
        cpuChartData: {
          xAxisName: [],
          countName: 'cpu使用率',
          tableData: []
        },
        servers: [],
        serverListVisible: false,
        chartData: {
          columns: ['province', 'serverCount'],
          rows: []
        },
        chartSettings: {
          position: 'china',
          label: false,
          itemStyle: {
            areaColor: 'rgb(41,116,240,0.5)',
            borderColor: '#26CCE2',
            normal: {
              label: {
                show: true
              }
            },
            emphasis: {
              label: {
                show: true
              }
            }
          },
          zoom: 1.2,
          mapGrid: {
            top: 100
          }
        },
        visualSetting: {
          min: 0,
          max: 50,
          text: ['终端个数', ''],
          realtime: true,
          calculable: true,
          bottom: 40,
          inRange: {
            color: ['lightskyblue', 'yellow', 'orangered']
          },
          textStyle: {
            color: '#ffffff'
          }
        },
        pieChartData: {
          columns: ['告警类别', '数量'],
          rows: []
        },
        legendSetting: {
          textStyle: {
            color: '#fff'
          }
        },
        pieChartSetting: {
          label: {
            show: true,
            position: 'outside',
            formatter: '{b}\n{c} ({d}%)'
          }
        }
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
      headerClass ({ row, column, rowIndex, columnIndex }) {
        console.log(rowIndex)
        if (rowIndex === 0) {
          return 'background: #044A88;color:white;border-bottom:1px dashed #26CCE2;'
        } else {
          return ''
        }
      },
      rowClass ({ row, rowIndex }) {
        return 'background:#044A88;color:white;'
      },
      cellClass ({ row, column, rowIndex, columnIndex }) {
        return 'border-bottom:1px dashed #26CCE2;'
      },
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
                this.pieChartData.rows = []
                this.pieChartData.rows.push({ '告警类别': '下线告警数', '数量': data.info.offlineCautionCount }, { '告警类别': 'CPU温度过高告警数', '数量': data.info.cpuCautionCount }, { '告警类别': '磁盘可用空间过低告警数', '数量': data.info.diskCautionCount })
              } else {}
            })
          }
        })
        this.$http({
          url: this.$http.adornUrl('/home/getCompanyServerCountForMapBoard'),
          method: 'get',
          params: this.$http.adornParams({}, false)
        }).then(({data}) => {
          this.serverCountList = data.list
        })
        this.$http({
          url: this.$http.adornUrl('/home/getProvinceServerCountForMapBoard'),
          method: 'get',
          params: this.$http.adornParams({}, false)
        }).then(({data}) => {
          console.log(data.list)
          this.chartData.rows = data.list
        })
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
    padding: 32px;
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

