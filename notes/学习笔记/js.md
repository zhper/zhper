---
title: "JavaScipt"
date: "2022-10-16"
image: getting-started-nextjs.png
excerpt: JavaScript 的笔记
isFeatured: true
slug: javascript
category: ['js', 'bagu']
---


# 数据类型

# 数据类型

## 原始数据类型（简单数据类型）

`Undefined`、`Null`、`Bollean`、`Number`、`String`、`Symbol`、`BigInt`

## 引用类型（复杂数据类型）

`Object` 

其中 `Symbol`和 `BigInt` 是ES6 新增的数据类型

* `Symbol` 

每个从 `Symbol()` 返回的 symbol 值都是唯一的。一个 symbol 值能作为对象属性的标识符；这是该数据类型仅有的目的。

```js
var sym1 = Symbol();
var sym2 = Symbol('foo');
var sym3 = Symbol('foo');
Symbol("foo") === Symbol("foo"); // false
sym2 === sym3 //false
```

* `BigInt`

表示大于 `2^53-1` 的整数，这是在 js 中 `Number` 可以表示的最大数字

可以在一个整数字面量后面加上`n`的方式定义一个 `BigInt` ： `10n`， 也可以直接使用`BigInt()` 包裹一个数字或者字符串

```js
const theBiggestInt = 9007199254740991n;

const alsoHuge = BigInt(9007199254740991);
// ↪ 9007199254740991n

const hugeString = BigInt("9007199254740991");
// ↪ 9007199254740991n

const hugeHex = BigInt("0x1fffffffffffff");
// ↪ 9007199254740991n

const hugeBin = BigInt("0b11111111111111111111111111111111111111111111111111111");
// ↪ 9007199254740991n
```



## 赋值变动过程

* 值类型

```js
let a = 100;
let b = a;
a = 200;
console.log(b); // 100
```

