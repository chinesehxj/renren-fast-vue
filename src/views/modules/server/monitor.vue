<template>
  <div class="mod-server" >
    <div v-if="parentShow" >
      <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-input v-model="dataForm.owners" size="small" placeholder="负责人" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()" size="small" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="dataList"
        border
        v-loading="dataListLoading"
        @selection-change="selectionChangeHandle"
        style="width: 100%; ">
        <el-table-column
          type="index"
          header-align="center"
          align="center"
          width="50"
          label="序号">
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
          width="120"
          label="USN">
        </el-table-column>
        <el-table-column
          prop="companyName"
          header-align="center"
          align="center"
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
          header-align="center"
          align="center"
          v-if="false"
          label="负责人">
        </el-table-column>
        <el-table-column
          prop="status"
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
        <el-table-column
          fixed="right"
          header-align="center"
          align="center"
          width="80"
          label="操作">
          <template slot-scope="scope" >
            <el-tooltip content="查看详情" :open-delay="1500" :hide-after="5000">
              <el-button v-if="isAuth('server:update')" type="primary" icon="el-icon-document"  size="mini" @click="addOrUpdateHandle(scope.row.carrierpsn)" circle></el-button>
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
    </div>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="showParent"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './detail'
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
        addOrUpdateVisible: false,
        parentShow: true
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.getDataList()
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
            'owners': this.dataForm.owners
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 显示父组件
      showParent () {
        this.parentShow = true
        this.addOrUpdateVisible = false
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
      // 查看详情页面
      addOrUpdateHandle (psn) {
        this.parentShow = false
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.initView(psn)
        })
      },
      // 删除
      deleteHandle (id) {
        this.$confirm(`确定进行['删除']操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/server/delete'),
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
      // 批量分配
      batchUpdateHandle () {
        this.batchUpdate = true
        this.$nextTick(() => {
          var ids = this.dataListSelections.map(item => {
            return item.id
          })
          this.$refs.batchUpdate.init(ids)
        })
      }
    }
  }
</script>
