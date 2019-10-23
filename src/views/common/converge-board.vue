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
              <span style="line-height:45px;color:white;font-size:30px;letter-spacing:3px;font-weight:bold;margin-left:10px;margin-right:10px">HORUS硬件监测平台</span>
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
        <div style="text-align:right;height:50px;">
          <dv-decoration-3 style="margin-left: 260px;width:250px;height:30px;" />
        </div>
      </el-col>
    </el-row>
    
    <div v-loading="dataListLoading" style="height: 967px;">
      <el-row :gutter="10" style="margin-top:30px;">
        <el-col :xs="12" :sm="12" :lg="12" v-for="(VSNSTOItem,index) in VSNSTOList"  :key="index">
          <dv-border-box-10 style="height:280px;">
            <div class="div_item_title" >
              <span style="line-height: 18px;color: white ;font-size: 16px;">存储: {{VSNSTOItem.hostName}}</span>
              <span style="line-height: 18px;color: white ;font-size: 16px;" v-if="VSNSTOItem.gDeviceType && VSNSTOItem.gDeviceType.length > 0"> 类型: {{VSNSTOItem.gDeviceType}}</span>
              <span style="line-height: 18px;color: white ;font-size: 16px;" v-else>类型: 未知</span>
            </div>
            <dv-decoration-2 style="width:100%;height:5px;" />
            <el-row :gutter="10">
              <el-col :xs="7" :sm="7" :lg="7" style="padding-left:20px;margin-top:5px;border-right:1px dashed white;">
                <div style="height:210px;">
                  <div class="card-panel-location">
                    <i class="iconfont el-icon-dms-zhubanmainboard" style="color:#66FFFF;font-size:16px;margin-left:5px;"></i><span style="margin-left:5px;line-height: 18px;color: white;font-size: 14px;">设备信息:</span>
                  </div>
                  <div>
                    <span style="line-height: 18px;color: white ;font-size: 12px;">固件版本:</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-if="VSNSTOItem.gFWVer && VSNSTOItem.gFWVer.length > 0">{{VSNSTOItem.gFWVer}}</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-else>未知</span>
                  </div>
                  <div>
                    <span style="line-height: 18px;color: white ;font-size: 12px;">IP地址:</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-if="VSNSTOItem.gIPAddress && VSNSTOItem.gIPAddress.length > 0">{{VSNSTOItem.gIPAddress}}</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-else>未知</span>
                  </div>
                  <div>
                    <span style="line-height: 18px;color: white ;font-size: 12px;">电源状态:</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-if="VSNSTOItem.gPowerStatus && VSNSTOItem.gPowerStatus.length > 0 && VSNSTOItem.gPowerStatus === '0'">正常</span>
                    <span style="line-height: 18px;color: red ;font-weight:bold;margin-left:10px;font-size: 14px;" v-else-if="VSNSTOItem.gPowerStatus && VSNSTOItem.gPowerStatus.length > 0 && VSNSTOItem.gPowerStatus !== '0'">异常</span>
                    <span style="line-height: 18px;color: #ffdb5c;margin-left:10px;font-size: 14px;" v-else>未知</span>
                  </div>
                  <div>
                    <span style="line-height: 18px;color: white ;font-size: 12px;">开机时长:</span>
                      <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-if="VSNSTOItem.CPUUptime && VSNSTOItem.CPUUptime.length > 0">{{VSNSTOItem.CPUUptime | formatHowLong}}</span>
                      <span style="line-height: 18px;color: #ffdb5c;margin-left:10px;font-size: 14px;" v-else>未知</span>
                  </div>
                </div>
              </el-col>
              <el-col :xs="5" :sm="5" :lg="5" style="padding-left:20px;margin-top:5px;border-right:1px dashed white;">
                <div style="height:210px;">
                  <div class="card-panel-location">
                    <i class="iconfont el-icon-dms-CPU" style="color:#66FFFF;font-size:16px;margin-left:5px;"></i><span style="margin-left:5px;line-height: 18px;color: white;font-size: 14px;">CPU状态:</span>
                  </div>
                  <div>
                    <span style="line-height: 18px;color: white ;font-size: 12px;">15 minute Load:</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-if="VSNSTOItem.CPU15minuteLoad && VSNSTOItem.CPU15minuteLoad.length > 0">{{VSNSTOItem.CPU15minuteLoad}}</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-else>未知</span>
                  </div>
                  <div>
                    <span style="line-height: 18px;color: white ;font-size: 12px;">5 minute Load:</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-if="VSNSTOItem.CPU5minuteLoad && VSNSTOItem.CPU5minuteLoad.length > 0">{{VSNSTOItem.CPU5minuteLoad}}</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-else>未知</span>
                  </div>
                  <div>
                    <span style="line-height: 18px;color: white ;font-size: 12px;">1 minute Load:</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-if="VSNSTOItem.CPU1minuteLoad && VSNSTOItem.CPU1minuteLoad.length > 0">{{VSNSTOItem.CPU1minuteLoad}}</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-else>未知</span>
                  </div>
                </div>
              </el-col>
              <el-col :xs="6" :sm="6" :lg="6" style="padding-left:20px;margin-top:5px;border-right:1px dashed white;">
                <div style="height:210px;">
                  <div class="card-panel-location">
                    <i class="iconfont el-icon-dms-icon-test" style="color:#66FFFF;font-size:16px;margin-left:5px;"></i><span style="margin-left:5px;line-height: 18px;color: white;font-size: 14px;">风扇状态:</span>
                  </div>
                  <div>
                    <span style="line-height: 18px;color: white ;font-size: 12px;">机箱风扇01</span>
                  </div>
                  <div>
                    <span style="line-height: 18px;color: white ;margin-left:10px;font-size: 12px;">状态:</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-if="VSNSTOItem.bnRackFanStauts01 && VSNSTOItem.bnRackFanStauts01.length > 0 && VSNSTOItem.bnRackFanStauts01==='0' ">正常</span>
                    <span style="line-height: 18px;color: red ;font-weight:bold;margin-left:10px;font-size: 14px;" v-else-if="VSNSTOItem.bnRackFanStauts01 && VSNSTOItem.bnRackFanStauts01.length > 0 && VSNSTOItem.bnRackFanStauts01==='1' ">异常</span>
                    <span style="line-height: 18px;color: red ;font-weight:bold;margin-left:10px;font-size: 14px;" v-else-if="VSNSTOItem.bnRackFanStauts01 && VSNSTOItem.bnRackFanStauts01.length > 0 && VSNSTOItem.bnRackFanStauts01==='2' ">slow</span>
                    <span style="line-height: 18px;color: red ;font-weight:bold;margin-left:10px;font-size: 14px;" v-else-if="VSNSTOItem.bnRackFanStauts01 && VSNSTOItem.bnRackFanStauts01.length > 0 && VSNSTOItem.bnRackFanStauts01==='3' ">disabled</span>
                    <span style="line-height: 18px;color: red ;font-weight:bold;margin-left:10px;font-size: 14px;" v-else-if="VSNSTOItem.bnRackFanStauts01 && VSNSTOItem.bnRackFanStauts01.length > 0 && VSNSTOItem.bnRackFanStauts01==='4' ">notexist</span><span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-else>未知</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-else>未知</span>
                    <span style="line-height: 18px;color: white ;margin-left:10px;font-size: 12px;">转速:</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-if="VSNSTOItem.bnRackFanSpeed01 && VSNSTOItem.bnRackFanSpeed01.length > 0">{{VSNSTOItem.bnRackFanSpeed01}}</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-else>未知</span>
                  </div>
                  <div>
                    <span style="line-height: 18px;color: white ;font-size: 12px;">机箱风扇02</span>
                  </div>
                  <div>
                    <span style="line-height: 18px;color: white ;margin-left:10px;font-size: 12px;">状态:</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-if="VSNSTOItem.bnRackFanStauts02 && VSNSTOItem.bnRackFanStauts02.length > 0 && VSNSTOItem.bnRackFanStauts02==='0' ">正常</span>
                    <span style="line-height: 18px;color: red ;font-weight:bold;margin-left:10px;font-size: 14px;" v-else-if="VSNSTOItem.bnRackFanStauts02 && VSNSTOItem.bnRackFanStauts02.length > 0 && VSNSTOItem.bnRackFanStauts02==='1' ">异常</span>
                    <span style="line-height: 18px;color: red ;font-weight:bold;margin-left:10px;font-size: 14px;" v-else-if="VSNSTOItem.bnRackFanStauts02 && VSNSTOItem.bnRackFanStauts02.length > 0 && VSNSTOItem.bnRackFanStauts02==='2' ">slow</span>
                    <span style="line-height: 18px;color: red ;font-weight:bold;margin-left:10px;font-size: 14px;" v-else-if="VSNSTOItem.bnRackFanStauts02 && VSNSTOItem.bnRackFanStauts02.length > 0 && VSNSTOItem.bnRackFanStauts02==='3' ">disabled</span>
                    <span style="line-height: 18px;color: red ;font-weight:bold;margin-left:10px;font-size: 14px;" v-else-if="VSNSTOItem.bnRackFanStauts02 && VSNSTOItem.bnRackFanStauts02.length > 0 && VSNSTOItem.bnRackFanStauts02==='4' ">notexist</span><span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-else>未知</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-else>未知</span>
                    <span style="line-height: 18px;color: white ;margin-left:10px;font-size: 12px;">转速:</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-if="VSNSTOItem.bnRackFanSpeed02 && VSNSTOItem.bnRackFanSpeed02.length > 0">{{VSNSTOItem.bnRackFanSpeed02}}</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-else>未知</span>
                  </div>
                  <div>
                    <span style="line-height: 18px;color: white ;font-size: 12px;">机箱风扇03</span>
                  </div>
                  <div>
                    <span style="line-height: 18px;color: white ;margin-left:10px;font-size: 12px;">状态:</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-if="VSNSTOItem.bnRackFanStauts03 && VSNSTOItem.bnRackFanStauts03.length > 0 && VSNSTOItem.bnRackFanStauts03==='0' ">正常</span>
                    <span style="line-height: 18px;color: red ;font-weight:bold;margin-left:10px;font-size: 14px;" v-else-if="VSNSTOItem.bnRackFanStauts03 && VSNSTOItem.bnRackFanStauts03.length > 0 && VSNSTOItem.bnRackFanStauts03==='1' ">异常</span>
                    <span style="line-height: 18px;color: red ;font-weight:bold;margin-left:10px;font-size: 14px;" v-else-if="VSNSTOItem.bnRackFanStauts03 && VSNSTOItem.bnRackFanStauts03.length > 0 && VSNSTOItem.bnRackFanStauts03==='2' ">slow</span>
                    <span style="line-height: 18px;color: red ;font-weight:bold;margin-left:10px;font-size: 14px;" v-else-if="VSNSTOItem.bnRackFanStauts03 && VSNSTOItem.bnRackFanStauts03.length > 0 && VSNSTOItem.bnRackFanStauts03==='3' ">disabled</span>
                    <span style="line-height: 18px;color: red ;font-weight:bold;margin-left:10px;font-size: 14px;" v-else-if="VSNSTOItem.bnRackFanStauts03 && VSNSTOItem.bnRackFanStauts03.length > 0 && VSNSTOItem.bnRackFanStauts03==='4' ">notexist</span><span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-else>未知</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-else>未知</span>
                    <span style="line-height: 18px;color: white ;margin-left:10px;font-size: 12px;">转速:</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-if="VSNSTOItem.bnRackFanSpeed03 && VSNSTOItem.bnRackFanSpeed03.length > 0">{{VSNSTOItem.bnRackFanSpeed03}}</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-else>未知</span>
                  </div>
                  <div>
                    <span style="line-height: 18px;color: white ;font-size: 12px;">机箱风扇04</span>
                  </div>
                  <div>
                    <span style="line-height: 18px;color: white ;margin-left:10px;font-size: 12px;">状态:</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-if="VSNSTOItem.bnRackFanStauts04 && VSNSTOItem.bnRackFanStauts04.length > 0 && VSNSTOItem.bnRackFanStauts04==='0' ">正常</span>
                    <span style="line-height: 18px;color: red ;font-weight:bold;margin-left:10px;font-size: 14px;" v-else-if="VSNSTOItem.bnRackFanStauts04 && VSNSTOItem.bnRackFanStauts04.length > 0 && VSNSTOItem.bnRackFanStauts04==='1' ">异常</span>
                    <span style="line-height: 18px;color: red ;font-weight:bold;margin-left:10px;font-size: 14px;" v-else-if="VSNSTOItem.bnRackFanStauts04 && VSNSTOItem.bnRackFanStauts04.length > 0 && VSNSTOItem.bnRackFanStauts04==='2' ">slow</span>
                    <span style="line-height: 18px;color: red ;font-weight:bold;margin-left:10px;font-size: 14px;" v-else-if="VSNSTOItem.bnRackFanStauts04 && VSNSTOItem.bnRackFanStauts04.length > 0 && VSNSTOItem.bnRackFanStauts04==='3' ">disabled</span>
                    <span style="line-height: 18px;color: red ;font-weight:bold;margin-left:10px;font-size: 14px;" v-else-if="VSNSTOItem.bnRackFanStauts04 && VSNSTOItem.bnRackFanStauts04.length > 0 && VSNSTOItem.bnRackFanStauts04==='4' ">notexist</span><span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-else>未知</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-else>未知</span>
                    <span style="line-height: 18px;color: white ;margin-left:10px;font-size: 12px;">转速:</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-if="VSNSTOItem.bnRackFanSpeed04 && VSNSTOItem.bnRackFanSpeed04.length > 0">{{VSNSTOItem.bnRackFanSpeed04}}</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-else>未知</span>
                  </div>
                  <!-- <div>
                    <span style="line-height: 18px;color: white ;font-size: 12px;">底座风扇</span>
                  </div>
                  <div>
                    <span style="line-height: 18px;color: white ;margin-left:10px;font-size: 12px;">状态:</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-if="VSNSTOItem.bnRackFanStauts05 && VSNSTOItem.bnRackFanStauts05.length > 0 && VSNSTOItem.bnRackFanStauts05==='0' ">正常</span>
                    <span style="line-height: 18px;color: red ;font-weight:bold;margin-left:10px;font-size: 14px;" v-else-if="VSNSTOItem.bnRackFanStauts05 && VSNSTOItem.bnRackFanStauts05.length > 0 && VSNSTOItem.bnRackFanStauts05==='1' ">异常</span>
                    <span style="line-height: 18px;color: red ;font-weight:bold;margin-left:10px;font-size: 14px;" v-else-if="VSNSTOItem.bnRackFanStauts05 && VSNSTOItem.bnRackFanStauts05.length > 0 && VSNSTOItem.bnRackFanStauts05==='2' ">slow</span>
                    <span style="line-height: 18px;color: red ;font-weight:bold;margin-left:10px;font-size: 14px;" v-else-if="VSNSTOItem.bnRackFanStauts05 && VSNSTOItem.bnRackFanStauts05.length > 0 && VSNSTOItem.bnRackFanStauts05==='3' ">disabled</span>
                    <span style="line-height: 18px;color: red ;font-weight:bold;margin-left:10px;font-size: 14px;" v-else-if="VSNSTOItem.bnRackFanStauts05 && VSNSTOItem.bnRackFanStauts05.length > 0 && VSNSTOItem.bnRackFanStauts05==='4' ">notexist</span><span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-else>未知</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-else>未知</span>
                    <span style="line-height: 18px;color: white ;margin-left:10px;font-size: 12px;">转速:</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-if="VSNSTOItem.bnRackFanSpeed05 && VSNSTOItem.bnRackFanSpeed05.length > 0">{{VSNSTOItem.bnRackFanSpeed05}}</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-else>未知</span>
                  </div> -->
                </div>
              </el-col>
              <el-col :xs="6" :sm="6" :lg="6" style="padding-left:20px;margin-top:5px;">
                <div style="height:210px;">
                  <div class="card-panel-location">
                    <i class="iconfont el-icon-dms-fuwuqiguanli" style="color:#66FFFF;font-size:16px;margin-left:5px;"></i><span style="margin-left:5px;line-height: 18px;color: white;font-size: 14px;">阵列信息:</span>
                  </div>
                  <div>
                    <span style="line-height: 18px;color: white ;font-size: 12px;">阵列名称:</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-if="VSNSTOItem.rbnRackRaidName && VSNSTOItem.rbnRackRaidName.length > 0">{{VSNSTOItem.rbnRackRaidName}}</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-else>未知</span>
                  </div>
                  <div>
                    <span style="line-height: 18px;color: white ;font-size: 12px;">阵列类型:</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-if="VSNSTOItem.rbnRackRaidType && VSNSTOItem.rbnRackRaidType.length > 0">{{VSNSTOItem.rbnRackRaidType}}</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-else>未知</span>
                  </div>
                  <div>
                    <span style="line-height: 18px;color: white ;font-size: 12px;">阵列磁盘数量:</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-if="VSNSTOItem.rbnRackRaidNumofPhysicalDisk && VSNSTOItem.rbnRackRaidNumofPhysicalDisk.length > 0">{{VSNSTOItem.rbnRackRaidNumofPhysicalDisk}}</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-else>未知</span>
                  </div>
                  <div>
                    <span style="line-height: 18px;color: white ;font-size: 12px;">阵列块设备名称:</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-if="VSNSTOItem.rbnRackDiskGroupLocation && VSNSTOItem.rbnRackDiskGroupLocation.length > 0">{{VSNSTOItem.rbnRackDiskGroupLocation}}</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-else>未知</span>
                  </div>
                  <div>
                    <span style="line-height: 18px;color: white ;font-size: 12px;">阵列读速度:</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-if="VSNSTOItem.rbnRackRaidReadIO && VSNSTOItem.rbnRackRaidReadIO.length > 0">{{VSNSTOItem.rbnRackRaidReadIO}}</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-else>未知</span>
                  </div>
                  <div>
                    <span style="line-height: 18px;color: white ;font-size: 12px;">阵列写速度:</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-if="VSNSTOItem.rbnRackRaidWriteIO && VSNSTOItem.rbnRackRaidWriteIO.length > 0">{{VSNSTOItem.rbnRackRaidWriteIO}}</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-else>未知</span>
                  </div>
                  <div>
                    <span style="line-height: 18px;color: white ;font-size: 12px;">阵列状态:</span>
                    <span style="line-height: 18px;color: #ffdb5c ;margin-left:10px;font-size: 14px;" v-if="VSNSTOItem.rbnRackRaidServerStatus && VSNSTOItem.rbnRackRaidServerStatus.length > 0 && VSNSTOItem.rbnRackRaidServerStatus === '1'">正常</span>
                    <span style="line-height: 18px;color: red ;font-weight:bold;margin-left:10px;font-size: 14px;" v-else-if="VSNSTOItem.rbnRackRaidServerStatus && VSNSTOItem.rbnRackRaidServerStatus.length > 0 && VSNSTOItem.rbnRackRaidServerStatus === '2'">resync</span>
                    <span style="line-height: 18px;color: red ;font-weight:bold;margin-left:10px;font-size: 14px;" v-else-if="VSNSTOItem.rbnRackRaidServerStatus && VSNSTOItem.rbnRackRaidServerStatus.length > 0 && VSNSTOItem.rbnRackRaidServerStatus === '3'">recovery</span>
                    <span style="line-height: 18px;color: red ;font-weight:bold;margin-left:10px;font-size: 14px;" v-else-if="VSNSTOItem.rbnRackRaidServerStatus && VSNSTOItem.rbnRackRaidServerStatus.length > 0 && VSNSTOItem.rbnRackRaidServerStatus === '5'">degraded</span>
                    <span style="line-height: 18px;color: red ;font-weight:bold;margin-left:10px;font-size: 14px;" v-else-if="VSNSTOItem.rbnRackRaidServerStatus && VSNSTOItem.rbnRackRaidServerStatus.length > 0 && VSNSTOItem.rbnRackRaidServerStatus === '8'">disabled</span>
                    <span style="line-height: 18px;color: #ffdb5c;margin-left:10px;font-size: 14px;" v-else>未知</span>
                  </div>
                </div>
              </el-col>

            </el-row>
          </dv-border-box-10>
        </el-col>
      </el-row>
      <el-row :gutter="10" style="margin-top:15px;">
        <!-- <el-col :xs="8" :sm="8" :lg="8" style="margin-top:15px;">
          <dv-border-box-10 style="height:330px;">
            <dv-decoration-7 style="width:150px;height:30px;">Decoration</dv-decoration-7>
            <el-row :gutter="10">
              <el-col :xs="12" :sm="12" :lg="12">
                <div>
                  <ve-gauge :data="chartData" :settings="chartSettings"></ve-gauge>
                </div>
                <div>
                  <el-progress :stroke-width="8" type="circle" :width="120" :percentage="56" color="#FBB03B"></el-progress>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :lg="12">
                <dv-capsule-chart :config="config" style="width:300px;height:200px" />
              </el-col>
              
            </el-row>
          </dv-border-box-10>
        </el-col> -->
        <el-col :xs="8" :sm="8" :lg="8" style="margin-top:15px;" v-for="(serItem,index) in WORKSTList"  :key="index">
          <dv-border-box-10 style="height:300px;">
            <div class="div_item_title" >
              <span style="line-height: 18px;color: white ;font-size: 14px;">工作站:{{serItem.deviceName}}</span>
            </div>
            <dv-decoration-2 style="width:100%;height:5px;" />
            <div>
              <el-row style="margin-top:10px;height: 200px;">
                <el-col :xs="6" :sm="6" :lg="6" style="border-right:1px dashed white;">
                  <div class="card-panel-location">
                    <i class="iconfont el-icon-dms-CPU" style="color:#66FFFF;font-size:16px;margin-left:5px;"></i><span style="margin-left:5px;line-height: 18px;color: white;font-size: 14px;">CPU使用率:</span>
                  </div>
                  <div v-if="serItem.CPUutilization == null || serItem.CPUutilization == ''">
                    <p  style="height:20px;line-height:20px;font-size:10px;color: white;"><span>暂无数据</span></p>
                  </div>
                  <div style="height:200px;" v-else>
                    <div style="padding-top: 30px;text-align:center; ">
                      <p style="">
                        <el-progress :stroke-width="8" type="circle" :width="120" :percentage="parseFloat(serItem.CPUutilization)" color="#fb7293"></el-progress>
                      </p>
                    </div>
                  </div>
                </el-col>
                <el-col :xs="6" :sm="6" :lg="6" style="border-right:1px dashed white;">
                  <div class="card-panel-location" style="margin-left:10px;">
                    <i class="iconfont el-icon-dms-neicun" style="color:#66FFFF;font-size:16px;margin-left:5px;"></i><span style="margin-left:5px; line-height: 18px;color: white;font-size: 14px;">内存占用率:</span>
                  </div>
                  <div v-if="serItem.memoryUtilization == null || serItem.memoryUtilization == ''">
                      <p  style="height:20px;line-height:20px;font-size:10px;color: white;"><span>暂无数据</span></p>
                  </div>
                  <div style="height:200px;" v-else>
                      <div style="padding-top: 30px;text-align:center; ">
                          <p style="">
                              <el-progress :stroke-width="8" type="circle" :width="120" :percentage="parseFloat(serItem.memoryUtilization)" color="#FBB03B"></el-progress>
                          </p>
                      </div>
                  </div> 
                </el-col>
                <el-col :xs="12" :sm="12" :lg="12">
                  <div class="card-panel-location"  style="margin-left:10px;">
                    <i class="iconfont el-icon-dms-yingpan" style="color:#66FFFF;font-size:16px;margin-left:5px;"></i><span style="margin-left:5px;line-height: 18px;color: white;font-size: 14px;">硬盘占用率:</span>
                  </div>
                  <div v-if="serItem.storageUtilization == null || serItem.storageUtilization == ''">
                      <p  style="height:20px;line-height:20px;font-size:10px;color: white;"><span>暂无数据</span></p>
                  </div>
                  <div v-else style="height:200px;overflow-y: auto;">
                      <div style="margin-left:20px; margin-top:6px; width:80%;" v-for="item in serItem.storageUtilization">
                          <div>
                            <span style="font-size:10px;color:white;">{{item.itemName}}</span><span style="float:right;font-size:12px;color: #66FFFF;">{{item.itemValue}} %</span>
                          </div>
                          <div>
                            <el-progress :stroke-width='8' :percentage="parseFloat(item.itemValue)" :show-text="false" color="#37a2da"></el-progress>
                          </div>
                      </div> 
                  </div>
                </el-col>
              </el-row>
            </div>
          </dv-border-box-10>
        </el-col>
      </el-row>
    </div>


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
        VSNSTOList: [],
        WORKSTList: [],
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
      },
      formatHowLong (mss) {
        let days = Math.floor(mss / (100 * 60 * 60 * 24))
        let hours = Math.floor((mss % (100 * 60 * 60 * 24)) / (100 * 60 * 60))
        // let minutes = Math.floor((mss % (1000 * 60 * 60)) / (1000 * 60))
        // let seconds = Math.round((mss % (1000 * 60)) / 1000)
        return days + '天' + hours + '小时'
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
          url: this.$http.adornUrl('/home/getConvergeDashBordData'),
          method: 'get',
          params: this.$http.adornParams({}, false)
        }).then(({data}) => {
          if (data && data.code === 0) {
            console.log(data)
            this.VSNSTOList = data.VSNSTOList
            this.WORKSTList = data.WORKSTList
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
    background: url('~@/assets/img/bg1.png');
    /*background-color: #052850;*/
    background-size:100% 100%;
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }
  .div_item_title {
    height: 40px;
    text-align: center;
    padding-top: 15px;
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

