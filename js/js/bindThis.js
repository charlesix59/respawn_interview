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