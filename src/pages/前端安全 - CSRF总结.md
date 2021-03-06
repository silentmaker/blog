---
title: '前端安全 - CSRF总结'
date: '2018-05-26'
categories: ['编程']
path: '/security-issue-csrf'
---

CSRF（Cross-site request forgery）跨站请求伪造：攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求，利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行特定操作的目的

典型的CSRF攻击流程如下：

1. 受害者登录a.com，并保留了登录凭证（Cookie）
2. 攻击者引诱受害者访问了b.com
3. b.com 向 a.com 发送了一个请求：a.com/act=xx。浏览器会默认携带a.com的Cookie
4. a.com接收到请求后，对请求进行验证，并确认是受害者的凭证，误以为是受害者自己发送的请求
5. a.com以受害者的名义执行了act=xx
6. 攻击完成，攻击者在受害者不知情的情况下，冒充受害者，让a.com执行了自己定义的操作

### CSRF攻击类型

**GET类型的CSRF**
GET类型的CSRF利用非常简单，只需要一个HTTP请求，一般会这样利用：

假设页面上一张图片的地址为`https://awps-assets.meituan.net/mit-x/blog-images-bundle-2018b/ff0cdbee.example/withdraw?amount=10000&for=hacker`，在受害者访问含有这个页面后，浏览器会自动向`http://bank.example/withdraw`发出包含受害者登录信息的一次跨域请求

**POST类型的CSRF**

这种类型的CSRF通常使用的是一个自动提交的表单：

```html
<form action="http://bank.example/withdraw" method=POST>
<input type="hidden" name="account" value="xiaoming" />
<input type="hidden" name="amount" value="10000" />
<input type="hidden" name="for" value="hacker" />
</form>
<script> document.forms[0].submit(); </script>
```

访问这个页面时，表单会自动提交，相当于模拟用户完成了一次POST操作，POST类型的攻击通常比GET要求更加严格一点，但仍并不复杂，任何个人网站、博客，被黑客上传页面的网站都有可能是发起攻击的来源，后端接口不能将安全寄托在仅允许POST上面

**链接类型的CSRF**

链接类型的CSRF并不常见，这种攻击需要用户点击链接才会触发这种类型通常是在论坛中发布的图片中嵌入恶意链接，或者以广告的形式诱导用户中招：

```html
<a href="http://test.com/csrf/withdraw.php?amount=1000&for=hacker" taget="_blank">震惊！！<a/>
```

由于之前用户登录了信任的网站A，并且保存登录状态，只要用户主动访问上面的这个PHP页面，则表示攻击成功

**CSRF的特点**

- 攻击一般发起在第三方网站，而不是被攻击的网站，被攻击的网站无法防止攻击发生。
- 攻击利用受害者在被攻击网站的登录凭证，冒充受害者提交操作；而不是直接窃取数据。
  整个过程攻击者并不能获取到受害者的登录凭证，仅仅是“冒用”。
- 跨站请求可以用各种方式：图片URL、超链接、CORS、Form提交等等，部分请求方式可以直接嵌入在第三方论坛、文章中，难以进行追踪
- CSRF通常是跨域的，因为外域通常更容易被攻击者掌控，但如果本域下有容易被利用的功能，比如可以发图和链接的论坛和评论区，攻击可以直接在本域下进行，而且这种攻击更加危险

### CSRF防护策略

针对第三方域名和CSRF攻击者不能获取到Cookie这两点，可以采用的方案有：

- **同源检测**

在HTTP协议中，每一个异步请求都会携带两个Header，用于标记来源域名：Origin Header 和 Referer Header，我们可以通过这两个字段直接禁止外域或者白名单以外的域名的请求，注意 IE11同源策略： IE 11 不会在跨站CORS请求上添加Origin标头，Referer头将仍然是唯一的标识

在302情况下，两者可能都不存在，这时把Referrer Policy的策略设置成same-origin，对于同源的链接和引用，会发送Referer，referer值为Host不带Path；跨域访问则不携带Referer，例如： aaa.com 引用bbb.com 的资源，不会发送Referer

同源验证是一个相对简单的防范方法，能够防范绝大多数的CSRF攻击，但这并不是万无一失

- **CSRF Token**

用户打开页面的时候，服务器需要给这个用户生成一个Token，该Token通过加密算法对数据进行加密，一般Token都包括随机字符串和时间戳的组合

为了安全起见Token不能再放在Cookie中，最好还是存在服务器的Session中，对于DOM中所有的a和form标签后加入Token，所有的Ajax请求也要带上Token

**分布式校验问题**：在分布式环境下同一个用户发送的多次HTTP请求可能会先后落到不同的服务器上，导致后面发起的HTTP请求无法拿到之前的HTTP请求存储在服务器中的Session数据，从而使得Session机制在分布式环境下失效，因此在分布式集群中CSRF Token需要存储在Redis之类的公共存储空间，另一种解决方法是使用Encrypted Token Pattern方式，这种方法的Token是一个计算出来的结果，而非随机生成的字符串，校验时无需再去读取存储的Token，只用再次计算一次即可，这种Token的值通常是使用UserID、时间戳和随机数，通过加密的方法生成。这样既可以保证分布式服务的Token一致，又能保证Token不容易被破解，在token解密成功之后，服务器可以访问解析值，Token中包含的UserID和时间戳将会被拿来被验证有效性，将UserID与当前登录的UserID进行比较，并将时间戳与当前时间进行比较

- **双重Cookie验证**

利用CSRF攻击不能获取到用户Cookie的特点，我们可以要求Ajax和表单请求携带一个Cookie中的值，此方法相对于CSRF Token就简单了许多。可以直接通过前后端拦截的的方法自动化实现。后端校验也更加方便，只需进行请求中字段的对比，而不需要再进行查询和存储Token

不过此方法并没有大规模应用，其在大型网站上的安全性还是没有CSRF Token高，比如子域被攻击成功后攻击者修改了主域的Cookie，然后就可以对主域发起攻击

- **Samesite Cookie**

Google起草了一份草案来改进HTTP协议，为Set-Cookie响应头新增Samesite属性，它用来标明这个 Cookie是个“同站Cookie”，同站Cookie只能作为第一方Cookie，不能作为第三方Cookie，Samesite 有两个属性值Strict 和Lax，分别代表严格模式和宽松模式

严格模式下，Cookie 在任何情况下都不可能作为第三方 Cookie，包括百度搜索结果页跳转也不会带上Cookie，用户进入页面时不会有登录态；宽松模式则是在请求刷新了页面或者打开了新页面，且同时是个GET请求时，才会携带Cookie

简单总结上述的防护策略：

- CSRF自动防御策略：同源检测（Origin 和 Referer 验证）
- CSRF主动防御措施：Token验证 或者 双重Cookie验证 以及配合Samesite Cookie