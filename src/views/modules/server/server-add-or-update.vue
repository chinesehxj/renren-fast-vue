<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible" width="600px">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" size="small" label-width="120px">
      <el-form-item label="PSN" prop="carrierpsn">
        <el-input v-model="dataForm.carrierpsn" placeholder="PSN号"></el-input>
      </el-form-item>
      <el-form-item label="USN" prop="carrierusn">
        <el-input v-model="dataForm.carrierusn" placeholder="USN号"></el-input>
      </el-form-item>
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
      <div v-show="!dataForm.id ? false : true">

      
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
        <el-select v-model="dataForm.frameId" placeholder="请选择" >
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
      </div>
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
      <el-form-item label="类别" size="mini" prop="status">
        <el-radio-group v-model="dataForm.status">
          <el-radio :label="0">存储</el-radio>
          <el-radio :label="1">服务器</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span v-if="!dataForm.id" slot="footer" class="dialog-footer">
      <el-button @click="visible = false" size="small" icon="el-icon-close">结束</el-button>
      <el-button type="primary" @click="dataFormSubmit()" size="small" icon="el-icon-check">保存并继续新增</el-button>
    </span>
    <span v-else slot="footer" class="dialog-footer">
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
          id: 0,
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
          carrierpsn: [
            { required: true, message: 'PSN不能为空', trigger: 'blur' },
            { min: 1, max: 20, message: '不得超过20个字符', trigger: 'blur' }
          ],
          carrierusn: [
            { required: true, message: 'USN不能为空', trigger: 'blur' },
            { min: 1, max: 20, message: '不得超过20个字符', trigger: 'blur' }
          ],
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
      init (id) {
        this.dataForm.id = id || 0
        // 所属机构下拉框内容
        this.$http({
          url: this.$http.adornUrl('/sys/company/items'),
          method: 'get',
          params: this.$http.adornParams('', false)
        }).then(({data}) => {
          this.options = data && data.code === 0 ? data.page : []
          this.dataForm.companyId = this.options[0].id
        }).then(() => {
          // 机房名下拉框列表
          this.$http({
            url: this.$http.adornUrl('/sys/sysparam/selectParamItems'),
            method: 'get',
            params: this.$http.adornParams({
              'param_type': 'server_room',
              'parent_id': 0
            }, false)
          }).then(({data}) => {
            this.roomOptions = data && data.code === 0 ? data.page : []
          })
        }).then(() => {
          this.visible = true
          // this.getFrameList()
          this.getUserItem()
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
          })
          // this.getUserItem()
        }).then(() => {
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/server/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams('', false)
            }).then(({data}) => {
              if (data && data.code === 0) {
                console.log(data)
                this.dataForm.carrierpsn = data.info.carrierpsn
                this.dataForm.carrierusn = data.info.carrierusn
                this.dataForm.companyId = data.info.companyId
                this.dataForm.roomId = data.info.roomId
                this.dataForm.frameId = data.info.frameId
                this.dataForm.serverCode = data.info.serverCode
                this.dataForm.comment = data.info.comment
                this.dataForm.userIdList = data.info.userIdList === null ? [] : data.info.userIdList
                this.dataForm.status = data.info.status
                this.getFrameList()
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/server/${!this.dataForm.id ? 'save' : 'batchUpdate'}`),
              method: 'post',
              data: this.$http.adornData({
                'ids': this.dataForm.id ? [this.dataForm.id] : undefined,
                'carrierpsn': this.dataForm.carrierpsn,
                'carrierusn': this.dataForm.carrierusn,
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
                if (this.dataForm.id) {
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
                  this.dataForm.carrierpsn = ''
                  this.dataForm.carrierusn = ''
                  this.$message({
                    message: '保存成功,可继续增加下一条',
                    type: 'success',
                    duration: 1500,
                    onClose: () => {
                      this.$emit('refreshDataList')
                    }
                  })
                }
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
        if (this.dataForm.roomId) {
          this.$http({
            url: this.$http.adornUrl('/sys/sysparam/selectParamItems'),
            method: 'get',
            params: this.$http.adornParams({
              'param_type': 'server_frame',
              'parent_id': this.dataForm.roomId
            }, false)
          }).then(({data}) => {
            this.frameOptions = data && data.code === 0 ? data.page : []
          })
        } else {
          this.frameOptions = []
        }
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
            }, false)
          }).then(({data}) => {
            console.log(data)
            this.ownersOptions = data && data.code === 0 ? data.page : []
          })
        } else {
          this.$message.error('请先选择机构')
          this.ownersOptions = []
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
