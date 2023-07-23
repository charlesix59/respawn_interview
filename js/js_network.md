# JS 网络编程
## 表单
表单在JS对应HTMLFormElement，详情见文档：https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLFormElement

获取表单的方法如下：
- 像其他元素一样获取
- 使用`document.forms`可以获取到页面中的所有表单

### 提交表单
可以通过一下三种按钮提交表单：

```html
<!--默认提交按钮-->
<input type="submit">
<!--自定义提交按钮-->
<button type="submit"></button>
<!--图像按钮-->
<input type="image" src="#">
```

当form中存在上面三种表单的任意一种并且form中的某个控件（textarea除外）处于focus状态时按回车即可提交

当表单提交的时候，会触发submit事件，我们可以通过自定义onSubmit事件在提交之前做一些事情。

#### 阻止提交
可以在onSubmit事件中使用`preventDefault()`方法来阻止默认行为

#### 编程方式提交
手动调用form的onSubmit()方法也可以提交

### 重置表单

```html
<!--默认重置按钮-->
<input type="reset">
<!--自定义重置按钮-->
<button type="reset"></button>
```

与提交按钮类似，触发重置按钮的时候也会触发reset事件，可以通过自定义reset事件来做一些事情

### input
input的类型非常多，具体可以参考文档：https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input

#### 文本输入
可以使用type为text的input或textarea。

他们会将输入的内容存储在value属性中，我们可以通过读取和修改value来读取或修改输入内容。
_但是请不要使用setAttribute()或者修改元素节点的方式修改value值_

上面两个控件都可以用`select()`方法来选择文本框中的文字。选择的时候会触发select事件。

#### 输入过滤
可以通过自定义键盘事件等方式来阻止输入或阻止特定的输入

#### 操作剪贴板
见文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Clipboard

仅限localhost或者https下使用

#### HTML5的输入验证
- require属性：指定了require的控件不能为空
- html5新增了几个input的type：email、url、number、range、datetime、datetime-local、date、month、week、time
- pattern属性：接受一个正则表达式，输入必须与之匹配
- checkValidity()方法：检查参数是否有效，若有效则返回true
- validityState：https://developer.mozilla.org/zh-CN/docs/Web/API/ValidityState
- novalidate：禁用验证

#### 选择输入
可以使用select元素创建选择框，这个元素的在js为HTMLSelectElement类型：https://developer.mozilla.org/zh-CN/docs/Web/API/ValidityState

对于单选框，可以使用selectedIndex属性获取选中项

对于多选框，就只能一项一项读取然后查看其selected属性


