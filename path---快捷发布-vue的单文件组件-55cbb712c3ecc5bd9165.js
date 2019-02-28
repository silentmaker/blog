webpackJsonp([0xb328c0942eb3],{493:function(n,s){n.exports={data:{site:{siteMetadata:{title:"Elvin's Blog",author:"Elvin Ma"}},markdownRemark:{id:"/Users/maxingcong/Code/blog/src/pages/快捷发布Vue的单文件组件.md absPath of file >>> MarkdownRemark",html:'<p>SFC，Single File Component，Vue所谓的单文件组件，有时你可能需要快捷地把组件发布到npm给其他人使用，国外有开发者在VueConf分享了一套简便的模板，后来发现Vue Cookbook也已经采纳为一种推荐做法了</p>\n<p>项目的地址是：<a href="https://github.com/team-innovation/vue-sfc-rollup">vue-sfc-rollup</a></p>\n<p>Vue Cookbook的相关说明在这里：<a href="https://vuejs.org/v2/cookbook/packaging-sfc-for-npm.html#Packaging-Components-for-npm">Packaging-Components-for-npm</a></p>\n<p>关键的文件只有以下几个：</p>\n<ul>\n<li>package.json </li>\n</ul>\n<p>关键在于指定几种不同环境下使用的打包文件，比如npm install和script引入等</p>\n<div class="gatsby-highlight">\n      <pre class="language-json"><code class="language-json"><span class="token punctuation">{</span>\n  ...\n  <span class="token property">"main"</span><span class="token operator">:</span> <span class="token string">"dist/&lt;%-componentName%>.umd.js"</span><span class="token punctuation">,</span>\n  <span class="token property">"module"</span><span class="token operator">:</span> <span class="token string">"dist/&lt;%-componentName%>.esm.js"</span><span class="token punctuation">,</span>\n  <span class="token property">"unpkg"</span><span class="token operator">:</span> <span class="token string">"dist/&lt;%-componentName%>.min.js"</span><span class="token punctuation">,</span>\n  <span class="token property">"browser"</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">"./sfc"</span><span class="token operator">:</span> <span class="token string">"src/&lt;%-componentName%>.vue"</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n\n  <span class="token property">"files"</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n    <span class="token string">"dist/*"</span><span class="token punctuation">,</span>\n    <span class="token string">"src/*"</span>\n  <span class="token punctuation">]</span><span class="token punctuation">,</span>\n\n  <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">"build"</span><span class="token operator">:</span> <span class="token string">"npm run build:unpkg &amp; npm run build:es &amp; npm run build:umd"</span><span class="token punctuation">,</span>\n    <span class="token property">"build:umd"</span><span class="token operator">:</span> <span class="token string">"cross-env NODE_ENV=production rollup --config build/rollup.config.js --format umd --file dist/&lt;%-componentName%>.umd.js"</span><span class="token punctuation">,</span>\n    <span class="token property">"build:es"</span><span class="token operator">:</span> <span class="token string">"cross-env NODE_ENV=production rollup --config build/rollup.config.js --format es --file dist/&lt;%-componentName%>.esm.js"</span><span class="token punctuation">,</span>\n    <span class="token property">"build:unpkg"</span><span class="token operator">:</span> <span class="token string">"cross-env NODE_ENV=production rollup --config build/rollup.config.js --format iife --file dist/&lt;%-componentName%>.min.js"</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  ...\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<ul>\n<li>rollup.config.js </li>\n</ul>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">import</span> vue <span class="token keyword">from</span> <span class="token string">\'rollup-plugin-vue\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> buble <span class="token keyword">from</span> <span class="token string">\'rollup-plugin-buble\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> commonjs <span class="token keyword">from</span> <span class="token string">\'rollup-plugin-commonjs\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> replace <span class="token keyword">from</span> <span class="token string">\'rollup-plugin-replace\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> uglify <span class="token keyword">from</span> <span class="token string">\'rollup-plugin-uglify-es\'</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> minimist <span class="token keyword">from</span> <span class="token string">\'minimist\'</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> argv <span class="token operator">=</span> <span class="token function">minimist</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span>argv<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span>\n  input<span class="token punctuation">:</span> <span class="token string">\'src/entry.js\'</span><span class="token punctuation">,</span>\n  output<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n    name<span class="token punctuation">:</span> <span class="token string">\'&lt;%-componentNamePascal%>\'</span><span class="token punctuation">,</span>\n    exports<span class="token punctuation">:</span> <span class="token string">\'named\'</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  plugins<span class="token punctuation">:</span> <span class="token punctuation">[</span>\n    <span class="token function">replace</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n      <span class="token string">\'process.env.NODE_ENV\'</span><span class="token punctuation">:</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span><span class="token string">\'production\'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token function">commonjs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token function">vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n      css<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n      compileTemplate<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n      template<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        isProduction<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token function">buble</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token comment">// Only minify browser (iife) version</span>\n<span class="token keyword">if</span> <span class="token punctuation">(</span>argv<span class="token punctuation">.</span>format <span class="token operator">===</span> <span class="token string">\'iife\'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  config<span class="token punctuation">.</span>plugins<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token function">uglify</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> config<span class="token punctuation">;</span></code></pre>\n      </div>\n<p>其中buble是babel的一个简化实现包</p>\n<ul>\n<li>entry.js </li>\n</ul>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token comment">// Import vue component</span>\n<span class="token keyword">import</span> component <span class="token keyword">from</span> <span class="token string">\'./&lt;%-componentName%>.vue\'</span><span class="token punctuation">;</span>\n\n<span class="token comment">// install function executed by Vue.use()</span>\n<span class="token keyword">function</span> <span class="token function">install</span><span class="token punctuation">(</span>Vue<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>install<span class="token punctuation">.</span>installed<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>\n  install<span class="token punctuation">.</span>installed <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n  Vue<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token string">\'&lt;%-componentNamePascal%>\'</span><span class="token punctuation">,</span> component<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// Create module definition for Vue.use()</span>\n<span class="token keyword">const</span> plugin <span class="token operator">=</span> <span class="token punctuation">{</span>\n  install<span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token comment">// To auto-install when vue is found</span>\n<span class="token comment">/* global window global */</span>\n<span class="token keyword">let</span> GlobalVue <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> window <span class="token operator">!==</span> <span class="token string">\'undefined\'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  GlobalVue <span class="token operator">=</span> window<span class="token punctuation">.</span>Vue<span class="token punctuation">;</span>\n<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> global <span class="token operator">!==</span> <span class="token string">\'undefined\'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  GlobalVue <span class="token operator">=</span> global<span class="token punctuation">.</span>Vue<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">if</span> <span class="token punctuation">(</span>GlobalVue<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  GlobalVue<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>plugin<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// Inject install function into component - allows component</span>\n<span class="token comment">// to be registered via Vue.use() as well as Vue.component()</span>\ncomponent<span class="token punctuation">.</span>install <span class="token operator">=</span> install<span class="token punctuation">;</span>\n\n<span class="token comment">// Export component by default</span>\n<span class="token keyword">export</span> <span class="token keyword">default</span> component<span class="token punctuation">;</span>\n\n<span class="token comment">// It\'s possible to expose named exports when writing components that can</span>\n<span class="token comment">// also be used as directives, etc. - eg. import { RollupDemoDirective } from \'rollup-demo\';</span>\n<span class="token comment">// export const RollupDemoDirective = component;</span></code></pre>\n      </div>\n<p>这里主要是给组件提供install方法，并且可能的时候自动install</p>\n<p>这个项目同时也支持组件库的开发，已经写好了发布到npm用到的scripts，用rollup来打包三方库也更受推荐，打包速度更快，体积也更小，vue项目的打包就是用的rollup</p>',frontmatter:{title:"快捷发布Vue的单文件组件",tags:["Javascript"],categories:["编程"],date:"October 02, 2018"}}},pathContext:{slug:"/快捷发布Vue的单文件组件/",previous:{fields:{slug:"/CDN基础总结/"},frontmatter:{path:"/cdn-notes",title:"CDN基础总结",tags:null,categories:["编程"]}},next:{fields:{slug:"/浅谈与人合作/"},frontmatter:{path:"/how-to-work-with-people",title:"浅谈与人合作",tags:null,categories:["项目管理"]}}}}}});
//# sourceMappingURL=path---快捷发布-vue的单文件组件-55cbb712c3ecc5bd9165.js.map