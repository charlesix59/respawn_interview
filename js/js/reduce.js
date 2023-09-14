/**
 * reduce方法
 * @param arr 执行的数组
 * @param cb 回调函数
 * @param init 初始值
 * @return {*}
 */
function reduce(arr, cb, init) {
    const l = arr.length;

    // 如果数组为空，则失败
    if (!l) {
        if (init) return init;
        else throw new TypeError("Error");
    }

    // 如果有init则将对应的参数传入回调函数
    if (init) {
        for (let i = 0; i < l; i++) {
            init = cb(init, arr[i], i, arr);
        }
        return init;
    } else {
        let final;
        for (let i = 0; i < l; i++) {
            // 如果i是0的时候，因为没有初始值，则初始值为[0]，第一个值为[1]，然后使i++跳过i=1的情况
            final = cb(!i ? arr[i++] : final, !i ? arr[i++] : arr[i], i, arr);
        }
        return final;
    }
}

const arr = [1,2,3,4];
const  res = reduce(arr,(pre,cur)=>{pre+=cur;return pre},10);

console.log(res);