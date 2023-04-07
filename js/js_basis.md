# JS基础
## 数据类型
js 可以分为两种类型的值，一种是基本数据类型，一种是复杂数据类型。
### 基本数据类型
js 一共有五种基本数据类型，分别是 **Undefined**、**Null**、**Boolean**、**Number**、**String**，
还有在 ES6 中新增的 **Symbol** 和 ES10 中新增的 **BigInt** 类型。
### 引用数据类型
引用数据类型指的是 Object 类型，所有其他的如 Array、Date 等数据类型都可以理解为 Object 类型的子类
### 存储位置的区别
基本数据类型的值直接保存在栈中，而复杂数据类型的值保存在堆中，通过使用在栈中保存对应的指针来获取堆中的值。

在操作系统中，内存被分为栈区和堆区：
- 栈区内存由编译器自动分配释放，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈。 
- 堆区内存一般由程序员分配释放，若程序员不释放，程序结束时可能由垃圾回收机制回收。

## 保留字
### ES6 中的关键字

break、case、catch、class、const、continue、debugger、default (en-US)、delete 、do 、else
export、extends、finally、for、function、if、import、in、instanceof、new、return、super
switch、this、throw、try、typeof、var、void、while、with、yield

### 未来保留关键字
在 ECMAScript 规格中，这些关键字被当成关键字保留。目前它们没有特殊功能，但是在未来某个时间可能会加上。
所以这些关键字不能当成标识符使用。这些关键字在严格模式和非严格模式中均不能使用。

enum

### 严格模式中的保留关键字

implements、interface、let、package、private、protected、public、static

### 模块代码中的保留关键字

await

### 之前标准中的保留关键字
abstract、boolean、byte、char、double、final、float、goto、int、long、native、short
synchronized、transient、volatile

另外，字面量 null、true和false同样不能被当成标识使用。

## 内置对象
> 来自Front-End-Interview-Notebook

全局的对象（ global objects ）或称标准内置对象，不要和 "全局对象（global object）" 混淆。这里说的全局的对象是说在
全局作用域里的对象。全局作用域中的其他对象可以由用户的脚本创建或由宿主程序提供。

标准内置对象的分类：
1. 值属性，这些全局属性返回一个简单值，这些值没有自己的属性和方法

   例如 Infinity、NaN、undefined、null 字面量 
2. 函数属性，全局函数可以直接调用，不需要在调用时指定所属对象，执行结束后会将结果直接返回给调用者。 
   
   例如 eval()、parseFloat()、parseInt() 等 
3. 基本对象，基本对象是定义或使用其他对象的基础。基本对象包括一般对象、函数对象和错误对象。

   例如 Object、Function、Boolean、Symbol、Error 等 
4. 数字和日期对象，用来表示数字、日期和执行数学计算的对象。

    例如 Number、Math、Date 
5. 字符串，用来表示和操作字符串的对象。

    例如 String、RegExp 
6. 可索引的集合对象，这些对象表示按照索引值来排序的数据集合，包括数组和类型数组，以及类数组结构的对象

   例如 Array 
7. 使用键的集合对象，这些集合对象在存储数据时会使用到键，支持按照插入顺序来迭代元素。

    例如 Map、Set、WeakMap、WeakSet 
8. 矢量集合，SIMD 矢量集合中的数据会被组织为一个数据序列。

    例如 SIMD 等 
9. 结构化数据，这些对象用来表示和操作结构化的缓冲区数据，或使用 JSON 编码的数据。

    例如 JSON 等 
10. 控制抽象对象

    例如 Promise、Generator 等 
11. 反射

    例如Reflect、Proxy 
12. 国际化，为了支持多语言处理而加入 ECMAScript 的对象。

    例如 Intl、Intl.Collator 等 
13. WebAssembly 
14. 其他

    例如 arguments


## 全局函数

decodeURI()、decodeURIcomponent()、 encodeURI、encodeURIcomponent()、escape()、eval()、
isFinite()、isNAN()、Number()、parseFloat()、parseInt()、String()、unescape()

## 运算符
### 比较
使用===时，null、undefined、0和false不相等
### 运算
-- 运算符表示先取值进行运算，运算结束后再自减
+"2" = 2，因为一元运算符 + 会触发隐式类型转化，将"2"转化为2
### 逻辑
&& 运算，如果前面值为true,则结果为后面的值。如果前面值为false,则值为前值.
|| 运算，如果前面值为true,则结果为前面的值,如果前面的值为false,则结果为后面的值。

### 运算符优先级从高到低排序

| 运算符                                | 描述                         |
|------------------------------------|----------------------------|
| . [] ()                            | 字段访问、数组下标、函数调用以及表达式分组      |
| ++ -- - ~ ! delete new typeof void | 一元运算符、返回数据类型、对象创建、未定义值     |
| * / %                              | 乘法、除法、取模                   |
| + - +                              | 加法、减法、字符串连接                |
| << >> >>>                          | 移位                         |
| < <= > >= instanceof               | 小于、小于等于、大于、大于等于、instanceof |
| == != === !==                      | 等于、不等于、严格相等、非严格相等          |
| &                                  | 按位与                        |
| ^                                  | 按位异或                       |
| &#124;                             | 按位或                        |
| &&                                 | 逻辑与                        |
| &#124;&#124;                       | 逻辑或                        |
| ?:                                 | 条件                         |
| = oP=                              | 赋值、运算赋值                    |
| ,                                  | 多重求值                       |

## 常用方法

### 数组方法

### Math函数方法