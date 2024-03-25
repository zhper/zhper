---
title: "CSS"
date: "2022-10-16"
image: getting-started-nextjs.png
excerpt: css的笔记
isFeatured: true
slug: css
category: ['css', 'bagu']
---

```js
import React from 'react'
import ReactDOM from 'react-dom'
import Markdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

const markdown = `
# Your markdown here
`

ReactDOM.render(
  <Markdown rehypePlugins={[rehypeHighlight]}>{markdown}</Markdown>,
  document.querySelector('#content')
)
```

| Feature    | Support              |
| --------- | :------------------- |
| CommonMark | 100%                 |
| GFM        | 100% w/ `remark-gfm` |


~~strikethrough~~


* [ ] task list
* [x] checked item

<div>
<span>zzz</span>
</div>

<blockquote> 👆 Use the toggle above to add the plugin. </blockquote>


<code>dawdawdwdw
</code>
zz

zzs

# 单位

* px

绝对单位、精确的像素

* dd
  * zzz
* em

相对单位

基准点为父节点字体的大小。如果自身定义了 `font-size`，则按照自身设置的固定size计算。因此整个页面的 1em 不是一个固定的值



* rem

相对单位

可以理解为 root em，按照 根节点为基准进行计算的相对单位



* vw，vh，vmin，vmax

vw：viewpoint width，视窗宽度，1vw等于视窗宽度的1%。

vh：viewpoint height，视窗高度，1vh等于视窗高度的1%。

vmin：表示视口宽度和高度中较小的那个的百分比。你可以用它来设置长度值，比如 width, margin, padding 等, 这样他的大小就会随视口大小自适应， 1vmin就表示较小的那个长度的1%

vmax：表示视口宽度和高度中较小的那个的百分比。同理



# Display

* none

`display: none` 指定的元素将不会被显示

这种方式隐藏的元素不会保留空间

> 相似的： `visible: hidden` 也是使元素不被显示出来，但是会保留他的空间



* block

`display: block` 指定元素为块级元素

特点：

1. 块级元素自己独占一行
2. height、width、padding、margin 都可以直接控制
3. **宽度**默认是容器（**父级宽度**）的100%
4. 块级元素本身也是一个容器，里面可以放 行内元素与块级元素



* inline

`display: inline` 指定元素为行内元素

特点：

1. 相邻的行内元素在一行、一行可以显示多个行内元素
2. 宽、高、上下的padding、margin不能直接设置；但是左右的padding、margin可以直接设置
3. 宽度默认是他文本内容的宽度
4. 行内元素只能容纳**文本**或其他**行内元素**



* inline-block

`display: inline-block` 指定元素为行内块元素

特点：

1.  一行能显示多个
2. 可以直接设置宽、高、边距
2. 默认宽度为内容宽度



元素被当成行内元素排版的时候，元素之间的空白符（空格、回车换行等）都会被浏览器处理，根据white-space的处理方式（默认是normal，合并多余空白），原来HTML代码中的回车换行被转成一个空白符，在字体不为0的情况下，空白符占据一定宽度，所以inline-block的元素之间就出现了空隙。这些元素之间的间距会随着字体的大小而变化，当行内元素font-size:16px时，间距为8px。




* list-item

`display:list-item` 指定元素为列表元素

特点：

- 元素会生成一个 ::marker 伪元素，用来显示列表标记，比如圆点或数字
- 列表标记的样式由 list-style 属性决定
- 元素可以和其他 display: list-item 的元素组成一个列表，也可以嵌套在  或  元素中





# Position



## 基本使用

定位由定位模式和边便宜组成

定位模式由 `position` 指定，默认值为 `static`。 

* `static`

静态定位，即没有定位，没有指定`position`或者指定为 `static`， 那么 边偏移：`top、right、left、bottom` 以及 `z-index` 无效

* `relative`

相对定位，是相对于元素原本的位置进行定位。同时会保留原本的位置，即不会脱离标准流

