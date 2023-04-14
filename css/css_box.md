# CSS盒子模型
盒模型都是由四个部分组成的，分别是margin、border、padding和content
## W3C盒模型与IE盒模型
W3C标准盒模型：属性width，height只包含内容content，不包含border和padding

IE盒模型：属性width，height包含content、border和padding，指的是content +padding+border。

## margin
### margin 叠加
```js
// todo
```
## IFC
IFC（inline Formatting Context）叫做“行级格式化上下”
布局规则如下：
1. 内部的盒子会在水平方向，一个个地放置
2. IFC的高度，由里面最高盒子的高度决定
3. 当一行不够放置的时候会自动切换到下一行

## BFC
BFC（Block Formatting Context）叫做“块级格式化上下文"
布局规则如下：
1. 内部的盒子会在垂直方向，一个个地放置；
2. 盒子垂直方向的距离由margin决定， 属于同一个BFC的两个相邻Box的上下margin会发生重叠；
3. 每个元素的左边，与包含的盒子的左边相接触，即使存在浮动也是如此；
4. BFC的区域不会与float重叠；
5. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之也如此；
6. 计算BFC的高度时，浮动元素也参与计算。

产生BFC的原因
1. 根元素；
2. float的属性不为none；
3. position为absolute或fixed；
4. display为inline-block，table-cell，table-caption，flex；
5. overflow不为visible