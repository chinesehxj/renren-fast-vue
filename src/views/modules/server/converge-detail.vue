
<template>
    <div>
        <el-container>
            <el-aside width="300px">
                <!-- <el-menu>
                <el-menu-item style="margin-bottom:10px;height:auto;" v-for="(item,index) in clusterList" :key="index" :index="index">
                    <el-card shadow='hover' :body-style="{padding:'10px'}" >
                        <div style='border-bottom: 1px solid #f2f2f2; height:30px;'>
                            <i class="iconfont el-icon-dms-jiqunfuwu" style="font-size:20px;margin-bottom: 30px;"></i>
                        </div>
                        <div style="height:80px;" @click="getHostDetail(item.hostId)">
                            <div>
                                <p class="p_content_item"><span>主机编号</span><span style="float:right;">{{item.hostId}}</span></p>
                            </div>
                            <div>
                                <p class="p_content_item"><span>主机名</span><span style="float:right;">{{item.hostName}}</span></p>
                            </div>
                        </div>
                    </el-card>
                </el-menu-item>
                </el-menu> -->
                <div style="margin-bottom:10px;height:auto;" v-for="(item,index) in clusterList" ref="hostCard" :key="index" :index="index">
                    <el-card shadow='hover' :body-style="{padding:'10px'}" style="color: rgba(0, 0, 0, 0.45);">
                        <div style='border-bottom: 1px solid #f2f2f2; height:30px;'>
                            <i class="iconfont el-icon-dms-jiqunfuwu" style="font-size:20px;margin-bottom: 30px;"></i>
                        </div>
                        <div style="height:80px;" @click="getHostDetail(item.hostId, index)">
                            <div>
                                <p class="p_content_item"><span>主机编号</span><span style="float:right;">{{item.hostId}}</span></p>
                            </div>
                            <div>
                                <p class="p_content_item"><span>主机名</span><span style="float:right;">{{item.hostName}}</span></p>
                            </div>
                        </div>
                    </el-card>
                </div>
            </el-aside>
            <el-main >
                <el-card>
                    <el-row class="panel-add" :gutter="5">
                        <div v-for="(nodeInfo,index) in nodeInfoList" :key="index">
                            <el-col :xs="4" :sm="4" :lg="4"  style="margin-top:5px;">
                                <el-card shadow='hover' :body-style="{padding:'10px'}" >
                                    <div style='border-bottom: 1px solid #f2f2f2'>
                                        <p><span style="line-height: 18px;color: rgba(0, 0, 0, 0.45);font-size: 12px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap; max-width: 170px;">{{nodeInfo.itemName}}</span></p>
                                    </div>
                                    <div style="height:20px;">
                                        <div>
                                            <p style="line-height: 20px; height: 20px; font-size: 12px; color: rgba(0, 0, 0, 0.45);"><span>数值</span><span style="float:right;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;max-width: 130px;">{{nodeInfo.itemValue}}</span></p>
                                        </div>
                                    </div>
                                </el-card>
                            </el-col>
                        </div>
                    </el-row>
                </el-card>
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
          dataListLoading: false,
          psn: ''
        }
      },
      activated () {
        if (this.$route.query.psn) {
          this.psn = this.$route.query.psn
          console.log('converge-detail psn: ', this.psn)
          this.getDataList()
        }
      },
    //   activated () {
    //     this.getDataList()
    //   },
      methods: {
        // 获取数据列表
        getDataList () {
          console.log('adfsfd')
          this.$http({
            url: this.$http.adornUrl('/convergeDeviceInfo/listDeviceOfPSN'),
            method: 'get',
            params: this.$http.adornParams({
              'psn': this.psn
            }, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              console.log(data.devices)
              this.clusterList = data.devices
            } else {
            }
          })
        },
        getHostDetail (hostId, index) {
          // 修改元素的样式
          this.$refs.hostCard.forEach((item) => {
            item.children[0].style.backgroundColor = 'white'
            item.children[0].style.color = 'rgba(0, 0, 0, 0.45)'
          })
          this.$refs.hostCard[index].children[0].style.backgroundColor = '#38c0dc'
          this.$refs.hostCard[index].children[0].style.color = 'white'
          this.$http({
            url: this.$http.adornUrl('/convergeDeviceInfo/getHostDetail'),
            method: 'get',
            params: this.$http.adornParams({
              'psn': this.psn,
              'hostId': hostId
            }, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.nodeInfoList = data.hostDetail
            } else {
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
    // color: rgba(0, 0, 0, 0.45);
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