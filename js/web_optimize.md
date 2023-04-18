# 网页优化
## 性能优化
### 内存泄漏
内存泄漏是指某块内存已经不再使用却得不到释放

产生内存泄漏的原因有：
1. 意外的全局变量
2. 被遗忘的计时器或回调函数
3. 脱离 DOM 的引用
4. 闭包

### 尾递归
尾递归，即在函数尾位置调用自身。

尾递归在普通尾调用的基础上，多出了2个特征：
- 在尾部调用的是函数自身 
- 可通过优化，使得计算仅占用常量栈空间

这时候，我们就可以使用尾递归，即一个函数中所有递归形式的调用都出现在函数的末尾，对于尾递归来说，
由于只存在一个调用记录，所以永远不会发生"栈溢出"错误

举个🌰吧！比如阶乘：
```js
// 普通递归
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

factorial(5) // 120
```
```js
// 尾递归
function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}

factorial(5) // 120
```

### 函数缓存
函数缓存，即对函数的结果进行缓存。

这是一种用空间换时间的思想，适用于会计算大量相同输入的函数。

下面给出将函数变为缓存函数的方法;
```js
/**
 * 函数缓存
 * @param {Function} func 需要缓存的函数
 * @param content
 * @return {function} 一个函数
 * */
const memorize = function (func,content){
    let cache = Object.create(null);
    content = content||this;
    //箭头函数，该方法返回一个函数
    return (...key)=>{
        if(!cache[key]){
            cache[key] = func.apply(content,key);
        }
        return cache[key];
    }
}
```

### 前端路由
前端路由就是把不同路由对应不同的内容或页面的任务交给前端而非服务器来做

**使用时机**：在单页面应用，大部分页面结构不变，只改变部分内容的使用

优点：
- 用户体验好
- 不需要每次都从服务器全部获取，速度更快

缺点：
- 单页面无法记住之前滚动的位置，无法在前进，后退的时候记住滚动的位置

### 防抖与节流
防抖与节流都是优化高频率执行的代码的一种手段

防抖: n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时

节流: n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效

防抖的实现：
```js
/**
 * 防抖的实现
 * @param {function} func 需要防抖的函数
 * @param {number} wait 等待的时间
 */
function debounce(func,wait){
    let timer = null;
    let startTime = Date.now();
    return function () {
        let curTime = Date.now();
        let reaming = wait - (curTime - startTime);
        let context = this;
        let args = arguments;
        clearTimeout(timer)
        if(reaming<=0){
            func.apply(context,args);
            startTime = Date.now();
        }
        else{
            timer = setTimeout(()=>{
                func.apply(context,args);
                startTime = Date.now();
            },wait);
        }
    }
}
```

节流的实现：

```js
/**
 * 节流的实现
 * @param {function} func 需要防抖的函数
 * @param {number} wait 等待时间
 * @param {boolean} immediate 是否立即执行
 */
function throttle(func,wait,immediate){
    let timeout;
    return function (){
        let context = this;
        let args = arguments;

        if(timeout){
            clearTimeout(timeout);
        }
        if(immediate){
            // 如果没有timeout为false即第一次运行，则call为
            let callNow = !timeout;
            timeout = setTimeout(function (){
                timeout = null;
            },wait)
            if(callNow){
                // 使用func.apply是为了保证func的this与当前函数的this相同
                func.apply(context,args);
            }
        }
        else{
            setTimeout(function (){
                func.apply(context,args)
            },wait);
        }
    }
}
```

#### 应用场景
防抖在连续的事件，只需触发一次回调的场景有：
- 搜索框搜索输入 
- 手机号、邮箱验证输入检测 
- 窗口大小resize。只需窗口调整完成后，计算窗口大小。防止重复渲染。

节流在间隔一段时间执行一次回调的场景有： 
- 滚动加载，加载更多或滚到底部监听
- 搜索框，搜索联想功能

## 网络优化

### 首屏加载优化

```js
//todo
```

### 断点重传

断点续传指的是在下载或上传时，将下载或上传任务人为地划分为几个部分

每一个部分采用一个线程进行上传或下载，如果碰到网络故障，
可以从已经上传或下载的部分开始继续上传下载未完成的部分，而没有必要从头开始上传下载。
用户可以节省时间，提高速度

一般实现方式有两种：
- 服务器端返回，告知从哪开始
- 浏览器端自行处理

上传过程中将文件在服务器写为临时文件，等全部写完了（文件上传完），将此临时文件重命名为正式文件即可

如果中途上传中断过，下次上传的时候根据当前临时文件大小，作为在客户端读取文件的偏移量，从此位置继续读取文件数据块，上传到服务器从此偏移量继续写入文件即可

> 摘自 https://github.com/febobo/web-interview

