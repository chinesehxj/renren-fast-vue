<template>
<el-dialog
    title="设置告警条件"
    :close-on-click-modal="false"
    :visible.sync="visible" width="1200px">
  <div class="mod-server">
    <div>
      <el-row>
        <el-steps :active= 3 simple>
          <el-step title="选择设备" icon="el-icon-tickets"></el-step>
          <el-step title="设置一般告警条件" icon="el-icon-bell"></el-step>
          <el-step title="设置严重告警条件" icon="el-icon-warning"></el-step>
        </el-steps>
      </el-row>
    </div>
    <el-row :gutter="20">
      <el-col :xs="12" :sm="12" :lg="12">
        <div style="margin-top: 10px;"><p style="font-size:16px;">选择设备</p></div>
        <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
          <el-form-item style="margin-bottom:0px;">
            <el-input v-model="dataForm.carrierPsn" size="small" placeholder="PSN" clearable></el-input>
          </el-form-item>
          <el-form-item style="margin-bottom:0px;">
            <el-input v-model="dataForm.hostId" size="small" placeholder="设备编号(hostId)" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="dataForm.deviceType" size="small" @change="getDataList()" placeholder="请选择设备类型">
              <el-option
                v-for="item in deviceTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-bottom:0px;">
            <el-button @click="getDataList()" size="small" icon="el-icon-search">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="dataList"
          border
          stripe
          max-height="450"
          ref="multipleTable"
          v-loading="dataListLoading"
          @selection-change="selectionChangeHandle"
          style="width: 100%; ">
          <el-table-column
            type="selection"
            header-align="center"
            align="center"
            width="50">
          </el-table-column>
          <el-table-column
            prop="id"
            header-align="center";
            align="center"
            v-if="false"
            width="60"
            label="ID">
          </el-table-column>
          <el-table-column
            prop="carrierPsn"
            header-align="center"
            align="center"
            width="80"
            label="PSN">
          </el-table-column>
          <el-table-column
            prop="hostName"
            header-align="center"
            align="center"
            label="设备名">
          </el-table-column>
          <el-table-column
            prop="hostId"
            header-align="center"
            align="center"
            width="120"
            label="设备编号">
          </el-table-column>
        </el-table>

        
      </el-col>
      <el-form v-if="dataForm.deviceType === 'WorkSt'" :inline="true" :model="cautionForm">
        <el-col :xs="6" :sm="6" :lg="6">
          <div style="margin-top: 10px;"><span style="font-size:16px;">设置一般告警条件</span></div>
            <el-form-item label="当CPU利用率高于(%)" prop="cpuUtilization">
              <el-input v-model="cautionForm.cpuUtilization" size="small" placeholder="0.0" clearable></el-input>
            </el-form-item>
            <!-- <el-form-item label="当CPU温度高于(℃)" prop="cpuTemp">
              <el-input v-model="cautionForm.cpuTemp" size="small" placeholder="0.0" clearable></el-input>
            </el-form-item> -->
            <el-form-item label="当内存利用率高于(%)" prop="memUtilization">
              <el-input v-model="cautionForm.memUtilization" size="small" placeholder="0.0" clearable></el-input>
            </el-form-item>
            <el-form-item label="当硬盘使用率高于(%)" prop="diskUtilization">
              <el-input v-model="cautionForm.diskUtilization" size="small" placeholder="0.0" clearable></el-input>
            </el-form-item>
            <el-form-item label="发通知给" prop="userIdList">
              <el-select v-model="cautionForm.userIdList" multiple size="small" @focus="getUserItem" placeholder="请选择">
                <el-option
                  v-for="item in ownersOptions"
                  :key="item.userId"
                  :label="item.realName"
                  :value="item.userId">
                </el-option>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :xs="6" :sm="6" :lg="6">
          <div style="margin-top: 10px;"><span style="font-size:16px;">设置严重告警条件</span></div>
            <el-form-item label="当CPU利用率高于(%)" prop="cpuUtilization">
              <el-input v-model="cautionForm.cpuUtilizationDanger" size="small" placeholder="0.0" clearable></el-input>
            </el-form-item>
            <!-- <el-form-item label="当CPU温度高于(℃)" prop="cpuTemp">
              <el-input v-model="cautionForm.cpuTempDanger" size="small" placeholder="0.0" clearable></el-input>
            </el-form-item> -->
            <el-form-item label="当内存利用率高于(%)" prop="memUtilization">
              <el-input v-model="cautionForm.memUtilizationDanger" size="small" placeholder="0.0" clearable></el-input>
            </el-form-item>
            <el-form-item label="当硬盘使用率高于(%)" prop="diskUtilization">
              <el-input v-model="cautionForm.diskUtilizationDanger" size="small" placeholder="0.0" clearable></el-input>
            </el-form-item>
            <el-form-item label="发通知给" prop="userIdList">
              <el-select v-model="cautionForm.userIdListDanger" multiple size="small" @focus="getUserItem" placeholder="请选择">
                <el-option
                  v-for="item in ownersOptions"
                  :key="item.userId"
                  :label="item.realName"
                  :value="item.userId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>

        <el-form v-if="dataForm.deviceType === 'VSNSTO'" :inline="true">
        <el-col :xs="6" :sm="6" :lg="6">
          <div style="margin-top: 10px;"><span style="font-size:16px;">设置一般告警条件</span></div>
            <el-form-item label="出现以下异常时">
              <el-checkbox-group v-model="cautionForm.raidCaution">
                <el-checkbox name="电源异常时" label="gPowerStatus">电源异常时</el-checkbox>
                <el-checkbox name="风扇异常时" label="bnRackFanStauts">风扇异常时</el-checkbox>
                <el-checkbox name="磁盘异常时" label="bnRackDiskStatus">磁盘异常时</el-checkbox>
                <el-checkbox name="阵列异常时" label="rbnRackRaidServerStatus">阵列异常时</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="发通知给" prop="userIdList">
              <el-select v-model="cautionForm.userIdList" multiple size="small" @focus="getUserItem" placeholder="请选择">
                <el-option
                  v-for="item in ownersOptions"
                  :key="item.userId"
                  :label="item.realName"
                  :value="item.userId">
                </el-option>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :xs="6" :sm="6" :lg="6">
          <div style="margin-top: 10px;"><span style="font-size:16px;">设置严重告警条件</span></div>
            <el-form-item label="出现以下异常时">
              <el-checkbox-group v-model="cautionForm.raidCautionDanger">
                <el-checkbox name="电源异常时" label="gPowerStatus">电源异常时</el-checkbox>
                <el-checkbox name="风扇异常时" label="bnRackFanStauts">风扇异常时</el-checkbox>
                <el-checkbox name="磁盘异常时" label="bnRackDiskStatus">磁盘异常时</el-checkbox>
                <el-checkbox name="阵列异常时" label="rbnRackRaidServerStatus">阵列异常时</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="发通知给" prop="userIdList">
              <el-select v-model="cautionForm.userIdListDanger" multiple size="small" @focus="getUserItem" placeholder="请选择">
                <el-option
                  v-for="item in ownersOptions"
                  :key="item.userId"
                  :label="item.realName"
                  :value="item.userId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
    </el-row>
    
      <div style="text-align: right;">
        <el-button type="danger" @click="batchUpdateHandle()" :disabled="dataListSelections.length <= 0" size="small" icon="el-icon-check">确认</el-button>
      </div>
  </div>
