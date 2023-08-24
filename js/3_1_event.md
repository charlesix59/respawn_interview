# 事件

事件是用户与网页发生的交互动作或浏览器的状态变化。事件被封装成一个 event 对象，包含了该事件发生时的所有相关信息（ event 的属性）以及可以对事件进行的操作（ event 的方法）

## 事件处理机制

事件处理机制可以分为两种，一种是事件捕获，一种是事件冒泡（在早期的IE并不支持事件捕获）

### 事件流

事件流规定父子节点绑定事件时候，当触发子节点的时候，存在时间触发顺序。

事件流都会经历三个阶段：事件捕获阶段(capture phase)、处于目标阶段(target phase)、事件冒泡阶段(bubbling phase)

事件冒泡是一种从下往上的传播方式，由最具体的元素（触发节点）然后逐渐向上传播到最不具体的那个节点，也就是DOM中最高层的父节点

事件捕获与事件冒泡相反，事件最开始由不太具体的节点最早接受事件, 而最具体的节点（触发节点）最后接受事件

## 事件模型

> 来自前端语音打卡社区

事件模型可以分为三种：原始事件模型（DOM0级）、标准事件模型（DOM2级）、IE事件模型（基本不用）

### 原始事件模型

事件绑定监听函数比较简单, 有两种方式：

HTML代码中直接绑定

```html
<input type="button" onclick="fun()">
```

通过JS代码绑定

```js
var btn = document.getElementById('.btn');
btn.onclick = fun;
```

DOM0级方法指定的事件处理程序被认为是元素的方法

特性:

- 绑定速度快

  DOM0级事件具有很好的跨浏览器优势，会以最快的速度绑定，但由于绑定速度太快，可能页面还未完全加载出来，以至于事件可能无法正常运行
- 只支持冒泡，不支持捕获
- 同一个类型的事件只能绑定一次

  ```html
  <input type="button" id="btn" onclick="fun1()">
  ```

  ```js
  var btn = document.getElementById('.btn');
  btn.onclick = fun2;
  ```

  如上，当希望为同一个元素绑定多个同类型事件的时候（上面的这个btn元素绑定2个点击事件），是不被允许的，后绑定的事件会覆盖之前的事件

- 删除 DOM0 级事件处理程序只要将对应事件属性置为null即可

  ```js
  btn.onclick = null;
  ```

### 标准事件模型

在该事件模型中，一次事件共有三个过程:

- 事件捕获阶段：事件从document一直向下传播到目标元素, 依次检查经过的节点是否绑定了事件监听函数，如果有则执行
- 事件处理阶段：事件到达目标元素, 触发目标元素的监听函数
- 事件冒泡阶段：事件从目标元素冒泡到document, 依次检查经过的节点是否绑定了事件监听函数，如果有则执行

事件绑定监听函数的方式如下:

```js
addEventListener(eventType, handler, useCapture)
```

事件移除监听函数的方式如下:

```js
removeEventListener(eventType, handler, useCapture)
```

参数如下：

- eventType指定事件类型(不要加on)
- handler是事件处理函数
- useCapture是一个boolean用于指定是否在捕获阶段进行处理，一般设置为false与IE浏览器保持一致

特性:

- 可以在一个DOM元素上绑定多个事件处理器，各自并不会冲突

  ```js
  btn.addEventListener('click', showMessage1, false);
  btn.addEventListener('click', showMessage2, false);
  btn.addEventListener('click', showMessage3, false);
  ```
- 通过addEventListener添加的事件处理程序正能用removeEventListener来移除，移除时传入的参数要与添加时相同。也就是说匿名函数无法被移除。
- 当第三个参数(useCapture)设置为true就在捕获过程中执行，反之在冒泡过程中执行处理函数

### IE事件模型

IE事件模型共有两个过程:

- 事件处理阶段：事件到达目标元素, 触发目标元素的监听函数。
- 事件冒泡阶段：事件从目标元素冒泡到document, 依次检查经过的节点是否绑定了事件监听函数，如果有则执行

事件绑定监听函数的方式如下:

```js
attachEvent(eventType, handler)
```

事件移除监听函数的方式如下:

```js
detachEvent(eventType, handler)
```
## 事件对象
在触发DOM事件之后会产生一个事件对象event，这个对象中包含着与事件有关的信息

### 阻止冒泡

event.stopPropagation() 或者 ie 下的方法 event.cancelBubble = true;

## 事件类型

### UI事件
- DOMActivate：已弃用
- load：页面完全加载后在window上触发
- unload：当页面完全卸载后在window上触发
- abort：当用户停止下载时，在`<Object>`元素上触发
- error：发生js错误时在window上触发
- select：用户选择文本框时触发
- resize：窗口大小变化时在window上触发
- scroll：带滚动条的元素滚动时触发

### 焦点事件
- blur：失去焦点时触发，不冒泡
- focus：获得焦点时触发，不冒泡
- focusin：获取焦点时触发，冒泡
- focusout：失去焦点时触发，冒泡

### 鼠标事件
- click：点击鼠标主按键或按enter
- dbclick：双击鼠标主键
- mousedown：按下任意鼠标按键
- mouseup：释放鼠标按键触发
- mouseenter：鼠标进入某个范围之内，不冒泡
- mouseleave：鼠标离开范围内，不冒泡
- mousemove：鼠标在元素内移动时触发
- mouseout：鼠标移动到另一个元素触发（可能在原本的元素内）
- mouseover：从一个元素外部移入元素内的另一个元素时触发

