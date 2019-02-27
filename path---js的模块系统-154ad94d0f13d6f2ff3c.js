webpackJsonp([0xab237d8a9414],{458:function(n,s){n.exports={data:{site:{siteMetadata:{title:"Elvin's Blog",author:"Elvin Ma"}},markdownRemark:{id:"/Users/maxingcong/Code/blog/src/pages/JS的模块系统.md absPath of file >>> MarkdownRemark",html:'<h3>CommonJS模式</h3>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript">module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span> a<span class="token punctuation">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'moduleA\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>CommonJS是Node的主要模块机制，从设计的出发点就是考虑了服务端开发，关键字只有require和module.exports，exports是一个特殊属性，所有对它的赋值都会被export出去</p>\n<p>其优点在于简单，模块可以按需按序加载，同时也支持循环依赖</p>\n<p>而其缺点在于，同步的API设计使其不适合客户端的很多异步场景，在浏览器里使用需要loader或者转译，模块只能是一个文件，不适用于静态代码分析器</p>\n<h3>AMD模式</h3>\n<p>Asynchronous Module Definition，比如require.js和Dojo.js，不互相依赖的模块可以同时加载，加载速度更快</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token function">define</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">\'dep1\'</span><span class="token punctuation">,</span> <span class="token string">\'dep2\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n \t<span class="token comment">// 通过函数的返回来定义模块</span>\n    <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// 或者</span>\n<span class="token function">define</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>require<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">var</span> dep1 <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'dep1\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">var</span> dep2 <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'dep2\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>这个机制的优点主要是异步加载，兼容CommonJS，并且支持多文件模块，缺点主要是语法上复杂一点，使用时需要loader或者转译，同样不适用于静态代码分析器</p>\n<h3>CMD模式</h3>\n<p>CMD是另一种模块化方案，它与AMD很类似，不同点在于 AMD 推崇依赖前置、提前执行，CMD推崇依赖就近、延迟执行</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token comment">// AMD</span>\n<span class="token function">define</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">\'a\'</span><span class="token punctuation">,</span> <span class="token string">\'b\'</span><span class="token punctuation">,</span> <span class="token string">\'c\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n \t<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span> b<span class="token punctuation">.</span><span class="token function">doSth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 即使调用永远不会执行，b模块还是执行了</span>\n    <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// CMD</span>\n<span class="token function">define</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>require<span class="token punctuation">,</span> exports<span class="token punctuation">,</span> module<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'a\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    a<span class="token punctuation">.</span><span class="token function">doSth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    \t<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'b\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        b<span class="token punctuation">.</span><span class="token function">doSth</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// Sea.js 定义模块 math.js</span>\n<span class="token function">define</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span>require<span class="token punctuation">,</span> exports<span class="token punctuation">,</span> module<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">var</span> $ <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'jquery.js\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">var</span> <span class="token function-variable function">add</span> <span class="token operator">=</span> <span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span> <span class="token operator">=></span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>\n    module<span class="token punctuation">.</span>exports <span class="token operator">=</span> add<span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// Sea.js 引用模块</span>\nseajs<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">\'math.js\'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span>math<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">var</span> sum <span class="token operator">=</span> math<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<h3>ES2015 Module</h3>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token comment">// lib.js</span>\n<span class="token keyword">export</span> <span class="token keyword">const</span> sqrt <span class="token operator">=</span> Math<span class="token punctuation">.</span>sqrt<span class="token punctuation">;</span>\n<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">square</span> <span class="token operator">=</span> <span class="token punctuation">(</span>x<span class="token punctuation">)</span> <span class="token operator">=></span> x <span class="token operator">*</span> x<span class="token punctuation">;</span>\n<span class="token comment">// main.js</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> sqrt<span class="token punctuation">,</span> square <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'lib.js\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">\'lib.js\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>module <span class="token operator">=></span> module<span class="token punctuation">.</span><span class="token function">squqre</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">catch</span><span class="token punctuation">(</span>err <span class="token operator">=></span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>ES2015是规范化的模块方案，语法简单且合理，支持静态代码分析工具，同时支持同步和异步加载，也支持循环引用 ，缺点主要是还没有被普遍支持</p>\n<p><strong>与CommonJS的区别：</strong></p>\n<ul>\n<li>ES2015输出的是动态引用 ，且不会缓存值，被加载时才去模块里取值，而CommonJS输出的是值的拷贝，原模块的变更不会影响之后的执行；</li>\n<li>CommonJS是运行时加载，最后加载的是整个模块对象，即module.exports，只有在脚本运行完时才会生成，而ES6模块不是对象，只是静态定义，属于编译时加载，在代码静态解析阶段就会完成；</li>\n<li>如果出现循环引用，对于CommonJS，一旦出现某个模块被”循环加载”，就只输出已经执行的部分，还未执行的部分不会输出；而ES6模块根本不会关心是否发生了”循环加载”，只是生成一个指向被加载模块的引用，需要开发者自己保证，真正取值的时候能够取到值</li>\n</ul>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token comment">// a.js</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> bar <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'b.js\'</span><span class="token punctuation">;</span>\n<span class="token keyword">export</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n<span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// b.js</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> foo <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'a.js\'</span><span class="token punctuation">;</span>\n<span class="token keyword">export</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>按照CommonJS的标准，a先加载b，然后b又加载a，这时a还没有任何执行结果，所以输出结果为null，即对于b.js来说，变量foo的值等于null，后面的foo()就会报错</p>',frontmatter:{title:"JS的模块系统",tags:["javascript"],categories:["编程"],date:"January 19, 2017"}}},pathContext:{slug:"/JS的模块系统/",previous:{fields:{slug:"/Npm冷知识/"},frontmatter:{path:"/tricks-about-npm",title:"Npm冷知识",tags:["npm","JSConf"],categories:["编程"]}},next:{fields:{slug:"/Javascript忍者禁术笔记-Runtime/"},frontmatter:{path:"/javascript-ninja-runtime",title:"Javascript忍者禁术笔记-Runtime",tags:["javascript"],categories:["编程"]}}}}}});
//# sourceMappingURL=path---js的模块系统-154ad94d0f13d6f2ff3c.js.map