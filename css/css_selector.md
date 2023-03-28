# CSS选择器
## CSS选择器的类型
### id选择器
```css
#id{
}
```
### 类选择器
```css
.class{
}
```
### 标签选择器
```css
div{}
a{}
p{}
```
### 关系选择器
```css
/*后代选择器：选择.a下面所有的b标签*/
.a b{
    
}
/*子代选择器：选择.a下的所有为b的子标签*/
.a>b{
    
}
/*相邻兄弟选择器：选择.a紧挨着的那个为b的兄弟标签*/
.a+b{
    
}
/*兄弟选择器：选择.a后面的所有为b的兄弟*/
.a~b{
    
}
```
### 属性选择器
```css
/* 某某[属性] 选择到a标签且有title属性的变*/
a[title]{
}
/*某某[属性=属性值] 选择到有某某标签有指定属性且属性值必须完全相同 */
a[lang="zh"]{
}
/* 某某[属性^=属性值] 选择a标签有class属性且属性值是li开头的 */
a[class^=" li"]{
}
/* 写法4 某某[属性$=属性值] 选择a标签有class属性且属性值结尾是t */
a[class$="t"]{
}
/* 写法5 某某[属性*=属性值] 选择到a标签且有href属性且只要有字母b就可以 */
a[href*="b"]{
}
/* 写法6 某某[属性~=属性值] 选择到的是a标签且有class属性,且属性值包含完整的item */
 a[class~="item"]{
}
/* 写法7 某某[属性|=属性值] 这个是选择到有a标签,且有属性title,且属性值只有1个是link的
或者属性值有多个但是得是link-开头 */
a[title|="link"]{
}
```
### 伪类选择器
| 选择器                                                                             | 示例                    | 示例说明                         |
|---------------------------------------------------------------------------------|-----------------------|------------------------------|
| [:checked](https://www.runoob.com/cssref/sel-checked.html)                      | input:checked         | 选择所有选中的表单元素                  |
| [:disabled](https://www.runoob.com/css/cssref/sel-disabled.html)                | input:disabled        | 选择所有禁用的表单元素                  |
| [:empty](https://www.runoob.com/cssref/sel-empty.html)                          | p:empty               | 选择所有没有子元素的p元素                |
| [:enabled](https://www.runoob.com/cssref/sel-enable.html)                       | input:enabled         | 选择所有启用的表单元素                  |
| [:first-of-type](https://www.runoob.com/cssref/sel-first-of-type.html)          | p:first-of-type       | 选择的每个 p 元素是其父元素的第一个 p 元素     |
| [:in-range](https://www.runoob.com/cssref/sel-in-range.html)                    | input:in-range        | 选择元素指定范围内的值                  |
| [:invalid](https://www.runoob.com/cssref/sel-invalid.html)                      | input:invalid         | 选择所有无效的元素                    |
| [:last-child](https://www.runoob.com/cssref/sel-last-child.html)                | p:last-child          | 选择所有p元素的最后一个子元素              |
| [:last-of-type](https://www.runoob.com/cssref/sel-last-of-type.html)            | p:last-of-type        | 选择每个p元素是其母元素的最后一个p元素         |
| [:not(selector)](https://www.runoob.com/cssref/sel-not.html)                    | :not(p)               | 选择所有p以外的元素                   |
| [:nth-child(n)](https://www.runoob.com/cssref/sel-nth-child.html)               | p:nth-child(2)        | 选择所有 p 元素的父元素的第二个子元素         |
| [:nth-last-child(n)](https://www.runoob.com/cssref/sel-nth-last-child.html)     | p:nth-last-child(2)   | 选择所有p元素倒数的第二个子元素             |
| [:nth-last-of-type(n)](https://www.runoob.com/cssref/sel-nth-last-of-type.html) | p:nth-last-of-type(2) | 选择所有p元素倒数的第二个为p的子元素          |
| [:nth-of-type(n)](https://www.runoob.com/cssref/sel-nth-of-type.html)           | p:nth-of-type(2)      | 选择所有p元素第二个为p的子元素             |
| [:only-of-type](https://www.runoob.com/cssref/sel-only-of-type.html)            | p:only-of-type        | 选择所有仅有一个子元素为p的元素             |
| [:only-child](https://www.runoob.com/cssref/sel-only-child.html)                | p:only-child          | 选择所有仅有一个子元素的p元素              |
| [:optional](https://www.runoob.com/cssref/sel-optional.html)                    | input:optional        | 选择没有"required"的元素属性          |
| [:out-of-range](https://www.runoob.com/cssref/sel-out-of-range.html)            | input:out-of-range    | 选择指定范围以外的值的元素属性              |
| [:read-only](https://www.runoob.com/cssref/sel-read-only.html)                  | input:read-only       | 选择只读属性的元素属性                  |
| [:read-write](https://www.runoob.com/cssref/sel-read-write.html)                | input:read-write      | 选择没有只读属性的元素属性                |
| [:required](https://www.runoob.com/cssref/sel-required.html)                    | input:required        | 选择有"required"属性指定的元素属性       |
| [:root](https://www.runoob.com/cssref/sel-root.html)                            | root                  | 选择文档的根元素                     |
| [:target](https://www.runoob.com/cssref/sel-target.html)                        | #news:target          | 选择当前活动#news元素(点击URL包含锚的名字)   |
| [:valid](https://www.runoob.com/cssref/sel-valid.html)                          | input:valid           | 选择所有有效值的属性                   |
| [:link](https://www.runoob.com/cssref/sel-link.html)                            | a:link                | 选择所有未访问链接                    |
| [:visited](https://www.runoob.com/cssref/sel-visited.html)                      | a:visited             | 选择所有访问过的链接                   |
| [:active](https://www.runoob.com/cssref/sel-active.html)                        | a:active              | 选择正在活动链接                     |
| [:hover](https://www.runoob.com/cssref/sel-hover.html)                          | a:hover               | 把鼠标放在链接上的状态                  |
| [:focus](https://www.runoob.com/cssref/sel-focus.html)                          | input:focus           | 选择元素输入后具有焦点                  |
| [:first-child](https://www.runoob.com/cssref/sel-firstchild.html)               | p:first-child         | 选择器匹配属于任意元素的第一个子元素的 `<p> `元素 |
| [:lang(*language*)](https://www.runoob.com/cssref/sel-lang.html)                | p:lang(it)            | 为`<p>`元素的lang属性选择一个开始值       |
### 伪元素
| 选择器                                                                 | 示例             | 示例说明             |
|---------------------------------------------------------------------|----------------|------------------|
| [:first-letter](https://www.runoob.com/cssref/sel-firstletter.html) | p:first-letter | 选择每个<p> 元素的第一个字母 |
| [:first-line](https://www.runoob.com/cssref/sel-firstline.html)     | p:first-line   | 选择每个<p> 元素的第一行   |
| [:before](https://www.runoob.com/cssref/sel-before.html)            | p:before       | 在每个<p>元素之前插入内容   |
| [:after](https://www.runoob.com/cssref/sel-after.html)              | p:after        | 在每个<p>元素之后插入内容   |

### 通配符选择器
```css
/*选择所有*/
*{}
```