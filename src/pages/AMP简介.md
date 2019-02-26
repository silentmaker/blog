---
title: 'AMP简介'
date: '2018-07-22'
tags: ['性能']
categories: ['dev']
path: '/amp-intro'
---

#### 加速的移动网页

AMP, Accelerated Mobile Page，是google一个团队提出来的性能优化技术，目标是加快移动端页面呈现速度，提高整体体验

AMP 主要由 AMP HTML、AMP JS 以及 AMP Cache 三部分组成，其中，AMP HTML 是 HTML 的子集，在 AMP HTML 中只允许使用有限的标签，比如 <p>、<article> 等标签可以直接使用，有些标签允许有限制的使用，比如 <meta> 标签不能使用 http-equiv 属性；而像 <img>、<audio> 等标签需要替换为 <amp-img>、<amp-audio> 等 AMP Components；还有些标签比如 <frame>、<form> 则不允许使用

以下是一个AMP页面的基础模板：

```html
<!doctype html>
<html ⚡>
  <head>
    <meta charset="utf-8">
    <title>Sample document</title>
    <link rel="canonical" href="./regular-html-version.html">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <style amp-custom>
      h1 {color: red}
    </style>
    <script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "NewsArticle",
      "headline": "Article headline",
      "image": [
        "thumbnail1.jpg"
      ],
      "datePublished": "2015-02-05T08:00:00+08:00"
    }
    </script>
    <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
  </head>
  <body>
    <h1>Sample document</h1>
    <p>
      Some text
      <amp-img src=sample.jpg width=300 height=300></amp-img>
    </p>
    <amp-ad width=300 height=250
        type="a9"
        data-aax_size="300x250"
        data-aax_pubname="test123"
        data-aax_src="302">
    </amp-ad>
  </body>
</html>
```

AMP HTML 有一些强制的格式要求：

- DTD 必须是： <!doctype html>
- 顶层标签必须包含 AMP 属性，如：<html ⚡> 或 <html amp>
-  必须在 Head 区域中放置 <link rel="canonical" href="$SOME_URL" /> 标签，用来指定该文档普通版本的 url；如果只有一个版本，使用当前 url 即可
- 必须将 <meta charset="utf-8"> 放置在 Head 区域最开始的位置
-  必须在 Head 区域包含这个 ViewPort：<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1">
- 必须将 <script async src="https://cdn.ampproject.org/v0.js"></script> 作为 Head 区域最后的元素
-  必须在 Head 区域包含以下代码：<style>body {opacity: 0}</style><noscript><style>body {opacity: 1}</style></noscript>；

#### 减少页面控制

AMP 适用于新闻、博客等信息内容为主的页面，其他性能优势是通过减少很多互动功能和对页面的控制来得到了，网页的 CSS代码也要简化，并且要写在HTML中，同时也不能调用外部CSS文件，JS也大部分不能用了，图片、视频等都会等到用户下拉到时再加载，广告展示的体验也得到了优化，这些都是通过 AMP JS 和 AMP Components 来达成的，最后通过 AMP Cache，Google将页面缓存在自己的CDN，以实现静态资源的高度缓存

#### AMP 组件

AMP Components 是使用浏览器自定义元素，即Custom Elements实现的组件，用来替换 HTML 中默认的 `<img>` 和 `<video>` 等标签，用来实现对资源的自定义加载策略，还有一些复杂的交互效果，如图片轮播等

AMP 内置组件，包括：amp-img、amp-audio、amp-anim、amp-ad、amp-pixel、amp-video，引入了cdn.ampproject.org/v0.js 之后就可以直接使用。

AMP 扩展组件，包括：amp-carousel、amp-lightbox、amp-iframe、amp-instagram、amp-twitter、amp-youtube，使用扩展组件需要引入该组件对应的文件，比如要使用 amp-carousel 要引入以下文件

```html
<script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>
// script标签必须设置async和custom-element属性
```

一些资源非常消耗性能，例如 gif 和 video，AMP 会在它们不可见时销毁元素，释放资源

为了避免页面抖动，每个 AMP Component 都必须设置高宽属性，在响应式布局下会按比例自动调整大小

#### 更好的内容分发

Web性能优化的方案很多，但是普通的情况是具体业务场景下的优化很难通用化，而通用化方案常常依赖服务端，导致成本很高，或者没有在瓶颈上起效，效果不明显

以内容为主的新闻详情页，大部分性能消耗在图片、视频等媒体资源以及第三方功能如广告、社会化组件的加载上，将这些内容替换为 AMP Components，避免资源默认被加载，再用 AMP JS 统一协调和管理，这是一个通用化、低成本且能让所有浏览器受益的折中方案，同时 AMP 方案不依赖任何特定的服务端或客户端，可以将页面直接托管在 CDN，进一步提高用户访问速度，一次修改就可以坐享后续所有策略升级带来的性能提升

目前AMP 很难直接用在国内项目中，但对我们进行移动 Web 优化仍然很有借鉴意义，其采用的控制资源加载、避免页面抖动、主动释放资源等策略，都是已经有很多尝试和实践的方向