---
title: webpack
date: "2022-10-16"
image: getting-started-nextjs.png
excerpt: 学习 webpack 的笔记
isFeatured: true
slug: webpack
category: ['webpack','bagu']
---


# 介绍



## 打包工具

开发时，我们会使用一些技术框架（React、Vue 等）、ES6 模块化语法、Less/Sass 等 CSS 预处理器进行开发。这些必须经过编译成浏览器能识别的 JS、CSS 等语法才能最终在浏览器中运行。

打包工具就可以帮助我们完成这些工作。除此之外，打包工具还可以帮助我们压缩代码、进行兼容性处理，以及提升性能等等。

常见的打包工具有：Grunt、Gulp、Webpack、Vite 等等。

## 基本使用

Webpack 以一个或多个文件作为入口，将我们整个项目所有文件编译组合为一个或多个文件输出。输出的文件就是编译好的文件，即可以在浏览器运行的文件。我们通常将 Webpack 输出的文件叫做 `bundle`。

### 项目目录

一个典型的项目基本目录如下：

```
Code # 根目录（所有指令都必须在这个目录下运行）
	|-- public # 静态资源目录
	|--	src # 源码目录
```

### 下载依赖

首先初始化 npm 环境：

```
npm init -y
```

初始化后的项目目录结构如下：

```
Code # 根目录（所有指令都必须在这个目录下运行）
	|-- public # 静态资源目录
	|--	src # 源码目录
	|-- package.json
```

在开发过程中，我们需要 Webpack 的基本环境，包括 `webpack` 与 `webpack-cli` 这两个依赖。由于这两个依赖仅仅是在开发环境中需要，因此我们可以使用 `-D` 参数：

```
npm install webpack webpack-cli -D
```

下载依赖后的目录结构如下：

```
Code # 根目录（所有指令都必须在这个目录下运行）
	|-- node_modules # 依赖
	|-- public # 静态资源目录
	|--	src # 源码目录
	|-- package.json
```

### 创建文件

接下来我们初次尝试 Webpack 的基本操作。创建如下文件：

```
Code # 根目录（所有指令都必须在这个目录下运行）
	|-- node_modules
	|-- public # 静态资源目录
		|-- index.html
	|--	src # 源码目录
		|--	js # js 文件目录
		|	|-- sum.js
		|	|-- count.js
		|-- main.js # 项目主文件
	|-- package.json
```

- sum.js

```
export default function sum(...args) {
    return args.reduce((p, c) => p + c, 0)
}
```

- count.js

```
export default function count(x, y) {
    return x - y
}
```

- main.js

```
import sum from './js/sum'
import count from './js/count'

console.log(sum(1, 2, 3, 4))
console.log(count(3, 1))
```

- index.html

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Webpack Study</title>
</head>
<body>
    <h1>Hello Webpack</h1>
    <script src="src/main.js"></script>
</body>
</html>
```

除了添加上述文件之外，我们还需要编辑一下 `package.json` 文件，修改 `main` 字段，将其指向为我们的入口文件：

- package.json

```
{
  ......
  "main": "./src/main.js",
  ......
}
```

### 运行 Webpack

在进行上述的编辑之后，如果直接打开 `public/index.html` 会发现控制台有报错信息。这是因为浏览器无法直接识别 `public/index.html` 中导入的 JS 文件中的 `import` 语句，因此我们需要使用打包工具进行编译处理。

我们在 **项目根目录** 执行下列命令，其中 `--mode=developmen` 表示当前的环境为开发环境：

```
npx webpack ./src/main.js --mode=development
```

当运行成功后，在我们的根目录下会出现 `dist` 目录：

```
Code # 根目录（所有指令都必须在这个目录下运行）
	|-- dist # 输出目录
		|-- main.js
	|-- node_modules
	|-- public # 静态资源目录
	|--	src # 源码目录
	|-- package.json
```

随后，我们在 `public/index.html` 文件中将导入的 JS 文件更改为打包后的 JS 文件即可运行成功：

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Webpack Study</title>
</head>
<body>
    <h1>Hello Webpack</h1>
    <script src="../dist/main.js"></script>
</body>
</html>
```

我们将执行命令的参数修改为生产环境，重新执行命令：

```
npx webpack ./src/main.js --mode=production
```

执行结束后，我们发现同样生成了 `dist` 目录，但是 `dist/main.js` 中的内容不一样。这是因为在不同的环境中，打包的方式也不一样。



## 基本属性



* entry 入口

指定 Webpack 从哪个文件开始打包

* output 出口

指定 Webpack 打包后的文件输出在何处，以及如何命名等

* loader 加载器

Webpack 本身只能处理 Js、Json 等资源，需要借助 loader 才能解析其他资源

* plugins 插件

用于扩展 Webpack 的功能



>`loader` 与 `webpack` 的区别：
>
>1. 作用不同
>
>Webpack 只能打包 CommonJS 规范下的 JS 文件，而包括 CSS 在内的其他类型文件是无法打包的，此时就需要使用第三方的 `loader` 帮助打包。`loader` 的作用就集中在了“转化文件”这一点上，如 `css-loader` 与 `style-loader` 可以帮助打包 CSS 文件、`babel-loader` 与 `babel-core` 可以帮助将 ES6 的代码转化为 ES5。
>
>`plugins` 的作用不局限于打包文件、加载资源，它的作用还包括重新定义环境变量、优化性能等等。
>
>1. 执行时机不同。
>
>`loader` 运行在打包文件之前；`plugins` 则是在整个编译周期都可能会起作用。



* mode 模式

指定开发模式 development 或者 生产模式 production





# 基本配置



## 介绍



前面小节介绍了 Webpack 的基本属性：`entry`、`output`、`loader`、`plugin` 与 `mode`。我们需要在项目根目录新建 `webpack.config.js` 文件，并在其中指定这五大基本属性。

由于 Webpack 本身基于 Node.js 运行，因此配置文件基于 CommonJS 模块化规范，使用 `module.exports` 导出。





接下来我们填入五大基本属性的具体内容：

- `entry`

入口文件就是 `src/main.js`，使用相对路径指定即可：`./src/main.js`。

- `output`

从上一小节中可以发现，当我们没有手动配置输出信息时，会默认输出在根目录的 `dist` 目录下。此时，借助配置文件的 `output` 属性，我们可以同时指定输出的路径 `path` 与输出文件名 `filename`。

需要注意的是，输出的路径 `path` 只能指定绝对路径，因此此处我们需要借助 Node.js 中的 `path` 模块来指定输出路径。

而 `filename` 则可以指定输出文件相对于 `path` 的目录。如 `path` 指定为 `dist`，`filename` 指定为 `js/main.js`，那么最终输出文件的路径为 `dist/js/main.js`。

- `loader`

如果有需要指定的加载器 `loader`，那么我们将其填入 `module.rules` 中。此时没有需要使用的 `loader`，因此将 `rules` 指定为空数组即可。

