webpackJsonp([0x5c279f9403b5],{455:function(n,s){n.exports={data:{site:{siteMetadata:{title:"Elvin's Blog",author:"Elvin Ma"}},markdownRemark:{id:"/Users/maxingcong/Code/blog/src/pages/redux-cheatsheet.md absPath of file >>> MarkdownRemark",html:'<h3>Redux</h3>\n<p>Create a store</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">import</span> <span class="token punctuation">{</span> createStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'redux\'</span>\n<span class="token comment">// Reducer</span>\n<span class="token keyword">function</span> <span class="token function">counter</span> <span class="token punctuation">(</span>state <span class="token operator">=</span> <span class="token punctuation">{</span> value<span class="token punctuation">:</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> action<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">switch</span> <span class="token punctuation">(</span>action<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">case</span> <span class="token string">\'INCREMENT\'</span><span class="token punctuation">:</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span> value<span class="token punctuation">:</span> state<span class="token punctuation">.</span>value <span class="token operator">+</span> <span class="token number">1</span> <span class="token punctuation">}</span>\n  <span class="token keyword">case</span> <span class="token string">\'DECREMENT\'</span><span class="token punctuation">:</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span> value<span class="token punctuation">:</span> state<span class="token punctuation">.</span>value <span class="token operator">-</span> <span class="token number">1</span> <span class="token punctuation">}</span>\n  <span class="token keyword">default</span><span class="token punctuation">:</span>\n    <span class="token keyword">return</span> state\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n<span class="token keyword">let</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span>counter<span class="token punctuation">)</span>\n<span class="token comment">// Or Optionally - `initialState` as a second argument</span>\n<span class="token keyword">let</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span>counter<span class="token punctuation">,</span> <span class="token punctuation">{</span> value<span class="token punctuation">:</span> <span class="token number">0</span> <span class="token punctuation">}</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<p>Use a store</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">let</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span>counter<span class="token punctuation">)</span>\n<span class="token comment">// Dispatches an action</span>\nstore<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token punctuation">{</span> type<span class="token punctuation">:</span> <span class="token string">\'INCREMENT\'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>\nstore<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token punctuation">{</span> type<span class="token punctuation">:</span> <span class="token string">\'DECREMENT\'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token comment">// Gets current state</span>\nstore<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n<span class="token comment">// Subscribe for changes</span>\n<span class="token keyword">const</span> unsubscribe <span class="token operator">=</span> store<span class="token punctuation">.</span><span class="token function">subscribe</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span> <span class="token operator">...</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token comment">// Unsubscribe</span>\n<span class="token function">unsubscribe</span><span class="token punctuation">(</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<h3>React Redux</h3>\n<p>Provider</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">import</span> <span class="token punctuation">{</span> Provider <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'react-redux\'</span>\nReact<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>\n  <span class="token operator">&lt;</span>Provider store<span class="token operator">=</span><span class="token punctuation">{</span>store<span class="token punctuation">}</span><span class="token operator">></span>\n    <span class="token operator">&lt;</span>App <span class="token operator">/</span><span class="token operator">></span>\n  <span class="token operator">&lt;</span><span class="token operator">/</span>Provider<span class="token operator">></span><span class="token punctuation">,</span> mountNode<span class="token punctuation">)</span></code></pre>\n      </div>\n<p>Mapping state</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">import</span> <span class="token punctuation">{</span> connect <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">\'react-redux\'</span>\n<span class="token comment">// A functional React component</span>\n<span class="token keyword">function</span> <span class="token function">App</span> <span class="token punctuation">(</span><span class="token punctuation">{</span> message<span class="token punctuation">,</span> onMessageClick <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">(</span>\n    <span class="token operator">&lt;</span>div onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">onMessageClick</span><span class="token punctuation">(</span><span class="token string">\'hello\'</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">></span>\n      <span class="token punctuation">{</span>message<span class="token punctuation">}</span>\n    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>\n  <span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n<span class="token comment">// Maps `state` to `props`:</span>\n<span class="token comment">// These will be added as props to the component.</span>\n<span class="token keyword">function</span> <span class="token function">mapState</span> <span class="token punctuation">(</span>state<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span> message<span class="token punctuation">:</span> state<span class="token punctuation">.</span>message <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// Maps `dispatch` to `props`:</span>\n<span class="token keyword">function</span> <span class="token function">mapDispatch</span> <span class="token punctuation">(</span>dispatch<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span>\n    <span class="token function">onMessageClick</span> <span class="token punctuation">(</span>message<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token punctuation">{</span> type<span class="token punctuation">:</span> <span class="token string">\'click\'</span><span class="token punctuation">,</span> message <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// Connect them:</span>\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">connect</span><span class="token punctuation">(</span>mapState<span class="token punctuation">,</span> mapDispatch<span class="token punctuation">)</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span></code></pre>\n      </div>\n<p>Shorthand</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">connect</span><span class="token punctuation">(</span>\n  <span class="token punctuation">(</span>state<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>\n    message<span class="token punctuation">:</span> state<span class="token punctuation">.</span>message\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token punctuation">(</span>dispatch<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>\n    onMessageClick<span class="token punctuation">:</span> <span class="token punctuation">(</span>message<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token punctuation">{</span> type<span class="token punctuation">:</span> <span class="token string">\'click\'</span><span class="token punctuation">,</span> message <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">)</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span></code></pre>\n      </div>\n<p>Combining reducers</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">const</span> reducer <span class="token operator">=</span> <span class="token function">combineReducers</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  counter<span class="token punctuation">,</span> user<span class="token punctuation">,</span> store\n<span class="token punctuation">}</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<h3>Middleware</h3>\n<p>Signature</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token comment">// noop middleware</span>\n<span class="token keyword">const</span> <span class="token function-variable function">logger</span> <span class="token operator">=</span> store <span class="token operator">=></span> dispatch <span class="token operator">=></span> action <span class="token punctuation">{</span> <span class="token function">dispatch</span><span class="token punctuation">(</span>action<span class="token punctuation">)</span> <span class="token punctuation">}</span>\n<span class="token keyword">const</span> <span class="token function-variable function">logger</span> <span class="token operator">=</span> store <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token comment">// This function runs on createStore().</span>\n  <span class="token comment">// It returns a decorator for dispatch().</span>\n\n  <span class="token keyword">return</span> dispatch <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token comment">// Runs on createStore(), too.</span>\n    <span class="token comment">// It returns a new dispatch() function</span>\n\n    <span class="token keyword">return</span> action <span class="token operator">=></span> <span class="token punctuation">{</span>\n      <span class="token comment">// Runs on every dispatch()</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Applying Middleware</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code class="language-javascript"><span class="token keyword">const</span> enhancer <span class="token operator">=</span> <span class="token function">applyMiddleware</span><span class="token punctuation">(</span>logger<span class="token punctuation">,</span> thunk<span class="token punctuation">,</span> <span class="token operator">...</span><span class="token punctuation">)</span>\n<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span>reducer<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> enhancer<span class="token punctuation">)</span></code></pre>\n      </div>\n<h3>More</h3>\n<p><a href="https://redux.js.org/">Redux Documentation</a></p>',frontmatter:{title:"Redux Cheatsheet",tags:["redux","javascript"],categories:["dev"],date:"July 26, 2018"}}},pathContext:{slug:"/redux-cheatsheet/",previous:{fields:{slug:"/using-ionic/"},frontmatter:{path:"/using-ionic",title:"Using Ionic",tags:["ionic","javascript"],categories:["dev"]}},next:{fields:{slug:"/rail-performance-model/"},frontmatter:{path:"/rail-performance-model",title:"RAIL Performance Model",tags:["performance","javascript"],categories:["dev"]}}}}}});
//# sourceMappingURL=path---redux-cheatsheet-1150e400274412a7272a.js.map