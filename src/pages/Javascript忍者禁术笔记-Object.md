---
title: 'Javascript忍者禁术笔记-Object'
date: '2017-04-15'
tags: ['javascript']
categories: ['编程']
path: '/javascript-ninja-object'
---

### 原型链

原型是JS中的一个基本概念，所有的对象包括Object、Function、Array和Map等都有原型，原型能过prototype的引用指用其他对象，从而形成了原型链，对象的属性和方法可以通过原型链委托给其他对象，从而使得JS具有了模拟继承的能力

![Searching Property](F:\projects\blog\src\pages\images\property-search.png)

可以能过直接赋值Obj.prototype和Object.setPrototypeOf 来修改对象的原型，在JS运行时环境中，JS引擎通过对象实例的[[prototype]]属性追踪原型链，如下图是将Person函数指定为Ninja函数的原型：

![Object Prototype](F:\projects\blog\src\pages\images\object-prototype.png)

### 属性描述符

对于对象的一个具体属性，都会有对应的属性描述符：

- configurable，为false时，属性描述符不可修改，并且属性不可删除
- enumerable，为false时，属性是不可枚举的，不会出现在for...in循环里
- value，指定属性的值，默认为undefined
- writable，为false，属性不可以重新赋值
- get，访问属性用的回调函数，不可与value和writable冲突
- set，设置属性用的回调函数，不可与value和writable冲突

正常地直接赋值时，比如`ninja.name = "Yoshi";`，name对应的属性描述符情况是，configurable、writable和enumerable为true，value为"Yoshi"，get和set为undefined

而执行`var ninja = new Ninja`的时候，会执行Ninja.constructor来生成新对象，ninja.constructor 会等于 Ninja，但是如果先将new Person()设为Ninja的原型，ninja.constructor 会变成 Person，因为实例才有的constructor属性始终指向的是创建本身的构造函数，这时如果显式地去调用Ninja实例的构造函数来生成对象就只能得到Person对象，可以通过属性描述符来防止construtor被覆盖的问题：

```javascript
function Person() {}
Person.prototype.dance = function() {};

function Ninja() {}
Ninja.prototype = new Person();

Object.defineProperty(Ninja.prototype, "constructor", {
    enumerable: false,
    value: Ninja,
    writable: true
});
var ninja = new Ninja();
for (let prop in Ninja.prototype) {} // 只能枚举出dance
```

对象的静态方法是不用实例化也可以调用的方法：

```javascript
class Ninja {
    constructor() {}
    static compare(ninja1, ninja2) {
        return ninja1.level - ninja2.level;
    }
}
// ES5 写法
function Ninja() {}
Ninja.compare = function() {};
```

### 计算属性和私有属性

get/set 只能通过 Object.defineProperty 或者对象字面量来定义，可以用于实现computed属性：

```javascript
const ninjaCollection = {
    ninjas: ["Yoshi", "Kuma"],
    get firstNinja() {
        return this.ninjas[0];
    },
    set firstNinja(name) {
        this.ninjas[0] = name;
    }
};
```

也可以用于实现私有属性：

```javascript
function Ninja {
    let _level = 0;
    Object.defineProperty(this, 'level', {
        get: () => {
            return this._level;
        },
        set: (val) => {
            this._level = val;
        }
    });
};
```

JS中的特殊对象如Array、Map、Set 和 Proxy 等可以参见 MDN



