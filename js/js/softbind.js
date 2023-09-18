/**
 * 软bind，如果对bind返回的函数多次进行绑定将以最后一次绑定的this为准
 * @param obj 绑定的对象
 * @param args 参数
 * @return {function(...[*]): any} 返回绑定后的函数
 */
Function.prototype.softBind = function (obj, ...args) {
    const fn = this;
    return function (...args2) {
        // 如果this是global说明是在外部在此调用了bind，否则this应该是之前绑定过的对象
        return fn.apply(this === global ? obj : this, args.concat(args2));
    };
};

const obj1 = {
    a:1
}
const obj2 = {
    a:2
}

function fn(){
    console.log(this.a);
}

const fn1 = fn.softBind(obj1);
const fn2 = fn1.softBind(obj2);

fn1();
fn2();