import Vue from 'vue'
import CreateAPI from '../../src/index.js'
import Dialog from '../../examples/dialog/index.vue'

Vue.config.productionTip = false

describe('create-api', () => {
  before(() => {
    Vue.use(CreateAPI, {
      componentPrefix: 'my-'
    })
  })

  describe('Vue.use', () => {
    it('expect to add createDialog API', () => {
      expect(Vue.createAPI).to.be.a('function')
      
      Vue.createAPI(Dialog, true)

      expect(Vue.prototype.$dialog).to.be.a('function')
      expect(Dialog.$create).to.be.a('function')
    })
  })

  describe('create-api in pure JS', () => {
    let dialog
    let api
    before(() => {
      api = Vue.createAPI(Dialog, ['click'], true)
    })
    after(() => {
      dialog.$parent.destroy()
    })

    // 测试正确渲染内容
    it('expect to render correct content', () => {
      dialog = Dialog.$create({
        content: 'Content'
      })
      dialog.show()
      dialog.hide()

      let content = document.querySelector('.dialog .dialog-content p')
      expect(content.textContent).to.equal('Content')
    })

    // 测试 beforeHooks 能够正常执行
    it('expect to execuate beforeHooks', () => {
      const fake = sinon.fake()

      api.before(fake)

      dialog = Dialog.$create()
  
      expect(fake).to.be.called
    })

    // 测试配置项支持 $event
    it('expect config options to support $props/$event', done => {
      dialog = Dialog.$create({
        $props: {
          content: 'Content'
        },
        $events: {
          callback: () => {}
        }
      })

      dialog.$nextTick(() => {
        expect(Object.keys(dialog.$listeners)).to.include('callback')
        done()
      })
    })

    // 测试配置项支持 on* 形式指定 事件回调
    it(`expect config options to support 'on'`, done => {
      dialog = Dialog.$create({
        content: 'Content',
        onClick: () => {},
      })

      dialog.$nextTick(() => {
        expect(Object.keys(dialog.$listeners)).to.include('click')

        let content = document.querySelector('.dialog .dialog-content p')
        expect(content.textContent).to.equal('Content')
        done()
      })
    })

    // 测试配置项支持任何 Vue 配置
    it(`expect config options to support $xx`, done => {
      dialog = Dialog.$create({
        $class: ['my-class'],
      })

      dialog.$nextTick(() => {
        const classList = Array.prototype.slice.apply(dialog.$el.classList)
        expect(classList).to.include('my-class')
        done()
      })
    })
  })
})