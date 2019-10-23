
import { log } from 'util';
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
                        <div style="height:80px;" @click="getHostDetailForNewShow(item.hostId, item.hostName, index)">
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
            <el-main v-loading="loading2"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255, 255, 255, 0.8)" v-show="isShow">
                <!-- <el-card>
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
                </el-card> -->
                <el-card v-if="deviceType === 'VSNSTO'">
                  <el-row>
                    <el-col :xs="24" :sm="24" :lg="24">
                      <el-card shadow='hover' :body-style="{padding:'10px'}" :header-style="{padding:'10px'}" >
                        <div slot="header" class="clearfix" style="font-size:16px;color: #606266;margin:-10px;">
                          <span>设备基本信息:</span>
                        </div>
                        <el-row>
                          <el-col :xs="6" :sm="6" :lg="6" style="padding-left:20px;margin-top:5px;">
                            <div>
                              <span style="line-height: 18px;color: #606266;font-size: 14px;">设备序列号:</span>
                              <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-if="VSNSTO.gDeviceSerial && VSNSTO.gDeviceSerial.length > 0">{{VSNSTO.gDeviceSerial}}</span>
                              <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-else>未知</span>
                            </div>
                          </el-col>
                          <el-col :xs="6" :sm="6" :lg="6" style="padding-left:20px;margin-top:5px;">
                            <div>
                              <span style="line-height: 18px;color: #606266;font-size: 14px;">设备类型:</span>
                              <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-if="VSNSTO.gDeviceType && VSNSTO.gDeviceType.length > 0">{{VSNSTO.gDeviceType}}</span>
                              <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-else>未知</span>
                            </div>
                          </el-col>
                          <el-col :xs="6" :sm="6" :lg="6" style="padding-left:20px;margin-top:5px;">
                            <div>
                              <span style="line-height: 18px;color: #606266;font-size: 14px;">固件版本:</span>
                              <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-if="VSNSTO.gFWVer && VSNSTO.gFWVer.length > 0">{{VSNSTO.gFWVer}}</span>
                              <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-else>未知</span>
                            </div>
                          </el-col>
                          <el-col :xs="6" :sm="6" :lg="6" style="padding-left:20px;margin-top:5px;">
                            <div>
                              <span style="line-height: 18px;color: #606266;font-size: 14px;">开机时长:</span>
                              <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-if="VSNSTO.CPUUptime && VSNSTO.CPUUptime.length > 0">{{VSNSTO.CPUUptime | formatHowLong}}</span>
                              <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-else>未知</span>
                            </div>
                          </el-col>
                          <el-col :xs="6" :sm="6" :lg="6" style="padding-left:20px;margin-top:5px;">
                            <div>
                              <span style="line-height: 18px;color: #606266;font-size: 14px;">电源状态:</span>
                              <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-if="VSNSTO.gPowerStatus && VSNSTO.gPowerStatus.length > 0 && VSNSTO.gPowerStatus === '0'">正常</span>
                              <span style="line-height: 18px;color: red;margin-left:10px;font-size: 14px;" v-else-if="VSNSTO.gPowerStatus && VSNSTO.gPowerStatus.length > 0 && VSNSTO.gPowerStatus !== '0'">异常</span>
                              <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-else>未知</span>
                            </div>
                          </el-col>
                        </el-row>
                      </el-card>
                      <el-card shadow='hover' :body-style="{padding:'10px'}" style="margin-top:10px">
                        <div slot="header" class="clearfix" style="font-size:16px;color: #606266;margin:-10px;">
                          <span>CPU信息:</span>
                        </div>
                        <el-row>
                          <el-col :xs="6" :sm="6" :lg="6" style="padding-left:20px;margin-top:5px;">
                            <div>
                              <span style="line-height: 18px;color: #606266;font-size: 14px;">CPU 15 minute Load:</span>
                              <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-if="VSNSTO.CPU15minuteLoad && VSNSTO.CPU15minuteLoad.length > 0">{{VSNSTO.CPU15minuteLoad}}</span>
                              <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-else>未知</span>
                            </div>
                          </el-col>
                          <el-col :xs="6" :sm="6" :lg="6" style="padding-left:20px;margin-top:5px;">
                            <div>
                              <span style="line-height: 18px;color: #606266;font-size: 14px;">CPU 5 minute Load:</span>
                              <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-if="VSNSTO.CPU5minuteLoad && VSNSTO.CPU5minuteLoad.length > 0">{{VSNSTO.CPU5minuteLoad}}</span>
                              <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-else>未知</span>
                            </div>
                          </el-col>
                          <el-col :xs="6" :sm="6" :lg="6" style="padding-left:20px;margin-top:5px;">
                            <div>
                              <span style="line-height: 18px;color: #606266;font-size: 14px;">CPU 1 minute Load:</span>
                              <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-if="VSNSTO.CPU1minuteLoad && VSNSTO.CPU1minuteLoad.length > 0">{{VSNSTO.CPU1minuteLoad}}</span>
                              <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-else>未知</span>
                            </div>
                          </el-col>
                        </el-row>
                      </el-card>
                        
                        
                      <el-card shadow='hover' :body-style="{padding:'10px'}" style="margin-top:10px">
                        <div slot="header" class="clearfix" style="font-size:16px;color: #606266;margin:-10px;">
                          <span>阵列信息:</span>
                        </div>
                        <el-row>
                          <el-col :xs="6" :sm="6" :lg="6" style="padding-left:20px;margin-top:5px;">
                            <div>
                              <span style="line-height: 18px;color: #606266;font-size: 14px;">阵列块设备名称:</span>
                              <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-if="VSNSTO.rbnRackDiskGroupLocation && VSNSTO.rbnRackDiskGroupLocation.length > 0">{{VSNSTO.rbnRackDiskGroupLocation}}</span>
                              <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-else>未知</span>
                            </div>
                          </el-col>
                          <el-col :xs="6" :sm="6" :lg="6" style="padding-left:20px;margin-top:5px;">
                            <div>
                              <span style="line-height: 18px;color: #606266;font-size: 14px;">阵列名称:</span>
                              <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-if="VSNSTO.rbnRackRaidName && VSNSTO.rbnRackRaidName.length > 0">{{VSNSTO.rbnRackRaidName}}</span>
                              <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-else>未知</span>
                            </div>
                          </el-col>
                          <el-col :xs="6" :sm="6" :lg="6" style="padding-left:20px;margin-top:5px;">
                            <div>
                              <span style="line-height: 18px;color: #606266;font-size: 14px;">阵列类型:</span>
                              <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-if="VSNSTO.rbnRackRaidType && VSNSTO.rbnRackRaidType.length > 0">{{VSNSTO.rbnRackRaidType}}</span>
                              <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-else>未知</span>
                            </div>
                          </el-col>
                          <el-col :xs="6" :sm="6" :lg="6" style="padding-left:20px;margin-top:5px;">
                            <div>
                              <span style="line-height: 18px;color: #606266;font-size: 14px;">阵列状态:</span>
                              <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-if="VSNSTO.rbnRackRaidServerStatus && VSNSTO.rbnRackRaidServerStatus.length > 0 && VSNSTO.rbnRackRaidServerStatus === '1'">正常</span>
                              <span style="line-height: 18px;color: red ;font-weight:bold;margin-left:10px;font-size: 14px;" v-else-if="VSNSTO.rbnRackRaidServerStatus && VSNSTO.rbnRackRaidServerStatus.length > 0 && VSNSTO.rbnRackRaidServerStatus === '2'">resync</span>
                              <span style="line-height: 18px;color: red ;font-weight:bold;margin-left:10px;font-size: 14px;" v-else-if="VSNSTO.rbnRackRaidServerStatus && VSNSTO.rbnRackRaidServerStatus.length > 0 && VSNSTO.rbnRackRaidServerStatus === '3'">recovery</span>
                              <span style="line-height: 18px;color: red ;font-weight:bold;margin-left:10px;font-size: 14px;" v-else-if="VSNSTO.rbnRackRaidServerStatus && VSNSTO.rbnRackRaidServerStatus.length > 0 && VSNSTO.rbnRackRaidServerStatus === '5'">degraded</span>
                              <span style="line-height: 18px;color: red ;font-weight:bold;margin-left:10px;font-size: 14px;" v-else-if="VSNSTO.rbnRackRaidServerStatus && VSNSTO.rbnRackRaidServerStatus.length > 0 && VSNSTO.rbnRackRaidServerStatus === '8'">disabled</span>
                              <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-else>未知</span>
                            </div>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :xs="24" :sm="24" :lg="24" style="padding-left:20px;margin-top:5px;">
                            <div>
                              <span style="line-height: 18px;color: #606266;font-size: 14px;">阵列磁盘盘符:</span>
                              <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-if="VSNSTO.rbnRackRaidDIskSlotList && VSNSTO.rbnRackRaidDIskSlotList.length > 0">{{VSNSTO.rbnRackRaidDIskSlotList}}</span>
                              <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-else>未知</span>
                            </div>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :xs="6" :sm="6" :lg="6" style="padding-left:20px;margin-top:5px;">
                            <div>
                              <span style="line-height: 18px;color: #606266;font-size: 14px;">阵列磁盘数量:</span>
                              <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-if="VSNSTO.rbnRackRaidNumofPhysicalDisk && VSNSTO.rbnRackRaidNumofPhysicalDisk.length > 0">{{VSNSTO.rbnRackRaidNumofPhysicalDisk}}</span>
                              <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-else>未知</span>
                            </div>
                          </el-col>
                          <el-col :xs="6" :sm="6" :lg="6" style="padding-left:20px;margin-top:5px;">
                            <div>
                              <span style="line-height: 18px;color: #606266;font-size: 14px;">阵列读速度:</span>
                              <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-if="VSNSTO.rbnRackRaidReadIO && VSNSTO.rbnRackRaidReadIO.length > 0">{{VSNSTO.rbnRackRaidReadIO}}</span>
                              <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-else>未知</span>
                            </div>
                          </el-col>
                          <el-col :xs="6" :sm="6" :lg="6" style="padding-left:20px;margin-top:5px;">
                            <div>
                              <span style="line-height: 18px;color: #606266;font-size: 14px;">阵列写速度:</span>
                              <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-if="VSNSTO.rbnRackRaidWriteIO && VSNSTO.rbnRackRaidWriteIO.length > 0">{{VSNSTO.rbnRackRaidWriteIO}}</span>
                              <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-else>未知</span>
                            </div>
                          </el-col>
                        </el-row>

                      </el-card>
                    </el-col>
                  </el-row>

                  <el-row :gutter="10" style="margin-top:10px;">
                    <el-col :xs="14" :sm="14" :lg="14">
                      <el-card>
                        <div slot="header" class="clearfix" style="font-size:16px;color: #606266;margin:-10px;">
                          <span>网卡信息:</span>
                        </div>
                        <el-table
                          :data="VSNSTO.network"
                          border
                          stripe
                          style="width: 100%; ">
                          <el-table-column
                            prop="bnNetworkLocation"
                            header-align="center"
                            align="center"
                            width="60"
                            label="网口">
                          </el-table-column>
                          <el-table-column
                            prop="bnNetworkMac"
                            header-align="center"
                            align="center"
                            width="160"
                            label="MAC地址">
                          </el-table-column>
                          <el-table-column
                            prop="bnNetworkIP"
                            header-align="center"
                            align="center"
                            width="150"
                            label="IP地址">
                          </el-table-column> 
                          <el-table-column
                            prop="bnNetworkInSpeed"
                            header-align="center"
                            align="center"
                            label="接收速率(KB/s)">
                          </el-table-column>
                          <el-table-column
                            prop="bnNetworkOutSpeed"
                            header-align="center"
                            align="center"
                            label="发送速率(KB/s)">
                          </el-table-column>
                          <el-table-column
                            prop="bnNetworkStarus"
                            header-align="center"
                            align="center"
                            width="100"
                            label="连接状态">
                          <template slot-scope="scope">
                            <el-tag v-if="scope.row.bnNetworkStarus === '0'" size="small" type="success">正常</el-tag>
                            <el-tag v-else-if="scope.row.bnNetworkStarus === '1'" size="small" type="warning">不稳定</el-tag>
                            <el-tag v-else-if="scope.row.bnNetworkStarus === '2'" size="small" type="danger">掉线</el-tag>
                            <el-tag v-else size="small">其他</el-tag>
                          </template>
                        </el-table-column>
                      </el-table>
                      </el-card>
                    </el-col>
                     <el-col :xs="10" :sm="10" :lg="10">
                      <el-card>
                        <div slot="header" class="clearfix" style="font-size:16px;color: #606266;margin:-10px;">
                          <span>风扇信息:</span>
                        </div>
                        <el-table
                          :data="VSNSTO.fan"
                          border
                          stripe
                          style="width: 100%; ">
                          <el-table-column
                            prop="bnRackFanLocation"
                            header-align="center"
                            align="center"
                            label="风扇名称">
                          </el-table-column>
                          <el-table-column
                            prop="bnRackFanSpeed"
                            header-align="center"
                            align="center"
                            width="80"
                            label="转速">
                          </el-table-column>
                          <el-table-column
                            prop="bnRackFanType"
                            header-align="center"
                            align="center"
                            width="100"
                            label="风扇类型">
                          </el-table-column> 
                          <el-table-column
                            prop="bnRackFanStauts"
                            header-align="center"
                            align="center"
                            width="100"
                            label="状态">
                          <template slot-scope="scope">
                            <el-tag v-if="scope.row.bnRackFanStauts === '0'" size="small" type="success">正常</el-tag>
                            <el-tag v-else-if="scope.row.bnRackFanStauts === '1'" size="small" type="danger">异常</el-tag>
                            <el-tag v-else-if="scope.row.bnRackFanStauts === '2'" size="small" type="danger">slow</el-tag>
                            <el-tag v-else-if="scope.row.bnRackFanStauts === '3'" size="small" type="danger">disabled</el-tag>
                            <el-tag v-else-if="scope.row.bnRackFanStauts === '4'" size="small" type="danger">notexist</el-tag>
                            <el-tag v-else size="small">其他</el-tag>
                          </template>
                        </el-table-column>
                      </el-table>
                      </el-card>
                    </el-col>
                  </el-row>

                  <el-row  style="margin-top:10px;">
                    <el-col :xs="24" :sm="24" :lg="24" >
                      <el-card>
                        <div slot="header" class="clearfix" style="font-size:16px;color: #606266;margin:-10px;">
                          <span>磁盘信息:</span>
                        </div>
                        <el-table
                          :data="VSNSTO.disk"
                          border
                          height="500"
                          stripe
                          style="width: 100%; ">
                          <el-table-column
                            prop="bnRackDiskLocation"
                            header-align="center"
                            align="center"
                            width="80"
                            label="盘位">
                          </el-table-column>
                          <el-table-column
                            prop="bnRackDiskModelNumber"
                            header-align="center"
                            align="center"
                            width="100"
                            label="供应商">
                          </el-table-column>
                          <el-table-column
                            prop="bnRackDiskSerialNumber"
                            header-align="center"
                            align="center"
                            label="型号">
                          </el-table-column> 
                          <el-table-column
                            prop="bnRackDiskRawCapacity"
                            header-align="center"
                            align="center"
                            width="100"
                            label="容量(M)">
                          </el-table-column>
                          <el-table-column
                            prop="bnRackDiskReadIO"
                            header-align="center"
                            align="center"
                            width="100"
                            label="读速度(kps)">
                          </el-table-column>
                          <el-table-column
                            prop="bnRackDiskWriteIO"
                            header-align="center"
                            align="center"
                            width="100"
                            label="写速度(kps)">
                        </el-table-column>
                          <el-table-column
                            prop="bnRackDiskGroup"
                            header-align="center"
                            align="center"
                            label="属组">
                          </el-table-column>
                          <el-table-column
                            prop="bnRackDiskStatus"
                            header-align="center"
                            align="center"
                            width="80"
                            label="状态">
                          <template slot-scope="scope">
                            <el-tag v-if="scope.row.bnRackDiskStatus === '0'" size="small" type="success">正常</el-tag>
                            <el-tag v-else size="small" type="danger">异常</el-tag>
                          </template>
                        </el-table-column>
                      </el-table>
                      </el-card>
                    </el-col>
                  </el-row>

                </el-card>
                <el-card v-else-if="deviceType === 'WorkSt'">
                  <div>
                    <el-row style="margin-top:10px;" :gutter="15">
                      <el-col :xs="6" :sm="6" :lg="6" style="">
                        <div>
                          <span style="line-height: 18px;color: #606266;font-size: 16px;">设备信息</span>
                        </div>
                        <div style="padding-top: 15px;">
                          <span style="line-height: 18px;color: #606266;font-size: 14px;">设备名:</span>
                          <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-if="WorkSt.Devicename && WorkSt.Devicename.length > 0">{{WorkSt.Devicename}}</span>
                          <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-else>未知</span>
                        </div>
                        <div style="padding-top: 15px;">
                          <span style="line-height: 18px;color: #606266;font-size: 14px;">设备描述:</span>
                          <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-if="WorkSt.Devicedescription && WorkSt.Devicedescription.length > 0">{{WorkSt.Devicedescription}}</span>
                          <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-else>未知</span>
                        </div>
                        <div style="padding-top: 15px;">
                          <span style="line-height: 18px;color: #606266;font-size: 14px;">设备位置:</span>
                          <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-if="WorkSt.Devicelocation && WorkSt.Devicelocation.length > 0">{{WorkSt.Devicelocation}}</span>
                          <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-else>未知</span>
                        </div>
                        <div style="padding-top: 15px;">
                          <span style="line-height: 18px;color: #606266;font-size: 14px;">开机时长:</span>
                          <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-if="WorkSt.Deviceuptime && WorkSt.Deviceuptime.length > 0">{{WorkSt.Deviceuptime | formatHowLongBySec}}</span>
                          <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;" v-else>未知</span>
                        </div>
                      </el-col>
                      <el-col :xs="6" :sm="6" :lg="6" style="">
                        <div class="card-panel-location">
                          <span style="margin-left:5px;line-height: 18px;color: #606266;font-size: 16px;">CPU使用率:</span>
                        </div>
                        <div v-if="WorkSt.CPU == null || WorkSt.CPU == ''">
                          <p  style="height:20px;line-height:20px;font-size:10px;color: #606266;"><span>暂无数据</span></p>
                        </div>
                        <div style="" v-else>
                          <div style="padding-top: 15px;" v-for="(item, index) in WorkSt.CPU" :key="index">
                            <span style="line-height: 18px;color: #606266;font-size: 14px;">{{item.itemName}}</span>
                            <span style="line-height: 18px;color: #606266;margin-left:10px;font-size: 14px;">{{item.itemValue}}</span>
                          </div>
                        </div>
                      </el-col>
                      <el-col :xs="6" :sm="6" :lg="6" style="">
                        <div class="card-panel-location" style="margin-left:10px;">
                          <span style="margin-left:5px; line-height: 18px;color: #606266;font-size: 16px;">内存占用率:</span>
                        </div>
                        <div v-if="WorkSt.memoryUtilization == null || WorkSt.memoryUtilization == ''">
                            <p  style="height:20px;line-height:20px;font-size:10px;color: #606266;"><span>暂无数据</span></p>
                        </div>
                        <div style="" v-else>
                            <div style="padding-top: 30px;text-align:center; ">
                                <p style="">
                                    <el-progress :stroke-width="8" type="circle" :width="120" :percentage="parseFloat(WorkSt.memoryUtilization)" color="#FBB03B"></el-progress>
                                </p>
                            </div>
                        </div> 
                      </el-col>
                      <el-col :xs="6" :sm="6" :lg="6" style="">
                        <div class="card-panel-location"  style="margin-left:10px;">
                          <span style="margin-left:5px;line-height: 18px;color: #606266;font-size: 14px;">硬盘占用率:</span>
                        </div>
                        <div v-if="WorkSt.storage == null || WorkSt.storage== ''">
                            <p  style="height:20px;line-height:20px;font-size:10px;color: #606266;"><span>暂无数据</span></p>
                        </div>
                        <div v-else style="padding-top: 15px;">
                            <div style="margin-left:20px; margin-top:6px; width:80%;" v-for="item in WorkSt.storage">
                                <div>
                                  <span style="font-size:10px;color:#606266;">{{item.itemName}}</span><span style="float:right;font-size:12px;color: #606266;">{{item.itemValue}} %</span>
                                </div>
                                <div>
                                  <el-progress :stroke-width='8' :percentage="parseFloat(item.itemValue)" :show-text="false" color="#37a2da"></el-progress>
                                </div>
                            </div> 
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-card>
                <el-card v-else>
                </el-card>
            </el-main>
        </el-container>
    </div>
