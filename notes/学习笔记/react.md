---
title: "Getting Started with NextJS"
date: "2022-10-16"
image: getting-started-nextjs.png
excerpt: NextJS is a the React framework for production - it makes building fullstack React apps and sites a breeze and ships with built-in SSRdawdadadawdawdawdwadawdawddwdawdawdawdawdawdawdawdawdawdawdawddawdawdawd.
isFeatured: true
slug: react
---




# JSX

## jsx 语法规则

1.写虚拟 DOM 时，不要写引号。

2.标签中混入 JS 表达式时，要使用花括号 {} 。

3.样式的类名指定不要用 class ，要用 className 。

4.内联样式，要用 style={{key: value}} 的形式去写。

> 此处的第一个 {} 源于规则2，表示内部是一个 js 对象

5.虚拟 DOM 只能有一个根标签。

6.标签必须闭合。

7.标签首字母

- 若小写字母开头，则将该标签转为 html 同名元素，若 html 中无该标签中的同名元素，则报错
- 若大写字母开头， react 就去渲染对应的组件，若组件没有报错，则报错。



## React 必须在作用域内

参考下面这个示例：

```react
import React from 'react'
function Demo() {
    return <div>Hello, JSX</div>
}
```

虽然我们没有直接使用导入的 React，但是仍然需要导入，这是因为导入 React 才规定了这是 JSX 的代码作用域。



## Props 默认值为 "True"

如果没有给 prop 赋值，那么它将取默认值 true，因此以下两个 JSX 表达式是等价的：

```
<MyTextBox autocomplete />

<MyTextBox autocomplete={true} />
```

## 空行与空格问题

SX 会移除行首尾的空格以及空行。与标签相邻的空行均会被删除，文本字符串之间的新行会被压缩为一个空格。因此以下的几种方式都是等价的：

```html
<div>Hello World</div>

<div>
  Hello World
</div>

<div>
  Hello
  World
</div>

<div>

  Hello World
</div>
```

## 布尔类型、Null 以及 Undefined 将会忽略

false，null，undefined，和 true 是合法的子元素。但它们并不会被渲染。以下的 JSX 表达式渲染结果相同：

```html
<div />

<div></div>

<div>{false}</div>

<div>{null}</div>

<div>{undefined}</div>

<div>{true}</div>
```

这有助于依据特定条件来渲染其他的 React 元素。例如，在以下 JSX 中，仅当 showHeader 为 true 时，才会渲染 <Header /> 组件：

```html
<div>
  	{showHeader && <Header />}  
    <Content />
</div>
```

值得注意的是有一些 [“falsy” 值](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)，如数字 0 ，仍然会被 React 渲染。例如，以下代码并不会像你预期那样工作，因为当 props.messages 是空数组时， 0 仍然会被渲染：

```html
<div>
  {props.messages.length &&    <MessageList messages={props.messages} />
  }
</div>
```

要解决这个问题，确保 && 之前的表达式总是布尔值：

```html
<div>
  {props.messages.length > 0 &&    <MessageList messages={props.messages} />
  }
</div>
```

反之，如果你想渲染 false 、 true 、 null 、 undefined 等值，你需要先将它们转换为字符串：

```html
<div>
  My JavaScript variable is {String(myVariable)}.</div>
```





# 组件

## 函数式组件

```react
<body>
    <div id="test"></div>

    <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <script type="text/babel">
        // 创建函数式组件
        function Demo () {
            return <h1>zzz</h1>
        }
        ReactDOM.render(<Demo />, document.querySelector('#test'))
    </script>
</body>
```

注意

（1）我们没有直接调用函数式组件的这个函数，但是在渲染组件过程中，`React`会自动帮我们调用。

（2）函数式组件中的`this`指向何处？`undefined`。因为`babel`在翻译函数式组件时会自动开启严格模式，因此会禁止自定义函数中的`this`直接指向`window`。

（3）执行了`ReactDOM.render(...)`之后发生了什么？

- `React`解析组件标签，找到了`Demo`组件
- 发现组件是使用函数定义的，随后调用该函数，将返回的虚拟`DOM`转化为真实`DOM`，随后呈现在页面中。





## 类式组件

```react
<body>
    <div id="test"></div>

    <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <script type="text/babel">
        // 创建函数式组件
        class Demo extends React.Component {
            render () {
                return <h1>ppp</h1>
            }
        }
        ReactDOM.render(<Demo />, document.querySelector('#test'))
    </script>
</body>
```





注意：

（1）`render`方法是定义在原型对象上的，供实例使用。

（2）执行`ReactDOM.render(...)`后，发生了什么？

- `React`解析组件标签，找到了`Demo`组件
- 发现组件是类式组件，随后调用`new`命令生成该类的实例对象，并通过该实例调用到原型的`render`方法。
- 将`render`方法返回的虚拟`DOM`转化为真实`DOM`，并呈现在页面中。





# state-props-refs



## state



我们可以通过在 constructor 中定义 state

```js
    constructor(props) {
        super(props)
        this.state = {
            isHappy: true
        }
    }
```

ES6 中，我们也可以直接在类的顶部定义

```js
class Weather extends React.Component {
    state = {
        isHappy: true;
    }
    render() {
        const {isHappy} = this.state
        return <h2>I’m {isHappy ? 'happy' : 'sad'} today.</h2>
    }
}
```

> 类式组件中可以通过 this.props 获取传参

## setState() 

在React中， 状态 state 是不可以直接更改的

应该使用内置API `setState() 进行`更新，同时，这种更新属于**合并**

作用：

* 修改 state 中的数据状态
* 更新 UI



## props

在渲染组件时，React会自动把标签内的实行以对象的形式传到组件的属性 `props`中

* 函数式组件

直接通过参数获取props对象

```jsx
function FSon(props) {
  console.log(props)
  return (
    <div>
      子组件1
      {props.msg}
    </div>
  )
}
```

* 类式组件

通过 `this.props` 获取

```jsx
function FSon(props) {
  console.log(props)
  return (
    <div>
      子组件1
      {props.msg}
    </div>
  )
}
```

同时，我们可以直接通过展开运算符进行简写，需要注意的是，展开运算符并不能直接展开对象的可遍历属性，此处可以如此书写是因为经过了 Babel 与 React 编译后得到的语法糖：

```jsx
class Info extends React.Component {
    render() {
        const {name, age, sex} = this.props
        return (
            <ul>
                <li>{name}</li>
                <li>{age}</li>
                <li>{sex}</li>
            </ul>
        )
    }
}
let obj1 = {name: "小红", age: "18", sex: "女"}
let obj2 = {name: "小蓝", age: "18", sex: "男"}
ReactDOM.render(<Info {...obj1}/>, document.getElementById('test1'))
ReactDOM.render(<Info {...obj2}/>, document.getElementById('test2'))
```



## 对 props 属性进行限制

在对组件标签属性进行限制，首先需要引入 `prop-types.js` 依赖：

```js
import PropTypes from 'prop-types'
```

随后在组件属性 `propTypes` 与 `defaultProps` 中对各项属性进行限制

**四种常见结构**

1. 常见类型：array、bool、func、number、object、string
2. React元素类型：element
3. 必填项：isRequired
4. 特定的结构对象：shape({})

```js
// 常见类型
optionalFunc: PropTypes.func,
// 必填 只需要在类型后面串联一个isRequired
requiredFunc: PropTypes.func.isRequired,
// 特定结构的对象
optionalObjectWithShape: PropTypes.shape({
	color: PropTypes.string,
	fontSize: PropTypes.number
})
```



### 限制属性数据类型

```
Demo.propTypes = {
    name: PropTypes.string
}
```

> 注意：当限制属性为某个数据类型时，必须要将该数据类型首字母小写，如上；而如果限制属性为函数，应该书写为 `func`。

### 限制属性必要性

```
Demo.propTypes = {
    name: PropTypes.isRequired
}
```

### 限制属性初始值

```
Demo.defaultProps = {
    name: '你没有名字'
}
```

### 限制单个子元素

可以通过 `PropTypes.element` 来确保传递给组件的某个属性只包含一个元素。

```js
MyComponent.propTypes = {
    children: PropTypes.element.isRequired
}
```

### 简写方式

可以将 `propTypes` 与 `defaultProps` 属性放入组件类中定义，并且声明为 `static` 属性，这样就可以避免在组件类的外部单独进行限制。



## 子元素 chilren

包含在开始和结束标签之间的 JSX 表达式内容将作为特定属性 `props.children` 传递给外层组件。

如下面的这个例子：

```
<MyComponent {children:'zzz'}>Hello world!</MyComponent>
```

如果传入的 props 中恰好有一个属性名为children， 那么它将会被覆盖，即此时 `props.children` 就只是 `Hello world!` 字符串。





## refs

### 何时使用 refs？

refs 的使用场景包括：

1. 管理焦点，文本选择或媒体播放。
2. 触发强制动画。
3. 集成第三方 DOM 库。



### 基本使用



* 字符串形式的 ref

直接将 ref 属性设置为字符串即可，但是这种方式用得很少，已经是官方 **不推荐** 的使用方法。

```js
class Demo extends React.Component {
    render() {
        return (
            <div ref="div">Test</div>
        )
    }
}
```



* 回调函数形式的 ref

```js
class Demo extends React.Component {
    render() {
        return (
            <div ref={curNode => this.div = curNode}>Test</div>
        )
    }
}
```



* createRef 形式的 ref

我们可以通过 React.createRef() 创建 Refs，并通过 ref 属性附加到 React 元素：

```js
class Demo extends React.Component {
    myRef = React.createRef()
    render() {
        return (
        	<div ref={this.myRef}/>
        )
    }
}
```





当创建的 Ref 被传递给 render 中渲染的元素时，我们可以在 Ref 的 current 属性中访问该元素：

```
const node = this.myRef.current
```

要注意的时，Ref 的值根据节点的类型而有所不同：

- 当 `ref` 属性用于 HTML 元素时，构造函数中使用 `React.createRef()` 创建的 `ref` 接收底层 DOM 元素作为其 `current` 属性。
- 当 `ref` 属性用于自定义 class 组件时，`ref` 对象接收组件的挂载实例作为其 `current` 属性。
- **你不能在函数组件上使用 `ref` 属性**，因为他们没有实例。



# 事件绑定



- 通过`onXxx`属性指定事件处理函数（注意大小写）

  - `React`使用的是自定义（合成）事件，而不是使用的原生`DOM`事件。

    - > 为了更好的兼容性

  - `React`中的事件是通过事件委托方式处理的（委托给组件最外层的元素）

    - > 为了更加高效

- 通过`event.target`得到发送事件的`DOM`元素对象。

  - > 因此，可以用此方法避免`ref`的一些使用。





# 生命周期

完整生命周期：

