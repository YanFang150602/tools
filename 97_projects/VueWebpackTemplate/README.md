## 项目准备

```shell
$ mkdir VueWebpackTemplate
$ cd VueWebpackTemplate
$ npm init -y
```

## 安装依赖

```shell
$ npm install webpack webpack-cli --save-dev
$ npm install webpack-dev-server --save-dev
$ npm install clean-webpack-plugin html-webpack-plugin --save-dev
$ npm install vue vue-loader vue-template-compiler vue-style-loader css-loader --save-dev
```

## 配置文件

### `build/webpack.config.js`

```js
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.vue', '.js']
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    // target: 'web',
    devServer: {
        contentBase: '../dist',
        port: '8086',
        open: true,
        overlay: {
            errors: true,
        },
        hot: true,
        hotOnly: true
    }
}
```

### `package.json`

```json
{
  "name": "VueWebpackTemplate",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "webpack --config build/webpack.config.js",
    "start": "webpack-dev-server --config build/webpack.config.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "clean-webpack-plugin": "^3.0.0",
    "css-loader": "^4.3.0",
    "html-webpack-plugin": "^4.5.0",
    "vue": "^2.6.12",
    "vue-loader": "^15.9.3",
    "vue-style-loader": "^4.1.2",
    "vue-template-compiler": "^2.6.12",
    "webpack": "^4.44.2",
    "webpack-cli": "^3.3.12",
    "webpack-dev-server": "^3.11.0"
  }
}
```

## 源文件

### `src/app.vue`

```vue
<template>
    <div>
        <input type="text" :value="inputData"/>
        <input type="button" value="提交" />
    </div>
</template>
<script>
    export default {
        data() {
            return {
                inputData:'我是测试哦'
            }
        }
    }
</script>
```

### `src/index.js`

```js
import Vue from 'vue';
import App from './app';

const root = document.createElement('div');
document.body.appendChild(root);

new Vue({
    render: (h) => h(App)
}).$mount(root);
```

### `src/index.html`

```html
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    </head>
    <body>
    </body>
</html>
```

## 遇到问题

1、`npm run start`报错，浏览器控制台显示错误`Uncaught Error: Cannot find module 'strip-ansi' at webpackMissingModule`？

调整`build/webpack.config.js`文件里的`resolve`下`extensions`配置：

```js
resolve: {
    extensions: ['.vue', '.js']
}
```
