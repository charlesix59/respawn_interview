# CSS伪类
在之前的章节里我们已经简单提到过CSS伪类选择器了，但是我们并没有说清楚伪类是什么，以及如何使用

**伪类（pseudo-classes）** 这个名字可能不是特别容易理解，但是我们知道**类**在css中定义了css样式相同
的一组元素，或许这么讲并不准确，因为类虽然是提供给css使用的，但是类却并非主动选择css，应该这么说：**类
是一种标识符，css可以获取这种标识符并将拥有这些标识符的元素设置特定的样式**。

这样定义类之后，我们也可以这样定位伪类：**伪类是一种特定的状态，（that）能够让css获取拥有这种状态的元素并
设置特定的样式**。（我使用了一个that来帮助大家理解，这里的意思是如果要把这句话翻译成英语的话这应该是个that从句）

所以我们可以看到伪类与类的共同点：即它们都标记一组元素。但它又不是真正的类，这些元素并没有被设置相同的class
属性，**因此，我们把这种属性叫做伪类**。

虽然css选择器有很多，但是我们不难发现，还是类与伪类的功能与作用最为相像，因此称之为伪类可以说非常的合适。

## 伪类的种类
在[css选择器](css_selector.md)那一章已经很详细的说过了，这里不多赘述了。

## LVHA特性

a标签有四种状态：链接访问前、链接访问后、鼠标滑过、激活，
分别对应四种伪类`:link`、`:visited`、`:hover`、`:active`

当链接未访问过时：
1. 当鼠标滑过a链接时，满足:link和:hover两种状态，要改变a标签的颜色，就必须将:hover伪类在:link伪类后面声明； 
2. 当鼠标点击激活a链接时，同时满足:link、:hover、:active三种状态，要显示a标签激活时的样式（:active），必须将:active声明放到:link和:hover之后。因此得出LVHA这个顺序。

当链接访问过时，情况基本同上，只不过需要将:link换成:visited。

:link和:visited可以交换位置，但是`:hover`和`:active`必须按照顺序放在他们后面

# 伪元素
上文我们已经说过伪类了，那么伪元素应该比较容易理解。

**元素**是指html中的节点。而**伪元素**呢，指的是**依附于元素的一种实体。**

我这是用**实体**来概括伪元素的性质，为啥我叫它实体呢？因为伪元素**看得见、摸得着**。
这样和伪类对比，伪元素似乎比伪类更加“实在”，我的意思是可能我们会觉得伪元素更接近真实的元素。
但是伪元素缺少了一种十分重要的东西，使它不能成为元素——<mark>名字</mark>

> 名字是强大的羁绊 —— 《夏目友人账》

因为没有名字，所以伪元素只能是寄生在真实元素上的一种实体，它在文档流中占据一席之地，能被渲染，也能被选取，
但却永远无法做它自己（呃呃……好像整到哲学了）

<hr>

以上的理论呢，似乎只能用来解释`::before`和`::after`，而无法解释`first-letter`和`first-line`，
这两个伪元素的行为好像更像伪类哎？

非也非也！我们观察伪类，会发现它选取都是一些元素，而这两个伪元素选择的则是某些元素的一部分！

我们可以假设它的原理是**它们在原本的类内创建了一个新的类并代替了原来的类被选中的部分**（当然原理应该不是这样，你就当我在放屁）

也就是说，相比`after`、`before`这种寄生在元素外的实体，**`first-letter`和`first-line`则是寄生在元素
内的实体**，这么理解的话，他们当然是伪类而非伪元素