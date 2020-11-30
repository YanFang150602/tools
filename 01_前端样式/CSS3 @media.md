# CSS3 多媒体查询

## CSS2 多媒体类型

`@media` 规则在 CSS2 中有介绍，针对不同媒体类型可以定制不同的样式规则。

例如：你可以针对不同的媒体类型(包括显示器、便携设备、电视机，等等)设置不同的样式规则。

但是这些多媒体类型在很多设备上支持还不够友好。

## CSS3 多媒体查询

CSS3 的多媒体查询继承了 CSS2 多媒体类型的所有思想： 取代了查找设备的类型，CSS3 根据设置自适应显示。

媒体查询可用于检测很多事情，例如：

- viewport(视窗) 的宽度与高度
- 设备的宽度与高度
- 朝向 (智能手机横屏，竖屏) 。
- 分辨率

目前很多针对苹果手机，Android 手机，平板等设备都会使用到多媒体查询。

## 多媒体查询语法

多媒体查询由多种媒体组成，可以包含一个或多个表达式，表达式根据条件是否成立返回 true 或 false。

```css
@media not|only mediatype and (expressions) {
    CSS-Code;
}
```

如果指定的多媒体类型匹配设备类型则查询结果返回 true，文档会在匹配的设备上显示指定样式效果。

除非你使用了 not 或 only 操作符，否则所有的样式会适应在所有设备上显示效果。

- **not**：not是用来排除掉某些特定的设备的，比如 @media not print（非打印设备）。
- **only**： 用来定某种特别的媒体类型。对于支持Media Queries的移动设备来说，如果存在only关键字，移动设备的Web浏览器会忽略only关键字并直接根据后面的表达式应用样式文件。对于不支持Media Queries的设备但能够读取Media Type类型的Web浏览器，遇到only关键字时会忽略这个样式文件。
- **all**： 所有设备，这个应该经常看到。

你也可以在不同的媒体上使用不同的样式文件：

```html
<link rel="stylesheet" media="mediatype and|not|only (expressions)" href="print.css">
```

## CSS3 多媒体类型

| 值     | 描述                             |
| :----- | :------------------------------- |
| all    | 用于所有多媒体类型设备           |
| print  | 用于打印机                       |
| screen | 用于电脑屏幕，平板，智能手机等。 |
| speech | 用于屏幕阅读器                   |

## 多媒体查询简单实例

使用多媒体查询可以在指定的设备上使用对应的样式替代原有的样式。

以下实例中在屏幕可视窗口尺寸大于 480 像素的设备上修改背景颜色：

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"> 
<title>W3Cschool教程(w3cschool.cn)</title> 
<style>
body {
    background-color: pink;
}

@media screen and (min-width: 480px) {
    body {
        background-color: lightgreen;
    }
}
</style>
</head>
<body>

<h1>重置浏览器窗口查看效果！</h1>
<p>如果媒体类型屏幕的可视窗口宽度小于 480 px ，背景颜色将改变。</p>

</body>
</html>
```

以下实例在屏幕可视窗口尺寸大于 480 像素时将菜单浮动到页面左侧：

```html
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta charset="utf-8"> 
<title>W3Cschool教程(w3cschool.cn)</title> 
<style>
.wrapper {overflow:auto;}

#main {margin-left: 4px;}
#leftsidebar {float: none;width: auto;}
#menulist {margin:0;padding:0;}

.menuitem {
    background:#CDF0F6;
    border:1px solid #d4d4d4;
    border-radius:4px;
    list-style-type:none;
    margin:4px;
    padding:2px;
}

@media screen and (min-width: 480px) {
    #leftsidebar {width:200px;float:left;}
    #main {margin-left:216px;}
}
</style>
</head>
<body>

<div class="wrapper">
  <div id="leftsidebar">
    <ul id="menulist">
      <li class="menuitem">Menu-item 1</li>
      <li class="menuitem">Menu-item 2</li>
      <li class="menuitem">Menu-item 3</li>
      <li class="menuitem">Menu-item 4</li>
      <li class="menuitem">Menu-item 5</li>
   </ul>
  </div>
  <div id="main">
    <h1>重置浏览器窗口查看效果！</h1>
    <p>在屏幕可视窗口尺寸小于 480 像素时将菜单浮动到页面左侧。</p>
  </div>
</div>

