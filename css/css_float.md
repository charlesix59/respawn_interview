# CSS浮动布局
将一个元素设置为float:left或float:right则浮动就形成了
## 浮动的特点
- 脱离标准流
- 浮动元素相互贴靠
- 浮动的元素不会遮挡文字
- （若不设高度）自动收缩为内容的宽度

## 浮动的清除
### 为什么要清除浮动？
浮动框不属于文档流中的普通流，当元素浮动之后， 不会影响块级元素的布局，只会影响内联元素布局。
此时文档流中的普通流就会表现得该浮动框不存在一样的布局模式。当包含框的高度小于浮动框的时候，此时就会出现“**高度塌陷**”。

清除浮动是为了清除使用浮动元素产生的影响。
### 使用clear清除
我们对元素设置clear属性是为了避免浮动元素对该元素的影响，而不是清除掉浮动。

clear属性指的是元素盒子的边不能和<mark>前面的</mark>浮动元素相邻。

也就是说对后面的元素无用。因此对于css来说，clear:left与clear:right只有一个有用，
也就是说我们可以用clear:both来代替其中任何一种情况

**clear属性只有块级元素才有效的**

使用clear一般有这么几种方法：
- 直接使用clear:both
  - 问题：会导致两个div之间的margin失效

```html
<div>
    <p></p>
    <p></p>
    <p></p>
</div>

<div style="clear: both">
    <p></p>
    <p></p>
    <p></p>
</div>
```

- 外墙法
  - 即将两个元素用一堵透明的“墙”隔开
  - 缺点：第一个元素还是没有高度

```html
<div>
    <p></p>
    <p></p>
    <p></p>
</div>

<div style="clear: both"></div>

<div>
    <p></p>
    <p></p>
    <p></p>
</div>
```

- 内墙法

```html
<div>
	<p></p>
	<p></p>
	<p></p>
	<div style="clear: both"></div>
</div>

<div>
	<p></p>
	<p></p>
	<p></p>
</div>
```

- 伪元素

```css
/*clear属性只有块级元素才有效的，而::after等伪元素默认都是内联水平，所以借助伪元素清除浮动影响时需要设置display属性值*/
.cl::after{
  content:'';
  display:table;
  /*也可以是block，或者是list-item*/
  clear:both;
}
```

### 使用BFC清除
因为BFC元素不会影响外部元素的特点，所以BFC元素也可以用来清除浮动的影响。 详情见BCF章节