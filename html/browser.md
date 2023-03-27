# 浏览器
## 浏览器的结构
![浏览器结构](images/browser_struct.png)
现代浏览器基本上是由上图所述的部分组成：
1. 用户接口：为用户提供用户交互界面
2. 浏览器引擎：负责处理用户的各种行为，初始化加载URL，协调UI与渲染引擎等
3. 渲染引擎：解析JS、CSS、HTML等，渲染界面
4. JS解释器：解释和运行JS代码并将结果传递给渲染引擎
5. 数据存储：存储书签、缓存等数据

主流浏览器的渲染引擎与JS解释器版本如下(2023.3)：

| 浏览器     | 渲染引擎    | JS解释器          |
|---------|---------|----------------|
| Chrome  | Blink   | V8             |
| IE      | Trident | Chakra         |
| Firefox | gecko   | spiderMonkey   |
| Safari  | webKit  | JavaScriptCore |
| Opera   | Blink   | CaraKan        |
| Edge    | Blink   | V8             |
