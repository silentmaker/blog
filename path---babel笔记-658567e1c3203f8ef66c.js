webpackJsonp([0xcb5165b54b6c],{436:function(n,s){n.exports={data:{site:{siteMetadata:{title:"Elvin's Blog",author:"Elvin Ma"}},markdownRemark:{id:"/Users/maxingcong/Code/blog/src/pages/Babel笔记.md absPath of file >>> MarkdownRemark",html:'<p><strong>Babel</strong>是 Javascript 的转译工具，可以帮助开发者在写代码的时候可以使用更先进的语法和API，并在运行前转译为更具兼容性的语法</p>\n<p>确立 <strong>ECMAScript</strong> 标准语法的五阶段:</p>\n<ol>\n<li>Stage 0：strawman - “稻草人”</li>\n<li>Stage 1：proposal - 提议</li>\n<li>Stage 2：draft - 草稿，并且必须包含2个实验性的实现，其中一个可以是用转译器实现的，如Babel</li>\n<li>Stage 3：candidate - 至少要有2个符合规范的具体实现</li>\n<li>Stage 4：finished - 完成</li>\n</ol>\n<h3>Babel6</h3>\n<p>Babel6增加了以下配置项：</p>\n<ul>\n<li><em>.babelrc</em> 配置文件</li>\n<li><em>plugins</em> 配置，所有东西插件化</li>\n<li><em>presets</em> 配置，默认转译jsx和ES6语法，不同的preset其实就是一系列插件的组合</li>\n</ul>\n<p>同时Babel6后也对代码进行了拆分：</p>\n<ul>\n<li><em>babel-core</em>：核心功能，比如transfrom、transfromFile、transformFileSync 和 transformFromAst，主要用于生成编译代码和抽象语法树（AST，Abstract Syntax Tree）</li>\n<li><em>babel-cli</em>：命令行工具，用于输出转译代码，同时会安装babel-node</li>\n<li><em>babel-node</em>：用于启动REPL（Read-Eval-Print-Loop）,同时会安装babel-polyfill</li>\n<li><em>babel-polyfill</em>：引入新的内置对象如Promise和静态方法如Array.from以供使用</li>\n<li><em>babel-register</em>：模块注册器，在底层改写node的require方法，不带后缀情况下会默认转译.es6、.es、.jsx和.js后缀的模块，其实等同于babel-core/register模块，也可以单独引入</li>\n</ul>\n<h3>插件</h3>\n<p>官方插件列表：<a href="http://babeljs.io/docs/en/plugins/">http://babeljs.io/docs/en/plugins/</a>\n语法层次的转译，和api层次的垫片(polyfill)，都是通过一系列插件来实现\nexternal-helpers则提供了常见的工具函数，比如Object.extend</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token punctuation">{</span>\n    <span class="token string">"plugins"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>\n        <span class="token punctuation">[</span><span class="token string">"transform-es2015-arrow-functions"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token string">"spec"</span><span class="token punctuation">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token string">"transform-es2015-spread"</span><span class="token punctuation">,</span>\n        <span class="token string">"transform-es2015-for-of"</span><span class="token punctuation">,</span>\n        <span class="token string">"transform-object-assign"</span><span class="token punctuation">,</span>\n        <span class="token string">"external-helpers"</span>\n    <span class="token punctuation">]</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>如上引入时，helper 和 polyfill 的引用都是模块级别的，无法避免在多个文件内重复引用\n故推荐可用 transform-runtime 来自动引入 polyfill 和 helper，同时需要依赖 babel-runtime：</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token punctuation">{</span>\n    <span class="token string">"plugins"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>\n        <span class="token punctuation">[</span><span class="token string">"transform-runtime"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n            <span class="token string">"helpers"</span><span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n            <span class="token string">"polyfill"</span><span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n            <span class="token string">"regenerator"</span><span class="token punctuation">:</span> <span class="token boolean">true</span>\n        <span class="token punctuation">}</span><span class="token punctuation">]</span>\n    <span class="token punctuation">]</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p><em>babel-runtime</em> 的组成：</p>\n<ul>\n<li><em>core-js</em>，通过ES3实现了大部分ES5/6/7的垫片</li>\n<li><em>generator</em>，facebook用于实现生成器函数的库</li>\n<li><em>helpers</em>，基本等同于babel-external-helpers</li>\n</ul>\n<p><em>transform-runtime</em> 和 <em>babel-polyfill</em> 引入垫片的区别：</p>\n<ul>\n<li>前者是按需引入，后者是全局性的，并且会改写一些实例方法，如Array.prototype.includes</li>\n<li>后者更全能也更稳妥，提供了完整的ES6+环境，官方也建议全局引入</li>\n<li>建议开发库或框架时引入不会前者，不会污染全局作用域；大型web应用则推荐后者，全局引入后者打包后的文件体积可能比各模块重复引入体积更小</li>\n</ul>\n<h3>Preset配置</h3>\n<p>官方已经不推荐使用{ “presets”: [“es2015”] }的方式，而是用<em>babel-preset-env</em></p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token punctuation">{</span>\n    <span class="token string">"presets"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>\n        <span class="token punctuation">[</span><span class="token string">"env"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n            <span class="token string">"browsers"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"last 2 versions"</span><span class="token punctuation">,</span> <span class="token string">"safari >= 7"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n            <span class="token string">"node"</span><span class="token punctuation">:</span> <span class="token string">"6.10"</span> <span class="token comment">// "current"表示当前版本node</span>\n        <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token string">"modules"</span><span class="token punctuation">:</span> <span class="token string">"commonjs"</span><span class="token punctuation">,</span>\n        <span class="token string">"debug"</span><span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n        <span class="token string">"include"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"transform-es2015-arrow-functions"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// 强制开启的模块</span>\n        <span class="token string">"exclude"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"transform-es2015-for-of"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// 禁用的模块</span>\n        <span class="token string">"useBuiltIns"</span><span class="token punctuation">:</span> <span class="token boolean">false</span>\n    <span class="token punctuation">]</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>useBuiltIns为true，则项目中必须引入babel-ployfill，文件大小会减少很多</p>\n<p><strong>其他Polyfill解决方案</strong></p>\n<p><a href="https://polyfill.io/v2/docs/">https://polyfill.io/v2/docs/</a></p>\n<p>polyfill.io 的解决方案是通过解析请求的User Agent信息返回与浏览器相对应的垫片文件，只需要无增加一个script标签</p>',frontmatter:{title:"Babel笔记",tags:null,categories:["编程"],date:"May 20, 2018"}}},pathContext:{slug:"/Babel笔记/",previous:{fields:{slug:"/前端工程师的一专多长/"},frontmatter:{path:"/front-end-engineer-skills",title:"前端工程师的一专多长",tags:["前端"],categories:["编程"]}},next:{fields:{slug:"/前端安全 - XSS总结/"},frontmatter:{path:"/security-issue-xss",title:"前端安全 - XSS总结",tags:null,categories:["编程"]}}}}}});
//# sourceMappingURL=path---babel笔记-658567e1c3203f8ef66c.js.map