- `plugins`

与 `loader` 不同，如果有需要指定的插件 `plugin`，我们直接将其填入 `plugins` 属性数组中即可。此时没有需要使用的 `plugin`，因此将 `plugins` 指定为空数组即可。

- `mode`

`mode` 主要有两种模式：开发模式 `development` 与生产模式 `production`。此处我们先指定为开发模式。



基本配置如下

当我们编辑了 Webpack 配置文件之后，如果需要执行编译命令，就不再需要像上一小节中手动输入对应的参数。只需要直接执行下列命令：

```js
npx webpack
```



## 自动清空输出目录

在当前配置下，我们每次执行 `npx webpack` 命令，都会在输出目录下输出文件，而如果原本输出目录下有其他的文件，并不会删除。我们可以在 `output` 中添加 `clean: true` 属性实现每次打包前，自动清空输出目录：

```js
    output: {
        // 输出路径，注意！这里的输出路径是所有文件的输出路径
        path: path.resolve(__dirname, 'dist'), // dirname 表示当前文件的绝对路径
        filename: 'js/main.js',
        // 自动清空输出路径
        clean: true
    }
```



## 开发模式

开发模式即我们书写代码时所用的模式。在开发模式下，我们主要关注以下两点：

1. 将原本浏览器不能识别的代码编译为浏览器能识别运行的代码。

开发时我们会使用许多样式资源、字体图标等等，这些都是 Webpack 默认不能直接处理的资源。开发模式下的 Webpack 配置首要任务就是处理这些资源。

1. 代码质量检查，树立规范代码。

Webpack 可以帮助我们检查出代码的一些隐患，同时检查代码规范与格式。



## 运行流程

1、读取`webpack`的配置参数；

2、启动`webpack`，创建`Compiler`对象并开始解析项目；

3、从入口文件（`entry`）开始解析，并且找到其导入的依赖模块，递归遍历分析，形成依赖关系树；

4、对不同文件类型的依赖模块文件使用对应的`Loader`进行编译，最终转为`Javascript`文件；

5、整个过程中`webpack`会通过发布订阅模式，向外抛出一些`hooks`，而`webpack`的插件即可通过监听这些关键的事件节点，执行插件任务进而达到干预输出结果的目的。



# 处理样式资源

前面的小节已经提到，Webpack 并不能直接处理包括 CSS、Less 在内的样式资源，此时我们只有借助 `loader` 才能解析样式资源。

对应的 `loader` 都可以去 [官方文档](https://webpack.js.org/) 中查看详细的说明。



## 处理 CSS 资源



其中，`css-loader` 将 CSS 资源编译为 CommonJS 的模块载入 JS 中；`style-loader` 将编译后的 CSS 模块通过创建 `<style>` 标签的方式添加至 HTML 文件中。

首先下载对应的 `loader`：

```
npm install css-loader style-loader -D
```

随后在配置文件的 `module` 属性中对 `loader` 进行配置。`rules` 数组接收对象作为元素，每个对象至少包含 `test` 与 `use` 这两个属性：

- `test` 属性通过正则表达式指定检测的文件类型；
- `use` 属性是一个数组，**逆序接收** 需要用到的 `loader` 字符串。

> 由于执行顺序是从后往前，因此我们需要逆序接收 `loader` 字符串。



```react
module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 从后往前执行，先执行 css-loader，再执行 style-loader
                    'style-loader',
                    'css-loader'
                ]
            }
        ],
    },
```

接下来，在 `src` 下创建 `css` 目录与文件，并在入口文件 `src/main.js` 中引入 CSS 文件：

```bash
Code # 根目录（所有指令都必须在这个目录下运行）
	|-- node_modules
	|-- public # 静态资源目录
	|--	src # 源码目录
		|-- css
			|-- index.css
		|-- js
	|-- package.json
	|-- webpack.config.js
```

- `src/main.js`

```bash
import sum from './js/sum'
import count from './js/count'
import './css/index.css'

console.log(sum(1, 2, 3, 4))
console.log(count(3, 1))
```

此时，我们执行 `npx webpack`。执行完毕后，打开 `public/index.html` 便可以发现 CSS 资源效果已经生效。

## 处理 Less 资源



如果想要处理 Less 资源，我们需要使用 `less-loader`。`less-loader` 用于将 Less 资源编译为 CSS 资源，此时我们相当于已经得到了 CSS 资源，接下来就按照处理 CSS 资源的方式进行处理即可。

`less-loader` 用于将 Less 资源编译为 CSS 资源，但是 `less-loader` 本身依赖 `less` 进行编译。因此我们实际上需要 `less`与 `less-loader` 这两个依赖才能编译 Less 文件。

首先，下载对应依赖：

```
npm install less less-loader -D
```

对 less 资源进行配置

```js
module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 从后往前执行，先执行 css-loader，再执行 style-loader
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    },
```



此时，当我们需要使用 Less 资源时，直接引入即可：

```
import sum from './js/sum'
import count from './js/count'
import './css/index.css'
import './less/index.less'

console.log(sum(1, 2, 3, 4))
console.log(count(3, 1))
```



## 处理 Sass/ Scss 资源

类似于 less , 我们下载 `sass` 与 `sass-loader` 对 Sass/Scss 资源进行编译：

```js
npm install sass sass-loader -D
```

对 Sass/Scss 资源进行 `loader` 配置：

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    }
}
```





# 处理图片资源



在 Webpack5 以前，需要 `file-loader` 与 `url-loader` 才能处理图片资源。而现在 Webpack5 已经将这两个 `loader` 内置在了 Webpack 中，因此不再需要单独下载。



## 处理

与前面处理 CSS 资源类似，我们也需要在 `module.rules` 对图片资源的处理进行配置，但是略有不同。

我们仍然使用 `test` 对文件类型进行检测，但是不再使用 `use` 指定 `loader`，而是使用 `type` 属性，将这些文件类型指定为 `asset`。

如下面的代码所示：

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|webp)$/,
                type: 'asset'
            }
        ],
    }
}
```



此时我们就可以正常使用图片资源了。（比如在 CSS 中指定背景图片等）

实际上，我们如果不做上面这些配置，依然能打包成功，图片会输出到 dist 中

我们导入图片资源后，再执行 `npx webpack` 命令后会发现，输出目录 `dist` 下多了我们导入的那几张图片。

那么为什么之前的样式资源没有单独输出为文件呢？因为处理样式资源所使用的 `style-loader` 将最终的 CSS 资源嵌入到了输出文件 `dist/main.js` 中。





## 图片资源的优化

有的时候，我们可能希望图片资源并不单独作为文件请求，而是转化为 Base64 格式嵌入代码文件中。

我们可以在 `rules` 中添加 `parser.dataUrlCondition.maxSize` 属性，用于表示当图片资源的大小小于这个值时，将其转化为 Base64 嵌入代码文件中；否则，作为单独的图片资源使用。

