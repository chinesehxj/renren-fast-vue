<template>
<el-dialog
    title="添加服务器至看板"
    :close-on-click-modal="false"
    :visible.sync="visible" width="800px">
  <div class="mod-server">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.owners" size="small" placeholder="负责人" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()" size="small" icon="el-icon-search">查询</el-button>
        <el-button v-if="isAuth('server:distribution')" type="danger" @click="batchUpdateHandle()" :disabled="dataListSelections.length <= 0" size="small" icon="el-icon-delete">加入看板</el-button>
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
        header-align="center"
        align="center"
        v-if="false"
        width="60"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="carrierpsn"
        header-align="center"
        align="center"
        width="80"
        label="PSN">
      </el-table-column>
      <el-table-column
        prop="carrierusn"
        header-align="center"
        align="center"
        v-if="false"
        width="120"
        label="USN">
      </el-table-column>
      <el-table-column
        prop="companyName"
        header-align="center"
        align="center"
        v-if="false"
        width="120"
        label="机构名称">
      </el-table-column>
      <el-table-column
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
        prop="owners"
        v-if="false"
        header-align="center"
        align="center"
        label="负责人">
      </el-table-column>
      <el-table-column
        prop="status"
        v-if="false"
        header-align="center"
        align="center"
        label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0" size="small" type="danger">禁用</el-tag>
          <el-tag v-else size="small">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        width="180"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        header-align="center"
        align="center"
        width="180"
        label="更新时间">
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
</el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        dataForm: {
          name: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        batchUpdate: false,
        visible: false
      }
    },
    methods: {
      // 获取数据列表
      getDataList (psnList) {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/server/list'),
          method: 'get',
          params: this.$http.adornParams({
            'pageIndex': this.pageIndex,
            'pageSize': this.pageSize,
            'owners': this.dataForm.owners
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
        }).then(() => {
          var rows = this.dataList
          if (rows) {
            rows.forEach(row => {
              if (psnList.indexOf(row.carrierpsn) !== -1) {
                this.$refs.multipleTable.toggleRowSelection(row)
              }
            })
          }
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
      // 批量分配
      batchUpdateHandle () {
        this.batchUpdate = true
        this.$nextTick(() => {
          var ids = this.dataListSelections.map(item => {
            return item.id
          })
          this.$http({
            url: this.$http.adornUrl('/home/addInBoard'),
            method: 'post',
            data: this.$http.adornData({
              /* 'id': this.dataForm.id || undefined, */
              'ids': ids
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
    }
  }
</script>
