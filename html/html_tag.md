# HTML的tag
## `<script>`
和`<img>`一样，`<script>`的src也可以加载跨域的资源

如果没有defer和async属性，那么script标签会按照顺序加载，上一个加载完再加载下一个

### 如何延迟加载`<script>`
js 的加载、解析和执行会阻塞页面的渲染过程，因此我们希望 js 脚本能够尽可能的延迟加载，提高页面的渲染速度

1. 将 js 脚本放在文档的底部，来使 js 脚本尽可能的在最后来加载执行。 
2. 给 js 脚本添加 defer 属性，这个属性会让脚本的加载与文档的解析同步解析，然后在文档解析完成后再执行这个脚本文件，这样的话就能使页面的渲染不被阻塞。多个设置了 defer 属性的脚本按规范来说最后是顺序执行的，但是在一些浏览器中可能不是这样。 
3. 给 js 脚本添加 async 属性，这个属性会使脚本异步加载，不会阻塞页面的解析过程，但是当脚本加载完成后立即执行 js 脚本，这个时候如果文档没有解析完成的话同样会阻塞。多个 async 属性的脚本的执行顺序是不可预测的，一般不会按照代码的顺序依次执行。 
4. 动态创建 DOM 标签的方式，我们可以对文档的加载事件进行监听，当文档加载完成后再动态的创建 script 标签来引入 js 脚本。

### `<noScript>`

有以下两种情况之一，则显示`<noScript>`标签中的内容：
- 浏览器不支持js
- js被禁用

## `<link>`
link 标签定义文档与外部资源的关系

只能存在于 head 部分
```html
<link rel="表明当前文档和外部资源的关系" href="文件路径" type="说明外部资源的MIME类型">
```

## 其他element
行内元素：a b span img strong sub sup button input label select textarea：

- 行内元素不会新开一行
- 不能包含块级元素
- 设置 width 无效，height 无效（可以设置 line-height），设置 margin 和 padding 的上下不会对其他元素产生影响。

块元素：div ul ol li dl dt dd h1 h2 h3 h4 h5 h6 p：
- 会新起一行
- 可以包含块元素


