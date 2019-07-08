<template>
  <div>
    <h4>Click the button to pop up</h4>

    <button class="btn" @click="show">dialog</button>

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
      }]
    }
  },
  methods: {
    show () {
      this.visible = true
    }
  }
}
</script>

<style lang="less">
.btn {
  width: 180px;
  height: 80px;
  line-height: 80px;
  user-select: none;
  outline: none;
  color: rgb(241, 208, 36);
  font-size: 36px;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  background-color: rgb(88, 70, 40);
  padding: 0;
}
</style>


