# HTML5 Video(视频)

在本节内容中，你将了解到在HTML5中视频是如何工作的、主流浏览器支持的视频格式以及如何对网页中的视频进行控制。

很多站点都会使用到视频. HTML5 提供了展示视频的标准。

## Web站点上的视频

直到现在，仍然不存在一项旨在网页上显示视频的标准。

今天，大多数视频是通过插件（比如 Flash）来显示的。然而，并非所有浏览器都拥有同样的插件。

HTML5 规定了一种通过 [video 元素](https://www.w3cschool.cn/htmltags/tag-video.html)来包含视频的标准方法。

## HTML5 (视频)- 如何工作

如需在 HTML5 中显示视频，您所有需要的是：

**实列**

```html
<!DOCTYPE html>
<html>
<body>

<video width="320" height="240" controls>
  <source src="/statics/demosource/movie.mp4" type="video/mp4">
  <source src="/statics/demosource/movie.ogg" type="video/ogg">
  您的浏览器不支持 HTML5 video 标签。
</video>

</body>
</html>
```

\<video> 元素提供了播放、暂停和音量控件来控制视频。

同时 \<video> 元素也提供了 width 和 height 属性控制视频的尺寸.如果设置的高度和宽度，所需的视频空间会在页面加载时保留。。如果没有设置这些属性，浏览器不知道大小的视频，浏览器就不能再加载时保留特定的空间，页面就会根据原始视频的大小而改变。

\<video> 与 \</video> 标签之间插入的内容是提供给不支持 video 元素的浏览器显示的。

\<video> 元素支持多个 \<video>  元素. 元素可以链接不同的视频文件。浏览器将使用第一个可识别的格式：

### 视频格式与浏览器的支持

当前，\<video> 元素支持三种视频格式： MP4, WebM, 和 Ogg:

| 浏览器               | MP4  | WebM | Ogg  |
| :------------------- | :--- | :--- | :--- |
| Internet Explorer 9+ | YES  | NO   | NO   |
| Chrome 6+            | YES  | YES  | YES  |
| Firefox 3.6+         | NO   | YES  | YES  |
| Safari 5+            | YES  | NO   | NO   |
| Opera 10.6+          | NO   | YES  | YES  |

- MP4 = 带有 H.264 视频编码和 AAC 音频编码的 MPEG 4 文件
- WebM = 带有 VP8 视频编码和 Vorbis 音频编码的 WebM 文件
- Ogg = 带有 Theora 视频编码和 Vorbis 音频编码的 Ogg 文件

### 视频格式

| 格式 | MIME-type  |
| :--- | :--------- |
| MP4  | video/mp4  |
| WebM | video/webm |
| Ogg  | video/ogg  |

## HTML5 - 使用 DOM 进行控制

HTML5 <video> 和 <audio> 元素同样拥有方法、属性和事件。

\<video> 和 \<audio> 元素的方法、属性和事件可以使用JavaScript进行控制。

其中的方法有用于播放、暂停以及加载等。其中的属性（比如时长、音量等）可以被读取或设置。其中的 DOM 事件能够通知您，比方说，<video> 元素开始播放、已暂停，已停止，等等。

例中简单的方法，向我们演示了如何使用 \<video> 元素，读取并设置属性，以及如何调用方法。

**实例 1**

为视频创建简单的播放/暂停以及调整尺寸控件：

```html
<!DOCTYPE html>
<html>
<body>

<video width="320" height="240" controls>
  <source src="/statics/demosource/movie.mp4" type="video/mp4">
  <source src="/statics/demosource/movie.ogg" type="video/ogg">
  您的浏览器不支持 HTML5 video 标签。
</video>

</body>
</html>
```

上面的例子调用了两个方法：play() 和 pause()。它同时使用了两个属性：paused 和 width。

## HTML5 Video 标签

| 标签     | 描述                                   |
| :------- | :------------------------------------- |
| <video>  | 定义一个视频                           |
| <source> | 定义多种媒体资源,比如<video> 和<audio> |
| <track>  | 定义在媒体播放器文本轨迹               |

### \<video>



# 程序员必知的HTML5 video视频二三事

2018-06-28 14:46 更新

HTML5支持直接播放视频，而这背后涉及到复杂的视频格式之争，甚至还牵涉到所有的电子影像设备？在过去乃至现在，flash仍是网页上最好的解决视频的方法，诸如优酷、土豆之流的视频网站、还有像虾米那样的在线音乐网站，仍在使用flash提供播放服务。现在这种状况将会随着 HTML5 的发展而改变。HTML <video> 适用于HTML 5+，用于定义在线观看的视频流媒体。

## HTML5 (视频)- 如何工作

如需在 HTML5 中显示视频，您所有需要的是：

## 实例

<video width="320" height="240" controls>  <source src="movie.mp4" type="video/mp4">  <source src="movie.ogg" type="video/ogg">您的浏览器不支持Video标签。</video>


在过去，音视频需要通过第三方插件来处理（这样引发的问题是：并不是所有操作系统或者设备都能使用）流览器与插件之间的通信被局限住了，而且多媒体就像一个黑盒子。HTML5出现之后，所有主流浏览器都可以支持本地音视频了（包括IE浏览器），虽然这个过程需要让您的媒体文件进行双份的编码（因为IE 和Safari只支持Royalty-encumbered标准的编码）。有了HTML5，突然之间，video可以跟CSS一起排样式了：您可以用半透 明的视频相互覆盖，设置边界与背景图片，旋转盘旋等变换，以及其他各种精彩的变形应用。

但是，有一个核心问题，却没有得到解决。HTML5没有规定，浏览器到底应该播放哪一种格式的视频。浏览器厂商可以自行选择支持的格式。

## 怎么让所有浏览器支持HTML5 video视频标签？

使用 HTML5 的video可以很方便的使用 JavaScript 对视频内容进行控制等等，功能十分强大，同时代码比较少加快加载速度。此外跨平台性比较好，特别是一些平板、手机等。例如苹果公司的产品不支持flash仅支持HTML5中的video功能。但是 HTML5 的兼容性问题是个硬伤，我们可以在网页中使用 video 来播放视频，但使用早期浏览器的访问者可能无法正常观看这个视频。此外，由于视频编码器的历史渊源导致各种浏览器支持的视频格式不同。应对这些问题，想在网页中使用 HTML5 video 功能，可以按照下面三个步骤操作。

**1、提前准备好多格式视频文件**

由于编码器的版权问题，导致不同浏览器对视频格式的兼容性不同。目前没有一个视频格式兼容所有浏览器，唯一的解决方法就是把视频转换成多种格式。

首先要准备一个 mp4 格式的视频，可以在苹果设备中使用；其次要准备 ogv 格式的视频，用在火狐浏览器中；最后要准备一下 webm 格式的视频，这个可以用在谷歌浏览器等。webm 是谷歌提出的，开源、免费，很有可能成为兼容所有浏览器的视频格式。

准备多格式浏览器的麻烦之处在于转换格式。视频转换工具国内的功能比较少，转换格式可能没有上面后两个，而且质量良莠不齐，往往需要注册才能使用。推荐一个国外的工具 Online converter ，在线免费视频转换工具。甚至不用安装软件，直接选择相应的目标格式，然后上传视频，配置一下参数就可以转换出来了。没有合适工具的朋友，可以尝试一下。

## 2、编写对应 HTML5 video 代码

HTML5 中的 video 实际上就是一个简单的标签，包含了一些视频相关信息等。下面直接给出具体代码，然后简单解释一下：


XML/HTML Code

```html
<video width=”800” height=”374”>  
    <source src=”my_video.mp4” type=”video/mp4” />  
    <source src=”my_video.ogv” type=”video/ogg” />  
    <source src=”my_video.webm” type=”video/webm” />  
    你浏览器不支持 video 功能，点击这里下载视频： <a href=”video.webm”>下载视频</a>.   
</video>  
```



<video width=”800” height=”374”>      <source src=”my_video.mp4” type=”video/mp4” />      <source src=”my_video.ogv” type=”video/ogg” />      <source src=”my_video.webm” type=”video/webm” />      你浏览器不支持 video 功能，点击这里下载视频： <a href=”video.webm”>下载视频</a>.   </video>  


video 标签表示这里是一个视频，width、height 属性分别表示这个视频内容的宽高（单位像素）。video 标签中可以包含 source 标签，source 标签用来表示引用的视频和视频的格式、类型。为了保证向下的兼容性，我们还在 video 标签中加了一句提示，这句话在支持 video 标签的浏览器中是不会显示的，如果不支持就会显示出来。这里，还增加了一个视频的下载地址，如果浏览器不支持，可以让用户选择下载下来看。


特别需要注意一点，你的主机必须能正确的处理这事些视频请求。确保你的主机被请求这些视频的时候会在 Content-Type 头发送正确的 MIME 类型。如果你不清楚，可以咨询一下主机服务商，也可以自己添加。如果主机支持 .htaccess ，可以在 .htaccess 文件中增加下面语句：


代码如下:
AddType video/ogg .ogv
AddType video/mp4 .mp4
AddType video/webm .webm

大体就是这样，比较简单，更加具体的关于 video 的使用方法，可以搜索一下，在这里不再赘述。

3、为旧版浏览器做兼容

前面说过，如果浏览器不支持 video ，将会把 video 中的提示内容显示出来。那么对付老旧浏览器，我们可以用传统的 flash 来替换这个提示内容。这样，当浏览器不兼容 video 标签的时候，就会显示出 flash 版本的视频。例如：

XML/HTML Code

```html
<video width=”800” height=”374”>  
    <source src=”my_video.mp4” type=”video/mp4” />  
    <source src=”my_video.ogv” type=”video/ogg” />  
    <object width="800" height="374" type="application/x-shockwave-flash" data="fallback.swf">  
        <param name="movie" value="fallback.swf" />  
        <param name="flashvars" value="autostart=true&file=video.flv" />  
    </object>  
</video> 
```

直接按照原来正常的 flash 引入方法写进 video 标签中即可。这样，我们就实现了跨浏览器兼容的 video 功能使用。

##  html5 video 试看怎么实现？

new个video，指定播放列表的第一个视频路径为src。监听end事件，回调里面把video的src改成列表的下一个，再play

代码示例：

```js
var vList = ['视频地址url1', 'url2', '...']; // 初始化播放列表
var vLen = vList.length; // 播放列表的长度

var curr = 0; // 当前播放的视频
var video = new Video();
video.addEventListener('end', play);
play();

function play(e) {
  video.src = vList[curr];
  video.load(); // 如果短的话，可以加载完成之后再播放，监听 canplaythrough 事件即可
  video.play();

  curr++;
  if (curr >= vLen) curr = 0; // 播放完了，重新播放
}
```

可以实现html5 播放多个视频。一个接一个的播放。

## 怎么实现 html5 video 视频暂停后加载指定的图片？

用户播放视频后，缓冲时间和用户点暂停后加载指定的图片必须带超链接功能怎么实现？

先用绝对定位创建一个广告图片的图层,监测video的暂停事件,将隐藏的广告图片显示出来出来就好了。

## html5 video fullScreen全屏实现方式

在html5中，全屏方法可以适用于很多html元素，不仅仅是video

代码如下：

```html
<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>全屏问题</title>
<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
<meta http-equiv="imagetoolbar" content="no"/>
<meta name="apple-mobile-web-app-capable" content="yes"/>
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<style type="text/css">
*{
    padding: 0px;
    margin: 0px;
}

body div.videobox{
    width: 400px;
    height: 320px;
    margin: 100px auto;
    background-color:#000;
}

body div.videobox video.video
{
    width: 100%;
    height: 100%;
}

:-webkit-full-screen {

}

:-moz-full-screen {

}

:-ms-fullscreen {

}

:-o-fullscreen {

}

:full-screen { 

}

:fullscreen {

}

:-webkit-full-screen video {
    width: 100%;
    height: 100%;
}
:-moz-full-screen video{
    width: 100%;
    height: 100%;
}
</style>
</head>
<body>
<div id="videobox">
    <video controls="controls" preload="preload" id="video" poster="poster.jpg">
        <source src="./movie.ogg" type="video/ogg" />
        <source src="./movie.mp4" type="video/mp4" />
        <source src="./movie.webm" type="video/webm" />
        <object data="./movie.mp4" width="100%" height="100%">
            <embed width="100%" height="100%" src="./movie.swf" />
        </object>
    </video>
    <button id="fullScreenBtn">全屏</button>
</div>
<script type="text/javascript">

//反射調用
var invokeFieldOrMethod = function(element, method) {
    var usablePrefixMethod;
    ["webkit", "moz", "ms", "o", ""].forEach(function(prefix) {
        if (usablePrefixMethod) return;
        if (prefix === "") {
            // 无前缀，方法首字母小写
            method = method.slice(0,1).toLowerCase() + method.slice(1); 
        }
        var typePrefixMethod = typeof element[prefix + method];
        if (typePrefixMethod + "" !== "undefined") {
            if (typePrefixMethod === "function") {
                usablePrefixMethod = element[prefix + method]();
            } else {
                usablePrefixMethod = element[prefix + method];
            }
        }
    });

    return usablePrefixMethod;
};

//進入全屏
function launchFullscreen(element)  {
    //此方法不可以在異步任務中執行，否則火狐無法全屏
    if(element.requestFullscreen) {
    	element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
    	element.mozRequestFullScreen();
    } else if(element.msRequestFullscreen){ 
    	element.msRequestFullscreen(); 
    } else if(element.oRequestFullscreen){
    	element.oRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {
    	element.webkitRequestFullScreen();
    } else {
        var docHtml = document.documentElement;
        var docBody = document.body;
        var videobox = document.getElementById('videobox');
        var cssText = 'width:100%;height:100%;overflow:hidden;';
        docHtml.style.cssText = cssText;
        docBody.style.cssText = cssText;
        videobox.style.cssText = cssText+';'+'margin:0px;padding:0px;';
        document.IsFullScreen = true;
    }
}
//退出全屏
function exitFullscreen() {
    if (document.exitFullscreen) {
    	document.exitFullscreen();
    } else if (document.msExitFullscreen) {
    	document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
    	document.mozCancelFullScreen();
    } else if(document.oRequestFullscreen){
    	document.oCancelFullScreen();
    } else if (document.webkitExitFullscreen){
    	document.webkitExitFullscreen();
    } else {
        var docHtml = document.documentElement;
        var docBody = document.body;
        var videobox = document.getElementById('videobox');
        docHtml.style.cssText = "";
        docBody.style.cssText = "";
        videobox.style.cssText = "";
        document.IsFullScreen = false;
    }
}
document.getElementById('fullScreenBtn').addEventListener('click',function(){
	launchFullscreen(document.getElementById('video')); 
	window.setTimeout(function exit(){
        //檢查瀏覽器是否處於全屏
        if(invokeFieldOrMethod(document,'FullScreen') || invokeFieldOrMethod(document,'IsFullScreen') || document.IsFullScreen)
        {
        	exitFullscreen();
        }
    },5*1000);
},false);

</script>
</body>

</html>
```



## html5 video封面poster图片填充方法

html5的视频封面尺寸被强制缩小了，需要填充整个播放器的，应该怎么做？

html5的video属性并没有支持处理poster的尺寸问题，有一个hacker的方法：The answer is actually quite simple. Instead of providing our poster image as a value to the poster attribute, we define it as a background image for our video element, and use the background-size property to tell the browser that the image is to cover the element in question:

将poster页面设置为一个透明的图片或者不存在的值，这样浏览器就会无法显示poster，然后通过设置播放器的css背景background，将我们需要的背景图放进去，并且填充背景，并且我们用background-size属性去告诉浏览器，这个播放器或者这个元素被这个图片覆盖。

```css
video {
  width: 100%;
  height: 100%;
  background:transparent url('img/1.jpg') 50% 50% no-repeat;

  //下面就是background-size，每种浏览器都写一个配置
  -webkit-background-size:cover;
  -moz-background-size:cover;
  -o-background-size:cover;
  background-size:cover;
}
```

详细代码：

```html
< !DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <title></title>
        <style type="text/css">
        .video-container1{
            width: 400px;
            height: 400px;
            border: solid;
        }
        .video1{
            width: 100%;
            height: 100%;
        }
        .video-container2{
            width: 400px;
            height: 400px;
            border: solid;
        }
        .video2{
            width: 100%;
            height: 100%;
            background:transparent url('1.jpg') 50% 50% no-repeat;
            -webkit-background-size:cover;
            -moz-background-size:cover;
            -o-background-size:cover;
            background-size:cover;
        }
        </style>
    </head>
    <body>
    <div class="video-container1">
        <video class="video1" src="oceans.mp4" poster="1.jpg" controls>

        </video>
    </div>
    <div class="video-container2">
        <video class="video2" src="oceans.mp4" poster="2.jpg" controls>

        </video>
    </div>
    </body>
</html>
```

