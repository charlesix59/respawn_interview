# DOM

Document Object Model(DOM) 是 HTML 和 XML 文档的编程接口。它提供了对文档的结构化的表述，并定义了一种方式可以使从程序中对该结构进行访问，从而改变文档的结构，样式和内容

任何 HTML 或XML文档都可以用 DOM 表示为一个由节点构成的层级结构

节点分很多类型，每种类型对应着文档中不同的信息和（或）标记，也都有自己不同的特性、数据和方法，而且与其他类型有某种关系

## DOM操作

### 创建新节点

```js
// 创建新元素，接受一个参数，即要创建元素的标签名
document.createElement(node);

// 创建一个文本节点
document.createTextNode(text);

// 用来创建一个文档碎片，它表示一种轻量级的文档，主要是用来存储临时节点，然后把文档碎片的内容一次性添加到DOM中
// 当请求把一个DocumentFragment 节点插入文档树时，插入的不是 DocumentFragment 自身，而是它的所有子孙节点
document.createDocumentFragment(node);
```

### 添加节点

```js
// 把一个子节点添加到父节点的最后一个子节点
appendChild(node)

// 把子节点插入到指定的位置，子节点会插入到referenceElement之前
parentElement.insertBefore(newElement, referenceElement)
```

### 删除节点

```js
// 删除一个节点，首先要获得该节点本身以及它的父节点，然后，调用父节点的removeChild把自己删掉
removeChild(node)
```

### 查询节点

```js
getElementById('id');
getElementsByName('name');
getElementsByTagName('tagName');
getElementsByClassName('className');

// 传入任何有效的 css 选择器，即可选中首个 DOM 元素
// 若无匹配返回null
querySelector('cssSelector');

// 返回一个包含节点子树内所有与之相匹配的Element节点列表
// 如果没有相匹配的，则返回一个空节点列表
querySelectorAll('cssSelector');

// 获取页面中的HTML标签
document.documentElement;  
// 获取页面中的BODY标签
document.body; 
// 获取页面中的所有元素节点的对象集合型
document.all['']; 
```

### 修改节点

```js
// 可以修改DOM节点的内容，如果text是dom节点的格式也会解析成dom
// 会覆盖节点的当前内容
innerHTML='text'

// 将text进行编码，使其变为纯文本
// 读取时不返回隐藏元素的文本
innerText='text'
// 将text进行编码，使其变为纯文本
// 读取时返回所有文本
textContent='text'

// 替换元素
replaceChild(newElement,oldElement)
```

### 属性操作

```js
getAttribute(key);
setAttribute(key, value);
hasAttribute(key);
removeAttribute(key);
// 创建属性节点，可以是自定义属性
createAttribute(key);
```

# BOM

Browser Object Model(BOM),浏览器对象模型，提供了独立于内容与浏览器窗口进行交互的对象

## BOM 对象

BOM的核心是 window，而 window 对象具有双重角色，它既是通过 js 访问浏览器窗口的一个接口，又是一个 Global（全局）对象。这意味着在网页中定义的任何对象，变量和函数，都作为全局对象的一个属性或者方法存在。

### window

window是BOM的顶级对象

方法如下：

- moveBy(x,y)：从当前位置水平移动窗体x个像素，垂直移动窗体y个像素，x为负数，将向左移动窗体，y为负数，将向上移动窗体
- moveTo(x,y)：移动窗体左上角到相对于屏幕左上角的(x,y)点
- resizeBy(w,h)：相对窗体当前的大小，宽度调整w个像素，高度调整h个像素。如果参数为负值，将缩小窗体，反之扩大窗体
- resizeTo(w,h)：把窗体宽度调整为w个像素，高度调整为h个像素
- scrollBy(x,y)： 如果有滚动条，将横向滚动条向左移动x个像素，将纵向滚动条向下移动y个像素
- scrollTo(x,y)：如果有滚动条，将横向滚动条移动到相对于窗体宽度为x个像素的位置，将纵向滚动条移动到相对于窗体高度为y个像素的位置
- window.open(url,fream) 既可以导航到一个特定的url，也可以打开一个新的浏览器窗口
    - 如果 window.open() 传递了第二个参数，且该参数是已有窗口或者框架的名称，那么就会在目标窗口加载第一个参数指定的URL
    - window.open() 会返回新窗口的引用，也就是新窗口的 window 对象
- window.close() 仅用于通过 window.open() 打开的窗口

### location

是当前网站地址的对象

属性如下：

| 属性名      | 例子                                                     | 说明                  |
|----------|--------------------------------------------------------|---------------------|
| hash     | "#contents"                                            | utl中#后面的字符，没有则返回空串  |
| host     | www.wrox.com:80                                        | 服务器名称和端口号           |
| hostname | www.wrox.com                                           | 域名，不带端口号            |
| href     | http://www.wrox.com:80/WileyCDA/?q=javascript#contents | 完整url               |
| pathname | "/WileyCDA/"                                           | 服务器下面的文件路径          |
| port     | 80                                                     | url的端口号，没有则为空       |
| protocol | http:                                                  | 使用的协议               |
| search   | ?q=javascript                                          | url的查询字符串，通常为？后面的内容 |

方法如下：

- location.reload()，此方法可以重新刷新当前页面

### navigator

navigator 对象主要用来获取浏览器的属性，区分浏览器类型。属性较多，且兼容性比较复杂

属性如下：

![navigator属性](https://camo.githubusercontent.com/0e4a35fe26c49decdf39a90b9e9f8427cc38b219adaf2051e0a36df7777c099c/68747470733a2f2f7374617469632e7675652d6a732e636f6d2f36373937616234302d383038392d313165622d616239302d6439616538313462323430642e706e67)

![navigator属性](https://camo.githubusercontent.com/cf770c98de2cd0dc2cdd835145a2d8e39966aba3ea69efcd67469dc0b3f49a07/68747470733a2f2f7374617469632e7675652d6a732e636f6d2f37343039363632302d383038392d313165622d616239302d6439616538313462323430642e706e67)

### screen

客户端显示器的信息

### history

history对象主要用来操作浏览器URL的历史记录

常用方法如下：

- history.go() 界面跳转
    - 接收字符串参数：向最近的一个记录中包含指定字符串的页面跳转
    - 当参数为整数数字的时候，正数表示向前跳转指定的页面，负数为向后跳转指定的页面
- history.forward()：向前跳转一个页面
- history.back()：向后跳转一个页面
- history.length：获取历史记录数