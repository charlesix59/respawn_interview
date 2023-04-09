/**
 * 防抖的实现
 * @param {function} func 需要防抖的函数
 * @param {number} wait 等待时间
 * @param {boolean} immediate 是否立即执行
 */
function throttled(func,wait,immediate){
    let timeout;
    return function (){
        let context = this;
        let args = arguments;

        if(timeout){
            clearTimeout(timeout);
        }
        if(immediate){
            // 如果没有timeout为false即第一次运行，则call为
            let callNow = !timeout;
            timeout = setTimeout(function (){
                timeout = null;
            },wait)
            if(callNow){
                // 使用func.apply是为了保证func的this与当前函数的this相同
                func.apply(context,args);
            }
        }
        else{
            setTimeout(function (){
                func.apply(context,args)
            },wait);
        }
    }
}