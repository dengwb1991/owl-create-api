<template>
  <div>
    <h4>Click the button to pop up</h4>
    
    <p>引入 component 方式</p>
    <button class="btn" @click="showComponent">dialog</button>

    <p>api 调用 $props $events 更新数据</p>
    <button class="btn" @click="showApi">api</button>
    
    <p>slot createElement</p>
    <button class="btn" @click="showSlot">slot</button>
    
    <p>object params</p>
    <button class="btn" @click="showObject">object</button>

    <p>$create</p>
    <button class="btn" @click="showCreate">create</button>

    <Dialog :visible.sync="visible"
            :btns="btns">
      Dialog
    </Dialog>
  </div>
</template>

<script>
import Dialog from './dialog'

export default {
  components: {
    Dialog
  },
  data () {
    return {
      visible: false,
      btns: [{
        text: 'ok'
      }],
      content: 'I am content'
    }
  },
  methods: {
    // 引入 component 方式
    showComponent () {
      this.visible = true
    },
    // api 调用 $props $events 更新数据
    showApi () {
      const dialog = this.$dialog({
        $props: {
          content: 'content',
          btns: [{
            text: 'Yes'
          }, {
            text: 'Change',
            callback: () => {
              this.content = 'change content' 
              return false
            }
          }],
          $class: 'my-class'
        },
        $events: {
          callback: e => console.log('visible callback', e)
        }
      })
      dialog.show()
    },
    // slot createElement
    showSlot () {
      this.$dialog(null, (createElement) => {
        return [
          createElement('p', 'other content')
        ]
      }).show()
    },
    // object params
    showObject () {
      this.$dialog({
        content: 'I am content',
        onCallback: () => console.log('on-events callback')
      }).show()
    },
    // $create
    showCreate () {
      Dialog.$create({
        $props: {
          content: 'content',
          btns: [{
            text: 'unChangeProps',
            callback: () => {
              // this.content = 'change content' 
              return false
            }
          }]
        },
        $events: {
          callback: e => console.log('visible callback', e)
        }
      }).show()
    }
  }
}
</script>

<style lang="less">
p {
  padding: 0;
  margin: 0
}
.btn {
  width: 180px;
  height: 80px;
  line-height: 80px;
  user-select: none;
  outline: none;
  color: rgb(241, 208, 36);
  font-size: 36px;
  box-sizing: border-box;
  border: 0;
  -webkit-tap-highlight-color: transparent;
  background-color: rgb(88, 70, 40);
  padding: 0;
  margin-bottom: 60px;
}

</style>