![图片 1.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/55df6cb63d3346be9ec1f572a1514853~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

值类型的数据直接存储在 `栈(stack)` 中， 数据简单，空间小，大小固定

* 引用类型

```js
let a = { age: 20 };
let b = a;
b.age = 30;
console.log(a.age); // 30
```

![图片 2.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/56c5c43d1c584ed4b8e4cce8855bab52~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

引用类型的数据存储在 `堆（heap）` 中， 数据复杂，空间大、大小不固定



## JS 中的包装类型

在 js 中，基本类型是没有属性和方法得到，但是为了便于操作基本类型的值，在调用基本类型的属性或方式时， js 会在后台隐式地将基本类型的值转换为对象

```js
const a = "abc";
a.length; // 3
a.toUpperCase(); // "ABC"
```

在访问`'abc'.length`时，JavaScript 将`'abc'`在后台转换成`String('abc')`，然后再访问其`length`属性。

JavaScript也可以使用`Object`函数显式地将基本类型转换为包装类型：

```javascript
var a = 'abc'
Object(a) // String {"abc"}
复制代码
```

也可以使用`valueOf`方法将包装类型倒转成基本类型：

```javascript
var a = 'abc'
var b = Object(a)
var c = b.valueOf() // 'abc'
```

但是注意类似于如下代码

```js
var a = new Boolean( false );
if (!a) {
	console.log( "Oops" ); // never runs
}
```

代码并不会打印什么，因为虽然包裹的基本类型是`false`，但是`false`被包裹成包装类型后就成了对象，所以其非值为`false`，所以条件体中的内容不会运行。



# let-var-const

**1）块级作用域：** 块作用域由 `{ }`包括，let和const具有块级作用域，var不存在块级作用域。块级作用域解决了ES5中的两个问题：

- 内层变量可能覆盖外层变量
- 用来计数的循环变量泄露为全局变量

**（2）变量提升：** var存在变量提升，let和const不存在变量提升，即在变量只能在声明之后使用，否在会报错。

**（3）给全局添加属性：** 浏览器的全局对象是window，Node的全局对象是global。var声明的变量为全局变量，并且会将该变量添加为全局对象的属性，但是let和const不会。

**（4）重复声明：** var声明变量时，可以重复声明变量，后声明的同名变量会覆盖之前声明的遍历。const和let不允许重复声明变量。

**（5）暂时性死区：** 在使用let、const命令声明变量之前，该变量都是不可用的。这在语法上，称为**暂时性死区**。使用var声明的变量不存在暂时性死区。

**（6）初始值设置：** 在变量声明时，var 和 let 可以不用设置初始值。而const声明变量必须设置初始值。

**（7）指针指向：** let和const都是ES6新增的用于创建变量的语法。 let创建的变量是可以更改指针指向（可以重新赋值）。但const声明的变量是不允许改变指针的指向。



# 检测数据类型



* **typeof** :  能判断所有 值类型、函数，但是不能直接对 **null(空对象)、对象、数组**进行判断， 都返回 `object`

```js
console.log(typeof undefined); // undefined
console.log(typeof 2); // number
console.log(typeof true); // boolean
console.log(typeof "str"); // string
console.log(typeof Symbol("foo")); // symbol
console.log(typeof 2172141653n); // bigint
console.log(typeof function () {}); // function
// 不能判别
console.log(typeof []); // object
console.log(typeof {}); // object
console.log(typeof null); // object
```



* **instanceof**:  能判断对象类型， 运行机制是判断在其 原型链 中能否找到该类型的原型, 检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

```js
class People {}
class Student extends People {}

const vortesnail = new Student();

console.log(vortesnail instanceof People); // true
console.log(vortesnail instanceof Student); // true
```



* **Object.prototype.toString.call()**: 能够判断所有的原始数据类型，同时包括 **Error对象、Date对象等**

```js
Object.prototype.toString.call(2); // "[object Number]"
Object.prototype.toString.call(""); // "[object String]"
Object.prototype.toString.call(true); // "[object Boolean]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call(Math); // "[object Math]"
Object.prototype.toString.call({}); // "[object Object]"
Object.prototype.toString.call([]); // "[object Array]"
Object.prototype.toString.call(function () {}); // "[object Function]"
```

* 检测数组类型

```js
Array.isArray(arr) //利用 Array的isArray 
arr instanceof Array // 利用instanceof
arr.__proto === Array.prototype //利用原型链，实际上 instanceof 原理也是如此
Object.prototype.toString.call(arr) //利用这个方法
arr.constructor === Array //利用构造函数,实例的构造函数属性 constructor 指向构造函数
```





# 深拷贝与浅拷贝



* 浅拷贝

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/1/16ce894a1f1b5c32~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以如果其中一个对象改变了这个地址，就会影响到另一个对象。

* 深拷贝

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/1/16ce893a54f6c13d~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且修改新对象不会影响原对象



## 手写深拷贝



### 乞丐版

```js
JSON.parse(JSON.stringify(obj));
```

### 基础版

基于浅拷贝的代码

```js
function clone(target) {
    let cloneTarget = {};
    for (const key in target) {
        cloneTarget[key] = target[key];
    }
    return cloneTarget;
};
```

我们利用递归来解决深层的对象

* 若是原始数据类型，直接返回
* 若是引用类型，我们创建一个新对象，将需要克隆的对象的属性递归到这个新对象上

```js
function clone(target) {
    if (typeof target === 'object') {
        let cloneTarget = {}
        for (const key in target) {
            cloneTarget[key] = clone(target[key])
        }
        return cloneTarget
    } else {
        return target
    }
}
```

对于只存在对基本数据类型，这个就够了，但是并没有考虑数组

```js
function clone(target) {
    if (typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {}
        for (const key in target) {
            cloneTarget[key] = clone(target[key])
        }
        return cloneTarget
    } else {
        return target
    }
}
```

### 循环引用



如果我们有下面这种例子

```js
const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8]
};
target.target = target;
```

此时`target`内部：

```js
{
  field1: 1,
  field2: undefined,
  field3: { child: 'child' },
  field4: [ 2, 4, 8 ],
  target: [Circular *1]
}
```

![image-20230212110721837](C:\Users\zzzzp\AppData\Roaming\Typora\typora-user-images\image-20230212110721837.png)

如果这时候我们调用上面的拷贝函数，会得到如下结果

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/1/16ce894778498ae4~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

因为在其内部无限递归，导致栈溢出

我们使用一组 Map 来存储当前对象和拷贝对象的对应关系，当需要拷贝当前对象时，我们首先去 Map 中找

- 检查`map`中有无克隆过的对象
- 有 - 直接返回
- 没有 - 将当前对象作为`key`，克隆对象作为`value`进行存储
- 继续克隆

```js
function clone(target, map = new Map()) {
    if (typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {};
        if (map.get(target)) {
            return map.get(target);
        }
        map.set(target, cloneTarget);
        for (const key in target) {
            cloneTarget[key] = clone(target[key], map);
        }
        return cloneTarget;
    } else {
        return target;
    }
};
```

在代码中需要注意的是，我们将 target 和 cloneTarget 通过链接， 下面对 cloneTarget 的改变是会同步更新的，因为这里也相当于将他们的地址进行链接

**最后 cloneTarget 的 target 属性也会指向 cloneTarget 的地址，造成循环引用**

对于上面的输出，我们会有下面的过程

![image-20230212110910532](C:\Users\zzzzp\AppData\Roaming\Typora\typora-user-images\image-20230212110910532.png)



# 根据 0.1+0.2 ! == 0.3，讲讲 IEEE 754 ，如何让其相等？

## IEEE 754

JavaScript 的数字是 IEEE-754 标准存储的双精度浮点数类型。双精度浮点数总共有 64 位（bit），第一位用于表示符号，接着十一位用于表示阶码，剩余的五十二位用于表示尾数。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/453cabd88adc477a9f6548fca7e35268~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e446a5d6d9784281b1dfd43096510c7f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

同时， 在阶码运算时需要在二进制运算的基础上，手动减去 1023 才是真正表达的值。

```js
01111111111 // 0
10000000000 // 1
11111111110 // 1023
00000000000 // -1023
```

## 原因

* **进制转换**:  在将 0.1、0.2 转换为二进制时，他们的尾数是无限循环的， 但是最多只能存储 53位有效数字（包括默认的1）， 所以会造成进度的损失
* **对阶运算**:  由于指数位数的不对，运算时阶数小的需要根据阶差右移，相加后根据 0舍1入， 尾数位移时可能会发生数丢失的情况，影响精度。



## 解决

1. 转换为整数运算
2. 使用 `Number.EPSILON` 误差范围

```js
function isEqual(a, b) {
  return Math.abs(a - b) < Number.EPSILON;
}

console.log(isEqual(0.1 + 0.2, 0.3)); // true
```

`Number.EPSILON` 的实质是一个可以接受的最小误差范围，一般来说为 `Math.pow(2, -52)` 。



# 原型和原型链



* 每一个**函数**都有一个`prototype` 属性， 这个属性指向 调用该构造函数而创建的**实例**的原型
* 每一个 JavaScript 对象（null 除外），在创建的时候就会与之关联另一个对象，这个对象就是原型，每一个对象都会从原型"继承"属性

![构造函数和实例原型的关系图](https://camo.githubusercontent.com/02789d6806b75d34b2017021f58efa3aa7a2ee6be8a0c05fb3293438884b9ec0/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6d717971696e6766656e672f426c6f672f496d616765732f70726f746f74797065312e706e67)

* 每一个 JavaScript对象（null）除外，都具有一个 `__proto__` 属性，这个属性指向该对象的原型

![实例与实例原型的关系图](https://camo.githubusercontent.com/3dde335faa15d03ffe3b907f6e5c2b5f4d2183caa4c47ac7486794bc407f663c/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6d717971696e6766656e672f426c6f672f496d616765732f70726f746f74797065322e706e67)

* 每一个原型都有一个 `constructor` 属性，指向与之相关联的构造函数

![实例原型与构造函数的关系图](https://camo.githubusercontent.com/0aaf005afda83d4e2fdd2bbe523df228b567a091317a2154181771b2706ea2ef/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6d717971696e6766656e672f426c6f672f496d616765732f70726f746f74797065332e706e67)

* 当实例读取属性，如果找不到，就会查找与对象关联的原型中的属性，如果还查不到，就查找原型的原型，直到最顶层

![原型的原型关系图](https://camo.githubusercontent.com/ad0ee0e2594c1ac471bbb42321963c130f4fe1ef9ec70389c8ced54544d3fd6c/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6d717971696e6766656e672f426c6f672f496d616765732f70726f746f74797065342e706e67)

* `Object.prototype` 的原型就是 null, 所有可以说 `Object.prototype` 没有原型

![原型链示意图](https://camo.githubusercontent.com/9a69b0f03116884e80cf566f8542cf014a4dd043fce6ce030d615040461f4e5a/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6d717971696e6766656e672f426c6f672f496d616765732f70726f746f74797065352e706e67)

* 原型链就是 由相互关联的原型组成的链状结构



## 深入

* JavaScript 分为**函数对象**和**普通对象**，每个对象都有`__proto__`属性，但是只有函数对象才有`prototype`属性

* Object、Function都是js内置的**函数**, 类似的还有我们常用到的Array、RegExp、Date、Boolean、Number、String

于是我们有下图

```js
function Foo() {}

let f1 = new Foo();
let f2 = new Foo();
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4a61ca07672a45d3aecf382100cc9719~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)



理解一下，然后自己能通过代码画出来这个，就没问题了





# 执行上下文



将下面四篇文章仔细研读

- [JavaScript 深入之执行上下文栈](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fmqyqingfeng%2FBlog%2Fissues%2F4)；
- [JavaScript 深入之变量对象](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fmqyqingfeng%2FBlog%2Fissues%2F5)；
- [JavaScript 深入之作用域链](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fmqyqingfeng%2FBlog%2Fissues%2F6)；
- [JavaScript 的 this 原理](https://link.juejin.cn?target=https%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2018%2F06%2Fjavascript-this.html)
- [JavaScript 深入之执行上下文](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fmqyqingfeng%2FBlog%2Fissues%2F8)。

总结：当 JavaScript 代码执行一段可执行代码时，会创建对应的执行上下文。对于每个执行上下文，都有三个重要属性：

* 变量对象（Variable object，VO）

* 作用域链（Scope chain）

* this

# 作用域与作用域链



* 作用域：规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。换句话说，作用域决定了代码区块中变量和其他资源的可见性。（全局作用域、函数作用域、块级作用域）

* 作用域链：从当前作用域开始一层层往上找某个变量，如果找到全局作用域还没找到，就放弃寻找 。这种层级关系就是作用域链。（由多个执行上下文的**变量对象**构成的链表就叫做作用域链，可以同时将 执行上下文 看了再仔细理解）



## 作用域

* 是指程序源代码中定义变量的区域
* 确定当前执行代码对变量的访问权限
* JavaScript 采用的是词法作用域（也就是 静态作用域）

## 静态作用域 与 动态作用域

* 静态作用域

函数的作用域在函数定义的时候就已经决定了

* 动态作用域

函数的作用域是在函数调用的时候采决定的



下面有个例子

```js
var value = 1;

function foo() {
    console.log(value);
}

function bar() {
    var value = 2;
    foo();
}

bar();

// 结果是 ???
```

结果会是 `1`

* 静态作用域的分析过程

执行 `foo` 函数，查找函数内部是否有局部变量 `value` ，如果没有，就根据**书写的位置**，查找上面一层的代码， 即 `value = 1`

* 动态作用域的分析过程

执行 `foo` 函数， 查找函数内部是否有局部变量 `value`， 如果没有， 就从调用函数的作用域， 即 `bar` 函数内部查找 `value` 变量， 即 `value = 2`



下面有个例子

```js
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope();
```

```js
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
checkscope()();
```

两者的结果都是 `local scope`





# 函数



## 函数的声明

1. 函数声明

```js
console.log(sum(10, 10)) // 20
function sum(a, b) {
    return a + b
}
```

2. 函数表达式

```js
console.log(sum(10, 10)) // Error
let sum = function(a, b) {
    return a + b
}
```

3. Function 构造函数 (几乎无人使用)， 这里不做叙述



值得注意的是： JavaScript 在任何代码执行之前，都会先读取函数声明，并在执行上下文中生成函数定义，而函数表达式需要等到代码执行到所在位置，才会在执行上下文中生成函数定义

所以上述两段代码中，第一段可以正常运行，称为**函数声明提升**



## 属性与方法



* name 属性

将返回函数的名字

```js
function f1() {}
f1.name  //f1
```

如果是通过变量赋值定义的函数， 那么 `name` 属性将返回变量名

```js
var f2 = function () {};
f2.name // "f2"
```

但是，如果变量的值是一个具名函数，而不是上面这种匿名函数， `name`属性返回`function` 关键字之后的那个函数名

```js
var f3 = function myName() {};
f3.name // 'myName'
```

如果函数没有名称，会显示为空字符串

```js
console.log(() => {}.name)
```

如果是使用 `Function` 构造函数创建的，则会标识成 `anonymous`。



如果函数是一个获取函数、设置函数，或者使用了 `bind()` 进行实例化，那么标识符会在结果前面加上一个前缀：

```js
function foo() {}
console.log(foo.bind(null).name) // bound foo

const obj = {
    years: 1,
    get year() {
        return this.years
    },
    set year(newYear) {
        this.years = newYear
    }
}

const propertyDescriptor = Object.getOwnPropertyDescriptor(obj, 'year')
console.log(propertyDescriptor.get.name) // get year
console.log(propertyDescriptor.set.name) // set year
```

* length 属性

函数的`length`属性返回函数预期传入的参数个数，即函数定义之中的参数个数。

```js
function f(a, b) {}
f.length // 2
```

上面代码定义了空函数`f`，它的`length`属性就是定义时的参数个数。不管调用时输入了多少个参数，`length`属性始终等于2。

* toString()

函数的`toString()`方法返回一个字符串，内容是函数的源码。

```js
function f() {
  a();
  b();
  c();
}

f.toString()
// function f() {
//  a();
//  b();
//  c();
// }
```

对于那些原生的函数，`toString()`方法返回`function (){[native code]}`。

```js
Math.sqrt.toString()
// "function sqrt() { [native code] }"
```

上面代码中，`Math.sqrt()`是 JavaScript 引擎提供的原生函数，`toString()`方法就返回原生代码的提示。



函数内部的注释也可以返回。

```js
function f() {/*
  这是一个
  多行注释
*/}

f.toString()
// "function f(){/*
//   这是一个
//   多行注释
// */}"
```

## 参数

如果函数定义了两个参数，但是运行时无论提供多少个参数，JavaScript 都不会报错。而省略的参数的值就变为 `undefined`。

但是没有办法只省略靠前的参数，而保留靠后的参数。如果一定要省略靠前的参数，只有显式传入 `undefined`。



* 同名参数

如果有同名的参数，则取最后出现的那个值。

```js
function f(a, a) {
  console.log(a);
}

f(1, 2) // 2
```

即使后面的`a`没有值或被省略，也是以其为准。

```js
function f(a, a) {
  console.log(a);
}

f(1) // undefined
```

调用函数`f()`的时候，没有提供第二个参数，`a`的取值就变成了`undefined`。这时，如果要获得第一个`a`的值，可以使用`arguments`对象。

```js
function f(a, a) {
  console.log(arguments[0]);
}

f(1) // 1
```



## arguments对象

`arguments`对象包含了函数运行时的所有参数，`arguments[0]`就是第一个参数，`arguments[1]`就是第二个参数，以此类推。这个对象只有在函数体内部，才可以使用。

```js
var f = function (one) {
  console.log(arguments[0]);
  console.log(arguments[1]);
  console.log(arguments[2]);
}

f(1, 2, 3)
// 1
// 2
// 3
```

正常模式下，`arguments`对象可以在运行时修改。

```js
var f = function(a, b) {
  arguments[0] = 3;
  arguments[1] = 2;
  return a + b;
}

f(1, 1) // 5
```

严格模式下，`arguments`对象与函数参数不具有联动关系。也就是说，修改`arguments`对象不会影响到实际的函数参数。

```js
var f = function(a, b) {
  'use strict'; // 开启严格模式
  arguments[0] = 3;
  arguments[1] = 2;
  return a + b;
}

f(1, 1) // 2
```

> 注意： 箭头函数不存在 arguments 对象



* 与数组的关系

需要注意的是，虽然`arguments`很像数组，但它是一个对象。数组专有的方法（比如`slice`和`forEach`），不能在`arguments`对象上直接使用。

如果要让`arguments`对象使用数组方法，真正的解决方法是将`arguments`转为真正的数组。下面是两种常用的转换方法：`slice`方法和逐一填入新数组。

```js
var args = Array.prototype.slice.call(arguments);

// 或者
var args = [];
for (var i = 0; i < arguments.length; i++) {
  args.push(arguments[i]);
}
```



* callee 属性

`arguments`对象带有一个`callee`属性，返回它所对应的原函数。

```js
var f = function () {
  console.log(arguments.callee === f);
}

f() // true
```

## 默认参数

ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面

```js
function log(x, y = 'World') {
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello
```

参数变量是默认声明的，所以不能用`let`或`const`再次声明。

```js
function foo(x = 5) {
  let x = 1; // error
  const x = 2; // error
}
```

使用参数默认值时，函数不能有同名参数。

```js
// 不报错
function foo(x, x, y) {
  // ...
}

// 报错
function foo(x, x, y = 1) {
  // ...
}
// SyntaxError: Duplicate parameter name not allowed in this context
```

参数默认值不是传值的，而是每次都重新计算默认值表达式的值。

```js
let x = 99;
function foo(p = x + 1) {
  console.log(p);
}

foo() // 100

x = 100;
foo() // 101
```

* 参数默认值的位置

通常情况下，定义了默认值的参数，应该是函数的尾参数。因为这样比较容易看出来，到底省略了哪些参数。如果非尾部的参数设置默认值，实际上这个参数是没法省略的。

```js
// 例一
function f(x = 1, y) {
  return [x, y];
}

f() // [1, undefined]
f(2) // [2, undefined]
f(, 1) // 报错
f(undefined, 1) // [1, 1]

// 例二
function f(x, y = 5, z) {
  return [x, y, z];
}

f() // [undefined, 5, undefined]
f(1) // [1, 5, undefined]
f(1, ,2) // 报错
f(1, undefined, 2) // [1, 5, 2]
```

上面代码中，有默认值的参数都不是尾参数。这时，无法只省略该参数，而不省略它后面的参数，除非显式输入`undefined`。



## reset 参数

ES6 引入 rest 参数（形式为`...变量名`），用于获取函数的多余参数，这样就不需要使用`arguments`对象了。reset 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

```js
function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3) // 10
```

实际上 reset 参数也是用了 扩展运算符



## 函数内部



### this

* 在标准函数中，this 引用的是**把函数当作方法调用的上下文对象** （可变的）
* 在箭头函数中，this 引用的是**定义箭头函数的上下文** （固定的）

以下是一些常见情况下 `this` 的指向：

- 全局作用域中的 `this` 指向全局对象，在浏览器中为 `window` 对象。

- 函数作为普通函数调用时，其中的 `this` 指向全局对象，在浏览器中为 `window` 对象。例如：

  ```js
  function someFunction() {
    console.log(this);
  }
  someFunction(); // 输出 window 对象
  ```

- 定时器中的 `this` 指向全局对象，在浏览器中为 `window` 对象。例如：

  ```js
  setTimeout(function() {
    console.log(this);
  }, 1000); // 输出 window 对象
  ```

- 方法中的 `this` 指向调用该方法的对象。例如：

  ```js
  const obj = {
    someMethod: function() {
      console.log(this);
    }
  };
  obj.someMethod(); // 输出 obj 对象
  ```

- 构造函数中的 `this` 指向构造函数创建的实例。例如：

  ```js
  javascript复制代码function Person(name, age) {
    this.name = name;
    this.age = age;
    console.log(this);
  }
  const person = new Person('Alice', 20); // 输出 Person 对象
  ```

- 箭头函数中没有绑定 `this`，其 `this` 的值取决于最近外层作用域中有定义的 `this`。例如：

  ```js
  javascript复制代码const obj = {
    someMethod: function() {
      const arrowFn = () => {
        console.log(this);
      };
      arrowFn();
    }
  };
  obj.someMethod(); // 输出 obj 对象
  ```

- 使用 `call()`、`apply()` 或 `bind()` 方法可以显式地改变函数中 `this` 的指向。例如：

  ```js
  javascript复制代码function someFunction() {
    console.log(this);
  }
  const context = { name: 'Alice' };
  someFunction.call(context); // 输出 context 对象
  someFunction.apply(context); // 输出 context 对象
  const boundFn = someFunction.bind(context);
  boundFn(); // 输出 context 对象
  ```

### caller

* 函数的 caller 属性引用的是调用当前函数的函数，如果是在全局作用域中调用，则该属性为 null。

```js
function A() {
    B()
}

function B() {
    console.log(B.caller)
}

A()

// ƒ A() {
//     B()
// }
```

### new.target

* 当函数如果是**作为构造函数调用**，那么在该函数中的 new.target 指向该构造函数；如果函数没有使用 new 关键字，那么 new.target 的值变为 undefined。我们可以使用该值来判断函数是否作为构造函数调用：

```js
function People() {
    if (!new.target) {
        throw 'People must be instantiated using "new"'
    } else {
        console.log('People instantiated using "new"')
    }
}
```





## 闭包

参考博客： [JavaScript 深入之闭包](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fmqyqingfeng%2FBlog%2Fissues%2F9)

```js
function sum(a, b) {
	let x = 2;
}
console.log(x)  //error
我们无法获得函数内部的局部变量
```

但我们可以通过在函数内部定义一个函数

```js
function sum(a, b) {
	let x = 2;
    return function c () {
        console.log(x)
    }
}
let z = sum(1,2)
console.log(z()) //2
```

闭包就是上面的`c` 函数, 闭包就是将函数内部和函数外部连接起来的一座桥梁。



MDN 对闭包的定义为：

> 闭包是指那些能够访问自由变量的函数

那什么是自由变量呢？

> 自由变量是指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量。

由此，我们可以看出闭包共有两部分组成：

> 闭包 = 函数 + 函数能够访问的自由变量

也可以简单理解为 定义在函数内部的函数

ECMAScript中，闭包指的是：

1. 从理论角度：所有的函数。因为它们都在创建的时候就将上层上下文的数据保存起来了。哪怕是简单的全局变量也是如此，因为函数中访问全局变量就相当于是在访问自由变量，这个时候使用最外层的作用域。
2. 从实践角度：以下函数才算是闭包：
   1. 即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）
   2. 在代码中引用了自由变量

在某个内部函数的执行上下文创建时，会将父级函数的**活动对象**加到内部函数的 `[[scope]]` 中，形成作用域链，所以即使父级函数的执行上下文销毁（即执行上下文栈弹出父级函数的执行上下文），但是因为其**活动对象**还是实际存储在内存中可被内部函数访问到的，从而实现了闭包。



## call、apply、bind 手写



* call

> **`call()`** 方法使用一个指定的 `this` 值和单独给出的一个或多个参数来调用一个函数。

```js
function.call(thisArg, arg1, arg2, ...)
```

* 如果我们使用call 并指定了第一个参数，那么 this 将会绑定到该对象上
* 如果没指定，那么 this 将会绑定为全局对象，在严格模式下，this的值将会是 undefined

* 手写

```js
Function.proptotype.mycall(context) {
    if (typeof this !== 'function') {
        thorw new Error('Type error')
    }
    context = context || window //如果没传入，就让他指向window
    let args = [...arguments].slice(1)
    // 将被调用的方法设置为 context 的属性
  	// this 即为我们要调用的方法
    context.fn = this
    let result = constext.fn(...args)
    delete context.fn
    return result
}
```





* apply 

> `apply()` 方法调用一个具有给定 `this` 值的函数，以及以一个数组（或一个[类数组对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections#working_with_array-like_objects)）的形式提供的参数。

```js
apply(thisArg)
apply(thisArg, argsArray)
```



**备注：** 该方法的语法和作用与 `call()`方法类似，只有一个区别，就是 `call()` 方法接受的是**一个参数列表**，而 `apply()` 方法接受的是**一个包含多个参数的数组**。

* 手写

```js
Function.proptotype.myApply(context) {
    if (typeof this !== 'function') {
        thorw new Error('Type error')
    }
    context = context || window //如果没传入，就让他指向window
    context.fn = this
    let result = null
    //这里判断下是否传入了参数数组
    if (arguments[1]) {
        result = context.fn(...arguments[1])
    } else {
        result = context.fn()
    }
    delete context.fn
    return result
}
```



* bind

**`bind()`** 方法创建一个新的函数，在 `bind()` 被调用时，这个新函数的 `this` 被指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

```js
function = function.bind(thisArg[, arg1[, arg2[, ...]]])
```

参考博客： [解析 bind 原理，并手写 bind 实现](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FsisterAn%2FJavaScript-Algorithms%2Fissues%2F81)。



* 手写

```js
Funciton.proptotype.bind(context) {
    if (typeof this !== 'function') {
        thorw new Error('error')
    }
    //获取参数
    let args = [...arguments].slice(1)
    //记录调用的函数
    fn = this
    //需要返回一个函数
    //需要注意的是，如果将bind返回的函数视为构造函数，即使用new，那我们提供的 this 的值应当被忽略，从而指向实例,我们使用 instanceof 来判断
    return function Fn() {
        return fn.apply( this instanceof Fn ? this : context, args.concat(...arguments))
    }
   
}
```





## 箭头函数



箭头函数表达式 `() => {}` 的语法比函数表达式更加简洁，但是箭头函数自身并没有 `this`、`prototype`、`arguments`、`super` 与 `new.target` 等关键字。

# 对象



## 基础

### 属性的类型

《JavaScript 高级程序设计（第 4 版）》中指出：「ECMA-262 使用一些内部特性来描述属性的特征。这些特性是由为 JavaScript 实现引擎的规范定义的。因此，开发者不能在 JavaScript 中直接访问这些特性。为了将某个特性标识为内部特性，规范会用两个中括号把特性的名称括起来，比如 `[[Enumerable]]`。」



属性分为两种： **数据属性** 和 **访问器属性**

### 数据属性

数据属性由 4 个特性来描述它们的行为

- `[[Configurable]]`：表示属性是否可以通过 `delete` 删除、是否可以修改该属性的特性，以及是否可以将该数据属性修改为访问器属性。默认值为 `true`。

> 注意：
>
> 1. 严格模式下，如果该特性为 `false` 但是仍然使用 `delete` 方法删除属性，将会抛出错误。
> 2. 一个属性被定义为不可配置后，将无法再变回可配置。
> 3. 此处即下面所说的默认值，指的是通过字面量形式指定属性的值时，该特性的默认值；如果通过 `Object.defineProperty()` 方法添加新的属性，那么该属性的特性默认值为 `false`。

- `[[Enumerable]]`：表示属性是否可枚举。具体的，`[[Enumerable]` 特性表示该属性是否可以通过 `for-in` 循环返回。默认值为 `true`。
- `[[Writable]]`：表示属性的值是否可以被修改。默认值为 `true`。

> 注意：严格模式下修改只读属性将会抛出错误。

- `[[Value]]`：表示属性实际的值。默认值为 `undefined`。

如果想要修改属性的数据特性，必须使用 `Object.defineProperty()` 或 `Object.defineProperties()` 方法。`Object.defineProperty()` 接收 3 个参数：对象、属性名称和描述特性的对象：

```js
let obj = {
    name: 'Yucohny'
}
console.log(obj.name) // Yucohny
Object.defineProperty(obj, 'name', {
    value: 'Yucoh'
})
console.log(obj.name) // Yucoh
```

上面提到，如果使用 `Object.defineProperty()` 方法添加新属性，那么新属性的特性默认值为 `false`：

```js
const obj = {}
Object.defineProperty(obj, 'age', {
    value: 20
})
obj.age = 19
console.log(obj.age)
// 20
```

在上面的代码中，尽管我们尝试修改 `age` 为 `19`，但是由于 `age` 属性通过 `Object.defineProperty()` 指定时并未指定 `[[Writable]]` 特性的值，因此 `[[Writable]]` 特性取默认值 `false`，即不可修改。



### 访问器属性



在一个对象中，如果在某种情况下，我们不希望可以通过对象点属性名的方法直接修改属性值，我们**希望可以通过一次“过滤”之后**，如果传入的值符合要求，才能改变对象属性的值，因此，这就是访问器的作用。

访问器属性包含下列 4 个特性：

- `[[Configurable]]`：表示属性是否可以通过 `delete` 删除并重新定义，是否可以修改它的特性，以及是否可以把它修改为数据属性。默认值为 `false`。
- `[[Enumerable]]`：表示属性是否可以通过 `for-in` 循环返回。默认值为 `false`。
- `[[Get]]`：获取函数，在读取属性时调用，默认值为 `undefined`。
- `[[Set]]`：设置函数，在写入属性是调用，默认值为 `undefined`。

访问器属性是不能直接定义的，必须使用 `Object.defineProperty()` 或 `Object.defineProperties()` 定义，下面是一个例子：

```js
let book = {
    year_: 2017, // year_ 中的下划线用来表示该属性并不希望在对象方法的外部被访问
    edition: 1
}
Object.defineProperty(book, "year", {
    get() {
        return this.year_
    }
    set(newValue) {
    	if (newValue > 2017) {
            this.year_ = newValue
            this.edition += newValue - 2017
        }
	}
})
book.year = 2018
console.log(book.edition) // 2
```

访问器属性的典型使用场景便是和上面一样，即设置一个属性值会导致一些其他变化发生。

获取函数和设置函数不一定都要定义。只定义获取函数意味着属性是只读的，尝试修改属性会被忽略。在严格模式下，尝试写入只定义了获取函数的属性会抛出错误。类似地，只定义设置函数的属性是不能读取的，非严格模式下读取会返回 `undefined`，严格模式下会抛出错误。

### 定义多个属性

`Object.defineProperties()` 方法可以一次性定义多个属性的特性。该方法接收两个参数：对象和一个描述符对象，描述符对象的属性与要添加或修改的属性一一对应，如：

```js
let book = {}
Object.defineProperties(book, {
    year_: {
        value: 2017
    },
    edition: {
        value: 1
    }
})
```

### 读取属性的特性

使用 `Object.getOwnPropertyDescriptor()` 方法可以获取指定属性的特性描述符。这个方法接收两个参数：属性所在的对象和要取得其描述符的属性名。返回值是一个对象，对于数据属性和访问器属性分别包含对应的特性作为属性：

```js
let obj = {
    name: 'Yucohny'
}
Object.defineProperty(obj, 'name', {
    value: 'Yucoh'
})
console.log(Object.getOwnPropertyDescriptor(obj, 'name'))
// {
//   value: 'Yucoh',
//   writable: true,
//   enumerable: true,
//   configurable: true
// }
```

ES 2017 新增了 `Object.getOwnPropertyDescriptors()` 方法，并接收一个对象作为参数，该方法将会在每个属性上调用 `Object.getOwnPropertyDescriptor()` 并在一个新对象中返回它们：

```js
let obj = {
    name: 'Yucohny'
}
Object.defineProperty(obj, 'age', {
    get() {
        return 20
    }
})
console.log(Object.getOwnPropertyDescriptors(obj))
// {
//   name: {
//     value: 'Yucohny',
//     writable: true,
//     enumerable: true,
//     configurable: true
//   },
//   age: {
//     get: [Function: get],
//     set: undefined,
//     enumerable: false,
//     configurable: false
//   }
// }
```



### 增强的对象语法

##### 属性值简写

在给对象添加变量的时候，经常会出现属性名与变量名一致的情况，例如：

```js
let name = "Yucohny"
let person = {
    name: name
}
```

简写属性名只要使用变量名（不用再写冒号）就会自动被解释为同名的属性键。如果没有找到同名变量，则会抛出 `ReferenceError`。

```js
let name = "Yucohny"
let person = {
    name
}
```

##### 可计算属性

如果想要使用变量值为属性，那么必须先声明对象，然后使用中括号语法来添加属性。即，不能在对象字面量中直接动态命名属性。

```js
const name = "Yucohny"
let person = {}
person[name] = 19
```

有了可计算属性，就可以在对象字面量中完成动态属性赋值。中括号包围的对象属性键告诉运行时将其作为表达式而不是字符串来求值：

```js
const nameKey = "name"
const ageKey = "age"
let count = 0
function makeUniqueKey(key) {
    return `${key}_{count++}`
}
let person = {
    [makeUniqueKey(nameKey)]: "Yucohny",
    [makeUniqueKey(ageKey)]: 19
}
```



##  Iteratoe 迭代器



JS 原有的便是集合的数据结构，主要是 Array 和 Object， ES6 添加了 Map 和 Set

Iterator 就是为不同的数据结构提供了一种统一的访问机制，任何数据结构只要部署了 Iterator 接口，就可以完成遍历

Iterator 的作用主要有三个

1. 提供一个统一的、简便的访问接口
2. 使得数据结构的成员能够按照某种次序排列
3. ES6 创造了一种新的遍历命令，for of ，Iterator 主要供 for of 消费

Iterator 的遍历过程是这样的。

（1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

（2）第一次调用指针对象的`next`方法，可以将指针指向数据结构的第一个成员。

（3）第二次调用指针对象的`next`方法，指针就指向数据结构的第二个成员。

（4）不断调用指针对象的`next`方法，直到它指向数据结构的结束位置。

每一次调用`next`方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含`value`和`done`两个属性的对象。其中，`value`属性是当前成员的值，`done`属性是一个布尔值，表示遍历是否结束。



## for in & for of



* for in

for in 循环主要是为遍历对象而设计的，遍历对象上的可枚举属性，不适用于遍历数组，但数组也是对象，也是可以遍历数组的。

for in 会遍历对象本身以及对象原型链上的可枚举属性，包括继承下来的属性，遍历的顺序是无序的，

比如

```js
function Person(name, age) {
    this.name = name
    this.age = age
}

Person.prototype.gender = 'male'
let person = new Person('Tom',20)

```

我们使用 for in 遍历

```js
for (let key in person) {
     console.log(key + ': ' + person[key]);
}
//
name: Tom
age: 20
gender: male
```

无序是指，for in 遍历对象的属性时，是按照属性名的添加顺序进行遍历的



* for of

正如上面所说，for of 是用来遍历可迭代对象的

因为遍历的顺序是由迭代器返回值的顺序决定的，因此有序





## new 命令

### 构造函数

其本身是一个普通的函数，但有着自己的特征和用法

```js
var Vehicle = function () {
  this.price = 1000;
};
```

上面代码中，`Vehicle`就是构造函数。为了与普通函数区别，构造函数名字的第一个字母通常大写。

构造函数的特点有两个。

- 函数体内部使用了`this`关键字，代表了所要生成的对象实例。
- 生成对象的时候，必须使用`new`命令





### 无 new 命令调用构造函数

在没有`new` 命令的情况下调用构造函数，会使得该构造函数变成普通函数，同时函数内部的`this`将会指向全局对象

所以我们必须保证构造函数与`new`命令一起使用

1. 构造函数开启严格模式

严格模式下，没有`new`命令调用构造函数将会报错

```js
const Vehicle = function () {
    'use strict'
    this.price = 1000
}

const v = Vehicle()
// TypeError: Cannot set property 'price' of undefined
```

2. 通过判断构造函数中的 `this` 是否是它的实例

```js
const Vehicle = function () {
    if (!(this instanceof Vehicle)) {
        return new Vehicle()
    }
    this.price = 1000
}

const v = Vehicle()
console.log(v.price) // 1000
```

3. 同样的，我们也可以使用 `new.target`来进行判断

如果是通过 `new`命令调用，那么 `new.target`将会指向当前函数，否则为`undefined`

### 手写new



1. 首先创一个新的空对象。
2. 根据原型链，设置空对象的 `__proto__` 为构造函数的 `prototype` 。
3. 构造函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）。
4. 判断函数的返回值类型，如果是引用类型，就返回这个引用类型的对象。



```js
function new(context) {
    let obj = new Object()
    obj.__proto__ = context.proptotype
    const res = context.apply(obj, [...arguments].slice(1))
    return typeof res === 'Object' ? res || obj : obj
}
```







## 类



### 定义

类有两种方式定义： 类声明和类表达式

```js
class Person {} 类声明
const Person = class{}  类表达式
```

* 类声明不会提升
* 默认情况下，类中的代码都启用了**严格模式**

类表达式的名称是可选的, 可以通过`name`属性获取类表达式的名称，但是不能在类作用域外部访问类表达式的名称（这里的 VehicleName）  

```js
const Vehicle = class VehicleName {
    identify() {
        console.log(Vehicle.name, VehicleName.name)
    }
}
const v = new Vehicle()

v.identify()

console.log(Vehicle.name)
console.log(VehicleName)

// VehicleName VehicleName
// VehicleName
// ReferenceError: ObjName is not defined

```



### constructor

该关键字用于在类中创建类的构造函数， 当使用 `new` 命令创建新的实例，会调用`constructor`

当使用 `new` 命令通过类实例化对象时，可以传入参数，对应的参数将被传入类构造函数中：

```js
const Vehicle = class {
    constructor(flag) {
        if (flag) {
            console.log('Vehicle')
        }
    }
}

const v = new Vehicle(true)

// Vehicle
```

如果没有使用`new`， 将会报错

>类构造函数和构造函数
>
>没有使用new执行，构造函数会正常执行，只是其中的`this`指向会出现问题

类也具有 `prototype`属性，且这个原型具有`constructor`属性指向类本身

```js
const Vehicle = class {}

console.log(Vehicle.prototype.constructor === Vehicle)

// true
```



### 实例属性与方法

我们可以在构造函数内部添加实例属性与方法，`this`指向为新创建的实例

```js
const hasPrototypeProperty = function (obj, property) {
    return !obj.hasOwnProperty(property) && property in obj
}
//这是判断该属性是否在实例的原型上

const Vehicle = class {
    constructor(name) {
        this.name = name
    }
}

const v = new Vehicle('Yucohny')

console.log(hasPrototypeProperty(v, 'name'))

// false
```

实例属性的新写法：

实例属性现在除了可以定义在`constructor()`方法里面的`this`上面，也可以定义在类内部的最顶层。

```js
class IncreasingCounter {
  _count = 0;
  get value() {
    console.log('Getting the current value!');
    return this._count;
  }
  increment() {
    this._count++;
  }
}
```

### 原型方法

在类块中定义的方法为原型方法

```js
const hasPrototypeProperty = function (obj, property) {
    return !obj.hasOwnProperty(property) && property in obj
}

const Vehicle = class {
    getName() {
        return 'Yucohny'
    }
}

const v = new Vehicle('Yucohny')

console.log(v.getName())
console.log(Vehicle.prototype.getName())
console.log(hasPrototypeProperty(v, 'getName'))

// Yucohny
// Yucohny
// true
```



### 静态方法与静态属性

在其前面添加 `static`

```js
const Vehicle = class {
    static print () {
        console.log('hello')
    }
    static prop = 'hello'
}

Vehicle.print()
Vehicle.prop
//hello
//hello
```

### getter & setter

在“类”的内部可以使用`get`和`set`关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

```js
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop
// 'getter'
```

### 继承 extends

ES6 类通过 `extends` 关键字实现继承。一个类可以继承任何拥有构造器属性与原型的对象，因此一个类不仅可以继承一个类，也可以继承普通的构造函数。

```js
const Vehicle = class {}

const Person = class extends Vehicle {}

const p = new Person()

console.log(p instanceof Vehicle)
console.log(p instanceof Person)

// true
// true
```

* super

子类可以通过 `super` 关键字引用父类。但是要注意，这个关键字只能在子类构造函数、实例方法与静态方法内部使用。在子类构造函数中，`super()` 可以直接调用父类构造函数。

```js
const Vehicle = class {
    constructor() {
        console.log('Vehicle')
    }
}

const Person = class extends Vehicle {
    constructor() {
        super()
    }
}

const p = new Person()

// Vehicle
```

`super` 的一些注意事项：

- `super` 只能在子类构造函数、实例方法与静态方法内部使用；
- 不能单独引用 `super` 关键字，要么用它调用构造函数，要么用它引用静态方法；
- 调用 `super()` 会调用父类构造函数，并将返回的实例赋值给 `this` 子类实例；

> 因此，如果在子类中显式定义了构造函数，则要么必须在其中调用 `super()`，要么必须在其中返回一个对象。

- 如果没有在子类中定义类构造函数，那么在实例化子类时会自动调用 `super()`，并将自动传入所有传给子类构造函数的参数；
- 在子类构造函数中，不能在调用 `super()` 之前引用 `this`。



### 抽象类

抽象类指的是可供其他类继承，但是本事并不会被实例化。JavaScript 中没有专门支持抽象类的语法，但是可以通过 `new.target` 实现。

`new.target` 保存了通过 `new` 关键字调用的类或者函数，可以通过在实例化时检测 `new.target` 是不是抽象类来阻止抽象类的实例化：

```
const Vehicle = class {
    constructor() {
        if (new.target === Vehicle) {
            throw new Error('This class cannot be directly instantiated')
        }
    }
}

const v = new Vehicle()

// Error: This class cannot be directly instantiated
```

由于原型方法在调用类构造函数前就已经存在，因此可以通过抽象类检查子类是否定义了某个方法：

```js
const Vehicle = class {
    constructor() {
        if (new.target === Vehicle) {
            throw new Error('This class cannot be directly instantiated')
        }

        if (!this.getName) {
            throw new Error('Inheriting class must define getName()')
        }
    }
}

const Person = class extends Vehicle {}

const p = new Person()

// Error: Inheriting class must define getName()
```





# 异步



## 单线程

js 是一个单线程语言，意味着他只有一个调用栈，同一时刻只能做一件事

如果我们所有的程序都是同步的，那么很有可能造成调用栈的阻塞，所以我们使用异步回调

js 同一时刻只能做一件事，但是浏览器给我们提供了其他的东西： Web APIs,  你可以对应地创建一些线程，但你不能直接访问，只能通过某些方式进行调用，浏览器对这种调用进行响应

## 同步任务和异步任务



* 同步任务

指直接在主线程上排队执行的任务

同步任务的执行，按照代码顺序和调用顺序，直接进入调用栈中并执行，执行结束后就移除调用栈。

* 异步任务

指不进入主线程，进入任务队列的任务

异步任务的执行，首先它依旧会进入调用栈中，然后发起调用，然后解释器会将其**响应回调任务**放入一个**任务队列**，紧接着调用栈会将这个任务移除。当主线程清空后，即所有同步任务结束后，解释器会读取任务队列，并依次将**已完成的异步任务**加入调用栈中并执行。

重点就是异步任务**不是直接**进入任务队列的。

## 任务队列与事件循环



* 任务队列

WebAPIs 不能直接进行你的调用栈中， 所以引入了 callback queue(task queue) 回调队列（任务队列）， webaips 结束后就把回调函数送入队列中。

主线程首先会将调用栈中的同步任务执行完成，当同步任务**清空**时，就会从队首检查任务队列中的异步任务，放入调用栈中执行，执行结束后，主线程将重复此过程，直到所有的任务执行结束。这是早期的**事件循环**

一个例子

```js
console.log("Hi");

setTimeout(function cb() {
  console.log("cb"); // cb 即 callback
}, 5000);

console.log("Bye");
```

![屏幕录制 2021-07-19 15.01.09.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e15fc609aa84eac973c5b8ff163c11c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)



我们有如下代码

```js
console.log('hi')
setTimeout(function cb() {
    console.log('there')
},0)
console.log('JS')
```

对于第二行地定时器，我们将它的第二个参数设置为0， 实际上，我们设置了定时器，他确实在 webapi中 马上就进入了回调队列中，但是我们必须要等到 stack 中为空，才能将对调队列中的函数放进 stack 中，所以 setTimeout 设置为 0， 就是想让代码在 栈底执行，或者是为了等到栈空之后再执行

所以说，我们给 setTimeout 设置地时间，实际上并不是指多久之后执行，而是最快要多久之后执行，因为我们不仅要在callback queue中排队，也要等到栈空之后才能进入 stack



* 宏任务与微任务

后面又引入了宏任务与微任务，他们都是异步任务，但是执行时机有所不同

进入整体代码(宏任务)后，开始第一次循环。接着执行所有的微任务。然后再次从宏任务开始，找到其中一个任务队列执行完毕，再执行所有的微任务。如果在执行宏任务的同时又产生了微任务，这个微任务会被立即添加到微任务队列中，这就是**事件循环**

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/21/15fdcea13361a1ec~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.awebp)

宏任务：DOM 渲染后触发，如 `setTimeout` 、`setInterval` 、`DOM 事件` 、`script` 。

微任务：DOM 渲染前触发，如 `Promise.then` 、`MutationObserver` 、Node 环境下的 `process.nextTick` 。

* 事件循环时 JavaScript 的执行机制

* 推荐文章：  [这一次，彻底弄懂 JavaScript 执行机制](https://juejin.cn/post/6844903512845860872)。
* 如果意犹未尽，不如再读下这篇非常详细带有大量动图的文章：[做一些动图，学习一下 EventLoop](https://juejin.cn/post/6969028296893792286#comment)。
* 想了解事件循环和页面渲染之间关系的又可以再阅读这篇文章：[深入解析你不知道的 EventLoop 和浏览器渲染、帧动画、空闲回调（动图演示）](https://juejin.cn/post/6844904165462769678)。

两个例子

```js
console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})
1
7
6
8
2
4
3
5
9
11
10
12
```

```js
async function async1() {
    console.log("a");
    const res = await async2();
    console.log("b");
}

async function async2() {
    console.log("c");
    return 2;
}

console.log("d");

setTimeout(() => {
    console.log("e");
}, 0);

async1().then(res => {
    console.log("f")
})

new Promise((resolve) => {
    console.log("g");
    resolve();
}).then(() => {
    console.log("h");
});

console.log("i");

d
a
c
g
i
b
h
f
e
```



## 定时器



### setTimeout()

可以指定一个函数在 至少 多少 毫秒 后执行（由于时间循环的存在，这个时间可能不会准时），他会返回一个编号，可以利用该编号清除这个定时器

`setTimeout()` 通常接收两个参数，第一个参数一个函数或者一段字符串形式的代码，第二个参数是要推迟的时间。第二个参数如果省略，则默认为 0。

```js
console.log(1);
setTimeout('console.log(2)',1000);
console.log(3);
// 1
// 3
// 2
```

如果 `setTimeout()` 中的回调函数具有参数，可以直接跟在 `setTimeout()` 后面：

```js
setTimeout(function (a,b) {
  console.log(a + b);
}, 1000, 1, 1);
```



### setInterval()

与 `setTimeout` 用法一直，不过他是指定某个任务每隔一段时间就执行一次，也就是无限次的定时执行。

它指定的是 开始执行 的最小间隔，并不考虑每次任务的执行时间， 所有，如果我们指定 `setInterval` 的时间间隔为 `1000`， 而每次执行需要5ms， 那么第一次执行结束后95ms ，第二次循环就会开始， 亦然，如果每次执行需要105ms， 那么第二次的任务在第一次执行结束就会立即开始



### 清除定时器

利用两者返回的编号，我们使用`clearTimeout()` 和 `clearInterval()` 函数，就可以取消对应的定时器。



## 防抖 debounce

指的是在事件被触发若干秒后再执行回调，如果在这若干秒内触发相同事件，则**重新计时。**

* 搜索框搜索输入
* 文本编辑器的实时保存

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div style="background-color: gray; color: white; width: 400px; height: 400px; margin: auto">zz</div>
    <script>
        let count = 1
        let div = document.querySelector('div')
        function getUserAction (e) {
            console.log(e)
            div.innerHTML = count++ 
        }

        // 第四版
        function debounce (func, wait, immediate) {

            let timer = null

            return function () {
                let context = this  //解决this指向问题
                let args = arguments //解决事件函数中的e为undefined的问题
                clearTimeout(timer)
                if (immediate) {
                    let callNow = !timer
                    timer = setTimeout(function () {
                        timer = null
                    }, wait)
                    if (callNow) func.apply(context, args)
                } else {
                    timer = setTimeout(function () {
                        func.apply(context, args)
                    }, wait)
                }


            }


        }
        div.addEventListener("mousemove", debounce(getUserAction, 200, true))

    </script>
</body>

</html>


<!-- 防抖的原理就是：
    你尽管触发事件，但是我一定在事件触发 n 秒后才执行，
    如果你在一个事件触发的 n 秒内又触发了这个事件，
    那我就以新的事件的时间为准，n 秒后才执行，
    总之，就是要等你触发完事件 n 秒内不再触发事件，我才执行，真是任性呐! 
-->
```

建议看看这个： [JavaScript 专题之跟着 underscore 学防抖 ](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fmqyqingfeng%2FBlog%2Fissues%2F22)

值得注意的是，在上面的代码中，为什么可以通过let callNow = !timer 来对callNow 赋值，不是在上面已经 clearTimeout(timer)了吗，这是因为，clearTimerout 只是解绑了timer和其对应的定时器，但本身timer 在绑定定时器的时候，它自身就是一个编号，所以在wait时间内，如果重新触发了事件，timer此时不为空，那么callNow 就为非，就不会触发时间，通过会给 timer 重新绑定一个定时器，当然，如果wait 时间后，timer赋值为 null, 这时我们相当于“第一次触发事件”，事件会立即触发

## 节流 throttle

指的是在一个单位时间内，只能触发一次事件。如果在这个单位时间内多次触发，则**仅有**一次生效。不要打断

* 高频事件（快速点击，鼠标滑动，resize事件）
* 下拉加载

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div style="background-color: gray; color: white; width: 400px; height: 400px; margin: auto">zz</div>
    <script>
        let count = 1
        let div = document.querySelector('div')
        function getUserAction (e) {
            console.log(e)
            div.innerHTML = count++
        }
        function throttle (func, wait) {

            let timer = null
            return function () {
                let context = this
                let args = arguments
                //先等待再执行

                // if (!timer) {
                //     timer = setTimeout(function () {
                //         timer = null
                //         func.apply(context, args)
                //     }, wait)
                // }

                //先执行再等待
                if (timer) return
                func.apply(context, args)
                timer = setTimeout(function () {
                    timer = null
                }, wait)
            }
        }


        div.addEventListener("mousemove", throttle(getUserAction, 200))

    </script>
</body>

</html>


<!-- 指的是在一个单位时间内，只能触发一次事件。如果在这个单位时间内多次触发，则仅有一次生效。不要打断
-->
```





## Promise

所谓`Promise`，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

从语义上来说，`Promise` 是一个容器，里面保存着某个未来才会结束的事件的结果。

从语法上来说，`Promise` 是一个对象，它可以获取异步操作的消息。

`Promise` 对象有以下两个特点：

1. 无法通过外界对 `Promise` 对象造成影响。`Promise` 对象代表一个异步操作，有 3 种状态：进行中 `pending`、已成功 `fulfilled`（也称为 `resolved`） 和已失败 `rejected`。只有异步操作的结果可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。

> 有一个地方值得注意：对于事件而言，在错过事件发生之后再去监听，将不会得到结果；而 `Promise` 对象改变后再去添加回调函数，我们仍然是能够得到改变后的状态的。

2. 一旦状态改变就不会再变，并且任何时候都可以得到这个结果。`Promise` 对象的状态改变只有两种可能：`pending` 变为 `fulfilled`，`pending` 变为 `rejected`。只要这两种情况发生，状态就不会再变。这时就称为已定型 `resolved`（但是很多时候都默认 `resolved` 特指 `fulfilled`）。

### **基本用法**



`Promise` 对象是一个构造函数，用于生成 `Promise` 实例。

`Promise` 构造函数接收一个函数作为参数，该函数的两个参数分别是 `resolve` 与 `reject`。

`resolve` 和 `reject` 是两个函数，由 JavaScript 引擎提供，不需要自己部署。

```js
new Promise((resolve, reject) => {
    resolve(1)
})
```

### **resolve()**

`resolve()` 函数的作用是，将 `Promise` 对象的状态从 `pending` 变为 `resolved`。`resolve()` 函数在异步操作成功时调用，并 **将异步操作的结果，作为参数传递出去**。

### **reject()**

`reject()` 函数的作用是，将 `Promise` 对象的状态从 `pending` 变为 `rejected`。`reject`() 函数在异步操作失败时调用，并 **将异步操作报出的错误，作为参数传递出去**。

如果执行 `resolve()` 或者 `reject()` 后还有命令需要执行，那么会继续执行：

```js
new Promise((resolve, reject) => {
    resolve(1)
    console.log('ok')
})
// ok
```

但是从语义上而言，执行 `resolve()` 或 `reject()` 参数后，`Promise` 本身的使命就已经完成了，后续命令应该添加至 `then` 方法中。

为了避免上面示例这样的情况，我们可以在 `resolve()` 或 `reject()` 执行前添加 `return` 命令：

```js
new Promise((resolve, reject) => {
    return resolve(1)
    console.log('ok')
})
```

* 即 上面两个函数决定了返回的 Promise 对象的状态，函数传递的值就是这个Promise的值

### Promise.prototype.then()



`then` 方法定义在构造函数的原型对象上，因此为每一个实例对象所共享。

`then` 方法的作用是为 `Promise` 实例 **添加状态改变时的回调函数**。

`then` 方法可以接收两个**回调函数**作为参数。

第一个回调函数是 `Promise` 对象的状态变为 `resolved` 时调用。

第二个回调函数是 `Promise` 对象的状态变为 `rejected` 时调用。

这两个函数都是可选的，不一定要提供，它们都接收 `Promise` 对象传出的值作为参数。

`Promise` 本身是同步执行，但是其回调 `then` 方法是异步执行：

```js
const p = new Promise(function(resolve) {
    console.log(1)
    resolve()
})

p.then(function() {
    console.log(2)
})

console.log(3)

// 1
// 3
// 2
```

`then` 方法返回的是一个新的 `Promise` 实例，因此可以采用链式写法，即 `then` 方法后面再调用另一个 `then` 方法。这样做将会将前一个 `then` 方法**返回值**传入这个新的 `then` 方法作为参数：

```js
new Promise((resolve) => {
    return resolve(1)
})
    .then((number) => {
        console.log(number)
        return number + 1
    })
    .then((number) => {
        console.log(number)
        return number + 1
    })
// 1
// 2
```



* 在 `.then` 和 `.catch` 中 `return` 一个 `error` 对象并不会抛出错误，也不会被后续的 `cathc `捕获，它相当于返回了一个 `Promise.resolve(new Error(xxx))` ，状态为 `reslove` ， 值为这个错误

```js
Promise.resolve().then(() => {
  return new Error('error!!!')
}).then(res => {
  console.log("then: ", res)
}).catch(err => {
  console.log("catch: ", err)
})

//"then: " "Error: error!!!"
```

可以使用下面的方式来抛出错误

```js
return Promise.reject(new Error('error!!!'));
// or
throw new Error('error!!!')
```





* 总结： `.then` 方法会返回一个新的`Promise` 对象，这个对象的状态由它的返回值决定，对象的值就是返回值，当然如果它返回的是一个`new Promise` ，那么就是由这个`Promise`来决定

### Promise.prototype.catch()

* `Promise.prototype.catch()` 方法等同于 `.then(null, reject)` 或者 `.then(undefined, reject)`，用于指定发生错误时的回调函数。
* 有了 `catch()` 方法的存在，因此一般不在 `then` 方法中定义 `rejected` 状态的回调函数，而应该总是使用 `catch` 方法。
* 与传统 `try/catch` 代码块不同的是，如果没有使用 `catch` 方法指定错误处理的回调函数，`Promise` 对象抛出的错误不会传递到外层代码，即不会有任何反应。但是浏览器会打印出对应的输出，但是并不会终止脚本的运行。

* `catch` 函数也会返回一个 promise,  promise的值由它的返回值决定

```js
const promise = new Promise((resolve, reject) => {
  reject("error");
  resolve("success2");
});
promise
.then(res => {
    console.log("then1: ", res);
  }).then(res => {
    console.log("then2: ", res);
  }).catch(err => {
    console.log("catch: ", err);
  }).then(res => {
    console.log("then3: ", res);
  })
```

结果

```js
"catch: " "error"
"then3: " undefined
```

`.then` 和 `.catch` 的参数期望是函数，如果传入的不是函数，将会发生值透穿



### Promise.prototype.finally()



`finally()` 方法用于指定不管 `Promise` 对象最后状态如何，都会执行的操作。

`finally()` 方法的回调函数不接受任何参数，这意味着没有办法知道状态到底是 `fulfilled` 还是 `rejected`。这表明，`finally()` 方法里面的操作，应该是与状态无关的，不依赖于 `Promise` 的执行结果。

`finally()` 方法可以看作是 `then()` 方法的语法糖：

```js
const promise = new Promise(function () {})

promise.finally(function () {
    // 语句
})

// 等同于

promise.then(function () {
    // 相同的语句
}, function () {
    // 相同的语句
})
```

* **链式调用**后面的内容需要等前一个调用执行完才会执行。

* `.finally` 最终返回的默认是上一次的 Promise的对象值，除非它直接抛出一个异常，则返回异常的 Promise对象

```js
Promise.resolve('1')
  .then(res => {
    console.log(res)
  })
  .finally(() => {
    console.log('finally')
  })
Promise.resolve('2')
  .finally(() => {
    console.log('finally2')
  	return '我是finally2返回的值'
  })
  .then(res => {
    console.log('finally2后面的then函数', res)
  })

//
'1'
'finally2'
'finally'
'finally2后面的then函数' '2'
```

**总结：**

1. `Promise`的状态一经改变就不能再改变。(见3.1)
2. `.then`和`.catch`都会返回一个新的`Promise`。(上面的👆1.4证明了)
3. `catch`不管被连接到哪里，都能捕获上层未捕捉过的错误。(见3.2)
4. 在`Promise`中，返回任意一个非 `promise` 的值都会被包裹成 `promise` 对象，例如`return 2`会被包装为`return Promise.resolve(2)`。
5. `Promise` 的 `.then` 或者 `.catch` 可以被调用多次, 但如果`Promise`内部的状态一经改变，并且有了一个值，那么后续每次调用`.then`或者`.catch`的时候都会直接拿到该值。(见3.5)
6. `.then` 或者 `.catch` 中 `return` 一个 `error` 对象并不会抛出错误，所以不会被后续的 `.catch` 捕获。(见3.6)
7. `.then` 或 `.catch` 返回的值不能是 promise 本身，否则会造成死循环。(见3.7)
8. `.then` 或者 `.catch` 的参数期望是函数，传入非函数则会发生值透传。(见3.8)
9. `.then`方法是能接收两个参数的，第一个是处理成功的函数，第二个是处理失败的函数，再某些时候你可以认为`catch`是`.then`第二个参数的简便写法。(见3.9)
10. `.finally`方法也是返回一个`Promise`，他在`Promise`结束的时候，无论结果为`resolved`还是`rejected`，都会执行里面的回调函数。



### Promise.all()



`Promise.all()` 方法用于将多个 `Promise` 实例包装成一个新的 `Promise` 实例。

```js
const p = Promise.all([p1, p2, p3])
```

`Promise.all()` 接收具有 `Iterator` 接口的对象（最典型的就是数组）作为参数，数组元素期望为 `Promise` 对象的实例；如果不是，就会对该元素调用 `Promise.resolve()` 方法，将参数转为 `Promise` 实例，再进一步处理。

返回的状态由传入参数的状态决定，分为两种情况：

1. 只有当传入的 `Promise` 实例都是 `fulfilled` 状态，得到的新 `Promise` 实例才是 `fulfilled` 状态。并且 `Promise` 实例参数的返回值会组成一个数组，传递给新的 `Promise` 实例的回调函数。
2. 当传入的 `Promise` 实例存在 `rejected` 状态，则得到的结果就是 `rejected` 状态。并且第一个 `rejected` 状态的实例的返回值会传递给新的 `Promise` 实例的回调函数。



结合 `Promise.all()` 的含义，可以手写出 `PromiseAll()` 方法：

```js
const PromiseAll = (iterator) => {
    const promises = Array.from(iterator)
    let index = 0
    let data = []
    return new Promise((resolve, reject) => {
        for (let i in promises) {
            promises[i]
                .then((res) => {
                    data[i] = res;
                    if (++index === promises.length) {
                        resolve(data);
                    }
                })
                .catch((err) => {
                    reject(err);
                })
        }
    })
}
```

`Promise.all()` 的应用场景很容易设想：并发了多个网络请求时，需要等到全部返回成功后再进行接下来的操作。

### Promise.race()



`Promise.race()` 方法同样是将多个 `Promise` 实例包装成一个新的 `Promise` 实例。`Promise.race()` 的参数处理与 `Promise.all()` 相同，但是新 `Promise` 实例的状态规则与 `Promise.all()` 不同：

如果 `Promise` 实例参数有一个实例的状态发生改变，则新的 `Promise` 实例的状态也跟着改变，并且率先改变状态的参数的返回值作为新的 `Promise` 实例回调函数参数。

```js
function runAsync(x) {
  const p = new Promise(r =>
    setTimeout(() => r(x, console.log(x)), 1000)
  );
  return p;
}
function runReject(x) {
  const p = new Promise((res, rej) =>
    setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x)
  );
  return p;
}
Promise.race([runReject(0), runAsync(1), runAsync(2), runAsync(3)])
  .then(res => console.log("result: ", res))
  .catch(err => console.log(err));
```

遇到错误的话，也是一样的，在这道题中，`runReject(0)`最先执行完，所以进入了`catch()`中

```js
0
'Error: 0'
1
2
3
```



**总结**

- `Promise.all()`的作用是接收一组异步任务，然后并行执行异步任务，并且在所有异步操作执行完后才执行回调。
- `.race()`的作用也是接收一组异步任务，然后并行执行异步任务，只保留取第一个执行完成的异步操作的结果，其他的方法仍在执行，不过执行结果会被抛弃。
- `Promise.all().then()`结果中数组的顺序和`Promise.all()`接收到的数组顺序一致。
- `all和race`传入的数组中如果有会抛出异常的异步任务，那么只有最先抛出的错误会被捕获，并且是被`then`的第二个参数或者后面的`catch`捕获；但并不会影响数组中其它的异步任务的执行



### Promise.allSettled()



`Promise.allSettled()` 方法同样是将多个 `Promise` 实例包装成一个新的 `Promise` 实例。`Promise.allSettled()` 的参数处理与 `Promise.all()` 相同，但是新 `Promise` 实例的状态规则与 `Promise.all()` 不同：

当参数数组的 `Promise` 对象状态全部发生改变（无论是 `fulfilled` 还是 `rejected`）后，新的 `Promise` 对象状态发生改变，为 `fullfilled`，并且将参数数组作为新的 `Promise` 实例回调函数参数。



当给定的 `iterable` 中所有 promise 已经敲定时（要么已兑现，要么已拒绝）。兑现的值是一个对象数组，其中的对象按照 `iterable` 中 promise 传递的顺序，描述每一个 promise 的结果，无论完成顺序如何。每个结果对象都有以下的属性：

- `status`

  一个字符串，要么是 `"fulfilled"`，要么是 `"rejected"`，表示 promise 的最终状态。

- `value`

  仅当 `status` 为 `"fulfilled"`，才存在。在 promise 兑现时才有 value。

- `reason`

  仅当 `status` 为 `"rejected"`，才存在，在 promsie 拒绝时才有 reason。

```js
const resolved = Promise.resolve(1)
const rejected = Promise.reject(-1)

const promise = Promise.allSettled([resolved, rejected])

promise.then(promises => console.log(promises))

// [
//   { status: 'fulfilled', value: 1 },
//   { status: 'rejected', reason: -1 }
// ]
```

可以通过 `Array.prototype.filter()` 方式筛选出状态分别为 `fulfilled` 与 `rejected` 的 `Promise` 对象，并且返回错误原因：

```js
async function work() {
    const promises = [
        Promise.resolve(1),
        Promise.reject(2),
        Promise.resolve(3),
        Promise.reject(4)
    ]

    const results = await Promise.allSettled(promises)

    const fulfilleds = results.filter(p => p.status === 'fulfilled')

    const rejecteds = results.filter(p => p.status === 'rejected')
        .map(p => p.reason);

    console.log(fulfilleds)

    console.log(rejecteds)
}

work()

// [
//   { status: 'fulfilled', value: 1 },
//   { status: 'fulfilled', value: 3 }
// ]
// [ 2, 4 ]
```





### Promise.any()



`Promise.any()` 方法同样是将多个 `Promise` 实例包装成一个新的 `Promise` 实例。`Promise.any()` 的参数处理与 `Promise.all()` 相同，但是新 `Promise` 实例的状态规则与 `Promise.all()` 不同：

如果 `Promise` 实例参数有一个实例的状态变为 `fulfilled`，则新的 `Promise` 实例的状态也变为 `fulfilled`；如果所有 `Promise` 实例参数都变为 `rejected`，则新的 `Promise` 实例的状态才会变为 `rejected`。

如果可迭代对象内的 `promise` 最终都没有兑现（即所有 `promise` 都被拒绝了），那么该方法所返回的 `promise` 就会变成拒绝状态，并且它的拒因会是一个 [`AggregateError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AggregateError) 实例，这是 [`Error`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error) 的子类，用于把单一的错误集合在一起。

### Promise.resolve()



`Promise.resolve()` 用于将现有对象转化为 `Promise` 对象，分为下列四种情况：

1. 参数是一个 `Promise` 实例

不做修改，直接返回该实例。

如果参数是一个原始值，或者是一个不具有 `then` 方法的对象，那么 `Promise.resolve` 方法返回一个新的 `Promise` 对象，状态为 `resolved`，并且值就为该参数：

```js
const p = Promise.resolve(1)

p.then(result => console.log(result))

// 1
```

2. 不带有参数

直接返回一个 `resolved` 状态的 `Promise` 对象，值为 `undefined`：

```js
Promise.resolve().then(result => console.log(result))

// undefined
```

### Promise.reject()



`Promise.reject()` 方法也返回一个新的 `Promise` 实例，状态为 `rejected`。

`Promise.reject()` 方法的参数会原封不动作为 `reject` 的理由变成后续方法的参数：

```js
Promise.reject(1).catch(error => console.log(error))

// 1
```







## async & await

ECMAScript2017中添加了`async functions`和`await`。



* async

`async`关键字是将一个同步函数变成一个异步函数，并将返回值变为`Promise`。

`async` 函数返回的 `Promise` 对象的状态由以下两点决定：

1. 如果异步函数内执行 `throw` 抛出错误语句，那么状态为 `rejected`；
1. 如果返回的是一个 promise，那就根据primose的具体情况来
2. 状态为 `fulfilled`。

```js
async function P1() {
    return 1
}

async function P2() {
    throw new Error(2)
    return 3
}

const p1 = P1()

const p2 = P2()

console.log(p1)
console.log(p2)

// Promise { 1 }
// Promise {
//   <rejected> Error: 2
//       at P2 (E:\code\js-demo\index.js:6:11)
//       at Object.<anonymous> (E:\code\js-demo\index.js:12:12)
// }
```

`async` 函数返回的 `Promise` 对象的值由以下几点决定：

1. 如果执行了 `throw` 抛出错误语句，那么 `Promise` 对象的值为 `Error` 对象的值。
2. 否则，如果存在 `return` 语句，那么 `return` 的内容就是 `Promise` 对象的值。
3. 否则，如果不存在 `return` 语句，那么 `Promise` 对象的值为 `undefined`。

```js
async function P1() {
    return 1
}

async function P2() {}

async function P3() {
    throw new Error(2)
}

const p1 = P1()

const p2 = P2()

const p3 = P3()

console.log(p1)
console.log(p2)
console.log(p3)

// Promise { 1 }
// Promise { undefined }
// Promise {
//   <rejected> Error: 2
//       at P2 (E:\code\js-demo\index.js:6:11)
//       at Object.<anonymous> (E:\code\js-demo\index.js:12:12)
// }
```

既然 `async` 函数返回的是 `Promise` 对象，那么可以在调用 `async` 函数后追加 `then` 等其他语句：

```js
async function asyncPrint(value) {
    console.log(value)
    return value
}
asyncPrint(1).then(v => console.log(v + 1))
// 1
// 2
```





* await

`await` 命令用于等待一个 `Promise` 对象执行完毕。`await` 命令要注意下列两点：

1. `await` 命令只能用于 `async` 函数中。
2. `await` 命令一般跟 `Promise` 对象，如果不是 `Promise` 对象，那么就会将命令后面的值直接返回。



如果 `async` 函数执行到了 `await` 语句，那么就会直接返回一个 `Promise` 对象，该 `Promise` 对象状态为 `pending`。

```js
async function P() {
    await new Promise(() => {})
    return 'Demo'
}

const promise = P()

console.log(promise)

promise.then(() => {
    console.log('Test')
})

// Promise { <pending> }
```

如果 `await` 命令后的 `Promise` 对象状态改变为 `fulfilled`，那么 `async` 函数将继续执行后面的语句，并且返回的 `Promise` 实例对象值与上一小节所述一致：

```js
async function P() {
    await new Promise((resolve) => {
        resolve(1)
    })
    return 2
}

const promise = P()

console.log(promise)

promise.then(() => {
    console.log(promise)
})

// Promise { <pending> }
// Promise { 2 }
```

如果该 `await` 命令后的 `Promise` 对象状态改变为 `rejected`，那么整个 `async` 函数执行结束，并且将 `async` 函数返回的 `Promise` 对象的状态改变为 `rejected`，值为 `await` 命令后面的 `Promise` 对象执行 `reject()` 的值。

```js
async function P() {
    await new Promise((resolve, reject) => {
        reject(1)
    })
    return 2
}

const promise = P()

console.log(promise)

promise.catch(() => {
    console.log(promise)
})

// Promise { <pending> }
// Promise { <rejected> 1 }
```



可以理解为： 紧跟着 await 后面的语句相当于放到了 new Promise 中，下一行及之后的语句相当于放在了 Promise.then 中

```js
async function async1() {
  console.log("async1 start");
  // 原来代码
  // await async2();
  // console.log("async1 end");
  
  // 转换后代码
  new Promise(resolve => {
    console.log("async2")
    resolve()
  }).then(res => console.log("async1 end"))
}
async function async2() {
  console.log("async2");
}
async1();
console.log("start")

//
async start
async2
start
async1 end
```



* 如果await 后面的表达式是一个 Promise， 它的返回值就是Promise的解决值
* 如果是一个非Promise，它的返回值就是表达式本身的值
* 如果await 右侧的 Promise 被拒绝，await会抛出拒绝的原因，并且将不再执行后续代码



# DOM

即 文档对象模型

## DOM 树

![DOM HTML tree](https://www.runoob.com/images/pic_htmltree.gif)

* 文档： document，一个页面就是一个文档
* 元素： element， 页面中所以的标签都是元素
* 节点： node， 网页中所有的内容都是节点（标签，属性，文本，注释等）

每个节点都至少有三个基本属性

* nodeType

返回节点类型的常数值，常用的有 1（元素）、2（属性）、3（文本）

* nodeName

返回节点的名称

* nodeValue

返回或者设置当前节点的值，格式为字符串

## 获取元素

1. 根据 id `document.getElementById()`
2. 根据 tag `document.getElementByTagName()` 返回伪数组
3. 根据 class `document.getElementByTagName() `  返回伪数组

4. 利用选择器 
   1. `document.querySelector(#id .class tag)` 返回匹配到的第一个元素
   2. `document.querySeletorAll(#id .class tag)` 返回伪数组



* 获取body `document.body`
* 获取html `document.documentElement`



### 利用节点层次获取属性

**父级节点**

* `node.parentNode` 获得离元素最近的父级节点，找不到就为 null

**子级节点**

* `node.childNodes` 获取包含换行、空格等文本节点在内的节点，可以通过`nodeType`进一步获取

* `node.children` 获取所有的**子级元素**节点
* `node.firstChild` 获取第一个子节点，注意包括了文本等节点
* `node.firstElementChild` 获取第一个子元素节点
* `node.lastElementChild` 获取最后一个子元素节点

**兄弟节点**

* `node.nextSibling` 下一个节点， 包含了文本等节点
* `node.previousSibling` 上一个节点， 包含了文本等节点
* `node.nextElementSibling` 下一个兄弟元素节点
* `node.previousElementSibling` 上一个兄弟元素节点



## 操作DOM



### **操作元素**

**改变元素内容**

* `element.innerText`   不识别html标签（如<div></div>等），会去除空格和换行

*  `element.innerHTML`  识别html标签 ， 保留空格和换行 *
    都是可读写

**操作常见元素**

* src , href, alt , title , id 

**表单属性操作**

* type、 value、checked、selected、disabled(禁用)

**样式属性操作** 

* `element.style`   是行内样式， 样式较少，功能简单
* `element.className`
  		如果原来元素有类名，直接赋值会覆盖掉
    		通过并列写不会覆盖   `element.className=原来的  新添的`

**创建节点**

* `document.creatElement(tag)`

**添加节点**

* `node.appendChild(节点)` 添加到父级子元素的末尾
* `node.insertBefore(child, 指定元素)` 添加到指定元素的前面

**删除节点**

* `node.removeChild(child)`

**复制节点**

* `node.cloneNode()`

  如果括号为空或者`false`，只复制标签

  如果为true, 标签和内容都会复制





### 操作属性

**获取属性**

* `element.属性` 一般用于获取内置的 id class 等
* `element.getAttribute(属性)` 一般用于获取自定义属性，但是什么样的属性都能获取

**设置属性**

* `element.属性` = '值'
* `element.setAttribute(属性，值)`
* 用法规则与上面相同

**移出属性**

* `removeAttribute(属性)`
* 什么都能移出



### H5 自定义属性

* 规定自定义属性以 `data-` 开头作为属性名并且赋值
* 使用 `element.dataset` 获取自定义属性集合,获取到的自定义属性是不带`data-`的
* 使用 `element.dataset.自定义属性(不带data-)` 或者 `element.dataset['自定义属性']` 进行进一步获取或者进行赋值
* 只能获取到 `data-`开头的自定义属性
* 如果自定义属性有多个`-` 采用驼峰命名
  * `data-list-name` -> `element.dataset.listName`





## new Image()



**`Image()`**函数将会创建一个新的[`HTMLImageElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement)实例。

它的功能等价于 [`document.createElement('img')`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createElement)



### 语法

```
Image(width, height)
```

由于它就相当于一个新的[`HTMLImageElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement)实例。我们可以直接在这个实例上设置 src， 即图片路径





建立图像对象：图像对象名称=new Image([宽度],[高度])

图像对象的属性： border complete height hspace lowsrc name src vspace width

图像对象的事件：onabort onerror onkeydown onkeypress onkeyup onload



- onload: 设置或获取当图片加载完成时触发的事件处理函数
- onerror: 设置或获取当图片加载失败时触发的事件处理函数



完成一个图片预加载函数，并设置一个超时时间，当所有图片在时间内响应，我们就在控制台输出没有成功加载的图片的url，如果不是所有图片都成功响应，我们在控制台输出 err

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <script>
        function preloadImage(imgUrls, timeout) {
            let promises = []
            for (let i = 0 ; i < imgUrls.length ; i++) {
                const promise = new Promise((resolve, reject) => {
                    const img = new Image()
                    img.onload = () => {
                        resolve()
                    }
                    img.onerror = () => {
                        reject(imgUrls[i])
                    }
                    img.src = imgUrls[i]
                })
                promises[i] = promise
            }

            const allPromises = Promise.allSettled(promises)

            const timeoutPromise = new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject('err')
                },timeout)
            })

            return Promise.race([allPromises, timeoutPromise]).then((r) => {
                console.log(r)
                const failUrls = r.filter(p =>  p.status === 'rejected')
                for (let i = 0 ; i < failUrls.length ; i++) {
                    console.log(failUrls.reason)
                }

            }).catch( err => console.log(err))
        }
        preloadImage(['./a.png','./b.png','./c.png'],10)

    </script>
</body>

</html>
```



# BOM

即 浏览器对象模型

* 与浏览器窗口进行交互
* 顶级对象是 `window`

## 浏览器进程问题

浏览器是多进程的，浏览器的每一个 tab 标签都代表一个独立的进程（也不一定，因为多个空白 tab 标签会合并成一个进程），浏览器内核（浏览器渲染进程）属于浏览器多进程中的一种。

浏览器每个进程有多个线程，主要有以下线程

1）GUI 渲染线程

负责渲染页面，解析 HTML，CSS 构成 DOM 树等，当页面重绘或者由于某种操作引起回流都会调起该线程。

GUI 渲染进程 和 JS 引擎线程是互斥的，当 JS 引擎线程在工作的时候，GUI 渲染线程会被挂起，GUI 更新被放入在 JS 任务队列中，等待 JS 引擎线程空闲的时候继续执行。

2）JS 引擎线程

单线程工作，负责解析运行 JavaScript 脚本。

和 GUI 渲染线程互斥，JS 运行耗时过长就会导致页面阻塞。

3）事件触发线程

当事件符合触发条件被触发时，该线程会把对应的事件回调函数添加到任务队列的队尾，等待 JS 引擎处理。

4）定时器触发线程

浏览器定时计数器并不是由 JS 引擎计数的，阻塞会导致计时不准确。 开启定时器触发线程来计时并触发计时，计时完成后会被添加到任务队列中，等待 JS 引擎处理。

5）http 请求线程

http 请求的时候会开启一条请求线程。 请求完成有结果了之后，将请求的回调函数添加到任务队列中，等待 JS 引擎处理。



**Chrome 浏览器的进程**



## window 对象常用事件



**load 事件和 onload 属性**

* `load`事件发生在文档在浏览器窗口加载完毕时。`window.onload`属性可以指定这个事件的回调函数

```js
window.onload = function() {
  var elements = document.getElementsByClassName('example');
  for (var i = 0; i < elements.length; i++) {
    var elt = elements[i];
    // ...
  }
};
```



**URL 统一资源定位符（uniform resource locator）**

是互联网上标准资源的地址

语法： `protool://host[:port]/path/[?query]#fragment`

```markdown
如 http://www.itcast.cn/index.html?name=andy&age=18#link
		* protool 通信协议 http等
		* host 主机（域名） www.baidu.com
		* port  端口号，可选，省略是使用迷人端口
		* path 路径 一般用来表示主机上的一个目录或文件地址
		* query 参数， 以键值对的形式，通过&符分开
		* fragment 片段 #后面内容 常见于链接， 锚点
```



**location 对象**

window提供一个location属性用于获取或设置窗体的URL, 并且可以用于解析URL,返回一个对象

**属性**

 	1. location.href  获取或设置整个URL
 	2. location.host 返回主机（域名）
 	3. location.port 返回端口号 未写则返回空字符串
 	4. location.pathname 返回路径
 	5. location.search 返回参数
 	6. location.hash 返回片段 #后面内容 常见于链接， 锚点



**方法**

 	1. location.assign() 可以重定向页面，记录历史
 	2. location.replace() 替换当前页面，因为不记录历史，不能后退页面
 	3. location.reload() 重新加载页面， 参数为true为强制刷新



**navigator 对象**

* 包含了有关浏览器的信息，常用userAgent，返回由客户机发送服务器的user-agent头部的值，判断用户是在哪个终端（pc,移动）打开页面，实现跳转



**history 对象**

**方法**

```markdown
1. back() 后退
2. forward() 前进
3. go(参数) 前进后退功能， 参数为1 前进一个页面 -1就后退一个页面
```





# 内存

## **相关概念**

* **静态语言**：**在使用之前**就需要确认其变量书记类型的编程语言
* **动态语言**： **运行过程中**需要检查数据类型的编程语言

* **弱类型语言**： 支持**隐式类型转换**（可以偷偷的转换数据类型）的编程语言
* **强类型语言**： 不支持隐式类型转换的编程语言

`JavaScript`的数据类型一共有8种

`Boolean`、`Null`、`Undefined`、`Number`、`BigInt`、`String`、`Symbol` 和 `Object`。

前 7 种称为原始类型（简单数据类型），最后一个对象类型称为引用类型（复杂数据类型）。原始类型与引用类型之间的一个差别就是在**内存中存放的位置**不一样。



## 内存空间

JS 的内存模型可以认为包含了从上到下三个空间： 代码空间、栈空间、堆空间

代码空间存储可执行代码；堆空间存储了**引用类型的数据**；栈空间存储了**原始类型的数据**和引用类型数据的**引用地址**



## 为什么需要堆空间

JavaScript 需要使用 栈空间维护程序执行期间的上下文状态，如果所有的数据都存放在栈空间里面，那么会影响到上下文切换的效率，进而影响到整个程序的执行效率

所以，一般来说， 栈空间主要存放原始类型的小数据，同时存放引用类型的地址； 因为堆空间很大，同时它的操作更加复杂，而引用类型的数据占用的空间都比较大，所以它的数据放在堆中



## 什么是垃圾回收机制

即 `GC` -> `Garbage Collection`

程序工作过程中会产生很多 `垃圾`，这些垃圾是程序不用的内存或者是之前用过了，以后不会再用的内存空间，而 `GC` 就是负责回收垃圾的

## 垃圾的产生

```js
let test = {
    name: 'zzz'
}
text = [1,2,3,4,5]
```

上面代码首先我们声明了一个变量 `test`，它引用了对象 `{name: 'isboyjc'}`，接着我们把这个变量重新赋值了一个数组对象，也就变成了该变量引用了一个数组，那么之前的对象引用关系就没有了，如下图

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a428ca00cb164eeab16e8cbbb603e7d7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)



