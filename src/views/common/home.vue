
<template>
    <div>
      <el-dialog
      :title="!dataForm.mode ? '新增' : '修改'"
      :close-on-click-modal="false"
      :visible.sync="visible" width="400px">
      <el-form :model="dataForm" @keyup.enter.native="saveData()" size="small" label-width="120px">
        <el-form-item label="PSN编号" prop="carrierpsn">
          <el-input v-model="dataForm.carrierpsn" id="node-id" placeholder="PSN号"></el-input>
        </el-form-item>
        <el-form-item label="服务器名(编号)" prop="serverCode">
          <el-input v-model="dataForm.serverCode" id="node-label" placeholder="服务器名(编号)"></el-input>
        </el-form-item>
        <el-form-item label="节点类型" size="mini" prop="type">
          <el-select v-model="dataForm.nodeType" filterable placeholder="请选择节点类型" >
            <el-option
              v-for="item in nodeTypeList"
              :key="item.type"
              :label="item.name"
              :value="item.type">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit()" size="small" icon="el-icon-close">取消</el-button>
        <el-button type="primary" @click="saveData()" size="small" icon="el-icon-check">确认</el-button>
        <!-- <el-button id="cancelButton" size="small" icon="el-icon-close">取消</el-button>
        <el-button type="primary"  id="saveButton"  size="small" icon="el-icon-check">确认</el-button> -->
      </span>
    </el-dialog>

    <!-- <div id="network-popUp">
      <span id="operation">node</span> <br>
      <table style="margin:auto;"><tr>
        <td>id</td><td><input id="node-id" value="new value" /></td>
      </tr>
        <tr>
          <td>label</td><td><input id="node-label" value="new value" /></td>
        </tr></table>
      <input type="button" value="save" id="saveButton" />
      <input type="button" value="cancel" id="cancelButton" />
    </div> -->
      <network
          class="mynetwork"
          ref="network"
          :nodes="network.nodes"
          :edges="network.edges"
          :options="network.options"
          @click="clickEvent()"
          @drag-end="dragEnd()"
          @double-click="doubleClickEvent()"
          @hover-node="hoverNode($event)"
          @show-popup="showPopup($event)">
      </network>
      <el-button v-if="editAble" type="success" :disabled="noNeedSave" size="small" style="position: absolute; top:37px; right:37px" @click="insertOrUpdateTopology()">保存拓扑图</el-button>
      <topology-server-view v-if="serverViewVisible" ref="serverView"></topology-server-view>
      <div>
        <p style="margin-top:10px; font-size:16px;"><span style="width:20px; height:20px; background-color:red; display:inline-block;"></span>  服务器有告警</p>
        <p style="margin-top:10px; font-size:16px;"><span style="width:20px; height:20px; background-color:gray; display:inline-block;"></span>  服务器离线</p>
      </div>
    </div>
</template>

