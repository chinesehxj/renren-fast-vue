<template>
  <div class="site-wrapper site-page--login">
    <div class="site-content__wrapper">
      <!-- <div class="site-content"> -->
        <!-- <div class="brand-info">
          <h2 class="brand-info__text">renren-fast-vue</h2>
          <p class="brand-info__intro">renren-fast-vue基于vue、element-ui构建开发，实现renren-fast后台管理前端功能，提供一套更优的前端解决方案。</p>
        </div> -->
      <div style="text-align:center;"><img src="~@/assets/img/dy.png" style="width:200px;"/></div>
      <div style="text-align:center; margin-top:20px; margin-bottom:20px;"><p style="font-size:30px;color:#002b70;font-weight:bolder;">设备系统监控器V1.0</p></div>
        <div class="login-main">
          <div class="login-form">
            <h3 class="login-title"></h3>
            <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" status-icon>
              <el-form-item prop="userName">
                <el-input v-model="dataForm.userName" placeholder="帐号"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <!-- <el-input v-model="dataForm.passwordInput" @focus="onFocusDeal" type="password" ref="inputPassword" @change.native="onChangeDeal" @keyup.native="onChangeDeal" @blur="generaNewPwd" placeholder="密码"></el-input> -->
                <el-input v-model="dataForm.passwordInput" type="password" placeholder="" style="opacity:0;filter:alpha(opacity=0)"></el-input>
              </el-form-item>
              
              <!-- <el-form-item prop="passwordEnCode">
                <el-input v-model="dataForm.passwordEnCode" ref="passwordEncodeFocus" type="password" placeholder="密码" v-show="dataForm.pdEncodeFlag"></el-input>
              </el-form-item> -->
              <el-form-item prop="captcha">
                <el-row :gutter="20">
                  <el-col :span="14">
                    <el-input v-model="dataForm.captcha" placeholder="验证码">
                    </el-input>
                  </el-col>
                  <el-col :span="10" class="login-captcha">
                    <img :src="captchaPath" @click="getCaptcha()" alt="">
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-button class="login-btn-submit" type="primary" @click="dataFormSubmit()">登录</el-button>
              </el-form-item>
            </el-form>
            <div style="position:relative; top:-186px;">
              <el-input v-model="dataForm.password" type="password" ref="inputPassword" @blur="generaNewPwd" placeholder="密码"></el-input>
            </div>
          </div>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
  // import encrypt from '@/api/modules/encrypt'
  import { getUUID } from '@/utils'
  let Base64 = require('js-base64').Base64
  export default {
    data () {
      return {
        dataForm: {
          userName: '',
          password: '',
          passwordEnCode: '',
          passwordInput: '',
          uuid: '',
          captcha: '',
          inputType: 'password',
          encodeInputType: 'text',
          pdFlag: true,
          pdEncodeFlag: false
        },
        dataRule: {
          userName: [
            { required: true, message: '帐号不能为空', trigger: 'blur' }
          ],
          // password: [
          //   { required: true, message: '密码不能为空', trigger: 'blur' }
          // ],
          captcha: [
            { required: true, message: '验证码不能为空', trigger: 'blur' }
          ]
        },
        captchaPath: ''
      }
    },
    created () {
      this.getCaptcha()
    },
    computed: {
      newInputVal () {
        return this.dataForm.passwordInput
      }
    },
    watch: {
      newInputVal (val) {
        // let key = '123456789'
        this.dataForm.password = Base64.decode(val)
      }
    },
    methods: {
      // 提交表单
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl('/sys/login'),
              method: 'post',
              data: this.$http.adornData({
                'username': this.dataForm.userName,
                'password': this.dataForm.password,
                'uuid': this.dataForm.uuid,
                'captcha': this.dataForm.captcha
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$cookie.set('token', data.token)
                this.$router.replace({ name: 'home' })
              } else {
                this.getCaptcha()
                this.$message.error(data.msg)
              }
            })
          }
        })
      },
      generaNewPwd () {
        // this.dataForm.encodeInputType = 'password'
        // this.$refs.passwordEncodeFocus.focus()
        // this.dataForm.inputType = 'text'
        // this.$refs.inputPassword.type = 'text'
        // this.dataForm.pdFlag = false
        // this.dataForm.pdEncodeFlag = true
        // let key = '123456789'
        this.dataForm.passwordInput = Base64.encode(this.dataForm.password)
        // console.log(this.dataForm.password)
      },
      // onChangeDeal () {
      //   let inputVal = this.dataForm.passwordInput
      //   this.dataForm.password = inputVal
      //   this.dataForm.passwordInput = this.dataForm.passwordInput.replace(/./g, '*')
      // },
      // onFocusDeal () {
      // },
      // 获取验证码
      getCaptcha () {
        this.dataForm.uuid = getUUID()
        this.captchaPath = this.$http.adornUrl(`/captcha.jpg?uuid=${this.dataForm.uuid}`)
      }
    }
  }
</script>

<style lang="scss">
  .site-wrapper.site-page--login {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color:#fff;
    overflow: hidden;
    /* &:before {
      position: fixed;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      content: "";
      background-image: url(~@/assets/img/login_bg.jpg);
      background-size: cover;
    } */
    .site-content__wrapper {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      /*padding: 100px;*/
      margin: 0;
      overflow-x: hidden;
      overflow-y: hidden;
      background-color: transparent;
    }
    .site-content {
      min-height: 100%;
      padding: 30px 500px 30px 30px;
    }
    .brand-info {
      margin: 220px 100px 0 90px;
      color: #fff;
    }
    .brand-info__text {
      margin:  0 0 22px 0;
      font-size: 48px;
      font-weight: 400;
      text-transform : uppercase;
    }
    .brand-info__intro {
      margin: 10px 0;
      font-size: 16px;
      line-height: 1.58;
      opacity: .6;
    }
    .login-main {
      /* position: absolute;
      top: 0;
      right: 0;
      padding: 150px 60px 180px;
      width: 470px; 
      min-height: 100%;*/
      background-color: #fff;
    }
    .login-form {
      width: 350px;
      height: 400px;
      margin: 0 auto;
    }
    .login-title {
      font-size: 16px;
    }
    .login-captcha {
      overflow: hidden;
      > img {
        width: 100%;
        cursor: pointer;
      }
    }
    .login-btn-submit {
      width: 100%;
    }
  }
</style>