没有了引用关系，也就是无用的对象，这个时候假如任由它搁置，一个两个还好，多了的话内存也会受不了，所以就需要被清理（回收）



## 垃圾回收机制

* **自动回收**： 内存中的垃圾数据由垃圾回收器进行释放，并不需要手动通过代码来释放。如 JavaScript、Java、Python 等语⾔
* **手动回收**： 何时分配内存、销毁内存都是由代码控制的，C++ 中，如果某段数据已经不再需要了，但是又没有主动调用 `free` 函数来销毁，那么这种情况就被称为**内存泄漏**。



### 栈空间的数据回收方式



在栈空间中有一个记录当前执行状态的指针，称为 ESP。当某一个执行上下文结束的时候，JS 就会将 ESP 移动到下一个执行上下文，整个下移操作就是销毁了上一个执行上下文的过程。

这样上一个执行上下文虽然保存在栈空间当中，但是已经是无效内存了。而当有的数据要保存进来时，这一块内容就会覆盖掉。



### 堆空间的数据回收方式

在栈空间中，旧的执行上下文被移除后，仅仅是从栈空间中被移除了。但是如果这一段执行上下文含有堆空间的地址，那么对应堆空间的内存是不会被直接销毁的。而如果想要回收堆中的垃圾数据，就需要使用 JS 中的垃圾回收器。



