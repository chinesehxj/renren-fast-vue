<template>
  <div class="mod-server">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.carrierpsn" size="small" placeholder="PSN" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()" size="small" icon="el-icon-search">查询</el-button>
        <el-button type="primary" @click="addCaution()" size="small" icon="el-icon-circle-plus-outline">新增</el-button>
        <el-button type="danger" @click="batchDeleteHandle()" :disabled="dataListSelections.length <= 0" size="small" icon="el-icon-delete">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
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
        header-align="center"
        align="center"
        v-if="false"
        width="60"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="carrierPSN"
        header-align="center"
        align="center"
        width="200"
        label="PSN">
      </el-table-column>
      <el-table-column
        prop="computerName"
        header-align="center"
        align="center"
        width="300"
        label="服务器名称">
      </el-table-column>
      <el-table-column
        prop="comment"
        header-align="center"
        align="center"
        width="600"
        label="告警条件描述">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        header-align="center"
        align="center"
        width="250"
        label="更新时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="200"
        label="操作">
        <template slot-scope="scope" >
          <el-tooltip content="查看或修改" :open-delay="1500" :hide-after="5000">
            <el-button type="primary" icon="el-icon-edit"  size="mini" @click="addOrUpdateHandle(scope.row.id)" circle></el-button>
          </el-tooltip>
          <el-tooltip content="删除" :open-delay="1500" :hide-after="5000">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteHandle(scope.row.id)" circle></el-button>
          </el-tooltip>
        </template>
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
    <caution-list v-if="serverListVisible" ref="showServerList" @refreshDataList="getDataList()"></caution-list>
    <caution-info-update v-if="cautionInfoUpdateVisible" ref="cautionInfoUpdate" @refreshDataList="getDataList()"></caution-info-update>
  </div>
</template>

<script>
  import cautionList from '@/components/caution-server-component'
  import cautionInfoUpdate from '@/components/caution-update-component'
  export default {
    data () {
      return {
        dataForm: {
          carrierpsn: ''
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
    components: {
      cautionList,
      cautionInfoUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/caution/list'),
          method: 'get',
          params: this.$http.adornParams({
            'pageIndex': this.pageIndex,
            'pageSize': this.pageSize,
            'carrierpsn': this.dataForm.carrierpsn
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
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 删除
      deleteHandle (id) {
        this.$confirm(`确定进行['删除']操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/caution/delete'),
            method: 'post',
            data: this.$http.adornData(id, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      },
      // 批量删除
      batchDeleteHandle () {
        var ids = this.dataListSelections.map(item => {
          return item.id
        })
        this.$confirm(`确定进行['批量删除']操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/caution/batchDelete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      },
      // // 批量分配
      // batchUpdateHandle () {
      //   this.batchUpdate = true
      //   this.$nextTick(() => {
      //     var ids = this.dataListSelections.map(item => {
      //       return item.id
      //     })
      //     this.$refs.batchUpdate.init(ids)
      //   })
      // }
      addCaution () {
        this.serverListVisible = true
        this.$nextTick(() => {
          this.$refs.showServerList.getDataList()
        })
      },
      addOrUpdateHandle (id) {
        console.log(id)
        this.cautionInfoUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.cautionInfoUpdate.getCautionInfo(id)
        })
      }
    }
  }
</script>
