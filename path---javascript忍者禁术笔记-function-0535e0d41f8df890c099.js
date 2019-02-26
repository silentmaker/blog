webpackJsonp([0x689827e8fcc4],{431:function(n,a){n.exports={data:{site:{siteMetadata:{title:"Elvin's Blog",author:"Elvin Ma"}},markdownRemark:{id:"/Users/maxingcong/Code/blog/src/pages/Javascript忍者禁术笔记-Function.md absPath of file >>> MarkdownRemark",html:'<h4>函数的特性</h4>\n<p>函数可以看作一种特殊的对象，可以赋值给变量，也可以作为同步或者异步的回调，同时也可以具有属性，可以记录执行的结果</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">function</span> <span class="token function">isPrime</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isPrime<span class="token punctuation">.</span>answers<span class="token punctuation">)</span> isPrime<span class="token punctuation">.</span>answers <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>isPrime<span class="token punctuation">.</span>answers<span class="token punctuation">[</span>value<span class="token punctuation">]</span> <span class="token operator">!==</span> undefined<span class="token punctuation">)</span> <span class="token keyword">return</span> isPrime<span class="token punctuation">.</span>answers<span class="token punctuation">[</span>value<span class="token punctuation">]</span><span class="token punctuation">;</span>\n    <span class="token keyword">var</span> prime <span class="token operator">=</span> value <span class="token operator">!==</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 1不是素数</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> value<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">%</span> i <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            prime <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n            <span class="token keyword">break</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> isPrime<span class="token punctuation">.</span>answers<span class="token punctuation">[</span>value<span class="token punctuation">]</span> <span class="token operator">=</span> prime<span class="token punctuation">;</span> <span class="token comment">// 存储计算结果</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>创建函数的方法有很多，function声明、箭头函数、Function构造器、generator函数，函数可以作为其他函数的返回</p>\n<h4>创建函数</h4>\n<p>IIFE(Immediately Invoked Function Expression)，函数声明可以在创建后立即执行，形成匿名作用域</p>\n<div class="gatsby-highlight">\n      <pre class="language-text"><code class="language-text">(function(val){})(value);</code></pre>\n      </div>\n<p>可以使用参数默认值，也可以使用解构符代表不定参数</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">function</span> <span class="token function">multiMax</span><span class="token punctuation">(</span>first<span class="token punctuation">,</span> <span class="token operator">...</span>remain<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">var</span> sorted <span class="token operator">=</span> remain<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token keyword">return</span> b <span class="token operator">-</span> a<span class="token punctuation">;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> first <span class="token operator">*</span> sorted<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>',frontmatter:{title:"Javascript忍者禁术笔记-Function",tags:["javascript"],categories:["编程"],date:"April 13, 2017"}}},pathContext:{slug:"/Javascript忍者禁术笔记-Function/",previous:{fields:{slug:"/Javascript忍者禁术笔记-Runtime/"},frontmatter:{path:"/javascript-ninja-runtime",title:"Javascript忍者禁术笔记-Runtime",tags:["javascript"],categories:["编程"]}},next:{fields:{slug:"/Javascript忍者禁术笔记-Object/"},frontmatter:{path:"/javascript-ninja-object",title:"Javascript忍者禁术笔记-Object",tags:["javascript"],categories:["编程"]}}}}}});
//# sourceMappingURL=path---javascript忍者禁术笔记-function-0535e0d41f8df890c099.js.map