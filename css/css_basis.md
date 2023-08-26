# CSS基础

层叠样式表(Cascading Style Sheets, CSS)是一种用来表现HTML等文件样式的计算机语言

## CSS 的单位

> 摘自千古前端

CSS中的单位是必须要写的，因为它没有默认单位。

### 绝对单位

1 `in`=2.54`cm`=25.4`mm`=72`pt`=6`pc`。

各种单位的含义：

- in：英寸Inches (1 英寸 = 2.54 厘米)
- cm：厘米Centimeters
- mm：毫米Millimeters
- pt：点Points，或者叫英镑 (1点 = 1/72英寸)
- pc：皮卡Picas (1 皮卡 = 12 点)

### 相对单位

- px：像素
- em：印刷单位相当于12个点
- %：百分比，相对周围的文字的大小

### 百分比的基准
公式：当前元素某CSS属性值 = 基准 * 对应的百分比
- 元素的 position 为 relative 和 absolute 时，top和bottom、left和right基准分别为包含块的 height、width 
- 元素的 position 为 fixed 时，top和bottom、left和right基准分别为初始包含块（也就是视口）的 height、width，移动设备较为复杂，基准为 Layout viewport 的 height、width 
- 元素的 height 和 width 设置为百分比时，基准分别为包含块的 height 和 width 
- 元素的 margin 和 padding 设置为百分比时，基准为包含块的 width（易错） 
- 元素的 border-width，不支持百分比 
- 元素的 text-indent，基准为包含块的 width 
- 元素的 border-radius，基准为分别为自身的height、width 
- 元素的 background-size，基准为分别为自身的height、width 
- 元素的 translateX、translateY，基准为分别为自身的height、width 
- 元素的 line-height，基准为自身的 font-size

元素的 font-size，基准为父元素字体

## 与布局有关的属性

position、display与float相互制约

### display

| 值                  | 描述                                       |
|--------------------|------------------------------------------|
| none               | 此元素不会被显示。                                |
| block              | 此元素将显示为块级元素，此元素前后会带有换行符。                 |
| inline             | 默认。此元素会被显示为内联元素，元素前后没有换行符。               |
| inline-block       | 行内块元素。（CSS2.1 新增的值）                      |
| flex               | 浮动元素                                     |
| grid               | 网格布局                                     |
| ruby               | 拼音布局（支持不好）                               |
| list-item          | 此元素会作为列表显示。                              |
| run-in             | 此元素会根据上下文作为块级元素或内联元素显示。                  |
| table              | 此元素会作为块级表格来显示（类似 `<table>`），表格前后带有换行符。   |
| inline-table       | 此元素会作为内联表格来显示（类似 `<table>`），表格前后没有换行符。   |
| table-row-group    | 此元素会作为一个或多个行的分组来显示（类似 `<tbody>`）。        |
| table-header-group | 此元素会作为一个或多个行的分组来显示（类似 `<thead>`）。        |
| table-footer-group | 此元素会作为一个或多个行的分组来显示（类似 `<tfoot>`）。        |
| flow-root          | 生成一个块级元素盒，其会建立一个新的块级格式化上下文，定义格式化上下文的根元素。 |
| table-row          | 此元素会作为一个表格行显示（类似 `<tr>`）。                |
| table-column-group | 此元素会作为一个或多个列的分组来显示（类似 `<colgroup>`）。     |
| table-column       | 此元素会作为一个单元格列显示（类似 `<col>`）               |
| table-cell         | 此元素会作为一个表格单元格显示（类似 `<td>` 和 `<th>`）      |
| table-caption      | 此元素会作为一个表格标题显示（类似 `<caption>`）           |
| inherit            | 规定应该从父元素继承 display 属性的值。                 |

### position

| 值                                                                                              | 描述                                                                                            |
|------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| [absolute](https://www.runoob.com/css/css-positioning.html#position-absolute)                  | 生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。       |
| [fixed](https://www.runoob.com/css/css-positioning.html#position-fixed)                        | 生成固定定位的元素，相对于浏览器窗口进行定位。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。                     |
| [relative](https://www.runoob.com/css/css-positioning.html#position-relative)                  | 生成相对定位的元素，相对于其正常位置进行定位。因此，"left:20" 会向元素的 LEFT 位置添加 20 像素。                                    |
| [static](https://www.runoob.com/css/css-positioning.html#position-static)                      | 默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）。                               |
| [sticky](https://www.runoob.com/css/css-positioning.html#position-sticky)                      | 粘性定位，该定位基于用户滚动的位置。它的行为就像 position:relative; 而当页面滚动超出目标区域时，它的表现就像 position:fixed;，它会固定在目标位置。** |
| 注意:** Internet Explorer, Edge 15 及更早 IE 版本不支持 sticky 定位。 Safari 需要使用 -webkit- prefix (查看以下实例)。 |                                                                                               |
| inherit                                                                                        | 规定应该从父元素继承 position 属性的值。                                                                     |

### float

| 属性                                                         | 描述                | 值                                        | CSS |
|------------------------------------------------------------|-------------------|------------------------------------------|-----|
| [clear](https://www.runoob.com/cssref/pr-class-clear.html) | 指定不允许元素周围有浮动元素。   | left<br>right<br>both<br>none<br>inherit | 1   |
| [float](https://www.runoob.com/cssref/pr-class-float.html) | 指定一个盒子（元素）是否可以浮动。 | left<br>right<br>none<br>inherit         | 1   |

### visibility

| 值        | 描述                                                                          |
|----------|-----------------------------------------------------------------------------|
| visible  | 元素框可见                                                                       |
| hidden   | 元素框不可见（不绘制），但仍然影响常规的布局                                                      |
| collapse | 用于 `<table>` 行、列、列组和行组，将隐藏表格的行或列，并且不占用任何空间 。对于其他元素，collapse 被视为与 hidden 相同。 |

## CSS能继承的属性

css的某些元素可以继承父元素的值，

有继承性的属性：

1. 字体系列属性
font、font-family、font-weight、font-size、font-style、font-variant、font-stretch、font-size-adjust 
2. 文本系列属性
text-indent、text-align、text-shadow、line-height、word-spacing、letter-spacing、text-transform、direction、color 
3. 表格布局属性
caption-side border-collapse empty-cells 
4. 列表属性
list-style-type、list-style-image、list-style-position、list-style 
5. 光标属性
cursor 
6. 元素可见性
visibility 
7. 还有一些不常用的
speak，page，设置嵌套引用的引号类型quotes等属性 


📕：当一个属性不是继承属性时，可以使用inherit关键字指定一个属性应从父元素继承它的值，inherit关键字用于显式地指定继承性，
可用于任何继承性/非继承性属性。

