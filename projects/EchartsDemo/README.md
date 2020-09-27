## 引入`Echarts`

```shell
$ mkdir EchartsDemo
$ cd EchartsDemo/
$ npm init -y
Wrote to D:\workspace\NotepadWorkspace\EchartsDemo\package.json:

{
  "name": "EchartsDemo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

$ npm install echarts --save
```

## 源文件

### `src/main.js`

```js
import echarts from 'echarts';
import {bar} from './js/bar';

var myChart = echarts.init(document.getElementById('root'));
myChart.setOption(bar);
```

### `src/js/bar.js`

```js
export const bar = {
    title: {
        text: '第一个 ECharts 实例'
    },
    tooltip: {},
    legend: {
        data:['销量']
    },
    xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
};
```

### `dist/index.html`

```html
<!DOCTYPE html>
<html>
    <head>
        <script src="./main.js"></script>
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>
```

## 配置文件`.babelrc`

Babel参考网址：http://www.ruanyifeng.com/blog/2016/01/babel.html

Babel的配置文件是`.babelrc`，存放在项目的根目录下。**使用Babel的第一步，就是配置这个文件。**

```
{
    "presets": [
        "es2015"
    ],
    "plugins": []
}
```

`presets`字段设定转码规则，可以根据需要安装。

```shell
$ npm install --save-dev babel-preset-es2015
```

## 命令行转码`babel-cli`

使用`babel-cli`命令行转码

```shell
# 全局安装
$ npm install --global babel-cli

# 项目中安装
$ npm install --save-dev babel-cli
```

### 基本语法

```shell
# 转码结果输出到标准输出
$ babel example.js

# 转码结果写入一个文件
# --out-file 或 -o 参数指定输出文件
$ babel example.js --out-file compiled.js
# 或者
$ babel example.js -o compiled.js

# 整个目录转码
# --out-dir 或 -d 参数指定输出目录
$ babel src --out-dir lib
# 或者
$ babel src -d lib

# -s 参数生成source map文件
$ babel src -d lib -s
```

### `package.json`里配置`script`

在`package.json`里配置`script`，可以通过`npm run build`调用脚本编译：

```json
{
  "name": "EchartsDemo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "babel src -d dist"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "echarts": "^4.9.0"
  },
  "devDependencies": {
  	"babel-preset-es2015": "^6.24.1"
  }
}
```

### Babel转码未达到效果

执行`npm run build`，编译成功，但浏览器上直接打开`dist/index.html`，报`require`没有定义

**以上Babel操作不支持import！！！**会将js里import转换成require

尝试`webpack`利用`Babel`对`js`进行转码

## 使用`webpack`对`js`进行编译

```shell
$ npm install webpack -D
$ npm install webpack-cli -D
$ npm install babel-loader @babel/core -D
$ npm uninstall babel-preset-es2015
$ npm install @babel/preset-env -D
```

### `build/webpack.config.js`

```js
const path = require('path');
module.exports = {
    mode: 'development',
    entry: {
        main: "./src/main.js"
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
}
```

### `.babelrc`

```json
{
    "presets": [
        "@babel/preset-env"
    ],
    "plugins": []
}
```

### `package.json`

```json
{
  "name": "EchartsDemo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "webpack --config build/webpack.config.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "echarts": "^4.9.0"
  },
  "devDependencies": {
    "@babel/core": "^7.11.6",
    "babel-loader": "^8.1.0",
    "babel-preset-es2015": "^6.24.1",
    "webpack": "^4.44.2",
    "webpack-cli": "^3.3.12"
  }
}

```

### 记录遇到的点

1、dom为null引起控制台报错，页面空白？

2、上面问题解决后，页面乱码？

3、控制台不报错，页面依然空白？

上述3个问题，都跟`src/index.html`有关，请看：<u>`dist/index.html`(修改后)</u>

4、为什么移除`babel-preset-es2015`?

`npm run build`失败，报下面的错：

