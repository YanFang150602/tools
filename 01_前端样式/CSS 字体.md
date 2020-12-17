# CSS Fonts (字体)

## CSS 字体

CSS字体属性定义字体，加粗，大小，文字样式。

## CSS字型

在CSS中，有两种类型的字体系列名称：

- **通用字体系列** - 拥有相似外观的字体系统组合（如 "Serif" 或 "Monospace"）
- **特定字体系列** - 一个特定的字体系列（如 "Times" 或 "Courier"）

| Generic family | 字体系列                   | 说明                                        |
| :------------- | :------------------------- | :------------------------------------------ |
| Serif          | Times New Roman Georgia    | Serif字体中字符在行的末端拥有额外的装饰     |
| Sans-serif     | Arial Verdana              | "Sans"是指无 - 这些字体在末端没有额外的装饰 |
| Monospace      | Courier New Lucida Console | 所有的等宽字符具有相同的宽度                |

除了各种特定的字体系列外，CSS 定义了 5 种通用字体系列：

- Serif 字体
- Sans-serif 字体
- Monospace 字体
- Cursive 字体
- Fantasy 字体

## 字体系列font-family

font-family 属性设置文本的字体系列。

font-family 属性应该设置几个字体名称作为一种"后备"机制，如果浏览器不支持第一种字体，他将尝试下一种字体。

**注意**: 如果字体系列的名称超过一个字，它必须用引号，如 Font Family："宋体"。

多个字体系列是用一个逗号分隔指明：

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"> 
<title>W3Cschool教程(w3cschool.cn)</title>
<style>
    p.serif{
        font-family:"Times New Roman",Times,serif;
    }
    p.sansserif{
        font-family:Arial,Helvetica,sans-serif;
    }
</style>
</head>

<body>
    <h1>CSS font-family</h1>
    <p class="serif">这一段的字体是 Times New Roman 。</p>
    <p class="sansserif">这一段的字体是 Arial 。</p>

</body>
</html>
```

对于较常用的字体组合，看看我们的 [Web安全字体组合](https://www.w3cschool.cn/cssref/css-websafe-fonts.html)。

## 字体样式font-style

主要是用于指定斜体文字的字体样式属性。

这个属性有三个值：

- 正常（normal） - 正常显示文本
- 斜体 （italic） - 以斜体字显示的文字
- 倾斜的文字 （oblique） - 文字向一边倾斜（和斜体非常类似，但不太支持）

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"> 
<title>W3Cschool教程(w3cschool.cn)</title>
<style>
    p.normal {font-style:normal;}
    p.italic {font-style:italic;}
    p.oblique {font-style:oblique;}
</style>
</head>
<body>
    <p class="normal">这是一个段落, normal.</p>
    <p class="italic">这是一个段落, italic.</p>
    <p class="oblique">这是一个段落, oblique.</p>
</body>
</html>
```

### italic 和 oblique 的区别

- 斜体（italic）是一种简单的字体风格，对每个字母的结构有一些小改动，来反映变化的外观。
- 倾斜（oblique）文本是正常竖直文本的一个倾斜版本。

通常情况下，italic 和 oblique 文本在 web 浏览器中看上去完全一样。

## 字体大小font-size

font-size 属性设置文本的大小。

能否管理文字的大小，在网页设计中是非常重要的。但是，你不能通过调整字体大小使段落看上去像标题，或者使标题看上去像段落。

请务必使用正确的HTML标签，就<h1> - <h6>表示标题和<p>表示段落：

字体大小的值可以是绝对或相对的大小。

绝对大小：

- 设置一个指定大小的文本
- 不允许用户在所有浏览器中改变文本大小
- 确定了输出的物理尺寸时绝对大小很有用

相对大小：

- 相对于周围的元素来设置大小
- 允许用户在浏览器中改变文字大小

