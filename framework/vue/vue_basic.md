# Vue
Vue 是一套用于构建用户界面的渐进式框架

*[渐进式]: 可以在将应用的一部分替换为vue，或者逐步使用vue创建整个应用

## 创建Vue应用

每一个Vue应用都需要用Vue构造函数创建出一个Vue实例，Vue的构造函数接受一个`options`参数，这是一个自定义
Vue实例属性的对象，如下所示：

```js
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
```

一个Vue应用包含了一个根Vue实例和若干个组件。每一个组件也都是一个包含一些options（一些仅限根节点的属性无法使用）
的Vue实例

## Vue构造函数options属性

### 数据类

#### Data

- **类型**：`Object | Function`（如果是组件定义，则只能用`Function`类型）

- 详情：

    - Vue将会把data转换为响应式的。

    - Object必须是纯粹的对象：浏览器 API 创建的原生对象，原型上的 property 会被忽略，即data应该只是包含数据的简单对象。

    - 可以使用`vm.$data` 访问原始数据对象，Vue也会代理以上`property`，可以使用`vm.property`直接访问。但是以`$`或者`_`开头的property不会被代理

    - 当定义一个组件的时候，data必须是一个返回初始化data对象的**函数**。这时因为可能会有多个组件使用这个构造函数创建实例，如果使用对象形式的data，则每一个组件实例都会共享同一份data

- 示例

  ```js
  var data = { a: 1 }
  
  // 对于Vue实例
  var vm = new Vue({
    data: data
  })
  
  // 组合必须使用function
  var Component = Vue.extend({
    data: function () {
      return { a: 1 }
    }
  })
  ```

#### Props

- 类型：`Array<string> | Object`

- 详情：期望父组件传递的一系列参数，可以是数组或对象。如果是对象则可以有一些高级的配置;

    - **type**：可以是`String`, `Number`, `Boolean`, `Array`, `Object`, `Date`, `Function`, `Symbol`、一个构造函数或者这些类型的数组。将会检查传入的属性是不是符合对应的类型

    - **default**：定义一个默认值。如果是Object或者Array，则必须由函数返回。

    - **required**：是否是必传

    - **validator**：一个函数，验证传入的值是否符合要求。

- 实例

  ```js
  Vue.component('props-demo-simple', {
    props: ['size', 'myMessage']
  })
  
  Vue.component('props-demo-advanced', {
    props: {
      age: {
        type: Number,
        default: 0,
        required: true,
        validator: function (value) {
          return value >= 0
        }
      }
    }
  })
  ```

#### computed

- 类型：`{ [key: string]: Function | { get: Function, set: Function } }`

- 详情

    - 计算属性会混入vue实例中，所有getter和setter方法都会自动将this绑定到vue实例上

    - 如果使用了箭头函数，则this不会绑定到vue实例上，但是我们可以将vue实例作为第一个参数使用

      ```js
      computed: {
        aDouble: vm => vm.a * 2
      }
      ```

    - 计算属性的值会被缓存，只有当实例内依赖的响应式属性更新时其值才会更新。

    - `getter`和`setter`方法都可以为计算属性设置

- 示例

  ```js
  var vm = new Vue({
    data: { a: 1 },
    computed: {
      // get only
      aDouble: function () {
        return this.a * 2
      },
      // both get and set
      aPlus: {
        get: function () {
          return this.a + 1
        },
        set: function (v) {
          this.a = v - 1
        }
      }
    }
  })
  ```

#### method

- 类型：`{ [key: string]: Function }`

- 详情

    - methods将被混入Vue实例中，方法中的this将会被自动绑定为Vue实例

- 示例

  ```js
  var vm = new Vue({
    methods: {
      plus: function () {
        this.a++
      }
    }
  })
  ```

#### watch

- 类型：`{ [key: string]: string | Function | Object | Array}`

- 详情：

    - 接受一个对象，key为需要观察的值，在key发生变化时会调用value的内容

    - value可以是一个函数，一个调用某个模式的字符串，

        - 一个数组，数组中的函数将会被依次调用

        - 一个对象，其中的有一个hanler属性对应要调用的函数，一个deep属性表示无论被观察的对象嵌套多深的属性更改都会触发回调，和一个immediate属性表示是否会立即调用

- 实例

  ```js
  var vm = new Vue({
    data: {
      c: 3,
      d: 4,
    },
    watch: {
      // the callback will be alled whenever any of the watched object properties change regardless of their nested depth
      c: {
        handler: function (val, oldVal) { /* ... */ },
        deep: true
      },
      // you can pass array of callbacks, they will be called one-by-one
      e: [
        'handle1',
        function handle2 (val, oldVal){}
      ],
    }
  })
  
  ```

### DOM类

#### el

- 类型：`string | Element`（只在用 `new` 创建实例时生效）

- 详情：

    - 提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标。可以是 CSS 选择器，也可以是一个 HTMLElement 实例。

    - 如果在实例化时存在这个选项，实例将编译，否则，需要显式调用 `vm.$mount()` 手动开启编译。

