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

## 阻止冒泡
event.stopPropagation() 或者 ie 下的方法 event.cancelBubble = true;

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