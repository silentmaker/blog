---
title: '什么是Shadow DOM'
date: '2016-12-28'
tags: ['javascript']
categories: ['编程']
path: '/what-is-shadow-dom'
---

### 什么是Shadow DOM

Shadow DOM 允许开发者在文档渲染时插入一棵DOM元素子树，但是这棵子树不在主DOM树中，因此开发者可利用Shadow DOM 封装自己的 HTML 标签、CSS 样式和 JavaScript 代码

很多我们常见的标签，比如video，用的时候只需要在里面嵌套source标签，但却可以完成一系列视频功能：播放/暂停按钮、进度条、视频时间显示、音量控制等等，其实就是能过Shadow DOM来完成的

在 Chrome 的开发者工具中，找到 Settings 里的 Show user agent shadow DOM 选项并打开，重新检查元素的时候就可以看到 Shadow DOM 的具体元素了

![Shadow DOM](/Users/maxingcong/Code/blog/src/pages/images/shadow-dom-tree.png)

### 创建Shadow DOM

我们可以使用 createShadowRoot()来创建Shadow DOM，并赋值给一个变量，然后在该变量中添加元素即可：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Shadow DOM</title>
    <style type="text/css">
        .shadowroot_son {
            color: #f00;
        }
    </style>
</head>
<body>
    <div class="shadowhost">Hello, world!</div>
    <script>
        // 宿主（shadow host）
        var shadowHost = document.querySelector('.shadowhost');
        // 根元素（shadow root）
        var shadowRoot = shadowHost.createShadowRoot();
        // 添加子节点
        shadowRoot.innerHTML = '<p class="shadowroot_son">夏天夏天悄悄过去留下小秘密！</p>';
    </script>
</body>
</html>
```

如上，但是.shadowroot_son的样式color: #f00;不会生效，因为宿主和根元素之间存在边界（shadow boundary），以保证主 DOM写的 CSS 选择器和 JavaScript 代码都不会影响到Shadow DOM，当然反过来Shadow DOM里的样式也不会影响到主DOM

### 内容模板

通过`<content>`标签把来自主文档并添加到 shadow DOM 的内容被称为分布节点，其select属性表示有选择性的插入内容，select 属性可以使用 CSS 选择器来选取想要展示的内容，选择器包括类选择器、标签名选择器等

而`<template>`元素的出现旨在让HTML模板变得更加标准与规范，在使用前不会被渲染，不会执行加载等操作，也能够实现隐藏标签内容，而且位置任意性，可以在`<head>`中，也可以在`<body>`或者`<frameset>`中

重构上例如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>content and template</title>
</head>
<body>
    <div class="shadowhost">
        <em class="shadowhost_content1">唱歌</em>
        <em class="shadowhost_content2">跳舞</em>
    </div>
 
    <template class="template">
        <h1>
            你<content select=".shadowhost_content1"></content>
            我<content select=".shadowhost_content2"></content>!
        </h1>
    </template>

    <script>
    var shadowHost = document.querySelector('.shadowhost');
    var shadowRoot = shadowHost.createShadowRoot();
    var template = document.querySelector('.template');
    // template.content会返回一个文档片段，可以理解为另外一个document。
    // 利用document.importNode获取节点，true表示深度克隆。
    shadowRoot.appendChild(document.importNode(template.content, true));
    </script>
</body>
</html>
```

```javascript
console.log(template.innerHTML);   // 获取完整的HTML片段
console.log(template.content);  // 返回一个文档片段#document-fragment
console.log(template.childNodes);  // 返回[]，说明childNodes无效
```

在这个情况下，innerHTML、content 和 childNodes 三个属性的用途比较不同

### 宿主样式

在shadow DOM中利用:host定义宿主的样式，当然用户可以在主文档中覆盖这个样式。

:host 是伪类选择器（Pseudo Selector）,:host或者 :host(*)是默认给所有的宿主添加样式，或者单独给一个宿主添加样式，即通过:host(x)，x可以是宿主的标签或者类选择器等。

另外:host还可以配合:hover、:active等状态来设置样式，如：

```css
:host(:hover) { border: 2px solid #0ff;}
```

原则上来说，Shadow Boundary 保证主DOM中的 CSS 选择器和 JavaScript 代码都不会影响到Shadow DOM，但如果你想打破边界，给Shadow DOM添加一些样式，这时可以使用::shadow

不过 ::shadow 选择器的一个缺陷是他只能穿透一层影子边界，如果你在一个影子树中嵌套了多个影子树，那么使用 /deep/ 

通过 `<content> `标签把来自主DOM的内容添加到 shadow DOM 称为分布节点，分布节点的样式渲染需要用到 ::content，也就是说，若分布节点为em标签，直接写 em {} 不生效，应该写成::content > em {}。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>::content&::shadow&/deep/</title>
    <style type="text/css">
    /* ::shadow */
    /*.shadowhost::shadow h1 {
        padding: 20px;
        border: 1px solid #f00;
    }*/
    /* /deep/  */
    .shadowhost /deep/ h1 {
        padding: 20px;
        border: 1px solid #000;
    }
    </style>
</head>
<body>
    <div class="shadowhost">
        <em class="shadowhost_content1">唱歌</em>
        <em class="shadowhost_content2">跳舞</em>
    </div>
    <!-- S 模板标签 template -->
    <template class="template">
        <style>
        /* 定义宿主样式:host */
        :host {
            color: #E85E5E;
        }
        /* 定义宿主hover状态下的样式 */
        :host(:hover) {
            color: #000;
        }
        /* 分布节点的样式渲染需要用到 ::content,直接写 em {} 不生效 */
        ::content > em {
            padding: 10px;
            color: #fff;
            background: #FFCC00;
            border-radius: 10px;
        }
        </style>
        <h1>你<content select=".shadowhost_content1"></content>我<content select=".shadowhost_content2"></content>!</h1>
    </template>
    <!-- E 模板标签 template -->
    <script>
    var shadowHost = document.querySelector('.shadowhost');
    var shadowRoot = shadowHost.createShadowRoot();
    var template = document.querySelector('.template');
    shadowRoot.appendChild(document.importNode(template.content, true));
    </script>
</body>
</html>
```

### 事件阻塞与重定向

在Shadow DOM中，abort、 error、 select 、change 、load 、reset 、resize 、scroll 和 selectstart 等事件不会进行重定向而是直接被干掉，因此事件不会冒泡到主DOM中，因此无法监听到这一事件

Shadow DOM 里的 JS 与传统的 JS 一个真正不同的点在于事件调度（event dispatching，原来绑定在 shadow DOM 节点中的事件被重定向了，这是为了让事件看起来像绑定在影子宿主上一样，否则这将破坏封装性，不过分布节点来自原有 DOM 结构，所以没必要重定向

最后，Template Html 和 Shodaw Dom都只在chrome中才有较好的兼容性，或者也可以通过[webcomponents.js](http://webcomponents.org/)来使Shadow DOM在非原生支持的浏览器上得以实现

