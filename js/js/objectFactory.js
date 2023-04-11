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