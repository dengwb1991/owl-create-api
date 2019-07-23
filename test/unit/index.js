import Vue from 'vue'
import CreateAPI from '../../src/index.js'
import Dialog from '../../examples/dialog/index.vue'

describe('create-api', () => {
  before(() => {
    Vue.use(CreateAPI, {
      componentPrefix: 'my-'
    })
  })

  describe('#Vue.use', () => {
    it('expect to add createDialog API', () => {
      expect(Vue.createAPI).to.be.a('function')
      
      Vue.createAPI(Dialog, true)

      expect(Vue.prototype.$dialog).to.be.a('function')
      expect(Dialog.$create).to.be.a('function')
    })
  })
})