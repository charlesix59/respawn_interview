// // 父类
// function User(name){
//     this.name = name;
//     User.prototype.sayHello=function (){
//         console.log("hello")
//     }
// }
// // 子类
// function GitHubUser(name){
//     this.name = name
// }
// // 继承
// GitHubUser.prototype = new User()

//父类
// function User(name){
//     this.name = name;
//     User.prototype.sayHello=function (){
//         console.log("hello")
//     }
// }
// // 子类
// function GitHubUser(name,password){
//     // 继承
//     User.call(this,name);
//     this.password = password;
// }

// function User(name){
//     this.name = name;
//     User.prototype.sayHello=function (){
//         console.log("hello")
//     }
// }
// // 子类
// function GitHubUser(name,password){
//     // 构造函数继承
//     User.call(this,name);
//     this.password = password;
// }

// let User={
//     name:"name",
// }
// // 子类
// function GitHubUser(name,password){
//     this.name = name;
//     this.password = password;
// }
// // 继承
// GitHubUser.prototype = Object.create(User)

// let User={
//     name:"name",
// }
// // 子类
// function GitHubUser(){
//     let o = Object.create(User)
//     o.__proto__.sayHi = function (){
//         console.log("Hi");
//     }
//     return o;
// }
//
// let Charles59 = new GitHubUser()
//
// console.log(Charles59.name) //>> User
// Charles59.sayHi()

//寄生组合式继承的核心方法
// function inherit(child, parent) {
//     // 继承父类的原型
//     const p = Object.create(parent.prototype);
//     // 重写子类的原型
//     child.prototype = p;
//     // 重写被污染的子类的constructor
//     p.constructor = child;
// }
//
// //User, 父类
// function User(username, password) {
//     let _password = password
//     this.username = username
// }
//
// User.prototype.sayHello = function () {
//     console.log("hello");
//     //>> ReferenceError: _password is not defined
// }
//
// function GitHubUser(username, password) {
//     User.call(this, username, password) // 继承属性
//     this.articles = 3 // 文章数量
// }
//
// //继承
// inherit(GitHubUser, User);
//
// //在原型上添加新方法
// GitHubUser.prototype.readArticle = function () {
//     console.log('Read article');
// }
//

// user1.readArticle()

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

const user1 = new GitHubUser("charles", "123456");
console.log(user1);
user1.sayHello()