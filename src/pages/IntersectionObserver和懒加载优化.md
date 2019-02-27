---
title: 'IntersectionObserver和懒加载优化'
date: '2019-02-20'
tags: ['Javascript']
categories: ['编程']
path: '/intersection-observer-and-lazy-loading'
---

延迟加载的目的在于让用户只在他们需要时才下载他们需要的东西

比如，当用户浏览一个很多图片的页面，图片进入可见区域时才加载，可以节省带宽，并且能让网页加载更快

图片懒加载的概念已经是老生常谈了，不过以前大部分用于懒加载的库都是用滚动事件或者定时器来检查元素是否进入视区的，这类方法的问题是会可能导致浏览器重新布局和重绘，有时候还会导致卡顿

### IntersectionObserver

IntersectionObserver 是一个用于检测被观察元素何时进入或离开了浏览器视窗的Web API，大多数现代浏览器都已经支持，而且它是观察者模式的异步传调用，不会影响主线程，可以说是一个为了懒加载而生的API

为了更好地复用，我们可以通过Web Component 或者 Vue 抽取一个`<lazy-img>`组件，这里用Web Component举例：

```javascript
class LazyImage extends HTMLElement {
    static get observedAttributes() {
        // width/height可以用于保留空间，防止页面跳动
        return ['src', 'width', 'height'];
    }
    
    constructor() {
        super();
        this.loaded = false;
        this.src = null;
        this.img = new Image();
        this.img.onload = () => {
            this.loaded = true;
            // 删掉所有子元素，比如用于显示loading/title的
            for (const child of this.childNodes) 
                child.remove()
            this.appendChild(this.img);
        }
    }
    // 实际鉵发图片加载
    set visible(visible) {
        if(!this.src || !visible || this.loaded) return;
        this.img.src = this.src;
    }
    
    attributeChangeCallback(name, oldVal, newVal) {
        switch name:
            case 'src':
            	if (oldVal === newVal) break;
            	this.src = newVal;
                this.loaded = false;
                break;
             case 'width':
                this.img.style.width = this.style.width = `${newVal}px`;
                break;
             case 'height':
                this.img.style.height = this.style.height = `${newVal}px`;
                break;
    }
}

customElements.define('lazy-img', LazyImage);
```

有了组件之后，就可以写观察元素的代码了：

```javascript
const images = document.querySelectAll('lazy-img');
const io = new IntersectionObserver((entries) => {
    for (const entry of entries)
        entry.target.visible = entry.isIntersecting;
});

for (const image of images) io.observe(image);
```

如上IntersectionObserver就可以追踪所有`<lazy-img>`元素，并在图片进入视窗时加载图片

### 体验优化

不同大小的图片加载时间也不一样，为了更好的用户体验，我们还应该支持用户点击图片时马上开始加载，因为有时候可能进入视窗的事件会慢一步，另外，在浏览器空闲的时候，应该主动去加载图片，充分利用所谓的Idle时间，这也是 Google 提倡的 RAIL 模型中的一环

```javascript
for (const image of images) {
    // 订阅事件
    io.observe(image);
    
    // 点击触发加载
    image.onclick = () => {
        image.visible = true;
    }
    
    // 空闲时主动加载
    requestIdleCallback(() => {
        image.visible = true;
    });
}
```

这里用到的**requestIdleCallback**，类似于 requestAnimationFrame，传入requestIdleCallback的回调会在每一帧的空闲时间里运行，也就是除去rAF回调、浏览器repaint和其他JS业务代码占用的时间之外，利用这一小段一小段的空闲时间经常能把未进入视窗的图片也加载完，这就是在懒加载中又做到了预加载

如果把requestIdleCallback单独拎出来，并对特定图片加上优先级，因为有些内容可能会相比其他更重要，这样我们就有了带优先级的懒加载：

```javascript
requestIdleCallback(() => {
    for (const image of images) {
        if (!image.loaded && image === target) 	
            image.visible = true;
    }
    // 更通用的做法是可以抽象一个IdleQueue的任务队列来按优先级加载图片
});
```

到这里，我们就已经能实现一个比较好的懒加载效果了，不过为了确保兼容性，还要加上特性检测代码，来确定  IntersectionObserver 是否在当前浏览器中可用，如果不可用就立即加载这些图片

IntersectionObserver 还可以用来做很多其他事情，比如用于判断某人是否正在查看广告，或者 iframe 的元素是否在视区中

最后附上一篇推荐阅读：[Idle Until Urgent](https://philipwalton.com/articles/idle-until-urgent/)