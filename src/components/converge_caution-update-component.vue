<template>
<el-dialog
    :title="cautionLevel === 2 ? '修改严重告警条件' : '修改一般告警条件'"
    :close-on-click-modal="false"
    :visible.sync="visible" width="600px">
  <div class="mod-server">
    <el-form :inline="true" :model="dataForm">
      <el-form-item label="PSN号" style="margin-bottom:0px;">
        <el-input v-model="dataForm.carrierpsn" size="small" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="设备编号" style="margin-bottom:0px;">
        <el-input v-model="dataForm.hostId" size="small" placeholder="设备编号" :disabled="true"></el-input>
      </el-form-item>
    </el-form>



    <!-- <el-form :inline="true" :model="cautionForm">
      <el-form-item v-if="showCpuUtil" label="当CPU利用率高于(%)" prop="cpuUtilization">
        <el-input v-model="cautionForm.cpuUtilization" size="small" placeholder="0.0" clearable></el-input>
      </el-form-item>
      <el-form-item v-if="showMemUtil" label="当内存利用率高于(%)" prop="memUtilization">
        <el-input v-model="cautionForm.memUtilization" size="small" placeholder="0.0" clearable></el-input>
      </el-form-item>
      <el-form-item v-if="showDiskUtil" label="当硬盘使用率高于(%)" prop="diskUtilization">
        <el-input v-model="cautionForm.diskUtilization" size="small" placeholder="0.0" clearable></el-input>
      </el-form-item>
      <el-form-item label="负责人" prop="userIdList">
        <el-select v-model="cautionForm.userIdList" multiple size="small" @focus="getUserItem" placeholder="请选择">
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
    </el-form> -->


    <el-form v-if="dataForm.deviceType === 'WorkSt'" :inline="true" :model="cautionForm">
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
    </el-form>

      <el-form v-if="dataForm.deviceType === 'VSNSTO'" :inline="true">
        <el-form-item label="出现以下异常时">
          <el-checkbox-group v-model="cautionForm.raidCaution">
            <el-checkbox name="电源异常时" label="gPowerStatus" key="gPowerStatus">电源异常时</el-checkbox>
            <el-checkbox name="风扇异常时" label="bnRackFanStauts"  key="bnRackFanStauts">风扇异常时</el-checkbox>
            <el-checkbox name="磁盘异常时" label="bnRackDiskStatus" key="bnRackDiskStatus">磁盘异常时</el-checkbox>
            <el-checkbox name="阵列异常时" label="rbnRackRaidServerStatus" key="rbnRackRaidServerStatus">阵列异常时</el-checkbox>
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
    </el-form>
      <div style="text-align: right;">
        <el-button  @click=""  size="small" icon="el-icon-close" @click="cancelHandler()">取消</el-button>
        <el-button type="danger" @click="updateHandle()"  size="small" icon="el-icon-check">提交</el-button>
      </div>

  </div>
</el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        id: '',
        visible: false,
        ownersOptions: [],
        cautionLevel: '',
        dataForm: {
          carrierpsn: '',
          hostId: '',
          deviceType: ''
        },
        cautionForm: {
          userIdList: [],
          cpuUtilization: '',
          // cpuTemp: '',
          memUtilization: '',
          diskUtilization: '',
          raidCaution: []
        }
      }
    },
    methods: {
      // 获取数据列表
      getCautionInfo (id) {
        this.id = id
        this.getUserItem()
        // 初始化页面数值
        // this.cautionForm.cpuTemp = ''
        this.cautionForm.cpuUtilization = ''
        this.cautionForm.diskUtilization = ''
        this.cautionForm.memUtilization = ''
        this.$http({
          url: this.$http.adornUrl('/convergeCautionConfig/getCautionInfo'),
          method: 'get',
          params: this.$http.adornParams({
            'id': this.id
          }, false)
        }).then(({data}) => {
          console.log('data', data)
          if (data && data.code === 0) {
            this.dataForm.carrierpsn = data.carrierPsn
            this.dataForm.hostId = data.hostId
            this.dataForm.deviceType = data.deviceType
            this.cautionLevel = data.cautionLevel
            this.cautionForm.userIdList = data.userInfo
            if (data.deviceType === 'WorkSt') {
              this.cautionForm.cpuUtilization = data.cpuUtilization
              this.cautionForm.diskUtilization = data.diskUtilization
              this.cautionForm.memUtilization = data.memUtilization
            } else if (data.deviceType === 'VSNSTO') {
              this.cautionForm.raidCaution = data.raidCaution
            }
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
            duration: 2500,
            onClose: () => {
            }
          })
        } else {
          this.$http({
            url: this.$http.adornUrl('/convergeCautionConfig/updateCondition'),
            method: 'post',
            data: this.$http.adornData({
              /* 'id': this.dataForm.id || undefined, */
              'id': this.id,
              'cpuUtilization': this.cautionForm.cpuUtilization,
              'memUtilization': this.cautionForm.memUtilization,
              'diskUtilization': this.cautionForm.diskUtilization,
              'userIdList': this.cautionForm.userIdList,
              'deviceType': this.dataForm.deviceType,
              'raidCaution': this.cautionForm.raidCaution
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
