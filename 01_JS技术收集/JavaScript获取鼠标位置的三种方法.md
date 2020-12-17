# `clientX`、`offsetX`、`screenX`、`pageX`、x的区别

## `clientX`、`clientY`

点击位置距离当前body可视区域的x，y坐标（相对于浏览器）

## `pageX`、`pageY`

对于整个页面来说，包括了被卷去的body部分的长度

## `screenX`、`screenY`

点击位置距离当前电脑屏幕的x，y坐标

## `offsetX`、`offsetY`

相对于带有定位的父盒子的x，y坐标

## x、y

和`screenX`、`screenY`一样

# JavaScript获取鼠标位置的三种方法

在一些DOM操作中我们经常会跟元素的位置打交道，鼠标交互式一个经常用到的方面，令人失望的是不同的游览器下会有不同的结果，甚至是有的游览器下没结果，这篇文章就鼠标点击位置坐标获取，做一些简单的总结。

获取鼠标位置首先要了解什么是event，event是一个声明了全局变量的一个对象！

在chrome和IE下，可以随意访问event，但在Firefox下，是没有event这个对象的！！！

## 鼠标点击位置坐标

### 相对于屏幕

如果是涉及到鼠标点击确定位置相对比较简单，获取到鼠标点击事件后，事件`screenX`，`screenY`获取的是点击位置相对于屏幕的左边距与上边距，不考虑iframe因素，不同游览器下表现的还算一致。

```js
function getMousePos(event) {
      var e = event || window.event;
      return {'x': e.screenX, 'y': e.screenY}
}
```

### 相对于游览器窗口

简单代码即可实现，然而这时还不够，因为绝大多数情况下我们希望获取鼠标点击位置相对于游览器窗口的坐标，`event`的`clientX`，`clientY`属性分别表示鼠标点击位置相对于文档的左边距，上边距。

```js
function getMousePos(event) {
      var e = event || window.event;
      return {'x': e.clientX, 'y': e.clientY}
}
```

### 相对于文档

`clientX`与`clientY`是获取相对于当前屏幕的坐标，忽略了页面滚动因素，这在很多环境下很有用，但当我们需要考虑页面滚动，也就是相对于文档（body元素）的坐标时怎么办呢？只要加上滚动的位移就可以了。

在chrome可以通过`document.body.scrollLeft`，`document.body.scrollTop`计算出页面滚动位移，

而在IE下可以通过`document.documentElement.scrollLeft`，`document.documentElement.scrollTop`

```js
function getMousePos(event) {
       var e = event || window.event;
       var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
       var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
       var x = e.pageX || e.clientX + scrollX;
       var y = e.pageY || e.clientY + scrollY;
       console.log(JSON.stringify({ 'x': x, 'y': y }));
}
```

