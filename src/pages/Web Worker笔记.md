---
title: 'Web Workers笔记'
date: '2018-06-26'
categories: ['编程']
path: '/web-workers-notes'
---

**Worker** 是在 Javascript 中实现多线程的一种方法，通常用于进行耗时/次要的任务，可以提高计算速度，并且达到不阻塞UI的目的

在 Web Workers API 中，Worker可以分为 *dedicated Woker*，*SharedWorker* 和 *ServiceWorker*，
其 constructor 为分别为 *Worker*，*SharedWorker* 和 *ServiceWorker*，并且都基于 *AbstractWorker* 实现，
其 scope 分别为 *DedicatedWorkerGlobalScope*，*SharedWorkerGlobalScope* 和 *ServiceWorkerGlobalScope*，并且都基于 *WorkerGlobalScope* 实现

### Worker

在同源策略下，Worker也可以创建Worker，不过目前在 Blink/WebKit 等内核中还没有实现

主线程与Worker线程之间通过很简单的方式通信，核心代码如下

```javascript
// main.js
if (window.Worker) {
    const myWorker = new Worker('worker.js')
    const data = {}

    myWorker.postMessage(data)
    myWoker.onmessage = function (e) {
        const result = e.data.result
    }
}

// worker.js
this.onmessage = function (e) {
    this.postMessage(computed(e.data))
}
```

Worker 继承了 EventTarget，并且实现了AbstractWorker的属性和方法：
* AbstractWorker.onerror
* Worker.onmessage
* Worker.onmessageerror
* Worker.postMessage()
* Worker.terminate()

Worker 可访问的全局变量（大多继承自WorkerGlobalScope，并且只读）：
* self
* navigator
* location
* console
* caches
* indexedDB
* atob/setTimeout/setInterval
* XMLHttpRequest (responseXML和channel属性会一直为null)
* ...

Worker 没有浏览器上下文，故没有 window/document/parent 等全局变量，详细列表可见：https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Functions_and_classes_available_to_workers

### SharedWorker

SharedWorker 是一种特殊的 Worker，在同源策略下，可以从 windows，iframes 和 workers 等不同的上下文中访问到

SharedWorker 的通信机制和Worker类似，但比Worker多了一层port，在其他上下文中，通过 port.postMessage() 和 port.onmessage 来传递数据，通过 port.start() 来建立连接，而在worker内，则通过SharedWorkerGlobalScope.onconnect 来监听连接请求

最简示例代码如下：

```javascript
// main-1/2/3.js
const myWorker = new SharedWorker('worker.js')
const data = {}

myWorker.port.start()
$input.onchange = function() {
    myWorker.port.postMessage(data)
}
myWorker.port.onmessage = function(e) {
    console.log(e.data)
}

// worker.js
onconnect = function(e) {
    const port = e.ports[0]
    
    port.addEventListener('message', function(e) {
        port.postMessage(e.data)
    })
    port.start()
}
```

### ServiceWorker
关于sevice workers 的内容有很多，还是等有空再单独写一篇笔记