如下面的代码所示：

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|webp)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024 // 小于 10 kb 的图片将会被转化为 Base64
                    }
                }
            }
        ],
    }
}
```





## 图片资源的打包路径



我们可以在 `generator.filename` 中指定图片资源的打包路径，如下所示：

```js
filename: 'imgs/[hash][ext][query]'
```

* imgs 就是输出的路径
* hash 就是根据文件内容生产的一个唯一的ID
* ext 就是文件的扩展名，之前的是什么就是什么
* query 就是查询参数，如果之前在写 url 地址带了一些查询参数就会携带上

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|webp)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024 // 小于 10 kb 的图片将会被转化为 Base64
                    }
                },
                generator: {
                    filename: 'imgs/[hash:8][ext]'
                }
            }
        ],
    }
}
```

其中，`[hash:8]` 表示打包资源的哈希值取 8 位；`[ext]` 表示资源打包之前的扩展名。



# 处理音视频等资源

与处理图片资源类似，我们使用 `type` 属性而非 `use` 属性指定处理包括字体图标、音乐、视频资源的方式。

字体图标可以在[阿里巴巴矢量图标库](https://www.iconfont.cn/) 等网站中下载

但是与处理图片资源不一样的地方是，我们需要将这些资源的 `type` 属性指定为 `asset/resource`，而非 `asset`。不过，我们同样可以在 `generator.filename` 属性中指定输出路径。

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.(ttf|woff2?|map4|map3|avi)$/,
                type: 'asset./resource',
                generator: {
                    filename: 'media/[hash:8][ext]'
                }
            }
        ],
    }
}
```



* asset 在小于某个文件大小会转换成 base 64
* 而字体图标等不需要转换，只需要原封不动输出，即使用 asset/resource



# 处理 JS 资源





Webpack 对 JS 的处理十分有限，有许多语法不能进行编译，Webpack 可以帮助做一些兼容性处理。

除此之外，开发团队对代码格式可能会有一定的要求，但是我们并不能总是用肉眼与检查代码格式，应该使用专业的工具来检测。

针对以上两点，可以在 Webpack 中分别引入 Babel 与 ESLint 来进行处理。

在实际的开发中，我们首先使用 ESLint 来检测代码格式，再通过 Babel 做代码的兼容性处理。



## ESLint

ESLint 可以帮助我们检测 JS 和 JSX 语法，并配置各项功能。使用 ESLint 的核心在于书写 ESLint 配置文件，向其中添加各种规则进行约束，这样当我们运行 ESLint 时就会根据我们指定的规则对代码进行检测。



### ESLint 配置文件



ESLint 的配置文件有很多写法：

1. `.eslintrc.*` 类型：在项目根目录新建这种类型的文件，可以使用下面三种：

   - `.eslintrc`

   - `.eslintrc.js`

   - `.eslintrc.json`

这三种的区别在于配置的书写格式不一样。

1. 在 `package.json` 中配置 `eslintConfig`

当我们运行时，ESLint 会查找并自动读取它们，因此上面的这些配置文件只需要存在一个。





### ESLint 基本配置



以编写 `.eslintrc.js` 配置文件为例。

基本的 ESLint 规则包括解析选项 `parserOptions`、检查规则 `rules`、继承规则 `extends`、环境变量 `env`，其他规则详见 [官方文档](https://eslint.org/docs/latest/user-guide/configuring)。

如下代码所示：

```js
module.exports = {
    parserOptions: {},
    rules: {},
    extends: []
}
```



#### parserOptions

基本的解析选项包括指定 ES 语法版本 `ecmaVersion`、ES 模块化类型 `sourceType`、ES 其他特性 `ecmaFeatures`（比如是否使用 jsx）。

如下代码所示：

```js
module.exports = {
    parserOptions: {
        ecmaVersion: 6,  //ES 语法版本
        sourceType: 'module',  ES 模块化
        ecmaFeatures: { 其他特性
            jsx: true 如果是 react项目，需要开启 jsx 语法
        }
    }
}
```



#### rules

对于具体规则 `rules`，我们需要着重关注规则的开启程度：

1. `off` 或 `0`：表示关闭此条规则；
2. `warn` 或 `1`：表示开启此条规则，但是使用警告提醒，这不会导致程序中断退出。
3. `error` 或 `2`：表示开启此条规则，但是使用错误提醒，当此条规则触发时，程序将会中断退出。

具体规则 `rules` 包含的内容很多，可以参见 [官方文档](https://eslint.org/docs/latest/rules/)，此处列举几例：

- 使用分号 `semi`；
- 禁止与 `-0` 进行比较 `no-compare-neg-zero`。

如下代码所示：

```js
module.exports = {
    rules: {
        semi: 'warn',
        'no-compare-neg-zero': 'error'
    }
}
```



#### extends

在实际开发中，一条一条指定 `rules` 效率很低，所以通常会选择继承现有的规则。如 React Cli 官方的规则：`react-app`。

如下代码所示：

```
module.exports = {
    extends: ['react-app']
}
```



#### env

我们主要需要指定项目代码中是否可以使用 Node 以及浏览器中的全局变量：

```
module.exports = {
    env: {
        node: true,
        browser: true
    }
}
```



### 在 Webpack 中使用 ESLint

首先，下载依赖 `eslint` 与 `eslint-webpack-plugin`：

```
npm install eslint eslint-webpack-plugin -D
```

然后，在项目根目录新建配置文件：

```
Code # 根目录（所有指令都必须在这个目录下运行）
	|-- node_modules
	|-- public # 静态资源目录
	|--	src # 源码目录
	|-- package.json
	|-- webpack.config.js
	|-- .eslintrc.js
```

再编写简单的配置文件：

```
module.exports = {
    extends: ['eslint:recommended'],
    env: {
        node: true,
        browser: true
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
    },
    rules: {
        'semi': 'warn',
        'no-var': 'error'
    }
}
```

随后我们在 Webpack 配置文件中指定 ESLint 插件：

```
const ESLintWebpackPlugin = require("eslint-webpack-plugin");

module.exports = {
    plugins: [
        new ESLintWebpackPlugin(options)
    ]
}
```

其中，`options` 是规范的具体选项，包括指定需要检查的根目录 `context`、需要检查的文件类型 `extension` 等等。详细内容可以参见 [官网](https://webpack.js.org/plugins/eslint-webpack-plugin/#root)。

```
const path = require('path')
const ESLintWebpackPlugin = require("eslint-webpack-plugin");

const options = {
	//检查哪些文件
    context: path.resolve(__dirname, 'src'),
    extensions: 'jsx'
}

