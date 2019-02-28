---
title: 'JS里的严格模式'
date: '2016-11-19'
tags: ['Javascript']
categories: ['编程']
path: '/js-strict-mode'
---

```javascript
"use strict";
```

- 变量未定义会报错

```javascript
x = 1;
```

- 删除一个变量/函数/函数参数的时候会报错

```javascript
delete x;
```

- 重复定义对象属性/函数参数会报错

```javascript
var obj = { p1: 1, p1: 2 };
function func(p1, p1) {}
```

- 使用八进制字面量和转义符会报错

```javascript
var x = 010;
var y = \010;
```

- 删除只读属性会报错，非strict模式下会静默失败

```javascript
var obj = {};
obj.defineProperty(obj, 'x', { value:0, wirtable: false });
obj.x = 1;
```

- 赋值只有getter的属性会报错，非strict模式下会静默失败

```javascript
var obj = { get x() {return 0;} };
obj.x = 1;
```

- 删除不可删除的属性也会报错

```javascript
delete Object.prototype
```

- 保留字eval和arguments等不可作为变量名

```javascript
var eval = 1;
var arguments = [];
```

- 使用with表达式会报错

```javascript
with (Math) { x = cos(2); }
```

- 使用eval创建变量也会报错

```javascript
eval("var a = 1;");
alert(a);
```