**标记清除算法  Mark-Sweep **

整个标记清除算法大致过程就像下面这样

- 垃圾收集器在运行时会给内存中的所有变量都加上一个标记，假设内存中所有对象都是垃圾，全标记为0
- 然后从各个根对象开始遍历，把不是垃圾的节点改成1
- 清理所有标记为0的垃圾，销毁并回收它们所占用的内存空间
- 最后，把所有内存中对象标记修改为0，等待下一轮垃圾回收


优点 ：简单

缺点： 

* **内存碎片化**，空闲内存块是不连续的，容易出现很多空闲内存块，还可能会出现分配所需内存过大的对象时找不到合适的块

* **分配速度慢**，因为即便是使用 `First-fit` 策略，其操作仍是一个 `O(n)` 的操作，最坏情况是每次都要遍历到最后，同时因为碎片化，大对象的分配效率会更慢

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/12247ac3d8f249a5ab85b9b40ba1147b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)



**标记整理算法 Mark-Compact**

它的标记阶段和标记清除算法没有什么不同，只是标记结束后，标记整理算法会将活着的对象（即不需要清理的对象）向内存的一端移动，最后清理掉边界的内存（如下图）

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c04b0a5a40084e0ba4550500c57f2270~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)



## V8 对 GC 的优化

JavaScript V8 引擎将堆空间分为 **新生代** 和 **老生代** 两个区域：**新生代中存放的是生存时间短的对象；老生代中存放的是生存时间久的对象**。

