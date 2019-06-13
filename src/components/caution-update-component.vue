<template>
<el-dialog
    :title="cautionLevel === '2' ? '修改严重告警条件' : '修改一般告警条件'"
    :close-on-click-modal="false"
    :visible.sync="visible" width="500px">
  <div class="mod-server">
    <el-form :inline="true" :model="dataForm">
      <el-form-item label="设备PSN号" style="margin-bottom:0px;">
        <el-input v-model="dataForm.carrierpsn" size="small" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="服务器名" style="margin-bottom:0px;">
        <el-input v-model="dataForm.computerName" size="small" placeholder="服务器名" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
    <el-form :inline="true" :model="cautionForm">
      <el-form-item v-if="showCpuUtil" label="当CPU利用率高于(%)" prop="cpuUtilization">
        <el-input v-model="cautionForm.cpuUtilization" size="small" placeholder="0.0" clearable></el-input>
      </el-form-item>
      <el-form-item v-if="showCpuTmp" label="当CPU温度高于(℃)" prop="cpuTemp">
        <el-input v-model="cautionForm.cpuTemp" size="small" placeholder="0.0" clearable></el-input>
      </el-form-item>
      <el-form-item v-if="showMemUtil" label="当内存利用率高于(%)" prop="memUtilization">
        <el-input v-model="cautionForm.memUtilization" size="small" placeholder="0.0" clearable></el-input>
      </el-form-item>
      <el-form-item v-if="showDiskUtil" label="当硬盘使用率高于(%)" prop="diskUtilization">
        <el-input v-model="cautionForm.diskUtilization" size="small" placeholder="0.0" clearable></el-input>
      </el-form-item>
      <el-form-item label="负责人" prop="userIdList">
        <el-select v-model="cautionForm.userIdList" multiple @focus="getUserItem" placeholder="请选择">
          <el-option
            v-for="item in ownersOptions"
            :key="item.userId"
            :label="item.realName"
            :value="item.userId">
          </el-option>
        </el-select>
      </el-form-item>
      <div style="text-align: right;">
        <el-button  @click=""  size="small" icon="el-icon-close" @click="cancelHandler()">取消</el-button>
        <el-button type="danger" @click="updateHandle()"  size="small" icon="el-icon-check">提交</el-button>
      </div>
    </el-form>
  </div>
</el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        id: '',
        visible: false,
        showCpuTmp: false,
        showCpuUtil: false,
        showMemUtil: false,
        showDiskUtil: false,
        ownersOptions: [],
        deviceClass: '',
        sensorName: '',
        sensorClass: '',
        cautionLevel: '',
        dataForm: {
          carrierpsn: '',
          computerName: ''
        },
        cautionForm: {
          userIdList: [],
          cpuUtilization: '',
          cpuTemp: '',
          memUtilization: '',
          diskUtilization: ''
        }
      }
    },
    methods: {
      // 获取数据列表
      getCautionInfo (id) {
        this.id = id
        this.getUserItem()
        // 初始化页面数值
        this.cautionForm.cpuTemp = ''
        this.cautionForm.cpuUtilization = ''
        this.cautionForm.diskUtilization = ''
        this.cautionForm.memUtilization = ''
        this.showCpuTmp = false
        this.showCpuUtil = false
        this.showMemUtil = false
        this.showDiskUtil = false
        this.$http({
          url: this.$http.adornUrl('/caution/getCautionInfo'),
          method: 'get',
          params: this.$http.adornParams({
            'id': this.id
          }, false)
        }).then(({data}) => {
          console.log(data)
          if (data && data.code === 0) {
            this.dataForm.carrierpsn = data.cautionInfo[0].carrierPSN
            this.dataForm.computerName = data.cautionInfo[0].computerName
            this.deviceClass = data.cautionInfo[0].deviceClass
            this.sensorName = data.cautionInfo[0].sensorName
            this.cautionLevel = data.cautionInfo[0].cautionLevel
            this.sensorClass = data.cautionInfo[0].sensorClass
            if (this.deviceClass === 'Processor' && this.sensorName === 'Package' && this.sensorClass === 'Temperature') {
              this.showCpuTmp = true
              this.cautionForm.cpuTemp = data.cautionInfo[0].sensorValue
            }
            if (this.deviceClass === 'Processor' && this.sensorName === 'Processor' && this.sensorClass === 'Utilization') {
              this.showCpuUtil = true
              this.cautionForm.cpuUtilization = data.cautionInfo[0].sensorValue
            }
            if (this.deviceClass === 'Drive' && this.sensorClass === 'Utilization') {
              this.showDiskUtil = true
              this.cautionForm.diskUtilization = data.cautionInfo[0].sensorValue
            }
            if (this.deviceClass === 'Mainboard' && this.sensorName === 'System Memory' && this.sensorClass === 'Utilization') {
              this.showMemUtil = true
              this.cautionForm.memUtilization = data.cautionInfo[0].sensorValue
            }
            this.cautionForm.userIdList = data.userInfo
          }
          this.visible = true
        })
      },
      // 提交告警配置
      updateHandle () {
        if ((this.cautionForm.cpuTemp === '' && this.cautionForm.cpuUtilization === '' && this.cautionForm.memUtilization === '' && this.cautionForm.diskUtilization === '') || this.cautionForm.userIdList.length === 0) {
          this.$message({
            message: '请至少配置一个告警条件和一个负责人',
            type: 'success',
            duration: 1500,
            onClose: () => {
            }
          })
        } else {
          this.$http({
            url: this.$http.adornUrl('/caution/updateCondition'),
            method: 'post',
            data: this.$http.adornData({
              /* 'id': this.dataForm.id || undefined, */
              'id': this.id,
              'cpuUtilization': this.cautionForm.cpuUtilization,
              'cpuTemp': this.cautionForm.cpuTemp,
              'memUtilization': this.cautionForm.memUtilization,
              'diskUtilization': this.cautionForm.diskUtilization,
              'userIdList': this.cautionForm.userIdList
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: data.msg,
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }
      },
      getUserItem () {
        // 负责人下拉框列表
        this.$http({
          url: this.$http.adornUrl('/caution/userItems'),
          method: 'get',
          params: this.$http.adornParams('', false)
        }).then(({data}) => {
          console.log(data)
          this.ownersOptions = data && data.code === 0 ? data.page : []
        })
      },
      cancelHandler () {
        this.visible = false
      }
    }
  }
</script>
