# owl-create-api

[![codecov](https://codecov.io/gh/dengwb1991/owl-create-api/branch/master/graph/badge.svg)](https://codecov.io/gh/dengwb1991/owl-create-api) [![build](https://travis-ci.org/dengwb1991/owl-create-api.svg?branch=master)](https://travis-ci.org/dengwb1991/owl-create-api)

一个能够让 Vue 组件通过 API 方式调用的插件

## 安装

```bash
$ npm install owl-create-api
```

## 使用

```js
import Vue from 'vue'
import CreateAPI from 'owl-create-api'

import Dialog from './dialog'

Vue.use(CreateAPI)

Vue.createAPI(Dialog)
```

```js
// .vue
this.$myDialog({
  $props: {
    content: 'Content',
    btns: [{
      text: 'OK'
    }]
  },
  $events: {
  }
}).show()
```

## 更多参数示例

```js
import Vue from 'vue'
import CreateAPI from 'owl-create-api'

import Dialog from './dialog'

Vue.use(CreateAPI, {
  componentPrefix: 'my-'
})

Vue.createAPI(Dialog, ['callback'], true)
```

- api 调用 $props $events 更新数据

```js
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
}).show()
```

- slot createElement
  
```js
this.$dialog(null, (createElement) => {
  return [
    createElement('p', 'other content')
  ]
}).show()
```

- object params

```js
this.$dialog({
  content: 'I am content',
  onCallback: () => console.log('on-events callback')
}).show()
```

- $create

```js
import Dialog from './dialog'

Dialog.$create({
  $props: {
    content: 'content',
    btns: [{
      text: 'unChangeProps',
      callback: () => {
        // this.content = 'change content' invalid
        return false
      }
    }]
  },
  $events: {
    callback: e => console.log('visible callback', e)
  }
}).show()
```

# 关于

* 本插件借鉴 [vue-create-api](https://github.com/cube-ui/vue-create-api)

* [源码分析](https://juejin.im/post/5d4cb305e51d45620064bb0d)