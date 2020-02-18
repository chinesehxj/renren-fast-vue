<template>
  <el-dialog
    title="关于我们"
    :visible.sync="visible"
    :append-to-body="true">
    <p>设备系统监控器</p>
    <p>V1.0</p>
    <p>Powered By</p>
    <p>南京雷宜特信息技术有限公司</p>
    <p>025-66928868</p>
    <p>©2019 Radeontek Company Limited. All rights reserved. </p>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false
      }
    },
    methods: {
      // 初始化
      init () {
        this.visible = true
      }
    }
  }
 </script>

