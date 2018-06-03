<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.paramValue" size="small" placeholder="参数名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()" size="small" icon="el-icon-search">查询</el-button>
        <el-button v-if="isAuth('sys:sysparam:save')" type="primary" @click="addOrUpdateHandle()"  size="small" icon="el-icon-circle-plus-outline">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      style="width: 100%;">
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
        width="50"
        v-if="false"
        label="ID">
      </el-table-column>
      <!-- <el-table-column
        prop="paramType"
        header-align="center"
        align="center"
        label="参数类型">
      </el-table-column>
      <el-table-column
        prop="paramKey"
        header-align="center"
        align="center"
        label="参数键值">
      </el-table-column> -->
      <table-tree-column
        prop="paramValue"
        header-align="center"
        treeKey="id"
        width="250"
        label="参数名称">
      </table-tree-column>
      <!-- <el-table-column
        prop="paramValueSec"
        header-align="center"
        align="center"
        label="参数名称2">
      </el-table-column> -->
      <!-- <el-table-column
        prop="paramParent"
        header-align="center"
        align="center"
        label="所属父参数">
      </el-table-column> -->
      <el-table-column
        prop="paramExplain"
        header-align="center"
        align="center"
        label="参数说明">
      </el-table-column>
      <el-table-column
        prop="paramStatus"
        header-align="center"
        align="center"
        width="80"
        label="参数状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.paramStatus === 0" size="small" type="danger">禁用</el-tag>
          <el-tag v-else size="small">正常</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="paramOrder"
        header-align="center"
        align="center"
        width="80"
        label="参数排序">
      </el-table-column>
       <el-table-column
        prop="createrId"
        header-align="center"
        align="center"
        label="创建者">
      </el-table-column> -->
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        header-align="center"
        align="center"
        label="更新时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-tooltip content="修改" :open-delay="1500" :hide-after="5000">
            <el-button v-if="isAuth('sys:sysparam:update')" type="primary" icon="el-icon-edit"  size="mini" @click="addOrUpdateHandle(scope.row.id)" circle></el-button>
          </el-tooltip>
          <el-tooltip content="删除" :open-delay="1500" :hide-after="5000">
            <el-button v-if="isAuth('sys:sysparam:delete')" type="danger" icon="el-icon-delete" size="mini" @click="deleteHandle(scope.row.id)" circle></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination> -->
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import TableTreeColumn from '@/components/table-tree-column'
  import AddOrUpdate from './param-add-or-update'
  import { treeDataTranslate } from '@/utils'
  export default {
    data () {
      return {
        dataForm: {
          key: ''
        },
        dataList: [],
        /* pageIndex: 1,
        pageSize: 10,
        totalPage: 0, */
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },
    components: {
      TableTreeColumn,
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
          url: this.$http.adornUrl('/sys/sysparam/list'),
          method: 'get',
          params: this.$http.adornParams({
            'paramValue': this.dataForm.paramValue
          })
        }).then(({data}) => {
          // console.log(data)
          this.dataList = treeDataTranslate(data, 'id')
          this.dataListLoading = false
        })
      },
      /* // 每页数
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
      }, */
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle (id) {
        this.$confirm(`确定进行删除操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl(`/sys/sysparam/delete/${id}`),
            method: 'post',
            data: this.$http.adornData()
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
      }
    }
  }
</script>