module.exports = {
    plugins: [
        new ESLintWebpackPlugin(options)
    ]
}
```

当我们进行上述的配置后，运行命令 `npx webpack` 时，就会根据编辑的 ESLint 配置，对代码进行规范检查了。要注意因为配置了`extensions: 'jsx'`，所以只会检查 src 下面的 jsx 文件

### 不进行 ESLint 检查

如果有些文件不需要通过 ESLint 检查，那么我们只需要在根目录添加 `.eslintignore` 即可，`.eslintignore` 的语法格式与 `.gitignore` 一致：

```
Code # 根目录（所有指令都必须在这个目录下运行）
	|-- node_modules
	|-- public # 静态资源目录
	|--	src # 源码目录
	|-- package.json
	|-- webpack.config.js
	|-- .eslintignore
	|-- .eslintrc.js
```



## Babel

Babel 是 JavaScript 编译器，主要用于将使用 ES6 语法编写的语法转换为向后兼容的 JavaScript 语法



### Babel 的配置文件

Babel 的配置文件有很多写法：

1. `babel.config.*` 类型：在项目根目录新建这种类型的文件，可以使用下面两种：

   - `babel.config.js`

   - `babel.config.json`

2. `.babelrc.*` 类型：在项目根目录新建这种类型的文件，可以使用下面三种：

   - `.babelrc`

   - `.babelrc.js`

   - `.babelrc.json`

3. 在 `package.json` 中配置 `babel`

当我们运行时，Babel 会查找并自动读取它们，因此上面的这些配置文件只需要存在一个。

### 在 Webpack 中使用

以编写 `babel.config.js` 配置文件为例。

首先，下载依赖 `babel`、`babel-loader`、`@babel/core`、`@babel/preset-env`：

```
npm install babel-loader @babel/core @babel/preset-env -D
```

然后，在项目根目录创建 `bable.config.js` 文件：

```
Code # 根目录（所有指令都必须在这个目录下运行）
	|-- node_modules
	|-- public # 静态资源目录
	|--	src # 源码目录
	|-- package.json
	|-- webpack.config.js
	|-- babel.config.js
	|-- .eslintrc.js
```

Babel 配置文件的一个基本属性是预设 `presets`。`presets` 可以理解为 Babel 的插件，用于扩展 Babel 功能。常见的预设主要有下面三个：

- `@babel/preset-env`：智能预设，允许使用最新的 JavaScript。
- `@babel/preset-react`：编译 React JSX 语法。
- `@babel/preset-typescript`：编译 TypeScript 语法。



此处我们直接指定 `@babel/preset-env` 即可：

```
module.exports = {
    presets: ['@babel/preset-env']
}
```

最后，在 Webpack 配置文件中使用 `babel-loader`：

```
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/, // node_modules 目录中的文件不进行处理,
                loader: 'babel-loader'
            }
        ]
    }
}
```





# 处理 HTML 资源



处理 HTML 资源的一个基本需求在于——如果我们不处理 HTML 文件，那么我们每次都需要手动引入打包后的 JS 以及其他资源；而如果连同 HTML 文件一起处理，那么将会自动载入打包后的其他资源，而不用我们再来手动引入。

我们使用 `html-webpack-plugin` 插件来处理 HTML 资源。



首先，下载依赖：

```
npm install html-webpack-plugin -D
```

然后，我们在 Webpack 的配置文件中的 `plugins` 属性中使用插件：

```react
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        })
    ]
}
```

其中，`template` 属性表示的是以某个 HTML 文件作为模板进行打包。打包后的 HTML 文件具有以下两个特点：

1. 内容与模板的 HTML 文件。
2. 自动引入打包后的 JS 等资源。

最后，我们需要删除原本 HTML 文件中手动导入的打包后的资源。







# 搭建 dev-server

每次修改完代码，我们都需要重新执行命令 `npx webpack`。使用 `dev-server` 可以帮助我们在运行状态下自动重新打包。



## 下载依赖

```
npm install webpack-dev-server -D
```

## 配置

```
module.exports = {
    devServer: {
        host: 'localhost', // 启动服务器的域名,
        port: '3000', // 启动服务器的端口号,
        open: true // 自动打开浏览器
    }
}
```

## 运行

之后我们不再需要使用 `npx webpack` 来单次运行服务器了，直接使用 `npx webpack serve` 即可。

要注意的是，我们使用 `dev-server` 开发者服务器，并不会实际将打包后的资源输出出来，而是直接在内存中编译打包。



# 生产模式介绍



生产模式指的是当代码开发完成后，需要部署上线的环境。对于生产模式，我们主要考虑对打包后的代码进行优化，提升性能。

优化主要从两个角度出发：

1. 优化代码运行性能；
2. 优化代码打包速度。

## 配置拆分

原本我们仅有 `webpack.config.js` 这一个 Webpack 配置文件，但是我们需要对开发环境与生产环境做出不同的 Webpack 配置。我们可以考虑将开发环境与生产环境的 Webpack 配置文件进行拆分，得到 `webpack.dev.js` 与 `webpack.prod.js` 这两个配置文件，然后我们重新定义脚本：当运行开发环境时，我们就调用 `config/webpack.dev.js` 配置文件；当运行生产环境时，我们就调用 `config/webpack.prod.js` 配置文件。



```
Code # 根目录（所有指令都必须在这个目录下运行）
	|-- config
		|-- webpack.dev.js
		|-- webpack.prod.js
	|-- node_modules
	|-- public
	|--	src
	|-- package.json
	|-- babel.config.js
	|-- .eslintignore
	|-- .eslintrc.js
