import 'babel-polyfill'
import Vue from 'vue'
import App from './app'

import CreateAPI from 'create-api'
// import CreateAPI from '../dist/owl-create-api.js'
import Dialog from './dialog'

Vue.use(CreateAPI)

Vue.createAPI(Dialog)

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})