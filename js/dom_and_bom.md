# DOM

Document Object Model(DOM) 是 HTML 和 XML 文档的编程接口。
它提供了对文档的结构化的表述，并定义了一种方式可以使从程序中对该结构进行访问，从而改变文档的结构，样式和内容

任何 HTML 或XML文档都可以用 DOM 表示为一个由节点构成的层级结构

## Node类型
节点分很多类型，每种类型对应着文档中不同的信息和（或）标记，也都有自己不同的特性、数据和方法，而且与其他类型有某种关系

DOM1级定义了一个Node接口，该接口将由DOM中的所有节点类型实现，每个节点都有一个nodeType属性，用于表明节点的类型。节点类型由在Node
类型中定义的下列12个数值常量来表示

| 类型       | 表示                                  |
|----------|-------------------------------------|
| 元素节点     | Node.ELEMENT_NODE(1)                |
| 属性节点     | Node.ATTRIBUTE_NODE(2)              |
| 文本节点     | Node.TEXT_NODE(3)                   |
| CDATA节点  | Node.CDATA_SECTION_NODE(4)          |
| 实体引用名称节点 | Node.ENTRY_REFERENCE_NODE(5)        |
| 实体名称节点   | Node.ENTITY_NODE(6)                 |
| 处理指令节点   | Node.PROCESSING_INSTRUCTION_NODE(7) |
| 注释节点     | Node.COMMENT_NODE(8)                |
| 文档节点     | Node.DOCUMENT_NODE(9)               |
| 文档类型节点   | Node.DOCUMENT_TYPE_NODE(10)         |
| 文档片段节点   | Node.DOCUMENT_FRAGMENT_NODE(11)     |
| DTD声明节点  | Node.NOTATION_NODE(12)              |

如果想要得知节点的信息，nodeType中存储着节点类型对应的数字，nodeName中保存的始终都是元素的标签名

### 文档节点
文档元素是文档最外层元素，其他所有元素都在文档元素中，每个文档只能有一个文档元素。在html中文档元素只能是`<html>`

### Document类型
js通过Document类型表示文档，document对象时HTMLDocument的一个实例，表示整个HTML页面，并且他是window对象的一个属性。

其特性为：
- nodeType值为9
- nodeName为`#document`
- 子节点可以是DocumentType（最多一个）、Element（最多一个）、ProcessingInstruction或Comment

属性：
- title：`<title>`元素中的文本
- URL：界面完整URL
- domain：界面域名
- referrer属性：链接到当前页面的那个页面的URL
- anchors：所有的带name的a元素
- applets：所有applets元素
- forms：所有form元素
- images：所有img元素
- links：所有带href属性的a元素

方法：
- getElementById
- getElementByTagName
- getElementByName（HTMLDocument特有）
- hasFeature()：查询是否实现功能，第一个参数是查询的功能，第二个参数是dom版本，如有返回true
- write
- writeln
- open
- close

### Element类型

其特性为：
- nodeType值为1
- nodeName为元素标签名（大写）
- 子节点可以是Element、Text、ProcessingInstruction、Comment、CDATASection或者EntityReference

属性：
- id
- title：元素的附加说明信息
- lang：元素的语言
- dir：文本的方向
- className：对应元素class属性
- attribute：包含一个NameNodeMap，与NodeList类似，会保存元素的所有属性

方法：
- getAttribute
- setAttribute
- removeAttribute

### Text类型
其特性为：
- nodeType值为3
- nodeName为`#text`
- nodeValue的值为节点包含的文本
- 没有子节点

属性：
- length：字符长度

方法：
- appendData(text)：将text添加到节点末尾 
- deleteData(offset, count)：从offset开始删除count个字符 
- insert(offset, text)：在offset后面插入text
- replaceData(offset, count, text)：吧offset后面count个字符提换为text
- splitText(offset)：吧文本从offset处分为两段
- substringData(offset, count)：提取从offset开始的count个字符

### Comment类型
其特性为：
- nodeType值为8
- nodeName为`#comment`
- nodeValue为注释的内容
- 没有子节点

### Attr类型
其特性为：
- nodeType值为11
- nodeName为特性的名称
- nodeValue为为特性的值
- 没有父节点
- 没有子节点（HTMl）

## 节点关系
每个节点都有一个childNodes属性，其中保存着一个NodeList对象，NodeList对象是一种类数组对象，用于保存一组有序的节点，可以通过位置来访问
这个属性有length属性，也可以通过方括号表示法访问，但是它不是Array的实例，同时也可以使用`item()`方法访问

```js
var firstChild = element.childNodes[0];
var secondChild = element.childNodes.item(1);
```

每个节点都有一个parent属性指向他们的父元素，一个previousSibling属性指向前一个兄弟，一个nextSibling属性指向后一个兄弟。
如果没有对应的节点则该属性为null

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

