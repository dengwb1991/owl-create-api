# owl-create-api

一个能够让 Vue 组件通过 API 方式调用的插件

## 安装

```bash
$ npm install owl-create-api -S
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

* 本插件借鉴 [vue-create-api](https://github.com/cube-ui/vue-create-api)

