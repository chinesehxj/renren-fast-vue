<template>
  <el-dialog
    :title="批量分配"
    :close-on-click-modal="false"
    :visible.sync="visible" width="600px">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" size="small" label-width="120px">
      <el-form-item label="所属机构" prop="companyId">
        <el-select v-model="dataForm.companyId" filterable placeholder="请选择(支持搜索)" @change="clearUserItem">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="机房名" prop="roomId">
        <el-select v-model="dataForm.roomId" filterable placeholder="请选择(支持搜索)" @change="getFrameList()">
          <el-option
            v-for="item in roomOptions"
            :key="item.id"
            :label="item.paramValue"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="机柜名(编号)" prop="frameId">
        <el-select v-model="dataForm.frameId" placeholder="请选择">
          <el-option
            v-for="item in frameOptions"
            :key="item.id"
            :label="item.paramValue"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务器名(编号)" prop="serverCode">
        <el-input v-model="dataForm.serverCode" placeholder="服务器名(编号)"></el-input>
      </el-form-item>
      <el-form-item label="备注说明" prop="comment">
        <el-input v-model="dataForm.comment" placeholder="备注说明"></el-input>
      </el-form-item>
      <el-form-item label="负责人" prop="userIdList">
        <el-select v-model="dataForm.userIdList" multiple @focus="getUserItem" placeholder="请选择">
          <el-option
            v-for="item in ownersOptions"
            :key="item.userId"
            :label="item.realName"
            :value="item.userId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" size="mini" prop="status">
        <el-radio-group v-model="dataForm.status">
          <el-radio :label="0">禁用</el-radio>
          <el-radio :label="1">正常</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false" size="small" icon="el-icon-close">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()" size="small" icon="el-icon-check">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        roleList: [],
        options: [],
        roomOptions: [],
        frameOptions: [],
        ownersOptions: [],
        dataForm: {
          ids: 0,
          carrierpsn: '',
          carrierusn: '',
          companyName: '',
          companyId: '',
          roomName: '',
          roomId: '',
          frameName: '',
          frameId: '',
          serverCode: '',
          comment: '',
          owners: '',
          userIdList: '',
          status: 1
        },
        dataRule: {
          serverCode: [
            { min: 1, max: 50, message: '不得超过50个字符', trigger: 'blur' }
          ],
          comment: [
            { min: 1, max: 200, message: '不得超过200个字符', trigger: 'blur' }
          ],
          companyId: [
            { required: true, message: '所属机构不能为空', trigger: 'blur' }
          ],
          userIdList: [
            { required: true, message: '负责人不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (ids) {
        this.dataForm.ids = ids
        // 所属机构下拉框内容
        this.$http({
          url: this.$http.adornUrl('/sys/company/list'),
          method: 'get',
          params: this.$http.adornParams({
            'pageIndex': '',
            'pageSize': '',
            'name': ''
          })
        }).then(({data}) => {
          this.options = data && data.code === 0 ? data.page : []
          console.log(this.options[0])
          this.dataForm.companyId = this.options[0].id
        }).then(() => {
          // 机房名下拉框列表
          this.$http({
            url: this.$http.adornUrl('/sys/sysparam/selectParamItems'),
            method: 'get',
            params: this.$http.adornParams({
              'param_type': 'server_room',
              'parent_id': 0
            })
          }).then(({data}) => {
            this.roomOptions = data && data.code === 0 ? data.page : []
          })
        }).then(() => {
          this.visible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
          })
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl('/server/batchUpdate'),
              method: 'post',
              data: this.$http.adornData({
                /* 'id': this.dataForm.id || undefined, */
                'ids': this.dataForm.ids,
                'companyId': this.dataForm.companyId,
                'roomId': this.dataForm.roomId,
                'frameId': this.dataForm.frameId,
                'serverCode': this.dataForm.serverCode,
                'comment': this.dataForm.comment,
                'owners': this.dataForm.owners,
                'userIdList': this.dataForm.userIdList,
                'status': this.dataForm.status
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
      },
      // 获取机柜下拉框列表的值
      getFrameList () {
        this.dataForm.frameId = ''
        this.$http({
          url: this.$http.adornUrl('/sys/sysparam/selectParamItems'),
          method: 'get',
          params: this.$http.adornParams({
            'param_type': 'server_frame',
            'parent_id': this.dataForm.roomId
          })
        }).then(({data}) => {
          this.frameOptions = data && data.code === 0 ? data.page : []
        })
      },
      // 获取机柜下拉框列表的值
      getUserItem () {
        // 负责人下拉框列表
        if (this.dataForm.companyId) {
          this.$http({
            url: this.$http.adornUrl('/sys/user/userItems'),
            method: 'get',
            params: this.$http.adornParams({
              'company_id': this.dataForm.companyId
            })
          }).then(({data}) => {
            this.ownersOptions = data && data.code === 0 ? data.page : []
          })
        } else {
          this.$message.error('请先选择机构')
        }
      },
      // 机构下拉框变化时清空负责人下拉框
      clearUserItem () {
        // 先清空已选项
        this.dataForm.userIdList = []
      }
    }
  }
</script>