```



## 详细配置

- `webpack.dev.js`

拆分配置文件后，生产模式下的配置主要有以下几点需要调整：

1. 由于配置文件被拆分放入了 `config` 目录，因此我们需要对开发环境的配置文件当中出现的目录层次进行更改；
2. 由于开发环境不需要输出文件，因此可以将 `output` 置为空。



- `webpack.prod.js`

同样，生产环境的配置也有一些地方需要修改：

1. 调整目录层次；
2. 不再需要开发服务器 `dev-server`；
3. 将 `mode` 属性更改为 `production`。



# 处理 CSS 资源



在前面的小节中，我们处理了样式资源，但是这只是将样式资源能够成功进行打包。而在生产环境中，我们则需要额外关注项目性能等等方面，因此需要在生产环境下，单独对 CSS 资源进行处理。

对 CSS 资源的处理主要包括三点：

1. 将 CSS 资源提取为单独文件；

在前面的小节中，我们通过 `style-loader` 这个 `loader` 将处理好的样式资源直接导入 JS 输出文件中。当 JS 文件加载时，会创建 `<style>` 标签生成样式。

但是对于网站而言，这样的处理方式容易出现闪屏现象，用户体验下降。如果想要优化这一点，可以将 CSS 资源提取为单独的文件，最后通过 `<link>` 标签加载。

2. 对 CSS 资源进行兼容性处理；

因为许多浏览器版本与兼容的原因，很多时候我们需要将 CSS 资源进行兼容性处理。

3. 压缩 CSS 资源。

生产环境需要将最后打包生成的文件投入真正的使用中，如果文件太大，容易造成网络堵塞等等情况。压缩 CSS 资源则可以减小打包得到 CSS 资源体积，从而提升性能。



## 将 CSS 资源提取为单独文件

原本我们通过 `style-loader` 对 CSS 资源进行处理，现在我们需要另外一个 `loader`。但是这个 `loader` 与 `style-loader` 不同，并不是直接下载，而是需要下载 `mini-css-extract-plugin` 这个插件，然后从这个插件中导入 `loader`。当然，我们也需要在 `plugins` 中对这个插件进行配置。

首先，我们下载插件：

```
npm install mini-css-extract-plugin -D
```

然后，我们修改配置文件：

```react
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/index.css'
        })
    ],
    mode: 'production'
}
```

由于我们将 CSS 资源提取为了单独的文件，因此我们同样可以传入选项参数指定输出路径。

## 兼容性处理

我们使用 `postcss-loader` 这个依赖处理 CSS 兼容性问题。但是除此之外，我们需要使用 `loader` 中的一个插件 `postcss-preset-env` 来协助处理。同时，`postcss-loader` 依赖 `postcss`，因此我们一共需要下载三个依赖才能处理 CSS 兼容性问题：

```
npm install postcss-loader postcss postcss-preset-env -D
```

接下来，修改配置文件：

> 值得注意的是，当我们将其他资源转化为 CSS 资源后，我们才对 CSS 资源进行兼容性处理，而不是直接对其他资源如 Less 资源进行兼容性处理。因此，`use` 属性中各个元素的排列顺序很重要。即，我们在 需要写在 css-loader 的后面（因为是逆序，所以实际上顺序是前面）, 但是需要写在 less-loader 的前面



```react
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    'postcss-preset-env'
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    'postcss-preset-env'
                                ]
                            }
                        }
                    },
                    'less-loader'
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    'postcss-preset-env'
                                ]
                            }
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    }
}
```

`postcss-loader` 可以处理大部分的兼容性问题，但是我们也可以在 `package.json` 中指定配置使用的浏览器：

```js
{
    "browserslist": [
        "last 2 version", //代表所有浏览器
        "> 1%",  覆盖 99% 的浏览器
        "not dead"  有些浏览器版本已经死了就不要了
    ]
}
上面的是取交集
```

详细的 `browserslist` 说明可以参见 [官方文档](https://github.com/browserslist/browserslist)。





## 封装 loader

此时已经可以发现，处理 CSS 资源的 `rules` 出现了大量的重复内容。为了让代码可读性更强、更容易复用，我们可以将公共的这部分封装为一个方法，将差异性的内容作为参数传递进去：

```react
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const getStyleLoader = (para) => {
    return [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: [
                        'postcss-preset-env'
                    ]
                }
            }
        },
        para
    ].filter(Boolean) //传入 boolean 会把 undefined 的值过滤掉
}

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: getStyleLoader()
            },
            {
                test: /\.less$/,
                use: getStyleLoader('less-loader')
            },
            {
                test: /\.s[ac]ss$/,
                use: getStyleLoader('sass-loader')
            }
        ]
    }
}
```



## CSS 压缩

我们使用 `css-minimizer-webpack-plugin` 这个插件进行 CSS 压缩。

首先下载依赖：

```
npm install css-minimizer-webpack-plugin -D
```



然后我们进行插件的配置：

```react
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
    plugins: [
        new CssMinimizerWebpackPlugin()
    ]
}
```

> 显然，JS 与 HTML 资源在生产模式下也需要压缩，只是在生产模式下这两种类型的文件会自动压缩，因此不需要进行额外的配置。



# 生产模式总结



此时，基本的生产模式配置已经实现，参考如下：

- `config.webpack.prod.js`

```js
const path = require('path')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')

const options = {
    context: path.resolve(__dirname, '../src'), //检查哪里的代码
    extensions: 'js'     //检查什么类型的文件
}

const getStyleLoader = (para) => {
    return [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: [
                        'postcss-preset-env'
                    ]
                }
            }
        },
        para
    ].filter(Boolean)
}

module.exports = {
    entry: './src/main.js',   //从哪开始
    output: {   //输出到哪
        path: path.resolve(__dirname, '../dist'),  //输出路径
        filename: 'js/index.js', //指定输出文件相对于 `path` 的目录
        clean: true  //是否清除上次打包的文件
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: getStyleLoader()
            },
            {
                test: /\.less$/,
                use: getStyleLoader('less-loader')
            },
            {
                test: /\.s[ac]ss$/,
                use: getStyleLoader('sass-loader')
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024
                    }
                },
                generator: {
                    filename: 'imgs/[hash:8][ext]'
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new ESLintWebpackPlugin(options),  //配置 ESLint
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        }),  //配置 html, 让他自动载入打包后的其他资源
        new MiniCssExtractPlugin({
            filename: 'css/index.css'
        }),  //将css单独提出出来
        new CssMinimizerWebpackPlugin()  //压缩css
    ],
    mode: 'production'
}
```

- `package.json`

```js
{
    ...,
    "browserslist": [
        "last 2 version",  //全部的浏览器
        "> 1%",   //覆盖 99%
        "not dead"  //已经过时的浏览器就不要了
    ]
}
```



# 提升开发体验



## Source Map

### SourceMap

SourceMap（源代码映射）是一个用来生成源代码与构建后代码一一映射的文件的方案。

它会生成 map 文件，里面包含源代码和构建后代码每一行、每一列的映射关系。当构建后代码出错了，会通过这个 map 文件，从构建后代码出错位置找到映射后源代码出错位置，从而让浏览器提示源代码文件出错位置，帮助我们更快的找到错误根源。

SourceMap 的值有许多，但实际开发时我们只需要关注两种情况：

- 开发模式：`cheap-module-source-map`
  - 优点：打包编译速度快，只包含行映射
  - 缺点：没有列映射

```
module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map'
};
```

- 生产模式：

  ```
  source-map
  ```

  - 优点：包含行/列映射
  - 缺点：打包编译速度更慢

```
module.exports = {
    mode: 'production',
    devtool: 'source-map'
};
```



# 提升打包构建速度



## Hot Module Replacement



在运行时检测到某些模块发生了变化，将这些变化的模块代码以及它们的依赖关系发送给浏览器，然后使用模块热替换技术（Module Replacement）来替换旧模块的代码，以实现部分更新，从而避免了整个页面的重新加载。



开发过程中，可能只修改了一部分代码，但是 Webpack 默认会将所有模块全部重新打包编译，导致效率降低；如果能实现当修改某个模块代码时，就只有这个模块代码需要重新打包编译，其他模块不变，这样效率就会变高。

Hot Module Replacement（HMR/热模块替换）可以实现在程序运行中，替换、添加或删除模块，而无需重新加载整个页面。默认就是开启的

- `webpack.dev.js`

```react
module.exports = {
    devServer: {
        host: 'localhost', // 启动服务器的域名,
        port: '3000', // 启动服务器的端口号,
        open: true, // 自动打开浏览器
        hot: true // 开启 HMR，默认值就为 true
    },
    // 模式
    mode: 'development',
    devtool: 'cheap-module-source-map'
}
```

此时，CSS 经过 `style-loader` 处理，已经具备 HMR 功能。但是此时 JS 资源并不具备 HMR 功能。

如果想要在 JS 中实现 HMR 功能，需要手动进行判断是否支持：

```react
import sum from './js/sum'
import count from './js/count'
import './css/index.css'
import './less/index.less'

