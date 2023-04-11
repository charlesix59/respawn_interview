# JS对象

这篇文章用来搜集一些与JS的对象相关的内容，可以认为是基础篇的姊妹篇

## 深拷贝

```js
/**
 * 深拷贝
 * @param object 需要拷贝的对象
 * @return {*[]|*} 拷贝结束的对象
 */
function deepCopy(object) {
    if (!object || typeof object !== "object") return object;

    let newObject = Array.isArray(object) ? [] : {};

    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            newObject[key] = deepCopy(object[key]);
        }
    }

    return newObject;
}
```