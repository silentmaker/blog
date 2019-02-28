---
title: 'Vue项目结构总结'
date: '2018-12-03'
tags: ['前端']
categories: ['编程']
path: '/vue-project-structure'
---

无事总结了下自己习惯用的Vue项目文件结构

清晰的项目结构有助于项目增长过程中的代码规范和质量管理，合理的项目结构能帮助新人更快地把握项目代码，自己开发时思路也会更加清晰，复用性的代码要支持按模块引入，减少多余的打包体积

```bash
public
|-- favicon.ico          // 网页图标
|-- index.html          // 入口HTML文件
`-- robot.txt          // 爬虫文件
src
|-- assets          // 静态资源目录
|   |-- emojis          // 表情
|   |   `-- smile.gif
|   |-- fonts          // 字体
|   |   `-- roboto.ttf
|   |-- images          // 图片
|   |   `-- sprite.png
|   `-- styles          // 样式
|       |-- base.css
|       `-- reset.css
|-- common          // 公共函数库
|   |-- helpers.js          // 通用业务逻辑函数
|   `-- utils.js          // 工具类纯函数
|-- components          // 公共UI组件库
|   |-- button.vue
|   |-- input.vue
|   `-- textarea.vue
|-- directives          // 公共指令，支持按模块引入
|   |-- index.js
|   `-- modules
|       |-- highlight.js
|       `-- scroll.js
|-- main.js          // 应用入口文件
|-- mixins          // 公共混入，支持按模块引入
|   |-- index.js
|   `-- modules
|       |-- error.js
|       `-- toggle.js
|-- router           // 公共路由和应用路由
|   |-- global.js
|   |-- example.js        // 示例应用模块的路由文件
|   `-- index.js
|-- serviceWorker.js           // service worker文件
|-- store           // 公共store，支持按模块引入
|   `-- modules
|       |-- example          // 示例应用模块的store文件
|       |   |-- actions.js
|       |   |-- getters.js
|       |   |-- index.js
|       |   `-- mutations.js
|       `-- index.js
|-- vendor          // 没有包管理机制的外部库文件
|   |-- xx-log.js
|   `-- xx-sdk.js
`-- views          // 所有页面组件和业务组件
    |-- components          // 公共业务组件库
    |   |-- footer.vue
    |   `-- header.vue
    `-- example
        |-- components        // 示例应用模块的业务组件
        |   |-- form.vue
        |   `-- list.vue
        |-- create.vue        // 示例应用模块的页面组件
        |-- edit.vue
        |-- index.vue
        `-- show.vue
```

