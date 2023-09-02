# Flex
Flex是FlexibleBox的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。

任何一个容器都可以指定为Flex布局。行内元素也可以使用Flex布局。
设为Flex布局以后，子元素的float、clear和vertical-align属性将失效。

## Flex 容器
采用Flex布局的元素，称为Flex容器（flex container），简称"容器"。

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis），项目默认沿主轴排列。

容器的属性如下：
- **flex-direction**：决定主轴的方向（即项目的排列方向）。 
- **flex-wrap**：定义如果一条轴线排不下，如何换行。 
- **flex-flow**：是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。 
- **justify-content**：定义项目在主轴上的对齐方式。 
- **align-items**：定义项目在交叉轴上如何对齐。 
- **align-content**：定义多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用

## flex 项目
容器的所有子元素自动成为容器成员，称为Flex项目（flex item），简称"项目"。

属性：
- **order**：定义项目的排列顺序。数值越小，排列越靠前，默认为0。
- **flex-grow**：定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。 
- **flex-shrink**：属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。 
- **flex-basis**：定义了在分配多余空间之前，项目占据的主轴空间。
浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。 
- **flex**：是flex-grow，flex-shrink和flex-basis的简写，默认值为0 1 auto。 
- **align-self**：允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性
默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

# grid

Grid 布局即网格布局，是一个二维的布局方式，由纵横相交的两组网格线形成的框架性布局结构，能够同时处理行与列。
擅长将一个页面划分为几个主要区域，以及定义这些区域的大小、位置、层次等关系

设置display:grid/inline-grid的元素就是网格布局容器，这样就能出发浏览器渲染引擎的网格布局算法

## grid容器
- **display**：grid 或 display：inline-grid 来创建一个网格容器 
  - display：grid 则该容器是一个块级元素 
  - display: inline-grid 则容器元素为行内元素
- **grid-template-columns**：属性设置列宽
  - 数值（多个）或repeat函数
  - auto-fill：示自动填充，让一行（或者一列）中尽可能的容纳更多的单元格 
  - fr：片段，为了方便表示比例关系，根据fr的比例分配剩余的宽度 
  - minmax：产生一个长度范围，表示长度就在这个范围之中都可以应用到网格项目中。第一个参数就是最小值，第二个参数就是最大值 
  - auto：由浏览器自己决定长度
- **grid-template-rows**：属性设置行高
- **grid-row-gap**：设置行间距
- **grid-column-gap**：设置列间距
- **grid-gap**：上面两者的简写形式
- **grid-template-areas**：用于定义区域，一个区域由一个或者多个单元格组成
- **grid-auto-flow**：元素排布的顺序
- **justify-items**：设置单元格内容的水平位置
  - start：对齐单元格的起始边缘 
  - end：对齐单元格的结束边缘 
  - center：单元格内部居中 
  - stretch：拉伸，占满单元格的整个宽度（默认值）
- **align-items**：设置单元格的垂直位置
  - 值与justify-items相同
- **place-items**：align-items属性和justify-items属性的合并简写形式 
- **justify-content**：属性是整个内容区域在容器里面的水平位置
- **align-content**：属性是整个内容区域的垂直位置（上中下）
- **grid-auto-rows**：用于指定隐式网格的宽
- **grid-auto-columns**：用于指定隐式网格的宽

## grid项目
- **grid-column-start**：左边框所在的垂直网格线 
- **grid-column-end**：右边框所在的垂直网格线 
- **grid-row-start**：上边框所在的水平网格线 
- **grid-row-end**：下边框所在的水平网格线
- **grid-area**：指定项目放在哪一个区域
- **justify-self**：设置单元格内容的水平位置
- **align-self**：设置单元格内容的垂直位置