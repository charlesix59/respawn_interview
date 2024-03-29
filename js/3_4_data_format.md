# 数据格式
## XML
```js
// todo: 有空再讲
```
## JSON
JSON是JS的一个严格子集，利用了JS中的一些模式来表示结构化数据。

JSON语法可以表示三种类型：简单值、对象、数组

```json
"simple value"
```

json属性名必须加引号，没有末尾分号，逗号隔开不同的属性，最后一个必须没有逗号

```json
{
  "name": "object"
}
```

```json
[
  1,
  2,
  3
]
```

### JSON对象
早期的JSON通过`eval()`函数解析。ES5定义了全局JSON对象。JSON对象有两个方法: `stringify()` 和 `parse()`

JSON的stringify可以接受的参数有：
- 要序列化的对象
- 一个过滤器，一个数组或者函数。如果是数组，则只会保留数组中出现的属性，如果是函数，则接受两个参数，键和值。如果值并非键值对的值则键可以为空字符串。
  函数返回的值就是对应的值，返回undefined则该属性被忽略
- 是否保留缩进，如果是一个数值，则表示缩进的空格数，如果是字符串，则用该字符串代替缩进

如果stringify无法满足要求，可以为对象定义toJSON方法，这个方法可以stringify传入对应的对象的时候自动调入。

JSON的parse方法接受的参数有：
- 要反序列化的JSON字符串
- 一个函数，在每个键值对上调用，和stringify的第二个参数相同
