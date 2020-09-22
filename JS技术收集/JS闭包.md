# 概念

## 什么是闭包？

**闭包指的是：能够访问另一个函数作用域的变量的函数**。

清晰的讲：闭包就是一个函数，这个函数能够访问其他函数的作用域中的变量。

```js
function outer() {
     var a = '变量1';
     var inner = function () {
     	console.info(a);
     }
    return inner;    // inner 就是一个闭包函数，因为他能够访问到outer函数的作用域
}
```

很多人会搞不懂匿名函数与闭包的关系，实际上，闭包是站在作用域的角度上来定义的，因为`inner`访问到`outer`作用域的变量，所以`inner`就是一个闭包函

数。虽然定义很简单，但是有很多坑点，比如`this`指向、变量的作用域，稍微不注意可能就造成内存泄露。

## **为什么闭包函数能够访问其他函数的作用域** ?

从堆栈的角度看待js函数：

基本变量的值一般都是存在栈内存中，而对象类型的变量的值存储在堆内存中，栈内存存储对应空间地址。基本的数据类型: Number 、Boolean、Undefined、

String、Null。

```js
var  a = 1   //a是一个基本类型
var  b = {m: 20 }   //b是一个对象
```

当我们执行 `b={m:30}`时，堆内存就有新的对象`{m：30}`，栈内存的b指向新的空间地址( 指向`{m：30}` )，而堆内存中原来的`{m：20}`就会被程序引擎垃圾回收

掉，节约内存空间。我们知道js函数也是对象，它也是在堆与栈内存中存储的，我们来看一下转化：

```js
var a = 1;
function fn(){
    var b = 2
    function fn1(){
        console.log(b)
    }
    fn1()
}
fn()
```

栈是一种先进后出的数据结构：

1、在执行`fn`前，此时我们在全局执行环境(浏览器就是`window`作用域)，全局作用域里有个变量`a`；

2、进入`fn`，此时栈内存就会`push`一个`fn`的执行环境，这个环境里有变量`b`和函数对象`fn1`，这里可以访问自身执行环境和全局执行环境所定义的变量；

3、进入`fn1`，此时栈内存就会`push` 一个`fn1`的执行环境，这里面没有定义其他变量，但是我们可以访问到`fn`和全局执行环境里面的变量，因为程序在访问变量

时，是向底层栈一个个找，如果找到全局执行环境里都没有对应变量，则程序抛出`underfined`的错误；

4、随着`fn1()`执行完毕，`fn1`的执行环境被杯销毁，接着执行完`fn()`，`fn`的执行环境也会被销毁，只剩全局的执行环境下，现在没有`b`变量，和`fn1`函数对象

了，只有`a` 和 `fn`(函数声明作用域是`window`下)。

在函数内访问某个变量是根据函数作用域链来判断变量是否存在的，而函数作用域链是程序根据函数所在的执行环境栈来初始化的，所以上面的例子，我们在`fn1`

里面打印变量`b`，根据`fn1`的作用域链的找到对应`fn`执行环境下的变量`b`。所以当程序在调用某个函数时，做了一下的工作：准备执行环境，初始函数作用域链

和`arguments`参数对象。

我们现在看回最初的例子`outer`与`inner`

```js
function outer() {
     var  a = '变量1'
     var  inner = function () {
            console.info(a)
     }
    return inner    // inner 就是一个闭包函数，因为他能够访问到outer函数的作用域
}
var  inner = outer()   // 获得inner闭包函数
inner()   //"变量1"
```

当程序执行完`var inner = outer()`，其实`outer`的执行环境并没有被销毁，因为他里面的变量`a`仍然被被`inner`的函数作用域链所引用，当程序执行完

`inner(),` 这时候，`inner`和`outer`的执行环境才会被销毁调；《JavaScript高级编程》书中建议：由于闭包会携带包含它的函数的作用域，因为会比其他函数

占用更多内容，过度使用闭包，会导致内存占用过多。

# 闭包用途

