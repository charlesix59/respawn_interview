# JS的同步与异步
同步，可以理解为在执行完一个函数或方法之后，一直等待系统返回值或消息，这时程序是处于阻塞的，
只有接收到返回的值或消息后才往下执行其他的命令。

异步，执行完函数或方法后，不必阻塞性地等待返回值或消息，只需要向系统委托一个异步过程，
那么当系统接收到返回值或消息时，系统会自动触发委托的异步过程，从而完成一个完整的流程。

## 异步与非堵塞任务
### JSONP

JSONP是可以跨域的异步非阻塞任务，其原理是：

> 在当前DOM树里新添加一个`<script>`标签，通过其src属性发起一个http/https请求向服务器端请求API，让其异步非阻塞地返回一段远程JS代码，然后在客户端执行该远程代码

### SetTimeOut/SetInterVal

### Ajax

> Ajax 全称 Asynchronous JavaScript and XML, 即异步JS与XML。 它最早在IE5中被使用,

现代浏览器中, 虽然几乎全部支持ajax, 但它们的技术方案却分为两种:

- 标准浏览器通过 `XMLHttpRequest` 对象实现了ajax的功能。只需要通过一行语句便可创建一个用于发送ajax请求的对象。

- IE浏览器通过 `XMLHttpRequest` 或者 `ActiveXObject` 对象同样实现了ajax的功能。

### Fetch+Promise

ES6的**Promise本身并不是异步的**，它只是实现了对异步回调的统一封装。

```js
new Promise(resolve => { //属于微任务
   //请注意：下面这行代码是立即、同步执行的代码！！Promise本身并不是异步的！！
   console.log('1');
   //在本例中，我们使用setTimeout(...)来模拟异步代码，实际编码时可能是XHR请求或是HTML5的一些API方法.
   setTimeout(function () {
      resolve("2"); //代码正常执行！
   }, 250);
}).then(data => { console.log(data) });//then(..)异步回调的统一封装

//>> 1
//>> 2
```

Fetch会返回一个Promise对象

```js
 fetch(url,option).then((response) => {
     // 做点什么事
 });
```

### Generator **& async/await**

Generator 函数是协程在 ES6 的实现，最大特点就是可以交出函数的执行权（即暂停执行）。整个 Generator 函数就是一个封装的异步任务，或者说是异步任务的容器。异步操作需要暂停的地方，都用`yield`语句注明

```js
var gen = function* () {
    var f1 = yield readFile('/etc/fstab');
    var f2 = yield readFile('/etc/shells');
    console.log(f1.toString());
    console.log(f2.toString());
};
```

ES2017 标准引入了 async 函数，使得异步操作变得更加方便

```js
var asyncReadFile = async function () {
    var f1 = await readFile('/etc/fstab');
    var f2 = await readFile('/etc/shells');
    console.log(f1.toString());
    console.log(f2.toString());
};
```

## Event Loop

### MacroTask Queue（宏任务队列）

Event Loop 会有一个或多个 MacroTask Queue，这是一个先进先出（FIFO）的有序列表，存放着来自不同 **Task Source**（任务源）的 Task（也即MacroTask）。

> 关于 Task，常有人通俗地称它为 MarcoTask，但其实 HTML 标准中并没有这种说法。然而，为了方便理解，本书仍沿用通俗的称谓MacroTask。

在 HTML 标准中，定义了几种常见的 Task Source：

- DOM manipulation（DOM 操作）；

- User interaction（用户交互）；

- Networking（网络请求）；

- History traversal（History API 操作）。

MacroTask Source 的定义非常的宽泛，***常见的鼠标、键盘事件，AJAX，数据库操作（例如 IndexedDB），以及定时器相关的 setTimeout、setInterval*** 等等都属于 Task Source，所有来自这些 MacroTask Source 的 MacroTask 都会被放到对应的 MacroTask Queue 中等待处理。

对于 MacroTask、MacroTask Queue 和 Task Source，有如下规定：

1. 来自相同 Task Source 的 MacroTask，必须放在同一个 MacroTask Queue 中；

2. 来自不同 Task Source 的 MacroTask，可以放在不同的 MacroTask Queue 中；

3. 同一个 MacroTask Queue 内的 MacroTask 是按顺序执行的；

4. 但对于不同的 MacroTask Queue（Task Source），浏览器会进行调度，允许优先执行来自特定 Task Source 的 MacroTask。

### MicroTask Queue（微任务队列）

MicroTask Queue 与 MacroTask Queue 类似，也是一个有序列表。不同之处在于，**一个 Event Loop 只有一个 MicroTask Queue**。

在 HTML 标准中，并没有明确规定 MicroTask Source，通常认为有以下几种：

- Promise

> 在 Promises/A+ Note 3.1 中提到了 then、onFulfilled、onRejected 的实现方法，但 Promise 本身属于平台代码，由具体实现来决定是否使用 Microtask，因此在不同浏览器上可能会出现执行顺序不一致的问题。不过好在目前的共识是用 Microtask 来实现事件队列。

- MutationObserver

- Object.observe (已废弃)

### 两者的关系

![](https://pic1.zhimg.com/80/v2-a24e582fda37065755f10bd4dc5a3dc0_hd.jpg)