**template**

- 类型：`string`

- 详情：

    - 模板将会**替换**挂载的元素。挂载元素的内容都将被忽略，除非模板的内容有分发插槽。

    - 如果值以 `#` 开始，则它将被用作选择符，并使用匹配元素的 innerHTML 作为模板

    - 如果 Vue 选项中包含渲染函数，该模板将被忽略

#### render

- 类型：`(createElement: () => VNode) => VNode`

- 详情;

    - 接收一个 `createElement` 方法作为第一个参数用来创建 `VNode`

    - 如果组件是一个函数组件，渲染函数还会接收一个额外的 `context` 参数，为没有实例的函数组件提供上下文信息。

#### renderError

- 类型：`(createElement: () => VNode, error: Error) => VNode`

- 详情：

    - render抛出异常时，renderError会渲染另外的结果

### 资源类

#### directives

- 类型：`Object`

- 详情：一个包含了Vue实例可用的指令的对象

#### filters

- 类型：`Object`

- 详情：一个包含了Vue实例可用的过滤器的对象

#### components

- 类型：`Object`

- 详情：一个包含了Vue实例可用的组件的对象

### 组合类

#### parent

- 类型：`Vue instance`

- 详情：指定父实例

#### maxin

- 类型：`Array<Object>`

- 详情：

    - 接收一个混入对象的数组，这些选项将会被合并到最终的选项中

    - 使用的是和 `Vue.extend()` 一样的选项合并逻辑

#### extend

- 类型：`Object | Function`

- 详情：允许声明扩展另一个组件 (可以是一个简单的选项对象或构造函数)，而无需使用 `Vue.extend`

#### provide / inject

- 类型：

    - **provide**：`Object | () => Object`

    - **inject**：`Array<string> | { [key: string]: string | Symbol | Object }`

- 详情

    - 祖先组件可以使用provide为后代提供一个依赖

    - 后代可以使用inject将依赖注入自己

    - 不是可响应的，但是如果传入了一个可响应的数据则依然可以响应

### 其他

#### name

- 类型：`string`（只在组件中可用）

- 详情：组件的名字

#### functional

- 类型：`boolean`

- 详情：是否使用函数式组件，即无`data`无`this`

#### model

- 类型：`{ prop?: string, event?: string }`

- 详情：允许一个自定义组件在使用 `v-model` 时定制 prop 和 event

## Vue挂载的过程
vue构造函数首先调用`_init`方法，这个方法是在`initMixin()`方法中定义的，在`_init`方法中，
会依次调用以下函数：

```js
// 初始化生命周期
initLifecycle(vm)
// 初始化组件事件侦听
initEvents(vm)
// 初始化渲染方法
initRender(vm)
// 调用 beforeCreate 钩子
callHook(vm, 'beforeCreate')
// 在初始化data、props之前初始化依赖注入内容
initInjections(vm)
// 初始化props/data/method/watch/methods
initState(vm)
// 在初始化 data/props 解析依赖
initProvide(vm) 
// 调用create 钩子
callHook(vm, 'created')
// ...省略一部分
// 挂载元素
if (vm.$options.el) {
    vm.$mount(vm.$options.el)
}

```
我们可以看到在`beforeCraete`之前，State并没有被初始化，`date`、`props`这样的属性无法被访问到。

在`beforeCraete`之后，state初始化完成，`date`、`props`在`created`的时候已经可以访问，但是此时并没有挂载，
因此无法访问dom元素

在`initState()`方法中，

```js
export function initState (vm: Component) {
  // 初始化组件的watcher列表
  vm._watchers = []
  const opts = vm.$options
  // 初始化props
  if (opts.props) initProps(vm, opts.props)
  // 初始化methods方法
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    // 初始化data  
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  // 初始化计算属性
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch && opts.watch !== nativeWatch) {
    // 初始化watch
    initWatch(vm, opts.watch)
  }
}
```

根据上面的源码我们可以发现，state初始化的顺序是：
`props`->`methods`->`data`->`computed`->`watch`

对于`$mount`方法，vue的处理方法是：
1. 先查找el元素，如果是`document`或者`body`元素则抛出错误
2. 如果有render函数则直接渲染，如果没有render函数则：
    1. 如果有`template`属性则将templete渲染为render函数
        1. 将temmplate解析ast tree

        2. 将ast tree转换成render语法字符串

        3. 生成render方法
    2. 如果没有`template`，则使用`el`元素并将其转化为render函数
3. 调用`mount`方法，`mount`方法会调用`mountComponent`方法渲染组件，这个方法会：
    1. 获取`render`函数，触发`beforeCreate`钩子
    2. 定义`updateComponent`渲染页面视图的方法
    3. 监听组件数据，在发生变化是触发`beforeUpdate`钩子
    4. 调用render方法生成`vnode`然后调用`_update`转化为真是DOM
    5. 在绑定完成之后触发`mounted`钩子

