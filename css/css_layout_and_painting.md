# 重排与重绘
在浏览器加载过程中元素会经历layout与print两步（见浏览器章节）

在渲染完成之后如果我们继续修改css或者dom可能会引起重绘或者重排现象。

顾名思义，所谓**重排（或叫回流）**就是浏览器需要重新确定元素的大小与位置，而**重绘**就是重新渲染某个元素。

⚠：重排一定会引起重绘

因为重排会引起大量的节点位置发生变化并重绘，所以重排会导致大量的性能消耗。

## 引起重排或重绘的原因

引起重排的操作： 
- 添加或删除可见的DOM元素 
- 元素的位置发生变化 
- 元素的尺寸发生变化（包括外边距、内边框、边框大小、高度和宽度等，以及内容变化引起容器的变化） 
- 页面一开始渲染的时候（这避免不了） 
- 浏览器的窗口尺寸变化（因为回流是根据视口的大小来计算元素的位置和大小的）
- 获取一些计算属性的值（offsetTop、offsetLeft、 offsetWidth、offsetHeight、scrollTop、scrollLeft、scrollWidth、scrollHeight、clientTop、clientLeft、clientWidth、clientHeight）

引起重绘的操作：
- 所有导致样式变化或dom变化的操作

## 优化措施

我们应该尽可能减少重排：
- 改变元素的类名而非逐个添加样式 
- 需要经常变化的元素，将 position 属性的值设为 fixed 或 absolute
- 使用css3硬件加速，可以让transform、opacity、filters这些动画不会引起回流重绘
- 避免设置多项内联样式 
- 避免使用 table 布局，table 中每个元素的大小以及内容的改动，都会导致整个 table 的重新计算
- 避免使用 CSS 的 JavaScript 表达式

### 浏览器优化机制
由于每次重排都会造成额外的计算消耗，因此大多数浏览器都会通过队列化修改并批量执行来优化重排过程。
浏览器会将修改操作放入到队列里，直到过了一段时间或者操作达到了一个阈值，才清空队列

当你获取布局信息的操作的时候，会强制队列刷新，包括前面讲到的offsetTop等方法都会返回最新的数据

因此浏览器不得不清空队列，触发回流重绘来返回正确的值