### 其他方法
```js
// 返回一个相同的节点，可以设置true或false决定是否深拷贝
cloneNode();
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

BOM的核心是 window，而 window 对象具有双重角色，它既是通过 js 访问浏览器窗口的一个接口，又是一个 Global（全局）对象。
这意味着在网页中定义的任何对象，变量和函数，都作为全局对象的一个属性或者方法存在。

但是全局变量与window对象的属性依然有差别：全局变量不能通过delete操作符删除，而window的属性可以

### window

window是BOM的顶级对象

一个web应用只能有一个window对象，如果一个页面中有多个frame，则每个frame有一个window对象

属性入下：
- outerWidth：浏览器宽
- outerHeight：浏览器高
- innerWidth：视口（viewport）宽
- innerHeight：视口高
- clientWidth：视口宽
- clientHeight：视口高
- opener：打开这个窗口的原始窗口

方法如下：
- moveBy(x,y)：从当前位置水平移动窗体x个像素，垂直移动窗体y个像素，x为负数，将向左移动窗体，y为负数，将向上移动窗体
- moveTo(x,y)：移动窗体左上角到相对于屏幕左上角的(x,y)点
- resizeBy(w,h)：相对窗体当前的大小，宽度调整w个像素，高度调整h个像素。如果参数为负值，将缩小窗体，反之扩大窗体
- resizeTo(w,h)：把窗体宽度调整为w个像素，高度调整为h个像素
- scrollBy(x,y)： 如果有滚动条，将横向滚动条向左移动x个像素，将纵向滚动条向下移动y个像素
- scrollTo(x,y)：如果有滚动条，将横向滚动条移动到相对于窗体宽度为x个像素的位置，将纵向滚动条移动到相对于窗体高度为y个像素的位置
- screenLeft(size)：距离屏幕左边的位置
- screenTop(size)：距离屏幕上方的位置
- window.open(url,fream) 既可以导航到一个特定的url，也可以打开一个新的浏览器窗口
    - 如果 window.open() 传递了第二个参数，且该参数是已有窗口或者框架的名称，那么就会在目标窗口加载第一个参数指定的URL
    - window.open() 会返回新窗口的引用，也就是新窗口的 window 对象
    - 第三个参数是一个逗号分割的字符串，可取的值有：
      - ‘index.html’ 弹出窗口的文件名； 
      - ‘newWindow’ 弹出窗口的名字（不是文件名），非必须，可用空’'代替； 
      - width=1024 窗口宽度； 
      - height=700 窗口高度； 
      - top=0 窗口距离屏幕上方的象素值； 
      - left=0 窗口距离屏幕左侧的象素值； 
      - titlebar=no 是否显示标题栏，被忽略，除非调用HTML应用程序或一个值得信赖的对话框.默认值是yes； 
      - menubar=no 表示菜单栏，默认值是yes； 
      - scrollbars=yes 是否显示滚动条，默认值是yes； 
      - resizable=no 是否允许改变窗口大小，默认值是yes； 
      - status=no 是否要添加一个状态栏，默认值是yes； 
      - toolbar=no 是否显示工具栏，默认值是yes； 
      - location=no 是否显示地址栏，默认值是yes；
- window.close() 仅用于通过 window.open() 打开的窗口
- window.alert(str)：显示一个字符串对话框
- window.confirm(str)：显示一个带确定取消的字符串对话框，返回true/false
- window.prompt(str)：显示一个带输入框的字符串对话框，返回输入的内容
- window.print()：打印
- window.find()：查找

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
- location.assign(url)，打开传入的url并生成一条历史记录，等于直接为location赋值
- 

### navigator

navigator 对象主要用来获取浏览器的属性，区分浏览器类型。属性较多，且兼容性比较复杂

属性如下：

![navigator属性](https://camo.githubusercontent.com/0e4a35fe26c49decdf39a90b9e9f8427cc38b219adaf2051e0a36df7777c099c/68747470733a2f2f7374617469632e7675652d6a732e636f6d2f36373937616234302d383038392d313165622d616239302d6439616538313462323430642e706e67)

![navigator属性](https://camo.githubusercontent.com/cf770c98de2cd0dc2cdd835145a2d8e39966aba3ea69efcd67469dc0b3f49a07/68747470733a2f2f7374617469632e7675652d6a732e636f6d2f37343039363632302d383038392d313165622d616239302d6439616538313462323430642e706e67)

### screen

客户端显示器的信息

| 属性          | 说明                     |
|-------------|------------------------|
| availHeight | 返回屏幕的高度（不包括Windows任务栏） |
| availWidth  | 返回屏幕的宽度（不包括Windows任务栏） |
| colorDepth  | 返回目标设备或缓冲器上的调色板的比特深度   |
| height      | 返回屏幕的总高度               |
| pixelDepth  | 返回屏幕的颜色分辨率（每象素的位数）     |
| width       | 返回屏幕的总宽度               |


### history

history对象主要用来操作浏览器URL的历史记录

常用方法如下：

- history.go() 界面跳转
    - 接收字符串参数：向最近的一个记录中包含指定字符串的页面跳转
    - 当参数为整数数字的时候，正数表示向前跳转指定的页面，负数为向后跳转指定的页面
- history.forward()：向前跳转一个页面
- history.back()：向后跳转一个页面
- history.length：获取历史记录数