新生区通常只支持 1~8M 的容量，而老生区支持的容量更大。V8 引擎分别使用 **副垃圾回收器** 和 **主垃圾回收器** 分别负责新生代与老生代的垃圾回收。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/abae5b06648a40d2aaa453b5d8a83939~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)



### 副垃圾回收器

副垃圾回收器负责的新生代使用 **Scavenge 算法** 来处理。Scavenge 算法又叫做 **基于 copy 的垃圾回收算法**。**Scavenge** 算法的主要思想如下：

1. 把新生代空间对半划分为两个区域：**对象区域** 与 **空闲区域**。
2. 新加入的对象存放至对象区域，当对象区域快被写满时，就需要执行一次垃圾清理操作。
3. 在垃圾回收过程中，首先按照共同的执行流程对活动对象与非活动对象进行标记。标记结束后，清理非活动对象，同时将活动对象复制到空闲区域。执行结束后，将复制到空闲区域的活动对象有序排列。因此在这个过程中，已经完成了内存整理的操作，复制后空闲区域就没有内存碎片了。
4. 完成复制后，对象区域与空闲区域进行翻转：原来的对象区域变成空闲区域，原来的空闲区域变成对象区域。

经过这一系列步骤后，副垃圾回收器就完成了对新生区的一次垃圾回收

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa2d5ad1d89b4b7b919f20e4a5f8973a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

