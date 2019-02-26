webpackJsonp([0xc1cd981ed4bb],{516:function(n,a){n.exports={data:{site:{siteMetadata:{title:"Elvin's Blog",author:"Elvin Ma"}},markdownRemark:{id:"/Users/maxingcong/Code/blog/src/pages/内存管理与垃圾回收.md absPath of file >>> MarkdownRemark",html:'<p>在C之类的语言中，开发者必须手动地调用和释放内存，也就是手动地调用malloc()、calloc()、realloc() 和 free() 等方法，而在 Java或者Javascript的高级语言中，不管对象还是字符串，内存都是在创建的时候自动分配内存，在不用了的时候自动释放掉，这个过程就是垃圾回收</p>\n<p><strong>内存生命周期</strong></p>\n<p>在所有编程语言中，内存管理的生命周期基本都是：分配，读写和释放，只是在高级语言中，我们大多时候只需要去读写部分的逻辑，但自动处理不代表不会出问题，代码的质量有问题的话，很容易导致内容泄露，也就是不用的内存一般没有被释放，如果加上循环等情况，非常容易导致浏览器内存爆满失去响应，所以注意内存管理是很重要的</p>\n<p>内存管理中最麻烦的就是定位应该被释放的内存，在javascript中，一般是通过<strong>garbage collector</strong>来完成</p>\n<p><strong>引用计数法</strong></p>\n<p>最基础的垃圾回收算法是通过把没有被引用的内存做为应该释放的内容来处理</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">var</span> o <span class="token operator">=</span> <span class="token punctuation">{</span> a<span class="token punctuation">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\no <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 不再有引用指向a，所以a被释放</span></code></pre>\n      </div>\n<p>可以看出，手动释放内存的常用方法是重新赋值，比如把对象赋值为null</p>\n<p>但引用计数法无法应对闭包内的循环引用的情况：</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">var</span> o <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n    <span class="token keyword">var</span> oo <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n    o<span class="token punctuation">.</span>a <span class="token operator">=</span> oo<span class="token punctuation">;</span>\n    oo<span class="token punctuation">.</span>a <span class="token operator">=</span> o<span class="token punctuation">;</span> <span class="token comment">// o和oo都永远不会被释放，形成了内容泄露</span>\n    <span class="token keyword">return</span> <span class="token string">\'true\'</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p><strong>标记清除法</strong></p>\n<p>使用这类算法的垃圾回收器会在目标内存不可触达时去掉</p>\n<p>算法会首先找到所有全局对象，然后迭代遍历查找有全局引用的变量，从而区分出可触达和不可触达的变量，所有不可触达的对象都会被释放</p>\n<p>相比之下，这类算法更加优秀，同时也解决了循环引用的问题，目前大部分的浏览器中都是采用这类算法</p>',frontmatter:{title:"内存管理与垃圾回收",tags:["javascript"],categories:["编程"],date:"April 29, 2017"}}},pathContext:{slug:"/内存管理与垃圾回收/",previous:{fields:{slug:"/Javascript忍者禁术笔记-Runtime/"},frontmatter:{path:"/javascript-ninja-object",title:"Javascript忍者禁术笔记-Object",tags:["javascript"],categories:["编程"]}},next:{fields:{slug:"/小程序基本原理/"},frontmatter:{path:"/mini-program-notes",title:"小程序基本原理",tags:["mini program"],categories:["dev"]}}}}}});
//# sourceMappingURL=path---内存管理与垃圾回收-05ee36c8d0feaa742186.js.map