# JS对象
这篇文章用来搜集一些与JS的对象相关的内容，可以认为是基础篇的姊妹篇

> 引用类型的值（对象）是引用类型的一个实例

## Object
大多数引用都是Object类型的引用，虽然Object不具备多少功能，但是对于存储和传输数据来说非常合适

对象可以通过new操作符后加要创建的对象类型的名称来创建

```js
let o = new Object();
// 如果不传递参数可以省略圆括号
// 有效，但是不建议这么做
let o2 = new Object;
// 字面量表示（首选）
// 使用字面量声明的属性会自动转化为字符串
let person2 = {
    "name":"charles"
};
```

### 访问对象的方式：

```js
// 点表示法
person.name
// 方括号表示法
person["name"]
```

方括号语法的优点：
- 可以通过变量来访问属性
- 可以访问包含语法错误的字符串的属性
- 可以访问名为保留字或是关键字的属性

Object的每个实例都具有下列方法和属性：
- `constructor`：用于创建当前对象的函数
- `hasOwnProperty()`：用于检查给定属性在当前对象的实例中是否存在
- `isPrototypeOf(object)`：用于检查2传入的对象是否是另一个对象的原型
- `propertyIsEnumerable(propertyName)`：用于检测给定的属性是否能够使用for-in来进行枚举
- `oLocaleString()`：返回对象的字符串表示，与执行环境的地区对应
- `toString()`：返回对象的字符串表示
- `valueOf()`：返回对象字符串、数组或布尔值表示


## new
在JS中，**任意**函数都可以通过new操作符来新建一个对象。

其工作步骤如下：
1. 创建了一个新的空对象
2. 设置原型，将对象的原型设置为函数的 prototype 对象 
3. 让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性） 
4. 判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象。

根据上面的原理，我们可以实现一个简单的new

```js
/**
 * 对象工厂（模拟new）
 * @param1 函数
 * @param2... 函数的参数
 * @return {null|*} 新对象或结果
 */
function objectFactory(){
    // 创建空对象
    let newObject = null,
        constructor = Array.prototype.shift().call(arguments);

    // 保证传入的“构造函数”是函数
    if(typeof constructor!= "function"){
        throw new Error("typeError, constructor must be function");
    }

    // 设置原型
    newObject = Object.create(constructor.prototype);

    // 绑定this指向
    let result = constructor.apply(newObject,arguments);

    // 如果结果是引用对象则返回结果，否则返回新对象
    if(result && (typeof result == "object"||typeof result == "function")){
        return result;
    }
    return newObject;
}
```

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

### 全局函数

decodeURI()、decodeURIcomponent()、 encodeURI、encodeURIcomponent()、escape()、eval()、
isFinite()、isNAN()、Number()、parseFloat()、parseInt()、String()、unescape()

## Array

ES中的数组每一项都可以保留任意类型的数据

### 创建Array的方式：

使用Array构造函数

```js
// 无参构造
let colors = new Array();
// 可以传递一个参数，作为array中的项的数量
let colors = new Array(3);
// 也可以传递多个参数作为或一个非数字参数作为数组的项
let colors = new Array("blue","red","green");
// 可以省略new操作符
let colors = Array(3);
```

使用字面量

```js
let colors = ["blue","red","green"];
```

### 读取与修改数组

需要通过索引访问、修改与新增

```js
// 读取
colors[0];
// 修改
colors[1] = blue;
// 新增
colors[3] = black;
```

如果某个值的索引超过数组现有的项数，数组就会自动增加到该索引的长度加1

```js
colors[99] = "white";
colors[98];// undefined
colors.length;//100
```

### length属性

length并不是制度的，如果设置length小于数组长度，则会移除多余的元素，如果length大于数组长度，则会将新增的项设置为undefined

### 检测数组

我们可以使用`arr instanceof Array`检测数组，但是如果网页中存在多个全局环境并且其Array狗赞函数不同，则这个方法可能失效。我们可以使用`Array.isArray()`方法检测某个值是不是数组

### 转化方法

所有对象都有`toLocalString`、`toString`、和`valueOf`方法。

对于数组来说，调用toString方法会返回由数组的每个值的字符串拼接而成的一个以逗号分隔的字符串（隐式调用toString），同理，toLocalString方法会隐式的调用每一项的toLocalString并将其拼接为字符串

调用valueOf方法返回的还是数组。（？）

如果使用上面的三个方法，默认都会使用`.`作为分隔符，如果使用`join`方法，这个方法接受一个参数，即用作分隔符的字符串。如果不传值或传递undefined则使用`,`。

### 栈方法

```js
push() // 结尾插入
pop() // 结尾弹出
```

### 队列方法

```js
shift() // 开头弹出
unshift() // 开头插入
```

