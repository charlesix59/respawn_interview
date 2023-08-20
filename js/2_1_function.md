# JS函数

ES中的函数在定义时不必指定是否有返回值

return时也不必带有任何返回值，这样的情况下返回undefined

严格模式对函数有一些限制：

- 不能把函数命名为eval或者arguments
- 不能出现两个命名参数同名的情况

## 函数的参数

ES的函数不介意传递进来多少参数，也不在乎传进来的参数是什么数据类型。

对ES来说，命名的参数只是为了提供便利，但不是必须的。在函数体内可以通过arguments对象来访问参数**类数组**，从而取得传递给函数的每一个参数。我们可以使用length属性来得知arguments中保存着多少参数。

arguments可以与命名参数一起使用，对应的命名参数的值永远与它的值保持同步。简单来说就是：**如果我们修改arguments中某个参数的值，对应的命名参数的值也会变化**。

但是，**这两个值的内存空间是独立的**，并且上述的影响是单向的，也就是说：**修改命名参数的值并不会改变arguments中对应的值**。

没有传递值的命名参数将会被自动赋为undefined。

严格模式对arguments对象做出了一些限制：**无法重写arguments的值**。

ES中所有的参数传递的都是值，不可能通过引用传递参数

```js
//todo: 有空的话详细讲一下
```

ES的函数没有重载，如果定义了两个名字相同的函数则改名字属于后定义的函数

## 函数的不同形态

> 摘抄节选自前端内参

```js
//函数的声明形态
function func() {
    console.log("函数的声明形态")
}

//函数的表达式形态 之一
let func0 = function () {
    console.log("函数的表达式形态");
}

 //函数的表达式形态 之二
 (function func1() {
 })

//函数的嵌套形态
let func2 = function () {
    console.log("函数的嵌套形态");
    let func3 = function () {
        console.log("func2嵌套在func1里")
    }
    func3();
}

// 函数的闭包形态
let func4 = function () {
    var a = "func4";
    return function () {
        console.log("我是以闭包形态存在的函数:" + a);
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

函数表达式后面可以跟圆括号调用，而函数表达式不可以。**但是我们可以在函数表达式外面裹上一曾括号将其变为函数表达式**

```javascript
(function () {
    console.log("我是立即运行的匿名函数");
})();

