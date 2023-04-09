# 网页优化
## 性能优化
### 内存泄漏
内存泄漏是指某块内存已经不再使用却得不到释放

产生内存泄漏的原因有：
1. 意外的全局变量
2. 被遗忘的计时器或回调函数
3. 脱离 DOM 的引用
4. 闭包

### 尾递归
尾递归，即在函数尾位置调用自身。

尾递归在普通尾调用的基础上，多出了2个特征：
- 在尾部调用的是函数自身 
- 可通过优化，使得计算仅占用常量栈空间

这时候，我们就可以使用尾递归，即一个函数中所有递归形式的调用都出现在函数的末尾，对于尾递归来说，
由于只存在一个调用记录，所以永远不会发生"栈溢出"错误

举个🌰吧！比如阶乘：
```js
// 普通递归
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

factorial(5) // 120
```
```js
// 尾递归
function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}

factorial(5) // 120
```

### 函数缓存
函数缓存，即对函数的结果进行缓存。

这是一种用空间换时间的思想，适用于会计算大量相同输入的函数。

下面给出将函数变为缓存函数的方法;
```js
/**
 * 函数缓存
 * @param {Function} func 需要缓存的函数
 * @param content
 * @return {function} 一个函数
 * */
const memorize = function (func,content){
    let cache = Object.create(null);
    content = content||this;
    //箭头函数，该方法返回一个函数
    return (...key)=>{
        if(!cache[key]){
            cache[key] = func.apply(content,key);
        }
        return cache[key];
    }
}
```

### 前端路由
前端路由就是把不同路由对应不同的内容或页面的任务交给前端而非服务器来做

**使用时机**：在单页面应用，大部分页面结构不变，只改变部分内容的使用

优点：
- 用户体验好
- 不需要每次都从服务器全部获取，速度更快

缺点：
- 单页面无法记住之前滚动的位置，无法在前进，后退的时候记住滚动的位置