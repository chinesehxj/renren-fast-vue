
<template>
    <div>
        <el-container>
            <el-aside width="300px">
                <div style="margin-bottom:10px;" v-for="item in clusterList">
                    <el-card shadow='hover' :body-style="{padding:'10px'}">
                        <div class="div_item_title" >
                            <i class="iconfont el-icon-dms-jiqunfuwu" style="font-size:20px;"></i>
                            <span style="line-height: 18px;color: rgba(0, 0, 0, 0.45);font-size: 14px;">{{item.computerName}}</span>
                            <el-button style="float: right; padding: 3px 0" type="text" icon="el-icon-delete" round @click="">移除</el-button>
                        </div>
                        <div style="height:300px;">
                            <div>
                                <p class="p_content_item"><span>PSN</span><span style="float:right;">{{item.carrierPSN}}</span></p>
                            </div>
                            <div>
                                <p class="p_content_item"><span>设备名</span><span style="float:right;">{{item.deviceName}}</span></p>
                            </div>
                            <div>
                                <p class="p_content_item" style=""><span>设备ID</span><span style="float:right;text-overflow:ellipsis;width: 200px;overflow: hidden;white-space: nowrap;">{{item.deviceId}}</span></p>
                            </div>
                            <div>
                                <p class="p_content_item"><span>设备状态</span><span style="float:right;">{{item.deviceStatus}}</span></p>
                            </div>
                            <div>
                                <p class="p_content_item"><span>总容量</span><span style="float:right;">{{item.deviceCapacity}} GB</span></p>
                            </div>
                            <div>
                                <p class="p_content_item"><span>已使用量</span><span style="float:right;">{{item.deviceUsedCapacity}} GB</span></p>
                            </div>
                            <div>
                                <p class="p_content_item"><span>使用率</span><span style="float:right;">{{item.deviceUseRate}}%</span></p>
                                <p style="height:20px" v-show="true">
                                    <el-progress :stroke-width="8" :percentage="parseInt(item.deviceUseRate)" :show-text="false" color="#67C23A"></el-progress>
                                </p>
                            </div>
                        </div>
                    </el-card>
                </div>
            </el-aside>
            <el-main v-loading="dataListLoading">
                <el-tabs type="border-card" >
                    <div v-for="(nodeInfo,index) in nodeInfoList" :key="index">
                    <el-tab-pane :label="nodeInfo.nodeId" style="padding-bottom:10px;">
                        <el-card shadow='hover' :body-style="{padding:'10px'}">
                        <div style="">
                            <el-row class="panel-add">
                                <el-col :xs="24" :sm="24" :lg="24">
                                    <div class="">
                                        <p class="p_node_item"><span>CPU信息</span></p>
                                        <div v-if="nodeInfo.cpu == null || nodeInfo.cpu == ''">
                                            <p  class="p_node_content" style="font-size:14px;"><span>暂无数据</span></p>
                                        </div>
                                        <div v-else v-for="cpuInfo in nodeInfo.cpu">
                                            <el-row :gutter="5" >
                                                <el-col :xs="24" :sm="12" :lg="9">
                                                    <div>
                                                        <p class="p_node_content" style="font-size:14px;"><span>CPU型号:</span><span style="margin-left:10px;">{{cpuInfo.deviceModel}}</span></p>
                                                    </div>
                                                </el-col>
                                                <el-col :xs="24" :sm="12" :lg="5">
                                                    <div>
                                                        <p class="p_node_content"><span>电压:</span><span style="margin-left:10px;">{{cpuInfo.deviceVolts}} V</span></p>
                                                    </div>
                                                </el-col>
                                                <el-col :xs="24" :sm="12" :lg="5">
                                                    <div>
                                                        <p class="p_node_content"><span>温度:</span><span style="margin-left:10px;">{{cpuInfo.deviceCoreTemp}} ℃</span></p>
                                                    </div>
                                                </el-col>
                                                <el-col :xs="24" :sm="12" :lg="5">
                                                    <div>
                                                        <p class="p_node_content"><span>CPU使用率:</span><span style="margin-left:10px;">{{nodeInfo.cpuUseRate}}%</span></p>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </div>
                                    <div class="">
                                        <p class="p_node_item"><span>内存信息</span></p>
                                        <div v-if="nodeInfo.memUseRate == null || nodeInfo.memUseRate == ''">
                                            <p  class="p_node_content" style="font-size:14px;"><span>暂无数据</span></p>
                                        </div>
                                        <div v-else>
                                            <el-row :gutter="5">
                                                <el-col :xs="24" :sm="12" :lg="4">
                                                    <div>
                                                        <p class="p_node_content"><span>内存使用率:</span><span style="margin-left:10px;">{{nodeInfo.memUseRate}}%</span></p>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </div>
                                    <div class="">
                                        <p class="p_node_item"><span>网卡信息</span></p>
                                        <div v-if="nodeInfo.eth == null || nodeInfo.eth == ''">
                                            <p  class="p_node_content" style="font-size:14px;"><span>暂无数据</span></p>
                                        </div>
                                        <div v-else v-for="ethInfo in nodeInfo.eth">
                                            <el-row :gutter="5" >
                                                <el-col :xs="24" :sm="12" :lg="9">
                                                    <div>
                                                        <p class="p_node_content" style="font-size:14px;"><span>IP地址:</span><span style="margin-left:10px;">{{ethInfo.deviceIPAddress}}</span></p>
                                                    </div>
                                                </el-col>
                                                <el-col :xs="24" :sm="12" :lg="5">
                                                    <div>
                                                        <p class="p_node_content"><span>网关:</span><span style="margin-left:10px;">{{ethInfo.deviceGateWay}}</span></p>
                                                    </div>
                                                </el-col>
                                                <el-col :xs="24" :sm="12" :lg="5">
                                                    <div>
                                                        <p class="p_node_content"><span>MAC地址:</span><span style="margin-left:10px;">{{ethInfo.deviceMAC}}</span></p>
                                                    </div>
                                                </el-col>
                                                <el-col :xs="24" :sm="12" :lg="5">
                                                    <div>
                                                        <p class="p_node_content"><span>速率:</span><span style="margin-left:10px;">{{ethInfo.deviceSpeed}}</span></p>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </div>
                                    <div class="">
                                        <p class="p_node_item"><span>风扇信息</span></p>
                                        <div v-if="nodeInfo.fan == null || nodeInfo.fan == ''">
                                            <p  class="p_node_content" style="font-size:14px;"><span>暂无数据</span></p>
                                        </div>
                                        <div v-else v-for="fanInfo in nodeInfo.fan">
                                            <el-row :gutter="5" >
                                                <el-col :xs="24" :sm="12" :lg="5">
                                                    <div>
                                                        <p class="p_node_content"><span>状态:</span><span style="margin-left:10px;">{{fanInfo.deviceStatus}}</span></p>
                                                    </div>
                                                </el-col>
                                                <el-col :xs="24" :sm="12" :lg="5">
                                                    <div>
                                                        <p class="p_node_content"><span>转速:</span><span style="margin-left:10px;">{{fanInfo.deviceRotationRate}} rpm</span></p>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </div>
                                    <div class="">
                                        <p class="p_node_item"><span>磁盘信息</span></p>
                                        <div v-if="nodeInfo.disk == null || nodeInfo.disk == ''">
                                            <p  class="p_node_content" style="font-size:14px;"><span>暂无数据</span></p>
                                        </div>
                                        <el-row v-else :gutter="5">
                                            <div v-for="diskInfo in nodeInfo.disk">
                                                <el-col :xs="24" :sm="12" :lg="4" style="margin-top:10px;">
                                                    <div>
                                                        <el-card shadow='hover' :body-style="{padding:'10px'}">
                                                            <div style="height:200px;">
                                                                <div>
                                                                    <p class="p_node_content"><span>磁盘ID</span><span style="float:right;">{{diskInfo.deviceId}}</span></p>
                                                                </div>
                                                                <div>
                                                                    <p class="p_node_content"><span>磁盘名</span><span style="float:right;">{{diskInfo.deviceName}}</span></p>
                                                                </div>
                                                                <div>
                                                                    <p class="p_node_content"><span>磁盘状态</span><span style="float:right;">{{diskInfo.deviceStatus}}</span></p>
                                                                </div>
                                                                <div>
                                                                    <p class="p_node_content"><span>总容量</span><span style="float:right;">{{diskInfo.deviceTotalSpace}} GB</span></p>
                                                                </div>
                                                                <div>
                                                                    <p class="p_node_content"><span>已使用量</span><span style="float:right;">{{diskInfo.deviceUsedSpace}} GB</span></p>
                                                                </div>
                                                                <div>
                                                                    <p class="p_node_content"><span>使用率</span><span style="float:right;">{{diskInfo.deviceUseRate}}%</span></p>
                                                                    <p style="height:20px" v-show="true">
                                                                        <el-progress :stroke-width="8" :percentage="parseFloat(diskInfo.deviceUseRate)" :show-text="false" color="#67C23A"></el-progress>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </el-card>
                                                    </div>
                                                </el-col>
                                            </div>
                                        </el-row>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </el-card>
                    </el-tab-pane>
                    </div>
                </el-tabs>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
      data () {
        return {
          clusterList: '',
          nodeInfoList: '',
          dataListLoading: false
        }
      },
      activated () {
        this.getDataList()
      },
      methods: {
        // 获取数据列表
        getDataList () {
          console.log('adfsfd')
          this.$http({
            url: this.$http.adornUrl('/server/list'),
            method: 'get',
            params: this.$http.adornParams({
              'pageIndex': '',
              'pageSize': '',
              'owners': '',
              'type': '0'
            }, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              console.log(data.page.list)
              this.$http({
                url: this.$http.adornUrl('/storage/clusterList'),
                method: 'post',
                data: this.$http.adornData({
                  'carrierList': data.page.list
                })
              }).then(({data}) => {
                if (data && data.code === 0) {
                  this.clusterList = data.list
                  this.getNodeInfo(data.list[0].carrierPSN)
                } else {
                  this.clusterList = []
                }
              })
            } else {
              this.clusterList = []
            }
          })
        },
        getNodeInfo (psn) {
          this.dataListLoading = true
          this.$http({
            url: this.$http.adornUrl('/storage/nodeInfo'),
            method: 'get',
            params: this.$http.adornParams({
              'carrierpsn': psn
            }, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.dataListLoading = false
              console.log(data.list)
              this.nodeInfoList = data.list
            } else {
              this.dataListLoading = false
            }
          })
        }
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .div_item_title {
    height: 30px;
    border-bottom: 1px solid #eaeef2;
  }
  .el-main {
    padding: 0px 20px 0px 20px; 
  }
  .p_content_item {
    line-height: 40px;
    height:40px;
    font-size:16px;
    color: rgba(0, 0, 0, 0.45);
  }
  .p_node_item {
    line-height: 30px;
    height:30px;
    font-size:14px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.6);
  }
  .p_node_content {
    line-height: 30px;
    height:30px;
    font-size:14px;
    color: rgba(0, 0, 0, 0.45);
  }
  .panel-add {
    .card-add-panel {
      cursor: pointer;
      position: relative;
      overflow: hidden;
      background: #fff;
      width: 80px;
      margin: 0px auto;
      padding-bottom: 10px;
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
        padding: 5px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
        font-size: 65px;
        border: 1px solid #f2f2f2;
      }
    }
  }
</style>