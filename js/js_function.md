# JS函数

## 函数的不同形态
> 摘抄节选自前端内参

```js
//函数的声明形态
function func(){
    console.log("函数的声明形态")
}

//函数的表达式形态 之一
let func0 =function(){
    console.log("函数的表达式形态");
}

//函数的表达式形态 之二
(function func1() {})

//函数的嵌套形态
let func2 = function(){
    console.log("函数的嵌套形态");
    let func3 = function(){
        console.log("func2嵌套在func1里")
    }
    func3();
}

// 函数的闭包形态
let func4 = function(){
    var a = "func4"; 
    return function(){
        console.log("我是以闭包形态存在的函数:"+a);
    }
}
//所有的函数都通过一对括号“()”调用
func();
func0();
func1();
func2();
func4()();
```

## 函数的作用域

**在ES6之前，JavaScript没有块级作用域，只有函数作用域的说法**

**函数的声明提升：声明形态的函数可以进行声明提升**

## 几种特殊的函数用法

### **IIFE**（Immediately-Invoked Function Expression，**立即执行函数**）

```javascript
(function(){
    console.log("我是立即运行的匿名函数");
})();

(function(){
    console.log("我也是立即运行的匿名函数");
}());
```

### 匿名函数

匿名函数是没有名字的函数

**匿名函数的调用方式**：

```javascript
//每个函数都有个 arguments 属性
//代表函数参数的集合，该集合又有一个方法叫 callee 代表函数本身
//这样就可以通过 arguments.callee() 调用了自身了。
(function (i){
    console.log("函数名为"+func.name+",第"+i+"次调用")
    if(i<3){//递归出口
        arguments.callee(++i);
    }
})(1);
//在严格模式下，第5版 ECMAScript (ES5) 已经禁止使用 arguments.callee()。
//当一个函数必须调用自身的时候，不推荐使用 arguments.callee()
//尽量通过函数命名然后通过该名字调用自身。
```

优点：
- 简洁

缺点：
- 不好调用

### 箭头函数

用`(参数) => { 表达式 }`这种写法声明一个函数，就叫箭头函数（也叫lamda表达式）（ES6）

```javascript
//二者等效
(function(i){
    console.log(i);
})(1);

((i)=>{
    console.log(i);
})(1);
```

箭头函数不暴露`aguments`对象，所以，如访问arguments，将会当做一个普通变量进行访问。

箭头函数的`this`总是指向定义它时所在的上下文环境

箭头函数也没有自己的 `super`或`new.target`

### 高阶函数

如果某个函数可以接收另一个函数作为参数，该函数就称之为高阶函数。

```javascript
//高阶函数最常见的形式就是回调函数
function fn1(callback){
    if(callback){
        callback();
    }
}

fn1(function(){
    console.log("高阶函数");//>> 高阶函数
});
```

## 函数重载

<mark>to_do</mark>  