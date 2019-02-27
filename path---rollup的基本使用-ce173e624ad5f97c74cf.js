webpackJsonp([63330894538463],{472:function(n,s){n.exports={data:{site:{siteMetadata:{title:"Elvin's Blog",author:"Elvin Ma"}},markdownRemark:{id:"/Users/maxingcong/Code/blog/src/pages/Rollup的基本使用.md absPath of file >>> MarkdownRemark",html:'<p>Rollup 是一个和 Webpack 类似的 JavaScript 模块打包工具，不同的是 Rollup 默认对模块使用新的标准化格式，这些标准都是包含在 JavaScript 的 ES6 版本中的，而非以前的特殊解决方案，比如 CommonJS 和 AMD，ES6 模块最终还是要由浏览器原生实现，但当前 Rollup 可以使你提前体验，这样打包出来的包文件体积也更小，打包速度也更快</p>\n<h3>初始化与基本配置</h3>\n<p>安装和初始化项目</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code class="language-bash"><span class="token function">mkdir</span> demo <span class="token operator">&amp;&amp;</span> <span class="token function">cd</span> demo\n<span class="token function">mkdir</span> src \n<span class="token function">npm</span> init\n<span class="token comment"># 安装Rollup</span>\n<span class="token function">sudo</span> <span class="token function">npm</span> <span class="token function">install</span> --save-dev rollup</code></pre>\n      </div>\n<p>在项目根目录下，创建 rollup.config.js 配置文件</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n    input<span class="token punctuation">:</span> <span class="token string">\'./src/main.js\'</span><span class="token punctuation">,</span> <span class="token comment">// 项目入口</span>\n    output<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token comment">// 输出文件选项</span>\n    \tfile<span class="token punctuation">:</span> <span class="token string">\'./dist/js/bundle.js\'</span><span class="token punctuation">,</span>\n    \tformat<span class="token punctuation">:</span> <span class="token string">\'iife\'</span><span class="token punctuation">,</span> <span class="token comment">// bundle格式规范，包括amd/umd/cjs/es/iife</span>\n    \tname<span class="token punctuation">:</span> <span class="token string">\'MyBundle\'</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    plugins<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// 插件</span>\n    externals<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token comment">// 外部引用，防止将某些import的模块打包到bundle中，而是在运行时再去从外部获取这些扩展依赖，一般用于library开发</span>\n    globals<span class="token punctuation">:</span> <span class="token punctuation">{</span> <span class="token comment">// 全局模块，提供将外部模块ID转换为全局模块的功能</span>\n    \tjquery<span class="token punctuation">:</span> <span class="token string">\'$\'</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    banner<span class="token punctuation">:</span> <span class="token string">\'const a = 6; console.log(a);\'</span><span class="token punctuation">,</span>\n    footer<span class="token punctuation">:</span> <span class="token string">\'/* this is footer */\'</span><span class="token punctuation">,</span>\n    intro<span class="token punctuation">:</span> <span class="token string">\'const a = 6;\'</span><span class="token punctuation">,</span>\n    outro<span class="token punctuation">:</span> <span class="token string">\'/* this is outro */\'</span><span class="token punctuation">,</span>\n    cache<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n    sourcemap<span class="token punctuation">:</span> <span class="token string">\'true\'</span><span class="token punctuation">,</span> <span class="token comment">// true: 单独文件，inline: 作为数据URI附加到打包文件</span>\n    strict<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 严格模式，默认开启</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>大部分和webpack的配置项相近，有两个特殊点的配置项：</p>\n<ul>\n<li>banner / footer，前置/追加到文件，最终是在生成包的外部，可以是代码也可以是注释</li>\n<li>intro / outro，与banner / footer 类似，但内容会前置/追加到生成包的内部</li>\n</ul>\n<div class="gatsby-highlight">\n      <pre class="language-json"><code class="language-json"><span class="token punctuation">{</span>\n    banner<span class="token operator">:</span> \'/* this is banner */\'<span class="token punctuation">,</span>\n\tfooter<span class="token operator">:</span> \'/* this is footer */\'<span class="token punctuation">,</span>\n    intro<span class="token operator">:</span> \'/* this is intro */\'<span class="token punctuation">,</span>\n\toutro<span class="token operator">:</span> \'/* this is outro */\'<span class="token punctuation">,</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>最终打包结果如下：</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token comment">/* this is banner */</span>\n\n<span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n<span class="token string">\'use strict\'</span><span class="token punctuation">;</span>\n<span class="token comment">/* this is outro */</span>\n<span class="token operator">...</span>\n<span class="token operator">...</span>\n<span class="token comment">/* this is outro */</span>\n<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">/* this is footer */</span></code></pre>\n      </div>\n<h3>常用插件</h3>\n<p><strong>rollup-plugin-node-resolve</strong>，帮助 Rollup 查找外部模块，然后安装</p>\n<p><strong>rollup-plugin-commonjs</strong> ，可以解决 ES6模块的查找导入，但是npm中的大多数包都是以CommonJS模块的形式出现的，所以需要使用这个插件将CommonJS模块转换为 ES2015 供 Rollup 处理</p>\n<p><strong>rollup-plugin-babel</strong>，通过这个插件可以方便的使用 javascript 的新特性，但附带要安装的依赖比较多</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code class="language-bash"><span class="token function">sudo</span> <span class="token function">npm</span> <span class="token function">install</span> --save-dev\n    babel-core\n    babel-plugin-external-helpers\n    babel-plugin-transform-runtime\n    babel-preset-env\n    babel-preset-stage-2\n    babel-register\n\trollup-plugin-babel</code></pre>\n      </div>\n<p><strong>rollup-plugin-uglify</strong>，用于压缩JS代码</p>\n<p><strong>rollup-plugin-eslint</strong>，用于JS代码格式检查</p>\n<p><strong>rollup-plugin-replace</strong>，用于变量替换，可以将动态设置的变量提取出来在配置文件中设置，比如版本号</p>\n<p><strong>rollup-watch</strong>，监听文件变化的插件，通过命令行参数运行即可 <code class="language-text">rollup -c -w</code></p>\n<p><strong>rollup-plugin-serve</strong> 和 <strong>rollup-plugin-livereload</strong>，用于开启本地服务和实时刷新页面</p>\n<p>常见的相关配置项如下：</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">import</span> <span class="token operator">...</span><span class="token punctuation">;</span>\n<span class="token operator">...</span>\nplugins<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n        module<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// ES6模块尽可能使用 ‘module’字段</span>\n        jsnext<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n        main<span class="token punctuation">:</span> <span class="token boolean">true</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token function">commonjs</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n        include<span class="token punctuation">:</span> <span class="token string">\'node_modules/**\'</span><span class="token punctuation">,</span> <span class="token comment">// 包括</span>\n        exclude<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token operator">/</span><span class="token operator">/</span> 排除\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token function">replace</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n        include<span class="token punctuation">:</span> <span class="token string">\'src/maths.js\'</span><span class="token punctuation">,</span> <span class="token operator">/</span><span class="token operator">/</span> 指定可以使用变量的文件路径\n        exclude<span class="token punctuation">:</span> <span class="token string">\'node_modules/**\'</span><span class="token punctuation">,</span>\n        <span class="token constant">ENV</span><span class="token punctuation">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">||</span> <span class="token string">\'development\'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n        <span class="token constant">HOST</span><span class="token punctuation">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token string">\'http://111/111\'</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token function">eslint</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n        include<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'src/**/*.js\'</span><span class="token punctuation">]</span> <span class="token comment">// 需要检查的部分</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token function">babel</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n        exclude<span class="token punctuation">:</span> <span class="token string">\'node_modules/**\'</span><span class="token punctuation">,</span> <span class="token comment">// 排除引入的库</span>\n        runtimeHelpers<span class="token punctuation">:</span> <span class="token boolean">true</span> <span class="token operator">/</span><span class="token operator">/</span> 配置runtime，不设置会报错\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">===</span> <span class="token string">\'production\'</span> <span class="token operator">&amp;&amp;</span> <span class="token function">uglify</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token function">serve</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n        open<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token operator">/</span><span class="token operator">/</span> 是否打开浏览器\n        contentBase<span class="token punctuation">:</span> <span class="token string">\'./\'</span><span class="token punctuation">,</span> <span class="token operator">/</span><span class="token operator">/</span> 入口<span class="token constant">HMTL</span>文件位置\n        historyApiFallback<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n        host<span class="token punctuation">:</span> <span class="token string">\'localhost\'</span><span class="token punctuation">,</span>\n        port<span class="token punctuation">:</span> <span class="token number">10001</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token function">livereload</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token operator">...</span></code></pre>\n      </div>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token punctuation">{</span>\n    <span class="token string">"presets"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>\n        <span class="token punctuation">[</span><span class="token string">"env"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n            <span class="token string">"modules"</span><span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n            <span class="token string">"targets"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>\n            \t<span class="token string">"browsers"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"> 1%"</span><span class="token punctuation">,</span> <span class="token string">"last 2 versions"</span><span class="token punctuation">,</span> <span class="token string">"not ie &lt;= 8"</span><span class="token punctuation">]</span>\n            <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token string">"stage-2"</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token string">"plugins"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"transform-runtime"</span><span class="token punctuation">,</span> <span class="token string">"external-helpers"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token string">"env"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        <span class="token string">"test"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>\n            <span class="token string">"presets"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"env"</span><span class="token punctuation">,</span> <span class="token string">"stage-2"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n            <span class="token string">"plugins"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"istanbul"</span><span class="token punctuation">]</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>以上是对应的 .babelrc 的常用配置</p>',frontmatter:{title:"Rollup的基本使用",tags:["Javascript"],categories:["编程"],date:"October 26, 2018"}}},pathContext:{slug:"/Rollup的基本使用/",previous:{fields:{slug:"/快捷发布Vue的单文件组件/"},frontmatter:{path:"/how-to-publish-vue-sfc",title:"快捷发布Vue的单文件组件",tags:["javascript"],categories:["编程"]}},next:{fields:{slug:"/用Vue写不是组件的组件/"},frontmatter:{path:"/vue-beyond-html",title:"",tags:["Vue"],categories:["编程"]}}}}}});
//# sourceMappingURL=path---rollup的基本使用-ce173e624ad5f97c74cf.js.map