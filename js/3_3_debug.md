# JS错误处理与调试
## try-catch
ECMA-262第三版引入了`try-catch`语句，作为JS中异常处理的一种标准方式。

```js
try{
    someAction;
}catch (e){
    alert(e)
}finally {
    someOptinalAction;
}
```

当try中的代码发生错误时，就会立即退出代码执行过程然后执行catch中的代码。
如果在try-catch中加入finally语句，则finally中的语句无论如何都会执行。

```js
try{
    return 2;
}catch (e){
    return 1;
}finally {
    return 0;
}
```

如上代码最终会返回0。

### 错误类型
js中存在下列其中错误类型：
- Error：错误
- EvalError：与 eval() 有关。 
- RangeError：数值变量或参数超出其有效范围。 
- ReferenceError：无效引用。 
- SyntaxError：语法错误。 
- TypeError：变量或参数不属于有效类型。 
- URIError：给 encodeURI() 或 decodeURI() 传递的参数无效。 
- AggregateError：由一个操作产生且需要报告的多个错误

### 抛出错误
与try-catch对应的还有一个throw操作符，用于抛出自定义错误。抛出错误的时候需要给throw操作符指定一个值，这个值的类型没有要求。

在遇到throw操作符的时候代码会立即停止执行。仅当有try-catch语句捕获到抛出的错误时，代码才会继续执行。

可以使用内置的错误类型来抛出更准确、更类似浏览器的错误，上面说的每一种错误都有其对应的改造函数，比他们都接受一个参数表示错误消息：

```js
throw new Error("something wrong");
```

捕获错误的目的在于避免浏览器以默认的方式处理他们，而抛出错误的目的是在于提供错误发生具体的原因。

### 错误事件
没有通过try-catch处理的的错误会触发window对象的error事件，他不会创建event对象，但是会接受三个参数：
错误消息、错误所在的URL和行号。

使得事件处理程序中返回false会阻止浏览器错误的默认行为：

```js
window.onerror = function (message,url,line){
    alert(message);
    return false;
}
```

### 致命错误与非致命错误
任何错误处理策略中最重要的一步就是确定他是否是致命的。

对于非致命错误，可以根据下列条件判断：
- 不影响用户的主要任务
- 只影响页面的一部分
- 可以回滚
- 重复操作可以消除错误

对于致命错误，可以根据下列条件判断：
- 应用程序根本无法继续运行
- 错误明显影响到了用户的主要操作
- 会导致其他连带错误

## 调试
### 打印到控制台
可以通过console对象向JS控制台中写入信息：
- error：错误信息
- info：信息信息
- log：信息
- warn：警告信息

### 抛出错误
可以使用throw抛出错误。

也可以使用`assert()`函数处理，这个函数接受两个参数，第一个是求值应该为true的条件，第二个是为false时要抛出的错误

```js
console.assert(b===0, "can't divide 0");
```

