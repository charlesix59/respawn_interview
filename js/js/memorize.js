const memoize = function (func, content) {
    let cache = Object.create(null)
    content = content || this
    return (...key) => {
        if (!cache[key]) {
            cache[key] = func.apply(content, key)
        }
        return cache[key]
    }
}

/**
 * 函数缓存
 * @param {Function} func 需要缓存的函数
 * @param content
 * @return {function} 一个函数
 * */
const memorize = function (func,content){
    let cache = Object.create(null);
    content = content||this;
    //箭头函数，该方法返回一个函数
    return (...key)=>{
        if(!cache[key]){
            cache[key] = func.apply(content,key);
        }
        return cache[key];
    }
}