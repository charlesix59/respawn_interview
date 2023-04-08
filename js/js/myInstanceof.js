/**
 * 判断对象是否在原型链上
 * @param left 目标对象
 * @param right 构造函数
 * @return {boolean} 是否在原型链上
 */
function myInstanceof(left, right) {
    // 如果left不是对象则一定不在原型链上
    if (typeof left != "object" || left === null) {
        return false
    }

    let proto = Object.getPrototypeOf(left)

    while (true) {
        if (proto == null) {
            return false
        }
        if (proto === right.prototype) {
            return true
        }
        proto = Object.getPrototypeOf(proto)
    }
}