webpackJsonp([45182713251922],{510:function(n,r){n.exports={data:{site:{siteMetadata:{title:"Elvin's Blog",author:"Elvin Ma"}},markdownRemark:{id:"/Users/maxingcong/Code/blog/src/pages/前端监控系统总结.md absPath of file >>> MarkdownRemark",html:"<p><strong>后端监控</strong> - 采集服务器以及链路上各种中间件的数据\n<strong>前端监控</strong> - 运行在用户终端上的代码</p>\n<p>最简实现：通过 window.onerror 采集到所有的未捕获异常，并通过 new Image() 的方式构造一个 404 的 HTTP 请求，最后在服务端实时过滤 access.log 中匹配的请求并计数即可</p>\n<h3>采集</h3>\n<p><strong>可采集的异常</strong></p>\n<p>HTML 标签异常、CSS 展现异常、样式、图片、脚本文件的请求异常、脚本执行异常、网速很慢、运营商拦截等问题很难规避</p>\n<p>文本和按钮没有对齐、文本折行，仅仅是展示上的问题，用户自己就能觉察和规避，不影响正常使用</p>\n<p>主要应监控的异常，如交互逻辑错误、获取填充数据提交导致的脚本错误，会立刻终止用户的下一步操作，这类异常用户不知道是什么问题导致脚本异常，甚至不知道已经发生了异常</p>\n<p><strong>同源（ 协议、域名、端口）策略下</strong></p>\n<ul>\n<li>全局异常：window.onerror = function (message, url, lineNo, columnNo, error)，有兼容性问题</li>\n<li>Ajax 上下文：patch open send方法</li>\n<li>操作上下文：记录tagName和关键attribute，比如select的value和text</li>\n<li>页面依赖：记录类库的版本信息，简单方法可以遍历一下window对象，看看哪些属性包含有 Version、version、VERSION字段</li>\n<li>自定义数据：对开发者有用的字段，比如用lang字段区分语言环境</li>\n<li>浏览器数据：一般用于定位兼容性问题， 这些通过 userAgent 获得osType、browserType、browserVersion就可以了</li>\n<li>动态加载的内容：对 img、link、script 可以通过给标签添加 onerror 回调函数</li>\n<li>其他：屏幕的分辨率、错误发生的客户端时间信息，在流量允许的范围内，应该提供尽可能多的环境数据</li>\n</ul>\n<p><strong>非同源策略（如CDN）</strong></p>\n<p>非同源脚本中的报错在 window.onerror 中只会出现 script error，要解决这个问题，需要在服务器端增加 Access-Control-Allow-Origin 的配置，并且在客户端脚本增加 crossorigin=”anonymous”属性，不过这个做法会有兼容性问题</p>\n<p>其他的方法还有同域化，patch原生方法加入try catch，babel自动patch</p>\n<p><strong>框架层解决方案</strong></p>\n<ul>\n<li>Angular：ErrorHandler</li>\n<li>Vue：Vue.config.errorHandler</li>\n<li>React：componentDidCatch</li>\n</ul>\n<h3>数据处理</h3>\n<p>一个重复的错误，不应该不断上报，否则会造成数据冗余和流量浪费，因此，应该对上报的内容频率加以限制</p>\n<ol>\n<li>随机上报 - 不是所有的错误都上报，满足给定条件的才上报</li>\n<li>合并上报 - 当出现异常时，给定一个队列和延时。如果延时期内又出现了新的错误，就加入到错误队列中。延时期到或者队列达到最大容量，把队列中的所有异常信息集中上报，还可以将公共的信息，比如依赖信息、浏览器相关、用户自定义数据都可以合并到一起</li>\n<li>服务端限制 - 客户端总是不可控的，当客户端在单位时间内上报的错误数超过限制时，可以返回429（Too Many Request）</li>\n<li>数据压缩 - 如果要采集的数据量不大，可以明文上报，对于合并上报的数据量可能要十几Kb，对于PV大的站点，产生的流量还是很可观的，所以要压缩上报，比如 lz-string 之类的字符串压缩类库</li>\n</ol>\n<p><strong>数据差异化</strong></p>\n<p>相同的异常，在不同浏览器下，message、columnNo、error 都有可能不一致，所以要对信息进行normalize，\n比如 raven.js 会使用 TraceKit 来 normalize error strings，其他类似的库还有 stacktrace.js</p>\n<p><strong>数据持久化</strong></p>\n<p>传统的监控服务一般都会使用 MySQL 等数据库进行数据持久化，但当数据量指数级增长时，MySQL 这种 OLTP 数据库已经不再适合用来提供监控数据分析服务。</p>\n<h3>分析 &#x26; 告警</h3>\n<ul>\n<li>\n<p>找到问题触发的特征，比如是否集在某个页面或者某种浏览器等等</p>\n</li>\n<li>\n<p>仅仅通过报错数的多少不足以判断系统是否稳定，某天的数据出现暴增，可能是因为页面的访问量出现暴增，或者有爬虫用户</p>\n</li>\n<li>\n<p>异常波动一定有元凶：新发布的版本存在 Bug，后端接口突然故障</p>\n</li>\n</ul>\n<p>绝大多数的监控平台都提供按规则报警的能力，报警的问题在于随着业务的不断发展，原本配置的规则将会出现阈值过低或过高的问题，若阈值配置过低，则会产生大量的误报，继而引起整个监控能力的报警疲劳</p>\n<p>解决上述问题，可以引入一些简单的数学模型来解决时序数据的异常识别工作，以常见的高斯分布（正态分布）为例，利用 3-sigma 原则可以快速判断某一时刻的报错数是否满足概率分布，继而可以产生报警</p>",frontmatter:{title:"前端监控系统总结",tags:["Web","Front-End"],categories:["编程"],date:"April 06, 2018"}}},pathContext:{slug:"/前端监控系统总结/",previous:{fields:{slug:"/函数式编程基本概念/"},frontmatter:{path:"/functional-programming-basics",title:"函数式编程基本概念",tags:["Programming"],categories:["编程"]}},next:{fields:{slug:"/前端工程师的一专多长/"},frontmatter:{path:"/front-end-engineer-skills",title:"前端工程师的一专多长",tags:["前端"],categories:["编程"]}}}}}});
//# sourceMappingURL=path---前端监控系统总结-6d41ef1ec6ed9ad02d50.js.map