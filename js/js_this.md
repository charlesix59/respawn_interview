# JS上下文

## 执行上下文

执行上下文就是当前 JavaScript 代码被解析和执行时所在的环境，也叫作执行环境。

执行上下文的类型分为三种：全局执行上下文、函数执行上下文、Eval执行上下文

### 全局执行上下文

浏览器中的全局对象就是 window 对象，this 指向这个全局对象

特点：

- 默认的、最基础的执行上下文
- 不在任何函数中的代码都位于全局执行上下文中
- 一个程序中只能存在一个全局执行上下文。

### 函数执行上下文

每次调用函数都会创建一个新的函数执行上下文

特点：

- 每个函数都拥有自己的执行上下文，但是只有在函数被调用的时候才会被创建
- 存在任意数量的函数执行上下文

### eval执行上下文

运行在 eval 函数中的代码，很少用而且不建议使用

## 执行上下文的组成

这一小节值得我们说道说道，因为现在市面上流传着两套说法，分别是：

- 执行上下文=变量对象（Variable Object）+ 作用域链（Scope Chain）+ this
- 执行上下文=词法环境（Lexical Environment）+ 变量环境（Variable Environment）+ this

我们观察这两套理论，会发现**变量对象+作用域链=词法环境+变量环境**

这两者有何不同呢？我认为是拆分与组合的不同。

变量对象与作用域链是按类型分类，将执行上下文分为了this，全部的变量组成的一个对象以及一个指向当前作用域
的上层作用域（或null）的引用

而词法环境与变量环境是按照变量类型的来分的，词法环境保存着函数声明，let、const定义的变量以及参数。
而变量环境保存着使用var定义的变量

### 例子

我们用一个🌰来解释一下：
使用伪代码写下下列代码*创建阶段*的执行上下文

```js
let a = 20;
const b = 30;
var c;

function multiply(e, f) {
    var g = 20;
    return e * f * g;
}

c = multiply(20, 30);
```

模式一：

```typescript
{
    Scope:[
        {
            ThisBinding: <Global Object>,
            VO:{
                arguments:{},//实参
                multiply:reference to function multiply(){},//函数的引用
                a: <uninitialized>,
                b: <uninitialized>,
                c: undefined,
            }
        },
        {
            ThisBinding: <Global Object>,
            VO:{
                Arguments: {0: 20, 1: 30, length: 2},
                e:20,
                f:30,
                g:undefined,
            }
        },
    ]
}
```

模式二：

```typescript
GlobalExectionContext = {
    ThisBinding: <Global Object >,

    // 词法环境用于存储函数声明和变量（ let 和 const ）绑定
    LexicalEnvironment: {  // 词法环境
        EnvironmentRecord: {
            Type: "Object",
            // 标识符绑定在这里  
            a: <uninitialized>,
            b: <uninitialized>,
            multiply: <func>
        }``
        // 全局环境外部环境引用为 null
        outer: <null>
    },
    
    // 变量环境仅用于存储变量（ var ）绑定
    VariableEnvironment: {  // 变量环境
        EnvironmentRecord: {
            Type: "Object",
            // 标识符绑定在这里  
            c: undefined,
        }
        outer: <null>,
    }
}

FunctionExectionContext = {
    // this的值是在函数执行的时候才能确认
    ThisBinding: <Global Object >,
    
    LexicalEnvironment: {
        EnvironmentRecord: {
            Type: "Declarative",
            // 标识符绑定在这里  
            Arguments: {0: 20, 1: 30, length: 2},
        },
        // 外部环境的引用可以是全局环境，也可以是包含内部函数的外部函数环境
        outer: <GlobalLexicalEnvironment>
    },

    VariableEnvironment: {
        EnvironmentRecord: {
            Type: "Declarative",
            // 标识符绑定在这里  
            g: undefined
        },
        outer: <GlobalLexicalEnvironment>
    }
}
```
### 关于let与var
从上面的代码中，我们可以得到在上一章讲到的**声明提升**与**暂时性死区**的原理。

声明提升：在初始化阶段，用`var`声明的变量已经被添加进VO（或说VE）并声明为undefined，所以我们可以在变量
声明之前就访问他们并得到undefined

暂时性死区：在初始化阶段，用`let`或`const`声明的变量已经被添加进VO（或说LE）但被标记为未声明的，故而
解释器能够得知我们在当前域中已经定义了的变量的名字，只是在他们被赋值之前都是未初始化的状态，所以无法使用
。因此会出现在暂时性死区的现象

## 执行上下文的声明周期
执行上下文的生命周期包括三个阶段：创建阶段 → 执行阶段 → 回收阶段
### 创建阶段
（解释一）
创建阶段做了三件事：
- 创建变量对象：首先初始化函数的参数 arguments，提升函数声明和变量声明（变量的声明提前有赖于var关键字）。
- 创建作用域链：在执行期上下文的创建阶段，作用域链是在变量对象之后创建的。作用域链本身包含变量对象。作用域链用于解析变量。当被要求解析变量时，JavaScript 始终从代码嵌套的最内层开始，如果最内层没有找到变量，就会跳转到上一层父作用域中查找，直到找到该变量。
- 确定 this 指向。

（解释二）
创建阶段做了三件事：
- 确定 this 的值，也被称为 This Binding
- LexicalEnvironment（词法环境） 组件被创建
- VariableEnvironment（变量环境） 组件被创建

### 执行阶段
完成变量赋值、函数引用、以及执行其他代码

### 回收阶段
函数调用完毕后，函数出栈，对应的执行上下文也出栈，等待垃圾回收器回收执行上下文

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
如果函数出于严格模式则this为undefined
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
//todo
```