```js
function md5(context){
    // do something
    return "some md5 string"
}
function resume_upload(){
    let file = null;
    let slice = null;
    // 读取文件内容
    const input = document.querySelector('input');
    input.addEventListener('change', function() {
        file = this.files[0];
    });
    // md5生成唯一标识
    const md5code = md5(file);
    // 文件分片
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.addEventListener("load", function(e) {
        //每10M切割一段,这里只做一个切割演示，实际切割需要循环切割，
        slice = e.target.result.slice(0, 10 * 1024 * 1024);
    });

    // 分片发送
    const formData = new FormData();
    formData.append('0', slice);
    //这里是有一个坑的，部分设备无法获取文件名称，和文件类型，这个在最后给出解决方案
    formData.append('filename', file.filename);
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function() {
        //xhr.responseText
    });
    xhr.open('POST', '');
    xhr.send(formData);
    xhr.addEventListener('progress', updateProgress);
    xhr.upload.addEventListener('progress', updateProgress);

    function updateProgress(event) {
        if (event.lengthComputable) {
            //进度条
        }
    }
}
```

## 媒体优化
我觉得媒体（主要是图片）优化是值得单拎出来说的

### 图片懒加载
图片的懒加载可以转化为另一个问题，即元素是否在视窗之内。
判断元素是否可见的用途除了图片懒加载还有如下几种:
- 列表的无限滚动
- 计算广告元素的曝光情况
- 可点击链接的预加载

实现方法有三种：
- offsetTop、scrollTop 
- getBoundingClientRect 
- Intersection Observer

####  offsetTop + scrollTop
offsetTop是距离元素最近的一个具有定位（relative，absolute，fixed）的祖宗元素的上内边到该元素的上外边的距离

scrollTop是已经滑动的距离。

计算是否可见的公式为：
```js
elment.offsetTop - document.documentElement.scrollTop <= viewPortHeight
```
封装函数为：
```js
/**
 * 判断是否在视窗内
 * @param el 判断元素
 * @return {boolean} 是否在视窗内
 */
function isInViewPortOfOne (el) {
    // viewPortHeight 兼容所有浏览器写法
    const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight 
    const offsetTop = el.offsetTop
    const scrollTop = document.documentElement.scrollTop
    const top = offsetTop - scrollTop
    return top <= viewPortHeight
}
```

#### getBoundingClientRect
getBoundingClientRect返回值是一个 DOMRect对象，拥有left, top, right, bottom, x, y, 
width, 和 height属性

其中top指的是元素上边界距离界面左上的距离,其他属性如是

实现代码为：
```js
function isInViewPort(element) {
  const viewWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewHeight = window.innerHeight || document.documentElement.clientHeight;
  const {
    top,
    right,
    bottom,
    left,
  } = element.getBoundingClientRect();

  return (
    top >= 0 &&
    left >= 0 &&
    right <= viewWidth &&
    bottom <= viewHeight
  );
}
```
#### Intersection Observer

实现代码:

```js
const options = {
    // 表示重叠面积占被观察者的比例，从 0 - 1 取值，
    // 1 表示完全被包含
    threshold: 1.0,
    root:document.querySelector('#scrollArea') // 必须是目标元素的父级元素
};

const callback = function(entries, observer) {
    entries.forEach(entry => {
        entry.time;               // 触发的时间
        entry.rootBounds;         // 根元素的位置矩形，这种情况下为视窗位置
        entry.boundingClientRect; // 被观察者的位置举行
        entry.intersectionRect;   // 重叠区域的位置矩形
        entry.intersectionRatio;  // 重叠区域占被观察者面积的比例（被观察者不是矩形时也按照矩形计算）
        entry.target;             // 被观察者
    });
};

const observer = new IntersectionObserver(callback, options);

// 传入被观察使用该方法

const target = document.querySelector('.target');
observer.observe(target);
```

### 预加载
提前加载图片，当用户需要查看时可直接从本地缓存中渲染。

最常用的方式是使用 js 中的 image 对象，通过为 image 对象来设置 scr 属性，来实现图片的预加载。

### Base64
Base64 是一种编码方式，可以讲图片、ttf文件等转化为字符串。它的优缺点如下：

优点：
- 可以缓存，减少HTTP请求的次数

缺点：
- 会增加大约1/3的文件体积
- 无法直接缓存，比直接缓存图片的效果要差
- ie8之前的浏览器不支持

应用：
- 可以用来缓存5kb左右的小图标（可以通过webpack等打包工具配置）
  - 相比大图，小图增加的体积十分有限
  - 大量的小图片会启用多次http请求，十分浪费资源，而使用base64只需要传输一次
- 某些不支持外部资源的服务，只需要加载少量资源，可以使用

### 雪碧(sprite)图
雪碧图与Base64一样，都是为了优化小图片的加载。其原理是将界面使用的许多小图片都整合到一张大图中去，
然后利用CSS的`background-image`，`background-repeat`，`background-position`的组合进行背景定位。

优点：
- 减少HTTP请求次数
- 更加容易压缩，减小图片的大小
- 方便更改图片风格

缺点：
- 如果图片的布局发生变化可能需要进行大量的更改