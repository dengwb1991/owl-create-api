<template>
  <transition name="fade">
    <div class="dialog"
         :style="{ zIndex }"
         v-show="isVisible">
      <div class="dialog-mask"
           :style="{ ...maskStyle, zIndex: zIndex - 1}"
           @click="handleMask"></div>
      <div class="dialog-container"
           :style="{ ...containerStyle, zIndex }">
        <div class="dialog-content">
          <p v-if="content"
             v-html="content"></p>
          <slot></slot>
        </div>
        <div class="dialog-btns">
          <div v-for="(btn, index) in btns"
               :key="index"
               @click.stop="handleBtn(btn)"
               :style="[ btn.style, { color: btn.color } ]">{{btn.text}}</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import visibilityMixin from '../mixins/visibility'

export default {
  name: 'myDialog',
  mixins: [visibilityMixin],
  props: {
    content: {
      type: String,
      default: null
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    btns: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleBtn ({ callback }) {
      !(callback && callback() === false) && this.hide()
    },
    handleMask () {
      this.maskClosable && this.hide()
    }
  }
}
</script>

<style lang="less">
@import "../styles/dialog/index.less";
</style>