</body>
</html>
```

# CSS3 @media查询

## 定义和使用

使用 @media 查询，你可以针对不同的媒体类型定义不同的样式。

@media 可以针对不同的屏幕尺寸设置不同的样式，特别是如果你需要设置设计响应式的页面，@media 是非常有用的。

当你重置浏览器大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面。

## CSS 语法

```css
@media mediatype and|not|only (media feature) {
    CSS-Code;
}
```

你也可以针对不同的媒体使用不同 *stylesheets* :

```html
<link rel="stylesheet" media="mediatype and|not|only (media feature)" href="mystylesheet.css">
```

## 实例

如果文档宽度小于 300 像素则修改背景演示(background-color):

```html
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<style>
body {
    background-color:lightgreen;
}

@media screen and (max-width: 300px) {
    body {
        background-color:lightblue;
    }
}
</style>
</head>
<body>
<p>重置浏览器查看大小。当浏览器窗口的宽度小于 300 像素时，背景颜色会变成淡蓝，否则是淡绿色。<input type="button" onclick="resize_window()" value="查看效果"></p>
<SCRIPT>
<!--
function resize_window() {
        window.open ('http://www.w3cschool.cn/try/demo_source/trycss3_media_example1.htm','newwindow','height=299,width=299,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no')
}
//写成一行
-->
</SCRIPT>

</body>
</html>
```

# CSS 媒体类型

媒体类型允许你指定文件将如何在不同媒体呈现。该文件可以以不同的方式显示在屏幕上，在纸张上，或听觉浏览器等等。 

## 媒体类型

某些 CSS 属性仅仅被设计为针对某些媒介。比方说 `voice-family` 属性被设计为针对听觉用户终端。其他一些属性可用于不同的媒体类型。例如，`font-size`属性可用于屏幕和印刷媒体，但有不同的值。屏幕和纸上的文件不同，通常需要一个更大的字体，`sans - serif`字体比较适合在屏幕上阅读，而 serif 字体更容易在纸上阅读。

| 值         | 描述                                                         |
| :--------- | :----------------------------------------------------------- |
| all        | 用于所有设备                                                 |
| aural      | 已废弃。用于语音和声音合成器                                 |
| braille    | 已废弃。 应用于盲文触摸式反馈设备                            |
| embossed   | 已废弃。 用于打印的盲人印刷设备                              |
| handheld   | 已废弃。 用于掌上设备或更小的装置，如PDA和小型电话           |
| print      | 用于打印机和打印预览                                         |
| projection | 已废弃。 用于投影设备                                        |
| screen     | 用于电脑屏幕，平板电脑，智能手机等。                         |
| speech     | 应用于屏幕阅读器等发声设备                                   |
| tty        | 已废弃。 用于固定的字符网格，如电报、终端设备和对字符有限制的便携设备 |
| tv         | 已废弃。 用于电视和网络电视                                  |

## @media 规则

@media 规则允许在相同样式表为不同媒体设置不同的样式。

在下面的例子告诉我们浏览器屏幕上显示一个14像素的 Verdana 字体样式。但是如果页面打印，将是10个像素的 Times 字体。请注意，`font-weight`在屏幕上和纸上设置为粗体：

| 值                      | 描述                                                         |
| :---------------------- | :----------------------------------------------------------- |
| aspect-ratio            | 定义输出设备中的页面可见区域宽度与高度的比率                 |
| color                   | 定义输出设备每一组彩色原件的个数。如果不是彩色设备，则值等于0 |
| color-index             | 定义在输出设备的彩色查询表中的条目数。如果没有使用彩色查询表，则值等于0 |
| device-aspect-ratio     | 定义输出设备的屏幕可见宽度与高度的比率。                     |
| device-height           | 定义输出设备的屏幕可见高度。                                 |
| device-width            | 定义输出设备的屏幕可见宽度。                                 |
| grid                    | 用来查询输出设备是否使用栅格或点阵。                         |
| height                  | 定义输出设备中的页面可见区域高度。                           |
| max-aspect-ratio        | 定义输出设备的屏幕可见宽度与高度的最大比率。                 |
| max-color               | 定义输出设备每一组彩色原件的最大个数。                       |
| max-color-index         | 定义在输出设备的彩色查询表中的最大条目数。                   |
| max-device-aspect-ratio | 定义输出设备的屏幕可见宽度与高度的最大比率。                 |
| max-device-height       | 定义输出设备的屏幕可见的最大高度。                           |
| max-device-width        | 定义输出设备的屏幕最大可见宽度。                             |
| max-height              | 定义输出设备中的页面最大可见区域高度。                       |
| max-monochrome          | 定义在一个单色框架缓冲区中每像素包含的最大单色原件个数。     |
| max-resolution          | 定义设备的最大分辨率。                                       |
| max-width               | 定义输出设备中的页面最大可见区域宽度。                       |
| min-aspect-ratio        | 定义输出设备中的页面可见区域宽度与高度的最小比率。           |
| min-color               | 定义输出设备每一组彩色原件的最小个数。                       |
| min-color-index         | 定义在输出设备的彩色查询表中的最小条目数。                   |
| min-device-aspect-ratio | 定义输出设备的屏幕可见宽度与高度的最小比率。                 |
| min-device-width        | 定义输出设备的屏幕最小可见宽度。                             |
| min-device-height       | 定义输出设备的屏幕的最小可见高度。                           |
| min-height              | 定义输出设备中的页面最小可见区域高度。                       |
| min-monochrome          | 定义在一个单色框架缓冲区中每像素包含的最小单色原件个数       |
| min-resolution          | 定义设备的最小分辨率。                                       |
| min-width               | 定义输出设备中的页面最小可见区域宽度。                       |
| monochrome              | 定义在一个单色框架缓冲区中每像素包含的单色原件个数。如果不是单色设备，则值等于0 |
| orientation             | 定义输出设备中的页面可见区域高度是否大于或等于宽度。         |
| resolution              | 定义设备的分辨率。如：96dpi, 300dpi, 118dpcm                 |
| scan                    | 定义电视类设备的扫描工序。                                   |
| width                   | 定义输出设备中的页面可见区域宽度。                           |

## 实例

使用 @media 查询来制作响应式设计：

```html
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<style>
body {
    font-family:"Lucida Sans", Verdana, sans-serif;
}