1、读取函数内部的变量

2、让这些变量的值始终保持在内存中。不会再`outer`调用后被自动清除。

3、方便调用上下文的局部变量。利于代码封装。

原因：`outer`是`inner`的父函数，`inner`被赋给了一个全局变量，`inner`始终存在内存中，`inner`的存在依赖`outer`，因此`outer`也始终存在内存中，不会在

调用结束后，被垃圾回收机制回收。

# 闭包应用之坑

## 引用的变量可能发生变化

```js
function outer() {
      var result = [];
      for (var i = 0;i<10;i++){
        result[i] = function () {
            console.info(i);
        }
     }
     return result;
}
var rt = outer();
rt.forEach((r) => r());
```

```
10
10
10
10
10
10
10
10
10
10
```

看样子`result`每个闭包函数对打印对应数字，1,2,3,4,...,10，实际不是，因为每个闭包函数访问变量`i`是`outer`执行环境下的变量`i`，随着循环的结束，`i`已经变成10了，所以执行每个闭包函数，结果打印10， 10， ..., 10，怎么解决这个问题呢？

```js
function outer() {
      var result = [];
      for (var i = 0; i<10;i++){
        result[i] = (function (num) {
             return function() {
                   console.info(num);   // 此时访问的num，是上层函数执行环境的num，数组有10个函数对象，每个对象的执行环境下的number都不一样
             }
        })(i);
     }
     return result;
}
var rt = outer();
rt.forEach((r) => r());
```

```
0 
1 
2 
3 
4 
5 
6 
7 
8 
9 
```

##  this指向问题

```js
var object = {
     name: "object",
     getName: function() {
        return function() {
             console.info(this.name);
        }
    }
}
object.getName()();
```

```
underfined
```

因为里面的闭包函数是在window作用域下执行的，也就是说，`this`指向`windows`，怎么解决这个问题呢？

```js
var object = {
     name: "object",
     getName: function() {
     	var _self = this;
        return function() {
             console.info(_self.name);
        }
    }
}
object.getName()();
```

```
object
```

## 内存泄露问题

```js
function  showId() {
    var el = document.getElementById("app");
    el.onclick = function(){
      alert(el.id);   // 这样会导致闭包引用外层的el，当执行完showId后，el无法释放
    }
}
```

这样会导致闭包引用外层的`el`，当执行完`showId`后，`el`无法释放，怎么解决这个问题呢？

```js
function  showId() {
    var el = document.getElementById("app");
    var id  = el.id;
    el.onclick = function(){
      alert(id);
    }
    el = null;    // 主动释放el
}
```

# 闭包应用场景

## 用闭包解决递归调用问题

```js
function  factorial(num) {
   if(num<= 1) {
       return 1;
   } else {
      return num * factorial(num-1);
   }
}
var anotherFactorial = factorial;
factorial = null;
anotherFactorial(4);   // 报错 
```

因为最好是`return num * arguments.callee(num-1)`，`arguments.callee`指向当前执行函数，但是在严格模式下不能使用该属性，也会报错，所以借助闭包

来实现

```js
// 使用闭包实现递归
var newFactorial = (function f(num){
    if(num<1) {
        return 1;
    }
    else {
       return num * f(num-1);
    }
}) //这样就没有问题了，实际上起作用的是闭包函数f，而不是外面的函数newFactorial
```

## 用闭包模仿块级作用域

es6没出来之前，用`var`定义变量存在变量提升问题

```js
for(var i=0;i<10; i++){
    console.info(i);
}
console.log(i);
```

```
10
```

 变量`i`提升

为了避免i的提升可以这样做

```js
(function () {
    for(var i=0; i<10;i++){
         console.info(i)
    }
})();
console.log(i);
```

```
underfined 
```

因为`i`随着函数的退出，执行环境销毁，变量回收

当然现在大多用es6的`let` 和`const` 定义。

## `setTimeout`

原生的`setTimeout`传递的第一个函数不能带参数

