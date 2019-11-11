<template>
  <div class="mod-server">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.carrierpsn" size="small" placeholder="PSN" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.cautionText" size="small" placeholder="告警内容" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="dataForm.cautionLevel" size="small" clearable placeholder="告警级别">
          <el-option label="一般告警" value="1"></el-option>
          <el-option label="严重告警" value="2"></el-option>
        </el-select>
      </el-form-item>
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
        <el-button @click="getDataList()" size="small" icon="el-icon-search">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      style="width: 100%; ">
      <el-table-column
        prop="carrierpsn"
        header-align="center"
        align="center"
        width="200"
        label="PSN">
      </el-table-column>
      <el-table-column
        prop="cautiontext"
        header-align="center"
        align="center"
        label="告警内容">
      </el-table-column>
      <el-table-column
        prop="cautionLevel"
        header-align="center"
        align="center"
        width="200"
        label="告警级别">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.cautionLevel === '2'" size="small" type="danger">严重告警</el-tag>
          <el-tag v-else size="small">一般告警</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        width="350"
        label="告警时间">
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
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dataForm: {
          carrierpsn: '',
          cautionText: '',
          timeRange: [],
          startTime: '',
          endTime: '',
          cautionLevel: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        serverListVisible: false,
        cautionInfoUpdateVisible: false
      }
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/cautionNotificationLog/list'),
          method: 'get',
          params: this.$http.adornParams({
            'pageIndex': this.pageIndex,
            'pageSize': this.pageSize,
            'carrierpsn': this.dataForm.carrierpsn,
            'startTime': this.dataForm.startTime,
            'endTime': this.dataForm.endTime,
            'cautionLevel': this.dataForm.cautionLevel,
            'cautionText': this.dataForm.cautionText
          }, false)
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.records
            this.totalPage = data.page.total
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
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
      getDateTimeStr (val) {
        console.log(val)
        if (val !== null) {
          this.dataForm.timeRange = val
          this.dataForm.startTime = val[0]
          this.dataForm.endTime = val[1]
        } else {
          this.dataForm.startTime = ''
          this.dataForm.endTime = ''
        }
        console.log(this.dataForm.startTime)
        console.log(this.dataForm.endTime)
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      }
    }
  }
</script>
