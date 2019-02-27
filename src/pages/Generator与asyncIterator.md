---
title: 'Generator与asyncIterator'
date: '2018-06-26'
tags: ['Javascript']
categories: ['编程']
path: '/generator-and-async-iterator'
---

假设有一个业务场景是这样的，根据一个微博或者其他社交媒体的图片搜索接口，不停地切换展示图片，比如说不断切换微博有关于猫的图片，每张图片只展示一次，常见的思路就是分页+轮询

对于这种生成不间断的数据流的模式，其实也可以用迭代器和generator的思路来做：

```javascript
const cats = []; // 很多的猫图

function* switchCat() {
  for (const cat of cats)
    yield html`<img src="${url}" style="width:150px;height:150px;" />`;
}

while (true) switchCat();
```

switchCat 函数每执行一次，就会更换一次图片，但是这样循环还是很快就执行完毕，最后可能只看到了最后一张图片，应该让一张加载完并且展示个1s，再切换图片

我们可以再假设`for (const cat of cats)`的cat 是一个异步函数，函数执行中包括了加载图片和图片停留的逻辑，那我们就可以使用for await ... of 循环：

```javascript
async function* switchCat() {
  for await(const cat of cats)
    await loadImage(cat);
    await sleep(1000);
    yield html`<img src="${url}" style="width:150px;height:150px;" />`;
}
```

这样每次循环都会至少等待加载图片和图片停留的时间，但cats数组并不是无限的，分页接口每次只返回10张图片，那我们可以尝试让cats包含的10张图片不断更新，同时修改cats为对象，并自定义其迭代器行为：

```javascript
const cats = {
    [Symbol.asyncInterator]: async function*() {
        let page = 1
        while(true) { // 假设图片库是无限大的
            const pageData = await fetchCatImages(page);
            for (const url of pageData) yield url
            page++
        }
    }
};
```

[Symbol.asyncInterator]是对象被用于for await ... of 循环中时的回调函数，从而cats就变成了一个可以无限迭代的对象

这样的写法并不是什么最佳实践，只是从思路创新的看，我们应该还可以用语言的新特性来做很多事情

