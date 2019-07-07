import 'babel-polyfill'
import Vue from 'vue'
import App from './app'

Vue.use(OwlUI)

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})