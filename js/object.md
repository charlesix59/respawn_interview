# JS对象

这篇文章用来搜集一些与JS的对象相关的内容，可以认为是基础篇的姊妹篇

## Object
对象可以通过new操作符后加要创建的对象类型的名称来创建

```js
let o = new Object();
// 如果不传递参数可以省略圆括号
// 有效，但是不建议这么做
let o2 = new Object;
```

Object的每个实例都具有下列方法和属性：

- `constructor`：用于创建当前对象的函数

- `hasOwnProperty()`：用于检查给定属性在当前对象的实例中是否存在

- `isPrototypeOf(object)`：用于检查2传入的对象是否是另一个对象的原型

- `propertyIsEnumerable(propertyName)`：用于检测给定的属性是否能够使用for-in来进行枚举

- `oLocaleString()`：返回对象的字符串表示，与执行环境的地区对应

- `toString()`：返回对象的字符串表示

- `valueOf()`：返回对象字符串、数组或布尔值表示


## new
在JS中，**任意**函数都可以通过new操作符来新建一个对象。

其工作步骤如下：
1. 创建了一个新的空对象
2. 设置原型，将对象的原型设置为函数的 prototype 对象 
3. 让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性） 
4. 判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。

根据上面的原理，我们可以实现一个简单的new

```js
/**
 * 对象工厂（模拟new）
 * @param1 函数
 * @param2... 函数的参数
 * @return {null|*} 新对象或结果
 */
function objectFactory(){
    // 创建空对象
    let newObject = null,
        constructor = Array.prototype.shift().call(arguments);

    // 保证传入的“构造函数”是函数
    if(typeof constructor!= "function"){
        throw new Error("typeError, constructor must be function");
    }

    // 设置原型
    newObject = Object.create(constructor.prototype);

    // 绑定this指向
    let result = constructor.apply(newObject,arguments);

    // 如果结果是引用对象则返回结果，否则返回新对象
    if(result && (typeof result == "object"||typeof result == "function")){
        return result;
    }
    return newObject;
}
```

## 内置对象
> 来自Front-End-Interview-Notebook

全局的对象（ global objects ）或称标准内置对象，不要和 "全局对象（global object）" 混淆。这里说的全局的对象是说在
全局作用域里的对象。全局作用域中的其他对象可以由用户的脚本创建或由宿主程序提供。

标准内置对象的分类：
1. 值属性，这些全局属性返回一个简单值，这些值没有自己的属性和方法

   例如 Infinity、NaN、undefined、null 字面量
2. 函数属性，全局函数可以直接调用，不需要在调用时指定所属对象，执行结束后会将结果直接返回给调用者。

   例如 eval()、parseFloat()、parseInt() 等
3. 基本对象，基本对象是定义或使用其他对象的基础。基本对象包括一般对象、函数对象和错误对象。

   例如 Object、Function、Boolean、Symbol、Error 等
4. 数字和日期对象，用来表示数字、日期和执行数学计算的对象。

   例如 Number、Math、Date
5. 字符串，用来表示和操作字符串的对象。

   例如 String、RegExp
6. 可索引的集合对象，这些对象表示按照索引值来排序的数据集合，包括数组和类型数组，以及类数组结构的对象

   例如 Array
7. 使用键的集合对象，这些集合对象在存储数据时会使用到键，支持按照插入顺序来迭代元素。

   例如 Map、Set、WeakMap、WeakSet
8. 矢量集合，SIMD 矢量集合中的数据会被组织为一个数据序列。

   例如 SIMD 等
9. 结构化数据，这些对象用来表示和操作结构化的缓冲区数据，或使用 JSON 编码的数据。

   例如 JSON 等
10. 控制抽象对象

    例如 Promise、Generator 等
11. 反射

    例如Reflect、Proxy
12. 国际化，为了支持多语言处理而加入 ECMAScript 的对象。

    例如 Intl、Intl.Collator 等
13. WebAssembly
14. 其他

    例如 arguments


## 全局函数

decodeURI()、decodeURIcomponent()、 encodeURI、encodeURIcomponent()、escape()、eval()、
isFinite()、isNAN()、Number()、parseFloat()、parseInt()、String()、unescape()

## 深拷贝

```js
/**
 * 深拷贝
 * @param object 需要拷贝的对象
 * @return {*[]|*} 拷贝结束的对象
 */
function deepCopy(object) {
    if (!object || typeof object !== "object") return object;

    let newObject = Array.isArray(object) ? [] : {};

    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            newObject[key] = deepCopy(object[key]);
        }
    }

    return newObject;
}
```