# 常用的布局
这一章节尽量少说，干货都在代码里，动手敲一敲收获还是挺大的

## 水平垂直居中
实现水平垂直居中大致有四种方式：
1. 父相子绝，四定位0，0，0，0，加margin:auto
2. 定位左、上50%，加margin调整
3. 定位左、上50%，加transform调整
4. 弹性或网格布局

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>实现水平垂直居中</title>
    <style>
        .father{
            background-color: blue;
            width: 500px;
            height: 400px;
        }
        .son{
            background-color: red;
            width: 200px;
            height: 100px;
        }

        /*方式1：定位+margin：auto*/
        .center1-container{
            position: relative;
        }
        .center1-context{
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            margin: auto;
            position: absolute;
        }

        /*方式2：定位+设置位置+margin*/
        .center2-container{
            position: relative;
        }
        .center2-context{
            position: absolute;
            top: 50%;
            left: 50%;
            /*只有确定子元素的宽高才可以用*/
            margin-left: -100px;
            margin-top: -50px;
        }

        /*方式3：定位+设置位置+translate*/
        .center3-container{
            position: relative;
        }
        .center3-context{
            position: absolute;
            top: 50%;
            left: 50%;
            transform:translate(-50%,-50%);
        }

        /*方式4：弹性布局或网格布局*/
        .center4-container{
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .center4-context{
            /*啥都不做*/
        }
    </style>
</head>
<body>
    <div class="father center1-container">
        <div class="son center1-context">
            <p style="color: aliceblue">父元素相对定位，子元素绝对定位，四个方向的定位设置为0，margin为auto</p>
        </div>
    </div>
    <br>
    <div class="father center2-container">
        <div class="son center2-context">
            <p style="color: aliceblue">父元素相对定位，子元素绝对定位，top和left设置为50%（相对父元素的宽高），
                margin的top与left设置为自负的身高、宽的一半</p>
        </div>
    </div>
    <br>
    <div class="father center3-container">
        <div class="son center3-context">
            <p style="color: aliceblue">父元素相对定位，子元素绝对定位，top和left设置为-50%，
                通过translate函数实现向左上移动半个身位</p>
        </div>
    </div>
    <br>
    <div class="father center4-container">
        <div class="son center4-context">
            <p style="color: aliceblue">父元素为弹性布局，设置主轴元素居中，交叉轴元素居中（代码简单，推荐）</p>
        </div>
    </div>
    <br>
</body>
</html>
```

## 两栏布局
实现两栏布局其实方法挺多的，但是这里只说两种吧，大家可以根据三栏布局发散

1. 左侧浮动，右侧设置外边距
2. flex

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>双栏布局</title>
    <style>
        .container1{
            /*如果BFC可能会导致两个元素不对齐*/
            /*overflow: hidden;*/
        }
        .left1{
            float: left;
            width: 200px;

            background-color: blue;
            height: 200px;
        }
        .right1{
            margin-left: 200px;

            background-color: red;
            height: 200px;
        }

        .container2{
            display: flex;
            height: 200px;
        }
        .left2{
            width: 200px;

            background-color: blue;
        }
        .right2{
            flex-grow: 1;

            background-color: red;
        }
    </style>
</head>
<body>
    <div class="container1">
        <div class="left1"></div>
        <div class="right1">
            <p style="color: aliceblue">
                设置左侧元素为浮动，
                并设置右侧元素有左外边距使得两个元素互不倾轧
            </p>
        </div>
    </div>
    <br>
    <div class="container2">
        <div class="left2"></div>
        <div class="right2">
            <p style="color: aliceblue">
                通过设置父元素为flex布局，同时设置左元素为固定大小，
                右元素伸展至整个剩余容器（推荐，代码少）
            </p>
        </div>
    </div>
</body>
</html>
```

## 三栏布局
下面给出了三栏布局大致的几种方案：

1. 两侧绝对布局，中间设置margin
2. flex
3. 两侧浮动，中间设置margin
4. 圣杯布局
5. 双飞翼布局

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>三栏布局</title>
    <style>
        .div0{
            height: 100px;
        }
        .div1{
            width: 100px;
            height: 100px;
            background-color: red;
        }
        .div2{
            color: aliceblue;
            height: 100px;
            background-color: blue;
        }
        .div3{
            width: 100px;
            height: 100px;
            background-color: yellow;
        }

        .left1{
            position: absolute;
        }
        .right1{
            top: 0;
            right: 0;
            position: absolute;
        }
        .mid1{
            margin-left: 100px;
            margin-right: 100px;
        }

        .container1{
            display: flex;
        }
        .mid2{
            flex-grow: 1;
        }

        .left3{
            float: left;
        }
        .right3{
            float: right;
        }
        .mid3{
            margin-left: 100px;
            margin-right: 100px;
        }

        .container4{
            padding-left: 100px;
            padding-right: 100px;
        }
        .left4{
            position: relative;
            float: left;
            left: -100px;
            margin-top: -100px;
        }
        .mid4{
            float: left;
            width: 100%;
        }
        .right4{
            position: relative;
            float: right;
            margin-right: -100px;
            margin-top: -100px;
        }

        .wrapper {
            float: left;
            width: 100%;
            height: 100px;
        }

        .left5 {
            float: left;
            width: 100px;
            height: 100px;
        }

        .right5 {
            float: right;
            margin-left: -100px;

            width: 100px;
            height: 100px;
        }

        .mid5 {
            margin-left: 100px;
            margin-right: 100px;
            height: 100px;
        }
    </style>
</head>
<body>
    <div>
        <div class="div0">
            <div class="div1 left1"></div>
            <div class="div2 mid1">
                通过将两侧设为绝对布局，中间设置margin来实现三栏布局(这种方法对不齐，不推荐！)
            </div>
            <div class="div3 right1"></div>
        </div>
        <br>
        <div class="div0 container1">
            <div class="div1"></div>
            <div class="div2 mid2">
                通过flex将父容器设置为flex，中间元素占用全部剩余空间（推荐！）
            </div>
            <div class="div3"></div>
        </div>
        <br>
        <div class="div0">
            <div class="div1 left3"></div>
            <div class="div3 right3"></div>
            <div class="div2 mid3">
                通过将两侧设为浮动，中间设置margin来实现三栏布局(中间元素必须写在最后)
            </div>
        </div>
        <br>
        <div class="div0 container4">
            <div class="div2 mid4">
                圣杯布局：首先将父元素设置左右内边距<br>
                三个元素均设置float属性，中间元素写在最前面，并将宽度设置为父元素的宽度，将左右元素挤到下面；<br>
                然后左右元素分别设置float：left与float：right，并设置这两个元素的margin为负值，此时左右元素浮在中间元素下方的左右<br>
                然后通过设置margin-top: -100;来让两个元素浮上来
            </div>
            <div class="div1 left4"></div>
            <div class="div3 right4"></div>
        </div>
        <br>
        <div class="div0">
            <div class="div1 left5"></div>
            <div class="div3 right5"></div>
            <div class="div2 mid5">
                <div class="wrapper">
                    双飞翼布局：也是利用float与margin负值实现，与圣杯布局不同的是，
                    双飞翼布局的左右间隔是中间元素的margin隔开的，而非父元素的padding
                </div>
            </div>
        </div>
    </div>
</body>
</html>
```