```js
setTimeout(function(param){
    alert(param)
},1000)

```

通过闭包可以实现传参效果

```js
function func(param){
    return function(){
        alert(param)
    }
}
var f1 = func(1);
setTimeout(f1,1000);
```

## 封装变量

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>闭包模拟私有方法</title>
    <link rel="stylesheet" href="">
</head>
<body>
<script>
    //用闭包定义能访问私有函数和私有变量的公有函数。
    var counter = (function(){
        var privateCounter = 0; //私有变量
        function change(val){
            privateCounter += val;
        }
        return {
            increment: function(){   //三个闭包共享一个词法环境
                change(1);
            },
            decrement: function(){
                change(-1);
            },
            value: function(){
                return privateCounter;
            }
        };
    })();

    console.log(counter.value());//0
    counter.increment();
    counter.increment();//2
    //共享的环境创建在一个匿名函数体内，立即执行。
    //环境中有一个局部变量一个局部函数，通过匿名函数返回的对象的三个公共函数访问。

</script>
</body>
</html>
```

## 为节点循环绑定click事件

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <link rel="stylesheet" href="">
</head>
<body>

    <p id="info">123</p>
    <p>E-mail: <input type="text" id="email" name="email"></p>
    <p>Name: <input type="text" id="name" name="name"></p>
    <p>Age: <input type="text" id="age" name="age"></p>

<script>
    function showContent(content){
        document.getElementById('info').innerHTML = content;
    };

    function setContent(){
        var infoArr = [
            {'id':'email','content':'your email address'},
            {'id':'name','content':'your name'},
            {'id':'age','content':'your age'}
        ];
        for (var i = 0; i < infoArr.length; i++) {
            var item = infoArr[i];
            document.getElementById(item.id).onfocus = function(){
                showContent(item.content)
            }
        }
    }
    setContent()
    //循环中创建了三个闭包，他们使用了相同的词法环境item，item.content是变化的变量
    //当onfocus执行时，item.content才确定，此时循环已经结束，三个闭包共享的item已经指向数组最后一项。



    /**
     * 解决方法1     通过函数工厂，则函数为每一个回调都创建一个新的词法环境
     */
    function showContent(content){
        document.getElementById('info').innerHTML = content;
    };

    function callBack(content){
        return function(){
            showContent(content)
        }
    };

    function setContent(){
        var infoArr = [
            {'id':'email','content':'your email address'},
            {'id':'name','content':'your name'},
            {'id':'age','content':'your age'}
        ];
        for (var i = 0; i < infoArr.length; i++) {
            var item = infoArr[i];
            document.getElementById(item.id).onfocus = callBack(item.content)
        }
    }
    setContent()

    /**
     * 解决方法2        绑定事件放在立即执行函数中
     */
    function showContent(content){
        document.getElementById('info').innerHTML = content;
    };

    function setContent(){
        var infoArr = [
            {'id':'email','content':'your email address'},
            {'id':'name','content':'your name'},
            {'id':'age','content':'your age'}
        ];
        for (var i = 0; i < infoArr.length; i++) {
            (function(){
                var item = infoArr[i];
                document.getElementById(item.id).onfocus = function(){
                    showContent(item.content)
                }
            })()//放立即执行函数，立即绑定，用每次的值绑定到事件上，而不是循环结束的值
        }
    }
    setContent()

    /**
     * 解决方案3        用ES6声明，避免声明提前，作用域只在当前块内
     */
    function showContent(content){
        document.getElementById('info').innerHTML = content;
    };

    function setContent(){
        var infoArr = [
            {'id':'email','content':'your email address'},
            {'id':'name','content':'your name'},
            {'id':'age','content':'your age'}
        ];
        for (var i = 0; i < infoArr.length; i++) {
            let item = infoArr[i];      //限制作用域只在当前块内
            document.getElementById(item.id).onfocus = function(){
                showContent(item.content)
            }
        }
    }
    setContent()
</script>
</body>
</html>
```

