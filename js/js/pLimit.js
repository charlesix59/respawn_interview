function pLimit(time){
    // 维护一个Promise池
    let pool = [];
    // 目前从池子中取出了几个Promise
    let count = 0;

    /**
     * 调度器，负责从池子中取出Promise运行并在运行结束后通知下一个Promise运行
     */
    function run(){
        if(count<time && pool.length){
            count++;
            const {fn,resolve,reject} = pool.shift()
            fn().then(res=>{
                resolve(res)
            }).catch(err=>{
                reject(err)
            }).finally(()=>{
                count--;
                run();
            })
        }
    }
    // 返回一个limit函数，这个函数接受一个返回Promise的函数，并将其转化为拥有最大执行数限制的Promise
    return function limit(fn){
        return new Promise((resolve, reject) => {
            pool.push({fn,resolve,reject});
            run();
        })
    }
}

// test

const limit = pLimit(2);

const input = [
    limit(()=>Promise.resolve(1)),
    limit(()=>Promise.resolve(2)),
    limit(()=>Promise.resolve(3))
]

const input2 = [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3)
]

Promise.all(input).then(res=>{
    console.log(res)
})