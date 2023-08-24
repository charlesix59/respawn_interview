# JS 网络编程
## 表单
表单在JS对应HTMLFormElement，详情见文档：https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLFormElement

获取表单的方法如下：
- 像其他元素一样获取
- 使用`document.forms`可以获取到页面中的所有表单

### 提交表单
可以通过一下三种按钮提交表单：

```html
<!--默认提交按钮-->
<input type="submit">
<!--自定义提交按钮-->
<button type="submit"></button>
<!--图像按钮-->
<input type="image" src="#">
```

当form中存在上面三种表单的任意一种并且form中的某个控件（textarea除外）处于focus状态时按回车即可提交

当表单提交的时候，会触发submit事件，我们可以通过自定义onSubmit事件在提交之前做一些事情。

#### 阻止提交
可以在onSubmit事件中使用`preventDefault()`方法来阻止默认行为

#### 编程方式提交
手动调用form的onSubmit()方法也可以提交

### 重置表单

```html
<!--默认重置按钮-->
<input type="reset">
<!--自定义重置按钮-->
<button type="reset"></button>
```

与提交按钮类似，触发重置按钮的时候也会触发reset事件，可以通过自定义reset事件来做一些事情

### input
input的类型非常多，具体可以参考文档：https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input

#### 文本输入
可以使用type为text的input或textarea。

他们会将输入的内容存储在value属性中，我们可以通过读取和修改value来读取或修改输入内容。
_但是请不要使用setAttribute()或者修改元素节点的方式修改value值_

上面两个控件都可以用`select()`方法来选择文本框中的文字。选择的时候会触发select事件。

#### 输入过滤
可以通过自定义键盘事件等方式来阻止输入或阻止特定的输入

#### 操作剪贴板
见文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Clipboard

仅限localhost或者https下使用

#### HTML5的输入验证
- require属性：指定了require的控件不能为空
- html5新增了几个input的type：email、url、number、range、datetime、datetime-local、date、month、week、time
- pattern属性：接受一个正则表达式，输入必须与之匹配
- checkValidity()方法：检查参数是否有效，若有效则返回true
- validityState：https://developer.mozilla.org/zh-CN/docs/Web/API/ValidityState
- novalidate：禁用验证

#### 选择输入
可以使用select元素创建选择框，这个元素的在js为HTMLSelectElement类型：https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement

对于单选框，可以使用selectedIndex属性获取选中项

对于多选框，就只能一项一项读取然后查看其selected属性

## 跨文档消息传递
跨文档消息传递（cross-document messaging），简称XDM，指的是在不同域的页面间传递信息。
XDM的核心方法是`postMessage()`方法，它接受两个参数：一条消息（现代浏览器可以传入任意数据，古早浏览器只能传递字符串）和一个表示消息接收方的域的字符串。
XDM一般在iframe中使用

```js
let ifream = document.getElementById('myfream').contentWindow;
ifream.postMessage('message','https://exmple.com')
```

接收到XDM消息时，会触发window对象的message事件。这个事件以异步的形式触发。
onMessage事件处理程序包含三个参数：
- data：传输的数据
- origin：发送的域
- source：发送消息的文档的window对象的代理

## JSONP

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

## Ajax

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
        // 创建请求, 参数：请求类型，url，是否异步发送
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
        
        // 设置超时时间
        xhr.timeout = 1000;
        
        // 可以重写返回的mime类型，这样可以使返回的类型不正确时得到修复
        xhr.overrideMimeType('text/json');

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

`send()`方法接受一个参数，即请求主体发送的数据，如果不需要发送数据则传入null，默认为null。
send是异步的，在收到响应后，响应的数据会自动填充XHR对象的属性：
- responseText：响应文本
- responseXML：如果相应类型为xml则保存在此
- status：响应的HTTP状态
- statusText：状态说明

我们可以依赖readyState（只读）属性来查询当前请求的活动状态:
- 0	UNSENT：代理被创建，但尚未调用 open() 方法。 
- 1	OPENED：open() 方法已经被调用。 
- 2	HEADERS_RECEIVED：send() 方法已经被调用，并且头部和状态已经可获得。 
- 3	LOADING：下载中；responseText 属性已经包含部分数据。 
- 4	DONE：下载操作已完成。

### 数据格式化

我们可以通过FormData类型来序列化表单或对象

```js
let dataFormat = new FormData();
// 添加数据
dataFormat.append('name', 'charles')
// 或者格式化一个表单
const data = new FormData(document.forms[0]);
```

我们可以吧FormData的实例直接传递给XHR的send方法