console.log(sum(1, 2, 3, 4))
console.log(count(3, 1))

if (module.hot) { // 判断是否支持 HMR 功能
    module.hot.accept('./js/sum')
    module.hot.accept('./js/count')
}
```

但是在实际开发中，像上面这样手动指定会非常麻烦，因此实际开发我们会使用其他 loader 来解决，如 [react-hot-loader](https://github.com/gaearon/react-hot-loader)。



## OneOf

`OneOf` 是规则数组，用于表示当规则匹配时，只使用第一个匹配规则：



- `webpack.dev.js`

```react
module.exports = {
    module: {
        rules: [
            {
                // 每个文件只能被其中一个 loader 处理
                oneOf: [
                    {
                        test: /\.css$/,
                        use: [
                            // 从后往前执行，先执行 css-loader，再执行 style-loader
                            'style-loader',
                            'css-loader'
                        ]
                    },
                    {
                        test: /\.less$/,
                        use: [
                            'style-loader',
                            'css-loader',
                            'less-loader'
                        ]
                    },
                    {
                        test: /\.s[ac]ss$/,
                        use: [
                            'style-loader',
                            'css-loader',
                            'sass-loader'
                        ]
                    },
                    {
                        test: /\.(png|jpe?g|gif|webp)$/,
                        type: "asset",
                        generator: {
                            filename: 'images/[hash][ext][query]'
                        },
                        parser: {
                            dataUrlCondition: {
                                maxSize: 16 * 1024 // 16 kb
                            }
                        }
                    },
                    {
                        test: /\.js$/,
                        exclude: /node_modules/, // node_modules 目录中的文件不进行处理,
                        loader: 'babel-loader'
                    }
                ]
            }
        ]
    },
    mode: 'development'
}
```

- `webpack.prod.js`

```react
module.exports = {
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.css$/,
                        use: getStyleLoader()
                    },
                    {
                        test: /\.less$/,
                        use: getStyleLoader('less-loader')
                    },
                    {
                        test: /\.s[ac]ss$/,
                        use: getStyleLoader('sass-loader')
                    },
                    {
                        test: /\.(png|jpe?g|gif|webp)$/,
                        type: "asset",
                        generator: {
                            filename: 'images/[hash][ext][query]'
                        },
                        parser: {
                            dataUrlCondition: {
                                maxSize: 16 * 1024 // 16 kb
                            }
                        }
                    },
                    {
                        test: /\.js$/,
                        exclude: /node_modules/, // node_modules 目录中的文件不进行处理,
                        loader: 'babel-loader'
                    }
                ]
            }
        ]
    },
    // 模式
    mode: 'production'
}
```





## InClude / Exclude

- `include`

`include` 用于指定该规则包含哪些目录的文件。

- `exclude`

`exclude` 用于排除哪些目录。

要注意的是，对于一个匹配规则，`include` 关键字与 `exclude` 关键字只能存在一个。

```react
module.exports = {
    module: {
        rules: [
            {
                // 每个文件只能被其中一个 loader 处理
                oneOf: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/, 
                        // node_modules 目录中的文件不进行处理, 其他文件都处理
                        // include: path.resolve(__dirname, '../src'), 
                        // 只处理 src 目录下的文件，其他文件不处理
                        loader: 'babel-loader'
                    }
                ]
            }
        ]
    }
}
```



## Cache

每次打包时 js 文件都要经过 Eslint 检查 和 Babel 编译，速度比较慢。

我们可以缓存之前的 Eslint 检查 和 Babel 编译结果，这样第二次打包时速度就会更快了。

对 Eslint 检查 和 Babel 编译结果进行缓存。

```js
const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: undefined, // 开发模式没有输出，不需要指定输出目录
    filename: "static/js/main.js", // 将 js 文件输出到 static/js 目录中
    // clean: true, // 开发模式没有输出，不需要清空输出结果
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            // 用来匹配 .css 结尾的文件
            test: /\.css$/,
            // use 数组里面 Loader 执行顺序是从右到左
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.less$/,
            use: ["style-loader", "css-loader", "less-loader"],
          },
          {
            test: /\.s[ac]ss$/,
            use: ["style-loader", "css-loader", "sass-loader"],
          },
          {
            test: /\.styl$/,
            use: ["style-loader", "css-loader", "stylus-loader"],
          },
          {
            test: /\.(png|jpe?g|gif|webp)$/,
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
              },
            },
            generator: {
              // 将图片文件输出到 static/imgs 目录中
              // 将图片文件命名 [hash:8][ext][query]
              // [hash:8]: hash值取8位
              // [ext]: 使用之前的文件扩展名
              // [query]: 添加之前的query参数
              filename: "static/imgs/[hash:8][ext][query]",
            },
          },
          {
            test: /\.(ttf|woff2?)$/,
            type: "asset/resource",
            generator: {
              filename: "static/media/[hash:8][ext][query]",
            },
          },
          {
            test: /\.js$/,
            // exclude: /node_modules/, // 排除node_modules代码不编译
            include: path.resolve(__dirname, "../src"), // 也可以用包含
            loader: "babel-loader",
            options: {
              cacheDirectory: true, // 开启babel编译缓存
              cacheCompression: false, // 缓存文件不要压缩
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules", // 默认值
      cache: true, // 开启缓存
      // 缓存目录
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
    }),
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "../public/index.html"),
    }),
  ],
  // 开发服务器
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
    hot: true, // 开启HMR功能
  },
  mode: "development",
  devtool: "cheap-module-source-map",
};

```






## Thead

当项目越来越庞大时，打包速度越来越慢，甚至于需要一个下午才能打包出来代码。这个速度是比较慢的。

我们想要继续提升打包速度，其实就是要提升 js 的打包速度，因为其他文件都比较少。

而对 js 文件处理主要就是 eslint 、babel、Terser 三个工具，所以我们要提升它们的运行速度。

我们可以开启多进程同时处理 js 文件，这样速度就比之前的单进程打包更快了。





多进程打包：开启电脑的多个进程同时干一件事，速度更快。

**需要注意：请仅在特别耗时的操作中使用，因为每个进程启动就有大约为 600ms 左右开销。**







怎么用

我们启动进程的数量就是我们 CPU 的核数。

1. 如何获取 CPU 的核数，因为每个电脑都不一样。



```javascript
// nodejs核心模块，直接使用
const os = require("os");
// cpu核数
const threads = os.cpus().length;
```

2. 下载包



```text
npm i thread-loader -D
```

3. 使用

```js
const os = require("os");
const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

