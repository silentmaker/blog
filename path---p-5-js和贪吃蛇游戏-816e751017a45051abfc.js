webpackJsonp([0x90d6c8f3004b],{439:function(n,s){n.exports={data:{site:{siteMetadata:{title:"Elvin's Blog",author:"Elvin Ma"}},markdownRemark:{id:"/Users/maxingcong/Code/blog/src/pages/P5.js和贪吃蛇游戏.md absPath of file >>> MarkdownRemark",html:'<h4>P5.js</h4>\n<p>P5.js源于Processing，它们原来的出发点都是使图形编程可供艺术家，设计师，教育工作者和初学者使用，而Processing是很多年前提出的技术了，其实现其实是使用regex将Java转换为JS，而P5.js则是以原生JavaScript的方式重新构想Processing的原始目标</p>\n<p>使用P5.js非常简单，在页面引入P5.js后，在script标签或者外部js文件里写一个setup方法即可：</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">function</span> <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// 默认会隐含执行createCanvas(100, 100);</span>\n  <span class="token function">line</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">,</span> <span class="token number">25</span><span class="token punctuation">,</span> <span class="token number">70</span><span class="token punctuation">,</span> <span class="token number">90</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>通过添加一个自变量和一个draw方法就可以简单地实现动画：</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>\n\n<span class="token keyword">function</span> <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token function">createCanvas</span><span class="token punctuation">(</span><span class="token number">300</span><span class="token punctuation">,</span> <span class="token number">300</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token function">background</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  \n<span class="token punctuation">}</span>\n\n<span class="token keyword">function</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token function">ellipse</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> height<span class="token operator">/</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  x <span class="token operator">=</span> x <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>P5还提供了其他很多钩子函数和全局变量以实现更复杂的交互和效果：</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">var</span> mouseX<span class="token punctuation">,</span> touchX<span class="token punctuation">,</span> mouseY<span class="token punctuation">,</span> touchY<span class="token punctuation">,</span> touches<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token comment">// 鼠标或者手指的位置</span>\n<span class="token keyword">function</span> <span class="token function">ouseIsPresse</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token keyword">function</span> <span class="token function">ousePressed</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token keyword">function</span> <span class="token function">touchStarted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token keyword">function</span> <span class="token function">mouseMoved</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token keyword">function</span> <span class="token function">mouseDragged</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token keyword">function</span> <span class="token function">touchMoved</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token keyword">function</span> <span class="token function">mouseReleased</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token keyword">function</span> <span class="token function">touchEnded</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token keyword">function</span> <span class="token function">mouseClicked</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token keyword">function</span> <span class="token function">mouseScrolled</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// 用户交互如点击拖动的事件回调</span></code></pre>\n      </div>\n<p>P5.js也支持实例模式的初始化：</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">var</span> <span class="token function-variable function">s</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span> p <span class="token punctuation">)</span> <span class="token punctuation">{</span>\n\n  <span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span> \n  <span class="token keyword">var</span> y <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>\n\n  p<span class="token punctuation">.</span><span class="token function-variable function">setup</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    p<span class="token punctuation">.</span><span class="token function">createCanvas</span><span class="token punctuation">(</span><span class="token number">700</span><span class="token punctuation">,</span> <span class="token number">410</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n  p<span class="token punctuation">.</span><span class="token function-variable function">draw</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    p<span class="token punctuation">.</span><span class="token function">background</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    p<span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    p<span class="token punctuation">.</span><span class="token function">rect</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span>y<span class="token punctuation">,</span><span class="token number">50</span><span class="token punctuation">,</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">var</span> myp5 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">p5</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> <span class="token string">\'myContainer\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>现在，让我们用React + P5.js来做一个贪吃蛇游戏，首先通过npm方式安装P5.js，</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> Component <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'react\'</span>\n<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> p5 <span class="token keyword">from</span> <span class="token string">\'p5\'</span>\n<span class="token keyword">import</span> <span class="token string">\'./App.css\'</span></code></pre>\n      </div>\n<p>然后写一个工厂方法来生成Snake对象：</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">const</span> <span class="token function-variable function">defaultSnake</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>\n  x<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n  y<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n  xspeed<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>\n  yspeed<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span>\n  bodies<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n  length<span class="token punctuation">:</span> <span class="token number">0</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<p>在React组件初始化的时候绑定好事件回调，并在mounted的时候实例化P5.js，并赋值给组件实例的painter属性</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">class</span> <span class="token class-name">App</span> <span class="token keyword">extends</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>\n  <span class="token function">constructor</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span>\n\n    <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> <span class="token punctuation">{</span> isOver<span class="token punctuation">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>painter <span class="token operator">=</span> <span class="token keyword">null</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>width <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>innerWidth<span class="token punctuation">,</span> window<span class="token punctuation">.</span>innerHeight<span class="token punctuation">,</span> <span class="token number">600</span><span class="token punctuation">)</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>columns <span class="token operator">=</span> <span class="token number">36</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>snake <span class="token operator">=</span> <span class="token function">defaultSnake</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>food <span class="token operator">=</span> <span class="token punctuation">{</span>x<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span> y<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">}</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>orientation <span class="token operator">=</span> <span class="token string">\'\'</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>gridSize <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>width <span class="token operator">/</span> <span class="token keyword">this</span><span class="token punctuation">.</span>columns\n    <span class="token keyword">this</span><span class="token punctuation">.</span>speedLevel <span class="token operator">=</span> <span class="token number">8</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>speedCount <span class="token operator">=</span> <span class="token number">0</span>\n\n    <span class="token keyword">this</span><span class="token punctuation">.</span>setup <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>setup<span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>draw <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>draw<span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>keyPressed <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>keyPressed<span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>turn <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>turn<span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>over <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>over<span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>restart <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>restart<span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n  <span class="token function">componentDidMount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">initReactFastclick</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n    <span class="token keyword">new</span> <span class="token class-name">p5</span><span class="token punctuation">(</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      <span class="token keyword">this</span><span class="token punctuation">.</span>painter <span class="token operator">=</span> p<span class="token punctuation">;</span>\n      p<span class="token punctuation">.</span>setup <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>setup\n      p<span class="token punctuation">.</span>draw <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>draw\n    <span class="token punctuation">}</span><span class="token punctuation">,</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">\'snake-game\'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n\n    document<span class="token punctuation">.</span>onkeydown <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>keyPressed\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> App</code></pre>\n      </div>\n<p>setup方法里，只需要设置画布大小和帧率，同时初始化一个Food对象即可：</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token punctuation">{</span>\n  <span class="token operator">...</span>\n  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>painter<span class="token punctuation">.</span><span class="token function">frameRate</span><span class="token punctuation">(</span><span class="token number">60</span><span class="token punctuation">)</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>painter<span class="token punctuation">.</span><span class="token function">createCanvas</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>width<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>width<span class="token punctuation">)</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">createFood</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n  <span class="token function">createFood</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> <span class="token punctuation">{</span>painter<span class="token punctuation">,</span> food<span class="token punctuation">,</span> columns<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span>\n\n    food<span class="token punctuation">.</span>x <span class="token operator">=</span> painter<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>painter<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> columns <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    food<span class="token punctuation">.</span>y <span class="token operator">=</span> painter<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>painter<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> columns <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n  <span class="token operator">...</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>draw方法则包含了所有绘图和碰撞检测的逻辑，通过维护一个长度等于Snake当前length的Bodies数组来绘制Snake，并且还可以一个speedLevel属性来修改游戏的速度来改变难度：</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token punctuation">{</span>\n  <span class="token operator">...</span>\n  <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>speedCount <span class="token operator">&lt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>speedLevel<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">this</span><span class="token punctuation">.</span>speedCount <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>\n      <span class="token keyword">return</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n      <span class="token keyword">this</span><span class="token punctuation">.</span>speedCount <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">const</span> <span class="token punctuation">{</span>painter<span class="token punctuation">,</span> snake<span class="token punctuation">,</span> food<span class="token punctuation">,</span> gridSize<span class="token punctuation">,</span> columns<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span>\n    <span class="token keyword">const</span> nextX <span class="token operator">=</span> snake<span class="token punctuation">.</span>x <span class="token operator">+</span> snake<span class="token punctuation">.</span>xspeed\n    <span class="token keyword">const</span> nextY <span class="token operator">=</span> snake<span class="token punctuation">.</span>y <span class="token operator">+</span> snake<span class="token punctuation">.</span>yspeed\n\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>nextX <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> nextY <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> nextX <span class="token operator">>=</span> columns <span class="token operator">||</span> nextY <span class="token operator">>=</span> columns<span class="token punctuation">)</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">over</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n\n    painter<span class="token punctuation">.</span><span class="token function">background</span><span class="token punctuation">(</span><span class="token string">\'#E2E1DD\'</span><span class="token punctuation">)</span>\n    painter<span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token string">\'#3D9DA5\'</span><span class="token punctuation">)</span>\n    painter<span class="token punctuation">.</span><span class="token function">rect</span><span class="token punctuation">(</span>snake<span class="token punctuation">.</span>x <span class="token operator">*</span> gridSize<span class="token punctuation">,</span> snake<span class="token punctuation">.</span>y <span class="token operator">*</span> gridSize<span class="token punctuation">,</span> gridSize<span class="token punctuation">,</span> gridSize<span class="token punctuation">)</span>\n    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> snake<span class="token punctuation">.</span>bodies<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span>nextX <span class="token operator">===</span> snake<span class="token punctuation">.</span>bodies<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>x <span class="token operator">&amp;&amp;</span> nextY <span class="token operator">===</span> snake<span class="token punctuation">.</span>bodies<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>y<span class="token punctuation">)</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">over</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n      painter<span class="token punctuation">.</span><span class="token function">rect</span><span class="token punctuation">(</span>snake<span class="token punctuation">.</span>bodies<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>x <span class="token operator">*</span> gridSize<span class="token punctuation">,</span> snake<span class="token punctuation">.</span>bodies<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>y <span class="token operator">*</span> gridSize<span class="token punctuation">,</span> gridSize<span class="token punctuation">,</span> gridSize<span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n    painter<span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token string">\'#BB7F3B\'</span><span class="token punctuation">)</span>\n    painter<span class="token punctuation">.</span><span class="token function">rect</span><span class="token punctuation">(</span>food<span class="token punctuation">.</span>x <span class="token operator">*</span> gridSize<span class="token punctuation">,</span> food<span class="token punctuation">.</span>y <span class="token operator">*</span> gridSize<span class="token punctuation">,</span> gridSize<span class="token punctuation">,</span> gridSize<span class="token punctuation">)</span>\n\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>snake<span class="token punctuation">.</span>x <span class="token operator">===</span> food<span class="token punctuation">.</span>x <span class="token operator">&amp;&amp;</span> snake<span class="token punctuation">.</span>y <span class="token operator">===</span> food<span class="token punctuation">.</span>y<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      snake<span class="token punctuation">.</span>length <span class="token operator">+=</span> <span class="token number">1</span>\n      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>speedLevel <span class="token operator">></span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token keyword">this</span><span class="token punctuation">.</span>speedLevel <span class="token operator">-=</span> <span class="token number">1</span>\n      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">createFood</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n\n    snake<span class="token punctuation">.</span>bodies<span class="token punctuation">.</span><span class="token function">unshift</span><span class="token punctuation">(</span><span class="token punctuation">{</span>x<span class="token punctuation">:</span> snake<span class="token punctuation">.</span>x<span class="token punctuation">,</span> y<span class="token punctuation">:</span> snake<span class="token punctuation">.</span>y<span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>snake<span class="token punctuation">.</span>bodies<span class="token punctuation">.</span>length <span class="token operator">></span> snake<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      snake<span class="token punctuation">.</span>bodies<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n\n    snake<span class="token punctuation">.</span>x <span class="token operator">=</span> nextX\n    snake<span class="token punctuation">.</span>y <span class="token operator">=</span> nextY\n  <span class="token punctuation">}</span>\n  <span class="token operator">...</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>转向的turn方法和html 模板都很简单，就略过代码了，最后加上结束和重启游戏的方法，并注意在组件销毁的时候解绑监听器就可以了</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token punctuation">{</span>\n  <span class="token operator">...</span>\n  <span class="token function">over</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>painter<span class="token punctuation">.</span><span class="token function">noLoop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    window<span class="token punctuation">.</span>navigator<span class="token punctuation">.</span><span class="token function">vibrate</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">200</span><span class="token punctuation">]</span><span class="token punctuation">)</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span> isOver<span class="token punctuation">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n  <span class="token function">restart</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>snake <span class="token operator">=</span> <span class="token function">defaultSnake</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>speedLevel <span class="token operator">=</span> <span class="token number">8</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>speedCount <span class="token operator">=</span> <span class="token number">0</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>painter<span class="token punctuation">.</span><span class="token function">loop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span> isOver<span class="token punctuation">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n  <span class="token function">componentWillUnmount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    document<span class="token punctuation">.</span>onkeydown <span class="token operator">=</span> <span class="token keyword">null</span>\n  <span class="token punctuation">}</span>\n  <span class="token operator">...</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>用P5.js实现这类小游戏很方便快捷，实现的效果可以看这里：<a href="https://silentmaker.github.io/snake/">Snake Game</a></p>',
frontmatter:{title:"P5.js和贪吃蛇游戏",tags:["javascript","Game"],categories:["编程"],date:"February 02, 2018"}}},pathContext:{slug:"/P5.js和贪吃蛇游戏/",previous:{fields:{slug:"/用OpenConnectSever搭建VPN/"},frontmatter:{path:"/ocserv-letsencrypt-vpn",title:"OpenConnectSever搭建VPN总结",tags:["VPN","Web"],categories:["编程"]}},next:{fields:{slug:"/函数式编程基本概念/"},frontmatter:{path:"/functional-programming-basics",title:"函数式编程基本概念",tags:["Programming"],categories:["编程"]}}}}}});
//# sourceMappingURL=path---p-5-js和贪吃蛇游戏-816e751017a45051abfc.js.map