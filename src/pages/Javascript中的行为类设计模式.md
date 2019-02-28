---
title: 'Javascript中的行为类设计模式'
date: '2017-08-10'
tags: ['Javascript']
categories: ['编程']
path: '/javascript-behavioral-design-pattern'
---

设计模式有很多种，最早四人帮的书提出设计模式的时候总结了23种设计，加上后来其他开发者对这个基础上的变形和创新，一些讲JS设计模式的书里会有4、50种设计模式，抛开框架模式不说的话，大体可以分为下面三种：

- 创建类设计模式

用于处理对象创建机制，基本上通过控制对象的创建过程来解决问题

比如，构造函数模式、工厂模式、原型模式和单模式。

- 结构类设计模式

这类模式与对象的组合有关，主要有助于结合或重组一个或多个部件，而不影响整个系统，换句话说，它们有助于在不篡改现有功能的情况下获得新的功能

比如，适配器模式、复合模式、装饰模式、外观模式、轻量模式和代理模式。

- 行为类设计模式

这类模式涉及改善不同对象之间的通信，比如链式模式、命令模式、调解模式、观察者模式、状态模式、策略模式和模板模式

下面主要总结下行为类设计模式：

### 链式模式

链式模式的一个很好的例子是DOM中的事件冒泡，事件通过一系列嵌套的DOM元素传播，其中任意一个元素都可能有带有相应事件的监听器

如下，我们创建了一个类Sum，并传值实例化，它有一个方法Add，将传递的值添加到对象的和属性，并返回对象本身，以允许添加方法调用链接，这也是JQuery中可以看到的一种常见模式，几乎所有调用jQuery对象的方法都返回一个jQuery对象，以便方法调用可以链接在一起。

```javascript
class Sum {
  constructor(initial = 0) {
    this.sum = initial;
  }

  add(value) {
    this.sum += value;
    return this;
  }
}

const sum1 = new Sum();
console.log(sum1.add(10).add(2).add(50).sum); // 62
```

### 命令模式

其目的是把动作或操作封装为对象，通过分离请求操作的对象和执行实际处理的对象来达到系统和类的松散耦合

用过Redux其实就已经接触过命令模式了，每个action其实都是封装了的操作，从而可以重做或撤消，使得time travel型的调试方法成为可能

如下我们有一个特殊的类，它具有多个方法和一个命令类，命令类封装了要执行的操作，同时命令类还可以跟踪执行的所有命令，这些命令可用于扩展其功能，比如撤消和重做操作

```javascript
class SpecialMath {
  constructor(num) {
    this._num = num;
  }

  square() { // 操作封装的具体实现
    return this._num ** 2;
  }

  cube() {
    return this._num ** 3;
  }

  squareRoot() {
    return Math.sqrt(this._num);
  }
}

class Command {
  constructor(subject) {
    this._subject = subject;
    this.commandsExecuted = []; // 记录执行历史
  }
  execute(command) {
    this.commandsExecuted.push(command);
    return this._subject[command](); // 调用对应操作
  }
}

const x = new Command(new SpecialMath(5));
x.execute('square');
x.execute('cube');

console.log(x.commandsExecuted); // ['square', 'cube']
```

### 调解模式

中介模式封装了对象之间的相互作用，通过使对象彼此相互引用来促进松散耦合

如下，我们通过ControlTower作为控制飞机间相互影响的调解人，所有的Plane都通过ControlTower.register 来注册，同时ControlTower还负责接收和查询所有Plane的坐标

```javascript
class ControlTower {
  constructor() {
    this._airplanes = [];
  }

  register(airplane) { // 注册Plane的同时Plane也保存对ControlTower的引用
    this._airplanes.push(airplane);
    airplane.register(this);
  }

  requestCoordinates(airplane) {
    return this._airplanes.filter(plane => airplane !== plane).map(plane => plane.coordinates);
  }
}

class Airplane {
  constructor(coordinates) {
    this.coordinates = coordinates;
    this.controlTower = null;
  }

  register(controlTower) {
    this.controlTower = controlTower;
  }

  requestCoordinates() {
    if (this.controlTower)
      return this.controlTower.requestCoordinates(this);
    return null;
  }
}

// usage
const tower = new controlTower();

const airplanes = [new Airplane(10), new Airplane(20), new Airplane(30)];
airplanes.forEach(airplane => {
  tower.register(airplane);
});

console.log(airplanes.map(airplane => airplane.requestCoordinates())) 
// [[20, 30], [10, 30], [10, 20]]
```

