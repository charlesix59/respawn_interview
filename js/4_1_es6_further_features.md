# ES6+ 新特性

## ES6

### let

声明变量

特性：

- 不能重复声明

- 块级作用域

- 不存在变量提升

- 不影响作用域链


### const

声明常量

- 一定要赋初值

- 块级作用域


### 解构赋值

ES6允许按照一定的模式从数组和对象中提取值，对变量进行赋值

例：

```js
const [name,usename] = useState("");
```

```js
const zhao = {
    name:'benshan',
    age:60,
    fn:function(){
        console.log("念诗之王")
    }
}
let {name,age,xiaopin} = zhao;
console.log(name)    //>>benshan
```

### 模板字符串

ES6引入新的声明字符串的方式``` `

特性：

- 内容中可以直接出现换行符

- 拼接字符串


例：

```js
const name = "es6"
const example = `${name} is
                great`

console.log(example)    //>> es6 is great
```

### 简化写法

ES6的类允许简写

```js
let name = "qdu"
let type = "!(985||211)"
const school = {
    name,
    type,
    improve(){},
}
//等同于
const school = {
    name:"qdu",
    change:"!(985||211)",
    function improve(){}
}
```

### 箭头函数

特点：

- this是阉割的，始终指向函数声明时的作用域（甚至无法被call改变）

- 不能作为构造函数实例化对象

- 不能使用arguments变量


例：

```js
// 当形参只有一个时，省略小括号
let add = n =>{}
// 只有一条语句时可以省略花括号, 而且语句的的执行结果就是函数的返回值
let add = n => n*n
```

### 函数参数默认值

允许给函数参数赋值初始值

特点：

- 形参初始值，一般放在后面

- 可以与解构赋值结合


### Rest参数

`...`作为函数形式参数的时候会将把多个参数封装为一个数组，只能放在后面

### spread参数

`...`作为参数实参的时候能够把一个数组解析为多个参数

### Symbol

用于表示唯一一个变量，使用Symbol函数创建的变量各不相等，使用Symbol.for()创建的同参数的变量相等

特性：

- Symbol的值是唯一的，用来解决命名冲突问题

- 不能与其他数据进行运算

- Symbol定义的对象属性不能使用for...in遍历，但是可以使用Reflect.ownKeys来获取对象的键名


### 迭代器

迭代器是一种接口，为各种不同的数据结构提供统一的访问机制，使用`for...of`消费

### 生成器

一种异步编程解决方案

例：

```js
function * fn(){
    yield 111;
}
let iterator = fn()
console.log(iterator.next())    //>>{value:111,done:false}
```

### Set

集合。实现了iterator接口，所以可以使用拓展运算符和`for..of`进行遍历，集合的属性和方法

### Map

映射。实现了iterator接口，所以可以使用拓展运算符和`for..of`进行遍历Map的属性和方法

### Class

ES6提供的语法糖，实际上就是对ES5函数的封装

例：

```js
class Phone{
    static name="phone"    //这是一个静态方法，属于类而非对象
    constructor(brand,price){
        this,brand=brand
        this.price = price
    }
    call(){

    }
    //当调用类的属性的时候触发该方法
    get price(){
        //若有return将会得到return的值
        return "1234"
    }
    // 修改类的属性的时候会触发该方法
    set price(newPrice){//参数必须要有

    }
}
// 继承的写法
class SmartPhone extends Phone{
    constructor(brand,price,color){
        super(brand,price)
        this.color = color
    }
    //重写
    call(){

    }
}
```

### 数值扩展

- `Number.EPSILON`：是JS表示的最小精度，接近2.22044E-16

- 二进制和八进制

- `Number.isFinite`：检测是否是无穷

- `Number.isNaN`：检测是否是NaN

- `Number.parseInt`：和parseInt相同

- `Number.parseFloat`：和parseFloat相同

- `Match,trunc`：去掉小数部分

- `Math,sign`：判断一个数是正数、负数还是0


### 对象方法拓展

- `Object.is`：判断两个值是否相等

- `Object.assign`：对象合并，相同的属性后面的覆盖前面的

- `Object.setPrototypeOf`：设置原型对象，速度很慢

- `Object.getPrototypeOf`：获取原型对象


### 模块化

使用export暴露模块的接口，使用import导入模块

优点：

- 防止命名冲突

- 代码复用

- 高维护性


社区规范：

- CommonJS => Node.js

- AMD => requireJS

- CMD => seaJS


## ES7

### Array.prototype.includes

includes方法用来检测数组中是否包含某个元素，返回布尔类型值

### 指数操作符

在ES7中引入指数操作符`**`来实现幂运算，与Math.pow功能相同

## ES8

### async 与 await

使用async修饰的函数会返回一个Promise对象

```js
async function fn(){
    //返回的结果不是一个Promise对象，则返回一个成功的Promise对象
    //抛出错误，则返回一个失败的Promise
    // 返回Promise，则和返回的Promise相同
}
```

await 表达式

**特点:**

- 必须写在async函数中

- 右侧的表达式一般为promise对象

- await返回的是promise成功的值

- await的Promise失败了就会抛出异常，需要通过try..catch捕获处理


```js
cosnt p = new Promise((resolve,reject)=>{
    resolve("")
})
async function main(){
    try{
        let result = await p;
    }catch(e){
        console.log(e)
    }
}
```

### 对象方法拓展

- `Object.values()`：返回一个给定对象的所有可枚举属性值的数组

- `Object.entries()`：返回一个给定对象自身可遍历属性[key,value]的数组

- `Object.getOwnPropertyDescriptors()`：返回指定对象所有自身属性的描述对象


## ES9

### rest与spread加强

为对象提供了像数组一样的rest参数和拓展运算符

### 命名捕获分组

在匹配正则时同时可以捕获参数

例：

```js
let str = "<a href='baidu.com'>Baidu</a>"
const reg = /<a href="(?<url>.*)">(?<text>.*)<\/a>/
const result = reg.exec(str)
console.log(result)
//>> ["<a href='baidu.com'>Baidu</a>","baidu.com","Baidu"]
//group:{text:"baidu",url:"baidu.com"}
```

### 反向断言

根据前面的内容判断是否满足条件

例：

```js
let str = "aa11bb"
const reg = /(?<=a)\d/ //反向断言
console.log(result)
```

### dotAll模式

dotAll模式 `.*`可以匹配任意字符（包括回车等）

```js
/something/s
```

## ES10

### Object.fromEntries

将数组、map转化为对象

### trimStart

清除字符串左侧空白

### trimEnd

清除字符串右侧空白

### flat

将一个多维数组维度降低

`flat(n)` n为需要降低的维度

### flatMap

flat 与 map的结合

### Symbol.prototype.description

得到Symbol的描述

## ES11

### 私有属性

不能被外部访问

例：

```js
class person{
    // 共有属性
    name
    // 私有属性
    #age
}
```

### Promise.allSettled

接受一个Promise数组，始终会返回一个成功的Promise

### String.prototype.matchAll

匹配并提取字符串所有符合正则表达式的内容

### 可选链操作符

可以判断一个变量是否存在，不存在就不读取后面的属性

```js
const host = config?.dbhost
```

### 动态import

可以在代码块中执行import

```js
btn.onclick = function(){
    import('./hello.js').then(module=>{
        module.hello()
    })
}
```

### BigInt

大整形

```js
//定义一个大数
// noinspection JSAnnotator

let n = 521n
//转化为大数
let n = 123
BigInt(n)
```

### globalThis

一个始终指向全局的this