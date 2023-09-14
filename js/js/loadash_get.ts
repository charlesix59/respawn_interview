/**
 * 获取一个长对象链上的属性
 * @param object 需要取值的对象
 * @param path 需要取值的路径
 * @param defaultValue 如果取不到值返回的默认值
 */
const lodashGet = (
    object: { [key: string]: any },
    path: Array<string> | string,
    defaultValue?: any
): any => {
    let result: any;
    const findArrayPath = (path: Array<string>): any => {
        // 路径为空直接返回
        if (path.length === 0) {
            return (result = defaultValue);
        }
        result = object;
        // 根据传入的数组逐个搜索属性
        for (const p of path) {
            if (p in result) {
                result = result[p];
            } else {
                result = defaultValue;
                break;
            }
        }
        return result;
    };
    if (Array.isArray(path)) {
        result = findArrayPath(path);
    } else {
        // 去除括号并根据空白字符分割数组
        let normalizedPath = path.replace(/\.|\[|\]/g, " ").split(/\s+/);
        result = findArrayPath(normalizedPath);
    }
    return result;
};

const object = { a: [{ b: { c: 3 } }] };

console.log(lodashGet(object, "a[0].b.c"));
console.log(lodashGet(object, ["a", "0", "b", "c"]));
console.log(lodashGet(object, "a.b.c", "default"));
