<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible" width="600px" @close="cancelClick()">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" size="small" label-width="100px">
      <el-form-item label="机构名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="机构名称"></el-input>
      </el-form-item>
      <el-form-item label="机构编号" prop="code">
        <el-input v-model="dataForm.code" placeholder="机构编码"></el-input>
      </el-form-item>
      <el-form-item label="机构地址" prop="province">
        <el-select v-model="dataForm.provinceObj" value-key="area_code" @change="getCityInfo(dataForm.provinceObj.area_code)" placeholder="选择省">
          <el-option
            v-for="item in provinceOptions"
            :key="item.area_code"
            :label="item.area_name"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="city">
        <el-select v-model="dataForm.cityObj" value-key="area_code" @change="getDistrictInfo(dataForm.cityObj.area_code)" placeholder="选择市">
          <el-option
            v-for="item in cityOptions"
            :key="item.area_code"
            :label="item.area_name"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item  prop="district">
        <el-select v-model="dataForm.districtObj" value-key="area_code" placeholder="选择区">
          <el-option
            v-for="item in districtOptions"
            :key="item.area_code"
            :label="item.area_name"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="address">
        <el-input v-model="dataForm.address" placeholder="详细地址"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="contact">
        <el-input v-model="dataForm.contact" placeholder="联系人"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="dataForm.phone" placeholder="联系电话"></el-input>
      </el-form-item>
      <el-form-item label="状态" size="mini" prop="status">
        <el-radio-group v-model="dataForm.status">
          <el-radio :label="0">禁用</el-radio>
          <el-radio :label="1">正常</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelClick()" size="small" icon="el-icon-close">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()" size="small" icon="el-icon-check">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { isMobile } from '@/utils/validate'
  export default {
    data () {
      var validateMobile = (rule, value, callback) => {
        if (!isMobile(value)) {
          callback(new Error('手机号格式错误'))
        } else {
          callback()
        }
      }
      return {
        visible: false,
        roleList: [],
        provinceOptions: [],
        cityOptions: [],
        districtOptions: [],
        dataForm: {
          id: 0,
          name: '',
          code: '',
          provinceObj: {
            area_code: '',
            area_name: ''
          },
          cityObj: {
            area_code: '',
            area_name: ''
          },
          districtObj: {
            area_code: '',
            area_name: ''
          },
          address: '',
          contact: '',
          phone: '',
          status: 1
        },
        dataRule: {
          name: [
            { required: true, message: '机构名称不能为空', trigger: 'blur' },
            { min: 1, max: 100, message: '不得超过100个字符', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '机构编码不能为空', trigger: 'blur' },
            { min: 1, max: 100, message: '不得超过100个字符', trigger: 'blur' }
          ],
          // province: [
          //   { required: true, message: '请选择省', trigger: 'blur' }
          // ],
          // city: [
          //   { required: true, message: '请选择市', trigger: 'blur' }
          // ],
          // district: [
          //   { required: true, message: '请选择区', trigger: 'blur' }
          // ],
          address: [
            { required: true, message: '机构地址不能为空', trigger: 'blur' },
            { min: 1, max: 150, message: '不得超过150个字符', trigger: 'blur' }
          ],
          contact: [
            { required: true, message: '联系人不能为空', trigger: 'blur' },
            { min: 1, max: 30, message: '不得超过30个字符', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '联系电话不能为空', trigger: 'blur' },
            { validator: validateMobile, trigger: 'blur' }
          ]
        }
      }
    },
    // mounted () {
    //   this.$http({
    //     url: this.$http.adornUrl(`/sys/chinaArea/getProvinceInfo`),
    //     method: 'get',
    //     params: this.$http.adornParams('', false)
    //   }).then(({data}) => {
    //     if (data && data.code === 0) {
    //       console.log(data)
    //       this.provinceOptions = data.result
    //     }
    //   })
    // },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        // this.dataForm.provinceObj.area_name = ''
        // this.dataForm.provinceObj.area_code = ''
        // this.dataForm.cityObj.area_name = ''
        // this.dataForm.cityObj.area_code = ''
        // this.dataForm.districtObj.area_name = ''
        // this.dataForm.districtObj.area_code = ''
        this.$set(this.dataForm.provinceObj, 'area_name', '')
        this.$set(this.dataForm.provinceObj, 'area_code', '')
        this.$set(this.dataForm.cityObj, 'area_name', '')
        this.$set(this.dataForm.cityObj, 'area_code', '')
        this.$set(this.dataForm.districtObj, 'area_name', '')
        this.$set(this.dataForm.districtObj, 'area_code', '')

        this.provinceOptions = []
        this.cityOptions = []
        this.districtOptions = []
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(`/sys/company/info/${this.dataForm.id}`),
            method: 'get',
            params: this.$http.adornParams('', false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.getProvinceInfo()
              this.dataForm.name = data.info.name
              this.dataForm.code = data.info.code
              this.dataForm.address = data.info.address
              this.dataForm.contact = data.info.contact
              this.dataForm.phone = data.info.phone
              this.dataForm.status = data.info.status
              if (data.info.provinceCode) {
                this.getCityInfo(data.info.provinceCode)
                this.getDistrictInfo(data.info.cityCode)
                this.dataForm.provinceObj.area_name = data.info.provinceName
                this.dataForm.provinceObj.area_code = data.info.provinceCode
                this.dataForm.cityObj.area_name = data.info.cityName
                this.dataForm.cityObj.area_code = data.info.cityCode
                this.dataForm.districtObj.area_name = data.info.districtName
                this.dataForm.districtObj.area_code = data.info.districtCode
              }
            }
          })
        }
      },
      getProvinceInfo () {
        this.$http({
          url: this.$http.adornUrl(`/sys/chinaArea/getProvinceInfo`),
          method: 'get',
          params: this.$http.adornParams('', false)
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.provinceOptions = data.result
          }
        })
      },
      getCityInfo (provinceCode) {
        this.$http({
          url: this.$http.adornUrl(`/sys/chinaArea/getCityOrDistrictInfo`),
          method: 'get',
          params: this.$http.adornParams({
            'parentCode': provinceCode
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.cityOptions = data.result
          }
        })
      },
      getDistrictInfo (cityCode) {
        this.$http({
          url: this.$http.adornUrl(`/sys/chinaArea/getCityOrDistrictInfo`),
          method: 'get',
          params: this.$http.adornParams({
            'parentCode': cityCode
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.districtOptions = data.result
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        if (this.dataForm.provinceCode === '' || this.dataForm.cityCode === '' || this.dataForm.districtCode === '') {
          this.$message({
            message: '省市区不能为空',
            type: 'error',
            duration: 2000
          })
        } else {
          this.$refs['dataForm'].validate((valid) => {
            if (valid) {
              this.$http({
                url: this.$http.adornUrl(`/sys/company/${!this.dataForm.id ? 'save' : 'update'}`),
                method: 'post',
                data: this.$http.adornData({
                  'id': this.dataForm.id || undefined,
                  'name': this.dataForm.name,
                  'code': this.dataForm.code,
                  'address': this.dataForm.address,
                  'contact': this.dataForm.contact,
                  'phone': this.dataForm.phone,
                  'status': this.dataForm.status,
                  'provinceCode': this.dataForm.provinceObj.area_code,
                  'provinceName': this.dataForm.provinceObj.area_name,
                  'cityCode': this.dataForm.cityObj.area_code,
                  'cityName': this.dataForm.cityObj.area_name,
                  'districtCode': this.dataForm.districtObj.area_code,
                  'districtName': this.dataForm.districtObj.area_name
                })
              }).then(({data}) => {
                if (data && data.code === 0) {
                  this.$message({
                    message: data.msg,
                    type: 'success',
                    duration: 1500,
                    onClose: () => {
                      this.$refs['dataForm'].resetFields()
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
      },
      cancelClick () {
        this.$refs['dataForm'].resetFields()
        this.visible = false
      }
    }
  }
</script>