```css
<body>
    <div class="box1"></div>
    <div class="box2"></div>
</body>
body {
    margin: 0;
    padding: 0;
    background-color: lightblue;
}

.box1, .box2{
    width: 80px;
    height: 80px;
}

.box1 {
    background-color: blue;
}

.box2 {
    background-color: red;
}
```



现在我们对 box1 添加相对定位，并让他进行一定的偏移：

```css
.box1 {
    position: relative;
    top: 40px;
    left: 40px;
    background-color: blue;
}
```







* `absolute`

绝对定位，相对于 `static` 定位外的第一个祖先元素进行定位

如果没有祖先元素或者祖先元素没有定位（除static），以浏览器为基准

绝对定位不会保留原来的位置，即 会脱离标准流

绝对定位后，行内元素将会变为行内块元素



- `fixed`

固定定位，相对于**浏览器窗口**进行定位。同时，固定定位不再占有原先位置。



- `sticky`

粘性定位，相对于浏览器窗口进行定位，并且必须添加 `top`、`left`、`right` 和 `bottom` 中的一个才生效。同时，粘性定位仍然占有原先位置。



粘性定位可以被认为是相对定位和固定定位的混合。元素在跨越特定阈值前为相对定位，之后为固定定位。



- `inherit`

继承父元素 `position` 属性。





## 叠放次序

使用定位布局时，可能会出现盒子重叠的情况。此时，可以使用 `z-index` 属性来控制盒子的前后次序。

注意：

- 数值可以是正负整数，0，以及 `auto`（默认值）。如果数值越大，则说明盒子越靠上。
- 如果属性值相同，则按照书写顺序后来者居上。
- 数值后面不能添加单位。
- 只有具有除 `static` 以外的 `position` 属性的盒子 `z-index` 属性才能生效。





# Float

设计初衷：`仅仅是让文字像流水一样环绕浮动元素`，就像下图中展示的一样：

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/6/4/163c8a2caff5026e~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)



特性：

* 包裹性
* 高度塌陷
* 块状化
* 没有任何 margin 合并

## 包裹性

由 "包裹" 和 "自适应" 两部分组成

```css
/* CSS代码 */
.father{
    border: 1px solid deeppink;
    width: 200px;
}
.son {
    float: left;
    font-size: 0;
    border: 1px solid blue;
    padding: 5px;
}
.father img {
    width: 128px;
}复制代码
```

1）**包裹**。本例中将浮动元素父元素宽度设置为200px，浮动元素的子元素是一个128px宽度的图片，则此时浮动元素宽度表现为”包裹”，也就是里面图片的宽度128px。

```ini
/* HTML代码 */
<div class="father">
    <div class="son">
        <img src="../../lib/img/mm1.png">
    </div>
</div>
```

![3690013586-5addce853f5e0_articlex](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/6/4/163c8a2caffc316b~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)



2）**自适应性**。在浮动子元素的中增加一些文字：

```ini
/* HTML代码 */
<div class="father">
    <div class="son">
        <img src="../../lib/img/mm1.png">
        <span style="font-size: 12px">美女1，美女2，美女3，美女4，美女5，美女6，后宫1，后宫2，后宫3，后宫</span>
    </div>
</div>复制代码
```

此时，浮动元素宽度就自适应父元素的200px宽度，最终的宽度表现也是200px。如下图所示：

![4139378965-5addd23fb9ccf_articlex](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/6/4/163c8a2cafeab5fc~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)





## 高度塌陷

即会让 **父元素的高度塌陷**

![3690013586-5addce853f5e0_articlex](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/6/4/163c8a2caffc316b~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)

 父元素的高度没有被子元素撑开。

这是因为子元素浮动后，将会脱离标准流，同时父元素没有设置高度，这时候父元素的高度就会是 0



## 块状化

设置了 float 之后， 浮动的元素会具有 **行内块元素 **的特性，即可以直接设置 宽、高、边距



## 没有任何的 margin 重叠

在这里，我们将`.son`类增加`margin:10px`样式，在浏览器中查看实际效果。

```html
/* HTML 代码 */
<div class="father">
    <div class="son">
        <img src="../../lib/img/mm1.png">
    </div>
    <div class="son">
        <img src="../../lib/img/mm1.png">
    </div>
    <div class="son">
        <img src="../../lib/img/mm1.png">
    </div>
</div>
```

