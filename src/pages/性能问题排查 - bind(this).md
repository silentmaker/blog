---
title: '性能问题排查: bind(this)'
date: '2018-08-21'
tags: ['Javascript']
categories: ['编程']
path: '/simple-weather-effect-with-canvas'
---

在之前的博客里我提到过用Canvas实现天气效果，后面我偶然用Chrome的Performance Monitor查看这个页面的内存情况，发现切换几次天气后，CPU占用率从20%升到了90%，断定有性能效果，初步猜测是有内部自动GC没有成功

![perf monitor](/Users/maxingcong/Code/blog/src/pages/images/performance-bind-this.png)

可以看到内存占用并没有什么变化，也就是说并不是粒子的对象没有被回收的问题，不然应该也会有出现内存阶梯上升的情况，从 Rendering - FPS Meter上也可以看到切换几次天气之后，出现了掉帧的情况，它是发现动画性能问题的最简单直观的工具

确定问题存在以后，还是搬出万能的帧分析工具，通过Performance录制切换动画效果的那10秒时，具体看看每一帧里做的事情是否有不同

![Perf Record](/Users/maxingcong/Code/blog/src/pages/images/function-call-problem.png)

可以看到，切换了四种天气后，每种天气的paint方法还在执行，问题也就归咎到了这两行：

```javascript
this.paint = this.paint.bind(this);
requestAnimationFrame(this.paint);
```

paint方法作为requestAnimationFrame的回调，其实相当于被引用到了全局作用域，因此在切换天气，也即创建新的天气实例的时候，要显式地进行引用清除来保证GC的正常工作，我增加一个destroy方法和destroyed属性，打断了requestAnimationFrame的循环调用

![perf result](/Users/maxingcong/Code/blog/src/pages/images/perf-result.png)

![perf result](/Users/maxingcong/Code/blog/src/pages/images/perf-result-2.png)

可以看到效果马上回到的理论上的合理范围，在CPU占用低的同时保证了完美的60FPS