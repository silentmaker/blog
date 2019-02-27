---
title: 'Rollup的基本使用'
date: '2018-10-26'
tags: ['Javascript']
categories: ['编程']
path: '/rollup-basic-usage'
---

Rollup 是一个和 Webpack 类似的 JavaScript 模块打包工具，不同的是 Rollup 默认对模块使用新的标准化格式，这些标准都是包含在 JavaScript 的 ES6 版本中的，而非以前的特殊解决方案，比如 CommonJS 和 AMD，ES6 模块最终还是要由浏览器原生实现，但当前 Rollup 可以使你提前体验，这样打包出来的包文件体积也更小，打包速度也更快

### 初始化与基本配置

安装和初始化项目

```bash
mkdir demo && cd demo
mkdir src 
npm init
# 安装Rollup
sudo npm install --save-dev rollup
```

在项目根目录下，创建 rollup.config.js 配置文件

```javascript
export default {
    input: './src/main.js', // 项目入口
    output: { // 输出文件选项
    	file: './dist/js/bundle.js',
    	format: 'iife', // bundle格式规范，包括amd/umd/cjs/es/iife
    	name: 'MyBundle',
    },
    plugins: [], // 插件
    externals: [], // 外部引用，防止将某些import的模块打包到bundle中，而是在运行时再去从外部获取这些扩展依赖，一般用于library开发
    globals: { // 全局模块，提供将外部模块ID转换为全局模块的功能
    	jquery: '$'
    },
    banner: 'const a = 6; console.log(a);',
    footer: '/* this is footer */',
    intro: 'const a = 6;',
    outro: '/* this is outro */',
    cache: true,
    sourcemap: 'true', // true: 单独文件，inline: 作为数据URI附加到打包文件
    strict: true, // 严格模式，默认开启
}
```

大部分和webpack的配置项相近，有两个特殊点的配置项：

- banner / footer，前置/追加到文件，最终是在生成包的外部，可以是代码也可以是注释
- intro / outro，与banner / footer 类似，但内容会前置/追加到生成包的内部

```json
{
    banner: '/* this is banner */',
	footer: '/* this is footer */',
    intro: '/* this is intro */',
	outro: '/* this is outro */',
}
```

最终打包结果如下：

```javascript
/* this is banner */

(function () {
'use strict';
/* this is outro */
...
...
/* this is outro */
}());

/* this is footer */
```

### 常用插件

**rollup-plugin-node-resolve**，帮助 Rollup 查找外部模块，然后安装

**rollup-plugin-commonjs** ，可以解决 ES6模块的查找导入，但是npm中的大多数包都是以CommonJS模块的形式出现的，所以需要使用这个插件将CommonJS模块转换为 ES2015 供 Rollup 处理

**rollup-plugin-babel**，通过这个插件可以方便的使用 javascript 的新特性，但附带要安装的依赖比较多

```bash
sudo npm install --save-dev
    babel-core
    babel-plugin-external-helpers
    babel-plugin-transform-runtime
    babel-preset-env
    babel-preset-stage-2
    babel-register
	rollup-plugin-babel
```

**rollup-plugin-uglify**，用于压缩JS代码

**rollup-plugin-eslint**，用于JS代码格式检查

**rollup-plugin-replace**，用于变量替换，可以将动态设置的变量提取出来在配置文件中设置，比如版本号

**rollup-watch**，监听文件变化的插件，通过命令行参数运行即可 `rollup -c -w`

**rollup-plugin-serve** 和 **rollup-plugin-livereload**，用于开启本地服务和实时刷新页面

常见的相关配置项如下：

```javascript
import ...;
...
plugins: [
    resolve({
        module: true, // ES6模块尽可能使用 ‘module’字段
        jsnext: true,
        main: true
    }),
    commonjs({
        include: 'node_modules/**', // 包括
        exclude: [], // 排除
    }),
    replace({
        include: 'src/maths.js', // 指定可以使用变量的文件路径
        exclude: 'node_modules/**',
        ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        HOST: JSON.stringify('http://111/111')
    }),
    eslint({
        include: ['src/**/*.js'] // 需要检查的部分
    }),
    babel({
        exclude: 'node_modules/**', // 排除引入的库
        runtimeHelpers: true // 配置runtime，不设置会报错
    }),
    (process.env.NODE_ENV === 'production' && uglify()),
    serve({
        open: true, // 是否打开浏览器
        contentBase: './', // 入口HMTL文件位置
        historyApiFallback: true,
        host: 'localhost',
        port: 10001,
    }),
    livereload()
],
...
```

```js
{
    "presets": [
        ["env", {
            "modules": false,
            "targets": {
            	"browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
            }
        }],
        "stage-2"
    ],
    "plugins": ["transform-runtime", "external-helpers"],
    "env": {
        "test": {
            "presets": ["env", "stage-2"],
            "plugins": ["istanbul"]
        }
    }
}
```

以上是对应的 .babelrc 的常用配置