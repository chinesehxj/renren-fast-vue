<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" size="small" label-width="100px">
      <el-form-item label="参数类型" prop="paramType">
        <el-select v-model="dataForm.paramType" filterable placeholder="请选择(支持搜索)">
          <el-option
            v-for="item in paramTypes"
            :key="item.paramKey"
            :label="item.paramValue"
            :value="item.paramKey">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="参数名称" prop="paramValue">
        <el-input v-model="dataForm.paramValue" placeholder="参数名称"></el-input>
      </el-form-item>
      <!-- <el-form-item label="参数名称2" prop="paramValueSec">
        <el-input v-model="dataForm.paramValueSec" placeholder="参数名称2"></el-input>
      </el-form-item> -->
      <el-form-item label="参数说明" prop="paramExplain">
        <el-input v-model="dataForm.paramExplain" placeholder="参数说明"></el-input>
      </el-form-item>
      <el-form-item label="所属父参数" prop="parentName">
        <el-popover
          ref="menuListPopover"
          placement="bottom-start"
          trigger="click">
          <el-tree
            :data="parentList"
            :props="parentListTreeProps"
            node-key="id"
            ref="parentListTree"
            @current-change="menuListTreeCurrentChangeHandle"
            :default-expand-all="false"
            :highlight-current="true"
            :expand-on-click-node="true">
          </el-tree>
        </el-popover>
        <el-input v-model="dataForm.parentName" v-popover:menuListPopover :readonly="true" placeholder="所属父参数" ></el-input>
      </el-form-item>
      <el-form-item label="参数状态" prop="paramStatus">
        <el-radio-group v-model="dataForm.paramStatus">
          <el-radio :label="0">禁用</el-radio>
          <el-radio :label="1">启用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="参数排序" prop="paramOrder">
        <el-input v-model.number="dataForm.paramOrder" placeholder="参数排序"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false" size="small" icon="el-icon-close">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()" size="small" icon="el-icon-check">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { treeDataTranslate } from '@/utils'
  export default {
    data () {
      return {
        visible: false,
        paramTypes: [],
        parentList: [],
        parentListTreeProps: {
          label: 'paramValue',
          children: 'children'
        },
        dataForm: {
          id: 0,
          paramType: '',
          paramKey: '',
          paramValue: '',
          paramValueSec: '',
          parentId: 0,
          parentName: '一级参数',
          paramExplain: '',
          paramStatus: 1,
          paramOrder: ''
        },
        dataRule: {
          paramType: [
            { required: true, message: '参数类型不能为空', trigger: 'blur' }
          ],
          paramValue: [
            { required: true, message: '参数名称不能为空', trigger: 'blur' },
            { min: 1, max: 30, message: '不得超过30个字符', trigger: 'blur' }
          ],
          paramExplain: [
            { min: 1, max: 100, message: '不得超过100个字符', trigger: 'blur' }
          ],
          paramOrder: [
            { type: 'number', message: '请填写数字', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.$http({
          url: this.$http.adornUrl('/sys/sysparam/getParamTypes'),
          method: 'get',
          params: this.$http.adornParams({}, false)
        }).then(({data}) => {
          this.paramTypes = data && data.code === 0 ? data.page : []
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/sysparam/select'),
            method: 'get',
            params: this.$http.adornParams({}, false)
          }).then(({data}) => {
            console.log(data)
            this.parentList = treeDataTranslate(data, 'id')
          }).then(() => {
            this.visible = true
            this.$nextTick(() => {
              this.$refs['dataForm'].resetFields()
              this.$refs.parentListTree.setCheckedKeys([])
            })
          }).then(() => {
            if (!this.dataForm.id) {
              // 新增
              this.menuListTreeSetCurrentNode()
            } else {
              // 修改
              this.$http({
                url: this.$http.adornUrl(`/sys/sysparam/info/${this.dataForm.id}`),
                method: 'get',
                params: this.$http.adornParams({}, false)
              }).then(({data}) => {
                if (data && data.code === 0) {
                  this.dataForm.paramType = data.sysParam.paramType
                  this.dataForm.paramKey = data.sysParam.paramKey
                  this.dataForm.paramValue = data.sysParam.paramValue
                  this.dataForm.paramValueSec = data.sysParam.paramValueSec
                  this.dataForm.parentId = data.sysParam.parentId
                  this.dataForm.parentName = data.sysParam.parentName
                  this.dataForm.paramExplain = data.sysParam.paramExplain
                  this.dataForm.paramStatus = data.sysParam.paramStatus
                  this.dataForm.paramOrder = data.sysParam.paramOrder
                  this.menuListTreeSetCurrentNode()
                }
              })
            }
          })
        })
      },
      // 菜单树选中
      menuListTreeCurrentChangeHandle (data, node) {
        this.dataForm.parentId = data.id
        this.dataForm.parentName = data.paramValue
      },
      // 菜单树设置当前选中节点
      menuListTreeSetCurrentNode () {
        this.$refs.parentListTree.setCurrentKey(this.dataForm.parentId)
        this.dataForm.parentName = (this.$refs.parentListTree.getCurrentNode() || {})['paramValue']
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/sys/sysparam/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'paramType': this.dataForm.paramType,
                'paramKey': this.dataForm.paramKey,
                'paramValue': this.dataForm.paramValue,
                'paramValueSec': this.dataForm.paramValueSec,
                'parentId': this.dataForm.parentId,
                'paramExplain': this.dataForm.paramExplain,
                'paramStatus': this.dataForm.paramStatus,
                'paramOrder': this.dataForm.paramOrder
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
        })
      }
    }
  }
</script>