</el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        dataForm: {
          carrierpsn: '',
          hostId: '',
          deviceType: 'WorkSt'
        },
        cautionForm: {
          userIdList: '',
          cpuUtilization: '',
          // cpuTemp: '75',
          memUtilization: '',
          diskUtilization: '',
          userIdListDanger: '',
          cpuUtilizationDanger: '',
          // cpuTempDanger: '80',
          memUtilizationDanger: '',
          diskUtilizationDanger: '',
          raidCaution: [],
          raidCautionDanger: []
        },
        deviceTypeOptions: [
          {
            value: 'WorkSt',
            label: '工作站'
          }, {
            value: 'VSNSTO',
            label: '存储'
          }
        ],
        stepActive: '0',
        ownersOptions: [],
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        batchUpdate: false,
        visible: false,
        psnList: ''
      }
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/convergeCautionConfig/getDeviceList'),
          method: 'get',
          params: this.$http.adornParams({
            // 'pageIndex': this.pageIndex,
            // 'pageSize': this.pageSize,
            'carrierPsn': this.dataForm.carrierpsn,
            'hostId': this.dataForm.hostId,
            'deviceType': this.dataForm.deviceType
          }, false)
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page
            // this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
          this.visible = true
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
        if (this.dataListSelections.length > 0) {
          this.stepActive = 1
        } else {
          this.stepActive = 0
        }
      },
      // 提交告警配置
      batchUpdateHandle () {
        this.batchUpdate = true
        if ((this.cautionForm.cpuTemp === '' && this.cautionForm.cpuUtilization === '' && this.cautionForm.memUtilization === '' && this.cautionForm.diskUtilization === '') || this.cautionForm.userIdList.length === 0) {
          this.$message({
            message: '请至少配置一个一般告警条件和一个负责人',
            type: 'success',
            duration: 2500,
            onClose: () => {
            }
          })
        } else if ((this.cautionForm.cpuTempDanger === '' && this.cautionForm.cpuUtilizationDanger === '' && this.cautionForm.memUtilizationDanger === '' && this.cautionForm.diskUtilizationDanger === '') || this.cautionForm.userIdListDanger.length === 0) {
          this.$message({
            message: '请至少配置一个严重告警条件和一个负责人',
            type: 'success',
            duration: 2500,
            onClose: () => {
            }
          })
        } else {
          this.$nextTick(() => {
            var psnAndHostIds = this.dataListSelections.map(item => {
              return item.carrierPsn + ',' + item.hostId
            })
            console.log(psnAndHostIds)
            this.$http({
              url: this.$http.adornUrl('/convergeCautionConfig/addCondition'),
              method: 'post',
              data: this.$http.adornData({
                /* 'id': this.dataForm.id || undefined, */
                'psnAndHostIds': psnAndHostIds,
                'cpuUtilization': this.cautionForm.cpuUtilization,
                // 'cpuTemp': this.cautionForm.cpuTemp,
                'memUtilization': this.cautionForm.memUtilization,
                'diskUtilization': this.cautionForm.diskUtilization,
                'userIdList': this.cautionForm.userIdList,
                'cpuUtilizationDanger': this.cautionForm.cpuUtilizationDanger,
                // 'cpuTempDanger': this.cautionForm.cpuTempDanger,
                'memUtilizationDanger': this.cautionForm.memUtilizationDanger,
                'diskUtilizationDanger': this.cautionForm.diskUtilizationDanger,
                'userIdListDanger': this.cautionForm.userIdListDanger,
                'deviceType': this.dataForm.deviceType,
                'raidCaution': this.cautionForm.raidCaution,
                'raidCautionDanger': this.cautionForm.raidCautionDanger
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
      }
    }
  }
</script>
