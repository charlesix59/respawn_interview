# JS的同步与异步
同步，可以理解为在执行完一个函数或方法之后，一直等待系统返回值或消息，这时程序是处于阻塞的，
只有接收到返回的值或消息后才往下执行其他的命令。

异步，执行完函数或方法后，不必阻塞性地等待返回值或消息，只需要向系统委托一个异步过程，
那么当系统接收到返回值或消息时，系统会自动触发委托的异步过程，从而完成一个完整的流程。

## JS异步编程
为啥要用Promise

在Promise出现之前，异步任务需要用回调

**与回调函数相比，Promise的优点**

- 指定回调函数的方式更灵活，可以启动异步任务之后再指定
- 支持链式调用，解决回调地狱问题


### Promise的使用

#### 手动封装

```js
let p = new Promise((reslove,reject)=>{
     fs.readFile('./xxx.xxx',(err, data)=>{
        if(err) reject(err)
        resolve(data)    
    })
})


p.then(value=>{
    console.log(value.toString())
}, reason=>{
    console.log(reason)
})
```

#### 使用Utils.promisify转换

```js
const utils = require('utils')
const fs = require('fs')
let mineReadFile = util.promisify(fs.readFile)
mineReadFile('./xxx.xxx').then(value=>{
    const.log(value.toString())
})
```

### promise的状态

Promise的状态指的是实例对象中的`PromiseState`对象

对象的值有：

- padding 未决定的

- resolved / fullfilled 成功

- rejected 失败


#### promise的状态转变

可以由padding变为其他两种，且一个promise对象只能改变一次

成功和失败都会有一个结果数据

- 成功：value
- 失败：reason


### Promise对象的值

实例对象中的另一个值`PromiseResult`，保存异步任务成功/失败的结果，值为

- 成功 resolve
- 失败 reject


### Promise的工作流程

### Promise的API

#### Promise构造函数

```js
new Promise()
```

#### Promise.resolve

```js
let p1 = Promise.resolve(new Promise|any)
// 如果传入的参数是一个非Promise对象，则返回一个成功的Promise对象
// 如果是一个Promise对象，参数的结果决定resolve的结果
```

#### Promise.reject

```js
let p1 = Promise.reject(Promise|any)
// 不管传入什么都是失败的，并且参数是失败的原因
```

#### Promise.all

```js
const result = Promise.all(Promise[])
// 参数是一个Promise数组，只有参数中的Promise都成功，才会成功
```

#### Promise.race

```js
const result = Promise.all(Promise[])
// 参数是一个Promise数组，是否成功由第一个先改变状态的的Promise决定
```

### 几个关键问题

#### 如何改变Promise对象的状态？

- 调用resolve函数
- 调用reject函数
- 抛出错误


#### 指定多个成功（失败）的<u>回调函数</u>，都会执行吗？

都会执行

#### 改变Promise状态和指定回调函数谁先谁后？

**都有可能**

当执行器函数是同步任务时，先改变状态

当执行器是异步任务时，先指定回调

#### Promise.then()返回的Promise的结果由谁决定？

由执行的结果决定

- 抛出错误，结果失败
- 返回结果是非Promise类型对象，结果成功
- 如果返回了一个Promise对象，则返回的Promise结果与与之相同


#### Promise如何串联多个任务？

`Promise.then()`返回一个Promise对象，可以继续调用then()

#### 异常穿透

在串联的多个任务中，只需要在最后定义失败的回调即可处理任意一个任务中的错误

#### 中断Promise链

当返回一个Pending状态的Promise对象，则后序的.then方法都不会执行

### 自定义Promise

