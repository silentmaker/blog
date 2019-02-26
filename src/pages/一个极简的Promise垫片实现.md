---
title: '一个极简的Promise垫片实现'
date: '2017-09-06'
tags: ['javascript']
categories: ['编程']
path: '/a-tiny-promise-polyfill'
---

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

