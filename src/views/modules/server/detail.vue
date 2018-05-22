<style>
.div_title {
  margin-top: -20px;
  margin-left: -20px;
  margin-right: -20px;  
  height: 50px;
  border-bottom: 1px solid #eaeef2;
}
.span_serverName {
  margin-left: 20px;
  line-height: 50px;
  font-size: 18px;
  font-weight: bold;
  color:dimgrey;
}
.content {
    margin-top: 20px;
}
.div_item_title {
    margin-top: -20px;
    margin-left: -20px;
    margin-right: -20px;
    height: 30px;
    text-align: center;
    border-bottom: 1px solid #eaeef2;
}
.span_item_title {
  line-height: 30px;
  font-size: 14px;
}
</style>
<template>
    <div>
        <div class="div_title">
            <span class="span_serverName">{{serverName}}</span>
        </div>
        <div class="content">
            <el-row>
                <el-col :span="24">
                    <el-card shadow="hover">
                        <div class="div_item_title">
                            <span class="span_item_title">卡片名称</span>
                        </div>
                        <div>
                        </div> 
                    </el-card>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-card shadow="hover">
                        <div class="div_item_title">
                            <span class="span_item_title">卡片名称</span>
                        </div>
                        <div>
                        </div> 
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card shadow="hover">
                        <div class="div_item_title">
                            <span class="span_item_title">卡片名称</span>
                        </div>
                        <div>
                        </div> 
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card shadow="hover">
                        <div class="div_item_title">
                            <span class="span_item_title">卡片名称</span>
                        </div>
                        <div>
                        </div> 
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card shadow="hover">
                        <div class="div_item_title">
                            <span class="span_item_title">卡片名称</span>
                        </div>
                        <div>
                        </div> 
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card shadow="hover">
                        <div class="div_item_title">
                            <span class="span_item_title">卡片名称</span>
                        </div>
                        <div>
                        </div> 
                    </el-card>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-card shadow="hover">
                        <div class="div_item_title">
                            <span class="span_item_title">卡片名称</span>
                        </div>
                        <div>
                        </div> 
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      serverName: '这是一个标题',
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  }
}
</script>