// cpu核数
const threads = os.cpus().length;

// 获取处理样式的Loaders
const getStyleLoaders = (preProcessor) => {
  return [
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env", // 能解决大多数样式兼容性问题
          ],
        },
      },
    },
    preProcessor,
  ].filter(Boolean);
};

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "../dist"), // 生产模式需要输出
    filename: "static/js/main.js", // 将 js 文件输出到 static/js 目录中
    clean: true,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            // 用来匹配 .css 结尾的文件
            test: /\.css$/,
            // use 数组里面 Loader 执行顺序是从右到左
            use: getStyleLoaders(),
          },
          {
            test: /\.less$/,
            use: getStyleLoaders("less-loader"),
          },
          {
            test: /\.s[ac]ss$/,
            use: getStyleLoaders("sass-loader"),
          },
          {
            test: /\.styl$/,
            use: getStyleLoaders("stylus-loader"),
          },
          {
            test: /\.(png|jpe?g|gif|webp)$/,
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
              },
            },
            generator: {
              // 将图片文件输出到 static/imgs 目录中
              // 将图片文件命名 [hash:8][ext][query]
              // [hash:8]: hash值取8位
              // [ext]: 使用之前的文件扩展名
              // [query]: 添加之前的query参数
              filename: "static/imgs/[hash:8][ext][query]",
            },
          },
          {
            test: /\.(ttf|woff2?)$/,
            type: "asset/resource",
            generator: {
              filename: "static/media/[hash:8][ext][query]",
            },
          },
          {
            test: /\.js$/,
            // exclude: /node_modules/, // 排除node_modules代码不编译
            include: path.resolve(__dirname, "../src"), // 也可以用包含
            use: [
              {
                loader: "thread-loader", // 开启多进程
                options: {
                  workers: threads, // 数量
                },
              },
              {
                loader: "babel-loader",
                options: {
                  cacheDirectory: true, // 开启babel编译缓存
                },
              },
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules", // 默认值
      cache: true, // 开启缓存
      // 缓存目录
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
      threads, // 开启多进程
    }),
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    // 提取css成单独文件
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: "static/css/main.css",
    }),
    // css压缩
    // new CssMinimizerPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      // css压缩也可以写到optimization.minimizer里面，效果一样的
      new CssMinimizerPlugin(),
      // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
      new TerserPlugin({
        parallel: threads // 开启多进程
      })
    ],
  },
  // devServer: {
  //   host: "localhost", // 启动服务器域名
  //   port: "3000", // 启动服务器端口号
  //   open: true, // 是否自动打开浏览器
  // },
  mode: "production",
  devtool: "source-map",
};

