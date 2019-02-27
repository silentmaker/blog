---
title: '用Canvas实现简单的天气效果'
date: '2018-08-11'
tags: ['Javascript']
categories: ['编程']
path: '/simple-weather-effect-with-canvas'
---

最近在 Paul Levis 的 Youtube 频道更新了他关于如何实现下雪效果的视频，心血来潮就将他的做法拓展了一下，简单实现了下 Rainy、Snowy、Starry 和 Cloudy 四种天气

Demo 的传送门在这里：[Weather Canvas](https://silentmaker.github.io/weather-canvas/)

![weather canvas](/Users/maxingcong/Code/blog/src/pages/images/weather-canvas.jpg)

其实这几种效果都是动画里很常见的一类，粒子系统 Particle System，也就是关于一定数量的点的动画

对于canvas动画来说，基本原理其实就是利用requestAnimationFrame在每一帧渲染的时候做几件事件：清空整块画板 - 重新计算所有粒子的位置 - 绘制所有粒子，每个粒子可以通过一个对象来维护，它们可以具有自己的位置、速度和大小

在这里我把四种天气分为4个JS文件：Rainy.js、Snowy.js、Starry.js 和 Cloudy.js，每个文件中有两个类，其实是下面的抽象类的具体实现，设计模式上可以归到模板模式：

```javascript
class Particle {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.reset();
  }
  // 初始化位置
  reset() {}
  // 重新计算位置
  update() {}
  // 绘制
  draw() {}
}

export default class Particles {
  constructor({ context }) {
    this.context = context;
    this.particles = [];
    this.paint = this.paint.bind(this);
    this.destroy = this.destroy.bind(this);
    this.createParticles();
    requestAnimationFrame(this.paint);
  }
  // 初始化粒子
  createParticles() {}
  // 动画循环
  paint() {
      this.particles.map(particle => {
          particle.update();
          particle.draw();
      });
    requestAnimationFrame(this.paint);
  }
}
```

每种天气需要的粒子的特征不同，所以差别就主要在于粒子类的update方法和draw方法，比如雪和雨的飘落速度方向不同，星星不需要有速度，但是需要有大小变化来实现闪烁效果

另外我写了一个基于Vue的Weather组件，通过命令模式来切换天气，关键代码如下：

```javascript
  ...
  watch: {
    type: 'init',
  },
  methods: {
    init() {
      this[this.type]();
    },
    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    },
    windy() {
      this.weather = new Snowy({ context: this.context });
    },
    rainy() {
      this.weather = new Rainy({ context: this.context });
    },
    cloudy() {
      this.weather = new Cloudy({ context: this.context });
    },
    foggy() {
      this.weather = new Snowy({ context: this.context });
    },
    starry() {
      this.weather = new Starry({ context: this.context });
    },
    snowy() {
      this.weather = new Snowy({ context: this.context });
    },
  },
  ...
```

Windy 和 Foggy 虽然也是开始就想到的，但还想不清效果应该是什么样，后面再补上