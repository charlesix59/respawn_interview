/**
 * 防抖的实现
 * @param {function} func 需要防抖的函数
 * @param {number} wait 等待的时间
 */
function debounce(func,wait){
    let timer = null;
    let startTime = Date.now();
    return function () {
        let curTime = Date.now();
        let reaming = wait - (curTime - startTime);
        let context = this;
        let args = arguments;
        clearTimeout(timer)
        if(reaming<=0){
            func.apply(context,args);
            startTime = Date.now();
        }
        else{
            timer = setTimeout(()=>{
                func.apply(context,args);
                startTime = Date.now();
            },wait);
        }
    }
}