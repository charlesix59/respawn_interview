# 绘图
## canvas
HTML提供了`<canvas>`元素来支持绘图。

要使用`<canvas>`元素，首先要设置其width和height属性，指定可以绘图的区域大小。

```js
// 要使用canvas要先获取其上下文

let darwing = document.getElementById('drawing');
let ctx;
if(darwing.getContext){
    ctx = drawing.getContext();
}
```

### 2D上下文
使用2D上下文可以绘制2D图形，2D图形坐标起始于canvas元素的左上角，远点坐标为(0,0)，x轴向右，y轴向下。

2D上下文有两种操作，填充和描边。操作的结果又取决于两个属性：`fillStyle`和`strokeStyle`。这两个值是字符串、渐变模式或模式对象。
其中可以指定任意在CSS中可用的颜色值，包括颜色名，16进制，rgb，rgba，hsl或hsla。 他们的默认值为'#000000'

**绘制矩形**
矩形是唯一一种可以直接在2D上下文中绘制的图形，其中涉及三个API：
- CanvasRenderingContext2D.clearRect()：设置指定矩形区域内（以点 (x, y) 为起点，范围是 (width, height)）所有像素变成透明，并擦除之前绘制的所有内容。 
- CanvasRenderingContext2D.fillRect()：绘制填充矩形，矩形的起点在 (x, y) 位置，矩形的尺寸是 width 和 height。 
- CanvasRenderingContext2D.strokeRect()：在 canvas 中，使用当前的笔触样式，描绘一个起点在 (x, y)、宽度为 w、高度为 h 的矩形。

**绘制路径**
要绘制路径首先要调用beginPath()方法表示要开始绘制新路径，然后调用下列方法来绘图：
- CanvasRenderingContext2D.closePath()：使笔点返回到当前子路径的起始点。它尝试从当前点到起始点绘制一条直线。如果图形已经是封闭的或者只有一个点，那么此方法不会做任何操作。 
- CanvasRenderingContext2D.moveTo()：将一个新的子路径的起始点移动到 (x，y) 坐标。 
- CanvasRenderingContext2D.lineTo()：使用直线连接子路径的最后的点到 (x，y) 坐标。 
- CanvasRenderingContext2D.bezierCurveTo()：添加一个 3 次贝赛尔曲线路径。该方法需要三个点。第一、第二个点是控制点，第三个点是结束点。起始点是当前路径的最后一个点，绘制贝赛尔曲线前，可以通过调用 moveTo() 进行修改。 
- CanvasRenderingContext2D.quadraticCurveTo()：添加一个 2 次贝赛尔曲线路径。 
- CanvasRenderingContext2D.arc()：绘制一段圆弧路径，圆弧路径的圆心在 (x, y) 位置，半径为 r，根据 anticlockwise（默认为顺时针）指定的方向从 startAngle 开始绘制，到 endAngle 结束。 
- CanvasRenderingContext2D.arcTo()：根据控制点和半径绘制圆弧路径，使用当前的描点（前一个 moveTo 或 lineTo 等函数的止点）。根据当前描点与给定的控制点 1 连接的直线，和控制点 1 与控制点 2 连接的直线，作为使用指定半径的圆的切线，画出两条切线之间的弧线路径。 
- CanvasRenderingContext2D.ellipse()：添加一个椭圆路径，椭圆的圆心在（x,y）位置，半径分别是 radiusX 和 radiusY，按照 anticlockwise（默认顺时针）指定的方向，从 startAngle 开始绘制，到 endAngle 结束。 
- CanvasRenderingContext2D.rect()：创建一个矩形路径，矩形的起点位置是 (x, y)，尺寸为 width 和 height。

**绘制文本**
2D绘图上下文要也提供了绘制文本的方法：
- CanvasRenderingContext2D.fillText()：在 (x,y) 位置绘制（填充）文本。 
- CanvasRenderingContext2D.strokeText()：在 (x,y) 位置绘制（描边）文本。

他们都接受4个参数：
- text：使用当前的 font, textAlign, textBaseline 和 direction 值对文本进行渲染。 
- x：文本起点的 x 轴坐标。 
- y：文本起点的 y 轴坐标。 
- maxWidth（可选）：绘制的最大宽度。如果指定了值，并且经过计算字符串的值比最大宽度还要宽，字体为了适应会水平缩放（如果通过水平缩放当前字体，可以进行有效的或者合理可读的处理）或者使用小号的字体。

更多：参考文档：https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D#%E7%BB%98%E5%88%B6%E6%96%87%E6%9C%AC

## WebGL
### 类型化数组
标准js数值无法满足WebGL涉及计算时需要提前直到数值的精度，因此WebGL引入了一个概念，叫类型化数组。
类型化数组是一种元素都是特定类型的数组。其核心为一个名为ArrayBuffer的类型，每个ArrayBuffer对象表示的都是内存中指定的字节数，但不会指定字节的类型。

OpenGL参考文档：https://www.opengl.org/
WebGL参考文档：https://webglfundamentals.org/webgl/lessons/