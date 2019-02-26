webpackJsonp([23518298290265],{475:function(n,e){n.exports={data:{site:{siteMetadata:{title:"Elvin's Blog",author:"Elvin Ma"}},markdownRemark:{id:"/Users/maxingcong/Code/blog/src/pages/函数式编程基本概念.md absPath of file >>> MarkdownRemark",html:"<p><em>编程范式</em> 是指一种基于基本原则来思考如何构建软件的方式，常见的范式还有 <em>面向对象编程</em>、<em>面向过程编程</em> 和 <em>函数式编程</em></p>\n<p><em>函数式编程</em>（Functional Programming）是通过编写<em>纯函数</em>，避免<em>共享状态</em>，避免<em>可变数据</em>，和避免<em>副作用</em>，从而构建软件的过程</p>\n<ul>\n<li>函数式编程是声明性的而不是命令式的，应用程序状态是通过纯函数来流转的</li>\n<li>函数式编程通过不可变数据结构和纯函数来从现在数据中得到新数据</li>\n<li>函数式的功能代码往往更简洁，更容易预测和测试</li>\n</ul>\n<h4>纯函数（Pure Function）</h4>\n<p>纯函数一般指符合下面两个条件的函数：</p>\n<ul>\n<li>给定相同输入时输出也必定相同</li>\n<li>没有副作用</li>\n</ul>\n<h4>状态共享（Shared State）</h4>\n<p>状态共享一般指：</p>\n<ul>\n<li>存在于共享作用域中的任何变量，对象或者内存空间</li>\n<li>作用域与作用域之间传递的属性</li>\n</ul>\n<p>状态共享可能导致的问题有：</p>\n<ul>\n<li>执行时间的先后可能会导致竞争状态</li>\n<li>更改调用函数的顺序可能会导致级联失败，即作用于共享状态的函数与时序有关</li>\n</ul>\n<h4>不可变性（Immutable）</h4>\n<p>不可变对象是指一旦创建后则不可以再修改的对象\nJavascript中暂无现成的不可变对象：</p>\n<ul>\n<li>const 声明创建的对象，不可重新赋值，但可以随意修改属性</li>\n<li>调用 Object.preventExtensions(obj) 操作对象，不可拓展新属性，严格模式下会报错，否则会静默失败</li>\n<li>调用 Object.seal() 操作对象，现有属性密封（属性描述符configurable为false）且不可拓展新属性</li>\n<li>调用 Object.freeze() 操作对旬，属性密封且不可拓展，现在属性configurable和writable都为false\n用字面量声明的对象属性一般writable、enumerable 和 configurable 都为true\n用 Object.defineProperty() 声明的对象属性中未定义的描述符属性为false</li>\n</ul>\n<p>在很多函数式编程语言中都存在称为 trie 的特殊不可以变数据结构，trie可以通过结构共享来处理对象中不变的那部分结构，\n使得内存消耗更低，很多操作的性能也会大大提升，javascript中也有对实现此类结构的尝试，比如immutable.js和mori</p>\n<h4>副作用（Side Effect）</h4>\n<p>常见的副作用包括：</p>\n<ul>\n<li>修改任何外部变量或对象属性</li>\n<li>输出到console、屏幕或者文件</li>\n<li>输出到网络</li>\n<li>触发任何外部处理</li>\n<li>调用其他有副作用的函数\n将副作用和程序逻辑的其他部分隔离开来，可以使得软件的拓展、重构、调试、测试和维护变得更容易\n很多前端框架也会鼓励开发者分别在独立的、低耦合的模块中管理状态和组件渲染</li>\n</ul>\n<h4>高阶函数（High-Order Function）与可复用性（Reusability）</h4>\n<p>高阶函数是指把函数作为参数的函数，或者返回一个函数的函数，其常用场景包括：</p>\n<ul>\n<li>使用回调或者promise的独立操作或者异步控制流</li>\n<li>创建可以接受多种数据类型的工具函数</li>\n<li>选取部分参数作用于函数，或者为了复用性进行函数库里化，或者用于函数组合</li>\n<li>取一系列函数，并组合其返回结果</li>\n</ul>\n<h4>容器（Container），函子（Functor），列表（List）和流（Stream）</h4>\n<p>函子是指具有可映射性的容器，比如Array.prototype.map()的容器一般是数组，但也可以是任何可迭代的对象\n也即任何提供了映射接口的列表，随时间推移而变化的列表就可以称为流，流也可以和列表用相同的处理函数</p>\n<h4>声明式（Declarative）与命令式（Imperative）</h4>\n<p>声明式的程序只描述得出想要的结果的步骤或者控制流，即How to do\n命令式的程序则主要强调对数据流的变化，即What to do\n在 Javascript 中，声明式和命令式的区别可以体现在分别用for和map去改变一个数组\n一般而言，命令式更依赖于语句，而声明式更依赖于表达式</p>",frontmatter:{title:"函数式编程基本概念",tags:["Programming"],categories:["编程"],date:"March 06, 2018"}}},pathContext:{slug:"/函数式编程基本概念/",previous:{fields:{slug:"/P5.js和贪吃蛇游戏/"},frontmatter:{path:"/build-snake-game-with-p5-js",title:"P5.js和贪吃蛇游戏",tags:["javascript","Game"],categories:["编程"]}},next:{fields:{slug:"/前端监控系统总结/"},frontmatter:{path:"/front-end-monitor",title:"前端监控系统总结",tags:["Web","Front-End"],categories:["编程"]}}}}}});
//# sourceMappingURL=path---函数式编程基本概念-7f58c22270b072fdb051.js.map