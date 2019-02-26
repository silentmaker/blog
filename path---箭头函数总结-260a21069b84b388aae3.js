webpackJsonp([0x6ed0abe8c520],{524:function(n,a){n.exports={data:{site:{siteMetadata:{title:"Elvin's Blog",author:"Elvin Ma"}},markdownRemark:{id:"/Users/maxingcong/Code/blog/src/pages/箭头函数总结.md absPath of file >>> MarkdownRemark",html:'<p>箭头函数用起来比较潮，但是原来的函数写法依旧有其用处，毕竟这两者还有很多不等价的情况</p>\n<h4>箭头函数缺失的东西</h4>\n<ul>\n<li>没有自己的 this ，其this是由执行时在当前scope中继承的</li>\n<li>没有 prototype 属性，所以用于new，如<code class="language-text">new (() =&gt; {})</code></li>\n<li>没有 arguments 对象，也没有 new.target 和 super</li>\n<li>不能做为生成器函数（generator function），但是可以返回generator</li>\n</ul>\n<p><strong>new.target</strong></p>\n<p>此属性用于判断函数是否被 new 操作符调用或者是否是构造函数，否则返回 undefined</p>\n<h4>什么时候不该用箭头函数</h4>\n<ul>\n<li>事件监听</li>\n</ul>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript">button<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">\'click\'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token comment">// this会指向window</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<ul>\n<li>对象方法</li>\n</ul>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">const</span> Person <span class="token operator">=</span> <span class="token punctuation">{</span>\n    age<span class="token punctuation">:</span> <span class="token number">23</span><span class="token punctuation">,</span>\n    older<span class="token punctuation">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n        <span class="token keyword">this</span><span class="token punctuation">.</span>age<span class="token operator">++</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<ul>\n<li>对象原型</li>\n</ul>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript">Car<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">summarize</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token template-string"><span class="token string">`This car is </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>color<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">`</span></span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<ul>\n<li>需要用于 arguments 对象</li>\n</ul>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">const</span> <span class="token function-variable function">orderChildren</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> children <span class="token operator">=</span> Array<span class="token punctuation">.</span><span class="token keyword">from</span><span class="token punctuation">(</span>arguments<span class="token punctuation">)</span> <span class="token comment">// undefined</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>不过也可以通过别的方式来模拟 arguments 对象：</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span> <span class="token operator">=></span> args<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span></code></pre>\n      </div>',frontmatter:{title:"箭头函数总结",tags:["Javascript"],categories:["编程"],date:"December 26, 2017"}}},pathContext:{slug:"/箭头函数总结/",previous:{fields:{slug:"/事件循环原理/"},frontmatter:{path:"/how-event-loop-works",title:"事件循环",tags:["javascript"],categories:["编程"]}},next:{fields:{slug:"/关于大前端/"},frontmatter:{path:"/about-the-big-frontend",title:"关于大前端",tags:["前端"],categories:["编程"]}}}}}});
//# sourceMappingURL=path---箭头函数总结-260a21069b84b388aae3.js.map