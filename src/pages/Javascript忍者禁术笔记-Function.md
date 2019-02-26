---
title: 'Javascript忍者禁术笔记-Function'
date: '2017-04-13'
tags: ['javascript']
categories: ['编程']
path: '/javascript-ninja-function'
---

#### 函数的特性

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

#### 创建函数

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