push+shift或者pop+unshift都可以实现队列式的操作

### 排序方法

颠倒顺序：`reverse`

排序：`sort()`

sort默认会比较字符串，我们也可以传入一个比较函数作为参数，指定sort的比较规则。

比较函数接受两个参数，**如果第一个参数应该位于第一个前面，则返回负数，如果两个参数相等，则返回0，如果第一个参数位于第二个之后则返回一个正数**。sort函数接受比较函数后会自动传参。

如果要比较数值对象，可以直接返回两参相减的结果。

### 操作方法

`concat()`方法可以**将原数组与接受的参数拼接形成一个新数组**，如果没有接受到参数，则返回原来数组的一个拷贝

```js
let arr = [1];
let arr2 = arr.concat(2);
console.log(arr2) //>> [1,2]
```

`slice()`方法能返回原数组的某一子集。如果传一个参数，则从此参数的索引到结束，如果传入两个参数，则返回从参数一到参数二索引的子集。

`splice()`方法：
- 传入一个参数：索引从参数到结尾的项删除
- 传入两个参数：索引从参数一到参数二的项删除
- 传入三个参数以上的参数：索引从参数一到参数二的项删除，并从删除的位置插入参数三及之后的值
- 返回被阐述的项

### 位置方法

`indexOf()`：从前到后查找参数起点的索引

`lastIndexOf()`：从后往前查找

查找规则：必须严格相等，等同于使用`===`

### 迭代方法
- every()：对数组中的每一项都运行给定的函数，如果都返回true，则返回true，否则返回false
- some()：对数组中的每一项都运行给定的函数，如果都返回false，则返回false，否则返回true
- filter()：对数组中的每一项都运行给定的函数，返回结果为true的项组成的数组
- forEach()：对数组中的每一项运行指定函数，没有返回值
- map()：对数组中的每一项都运行给定的函数，返回每次调用的结果组成的数组

### 递归方法

`reduce()`方法，会从左往右遍历对象，并调用函数，接受两个参数，第一个为一个函数，*这个函数*接受四个参数：**前一个值，当前值，项的索引，数组对象**，另一个参数为初始的值。

对于传入的函数，reduce会自动将其返回值作为下次调用的一个参数。第一次调用这个函数发生在数组的第二项，函数的第一个参数为其数组的第一项。

## Date

Date类型保存的日期能够精确到1970年1月1日之前或之后的285616年

创建日期对象的方式如下：

构造函数创建

```js
let date = new Date()
```

如果不传参的话，新创建的对象自动获取当前的日期和时间。如果想根据特殊的日期和时间创建，则必须传入该日期的毫秒数

此外，ES还提供了两个解析日期的方法：`Date.parse()`和`Date.UTC()`

`Date.parse()`方法接受一个表示日期的字符串，然后返回根据这个字符串返回的毫秒数。如果传入的字符串不能表示字符串则返回NaN。

**如果直接将表示日期字符串传递给Date构造函数，则会自动调用Date.parse()**

Date.UTC()与parse不同的是，UTC接受多个参数，分别是：**年份、基于0的月份、月中的第几天、小时数、分钟数、秒数、毫秒数**。其中只有年份和月份是必须的。

如果将多个数字参数传递个Date的构造函数，则会自动调用date.UTC()

同时还有一个`Date.now()`方法，返回当前调用这个方法时的毫秒数。

### 继承的方法

Date类型也重写了`toLocaleString()`, `toString()`和`valueOf()`方法。

Date类型的toLocalString会按照与浏览器设置的地区相适应的格式返回日期和时间。

Date的valueOf则返回日期的毫秒表示

### 日期格式化

Date类型还有一些专门用于将日期格式化为字符串的方法，如下：
- toDateString()——以特定的格式显示日期
- toTimeString()——以特定的格式显示时间
- toLocaleDateString()——以特定的地区格式显示日期
- toLocaleTimeString()——以特定的地区格式显示时间
- toUTCString()——以特定的格式显示UTC日期

### 日期/时间 组件方法

## RegExp类型

ES通过RegExp类型来支持正则表达式，创建正则表达式的语法如下：

```js
// 字面量形式
let exp = /pattern/ flags;
// 构造函数形式
let exp2 = new RegExp("pattern","flags");
```

其中的模式（pattern）可以是任何正则表达式，每个正则表达都可以带有一个或多个标志（flags），用以标明正则表达式的行为。正则表达式的匹配模式支持下列三个标志：
- g：表示全局模式
- i：表示不区分大小写模式
- m：表示多行模式

模式中使用的所有元字符都必须**转义**。正则表达式中的元字符包括`([{\^$|?*+.$}])`。

需要注意的是，在字符串中的元素都需要**双重转义**，那些已经转义过的字符也是如此，比如\n需要写成”\\\\n“。