* **对象晋升策略**： 经过两次新生代垃圾回收依然还存活的对象，将会被移动到老生区中
* 如果复制一个对象到空闲区时，空闲区空间占用超过了 25%，那么这个对象会被直接晋升到老生代空间中



### 主垃圾回收器

使用 **标记-整理算法** 进行垃圾回收

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c04b0a5a40084e0ba4550500c57f2270~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)



### 全停顿 Stop-The-World

JavaScript 是运行在主线程之上的，一旦执行垃圾回收算法，需要将正在执行的 JavaScript 脚本暂停下来，待垃圾回收完毕后再恢复脚本执行。这种行为叫做 **全停顿 Stop-The-World**。

在新生代的垃圾回收中，因其空间较小，且活动对象较少，所以全停顿的影响不大，但老生代就不一样。为了降低老生代的垃圾回收而造成的卡顿，V8 引擎使用了 **增量标记 Incremental Marking 算法**：将标记过程分为一个个的子标记过程，同时让垃圾回收标记与 JavaScript 应用逻辑交替进行，直到标记阶段完成。

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e16d93c2c8414d3ab7eac55c852c678a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

使用增量标记算法，可以把一个完整的垃圾回收任务拆分为很多小的任务，这些小的任务执行时间比较短，可以穿插在其他的 JavaScript 任务中间执行。这样用户就不容易感受到页面的卡顿了。



增量标记的优缺

优：主线程的停顿时间大大减少了，让用户与浏览器交互的过程变得更加流畅

缺： 但是由于每个小的增量标记之间执行了 `JavaScript` 代码，堆中的对象指针可能发生了变化



### 并行回收 Concurrent

它指的是主线程在执行 `JavaScript` 的过程中，辅助线程能够在后台完成执行垃圾回收的操作，辅助线程在执行垃圾回收的时候，主线程也可以自由执行而不会被挂起

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0bae064a3a8e481b8829c9c7aef73a06~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

辅助线程在执行垃圾回收的时候，主线程也可以自由执行而不会被挂起，这是并发的优点，但同样也是并发回收实现的难点，因为它需要考虑主线程在执行 `JavaScript ` 时，堆中的对象引用关系随时都有可能发生变化，这时辅助线程之前做的一些标记或者正在进行的标记就会要有所改变，所以它需要额外实现一些读写锁机制来控制这一点，这里我们不再细说







# AJAX



AJAX 指 **异步 JavaScript 与 XML （Asynchronous JavaScript And XML）**。



指的是通过 JavaScript 的 异步通信，从服务器获取 XML 文档从中提取数据，再更新当前网页的对应部分，而不用刷新整个网页。

