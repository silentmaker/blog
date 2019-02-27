---
title: 'Koa入门笔记'
date: '2018-11-29'
tags: ['Javascript']
categories: ['编程']
path: '/koa-intro'
---

Koa是Express的维护者们基于更简洁稳定和更充分利用Async/Await异步模式的目标重写的web框架，不自带任何中间件，Koa本身可以看作对http库的一层封装，一个Koa应用的开发可以理解为一系列中间件的组合

### 级联中间件

当中间件用异步方式调用next()，其执行会暂停，将控制交给下一个中间件，一直到response中间件，然后再从执行堆栈中逐一展开和恢复之前中间件的执行

```javascript
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const time = Date.now() - start;
    ctx.set('X-Response-Time', `${time}ms`);
});

app.use(async (ctx) => {
    ctx.body = 'Hello World';
});

app.listen(3000);
```

### App 实例

**app.env**，默认为NODE_ENV或者development

**app.proxy**，为true时表示Proxy Header可依赖

**app.listen**，语法糖

```javascript
app.listen(3000);
// 等价于
const http = require('http');
http.createServer(app.callback()).listen(3000)
```

所以如果要同时配置http和https则可以:

```javascript
const http = require('http');
const http = require('https');
const koa = require('koa');
const app = new koa();
http.createServer(app.callback()).listen(3000)
https.createServer(app.callback()).listen(3001)
```

**app.callback**，返回适用于createServer的系列回调函数，也可以用于把koa应用挂载到connect/express的应用上 

**app.use**，用于添加中间件 

**app.keys**，用于设置已签名的cookie密钥，底层用的是jed/keygrip，可以传数组或者Keygrip对象，keys可以轮换，当signed: true的时候被使用

```javascript
ctx.cookies.set('name', 'tobi', { signed: true });
```

**app.context**，是中间件回调形参ctx的prototype，可以用于添加全局属性或方法，比如数据库

```javascript
app.context.db = db();
app.use(async ctx => console.log(ctx.db));
```

**app.on('error')**，错误处理，默认情况下error会输出到标准错误输出stderr，除非err.status是404或者err.expose为true

### Context 请求上下文

每个请求会对应生成一个context，并在中间件的回调中被引用，方便起见，很多访问器和方法委托给了ctx.request 和 ctx.response 这两个对象，比如 ctx.type 和 ctx.length 委托给了 response，ctx.path 和 ctx.method委托给了 request

**ctx.req/ctx.res**，Node的request和response对象 

**ctx.request/ctx.response**，Koa的Request和Response对象 

**ctx.state**，用于传递公共信息的推荐命名空间，如用户信息 

**ctx.app**，应用实例引用 

**ctx.cookies.get/set**，cookie的读写，底层用的是jed/cookies 

**ctx.throw**，常见出错响应，底层用的是jshttp/http-errors 

```javascript
ctx.throw(400, 'name required'，{user: user});
// 等价于
const err = new Error('name required');
err.status = 400;
err.expose = true;
throw err
```

err.expose为true，意味着这是适用于客户端响应的出错信息

**ctx.assert**，类似ctx.throw的语法糖，底层用的是jshttp/http-assert，当 !value 时，Helper 方法抛出类似于 .throw() 的错误 

```javascript
ctx.assert(ctx.state.user, 401, 'unlogin');
```

### Response

response.body 只能是以下几种：string、Buffer、Stream、Object/Array和null

response.status 默认为200/204

response.redirect(url, [alt])，执行302跳转

```javascript
ctx.redirect('back'); // 跳转回Refferer，没有的话使用alt或者/
ctx.redirect('/login');
```

response.body 的变更要在 response.redirect 之后