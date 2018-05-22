<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="${column.comments}" prop="carrierpsn">
        <el-input v-model="dataForm.carrierpsn" placeholder="${column.comments}"></el-input>
      </el-form-item>
      <el-form-item label="${column.comments}" prop="recordtime">
        <el-input v-model="dataForm.recordtime" placeholder="${column.comments}"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import API from '@/api/modules/hmcarrier'
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          carrierusn: 0,
          carrierpsn: '',
          recordtime: ''
        },
        dataRule: {
          carrierpsn: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          recordtime: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.carrierusn = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.carrierusn) {
            API.hmcarrier.info(this.dataForm.carrierusn).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.carrierpsn = data.hmcarrier.carrierpsn
                this.dataForm.recordtime = data.hmcarrier.recordtime
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            var params = {
              'carrierusn': this.dataForm.carrierusn || undefined,
              'carrierpsn': this.dataForm.carrierpsn,
              'recordtime': this.dataForm.recordtime
            }
            var tick = !this.dataForm.carrierusn ? API.hmcarrier.add(params) : API.hmcarrier.update(params)
            tick.then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
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
