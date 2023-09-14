# HTML
HTML(Hyper Text Markup Language),中文：超文本标记语言。
使用HTML，将所需要表达的信息按某种规则写成HTML文件，通过专用的浏览器来识别，并将这些HTML文件“翻译”成可以识别的信息，即我们所见到的网页
## 浏览器如何处理HTML文档？
1. 接收到HTML文档之后，根据标准将HTML解析为DOM树
2. 在构建DOM树时会从网络或缓存请求JS、CSS、图片等静态资源
3. 当遇到 `<script>` 标签时，渲染进程会停止解析 HTML，而去加载，解析和执行 JS 代码（除非加了`async`或`defer`）
4. 基于CSS选择器解析CSS获取CSSOM，即获取每个DOM节点的计算样式值，没有对应的样式则会使用浏览器的默认样式
5. 根据CSSOM与DOM构建布局树，布局树包含可见元素的坐标信息与盒大小
6. 确定渲染顺序
7. 渲染
### 加载过程中的堵塞
- JavaScript 的加载、解析与执行会阻塞文档的解析。因此应该尽量延后js的加载，见[script延迟加载](html_tag.md)
- 如果CSS加载解析未完成，浏览器将延迟 JavaScript 脚本执行和文档的解析，直至其完成 CSSOM 的下载和构建（就是说如果css加载不完堵塞js，而js又堵塞html的话，大家就只能等着了！所以必须在js加载之前完成css的加载）

文档预加载：当执行 JavaScript 脚本时，另一个线程解析剩下的文档，并加载后面需要通过网络加
载的资源。但不能改变DOM树

### 加载过程中可能出现的问题
- FOUC：主要指的是样式闪烁的问题，即先出现了内容后来又突然出现了样式的情况，原因是CSS加载过慢或CSS放在了文档底部
- 白屏：因为浏览器没有加载完CSS所以迟迟不渲染或者因为JS一直堵塞文档加载导致

## SGML、XML、HTML与XHTML
SGML（Standard Generalized Markup language）是标准通用置标语言，是一种定义电子文档结构和描述其内容的国际标准语言，是所有电子文档标记语言的起源。下面都是SGML的应用

HTML（HyperText Markup Language）是超文本标记语言，主要是用于规定怎么显示网页。

XML（Extensible Markup Language）是可扩展标记语言。XML 和 HTML 的最大区别就在于 XML 的标签是可以自己创建的，数量无限多，
而 HTML 的标签都是固定的而且数量有限。

XHTML（Extensible Hypertext Markup Language）可拓展的超文本标记语言。除了可拓展外和 HTML 没什么本质的区别，标签都一样，用法也都一样，就是比 HTML
更严格，比如标签必须都用小写，标签都必须有闭合标签等。

### DHTMl
DHTML 将 HTML、JavaScript、DOM 以及 CSS 组合在一起，用于创造动态性更强的网页。通过 JavaScript 和 HTML DOM，能
够动态地改变 HTML 元素的样式。

## HTML 实体编码
HTML Entity Encode 是一段以连字号（&）开头、以分号（;）结尾的字符串。用以显示不可见字符及保留字符 (如 HTML 标签)

- ` `不可分的空格:＆nbsp;
- `<`(小于符号):＆lt;
- `>`(大于符号):＆gt; 
- `＆`(与符号):＆amp;
- `″`(双引号):＆quot;
- `'`(单引号):'＆apos; 
- ……

在 HTML 转义时，仅仅只需要对六个字符进行编码: &, <, >, ", ', ```。可使用 he 这个库进行编码及转义

## `<!DOCTYPE>`

<!DOCTYPE>声明位于 HTML 文档中的第一行，处于 `html`标签之前。告知浏览器的解析器用什么文档标准解析这个文档。

DOCTYPE 不存在或格式不正确会导致文档以兼容模式呈现。

```html
<!DOCTYPE html>
```

## DTD
文档类型定义（DTD，Document Type Definition）是一种特殊文档，它规定、约束符合标准通用标示语言（SGML）或SGML子集可扩展标示语言（XML）规则的定义和陈述。

HTML5已经不使用SGML规范，所以无须再指定DTD

## HTML5新特性
1. **canvas**，通过自带的API结合使用JavaScript脚本语言在网页上绘制图形和处理
2. **多媒体**，通过增加了`<audio>`、`<video>`两个标签来实现对多媒体中的音频、视频使用的支持
3. **地理定位**，通过引入Geolocation的API可以通过GPS或网络信息实现用户的定位功能
4. **数据存储**，HTML5支持DOM Storage和Web SQL Database 两种存储机制
5. **多线程**，HTML5利用Web Worker将Web应用程序从原来的单线程业界中解放出来，通过创建一个Web Worker对象就可以实现多线程操作

## SEO
搜索引擎优化（Search Engine Optimization, SEO）指利用搜索引擎的规则提高网站在有关搜索引擎内的自然排名
### 前端如何进行SEO
1. 合理的 title、description、keywords：搜索对着三项的权重逐个减小，title 值强调重点，不同页面 title 要有所不同；description 把页面内容高度概括，长度合适，不
   同页面 description 有所不同；keywords 列举出重要关键词即可。
2. 语义化HTML代码，比如用`<strong>`代替`<b>`、`<em>`代替`<i>`表示强调
3. 重要的内容放在前面
4. 重要的内容不要用JS输出
5. 少用iframe
6. 重要的图片加alt描述
7. 提高网站速度

