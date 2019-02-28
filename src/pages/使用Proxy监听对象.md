---
title: '使用Proxy监听对象'
date: '2017-05-25'
tags: ['Javascript']
categories: ['编程']
path: '/using-proxy-to-monitor-object'
---

Proxy是一种特殊对象，可以用于代理其他对象的操作，或者说拦截了对其他对象的操作，从而可以实现对对象的监听，添加自定义逻辑，或者进行日志记录或者性能测试等操作

```javascript
const person = { name: "elvin" };
const agent = new Proxy(person, {
    get: (target, key) => {
        console.log('reading', key);
        return key in target ? target[key] : '404'
    },
    set: (target, key, value) => {
        console.log('writing', key);
        target[key] = value;
    },
});
```

Proxy可以代理以下事件：

- apply，当调用函数的时候激活
- construct，当通过 new 操作符调用函数的时候激活
- get/set，当读写属性的时候激活
- enumerate，出现在for...in循环中的时候激活
- getPrototypeOf/setPrototypeOf，当读写原型的时候激活

不过有些操作是不能覆盖的，比如使用 ===/==，instanceof/typeof 等操作符的时候

##### 性能监控

我们可以通过 Proxy 来复写函数，来记录调用的时间消耗：

```javascript
function isPrime() {
    // 判断素数
}

isPrime = new Proxy(isPrime, {
    apply: (target, thisArg, args) => {
        console.time("isPrime");
        const result = target.apply(thisArg, args);
        console.timeEnd("isPrime");
        return result;
    }
});

isPrime(123124545);
```

### 自动生成嵌套

假设我们要在一个空对象里给一个多层嵌套的属性赋值，通常我们会用reduce方法写一个deepSet之类的方法，但通过Proxy，我们可以得到一个本身就直接支持嵌套赋值的对象：

```javascript
function Folder() {
    return new Proxy({}, {
        get: (target, property) => {
            if (!(property in target)) {
                target[property] = new Folder();
            }
            return target[property];
        }
    });
}

const folder = new Folder();
folder.a.b.c.d.e = 'f';
```

### 模拟负索引

通过Proxy可以让数组支持负数的索引，让数组从后面往前面找值：

```javascript
function createNegativeArray(array) {
    if (!Array.isArray(array)) throw new TypeError('Expected Array');
    
    return new Proxy({}, {
        get: (target, index) => {
            index = +index // 把属性值转为数字
            return target[index >= 0 ? index : target.length + index];
        },
        set: (target, index, value) => {
            index = +index // 把属性值转为数字
            target[index >= 0 ? index : target.length + index] = value;
        },
    });
}
```

不过这样得到的数组在性能上，要比正常的数组慢一点，因为增加了Proxy拦截和索引计算的时间，如果频繁地读写数组，时间消耗可能会相差几倍