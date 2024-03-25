---
title: "html"
date: "2022-10-16"
image: getting-started-nextjs.png
excerpt: html 的笔记
isFeatured: true
slug: html
category: ['html','bagu']
---



## HTML 语义化

* 让人跟容易看懂（增加代码的可读性）
* 让搜索引擎更容易看懂
* 在没有 CSS 样式下，页面也能呈现出很好的内容结构、代码结构



## script 标签中的属性

HTML 中的 `<script>` 标签包含下列 8 个属性：

- `async`
- `charset`
- `crossorigin`
- `defer`
- `integrity`
- `language`
- `src`
- `type`

我们重点关注 `async` 和 `defer` 属性

`script` 如果上面两个属性都不包括，那么此时的 `script` 标签将会阻碍 HTML 的解析，只有下载成功并执行完脚本，才会继续解析 HTML。

 `async script`  属性表示异步下载，即在解析 HTML 的过程中进行脚本的异步下载，下载成功后立刻执行（仍然可能阻断 HTML 的解析）

* 下载完就执行

 `defer script`  属性同样是在解析 HTML 的过程进行脚本的异步下载，但是只有在 HTML 解析完成之后才会顺序执行脚本

* 渲染完再执行

在 `<script>` 元素中的代码被计算完成之前，页面的其余内容不会被加载，也不会被显示

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ea091aed8364b88a653a13c4845a824~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)





# src 和 href 的区别

**src：** 表示对资源的引用，它指向的内容会嵌入到当前标签所在的位置。src会将其指向的资源下载并应⽤到⽂档内，如请求js脚本。当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执⾏完毕，所以⼀般js脚本会放在页面底部。

**href：** 表示超文本引用，它指向一些网络资源，建立和当前元素或本文档的链接关系。当浏览器识别到它他指向的⽂件时，就会并⾏下载资源，不会停⽌对当前⽂档的处理。 常用在a、link等标签上。





# 常⽤的meta标签有哪些



`meta` 标签由 `name` 和 `content` 属性定义，**用来描述网页文档的属性**



常用的meta标签： 

（1）`charset`，用来描述HTML文档的编码类型：

```html
<meta charset="UTF-8" >
复制代码
```

（2） `keywords`，页面关键词：

```html
<meta name="keywords" content="关键词" />
复制代码
```

（3）`description`，页面描述：

```html
<meta name="description" content="页面描述内容" />
复制代码
```

（4）`refresh`，页面重定向和刷新：

```html
<meta http-equiv="refresh" content="0;url=" />
复制代码
```

（5）`viewport`，适配移动端，可以控制视口的大小和比例：

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
```





# 从浏览器地址栏输入 url 到请求返回发生了什么



1. 首先会通过 URL 解析出协议、主机、端口号、路径等信息，构造出一个 HTTP 请求
2. **缓存判断：** 浏览器会判断所请求的资源是否在缓存里，如果请求的资源在缓存里并且没有失效，那么就直接使用，否则向服务器发起新的请求。
3. 通过 DNS，得到IP 地址,下一步首先需要获取的是输入的 URL 中的域名的 IP 地址，首先会判断本地是否有该域名的 IP 地址的缓存，如果有则使用，如果没有则向本地 DNS 服务器发起请求。本地 DNS 服务器也会先检查是否存在缓存，如果没有就会先向根域名服务器发起请求，获得负责的顶级域名服务器的地址后，再向顶级域名服务器请求，然后获得负责的权威域名服务器的地址后，再向权威域名服务器发起请求，最终获得域名的 IP 地址后，本地 DNS 服务器再将这个 IP 地址返回给请求的用户。用户向本地 DNS 服务器发起请求属于递归请求，本地 DNS 服务器向各级域名服务器发起请求属于迭代请求。
4. 通过三次握手建立 TCP 链接
5. 发起 HTTP 请求,如果使用的是 HTTPS 协议，在通信前还存在 TLS 的一个四次握手的过程。
6. 服务端处理请求并返回 HTTP 报文
7. 浏览器渲染页面
7. 通过四次挥手断开链接





 



