进阶篇（上）概要
本篇涉及的内容包括回流重绘、布局

回流重绘：回流和重绘是CSS中很重要的概念，了解和认识它们，可编写出性能更好的CSS代码。

布局：开发每一张网页都离不开布局，基于良好布局打下基础，才能使后续的开发更顺利。

§ 回流重绘
§ 回流
回流又名重排，指几何属性需改变的渲染。渲染树的节点发生改变，影响了该节点的几何属性，导致该节点位置发生变化，此时就会触发浏览器回流并重新生成渲染树。回流意味着节点的几何属性改变，需重新计算并生成渲染树，导致渲染树的全部或部分发生变化。

§ 重绘
重绘指更改外观属性而不影响几何属性的渲染。相比回流，重绘在两者中会温和一些，后续谈到的CSS性能优化就会基于该特点展开。渲染树的节点发生改变，但是不影响该节点的几何属性。由此可见，回流对浏览器性能的消耗是高于重绘的，而且回流一定会伴随重绘，重绘却不一定伴随回流。

§ 属性分类
几何属性：包括布局、尺寸等可用数学几何衡量的属性
布局：display、float、position、list、table、flex、columns、grid

尺寸：margin、padding、border、width、height

外观属性：包括界面、文字等可用状态向量描述的属性
界面：appearance、outline、background、mask、box-shadow、box-reflect、filter、opacity、clip

文字：text、font、word

§ 性能优化
回流重绘在操作节点样式时频繁出现，同时也存在很大程度上的性能问题。回流成本比重绘成本高得多，一个节点的回流很有可能导致子节点、兄弟节点或祖先节点的回流。

§ DOM节点操作带来的性能问题
改变窗口大小

修改盒模型

增删样式

重构布局

重设尺寸

改变字体

改动文字

§ 优化手段
使用transform代替top

top是几何属性，操作top会改变节点位置从而引发回流

transform: translate3d(x, 0, 0)代替top，只会引发图层重绘，还会间接启动GPU加速

使用visibility:hidden（简称VH）替换display:none（简称DH）

占位表现：DN不占据空间，VH占据空间

触发影响：DN触发回流重绘，VH触发重绘

过渡影响：DN影响过渡不影响动画，VH不影响过渡不影响动画

株连效果：DN后自身及其子节点全都不可见，VH后自身及其子节点全都不可见但可声明子节点visibility:visible单独显示

避免使用Table布局

Table布局可能很小的一个改动就会造成整个<table>回流

可用<ul>、<li>和<span>等标签取代<table>系列标签生成表格

避免样式节点层级过多

CSS解析器解析css文件时，是从右到左匹配查找，样式层级过多会影响回流重绘效率

建议CSS样式规则不超过3层

动态改变类名而不改变样式

不要尝试每次操作DOM去改变节点样式，这样会频繁触发回流。

使用新的类名预定义节点样式

避免节点属性值放在循环里当成循环变量

不好的案例
for (let i = 0; i < 10000; i++) {
  const top = document.getElementById('css').style.top;
  console.log(top);
}
好的案例
const top = document.getElementById('css').style.top;
for (let i = 0; i < 10000; i++) {
  console.log(top);
}
使用requestAnimationFrame作为动画速度帧

用requestAnimationFrame()代替setInterval()
将频繁回流或重绘的节点设置为新图层

将节点设置为<video>或<iframe>

为节点添加will-change属性

§ 布局
8种基本布局

普通布局：display: block/inline
浮动布局：float: left/right
定位布局：position: relative/absolute/fixed、left/right/top/bottom/z-index
表格布局：table系列属性
弹性布局：display: flex/inline-flex、flex系列属性
多列布局：column系列属性
格栅布局：display: grid/inline-grid、grid系列属性
响应式布局：em/rem/vw/vh/vmin/vmax、媒体查询