![Remark](https://7n.w3cschool.cn/statics/images/course/lamp.gif)如果你不指定一个字体的大小，默认大小和普通文本段落一样，是16像素（16px=1em）。

### 设置字体大小像素

设置文字的大小与像素，让您完全控制文字大小：

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"> 
<title>W3Cschool教程(w3cschool.cn)</title>
<style>
    h1 {font-size:40px;}
    h2 {font-size:30px;}
    p {font-size:14px;}
</style>
</head>
<body>

    <h1>这是标题1</h1>
    <h2>这是标题2</h2>
    <p>这是段落</p>
    <p>在px中指定字体大小允许internetexplorer9、Firefox、Chrome、Opera和Safari调整文本大小。</p>
    <p><b>提示:</b> 这个例子在IE的早期版本9中不起作用。</p>

</body>
</html>
```

上面的例子可以在 Internet Explorer 9, Firefox, Chrome, Opera, 和 Safari 调整文本大小。

**注意：**以上实例不能在IE9以前的版本运行。

虽然可以通过浏览器的缩放工具调整文本大小，但是，这种调整是整个页面，而不仅仅是文本

### 用em来设置字体大小

为了避免 Internet Explorer 中无法调整文本的问题，许多开发者使用 em 单位代替像素。

em 的尺寸单位由W3C建议。

1em 和当前字体大小相等。在浏览器中默认的文字大小是16px。

因此，1em的默认大小是16px。可以通过下面这个公式将像素转换为em：px/16=em

（注：16 等于父元素的默认字体大小，假设父元素的 font-size 为 30px，那么公式需改为：*pixels*/30=*em*）

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"> 
<title>W3Cschool教程(w3cschool.cn)</title>
<style>
    h1 {font-size:2.5em;} /* 40px/16=2.5em */
    h2 {font-size:1.875em;} /* 30px/16=1.875em */
    p {font-size:0.875em;} /* 14px/16=0.875em */
</style>
</head>
<body>

    <h1>这是标题1</h1>
    <h2>这是标题2</h2>
    <p>这是一个段落。</p>
    <p>在em中指定字体大小允许所有主要浏览器调整文本大小。
    不幸的是，旧版本的IE仍然存在问题。当调整文本大小时，它会变得比应该的大/小。
    </p>
</body>
</html>
```

在上面的例子，em 的文字大小是与前面的例子中像素一样。不过，如果使用 em 单位，则可以在所有浏览器中调整文本大小。

不幸的是，仍然是 IE 浏览器的问题。调整文本的大小时，会比正常的尺寸更大或更小。

### 使用百分比和EM组合

在所有浏览器的解决方案中，设置 <body>元素的默认字体大小的是百分比：

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"> 
<title>W3Cschool教程(w3cschool.cn)</title>
<style>
    body {font-size:100%;}
    h1 {font-size:2.5em;}
    h2 {font-size:1.875em;}
    p {font-size:0.875em;}
</style>
</head>
<body>
    我是老大
    <h1>这是标题1</h1>
    <h2>这是标题2</h2>
    <p>这是一个段落。</p>
    <p>以百分比和em指定字体大小将显示相同的大小
    主要浏览器，并允许所有浏览器调整文本大小！</p>

</body>
</html>
```

我们的代码非常有效。在所有浏览器中，可以显示相同的文本大小，并允许所有浏览器缩放文本的大小。

## 所有CSS字体属性

| Property                                                     | 描述                                 |
| :----------------------------------------------------------- | :----------------------------------- |
| [font](https://www.w3cschool.cn/cssref/pr-font-font.html)    | 在一个声明中设置所有的字体属性       |
| [font-family](https://www.w3cschool.cn/cssref/pr-font-font-family.html) | 指定文本的字体系列                   |
| [font-size](https://www.w3cschool.cn/cssref/pr-font-font-size.html) | 指定文本的字体大小                   |
| [font-style](https://www.w3cschool.cn/cssref/pr-font-font-style.html) | 指定文本的字体样式                   |
| [font-variant](https://www.w3cschool.cn/cssref/pr-font-font-variant.html) | 以小型大写字体或者正常字体显示文本。 |
| [font-weight](https://www.w3cschool.cn/cssref/pr-font-weight.html) | 指定字体的粗细。                     |

# CSS Web安全字体

## 常用的字体组合

font-family属性是多种字体的名称，作为一个"应变"制度，以确保浏览器/操作系统之间的最大兼容性。如果浏览器不支持的第一个字体，它尝试下一个的字体。

你想要的字体类型如果浏览器找不到，它会从通用的字体类型中找到与你相似的。

下面是一些常用的字体组合，通用的字体系列。

## Serif 字体

| 字体                                                 | 文本示例                             |
| :--------------------------------------------------- | :----------------------------------- |
| Georgia, serif                                       | This is a headingThis is a paragraph |
| "Palatino Linotype", "Book Antiqua", Palatino, serif | This is a headingThis is a paragraph |
| "Times New Roman", Times, serif                      | This is a headingThis is a paragraph |

## sans - serif字体

| 字体                                               | 文本示例                             |
| :------------------------------------------------- | :----------------------------------- |
| Arial, Helvetica, sans-serif                       | This is a headingThis is a paragraph |
| Arial Black, Gadget, sans-serif                    | This is a headingThis is a paragraph |
| "Comic Sans MS", cursive, sans-serif               | This is a headingThis is a paragraph |
| Impact, Charcoal, sans-serif                       | This is a headingThis is a paragraph |
| "Lucida Sans Unicode", "Lucida Grande", sans-serif | This is a headingThis is a paragraph |
| Tahoma, Geneva, sans-serif                         | This is a headingThis is a paragraph |
| "Trebuchet MS", Helvetica, sans-serif              | This is a headingThis is a paragraph |
| Verdana, Geneva, sans-serif                        | This is a headingThis is a paragraph |

## Monospace 字体

| 字体                                | 文本示例                             |
| :---------------------------------- | :----------------------------------- |
| "Courier New", Courier, monospace   | This is a headingThis is a paragraph |
| "Lucida Console", Monaco, monospace | This is a headingThis is a paragraph |
