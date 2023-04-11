function require(path) {
    if (require.cache[path]) {
        return require.cache[path].exports
    }
    var src = fs.readFileSync(path)
    var code = new Function('exports, module', src)
    var module = {exports:{}}
    code(module.exports, module)
    require.cache[path] = module
    return module.exports
}
require.cache = Object.create(null)

// 作者：谢然
// 链接：https://www.zhihu.com/question/21157540/answer/194952896
//     来源：知乎
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。