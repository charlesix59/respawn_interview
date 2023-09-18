# this
this 优雅地、准确地指向当前代码运行时所处的上下文环境（context）

JavaScript中this的特点：
- this的指向，是在函数被调用的时候确定的，也就是执行上下文被创建时确定的
- this 的指向只取决于函数的调用位置（也即由谁、在什么地方调用这个函数）
- 在执行阶段this指向不可再被更改

## this的指向规则
this有不同的值，主要分为下面几种情况： 默认调用、隐式调用、new绑定、显示绑定

### 默认绑定
独立函数调用（无法应用后面其他指向规则时），this指向全局对象window。
```js
function func() {
    console.log( this.a ); // this指向全局对象
}
// 在新版的JS中，使用var或者let、const都不会使a挂载到window上，只有使用 变量=值 的形式才可以挂载
a = 2;
func(); //>> 2
```
如果函数处于严格模式则this为undefined
```js
function func() {
  "use strict";
  console.log(this.a);
}

var a = 2;
(function() {
  func(); //>> 报错
})();
```
在SetTimeout或SetInterval使用时,this也是默认调用

**在函数中调用另一个函数的时候也是默认调用**
### 隐式调用
如果调用者调用的函数，为某以个对象的方法，那么该函数在被调用时，其内部的this指向该对象。
```js
function func() {
  console.log(this.a);
}
var obj = {
  a: 2,
  func: func
};
obj.func(); //>> 2
```
### 显示调用
JavaScript内置对象Function的三个原型方法call()、apply()和bind()，它们的第一个参数是一个对象，
它们会把这个对象绑定到this，接着在调用函数时让this指向这个对象

```js
a = 1
function func() {
    console.log( this.a );
}
var obj = {
    a:2
};
func.call(obj); //>> 2
```

**使用bind可以修正SetTimeout和SetInterval的this指向**

### new调用
构造函数只是一些使用new操作符时被调用的函数。它们并不会属于某个类，也不会实例化一个类。
实际上，它们甚至都不能算是一种特殊的类型（class），它们只是被new操作符调用的普通函数而已。
(关于new的更多信息见前文章节 对象->new)

使用new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作：
1. 创建（或者说构造）一个全新的对象
2. 将构造函数的作用域赋给新对象（因此this就指向了这个新对象）
3. 执行构造函数中的代码（为这个新对象添加属性、方法等）
4. 如果函数没有返回其他对象，那么返回这个新对象。

```js
function func(a) {
    this.a = a;
}
var test = new func(2);
console.log(test.a); //>> 2
// 使用new 来调用func(..)时，我们会构造一个新对象并把它绑定到func(..)调用中的this上
```

### 作用域安全的构造函数
如果我们直接使用调用构造函数而不使用`new`操作符，this会映射到全局变量。为了解决这个问题我们需要作用域安全的构造函数:

```js
function Person(name){
    if(this instanceof  Person){
        this.name = name;
    }else {
        return new Person(name);
    }
}
```

## 箭头函数
在 ES6 的语法中还提供了箭头函语法，让我们在代码书写时就能确定 this 的指向（编译时绑定）

```js
const obj = {
  sayThis: () => {
    console.log(this);
  }
};

obj.sayThis(); // window 因为 JavaScript 没有块作用域，所以在定义 sayThis 的时候，里面的 this 就绑到 window 上去了
const globalSay = obj.sayThis;
globalSay(); // window 浏览器中的 global 对象
```

## this优先级
new绑定优先级 >= 显示绑定优先级 > 隐式绑定优先级 > 默认绑定优先级

## 实现call、Apply、bind
```js
//注意：这种实现使用了ES6，如果考虑到低版本的情况则需要判断arguments的长度并以数组的方式取值

/**
 *
 * @param thisArg this的指向
 * @param args 参数
 * @return {*} 返回函数在this指向的域的运行结果
 */
Function.prototype.myCall = function(thisArg,...args){
    // 如果thisArg为null或者无参数则将this设置为window
    if(thisArg===null||thisArg===undefined){
        thisArg = window;
    }
    else{
        // 如果thisArg是一个基础数据类型则需要将其转化为对象
        thisArg = Object(thisArg);
    }

    const tempMethod = Symbol("something");
    // 将this（即当前使用的函数）作为thisArg的一个方法
    // 此时就可以在this指向的对象中使用目标函数了
    thisArg[tempMethod] = this;
    let res = thisArg[tempMethod](...args);

    //删除方法
    delete thisArg[tempMethod];
    return res;
}

/**
 *
 * @param thisArg this指向
 * @param2 (可选)参数数组，类型需要为类数组
 * @return {*} 返回函数在this指向的域的运行结果
 */
Function.prototype.myApply = function (thisArg){
    if(thisArg===null||thisArg===undefined){
        thisArg = window;
    }
    else{
        thisArg = Object(thisArg);
    }

    function isArrayLike(o){
        return o && //满足o存在
            typeof o === "object" && //并且是对象
            // 并且要求o的长度是有穷的、非负的、在安全范围内的整数
            isFinite(o.length) &&
            o.length >= 0 &&
            o.length === Math.floor(o.length) &&
            o.length < 4294967296;
    }

    const tempMethod = Symbol("something");
    thisArg[tempMethod] = this;

    let args = arguments[1];
    let res;
    // 如果传入了第二个参数则进行处理
    if(args){
        // 如果既不是数组也不是类数组，则抛出错误
        if(!Array.isArray(args)&&!isArrayLike(args)){
            throw new Error("Unacceptable arguments neither array nor array like")
        }
        args = Array.from(args);
        res = thisArg[tempMethod](...args);
    }else {
        res = thisArg[tempMethod]();
    }
    return res;
}

console.log(Math.max.myApply({"a":1},[1,2,3]))

/**
 * 实现bind方法
 * @param {*} thisArg this的指向
 * @param  {...any} arg 传入函数的参数
 * @returns 返回this绑定为传入thisArg的一个函数
 */
Function.prototype.myBind = function(thisArg,...args){
    const bindFunction = this;
    // 二次传参
    let funcForBind = function(...secondArgs){
        let isNew = this instanceof funcForBind;
        thisArg = isNew? this : Object(thisArg);
        // 将两次传递的参数都作为目标函数的参数
        return bindFunction.call(thisArg,...args,...secondArgs);
    }

    // 将返回函数的原型绑定到目标对象上
    funcForBind.prototype = Object.create(bindFunction.prototype);
    return funcForBind;
}
```

### softBind

bind 函数多次调用会已第一次绑定的 this 为准，softbind 已最后一次绑定传入的 this 为准

```js
Function.prototype.softBind = function (obj, ...args) {
    const fn = this;
    return function (...args2) {
        // 如果this是global说明是在外部在此调用了bind，否则this应该是之前绑定过的对象
        return fn.apply(this === global ? obj : this, args.concat(args2));
    };
};
```