![img](https://blog.yucohny.vercel.app/images/react/7.png)

常用生命周期：

![img](https://blog.yucohny.vercel.app/images/react/8.png)



## 三个阶段



1.  渲染 Render 阶段

在此阶段中，React 会遍历虚拟 DOM，并通过 Diff 算法寻找组件树中变化的部分。当发现组件需要更新时，将会重新渲染该组件。

该阶段包含的生命周期如下：

- `constructor()`
- `static getDerivedStateFromProps()`
- `shouldComponentUpdate()`
- `render()`



2. 预提交 Pre-Commit 阶段

此阶段存在一个不常用的生命周期方法，会在提交阶段前调用。

该阶段包含的生命周期如下：

- `getSnapshotBeforeUpdate()`



3. 提交 Commit 阶段

根据 React 最终渲染的结果对真实的 DOM 节点进行更新。

该阶段包含的生命周期如下：

- `componentDidMount()`
- `componentDidUpdate()`
- `componentWillUnmount()`



## 三种渲染情况

React 的渲染有三种情况：挂载、更新与卸载。每种情况都分别对应了上述三个阶段。

各个情况的各个阶段所对应的生命周期如下：

1. 挂载

- 渲染阶段
  - `constructor()`
  - `static getDerivedStateFromProps()`
  - `render()`
- 预提交阶段

无。

- 提交阶段
  - `componentDidMount()`

2. 更新

- 渲染阶段
  - `static getDerivedStateFromProps()`
  - `shouldComponentUpdate()`
  - `render()`
- 预提交阶段
  - `getSnapshotBeforeUpdate()`
- 提交阶段
  - `componentDidUpdate()`

3 .卸载

- 渲染阶段与提交阶段

无。

- 提交阶段
  - `componentWillUnmount()`

从中可以看出，尽管各种情况有着各自的生命周期方法，但是也存在部分交集。





## 渲染阶段

**contructor()**

`constructor()` 方法仅会在挂载时触发。

与普通的类 Class 一样，React 类组件中的 `constructor()` 方法为组件的构造函数。

如果组件定义了构造函数，那么构造函数应该首先调用 `super(props)`，否则 `props` 属性可能会出现错误：

构造函数通常只用于以下两种情况：

- 绑定方法实例

如果在组件中使用 `fucntion` 关键字而非箭头函数定义方法，那么该方法并不会绑定在组件实例自身，此时可以在构造函数中通过 `bind()` 等方法将其绑定至实例自身上：

```react
import React from 'react'

class LifeCycleDemo extends React.Component {
    constructor(props) {
        super(props)
        this.name = 'Yucohny'
        this.getName = this.getName.bind(this) // 在构造函数中绑定实例方法
    }
    getName() {
        return this.name
    }
    render() {
        return (
            <div>
                My name is {this.getName()}.
            </div>
        )
    }
}

export default LifeCycleDemo
```

- 初始化 State。

请直接使用 `this.state` 初始化 State，不要在构造函数中调用 `setState()`。

同时，避免将 `props` 中的属性赋值给 State。尽管不会出现语法错误，但是容易出现不易察觉的意料之外的错误。构造函数只会在初次挂载时执行，如果因为 `props` 的更新而引起组件的更新，那么 `props` 更新后的值将不会影响 State：

```react
import React from 'react'

class LifeCycleDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            age: 20
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        this.setState({
            age: this.state.age + 1
        })
    }
    render() {
        return (
            <div>
                <Son age={this.state.age}/>
                <button onClick={this.handleClick}>Grow Up</button>
            </div>
        )
    }
}

class Son extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            age: props.age
        }
    }
    render() {
        return (
            <div>
                I'm {this.state.age} years old.
            </div>
        )
    }
}

export default LifeCycleDemo
```

如上面的例子，当按下按钮时，父组件 State 发生改变，从而影响子组件的 `props` 属性，但是这并不会影响子组件 State 的值，因此页面展示的内容并不会发生变化。

由于上述两种使用场景都可以使用其他方式代替，因此 `constructor()` 方法可以完全不使用。



### static getDerivedStateFromProps()

`getDerivedStateFromProps()` 方法在挂载与更新中都会执行。该方法返回一个对象用于更新当前组件状态，如果返回 `null` 将不会更新：

```react
class LifeCycleDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            age: 20
        }
    }

    static getDerivedStateFromProps() {
        return {
            age: 21
        }
    }

    render() {
        return (
            <div>
                I'm {this.state.age} years old.
            </div>
        )
    }
}
```

`getDerivedStateFromProps()` 方法在挂载过程中接收两个参数，分别代表 `props` 与 `State`。在挂载过程中，`props` 即此时组件所接收的参数，State 即执行构造函数后所初始化的对象，如果没有初始化，那么此时 State 为 `null`。

```react
import React from 'react'

class LifeCycleDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            age: 20
        }
    }
    render() {
        return (
            <Son age={this.state.age}/>
        )
    }
}

class Son extends React.Component {
    static getDerivedStateFromProps(props, state) {
        console.log(`props: ${props}\nState: ${state}`)
    }
    render() {
        return (
            <div>
                I'm {this.props.age} years old.
            </div>
        )
    }
}

// props: [object Object]
// State: null

export default LifeCycleDemo
```

在更新过程中，State 为更新之前的状态。

### shouldComponentUpdate()

`shouldComponentUpdate()` 方法仅会在更新时触发。

在默认情况下，React 组件 `props` 属性或 State 发生改变时会进行更新。但是，有的时候并不希望 `props` 属性或者 `State` 发生某种改变时直接更新组件，此时可以使用 `shouldComponentUpdate()` 方法。

`shouldComponentUpdate()` 方法接收三个参数，分别是最新的 `props` 属性、最新的状态与最新 Context 对象，并返回一个布尔值。该布尔值默认为 `true`，表示该组件需要更新；如果返回值为 `false` 则说明该组件此次不更新，从而不会执行 `render()` 方法与预提交阶段以及提交阶段的钩子。

如果 `shouldComponentUpdate()` 方法始终返回 `false`，那么该组件将永远不会更新：

```react
class LifeCycleDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            age: 20
        }
        this.handleClick = this.handleClick.bind(this)
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false // 始终返回 false 会导致组件不会更新
    }

    handleClick() {
        this.setState({
            age: this.state.age + 1
        })
    }

    render() {
        return (
            <div>
                <div>
                    I'm {this.state.age} years old.
                </div>
                <button onClick={this.handleClick}>Grow Up</button>
            </div>
        )
    }
}
```

需要注意的是，如果该方法返回 `false`，状态将不会更新，但是 `props` 仍然会更新。不过，该方法返回 `false` 时将不会重新渲染，因此尽管 `props` 更新了，但是页面是保持不变的。

```react
class LifeCycleDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            age: 20
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState({
            age: this.state.age + 1
        })
    }

    render() {
        return (
            <div>
                <Son age={this.state.age}/>
                <button onClick={this.handleClick}>Grow Up</button>
            </div>
        )
    }
}

class Son extends React.Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false
    }

    render() {
        return (
            <div>
                I'm {this.props.age} years old.
                {/*this.props.age 更新了，但是因为没有重新渲染，所以页面保持不变*/}
            </div>
        )
    }
}
```



### render()

`render()` 方法是类式组件中必须实现的方法，会在挂载与更新阶段中的渲染阶段末执行。

`render()` 方法的返回类型是如下几种之一：

1. React 元素；
2. 数组或 Fragments；
3. Portals；
4. 字符串或数值类型；

如果返回类型是字符串或数值类型，React 会将其直接渲染为文本节点

5. 布尔值或 `null`。

什么都不会渲染。



## 预提交阶段 getSnapshotBeforeUpdate()

预提交阶段只有 `getSnapshotBeforeUpdate()` 一个方法，并且只在更新时可能会调用。

预提交阶段接收两个参数，分别是之前的 `props` 属性与之前的状态。

该生命周期钩子能够在组件实际发生更改时获取一些其他信息，如当前的滚动位置。

该生命周期的任何返回值都将作为参数传递至 `componentDidUpdate()`。

## 提交阶段

### componentDidMount()

`componentDidMount()` 会在组件挂载后调用。因此，可以在该方法中执行依赖于 DOM 节点的初始化，如发起请求获取初始数据。

如果组件实例需要订阅消息，可以在该方法中进行订阅，但是要注意，最好在 `componentWillUnmount()` 中取消订阅，否则容易造成意料之外的错误或性能问题。

如果直接在 `componentDidMount()` 中调用 `setState()`，那么将触发额外渲染，但此渲染会发生在浏览器更新屏幕之前，从而保证了即使调用两次 `render()`，用户也不会看到中间状态。但是需要谨慎使用该模式，因为它会容易导致性能问题。

### componentDidUpdate()

`componentDidUpdate()` 方法会在组件更新后会被立即调用，因此首次渲染不会执行此方法。

该方法接收三个参数：更新前的 `props` 属性、更新前的状态，与预提交阶段生命周期钩子的返回值。

当组件更新后，可以在此处对 DOM 进行操作，或者进行额外的网络请求。

可以在该方法中调用 `setState()`，但是请将其包裹在条件语句中，否则会导致死循环。同时，请谨慎使用，否则容易影响组件性能。

### componentWillUnmount()

`componentWillUnmount()` 方法将在组件卸载前调用。在此方法中需要执行必要的清理操作，如取消在 `componentDidMount()` 中创建的订阅。







## 捕获错误

### static getDerivedStateFromError()

`getDerivedStateFromError()` 方法会在**子元素**抛出错误时调用。该方法接收抛出的错误作为参数，并返回一个对象用于更新当前组件的状态：

```react
class LifeCycleDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        console.log(error)
        // Error: Error!
        return {
            hasError: true
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.hasError ? <div>Something is wrong.</div> : <Son/>
                    // 页面显示 Something is wrong.
                }
            </div>
        )
    }
}

class Son extends React.Component {
    render() {
        throw new Error('Error!')
        return (
            <div>
                My name is Yucohny.
            </div>
        )
    }
}
```

如上面的代码，由于子组件抛出了错误，因此父组件调用了 `getDerivedStateFromError()` 方法，并将状态中的属性 `hasError` 更新为了 `true`。

需要注意，该方法在渲染阶段调用。

### componentDidCatch()

`componentDidCatch()` 方法会在子元素抛出错误时调用。该方法接收顺序接收两个参数：

1. 抛出的错误；
2. 带有 `componentStack` 键的对象。

`componentDidCatch()` 会在提交阶段被调用，而 `getDerivedStateFromError()` 是在渲染阶段调用，因此如果子元素抛出错误，会先调用 `getDerivedStateFromError()` 方法，再调用 `componentDidCatch()` 方法：

```react
import React from 'react'

class LifeCycleDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        console.log(`getDerivedStateFromError()`)
        return {
            hasError: true
        }
    }

    componentDidCatch(error, errorInfo) {
        console.log(`componentDidCatch()`)
    }

    // getDerivedStateFromError()
    // componentDidCatch()

    render() {
        return (
            <div>
                {
                    this.state.hasError ? <div>Something is wrong.</div> : <Son/>
                    // 页面显示 Something is wrong.
                }
            </div>
        )
    }
}

class Son extends React.Component {
    render() {
        throw new Error('Error!')
        return (
            <div>
                My name is Yucohny.
            </div>
        )
    }
}

export default LifeCycleDemo
```

## forceUpdate()

默认情况下，只有当 `props` 属性与状态发生改变时才会触发组件的重新渲染。但是如果重新渲染同时依赖于其他数据，可以使用 `forceUpdate()` 方法进行强制重新渲染。

调用 `forceUpdate()` 的组件将会跳过 `shouldComponentUpdate()` 钩子，但是其子组件将会触发正常的生命周期钩子，包括 `shouldComponentUpdate()`。







# 受控组件与非受控组件



## 受控组件

在 HTML 中，像 input、textarea 这样的表单标签，通常会根据用户的输入来进行更新。即，不同时候使用 value 属性会得到当前状态下用户**直接输入**的值。

在 React 中，类似的可变状态通常保存在组件的 state 属性中，并且只能通过使用 setState() 来更新。

将两者结合起来，使 React 的 state 成为「唯一数据源」，这就是“受控组件”。受控组件不仅控制着用户输入过程中表单的事件（比如 input 标签的值修改时触发事件），还控制着取值的表单输入元素。

我们将原本的 input 标签，与受控组件式的标签进行对比。

原本的 input 标签形式如下：

```js
<input id="ipt" type="text" value="..."/>
<button id="btn"/>
```

每次我们改变 input 标签中的值，input 标签的 value 属性总是随着用户输入**直接改变**：

```js
const btn = document.getElementById('btn')
btn.addEventListener('click', () => {
    console.log(document.getElementById('ipt').value) // 此处每次都会直接获取冰显示 input 标签中的值
})
```

受控组件式的标签：

```js
export default class Demo extends Component {
    state = {
        value: ''
    }
    
    handleChange(event) {
        this.setState({
            value: event.target.value
        })
    }
    
    handleClick() {
        console.log(this.state.value)
    }
    
    render() {
        return (
        	<div>
            	<input type="text" value={this.state.value} onChange={this.handleChange}/>
                <button onClick={this.handleClick}/>
            </div>
        )
    }
}
```

在上面的示例代码中，我们发现，input 标签内的值有任何改变，都会通过给定的触发事件，直接传入 state 属性中。

button 标签想要打印当前 input 标签的内容，却不是直接从 input 标签中获取数据，而是从 state 属性中获取 input 标签的数据。

尽管在具体的数据上，打印的数据（即 state 属性）与 input 标签的数据是一样的，但是打印的数据来源却不是直接从 input 标签中获得，而是从 state 属性中获得。

这就使得 state 属性称为“唯一数据源”。

在此处，我们使用了 input 标签进行举例，但是其他的一些表单标签（如 textarea、select）也有类似的受控组件的用法，此处不做具体介绍。

## 非受控组件



非受控组件就是通过手动操作dom的方式获取文本框的值，文本框的状态不受react组件的state中的状态控制，直接通过原生dom获取输入框的值





# PubSub

消息订阅-发布机制

- 工具库：`PubSubJS`
- 下载：`npm install pubsub-js --save`



## 订阅消息

`subscribe` 方法接受两个参数



* 字符串： 消息名称（自定义）
* 回调函数： 当第一个参数的消息被 `publish` 时执行

该回调函数必须接收两个参数`message`和`data`，`msg`参数即该回调函数触发时所对应的消息内容，`data`即订阅最后得到的消息内容。

该方法会返回一个`token`，用于指定特定的订阅。

>此处要注意一个点——应该在何处进行订阅。
>
>我们当然可以设置单独的事件来进行订阅消息，但是如果是一开始就需要订阅某个消息的情况，我们应该在生命周期钩子`componentDidMount`内订阅消息。

## 取消订阅

`unsubscribe` 方法

- 当参数为一个回调函数时，取消绑定该回调函数的所有订阅。
- 当参数为一个字符串是时，取消绑定该消息的所有订阅。
- 当参数为一个`token`时，取消该`token`对应的订阅。

`clearAllSubscriptions`方法，取消所有订阅。



## 发布消息

`publish` 方法（异步发送消息）

`publishSync` （同步发送消息）

- 第一个参数为字符串，信息名称。
- 第二个参数即要发布的消息的数据。



## 兄弟组件之间传递数据



我们当然可以将数据传递给父组件，父组件再传递给另一个兄弟组件，但这样会造成代码大量冗长，而使用`PubSubJS`工具库就可以让整个实现变得更加清晰。

假设当前需要在`Tom`组件中发布消息到`Jerry`组件中展示，利用`PubSub`模块可以更加轻松实现。



>

```react
import ...
export default class Tom extends React.Component {
    add = () => {
        const {value} = this.keyWordEle
        PubSub.publish('add', value)
    }
    render() {
        <input ref={c => this.keyWordEle = c} type='text'/>
        <button onClick={this.add}>Add</button>
    }
}
export default class Jerry extends React.Component {
    state = {
        list: []
    }
    componentDidMount() {
        PubSub.subscribe('add', (msg, data) => {
            const {list} = this.state
            list.push(data)
            this.setState({list: list})
        })
    }
    render() {
        const {list} = this.state
        return (
            list.map(value => {
                return <div>value</div>   
            })
        )
    }
}
```



# 懒加载

## React.lazy



React.lazy 可以让我们像渲染常规组件一样处理动态引入。

使用之前：

```
import Demo from './src'
```

使用之后：

```
const Demo = React.lazy(() => import('./src'))
```

这个代码会在组件首次渲染时，自动导入 Demo 组件。

React.lazy() 接收一个函数，表面这个函数需要动态调用 import()。它返回一个 Promise 对象，这个 Promise 需要 resolve 一个默认导出 default export 的 React 组件。

然后我们应该在 Suspense 组件中渲染 lazy 组件，这样可以帮助我们在等待加载 lazy 组件时做优雅降级（如 loading 指示器等等）。

```js
import React, { Suspense } from 'react';

const Demo = React.lazy(() => import('./src'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Demo/>
      </Suspense>
    </div>
  );
}
```



## 基于路由的代码分割

决定在哪引入代码分割需要一些技巧。你需要确保选择的位置能够均匀地分割代码包而不会影响用户体验。

一个不错的选择是从路由开始。大多数网络用户习惯于页面之间能有个加载切换过程。你也可以选择重新渲染整个页面，这样您的用户就不必在渲染的同时再和页面上的其他元素进行交互。

下面的例子展示了如何使用 React.lazy 和 React-Router 来配置基于路由的代码分割：

```react
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
);
```













# Context 机制

如果需要将数据从祖先组件传递到子孙组件，通常需要通过 props 层层传递

Context 提供了一个无需为每层组件手动添加 `props`，就能在组件之间进行数据传递的方法：

Context 主要应用场景是 **很多不同层级的组件需要访问同样一些的数据**。由于 Context 的使用会使得组件复用性变差，因此需要谨慎使用。



## Context 对象

`React.createContext()` 方法可以创建一个 Context 对象。该方法接收一个参数作为 Context 对象默认值，并返回创建的 Context 对象：

```react
import React from 'react'

const context = React.createContext('light')

class ContextClassDemo extends React.Component {
    render() {
        console.log(context)

        return (
            <div>
                This is Context Demo.
            </div>
        )
    }
}

export default ContextClassDemo
```



![img](https://blog.yucohny.vercel.app/images/react/1.png)



打印 Context 对象发现，Context 对象中的属性包含一个 React Provider 组件与一个 React Consumer 组件。



## Context.Provider



Provider 组件接收一个参数 `value`，并将其传递给消费组件

一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。

```react
class ContextClassDemo extends React.Component {
    render() {
        return (
            <context.Provider value={'dark'}>
                <context.Provider value={'medium'}>
                    <Son/>
                </context.Provider>
            </context.Provider>
        )
    }
}

// 显示 The theme is medium.
```

如果没有找到合法的 Provider 组件，将会使用 Context 默认值：

```react
class ContextClassDemo extends React.Component {
    render() {
        return (
            <Son/>
        )
    }
}

// 显示 The theme is light.
```



**当 Provider 组件的 `value` 属性发生变化时，其内部的所有消费组件都会重新渲染。**



## class.contextType

当某个 **类式组件** 想要使用某个 Context 对象时，可以在组件类上中挂载 `contextType` 属性，并将其指定为对应的 Context 对象后，便能在组件中通过 `this.context` 访问该 Context 对象在此处的值：

```react
import React from 'react'

const context = React.createContext('light')

class ContextClassDemo extends React.Component {
    render() {
        return (
            <Son/>
        )
    }
}

// 显示 The theme is light.

class Son extends React.Component {
    render() {
        const value = this.context
        return (
            <div>
                The theme is {value}.
            </div>
        )
    }
}

Son.contextType = context

export default ContextClassDemo
```

使用实验性的 [Public Class Fields](https://github.com/tc39/proposal-class-public-fields) 语法可以更加方便进行初始化：

```react
class Son extends React.Component {
    static contextType = context
    render() {
        const value = this.context
        return (
            <div>
                The theme is {value}.
            </div>
        )
    }
}
```

## useContext

指定 `contextType` 属性是类式组件使用 Context 对象的方式，如果想要在函数式组件中使用 Context 对象，需要使用 `useContext()` 钩子。

`useContext()` 接收一个 Context 对象，返回该 Context 对象在此处的值：

```react
const Son = () => {
    const value = useContext(context)
    return (
        <div>
            The theme is {value}.
        </div>
    )
}
```



## Context.Consumer

一个 React 组件可以订阅 context 的变更，此组件可以让你在函数式组件中可以订阅 context。

Consumer 组件的子元素是一个函数，传递给函数的 `value` 值等价于组件树上方离这个 context 最近的 Provider 提供的 `value` 值。如果没有对应的 Provider，`value` 参数等同于传递给 `createContext()` 的 `defaultValue`。该函数最终返回一个 React 组件，即最终渲染的组件：

```react
class ContextClassDemo extends React.Component {
    render() {
        return (
            <context.Provider value={'dark'}>
                <context.Consumer>
                    {
                        value => {
                            return (
                             {value}
                            )
                        }
                    }
                </context.Consumer>
            </context.Provider>
        )
    }
}
```

## 在 DevTools 中展示

运行代码后，打开 DevTools 中的 Components，可以看到如下的组件关系：

![img](https://blog.yucohny.vercel.app/images/react/2.png)

在 Context 对象上挂载 `displayName` 字符串，该字符串为在 DevTools 中展示的 Context 对象名称：

```react
const context = React.createContext('light')

context.displayName = 'theme'
```

![img](https://blog.yucohny.vercel.app/images/react/3.png)





# 高阶函数

如果一个函数符合下面`2`个规范中的任何一个，那么该函数就可以称为高阶函数。

- 若`A`函数，接受的参数是一个函数，那么`A`就可以称之为高阶函数。
- 若`A`函数，返回值依然是一个函数，那么`A`就可以称之为高阶函数。



## 函数的柯里化

通过函数调用继续返回函数的方式，实现多次接受参数最后统一处理的函数编码形式。

```js
function sum(a) {
    return (b) => {
        return (c) => {
            return a + b + c
        }
    }
}
console.log(sum(1)(2)(3))
```





# Refs 转发



## React.forwardRef()

考虑下面 `Demo` 组件：

```react
class Demo extends React.Component {
    render() {
        return (
            <input/>
        )
    }
}
```

当其他组件调用 `Demo` 组件时，通常并不需要能够单独操控 `Demo` 组件中的 `input` 元素；但是当需要进行管理焦点等操作时，仍然需要 **能够** 访问 `Demo` 组件的 `input` 元素。

Refs 转发就是将 ref 传递到子组件的技巧。

如果一个组件可能要接收其父组件传递而来的 ref 对象，那么可以使用 `React.forwardRef()` 进行包装。

`React.forwardRef()` 接收一个渲染函数作为参数，并最终返回一个组件。这个渲染函数接收的两个参数分别为 props 和 ref 对象，此时可以将接收到的 ref 对象挂载至子组件上：



```react
const Demo = React.forwardRef((props, ref) => {
    return (
        <input ref={ref}/>
    )
})

class App extends React.Component {
    inputRef = React.createRef()

    handleClick = () => {
        console.log(this.inputRef.current.value)
    }

    render() {
        return (
            <div>
                <Demo ref={this.inputRef}/>
                <button onClick={this.handleClick}>
                    Click me.
                </button>
            </div>
        )
    }
}
```

## 在 DevTools 中显示自定义名称

```
const Demo = React.forwardRef((props, ref) => {
    return (
        <input ref={ref}/>
    )
})

class App extends React.Component {
    inputRef = React.createRef()

    handleClick = () => {
        console.log(this.inputRef.current.value)
    }

    render() {
        return (
            <div>
                <Demo ref={this.inputRef}/>
                <button onClick={this.handleClick}>
                    Click me.
                </button>
            </div>
        )
    }
}
```

当我们执行上面的代码时，打开 DevTools，可以看到开发者工具中的 ref 名称默认为 `ForwardRef`：



![img](https://blog.yucohny.vercel.app/images/react/4.png)



如果命名 `React.forwardRef` 接收的渲染函数，那将会显示对应的名称：

```
const DemoRef = (props, ref) => {
    return (
        <input ref={ref}/>
    )
}

const Demo = React.forwardRef(DemoRef)
```



![img](https://blog.yucohny.vercel.app/images/react/5.png)



除此之外，也可以设置渲染函数的 `displayName` 属性：

```
const DemoRef = (props, ref) => {
    return (
        <input ref={ref}/>
    )
}

DemoRef.displayName = 'myName'

const Demo = React.forwardRef(DemoRef)
```



![img](https://blog.yucohny.vercel.app/images/react/6.png)



## useRef

与 `React.createRef` 类似，`useRef` 返回一个可变的 ref 对象，它的 `current` 属性将被初始化为传入 `useRef` 钩子的参数。不过，`React.createRef` 生成的 ref 对象不能用于函数式组件，而 `useRef` 可以。

我们可以将生成的这个 ref 对象挂载至 DOM 或 React 元素的 `ref` 属性中，那么此时 ref 对象的 `current` 属性将被替换为对应的 DOM 或 React 元素。



使用 `React.createRef()` 创建 ref 对象时,ref 对象的引用只在函数组件的每次渲染中存在，而不是在组件的整个生命周期中存在。这意味着每次组件重新渲染时，都会创建一个新的 ref 对象，而之前创建的 ref 对象则会被销毁。如果我们在函数式组件中使用 `React.createRef()` ，并将其挂载到一个表单，我们为表单输入不同的值，最后打印这个 ref.current.value，永远都是他的初始值

React 推荐使用 `useRef` 钩子来在函数式组件中创建 ref 对象。`useRef` 返回一个普通 JavaScript 对象，并在组件的整个生命周期中保持不变，这意味着可以在任何时候访问到 ref 对象，不需要担心在组件重新渲染时丢失引用。另外，通过 `useRef` 创建的 ref 对象可以直接传递给子组件，并且可以在函数式组件中使用。



# 高阶组件

React 组件是通过 `props` 属性将其转化为 UI；高阶组件则是将一个组件转化为另一个组件，因此，可以将高阶组件视为 **传入组件作为参数，并返回一个组件的函数**。

具体而言，**高阶组件是参数为组件，返回值为新组件的函数。**

```react
const HOC = (WrappedComponent) => (
    class toSize extends React.Component {
        state = {
            xpos: document.documentElement.clientWidth,
            ypos: document.documentElement.clientHeight
        }
        getPos = () => {
            this.setState({
                xpos: document.documentElement.clientWidth,
                ypos: document.documentElement.clientHeight
            })
        }
        componentDidMount () {
            window.addEventListener('resize', this.getPos)
        }
        render () {
            return (
                <WrappedComponent {...this.state} />
            )

        }
    }
)


const Son = (props) => {

    return (
        <>
            <button>x: {props.xpos}, y: {props.ypos}</button>
        </>
    )
}
const Foo = (props) => {
    return (
        <h1>x: {props.xpos}, y: {props.ypos}</h1>
    )
}

const SonSize = HOC(Son)
const FooSize = HOC(Foo)


class App extends React.Component {

    render () {
        return (
            <>
                <SonSize />
                <FooSize />
            </>

        )
    }
}




export default App
```

上面这个例子，通过高阶组件 HOC ，返回了一个新的组件 toSize， 在这个组件里面我们定义了 Foo 和 Son 一些共有的特性，最后将 传入的对应组件 通过 toSize 组件渲染







# Portals



通常来讲，当从组件的 `render` 方法返回一个元素时，该元素将被挂载到离它最近的父节点中。

但是如果我们想要自定义插入元素位置时，就可以使用 `Portal`：

```
ReactDOM.createPortal(child, container)
```

第一个参数 child 是任何 [可渲染的 React 子元素](https://react.docschina.org/docs/react-component.html#render)，例如一个元素，字符串，甚至是 `fragment`。

第二个参数 container 是一个 DOM 元素。

一个 `portal` 的典型用例是当父组件有 `overflow: hidden` 或 `z-index` 样式时，但你需要子组件能够在视觉上“跳出”其容器。





## 通过 Portal 进行事件冒泡

尽管我们可以将 `portal` 放置在 DOM 树中的任何地方，但在任何其他方面，其行为和普通的 React 子节点行为一致。由于 `portal` 仍存在于 React 树， 且与 DOM 树中的位置无关，那么无论其子节点是否是 `portal`，像 `context` 这样的功能特性都是不变的。

这包含事件冒泡。一个从 portal 内部触发的事件会一直冒泡至 React 树的祖先，即便这些元素并不是 DOM 树中的祖先。





# Profiler

## 用法

Profiler 能添加在 React 树中 的任何地方来测量渲染树中的这部分所需要的开销。

改组件接收两个属性：

- id: string
- onRender: callback()

> onRender 是当组件树种的组件「提交」更新时调用的回调函数。

举个例子，我们想要分析 Navigation 组件树：

```
render(
  <App>
    <Profiler id="Navigation" onRender={callback}>      <Navigation {...props} />
    </Profiler>
    <Main {...props} />
  </App>
);
```

> 注意：
>
> 1. 多个 Profiler 组件能测量应用中的不同部分。
> 2. 可以嵌套使用 Profiler 进行检测。

## onRender 回调

该回调函数接收的参数描述了渲染的内容以及所花费的时间：

- id：发生提交的树（或者说对应节点）的 id

> id 可用于分辨是树的哪一部分发生了「提交」。

- phase：如果组件树该加载，则值为 mount；如果组件树重新渲染了，则值为 update。

> 判断是组件树的第一次装载引起的重渲染，还是由 props、state 或是 hooks 改变引起的重渲染。

- actualDuration：本次更新花费的渲染时间

> 本次更新在渲染 Profiler 和它的子代上花费的时间。 这个数值表明使用 memoization 之后能表现得多好。理想情况下，由于子代只会因特定的 prop 改变而重渲染，因此这个值应该在第一次装载之后显著下降。

- baseDuration：估计不使用 memoization 的情况下渲染整颗子树需要的时间

> 在 Profiler 树中最近一次每一个组件 render 的持续时间。 这个值估计了最差的渲染时间。（例如当它是第一次加载或者组件树没有使用 memoization）。

- startTime：本次更新中 React 开始渲染的时间

> 本次更新中 React 开始渲染的时间戳。

- commitTime：本次更新中 React committed 的时间

> 本次更新中 React commit 阶段结束的时间戳。 在一次 commit 中这个值在所有的 profiler 之间是共享的，可以将它们按需分组。

- interactions：属于本次更新的 interactions 的集合

> 该参数为集合类型。当更新被制定时，interactions 的集合会被追踪（例如当 render 或者 setState 被调用时）。
>
> Interactions 能用来识别更新是由什么引起的。





# React.memo

React.memo() 是 React 16.6 引入的新特性，它可以对函数式组件进行记忆化处理，避免无必要的重新渲染。当一个组件通过 props 接收数据，并且这些数据在多次渲染过程中保持不变时，该组件就不需要重复渲染。React.memo() 可以将这种无必要的重新渲染给消除掉，从而提升应用性能。为了使用 React.memo()，只需对需要进行记忆化处理的组件进行包装即可。



假设我们有一个 Messages 组件，它会接收一个数组作为 props，然后展示这个数组中的所有消息。可以定义如下的 Messages 组件：

```js
function Messages(props) {
  return (
    <div>
      {props.messages.map(message => (
        <div key={message.id}>
          <strong>{message.author}:</strong> {message.text}
        </div>
      ))}
    </div>
  );
}
```

在这个组件中，我们通过 map() 方法来遍历 messages 数组，然后渲染出每个消息。

然而，在某些情况下，messages 数组可能会比较大，由于 React 在每次重新渲染时都会执行 map() 方法，这可能会导致性能瓶颈。为了解决这个问题，我们可以使用 React.memo() 对 Messages 组件进行优化。代码如下：

```js
const MemoizedMessages = React.memo(Messages);
```

在这个例子中，我们对 Messages 组件进行了记忆化处理，并将其命名为 MemoizedMessages。React.memo() 只会对 props 发生变化的时候进行重新渲染 MemoizedMessages 组件。如果 messages 数组没有发生变化，MemoizedMessages 组件就会复用之前的渲染结果，从而提高渲染性能。

使用 React.memo() 非常简单，只需要将组件传入 React.memo() 方法中即可。需要注意的是，被记忆化处理的组件必须是函数式组件，因为类式组件已经有了自己的生命周期方法来进行优化。

# Hooks

Hooks的本质：**一套能够使函数组件更强大，更灵活的“钩子”**

可以让函数组件使用 state 以及其他 React 特性。由于 JavaScript 中原本没有 class 的概念，因而 Hook 的存在正促使开发者从类式组件向函数式组件进行转变。



Hook 是一些可以让你在 **函数组件** 中使用 React state 特性以及生命周期等特性的函数。

Hook 基本的使用规则如下：

- 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。

- 只能在 React 的函数组件或者其他 Hook组件中调用 Hook，而不要在其他的 JS 函数中调用。
- 可以通过开发者工具查看hooks状态

如果Hook的调用顺序不相同，React无法正确地跟踪每个状态的关联关系，导致组件状态出现错误。

## useState

在 Hook 出现之前，由于函数式组件中并不存在 state 特性，因而更多使用类式组件。但是 Hook 的出现使得函数式组件同样可以使用 state 特性，并且在函数式组件中通过 Hook 使用 state 特性，比类式组件中使用 state 特性更加便捷。

* 引入 state

```js
import React, { useState } from 'react'
```

* 声明 state

`useState()` 是声明新 state 的钩子，接收一个参数，作为该 state 的初始值；返回一个数组，这个数组的第一个元素是 state 变量，第二个元素是修改该 state 的方法。

```react
import React, { useState } from 'react'

function Demo() {
    const [count, setCount] = useState(0)
}
```



* 读取 state

直接使用声明的 state 变量：

```react
<p> You clicked { count } times.</p>
```

* 更新 state

`useState()` 返回的数组中的第二个元素是更新 state 的方法。这个方法接收一个参数，作为该 state 的新值。

```react
import React, { useState } from 'react'

function Demo() {
    const [count, setCount] = useState(0)
    
    const click = () => {
        setCount(count + 1)
    }
}
```



### 替换而不是合并

使用 `useState` 更新函数式组件中的状态时，如果状态是一个对象，那么新状态将会是新对象，而不是将旧对象与新对象合并。



## useEffect

可以简单将 `useEffect` 视为 `componentDidMount`，`componentDidUpdate` 和 `componentWillUnmount` 这三个生命周期的组合。

### 副作用

副作用是相对于主作用来说的，一个函数除了主作用，其他的作用就是副作用。对于 React 组件来说，**主作用就是根据数据（state/props）渲染 UI**，除此之外都是副作用（比如，手动修改 DOM）

**常见的副作用**

1. 数据请求 ajax发送
2. 手动修改dom
3. localstorage操作

useEffect函数的作用就是为react函数组件提供副作用处理的！



* 引入

```react
import React, { useEffect } from 'react'
```

* 使用

`useEffect` 接受两个参数，一个是依赖项触发时的回调函数，一个是依赖项



**不添加依赖项**

* 组件首次渲染、以及不管是哪个状态引起组件的更新都会执行

```react
useEffect(()=>{
    console.log('副作用执行了')
})
```

**添加空数组**

* 只在首次渲染时执行一次

```react
useEffect(()=>{
	 console.log('副作用执行了')
},[])
```

**添加特定依赖项**

* 副作用函数在首次渲染、依赖项发生变化时都会重新执行

```react
function App() {  
    const [count, setCount] = useState(0)  
    const [name, setName] = useState('zs') 
    
    useEffect(() => {    
        console.log('副作用执行了')  
    }, [count])  
    
    return (    
        <>      
         <button onClick={() => { setCount(count + 1) }}>{count}</button>      
         <button onClick={() => { setName('cp') }}>{name}</button>    
        </>  
    )
}
```

### 清理副作用

如果想要清理副作用 可以在副作用函数中的末尾return一个新的函数，在新的函数中编写清理副作用的逻辑

注意执行时机为：

1. 组件卸载时自动执行
2. 组件更新时，下一个useEffect副作用函数执行之前自动执行



## useLayoutEffect

- useEffect是异步执行的，而useLayoutEffect是同步执行的
- useEffect在浏览器完成渲染之后执行，而useLayoutEffect在浏览器把内容真正渲染到界面之前执行
- useLayoutEffect可以用来读取或修改DOM的布局，并同步重新渲染
- useLayoutEffect会阻塞浏览器的重绘，所以应该尽量避免使用它，除非有特殊需求

一般来说，你应该优先使用useEffect，因为它不会影响浏览器的性能和用户体验。只有当你需要在渲染之前读取或修改DOM的布局，并且不能用其他方式实现的时候，才考虑使用useLayoutEffect。例如，如果你需要根据DOM的尺寸或位置来调整样式或动画，那么你可能需要用useLayoutEffect。

## useRef

与 `React.createRef` 类似，`useRef` 返回一个可变的 ref 对象，它的 `current` 属性将被初始化为传入 `useRef` 钩子的参数。不过，`React.createRef` 生成的 ref 对象不能用于函数式组件，而 `useRef` 可以。

我们可以将生成的这个 ref 对象挂载至 DOM 或 React 元素的 `ref` 属性中，那么此时 ref 对象的 `current` 属性将被替换为对应的 DOM 或 React 元素。

使用 `React.createRef()` 创建 ref 对象时,ref 对象的引用只在函数组件的每次渲染中存在，而不是在组件的整个生命周期中存在。这意味着每次组件重新渲染时，都会创建一个新的 ref 对象，而之前创建的 ref 对象则会被销毁。如果我们在函数式组件中使用 `React.createRef()` ，并将其挂载到一个表单，我们为表单输入不同的值，最后打印这个 ref.current.value，永远都是他的初始值

React 推荐使用 `useRef` 钩子来在函数式组件中创建 ref 对象。`useRef` 返回一个普通 JavaScript 对象，并在组件的整个生命周期中保持不变，这意味着可以在任何时候访问到 ref 对象，不需要担心在组件重新渲染时丢失引用。另外，通过 `useRef` 创建的 ref 对象可以直接传递给子组件，并且可以在函数式组件中使用。

## useContext



指定 `contextType` 属性是类式组件使用 Context 对象的方式，如果想要在函数式组件中使用 Context 对象，需要使用 `useContext()` 钩子。

`useContext()` 接收一个 Context 对象，返回该 Context 对象在此处的值：

```react
const Son = () => {
    const value = useContext(context)
    return (
        <div>
            The theme is {value}.
        </div>
    )
}
```



## useMemo

useMemo 是一个 React Hook，它可以让你在重新渲染之间缓存一个计算的结果这样可以避免每次渲染时都进行昂贵的计算。useMemo 接受两个参数：一个是用于计算结果的函数，另一个是依赖数组。当依赖数组中的任何一个值发生变化时，useMemo 会重新执行函数并缓存新的结果

useMemo 和 useCallback 的区别是，useMemo 返回一个缓存的值，而 useCallback 返回一个缓存的函数

```react
import React, { useMemo } from 'react';

function expensiveCalculation(a, b) {
  // 这里进行了一些昂贵的计算
  return a * b;
}

function MyComponent(props) {
  const { a, b } = props;
  const result = useMemo(() => {
    return expensiveCalculation(a, b);
  }, [a, b]);
  return (
    <div>
      The result is {result}
    </div>
  );
}

```





## useCallback

useCallback 是一个 React Hook，它可以让你在重新渲染之间缓存一个函数的引用。这样可以避免每次渲染时都创建一个新的函数。useCallback 接受两个参数：一个是需要缓存的函数，另一个是依赖数组。当依赖数组中的任何一个值发生变化时，useCallback 会返回一个新的函数引用。

useCallback 的主要目的是在于配合子组件的 shouldComponentUpdate 或者 React.memo 来减少不必要的渲染。如果你把一个内联函数作为回调传递给子组件，那么每次父组件渲染时，函数就会被重新创建，那么子组件也会重新渲染，我们使用useCallback ，就可以只在某些特定的依赖项变化时，重新创建这个函数



useCallback 可以用于优化传递给子组件的函数属性的性能。例如，如果你有一个 handleSubmit 函数，它需要传递给 ShippingForm 组件：

```js
function ProductPage({ productId, referrer, theme }) {
  // ...
  function handleSubmit(address) {
    // ...
  }
  return (
    <div className={theme}>
      {/* ... */}
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}
```

这样的话，每次 ProductPage 渲染时，都会创建一个新的 handleSubmit 函数，并且导致 ShippingForm 也重新渲染。但是如果你用 useCallback 缓存了 handleSubmit 函数，并且把 productId 和 referrer 作为依赖数组：

```js
function ProductPage({ productId, referrer, theme }) {
  // ...
  const handleSubmit = React.useCallback((address) => {
    // ...
  }, [productId, referrer]);
  return (
    <div className={theme}>
      {/* ... */}
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}
```

这样的话，只有当 productId 或 referrer 发生变化时，才会创建一个新的 handleSubmit 函数，并且导致 ShippingForm 重新渲染。否则，useCallback 会返回上次缓存的函数引用。

# React Router

> 基于 React-Router v6





## 概述



### SPA

SPA Single Page Application 单页面 Web 应用，整个页面只有一个完整的页面。点击页面中的链接不会刷新页面，只会做页面的局部更新。

### React Router

React Router 以三个不同的包发布在 npm：

1. react-router：路由的核心库，提供了许多的组件与钩子。
2. react-router-dom：包含 react-router 的所有内容，并添加了一些专门用于 DOM 的组件，如 `<BrowserRouter>` 等等。
3. react-router-native：包含 react-router 的所有内容，并添加了一些专门用于 ReactNative 的 API，如 `<NativeRouter>` 等等。

React Router 这一部分的笔记着重介绍 react-router-dom 的相关知识。

安装：

```
npm install react-router-dom
```





## 基本使用

### 路由链接 



我们使用 `<Link>` 或者 `<NavLink>` 标签实现路由的跳转，其中的 `to` 属性指向的即为对应的路由连接，其余用法与原本的锚点标签 `<a>` 相同：

```react
import React from 'react'
import {Link} from 'react-router-dom'

export default function Demo() {
    return (
    	<Link to='/home'>Home</Link>
    )
}
```

**NavLink**

如果想要在 `<Link>` 标签被选中时具有对应的高亮效果，可以考虑使用 `<NavLink>` 标签。`NavLink` 有一个属性 `activeClassName` ，用来表示当该链接被点击时追加的一个类。基于这个属性，我们便可以实现点击某个路由链接时，该路由链接获得对应的效果。

当有多个路由链接对应不同组件时，如果使用多个 `NavLink` 标签，会造成代码的大量冗长重复。因此我们可以考虑自己封装 `NavLink` 标签，只需要指定 `NavLink` 标签的不同之处：

```react
import React from 'react'
import {NavLink} from 'react-router-dom'

export default function MyNavLink() {
    return (
        <NavLink activeClassName="active" className="navlink" {...this.props}}/>
    )
}
```

随后我们只需要像这样使用：

```react
import React from 'react'
import {MyNavLink} from '...'

export default function Demo() {
    return (
    	<MyNavLink to='/home'>Home</MyNavLink>
    )
}
```



### **BrowerRouter**

作用: 包裹整个应用，一个React应用只需要使用一次

| **模式**     | **实现方式**                   | **路由url表现**               |
| ------------ | ------------------------------ | ----------------------------- |
| HashRouter   | 监听url hash值实现             | http://localhost:3000/#/about |
| BrowerRouter | h5的 history.pushState API实现 | http://localhost:3000/about   |



编写路由链接和注册路由对应的标签 `<Link>`、`<NavLink>` 与 `<Route>` 都需要在外部包裹一个 `<BrowserRouter>` 或 `<HashRouter>` 标签，但是我们不能将其分开包裹，不然会造成路由失效。

其中的一个解决办法是，我们在渲染整个的大外壳组件 `<App/>` 时，就直接将其包裹在 `<BrowserRouter>` 或 `<HashRouter>` 标签内：

```react
ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('root')
)
```



### 注册路由



我们使用 `<Routes/>` 与 `<Route>` 标签注册路由。

`<Route>` 标签均置于 `<Routes>` 标签内部，而 `<Route>` 标签接收两个属性：

- `path` 属性，该属性接收一个路由，表示当前路由为该路由时，渲染 `element` 属性对应的组件。
- `element` 属性，该属性接收一个组件，表示渲染对应的组件。

```react
import React from 'react'
import {Routes, Route} from 'react-router-dom'

export default function Demo() {
    return (
        <Routes>
            <Route path='/home' element={<Home/>}/>
            <Route path='/school' element={<School/>}/>
        </Routes>
    )
}
```

在 `Routes` 组件中，当成功匹配到第一个路由后，就不会再继续向下匹配。

`Route` 组件可以接受一个属性 `caseSensitive`，用于指定匹配路由时是否区分大小写。默认为 `false`，即不区分大小写。



### useRoutes



考虑上面的示例代码，我们发现这些 `Route` 组件当中有大量重复冗余的内容，因此我们可以考虑使用 `useRoutes` 钩子来集中管理。

引入 `useRoutes` 后，`useRoutes` 接收一个数组作为参数，返回对应的路由组。参数数组的每个元素为一个对象，每个对象包含的属性即为 `Route` 组件包含的属性：

```react
import React from 'react'
import {useRoutes} from 'react-router-dom'

export default function Demo() {
    const elements = useRoutes([
        {
            path: '/home',
            element: <Home/>
        },
        {
            path: '/school',
            element: <School/>
        }
    ])
    return (
        elements
    )
}
```

另外一个值得注意的地方是，我们的 `Demo` 组件实际上关心的更多是业务逻辑，路由的跳转并不是主要，因此我们可以考虑建立单独的 `route` 目录，建立路由表，将路由的管理移交出去：

```react
import Home from '...'
import School from '...'
......
export default [
	{
    	path: '/home',
        element: <Home/>
    },
    {
        path: '/school',
        element: <School/>
    }
]


import React from 'react'
import {useRoutes} from 'react-router-dom'
import routes from '...'

export default function Demo() {
    const elements = useRoutes(routes)
    return (
        {elements}
    )
}
```



### 嵌套路由

当我们想要使用形如 `/home/me` 这样的嵌套路由时，可以为路由表中的 `children` 属性指定数组，表示嵌套路由对应的组件：

```react
import Home from '...'
import School from '...'
......
export default [
	{
    	path: '/home',
        element: <Home/>,
        children: [
            {
                path: 'me',
                element: <Me/>
            }
        ]
    },
    {
        path: '/school',
        element: <School/>
    }
]
```



## 重定向

当我们的路由为 `/`，或者为我们并未直接指定对应的组件时，我们可以使用重定向来指定此时需要渲染的组件。

我们引入 `Navigate` 标签，并在 `Routes` 组件的最后添加一个 `Route` 组件，该组件的 `element` 属性指定为 `Navigate` 组件。`Navigate` 组件接收一个属性 `to`，表示重定向的路由。

如下列代码，当我们访问路由 `/` 时，无法在 `Routes` 组件中匹配到一个对应的组件，那么此时就会重定向至 `/home` 路由：

```react
import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'

export default function Demo() {
    return (
        <Routes>
            <Route path='/home' element={<Home/>}/>
            <Route path='/school' element={<School/>}/>
            <Route path='/' element={<Navigate to='/home'/>}/>
        </Routes>
    )
}
```





## 路由参数

### params

路由链接携带参数：

```react
<Link to='/demo/tom/18'>详情</Link>
```

注册路由中声明接收参数：

```react
<Route path='demo/:name/:age' element={<Demo/>}/>
```

随后我们在对应的路由组件中，使用 `useParams` 钩子来接收参数：

```react
import React from 'react'
import {useParams} from 'react-router-dom'

export default function Demo() {
    const params = useParams()
    return (
        ...
    )
}
```

### search

路由链接携带参数：

```react
<Link to='/demo?name=tom&age=18'>详情</Link>
```

正常注册路由：

```react
<Route path='/demo' element={<Demo/>}/>
```

随后我们在对应的路由组件中，使用 `useSearchParams` 钩子来接收参数。`useSearchParams` 返回一个数组，数组的第一个元素是 `search` 对象，我们可以通过 `get()` 方法来获取对应的参数；数组的第二个元素是一个函数，用于更新对应的参数。

```react
import React from 'react'
import {useSearchParams} from 'react-router-dom'

export default function Demo() {
    const [search, setSearch] = useSearchParams()
    const name = search.get('name')
    const age = search.get('age')
    return (
        ...
    )
}
```

### state

路由链接携带参数：

```react
<Link to='/demo' state={{name: 'tom', age: 18}}>详情</Link>
```

正常注册路由：

```react
<Route path='/demo' element={<Demo/>}/>
```

随后我们在对应的路由组件中，使用 `useLocation` 钩子来接收参数。`useLocation` 是一个对象，包含许多属性，其中的 `state` 属性包含了我们需要的参数：

```react
import React from 'react'
import {useLocation} from 'react-router-dom'

export default function Demo() {
    const {state: {name, age}} = useLocation()
    return (
        ...
    )
}
```





## 编程式路由



在 React Router v6 中，我们借助 `useNavigate` 这个钩子实现编程式路由导航：

```react
import React from 'react'
import {useNavigate} from 'react-router-dom'

export default function Demo() {
    const navigate = useNavigate()
    
    return (
    	...
    )
}
```

通过 `useNavigate` 生成的 `navigate` 接收两个参数，第一个参数为需要跳转的路由，第二个参数为一个对象，这个对象可以接收 `replace` 与 `state` 两个参数：

```react
import React from 'react'
import {useNavigate} from 'react-router-dom'

export default function Demo() {
    const navigate = useNavigate()
    
    const handleNavigate = (obj) => {
        navigate('/home', {
            state: {
                name: obj.name,
                age: obj.age
            }，
            //对应的组件通过useLocation获取
            replace: true //代表在跳转时不添加历史记录
        })
    }
    
    return (
    	<button onClick={() => {handleNavigate({name: 'tom', age: 18})}}>Click</button>
    )
}
```

如果我们想要通过 `navigate` 实现路由的前进与后退，直接使用 `navigate(1)` 和 `navigate(-1)` 即可。



## 为什么能够实现页面的局部刷新



React-Router 基于前端路由实现了单页面应用（Single Page Application，SPA）。在 SPA 中，所有的页面都是由一个 HTML 页面和多个 JavaScript 文件组成的，在用户进行页面跳转时，只需要加载局部内容，不需要刷新整个页面。

React-Router 通过监听 URL 变化实现了路由跳转，当用户进行路由切换时，React-Router 会根据新的 URL 加载对应的组件，然后将组件渲染到页面中。

需要注意的是，当使用 React-Router 进行页面跳转时，页面不会重新加载，而是通过浏览器的 History API 进行 URL 变化，然后在当前页面内渲染新的组件。这种方式使得用户体验更加流畅，并且能够提升页面性能，从而提高页面的交互性和用户满意度。



```react
function Route ({ path, component }) {
        const match = useMatch(path)
        return match ?React.createElement(component) : null
    }

    function Router ({ children }) {
        const location = useLocation()
        return React.Children.toArray(children).find(child => {
            return child.props.path === location.pathname
        }) || null
    }
```

我们可以利用该原理实现一个简易的 router

只需要像下面这样使用

```react
  <Router>
        <Route path='/' component={Home}></Route>
        <Route path='/about' component={List}></Route>
  </Router>
```





  

























# Redux



Redux 是基于 Flux 核心思想实现的状态管理库。这篇文章主要介绍 Flux 与 Redux 的基本思想。

## Flux

**组成**



* View

View 表示视图层面，依据 Store 中的数据展示页面，并实时响应 Store 的数据更新

* Store

Store 储存数据（状态）的位置，并且可以响应 Action 的消息

* Action

Action 用于描述动作，通常包括动作类型与动作描述

* Dispacher

Dispacher 用于接收 Action 并将其转发至 store



**单向数据流**

Flux应用中的数据以单一方向流动：

1. 用户在视图层面 View 触发 Action；
2. Dispacher 接收 Action 并将其转发至 Store；
3. Store 响应 Action 并更新数据；
4. 视图 View 依据 Store 中更新的数据更新页面。

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/3/24/169ad99e277502d0~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image)



单一方向数据流还具有以下特点：

- 集中化管理数据。常规应用可能会在视图层的任何地方或回调进行数据状态的修改与存储，而在Flux架构中，所有数据都只放在Store中进行储存与管理。
- 可预测性。在双向绑定或响应式编程中，当一个对象改变时，可能会导致另一个对象发生改变，这样会触发多次级联更新。对于Flux架构来讲，一次Action触发，只能引起一次数据流循环，这使得数据更加可预测。
- 方便追踪变化。所有引起数据变化的原因都可由Action进行描述，而Action只是一个纯对象，因此十分易于序列化或查看。



## Redux



**组成**

* Store

储存数据（状态）的唯一位置

* State

数据

* Action

组件通过 Action 将数据传递给 Store

* Reducer

Reducer 用于响应 Action，并在执行之后将 State 发送到 Store



**工作流程**

Redux 的工作流程与 Flux 类似，但是也有许多不同之处：

1. 用户发出动作 Action，并借由 Dispatcher 发送至 Store。
2. Store 将接收到的 Action 与之前的状态传递给内部的处理函数 Reducer，
3. Reducer 计算出最新数据并将其发送至存储数据的 Store 中
4. 订阅了 Store 数据的组件重新渲染。

Redux 有几大原则：

- 单一数据源。整个应用的数据（状态）储存于唯一存在的 Store 中。
- State 状态是只读的。不应该直接修改 State，而是通过触发 Action 实现。
- 使用纯函数 Reducer 修改状态。



![无标题-2022-07-27-1257.png](https://cdn.nlark.com/yuque/0/2022/png/274425/1659005485363-cb78240a-c99b-4f19-a7d9-35c91ccbb6ea.png?x-oss-process=image%2Fresize%2Cw_937%2Climit_0)



**与 Flux 的不同之处**

1. Redux 的 Store 唯一，而 Flux 可以具有多个 Store。
2. Redux 在 Reducer 中执行数据的更新，而 Flux 直接在 Store 中执行数据的更新。









### Action

组件通过 Action 将数据传递给 Store，也是 Store 中数据的唯一来源。

Action 本质就是一个对象，但是必须具有字符串类型的 `type` 属性表示将要执行的动作。Action 的其他属性则完全由自己决定：



同时，也可以以将 Action 的 type 类型存放于同一个文件中，便于维护（小项目大可不必）

```react
// store/mutation-types.js
export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'

// store/actions.js
import * as types from './mutation-types.js'

export function addItem(item) {
  return {
    type: types.ADD_TODO,
    payload: {
        text: 'Do something'
    }
  }
}

```

还有用于表示错误的Action：

```go
{
  type: 'ADD_TODO',
  payload: new Error(),
  error: true
}
```



### Action Creator

许多时候会有同种类型但是不同消息的 Action。此时可以定义一个函数动态生成某种固定类型的 Action：

```react
const addToDo = (payload) => {
    return {
        type: 'TODO_ADD',
        payload
    }
}

const addAction = addToDo('Hello')
```



###  Reducer

Reducer 用于响应 Action， 并在执行后将 State 发送到 Store

本质上是一个函数， 将之前的状态与传递的 Action 作为参数，并返回一个新的状态

```react
const reducer = (initState, action) => {
    ...
    return newState
}
```

当我们第一次执行 Reducer 时，并没有原状态，因此我们需要通过指定默认值的方式，来初始化状态：

```react
const defaultState = 0

const reducer = (initState = defaultState, action) => {
    if (action.type == 'TODO_ADD') {
        return action.payload
    } else {
        return initState
    }
}

const state = reducer(0, {
    type: 'TODO_ADD',
    payload: 'this is a test'
})
```

实际应用中，Reducer 不需要手动调用，`dispatch()` 方法会自动触发 Reducer 执行。因此，Store 需要在一开始的时候就知道 Reducer 是谁。

```react
import { createStore } from 'redux'

const store = createStore(reducer)
```



### Store

是储存数据（状态）的唯一位置，整个应用只能有一个 Store

Redux 提供 `createStore()` 函数生成 Store：

```react
import { createStore } from 'redux'

const store = createStore(Reducer)
```

`createStore()` 函数接收 Reducer 作为参数，返回新生成的 Store 对象。



### State

Store 对象包含所有的数据，如果想要得到数据， 通过 `getStore()`

```react
const state = store.getState()
```



### dispatch 方法

如果想要触发 Action，直接通过 `store.dispatch()` 方法即可：

```react
store.dispatch(action)
```

由于 Store 在最开始创建的时候，就已经指定了 Reducer，因此通过 `dispatch()` 方法发送 Action 时，就会自动执行指定的 Reducer。



### subscribe 方法

可以使用 `subscribe()` 方法设置监听函数，一旦 State 发生变化，该函数就会自动执行：

```react
import { createStore } from 'redux'

const store = createStore(reducer)

store.subscribe(listener)
```

`subscribe()` 方法返回一个函数，调用这个函数就可以解除监听：

```react
const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

unsubscribe();
```

通常，当状态 State 发生改变时，我们会重新渲染根组件 `App`，因此我们只需要在最外层组件进行订阅。





## 中间件

Redux 的基本思想是：用户触发 Action，从而触发 Reducer，Reducer 结合 Action 类型计算出新的 State。

这样的一个顺序显然是同步的，但是如果存在异步操作，就需要用到 **中间件 Middleware**。







### 什么是中间件

中间件，就是处理一个功能的中间环节，主要用于处理具有副作用的功能，比如异步操作就是最常见的中间件。

在一个项目中可以使用多个中间件，可以将其串联组合。

Redux 中间件用于处理状态的更新。





### 触发时机

没有中间件的执行顺序：Action → Reducer。

使用中间件的执行顺序：Action → 中间件 → Reducer。

### redux-thunk

redux-thunk 是一个 redux 中间件，用于异步操作

它允许在 dispatch action 的过程中使用异步的操作。通常情况下，Redux 的 action 只能返回普通对象，但是在使用 Redux-Thunk 中间件之后，action 也可以是一个函数，这个函数用于执行异步操作并最终 dispatch 真正的 action。

例如

假设我们需要从服务器获取当前登录用户的信息，并将其存入 Redux Store 中。传统的 Redux action 只能传递一个普通对象，无法进行异步操作，此时我们可以使用 Redux-Thunk 中间件。

1. 首先按照 redux-thunk 中间件

```bash
npm install redux-thunk --save
```

2. 在 createStore 函数中应用 redux-thunk

```js
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
);

```

3. 创建异步的 action

```js
export const getUserInfo = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'GET_USER_INFO_START' });
    // 这里可以放异步请求代码，比如 fetch
    fetch('/api/userInfo')
      .then(response => response.json())
      .then(data => {
        dispatch({ type: 'GET_USER_INFO_SUCCESS', payload: data });
      })
      .catch(error => {
        dispatch({ type: 'GET_USER_INFO_FAILURE', payload: error });
      })
  }
};

```

这个 action 是一个函数，接收两个参数：dispatch 和 getState。其中，dispatch 用于派发 action，getState 用于获取当前的状态树。

函数体内部，我们可以执行任意异步操作，比如 fetch 请求，在使用完成之后，再通过 dispatch 函数派发真正的 action，这个 action 是一个普通的对象，用来更新状态树中的数据。



这个 action 是一个函数，接收两个参数：dispatch 和 getState。其中，dispatch 用于派发 action，getState 用于获取当前的状态树。

函数体内部，我们可以执行任意异步操作，比如 fetch 请求，在使用完成之后，再通过 dispatch 函数派发真正的 action，这个 action 是一个普通的对象，用来更新状态树中的数据。



4.在组件中使用异步 action：

```react
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo } from './actions';

function UserInfo() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  if (user.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Info</h1>
      <div>Username: {user.username}</div>
      <div>Email: {user.email}</div>
    </div>
  );
}
```

在这个示例中，我们使用了 useSelector 和 useDispatch 这两个 React-Redux 提供的 hooks 来订阅 Redux Store 和分发 action。在组件挂载后，使用 useEffect 调用异步 action，获取用户信息并更新状态树中的数据。



## Immutable

### 不可变性的好处

不变性可以为你的应用程序带来更高的性能，并导致更简单的编程和调试，因为从不可更改的数据比在整个应用程序中可以随意更改的数据更容易推理。



### 为什么 Redux 需要不可变性



* Redux 和  React-Redux 使用 浅相等检查
* 不可变的数据管理最终使数据处理更安全。
* 时间旅行调试要求 reducer 是没有副作用的纯函数，这样你就可以正确地在不同的 state 之间跳转。

> 浅相等检查（shallow equality check）是指两个对象的引用是否相同，或者两个基本类型的值是否相等。浅相等检查只能检查对象引用是否相同，不能检查对象的内部状态是否相等。



Redux 在其 `combineReducers` 函数中使用浅相等检查来返回根 state 对象的新更改副本，或者，如果没有发生任何更改，则返回当前根 state 对象。



### React-Redux 如何使用浅相等检查

React-Redux 使用浅相等检查来确定它所包装的组件是否需要重新渲染。





# Redux-Toolkit



**Redux Toolkit** 它最初是为了帮助解决有关 Redux 的三个常见问题而创建的：

- "配置 Redux store 过于复杂"
- "我必须添加很多软件包才能开始使用 Redux"
- "Redux 有太多样板代码"



## configureStore

通常情况下，你可以调用 `createStore()` 来创建一个 Redux store ，并传入你的 root reducer 函数。Redux工具包 有一个 `configureStore()` 函数，其中覆盖了 `createStore()` 来做同样的事情，同时也设置了一些有用的开发工具给你作为 store 创建过程的一部分。同时，默认情况下包含 `redux-thunk` 



我们可以很容易的用 `configureStore` 替换现有的 `createStore` 调用。`configureStore` 接受一个具有指定字段的对象，而不是多个函数参数，因此我们需要将 reducer 函数作为一个名为 `reducer` 的字段传递：

```react
// 之前:
const store = createStore(counter)

// 之后:
const store = configureStore({
  reducer: counter
})
```



## createAction

`createAction` 接受一个 action type 字符串作为参数，并返回一个使用该 type 字符串的 action creator 函数。

```react
// 原本的实现: 纯手工编写 action type 和 action creator
const INCREMENT = 'INCREMENT'

function incrementOriginal() {
  return { type: INCREMENT }
}

console.log(incrementOriginal())
// {type: "INCREMENT"}

// 或者，使用 `createAction` 来生成 action creator:
const incrementNew = createAction('INCREMENT')

console.log(incrementNew())
// {type: "INCREMENT"}
```

* 引用 action type 字符串

```js
const increment = createAction('INCREMENT')

//通过toStirng()
console.log(increment.toString())
// "INCREMENT"

//通过 .type
console.log(increment.type)
// "INCREMENT"
```

如果想要给 action 添加额外的数据，可以在调用 action creator 时传入一个 payload 参数。例如：

```js
const addTodo = createAction('todos/add')
addTodo({ text: 'Learn Redux' }) // { type: 'todos/add', payload: { text: 'Learn Redux' } }
```

## createReducer

接收两个参数，第一个是初始化的值，第二个就是我们定义的响应 action 的部分

它让使用"查找表"对象的方式编写 reducer，其中对象的每一个 key 都是一个 Redux action type 字符串，value 是 reducer 函数

```react
const increment = createAction('INCREMENT')
const decrement = createAction('DECREMENT')

const counter = createReducer(0, {
  [increment.type]: state => state + 1,
  [decrement.type]: state => state - 1
})
```

## createSlice

它允许我们提供一个带有 reducer 函数的对象，并且它将根据我们列出的 reducer 的名称自动生成 action type 字符串和 action creator 函数。

`createSlice` 返回一个 "切片" 对象，该对象包含被生成的 reducer 函数，其作为一个名为 `reducer` 的字段，以及被生成的、放置在一个名为 `actions` 的对象中的所有 action creator 函数。

```react
const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: state => state + 1,
    decrement: state => state - 1
  }
})

const store = configureStore({
  reducer: counterSlice.reducer
})



document.getElementById('increment').addEventListener('click', () => {
  store.dispatch(counterSlice.actions.increment())
})
```



注意： 如果像上面这样定义，要想对这个 store 进行 dispath， 必须使用它自身提供的 action 函数

```react
 export const { increment, decrement } = counterSlice.actions
```

包括其他模块在内，必须使用导出的 action， 而不能使用 类似 createAction返回的内容， 如 `dispatch(createAction('increment')()) ` 这样的 dispatch 是不会引起上面的 store 的变化的

如果要使用，只能在 createSlice() 中添加一个 `extraReducers` 对象，在里面使用类似 `createReducer()` 的方法

```js
const ADD = createAction('ADD')
const SUB = createAction('SUB')

const counterSlice = createSlice({
    name: "counter",
    initialState: 0,
    reducers: {},
    extraReducers: {
        [ADD.type]: state => state + 1,
        [SUB.type]: state => state - 1
    }
})

export default configureStore({
    reducer: counterSlice.reducer
})
```

注意： 这样在 reducers 中就不能再定义 ADD， SUB 两个 action 了



## "mutating" helper 函数

在 Redux Toolkit 中，`createReducer` 和 `createSlice` 都提供了“mutating" helper 函数来处理 reducer 中的状态更新操作。

这些“mutating" helper 函数是基于 Immer 库实现的，它允许我们直接修改 state，而不用手动地创建新的 state。这样，我们可以更轻松地编写 reducer，并且减少了因手动进行深拷贝而导致的性能问题。

例如

在 `createReducer` 中，这些 helper 函数是作为参数传递给 reducer 函数的，用于执行针对特定 actions 的 state 更新操作。`createReducer` 的使用方式可以参考以下示例：

```js
import { createReducer } from '@reduxjs/toolkit';

const initialState = { count: 0 };

const counterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('increment', (state, action) => {
      state.count += action.payload;
    })
    .addCase('decrement', (state, action) => {
      state.count -= action.payload;
    });
});

export default counterReducer;
```

在上面的代码中，我们使用 `builder.addCase()` 方法来添加针对不同 action 的 state 更新操作。这些更新操作直接在 state 上进行，而不需要手动深拷贝或创建新的 state。

与此类似，`createSlice` 也提供了一系列“mutating" helper 函数，用于自动生成 reducer 以及对应的 action creators。`createSlice` 的使用方式可以参考以下示例：

```js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { count: 0 },
  reducers: {
    increment: (state, action) => {
      state.count += action.payload;
    },
    decrement: (state, action) => {
      state.count -= action.payload;
    }
  }
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
```

在上面的代码中，我们直接使用 reducer 函数中的 state 参数进行状态更新，而不需要手动深拷贝或创建新的 state。同时，`createSlice` 自动生成了针对每个 action 的 action creator，使得我们可以更方便地派发 action。

> 需要注意的是：使用 reducer 函数中的 state 参数直接进行状态更新时，确实需要保证 state 是一个普通 JavaScript 对象。这是因为，Redux Toolkit 的 reducer 函数采用了 Immer 库进行实现，Immer 库只能处理普通 JavaScript 对象，而不能处理 JavaScript 原始类型或其他对象类型。

如果我们尝试在 reducer 函数中直接修改 state 参数时，而 state 不是普通 JavaScript 对象，那么很可能会导致运行时错误。例如：

```js
function counterReducer(state = 0, action) {
  switch (action.type) {
    case 'increment':
      // 错误：state 不是普通 JavaScript 对象
      state += action.payload;
      return state;
    default:
      return state;
  }
}
```



总的来说，“mutating" helper 函数使得我们可以更轻松地进行状态更新操作，并且可以减少因手动进行深拷贝而导致的性能问题。



## createAsyncThunk

一个函数，其接受一个 Redux action type 字符串和一个应当返回 promise 对象的回调函数。根据传入的 action type 的前缀，它会生成关于 promise 生命周期的 action types，并且返回一个会运行 promise 回调函数、且根据返回的 promise 派发生命周期 actions 的 thunk action creator。

你应当编写你自己的 reducer 逻辑来处理这些 actions，不管是用何种适合你应用的加载状态和处理逻辑。



例如，`'users/requestStatus'` 的 `type` 参数会生成如下的 action types：

- `pending`: `'users/requestStatus/pending'`
- `fulfilled`: `'users/requestStatus/fulfilled'`
- `rejected`: `'users/requestStatus/rejected'`

返回值

在使用 `createAsyncThunk` 函数创建异步 action 时，每个状态的 action 的格式都是固定的。这是因为在 Redux Toolkit 中，`createAsyncThunk` 函数内部已经定义了这些 action 的格式，并按照以下方式命名：

- `pending`（进行中）：返回一个带有 `type` 字段和 `meta` 字段的对象，其中 `type` 的值为 `${prefix}/pending`，`meta` 字段包含了 `arg`、`requestId` 和 `thunk` 等信息。
- `fulfilled`（成功）：返回一个带有 `type` 字段和 `payload` 字段的对象，其中 `type` 的值为 `${prefix}/fulfilled`，`payload` 字段包含了异步操作返回的结果。
- `rejected`（失败）：返回一个带有 `type` 字段和 `error` 字段的对象，其中 `type` 的值为 `${prefix}/rejected`，`error` 字段包含了异步操作执行过程中抛出的错误信息。

以上的 `prefix` 是您在调用 `createAsyncThunk` 函数时指定的字符串参数，用于作为这个异步 action 的名称的前缀。

在 `extraReducers` 中监听这些 action 时，您可以通过访问其包含的 `payload` 或 `error` 字段来获取异步操作的返回结果或错误信息。



在这个payload creator中，文档建议使用try/catch形式配合async/await来编写异步逻辑。
注意下面的代码片段中的fetchPost，他就是一个使用了createAsyncThunk编写的thunk函数

```dart
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.data
})
```

当dispatch(fecthPost)的时候，fetchPost这个thunk会先dispatch 一个 类型为"posts/fetchPosts/pending" 的 action，
类似的，如果thunk内部的promise成功返回一个数据，一个 类型为"posts/fetchPosts/fulfilled"的action就会被dispatch，注意，这个action内部肯定还有promise返回的数据作为payload

而对thunk，他对应的action 的"type"是thunk的第一个参数+三种状态，这些action对应的reducer要通过extraReducers 编写，extraReducers编写范式十分明确，我把模板实例复制在下面：

```typescript
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(incrementAsync.fulfilled, (state: any, action: any) => {
        state.status = "idle";
        state.value += action.payload;
      })
      .addCase(incrementAsync.rejected, (state: any) => {
        state.status = "failed";
      });
```



注意下方的addCase，既可以接受action type ，也可以接受action creator。（还可以接受createAsyncThunk 生成的thunk.xxx）

```javascript
import { increment } from '../features/counter/counterSlice'

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // slice-specific reducers here
  },
  extraReducers: builder => {
    builder
      .addCase('counter/decrement', (state, action) => {})
      .addCase(increment, (state, action) => {})
  }
})
```







```react
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userAPI } from './userAPI'

// 首先, 创建 thunk
const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async (userId, thunkAPI) => {
    const response = await userAPI.fetchById(userId)
    return response.data
  }
)

// 接着, 在你的 reducers 中处理这些 actions:
const usersSlice = createSlice({
  name: 'users',
  initialState: { entities: [], loading: 'idle' },
  reducers: {
    // 标准 reducer 逻辑, 带有每个 reducer 自动生成的 action types
  },
  extraReducers: {
    // 在这里添加处理额外 action types 的 reducers, 并且如果有需要的话，也在此处理加载状态
    [fetchUserById.fulfilled]: (state, action) => {
      // 把用户添加到 state 数组中
      state.entities.push(action.payload)
    }
  }
})

// 稍后, 在应用中需要用到的地方派发这个 thunk
dispatch(fetchUserById(123))
```











## createEntityAdapter

生成一组可重用的 reducers 和 selectors，以管理存储中的规范化数据

这些 reducer 函数可以作为 case reducers 传入 `createReducer` 和 `createSlice`。它们也可以被用作在 `createReducer` 和 `createSlice` 中的 “mutating" helper 函数。

createEntityAdapter是一个用于简化Redux中实体管理的工具，可以帮助开发者快速创建包含CRUD操作的reducer和selectors。



## createSelector



具体来说，`createSelector` 可以接收一个或多个 selector 函数作为参数，并返回一个新的选择器函数。这个新函数可以缓存上一次调用时的结果，并根据输入参数是否发生变化来决定是否重新计算结果。这样可以避免重复计算，提高了应用的性能。



```js
import { createSelector } from 'reselect';

// 定义两个选择器函数
const getBooks = (state) => state.books;
const getFilter = (state) => state.filter;

// 创建一个 Memoized Selector（缓存选择器）
export const getFilteredBooks = createSelector(
  [getBooks, getFilter],
  (books, filter) => {
    // 根据过滤条件过滤书籍列表
    return books.filter((book) => book.title.toLowerCase().includes(filter.toLowerCase()));
  }
);
```

在上面的代码中，我们首先定义了两个选择器函数 `getBooks` 和 `getFilter`，它们分别获取 Redux Store 中的 `books` 和 `filter` 数据。

接着，我们使用 `createSelector` 函数创建了一个 Memoized Selector（缓存选择器） `getFilteredBooks`，它接收两个参数 `getBooks` 和 `getFilter`，并返回一个新函数，这个新函数可以根据输入参数 `books` 和 `filter` 的变化来决定是否重新计算结果。

每个选择器函数返回值的顺序与它们作为参数出现的顺序是一一对应的，这就是为什么最后一个函数的参数按照之前选择器定义的顺序进行排列的。同时会自动传入完整的 `state` 参数到每个选择器函数中



## Redux如何实现state变化触发页面渲染？





React Context提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法，这样我们就不需要通过层层的props传递实现通信，这大大降低了我们的代码复杂度，同时也带来了新的问题

1. 组件变得很难复用
2. Context 对象 提供的Provider组件允许消费组件订阅 context 的变化，一旦变化它内部的所有消费组件都会重新渲染，会产生性能问题。



我们知道 [Redux](https://juejin.cn/post/6844904153525780493) 是一个单一的状态机，它只关注state的变化，至于视图层怎么变化，关键在于React-redux。

```javascript
import {createStore} from 'redux'
import reducer from './reducer'
import {Provider} from 'react-redux'

let store = createStore(todoApp);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

function App() {
  return (
    <>
      <WrapChildFunc />
      <WrapChildClass />
    </>
  )
}
复制代码
```

如上代码，react-redux提供了Provider组件，接收一个store对象（redux的store对象），重点源码如下



```javascript
function Provider({ store, context, children }) {
  const contextValue = useMemo(() => {
    const subscription = new Subscription(store)
    subscription.onStateChange = subscription.notifyNestedSubs
    return {
      store,
      subscription
    }
  }, [store])

  const previousState = useMemo(() => store.getState(), [store])

  useEffect(() => {
    const { subscription } = contextValue
    subscription.trySubscribe()

    if (previousState !== store.getState()) {
      subscription.notifyNestedSubs()
    }
    return () => {
      subscription.tryUnsubscribe()
      subscription.onStateChange = null
    }
  }, [contextValue, previousState])

  const Context = context || ReactReduxContext

  return <Context.Provider value={contextValue}>
          {children}</Context.Provider>        // 渲染子级元素，使整个应用成为Provider的子组件          
}
复制代码
```

其实Provider主要做了两件事：

1. 在原应用组件上包裹一层，使整个应用成为Provider的子组件
2. 接收redux的store作为props，通过Context对象传递给所包含的消费组件 还是利用Context对象与其他组件共享数据



### Class 组件

```react
class ChildClass extends React.Component {
    constructor(props) {
        super(props)
        console.log('class', this.props, this.props.children)
    }
    render() {
        const {ClassNum, addClick, reduceClick} = this.props
        return (
            <>
                <div className="App">{ClassNum}</div>
                <div>Class组件</div>
                <button onClick={addClick}>+</button>
                <button onClick={reduceClick}>-</button>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        ClassNum: state.ClassNum
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addClick: () => {
            dispatch({type: 'CLASS_ADD'})
        },
        reduceClick: () => {
            dispatch({type: 'CLASS_REDUCE'})
        }
    }
}

// 使用connect容器组件包裹ChildClass UI组件
export const WrapChildClass = connect(mapStateToProps, mapDispatchToProps)(ChildClass)

```

connect模块就是一个高阶组件，主要作用是：

1. connect通过context获取Provider中的store，通过store.getState()获取state tree
2. connect模块返回函数wrapWithComponent
3. wrapWithConnect返回一个ReactComponent对象 Connect，Connect重新render外部传入的原组件WrappedComponent（UI组件），并把connect中传入的mapStateToProps, mapDispatchToProps与组件上原有的props合并后，通过属性的方式传给WrappedComponent 具体代码比较复杂，大家感兴趣的可以看一下源码



### Function 组件

我们主要分析下Hooks写法

```javascript
export default function Child () {
    // 获取redux中state树中指定的值
    const {FuncNum} = useSelector((state: stateType) => {
        console.log('Func', state)
        return {
            FuncNum: state.FuncNum
        }
    })
    // 饮用store中的dispatch 方法
    const dispth = useDispatch()

    const addClick = useCallback(
        () => dispth({type: 'FUNC_ADD'}),
        [FuncNum],
    )

    const reduceClick = useCallback(
        () => dispth({type: 'FUNC_REDUCE'}),
        [FuncNum],
    )
    
    return useMemo(() => (
        <div>
            <div className="App">{FuncNum}</div>
            {Math.random()}
            <div>Func组件</div>
            <button onClick={addClick}>+</button>
            <button onClick={reduceClick}>-</button>
        </div>
    ), [FuncNum])
}
复制代码
```

可以看到，我们通过useSelector获取store中state对象对应的数据，再通过useDispatch方法获取到dispatch的引用

##### useDispatch

```javascript
export function createDispatchHook(context = ReactReduxContext) {
  const useStore =
    context === ReactReduxContext ? useDefaultStore : createStoreHook(context)

  return function useDispatch() {
    const store = useStore()
    return store.dispatch
  }
}
复制代码
```

可以看到useDispatch只返回了dispatch的引用，并没有做其他的事情，那么我们dispatch(Action)后，state变化，react是怎么知道需要更新视图的？关键就在于useSelector

##### useSelector

```scss
function useSelectorWithStoreAndSubscription(
  selector,
  equalityFn,
  store,
  contextSub
) {
  // 强制渲染 reducer: s => s+1,  state 初始值: 0； forceRender ===> dispatch
  const [, forceRender] = useReducer(s => s + 1, 0)

  // 创建订阅函数
  const subscription = useMemo(() => new Subscription(store, contextSub), [    store,    contextSub  ])

  const latestSubscriptionCallbackError = useRef()
  // select函数
  const latestSelector = useRef()
  // store中的state
  const latestStoreState = useRef()
  // select函数返回state
  const latestSelectedState = useRef()

  const storeState = store.getState()
  let selectedState

  try {
    if (
      selector !== latestSelector.current ||
      storeState !== latestStoreState.current ||
      latestSubscriptionCallbackError.current
    ) {
      // useSelector 选择的state
      selectedState = selector(storeState)
    } else {
      selectedState = latestSelectedState.current
    }
  } catch (err) {
    ...
  }

  // effect hook
  useIsomorphicLayoutEffect(() => {
    latestSelector.current = selector
    latestStoreState.current = storeState
    latestSelectedState.current = selectedState
    latestSubscriptionCallbackError.current = undefined
  })

  // effect hook
  useIsomorphicLayoutEffect(() => {
    function checkForUpdates() {
      try {
        const newSelectedState = latestSelector.current(store.getState())

        // 判断前后选择的state是否相等
       if (equalityFn(newSelectedState, latestSelectedState.current)) {
          return
        }

        latestSelectedState.current = newSelectedState
      } catch (err) {
        latestSubscriptionCallbackError.current = err
      }

      forceRender()
    }

    // stateChange的回调
    subscription.onStateChange = checkForUpdates
    subscription.trySubscribe()

    checkForUpdates()

    return () => subscription.tryUnsubscribe()
  }, [store, subscription])

  return selectedState
}


export function createSelectorHook(context = ReactReduxContext) {
  const useReduxContext =
    context === ReactReduxContext
      ? useDefaultReduxContext
      : () => useContext(context)
  return function useSelector(selector, equalityFn = refEquality) {
    const { store, subscription: contextSub } = useReduxContext()

    const selectedState = useSelectorWithStoreAndSubscription(
      selector,
      equalityFn,
      store,
      contextSub
    )
    return selectedState
  }
}
复制代码
```

- 关键方法： const [, forceRender] = useReducer(s => s + 1, 0)： 利用useReducer定义了一个计数器，用于强制渲染此组件

  checkForUpdates：store变化后订阅函数触发的处理逻辑

- 关键流程：初始化

  1. 利用useSelector传入的selector函数获取Redux中store对应的值
  2. 定义一个latestSelectedState，用于保存上一次selector返回的值
  3. 定义state变化的处理函数checkForUpdates
  4. 利用store.subscribe订阅一次redux的store，当下次store变化后，触发订阅函数执行checkForUpdates

- 关键流程：更新

  1. 当用户dispacth触发了store变化后，订阅函数执行checkForUpdates
  2. 通过store.getState()获取最新的state值，通过equalityFn函数比较newSelectedState和latestSelectedState，如果有变化就执行forceRender，触发react创建update对象，强制渲染；

Redux 之所以能够实现自动更新视图，是因为 Redux 的工作流程遵循了单向数据流的原则。Redux 中的数据流从 store 出发一路经过 reducer，并最终到达 React 组件，React 组件会根据 props 中的数据展示视图。

当 Redux store 中的数据发生改变时，Redux 会通过调用 reducer 函数生成新的 state，并将新的 state 存储在 store 中。此时，Redux 会检查 React 组件中使用了哪些 state，然后将这些 state 作为 props 传递给相关的组件。最后，React 组件会根据新的 props 进行渲染，从而实现了视图的自动更新。

需要注意的是，为了让视图能够自动更新，需要使用 React Redux 库来将 Redux store 中的 state 与 React 组件相连接。React Redux 主要提供了以下两个 API：

1. connect()：将 Redux store 中的 state 映射到 React 组件的 props 上，从而使得组件能够访问到 state 并进行展示。
2. useSelector()：使用 React Hooks 来访问 Redux store 中的 state。



# React-Redux

## React-Redux

React-Redux 将所有组件分成两大类：UI 组件和容器组件。



**UI组件**

UI 组件有以下几个特征。

- 只负责 UI 的呈现，不带有任何业务逻辑
- 没有状态（即不使用 state）
- 所有数据都由参数 props 提供
- 不使用任何 React-Redux 的 API



**容器组件**

- 负责管理数据和业务逻辑，不负责 UI 的呈现
- 带有内部状态
- 使用 React-Redux 的 API

React-Redux 规定，所有的 UI 组件都由用户提供，容器组件则是由 React-Redux 自动生成。也就是说，用户负责视觉层，状态管理则是全部交给它。



### connect()

connect 方法用于从 UI 组件中生成容器组件：

```
import { connect } from 'react-redux'
const ContainerBox = connect()(Box)
```

上面的代码中，Box 是 UI 组件，connect 方法得到的 ContainerBox 就是对应的容器组件。

但是由于这个容器组件没有定义业务逻辑，上面这个容器组件毫无意义，只是 UI 组件的一个简单的包装层而已。

如果需要定义业务逻辑，需要有下面两个信息：

1. 输入逻辑：外部的数据（即容器组件的 State），如何传递至内部（即 UI 组件的 props 属性）。
2. 输出逻辑：用户放出的动作（即 UI 组件的属性）如何变为 Action 对象， 从 UI 组件中传递出去。

结合上面这两点，可以将 connect 方法的完整 API 归结如下：

```react
import { connect } from 'react-redux'
const ContainerBox = connect(
	mapStateToProps,
    mapPropsToAction
)(Box)
```

### mapStateToProps()

mapStateToProps 方法用于将容器组件的 state 映射到 UI 组件的 props。因此，该方法应该返回一个对象，里面的每一个键值对都是一个映射。

如下面的例子：

```react
function mapStateToProps (state) {
    return { count: state }
}
```



mapStateToProps 会订阅 Store，每当 State 更新时，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。

mapStateToProps 第一个对象是 state，可以接收第二个参数代表容器组件的 props 对象。

connect 方法可以省略 mapStateToProps 参数，如果这样，UI 组件将不会订阅 Store，即 Store 的更新不会引起 UI 组件的重新渲染。

### mapPropsToAction()

mapPropsToAction 是 connect 函数的第二个参数，用来建立 UI 组件的参数到 store.dispatch 方法的映射。也就是说，它定义了哪些用户的操作应该当作 Action，传给 Store。它可以是一个函数，也可以是一个对象。

```react
function mapDispatchToProps (dispatch) {
    return {
        jia: (data) => {
            dispatch(addAction(data))
        }
    }
}
```







## HOOKS

### useSelector

`const result: any = useSelector(selector: Function, equalityFn?: Function)`

允许你使用一个 selector 函数从 Redux store state 中提取数据。



selector 将以整个 Redux store state 作为唯一的参数被调用。每当函数组件渲染时，selector 就会被运行（除非在组件的前一次渲染后引用没有改变，这样 hooks 就会返回缓存的结果，而不是重新运行 selector）。`useSelector()` 也会订阅 Redux store，每当有 action 被 dispatched 时就会运行 selector。



- selector 返回的结果可以是任何值，而不仅仅是一个对象。selector 的返回值将被作为 `useSelector()` hook 的返回值被使用。

- 当 dispatch 一个 action 时，`useSelector()` 将对 selector 的前一个结果值和当前的结果值做一个引用比较。如果它们不同，该组件将被强制重新渲染。如果它们相同，组件将不会重新渲染。

* `useSelector()` 默认使用严格的 `===` 引用全等检查，而不是浅层全等比较





### useDispatch()



这个 hook 返回一个对 Redux store 中的 `dispatch` 函数的引用。你可以按需使用它来 dispatch action。

```react
import React from 'react'
import { useDispatch } from 'react-redux'

export const CounterComponent = ({ value }) => {
  const dispatch = useDispatch()

  return (
    <div>
      <span>{value}</span>
      <button onClick={() => dispatch({ type: 'increment-counter' })}>
        Increment counter
      </button>
    </div>
  )
}
```



### useStore()

```js
const store = useStore()
```



这个 hook 返回一个 Redux store 引用，该 store 与传递给 `<Provider>` 组件的 store 相同。

不应该频繁使用这个 hook。宁愿将 `useSelector()` 作为主要选择。然而，对于少量需要访问 store 的场景而言，例如替换 reducer，这个 hook 很有用。









