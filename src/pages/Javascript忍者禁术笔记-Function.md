---
title: 'Javascript忍者禁术笔记-Function'
date: '2017-04-13'
tags: ['javascript']
categories: ['编程']
path: '/javascript-ninja-function'
---

### 函数的特性

函数可以看作一种特殊的对象，可以赋值给变量，也可以作为同步或者异步的回调，同时也可以具有属性，可以记录执行的结果

```javascript
function isPrime(value) {
    if (!isPrime.answers) isPrime.answers = {};
    if (isPrime.answers[value] !== undefined) return isPrime.answers[value];
    var prime = value !== 1; // 1不是素数
    for (var i = 2; i < value; i++) {
        if (value % i === 0) {
            prime = false;
            break;
        }
    }
    return isPrime.answers[value] = prime; // 存储计算结果
}
```

创建函数的方法有很多，function声明、箭头函数、Function构造器、generator函数，函数可以作为其他函数的返回

### 创建函数

IIFE(Immediately Invoked Function Expression)，函数声明可以在创建后立即执行，形成匿名作用域

```
(function(val){})(value);
```

可以使用参数默认值，也可以使用解构符代表不定参数

```javascript
function multiMax(first, ...remain) {
    var sorted = remain.sort(function(a, b) {return b - a;});
    return first * sorted[0];
}
```

### 调用函数

调用函数有4种方式：

1. 直接调用func()
2. 作为对象方法调用，如
3. 作为constructor调用，比如，new Ninja()
4. 通过apply/call调用，比如func.call(ninja)

1的方式下this的指向一般是全局对象，如window或者global，2的情况下this指向调用方法的对象，而3的情况下，new操作符会导致生成一个空对象做为函数执行的上下文，4的方式则可以指定特定对象作为执行上下文，apply只接收两个参数，第二个参数是传入需调用函数的参数数组，而call接收不定个参数，第二个开始的参数作为调用函数的第一个开始的参数

### 作用域链

JS引擎如何追踪代码中的所有函数执行上下文和返回位置呢

首先代码可以会两种块，一种是全局代码，另一种是函数代码，因此执行环境也可以分成唯一的全局作用域和各个函数的内部作用域，然后通过调用栈来记录执行的环境和顺序，可以在断点调试的时候通过 Chrome Devtool 的 Source Panel 中的Call Stack来查看

不管函数的调用有几层嵌套，在JS引擎中都会形成最后一级的函数作用域到全局作用域的一个调用栈，形成了作用域链，因为JS是单线程的，因此在主线程上只会有一个Call Stack，如果递归函数的结束条件没有写好，会导到栈溢出

变量的查找也通过栈来完成，当前作用域中未找到声明的函数会一级级地沿作用域链向上查询，直到全局作用域

![Resolving Variables](F:\projects\blog\src\pages\images\resolve-variable.png)

### 特殊函数 Generators

generator是可以实现执行上下文暂停和恢复的一种特殊函数，调用generator，返回的是一个迭代器iterator，函数会执行至yield语句后暂停，下一次调用时又从暂停的地方开始执行，执行完最后的yield后的调用会返回undefined，generatora的函数声明使用function*

```javascript
// 通过generator生成一系列值
function* ValueGenerator() {
    yield "a";
    yield "b";
    yield "c";
}
for (let val of ValueGenerator) console.log(val);
```

generator的原型上有next、send和close方法：

```javascript
function fibonacci() {
  var a = yield 1;
  yield a * 2;
}

var it = fibonacci();
console.log(it);          // "Generator {  }"
console.log(it.next());   // 1
console.log(it.send(10)); // 20
console.log(it.close());  // undefined
console.log(it.next());   // 抛出StopIteration错误
```

genrator中，yield也可以返回promise，可以配合async/await来使用，实现复杂的异步控制流

