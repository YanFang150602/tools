# HTML5 拖放

## HTML5 拖放（Drag 和 Drop）

拖放的目的是可以让你将某个对象放置到你想要放置的位置。

拖放（Drag 和 drop）是 HTML5 标准的组成部分。

### 拖放

拖放是一种常见的特性，即抓取对象以后拖到另一个位置。

在 HTML5 中，拖放是标准的一部分，任何元素都能够拖放。

**实例**

下面的例子是一个简单的拖放实例：

```html
<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8"> 
<title>W3Cschool教程(w3cschool.cn)</title>
<style type="text/css">
#div1 {width:350px;height:70px;padding:10px;border:1px solid #aaaaaa;}
</style>
<script>
function allowDrop(ev)
{
	ev.preventDefault();
}

function drag(ev)
{
	ev.dataTransfer.setData("Text",ev.target.id);
}

function drop(ev)
{
	ev.preventDefault();
	var data=ev.dataTransfer.getData("Text");
	ev.target.appendChild(document.getElementById(data));
}
</script>
</head>
<body>

<p>拖动 w3cschool.cn 图片到矩形框中:</p>

<div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
<br>
<img id="drag1" src="/statics/images/logo.png" draggable="true" ondragstart="drag(event)" width="336" height="69">

</body>
</html>
```

它看上去也许有些复杂，不过我们可以分别研究拖放事件的不同部分。

**1、设置元素为可拖放**

首先，为了使元素可拖动，把 draggable 属性设置为 true ：

```html
<img draggable="true">
```

**2、拖动什么 - ondragstart 和 setData()**

然后，规定当元素被拖动时，会发生什么。

在上面的例子中，ondragstart 属性调用了一个函数，drag(event)，它规定了被拖动的数据。

`dataTransfer.setData()` 方法设置被拖数据的数据类型和值：

```js
function drag(ev)        
{
	ev.dataTransfer.setData("Text",ev.target.id);       
}
```

在这个例子中，数据类型是 "Text"，值是可拖动元素的 id ("drag1")。

**3、放到何处 - ondragover**

