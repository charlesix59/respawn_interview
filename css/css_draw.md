# CSS 绘制
## 使用css绘制三角形
我们可以使用border来绘制一个三角形
```css
.triangle {
    width: 0;
    height: 0;
    /*将元素的宽高全部设置为0之后，元素的宽高将全部由border撑起来*/
    /*因此border将会发生重叠，
    上下左右互相压住，因此默认会将border全部改成三角形这样能够默认铺满整个宽高。
    但是需要注意的是我们必须四个边框都设置并把其中三个设置为透明，
    如果不设置其他三个边框则不会互相倾轧形成三角形了*/
    border: 200px solid;
    border-color: transparent transparent red transparent;
}
```

## 使用css画一个圆
```css
.circle{
    width: 100px;
    height: 100px;
    /*将border-radius设置为宽高的一半则为圆*/
    border-radius: 50px;
}
```

## 高自适应的正方形
```css
/*1.第一种方式是利用vw来实现 vw并不等于document的width，因为默认存在margin */
.square1 {
    width: 10%;
    height: 10vw;
    background: tomato;
}

/*2.第二种方式是利用元素的margin/padding百分比是相对父元素width的性质来实现*/
.square2 {
    width: 10%;
    height: 0;
    padding-top: 10%;
    background: orange;
}

/*3.第三种方式是利用子元素的margin-top的值来实现的*/
.square3 {
    width: 10%;
    overflow: hidden;
    background: yellow;
}

.square3::after {
    content: '';
    display: block;
    margin-top: 100%;
}
```