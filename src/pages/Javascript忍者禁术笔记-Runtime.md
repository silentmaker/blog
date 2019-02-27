---
title: 'Javascript忍者禁术笔记-Runtime'
date: '2017-04-10'
tags: ['javascript']
categories: ['编程']
path: '/javascript-ninja-runtime'
---

### 运行机制

javascript是解释型语言，采用JIT(Just In Time)机制，运行用机器码并不是提前生成的(AOT, Ahead Of Time)，这是与C等编译型语言的主要不同之一，javascript还具有很多独特的语言特性：

- 函数作为一等公民
- 函数闭包
- 基于原型的面向对象

### 运行环境

在客户端和服务端的运行环境有所不同

![Runtime](/Users/maxingcong/Code/blog/src/pages/images/runtime-difference.png)

### Web应用的生命周期

![Life Cycle](/Users/maxingcong/Code/blog/src/pages/images/webapp-lifecycle.png)

基本分成两步：Page Building 阶段和 Event Handling 阶段

### Page Building 阶段

在 Page Building 阶段主要做两件事： 

1 解析HTML并构建DOM 

2 遇到script标签时，运行 Javascript 代码 

浏览器在有需要的情况下会不停在1和2间切换

![DOM Building](/Users/maxingcong/Code/blog/src/pages/images/dom-endurance.png)

同时，浏览器会自动容错，构建可用的DOM

### Event handling阶段

![Event Handling](/Users/maxingcong/Code/blog/src/pages/images/event-handling.png)

这个阶段有很多种事件可能会被触发：浏览器事件(如load)，网络事件(如ajax)，用户事件(如click)，定时器事件(如setTimeout)等，用户和服务器生成的事件通常放在同个队列里依次执行，绑定事件的方法一般是对特殊属性(如onload)赋值或者使用addEventListener方法

