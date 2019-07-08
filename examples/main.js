import 'babel-polyfill'
import Vue from 'vue'
import App from './app'

import CreateAPI from 'create-api'
import Dialog from './dialog'

Vue.use(CreateAPI)

Vue.createAPI(Dialog)

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})