# jQuery 事件

## 什么是事件？

页面对不同访问者的响应叫做事件。

事件处理程序指的是当 HTML 中发生某些事件时所调用的方法。

实例：

- 在元素上移动鼠标。
- 选取单选按钮
- 点击元素

在事件中经常使用术语"触发"（或"激发"）例如： "当您按下按键时触发 keypress 事件"。

常见 DOM 事件：

| 鼠标事件   | 键盘事件 | 表单事件 | 文档/窗口事件 |
| :--------- | :------- | :------- | :------------ |
| click      | keypress | submit   | load          |
| dblclick   | keydown  | change   | resize        |
| mouseenter | keyup    | focus    | scroll        |
| mouseleave |          | blur     | unload        |

## jQuery 事件方法语法

在 jQuery 中，大多数 DOM 事件都有一个等效的 jQuery 方法。

页面中指定一个点击事件：     

```js
$("p").click(function(){//actions});
```

## jQuery 事件方法

事件方法触发器或添加一个函数到被选元素的事件处理程序。

下面的表格列出了所有用于处理事件的 jQuery 方法。

| 方法                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [bind()](https://www.w3cschool.cn/jquery/event-bind.html)    | **自 jQuery 版本 1.7 起，on()方法是向被选元素添加事件处理程序的首选方法。**向元素添加事件处理程序 |
| [on()](https://www.w3cschool.cn/jquery/event-on.html)        | 向元素添加事件处理程序                                       |
| [off()](https://www.w3cschool.cn/jquery/event-off.html)      | 移除通过 on() 方法添加的事件处理程序                         |
| [blur()](https://www.w3cschool.cn/jquery/event-blur.html)    | 添加/触发 blur 事件                                          |
| [change()](https://www.w3cschool.cn/jquery/event-change.html) | 添加/触发 change 事件                                        |
| [click()](https://www.w3cschool.cn/jquery/event-click.html)  | 添加/触发 click 事件                                         |
| [dblclick()](https://www.w3cschool.cn/jquery/event-dblclick.html) | 添加/触发 double click 事件                                  |
| [delegate()](https://www.w3cschool.cn/jquery/event-delegate.html) | 向匹配元素的当前或未来的子元素添加处理程序                   |
| [die()](https://www.w3cschool.cn/jquery/event-die.html)      | 在版本 1.9 中被移除。移除所有通过 live() 方法添加的事件处理程序 |
| [error()](https://www.w3cschool.cn/jquery/event-error.html)  | 在版本 1.8 中被废弃。添加/触发 error 事件                    |
| [event.currentTarget](https://www.w3cschool.cn/jquery/jq-event-currenttarget.html) | 在事件冒泡阶段内的当前 DOM 元素                              |
| [event.data](https://www.w3cschool.cn/jquery/event-data.html) | 包含当前执行的处理程序被绑定时传递到事件方法的可选数据       |
| [event.delegateTarget](https://www.w3cschool.cn/jquery/event-delegatetarget.html) | 返回当前调用的 jQuery 事件处理程序所添加的元素               |
| [event.isDefaultPrevented()](https://www.w3cschool.cn/jquery/event-isdefaultprevented.html) | 返回指定的 event 对象上是否调用了 event.preventDefault()     |
| [event.isImmediatePropagationStopped()](https://www.w3cschool.cn/jquery/event-isimmediatepropagationstopped.html) | 返回指定的 event 对象上是否调用了 event.stopImmediatePropagation() |
| [event.isPropagationStopped()](https://www.w3cschool.cn/jquery/event-ispropagationstopped.html) | 返回指定的 event 对象上是否调用了 event.stopPropagation()    |
| [event.namespace](https://www.w3cschool.cn/jquery/event-namespace.html) | 返回当事件被触发时指定的命名空间                             |
| [event.pageX](https://www.w3cschool.cn/jquery/event-pagex.html) | 返回相对于文档左边缘的鼠标位置                               |
| [event.pageY](https://www.w3cschool.cn/jquery/event-pagey.html) | 返回相对于文档上边缘的鼠标位置                               |
| [event.preventDefault()](https://www.w3cschool.cn/jquery/event-preventdefault.html) | 阻止事件的默认行为                                           |
| [event.relatedTarget](https://www.w3cschool.cn/jquery/jq-event-relatedtarget.html) | 返回当鼠标移动时哪个元素进入或退出                           |
| [event.result](https://www.w3cschool.cn/jquery/event-result.html) | 包含由被指定事件触发的事件处理程序返回的最后一个值           |
| [event.stopImmediatePropagation()](https://www.w3cschool.cn/jquery/event-stopimmediatepropagation.html) | 阻止其他事件处理程序被调用                                   |
| [event.stopPropagation()](https://www.w3cschool.cn/jquery/event-stoppropagation.html) | 阻止事件向上冒泡到 DOM 树，阻止任何父处理程序被事件通知      |
| [event.target](https://www.w3cschool.cn/jquery/jq-event-target.html) | 返回哪个 DOM 元素触发事件                                    |
| [event.timeStamp](https://www.w3cschool.cn/jquery/jq-event-timestamp.html) | 返回从 1970 年 1 月 1 日到事件被触发时的毫秒数               |
| [event.type](https://www.w3cschool.cn/jquery/jq-event-type.html) | 返回哪种事件类型被触发                                       |
| [event.which](https://www.w3cschool.cn/jquery/event-which.html) | 返回指定事件上哪个键盘键或鼠标按钮被按下                     |
| [focus()](https://www.w3cschool.cn/jquery/event-focus.html)  | 添加/触发 focus 事件                                         |
| [focusin()](https://www.w3cschool.cn/jquery/event-focusin.html) | 添加事件处理程序到 focusin 事件                              |
| [focusout()](https://www.w3cschool.cn/jquery/event-focusout.html) | 添加事件处理程序到 focusout 事件                             |
| [hover()](https://www.w3cschool.cn/jquery/event-hover.html)  | 添加两个事件处理程序到 hover 事件                            |
| [keydown()](https://www.w3cschool.cn/jquery/event-keydown.html) | 添加/触发 keydown 事件                                       |
| [keypress()](https://www.w3cschool.cn/jquery/event-keypress.html) | 添加/触发 keypress 事件                                      |
| [keyup()](https://www.w3cschool.cn/jquery/event-keyup.html)  | 添加/触发 keyup 事件                                         |
| [live()](https://www.w3cschool.cn/jquery/event-live.html)    | 在版本 1.9 中被移除。添加一个或多个事件处理程序到当前或未来的被选元素 |
| [load()](https://www.w3cschool.cn/jquery/event-load.html)    | 在版本 1.8 中被废弃。添加一个事件处理程序到 load 事件        |
| [mousedown()](https://www.w3cschool.cn/jquery/event-mousedown.html) | 添加/触发 mousedown 事件                                     |
| [mouseenter()](https://www.w3cschool.cn/jquery/event-mouseenter.html) | 添加/触发 mouseenter 事件                                    |
| [mouseleave()](https://www.w3cschool.cn/jquery/event-mouseleave.html) | 添加/触发 mouseleave 事件                                    |
| [mousemove()](https://www.w3cschool.cn/jquery/event-mousemove.html) | 添加/触发 mousemove 事件                                     |
| [mouseout()](https://www.w3cschool.cn/jquery/event-mouseout.html) | 添加/触发 mouseout 事件                                      |
| [mouseover()](https://www.w3cschool.cn/jquery/event-mouseover.html) | 添加/触发 mouseover 事件                                     |
| [mouseup()](https://www.w3cschool.cn/jquery/event-mouseup.html) | 添加/触发 mouseup 事件                                       |
| [off()](https://www.w3cschool.cn/jquery/event-off.html)      | 移除通过 on() 方法添加的事件处理程序                         |
| [one()](https://www.w3cschool.cn/jquery/event-one.html)      | 向被选元素添加一个或多个事件处理程序。该处理程序只能被每个元素触发一次 |
| [$.proxy()](https://www.w3cschool.cn/jquery/event-proxy.html) | 接受一个已有的函数，并返回一个带特定上下文的新的函数         |
| [ready()](https://www.w3cschool.cn/jquery/event-ready.html)  | 规定当 DOM 完全加载时要执行的函数                            |
| [resize()](https://www.w3cschool.cn/jquery/event-resize.html) | 添加/触发 resize 事件                                        |
| [scroll()](https://www.w3cschool.cn/jquery/event-scroll.html) | 添加/触发 scroll 事件                                        |
| [select()](https://www.w3cschool.cn/jquery/event-select.html) | 添加/触发 select 事件                                        |
| [submit()](https://www.w3cschool.cn/jquery/event-submit.html) | 添加/触发 submit 事件                                        |
| [toggle()](https://www.w3cschool.cn/jquery/event-toggle.html) | 在版本 1.9 中被移除。添加 click 事件之间要切换的两个或多个函数 |
| [trigger()](https://www.w3cschool.cn/jquery/event-trigger.html) | 触发绑定到被选元素的所有事件                                 |
| [triggerHandler()](https://www.w3cschool.cn/jquery/event-triggerhandler.html) | 触发绑定到被选元素的指定事件上的所有函数                     |
| [unbind()](https://www.w3cschool.cn/jquery/event-unbind.html) | 从被选元素上移除添加的事件处理程序                           |
| [undelegate()](https://www.w3cschool.cn/jquery/event-undelegate.html) | 从现在或未来的被选元素上移除事件处理程序                     |
| [unload()](https://www.w3cschool.cn/jquery/event-unload.html) | 在版本 1.8 中被废弃。添加事件处理程序到 unload 事件          |

### `bind()`法

**定义和用法**

`bind()` 方法向被选元素添加一个或多个事件处理程序，以及当事件发生时运行的函数。

自 jQuery 版本 1.7 起，`on()` 方法是向被选元素添加事件处理程序的首选方法。

**语法**

```js
 $(selector).bind(event,data,function,map) 
```

| 参数       | 描述                                                         |
| :--------- | :----------------------------------------------------------- |
| *event*    | 必需。规定添加到元素的一个或多个事件。  由空格分隔多个事件值。必须是有效的事件。 |
| *data*     | 可选。规定传递到函数的额外数据。                             |
| *function* | 必需。规定当事件发生时运行的函数。                           |
| *map*      | 规定事件映射 (*{event:function, event:function, ...})*，包含要添加到元素的一个或多个事件，以及当事件发生时运行的函数。 |

**示例**

添加多个事件

```js
$(document).ready(function(){
  $("p").bind("mouseover mouseout",function(){
    $("p").toggleClass("intro");
  });
});
```

使用事件映射

```js
$(document).ready(function(){
  $("button").bind({
    click:function(){$("p").slideToggle();},
    mouseover:function(){$("body").css("background-color","#E9E9E4");},  
    mouseout:function(){$("body").css("background-color","#FFFFFF");}  
  });
});
```

向函数传递数据

```js
function handlerName(e) 
{
	alert(e.data.msg);
}
$(document).ready(function(){
	$("p").bind("click", {msg: "You just clicked me!"}, handlerName)
});
```

### `on()` 方法

**定义和用法**

`on()` 方法在被选元素及子元素上添加一个或多个事件处理程序。

自 jQuery 版本 1.7 起，`on()` 方法是 `bind()`、`live()` 和 `delegate()` 方法的新的替代品。该方法给 API 带来很多便利，我们推荐使用该方法，它简化了 jQuery 代码库。

**注意：**使用 `on()` 方法添加的事件处理程序适用于当前及未来的元素（比如由脚本创建的新元素）。

**提示：**如需移除事件处理程序，请使用 `off()` 方法。

**提示：**如需添加只运行一次的事件然后移除，请使用 `one()` 方法。

**语法**

```参数	描述
 $(selector).on(event,childSelector,data,function,map)
```

| 参数            | 描述                                                         |
| :-------------- | :----------------------------------------------------------- |
| *event*         | 必需。规定要从被选元素移除的一个或多个事件或命名空间。  由空格分隔多个事件值。必须是有效的事件。 |
| *childSelector* | 可选。规定只能添加到指定的子元素上的事件处理程序（且不是选择器本身，比如已废弃的 delegate() 方法）。 |
| *data*          | 可选。规定传递到函数的额外数据。                             |
| *function*      | 可选。规定当事件发生时运行的函数。                           |
| *map*           | 规定事件映射 (*{event:function, event:function, ...})*，包含要添加到元素的一个或多个事件，以及当事件发生时运行的函数。 |

**示例**

向 `<p>` 元素添加 click 事件处理程序：

```js
$("p").on("click",function(){
	alert("The paragraph was clicked.");
});
```

添加多个事件处理程序

```js
$(document).ready(function(){
  $("p").on("mouseover mouseout",function(){
    $("p").toggleClass("intro");
  });
});
```

使用 map 参数添加多个事件处理程序

```js
$(document).ready(function(){
  $("p").on({
    mouseover:function(){$("body").css("background-color","lightgray");},  
    mouseout:function(){$("body").css("background-color","lightblue");}, 
    click:function(){$("body").css("background-color","yellow");}  
  });
});
```

在元素上添加自定义事件

```js
$(document).ready(function(){
  $("p").on("myOwnEvent", function(event, showName){
    $(this).text(showName + "! What a beautiful name!").show();
  });
  $("button").click(function(){
    $("p").trigger("myOwnEvent",["Anja"]);
  });
});
```

向函数传递数据

```js
function handlerName(event) 
{
  alert(event.data.msg);
}

$(document).ready(function(){
  $("p").on("click", {msg: "You just clicked me!"}, handlerName)
});
```

向未来的元素添加事件处理程序

```html
<!DOCTYPE html>
<html>
<head>
<script src="//libs.baidu.com/jquery/1.10.2/jquery.min.js">
</script>
<script>
$(document).ready(function(){
  $("div").on("click","p",function(){
    $(this).slideToggle();
  });
  $("button").click(function(){
    $("<p>This is a new paragraph.</p>").insertAfter("button");
  });
});
</script>
</head>
<body>

<div style="background-color:yellow">
<p>This is a paragraph.</p>
<p>Click any p element to make it disappear. Including this one.</p>
<button>Insert a new p element after this button</button>
</div>

</body>
</html>
```

移除事件处理程序

```js
$(document).ready(function(){
  $("p").on("click",function(){
    $(this).css("background-color","pink");
  });
  $("button").click(function(){
    $("p").off("click");
  });
});
```



### `event.preventDefault()` 方法

**定义和用法**

`event.preventDefault()` 方法阻止元素发生**默认的行为**。

例如：

- 当点击提交按钮时阻止对表单的提交
- 阻止以下 URL 的链接

**提示：**请使用 [event.isDefaultPrevented()](https://www.w3cschool.cn/jquery/event-isdefaultprevented.html) 方法来检查指定的事件上是否调用了 preventDefault() 方法。

**语法**

```js
 event.preventDefault() 
```

**示例**

防止链接打开 URL

```js
$("a").click(function(event){
	event.preventDefault();
});
```

### `event.isDefaultPrevented()` 方法

**定义和用法**

`event.isDefaultPrevented()` 方法检查指定的事件上是否调用了 `preventDefault()` 方法。

**语法**

```js
event.isDefaultPrevented()
```

**示例**
防止链接打开 URL，并检查 `preventDefault()` 是否被调用：

```js
$("a").click(function(event){
	event.preventDefault();
	alert("Was preventDefault() called: " + event.isDefaultPrevented());
});
```

### `event.stopPropagation()` 方法

**定义和用法**

`event.stopPropagation()` 方法阻止事件冒泡到父元素，阻止任何父事件处理程序被执行。

提示：请使用 `event.isPropagationStopped()` 方法来检查指定的事件上是否调用了该方法。

**语法**

```js
 event.stopPropagation()
```

**示例**

阻止 click 事件冒泡到父元素：

```html
<!DOCTYPE html>
<html>
<head>
<script src="//libs.baidu.com/jquery/1.10.2/jquery.min.js">
</script>
<script>
$(document).ready(function(){
  $("span").click(function(event){
    event.stopPropagation();
    alert("The span element was clicked.");
  });
  $("p").click(function(event){
    alert("The p element was clicked.");
  });
  $("div").click(function(){
    alert("The div element was clicked.");
  });
});
</script>
</head>
<body>
<div style="height:100px;width:500px;padding:10px;border:1px solid blue;background-color:lightblue;">
	This is a div element.
    <p style="background-color:pink">This is a p element, in the div element. <br>
        <span style="background-color:orange">This is a span element in the p and the div element.</span>
    </p>
</div>
</body>
</html>
```

### `event.isPropagationStopped()` 方法

**定义和用法**

`event.isPropagationStopped()` 方法检查指定的事件上是否调用了 `event.stopPropagation()`。

如果 `event.stopPropagation()` 被调用则该方法返回 true，否则返回 false。

**语法**

```js
 event.isPropagationStopped() 
```

**示例**

检查 `event.stopPropagation()` 是否被调用：

```js
$("div").click(function(event){
	event.stopPropagation();
	alert(event.isPropagationStopped());
});
```

### `event.data` 属性

**定义和用法**

`event.data` 属性包含当前执行的处理程序被绑定时传递到事件方法的可选数据。

**语法**

```
event.data
```

**示例**

对每个 `<p>` 元素返回通过 `on()` 方法传递的数据：

```js
$("p").each(function(i){
	$(this).on("click",{x:i},function(event){
		alert("The " + $(this).index() + ". paragraph has data: " + event.data.x);
	});
});
```

### `event.which` 属性

**定义和用法**

`event.which` 属性返回指定事件上哪个键盘键或鼠标按钮被按下。

**语法**

```js
event.which 
```

**示例**

返回哪个键盘键被按下：

```js
$(document).ready(function(){
    $("input").keydown(function(event){
        $("div").html("Key: " + event.which);
    });
});
```

返回哪个鼠标按钮被按下

```js
$(document).ready(function(){
  $("div").mousedown(function(event){ 
    $("div").append("<br>Mouse button pressed: " + event.which);
  });
});
```

**比较keypress、keydown与keyup**

- keydown：在键盘上按下某键时发生，一直按着则会不断触发（opera浏览器除外），它返回的是键盘代码;
- keypress：在键盘上按下一个按键，并产生一个字符时发生, 返回ASCII码。注意: shift、alt、ctrl等键按下并不会产生字符，所以监听无效，换句话说，只有按下能在屏幕上输出字符的按键时keypress事件才会触发。若一直按着某按键则会不断触发。
- keyup：用户松开某一个按键时触发，与keydown相对，返回键盘代码.

# AJAX 简介

AJAX 是与服务器交换数据的技术，它在不重载全部页面的情况下，实现了对部分网页的更新。

## 什么是 AJAX？

AJAX = 异步 JavaScript 和 XML（Asynchronous JavaScript and XML）。

简短地说，在不重载整个网页的情况下，AJAX 通过后台加载数据，并在网页上进行显示。

使用 AJAX 的应用程序案例：谷歌地图、腾讯微博、优酷视频、人人网等等。

## 关于 jQuery 与 AJAX

jQuery 提供多个与 AJAX 有关的方法。

通过 jQuery AJAX 方法，您能够使用 HTTP Get 和 HTTP Post 从远程服务器上请求文本、HTML、XML 或 JSON - 同时您能够把这些外部数据直接载入网页的被选元素中。

## $.ajax() 方法

**定义和用法**

ajax() 方法用于执行 AJAX（异步 HTTP）请求。

所有的 jQuery AJAX 方法都使用 ajax() 方法。该方法通常用于其他方法不能完成的请求。

**语法**

```js
$.ajax(*{name:value, name:value, ... }*)
```

该参数规定 AJAX 请求的一个或多个名称/值对。

下面的表格中列出了可能的名称/值：

| 名称                         | 值/描述                                                      |
| :--------------------------- | :----------------------------------------------------------- |
| async                        | 布尔值，表示请求是否异步处理。默认是 true。                  |
| beforeSend(*xhr*)            | 发送请求前运行的函数。                                       |
| cache                        | 布尔值，表示浏览器是否缓存被请求页面。默认是 true。          |
| complete(*xhr,status*)       | 请求完成时运行的函数（在请求成功或失败之后均调用，即在 success 和 error 函数之后）。 |
| contentType                  | 发送数据到服务器时所使用的内容类型。默认是："application/x-www-form-urlencoded"。 |
| context                      | 为所有 AJAX 相关的回调函数规定 "this" 值。                   |
| data                         | 规定要发送到服务器的数据。                                   |
| dataFilter(*data*,*type*)    | 用于处理 XMLHttpRequest 原始响应数据的函数。                 |
| dataType                     | 预期的服务器响应的数据类型。                                 |
| error(*xhr,status,error*)    | 如果请求失败要运行的函数。                                   |
| global                       | 布尔值，规定是否为请求触发全局 AJAX 事件处理程序。默认是 true。 |
| ifModified                   | 布尔值，规定是否仅在最后一次请求以来响应发生改变时才请求成功。默认是 false。 |
| jsonp                        | 在一个 jsonp 中重写回调函数的字符串。                        |
| jsonpCallback                | 在一个 jsonp 中规定回调函数的名称。                          |
| password                     | 规定在 HTTP 访问认证请求中使用的密码。                       |
| processData                  | 布尔值，规定通过请求发送的数据是否转换为查询字符串。默认是 true。 |
| scriptCharset                | 规定请求的字符集。                                           |
| success(*result,status,xhr*) | 当请求成功时运行的函数。                                     |
| timeout                      | 设置本地的请求超时时间（以毫秒计）。                         |
| traditional                  | 布尔值，规定是否使用参数序列化的传统样式。                   |
| type                         | 规定请求的类型（GET 或 POST）。                              |
| url                          | 规定发送请求的 URL。默认是当前页面。                         |
| username                     | 规定在 HTTP 访问认证请求中使用的用户名。                     |
| xhr                          | 用于创建 XMLHttpRequest 对象的函数。                         |

**示例**

使用 AJAX 请求改变  `<div> ` 元素的文本：

```js
$("button").click(function(){
    $.ajax({
        url: "demo_test.txt",
        success: function(result){
       		$("#div1").html(result);
    	}
    });
});
```

生成带有指定数据类型的 AJAX 请求：

```js
$(document).ready(function(){
	$("button").click(function(){
		$.ajax({
			url:"demo_ajax_script.js",
			dataType:"script"
        });
	});
});
```

生成带有错误的 AJAX 请求：

```js
$(document).ready(function(){
	$("button").click(function(){
		$.ajax({
            url: "wrongfile.txt",
            error: function(xhr) {
				alert("错误提示： " + xhr.status + " " + xhr.statusText);
			}
        });
  });
});
```

## $.get() 方法

**定义和用法**

`$.get()` 方法使用 HTTP GET 请求从服务器加载数据。

**语法**

```js
$.get(URL,data,function(data,status,xhr),dataType)
```

| 参数                        | 描述                                                         |
| :-------------------------- | :----------------------------------------------------------- |
| *URL*                       | 必需。规定您需要请求的 URL。                                 |
| *data*                      | 可选。规定连同请求发送到服务器的数据。                       |
| *function(data,status,xhr)* | 可选。规定当请求成功时运行的函数。                                                                                                                                                      额外的参数：                                                                                                                                                                                                    *data* - 包含来自请求的结果数据                                                                                                                                                            *status* - 包含请求的状态（"success"、"notmodified"、"error"、"timeout"、"parsererror"）                                                         *xhr* - 包含 XMLHttpRequest 对象 |
| *dataType*                  | 可选。规定预期的服务器响应的数据类型。 默认地，jQuery 会智能判断。                                                                                          可能的类型：                                                                                                                                                                                               "xml" - 一个 XML 文档                                                                                                                                                                                "html" - HTML 作为纯文本                                                                                                                                                                              "text" - 纯文本字符串                                                                                                                                                                                      "script" - 以 JavaScript 运行响应，并以纯文本返回                                                                                                                                                        "json" - 以 JSON 运行响应，并以 JavaScript 对象返回                                                                                                                                  "jsonp" - 使用 JSONP 加载一个 JSON 块，将添加一个 "?callback=?" 到 URL 来规定回调 |

**示例**

发送一个 HTTP GET 请求到页面并取回结果：

```js
$("button").click(function(){
	$.get("demo_test.html",function(data,status){
		alert("Data: " + data + "\nStatus: " + status);
	});
});
```

## $.post() 方法

**定义和用法**

`$.post()` 方法使用 HTTP POST 请求从服务器加载数据。

**语法**

```js
 $(selector).post(URL,data,function(data,status,xhr),dataType)
```

| 参数                        | 描述                                                         |
| :-------------------------- | :----------------------------------------------------------- |
| *URL*                       | 必需。规定将请求发送到哪个 URL。                             |
| *data*                      | 可选。规定连同请求发送到服务器的数据。                       |
| *function(data,status,xhr)* | 可选。规定当请求成功时运行的函数。 额外的参数： *data* - 包含来自请求的结果数据*status* - 包含请求的状态（"success"、"notmodified"、"error"、"timeout"、"parsererror"）*xhr* - 包含 XMLHttpRequest 对象 |
| *dataType*                  | 可选。规定预期的服务器响应的数据类型。 默认地，jQuery 会智能判断。 可能的类型："xml" - 一个 XML 文档"html" - HTML 作为纯文本"text" - 纯文本字符串"script" - 以 JavaScript 运行响应，并以纯文本返回"json" - 以 JSON 运行响应，并以 JavaScript 对象返回"jsonp" - 使用 JSONP 加载一个 JSON 块，将添加一个 "?callback=?" 到 URL 来规定回调 |

**示例**

使用 AJAX 的 POST 请求来改变 `<div>` 元素的文本：

```js
$("input").keyup(function(){
    txt=$("input").val();
    $.post("demo_ajax_gethint.html",{suggest:txt},function(result){
    	$("span").html(result);
    });
});
```

## load() 方法

**定义和用法**

load() 方法从服务器加载数据，并把返回的数据放置到指定的元素中。

**注意：**还存在一个名为 load 的 jQuery [事件](https://www.w3cschool.cn/jquery/jquery-ref-events.html)方法。调用哪个，取决于参数。

**语法**

```js
 $(selector).load(url,data,function(response,status,xhr))
```

| 参数                            | 描述                                                         |
| :------------------------------ | :----------------------------------------------------------- |
| *url*                           | 必需。规定您需要加载的 URL。                                 |
| *data*                          | 可选。规定连同请求发送到服务器的数据。                       |
| *function(response,status,xhr)* | 可选。规定 load() 方法完成时运行的回调函数。  额外的参数：                                                                                                                                  *response* - 包含来自请求的结果数据                                                                                                                                                                             *status* - 包含请求的状态（"success"、"notmodified"、"error"、"timeout"、"parsererror"）                                                                         *xhr* - 包含 XMLHttpRequest 对象 |

**示例**

把文件 "demo_test.txt" 的内容加载到指定的 `<div>` 元素：

```js
$("button").click(function(){
	$("#div1").load("demo_test.txt");
});
```

## 