### 进度事件
ProgressEvent 接口是测量如 HTTP 请求（一个XMLHttpRequest，或者一个 `<img>`，`<audio>`，`<video>`，`<style>` 或 `<link>` 等底层资源的加载）等底层流程进度的事件。

ProgressEvent() 构造函数返回一个新的 ProgressEvent 对象，表示当前一个漫长处理过程的完成进度。

进度事件有：
- loadstart
- progress
- abort
- error
- load
- timeout
- loadend

我们可以指定xhr的onload等事件：

```js
xhr.onload = () => {
    dosomething;
}
```

### 跨资源共享

CORS(Cross-Origin Resource Sharing 跨域资源共享)是W3C的一个草案，定义了在必须访问跨域资源时，浏览器与服务器如何沟通。

规定浏览器在发送信息时有一个Origin的头部，携带了他的域的信息。服务器如果认为可以接受则在头部添加`Access-Control-Allow-Origin`中返回响应的域。

如果没有这个头部，则浏览器会驳回请求。

#### Preflight request
一个 CORS 预检请求是用于检查服务器是否支持 CORS 即跨域资源共享。

当有必要的时候，浏览器会自动发出一个预检请求；所以在正常情况下，前端开发者不需要自己去发这样的请求。

举个🌰：
一个客户端可能会在实际发送一个 DELETE 请求之前，先向服务器发起一个预检请求，用于询问是否可以向服务器发起一个 DELETE 请求：

```http request
OPTIONS /resource/foo
Access-Control-Request-Method: DELETE
Access-Control-Request-Headers: origin, x-requested-with
Origin: https://foo.bar.org
```

如果服务器允许，那么服务器就会响应这个预检请求。并且其响应首部 Access-Control-Allow-Methods 会将 DELETE 包含在其中：

```http request
HTTP/1.1 200 OK
Content-Length: 0
Connection: keep-alive
Access-Control-Allow-Origin: https://foo.bar.org
Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE
Access-Control-Max-Age: 86400
```

## 图像ping

图片和script标签没有跨域，动态创建图像就经常使用图像ping。

```js
let img = new Image();
img.onload = img.onerror = () => {
    alert('down');
}
img.src = "https://exemple.com?param=something";
```

图像ping可以在图像的url中携带一些参数，这样以来当图片加载的时候就会访问服务器并传送参数。

常用来跟踪用户点击页面的情况和广告的曝光次数。

## Comet

Comet指的是一种更高级的ajax技术，是一种服务器像页面推送数据的技术。

有两种Comet的是实现方法，长轮询和流。

长轮询是页面向服务器发送一个请求，服务器收到之后一直保持页面打开，直到发送完数据后浏览器关闭链接，然后再次请求。

HTTP流只向服务器发送一个请求，然后服务器保持链接打开，周期性的向服务器发送数据。

## 服务器推送
SSE（Sever-Sent Event，服务器发送事件）是围绕只读Comet交互推出的API。

`EventSource` 接口是 web 内容与服务器发送事件通信的接口。

一个 EventSource 实例会对 HTTP 服务器开启一个持久化的连接，以 `text/event-stream` 格式发送事件，
此连接会一直保持开启直到通过调用 `EventSource.close()` 关闭。

EventSource有个readyState属性：0表示正连接服务器，1表示打开了连接，2表示关闭了连接

除此之外还有三个事件：
- error：在事件源连接未能打开时触发。 
- message：在从事件源接收到数据时触发。 
- open：在与事件源的连接打开时触发。

EventSource会保持和服务器的活动连接，如果断开了会重新连接。如果想强制立即断开并不在连接可以调用`close()`方法

## Fetch+Promise

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

## webSockets
webSockets的目标是在一个单独的持久连接上提供全双工、双向通信。

webSockets使用了自定义的协议，为ws或者wss(SSL加密的ws)协议。

要使用ws首先需要创建ws对象：

```js
// 接受一个url
const ws = new WebSocket(url);
```

注意：同源策略对ws不适用，因此可以通过它打开到任意站点的连接。

ws也有readyState属性： 
- 0 (WebSocket.CONNECTING)：正在链接中 
- 1 (WebSocket.OPEN)：已经链接并且可以通讯 
- 2 (WebSocket.CLOSING)：连接正在关闭 
- 3 (WebSocket.CLOSED)：连接已关闭或者没有链接成功

要发送数据，调用`send()`方法，接受到消息后会触发onMessage事件。除此之外ws还有另外几个事件： 
- close：当一个 WebSocket 连接被关闭时触发。 也可以通过 onclose 属性来设置。 
- error：当一个 WebSocket 连接因错误而关闭时触发，例如无法发送数据时。 也可以通过 onerror 属性来设置。 
- open：当一个 WebSocket 连接成功时触发。 也可以通过 onopen 属性来设置。