在ES3中，字面量形式的正则表达式会共享一个RegExp实例，在ES5中，使用正则表达式字面量必须和直接调用构造函数一样，每次创建新的实例。

### RegExp的实例属性

RegExp的每个实例都有下列属性：
- global：boolean，是否设置了g
- ignoreCase：boolean，是否设置了i
- lastIndex：整数，表示开始搜索下一个匹配项的字符位置
- multiline：Boolean，是否设置了m标志
- source：正则表达式的字符串表示，按照字面量形式返回

### RegExp的实例方式

对象的主要方法是`exec()`，接受一个参数：需要匹配的字符串，然后返回包含第一个匹配信息的数组或null（匹配不成功的情况下）

对于exec方法而言，即使模式中设置了g，也只会返回一个匹配项（下一个），如果没有设置g，则会始终返回第一个匹配项。

还有一个方法是`test()`，他接受一个字符串参数，在模式与该参数匹配的情况下返回true，否则返回false

### RegExp的构造函数属性

regexp的构造函数属性的独特之处在于可以使用两种属性名访问他们：

| 长属性名         | 短属性名 | 说明                      |
|--------------|------|-------------------------|
| input        | $_   | 最近一次要匹配的字符串             |
| lastMatch    | $&   | 最近一次的匹配项                |
| lastParen    | $+   | 最近一次的匹配捕获组              |
| leftContext  | $`   | input字符串中lastMatch之前的文本 |
| multiline    | $*   | 表示是否所有的表达式都是多行模式        |
| rightContext | $'   | Input字符串中lastMatch之后的文本 |

这些属性可以从exec或者test执行的操作中提取出更具体的信息

除了上述属性之外，还有9个用于存储捕获组的构造函数属性，其为`$1`、`$2`……`$9`，表示第1、2……9个捕获组

## Function类型

在ES中函数实际上是对象，每个函数都是function类型的实例。因此函数名实际上也是指向函数对象的指针。

常用的声明函数的方式有**函数式**声明与**表达式声明**两种：

```js
// 声明式
function func1(){}
// 表达式式
const func2 = function(){}
```

解析器所在对待函数声明与函数表达式的态度上并不相同，解析器会率先读取函数声明，并使其在执行任何代码之前可用（可访问），而函数表达式必须等待解析器执行到它所在的行才会被解释。

除此之外还有一种方法是使用Function构造函数

```js
let sum = new Function("num1","num2","return num1+num2")
```

*不推荐使用这种方式，因为这种语法会导致解析两次代码从而影响性能*

**我们可以使用不带圆括号的函数名来访问函数指针**，因为函数本来就是一个值，所以我们可以像传递值一样将函数传递给另一个函数

我们现在可以更好地理解为什么函数没有重载：我们创建一个同名的函数实际上是将这个名字的变量指向了另一块地址

### 函数内部属性

函数内部有两个特殊的对象：**arguments和this**

arguments在上文已经提到过，它包含着函数中的所有参数，其中还有一个叫callee的属性，其值是一个指针，指向拥有这个arguments对象的函数。

this指向的是函数执行的函数对象。

在ES中，函数还有另一个值：caller，这个值保存着调用当前函数的函数引用，如果是在全局作用域中调用当前函数，则caller的值为null。

需要注意的是，在严格模式下，访问arguments.caller和arguments.callee都会发生错误，其中arguments.caller的作用是防止与函数的calller属性弄混。

### 函数的属性和方法

每个函数都有两个属性：`length`和`prototype`。

length属性表示函数希望接受的参数的甘薯。

prototype属性保存着函数的实例方法的真正所在。prototype是不可枚举的，因此无法使用for-in遍历。

每个函数都包含两个继承来的方法：`apply()`和`call()`，这两个方法都是设置函数作用域的方法，也就是设置函数的this值的方法。

ES5中还定义了一个方法：`bind()`。这个方法会创建一个函数实例，这个实例的this值将会被绑定到传给`bind()`函数的值。

## 基本包装类型

ES还提供了3个特殊的引用类型：`Boolean`、`Number`和`String`。每当读取基本类型的值的时候，后台就会创建一个对应的基本包装类型的对象，当使用完之后就会把对象销毁，并返回基本类型的值。**这些操作是自动、透明的**。这也就是为什么我们可以为基本类型的值添加方法，不会报错却无法成功的原因。

我们也可以显式的调用Boolean、Number和String来创建基本的包装类型的对象，不过并不建议这样做，因为这样的变量不会自动转化，会让人分不清自己操作的数据的类型，并且一些比较操作也会也会出现意想不到的结果。

Object构造函数也会像工厂函数一样，根据传入值的类型来返回相应的基本包装类的实例。

使用new调用基本包装类的构造函数和直接调用同名的转型函数是不同的。

### Boolean类型

Boolean类型的实例重写了valueOf方法，返回基本数据类型true或者false，重写了toString方法，返回"true"或"false"。

**建议永远不要使用Boolean对象**

### Number类型

Number对象也重写了valueOf、toString和toLoacleString，第一个方法返回基本类型的数值，其他两个返回字符串形式的数值

除了以上方法之外，Number对象还提供了一些其他的将数值转化为字符串的方法

- `toFixed(小数点后位数)`方法会按照指定的小数位数返回字符串表示，舍入方法为：**向上舍入**
- `toExponential()`方法返回一直输表示法表示的数值的字符串形式
- `toPrecision()`方法能返回固定大小的格式，也可能返回质数格式，具体看哪种格式最合适

### String

string类型的每一个实例中都会有一个length属性，表示字符串中包含多少字符。

即使字符串中包含双字节字符，每个字符也仍然算是一个字符

#### 字符方法
- `charAt(index)`，返回基于0的索引位置的字符
- `charCodeAt(index)`，返回基于0的索引位置的字符的编码

#### 字符串操作方法
- `concat()`，将一个或多个字符串拼接起来，返回拼接得到的新字符串
- `slice()`，返回字符串的一个字串，第一个参数指定字符串的开始位置，第二个参数指定子字符串最后一个字符的下一个位置，如果传入负值，则将负值与字符串的长度相加
- `substr()`，返回字符串的一个字串，第一个参数指定字符串的开始位置，指定返回子串的长度，第一个参数如果是负值，则将负值与字符串的长度相加，第二个参数如果是负值则转化为0
- `subsrtring()`，返回字符串的一个字串，第一个参数指定字符串的开始位置，第二个参数指定子字符串最后一个字符的下一个位置，收到的所有的负值都将转化为0

#### 字符串位置方法
- `indexOf()`，从前往后在字符串中搜索给定的字串，然后返回字符串的位置。如果有第二个参数 ，则指定从哪个位置开始
- `lastIndexOf()`，从后往前在字符串中搜索给定的字串，然后返回字符串的位置。如果有第二个参数 ，则指定从哪个位置开始

#### trim方法

创建一个字符串的副本，并删除前置与后缀的所有空格

#### 大小写转换方法
- `toLowerCase()`
- `toLocaleLowerCase()`
- `toUpperCase()`
- `toLocaleUpperCase()`

#### 字符串的模式匹配方法
- `match()`，接受一个正则表达式，与RegExp的exec方法相同
- `search()`，接受一个正则表达式，返回字符串中第一个匹配项的索引；若未找到，则返回-1。并且search方法始终从前往后搜索。
- `replace()`，第一个参数是一个正则表达式或字符串，如果是字符串则只替换第一个匹配到的，唯一的方法是使用正则表达式并提供g标志。第二个是一个字符串或是一个函数，如果第二个参数是字符串还可以使用一些特殊的字符序列将正则表达式操作得到的值插入到结果字符串中。
- `parseHTML()`，能够转义`>`、`<`、`&`、`"`四个字符