<script>
/*eslint-disable*/
    import { Network, DataSet } from 'vue2vis';
    import "vue2vis/dist/vue2vis.css";
    import TopologyServerView from '@/components/topology-server-view'
    var locales = {
        cn: {
          edit: '编缉',
          del: '删除选中项',
          back: '返回',
          addNode: '新增节点',
          addEdge: '新增连线',
          editNode: '编辑节点',
          editEdge: '编辑连线',
          addDescription: '点击空白处理新增节点',
          edgeDescription: '点击起始节点并拖动连线到目标节点.',
          editEdgeDescription: '点击控制点并将其拖动到目标节点完成编辑.',
          createEdgeError: '无法连接到集群.',
          deleteClusterError: '集群无法被删除.',
          editClusterError: '集群无法编辑.'
        }
      }
    export default {
      data () {
        return {
          visible: false,
          serverViewVisible: false,
          noNeedSave: true,
          container: '',
          dataObj: '',
          options: '',
          diskCautionCount: '',
          cpuCautionCount: '',
          offlineCautionCount: '',
          dataTmp: {
            id: '',
            label: '',
            type: '',
            title: '',
            shape: 'image', //modify on 2019-2-13 21:35:11 将Icon换成实物图形 原来的代码为 shape: 'icon',
            x: 0,
            y: 0,
            image:''  //modify on 2019-2-13 21:35:11 将Icon换成实物图形 原来的代码为 icon: {code: '', color: '', face: '', size: ''}
          },
          network: {
            nodes: new DataSet(),
            edges: new DataSet(),
            options: {
              layout: {randomSeed:2},
              physics:false //关闭弹簧效果
            }
          },
          callbackFun: new Object(),
          dataForm: {
            mode: 0,
            carrierpsn: '',
            serverCode: '',
            nodeType: ''
          },
          nodeTypeList: [
            //modify on 2019-2-13 21:35:11 将Icon换成实物图形 start
            {id:'~@/assets/img/server.png',type:'server', name:'服务器'}
            //{id:'~@/assets/img/server1u.png',type:'storage', name:'存储服务器'},
            //{id:'~@/assets/img/jg.png',type:'jg', name:'机柜'}
            // {id:'\ue607',type:'server', name:'服务器'},
            // {id:'\ue625',type:'storage', name:'存储服务器'},
            // {id:'\ue628',type:'switch', name:'交换机'},
            // {id:'\ue626',type:'router', name:'路由器'}
            //modify on 2019-2-13 21:35:11 将Icon换成实物图形 end
          ],
          editAble: false
        }
      },
      components: {
        Network,
        DataSet,
        TopologyServerView
      },
      mounted () {
        this.draw()
      },
      methods: {
        draw () {
          this.$http({
            url: this.$http.adornUrl('/server/carrierTopology/getTopology'),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            console.log(data)
            this.editAble = data.editAble
            
            //this.destroy()
            // create an array with nodes
            var ns = data.nodeStr ? data.nodeStr : ''
            if (ns !== '' ) {
              this.network.nodes.add(JSON.parse(ns))
            }
            // create an array with edges
            var es = data.edgeStr ? data.edgeStr : ''
            if (es !== '' ) {
              this.network.edges.add(JSON.parse(es))
            }
            // create a network
           
            var obj = this
            this.network.options = {
              layout: {randomSeed:2},
              locale: 'cn',
              locales: locales,
              nodes: {
                shadow:true,
                color: {
                  background: 'white'
                }
              },
              edges:{shadow:true},
              interaction:{hover:true},
              manipulation: {
                enabled: obj.editAble,
                initiallyActive: true,
                addNode: function (node, callback) {
                  console.log('addNode:', node)
                  obj.dataTmp.x = node.x
                  obj.dataTmp.y = node.y
                  obj.callbackFun = callback
                  obj.visible = true
                },
                editNode: function (node, callback) {
                  obj.dataForm.carrierpsn = node.id
                  obj.dataForm.serverCode = node.label
                  obj.dataForm.nodeType = node.type
                  obj.dataTmp.x = node.x
                  obj.dataTmp.y = node.y
                  obj.callbackFun = callback
                  obj.visible = true
                },
                addEdge: function (node, callback) {
                  console.log(node)
                  if (node.from == node.to) {
                    var r = confirm("确认连接节点自己吗?")
                    if (r == true) {
                      callback(node)
                      obj.insertOrUpdateTopology()
                    }
                  }
                  else {
                    node.physics = false
                    node.smooth = {'type': 'vertical','roundness': 0}
                    callback(node)
                    obj.insertOrUpdateTopology()
                    //obj.edges.add(data)
                  }
                },
                deleteNode: function (node, callback) {
                  console.log(node)
                  callback(node)
                  obj.insertOrUpdateTopology()
                },
                deleteEdge: function (node, callback) {
                  console.log(node)
                  callback(node)
                  obj.insertOrUpdateTopology()
                }
              }
            }
            // 
            this.getNodesStat() 
          })
        },
        getNodesStat () {
          var vmobj = this
          var psns = this.network.nodes.getIds()
          this.$http({
            url: this.$http.adornUrl('/home/getNodesStat'),
            method: 'post',
            data: this.$http.adornData({
              'carrierPSNList': psns
            })
          }).then(({data}) => {
            
            if (data && data.code === 0) {
              // 节点添加状态
              for(var i = 0; i < data.statList.length; i++) {
                var selectNodesJson = JSON.parse(JSON.stringify(vmobj.network.nodes.get(data.statList[i].psn)))
                if (selectNodesJson) {
                  if(data.statList[i].stat === '0') {
                    //selectNodesJson.icon.color = 'gray'
                    selectNodesJson.image = 'http://www.bingshuiwu.com:8088/img/serverOff.png'
                  } else if (data.statList[i].stat === '1') {
                    selectNodesJson.image = 'http://www.bingshuiwu.com:8088/img/serverOn.png'
                  } else {
                    selectNodesJson.image = 'http://www.bingshuiwu.com:8088/img/server.png'
                  }
                  vmobj.network.nodes.update(selectNodesJson)
                }
              }

            } else {}
          })
        },
        clickEvent() {
          //console.log('click event, getNodeAt returns: ' + Network.getNodeAt(params.pointer.DOM), obj.nodes.get(params.nodes[0]))
          //获取节点ID
          var selectNodes = this.$refs.network.getSelectedNodes()
          
            //获取节点信息,并转换成json对象
            var selectNodesJson = JSON.parse(JSON.stringify(this.network.nodes.get(selectNodes)))
            //this.network.nodes.add({id:'test', label: 'test', type: 'switch'})
            //console.log(JSON.parse(JSON.stringify(this.network.nodes.get('test'))).type)
           if (selectNodesJson[0]) {
            console.log("selectNodesJson:",selectNodesJson[0].type)
          //   selectNodesJson[0].icon.color = 'red'

          //   console.log('click event, getNodeAt returns: ' + this.$refs.network.getSelectedNodes())
          //   console.log(this.$refs.network.getPositions(selectNodes))
  
          //   this.network.nodes.update(selectNodesJson[0])
           }
        },
        doubleClickEvent() {
          var selectNodes = this.$refs.network.getSelectedNodes()
          this.viewServerDetail(selectNodes)
        },
        dragEnd() {
          this.$refs.network.storePositions()
          console.log('after drag this.nodes:',this.network.nodes.get())
          this.noNeedSave = false
        },
        hoverNode(val) {
          console.log(val)
          //var selectNodes = this.$refs.network.getSelectedNodes()
          var selectNodesJson = JSON.parse(JSON.stringify(this.network.nodes.get(val.node)))
          console.log("hoverNodesJson:", selectNodesJson)
          // this.getAlarmInfo(val.node)
          var psnList = []
          psnList.push(val.node)
          this.$http({
            url: this.$http.adornUrl('/home/sumData'),
            method: 'post',
            data: this.$http.adornData({
              'carrierPSNList': psnList
            },false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              console.log('showing')
              selectNodesJson.title = selectNodesJson.label + '</br>硬盘告警次数： ' + data.info.diskCautionCount + '</br>CPU告警次数： ' + data.info.cpuCautionCount + '</br>下线告警次数： ' + data.info.offlineCautionCount
              this.network.nodes.update(selectNodesJson)
            } else {}
          })
        },
        // 这个方法不能少，配合hoverNode显示title用
        showPopup(val) {
          console.log('showPopup',val)
        },
        getAlarmInfo (psnNum) {
          var psnList = []
          psnList.push(psnNum)
          this.$http({
            url: this.$http.adornUrl('/home/sumData'),
            method: 'post',
            data: this.$http.adornData({
              'carrierPSNList': psnList
            },false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.diskCautionCount = data.info.diskCautionCount
              this.cpuCautionCount = data.info.cpuCautionCount
              this.offlineCautionCount = data.info.offlineCautionCount
            } else {}
          })
        },
        clearPopUp() {
          this.dataForm.carrierpsn = ''
          this.dataForm.serverCode = ''
          this.dataForm.nodeType = ''
          this.visible = false
        },
        //显示服务器的详细信息
        viewServerDetail (psn) {
          this.serverViewVisible = true
          this.$nextTick(() => {
            this.$refs.serverView.init(psn)
          })
        },
        saveData() {
          var nodeData = new Object()
          var isExist = this.network.nodes.get(this.dataForm.carrierpsn)
          if(isExist) {
            this.$alert('该PSN节点已经存在,请重新添加','节点重复',{
              confirmButtonText: '确定',
              type: 'warning',
              center: true
            })
            return
          }

          this.dataTmp.id = this.dataForm.carrierpsn
          this.dataTmp.label = this.dataForm.serverCode
          this.dataTmp.type = this.dataForm.nodeType
          // modify on 2019-2-13 21:35:11 将Icon换成实物图形 start
          // if(this.dataForm.nodeType === 'server') {
          //   this.dataTmp.icon.code = '\ue607'
          // } else if(this.dataForm.nodeType === 'storage') {
          //   this.dataTmp.icon.code = '\ue625'
          // } else if(this.dataForm.nodeType === 'switch') {
          //   this.dataTmp.icon.code = '\ue628'
          // } else {
          //   this.dataTmp.icon.code = '\ue626'
          // }
          // this.dataTmp.icon.color = 'blue'
          if(this.dataForm.nodeType === 'server') {
            this.dataTmp.image = 'http://www.bingshuiwu.com:8088/img/server.png'
          } else if(this.dataForm.nodeType === 'jg')  {
            this.dataTmp.image = 'http://www.bingshuiwu.com:8088/img/jg.png'
          } 
          // modify on 2019-2-13 21:35:11 将Icon换成实物图形 end

          //以下对象转json字符串,再从json字符串转成json对象的过程必须要有,否则icon图标会被最后一添加的覆盖
          nodeData = JSON.stringify(this.dataTmp)
          this.callbackFun(JSON.parse(nodeData))
          this.clearPopUp()
          console.log('this.nodes:',this.network.nodes.get())
          this.insertOrUpdateTopology()
        },
        cancelEdit() {
          this.clearPopUp()
          this.callbackFun(null)
        },
        insertOrUpdateTopology() {
          this.$http({
              url: this.$http.adornUrl('/server/carrierTopology/insertOrUpdateTopology'),
              method: 'post',
              data: this.$http.adornData({
                'nodeStr': JSON.stringify(this.network.nodes.get()),
                'edgeStr': JSON.stringify(this.network.edges.get())
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.noNeedSave = true
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {}
                })
              } else {
                this.$message.error(data.msg)
              }
            })
        }
      }
    }
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
    body, select {
      font: 10pt sans;
    }
    .mynetwork {
      position:relative;
      width: 100%;
      height: 750px;
      border: 1px solid lightgray;
    }
    // table.legend_table {
    //   font-size: 11px;
    //   border-width:1px;
    //   border-color:#d3d3d3;
    //   border-style:solid;
    // }
    // table.legend_table,td {
    //   border-width:1px;
    //   border-color:#d3d3d3;
    //   border-style:solid;
    //   padding: 2px;
    // }
    // div.table_content {
    //   width:80px;
    //   text-align:center;
    // }
    // div.table_description {
    //   width:100px;
    // }

    // #operation {
    //   font-size:28px;
    // }
    // #network-popUp {
    //   display:none;
    //   position:absolute;
    //   top:350px;
    //   left:170px;
    //   z-index:299;
    //   width:250px;
    //   height:120px;
    //   background-color: #f9f9f9;
    //   border-style:solid;
    //   border-width:3px;
    //   border-color: #5394ed;
    //   padding:10px;
    //   text-align: center;
    // }

</style>