```js
function Promise(executor){
    this.PromiseState = 'pending'
    this.PromiseResult = null
    this.callbacks = []
    function resolve(data){
        if(_this.PromiseState !== 'pending'){
            return
        }
        _this.PromiseState = 'fulfilled'
        _this.PromiseResult = data
        setTimeout(()=>{
            _this.callbacks.forEach(item =>{
                item.onResolved(data)
            })
        })
    }
    const _this = this
    function reject(data){
        if(_this.PromiseState !== 'pending'){
            return
        }
        _this.PromiseState = 'rejected'
        _this.PromiseResult = data
        setTimeout(()=>{
            _this.callbacks.forEach(item =>{
                item.onRejected(data)
            })
        })
    }
    try {
        executor(resolve,reject);
    }catch (e){
        reject(e)
    }
}

Promise.prototype.then = function (onResolved, onRejected){
    const _this = this
    if(typeof onRejected !== "function"){
        onRejected = reason =>{
            throw reason
        }
    }
    if(typeof onResolved !== "function"){
        onResolved = value => value
    }
    return new Promise((resolve,reject)=>{
        function callback(type){
            try {
                let result = type(_this.PromiseResult);
                if(result instanceof Promise){
                    result.then(v =>{
                        resolve(v)
                    },r=>{
                        reject(r)
                    })
                }else{
                    resolve(result)
                }
            }catch (e){
                reject(e)
            }
        }
        if(this.PromiseState === 'fulfilled'){
            setTimeout(()=>{
                callback(onResolved)
            })
        }
        if(this.PromiseState === 'rejected'){
            setTimeout(()=>{
                callback(onRejected)
            })

        }
        if(this.PromiseState === 'padding'){
            this.callbacks.push(
                {
                    'onResolved':function (){
                        callback(onResolved)
                    },
                    'onRejected':function (){
                        callback(onRejected)
                    },
                }
            )
        }
    })
}

Promise.prototype.catch = function (onRejected){
    this.then(undefined,onRejected);
}

Promise.resolve = function (value){
    return new Promise((resolve,reject)=>{
        if(value instanceof Promise){
            value.then(v=>{
                resolve(v)
            },r=>{
                reject(r)
            })
        }else{
            resolve(value)
        }
    })
}

Promise.reject = function (reason){
    return new Promise((resolve,reject)=>{
        reject(reason)
    })
}

Promise.all = function (promises){
    return new Promise((resolve,reject)=>{
        let count = 0
        const arr=[]
        for(let i=0;i<promises.length;i++){
            promises[i].then(v=>{
                count++
                arr[i]=v;
                if(count===promises.length){
                    resolve(arr)
                }
            },r => {
                reject(r)
            })
        }
    })
}

Promise.race = function (promises){
    return new Promise((resolve,reject)=>{
        for(let i=0;i<promises.length;i++){
            promises[i].then(v=>{
                resolve(v);
            },r=>{
                reject(r);
            })
        }
    })
}
```
### Generator

Generator 函数是协程在 ES6 的实现，最大特点就是可以交出函数的执行权（即暂停执行）。整个 Generator 函数就是一个封装的异步任务，或者说是异步任务的容器。异步操作需要暂停的地方，都用`yield`语句注明

```js
var gen = function* () {
    var f1 = yield readFile('/etc/fstab');
    var f2 = yield readFile('/etc/shells');
    console.log(f1.toString());
    console.log(f2.toString());
};
```

### async 与 wait

ES2017 标准引入了 async 函数，使得异步操作变得更加方便

```js
var asyncReadFile = async function () {
    var f1 = await readFile('/etc/fstab');
    var f2 = await readFile('/etc/shells');
    console.log(f1.toString());
    console.log(f2.toString());
};
```

#### 加上async修饰的函数

- 返回值为非Promise对象，返回一个成功的Promise对象，value为返回值
- 返回值为Promise对象，和返回的Promise相同
- 抛出错误，则返回失败的Promise对象


和then方法功能相同

#### await

- await右侧的表达式一般为promise对象,但也可以是其它的值
- 如果表达式是promise对象, await返回的是promise成功的值
- 如果表达式是其它值，直接将此值作为await的返回值


**注意**：

await必须写在Promise函数中，但是Promise函数可以没有await

如果await的Promise函数失败了，则会抛出异常，需要异常处理
## 异步的网络请求
### JSONP

JSONP是可以跨域的异步非阻塞任务，其原理是：

> 在当前DOM树里新添加一个`<script>`标签，通过其src属性发起一个http/https请求向服务器端请求API，让其异步非阻塞地返回一段远程JS代码，然后在客户端执行该远程代码

下面我们来实现一下jsonp：
```js
/**
 * jsonp
 * @param url 请求url
 * @param params 请求参数
 * @param callback 回调函数
 */
function jsonp(url,params,callback){
    // 判断url是否已经有参数
    let queryString = url.indexOf("?") === -1 ? "?" : "&";

    // 为url添加参数
    for (let k in params) {
        if (params.hasOwnProperty(k)) {
            queryString += k + "=" + params[k] + "&";
        }
    }

    // 确定回调函数名称
    let random = Math.random()
            .toString()
            .replace(".", ""),
        callbackName = "myJsonp" + random;

    // 添加回调函数
    queryString += "callback=" + callbackName;

    // 构建请求
    let scriptNode = document.createElement("script");
    scriptNode.src = url + queryString;

    window[callbackName] = function() {
        // 调用回调函数
        callback(...arguments);

        // 删除这个引入的脚本
        document.getElementsByTagName("head")[0].removeChild(scriptNode);
    };

    // 发起请求
    document.getElementsByTagName("head")[0].appendChild(scriptNode);
}
```

