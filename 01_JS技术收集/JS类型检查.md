## JS类型检查

检测数据类型在工程中经常用到，常见的JS类型检测有三种方法：

1. `typeof`
2. `instanceof`
3. `Object.prototype.toString`

那么在实际的操作中，我们应该如何选择使用呢？每种方法都是可以的嘛？

## `typeof`检测基本类型

### 为什么说`typeof`是基本类型检测？

1）`typeof`对于`string`、`number`、`boolean` 这三种类型（经常用到的基本类型）检测是正确的。
2）对于`undefined`返回`undefined`
3）对于`null`返回`object`，`null`本身就是指空指针对象

### 如果用`typeof`检查引用类型呢？

1）对于**函数对象**类型检测，会返回`function`
2）对于**其他的对象**进行检测，返回`object`

### 应该注意的地方

针对经常出现的来说
1）null => object
2）Array => object

所以在确认只可能返回`string`、`number`、`boolean` 、`undefined` 这四种类型的情况下，`typeof`检测类型的方法是可以选的。

### `typeof` 实现原理

`js` 在底层存储变量的时候，会在变量的机器码的低位1-3位存储其类型信息：

000：对象
010：浮点数
100：字符串
110：布尔
1：整数

但是，对于 `undefined` 和 `null` 来说，这两个值的信息存储是有点特殊的。
`null`：所有机器码均为0
`undefined`：用 −2^30 整数来表示
所以，`typeof` 在判断 `null` 的时候就出现问题了，由于 `null` 的所有机器码均为0，因此直接被当做了对象来看待。

## `instanceof`检测引用类型

### 首先要弄懂 `instanceof`的用法

1）语法：首先左侧是一个对象，例如 数组、函数、普通对象等；右侧是一个构造函数，例如 Array Function Object

2）描述：这句话很重要--`instanceof` 检测的是 `constructor.proptotype` 是否存在于 **object的原型链上**。

### 使用`instanceof`方法进行JS类型检测的内容

1）`instanceof`对于Object Array Function 这样的引用类型检测是完全没有问题的
2）不支持基本类型的检测
3）`undefined` `null`检测都是不支持的
4）因为检测的是原型链，所以`[ ] instanceof Object` 这样宽松的检查也是返回true

### 总结

`instanceof` 完全适用于检测Object Array Function 这样的引用类型，不支持基本类型检测。

## `Object.prototype.toString`更好的检测方法

我们可以利用`Object`原型上的`toString`方法来做更多的事情。
为什么说`Object.prototype.toString` 是更好的检测方法？上面的两种方法要么是只能检测基本类型，要么是只能检测引用类型，还存在undefined null不支持检测的情况。有没有一种万能检测的方法可以准确的检测呢？

代码中经常这么用：

```js
function getDataType(data){
    const typeString = Object.prototype.toString.call(data);
    const type = typeString.slice(8);
    return type;
}
```

## 后记

现在检测类型的方法有很多了，例如，用来检测数组类型的`Array.isArray()`已经很常用了。大家根据实际情况来进行选择使用。