#### localeCompare()方法

比较两个字符串并返回下列值的一个：
- 负数：如果字符串应该排参数之前
- 0：相等
- 整数：字符串排在参数之后

#### fromCharCode()

String提供了`fromCharCode()`这个静态方法，它能够接受一个或者多个字符编码并将它们转化为字符串

## 单体内置对象

单体内置对象是Es实现提供的、不依赖宿主环境的对象，这些对象在ES程序执行之前就已经存在了。

### Global对象

Global对象是透明的。

任何不属于其他对象的属性和方法最后都会属于Global对象：
- URl编码方法
    - `encodeURL()`：除了空格其他都不变
    - `encodeURLcomponent()`：编码所有非数字或字母的字符
- `eval()`：接受一段字符串，将其变为JS代码。evel中的任何变量或函数都不会提升。

Web浏览器将Global对象的一些功能通过window对象加以实现。

## Math对象

math对象保存数学公式和信息

math对象的一些常用属性如下：

| 属性           | 说明        |
|--------------|-----------|
| Math.E       | e         |
| Math.LN10    | 10的自然对数   |
| Math.LN2     | 2的自然对数    |
| Math.LOG2E   | 以2为底e的对数  |
| Math.LOG10E  | 以10为底e的对数 |
| Math.PI      | Π         |
| Math.SQRT1_2 | 1/2的平方根   |
| Math.SQRT2   | 2的平方根     |

常用方法如下：

| 方法      | 说明   |
|---------|------|
| min()   | 最小值  |
| max()   | 最大值  |
| ceil()  | 向上舍入 |
| floor() | 向下舍入 |
| round() | 四舍五入 |

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