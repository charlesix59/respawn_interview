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