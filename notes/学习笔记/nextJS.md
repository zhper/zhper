---
title: "Next.js"
date: "2022-10-16"
image: getting-started-nextjs.png
excerpt: Next.js 的笔记
isFeatured: true
slug: nextjs
category: ['nextjs']
---


# Routing



![Terminology for Component Tree](https://nextjs.org/docs/light/terminology-component-tree.png)

在 nextjs 13 中， nextjs 介绍了一种基于 React 服务组件的 App Router

App Router 需要工作在名为 `app` 的文件夹下，如果项目中同时存在 `app` 文件夹，以及旧版本需要的 `pages` 文件夹，`app`文件夹将会具有更高的优先级

![Next.js App Directory](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fnext-router-directories.png&w=3840&q=75&dpl=dpl_9qSFFAmNNKNZjLDEnPpNY8xtMJnB)

默认的来说，在 `app` 文件夹下的组件会使 `React Server Components` ，你也可以使用 `Client Components` ，两者区别后面会详细介绍



Nextjs 使用了一个基于文系统的路由，在这个系统中

* 文件夹是用来定义路由的，一个路由是嵌套文件夹的单路径，从根文件夹一直到包含一个 `page.js` 文件的叶文件夹，详细见 `Defining Routes`
* 文件是用于创建一个路由片段（route segments）的展示 UI



**Route Segments**

每个文件夹在路由中都代表一个路由段，而每个路由段都会映射到在 URL 路径中的对应段

![How Route Segments Map to URL Segments](https://nextjs.org/docs/light/route-segments-to-path-segments.png)



其实简单来说，`App` 这个文件夹就代表着路由中的根路径（'/'）， 而下面创建的次级文件夹就是对应的路由段



**文件约定**

Nextjs 提供了一组特殊的文件，用于在嵌套路由中创建具有特殊行为的 UI

| 文件         | 描述                                              |
| ------------ | ------------------------------------------------- |
| layout       | 对一个 segment和它的 children 的共享 UI           |
| page         | 路由的唯一UI，使路由可公开访问                    |
| loading      | 对一个 segment和它的 children 的加载 UI           |
| not-found    | 对一个 segment和它的 children 的 Not Found 展示   |
| error        | 对一个 segment和它的 children 的error UI          |
| global-error | 全局 error UI                                     |
| route        | 这个是在 `api`文件夹下使用的，是服务器端 api 端点 |
| tmplate      | 专门的重新渲染布局UI                              |
| default      | 对于 `Parallel Routes`的 Fallback UI              |



**结构层次**

在 route segment 中特殊文件下定义的 react 组件会以特殊的层次呈现

- `layout.js`
- `template.js`
- `error.js` (React error boundary)
- `loading.js` (React suspense boundary)
- `not-found.js` (React error boundary)
- `page.js` or nested `layout.js`

![Component Hierarchy for File Conventions](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Ffile-conventions-component-hierarchy.png&w=3840&q=75&dpl=dpl_9qSFFAmNNKNZjLDEnPpNY8xtMJnB)



在嵌套路由中。这些组件将嵌套在其父元素的组件中。

![Nested File Conventions Component Hierarchy](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fnested-file-conventions-component-hierarchy.png&w=3840&q=75&dpl=dpl_9qSFFAmNNKNZjLDEnPpNY8xtMJnB)



### **Colocation**

除了特殊文件，你当然也可以将自己的文件放在 `app`目录下，因为只有 `router.js` 或者 `page.js` 返回的内容是公开的，其他的文件不影响

![An example folder structure with colocated files](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fproject-organization-colocation.png&w=3840&q=75&dpl=dpl_9qSFFAmNNKNZjLDEnPpNY8xtMJnB)



### 高级路由模式

* `Parallel Routes`, 平行路由，允许您在可以独立导航的同一视图中同时显示两个或多个页面。
* `Intercepting Routes` 拦截路由，允许你拦截一条路由，并在另一条路由的上下文中显示它



## Defining Routes



### Creating Routes

你只需要在 `app` 文件夹下创建文件，就能获得相应名称的路由

![Route segments to path segments](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Froute-segments-to-path-segments.png&w=3840&q=75&dpl=dpl_9qSFFAmNNKNZjLDEnPpNY8xtMJnB)

在最后一级文件夹中，你需要创建一个特殊的文件 `page.js` ，这样才能使你的路由片段公开可见

![Defining Routes](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fdefining-routes.png&w=3840&q=75&dpl=dpl_9qSFFAmNNKNZjLDEnPpNY8xtMJnB)

`/dashboard/analytics` 这个 URL 路径是不可见的，因为它下面没有 `page.js`，所以你只能将他用来存储一些组件之类的



## Pages and Layouts



Nextjs 提供了三个特殊文件 `page` , `layout`, `template`

### Pages

你可以在 `page.js` 中导出一个组件来定义一个页面，这个页面是这个路由段唯一的 UI， 你需要使用嵌套路由来定义一段路由同时定义一个 `page.js` 文件来使得这个路由公开可见

![page.js special file](https://nextjs.org/docs/light/page-special-file.png)





```jsx
// `app/page.tsx` is the UI for the `/` URL
export default function Page() {
  return <h1>Hello, Home page!</h1>
}
```

```jsx
// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
export default function Page() {
  return <h1>Hello, Dashboard Page!</h1>
}
```

>  `.js` `.jsx` `.tsx` 作为`page`后缀都是可行的



### Layouts

这是为了在多个页面之间共享 UI，比如导航栏之类的，避免重新渲染， Layouts 也可以嵌套

为了定义一个 `layout` ， 你需要从一个 `layout.js` 文件中导出一个 React 组件，这个组件接收一个 将会被填入到子布局中的`children` 参数（如果存在的话）

![layout.js special file](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Flayout-special-file.png&w=3840&q=75&dpl=dpl_Cwk9nEfGMCGXVNS2aBtf8GtguTZw)

```tsx
export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav></nav>
 
      {children}
    </section>
  )
}
```

#### Root Layout(Required)

这个根布局是必要的，定义在 `app` 目录的顶层文件中

```jsx
//app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

> * root layout 是必要的，里面定义的 UI 将会share 在所有的页面之中， 并且这个 layout 必须包含 `html` 和 `body` 标签
> * 任意的路由段都可以定义自己的  layout， 这些 layouts 将会在这个路由段之间 share
> * 默认情况下，路由中的  layput是嵌套的。每个父 layout使用React children属性将子  layout 封装在它的下面。
> * 你可以使用路由组来选择共享布局中的特定路由段。
> * 默认情况下， 布局是 Server 组件，但是也可以设置为 Client 组件
> * 你不可以在父 layout 和 子 layout 之间传递数据
> * 布局不能访问它下面的路由段。要访问所有路由段，你可以在客户端组件中使用 useSelectedLayoutSegment 或 useSelectedLayoutSegments。
> * layout.js 和 page.js文件可以在同一个文件夹中定义。布局将包裹页面。

#### 嵌套布局

在文件夹中定义的布局(例如app/dashboard/layout.js)应用于特定的路由段(例如acme.com/dashboard)，并在这些段处于活动状态时渲染。默认情况下，文件层次结构中的布局是嵌套的，这意味着它们通过其 `children` 属性包装子布局。

![Nested Layout](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fnested-layout.png&w=3840&q=75&dpl=dpl_AWSQ8N9G1x1fuWwoPnqyst5f7eC8)

```jsx
//app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}
```

> 注意： 只有 root layout 才会包含`<html>` and `<body>` tags.

根布局(app/layout.js)会包裹 dashboard布局(app/dashboard/layout.js)，它会包裹在app/dashboard/*中的路由段。

![Nested Layouts](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fnested-layouts-ui.png&w=3840&q=75&dpl=dpl_AWSQ8N9G1x1fuWwoPnqyst5f7eC8)



### Templates

template 类似于 layout，因为它们会包装每个子布局或页面。与跨路由持久保存和维护状态的 layout不同，模板在导航上为它们的每个子实例创建一个新实例。这意味着当用户在共享模板的路由之间导航时，组件的新实例被挂载，DOM元素被重新创建，状态不被保留，效果被重新同步。

你也许会使用 templates 在下面的情况

* Features that rely on `useEffect` (e.g logging page views) and `useState` (e.g a per-page feedback form). （暂不懂什么意思）
* 更改默认的框架行为。例如，layout 中的Suspense Boundaries仅在 layout 第一次加载时显示 fallback ，而在切换页面时则不显示。对于template ，fallback 显示在每个导航栏上。

template 可以通过从 `template.js` 文件中导出一个默认的React组件来定义。组件应该接受一个 `children` prop。

```jsx
export default function Template({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
```

在嵌套方面，template.js是在 layout 和它的子布局之间呈现的。下面是一个简化的输出:

```jsx
<Layout>
  {/* Note that the template is given a unique key. */}
  <Template key={routeParam}>{children}</Template>
</Layout>
```



### Modifying \<head>



在app目录中，你可以使用内置的SEO支持来修改\<head> HTML元素，比如title和meta。

metadata 可以通过在layout.js或page.js文件中导出 `metadata` objec或generateMetadata函数来定义。

```jsx
//import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Next.js',
}
 
export default function Page() {
  return '...'
}
import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Next.js',
}
 
export default function Page() {
  return '...'
}
```





## Linking and Navigation

在Next.js中有两种导航路由的方法

* 使用 \<Link> 组件
* 使用 useROuter Hook



### Link

\<Link>是一个内置组件，它扩展了HTML 的 \<a>标签，在路由之间提供 prefetching和客户端导航。

使用：

```jsx
import Link from 'next/link'
 
export default function Page() {
  return <Link href="/dashboard">Dashboard</Link>
}
```

**Props**

下面是Link组件可用的 prop 总结:

| prop     | Example             | Type             | Required |
| -------- | ------------------- | ---------------- | -------- |
| href     | `href="/dashboard"` | String or Object | Yes      |
| replace  | `replace={false}`   | Boolean          | -        |
| scroll   | `replace={false}`   | Boolean          | -        |
| prefetch | `prefetch={false}`  | Boolean          | -        |



* href

```jsx
<Link href="/dashboard">Dashboard</Link>
```

也可以接收一个对象

```jsx
// Navigate to /about?name=test
<Link
  href={{
    pathname: '/about',
    query: { name: 'test' },
  }}
>
  About
</Link>
```



* replace

默认为false。当为true时，next/link将替换当前的历史状态，而不是在浏览器的历史 stack 中添加一个新的URL。

```jsx
import Link from 'next/link'
 
export default function Page() {
  return (
    <Link href="/dashboard" replace>
      Dashboard
    </Link>
  )
}
```

* scroll

默认为true。\<Link>的默认行为是滚动到新路由的顶部，或者保持滚动位置用于向后和向前导航。当为false时，next/link将不会在导航后滚动到页面顶部。

```jsx
import Link from 'next/link'
 
export default function Page() {
  return (
    <Link href="/dashboard" scroll={false}>
      Dashboard
    </Link>
  )
}
```

```jsx
// useRouter
import { useRouter } from 'next/navigation'
 
const router = useRouter()
 
router.push('/dashboard', { scroll: false })
```



* prefetch

默认为true。当为true时，next/link将在后台 prefetch 页面(用href指向的那个)。这对于提高客户端导航的性能非常有用。viewport中的任何\<Link />(最初或通过滚动)都将被预加载

Prefetch ={false}可以禁用预取。预取只在生产环境中启用

```jsx
import Link from 'next/link'
 
export default function Page() {
  return (
    <Link href="/dashboard" prefetch={false}>
      Dashboard
    </Link>
  )
}
```

**例子**

```jsx
import Link from 'next/link'
 
export default function PostList({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  )
}
```

可以使用 usePathname() 来确定链接是否处于活动状态。例如，要向活动链接添加一个类，你可以检查当前 pathname 是否与链接的 href 匹配:

```jsx
'use client'
 
import { usePathname } from 'next/navigation'
import Link from 'next/link'
 
export function Navigation({ navLinks }) {
  const pathname = usePathname()
 
  return (
    <>
      {navLinks.map((link) => {
        const isActive = pathname === link.href
 
        return (
          <Link
            className={isActive ? 'text-blue' : 'text-black'}
            href={link.href}
            key={link.name}
          >
            {link.name}
          </Link>
        )
      })}
    </>
  )
}
```

* 滚动到一个 `id`

Next.js应用路由器的默认行为是滚动到新路由的顶部，或者保持滚动位置，以便向前和向后导航。

如果你想在导航中滚动到特定的id，你可以用`#` hash link 附加你的URL，或者只是传递一个hash link 到href prop。

```jsx
<Link href="/dashboard#settings">Settings</Link>
 
// Output
<a href="/dashboard#settings">Settings</a>
```



### useRouter

useRouter钩子允许您以编程方式更改路由。

这个钩子只能在客户端组件中使用，并从next/navigation导入。

```jsx
'use client'
 
import { useRouter } from 'next/navigation'
 
export default function Page() {
  const router = useRouter()
 
  return (
    <button type="button" onClick={() => router.push('/dashboard')}>
      Dashboard
    </button>
  )
}
```

* `router.push(href: string, { scroll: boolean })`

对所提供的路由执行客户端导航。在浏览器的历史记录 stack 中会添加一个新历史记录。

* `router.replace(href: string, { scroll: boolean })`

对所提供的路由执行客户端导航，而无需在浏览器的历史记录堆栈中添加新条目。

* `router.refresh()`

刷新当前路由。向服务器发出新请求，重新获取数据请求，并重新呈现服务器组件。

* `router.prefetch(href: string)`

预取提供的路由以实现更快的客户端转换。

* `router.back()`

在浏览器的历史 stack 中导航回上一个路由。

* `router.forward()`

向前导航到浏览器历史记录 stack 中的下一页。



> 除非你有特殊的需求使用  useRouter, 否则建议使用  \<Link> 的方式来操作路由





### 路由和导航是如何工作的

App Router 使用混合的方式进行路由和导航。在  server 上，应用程序代码自动按路由段进行代码分割。在 client，Next.js预取和缓存路由段。这意味着，当用户导航到一个新路由时，浏览器不会重新加载页面，只有改变了的路由段才会重新渲染——从而改善了导航体验和性能。



## Route Groups 路由组

在app目录中，嵌套的文件夹通常被映射到URL路径。但是，你可以将一个文件夹标记为路由组，以防止该文件夹被包含在路由的URL路径中。

这允许你在不影响URL路径结构的情况下将你的路由段和项目文件存放在到逻辑组中。（比如登录和退出这两个路由段可以放在认证这一个逻辑组中）

路由组利于：

* 将路由组织成组，例如按站点部分、目的或团队。
* 在同一路由段级别启用嵌套布局:
  * 在同一段中创建多个嵌套布局，包括多个根布局
  * 在公共段的路由子集中添加一个布局



**路由组可以通过将文件夹名称括在括号中来创建**： `(foldername)`



例子：

为了在不影响URL的情况下组织路由，可以创建一个组将相关的路由放在一起。括号中的文件夹将从URL中忽略(例如(marketing)或(shop))。

![Organizing Routes with Route Groups](https://nextjs.org/docs/light/route-group-organisation.png)

即使(marketing)和(shop)内部的路由共享相同的URL层次结构，你也可以通过在它们的文件夹中添加一个layout.js文件来为每个组创建不同的布局。

![Route Groups with Multiple Layouts](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Froute-group-multiple-layouts.png&w=3840&q=75&dpl=dpl_4z2VPadtGEiiFh1ZJDtPJrmNBapy)

#### 在 layout 中选择特定的 sagments

要选择特定的路由到一个布局中，创建一个新的路由组(例如(shop))，并将共享相同布局的路由移动到组中(例如account和cart)。组外的路由不会共享布局(例如checkout)。

![Route Groups with Opt-in Layouts](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Froute-group-opt-in-layouts.png&w=3840&q=75&dpl=dpl_4z2VPadtGEiiFh1ZJDtPJrmNBapy)



#### 创建多个根布局

要创建多个根布局，请删除顶层的 layout.js 文件，并在每个路由组中添加一个layout.js文件。这对于将应用程序划分为具有完全不同的UI或体验的部分非常有用。\<html>和\<body>标签需要添加到每个根布局中。

![Route Groups with Multiple Root Layouts](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Froute-group-multiple-root-layouts.png&w=3840&q=75&dpl=dpl_4z2VPadtGEiiFh1ZJDtPJrmNBapy)

在上面的例子中，(marketing)和(shop)都有自己的根布局。



> * 除了对文件的组织而言，路由组的命名没有特别的意义。它们不影响URL路径。
> * 包含路由组的路由不应该解析到与其他路由相同的URL路径。例如，由于路由组不影响URL结构，`(marketing)/about/page.js`和`(shop)/about/page.js`都会解析为/about并导致错误。
> * 如果你使用多个根布局而没有顶层的layout.js文件，你的home `page.js`文件应该定义在其中一个路由组中，例如:`app/(marketing)/page.js`。
> * 跨多个根布局导航将导致整个页面加载(与客户端导航相反)。例如，从使用`app/(shop)/layout.js`的/`cart`导航到使用`app/(marketing)/layout.js`的/`blog`将导致整个页面加载。这只适用于多个根布局。



## 动态路由 Dynamic Routes 

如果您事先不知道确切的段名，并且希望从动态数据创建路由，则可以使用在请求时填充或在构建时预呈现的动态段。

**Convention**

* 动态段可以通过将文件夹的名称用方括号括起来创建: `[folderName]`。例如`[id]`或`[slug]`。

* <span style="color:red">动态路由段作为 prop 中的 `params`  传递给 layout、page、route和 generateMetadata函数。</span>



例如

一个博客可以包含以下路由 `app/blog/[slug]/page.js`，其中[slug]是博客文章的动态段(编号或者名称之类的标识)。

```jsx
export default function Page({ params }: { params: { slug: string } }) {
  return <div>My Post: {params.slug}</div>
}
```

| route                     | example url | params          |
| ------------------------- | ----------- | --------------- |
| `app/blog/[slug]/page.js` | `/blog/a`   | `{ slug: 'a' }` |
| `app/blog/[slug]/page.js` | `/blog/b`   | `{ slug: 'b' }` |
| `app/blog/[slug]/page.js` | `/blog/c`   | `{ slug: 'c' }` |



### Generating Static Params 生成静态参数

generateStaticParams函数可以与动态路由段结合使用，在构建时静态生成路由，而不是在请求时按需生成路由

```jsx
app/blog/[slug]/page.js
// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then((res) => res.json())
 
  return posts.map((post) => ({
    slug: post.slug,
  }))
}
 
// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default function Page({ params }) {
  const { slug } = params
  // ...
}
```

generateStaticParams 函数的主要优点是它可以智能地检索数据。如果使用`fetch`在generateStaticParams函数中获取内容，则会自动记住这些请求。这意味着跨多个`generateStaticParams`、Layouts和Pages使用相同参数的 fetch 请求将只进行一次，这减少了构建时间。



**返回值**

generateStaticParams应该返回一个对象数组，其中每个对象代表单个路由的填充动态段。

* 对象中的每个属性都是一个动态段，要为路由填充。
* 属性名称是段的名称，属性值是该段应该填充的内容。

| example route                    | `generateStaticParams` Return Type        |
| -------------------------------- | ----------------------------------------- |
| `/product/[id]`                  | `{ id: string }[]`                        |
| `/products/[category]/[product]` | `{ category: string, product: string }[]` |
| `/products/[...slug]`            | `{ slug: string[] }[]`                    |

* 单个动态路由段

```jsx
app/product/[id]/page.tsx
export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }]
}
 
// Three versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
// - /product/1
// - /product/2
// - /product/3
export default function Page({ params }: { params: { id: string } }) {
  const { id } = params
  // ...
}
```



* 多个动态路由段

```jsx
app/products/[category]/[product]/page.tsx
export function generateStaticParams() {
  return [
    { category: 'a', product: '1' },
    { category: 'b', product: '2' },
    { category: 'c', product: '3' },
  ]
}
 
// Three versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
// - /products/a/1
// - /products/b/2
// - /products/c/3
export default function Page({
  params,
}: {
  params: { category: string; product: string }
}) {
  const { category, product } = params
  // ...
}
```

* catch-all 动态路由段

```jsx
app/product/[...slug]/page.tsx
export function generateStaticParams() {
  return [{ slug: ['a', '1'] }, { slug: ['b', '2'] }, { slug: ['c', '3'] }]
}
 
// Three versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
// - /product/a/1
// - /product/b/2
// - /product/c/3
export default function Page({ params }: { params: { slug: string[] } }) {
  const { slug } = params
  // ...
}
```



您可以为当前布局或页面上方的动态段生成参数，但不能在其下方生成参数。例如，给定`app/products/[category]/[product]`路由

`app/products/[category]/layout.js`只能生成`[category]`的参数。

有两种方式

* 从子路由段生成多个动态路由段。

```jsx
app/products/[category]/[product]/page.tsx
// Generate segments for both [category] and [product]
export async function generateStaticParams() {
  const products = await fetch('https://.../products').then((res) => res.json())
 
  return products.map((product) => ({
    category: product.category.slug,
    product: product.id,
  }))
}
 
export default function Page({
  params,
}: {
  params: { category: string; product: string }
}) {
  // ...
}
```

* 首先生成父段，然后使用结果生成子段。

```jsx
app/products/[category]/layout.tsx
// Generate segments for [category]
export async function generateStaticParams() {
  const products = await fetch('https://.../products').then((res) => res.json())
 
  return products.map((product) => ({
    category: product.category.slug,
  }))
}
 
export default function Layout({ params }: { params: { category: string } }) {
  // ...
}
```

子路由段的generateStaticParams函数对父路由段生成的每个段执行一次

子函数generateStaticParams可以使用父函数generateStaticParams返回的参数来动态生成自己的段

```jsx
app/products/[category]/[product]/page.tsx
// Generate segments for [product] using the `params` passed from
// the parent segment's `generateStaticParams` function
export async function generateStaticParams({
  params: { category },
}: {
  params: { category: string }
}) {
  const products = await fetch(
    `https://.../products?category=${category}`
  ).then((res) => res.json())
 
  return products.map((product) => ({
    product: product.id,
  }))
}
 
export default function Page({
  params,
}: {
  params: { category: string; product: string }
}) {
  // ...
}
```



### Catch-all Segments

动态段可以通过在括号中添加省略号来扩展到捕获所有后续段:` […folderName]`

例如，`app/shop/[…slug]/page.js` 会匹配`/shop/clothes`，还会匹配`/shop/clothes/tops`， `/shop/clothes/tops/t-shirts`，等等。

| ROute                        | example       | params                      |
| ---------------------------- | ------------- | --------------------------- |
| `app/shop/[...slug]/page.js` | `/shop/a`     | `{ slug: ['a'] }`           |
| `app/shop/[...slug]/page.js` | `/shop/a/b`   | `{ slug: ['a', 'b'] }`      |
| `app/shop/[...slug]/page.js` | `/shop/a/b/c` | `{ slug: ['a', 'b', 'c'] }` |

### 可选的 Catch-all segments

通过在双方括号中包含参数，Catch-all分段可以成为可选的: `[[…folderName]]`

例如，`app/shop/[[…slug]]/page.js `除了`/shop/clothes`， `/shop/clothes/tops`， `/shop/clothes/tops/t-shirts`。也会匹配`/shop`，

`catch-all`和`optional catch-all`分段的区别在于，对于optional，不带参数的路由也会被匹配(上面例子中的`/shop`)。

<table><thead><tr><th>Route</th><th>Example URL</th><th><code>params</code></th></tr></thead><tbody><tr><td><code>app/shop/[[...slug]]/page.js</code></td><td><code>/shop</code></td><td><code>{}</code></td></tr><tr><td><code>app/shop/[[...slug]]/page.js</code></td><td><code>/shop/a</code></td><td><code>{ slug: ['a'] }</code></td></tr><tr><td><code>app/shop/[[...slug]]/page.js</code></td><td><code>/shop/a/b</code></td><td><code>{ slug: ['a', 'b'] }</code></td></tr><tr><td><code>app/shop/[[...slug]]/page.js</code></td><td><code>/shop/a/b/c</code></td><td><code>{ slug: ['a', 'b', 'c'] }</code></td></tr></tbody></table>





## Loading UI and Streaming

特殊的文件`Loading .js`帮助你用`React Suspense`创建一个 Loading UI。有了这个文件，你就可以在加载路由段的内容时显示来自服务器的  `instant loading state`(即时加载状态)。一旦渲染完成，新内容将自动交换进来。

![Loading UI](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Floading-ui.png&w=3840&q=75&dpl=dpl_HYDM7BHTarkx885VxLRgzQBd3UPD)

### Instant Loading States



即时加载状态是在导航时立即显示的 fallback UI。你可以预渲染加载指示器，如keletons（骨架屏） and spinners（旋转加载屏），或未来屏幕的一小部分但有意义的部分，如封面照片，标题等。这有助于用户了解应用程序正在响应，并提供更好的用户体验。

通过在文件夹中添加一个`loading.js`文件来创建一个 loading state。

![loading.js special file](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Floading-special-file.png&w=3840&q=75&dpl=dpl_HYDM7BHTarkx885VxLRgzQBd3UPD)

```jsx
app/dashboard/loading.tsx
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <LoadingSkeleton />
}
```

在同一个文件夹中，`loading.js`将被嵌套在`layout.js`中。它会自动将`page.js`文件及其下的所有子文件包装在`<Suspense>` boundary中。

![loading.js overview](https://nextjs.org/docs/light/loading-overview.png)



### Streaming with Suspense



除了`loading.js`之外，你还可以为自己的UI组件手动创建`Suspense Boundaries`。App Router在Node.js和Edge运行时都支持 streaming with [Suspense](https://react.dev/reference/react/Suspense)。

**What is Streaming**



要了解 Sreaming在React和Next.js中的工作原理，需要首先了解服务器端渲染( **Server-Side Rendering** SSR)及其局限性

在使用SSR，用户可以看到页面并与之交互之前，需要完成一系列步骤:

- 首先， 给定页面获取的所有数据都在服务器上。
- 然后服务器呈现页面的HTML。
- 页面的HTML、CSS和JavaScript被发送到客户端。
- 使用生成的HTML和CSS显示非交互式用户界面。
- 最后，React使用户界面具有交互性。

![Chart showing Server Rendering without Streaming](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fserver-rendering-without-streaming-chart.png&w=3840&q=75&dpl=dpl_HYDM7BHTarkx885VxLRgzQBd3UPD)

这些步骤是连续的和阻塞的，这意味着服务器只能在获取所有数据后才呈现页面的HTML。而且，在客户端上，React只能在页面中所有组件的代码都下载完之后才能生成UI。

使用React和Next.js的SSR， 通过快速向用户显示非交互式页面来帮助提高观感加载性能。

![Server Rendering without Streaming](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fserver-rendering-without-streaming.png&w=3840&q=75&dpl=dpl_HYDM7BHTarkx885VxLRgzQBd3UPD)

但是，它仍然可能很慢，因为在将页面显示给用户之前，需要完成服务器上的所有数据获取。

Streaming 允许您将页面的HTML分解为更小的块，并逐步将这些块从服务器发送到客户端。

![How Server Rendering with Streaming Works](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fserver-rendering-with-streaming.png&w=3840&q=75&dpl=dpl_HYDM7BHTarkx885VxLRgzQBd3UPD)

这样可以更快地显示页面的某些部分，而不必等待所有数据加载后才能呈现所有UI。

Streaming 与 React 的组件模型配合得很好，因为每个组件都可以被视为一个块。优先级高的组件(如产品信息)或不依赖于数据的组件可以先发送(如 layout )，React可以更早开始合并交互。具有较低优先级的组件(例如评论，相关产品)可以在获取数据后在相同的服务器请求中发送。



![Chart showing Server Rendering with Streaming](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fserver-rendering-with-streaming-chart.png&w=3840&q=75&dpl=dpl_HYDM7BHTarkx885VxLRgzQBd3UPD)





## Error Handing

error.js 文件允许你优雅地处理嵌套路由中意外的运行时错误。

* 在React错误边界中自动包装路由段和它的嵌套子段
* 使用文件系统层次结构来调整粒度，创建适合特定段的错误UI。
* 将错误隔离到受影响的段，同时保持应用程序的其余部分正常运行。
* 添加尝试从错误中恢复而不重新加载整个页面的功能。

通过在路由段中添加`error.js`文件并导出一个React组件来创建 error UI:

![error.js special file](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Ferror-special-file.png&w=3840&q=75&dpl=dpl_GcA5mjAFVmTrkgsidGoRTEoi8Rxw)

```jsx
app/dashboard/error.tsx
'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}
```

`error.js` 是如何工作的

![How error.js works](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Ferror-overview.png&w=3840&q=75&dpl=dpl_GcA5mjAFVmTrkgsidGoRTEoi8Rxw)

* `Error .js`会自动创建一个`React Error Boundary`来封装嵌套的子段或`page.js`组件。

* 从`error.js`文件导出的React组件被用作 fallback 组件。(看上面的图)
* 如果在错误边界内抛出错误，则包含该错误，并呈现 fallback 组件。
* 当 fallback error 组件处于活动状态时，错误边界上方的 layout 保持其状态并保持交互，并且错误组件可以显示从错误中恢复的功能。

### **Recovering From Errors**

错误组件可以使用`reset()`函数提示用户尝试从错误中恢复。当执行时，该函数将尝试重新呈现错误边界的内容。如果成功，则回退错误组件将替换为重新呈现的结果。

```jsx
app/dashboard/error.tsx
'use client'
 
export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

### Nested Routes

一个包含两个段的嵌套路由，其中都包含`layout.js`和`error.js`文件，它们被呈现在以下简化的组件层次结构中:

![Nested Error Component Hierarchy](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fnested-error-component-hierarchy.png&w=3840&q=75&dpl=dpl_GcA5mjAFVmTrkgsidGoRTEoi8Rxw)

嵌套组件层次结构对跨嵌套路由的`error.js`文件的行为有影响:

* 错误冒泡到最近的父错误边界。这意味着`error.js`文件将处理其所有嵌套子段的错误。通过将`error.js`文件放在路由的嵌套文件夹的不同级别，可以实现或多或少的粒度 error UI。
* `error.js`的边界不会处理在同一段的`layout.js`组件中抛出的错误，因为错误边界嵌套在那个layouts组件中。

### Handling Errors in Layouts

`error.js`边界不会捕获在`layout.js`或`template.js`组件中抛出的错误。这种有意的层次结构使同级路由(如导航)之间共享的重要UI在发生错误时保持可见和功能。

要处理特定布局或模板中的错误，请在layouts父段中放置一个`error.js`文件。

要处理root layout或 template 中的错误，可以使用`error.js`的一个变体`global-error.js`。

### Handing Errors in Root Layouts

root `app/error.js`的边界不会捕获root `app/layout.js`或`app/template.js`组件中抛出的错误。

要专门处理这些根组件中的错误，可以使用位于app根目录中的一个名为`app/global-error.js`的`error.js`的变体。

与 root `error.js`不同的是，`global-error.js`的错误边界包裹了整个应用程序，它的 fallback 组件在活动时替换 root layout。因此，一定要注意`global-error.js`必须定义自己的\<html>和\<body>标签。

即使定义了`global-error.js`，仍然建议定义一个 root `error.js`，它的 fallback组件将在root layout 中呈现，其中包括全局共享的UI。

```jsx
app/global-error.tsx
'use client'
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}
```

### error.js

错误文件定义了路由段的错误UI边界。

```jsx
'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}
```

#### Props

* `error`

转发给`error .js`客户端组件的一个Error对象实例。

**error.message**

* 对于从客户端组件转发的错误，这将是原始的错误消息。
* 对于从服务器组件转发的错误，这将是一个通用错误消息，以避免泄露敏感细节。`error.digest`可用于匹配服务器端日志中相应的错误。

**error.disgest**

服务器组件中抛出的错误自动生成的hash。它可以用来匹配服务器端日志中相应的错误。

* `reset`

重置错误边界的函数。当执行时，该函数将尝试重新呈现Error边界的内容。如果成功，则回退错误组件将替换为重新呈现的结果

可用于提示用户尝试从错误中恢复。

* `global-error.js`

要专门处理根目录layout.js中的错误，可以使用位于app根目录中的一个名为app/global-error.js的error.js的变体。

```jsx
app/global-error.tsx
'use client'
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}
```





## Parallel Routes (平行路由)

平行路由允许您同时或有选择性地相同布局中呈现一个或多个页面。对于应用程序中高度动态的部分，比如社交网站上的仪表板和提要，并行路由可以用来实现复杂的路由模式。

例如，您可以同时呈现 team 和 analytics 页面。

![Parallel Routes Diagram](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fparallel-routes.png&w=3840&q=75&dpl=dpl_D2xheK9ytXP1tLWqDnCAAjo5PHFi)

平行路由允许你为每条路由定义独立的错误和加载状态，因为它们是独立的

![Parallel routes enable custom error and loading states](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fparallel-routes-cinematic-universe.png&w=3840&q=75&dpl=dpl_D2xheK9ytXP1tLWqDnCAAjo5PHFi)

平行路由还允许您根据某些条件(如身份验证状态)有条件地呈现插槽。这使得同一URL上的代码完全分离。

![Conditional routes diagram](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fconditional-routes-ui.png&w=3840&q=75&dpl=dpl_D2xheK9ytXP1tLWqDnCAAjo5PHFi)



**Convention**
并行路由是使用 **slots** 创建的。slots 是用`@folder`约定定义的，并作为 `props`传递到同一级的 layout。

例如，下面的文件结构定义了两个显式槽(slots):`@analytics`和`@team`。

![Parallel Routes File-system Structure](https://nextjs.org/docs/light/parallel-routes-file-system.png)

上面的文件夹结构意味着`app/layout.js`中的组件现在接受`@analytics`和`@team slots` props，并且可以将它们与`children` prop并行渲染:

```jsx
app/layout.tsx
export default function Layout(props: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}) {
  return (
    <>
      {props.children}
      {props.team}
      {props.analytics}
    </>
  )
}
```



### Unmatched Routes

默认情况下，槽内呈现的内容将与当前URL匹配。



### `default.js`

当Next.js无法根据当前URL恢复插槽的活动状态时，可以定义一个`default.js`文件作为fallback来呈现。

考虑下面的文件夹结构。`@team`槽有一个`settings` 目录，但是`@analytics`没有。





### `useSelectedLayoutSegment(s)`

`useSelectedLayoutSegment`和`useSelectedLayoutSegments`都接受一个`parallelRoutesKey`，它允许你读取该槽内的活动路由段。

```jsx
app/layout.tsx
'use client'
 
import { useSelectedLayoutSegment } from 'next/navigation'
 
export default async function Layout(props: {
  //...
  auth: React.ReactNode
}) {
  const loginSegments = useSelectedLayoutSegment('auth')
  // ...
}
```

当用户导航到`@auth/login`或URL栏中的`/login`时，loginSegments将等于字符串`“login”`。

* useSelectedLayoutSegment

`useSelectedLayoutSegment`是一个客户端组件钩子，它可以让你读取比它被调用的 layout **低一级**的活动路由段。

它对于导航UI很有用，比如父 layout 中的选项卡，它会根据活动的子段改变样式。

> 注意他只会返回低一级的路由段

**Parameters**

```jsx
const segment = useSelectedLayoutSegment(parallelRoutesKey?: string)
```

useSelectedLayoutSegment可选地接受parallelRoutesKey，它允许您读取该槽内的活动路由段。

**Returns**
useSelectedLayoutSegment返回活动段的字符串，如果不存在则返回null。

<table><thead><tr><th>Layout</th><th>Visited URL</th><th>Returned Segment</th></tr></thead><tbody><tr><td><code>app/layout.js</code></td><td><code>/</code></td><td><code>null</code></td></tr><tr><td><code>app/layout.js</code></td><td><code>/dashboard</code></td><td><code>'dashboard'</code></td></tr><tr><td><code>app/dashboard/layout.js</code></td><td><code>/dashboard</code></td><td><code>null</code></td></tr><tr><td><code>app/dashboard/layout.js</code></td><td><code>/dashboard/settings</code></td><td><code>'settings'</code></td></tr><tr><td><code>app/dashboard/layout.js</code></td><td><code>/dashboard/analytics</code></td><td><code>'analytics'</code></td></tr><tr><td><code>app/dashboard/layout.js</code></td><td><code>/dashboard/analytics/monthly</code></td><td><code>'analytics'</code></td></tr></tbody></table>



* useSelectedLayoutSegments



**Parameters**

```jsx
const segment = useSelectedLayoutSegment(parallelRoutesKey?: string)
```

**Returns**
useSelectedLayoutSegments返回一个字符串数组，其中包含从被调用钩子的布局向下一级的活动分段。如果不存在，则为空数组。

<table><thead><tr><th>Layout</th><th>Visited URL</th><th>Returned Segments</th></tr></thead><tbody><tr><td><code>app/layout.js</code></td><td><code>/</code></td><td><code>[]</code></td></tr><tr><td><code>app/layout.js</code></td><td><code>/dashboard</code></td><td><code>['dashboard']</code></td></tr><tr><td><code>app/layout.js</code></td><td><code>/dashboard/settings</code></td><td><code>['dashboard', 'settings']</code></td></tr><tr><td><code>app/dashboard/layout.js</code></td><td><code>/dashboard</code></td><td><code>[]</code></td></tr><tr><td><code>app/dashboard/layout.js</code></td><td><code>/dashboard/settings</code></td><td><code>['settings']</code></td></tr></tbody></table>



## Intercepting Routes（拦截路由）

拦截路由允许你在当前布局中从应用程序的另一部分加载路由。当你想要显示路由的内容，而不需要用户切换到另一个上下文时，这种路由范例非常有用。

例如，当单击提要中的照片时，您可以在 modal 中显示照片，覆盖 feed。在这种情况下，Next.js拦截`/photo/123`路由，覆盖URL，并将其覆盖在`/feed`上。

![Intercepting routes soft navigation](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fintercepting-routes-soft-navigate.png&w=3840&q=75&dpl=dpl_D2xheK9ytXP1tLWqDnCAAjo5PHFi)

但是，当通过点击可共享的URL或刷新页面导航到照片时，应该呈现整个照片页面，而不是 modal 。不应发生路由拦截。

![Intercepting routes hard navigation](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Fintercepting-routes-hard-navigate.png&w=3840&q=75&dpl=dpl_D2xheK9ytXP1tLWqDnCAAjo5PHFi)

 **Convention**
拦截路由可以用`(..)`约定来定义，

你可以用:

* `(.)`来匹配同一层上的段

* `(…)`来匹配上一级的段

* `(…)(…)`来匹配上面两层的段

* `(…)`来匹配应用程序 root `app`目录中的片段



例如，您可以通过创建`(..)  photo`目录从`feed`段中截取 `photo`段。



例子



**modals**

拦截路由可以和并行路由一起使用来创建 modals。

它允许你:

* 让modals内容可以通过URL共享

* 在页面刷新时保留上下文，而不是关闭modals

* 在向后导航时关闭modals，而不是转到前面的route

* 向前导航会重新打开这个modals



## Route Handlers

route handlers 允许您使用`Web Request`和 `Response APIs` 为给定的路由创建自定义请求处理程序。

![Route.js Special File](https://nextjs.org/_next/image?url=%2Fdocs%2Flight%2Froute-special-file.png&w=3840&q=75&dpl=dpl_D2xheK9ytXP1tLWqDnCAAjo5PHFi)





**Convention**

Route handlers 程序定义在`app`目录下的`Route .js|ts`文件中:

```jsx
app/api/route.ts
export async function GET(request: Request) {}
```

路由处理程序可以嵌套在`app`目录中，类似于`page.js`和`layout.js`。但是不能有一个`route.js`文件和`page.js`在相同的路由段级别。

**Supported HTTP Methods**

HTTP协议支持`GET`、`POST`、`PUT`、`PATCH`、`DELETE`、`HEAD`和`OPTIONS`。如果调用了不支持的方法，Next.js将返回一个`405 method Not Allowed`响应。



**扩展的 `NextRequest` and `NextResponse` APIs**

除了支持原生的 `request`和 `response`之外。js用`NextRequest`和`NextResponse`扩展了它们，为高级用例提供方便使用。

### 行为

**Caching（缓存）**

默认情况下，当对`Response`对象使用`GET`方法时，会缓存路由处理程序。

```jsx
app/items/route.ts
import { NextResponse } from 'next/server'
 
export async function GET() {
  const res = await fetch('https://data.mongodb-api.com/...', {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
    },
  })
  const data = await res.json()
 
  return NextResponse.json({ data })
}
```

> TypeScript Warning:虽然`Response.json()`是合法的，但原生TypeScript类型当前显示一个错误，你可以使用`NextResponse.json()`来代替类型化响应。



​	**Opting out of caching** **（选择性退出缓存）**

您可以选择退出缓存

* 使用`Request`对象和`GET`方法。

* 使用任何其他HTTP方法。

* 使用动态函数，如cookie和header。

* “Segment Config Options”手动指定动态模式。

例如：

```jsx
app/products/api/route.ts
import { NextResponse } from 'next/server'
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
    },
  })
  const product = await res.json()
 
  return NextResponse.json({ product })
}
```

类似地，POST方法将导致路由处理程序动态计算。

```jsx
app/items/route.ts
import { NextResponse } from 'next/server'
 
export async function POST() {
  const res = await fetch('https://data.mongodb-api.com/...', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
    },
    body: JSON.stringify({ time: new Date().toISOString() }),
  })
 
  const data = await res.json()
 
  return NextResponse.json(data)
}
```



**Route Resolution**

你可以把`route`看作是最底层的路由原语。

* 它们不参与布局或客户端导航(如`page`)。
*  不能有一个`route.js`文件和`page.js`在同一个路由上。

<table><thead><tr><th>Page</th><th>Route</th><th>Result</th></tr></thead><tbody><tr><td><code>app/page.js</code></td><td><code>app/route.js</code></td><td><span class="text-gray-900"><svg class="with-icon_icon__MHUeb" data-testid="geist-icon" fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24" style="color: currentcolor; width: 18px; height: 18px;"><path d="M18 6L6 18"></path><path d="M6 6l12 12"></path></svg></span> Conflict</td></tr><tr><td><code>app/page.js</code></td><td><code>app/api/route.js</code></td><td><span class="inline-flex align-middle text-green-600"><svg class="with-icon_icon__MHUeb" data-testid="geist-icon" fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24" style="color: currentcolor; width: 18px; height: 18px;"><path d="M8 11.857l2.5 2.5L15.857 9M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z"></path></svg></span> Valid</td></tr><tr><td><code>app/[user]/page.js</code></td><td><code>app/api/route.js</code></td><td><span class="inline-flex align-middle text-green-600"><svg class="with-icon_icon__MHUeb" data-testid="geist-icon" fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24" style="color: currentcolor; width: 18px; height: 18px;"><path d="M8 11.857l2.5 2.5L15.857 9M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z"></path></svg></span> Valid</td></tr></tbody></table>

每个`route.js`或`page.js`文件接管该路由的所有HTTP 行为。

```jsx
app/page.js
export default function Page() {
  return <h1>Hello, Next.js!</h1>
}
 
// ❌ Conflict
// `app/route.js`
export async function POST(request) {}
```



例子

### 重新验证缓存数据



你可以通过使用 `next.revalidate`重新验证缓存的数据

```jsx
app/items/route.ts
import { NextResponse } from 'next/server'
 
export async function GET() {
  const res = await fetch('https://data.mongodb-api.com/...', {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  })
  const data = await res.json()
 
  return NextResponse.json(data)
}
```

或者，你可以使用`revalidate`段配置选项:

```jsx
export const revalidate = 60
```

### 动态函数

路由处理程序可以与Next.js中的动态函数一起使用，比如`cookie`和`header`。

**Cookies**
您可以从`next/headers`中读取`cookie`。这个服务器函数可以在路由处理程序中直接调用，也可以嵌套在另一个函数中。

这个`cookie`实例是只读的。要设置cookie，需要使用`set - cookie`报头返回一个新的`Response`。

```jsx
app/api/route.ts
import { cookies } from 'next/headers'
 
export async function GET(request: Request) {
  const cookieStore = cookies()
  const token = cookieStore.get('token')
 
  return new Response('Hello, Next.js!', {
    status: 200,
    headers: { 'Set-Cookie': `token=${token.value}` },
  })
}
```

或者，你可以使用底层Web api之上的抽象来读取cookie (`NextRequest`):

```jsx
app/api/route.ts
import { type NextRequest } from 'next/server'
 
export async function GET(request: NextRequest) {
  const token = request.cookies.get('token')
}
```

### Redirects

```jsx
app/api/route.ts
import { redirect } from 'next/navigation'
 
export async function GET(request: Request) {
  redirect('https://nextjs.org/')
}
```

### Dynamic Route Segments

路由处理程序可以使用动态段从动态数据创建请求处理程序。

```jsx
app/items/[slug]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug // 'a', 'b', or 'c'
}
```

<table><thead><tr><th>Route</th><th>Example URL</th><th><code>params</code></th></tr></thead><tbody><tr><td><code>app/items/[slug]/route.js</code></td><td><code>/items/a</code></td><td><code>{ slug: 'a' }</code></td></tr><tr><td><code>app/items/[slug]/route.js</code></td><td><code>/items/b</code></td><td><code>{ slug: 'b' }</code></td></tr><tr><td><code>app/items/[slug]/route.js</code></td><td><code>/items/c</code></td><td><code>{ slug: 'c' }</code></td></tr></tbody></table>







## 小结：

**page**

* 在 `app` 目录下创建的文件会形成相应的路由，最后添加 `page.js` 会使得这段路由可访问

**layout**

* 可以在与 `page.js` 同级的目录下，创建一个 `layout.js`，这是为了在多个页面之间共享 UI，比如导航栏之类的，避免重新渲染， Layouts 也可以嵌套
* 这个组件接收一个将会被填入到子布局中的`children` 参数（如果存在的话）
* 根布局是必要的，定义在 `app` 目录的顶层文件中
* 如果存在平行路由，那同级的`layout`文件将会接收他们作为参数

**head**

* metadata 可以通过在`layout.js`或`page.js`文件中导出 `metadata` objec或generateMetadata函数来定义。

**Link**

* 

  | prop     | Example             | Type             | Required |
  | -------- | ------------------- | ---------------- | -------- |
  | href     | `href="/dashboard"` | String or Object | Yes      |
  | replace  | `replace={false}`   | Boolean          | -        |
  | scroll   | `replace={false}`   | Boolean          | -        |
  | prefetch | `prefetch={false}`  | Boolean          | -        |

**useRouter**

```jsx
import { useRouter } from 'next/navigation'
```

* `router.push(href: string, { scroll: boolean })`

* `router.replace(href: string, { scroll: boolean })`

* `router.refresh()`

* `router.prefetch(href: string)`

* `router.back()`

* `router.forward()`

**Route  Groups**

这允许你在不影响URL路径结构的情况下将你的路由段和项目文件存放在到逻辑组中。（比如登录和退出这两个路由段可以放在认证这一个逻辑组中）

* **(folderName)**

**Dynamic Routes**

* 动态段可以通过将文件夹的名称用方括号括起来创建: `[folderName]`。例如`[id]`或`[slug]`。

* <span style="color:red">动态路由段作为 prop 中的 `params`  传递给 layout、page、route和 generateMetadata函数。</span>

* | `app/blog/[slug]/page.js` | `/blog/a`   | `{ slug: 'a' }` |
  | ------------------------- | ----------- | --------------- |
  | route                     | example url | params          |
  | `app/blog/[slug]/page.js` | `/blog/b`   | `{ slug: 'b' }` |
  | `app/blog/[slug]/page.js` | `/blog/c`   | `{ slug: 'c' }` |

**Parallel Routes**

平行路由允许您同时或有选择性地相同布局中呈现一个或多个页面。对于应用程序中高度动态的部分，比如社交网站上的仪表板和提要，并行路由可以用来实现复杂的路由模式。

并行路由是使用 **slots** 创建的。slots 是用`@folder`约定定义的，并作为 `props`传递到同一级的 `layout`。
