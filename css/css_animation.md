# CSS动画

_**CSS3**_ 之后，css拥有了更多的对动画的支持

## transition（过渡）

transition 可以实现元素不同状态间的平滑过渡（补间动画），经常用来制作动画效果。
（如果你对Flash或者PS、PR的动画比较了解的话应该能够很快理解这个功能，
transition的功能就是实现两个关键帧之间的补帧）

```css
.item {
    width: 100px;
    height: 100px;
}

.item:hover {
    width: 200px;
    height: 100px;

    /*需要补间动画的属性，如果都需要变换则设置为 all*/
    transition-property: width;
    /*动画持续时间*/
    transition-duration: 1s;
    /*动画的速度函数，拥有如下属性：*/
    /*
        ease: 减速
        ease-in：渐入
        ease-out：渐出
        ease-in-out：渐入渐出
        linear: 线性
        cubic-bezier(x1,y1,x2,y2)：贝塞尔曲线
        step()：分步进行
    */
    transition-timing-function: ;
    /*动画从触发到开始的延迟时间*/
    transition-delay: 1s;
}
```

也可以写成合成属性：
`transition: property duration timing-function delay;`

## transform（变化）

transform 可以实现2D 或 3D 转换

**transform 执行动画的时候并不会改变与元素在文档流中的实际位置与形态，即不会对父与兄弟元素产生影响**

可以与transition的duration、delay等属性配合使用

### 2D

```css
.item {
    /*缩放：scale(x,y)
    x: 横轴缩放倍数
    y： 纵轴缩放倍数*/
    transform: scale(125%, 125%);
    /*位移 translate(x,y)
    x：水平位移（相对自身百分比）
    y：垂直位移
    */
    transform: translate(50%, 50%);
    /*旋转：rotate(degree)
    degree：旋转的角度
    */
    transform: rotate(45deg);
}
```

### 3D

3D 坐标系是左手坐标系

```css
.item {
    /*绕 X 轴旋转360度*/
    transform: rotateX(360deg);
    /*绕 Y 轴旋转360度*/
    transform: rotateY(360deg);
    /*绕 Z 轴旋转360度*/
    transform: rotateZ(360deg);

    /*沿着 X 轴移动*/
    transform: translateX(100px);
    /*沿着 Y 轴移动*/
    transform: translateY(360px);
    /*沿着 Z 轴移动*/
    transform: translateZ(360px);

    /* X轴缩放 */
    transform: scaleX(1.25%);
    /*Y轴缩放*/
    transform: scaleY(1.25%);
    /*Z轴缩放*/
    transform: scaleZ(1.25%);

    /*透视，不太懂视觉，有无懂哥？*/
    transform: perspective(500px);

    /* 变化的展示样式，有两种 {flat|perspective} （扁平的|透视的）
    当设置为perspective时可以实现一个真正的3D图形*/
    transform-style: flat;
}
```

## animation（动画）

animation允许我们像定义函数一样定义动画，在需要这个动画的时候调用。

我们可以通过animation函数创建多个节点来实现多段动画效果

使用步骤：

1. 通过@keyframes定义动画
2. 将这段动画通过百分比，分割成多个节点；然后各节点中分别定义各属性
3. 在指定元素里，通过 animation 属性调用动画

### 定义动画

```css
@keyframes move1 {
    from {
        transform: translateX(0px) rotate(0deg);
    }
    to {
        transform: translateX(500px) rotate(555deg);
    }
}

/* 方式二：定义多组动画*/
@keyframes move2 {
    0% {
        transform: translateX(0px) translateY(0px);
        background-color: red;
        border-radius: 0;
    }

    25% {
        transform: translateX(500px) translateY(0px);

    }

    /*动画执行到 50% 的时候，背景色变成绿色，形状变成圆形*/
    50% {
        /* 虽然两个方向都有translate，但其实只是Y轴上移动了200px。
        因为X轴的500px是相对最开始的原点来说的。可以理解成此时的 translateX 是保存了之前的位移 */
        transform: translateX(500px) translateY(200px);
        background-color: green;
        border-radius: 50%;
    }

    75% {
        transform: translateX(0px) translateY(200px);
    }

    /*动画执行到 100% 的时候，背景色还原为红色，形状还原为正方形*/
    100% {
        /*坐标归零，表示回到原点。*/
        transform: translateX(0px) translateY(0px);
        background-color: red;
        border-radius: 0;
    }
}
```

### 调用动画
调用animation时的属性如下：
` animation: 定义的动画名称 持续时间  执行次数  是否反向  运动曲线 延迟执行。(infinite 表示无限次)`

```css
.box {
    width: 100px;
    height: 100px;
    margin: 100px;
    background-color: red;
    
    animation: move2 4s;
}

```

## 不能进行动画的属性

css 不能在 display:none 和 display:block 之间进行动画，
也不能在 height:0 和 height:auto 之间进行动画

## CSS动画与JS动画的比较

CSS3 的动画：
1. 在性能上会稍微好一些，浏览器会对 CSS3 的动画做一些优化（比如专门新建一个图层用来跑动画）
2. 代码相对简单
3. 在动画控制上不够灵活
4. 兼容性不好
5. 部分动画功能无法实现（如滚动动画，视差滚动等） 

JavaScript 的动画： 
正好弥补了 css 缺点，控制能力很强，可以单帧的控制、变换，同时写得好完全可以兼容 IE6，并且功能强大。 

总结： 对于一些复杂控制的动画，使用 javascript 会比较好。
而在实现一些小的交互动效的时候，可以多考虑 CSS