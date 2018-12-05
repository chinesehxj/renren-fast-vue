
<template>
    <div>
        <div id='mynetwork'></div>
      </div>
</template>

<script>
/*eslint-disable*/
    export default {
      data () {
        return {
          nodes: '',
          edges: '',
          container: '',
          data: '',
          options: '',
          network: ''
        }
      },
      mounted () {
        this.draw()
      },
      methods: {
        draw () {
          // create an array with nodes
          this.nodes = new vis.DataSet([
            {id: 1, label: 'Node 1'},
            {id: 2, label: 'Node 2'},
            {id: 3, label: 'Node 3'},
            {id: 4, label: 'Node 4'},
            {id: 5, label: 'Node 5'}
          ])
          // create an array with edges
          this.edges = new vis.DataSet([
            {from: 1, to: 3, arrows: 'to', physics: false, smooth: {'type': 'cubicBezier'}},
            {from: 1, to: 2, arrows: 'to', physics: false, smooth: {'type': 'cubicBezier'}},
            {from: 2, to: 4, arrows: 'to', physics: false, smooth: {'type': 'cubicBezier'}},
            {from: 2, to: 5, arrows: 'to', physics: false, smooth: {'type': 'cubicBezier'}}
          ])
          // create a network
          this.container = document.getElementById('mynetwork')
          // provide the data in the vis format
          this.data = {
            nodes: this.nodes,
            edges: this.edges
          }
          this.options = {
            manipulation: false,
            height: '90%',
            layout: {
              hierarchical: {
                enabled: true,
                levelSeparation: 50
              }
            },
            physics: {
              hierarchicalRepulsion: {
                nodeDistance: 50
              }
            }
          }
          // initialize your network!
          this.network = new vis.Network(this.container, this.data, this.options)
          this.network.on('click', function (params) {
            params.event = '[original event]'
            document.getElementById('eventSpan').innerHTML = '<h2>Click event:</h2>' + JSON.stringify(params, null, 4)
            console.log('click event, getNodeAt returns: ' + this.getNodeAt(params.pointer.DOM))
          })
          this.network.on('doubleClick', function (params) {
            params.event = '[original event]'
            document.getElementById('eventSpan').innerHTML = '<h2>doubleClick event:</h2>' + JSON.stringify(params, null, 4)
          })
          this.network.on('oncontext', function (params) {
            params.event = '[original event]'
            document.getElementById('eventSpan').innerHTML = '<h2>oncontext (right click) event:</h2>' + JSON.stringify(params, null, 4)
          })
          this.network.on('dragStart', function (params) {
          // There's no point in displaying this event on screen, it gets immediately overwritten
            params.event = '[original event]'
            console.log('dragStart Event:', params)
            console.log('dragStart event, getNodeAt returns: ' + this.getNodeAt(params.pointer.DOM))
          })
          this.network.on('dragging', function (params) {
            params.event = '[original event]'
            document.getElementById('eventSpan').innerHTML = '<h2>dragging event:</h2>' + JSON.stringify(params, null, 4)
          })
        this.network.on('dragEnd', function (params) {
          params.event = '[original event]'
          document.getElementById('eventSpan').innerHTML = '<h2>dragEnd event:</h2>' + JSON.stringify(params, null, 4)
          console.log('dragEnd Event:', params)
          console.log('dragEnd event, getNodeAt returns: ' + this.getNodeAt(params.pointer.DOM))
        })
        this.network.on('zoom', function (params) {
          document.getElementById('eventSpan').innerHTML = '<h2>zoom event:</h2>' + JSON.stringify(params, null, 4)
        })
        this.network.on('showPopup', function (params) {
          document.getElementById('eventSpan').innerHTML = '<h2>showPopup event: </h2>' + JSON.stringify(params, null, 4)
        })
        this.network.on('hidePopup', function () {
          console.log('hidePopup Event')
        })
        this.network.on('select', function (params) {
          console.log('select Event:', params)
        })
        this.network.on('selectNode', function (params) {
          console.log('selectNode Event:', params)
        })
        this.network.on('selectEdge', function (params) {
          console.log('selectEdge Event:', params)
        })
        this.network.on('deselectNode', function (params) {
          console.log('deselectNode Event:', params)
        })
        this.network.on('deselectEdge', function (params) {
          console.log('deselectEdge Event:', params)
        })
        this.network.on('hoverNode', function (params) {
          console.log('hoverNode Event:', params)
        })
        this.network.on('hoverEdge', function (params) {
          console.log('hoverEdge Event:', params)
        })
        this.network.on('blurNode', function (params) {
          console.log('blurNode Event:', params)
        })
        this.network.on('blurEdge', function (params) {
          console.log('blurEdge Event:', params)
        })
        }
      }
    }
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
    #mynetwork {
      width: 100%;
      height: 400px;
      border: 1px solid lightgray;
    }

</style>