import 'babel-polyfill'
import Vue from 'vue'
import App from './app'

import CreateAPI from 'create-api'
// import CreateAPI from '../dist/owl-create-api.js'
import Dialog from './dialog'

Vue.use(CreateAPI, {
  componentPrefix: 'my-'
})

Vue.createAPI(Dialog, ['callback'], true).before((renderData, renderFn, single) => {
  // console.log(renderData, renderFn, single)
})

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})