![39060460-5addd255ae994_articlex](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/6/4/163c8a2cafc0db8c~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)



## 清除浮动

**浮动的副作用**

1. 父元素无法正常显示背景颜色和背景图片
2. 父元素的边框无法撑开
3. 内外边距无法正常显示。

下面介绍清除浮动的三种方法。

**overflow: hidden**

对父元素添加 overflow: hidden。

> 本质上是 BFC 模式

**clear: both**

在浮动元素的后面添加一个块级元素，并将这个块级元素设置 clear: both 属性。

**伪类**

给父元素伪类添加 clear: both 属性。

```css
.father::after {
    content: '';
    display: block;
    clear: both;
}
```



# 盒子模型



所有的 HTML 元素都可以看作盒子。

这个盒子包括了外边距，边框，内边距，内容四个部分：



![img](https://www.w3school.com.cn/i/css/boxmodel.gif)

CSS3 中的盒模型有以下两种：**标准盒模型**、**IE（替代）盒模型**。通过`box-sizing` 指定

两种盒子模型都是由 `content + padding + border + margin` 构成，其大小都是由 `content + padding + border` 决定的，但是盒子内容宽/高度（即 `width/height`）的计算范围根据盒模型的不同会有所不同：

## 标准盒子模型

是`box-sizing`的默认值 即 `box-sizing: content-box`

当我们直接指定一个元素的宽度和高度时，只是设置了内容区域的宽高，但是完整元素大小，必须添加内外边距和边框

元素宽高 只包含 `content`

## IE （代替） 盒模型

`box-sizing: border-box`

直接设置属性的宽高，包含 `content + padding + border`



# 水平垂直居中

> 水平垂直居中一般指儿子节点相对于父亲节点实现水平垂直居中。

可以根据 **居中的元素的宽高是否确定** 分为两类

> 注意： 任何一个元素想要实现水平垂直居中，都可以使用 【居中元素不确定宽高】的方法，只是对于确定宽高的元素而言，可以额外使用【居中元素确定宽高】的方法



## **居中元素确定宽高**

* 绝对定位+负外边距
* 绝对定位+自动外边距
* 绝对定位 + `calc` 计算



### 绝对定位+负外边距

* 首先需要将父元素设置为 `relative` ，然后子元素设置为 `absolute`
* 通过 `top: 50%; left: 50%` 将子元素**左上角**移至父元素中心
* 设置 负边距（上和左）为子元素自身的一半



### 绝对定位+自动外边距

我们可以在绝对定位的元素中， 设置各个方向的距离都为0， 同时设置自动外边距：`margin:0` ，就可以在各个方向上居中（如果只设置水平方向为0， 这样就能只在水平方向上居中，垂直方向同理）

```css
#div {
    width: 500px;
    height: 500px;
    border: 2px solid cornflowerblue;

    position: relative;
}
#div img {
    width: 300px;
    height: 300px;

    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
}
```

### 绝对定位 + `calc` 计算

与第一种方法类似，只是可以直接通过 `calc()`计算出准确位置，注意`calc` 运算的百分号是根据父元素



## **居中元素不确定宽高**

* 绝对定位 + `transform`
* 设置行高与行内居中
* `table-cell`
* 弹性布局（`flex`）
* 网格布局（`grid`）



### 绝对定位 + `translate`

思路类似， 注意 `translate` 中的百分比是相对于自身元素的

 ```css
 <head>
     <meta charset="UTF-8">
     <title>Title</title>
     <style>
         #div {
             width: 500px;
             height: 500px;
             border: 2px solid cornflowerblue;
 
             position: relative;
         }
         #div div {
             position: absolute;
             top: 50%;
             left: 50%;
             transform: translate(-50%, -50%);
         }
     </style>
 </head>
 <body>
     <div id="div">
         <div>Content</div>
     </div>
 </body>
 ```



### 设置行高与行内居中

> 注意这种方式是在父元素上面设置

设置行内居中属性 `text-align: center` 可以使具有**行内特征**的元素在水平方向上居中，注意此时就不需要设置定位了

```css
#div {
    width: 500px;
    height: 500px;
    border: 2px solid cornflowerblue;

    text-align: center;
}
#div div {
    display: inline-block;
}
```



如果想要设置垂直方向上的居中，可以将父元素的`line-height` 设置为自身的高，这样整个父亲节点仅可以容纳一行元素，从而实现垂直方向上的居中， 但是注意，由于**行内元素**默认是基线对齐，所有如果子元素是**行内块元素**，同时设置了一定的宽高，我们这样只是让他的基线垂直居中了，我们可以在子元素上设置 `vertical-algin: middle`，就可以垂直居中了

```css
#div {
    width: 200px;
    height: 200px;
    text-align: center;
    line-height: 200px;
}

#div div {
    display: inline-block;
    width: 100px;
    height: 100px;
    vertical-align: middle;

}
```

### table-cell

在表格中，我们可以使用 `text-align` 与 `vertical-align` 分别实现水平与垂直方向上的居中，而 `display: table-cell` 属性则可以将元素设置为具有表格单元格元素的特性， 

注意，如果子元素是行内块元素，同时设置了宽高，那么里面的文本将会按照基线对齐



我们可以将该子元素设置为 `vertical-align: middle` ，来使文本垂直居中





### 弹性布局与网格布局

见相关章节



# BFC



FC(Formatting Context),，元素在标准流里面都属于一个 FC 的， 可能是一个 block, 或者 inline， 但不能同时属于， 块级参与 BFC 的布局中， 行内元素参与 IFC 的布局中

BFC （block formatting context）

下列情况会创建 BFC

![image-20230227173904733](C:\Users\zzzzp\AppData\Roaming\Typora\typora-user-images\image-20230227173904733.png)



BFC 作用（或者说规范）

在 BFC 中。盒子将会在垂直方向上 从顶部 一个接着一个排列， 盒子间的距离，通过 margin 设置， 垂直方向上，相邻两个块级元素在**同一个BFC中**的 margin 会折叠， 每一个盒子的左边将会包含块的左边缘

* 解决 margin 的折叠问题

下面所示的代码一定会产生 margin 折叠问题

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <style>
        .box1 {
            height: 200px;
            width: 400px;
            background-color: red;
            margin-bottom: 30px;
        }
        .box2 {
            height: 20px;
            background-color: purple;
            margin-top: 50px;
        }
    </style>
</head>
<body>
    <div class="box1"></div>
    <div class="box2"></div>
</body>

</html>
```

我们要利用 BFC 解决折叠问题，就要将 box1 和 box2 处于不同的 BFC 中，于是我们可以利用 `overflow: 除 visible外` 

但是这里要注意，我们不能直接在 box1 中设置 `overflow`， 这样设置，box1 和 box2 依然处于 html 的 BFC 中， 只是 box1 内部创建了一个新的 BFC， 所以我们在 box1 外套一层，以此创建新的 BFC

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <style>
        .container {
            overflow: auto;
        }

        .box1 {
            height: 200px;
            width: 400px;
            background-color: red;
            margin-bottom: 30px;
        }

        .box2 {
            height: 20px;
            background-color: purple;
            margin-top: 50px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="box1"></div>
    </div>
    <div class="box2"></div>
</body>

</html>
```



* 解决浮动高度的塌陷问题

BFC 中高度是 auto 的情况下，按照如下方法计算高度

1. 如果只有 inline-level 是行高的顶部和底部的距离
2. 如果只有 block-level 是由**最底层**的块上边缘和最底层块盒子下边缘之间的距离
3. 如果有绝对定位元素，将被忽略
4. 如果有浮动元素，那么会增加高度以包括这些浮动元素的下边缘





* 实现两栏布局（左侧固定 + 右侧自适应）

BFC 区域不会与浮动的容器发生重叠

每个元素的左 margin 值 和 容器的 左 border 相接触



```html
<!DOCTYPE html>
<html lang="en">

<head>
    <style>
        .outer {
            height: 100px;
        }

        .left {
            float: left;
            width: 200px;
            height: 100%;
            background: lightcoral;
        }

        .right {
            overflow: auto;
            height: 100%;
            background: lightseagreen;
        }
    </style>
</head>

<body>
    <div class="outer">
        <div class="left">左侧</div>
        <div class="right">右侧</div>
    </div>


</body>

</html>
```

# 重排（reflow）和重绘（repaint）的理解

简单地总结下两者的概念：

- 重排：当我们对 DOM 的修改引发了 DOM **几何尺寸的变化**（比如修改元素的宽、高或隐藏元素等）时，浏览器需要重新计算元素的*几何属性*（其他元素的几何属性和位置也会因此受到影响），然后再将计算的结果绘制出来。这个过程就是回流（也叫重排）
- 重绘：当我们对 DOM 的修改导致了样式的变化、却并未影响其几何属性（比如修改了颜色或背景色）时，浏览器不需重新计算元素的几何属性、直接为该元素绘制新的样式。这个过程叫做重绘。



减少reflow、repaint

1、不要一条一条的修改DOM的样式，可以先定义好css的class，然后修改DOM的className。

2、不要把DOM结点的属性值放在一个循环里当成循环里的变量。

3、为动画的HTML元件适用fixed或absolute的position，那么修改他们的css是不会reflow

# 选择器和优先级



首先我们要知道有哪些选择器：[选择器参考表](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FLearn%2FCSS%2FBuilding_blocks%2FSelectors%23%E9%80%89%E6%8B%A9%E5%99%A8%E5%8F%82%E8%80%83%E8%A1%A8)。





**优先级计算**

上述文章中核心内容： 优先级是由 A 、B、C、D 的值来决定的，其中它们的值计算规则如下：

- 如果存在内联样式，那么 `A = 1`，否则 `A = 0` ；
- B 的值等于 `ID选择器（#id）` 出现的次数；
- C 的值等于 `类选择器（.class）` 和 `属性选择器（a[href="https://example.org"]）` 和 `伪类（:first-child）` 出现的总次数；
- D 的值等于 `标签选择器（h1,a,div）` 和 `伪元素（::before,::after）` 出现的总次数。

如果计算结果权重相同，那么以定义顺序靠后的选择器优先，或者有`!important`标记优先。

# flex（弹性布局）

注意，设为 Flex 布局以后，子元素的`float`、`clear`和`vertical-align`属性将失效。



## 概念

采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称"项目"。

![img](https://www.ruanyifeng.com/blogimg/asset/2015/bg2015071004.png)



## 声明为弹性容器

有以下两种方式将元素声明为弹性容器：

- `display: flex` 属性可以将元素声明为块级弹性容器；
- `display: inline-flex` 属性可以将元素声明为行内弹性容器。

弹性容器中存在主轴与交叉轴，默认主轴为垂直方向，交叉轴为水平方向。



## 容器的属性

- flex-direction

决定主轴的方向，即项目的排列方向

```css
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}
row（默认值）：主轴为水平方向，起点在左端。
row-reverse：主轴为水平方向，起点在右端。
column：主轴为垂直方向，起点在上沿。
column-reverse：主轴为垂直方向，起点在下沿。
```

- flex-wrap

```css
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
nowrap（默认） ： 不换行
wrap： 换行，第一行在上方
wrap-reverse：换行，第一行在下方。
```

如果想要研究为什么换行之后第二行没有紧贴第一行排列，可以参见下面小节 `align-content`

- flex-flow

`flex-flow`属性是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`。

```css
.box {
  flex-flow: <flex-direction> || <flex-wrap>;
}
```



- justify-content

`justify-content`属性定义了项目在主轴上的对齐方式。

```css
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
flex-start（默认值）：左对齐
flex-end：右对齐
center： 居中
space-between：两端对齐，项目之间的间隔都相等。
space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
```



- align-items

`align-items`属性定义项目在交叉轴上如何对齐。

```css
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}

flex-start：交叉轴的起点对齐。
flex-end：交叉轴的终点对齐。
center：交叉轴的中点对齐。
baseline: 项目的第一行文字的基线对齐。
stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。
```



- align-content

`align-content`属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

```css
.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
flex-start：与交叉轴的起点对齐。
flex-end：与交叉轴的终点对齐。
center：与交叉轴的中点对齐。
space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
stretch（默认值）：轴线占满整个交叉轴。
```



## 项目的属性



- `order`

`order`属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

```css
.item {
  order: <integer>;
}
```





- `flex-grow`

`flex-grow`属性定义项目的放大比例，默认为`0`，即如果存在**剩余空间**，也不放大。

```css
.item {
  flex-grow: <number>; /* default 0 */
}
```

如果所有项目的`flex-grow`属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的`flex-grow`属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

- `flex-shrink`

`flex-shrink`属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

负值对该属性无效。

- `flex-basis`

`flex-basis`属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。

```css
.item {
  flex-basis: <length> | auto; /* default auto */
}
```

它可以设为跟`width`或`height`属性一样的值（比如350px），则项目将占据固定空间。

- `flex`

`flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。

```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

该属性有两个快捷值：`auto` (`1 1 auto`) 和 none (`0 0 auto`)。

* flex: 1 即 1  1  0%, 使用 flex: 1 会使元素自身设置的高度不起作用

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。



- `align-self`

`align-self`属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```



# line-height 如何继承？

- 父元素的 `line-height` 写了**具体数值**，比如 `30px`，则子元素 `line-height` 继承该值。
- 父元素的 `line-height` 写了**比例**，比如 `1.5 或 2`，则子元素 `line-height` 也是继承该比例。
- 父元素的 `line-height` 写了**百分比**，比如 `200%`，则子元素 `line-height` 继承的是父元素 `font-size * 200%` 计算出来的值。



# 属性继承

## 无继承

position、display、背景属性，定位属性等等

## 有继承

**字体系列属性**

- font-family：字体系列
- font-weight：字体的粗细
- font-size：字体的大小
- font-style：字体的风格

**文本系列属性**

- text-indent：文本缩进
- text-align：文本水平对齐
- line-height：行高
- word-spacing：单词之间的间距
- letter-spacing：中文或者字母之间的间距
- text-transform：控制文本大小写（就是uppercase、lowercase、capitalize这三个）
- color：文本颜色

**元素可见性**

- visibility：控制元素显示隐藏

**列表布局属性**

- list-style：列表风格，包括list-style-type、list-style-image等

**光标属性**

- cursor：光标显示为何种形态



# 隐藏元素的方法



* **display: none** : 渲染树不会包含该渲染对象，因此该元素不会在页面中占据位置，也不会响应绑定的监听事件。
* **visibility: hidden**：元素在页面中仍占据空间，但是不会响应绑定的监听事件。
* **opacity: 0**：将元素的透明度设置为 0，以此来实现元素的隐藏。元素在页面中仍然占据空间，并且能够响应元素绑定的监听事件。
* **position: absolute**：通过使用绝对定位将元素移除可视区域内，以此来实现元素的隐藏。
* **z-index: 负值**：来使其他元素遮盖住该元素，以此来实现隐藏
* **transform: scale(0,0)**：将元素缩放为 0，来实现元素的隐藏。这种方法下，元素仍在页面中占据位置，但是不会响应绑定的监听事件。



## display:none与visibility:hidden的区别

这两个属性都是让元素隐藏，不可见。**两者区别如下：**

（1）**在渲染树中**

- `display:none`会让元素完全从渲染树中消失，渲染时不会占据任何空间；
- `visibility:hidden`不会让元素从渲染树中消失，渲染的元素还会占据相应的空间，只是内容不可见。

（2）**是否是继承属性**

- `display:none`是非继承属性，子孙节点会随着父节点从渲染树消失，通过修改子孙节点的属性也无法显示；
- `visibility:hidden`是继承属性，子孙节点消失是由于继承了`hidden`，通过设置`visibility:visible`可以让子孙节点显示；

（3）修改常规文档流中元素的 `display` 通常会造成文档的重排，但是修改`visibility`属性只会造成本元素的重绘；