```





# 减少代码体积



## Tree Shaking

开发时我们定义了一些工具函数库，或者引用第三方工具函数库或组件库。

如果没有特殊处理的话我们打包时会引入整个库，但是实际上可能我们可能只用上极小部分的功能。

这样将整个库都打包进来，体积就太大了。

`Tree Shaking` 是一个术语，通常用于描述移除 JavaScript 中的没有使用上的代码。

**注意：它依赖 `ES Module`。**

Webpack 已经默认开启了这个功能，无需其他配置。



## Babel

Babel 为编译的每个文件都插入了辅助代码，使代码体积过大！

Babel 对一些公共方法使用了非常小的辅助代码，比如 `_extend`。默认情况下会被添加到每一个需要它的文件中。

你可以将这些辅助代码作为一个独立模块，来避免重复引入。

`@babel/plugin-transform-runtime`: 禁用了 Babel 自动对每个文件的 runtime 注入，而是引入 `@babel/plugin-transform-runtime` 并且使所有辅助代码从这里引用。

下载包



```text
npm i @babel/plugin-transform-runtime -D
```







```react
{
                loader: "babel-loader",
                options: {
                  cacheDirectory: true, // 开启babel编译缓存
                  cacheCompression: false, // 缓存文件不要压缩
                  plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                },
```







## Image Minimizer

开发如果项目中引用了较多图片，那么图片体积会比较大，将来请求速度比较慢。

我们可以对图片进行压缩，减少图片体积。

**注意：如果项目中图片都是在线链接，那么就不需要了。本地项目静态图片才需要进行压缩。**



`image-minimizer-webpack-plugin`: 用来压缩图片的插件



1. 下载包



```text
npm i image-minimizer-webpack-plugin imagemin -D
```

还有剩下需要下载，有两种模式：

- 无损压缩



```text
npm install imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo -D
```

- 有损压缩



```text
npm install imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo -D
```



```react
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

optimization: {
    minimizer: [
      // css压缩也可以写到optimization.minimizer里面，效果一样的
      new CssMinimizerPlugin(),
      // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
      new TerserPlugin({
        parallel: threads, // 开启多进程
      }),
      // 压缩图片
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    "preset-default",
                    "prefixIds",
                    {
                      name: "sortAttrs",
                      params: {
                        xmlnsOrder: "alphabetical",
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
```



打包时会出现报错：

```react
Error: Error with 'src\images\1.jpeg': '"C:\Users\86176\Desktop\webpack\webpack_code\node_modules\jpegtran-bin\vendor\jpegtran.exe"'
Error with 'src\images\3.gif': spawn C:\Users\86176\Desktop\webpack\webpack_code\node_modules\optipng-bin\vendor\optipng.exe ENOENT
```

我们需要安装两个文件到 node_modules 中才能解决, 文件可以从课件中找到：

- jpegtran.exe

需要复制到 `node_modules\jpegtran-bin\vendor` 下面

> [jpegtran 官网地址open in new window](http://jpegclub.org/jpegtran/)

- optipng.exe

需要复制到 `node_modules\optipng-bin\vendor` 下面

> [OptiPNG 官网地址](http://optipng.sourceforge.net/)







# 优化代码运行性能



1. 减少 HTTP 请求次数：通过合并和压缩文件来减少 HTTP 请求的次数，可以有效地减少页面加载时间。
2. 压缩图片：使用压缩图片的工具可以减小图片的文件大小，从而减少加载时间。
3. 使用 CDN：使用内容分发网络（CDN）可以提高静态资源的加载速度，从而减少页面加载时间。
4. 延迟加载：对于一些不是立即需要的内容，可以使用延迟加载的方式，即在用户滚动页面时才加载它们。
5. 减少 DOM 操作：DOM 操作是非常耗费性能的，应尽量减少 DOM 操作的次数。
6. 使用缓存：缓存可以减少服务器和客户端之间的通信，从而提高页面的加载速度。
7. 代码优化：对代码进行优化，如避免重复计算、使用算法和数据结构等，可以提高代码的运行速度。





## Code Split







打包代码时会将所有 js 文件打包到一个文件中，体积太大了。我们如果只要渲染首页，就应该只加载首页的 js 文件，其他文件不应该加载。

所以我们需要将打包生成的文件进行代码分割，生成多个 js 文件，渲染哪个页面就只加载某个 js 文件，这样加载的资源就少，速度就更快。

代码分割（Code Split）主要做了两件事：

1. 分割文件：将打包生成的文件进行分割，生成多个 js 文件。
2. 按需加载：需要哪个文件就加载哪个文件。



代码分割实现方式有不同的方式，为了更加方便体现它们之间的差异，我们会分别创建新的文件来演示



1. 文件目录



```text
├── public
├── src
|   ├── app.js
|   └── main.js
├── package.json
└── webpack.config.js
```

2. 下载包



```text
npm i webpack webpack-cli html-webpack-plugin -D
```

3. 新建文件

内容无关紧要，主要观察打包输出的结果

- app.js



```javascript
console.log("hello app");
```

- main.js



```javascript
console.log("hello main");
```



4. 配置

```react
// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 单入口
  // entry: './src/main.js',
  // 多入口
  entry: {
    main: "./src/main.js",
    app: "./src/app.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    // [name]是webpack命名规则，使用chunk的name作为输出的文件名。
    // 什么是chunk？打包的资源就是chunk，输出出去叫bundle。
    // chunk的name是啥呢？ 比如： entry中xxx: "./src/xxx.js", name就是xxx。注意是前面的xxx，和文件名无关。
    // 为什么需要这样命名呢？如果还是之前写法main.js，那么打包生成两个js文件都会叫做main.js会发生覆盖。(实际上会直接报错的)
    filename: "js/[name].js",
    clear: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  mode: "production",
};
```

5. 运行指令

```react
npx webpack
```

此时在 dist 目录我们能看到输出了两个 js 文件。

总结：配置了几个入口，至少输出几个 js 文件。





2. 提取重复代码

如果多入口文件中都引用了同一份代码，我们不希望这份代码被打包到两个文件中，导致代码重复，体积更大。

我们需要提取多入口的重复代码，只打包生成一个 js 文件，其他文件引用它就好。

1. 修改文件

- app.js



```javascript
import { sum } from "./math";

console.log("hello app");
console.log(sum(1, 2, 3, 4));
```

- main.js



```javascript
import { sum } from "./math";

console.log("hello main");
console.log(sum(1, 2, 3, 4, 5));
```

- math.js



```javascript
export const sum = (...args) => {
  return args.reduce((p, c) => p + c, 0);
};
```



2. 修改配置文件



```react
// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 单入口
  // entry: './src/main.js',
  // 多入口
  entry: {
    main: "./src/main.js",
    app: "./src/app.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    // [name]是webpack命名规则，使用chunk的name作为输出的文件名。
    // 什么是chunk？打包的资源就是chunk，输出出去叫bundle。
    // chunk的name是啥呢？ 比如： entry中xxx: "./src/xxx.js", name就是xxx。注意是前面的xxx，和文件名无关。
    // 为什么需要这样命名呢？如果还是之前写法main.js，那么打包生成两个js文件都会叫做main.js会发生覆盖。(实际上会直接报错的)
    filename: "js/[name].js",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  mode: "production",
  optimization: {
    // 代码分割配置
    splitChunks: {
      chunks: "all", // 对所有模块都进行分割
      // 以下是默认值
      // minSize: 20000, // 分割代码最小的大小
      // minRemainingSize: 0, // 类似于minSize，最后确保提取的文件大小不能为0
      // minChunks: 1, // 至少被引用的次数，满足条件才会代码分割
      // maxAsyncRequests: 30, // 按需加载时并行加载的文件的最大数量
      // maxInitialRequests: 30, // 入口js文件最大并行请求数量
      // enforceSizeThreshold: 50000, // 超过50kb一定会单独打包（此时会忽略minRemainingSize、maxAsyncRequests、maxInitialRequests）
      // cacheGroups: { // 组，哪些模块要打包到一个组
      //   defaultVendors: { // 组名
      //     test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
      //     priority: -10, // 权重（越大越高）
      //     reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
      //   },
      //   default: { // 其他没有写的配置会使用上面的默认值
      //     minChunks: 2, // 这里的minChunks权重更大
      //     priority: -20,
      //     reuseExistingChunk: true,
      //   },
      // },
      // 修改配置
      cacheGroups: {
        // 组，哪些模块要打包到一个组
        // defaultVendors: { // 组名
        //   test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
        //   priority: -10, // 权重（越大越高）
        //   reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
        // },
        default: {
          // 其他没有写的配置会使用上面的默认值
          minSize: 0, // 我们定义的文件体积太小了，所以要改打包的最小文件体积
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```











# 总结

我们从 4 个角度对 webpack 和代码进行了优化：

1. 提升开发体验

- 使用 `Source Map` 让开发或上线时代码报错能有更加准确的错误提示。

2. 提升 webpack 提升打包构建速度



- 使用 `HotModuleReplacement` 让开发时只重新编译打包更新变化了的代码，不变的代码使用缓存，从而使更新速度更快。
- 使用 `OneOf` 让资源文件一旦被某个 loader 处理了，就不会继续遍历了，打包速度更快。
- 使用 `Include/Exclude` 排除或只检测某些文件，处理的文件更少，速度更快。
- 使用 `Cache` 对 eslint 和 babel 处理的结果进行缓存，让第二次打包速度更快。
- 使用 `Thead` 多进程处理 eslint 和 babel 任务，速度更快。（需要注意的是，进程启动通信都有开销的，要在比较多代码处理时使用才有效果）



3. 减少代码体积

- 使用 `Tree Shaking` 剔除了没有使用的多余代码，让代码体积更小。
- 使用 `@babel/plugin-transform-runtime` 插件对 babel 进行处理，让辅助代码从中引入，而不是每个文件都生成辅助代码，从而体积更小。
- 使用 `Image Minimizer` 对项目中图片进行压缩，体积更小，请求速度更快。（需要注意的是，如果项目中图片都是在线链接，那么就不需要了。本地项目静态图片才需要进行压缩。）






4. 优化代码运行性能

- 使用 `Code Split` 对代码进行分割成多个 js 文件，从而使单个文件体积更小，并行加载 js 速度更快。并通过 import 动态导入语法进行按需加载，从而达到需要使用时才加载该资源，不用时不加载资源。
- 使用 `Preload / Prefetch` 对代码进行提前加载，等未来需要使用时就能直接使用，从而用户体验更好。
- 使用 `Network Cache` 能对输出资源文件进行更好的命名，将来好做缓存，从而用户体验更好。
- 使用 `Core-js` 对 js 进行兼容性处理，让我们代码能运行在低版本浏览器。
- 使用 `PWA` 能让代码离线也能访问，从而提升用户体验。

