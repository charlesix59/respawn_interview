/**
 * 初步的科里化函数
 * @param fn 函数
 * @param args 参数
 * @return {function(...[*]): *} 返回科里化之后的函数
 */
function primaryCurrying(fn,...args){
    return function (...args2){
        // 将新传入的args2与args进行合并
        let newArg = args.concat(args2);
        // 通过apply函数绑定this并返回执行结果
        return fn.apply(this, newArg);
    }
}

/**
 * 进一步的科里化
 * @param fn 函数
 * @param length 参数长度
 * @return {any} 返回科里化后的函数
 */
function currying(fn,length){
    // 如果长度还没有定义的话，即递归的第一次，则length为fn需要的参数的长度
    length = length||fn.length;

    // 返回一个函数，此函数接受一个参数args2
    return function (...args2){
        // 如果args2的长度小于length，则继续递归，返回一个科里化的函数
        if(args2.length<length){
            // 将函数作为参数与新传入的参数合并
            let combineArgs = [fn].concat(args2);
            /*递归调用currying函数，
            * 第一个参数是函数，我们使用上面的初级科里化函数将我们传入的函数初步转化为科里化的函数
            * 第二个参数我们需要吧需要的length更改为减掉新出入的参数的length
            * 返回值：返回一个科里化的函数或返回结果
            * */
            return currying(primaryCurrying.apply(this,combineArgs),length - args2.length);
        }
        // 如果args2长度大于等于length，则说明我们已经可以执行函数，此时通过apply函数绑定this并返回执行结果
        else{
            return fn.apply(this,args2);
        }
    }
}

function add(a,b){
    return a+b;
}

let curryAdd = currying(add,2);
let res =  curryAdd(1)(2);

console.log(res)