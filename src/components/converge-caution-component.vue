<template>
<el-dialog
    title="设置告警条件"
    :close-on-click-modal="false"
    :visible.sync="visible" width="850px">
  <div class="mod-server">
    <div style="margin-top: -25px;"><p style="font-size:16px; font-weight: bold;">第一步：选择需要设置告警条件的设备</p></div>


    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item style="margin-bottom:0px;">
        <el-input v-model="dataForm.carrierpsn" size="small" placeholder="PSN" clearable></el-input>
      </el-form-item>
      <el-form-item style="margin-bottom:0px;">
        <el-input v-model="dataForm.hostId" size="small" placeholder="设备编号(hostId)" clearable></el-input>
      </el-form-item>
      <el-form-item style="margin-bottom:0px;">
        <el-button @click="getDataList()" size="small" icon="el-icon-search">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
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
        width="120"
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
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <el-form :inline="true" :model="cautionForm">
    <div style="margin-top: 10px;"><span style="font-size:16px; font-weight: bold;">第二步：设置一般告警条件</span><span style="font-size:14px; margin-left:5px; color:#de8a30; font-style: italic;">(CPU温度告警阈值默认75度)</span></div>
      <el-form-item label="当CPU利用率高于(%)" prop="cpuUtilization">
        <el-input v-model="cautionForm.cpuUtilization" size="small" placeholder="0.0" clearable></el-input>
      </el-form-item>
      <el-form-item label="当CPU温度高于(℃)" prop="cpuTemp">
        <el-input v-model="cautionForm.cpuTemp" size="small" placeholder="0.0" clearable></el-input>
      </el-form-item>
      <el-form-item label="当内存利用率高于(%)" prop="memUtilization">
        <el-input v-model="cautionForm.memUtilization" size="small" placeholder="0.0" clearable></el-input>
      </el-form-item>
      <el-form-item label="当硬盘使用率高于(%)" prop="diskUtilization">
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
    <div style="margin-top: 10px;"><span style="font-size:16px; font-weight: bold;">第三步：设置严重告警条件</span><span style="font-size:14px; margin-left:5px; color:#de8a30; font-style: italic;">(CPU温度告警阈值默认80度)</span></div>
      <el-form-item label="当CPU利用率高于(%)" prop="cpuUtilization">
        <el-input v-model="cautionForm.cpuUtilizationDanger" size="small" placeholder="0.0" clearable></el-input>
      </el-form-item>
      <el-form-item label="当CPU温度高于(℃)" prop="cpuTemp">
        <el-input v-model="cautionForm.cpuTempDanger" size="small" placeholder="0.0" clearable></el-input>
      </el-form-item>
      <el-form-item label="当内存利用率高于(%)" prop="memUtilization">
        <el-input v-model="cautionForm.memUtilizationDanger" size="small" placeholder="0.0" clearable></el-input>
      </el-form-item>
      <el-form-item label="当硬盘使用率高于(%)" prop="diskUtilization">
        <el-input v-model="cautionForm.diskUtilizationDanger" size="small" placeholder="0.0" clearable></el-input>
      </el-form-item>
      <el-form-item label="负责人" prop="userIdList">
        <el-select v-model="cautionForm.userIdListDanger" multiple @focus="getUserItem" placeholder="请选择">
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
          hostId: ''
        },
        cautionForm: {
          userIdList: '',
          cpuUtilization: '',
          cpuTemp: '75',
          memUtilization: '',
          diskUtilization: '',
          userIdListDanger: '',
          cpuUtilizationDanger: '',
          cpuTempDanger: '80',
          memUtilizationDanger: '',
          diskUtilizationDanger: ''
        },
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
          url: this.$http.adornUrl('/server/list'),
          method: 'get',
          params: this.$http.adornParams({
            'pageIndex': this.pageIndex,
            'pageSize': this.pageSize,
            'carrierpsn': this.dataForm.carrierpsn,
            'type': '1'
          }, false)
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
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
      },
      // 提交告警配置
      batchUpdateHandle () {
        this.batchUpdate = true
        if ((this.cautionForm.cpuTemp === '' && this.cautionForm.cpuUtilization === '' && this.cautionForm.memUtilization === '' && this.cautionForm.diskUtilization === '') || this.cautionForm.userIdList.length === 0) {
          this.$message({
            message: '请至少配置一个告警条件和一个负责人',
            type: 'success',
            duration: 1500,
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
                'cpuTemp': this.cautionForm.cpuTemp,
                'memUtilization': this.cautionForm.memUtilization,
                'diskUtilization': this.cautionForm.diskUtilization,
                'userIdList': this.cautionForm.userIdList,
                'cpuUtilizationDanger': this.cautionForm.cpuUtilizationDanger,
                'cpuTempDanger': this.cautionForm.cpuTempDanger,
                'memUtilizationDanger': this.cautionForm.memUtilizationDanger,
                'diskUtilizationDanger': this.cautionForm.diskUtilizationDanger,
                'userIdListDanger': this.cautionForm.userIdListDanger
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
