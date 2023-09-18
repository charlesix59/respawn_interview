# 现代的CSS

## CSS变量
css 变量减少样式重复定义，比如同一个颜色值要在多个地方重复使用，以前通过 less 和 sass 预处理做到，现在 css 变量也可以做到，方便维护，提高可读性

```css
:root {
    --bgcolor: blue;
    --color: red;
}

p {
    color: var(--color);
}

div {
    backgroung-color: var(--bgcolor);
    color: var(--color)
}
```

在媒体查询中使用，精简代码，减少冗余

```css
.box {
    --base-size: 10;
    width: calc(var(--base-size) * 10px);
    height: clac(var(--base-size) *5px);
    padding: calc(var(--base-size) * 1px);
}

@media screen and (min-width: 1480px) {
    .box {
        --base-size: 8;
    }
}
```

方便在 js 中使用

```js
// 设置变量
document.getElementById("box").style.setPropertyValue('--color', 'pink')
// 读取变量
doucment.getElementById('box').style.getPropertyValue('--color').trim()    //pink
// 删除变量
document.getElementById('box').style.removeProperty('--color')
```