```shell
$ npm run build

> EchartsDemo@1.0.0 build D:\workspace\NotepadWorkspace\EchartsDemo
> webpack --config build/webpack.config.js

Hash: d2f1baf9a809aa3e3893
Version: webpack 4.44.2
Time: 2616ms
Built at: 2020-09-27 11:09:50 ├F10: AM┤
 1 asset
Entrypoint main = main.js
[0] ./src/main.js 3.11 KiB {0} [built] [failed] [1 error]

ERROR in ./src/main.js
Module build failed (from ./node_modules/babel-loader/lib/index.js):
Error: Plugin/Preset files are not allowed to export objects, only functions. In D:\workspace\NotepadWorkspace\EchartsDemo\node_modules\babel-preset-es2015\lib\index.js
    at createDescriptor (D:\workspace\NotepadWorkspace\EchartsDemo\node_modules\@babel\core\lib\config\config-descriptors.js:178:11)
    at D:\workspace\NotepadWorkspace\EchartsDemo\node_modules\@babel\core\lib\config\config-descriptors.js:109:50
    at Array.map (<anonymous>)
    at createDescriptors (D:\workspace\NotepadWorkspace\EchartsDemo\node_modules\@babel\core\lib\config\config-descriptors.js:109:29)
    at createPresetDescriptors (D:\workspace\NotepadWorkspace\EchartsDemo\node_modules\@babel\core\lib\config\config-descriptors.js:101:10)
    at presets (D:\workspace\NotepadWorkspace\EchartsDemo\node_modules\@babel\core\lib\config\config-descriptors.js:47:19)
    at mergeChainOpts (D:\workspace\NotepadWorkspace\EchartsDemo\node_modules\@babel\core\lib\config\config-chain.js:384:26)
    at D:\workspace\NotepadWorkspace\EchartsDemo\node_modules\@babel\core\lib\config\config-chain.js:347:7
    at Generator.next (<anonymous>)
    at buildRootChain (D:\workspace\NotepadWorkspace\EchartsDemo\node_modules\@babel\core\lib\config\config-chain.js:129:29)
    at buildRootChain.next (<anonymous>)
    at loadPrivatePartialConfig (D:\workspace\NotepadWorkspace\EchartsDemo\node_modules\@babel\core\lib\config\partial.js:99:62)
    at loadPrivatePartialConfig.next (<anonymous>)
    at Function.<anonymous> (D:\workspace\NotepadWorkspace\EchartsDemo\node_modules\@babel\core\lib\config\partial.js:125:25)
    at Generator.next (<anonymous>)
    at evaluateSync (D:\workspace\NotepadWorkspace\EchartsDemo\node_modules\gensync\index.js:244:28)
    at Function.sync (D:\workspace\NotepadWorkspace\EchartsDemo\node_modules\gensync\index.js:84:14)
    at Object.<anonymous> (D:\workspace\NotepadWorkspace\EchartsDemo\node_modules\@babel\core\lib\config\index.js:43:61)
    at Object.<anonymous> (D:\workspace\NotepadWorkspace\EchartsDemo\node_modules\babel-loader\lib\index.js:151:26)
    at Generator.next (<anonymous>)
    at asyncGeneratorStep (D:\workspace\NotepadWorkspace\EchartsDemo\node_modules\babel-loader\lib\index.js:3:103)
    at _next (D:\workspace\NotepadWorkspace\EchartsDemo\node_modules\babel-loader\lib\index.js:5:194)
    at D:\workspace\NotepadWorkspace\EchartsDemo\node_modules\babel-loader\lib\index.js:5:364
    at new Promise (<anonymous>)
    at Object.<anonymous> (D:\workspace\NotepadWorkspace\EchartsDemo\node_modules\babel-loader\lib\index.js:5:97)
    at Object._loader (D:\workspace\NotepadWorkspace\EchartsDemo\node_modules\babel-loader\lib\index.js:231:18)
    at Object.loader (D:\workspace\NotepadWorkspace\EchartsDemo\node_modules\babel-loader\lib\index.js:64:18)
    at Object.<anonymous> (D:\workspace\NotepadWorkspace\EchartsDemo\node_modules\babel-loader\lib\index.js:59:12)
npm ERR! code ELIFECYCLE
npm ERR! errno 2
npm ERR! EchartsDemo@1.0.0 build: `webpack --config build/webpack.config.js`
npm ERR! Exit status 2
npm ERR!
npm ERR! Failed at the EchartsDemo@1.0.0 build script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\ywx964151\AppData\Roaming\npm-cache\_logs\2020-09-27T03_09_50_945Z-debug.log
```

### `dist/index.html`(修改后)

```html
<!DOCTYPE html>
<html>
    <head>
        <!-- 解决页面乱码 -->
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    </head>
    <body>
        <!-- 添加style解决控制台不报错，页面依然空白-->
        <div id="root" style="width: 600px;height:400px;"></div>
    </body>
    <!-- main.js引入位置调整，解决dom为null引起控制台报错，页面空白 -->
    <script src="./main.js"></script>
</html>
```

### 编译后达到效果

执行`npm run build`，编译成功，浏览器上直接访问`dist/index.html`，页面上可以显示出`Echarts`的图表

## 完善下webpack的编译

```shell
# 清空dist目录
$ npm install clean-webpack-plugin -D

# html模板
$ npm install html-webpack-plugin -D

# 开发环境
$ npm install webpack-dev-server -D
```

### `src/index.html`（html模板）

```html
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    </head>
    <body>
        <div id="root" style="width: 600px;height:400px;"></div>
    </body>
</html>
```

### `build/webpack.config.js`(完善后)

```js
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        main: "./src/main.js"
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            // webpack --watch时，不要移除index.html
            cleanStaleWebpackAssets: false
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: '../dist',
        port: '8081',
        open: true, // 自动打开浏览器
        hot: true,
        hotOnly: true
    }
}
```

### `package.json`（完善后）

```json
{
  "name": "EchartsDemo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack-dev-server --config build/webpack.config.js",
    "build": "webpack --config build/webpack.config.js",
    "babel": "babel src -d dist"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "echarts": "^4.9.0"
  },
  "devDependencies": {
    "@babel/cli": "^7.11.6",
    "@babel/core": "^7.11.6",
    "@babel/preset-env": "^7.11.5",
    "babel-loader": "^8.1.0",
    "clean-webpack-plugin": "^3.0.0",
    "html-webpack-plugin": "^4.5.0",
    "webpack": "^4.44.2",
    "webpack-cli": "^3.3.12",
    "webpack-dev-server": "^3.11.0"
  }
}
```

