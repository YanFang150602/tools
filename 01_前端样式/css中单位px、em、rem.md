## [彻底弄懂css中单位px和em,rem的区别](https://www.cnblogs.com/wuguoyuan/p/rem.html)

国内的设计师大都喜欢用px，而国外的网站大都喜欢用em和rem，那么三者有什么区别，又各自有什么优劣呢？

### PX特点

-1. IE无法调整那些使用px作为单位的字体大小；

-2. 国外的大部分网站能够调整的原因在于其使用了em或rem作为字体单位；

-3. Firefox能够调整px和em，rem，但是有大部分的国产浏览器使用IE内核。

**px像素（Pixel）。相对长度单位。像素px是相对于显示器屏幕分辨率而言的。(引自CSS2.0手册)**

### EM特点

-1. em的值并不是固定的；

-2. em会继承父级元素的字体大小。

**em是相对长度单位。相对于当前对象内文本的字体尺寸。如当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸。(引自CSS2.0手册)**

em是相对长度单位。相对于当前对象内文本的字体尺寸。如当前对行内文本的字体尺寸未被人为设置，**则相对于浏览器的默认字体尺寸,浏览器字体默认为16px**。

- 所以，1em = 16px。默认情况下。

### 如何高效使用em呢

- body里声明font-size:62.5%。即全局声明`1em = 16px * 62.5% = 10px`
- 之后可以把`em`当做`px`使用。当然此时，`1em = 10px`
- 如果在父容器里说明了`font-size:20px`,那么在子容器里的`1em`就等于`20px`。

### rem特点

rem单位是相对于字体大小的**html元素**，也称为根元素。

```css
html {
  font-size: 10px; /* 不建议设置 font-size: 62.5%; 在 IE 9-11 上有偏差，具体表现为 1rem = 9.93px。 */
}

.sqaure {
  width: 5rem;  /* 50px */
  height: 5rem; /* 50px */
}
```

rem是CSS3新增的一个相对单位（root em，根em），这个单位引起了广泛关注。这个单位与em有什么区别呢？区别在于使用rem为元素设定字体大小时，仍然是相对大小，但相对的只是HTML根元素。这个单位可谓集相对大小和绝对大小的优点于一身，通过它既可以做到只修改根元素就成比例地调整所有字体大小，又可以避免字体大小逐层复合的连锁反应。目前，除了IE8及更早版本外，所有浏览器均已支持rem。对于不支持它的浏览器，应对方法也很简单，就是多写一个绝对单位的声明。这些浏览器会忽略用rem设定的字体大小。下面就是

一个例子：

```
p {font-size:14px; font-size:.875rem;}
```

### em与rem

- rem是相对于根元素（html）的字体大小，而em是相对于其父元素的字体大小。
- em最多取到小数点的后三位

```html
<style>
  html{ font-size: 20px; }
  body{ 
    font-size: 1.4rem;  /* 1rem = 28px = 1.4 * 20px */
    padding: 0.7rem;  /* 0.7rem = 14px = 0.7 * 20px */
  } 
  div{
    padding: 1em;  /* 1em = 28px = 1* 28px; body（div的父元素）字体大小28px */
  }
  span{
    font-size:1rem;  /* 1rem = 20px = 1 * 20px;*/
    padding: 0.9em;  /* 0.9em = 18px = 0.9 * 1rem = 0.9 * 20px */
  }
</style>

<html>
  <body>
    <div>   
      <span></span>  
    </div>
  </body>
</html>
```

上面的例子中，`em 会层层继承父元素的字体大小`，很容易造成字体大小的混乱。所以以后用`rem`会更好。

### 注意

选择使用什么字体单位主要由你的项目来决定，如果你的用户群都使用最新版的浏览器，那推荐使用rem，如果要考虑兼容性，那就使用px,或者两者同时使用。

在这里为大家提供一个px,em,rem单位转换工具

地址：http://pxtoem.com/