鼠标事件的属性：
- MouseEvent.altKey 只读 当鼠标事件触发的时，如果 alt 键被按下，返回 true; 
- MouseEvent.button 只读 当鼠标事件触发的时，如果鼠标按钮被按下（如果有的话），将会返回一个数值。
  - 0：主按键，通常指鼠标左键或默认值（译者注：如 document.getElementById('a').click() 这样触发就会是默认值） 
  - 1：辅助按键，通常指鼠标滚轮中键 
  - 2：次按键，通常指鼠标右键 
  - 3：第四个按钮，通常指浏览器后退按钮 
  - 4：第五个按钮，通常指浏览器的前进按钮
- MouseEvent.buttons只读 当鼠标事件触发的时，如果多个鼠标按钮被按下（如果有的话），将会返回一个或者多个代表鼠标按钮的数字。
  - 一个数字，用来标识鼠标按下的一个或者多个按键。如果按下的键为多个，则值等于所有按键对应数值进行或 (|) 运算的结果。 
  - 0: 没有按键或者是没有初始化 
  - 1: 鼠标左键 
  - 2: 鼠标右键 
  - 4: 鼠标滚轮或者是中键 
  - 8: 第四按键 (通常是“浏览器后退”按键)
  - 16 : 第五按键 (通常是“浏览器前进”)
- MouseEvent.clientX 只读 鼠标指针在点击元素（DOM）中的 X 坐标。 
- MouseEvent.clientY 只读 鼠标指针在点击元素（DOM）中的 Y 坐标。 
- MouseEvent.ctrlKey 只读 当鼠标事件触发时，如果 control 键被按下，则返回 true； 
- MouseEvent.metaKey 只读 当鼠标事件触发时，如果 meta 键被按下，则返回 true； 
- MouseEvent.movementX 只读 鼠标指针相对于最后mousemove事件位置的 X 坐标。 
- MouseEvent.movementY 只读 鼠标指针相对于最后mousemove事件位置的 Y 坐标。 
- MouseEvent.region 只读 返回被点击事件影响的点击区域的 id，如果没有区域被影响则返回 null。 
- MouseEvent.screenX 只读 鼠标指针相对于全局（屏幕）的 X 坐标； 
- MouseEvent.screenY 只读 鼠标指针相对于全局（屏幕）的 Y 坐标； 
- MouseEvent.shiftKey 只读 当鼠标事件触发时，如果 shift 键被按下，则返回 true；

### 键盘事件
- keydown：按下任意键触发，按住不放会重复触发
- keypress：（已弃用）按下任意字符时触发，按住不放会重复触发
- keyup：释放键盘上的键时触发

键码对应：https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/code#code_values

### HTML5事件
- contextmenu：右键调出菜单时触发
- beforeunload：在页面卸载之前调用，用来阻止用户离开
- DOMContentLoaded：在形成完整DOM树之后触发
- pageshow：页面显示时触发
- pagehide：与pageshow相反
- hashchange：在URL的hash值改变之后触发

## 事件代理

事件代理就是将一个或者一组元素的事件委托到它的父层或者更外层元素上，
并通过事件冒泡机制将事件交给外层元素绑定的方法处理

适合事件委托的事件有：`click，mousedown，mouseup，keydown，keyup，keypress`

事件委托存在两大优点：

- 减少整个页面所需的内存，提升整体性能
- 动态绑定，减少重复工作

局限性：

- focus、blur 这些事件没有事件冒泡机制，所以无法进行委托绑定事件
- mousemove、mouseout 这样的事件，虽然有事件冒泡，但是只能不断通过位置去计算定位，对性能消耗高，因此也是不适合于事件委托的

## 模拟事件
可以用js赖在任意时刻触发任意事件

可以通过对应事件的**构造函数**创建一个event对象，这个方法接受一个参数，即要创建的时间类型参数。
然后用元素的`dispatchEvent()`方法触发事件

如果是自定义方法可以通过`CustomEvent()`方法构造一个event对象，然后使用元素的`addEventListener()`方法添加事件处理程序，
然后用元素的`dispatchEvent()`方法触发事件。

举个🌰：
```js
const test = document.getElementById('test');
test.addEventListener('test',()=>{
    console.log('test');
})
const customEvent = new CustomEvent('test');
test.dispatchEvent(customEvent);
```

## 实现一个通用的事件监听器

```js
const EventUtils = {
    // 视能力分别使用dom0||dom2||IE方式 来绑定事件
    // 添加事件
    addEvent: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },

    // 移除事件
    removeEvent: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },

    // 获取事件目标
    getTarget: function (event) {
        return event.target || event.srcElement;
    },

    // 获取 event 对象的引用，取到事件的所有信息，确保随时能使用 event
    getEvent: function (event) {
        return event || window.event;
    },

    // 阻止事件（主要是事件冒泡，因为 IE 不支持事件捕获）
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },

    // 取消事件的默认行为
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }
};
```

## 数据双向绑定

我们经常使用的MVVM框架中很重要的一部分就是数据的双向绑定。MVVM的数据绑定比较复杂，我们先说一个原生JS的
数据双向绑定方式

```html
<input id="input"/>
<button id="output"></button>
<script>
    let inputElement = document.getElementById("input");
    let outputElement = document.getElementById("output");
    let obj = {};
    Object.defineProperty(obj,"value",{
      get(){
          return inputElement.value
      },
      set(v) {
          inputElement.value = v
          outputElement.innerText = v
      }
    })
    inputElement.addEventListener("keyup",(ev)=>{
      console.log(ev)
      obj.value = ev.target.value;
    })
    outputElement.addEventListener("click",()=>{
      obj.value = obj.value + "1";
    })
</script>
```

在这个例子中，我们通过数据劫持实现双向的数据绑定，下面我们会讲一下MVVM框架实现数据双向绑定的方式。

```js
//todo: 17
```