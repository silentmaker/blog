---
title: 'Npm冷知识'
date: '2017-01-13'
tags: ['npm', 'JSConf']
categories: ['编程']
path: '/tricks-about-npm'
---

### 用scope避免命名冲突

```bash
npm init --scope=myname
npm install @myname/mypackage
require('@myname/mypackage');
```

### 创建可复用的npm init

```javascript
// ~/.npm-init.js
module.exports = {
    version: '0.1.0',
    name: name,
    main: 'index.js',
    scripts: {
        start: 'node index.js'
    }
}
```

```bash
# ~/.npm-init.js里export的部分会插入或者合并到package.json
npm init
```

### devDependencies的用外

```bash
# 可以节约正式环境的安装依赖的时间
npm install --production
```

### npm脚本

```json
{
    "script": {
        "test": "mocha ./test/*.js",
        "start": "node ./index.js"
    }
}
```

``` bash
npm run start
# 等同于yarn start
```

### 版本管理

```bash
# 语义化版本号
npm version major - m "bump to version %s"
npm version minor
npm version patch
```

### 发布管理

```bash
# 旧方法
npm owner
# 推荐方法
npm team
npm access
# 24个小时后的取消发布会受限
# 取消发布上个版本
npm unpublish
# 取消发布某个版本
npm unpublish <package>@<version>
# 婉转点的取消发布方法是弃用
npm deprecate
```

### 安全检查 

```bash
# Node Security Project
npm install nsp -g
nsp check
```



