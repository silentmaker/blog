---
title: 'Babel笔记'
date: '2018-05-20'
tags: ['babel']
categories: ['dev']
path: '/babel-notes
---

**Babel**是 Javascript 的转译工具，可以帮助开发者在写代码的时候可以使用更先进的语法和API，并在运行前转译为更具兼容性的语法

确立 **ECMAScript** 标准语法的五阶段:
1. Stage 0：strawman - "稻草人"
2. Stage 1：proposal - 提议
3. Stage 2：draft - 草稿，并且必须包含2个实验性的实现，其中一个可以是用转译器实现的，如Babel
4. Stage 3：candidate - 至少要有2个符合规范的具体实现
5. Stage 4：finished - 完成

#### Babel6


Babel6增加了以下配置项：
- *.babelrc* 配置文件
- *plugins* 配置，所有东西插件化
- *presets* 配置，默认转译jsx和ES6语法，不同的preset其实就是一系列插件的组合

同时Babel6后也对代码进行了拆分：
* *babel-core*：核心功能，比如transfrom、transfromFile、transformFileSync 和 transformFromAst，主要用于生成编译代码和抽象语法树（AST，Abstract Syntax Tree）
* *babel-cli*：命令行工具，用于输出转译代码，同时会安装babel-node
* *babel-node*：用于启动REPL（Read-Eval-Print-Loop）,同时会安装babel-polyfill
* *babel-polyfill*：引入新的内置对象如Promise和静态方法如Array.from以供使用
* *babel-register*：模块注册器，在底层改写node的require方法，不带后缀情况下会默认转译.es6、.es、.jsx和.js后缀的模块，其实等同于babel-core/register模块，也可以单独引入

#### 插件

官方插件列表：http://babeljs.io/docs/en/plugins/
语法层次的转译，和api层次的垫片(polyfill)，都是通过一系列插件来实现
external-helpers则提供了常见的工具函数，比如Object.extend

```javascript
{
    "plugins": [
        ["transform-es2015-arrow-functions", { "spec": true }],
        "transform-es2015-spread",
        "transform-es2015-for-of",
        "transform-object-assign",
        "external-helpers"
    ]
}
```

如上引入时，helper 和 polyfill 的引用都是模块级别的，无法避免在多个文件内重复引用
故推荐可用 transform-runtime 来自动引入 polyfill 和 helper，同时需要依赖 babel-runtime：

```javascript
{
    "plugins": [
        ["transform-runtime", {
            "helpers": false,
            "polyfill": false,
            "regenerator": true
        }]
    ]
}
```



*babel-runtime* 的组成：

* *core-js*，通过ES3实现了大部分ES5/6/7的垫片
* *generator*，facebook用于实现生成器函数的库
* *helpers*，基本等同于babel-external-helpers

*transform-runtime* 和 *babel-polyfill* 引入垫片的区别：

- 前者是按需引入，后者是全局性的，并且会改写一些实例方法，如Array.prototype.includes
- 后者更全能也更稳妥，提供了完整的ES6+环境，官方也建议全局引入
- 建议开发库或框架时引入不会前者，不会污染全局作用域；大型web应用则推荐后者，全局引入后者打包后的文件体积可能比各模块重复引入体积更小

#### Preset配置
官方已经不推荐使用{ "presets": ["es2015"] }的方式，而是用*babel-preset-env*

```javascript
{
    "presets": [
        ["env", {
            "browsers": ["last 2 versions", "safari >= 7"],
            "node": "6.10" // "current"表示当前版本node
        }],
        "modules": "commonjs",
        "debug": false,
        "include": ["transform-es2015-arrow-functions"], // 强制开启的模块
        "exclude": ["transform-es2015-for-of"], // 禁用的模块
        "useBuiltIns": false
    ]
}
```

useBuiltIns为true，则项目中必须引入babel-ployfill，文件大小会减少很多

**其他Polyfill解决方案**

https://polyfill.io/v2/docs/

polyfill.io 的解决方案是通过解析请求的User Agent信息返回与浏览器相对应的垫片文件，只需要无增加一个script标签