---
title: 'JS的模块系统'
date: '2017-01-19'
tags: ['javascript']
categories: ['编程']
path: '/js-module-system'
---

##### CommonJS模式

```javascript
module.exports = () => {
    return { a: 1 };
};
require('moduleA');
```

CommonJS是Node的主要模块机制，从设计的出发点就是考虑了服务端开发，关键字只有require和module.exports，exports是一个特殊属性，所有对它的赋值都会被export出去

其优点在于简单，模块可以按需按序加载，同时也支持循环依赖

而其缺点在于，同步的API设计使其不适合客户端的很多异步场景，在浏览器里使用需要loader或者转译，模块只能是一个文件，不适用于静态代码分析器

##### AMD模式

Asynchronous Module Definition，比如require.js和Dojo.js，不互相依赖的模块可以同时加载，加载速度更快

```javascript
define(['dep1', 'dep2'], function() {
 	// 通过函数的返回来定义模块
    return function() {};
});
// 或者
define(function(require) {
    var dep1 = require('dep1');
    var dep2 = require('dep2');
    return function() {};
});
```

这个机制的优点主要是异步加载，兼容CommonJS，并且支持多文件模块，缺点主要是语法上复杂一点，使用时需要loader或者转译，同样不适用于静态代码分析器

##### CMD模式

CMD是另一种模块化方案，它与AMD很类似，不同点在于 AMD 推崇依赖前置、提前执行，CMD推崇依赖就近、延迟执行

```javascript
// AMD
define(['a', 'b', 'c'], function() {
 	if (false) b.doSth(); // 即使调用永远不会执行，b模块还是执行了
    return function() {};
});
// CMD
define(function(require, exports, module) {
    var a = require('a');
    a.doSth();
    if (false) {
    	var b = require('b');
        b.doSth();
    }
    return function() {};
});
// Sea.js 定义模块 math.js
define(function(require, exports, module) {
    var $ = require('jquery.js');
    var add = (a, b) => a + b;
    module.exports = add;
});
// Sea.js 引用模块
seajs.use(['math.js'], function(math) {
    var sum = math.add(1, 2);
});
```

##### ES2015 Module

```javascript
// lib.js
export const sqrt = Math.sqrt;
export const square = (x) => x * x;
// main.js
import { sqrt, square } from 'lib.js';
import('lib.js').then(module => module.squqre(2)).catch(err => {});
```

ES2015是规范化的模块方案，语法简单且合理，支持静态代码分析工具，同时支持同步和异步加载，也支持循环引用 ，缺点主要是还没有被普遍支持

**与CommonJS的区别：**

- ES2015输出的是动态引用 ，且不会缓存值，被加载时才去模块里取值，而CommonJS输出的是值的拷贝，原模块的变更不会影响之后的执行；
- CommonJS是运行时加载，最后加载的是整个模块对象，即module.exports，只有在脚本运行完时才会生成，而ES6模块不是对象，只是静态定义，属于编译时加载，在代码静态解析阶段就会完成；
- 如果出现循环引用，对于CommonJS，一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出；而ES6模块根本不会关心是否发生了"循环加载"，只是生成一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值

```javascript
// a.js
import { bar } from 'b.js';
export foo() {
    bar();
}
foo();
// b.js
import { foo } from 'a.js';
export bar() {
    foo();
}
```

按照CommonJS的标准，a先加载b，然后b又加载a，这时a还没有任何执行结果，所以输出结果为null，即对于b.js来说，变量foo的值等于null，后面的foo()就会报错