### 观察者模式

这个估计是最常见的行为类设计模式了，它定义了对象之间的一对多依赖关系，每当发布者改变其状态时，所有其他订阅者都自动被通知，并对应地更新，所以也称。这也被称为发布/订阅模式或者事件调度模式，addEventListener 就是这个模式中的典型

如下，我们用写一个Subject类，提供subscribe、unsubscribe和fire方法，fire 方法则遍历已订阅的对象来调用其update方法：

```javascript
class Subject {
  constructor() {
    this._observers = [];
  }

  subscribe(observer) {
    this._observers.push(observer);
  }

  unsubscribe(observer) {
    this._observers = this._observers.filter(obs => observer !== obs);
  }

  fire(change) {
    this._observers.forEach(observer => {
      observer.update(change);
    });
  }
}

class Observer {
  constructor(state) {
    this.state = state;
    this.initialState = state;
  }

  update(change) {
    let state = this.state;
    switch (change) {
      case 'INC':
        this.state = ++state;
        break;
      case 'DEC':
        this.state = --state;
        break;
      default:
        this.state = this.initialState;
    }
  }
}

const sub = new Subject();

const obs1 = new Observer(1);
const obs2 = new Observer(19);

sub.subscribe(obs1);
sub.subscribe(obs2);

sub.fire('INC');

console.log(obs1.state); // 2
console.log(obs2.state); // 20
```

### 状态模式

有时候我们需要让对象根据其内部状态的变化来改变其行为，我们可以封装一组提供特定状态下行为逻辑的对象，每个对象都代表了一种特定的状态

如下是一个TrafficLight类，模拟了交通灯根据其内部状态改变行为，状态列表是GreenLight或RedLight类的对象实例

```javascript
class TrafficLight {
  constructor() {
    this.states = [new GreenLight(), new RedLight()];
    this.current = this.states[0];
  }

  change() {
    const totalStates = this.states.length;
    let currentIndex = this.states.findIndex(light => light === this.current);
    if (currentIndex + 1 < totalStates) this.current = this.states[currentIndex + 1];
    else this.current = this.states[0];
  }

  sign() {
    return this.current.sign(); // 调用对应状态函数的行为方法
  }
}
class Light {
  constructor(light) {
    this.light = light;
  }
}
class RedLight extends Light {
  constructor() {
    super('red');
  }

  sign() {
    return 'STOP';
  }
}
class GreenLight extends Light {
  constructor() {
    super('green');
  }

  sign() {
    return 'GO';
  }
}
// usage
const trafficLight = new TrafficLight();

console.log(trafficLight.sign()); // 'GO'
trafficLight.change();

console.log(trafficLight.sign()); // 'STOP'
trafficLight.change();

console.log(trafficLight.sign()); // 'GO'
```

### 策略模式

策略械是指通过定义了一系列算法并将封装起来，然后在运行时调用者可以自由地交换策略

如下，我们定义一个Commute类，同时用Bus、Taxi和PersonalCar来封装所有可能的出行策略，在运行时我们可以通过Commute.travel来更换出行方法

```javascript
class Commute {
  travel(transport) {
    return transport.travelTime();
  }
}

class Vehicle {
  travelTime() {
    return this._timeTaken;
  }
}

// 策略1
class Bus extends Vehicle {
  constructor() {
    super();
    this._timeTaken = 10;
  }
}

// 策略2
class Taxi extends Vehicle {
  constructor() {
    super();
    this._timeTaken = 5;
  }
}

// 策略3
class PersonalCar extends Vehicle {
  constructor() {
    super();
    this._timeTaken = 3;
  }
}

// usage
const commute = new Commute();

console.log(commute.travel(new Taxi())); // 5
console.log(commute.travel(new Bus())); // 10
```

### 模板模式

模板模式是指，先定义算法的骨架，将具体的实现步骤放到子类，允许子类重新定义算法的某些步骤而不改变算法的外部结构，类似 Java 中的 implements，这里就不举例说明了