### Ajax

> Ajax 全称 Asynchronous JavaScript and XML, 即异步JS与XML。 它最早在IE5中被使用,

现代浏览器中, 虽然几乎全部支持ajax, 但它们的技术方案却分为两种:

- 标准浏览器通过 `XMLHttpRequest` 对象实现了ajax的功能。只需要通过一行语句便可创建一个用于发送ajax请求的对象。
- IE浏览器通过 `XMLHttpRequest` 或者 `ActiveXObject` 对象同样实现了ajax的功能。

如果我们不使用jQuery或者Axios来实现一个ajax还是比较复杂的，我们需要这么做：

```js
const server = "www.example.com:8080/";

/**
 * 
 * @param url 请求网址（除去服务器）
 * @param method 请求方式
 * @param data 要发送数据（Post可用）
 * @return {Promise<unknown>} 返回一个promise对象
 */
function getJson(url,method="GET",data){
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        // 创建请求
        xhr.open(method, server + url, true);

        // 设置状态监听函数
        xhr.onreadystatechange(e => {
            if (e.readyState !== 4) {
                return;
            }
            if (this.state === 200) {
                resolve(e.response);
            } else {
                reject(e.statusText);
            }
        })

        // 设置错误监听函数
        xhr.onerror(e => {
            reject(e.statusText);
        })

        // 设置请求信息
        xhr.responseType = "json";
        xhr.setRequestHeader("Accept", "Application/json");

        // 发送请求
        data = method.toUpperCase() === "GET" ? null : data;
        xhr.send(data || null);
    });
}
```

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

## Event Loop

### MacroTask Queue（宏任务队列）

Event Loop 会有一个或多个 MacroTask Queue，这是一个先进先出（FIFO）的有序列表，存放着来自不同
**Task Source**（任务源）的 Task（也即MacroTask）。

> 关于 Task，常有人通俗地称它为 MarcoTask，但其实 HTML 标准中并没有这种说法。然而，为了方便理解，本书仍沿用通俗的称谓MacroTask。

在 HTML 标准中，定义了几种常见的 Task Source：

- DOM manipulation（DOM 操作）；
- User interaction（用户交互）；
- Networking（网络请求）；
- History traversal（History API 操作）。

MacroTask Source 的定义非常的宽泛，***常见的鼠标、键盘事件，AJAX，数据库操作（例如 IndexedDB）
，以及定时器相关的 setTimeout、setInterval*** 
等等都属于 Task Source，所有来自这些 MacroTask Source 的 MacroTask 都会被放到对应的 
MacroTask Queue 中等待处理。

对于 MacroTask、MacroTask Queue 和 Task Source，有如下规定：

1. 来自相同 Task Source 的 MacroTask，必须放在同一个 MacroTask Queue 中；
2. 来自不同 Task Source 的 MacroTask，可以放在不同的 MacroTask Queue 中；
3. 同一个 MacroTask Queue 内的 MacroTask 是按顺序执行的；
4. 但对于不同的 MacroTask Queue（Task Source），浏览器会进行调度，允许优先执行来自特定 Task Source 的 MacroTask。

### MicroTask Queue（微任务队列）

MicroTask Queue 与 MacroTask Queue 类似，也是一个有序列表。不同之处在于，
**一个 Event Loop 只有一个 MicroTask Queue**。

在 HTML 标准中，并没有明确规定 MicroTask Source，通常认为有以下几种：

- Promise

> 在 Promises/A+ Note 3.1 中提到了 then、onFulfilled、onRejected 的实现方法，
> 但 Promise 本身属于平台代码，由具体实现来决定是否使用 Microtask，
> 因此在不同浏览器上可能会出现执行顺序不一致的问题。
> 不过好在目前的共识是用 Microtask 来实现事件队列。

- MutationObserver

- Object.observe (已废弃)

### 两者的关系

![](https://pic1.zhimg.com/80/v2-a24e582fda37065755f10bd4dc5a3dc0_hd.jpg)

首先整个同步代码是作为一个宏任务先开始执行的，等执行完成之后将继续执行微任务队列中的全部任务，
之后再执行一个宏任务->全部微任务，如此循环