---
title: 'bind、call和apply原理'
date: '2019-03-02'
tags: ['Javascript']
categories: ['编程']
path: '/how-js-bind-call-apply-works'
---

### 基本区别

在Javascript中，bind、apply 和 call 都可以用来指定函数执行的上下文，也就是修改函数中this的指向，区别在于，bind返回的是一个新函数，需要被调用才会执行，而apply和call则直接返回函数执行的结果，apply和call的区别是，apply支持两个参数，第二个参数是函数执行所用的参数组成的数组，call支持不定个函数，第二个参数开始对应函数执行时的第一个参数，bind也支持不定个函数，效果和call类似

### 实现原理

**Function.prototype.bind**

bind可以通过依赖apply的实现来实现：

```javascript
Function.prototype.bind = function (scope) {
    var fn = this;
    return function () {
        return fn.apply(scope);
    };
}
```

**bind的使用场景**

生成DOM事件回调函数

```javascript
// 通常写法
document.querySelector('button').addEventListener('click', function(){
    logger.updateCount();
});
// bind写法
document.querySelector('button').addEventListener('click', logger.updateCount.bind(logger));
```

用作 setTimeout 或 setInterval 或 rAF 的回调

```javascript
{
    // ...
    render: function () {
        this.$el.html(this.template());
        setTimeout(this.afterRender.bind(this), 0);
    }
    // ...
}
```

用于特定函数的别名或者简写

```javascript
const unboundForEach = Array.prototype.forEach,
const forEach = Function.prototype.call.bind(unboundForEach);
// forEach可用于循环所有类数组的对象，如遍历NodeList以添加事件
forEach(document.querySelectorAll('.items'), function (el) {
    el.addEventListener('click', someFunction);
});
```

**bind的垫片实现**

MDN提供的推荐实现(依赖slice、concat和call的实现)

```javascript
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // 最接近ES5内部函数 IsCallable 和实现的做法
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          return fToBind.apply(this instanceof fBound
                 ? this
                 : oThis, // fBound被当做new的构造函数调用
                 aArgs.concat(Array.prototype.slice.call(arguments))); 
                 // 获取调用时(fBound)的传参
        };

    // 维护原型关系
    if (this.prototype) { // 检测原型，Function.prototype没有prototype属性
      fNOP.prototype = this.prototype;
    }
    // 使fBound.prototype是fNOP的实例
    // 从而返回的fBound若作为new的构造函数
    // new生成的新对象的__proto__就是fNOP的实例
    fBound.prototype = new fNOP();

    return fBound;
  };
}
```

这里还有一个不依赖call或者apply的实现：[Raynos/function-bind](https://github.com/Raynos/function-bind/blob/master/implementation.js)

**Function.prototype.call**

实现call函数的前提是不能有副作用，也就是对所指定的对象有不必要的修改，也不能使函数本身产生变更，那我们可以尝试通过给对象加一个临时的属性，执行函数后再删除这个属性，属性名要尽量唯一，避免命名冲突，可以通过Symbol或者Math.random实现

最后函数的执行一般能过Function或者eval来实现，以保证结果是一次性的

```javascript
Function.prototype.call = function(someOtherThis) {
  someOtherThis = someOtherThis || global;
  var uniqueID = "00" + Math.random();
  // 确保属性名唯一
  while (someOtherThis.hasOwnProperty(uniqueID)) {
    uniqueID = "00" + Math.random();
  }
  someOtherThis[uniqueID] = this;
  const args = [];
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push("arguments[" + i + "]");
  }
  // 这里args会自动调用toString函数
  var result = eval("someOtherThis[uniqueID](" + args + ")");
  // 删除临时属性
  delete someOtherThis[uniqueID];
  return result;
};
```

不过以上这个实现中，操作都是一次性的，若是在循环中被调用的话，得到的结果有可能和预期不一样

**Function.prototype.apply**

类似call的实现，apply可以这样实现

```javascript
Function.prototype.apply = function(someOtherThis, arr) {
  someOtherThis = someOtherThis || global;
  var uniqueID = "00" + Math.random();
  while (someOtherThis.hasOwnProperty(uniqueID)) {
    uniqueID = "00" + Math.random();
  }
  someOtherThis[uniqueID] = this;

  var args = [];
  var result = null;
  if (!arr) {
    result = someOtherThis[uniqueID]();
  } else {
    for (let i = 1, len = arr.length; i < len; i++) {
      args.push("arr[" + i + "]");
    }
    result = eval("someOtherThis[uniqueID](" + args + ")");
  }

  delete someOtherThis[uniqueID];
  return result;
};
```

和上面call的区别主要只是参数的传递和获取不同，没有传参时可以直接通过对象方法来调用

通常，bind、apply 和 call 只需实现apply，然后bind和call的实现可以转化为对apply的调用，同理只实现call也是可以的