</template>

<script>
  // 在月份、日期、小时等小于10前面补0
    var padDate = function (value) {
      return value < 10 ? '0' + value : value
    }
    export default {
      data () {
        return {
          clusterList: '',
          nodeInfoList: '',
          dataListLoading: false,
          psn: '',
          deviceType: '',
          VSNSTO: '',
          WorkSt: '',
          loading2: false,
          isShow: false
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
        },
        formatHowLong (mss) {
          let days = Math.floor(mss / (100 * 60 * 60 * 24))
          let hours = Math.floor((mss % (100 * 60 * 60 * 24)) / (100 * 60 * 60))
          // let minutes = Math.floor((mss % (1000 * 60 * 60)) / (1000 * 60))
          // let seconds = Math.round((mss % (1000 * 60)) / 1000)
          return days + '天' + hours + '小时'
        },
        formatHowLongBySec (mss) {
          let days = Math.floor(mss / (60 * 60 * 24))
          let hours = Math.floor((mss % (60 * 60 * 24)) / (60 * 60))
          // let minutes = Math.floor((mss % (1000 * 60 * 60)) / (1000 * 60))
          // let seconds = Math.round((mss % (1000 * 60)) / 1000)
          return days + '天' + hours + '小时'
        }
      },
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
        // getNodeInfo (psn) {
        //   this.dataListLoading = true
        //   this.$http({
        //     url: this.$http.adornUrl('/storage/nodeInfo'),
        //     method: 'get',
        //     params: this.$http.adornParams({
        //       'carrierpsn': psn
        //     }, false)
        //   }).then(({data}) => {
        //     if (data && data.code === 0) {
        //       this.dataListLoading = false
        //       console.log(data.list)
        //       this.nodeInfoList = data.list
        //     } else {
        //       this.dataListLoading = false
        //     }
        //   })
        // }
        getHostDetailForNewShow (hostId, hostName, index) {
          this.loading2 = true
          this.isShow = true
          // 修改元素的样式
          this.$refs.hostCard.forEach((item) => {
            item.children[0].style.backgroundColor = 'white'
            item.children[0].style.color = 'rgba(0, 0, 0, 0.45)'
          })
          this.$refs.hostCard[index].children[0].style.backgroundColor = '#38c0dc'
          this.$refs.hostCard[index].children[0].style.color = 'white'
          this.$http({
            url: this.$http.adornUrl('/convergeDeviceInfo/getHostDetailForNewShow'),
            method: 'get',
            params: this.$http.adornParams({
              'psn': this.psn,
              'hostId': hostId,
              'hostName': hostName
            }, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.loading2 = false
              console.log(data)
              this.deviceType = data.deviceType
              this.VSNSTO = data.VSNSTO
              this.WorkSt = data.WorkSt
            } else {
              this.loading2 = false
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