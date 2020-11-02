## 项目准备

```shell
$ mkdir Es6WebpackTemplate
$ cd Es6WebpackTemplate/
$ npm init -y
```

## 安装依赖

```shell
$ npm install webpack -D
$ npm install webpack-cli -D
$ npm install babel-loader @babel/core -D
$ npm install @babel/preset-env -D
```

## 配置文件

### `build/webpack.config.js`

`webpack`编译的配置文件

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

### `.babelrc`

`Babel`的配置文件是`.babelrc`，存放在项目的根目录下。**使用`Babel`的第一步，就是配置这个文件。**

`webpack`在编译`js`文件时，`babel-loader`会用到这个配置文件

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
    "start": "webpack-dev-server --config build/webpack.config.js",
    "build": "webpack --config build/webpack.config.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
  },
  "devDependencies": {
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

## 源文件

### `src/main.js`

`webpack`编译的入口`js`文件

```js
import echarts from 'echarts';
import {bar} from './js/bar';

var myChart = echarts.init(document.getElementById('root'));
myChart.setOption(bar);
```

### `src/js/bar.js`

被`src/main.js`文件引入

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

### `src/index.html`

`HtmlWebpackPlugin`要使用的模板文件

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

