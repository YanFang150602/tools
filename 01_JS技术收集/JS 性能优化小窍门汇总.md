# JavaScript性能优化小窍门汇总（含实例）

在众多语言中，JavaScript已经占有重要的一席之地，利用JavaScript我们可以做很多事情 ， 应用广泛。在web应用项目中，需要大量JavaScript的代码，将来也会越来越多。但是由于JavaScript是一个作为解释执行的语言，而且它的单线程机制，决定了性能问题是JavaScript的弱点，也是开发者在写JavaScript的时候需注意的一个问题，因为经常会遇到Web 2.0应用性能欠佳的问题，主因就是JavaScript性能不足，导致浏览器负荷过重。 Javascript性能优化绝不是一种书面的技能，那么应该如何正确的加载和执行 JavaScript代码，从而提高其在浏览器中的性能呢？下面就给大家做一些优化小窍门的知识汇总。

无论当前 JavaScript 代码是内嵌还是在外链文件中，页面的下载和渲染都必须停下来等待脚本执行完成。JavaScript 执行过程耗时越久，浏览器等待响应用户输入的时间就越长。浏览器在下载和执行脚本时出现阻塞的原因在于，脚本可能会改变页面或JavaScript的命名空间，它们会对后面页面内容造成影响。一个典型的例子就是在页面中使用：

```js
document.write()
```

示例：

```html
<html>
<head>
    <title>Source Example</title>
</head>
<body>
    <p>
    <script type="text/javascript">
        document.write("Today is " + (new Date()).toDateString());
    </script>
    </p>
</body>
</html>
```

当浏览器遇到<script>标签时，当前 HTML 页面无从获知 JavaScript 是否会向<p> 标签添加内容，或引入其他元素，或甚至移除该标签。因此，这时浏览器会停止处理页面，先执行 JavaScript代码，然后再继续解析和渲染页面。同样的情况也发生在使用 src 属性加载 JavaScript的过程中，浏览器必须先花时间下载外链文件中的代码，然后解析并执行它。在这个过程中，页面渲染和用户交互完全被阻塞了。



## 不要使用 with() 语句

这是因为 with() 语句将会在作用域链的开始添加额外的变量。额外的变量意味着，当任何变量需要被访问的时候，JavaScript引擎都需要先扫描with()语句产生的变量，然后才是局部变量，最后是全局变量。 So with() essentially gives local variables all the performance drawbacks of global ones, and in turn derails Javascript optimization. 因此with()语句同时给局部变量和全局变量的性能带来负面影响，最终使我们优化JavaScript性能的计划破产。



## 对象属性和数组元素的速度都比变量慢

谈到JavaScript的数据，一般来说有4种访问方式：数值、变量、对象属性和数组元素。在考虑优化时，数值和变量的性能差不多，并且速度显著优于对象属性和数组元素。

因此当你多次引用一个对象属性或者数组元素的时候，你可以通过定义一个变量来获得性能提升。（这一条在读、写数据时都有效）虽然这条规则在绝大多数情况下是正确的，但是Firefox在优化数组索引上做了一些有意思的工作，能够让它的实际性能优于变量。但是考虑到数组元素在其他浏览器上的性能弊端，还是应该尽量避免数组查找，除非你真的只针对于火狐浏览器的性能而进行开发。



## 避免全局查找

在一个函数中会用到全局对象存储为局部变量来减少全局查找，因为访问局部变量的速度要比访问全局变量的速度更快些

```js
function search() {
    //当我要使用当前页面地址和主机域名
    alert(window.location.href + window.location.host);
}

//最好的方式是如下这样  先用一个简单变量保存起来
function search() {
    var location = window.location;
    alert(location.href + location.host);
}
```



## 避免with语句

和函数类似 ，with语句会创建自己的作用域，因此会增加其中执行的代码的作用域链的长度，由于额外的作用域链的查找，在with语句中执行的代码肯定会比外面执行的代码要慢，在能不使用with语句的时候尽量不要使用with语句。

