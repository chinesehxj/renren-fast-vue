
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
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="cancelEdit()" size="small" icon="el-icon-close">取消</el-button>
        <el-button type="primary" @click="saveData()" size="small" icon="el-icon-check">确认</el-button> -->
        <el-button id="cancelButton" size="small" icon="el-icon-close">取消</el-button>
        <el-button type="primary"  id="saveButton"  size="small" icon="el-icon-check">确认</el-button>
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
      <div id='mynetwork'></div>
    </div>
</template>

<script>
/*eslint-disable*/
    export default {
      data () {
        return {
          visible: false,
          nodes: new vis.DataSet(),
          edges: new vis.DataSet(),
          container: '',
          dataObj: '',
          options: '',
          network: null,
          dataTmp: {
            id: '',
            label: '',
            shape: 'icon',
            icon: {
              face: 'iconfont',
              code: '',
              size: 50,
              color: ''
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
            // {id:'\ue607', name:'服务器'},
            // {id:'\ue625', name:'存储服务器'},
            // {id:'\ue628', name:'交换机'},
            // {id:'\ue626', name:'路由器'}
            {id:'a', name:'服务器'},
            {id:'b', name:'存储服务器'},
            {id:'c', name:'交换机'},
            {id:'d', name:'路由器'}
          ],
          editAble: false
        }
      },
      mounted () {
        this.draw()
      },
      methods: {
        destroy() {
          if (this.network !== null) {
            this.network.destroy()
            this.network = null
          }
        },
        draw () {
          this.$http({
            url: this.$http.adornUrl('/server/carrierTopology/getTopology'),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            console.log(data)
            this.editAble = data.editAble
            this.destroy()
            //this.nodes = new vis.DataSet()
            //this.edges = new vis.DataSet()
            console.log(JSON.parse(data.nodeStr))
            // create an array with nodes
            this.nodes.add(JSON.parse(data.nodeStr))
            // create an array with edges
            this.edges.add(JSON.parse(data.edgeStr))
            // create a network
            this.container = document.getElementById('mynetwork')
            // provide the data in the vis format
            this.dataObj = {
              nodes: this.nodes,
              edges: this.edges
            }
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
            var obj = this
            this.options = {
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
              manipulation: {
                enabled: obj.editAble,
                initiallyActive: true,
                addNode: function (node, callback) {
                  //filling in the popup DOM elements
                  //document.getElementById('operation').innerHTML = "新增节点"
                  //document.getElementById('node-id').value = data.id
                  //document.getElementById('node-label').value = data.label
                  document.getElementById('saveButton').onclick = obj.saveData.bind(this, node, callback)
                  document.getElementById('cancelButton').onclick = obj.clearPopUp.bind()
                  //document.getElementById('network-popUp').style.display = 'block'
                  //obj.dataTmp.id = data.id
                  //obj.dataTmp.label = data.label
                  console.log('addNode:', node)
                  // obj.dataTmp.x = data.x
                  // obj.dataTmp.y = data.y
                  // obj.callbackFun = callback
                  obj.visible = true
                },
                editNode: function (node, callback) {
                  // filling in the popup DOM elements
                  // document.getElementById('operation').innerHTML = "编辑节点"
                  // document.getElementById('node-id').value = data.id
                  // document.getElementById('node-label').value = data.label
                  document.getElementById('saveButton').onclick = obj.saveData.bind(this, node, callback)
                  document.getElementById('cancelButton').onclick = obj.cancelEdit.bind(this,callback)
                  // document.getElementById('network-popUp').style.display = 'block'
                  // obj.dataForm.carrierpsn = data.id
                  // obj.dataForm.serverCode = data.label
                  // obj.dataTmp.x = data.x
                  // obj.dataTmp.y = data.y
                  // obj.callbackFun = callback
                  obj.visible = true

                },
                addEdge: function (node, callback) {
                  console.log(node)
                  if (node.from == node.to) {
                    var r = confirm("确认连接节点自己吗?")
                    if (r == true) {
                      callback(node)
                    }
                  }
                  else {
                    node.physics = false
                    node.smooth = {'type': 'vertical','roundness': 0}
                    callback(node)
                    obj.insertOrUpdateTopology()
                    console.log('I am here', node)
                    console.log('hello',obj.edges)
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
            // initialize your network!
            this.network = new vis.Network(this.container, this.dataObj, this.options)
            this.network.on('click', function (params) {
              params.event = '[original event]'
              console.log('click event, getNodeAt returns: ' + this.getNodeAt(params.pointer.DOM), obj.nodes.get(params.nodes[0]))
              //obj.visible = true
            })
          })


        //   this.network.on('doubleClick', function (params) {
        //     params.event = '[original event]'
        //   })
        //   this.network.on('oncontext', function (params) {
        //     params.event = '[original event]'
        //   })
        //   this.network.on('dragStart', function (params) {
        //   // There's no point in displaying this event on screen, it gets immediately overwritten
        //     params.event = '[original event]'
        //     console.log('dragStart Event:', params)
        //     console.log('dragStart event, getNodeAt returns: ' + this.getNodeAt(params.pointer.DOM))
        //   })
        //   this.network.on('dragging', function (params) {
        //     params.event = '[original event]'
        //   })
        // this.network.on('dragEnd', function (params) {
        //   params.event = '[original event]'
        //   console.log('dragEnd Event:', params)
        //   console.log('dragEnd event, getNodeAt returns: ' + this.getNodeAt(params.pointer.DOM))
        // })
        // this.network.on('zoom', function (params) {
        // })
        // this.network.on('showPopup', function (params) {
        // })
        // this.network.on('hidePopup', function () {
        //   console.log('hidePopup Event')
        // })
        // this.network.on('select', function (params) {
        //   console.log('select Event:', params)
        // })
        // this.network.on('selectNode', function (params) {
        //   console.log('selectNode Event:', params)
        // })
        // this.network.on('selectEdge', function (params) {
        //   console.log('selectEdge Event:', params)
        // })
        // this.network.on('deselectNode', function (params) {
        //   console.log('deselectNode Event:', params)
        // })
        // this.network.on('deselectEdge', function (params) {
        //   console.log('deselectEdge Event:', params)
        // })
        // this.network.on('hoverNode', function (params) {
        //   console.log('hoverNode Event:', params)
        // })
        // this.network.on('hoverEdge', function (params) {
        //   console.log('hoverEdge Event:', params)
        // })
        // this.network.on('blurNode', function (params) {
        //   console.log('blurNode Event:', params)
        // })
        // this.network.on('blurEdge', function (params) {
        //   console.log('blurEdge Event:', params)
        // })
        },
        clearPopUp() {
           document.getElementById('saveButton').onclick = null;
           document.getElementById('cancelButton').onclick = null;
          // document.getElementById('network-popUp').style.display = 'none';
          // this.dataForm.carrierpsn = ''
          // this.dataForm.serverCode = ''
          // this.dataForm.nodeType = ''
           this.visible = false
        },
        // cancelEdit() {
        //   this.clearPopUp()
        //   this.callbackFun(null)
        // },
        cancelEdit(callback) {
          this.clearPopUp()
          callback(null)
        },
        // saveData() {
        //   var nodeData = new Object()
        //   nodeData = this.dataTmp
        //   nodeData.id = this.dataForm.carrierpsn
        //   nodeData.label = this.dataForm.serverCode
        //   // nodeData.shape = 'icon'
        //   // this.dataTmp.icon = '{face:\'iconfont\', code:\'\\ue796\', size: 50, color:\'red\'}'
        //   //nodeData.icon.face = 'iconfont'
        //   nodeData.icon.code = this.dataForm.nodeType
        //   // nodeData.icon.size = 50
        //   nodeData.icon.color = 'blue'
        //   console.log(JSON.stringify(nodeData.icon.code))
        //   //this.nodes.add(nodeData)
        //   this.callbackFun(nodeData)
        //   this.clearPopUp()
        //   console.log('this.nodes:',this.nodes.get())
        //   this.insertOrUpdateTopology()
        // },
        saveData(node,callback) {
          node.id = document.getElementById('node-id').value
          node.label = document.getElementById('node-label').value
          this.clearPopUp()
          callback(node)
          this.dataForm.carrierpsn = ''
          this.dataForm.serverCode = ''
        },
        insertOrUpdateTopology() {
          this.$http({
              url: this.$http.adornUrl('/server/carrierTopology/insertOrUpdateTopology'),
              method: 'post',
              data: this.$http.adornData({
                'nodeStr': JSON.stringify(this.nodes.get()),
                'edgeStr': JSON.stringify(this.edges.get())
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
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
    #mynetwork {
      position:relative;
      width: 800px;
      height: 600px;
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