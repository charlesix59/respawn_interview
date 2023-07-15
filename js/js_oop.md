# JS的面向对象编程

## 原型与面向对象
JS并非是一个严格的面向对象的语言，但是JS（ES6之前）提供了一些方法能让我们使用面向对象的方法来编写JS代码
。这个方法就是原型。

JS创建新的对象是使用任一函数作为构造函数创建的，并没有做什么其他特别的操作，那么我们怎么界定新创建的对象的
方法与属性呢？

答案是我们需要**将希望新创建的对象拥有的方法和属性在构造函数的原型中定义**。而在构造函数中定义的方法与
属性则类似于静态方法（属性），具体表现为能够在构造函数作用域中被访问与实行，但无法被创建的对象使用

举个🌰吧：
```js
function Phone(){
    let name="iphone";
    let price=999;
    function call(){
        console.log("通话中...")
    }
}
let iphone = new Phone();

console.log(iphone.name) //>>undefined
iphone.call() //>>error

//在Phone的原型中添加属性和方法中
Phone.prototype.name = "iphone"
Phone.prototype.call = function (){
    console.log("通话中")
}

console.log(iphone.name) //>>iphone
iphone.call() //>>通话中

// 添加属性还有另外一个方法，即使用this
function Phone(){
    this.name="iphone";
    this.price=999;
    Phone.prototype.call(){
        console.log("通话中...")
    }
}
// 实际上，属性使用this定义，方法使用原型定义是我们比较推荐的方式
```

这其实就是原型的最主要的应用。

明白了原型与面向对象的关系之后，我们才可以继续向下进行。

我们知道面向对象有四个特征，分别是**抽象**、**继承**、**多态**、**封装**。在JS中，对抽象与多态的
支持实在是很难差强人意（幸运的是在TypeScript中这些特性都已经得到了很好的支持），
对于封装可以使用前文中提到过的闭包实现，下面我们将来讲述面向对象中最重要的继承特性

## 继承
JS的继承比起其他面向对象的语言的继承，不太一样的一点是**JS的继承是构造函数的继承**，
而一般的面向对象语言是类的继承

### 类式继承
将子类的原型变为父类的实例

```js
// 父类
function User(name){
    this.name = name;
    User.prototype.sayHello=function (){
        console.log("hello")
    }
}
// 子类
function GitHubUser(name,password){
    this.name = name;
    this.password = password;
}
// 继承
GitHubUser.prototype = new User()
```

缺陷：
- 子类属性中的引用类型为同一个父对象的引用类型，修改会对其他子类产生影响
- 无法传递参数

### 构造函数继承
在子类的构造函数里通过调用call/apply来实现继承

```js
//父类
function User(name){
    this.name = name;
    User.prototype.sayHello=function (){
        console.log("hello")
    }
}
// 子类
function GitHubUser(name,password){
    // 继承
    User.call(this,name);
    this.password = password;
}
```

缺陷：
- 无法通过instanceof的测试
- 无法继承父类原型上的方法

### 组合式继承
组合式继承就是将上述两种继承方式结合在一起使用

```js
function User(name){
    this.name = name;
    User.prototype.sayHello=function (){
        console.log("hello")
    }
}
// 子类
function GitHubUser(name,password){
    // 构造函数继承
    User.call(this,name);
    this.password = password;
}

// 类式继承
GitHubUser.prototype = new User();
```

缺陷：
- User被实例化了两次
- 如果存在其他子类向其原型添加方法，则所有子类都会拥有这个方法

### 原型式继承
借助原型基于已有的对象创建一个新对象，同时还不必因此创建自定义类型。
原型式继承实际上是对类式继承的一种封装

**强烈不建议使用这种继承的方式！！！**

虽然许多资料都说这种继承的效果与原理与类式继承相同，虽然我认同原理与类式相同这个方法，但是经过测试，
它的行为与构造函数继承的行为相同！！非常的具有迷惑性。

我认为出现这种结果的原因是类式继承本质上是将构造函数的原型指向父类的一个实例，而Object.create则是
创建了一个原型指向父类（没有实例！！）的函数的实例，所以相当于是使得原型链变得很混乱。

所以原型式继承继承的父类应该是对象而非函数！

```js
let User{
    name:"name",
}
// 子类
function GitHubUser(){
    this.name = name;
    this.password = password;
}
// 继承
GitHubUser.prototype = Object.create(User)

let Charles59 = new GitHubUser()
```

### 寄生式继承
通过返回一个由User为原型的内部的对象来实现继承

```js
let User={
    name:"name",
}
// 子类
function GitHubUser(){
    let o = Object.create(User)
    o.__proto__.sayHi = function (){
        console.log("Hi");
    }
    return o;
}
```

### 寄生组合式继承
将寄生继承与组合继承结合起来
```js
function inherit(child, parent) {
    // 继承父类的原型
    const p = Object.create(parent.prototype);
    // 重写子类的原型
    child.prototype = p;
    // 重写被污染的子类的constructor
    p.constructor = child;
}

//User, 父类
function User(username, password) {
    let _password = password
    this.username = username
}

User.prototype.sayHello = function () {
    console.log("hello");
}

function GitHubUser(username, password) {
    User.call(this, username, password) // 继承属性
    this.articles = 3 // 文章数量
}

//继承
inherit(GitHubUser, User);

//在原型上添加新方法
GitHubUser.prototype.readArticle = function () {
    console.log('Read article');
}
```
## Class
在ES6中出现了class、extend等关键字，可以帮助我们轻松地实现面向对象编程。
但是本质上这些关键字不过是**函数式编程的语法糖**。当我们使用babel等工具进行转换时，
会发现class关键字的继承会被转换成上文中的**寄生组合式继承**。

我们还是来写一下类式继承吧：
```js
class User {
    class User{
    name = "";
    constructor(name) {
        this.name = name;
    }
    sayHello = function (){
        console.log("hello");
    }
}

class GitHubUser extends User{
    password="";
    constructor(name,password) {
        super(name);
        password="123456";
    }
}
```

会发现实现地非常完美