[ondragover 事件](https://www.w3cschool.cn/jsref/event-ondragover.html)规定在何处放置被拖动的数据。

默认地，无法将数据/元素放置到其他元素中。如果需要设置允许放置，我们必须阻止对元素的默认处理方式。

这要通过调用 ondragover 事件的 `event.preventDefault()` 方法：

```js
event.preventDefault()
```

**4、进行放置 - ondrop**

当放置被拖数据时，会发生 drop 事件。

在上面的例子中，ondrop 属性调用了一个函数，drop(event)：

```js
function drop(ev)        
{        
    ev.preventDefault();        
    var data=ev.dataTransfer.getData("Text");        
    ev.target.appendChild(document.getElementById(data));        
}
```

代码解释：

- 调用 preventDefault() 来避免浏览器对数据的默认处理（drop 事件的默认行为是以链接形式打开）
- 通过 `dataTransfer.getData("Text")` 方法获得被拖的数据。该方法将返回在 setData() 方法中设置为相同类型的任何数据。
- 被拖数据是被拖元素的 id ("drag1")
- 把被拖元素追加到放置元素（目标元素）中

### 拖放事件

在拖放的过程中会触发以下事件：

- 在拖动目标上触发事件(源元素):
  - [ondragstart](https://www.w3cschool.cn/jsref/event-ondragstart.html) - 用户开始拖动元素时触发（被拖动的元素）
  - ondrag - 元素正在拖动时触发（被拖动的元素）
  - [ondragend](https://www.w3cschool.cn/jsref/event-ondragend.html) - 用户完成元素拖动后触发（被拖动的元素）
- 释放目标时触发的事件:
  - [ondragenter](https://www.w3cschool.cn/jsref/event-ondragenter.html) - 当被鼠标拖动的对象进入其容器范围内时触发此事件（被拖进的容器）
  - [ondragover](https://www.w3cschool.cn/jsref/event-ondragover.html) - 当某被拖动的对象在另一对象容器范围内拖动时触发此事件（被拖进的容器）
  - [ondragleave](https://www.w3cschool.cn/jsref/event-ondragleave.html) - 当被鼠标拖动的对象离开其容器范围内时触发此事件 （被拖进的容器）
  - [ondrop](https://www.w3cschool.cn/jsref/event-ondrop.html) - 在一个拖动过程中，释放鼠标键时触发此事件（被拖进的容器）

**注意：** 在拖动元素时，每隔 350 毫秒会触发 ondrag 事件。

拖放是 HTML5 中非常常见的功能。 更多信息可以查看我们 HTML 教程中的 [HTML5 拖放](https://www.w3cschool.cn/html5/html5-draganddrop.html)。

**注意：** 为了让元素可拖动，需要使用 HTML5[draggable](https://www.w3cschool.cn/htmltags/att-global-draggable.html) 属性。

**提示：** 链接和图片默认是可拖动的，不需要 draggable 属性。

## ondragstart 事件（源元素被开始拖动时触发）

**实例**

在用户开始拖动 <p> 元素时执行 JavaScript :

```html
<p draggable="true" ondragstart="myFunction(event)">拖动我!</p>
```

**定义和用法**

ondragstart 事件在用户开始拖动元素或选择的文本时触发。

**语法**

HTML 中：

```
<element ondragstart="myScript">
```

JavaScript 中：

```
object.ondragstart=function(){myScript};
```

JavaScript 中, 使用 addEventListener() 方法:

```
object.addEventListener("dragstart", myScript);
```

## ondrag 事件（源元素被拖动过程中触发）

**实例**

在 <p> 元素开始拖动时执行 JavaScript:

```html
<p draggable="true" ondrag="myFunction(event)">拖动我!</p>
```

**定义和用法**

ondrag 事件在元素或者选取的文本被拖动时触发。

**语法**

HTML 中：

```
<element ondrag="myScript">
```

JavaScript 中：

```
object.ondrag=function(){myScript};
```

JavaScript 中, 使用 addEventListener() 方法:

```
object.addEventListener("drag", myScript);
```

## ondragend 事件（源元素被完成拖动时触发）

**实例**

在用户完成 <p> 元素的拖动时执行 JavaScript :

```html
<p draggable="true" ondragend="myFunction(event)">拖动我!</p>
```

**定义和用法**

ondragend 事件在用户完成元素或首选文本的拖动时触发。

**语法**

HTML 中：

```
<element ondragend="myScript">
```

JavaScript 中：

```
object.ondragend=function(){myScript};
```

JavaScript 中, 使用 addEventListener() 方法:

```
object.addEventListener("dragend", myScript);
```

## ondragenter 事件（源元素进入目标容器时，目标容器触发）

**实例**

在拖动的元素进入到放置目标时执行 JavaScript :

```
<div ondragenter="myFunction(event)"></div>
```

**定义和用法**

ondragenter 事件在拖动的元素或选择的文本进入到有效的放置目标时触发。

ondragenter 和 ondragleave 事件可以帮助用户更好的理解可拖动元素进入和离开放置区域的过程。 你可以在可拖动元素进入和离开放置区域时设置不同的背景颜色。

**语法**

HTML 中：

```
<element ondragenter="myScript">
```

JavaScript 中：

```
object.ondragenter=function(){myScript};
```

JavaScript 中, 使用 addEventListener() 方法:

```
object.addEventListener("dragenter", myScript);
```

## ondragover 事件（源元素在目标容器中拖动时，目标容器触发）

**实例**

在元素正在拖动到放置目标时触发：

```
<div ondragover="myFunction(event)"></div>
```

**定义和用法**

ondragover 事件在可拖动元素或选取的文本正在拖动到放置目标时触发。

默认情况下，数据/元素不能放置到其他元素中。 如果要实现改功能，我们需要防止元素的默认处理方法。我们可以通过调用 `event.preventDefault()` 方法来实现 ondragover 事件。

**语法**

HTML 中：

```
<element ondragover="myScript">
```

JavaScript 中：

```
object.ondragover=function(){myScript};
```

JavaScript 中, 使用 addEventListener() 方法:

```
object.addEventListener("dragover", myScript);
```

## ondragleave 事件（源元素离开目标容器时，目标容器触发）

**实例**

在可拖动的元素移出放置目标时执行 JavaScript :

```
<div ondragleave="myFunction(event)"></div>
```

**定义和用法**

ondragleave 事件在可拖动的元素或选取的文本移出放置目标时执触发。

ondragenter 和 ondragleave 事件可以帮助用户更好的理解可拖动元素进入和离开放置区域的过程。 你可以在可拖动元素进入和离开放置区域时设置不同的背景颜色。

**语法**

HTML 中：

```
<element ondragleave="myScript">
```

JavaScript 中：

```
object.ondragleave=function(){myScript};
```

JavaScript 中, 使用 addEventListener() 方法:

```
object.addEventListener("dragleave", myScript);
```

## ondrop 事件（源元素被完成拖动时，目标容器触发）

**实例**

在可拖动元素放置在 <div> 元素中时执行 JavaScript:

```
<div ondrop="myFunction(event)"></div>
```

**定义和用法**

ondrop 事件在可拖动元素或选取的文本放置在目标区域时触发。

**语法**

HTML 中：

```
<element ondrop="myScript">
```

JavaScript 中：

```
object.ondrop=function(){myScript};
```

JavaScript 中, 使用 addEventListener() 方法:

```
object.addEventListener("drop", myScript);
```

## 完整实例

```html
<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<title>W3Cschool教程(w3cschool.cn)</title>
<style>
.droptarget {
    float: left; 
    width: 100px; 
    height: 35px;
    margin: 15px;
    padding: 10px;
    border: 1px solid #aaaaaa;
}
</style>
</head>
<body>

<p>在两个矩形框中来回拖动 p 元素:</p>
<div class="droptarget">
	<p draggable="true" id="dragtarget">拖动我!</p>
</div>
<div class="droptarget"></div>
<p style="clear:both;"><strong>注意：</strong>Internet Explorer 8 及更早 IE 版本或 Safari 5.1 及更早版本的浏览器不支持 drag 事件。</p>
<p id="demo"></p>
<script>
/* 拖动时触发*/
document.addEventListener("dragstart", function(event) {
    //dataTransfer.setData()方法设置数据类型和拖动的数据
    event.dataTransfer.setData("Text", event.target.id);
    // 拖动 p 元素时输出一些文本
    document.getElementById("demo").innerHTML = "开始拖动 p 元素.";    
    //修改拖动元素的透明度
    event.target.style.opacity = "0.4";
});
//在拖动p元素的同时,改变输出文本的颜色
document.addEventListener("drag", function(event) {
    document.getElementById("demo").style.color = "red";
});
// 当拖完p元素输出一些文本元素和重置透明度
document.addEventListener("dragend", function(event) {
    document.getElementById("demo").innerHTML = "完成 p 元素的拖动";
    event.target.style.opacity = "1";
});
/* 拖动完成后触发 */
// 当p元素完成拖动进入droptarget,改变div的边框样式
document.addEventListener("dragenter", function(event) {
    if ( event.target.className == "droptarget" ) {
        event.target.style.border = "3px dotted red";
    }
});
// 默认情况下,数据/元素不能在其他元素中被拖放。对于drop我们必须防止元素的默认处理
document.addEventListener("dragover", function(event) {
    event.preventDefault();
});
// 当可拖放的p元素离开droptarget，重置div的边框样式
document.addEventListener("dragleave", function(event) {
    if ( event.target.className == "droptarget" ) {
        event.target.style.border = "";
    }
});
/*对于drop,防止浏览器的默认处理数据(在drop中链接是默认打开)
复位输出文本的颜色和DIV的边框颜色
利用dataTransfer.getData()方法获得拖放数据
拖拖的数据元素id(“drag1”)
拖拽元素附加到drop元素*/
document.addEventListener("drop", function(event) {
    event.preventDefault();
    if ( event.target.className == "droptarget" ) {
        document.getElementById("demo").style.color = "";
        event.target.style.border = "";
        var data = event.dataTransfer.getData("Text");
        event.target.appendChild(document.getElementById(data));
    }
});
</script>

</body>
</html>
```