(function () {
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
(function (i) {
    console.log("函数名为" + func.name + ",第" + i + "次调用")
    if (i < 3) {//递归出口
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
(function (i) {
    console.log(i);
})(1);

((i) => {
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
function fn1(callback) {
    if (callback) {
        callback();
    }
}

fn1(function () {
    console.log("高阶函数");//>> 高阶函数
});
```

### 惰性载入函数

一般在写兼容性较好的代码时，我们会使用多个if分支语句来判断当前浏览器支持哪种方法，这时如果每次调用函数都把if分支走一遍显然是损耗性能的。下面来看一个简单的例子：

```js
function addEventHandler(element, eventType, func) {
    if (element.addEventListener) {
        element.addEventListener(eventType, func, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + eventType, func);
    } else {
        element['on' + eventType] = func;
    }
}
```

上面的函数，是一个简单的兼容各大浏览器的一个事件注册函数，如果采用上面的这种方式来定义函数，那么函数会在每次执行时都把if分支走一遍，显然不是明智的选择。下面来看一下如何用惰性载入函数来处理中情况吧！

一. 第一种实现方法：函数覆盖

```js
function addEventHandler(element, eventType, func) {
    if (typeof addEventListener == 'function') {
        addEventHandler = function (element, eventType, func) {
            element.addEventListener(eventType, func, false);
        }
    }
   else if (typeof attachEvent == 'function') {
       addEventHandler = function (element, eventType, func) {
           element.attachEvent('on' + eventType, func);
       }
   } else {
       addEventHandler = function (element, eventType, func) {
           element['on' + eventType] = func;
       }
   }
   return addEventHandler(element, eventType, func);
}
```

将代码改为如上的方式，就可以在整个页面运行期间如果多次调用该函数，只走一遍if分支，因为在第一次运行函数时，if分支中的函数就覆盖了外部的函数。比如在Chrome浏览器中，第一次执行代码后，打印addEventHandler函数将变为如下这样：

```js
function fn(element, eventType, func) {
    element.addEventListener(eventType, func, false);
}
```

可以看出分支中的同名函数覆盖了外部的函数。

二. 第二种实现方法：自执行函数

```js
var addEventHandler = (function (element, eventType, func) {
    if (typeof addEventListener == 'function') {
        return function () {
            element.addEventListener(eventType, func, false);
        }
    } else if (typeof attachEvent == 'function') {
        return function () {
            element.attachEvent('on' + eventType, func);
        }
    } else {
        return function () {
            element['on' + eventType] = func;
        }
    }
})();
```

用自执行函数的方法，函数定义在全局环境的话，当页面一经载入将针对该浏览器的实现方法赋给了addEventHandler函数，只是在第一次载入时耗费资源，将页面载入后，打印addEventHandler函数如下：

```js
function () {
    element.addEventListener(eventType, func, false);

}
```

以上是惰性载入函数的实现方式，两种方式都可以避免执行不必要的代码。具体使用根据自己的需求而定。

> 版权声明：本文为CSDN博主「塞上江南果」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
> 原文链接：https://blog.csdn.net/Picking_up_stones/article/details/75316241

## 函数重载

> 摘自前端内参

重载是面向对象编程语言（比如Java、C#）里的特性，JavaScript语言并不支持该特性。
所谓重载(overload)，就是函数名称一样，但是随着传入的参数个数不一样，调用的逻辑或返回的结果会不一样。
jQuery之父John Resig曾经提供了一个非常巧妙的思路实现重载，代码如下：

```js
(() => {
    //IIFE+箭头函数，把要写的代码包起来，避免影响外界，这是个好习惯

    // 当函数成为对象的一个属性的时候，可以称之为该对象的方法。

    /**
     * @param {object}  一个对象，以便接下来给这个对象添加重载的函数(方法)
     * @param {name}    object被重载的函数(方法)名
     * @param {fn}      被添加进object参与重载的函数逻辑
     */
    function overload(object, name, fn) {
        var oldMethod = object[name];//存放旧函数，本办法灵魂所在，将多个fn串联起来
        object[name] = function () {
            // fn.length为fn定义时的参数个数,arguments.length为重载方法被调用时的参数个数
            if (fn.length === arguments.length) {//若参数个数匹配上
                return fn.apply(this, arguments);//就调用指定的函数fn
            } else if (typeof oldMethod === "function") {//若参数个数不匹配
                return oldMethod.apply(this, arguments);//就调旧函数
                //注意：当多次调用overload()时，旧函数中
                //又有旧函数,层层嵌套,递归地执行if..else
                //判断,直到找到参数个数匹配的fn
            }
        };
    }

    // 不传参数时
    function fn0() {
        return "no param";
    }

    // 传1个参数
    function fn1(param1) {
        return "1 param:" + param1;
    }

    // 传两个参数时，返回param1和param2都匹配的name
    function fn2(param1, param2) {
        return "2 param:" + [param1, param2];
    }

    let obj = {};//定义一个对象，以便接下来给它的方法进行重载

    overload(obj, "fn", fn0);//给obj添加第1个重载的函数
    overload(obj, "fn", fn1);//给obj添加第2个重载的函数
    overload(obj, "fn", fn2);//给obj添加第3个重载的函数

    console.log(obj.fn());//>> no param
    console.log(obj.fn(1));//>> 1 param:1
    console.log(obj.fn(1, 2));//>> 2 param:1,2
})();
```

## 函数闭包

函数与其词法环境绑定在一起的组合叫做闭包

> 内层的作用域访问它外层函数作用域里的参数/变量/函数时，闭包就产生了 —— 前端内参

举一个🌰：

```js
function func() {
    //func1引用了它外层的变量a，因此func成为了闭包
    let a = "coffe";

    function func1() {
        console.log(a);//访问了外层函数func体内的变量a
    }

    func1();
}

func();
```

### 闭包的作用

1. 创建私有属性

   使用闭包能够形成类似面向对象的编程语言中的私有属性的变量，函数外无法修改和访问变量，形成对变量的封装

   ⚠：闭包只取得包含函数中任意变量的最后一个值。

3. 延长变量声明周期

   形成闭包的外层函数中的作用域中的变量不会被回收，因为内层函数一直保存着外层函数的引用

   ```js
   var func = (function() {
       var a = "varA"; //在内存里持久化
       return function(src) {
           consolo.log(a);
       }
   }());
   ```

4. 拓展全局对象的方法

   > 摘自前端内参

   利用闭包封装对象

   ```js
   function setupSomeGlobals() {
       //私有变量
       var num = 666;
   
       gAlertNumber = function() {//没有用var和let关键字声明，会成为全局对象的方法
           console.log(num);
       };
   
       gIncreaseNumber = function() {
           num++;
       };
   
       gSetNumber = function(x) {
           num = x;
       };
   }
   
   setupSomeGlobals();
   gAlertNumber(); //>> 666
   
   gIncreaseNumber();
   gAlertNumber(); //>> 667
   
   gSetNumber(1891);
   gAlertNumber(); //>> 1891
   ```

### 闭包的问题

因为闭包的原理是内层函数持续引用外层函数的变量，这将会导致导致外层函数在执行完毕退出函数栈的时候，由于变量仍然被引用而不能被垃圾回收机制收集造成内存泄漏。

因此大量的使用闭包将会造成内存的巨大浪费

## 函数科里化

> 引自前端内参

> 柯里化（Currying）是一种技术，它把接受m个参数的函数变成接受n个参数的函数（0<n<m），并且该函数返回一个新函数，这个新函数接受余下的参数……如此循环，直到最后返回结果。

举个🌰

```js
// 普通的add函数
function add(x, y) {
    return x + y
}

// Currying后
function curryingAdd(x) {
    return function (y) {
        return x + y
    }
}

add(1, 2)           // 3
curryingAdd(1)(2)   // 3
```

### 函数科里化的作用

1. 复用参数

   ```js
   // Currying正则表达式匹配，可以大大减少代码量，提高代码的重用率
   function curryingCheck(reg) {
       return function(txt) {
           return reg.test(txt)
       }
   }
   
   var hasNumber = curryingCheck(/\d+/g)
   var hasLetter = curryingCheck(/[a-z]+/g)
   
   hasNumber('test1')      // true
   hasNumber('testtest')   // false
   hasLetter('21212')      // false
   ```

2. 延迟运行
   只是简单的延迟执行没有必要使用科里化，用函数的闭包就可以实现。如果是涉及到多个参数的延迟执行，那么函数科里化就有其用武之地了。

3. 参与科学计算
   在理论计算机科学中，柯里化提供了一个办法，可以在简单的理论模型中，比如只接受一个单一参数的lambda演算中研究带有多个参数的函数。（不明觉厉😭）

### 科里化的实现

> 摘自前端内参

```js
/**
 * 初步的科里化函数
 * @param fn 函数
 * @param args 参数
 * @return {function(...[*]): *} 返回科里化之后的函数
 */
function primaryCurrying(fn, ...args) {
    return function (...args2) {
        // 将新传入的args2与args进行合并
        let newArg = args.concat(args2);
        // 通过apply函数绑定this并返回执行结果
        return fn.apply(this, newArg);
    }
}

/**
 * 进一步的科里化
 * @param fn 函数
 * @param length 参数长度
 * @return {any} 返回科里化后的函数
 */
function currying(fn, length) {
    // 如果长度还没有定义的话，即递归的第一次，则length为fn需要的参数的长度
    length = length || fn.length;

    // 返回一个函数，此函数接受一个参数args2
    return function (...args2) {
        // 如果args2的长度小于length，则继续递归，返回一个科里化的函数
        if (args2.length < length) {
            // 将函数作为参数与新传入的参数合并
            let combineArgs = [fn].concat(args2);
            /*递归调用currying函数，
            * 第一个参数是函数，我们使用上面的初级科里化函数将我们传入的函数初步转化为科里化的函数
            * 第二个参数我们需要吧需要的length更改为减掉新出入的参数的length
            * 返回值：返回一个科里化的函数或返回结果
            * */
            return currying(primaryCurrying.apply(this, combineArgs), length - args2.length);
        }
        // 如果args2长度大于等于length，则说明我们已经可以执行函数，此时通过apply函数绑定this并返回执行结果
        else {
            return fn.apply(this, args2);
        }
    }
}
```