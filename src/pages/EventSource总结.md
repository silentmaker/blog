---
title: 'EventSource总结'
date: '2018-01-11'
categories: ['编程']
path: '/using-event-source'
---

### 服务端推

Sever Push, 指的是服务器主动的向客户端发送消息，在基于请求-响应的B/S模式下，消息起点总是来自客户端，因此在应用层之上无法实现简易的服务端推功能

常见的解决服务端推送的方案是，长轮询Long Pooling 和 websocket全双工通信

只要服务端给了响应，HTTP连接就结束了，但TCP连接是一个双向的通道，可以保持一段时间不关闭的，因此TCP连接才有真正的长连接和短连接这一说，只要设置Connection为keep-alive就算是长连接，HTTP1.1默认是长连接，即默认Connection的值就是keep-alive

在长轮询中，服务器如果检测到库存量没有变化的话，将会把当前请求挂起一段时间，一般是几十秒后超时，长轮询也是有坏处的，因为把请求挂起同样会导致资源的浪费，不管是长轮询还是短轮询，都不太适用于客户端数量太多的情况；websocket连接相对而言功能最强大，但是它对服务器要求比较高，在可以使用websocket协议的服务器上尽量采用此种方式；

HTML5规范中提供了服务端事件EventSource，浏览器在实现了该规范的前提下创建一个EventSource连接后，便可收到服务端的发送的消息，这些消息需要遵循一定的格式，对于前端开发人员而言，只需在浏览器中侦听对应的事件皆可，EventSource的实现方式对客户端开发人员而言非常简单，兼容性上除IE系的浏览器外都良好；在浏览器与服务端需要强交互的场景下，websocket仍是不二的选择

### 浏览器端

浏览器端，需要创建一个EventSource对象，并且传入一个服务端的接口URI作为参数。

```javascript
var evtSource = new EventSource('http://localhost:9111/es');
```

默认EventSource对象通过侦听“message”事件获取服务端传来的消息，“open”事件则在http连接建立后触发，”error“事件会在通信错误（连接中断、服务端返回数据失败）的情况下触发。同时，EventSource规范允许服务端指定自定义事件，客户端侦听该事件即可。

```javascript
evtSource.addEventListener('message',function(e){
    console.log(e.data);
});
evtSource.addEventListener('error',function(e){
    console.log(e);
})；
```

### 服务端

事件流的对应MIME格式为**text/event-stream**，而且其基于HTTP长连接，如果是HTTP1.0的服务器需要特殊设置；服务端返回数据需要特殊的格式，它分为四种消息类型：event, data, id, retry

**event**指定自定义消息的名称，如**event: customMessage**

**data**指定具体的消息体，可以是对象或者字符串，在消息体后面有两个换行符\n，代表当前消息体发送完毕，一个换行符标识当前消息并未结束，浏览器需要等待后面数据的到来后再触发事件；

**id**为当前消息的标识符，可以不设置。一旦设置则在浏览器端的eventSource对象中就会有体现，该字段使用场景不大;

**retry**设置当前http连接失败后，重新连接的间隔，EventSource规范规定，客户端在http连接失败后默认进行重新连接，重连间隔为3s，通过设置retry字段可指定重连间隔

Koa的服务端示例代码如下：

```javascript
var fs = require('fs');
var path = require('path');
var PassThrough = require('stream').PassThrough;
var Readable = require('stream').Readable;
var koa = require('koa');
var Router = require('koa-router');
var app = new koa();
var router = new Router();

function RR(){
    Readable.call(this,arguments);
}
RR.prototype = new Readable();
RR.prototype._read = function(data){
}

router.get('/',function(ctx,next){
    ctx.set('content-type','text/html');
    ctx.body = fs.readFileSync(path.join(process.cwd(),'eventServer.html'));
});

const sse = (stream,event, data) => {
    return stream.push(`event:${ event }\ndata: ${ JSON.stringify(data) }\n\n`)
//    return stream.write(`event:${ event }\ndata: ${ JSON.stringify(data) }\n\n`);
}
router.get('/es',function(ctx,next){
    var stream = new RR()//PassThrough();
    ctx.set({
        'Content-Type':'text/event-stream',
        'Cache-Control':'no-cache',
        Connection: 'keep-alive'
    });
    sse(stream,'test',{a: "yango",b: "tango"});
    ctx.body = stream;
    setInterval(()=>{
        sse(stream,'test',{a: "yango",b: Date.now()});
    },3000); 
});

app.use(router.routes());
app.listen(9111,function(){
    console.log('listening port 9111');
});
```

页面代码如下：

```html
<!DOCTYPE html>
<html>
<head>
</head>
<body>
    <div>
        hello world
    </div>
    <p id="info"></p>
    <script>
        var infoShow = document.querySelector('#info');
        var se = new EventSource('http://localhost:9111/es');
        se.addEventListener('test',function(e){
            infoShow.textContent += e.data+'\n';
        });
        se.addEventListener('error',function(e){
            console.log(e);
        })
    </script>
</body>
</html>
```

