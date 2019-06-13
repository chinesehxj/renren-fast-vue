<style>
.div_title {
  margin-top: -20px;
  margin-left: -20px;
  margin-right: -20px;
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
        <div class='div_title'>
            <span class='span_serverName'>{{computerName}} 详细信息</span>
            <span style="font-size: 14px;margin-left: 10px;color: #919191;">(最新数据采集于:{{collectTime}})</span>
            <span class='span_serverName' style="float:right;margin-right:10px;">
                <el-button @click="goBack" size="small" icon="el-icon-back" type="primary" plain>返回</el-button>
            </span>
        
            <el-tabs type="border-card" v-model="activeName">
                <el-tab-pane label="实时数据" name="1">
                    <div class='content'>
                        <el-row style="margin-top:15px;">
                            <el-col :span='24'>
                                <el-card shadow='hover'>
                                    <div class='div_item_title'>
                                        <span class='span_item_title'>cpu信息</span>
                                    </div>
                                    <div v-loading="cpuInfoLoading">
                                        <el-row :gutter='8' >
                                            <el-col :span="18" style="margin-top:15px;">
                                                <el-card shadow='hover'>
                                                    <div class='div_item_title userate_card'>
                                                        <span class='span_item_title '>使用率</span>
                                                    </div>
                                                    <div>
                                                        <el-row>
                                                            <el-col :span="5" style="text-align:center;padding-top:50px;">
                                                                <!-- <el-progress type="circle" :percentage="80" :stroke-width="10" :width="200" color="#8e71c7"></el-progress> -->
                                                                <div id="gaugeChart" style='width:150px;height:150px' >
                                                                </div>
                                                            </el-col>
                                                            <el-col :span="19">
                                                                <div id="lineChart" style="width:750px;height:400px;" ></div>
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
                                                                            <i-circle :size="110" :trail-width="4" :stroke-width="5" :percent="parseFloat(item.sensorValue)" stroke-linecap="round" stroke-color="#43a3fb">
                                                                                <div class="">
                                                                                    <i class="iconfont el-icon-dms-icon-test" style="font-size:30px;margin-top:4px;color:#43a3fb"></i>
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
                                    <div v-if="mainBoardList == null || mainBoardList == ''">
                                        <p  style="height:20px;line-height:20px;font-size:12px;"><span>暂无数据</span></p>
                                    </div>
                                    <div v-else>
                                        <div style="height:30px; margin-top:10px;  border-bottom:1px solid #eaeef2">
                                            <p class="p_content_item" style="font-size:14px;"><span>计算机名:</span><span style="float:right;">{{computerName}}</span></p>
                                        </div>
                                        <div style="height:30px; margin-top:10px;  border-bottom:1px solid #eaeef2">
                                            <p class="p_content_item" style="font-size:14px;"><span>主板型号:</span><span style="float:right; width:190px; overflow: hidden;text-overflow: ellipsis;white-space: nowrap;text-align: right;">{{mainBoardVender}}</span></p>
                                        </div>
                                        <div style="height:auto;margin-top:10px;  border-bottom:1px solid #eaeef2" v-for="item in mainBoardList">
                                            <p class="p_content_item" style="font-size:14px;"><span>{{item.sensorName}}</span><span style="float:right;">{{item.sensorValue}}{{item.sensorUnit}}</span></p>
                                            <p style="height:20px" v-show="item.sensorClass == 'Utilization'">
                                                <el-progress :stroke-width="8" :percentage="parseFloat(item.sensorValue)" :show-text="false" color="#67C23A"></el-progress>
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
                                    <div v-if="networkIntface == null || networkIntface == ''">
                                        <p  style="height:20px;line-height:20px;font-size:12px;"><span>暂无数据</span></p>
                                    </div>
                                    <div v-else>
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
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span='6'>
                                <el-card shadow='hover'>
                                    <div class='div_item_title'>
                                        <span class='span_item_title'>硬盘信息</span>
                                    </div>
                                    <div v-if="driverList == null || driverList == ''">
                                        <p  style="height:20px;line-height:20px;font-size:12px;"><span>暂无数据</span></p>
                                    </div>
                                    <div v-else>
                                        <div v-for="item in driverList">
                                            <div style="height:30px; margin-top:10px; border-bottom:1px solid #eaeef2" v-show="isNewItem(item.deviceName)">
                                                <p class="p_content_item" style="font-size:14px;">{{item.deviceName}}</p>
                                            </div>
                                            <div>
                                                <p class="p_content_item" style="font-size:12px;"><span>{{item.sensorName}}</span><span style="float:right;">{{item.sensorValue}} {{item.sensorUnit}}</span></p>
                                                <p style="height:20px" v-show="item.sensorClass == 'Utilization'">
                                                    <el-progress :stroke-width='8' :percentage="parseFloat(item.sensorValue)" :show-text='false' color="#67C23A"></el-progress>
                                                </p>
                                            </div>
                                        </div> 
                                    </div>
                                </el-card>
                            </el-col>
                            
                            <el-col :span='6'>
                                <el-card shadow='hover'>
                                    <div class='div_item_title'>
                                        <span class='span_item_title'>显卡信息</span>
                                    </div>
                                    <div v-if="displayAdapterList == null || displayAdapterList == ''">
                                        <p  style="height:20px;line-height:20px;font-size:12px;"><span>暂无数据</span></p>
                                    </div>
                                    <div v-else>
                                        <div v-for="item in displayAdapterList">
                                            <div style="height:30px; margin-top:10px; border-bottom:1px solid #eaeef2" v-show="isNewItem(item.deviceName)">
                                                <p class="p_content_item" style="font-size:14px;">{{item.deviceName}}</p>
                                            </div>
                                            <div>
                                                <p class="p_content_item" style="font-size:12px;"><span>{{item.sensorName}}</span><span style="float:right;">{{item.sensorValue}} {{item.sensorUnit}}</span></p>
                                                <p style="height:20px" v-show="item.sensorClass == 'Utilization'">
                                                    <el-progress :stroke-width='8' :percentage="parseFloat(item.sensorValue)" :show-text='false' color="#67C23A"></el-progress>
                                                </p>
                                            </div>
                                        </div> 
                                    </div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="告警信息" name="2">
                    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getCautionList()">
                        <el-form-item>
                        <el-date-picker
                            size="small"
                            v-model="dataForm.timeRange"
                            type="datetimerange"
                            align="right"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['00:00:00', '00:00:00']"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            @change="getDateTimeStr">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-select v-model="dataForm.cautionId" size="small" multiple placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.paramKey"
                                :label="item.paramValue"
                                :value="item.paramKey">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                        <el-input v-model="dataForm.cautionText" size="small" placeholder="告警内容" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                        <el-button @click="getCautionList()" size="small" icon="el-icon-search">查询</el-button>
                        </el-form-item>
                    </el-form>
                    <el-row :gutter='8'>
                        <el-col :span="14">
                            <el-table
                                :data="cautionDataList"
                                border
                                highlight-current-row
                                @current-change="handleCurrentChange"
                                v-loading="dataListLoading"
                                style="width: 100%; ">
                                <el-table-column
                                    type="index"
                                    header-align="center"
                                    align="center"
                                    width="80"
                                    label="序号">
                                    </el-table-column>
                                <el-table-column
                                    prop="recordId"
                                    header-align="center"
                                    align="center"
                                    v-if="false"
                                    width="100"
                                    label="recordId">
                                </el-table-column>
                                <el-table-column
                                    prop="recordTime"
                                    header-align="center"
                                    align="center"
                                    label="告警时间">
                                </el-table-column>
                                <el-table-column
                                    prop="carrierPSN"
                                    header-align="center"
                                    align="center"
                                    v-if="false"
                                    width="100"
                                    label="PSN">
                                </el-table-column>
                                <el-table-column
                                    prop="cautionId"
                                    header-align="center"
                                    align="center"
                                    v-if="false"
                                    width="120"
                                    label="告警ID">
                                </el-table-column>
                                <el-table-column
                                    prop="cautionText"
                                    header-align="center"
                                    align="center"
                                    label="告警内容">
                                </el-table-column>
                                <el-table-column
                                    prop="historyRecordId"
                                    header-align="center"
                                    align="center"
                                    width="120"
                                    v-if="false"
                                    label="详细记录id">
                                </el-table-column>
                               <!-- <el-table-column
                                    prop="roomName"
                                    header-align="center"
                                    align="center"
                                    width="120"
                                    label="机房名">
                                </el-table-column>
                                <el-table-column
                                    prop="frameName"
                                    header-align="center"
                                    align="center"
                                    width="120"
                                    label="机柜名(编号)">
                                </el-table-column>
                                <el-table-column
                                    prop="serverCode"
                                    header-align="center"
                                    align="center"
                                    width="120"
                                    label="服务器名(编号)">
                                </el-table-column>
                                <el-table-column
                                    prop="comment"
                                    header-align="center"
                                    align="center"
                                    width="200"
                                    label="备注说明">
                                </el-table-column>
                                <el-table-column
                                    fixed="right"
                                    header-align="center"
                                    align="center"
                                    width="80"
                                    label="操作">
                                    <template slot-scope="scope" >
                                    <el-tooltip content="查看详情" :open-delay="1500" :hide-after="5000">
                                        <el-button  type="primary" icon="el-icon-document"  size="mini" @click="addOrUpdateHandle(scope.row.historyRecordId)" circle></el-button>
                                    </el-tooltip>
                                    </template>
                                </el-table-column> -->
                                </el-table>
                                <el-pagination
                                @size-change="sizeChangeHandle"
                                @current-change="currentChangeHandle"
                                :current-page="pageIndex"
                                :page-sizes="[10, 20, 50, 100]"
                                :page-size="pageSize"
                                :total="totalPage"
                                layout="total, sizes, prev, pager, next, jumper">
                                </el-pagination>
                        </el-col>
                        <el-col :span="10">
                            <el-card>
                                <div style="margin-top:-10px; margin-bottom:-10px;">
                                <el-row>
                                    <el-col :span="12">
                                        <div>
                                            <p class="p_content_item" style="font-size:14px;color: #919191;"><span>机房名:</span><span style="margin-left:5px;color: #919191;">{{roomName}}</span></p>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div>
                                            <p class="p_content_item" style="font-size:14px;color: #919191;"><span>机柜名:</span><span style="margin-left:5px;color: #919191;">{{frameName}}</span></p>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="24">
                                        <div>
                                            <p class="p_content_item" style="font-size:14px;color: #919191;"><span>备注:</span><span style="margin-left:5px;color: #919191;">{{comment}}</span></p>
                                        </div>
                                    </el-col>
                                </el-row>
                                </div>
                            </el-card>
                            <div v-show="detailShowFlag" style="margin-top: 10px;">
                            <el-tabs tab-position="left" type="border-card" style="height: auto;">
                                <el-tab-pane >
                                    <span slot="label">
                                        <el-tooltip content="主板" :open-delay="500" :hide-after="5000">
                                            <i class="iconfont el-icon-dms-zhubanmainboard" style="font-size:30px;margin-top:4px"></i>
                                        </el-tooltip>
                                    </span>
                                    <div v-if="cautionMainBoard == null || cautionMainBoard == ''">
                                        <p  style="height:20px;line-height:20px;font-size:12px;"><span>暂无数据</span></p>
                                    </div>
                                    <div v-else>
                                        <div style="height:30px; margin-top:10px;  border-bottom:1px solid #eaeef2">
                                            <p class="p_content_item" style="font-size:14px;"><span>计算机名:</span><span style="float:right;">{{computerName}}</span></p>
                                        </div>
                                        <div style="height:30px; margin-top:10px;  border-bottom:1px solid #eaeef2">
                                            <p class="p_content_item" style="font-size:14px;"><span>主板型号:</span><span style="float:right; width:190px; overflow: hidden;text-overflow: ellipsis;white-space: nowrap;text-align: right;">{{mainBoardVender}}</span></p>
                                        </div>
                                        <div style="height:auto;margin-top:10px;  border-bottom:1px solid #eaeef2" v-for="item in cautionMainBoard">
                                            <p class="p_content_item" style="font-size:14px;"><span>{{item.sensorName}}</span><span style="float:right;">{{item.sensorValue}}{{item.sensorUnit}}</span></p>
                                            <p style="height:20px" v-show="item.sensorClass == 'Utilization'">
                                                <el-progress :stroke-width="8" :percentage="parseFloat(item.sensorValue)" :show-text="false" color="#67C23A"></el-progress>
                                            </p>
                                        </div>
                                    </div> 
                                </el-tab-pane>
                                <el-tab-pane>
                                    <span slot="label" >
                                        <el-tooltip content="CPU" :open-delay="500" :hide-after="5000">
                                            <i class="iconfont el-icon-dms-CPU" style="font-size:26px;;margin-top:5px"></i>
                                        </el-tooltip>
                                    </span>
                                    <div style="border-bottom: 1px solid #eaeef2;">
                                        <span style="font-size:16px">温度</span>
                                    </div>
                                    <div v-for="item in cautionCpu.Temperature">
                                        <div>
                                            <p class="p_content_item" style="font-size:12px;"><span>{{item.deviceName}}</span><span style="float:right;">{{item.sensorValue}} ℃</span></p>
                                        </div>
                                    </div>
                                    <div style="border-bottom: 1px solid #eaeef2; margin-top:10px;">
                                        <span style="font-size:16px">电压</span>
                                    </div>
                                    <div v-for="VoltageItem in cautionCpu.Voltage">
                                        <div v-show="isNewItem(VoltageItem.deviceName)" style="height:30px; margin-top:10px;  border-bottom:1px solid #eaeef2">
                                            <p class="p_content_item">{{VoltageItem.deviceName}}</p>
                                        </div>
                                        <div>
                                            <p class="p_content_item" style="font-size:12px;"><span>{{VoltageItem.sensorName}}</span><span style="float:right;">{{VoltageItem.sensorValue}} V</span></p>
                                        </div>
                                    </div>
                                    <div style="border-bottom: 1px solid #eaeef2; margin-top:10px;">
                                        <span style="font-size:16px">使用率</span>
                                    </div>
                                    <div v-for="item in cautionCpu.Utilization">
                                        <div>
                                            <p class="p_content_item" style="font-size:12px;"><span>{{item.deviceName}}</span><span style="float:right;">{{item.sensorValue}} %</span></p>
                                            <p style="height:20px" v-show="item.sensorClass == 'Utilization'">
                                                <el-progress :stroke-width='8' :percentage="parseFloat(item.sensorValue)" :show-text='false' color="#67C23A"></el-progress>
                                            </p>
                                        </div>
                                    </div>

                                </el-tab-pane>
                                <el-tab-pane>
                                    <span slot="label" >
                                        <el-tooltip content="内存" :open-delay="500" :hide-after="5000">
                                            <i class="iconfont el-icon-dms-neicun" style="font-size:30px;;margin-top:5px"></i>
                                        </el-tooltip>
                                    </span>
                                    <div v-if="cautionMemory == null || cautionMemory == ''">
                                        <p  style="height:20px;line-height:20px;font-size:12px;"><span>暂无数据</span></p>
                                    </div>
                                    <div v-else>
                                        <div v-for="item in cautionMemory">
                                            <div style="height:30px; margin-top:10px;  border-bottom:1px solid #eaeef2">
                                                <p class="p_content_item">{{item.deviceName}}</p>
                                            </div>
                                            <div>
                                                <p class="p_content_item"><span>{{item.sensorName}}</span><span style="float:right;">{{item.sensorValue}} {{item.sensorUnit}}</span></p>
                                            </div>
                                        </div> 
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane>
                                    <span slot="label" >
                                        <el-tooltip content="硬盘" :open-delay="500" :hide-after="5000">
                                            <i class="iconfont el-icon-dms-yingpan" style="font-size:30px;;margin-top:5px"></i>
                                        </el-tooltip>
                                    </span>
                                    <div v-if="cautionDriver == null || cautionDriver == ''">
                                        <p  style="height:20px;line-height:20px;font-size:12px;"><span>暂无数据</span></p>
                                    </div>
                                    <div v-else>
                                        <div v-for="item in cautionDriver">
                                            <div style="height:30px; margin-top:10px; border-bottom:1px solid #eaeef2" v-show="isNewItem(item.deviceName)">
                                                <p class="p_content_item" style="font-size:14px;">{{item.deviceName}}</p>
                                            </div>
                                            <div>
                                                <p class="p_content_item" style="font-size:12px;"><span>{{item.sensorName}}</span><span style="float:right;">{{item.sensorValue}} {{item.sensorUnit}}</span></p>
                                                <p style="height:20px" v-show="item.sensorClass == 'Utilization'">
                                                    <el-progress :stroke-width='8' :percentage="parseFloat(item.sensorValue)" :show-text='false' color="#67C23A"></el-progress>
                                                </p>
                                            </div>
                                        </div> 
                                    </div>

                                </el-tab-pane>
                                <el-tab-pane>
                                    <span slot="label" >
                                        <el-tooltip content="网卡" :open-delay="500" :hide-after="5000">
                                            <i class="iconfont el-icon-dms-portal-icon-bangdingxunijiwangqia" style="font-size:30px;;margin-top:5px"></i>
                                        </el-tooltip>
                                    </span>
                                    <div v-if="cautionNetwork == null || cautionNetwork == ''">
                                        <p  style="height:20px;line-height:20px;font-size:12px;"><span>暂无数据</span></p>
                                    </div>
                                    <div v-else>
                                        <div v-for="(item,index) in cautionNetwork">
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
                                    </div>

                                </el-tab-pane>
                                <el-tab-pane>
                                    <span slot="label" >
                                        <el-tooltip content="显卡" :open-delay="500" :hide-after="5000">
                                            <i class="iconfont el-icon-dms-xianqia" style="font-size:30px;;margin-top:5px"></i>
                                        </el-tooltip>
                                    </span>
                                    <div v-if="cautionDisplay == null || cautionDisplay == ''">
                                        <p  style="height:20px;line-height:20px;font-size:12px;"><span>暂无数据</span></p>
                                    </div>
                                    <div v-else>
                                        <div v-for="item in cautionDisplay">
                                            <div style="height:30px; margin-top:10px; border-bottom:1px solid #eaeef2" v-show="isNewItem(item.deviceName)">
                                                <p class="p_content_item" style="font-size:14px;">{{item.deviceName}}</p>
                                            </div>
                                            <div>
                                                <p class="p_content_item" style="font-size:12px;"><span>{{item.sensorName}} {{item.sensorClass}}</span><span style="float:right;">{{item.sensorValue}} {{item.sensorUnit}}</span></p>
                                                <p style="height:20px" v-show="item.sensorClass == 'Utilization'">
                                                    <el-progress :stroke-width='8' :percentage="parseFloat(item.sensorValue)" :show-text='false' color="#67C23A"></el-progress>
                                                </p>
                                            </div>
                                        </div> 
                                    </div>

                                </el-tab-pane>
                            </el-tabs>
                            </div>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
        </div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons')
let newItemNameFlag = ''
var xAxisData = []
var legendData = []
var seriesData = []
var IntervalObject = ''
export default {
  data () {
    return {
      dataForm: {
        timeRange: '',
        cautionId: '',
        cautionText: ''
      },
      cpuInfoLoading: false,
      options: [],
      activeName: '1',
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
      cautionDataList: [],
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      cpuUtilizationAvg: 0,
      paramsPsn: '',
      roomName: '',
      frameName: '',
      serverCode: '',
      comment: '',
      displayAdapterList: '',
      detailShowFlag: false,
      cautionMainBoard: '',
      cautionCpu: '',
      cautionMemory: '',
      cautionNetwork: '',
      cautionDriver: '',
      cautionDisplay: ''
    }
  },
  watch: {
    activeName: function (val) {
      if (val === '2') {
        this.getCautionList()
      }
    }
  },
  methods: {
    goBack () {
      clearInterval(IntervalObject)
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
    initView (psn, roomName, frameName, serverCode, comment) {
      // 初始化数据
      xAxisData.splice(0, xAxisData.length)
      legendData.splice(0, legendData.length)
      seriesData.splice(0, seriesData.length)
      if (IntervalObject !== null && IntervalObject !== '') {
        clearInterval(IntervalObject)
        console.log('************clear interval**********')
      }
    //   xAxisData = []
    //   legendData = []
    //   seriesData = []
      this.paramsPsn = psn
      this.roomName = roomName
      this.frameName = frameName
      this.serverCode = serverCode
      this.comment = comment
      this.getDataList()
      var vmObject = this
      IntervalObject = setInterval(
        function () {
          vmObject.getDataList()
        }, 120000)
    },
    getDataList () {
      this.cpuInfoLoading = true
      this.$http({
        url: this.$http.adornUrl('/device/info'),
        method: 'get',
        params: this.$http.adornParams({
          'carrierpsn': this.paramsPsn
        }, false)
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.mainBoardList = data.info.Mainboard
          // this.serverName = data.info.Mainboard[0].computerName
          this.collectTime = data.info.Mainboard[0].dateTimeStr
          this.computerName = data.info.Mainboard[0].computerName
          this.mainBoardVender = data.info.Mainboard[0].deviceName
          this.networkIntface = data.info.NetworkInterface
          this.memoryList = data.info.MemoryModule
          this.driverList = data.info.Drive
          this.displayAdapterList = data.info.DisplayAdapter
        } else {}
      })
      this.$http({
        url: this.$http.adornUrl('/device/cpuInfo'),
        method: 'get',
        params: this.$http.adornParams({
          'carrierpsn': this.paramsPsn
        }, false)
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.cpuInfoLoading = false
          console.log(data)
          this.cpuInfo = data.info
          this.cpuUtilizationAvg = data.info.cpuUtilizationAvg
          charData(data.info.Utilization)
          initGaugeChart(this.cpuUtilizationAvg)
        } else {
          this.cpuInfoLoading = false
        }
      })
    },
    getCautionList () {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/sys/sysparam/selectCautionItems'),
        method: 'get',
        params: this.$http.adornParams({
          'param_type': 'caution_type',
          'parent_id': 0
        }, false)
      }).then(({data}) => {
        this.options = data && data.code === 0 ? data.page : []
      })
      this.$http({
        url: this.$http.adornUrl('/device/noticeInfo'),
        method: 'post',
        data: this.$http.adornData({
          'carrierPSNList': this.paramsPsn,
          'cautionIDList': this.dataForm.cautionId,
          'timeRange': this.dataForm.timeRange,
          'keyWord': this.dataForm.cautionText,
          'pageIndex': this.pageIndex,
          'pageSize': this.pageSize
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          console.log(data)
          this.cautionDataList = data.page.list
          this.totalPage = data.page.totalCount
        } else {}
        this.dataListLoading = false
      })
    },
    getDateTimeStr (val) {
      this.dataForm.timeRange = val
    },
    handleCurrentChange (val) {
      // 如果选中了记录
      if (val) {
        if (val.historyRecordId !== 0) {
          this.$http({
            url: this.$http.adornUrl('/device/noticeDetail'),
            method: 'get',
            params: this.$http.adornParams({
              'recordId': val.historyRecordId
            }, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.cautionMainBoard = data.info.Mainboard
              this.cautionNetwork = data.info.NetworkInterface
              this.cautionMemory = data.info.MemoryModule
              this.cautionDriver = data.info.Drive
              this.cautionDisplay = data.info.DisplayAdapter
            }
          })
          this.$http({
            url: this.$http.adornUrl('/device/noticeCpuDetail'),
            method: 'get',
            params: this.$http.adornParams({
              'recordId': val.historyRecordId
            }, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.cautionCpu = data.info
            } else {}
          })
          this.detailShowFlag = true
        } else {
          this.$message({
            message: '[下线]类告警无详细告警信息!',
            showClose: true,
            type: 'warning',
            duration: 5000
          })
        }
      }
      console.log('rowContent:' + val.carrierPSN + ' ' + val.historyRecordId)
    },
    // 每页数
    sizeChangeHandle (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getCautionList()
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageIndex = val
      this.getCautionList()
    }
  }
}
function charData (dataList) {
  // var utilValue = 0
  // xAxisData.push(dataList[0].timeString)
  for (var i = 0; i < dataList.length; i++) {
    var legName = dataList[i].deviceName
    var timeStr = dataList[i].timeString
    var timeIndex = xAxisData.indexOf(timeStr)
    var arrIndex = legendData.indexOf(legName)
    if (timeIndex === -1) {
      xAxisData.push(timeStr)
    }
    // utilValue = parseFloat(utilValue) + parseFloat(dataList[i].sensorValue)
    if (arrIndex === -1) {
      legendData.push(legName)
      seriesData.push({'name': legName, 'type': 'line', 'smooth': false, 'data': [dataList[i].sensorValue]})
    } else {
      seriesData[arrIndex].data.push(dataList[i].sensorValue)
    }
  }
  normalLineChart('lineChart', 'cpu使用率', JSON.stringify(legendData), '%', JSON.stringify(xAxisData), JSON.stringify(seriesData))
  // initGaugeChart(utilValue / dataList.length)
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
      bottom: 80,
      top: 40,
      containLabel: true
    },
    legend: {
      bottom: 20,
      data: JSON.parse(legendData),
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
    dataZoom: [{
      type: 'slider',
      start: 90,
      end: 100,
      bottom: 50
    }],
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: JSON.parse(xAxisData)
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} ' + unitStr
      }
    },
    series: JSON.parse(seriesData)
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