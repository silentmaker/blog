webpackJsonp([0x8932ad75c099],{446:function(n,a){n.exports={data:{site:{siteMetadata:{title:"Elvin's Blog",author:"Elvin Ma"}},markdownRemark:{id:"/Users/maxingcong/Code/blog/src/pages/Canvas性能优化总结.md absPath of file >>> MarkdownRemark",html:'<p>Canvas性能优化的总体思路——在每一帧中，尽可能减少调用渲染相关 API 的次数，通常要以计算的复杂化为代价，尽可能调用渲染开销较低的 API，或者尽可能以渲染开销较低的方式调用渲染相关 API</p>\n<h3>context的赋值开销</h3>\n<p>Canvas的下上文是一个状态机，比如当你设置lineWidth时，浏览器会需要立刻地做一些事情，保证下次调用 API 时的准确性，因此，改变 context 状态的开销其实很大，我们应该适当地安排调用绘图 API 的顺序，降低 context 状态改变的频率，如下是对不同属性的赋值开销</p>\n<table>\n<thead>\n<tr>\n<th>line\n[\nWidth/Join/Cap\n]</th>\n<th>40+</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>[\nfill/stroke\n]\nStyle</td>\n<td>100+</td>\n</tr>\n<tr>\n<td>font</td>\n<td>1000+</td>\n</tr>\n<tr>\n<td>text\n[\nAlign/Baseline\n]</td>\n<td>60+</td>\n</tr>\n<tr>\n<td>shadow\n[\nBlur/OffsetX\n]</td>\n<td>40+</td>\n</tr>\n<tr>\n<td>shadowColor</td>\n<td>280+</td>\n</tr>\n</tbody>\n</table>\n<p>可见最好不要频繁设置绘图上下文的 font 属性</p>\n<h3>分层绘制</h3>\n<p>分层 Canvas 在任何动画区域大，动画效果复杂的情况下都是非常有必要的，能够大大降低完全不必要的渲染性能开销</p>\n<p>比如对很多游戏而言，主要角色变化的频率和幅度是很大的，而背景变化的频率或幅度则相对较小，所以我们只需要很频繁地更新和重绘人物，但背景也许只需要绘制一次，或者每隔 200ms 才重绘一次，绝对没有必要每 16ms 就重绘一次</p>\n<h3>离屏绘制</h3>\n<p>对于绘制图片，尽量不在动画中使用 putImageData 方法，它是一项开销极为巨大的操作，不适合在每一帧里面去调用</p>\n<p>绘制同样的一块区域，如果数据源是尺寸相仿的一张图片，那么性能会比较好，而如果数据源是一张大图上的一部分，性能就会比较差，因为每一次绘制还包含了裁剪工作</p>\n<p>我们可以先把待绘制的区域裁剪好，保存起来，这样每次绘制时就能轻松很多，对于绘制源是用路径绘制出的矢量形状的情况，离屏绘制还能帮你把这些操作简化为一次 drawImage 调用</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token comment">// 在离屏 canvas 上绘制</span>\n<span class="token keyword">var</span> canvasOffscreen <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">\'canvas\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\ncanvasOffscreen<span class="token punctuation">.</span>width <span class="token operator">=</span> dw<span class="token punctuation">;</span>\ncanvasOffscreen<span class="token punctuation">.</span>height <span class="token operator">=</span> dh<span class="token punctuation">;</span>\ncanvasOffscreen<span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token string">\'2d\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">drawImage</span><span class="token punctuation">(</span>image<span class="token punctuation">,</span> sx<span class="token punctuation">,</span> sy<span class="token punctuation">,</span> sw<span class="token punctuation">,</span> sh<span class="token punctuation">,</span> dx<span class="token punctuation">,</span> dy<span class="token punctuation">,</span> dw<span class="token punctuation">,</span> dh<span class="token punctuation">)</span><span class="token punctuation">;</span>\n \n<span class="token comment">// 在绘制每一帧的时候，绘制这个图形</span>\ncontext<span class="token punctuation">.</span><span class="token function">drawImage</span><span class="token punctuation">(</span>canvasOffscreen<span class="token punctuation">,</span> x<span class="token punctuation">,</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<p>保存图片也可以用离屏Canvas</p>\n<h3>避免阻塞</h3>\n<p>频繁（通常较小）的阻塞。其原因主要是过高的渲染性能开销，在每一帧中做的事情太多；而较大的阻塞，通常原因是运行复杂算法、大规模的 DOM 操作等等，思路一般是以下两种：</p>\n<ul>\n<li>使用 Web Worker，在另一个线程里进行计算。</li>\n<li>将任务拆分为多个较小的任务，插在多帧中进行。</li>\n</ul>\n<p>Web Worker 无法对 DOM 进行操作，所以有DOM操作时就可能采用第二种方法了</p>\n<p>总的来说，遵循上述的最佳实践，就可以解决或者避免Canvas相关大部分的性能问题</p>',frontmatter:{title:"Canvas性能优化总结",tags:["Javascript"],categories:["编程"],date:"September 20, 2018"}}},pathContext:{slug:"/Canvas性能优化总结/",previous:{fields:{slug:"/常见架构模式笔记/"},frontmatter:{path:"/10-common-architecture-patterns",title:"常见架构模式笔记",tags:["架构"],categories:["编程"]}},next:{fields:{slug:"/CDN基础总结/"},frontmatter:{path:"/cdn-notes",title:"CDN基础总结",tags:["Web"],categories:["编程"]}}}}}});
//# sourceMappingURL=path---canvas性能优化总结-4ae9a7c5add1c3a0b46e.js.map