尽管 X 在 Ajax 中代表 XML，但由于[JSON](https://developer.mozilla.org/zh-CN/docs/Glossary/JSON)的许多优势，比如更加轻量以及作为 Javascript 的一部分，目前 JSON 的使用比 XML 更加普遍。JSON 和 XML 都被用于在 Ajax 模型中打包信息。



AJAX 是一个技术统称，是一个概念模型，并不特指某一技术，`XMLHttpRequest` 是实现 AJAX 的一种常见方式。

AJAX 可以使网页实现异步更新。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。不使用 AJAX 的传统网页如果需要更新内容，必须重载整个页面。



## 基本使用



1. **创建 XMLHttpRequest 对象**

所有现代浏览器均内建 `XMLHttpRequest` 对象，只需要像创建实例对象一样去创建 `XMLHttpRequest` 实例即可：

```js
const request = new XMLHttpRequest()
```

2. 发送请求

将请求发送到服务器，可以使用 `XMLHttpRequest` 实例的 `open()` 与 `send()` 方法：

- `XMLHttpRequest.prototype.open()`

`open()` 方法接收三个参数：

（1）HTTP 请求方法。可以是 `GET`、`POST` 以及其他服务器支持的方法，但是要注意，这些方法需要保证大写。

（2）目的地的 URL。由于 同源策略 的限制，默认不能向非同源进行请求。

（3）第三个参数是可选参数，设置该请求是否是异步请求。如果为 `true`（默认值），即开启异步。

- `XMLHttpRequest.prototype.send()`

`send()` 方法可以接收一个可选参数，即想要发送给服务器的且服务器可以解析的表单数据。



3. 设置请求头

可以通过 `setRequestHeader()` 方法设置请求头：

如果想要发送 `POST` 数据，那么需要在请求头中设置 `Content-Type` 字段：

```js
request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
```



4. 处理服务器响应

可以在 `XMLHttpRequest` 实例的 `onreadystatechange` 属性设置当请求状态改变时的回调函数：

```js
request.onreadystatechange = function () {}
```

响应函数会在 `XMLHttpRequest` 实例对象属性 `readyState` 发生变化时调用。`readyState` 的具体值与含义如下：

- `0`：请求未初始化；
- `1`：已建立服务器连接；
- `2`：请求已接受；
- `3`：正在处理请求；
- `4`：请求已完成。

除此之外，可以通过 `XMLHttpRequest` 实例对象 `status` 属性检查响应码。

如下：

```js
使用xhr发送get请求

	1. 创建xhr对象
		let xhr = new XMLHttpRequest()
	2. 调用xhr.open() 函数
		xhr.open('GET', 'http://www.liulongbin.top:3006/api/getbooks')
	3. 调用xhr.send() 函数
		
	4. 监听 xhr.onreadystatechange 事件
		xhr.onreadystatechange = function() {
			//监听xhr对象的请求状态readyState 和 与服务器响应的状态status
			if(xhr.readyState === 4 && xhr.status=== xxx)  {
				console.log(xhr.resposeText)
			}
		}

发送post请求
	
	1. 创建xhr对象
		let xhr = new XMLHttpRequest()
	2. 调用xhr.open() 函数
		xhr.open('POST', 'http://www.liulongbin.top:3006/api/getbooks')
	3. 设置 Content-Type属性 （固定写法）
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
	3. 调用xhr.send() 函数   同时将数据以 查询字符串 的形式传入
		xhr.send('bookname=水浒传&author=赎买按&publisher='zzz')
	4. 监听 xhr.onreadystatechange 事件
		xhr.onreadystatechange = function() {
			//监听xhr对象的请求状态readyState 和 与服务器响应的状态status
			if(xhr.readyState === 4 && xhr.status=== xxx)  {
				console.log(xhr.resposeText)
			}
		}
```



具体的，可以使用 `XMLHttpRequest` 实例对象 `responseTest` 或者 `responseXML` 获取响应数据：

- `responseText`：服务器以文本字符的形式返回，可以据此获得字符串形式的响应数据并直接使用：

```js
document.getElementById('div').innerHTML = request.responseText
```

- `responseXML`：服务器以 `XMLDocument` 对象的形式返回，之后可以使用 JavaScript 进行更深的处理：

```js
const xmlDocument = xmlhttp.responseXML
const x = xmlDocument.getElementsByTagName('ARTIST')

let txt = ""

for (let i = 0; i < x.length; i++) {
    txt = txt + x[i].childNodes[0].nodeValue + '<br>'
}

document.getElementById('div').innerHTML = txt
```

xhr level2新特性
	1. 可以设置http请求的时限

​	新增timeout属性，设置http请求时限
​	xhr.timeout = 3000  单位是ms
​	其对应事件	
​	xhr.ontimeout = function(event) {}

2. 使用FormData对象管理表单数据
	
   ```
    let fa = new FormData()
     		 fd.append('zz','zz')
    		  fa.append('pp','pp')
     		  let xhr = new XMLHttpRequest()
	    		  xhr.open('POST','url')
	   		 xhr.send(fd)
	
	也可以获取网页表单的值
		let form = document.querySelector("#form1") 获取表单元素
	  	let fd = new FormData(form)
	  		直接传入该元素就能自动填充
	```
	
3. 可以上传文件
	1. 定义UI结构
		<input type='file'>
	2. 验证是否选择了文件
		获取选择的文件列表
			let files = document.querySelector('#file1').files
	3. 向FormData中传入文件
		let fd = new FormData()
		fd.append('name', files[0])
	4. 使用xhr发起上传文件的请求
		上传文件需要使用post
		xhr.send(fd)

4. 可以获得数据传输的进度信息
	监听 xhr.upload.onprogress

    		xhr.upload.onprogress = function(e) {
    	 		e.lengthComputable 是一个布尔值，表示当前上传资源是否具有可计算的长度
    	 		if(e.lengthComputable) {
    	     		e.loaded 已传输字节
    	     		e.total 需要传输的字节
    	     		let percentComplete = Math.cell( (e.loaded / e.total) * 100)
    			    }
    		}

	xhr.upload.onload 传输完成的函数



# 事件



## EventTarget 接口



DOM 节点的事件操作都定义在 `EventTarget` 中。所有节点对象，以及其他一些需要事件通信的浏览器内置对象继承自 `EventTarget` 的原型，从而可以调用事件接口。

事件接口主要提供三个实例方法：

- `addEventListener()`：绑定事件的监听函数；
- `removeEventListener()`：移除事件的监听函数；
- `dispatchEvent()`：触发事件



### EventTarget.prototype.addEventListener()

`addEventListener()` 方法用于在当前节点或对象上定义一个特定事件的监听函数。一旦这个事件发生，就会执行监听函数。

该方法可以接收三个参数：

- `type`：字符串形式的事件名称；
- `listener`：监听函数，即事件发生时的回调函数；

第二个参数除了可以直接传入函数作为监听函数外，也可以是一个具有 `handleEvent()` 方法的对象，效果与监听函数一样。当事件发生时，会调用该对象的 `handleEvent()` 方法。

监听函数内部的 `this` 指向了触发事件的对象。

- `useCapture`：布尔值，可选参数，默认为 `false`，表示监听函数将在冒泡阶段被触发。如果值为 `true`，表示监听函数将在捕获阶段触发。

如下面一个例子：

```js
function print() {
    console.log(this)
}

const btn = document.getElementById('btn')

btn.addEventListener('click', print, false)
```

上面的代码便是在 id 为 `btn` 的节点上绑定了 `click` 事件，当事件被触发时，会在冒泡阶段打印触发节点的信息。

第三个参数除了是布尔值，还可以是一个监听器配置对象。该对象具有以下属性：

- `capture`：布尔值，如果缺省该属性，则默认为 `false`。`capture` 属性与 `useCapture` 一致。
- `once`：布尔值，如果缺省该属性，则默认为 `false`。如果该属性为 `true`，则表示该监听函数执行一次就会自动移除，后面将不再监听该事件。
- `passive`：布尔值，如果确实该属性，则默认为 `false`。如果该属性为 `true`，则表示禁止监听函数调用 `preventDefault()` 方法。如果 `passive` 为 `true` 并且调用 `preventDefault()` 方法，浏览器将忽略该请求，并在控制台输出一条警告。
- `signal`：该属性为一个 `AbortSignal` 对象，用于在需要时发出信号，移除监听函数。

`addEventListener()` 方法可以为同一个对象同一个事件添加多个 **不同的监听函数**。这些函数按照顺序先添加先触发，顺序触发。如果为同一个对象同一个事件添加多个相同的监听函数，那么当事件发生时只会触发一次。

### EventTarget.prototype.removeEventListener()

`removeEventListener()` 方法用于移除 `addEventListener()` 方法添加的事件监听函数，同样没有返回值。

如果想要移除监听事件，需要让 `removeEventListener()` 的每一个参数，与 `addEventListener()` 完全一样：

```js
btn.addEventListener('click', print, false)
btn.removeEventListener('click', print, false)
```

### EventTarget.prototype.dispatchEvent()

`dispatchEvent()` 方法用于在当前节点上触发指定事件，从而触发监听函数的执行。该方法返回一个布尔值，只要有一个监听函数调用了 `preventDefault()`，则返回值为 `false`，否则为 `true`。

`dispatchEvent()` 方法的参数是一个 [`Event`](https://blog.yucohny.vercel.app/javascript/event) 对象的实例：

```js
btn.addEventListener('click', print, false)

btn.dispatchEvent(new Event('click'))
```

如果 `dispatchEvent()` 方法参数为空，或者不是一个有效的事件对象，将报错。





## 事件模型



### 事件的传播

一个事件发生后，会在子元素与父元素之间传播。这种传播顺序分为三个阶段：

- 捕获阶段：从顶层对象（浏览器中即为 `window` 对象）传导至目标结点；
- 目标阶段：事件在目标节点上触发；
- 冒泡阶段：从目标结点传导回顶层对象。



### 事件的代理（委托）

由于事件会在冒泡阶段向上传播到父节点，所以可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件。这种方法叫做 **事件的代理**。

```js
const ul = document.querySelector('ul')

ul.addEventListener('click', function (event) {
    if (event.target.tagName.toLowerCase() === 'li') {
        // work
    }
});
```

事件的代理好处是，只需要在父节点定义一个监听函数，就可以处理多个子节点的事件，而不用在每个子节点上设置监听函数。并且，如果以后继续添加子节点，父节点的监听函数依然有效。

如果希望事件传播到某个节点为止之后不再传播，可以使用事件对象的 `stopPropagation()` 方法：

```js
// 事件传播到 p 元素后，就不再向下传播了
p.addEventListener('click', function (event) {
    event.stopPropagation()
}, true)

// 事件冒泡到 p 元素后，就不再向上冒泡了
p.addEventListener('click', function (event) {
    event.stopPropagation()
}, false)
```

需要注意的是，`stopPropagation()` 方法只会阻止事件的传播，并不会阻止该事件触发当前节点其他相同事件的监听函数：

```js
p.addEventListener('click', function (event) {
    event.stopPropagation()
    // 会输出
    console.log(1)
})

p.addEventListener('click', function(event) {
    // 会输出
    console.log(2)
})
```



## 事件对象



### 概述

事件发生以后，会产生 `Event` 实例对象作为参数传递给事件监听函数。

`Event` 本身就是一个构造函数，可以用来生成新的实例。

`Event` 构造函数接收两个参数：

- `type`：事件的名称；
- options：一个对象，表示事件对象的配置。该对象主要有下面两个属性：
  - `bubbles`：布尔值，可选，默认为 `false`，表示该事件是否会执行冒泡阶段。`Event` 构造函数生成的事件实例会在捕获阶段触发。
  - `cancelable`：布尔值，可选，默认为 `false`，表示事件是否可以通过 `Event.preventDefault()` 取消。

```js
const fu = document.getElementById('div')

const p = document.getElementById('p')

fu.addEventListener('click', callback)

const event = new Event('click')

p.dispatchEvent(event)
```

首先在父节点上绑定了冒泡阶段会触发的点击事件，但是由于儿子节点触发的点击事件不会进入冒泡阶段，因此父结点上设置的点击监听事件不会触发。如果div的事件监听变成捕获阶段触发（`'click', callback, true`），儿子节点的事件就会触发, 或者这样`new Event('click', {bubbles: true})`





### **实例属性**





**bubbles**

`bubbles` 属性为布尔值，表示该事件是否会执行冒泡阶段。该属性只读，除非显式在构造函数中显式指定 `bubbles: true`，否则默认为 `true`。



**eventPhase**

`eventPhase` 属性为整数常量，表示事件当前所处阶段。该属性只读。

`eventPhase` 值为以下四种中的一种：

- `0`：事件没有发生；
- `1`：事件处于捕获阶段；
- `2`：事件处于目标阶段，即目标节点；
- `3`：事件处于冒泡阶段。



**cancelable**

`cancelable` 为布尔值，表示事件是否可以取消。该属性只读，除非显式在构造函数中显式指定 `cancelable: true`，否则默认为 `true`。



**cancelBubble**

`cancelBubble` 为布尔值，如果设为 `true`，相当于执行 `Event.stopPropagation()`，即阻止事件的传播。



**defaultPrevented**

`defaultPrevented` 为布尔值，表示该事件是否调用过 `Event.preventDefault` 方法。该属性只读。



**target 与 currentTarget**

事件发生后，会在捕获阶段与冒泡阶段经过多个 DOM 节点。因此，任何事件都有两个与事件相关的节点，一个是事件的原始触发节点 `target`，另一个是事件当前正在通过的节点 `currentTarget`。

`target` 通常是 `currentTarget` 的后代节点。

由于监听函数只有事件经过时才会触发，所以 `currentTarget` 总是等同于监听函数内部的 `this`。



**type**

`type` 属性为字符串，表示事件类型。该属性只读。



**timeStamp**

`timeStamp` 属性为网页加载成功至事件触发的毫秒时间间隔。

`timeStamp` 可能是整数，也可能是小数，取决于浏览器的设置。



**isTrusted**

`isTrusted` 属性为布尔值，表示该事件是否由用户行为产生：

```js
const event = new Event('click')

console.log(event.isTrusted)

// false
```

### 实例方法

**preventDefault**()

`preventDefault()` 方法用于取消浏览器对当前事件的默认行为。比如点击链接后，浏览器默认会跳转到另一个页面，使用这个方法以后，就不会跳转了。

该方法生效的前提是事件实例的 `cancelable` 为 `true`，如果为 `false`，那么调用该方法没有任何效果。

该方法只是取消事件对当前元素的默认影响，不会阻止事件的传播。如果要阻止传播，需要使用 `stopPropagation()` 或 `stopImmediatePropagation()` 方法。



**stopPropagation**()

`stopPropagation()` 方法阻止事件继续传播或冒泡，即防止再触发定义在别的节点上的监听函数，但是不包括在当前节点上其他的事件监听函数。



**stopImmediatePropagation**()

`stopImmediatePropagation()` 方法阻止同一个事件的所有监听函数被调用。



**composedPath**()

`composedPath()` 返回一个数组，数组成员依次是事件冒泡从下往上会经过的所有节点：

```js
// <div id='div'>
//     <button id='btn'>
// 	       Click
// 	   </button>
// </div>

const btn = document.getElementById('btn')

btn.addEventListener('click', function (event) {
    console.log(event.composedPath())
})

// (6) [button#btn, div#div, body, html, document, Window]
```





# 代理

ES6 新增的代理和反射为开发者提供了拦截并向基本操作嵌入额外行为的能力。具体来讲，我们可以给目标对象定义一个关联的代理对象，而这个代理对象可以作为抽象的目标对象来使用；在对目标对象的各种操作直接影响目标对象之前，可以在代理对象中对这些操作加以控制。



## 创建空代理

即除了作为一个抽象的目标对象，没有其他的特别功能，在默认情况下，在代理对象上执行的所有操作都会无障碍地传播到目标对象

代理是使用 Proxy 构造函数创建的。这个构造函数接收两个**必要**参数：目标对象和处理程序对象。对于空代理的处理程序对象，我们只需要传递一个简单的对象字面量即可。

空代理对象上执行的操作都会应用到目标对象：

```js
const target = {
    id: 'target'
}

const proxy = new Proxy(target, {})

console.log(target.id) // target
console.log(proxy.id) // target

target.one = 'one'
console.log(target.one) // one
console.log(proxy.one) // one

proxy.two = 'two'
console.log(target.two) // two
console.log(proxy.two) // two

console.log(target.hasOwnProperty('id')) // true
console.log(proxy.hasOwnProperty('id')) // true
```

* Proxy.prototype 为 undefined， 所有不能使用 instanceof 操作符



## 捕获器



捕获器就是在处理程序对象中定义的“基本操作的拦截器”。

每次在代理对象上调用这些基本操作时，代理可以在这些操作传播到目标对象之前先调用捕获器函数，从而拦截并修改对应的行为。

如同下面的例子，我们定义了一个 get() 捕获器，那么在代理对象中执行 get() 操作时，就会触发定义的 get() 捕获器。注意，只有在代理对象上执行这些操作才会触发捕获器，在目标对象上执行这些操作仍然会产生正常的行为：

```js
const target = {
    id: 'target'
}

const trap = {
    get() {
        return 'this action is modified by proxy'
    }
}

const proxy = new Proxy(target, trap)

console.log(target.id) // target
console.log(proxy.id) // this action is modified by proxy
```

​	

## 捕获器的参数与 Reflect 对象



**参数**

使用捕获器都可以访问相应的参数，基于这些参数可以重建被捕获方法的原始行为。不同的捕获器可能存在不同的参数，get() 中存在三个参数：依次为目标对象、要查询的属性和代理对象。

```js
const target = {
    id: 'target'
}

const trap = {
    get(targetObj, property, proxyObj) {
        console.log(target === targetObj)
        console.log(property)
        console.log(proxy === proxyObj)
    }
}

const proxy = new Proxy(target, trap)

proxy.id
// true
// id
// true
```

**Reflect**
所有捕获器都可以基于上面的这三个参数来重建原始参数，但是更多的捕获器函数并不都像上面的例子这么简单，因此，总是手写是不实际的。而事实上，开发者不需要手动重建原始行为，而是可以通过调用封装了原始行为的全局 Reflect 对象上的同名方法来重建：

```js
const target = {
    id: 'target'
}

const trap = {
    get() {
        return Reflect.get(...arguments)
    }
}

// 当然，也可以这样定义：
// const trap = {
//     get: Reflect.get
// }

const proxy = new Proxy(target, trap)

console.log(target.id) // target
console.log(proxy.id) // target
```



`Reflect` 对象共有 13 个静态方法，下面介绍两种

1. Reflect.get(target, name, receiver)

`Reflect.get`方法查找并返回`target`对象的`name`属性，如果没有该属性，则返回`undefined`。

```js
var myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  },
}

Reflect.get(myObject, 'foo') // 1
Reflect.get(myObject, 'bar') // 2
Reflect.get(myObject, 'baz') // 3
```

如果`name`属性部署了读取函数（getter），则读取函数的`this`绑定`receiver`。

```js
var myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar;
  },
};

var myReceiverObject = {
  foo: 4,
  bar: 4,
};

Reflect.get(myObject, 'baz', myReceiverObject) // 8
```



2. Reflect.set(target, name, value, receiver)

`Reflect.set`方法设置`target`对象的`name`属性等于`value`。

```
var myObject = {
  foo: 1,
  set bar(value) {
    return this.foo = value;
  },
}

myObject.foo // 1

Reflect.set(myObject, 'foo', 2);
myObject.foo // 2

Reflect.set(myObject, 'bar', 3)
myObject.foo // 3
```

如果`name`属性设置了赋值函数，则赋值函数的`this`绑定`receiver`。

```js
var myObject = {
  foo: 4,
  set bar(value) {
    return this.foo = value;
  },
};

var myReceiverObject = {
  foo: 0,
};

Reflect.set(myObject, 'bar', 1, myReceiverObject);
myObject.foo // 4
myReceiverObject.foo // 1
```



# 模块

## 概述

模块模式的思想是：将代码逻辑分成独立模块，按照各自的内容进行封装，每个模块自行决定向外暴露什么内容，同时自行引入执行其他模块。

在 ES6 发布模块规范之前，不同的模块系统具有各自的模块语法，同时具有单独的模块工具将自己的模块语法与 JavaScript Runtime 连接。



## CommonJS

CommonJS 规范创建了 **服务端的模块约定**。尽管 CommonJS 也可用于定义在浏览器中使用的模块依赖，但是 CommonJS 模块语法**不能在浏览器中直接运行**。

> Node.js 使用了轻微修改版本的 CommonJS 规范。

CommonJS 规范使用 `require()` 方法导入模块依赖：

```js
const demo = require('./demo')
```

CommonJS 规范使用 `module.exports` 对象暴露公共 API：

```js
module.exports = {
    name: 'Yucohny'
}
```

特别地，如果想要暴露一个具体值，那么可以直接赋值：

```js
module.exports = 'Yucohny'
```

在 CommonJS 中，模块第一次加载后会进行缓存，后续加载将会取得缓存的模块。同时，CommonJS 模块的加载顺序由依赖关系决定。

在 CommonJS 中，模块加载是模块系统执行的同步操作，因此 `require()` 方法可以以编程式嵌入在模块代码中：

```js
if (condition) {
    const demo = require('./demo')
}
```



## AMD

**异步模块定义 Asynchronous Module Definition AMD** 的模块系统以浏览器为目标执行环境，因此需要考虑网络延迟问题。

AMD 的一般策略是让模块声明自己的依赖，而运行在浏览器中的模块系统会按需获取依赖，并在依赖加载完成后立即执行依赖它们的模块。

AMD 规范的核心是使用函数包装模块定义，这样做有几点优势：

1. 由于函数作用域的存在，**不会声明全局变量**；
2. **允许加载器库控制何时加载模块**。
3. 由于包装函数内部的所有模块代码使用的都是原生 JavaScript 结构，因此更加易于模块代码的移植。

AMD 支持 `require` 与 `exports` 对象，通过它们可以在 AMD 模块工厂函数内部定义 CommonJS 风格的模块。但 AMD 加载器会将它们识别为 AMD 结构，而不是模块定义。

## ES6



### 模块标签

带有 `type="module"` 属性的 `<script>` 标签会告诉浏览器相关代码应该作为模块执行，而不是作为传统的脚本执行。

模块可以直接嵌入在网页中，也可以作为外部文件引入：

```js
<script type="module"></script>
<script type="module" src="MODULEURL"></script>
```

与 `<script defer>` 加载的脚本一样，引入的模块会立即下载模块文件，但执行会延迟至文档解析完成。

值得注意的是，嵌入的模块代码不能使用 `import` 加载到其他模块；只有通过外部文件加载的模块代码才可以使用 `import` 加载，因此，嵌入模块只时候作为入口模块。



### 模块行为

ES6 新增的模块功能借用了 CommonJS 与 AMD 的许多优秀特性，包括：

1. 模块代码只在加载后执行；
2. 模块只能加载一次；
3. 模块可以定义公共接口，其他模块可以基于这个公共接口观察和交互；
4. ……

同时，ES6 的模块系统也增加了一些新行为：

1. ES6 模块默认在严格模式下执行；
2. ES6 模块不共享全局命名空间；
3. ES6 模块顶级 `this` 的值是 `undefined`，而常规脚本中是 `window`；
4. ……

浏览器运行时在知道应该把某个文件当成模块时，会有条件地按照 ES6 模块的行为添加限制。与 `<script type="module">` 关联或者通过 `import` 语句加载的 JavaScript 文件会被认定为模块。



### 模块导出

ES6 模块通过 `export` 关键字实现两种导出方式：命名导出与默认导出。不同的导出方式对应了不同的导入方式。

**命名导出（按需导出）**

`export` 关键字用于声明一个值为命名导出。要注意的是，导出语句不能嵌套于某个块中：

```js
export xxx // 允许
if (condition) {
    export xxx // 不允许
}
```

如果想要将某个变量导出，可以使用行内命名导出，或者变量声明于导出不在同一行。

行内命名导出，指的是变量声明与变量导出写于同一行：

```js
export const name = "Yucohny"
```

但是也可以不在同一行：

```js
const name = "Yucohny"
export { name }
```

如果想要在导出时为变量提供别名，那可以且仅能通过 `export` 表达式中大括号的 `as` 标识符：

```js
const name = "Yucohny"
export { name as myName }
```

**默认导出**

**默认导出 Default Export** 将模块直接视为被导出的值。

默认导出使用 `default` 关键字将一个变量的值声明为默认导出。

```
const name = "Yucohny"
export default name
```

要注意的是，一个模块只能有一个默认导出，重复的默认导出会出现 `SyntaxError` 错误。

由于 `default` 是默认导出关键字，因此如果在命名语法中出现 `default` 关键字，那么会将其视为默认导出：

```js
const name = "Yucohny"
export { name as default }
// 等同于
export default name
```

命名导出与默认导出不会产生冲突，因此可以在同一个模块中同时定义这两种导出：

```js
const name = "Yucohny"
const age = 20
export { name as default, age }
```

### 模块导入

模块使用 `import` 关键字导入其他模块导出的值。与 `export` 一样，`import` 语句不能出现在块中。



`import` 后面跟导入的模块路径，这个路径必须是直接给出，不能是动态计算的结果，比如不支持字符串拼接。



命名导出可以使用 `*` 批量获取并赋值给保存导出对象的别名：

```js
const name = "Yucohny"
const age = 20
export { name, age }
import * as demo from './demo.js'
console.log(demo.name)
console.log(demo.age)
```

如果想要指定部分导入，那么直接将需要导入的属性指定于 `import` 语句中：

```js
import { name, age as myAge } from './demo.js'
```

默认导出可以使用 `default` 关键字并提供 **别名** 实现导入：

```js
import { default as myAge } from './demo.js'
```

也可以不使用 `default` 关键字与大括号，但是此时导入的变量名就固定为导出时的变量名：
```js
import age from './demo.js'
```

如果模块同时使用了命名导出与默认导出，那么可以在 `import` 语句中同时获得它们：

```js
const name = "Yucohny"
const age = 20
export { name as default, age }
import name, { age as myAge } from './demo.js'
```



# Babel

Babel 是一个 JavaScript **编译器**
Babel 是一个**工具链**，主要用于将 [ECMAScript](https://so.csdn.net/so/search?q=ECMAScript&spm=1001.2101.3001.7020) 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。下



## 配置 .babelrc

该文件放在项目得根目录下，使用babel 首先就要配置该文件

该文件用来设置转码规则和插件

```js
{
  "presets": [],
  "plugins": []
}
```



presets 设定转码规则，官方提供以下字符集，可以根据需要进行安装。

```md
# 最新的转码规则
npm install --save-dev babel-preset-latest
# react 转码规则
npm install --save-dev babel-preset-react
# 不同阶段语法提案的转码规则（共四个阶段），选装一个即可
npm install --save-dev babel-preset-stage-0
npm install --save-dev babel-preset-stage-1
npm install --save-dev babel-preset-stage-2
npm install --save-dev babel-preset-stage-3
```

随后修改配置如下：

```js
{
  "presets": ["latest", "react", "stage-3"],
  "plugins": []
}
```



## 命令行转码 babel-cli



全局安装：

```
npm install -g babel-cli
```

随后在当前项目中进行安装：

```
npm install --save-dev babel-cli
```

并修改 package.json 的配置：

```json
{
  "devDependencies": {
    "babel-cli": "^6.26.0"
  },
  "scripts": {
    "build": "babel src -d lib"
  }
}
```

基本用法如下

```md
# 转码结果输出到标准输出（即在控制台打印）
babel data.js 

# 转码结果输出到一个文件，用 --out-file 或 -o 参数指定目录输出文件
babel data.js --out-file built.js
babel data.js -o built.js

# 将整个目录转码，用 --out-dir 或 -d 参数指定目录
# -s 参数生成 source-map 文件
```



实例

old.js

```js
const add = item => item + 1
console.log(add(3))
```



```js
babel old.js -o new.js
```

new.js

```js
"use strict";

var add = function add(item) {
  return item + 1;
};
console.log(add(3));

```



## babel-node

babel-node是一个由Babel提供的命令行工具，它可以在Node.js环境下直接运行ES6/ES7代码。与传统的Node.js相比，babel-node可以直接运行ES6/ES7代码，而无需使用Babel先将代码转换成ES5。它的实现方式是使用Babel进行实时转码，并且会将所有的require引入的模块也进行实时转码。

babel-cli 自带了 babel-node 命令，提供了一个支持 ES6 的 REPL 环境。它支持 Node 的 REPL 环境的所有功能，且可以直接运行 ES6 代码。

直接执行 babel-node 命令就可以进入 REPL 环境。



```js
$ babel-node
> (x => x * 2)(3)
6
```

babel-node 命令可以直接运行 ES6 脚本，如下：

```js
babel-node data.js
```

将 babel-node 安装在项目中，然后修改配置如下：



## babel-register



babel-register是一个由Babel提供的Node.js模块，它可以在运行Node.js应用程序时，将ES6/ES7代码实时转换成ES5代码。使用babel-register，可以在运行时无需手动对代码进行转换，而且可以使开发者使用ES6/ES7的新特性进行开发，并且无需担心浏览器或Node.js版本的兼容性问题。

babel-register的工作原理是通过重写Node.js的require()方法，使其能够在运行时将ES6/ES7代码实时转换成ES5代码。当使用require()加载一个文件时，babel-register会检查该文件是否需要进行转码，如果需要，则会使用Babel将该文件转换成ES5代码并返回。这样，在应用程序运行期间，所有加载的ES6/ES7代码都会被实时转码成ES5代码，从而保证了代码的兼容性。



babel-register 模块改写了 require 命令，为它加上了一个钩子。此后，每当使用 require 加载后缀为 .js、.jsx、.es 和 .es6 文件时，就会首先用 Babel 进行转码。

注意，我们首先需要加载 babel-register：

```js
require('babel-register')
```

>babel-register 只会对 require 命令加载的文件进行转码，而不会对当前文件进行转码。由于 babel-register 是实时转码，所以只适合在开发环境中使用。





## babel-core



如果某些代码需要调用 Babel 的 API 进行转码，则需要使用 babel-core 模块：

```js
const babel = require('babel-core')
```

- 字符串转码

```js
babel.transform('es6code', options)
```

- 文件异步转码

```js
babel.transformFile('file.js', options, function(err, result) {
    
})
```

- 文件同步转码

```js
babel.transformFileSync('file.js', options, function(err, result) {
    
})
```

- AST 转码

```js
babel.transformFromAST(ast, options, function(err, result) {
    
})
```

如下示例：

```js
var es6Code = 'let x = n => n + 1'
var es5Code = require('babel-core')
			.transform(es6Code, {
                		presets: ['latest']
            	    })
			.code
```



## babel-polyfill

Babel 默认只转换新的 JS 句法，而不转换新的 API，比如 Proxy、Promise 等全局对象，以及一些定义在全局对象上的方法（如 Object.assign）都不会转码。

而如果想要全部转码，就需要 babel-polyfill 为当前环境提供一个垫片。

如果要使用，在脚本头部引入库：

```js
import 'babel-polyfill'
// 或者
require('babel-polyfill')
```



Babel 默认不转码的 API 很多，详细清单可以查看 babel-plugin-transform-runtime 模块的 definitions.js 文件。



## 转码步骤

1. 解析：将输入的ES6/ES7代码解析成抽象语法树（AST），以便于下一步的处理。

2. 转换：遍历抽象语法树，将其中的ES6/ES7代码转换成ES5代码。这一步转换可能包括以下几个方面：

   - 语法转换：将ES6/ES7语法转换成ES5语法，例如箭头函数、let/const关键字等。

   - 代码转换：将ES6/ES7新的API或者语言特性转换成ES5的等价代码，例如Promise、Generator、async/await等。

   - 附加功能：Babel还支持许多插件来提供一些附加功能，例如自动添加polyfills、语法检查等。

3. 生成：将转换后的AST重新生成代码，并输出到文件系统或者内存中。





# JSON

JSON 是一种基于文本的轻量级的数据交换格式。它可以被任何的编程语言读取和作为数据格式来传递。

每个 JSON 对象就是一个值，可能是一个数组或对象，也可能是一个原始类型的值。总之，只能是一个值，不能是两个或者多个值。

JSON 中值的类型和格式有下列规定：

1. 复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象。
2. 原始类型的值只有四种：字符串、数值（必须以十进制表示）、布尔值和 null（不能使用 NaN, Infinity, -Infinity 和 undefined）。
3. 字符串必须使用双引号表示，不能使用单引号。
4. 对象的键名必须放在双引号里面。
5. 数组或对象最后一个成员的后面，不能加逗号。



JSON.stringify 函数，通过传入一个符合 JSON 格式的数据结构，将其转换为一个 JSON 字符串。如果传入的数据结构不符合 JSON 格式，那么在序列化的时候会对这些值进行对应的特殊处理，使其符合规范。在前端向后端发送数据时，可以调用这个函数将数据对象转化为 JSON 格式的字符串。

JSON.parse() 函数，这个函数用来将 JSON 格式的字符串转换为一个 js 数据结构，如果传入的字符串不是标准的 JSON 格式的字符串的话，将会抛出错误。当从后端接收到 JSON 格式的字符串时，可以通过这个方法来将其解析为一个 js 数据结构，以此来进行数据的访问。





