```js
with (a.b.c.d) {
    property1 = 1;
    property2 = 2;
}
//可以替换为：
var obj = a.b.c.d;
obj.property1 = 1;
obj.property2 = 2;
```



## 数字转换成字符串

般最好用 `'' + 1`来将数字转换成字符串，虽然看起来比较丑一点，但事实上这个效率是最高的，性能上来说：

```
('' + 1) > String() > .toString() > new String()
```



## 通过模板元素clone，替代createElement

很多人喜欢在JavaScript中使用[document.write](https://www.w3cschool.cn/jsref/met-doc-write.html)来给页面生成内容。事实上这样的效率较低，如果需要直接插入HTML，可以找一个容器元素，比如指定一个div或者span，并设置他们的innerHTML来将自己的HTML代码插入到页面中。通常我们可能会使用字符串直接写HTML来创建节点，其实这样做：

1：无法保证代码的有效性，

2：字符串操作效率低，

所以应该是用[document.createElement()方法](https://www.w3cschool.cn/jsref/met-document-createelement.html)，而如果文档中存在现成的样板节点，应该是用cloneNode()方法，因为使用createElement()方法之后，你需要设置多次元素的属性，使用cloneNode()则可以减少属性的设置次数——同样如果需要创建很多元素，应该先准备一个样板节点。

```js
 var frag = document.createDocumentFragment();
 for (var i = 0; i < 1000; i++) {
     var el = document.createElement('p');
     el.innerHTML = i;
     frag.appendChild(el);
 }
 document.body.appendChild(frag);
 
 //替换为：
 var frag = document.createDocumentFragment();
 var pEl = document.getElementsByTagName('p')[0];
 for (var i = 0; i < 1000; i++) {
     var el = pEl.cloneNode(false);
     el.innerHTML = i;
     frag.appendChild(el);
 }
 document.body.appendChild(frag);
```



## 避免低效率的脚本位置

HTML 4 规范指出 <script> 标签可以放在 HTML 文档的<head>或<body>中，并允许出现多次。Web 开发人员一般习惯在 <head> 中加载外链的 JavaScript，接着用 <link> 标签用来加载外链的 CSS 文件或者其他页面信息。

低效率脚本位置示例：

```html
<html>
<head>
    <title>Source Example</title>
    <script type="text/javascript" src="script1.js"></script>
    <script type="text/javascript" src="script2.js"></script>
    <script type="text/javascript" src="script3.js"></script>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
    <p>Hello world!</p>
</body>
</html>
```

然而这种常规的做法却隐藏着严重的性能问题。在清单 2 的示例中，当浏览器解析到 <script> 标签（第 4 行）时，浏览器会停止解析其后的内容，而优先下载脚本文件，并执行其中的代码，这意味着，其后的 styles.css 样式文件和<body>标签都无法被加载，由于<body>标签无法被加载，那么页面自然就无法渲染了。因此在该 JavaScript 代码完全执行完之前，页面都是一片空白。

我们可以发现一个有趣的现象：第一个 JavaScript 文件开始下载，与此同时阻塞了页面其他文件的下载。此外，从 script1.js 下载完成到 script2.js 开始下载前存在一个延时，这段时间正好是 script1.js 文件的执行过程。每个文件必须等到前一个文件下载并执行完成才会开始下载。在这些文件逐个下载过程中，用户看到的是一片空白的页面。

从 IE 8、Firefox 3.5、Safari 4 和 Chrome 2 开始都允许并行下载 JavaScript 文件。这是个好消息，因为<script>标签在下载外部资源时不会阻塞其他<script>标签。遗憾的是，JavaScript 下载过程仍然会阻塞其他资源的下载，比如样式文件和图片。尽管脚本的下载过程不会互相影响，但页面仍然必须等待所有 JavaScript 代码下载并执行完成才能继续。因此，尽管最新的浏览器通过允许并行下载提高了性能，但问题尚未完全解决，脚本阻塞仍然是一个问题。

由于脚本会阻塞页面其他资源的下载，因此推荐将所有<script>标签尽可能放到<body>标签的底部，以尽量减少对整个页面下载的影响。

推荐的代码放置位置示例：

```html
<head>
    <title>Source Example</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
    <p>Hello world!</p>
    <!-- Example of efficient script positioning -->
    <script type="text/javascript" src="script1.js"></script>
    <script type="text/javascript" src="script2.js"></script>
    <script type="text/javascript" src="script3.js"></script>
</body>
</html>
```

这段代码展示了在 HTML 文档中放置<script>标签的推荐位置。尽管脚本下载会阻塞另一个脚本，但是页面的大部分内容都已经下载完成并显示给了用户，因此页面下载不会显得太慢。这是优化 JavaScript 的首要规则：将脚本放在底部。

## 小心使用闭包

虽然你可能还不知道“闭包”，但你可能在不经意间经常使用这项技术。闭包基本上被认为是JavaScript中的new，当我们定义一个即时函数的时候，我们就使用了闭包，比如：

```js
function test() {
	document.getElementById('foo').onclick = function(ev) { };
}
```

闭包的问题在于：根据定义，在它们的作用域链中至少有三个对象：闭包变量、局部变量和全局变量。这些额外的对象将会导致其他的性能问题。但是Nicholas并不是要我们因噎废食，闭包对于提高代码可读性等方面还是非常有用的，只是不要滥用它们（尤其在循环中）。



## 在循环时将控制条件和控制变量合并起来

提到性能，在循环中需要避免的工作一直是个热门话题，因为循环会被重复执行很多次。所以如果有性能优化的需求，先对循环开刀有可能会获得最明显的性能提升。

一种优化循环的方法是在定义循环的时候，将控制条件和控制变量合并起来，下面是一个没有将他们合并起来的例子：

```js
for ( var x = 0; x < 10; x++ ) {
};
```

当我们要添加什么东西到这个循环之前，我们发现有几个操作在每次迭代都会出现。JavaScript引擎需要：

```
#1：检查 x 是否存在
#2：检查 x 是否小于 10 
#3：使 x 增加 1
```

然而如果你只是迭代元素中的一些元素，那么你可以使用while循环进行轮转来替代上面这种操作：

```js
var x = 9;
do { } while( x-- );
```



## 使用 XMLHttpRequest(XHR)对象

此技术首先创建一个 XHR 对象，然后下载 JavaScript 文件，接着用一个动态`<script>`元素将 JavaScript 代码注入页面。

通过 XHR 对象加载 JavaScript 脚本：

```js
var xhr = new XMLHttpRequest();
xhr.open("get", "script1.js", true);
xhr.onreadystatechange = function(){
    if (xhr.readyState == 4){
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
            var script = document.createElement ("script");
            script.type = "text/javascript";
            script.text = xhr.responseText;
            document.body.appendChild(script);
        }
    }
};
xhr.send(null);
```

此代码向服务器发送一个获取 script1.js 文件的 GET 请求。onreadystatechange 事件处理函数检查readyState 是不是 4，然后检查 HTTP 状态码是不是有效（2XX 表示有效的回应，304 表示一个缓存响应）。如果收到了一个有效的响应，那么就创建一个新的<script>元素，将它的文本属性设置为从服务器接收到的 responseText 字符串。这样做实际上会创建一个带有内联代码的<script>元素。一旦新<script>元素被添加到文档，代码将被执行，并准备使用。

这种方法的主要优点是，您可以下载不立即执行的 JavaScript 代码。由于代码返回在<script>标签之外（换句话说不受<script>标签约束），它下载后不会自动执行，这使得您可以推迟执行，直到一切都准备好了。另一个优点是，同样的代码在所有现代浏览器中都不会引发异常。

此方法最主要的限制是：JavaScript 文件必须与页面放置在同一个域内，不能从 CDN 下载（CDN 指”内容投递网络（Content Delivery Network）”，所以大型网页通常不采用 XHR 脚本注入技术。

## 注意NodeList

最小化访问NodeList的次数可以极大的改进脚本的性能

```js
var images = document.getElementsByTagName('img');
for (var i = 0, len = images.length; i < len; i++) {

}
```

编写JavaScript的时候一定要知道何时返回NodeList对象，这样可以最小化对它们的访问

1、进行了对getElementsByTagName()的调用

2、获取了元素的childNodes属性

3、获取了元素的attributes属性

4、访问了特殊的集合，如document.forms、document.images等等

要了解了当使用NodeList对象时，合理使用会极大的提升代码执行速度



## 避免与null进行比较

由于JavaScript是弱类型的，所以它不会做任何的自动类型检查，所以如果看到与null进行比较的代码，尝试使用以下技术替换：

1、如果值应为一个引用类型，使用instanceof操作符检查其构造函数

2、如果值应为一个基本类型，作用typeof检查其类型

3、如果是希望对象包含某个特定的方法名，则使用typeof操作符确保指定名字的方法存在于对象上



## 尊重对象的所有权

因为JavaScript可以在任何时候修改任意对象，这样就可以以不可预计的方式覆写默认的行为，所以如果你不负责维护某个对象，它的对象或者它的方法，那么你就不要对它进行修改，具体一点就是说：

1、不要为实例或原型添加属性
2、不要为实例或者原型添加方法
3、不要重定义已经存在的方法
4、不要重复定义其它团队成员已经实现的方法，永远不要修改不是由你所有的对象，你可以通过以下方式为对象创建新的功能:
1、创建包含所需功能的新对象，并用它与相关对象进行交互

2、创建自定义类型，继承需要进行修改的类型，然后可以为自定义类型添加额外功能



## 循环引用

如果循环引用中包含DOM对象或者ActiveX对象，那么就会发生内存泄露。内存泄露的后果是在浏览器关闭前，即使是刷新页面，这部分内存不会被浏览器释放。

简单的循环引用：

```js
var el = document.getElementById('MyElement');
var func = function () {
    //…
}
el.func = func;
func.element = el;
```

但是通常不会出现这种情况。通常循环引用发生在为dom元素添加闭包作为expendo的时候。

```js
 function init() {
      var el = document.getElementById('MyElement');
      el.onclick = function () {
          //……
      }
}
init();
```

init在执行的时候，当前上下文我们叫做context。这个时候，context引用了el，el引用了function，function引用了context。这时候形成了一个循环引用。

下面2种方法可以解决循环引用：

1、置空dom对象

```js
function init() {
    var el = document.getElementById('MyElement');
    el.onclick = function () {
        //闭包中可能会使用到变量el
    }
}
init();
//可以替换为：
function init() {
    var el = document.getElementById('MyElement');
    el.onclick = function () {
        //闭包中可能会使用到变量el
    }
    el = null;
}
init();
```

将el置空，context中不包含对dom对象的引用，从而打断循环应用。

如果我们需要将dom对象返回，可以用如下方法：

```js
function init() {
    var el = document.getElementById('MyElement');
    el.onclick = function () {
        //闭包中可能会使用到变量el
    }
    return el;
}
init();

//可以替换为：
function init() {
    var el = document.getElementById('MyElement');
    el.onclick = function () {
        //闭包中可能会使用到变量el
    }
    try {
        return el;
    } finally {
        el = null;
    }
}
init();
```

2、构造新的context

```js
function init() {
    var el = document.getElementById('MyElement');
    el.onclick = function () {
        //闭包中可能会使用到变量el
    }
}
init();

//可以替换为：
function elClickHandler() {
    // 函数声明时，el变量是空的，引用不到
}
function init() {
    var el = document.getElementById('MyElement');
    el.onclick = elClickHandler;
}
init();
```

把function抽到新的context中，这样，function的context就不包含对el的引用，从而打断循环引用。

### 通过javascript创建的dom对象，必须append到页面中

IE下，脚本创建的dom对象，如果没有append到页面中，刷新页面，这部分内存是不会回收的！

```js
  function create() {
      var gc = document.getElementById('GC');
      for (var i = 0; i < 5000; i++) {
          var el = document.createElement('div');
          el.innerHTML = "test";
          //下面这句可以注释掉，看看浏览器在任务管理器中，点击按钮然后刷新后的内存变化
          gc.appendChild(el);
      }
  }
```



## 字符串连接

如果要连接多个字符串，应该少使用+=，如

s+=a;

s+=b;

s+=c;

应该写成s+=a + b + c；

而如果是收集字符串，比如多次对同一个字符串进行+=操作的话，最好使用一个缓存，使用JavaScript数组来收集，最后**使用join方法连接起来**

```js
var buf = [];
for (var i = 0; i < 100; i++) {
    buf.push(i.toString());
}
var all = buf.join("");
```



## 各种类型转换

```js
var myVar = "3.14159",
    str = "" + myVar, //  to string  
    i_int = ~ ~myVar,  //  to integer  
    f_float = 1 * myVar,  //  to float  
    b_bool = !!myVar,  /*  to boolean - any string with length 
                                and any number except 0 are true */
    array = [myVar];  //  to array
```

如果定义了toString()方法来进行类型转换的话，推荐**显式调用toString()**，因为内部的操作在尝试所有可能性之后，会尝试对象的toString()方法尝试能否转化为String，所以直接调用这个方法效率会更高



## 多个类型声明

在JavaScript中所有变量都可以使用单个var语句来声明，这样就是组合在一起的语句，以减少整个脚本的执行时间，就如上面代码一样，上面代码格式也挺规范，让人一看就明了。



## 插入迭代器

如var name=values[i]; i++;前面两条语句可以写成var name=values[i++]



## 使用直接量

```js
var aTest = new Array(); //替换为
var aTest = [];
var aTest = new Object; //替换为
var aTest = {};
var reg = new RegExp(); //替换为
var reg = /../;
//如果要创建具有一些特性的一般对象，也可以使用字面量，如下：
var oFruit = new O;
oFruit.color = "red";
oFruit.name = "apple";
//前面的代码可用对象字面量来改写成这样：
var oFruit = { color: "red", name: "apple" };
```



## 避免双重解释

如果要提高代码性能，尽可能避免出现需要按照JavaScript解释的字符串，也就是

**1、尽量少使用eval函数**

使用eval相当于在运行时再次调用解释引擎对内容进行运行，需要消耗大量时间，而且使用eval带来的安全性问题也是不容忽视的。

**2、不要使用Function构造器**

不要给setTimeout或者setInterval传递字符串参数

```js
var num = 0;
setTimeout('num++', 10);
//可以替换为：
var num = 0;
function addNum() {
    num++;
}
setTimeout(addNum, 10);
```



## 缩短否定检测

```js
if (oTest != '#ff0000') {
     //do something
}
if (oTest != null) {
    //do something
}
if (oTest != false) {
    //do something
}
//虽然这些都正确，但用逻辑非操作符来操作也有同样的效果：
if (!oTest) {
    //do something
}
```



## 释放javascript对象

在rich应用中，随着实例化对象数量的增加，内存消耗会越来越大。所以应当及时释放对对象的引用，让GC能够回收这些内存控件。

对象：obj = null

对象属性：delete obj.myproperty

数组item：使用数组的splice方法释放数组中不用的item



## 性能方面的注意事项

**1、尽量使用原生方法**

**2、switch语句相对if较快**

通过将case语句按照最可能到最不可能的顺序进行组织

**3、位运算较快**

当进行数字运算时，位运算操作要比任何布尔运算或者算数运算快

***\*4、\*\*巧用||和&&布尔运算符\*\**\***

```js
function eventHandler(e) {
    if (!e) e = window.event;
}
//可以替换为：
function eventHandler(e) {
    e = e || window.event;
}


if (myobj) {
    doSomething(myobj);
}
//可以替换为：
myobj && doSomething(myobj);
```



## 避免错误应注意的地方

**1、每条语句末尾须加分号**

在if语句中，即使条件表达式只有一条语句也要用{}把它括起来，以免后续如果添加了语句之后造成逻辑错误

**2、使用+号时需谨慎**

JavaScript 和其他编程语言不同的是，在 JavaScript 中，’+'除了表示数字值相加，字符串相连接以外，还可以作一元运算符用，把字符串转换为数字。因而如果使用不当，则可能与自增符’++’混淆而引起计算错误

```js
var valueA = 20;
var valueB = "10";
alert(valueA + valueB);     //ouput: 2010 
alert(valueA + (+valueB));  //output: 30 
alert(valueA + +valueB);    //output:30 
alert(valueA ++ valueB);     //Compile error
```

**3、使用return语句需要注意**

一条有返回值的return语句不要用()括号来括住返回值，如果返回表达式，则表达式应与return关键字在同一行，以避免压缩时，压缩工具自动加分号而造成返回与开发人员不一致的结果

```js
function F1() {
    var valueA = 1;
    var valueB = 2;
    return valueA + valueB;
}
function F2() {
    var valueA = 1;
    var valueB = 2;
    return
    valueA + valueB;
}
alert(F1());  //output: 3 
alert(F2());  //ouput: undefined
```



## ==和===的区别

避免在if和while语句的条件部分进行赋值，如if (a = b)，应该写成if (a == b)，但是在比较是否相等的情况下，最好使用全等运行符，也就是使用===和!==操作符会相对于==和!=会好点。==和!=操作符会进行类型强制转换

```js
var valueA = "1";
var valueB = 1;
if (valueA == valueB) {
    alert("Equal");
}
else {
    alert("Not equal");
}
//output: "Equal"
if (valueA === valueB) {
    alert("Equal");
}
else {
    alert("Not equal");
}
//output: "Not equal"
```



##  不要使用生偏语法

不要使用生偏语法，写让人迷惑的代码，虽然计算机能够正确识别并运行，但是晦涩难懂的代码不方便以后维护



## 函数返回统一类型

虽然JavaScript是弱类型的，对于函数来说，前面返回整数型数据，后面返回布尔值在编译和运行都可以正常通过，但为了规范和以后维护时容易理解，应保证函数应返回统一的数据类型



## 总是检查数据类型

要检查你的方法输入的所有数据，一方面是为了安全性，另一方面也是为了可用性。用户随时随地都会输入错误的数据。这不是因为他们蠢，而是因为他们很忙，并且思考的方式跟你不同。用typeof方法来检测你的function接受的输入是否合法



## 何时用单引号，何时用双引号

虽然在JavaScript当中，双引号和单引号都可以表示字符串, 为了避免混乱，我们建议在HTML中使用双引号，在JavaScript中使用单引号，但为了兼容各个浏览器，也为了解析时不会出错，定义JSON对象时，最好使用双引号



## 部署

1、用JSLint运行JavaScript验证器来确保没有语法错误或者是代码没有潜在的问

2、部署之前推荐使用压缩工具将JS文件压缩

3、文件编码统一用UTF-8

4、JavaScript 程序应该尽量放在 .js 的文件中，需要调用的时候在 HTML 中以 <script src="filename.js"> 的形式包含进来。JavaScript 代码若不是该 HTML 文件所专用的，则应尽量避免在 HTML 文件中直接编写 JavaScript 代码。因为这样会大大增加 HTML 文件的大小，无益于代码的压缩和缓存的使用。另外，<script src="filename.js"> 标签应尽量放在文件的后面,最好是放在</body>标签前。这样会降低因加载 JavaScript 代码而影响页面中其它组件的加载时间。



永远不要忽略代码优化工作，重构是一项从项目开始到结束需要持续的工作，只有不断的优化代码才能让代码的执行效率越来越好
