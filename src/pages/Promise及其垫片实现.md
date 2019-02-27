---
title: 'Promise及其垫片实现'
date: '2017-09-06'
tags: ['javascript']
categories: ['编程']
path: '/a-tiny-promise-polyfill'
---

Promise 是异步编程的一种解决方案，比传统的解决方案 - 函数回调和事件，更合理和更强大，最早是由社区提出和实现的，后来ES6 将其写进了语言标准，统一了用法，提供了原生`Promise`对象

所谓`Promise`，简单说保存着某个未来才会结束的事件（通常是一个异步操作）的结果和对应操作的流程，它提供统一的 API，各种异步操作都可以用同样的方法进行处理。

一个`Promise`对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和`rejected`（已失败）其结果状态只有一种，其他操作无法改变这个状态，这也是`Promise`这个名字的由来，表示无法改变的“承诺”

`Promise`对象的状态改变方向只有两种：从`pending`变为`fulfilled`和从`pending`变为`rejected`，然后状态就会一直保持这个结果，这时就称为 resolved（已定型），这时候再对`Promise`对象添加回调函数，也只会立即得到这个结果

有了`Promise`对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数，一个最小的ES5 Promise实现如下

```javascript
function Promise() {
    this._thens = [];
}
Promise.prototype = {
    then: function(resolve, reject) {
        // 经过数组存储回调栈模拟异步
        this._thens.push({ resolve, reject });
    },
    resolve: function(val) {
        this._complete('resolve', val);
    },
    reject: function(err) {
        this._complete('reject', err);
    },
    _complete: function(type, arg) {
        // 将异步的then改为同步执行
        this.then = type === 'resolve' ?
            function(resolve, reject) { resolve(arg); } :
        	function(resolve, reject) { reject(arg); };
        // 防止多次调用resolve和reject
        this.resolve = this.reject = function() { throw new Error('Compeleted!'); }
        let aThen, i = 0;
        while (aThen = this._thens[i++]) { aThen[type] && aThen[type](arg); }
        delete this._thens;
    }
};
```

此外，`Promise`对象提供统一的接口，比如Promise.all、Promise.race和Promise.finally等，使得控制异步操作更加容易

业界公认比较好的promise polyfill 实现有 bluebird, rsvp.js 及其子集 es6-promise