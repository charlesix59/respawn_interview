# JS原型
> 摘自前端内参

- **原型**是一个对象。
- **`prototype`是函数的一个属性而已，也是一个对象，它和原型没有绝对的关系**。JavaScript里函数也是一种对象，每个对象都有一个原型，但不是所有对象都有`prototype`属性，实际上只有函数才有这个属性。
- 每个对象(实例)都有一个属性`__proto__`，指向他的构造函数（constructor）的`prototype`属性。
- **一个对象的原型就是它的构造函数的`prototype`属性的值**，因此`__proto__`**也即原型的代名词**。
- 对象的`__proto__`也有自己的`__proto__`，层层向上，直到`__proto__`为null。换句话说，原型本身也有自己的原型。这种由原型层层链接起来的数据结构成为 **原型链**。因为null不再有原型，所以原型链的末端是null。

## 原型链
> 摘自语音打卡社群

原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推。
这种关系常被称为原型链 (prototype chain)，它解释了为何一个对象会拥有定义在其他对象中的属性和方法

在对象实例和它的构造器之间建立一个链接（它是__proto__属性，是从构造函数的prototype属性派生的），
之后通过上溯原型链，在构造器中找到这些属性和方法

### 举个例子
```js
function Person(name) {
    this.name = name;
    this.age = 18;
    this.sayName = function() {
        console.log(this.name);
    }
}
// 第二步 创建实例
var person = new Person('person')
```
根据代码，我们可以得到下图
![原型链示例](images/prototype_example.png)
下面分析一下：

- 构造函数Person存在原型对象Person.prototype 
- 构造函数生成实例对象person，person的__proto__指向构造函数Person原型对象 
- Person.prototype.__proto__ 指向内置对象，因为 Person.prototype 是个对象，默认是由 Object 函数作为类创建的，而 Object.prototype 为内置对象 
- Person.__proto__ 指向内置匿名函数 anonymous，因为 Person 是个函数对象，默认由 Function 作为类创建 
- Function.prototype 和 Function.__proto__ 同时指向内置匿名函数 anonymous，这样原型链的终点就是 null

总结：
- 一切对象都是继承自Object对象，Object 对象直接继承根源对象 null 
- 一切的函数对象（包括 Object 对象），都是继承自 Function 对象 
- Object 对象直接继承自 Function 对象 
- Function对象的__proto__会指向自己的原型对象，最终还是继承自Object对象

### instanceof
instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上

使用如下：

```js
object instanceof constructor
```

object为实例对象，constructor为构造函数

构造函数通过new可以实例对象，instanceof 能判断这个对象是否是之前那个构造函数生成的对象

### instanceof的实现

```js
/**
 * 判断对象是否在原型链上
 * @param left 目标对象
 * @param right 构造函数
 * @return {boolean} 是否在原型链上
 */
function myInstanceof(left, right) {
    // 如果left不是对象则一定不在原型链上
    if (typeof left != "object" || left === null) {
        return false
    }
    // 获取左侧对象的原型
    let proto = Object.getPrototypeOf(left)
    // 循环，直到找到左侧的对象的原型链上的某个原型等于右侧对象的原型
    // 或者找到原型链的尽头
    while (true) {
        if (proto == null) {
            return false
        }
        if (proto === right.prototype) {
            return true
        }
        proto = Object.getPrototypeOf(proto)
    }
}
```