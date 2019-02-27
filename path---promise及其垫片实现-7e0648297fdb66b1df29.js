webpackJsonp([0x9d1d06627a66],{468:function(n,s){n.exports={data:{site:{siteMetadata:{title:"Elvin's Blog",author:"Elvin Ma"}},markdownRemark:{id:"/Users/maxingcong/Code/blog/src/pages/Promise及其垫片实现.md absPath of file >>> MarkdownRemark",html:'<p>Promise 是异步编程的一种解决方案，比传统的解决方案 - 函数回调和事件，更合理和更强大，最早是由社区提出和实现的，后来ES6 将其写进了语言标准，统一了用法，提供了原生<code class="language-text">Promise</code>对象</p>\n<p>所谓<code class="language-text">Promise</code>，简单说保存着某个未来才会结束的事件（通常是一个异步操作）的结果和对应操作的流程，它提供统一的 API，各种异步操作都可以用同样的方法进行处理。</p>\n<p>一个<code class="language-text">Promise</code>对象代表一个异步操作，有三种状态：<code class="language-text">pending</code>（进行中）、<code class="language-text">fulfilled</code>（已成功）和<code class="language-text">rejected</code>（已失败）其结果状态只有一种，其他操作无法改变这个状态，这也是<code class="language-text">Promise</code>这个名字的由来，表示无法改变的“承诺”</p>\n<p><code class="language-text">Promise</code>对象的状态改变方向只有两种：从<code class="language-text">pending</code>变为<code class="language-text">fulfilled</code>和从<code class="language-text">pending</code>变为<code class="language-text">rejected</code>，然后状态就会一直保持这个结果，这时就称为 resolved（已定型），这时候再对<code class="language-text">Promise</code>对象添加回调函数，也只会立即得到这个结果</p>\n<p>有了<code class="language-text">Promise</code>对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数，一个最小的ES5 Promise实现如下</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">function</span> <span class="token function">Promise</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>_thens <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\nPromise<span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token punctuation">{</span>\n    then<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token comment">// 经过数组存储回调栈模拟异步</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>_thens<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span> resolve<span class="token punctuation">,</span> reject <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    resolve<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_complete</span><span class="token punctuation">(</span><span class="token string">\'resolve\'</span><span class="token punctuation">,</span> val<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    reject<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_complete</span><span class="token punctuation">(</span><span class="token string">\'reject\'</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    _complete<span class="token punctuation">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span>type<span class="token punctuation">,</span> arg<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token comment">// 将异步的then改为同步执行</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>then <span class="token operator">=</span> type <span class="token operator">===</span> <span class="token string">\'resolve\'</span> <span class="token operator">?</span>\n            <span class="token keyword">function</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token function">resolve</span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span> <span class="token punctuation">:</span>\n        \t<span class="token keyword">function</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token function">reject</span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n        <span class="token comment">// 防止多次调用resolve和reject</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>resolve <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">reject</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">\'Compeleted!\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>\n        <span class="token keyword">let</span> aThen<span class="token punctuation">,</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>\n        <span class="token keyword">while</span> <span class="token punctuation">(</span>aThen <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_thens<span class="token punctuation">[</span>i<span class="token operator">++</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> aThen<span class="token punctuation">[</span>type<span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> aThen<span class="token punctuation">[</span>type<span class="token punctuation">]</span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>\n        <span class="token keyword">delete</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_thens<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>此外，<code class="language-text">Promise</code>对象提供统一的接口，比如Promise.all、Promise.race和Promise.finally等，使得控制异步操作更加容易</p>\n<p>业界公认比较好的promise polyfill 实现有 bluebird, rsvp.js 及其子集 es6-promise</p>',frontmatter:{title:"Promise及其垫片实现",tags:["javascript"],categories:["编程"],date:"September 06, 2017"}}},pathContext:{slug:"/Promise及其垫片实现/",previous:{fields:{slug:"/Javascript中的行为类设计模式/"},frontmatter:{path:"/javascript-behavioral-design-pattern",title:"Javascript中的行为类设计模式",tags:["javascript"],categories:["编程"]}},next:{fields:{slug:"/事件循环原理/"},frontmatter:{path:"/how-event-loop-works",title:"事件循环原理",tags:["javascript"],categories:["编程"]}}}}}});
//# sourceMappingURL=path---promise及其垫片实现-7e0648297fdb66b1df29.js.map