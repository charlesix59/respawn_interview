# HTML
HTML(Hyper Text Markup Language),中文：超文本标记语言。
使用HTML，将所需要表达的信息按某种规则写成HTML文件，通过专用的浏览器来识别，并将这些HTML文件“翻译”成可以识别的信息，即我们所见到的网页
## HTML是怎么被渲染的？
1. 接收到HTML文档之后，根据标准将HTML解析为DOM树
2. 在构建DOM树时会从网络或缓存请求JS、CSS、图片等静态资源
3. 当遇到 `<script>` 标签时，渲染进程会停止解析 HTML，而去加载，解析和执行 JS 代码（除非加了`async`或`defer`）
4. 基于CSS选择器解析CSS获取CSSOM，即获取每个DOM节点的计算样式值，没有对应的样式则会使用浏览器的默认样式
5. 根据CSSOM与DOM构建布局树，布局树包含可见元素的坐标信息与盒大小
6. 确定渲染顺序
7. 渲染
## SGML、XML、HTML与XHTML
SGML（Standard Generalized Markup language）是标准通用置标语言，是一种定义电子文档结构和描述其内容的国际标准语言，是所有电子文档标记语言的起源。下面都是SGML的应用

HTML（HyperText Markup Language）是超文本标记语言，主要是用于规定怎么显示网页。

XML（Extensible Markup Language）是可扩展标记语言。XML 和 HTML 的最大区别就在于 XML 的标签是可以自己创建的，数量无限多，
而 HTML 的标签都是固定的而且数量有限。

XHTML（Extensible Hypertext Markup Language）可拓展的超文本标记语言。除了可拓展外和 HTML 没什么本质的区别，标签都一样，用法也都一样，就是比 HTML
更严格，比如标签必须都用小写，标签都必须有闭合标签等。

## <!DOCTYPE>

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
