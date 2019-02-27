---
title: '如何实现javascript的私有变量'
date: '2018-01-26'
tags: ['javascript']
categories: ['编程']
path: '/javascript-private-variables'
---

从最简单的方式开始

```javascript
function Person(name) {
    this.getName = function() {
        return name;
    }
}
```

通常方法我们会提取到prototype中复用以节约内存

```javascript
function Person(name) {
	this._name = name;
}
Person.prototype.getName = function() {
	return this._name;
}
```

但是这样并没有达到真正私有变量的目的，只是单纯地用了命名惯例而已，于是可以算要用一个闭包才形有私有作用域

```javascript
var Person = ((function () {
    var sharedName;
    function Person(name) {
        sharedName = name;
    }
    Person.prototype.getName = function() {
        return sharedName;
    }
    return Person;
})());
```

但这些多个Person类间的name属性是共用的，可以再做一层改造

```javascript
var Person = ((function () {
    var privateData = {};
    var privateId = 0;
    function Person(name) {
        Object.defineProperty(this, '_id',{ value: privateId++ });
        privateData[this._id] = { name };
    }
    Person.prototype.getName = function() {
        return privaetData[this._id];
    }
    return Person;
})());
```

这样的实现就能基本达成目的了，但有两个问题，一个是多余的_id属性，另一个是privateData无法自动释放

另外还有三种更好的思路，但都有兼容的问题

一是使用WeakMap的key，它属于弱引用 ，在垃圾回收时不会被计数

```javascript
var privates = new WeakMap();
function Person(name) {
    const name = name; // private data
    privates.set(this, name);
}
Person.prototype.getName = function() {
    return privates.get(this);
}
module.exports = Person;
```

二是使用Symbol，一量创建后便不会重复

```javascript
var privateSymbol = new Symbol();
function Person(name) {
    this[privateSymbol] = name;
}
Person.prototype.getName = function() {
    return this[privateSymbol];
}
module.exports = Person;
```

三是使用ES7还在草案阶段的#private

```javascript
class Person {
    #name;
    constructor(name) { this.#name = name; }
}
```

