function Promise(executor){
    // Promise的状态，初始状态为pending
    // 成功时的状态为fulfilled，失败时的状态为rejected
    // Promise的状态可以从pending变为fulfilled或者rejected
    // 但是其他的状态不能随意变化
    this.PromiseState = 'pending'
    // 即传入resolve方法或rejected方法的值
    this.PromiseResult = null
    // 回调函数列表，当调用then()方法时，将传入的两个方法加入到回调函数列表
    this.callbacks = []
    const _this = this
    function resolve(data){
        // 如果不是pending则不能正常执行
        if(_this.PromiseState !== 'pending'){
            return
        }
        _this.PromiseState = 'fulfilled'
        _this.PromiseResult = data
        // 模拟异步执行，虽然setTimeout是宏任务队列，所以这里实际上有点问题，不过对于模拟异步是足够了
        setTimeout(()=>{
            // 逐个调用所有的回调函数的处理resolved的函数
            _this.callbacks.forEach(item =>{
                item.onResolved(data)
            })
        })
    }
    function reject(data){
        if(_this.PromiseState !== 'pending'){
            return
        }
        _this.PromiseState = 'rejected'
        _this.PromiseResult = data
        setTimeout(()=>{
            // 逐个调用所有的回调函数的处理rejected的函数
            _this.callbacks.forEach(item =>{
                item.onRejected(data)
            })
        })
    }
    // 为传进来的函数自动传入resolve和reject两个方法
    // 实际上我们传入的函数就是需要这两个函数的形式
    try {
        executor(resolve,reject);
    }catch (e){
        // 如果执行错误使用reject处理即可
        reject(e)
    }
}

/**
 * 根据promise的state运行指定的函数（即把函数绑定到Promise的回调上
 * @param {function} onResolved 成功时的回调
 * @param {function} onRejected 失败时的回调
 * @return {Promise} 返回一个Promise对象以维持Promise链
 */
Promise.prototype.then = function (onResolved, onRejected){
    const _this = this
    // 如果onRejected不是函数则绑定默认函数
    // 默认函数为接受一个参数reason并抛出错误
    if(typeof onRejected !== "function"){
        onRejected = reason =>{
            throw reason
        }
    }
    // 如果onResolved不是函数则绑定默认函数
    // 默认函数为接受一个参数并原样返回
    if(typeof onResolved !== "function"){
        onResolved = value => value
    }
    return new Promise((resolve,reject)=>{
        /**
         * 如果Promise的状态已经改变再调用then就只需要根据状态调用想用的处理方法即可
         * @param type 状态，成功则是onResolved，失败则是onRejected
         */
        function callback(type){
            try {
                // 对Promise的结果运行传入的处理函数
                let result = type(_this.PromiseResult);
                // 如果获取的结果还是一个Promise则继续调用
                if(result instanceof Promise){
                    result.then(v =>{
                        resolve(v)
                    },r=>{
                        reject(r)
                    })
                }else{
                    // 如果是普通值则直接调用resolve方法
                    resolve(result)
                }
            }catch (e){
                // 如果上面抛出了rejected值必须在此处理
                reject(e)
            }
        }
        if(this.PromiseState === 'fulfilled'){
            setTimeout(()=>{
                callback(onResolved)
            })
        }
        if(this.PromiseState === 'rejected'){
            setTimeout(()=>{
                callback(onRejected)
            })

        }
        // 当promise未曾调用则将两个方法传入callback再将callback传入Promise的callback队列
        if(this.PromiseState === 'padding'){
            this.callbacks.push(
                {
                    'onResolved':function (){
                        callback(onResolved)
                    },
                    'onRejected':function (){
                        callback(onRejected)
                    },
                }
            )
        }
    })
}

/**
 * catch 就是 then 第一个参数为undefined或null的版本
 * @param onRejected
 */
Promise.prototype.catch = function (onRejected){
    this.then(undefined,onRejected);
}

/**
 * 传入一个不是Promise的参数返回一个成功的且值为value的Promise
 * @param value 需要包装为Promise的值
 * @return {Promise} 包装后的Promise
 */
Promise.resolve = function (value){
    return new Promise((resolve,reject)=>{
        if(value instanceof Promise){
            value.then(v=>{
                resolve(v)
            },r=>{
                reject(r)
            })
        }else{
            resolve(value)
        }
    })
}

/**
 * 返回一个失败的且值为value的Promise
 * @param reason 失败的原因，即返回的失败的Promise的值
 * @return {Promise} 包装后的Promise
 */
Promise.reject = function (reason){
    return new Promise((resolve,reject)=>{
        reject(reason)
    })
}

/**
 * 传入一个Promise数组，入过都成功返回成功的值组成的数组的Promise，否则返回一个失败的值的Promise
 * @param promises
 * @return {Promise}
 */
Promise.all = function (promises){
    return new Promise((resolve,reject)=>{
        let count = 0
        const arr=[]
        for(let i=0;i<promises.length;i++){
            if(!promises[i] instanceof Promise){
                count++
                arr[i] = promises[i]
            }
            promises[i].then(v=>{
                count++
                arr[i]=v
                if(count===promises.length){
                    resolve(arr)
                }
            },r => {
                reject(r)
            })
        }
    })
}

/**
 * 传入一个Promise数组，返回第一个成功或失败的Promise的值的Promise
 * @param promises
 * @return {Promise}
 */
Promise.race = function (promises){
    return new Promise((resolve,reject)=>{
        for(let i=0;i<promises.length;i++){
            promises[i].then(v=>{
                resolve(v);
            },r=>{
                reject(r);
            })
        }
    })
}