.main img {
    width:100%;
}

h1{
    font-size:1.625em;
}

h2{
    font-size:1.375em;
}

.header {
    padding:1.0121457489878542510121457489879%;
    background-color:#f1f1f1;
    border:1px solid #e9e9e9;
}

.menuitem {
    margin:4.310344827586206896551724137931%;
    margin-left:0;
    margin-top:0;
    padding:4.310344827586206896551724137931%;
    border-bottom:1px solid #e9e9e9;
    cursor:pointer;
}

.main {
    padding:2.0661157024793388429752066115702%;
}

.right {
    padding:4.310344827586206896551724137931%;
    background-color:#CDF0F6;
}

.footer {
    padding:1.0121457489878542510121457489879%;
    text-align:center;
    background-color:#f1f1f1;
    border:1px solid #e9e9e9;
    font-size:0.625em;
}

.gridcontainer {
	width:100%;
}

.gridwrapper {
	overflow:hidden;
}

.gridbox {
    margin-bottom:2.0242914979757085020242914979757%;
    margin-right: 2.0242914979757085020242914979757%;
    float:left;
}

.gridheader {
    width:100%;
}

.gridmenu {
    width:23.481781376518218623481781376518%;
}

.gridmain {
    width:48.987854251012145748987854251012%;
}

.gridright {
    width:23.481781376518218623481781376518%;
    margin-right:0;
}

.gridfooter {
    width:100%;
    margin-bottom:0;
}

@media only screen and (max-width: 500px) {
    .gridmenu {
        width:100%;
    }

    .menuitem {
        margin:1.0121457489878542510121457489879%;
        padding:1.0121457489878542510121457489879%;
    }

    .gridmain {
        width:100%;
    }

    .main {
        padding:1.0121457489878542510121457489879%;
    }

    .gridright {
        width:100%;
    }

    .right {
        padding:1.0121457489878542510121457489879%;
    }

    .gridbox {
        margin-right:0;
        float:left;
    }
}

</style>
</head>
<body>
<div class="gridcontainer">
    <div class="gridwrapper">
        <div class="gridbox gridheader">
            <div class="header">
                <h1>The Pulpit Rock</h1>
            </div>
        </div>
        <div class="gridbox gridmenu">
            <div class="menuitem">The Drive</div>
            <div class="menuitem">The Walk</div>
            <div class="menuitem">The Return</div>
            <div class="menuitem">The End</div>
        </div>
        <div class="gridbox gridmain">
            <div class="main">
<h1>The Walk</h1>
<p>The walk to the Pulpit Rock will take you approximately two hours, give or take an hour depending on the weather conditions and your physical shape.</p>
<img src="pulpitrock.jpg" alt="Pulpit rock" width="" height="">

            </div>
        </div>
        <div class="gridbox gridright">
            <div class="right">
<h2>What?</h2>
<p>The Pulpit Rock is a part of a mountain that looks like a pulpit.</p>
<h2>Where?</h2>
<p>The Pulpit Rock is in Norway</p>
<h2>Price?</h2>
<p>The walk is free!</p>
            </div>
        </div>
        <div class="gridbox gridfooter">
            <div class="footer">
<p>This web page is a part of a demonstration of fluid web design made by www.W3Cschool.com. Resize the browser window to see the content response to the resizing.</p>
            </div>
        </div>
    </div>
</div>
</body>
</html>
```

