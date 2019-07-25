import Vue from 'vue'
import CreateAPI from '../../src/index.js'
import Dialog from '../../examples/dialog/index.vue'
import { destroyVM, createVue } from './util'

Vue.config.productionTip = false

const dialog = {
  template: `<div></div>`,
  data () {
    return {
      content: 'I am content'
    }
  },
  methods: {
    showDialog () {
      return this.$dialog({
        $props: {
          content: 'content'
        },
        $events: {
          test: 'content'
        }
      }, h => {
        return h('span', 'I am default slot')
      }).show()
    },
    changeContent () {
      this.content = 'I am from App and content changed!'
    },
    showAnotherDialog () {
      return this.$dialog({
        $props: {
          content: 'I am another dialog'
        }
      }).show()
    }
  }
}

describe('create-api', () => {
  before(() => {
    Vue.use(CreateAPI, {
      componentPrefix: 'my-'
    })
  })

  describe('Vue.use', () => {
    let api

    after(() => {
      destroyVM(api)
    })
    it('expect to add createDialog API', () => {
      expect(Vue.createAPI).to.be.a('function')
      
      api = Vue.createAPI(Dialog, true)

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
      destroyVM(dialog)
      destroyVM(api)
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

  describe('create-api in Vue instance', () => {
    let vm
    let api
    before(() => {
      api = Vue.createAPI(Dialog, true)

      vm = createVue(dialog)
    })
    
    after(() => {
      destroyVM(vm)
      destroyVM(api)
    })

    it('expect to update when $props in ownInstance change', done => {
      vm.showDialog()

      vm.$nextTick(() => {
        let text = document.querySelector('.dialog .dialog-content p').textContent
        expect(text).to.equal('I am content')
        
        let slotText = document.querySelector('.dialog .dialog-content span').textContent
        expect(slotText).to.equal('I am default slot')
        
        vm.changeContent()

        vm.$nextTick(() => {
          text = document.querySelector('.dialog .dialog-content p').textContent
          expect(text).to.equal('I am from App and content changed!')
          done()
        })
      })
    })

    it('expect to remove dom before destory', done => {
      vm.showDialog()

      vm.$nextTick(() => {
        destroyVM(vm)

        expect(document.querySelector('.dialog')).to.be.null

        done()
      })
    })
  })

  describe('single mode', () => {
    let vm
    let api
    after(() => {
      destroyVM(vm)
      destroyVM(api)
    })

    // 测试单例模式 返回同一个实例
    it('expect to return the same components in single mode', () => {
      api = Vue.createAPI(Dialog, true)
      vm = createVue(dialog)
      const dialog1 = vm.showDialog()
      const dialog2 = vm.showAnotherDialog()
      expect(dialog1 === dialog2).to.be.true

      destroyVM(dialog1)
    })

    // 测试非单例模式 返回多个实例
    it('expect to return different components when not in single mode', done => {
      api = Vue.createAPI(Dialog, false)
      vm = createVue(dialog)
      const dialog1 = vm.showDialog()
      const dialog2 = vm.showAnotherDialog()
      expect(dialog1 === dialog2).to.be.false

      Vue.nextTick(() => {
        const dialogs = document.querySelectorAll('.dialog')
        const length = Array.prototype.slice.apply(dialogs).length
        expect(length).to.equal(2)

        done()
      })
    })
  })

  describe('create-api debug', () => {
    
    it('Component must have name while using create-api', () => {
      delete Dialog.name
      try {
        Vue.createAPI(Dialog, true)
      } catch (e) {
        expect(e.message).to.equal('[create-api error]: Component must have name while using create-api!')
      }
    })
  })
})