# webpack快速入门

进入WebpackDemo目录下

```shell
#初始化WebpackDemo目录，增加package.json文件
npm init -y
npm install -D webpack 
#webpack4+以上版本需要安装webpack-cli
npm install -D webpack-cli
```

在WebpackDemo目录下，创建dist、src两个目录，且分别创建index.html、index.js文件

```shell
npm install -P loadsh
```

loadsh模块在src/index.js里被import

在WebpackDemo目录下，创建webpack.config.js文件

```shell
#对index.js文件进行编译
npx webpack
```

# webpack处理css模块

## 处理css

在src目录下创建style目录，并创建index.css

在index.js文件里import index.css文件

```js
import "./style/index.css"
```

安装css-loader、style-loader，对css模块处理的loader

```shell
# css-loader处理css文件@import另外一个css文件
# style-loader将css文件里的样式挂到页面style标签里
npm install -D css-loader style-loader
```

webpack配置文件增加对css模块处理规则

```js
module.exports = {
	 ...
	 module: {
        rules: [
            {
                test: /\.css$/,
                use:["style-loader", "css-loader"]
            }
            ...
        ]
    }
    ...       
}
```

修改webpack.config.js文件，处理css模块

```shell
#执行webpack，处理index.js里的css模块
npx webpack
```

## 处理s(c|a)ss

```shell
npm install sass-loader node-sass --save-dev
```

index.js里引入scss文件

```js
import "./style/scssdex.scss";
```

webpack配置增加sass-loader处理scss文件

```js
module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use:["style-loader", "css-loader"]
            },
            {
                test: /\.s(c|a)ss$/,
                use:["style-loader", "css-loader", "sass-loader"]
            }
        ]
    }
}
```

## postcss-loader

```shell
npm i -D postcss-loader
```

新增配置文件postcss.config.js

```js
# plugins可以是object，也可以是array
module.exports = {
  parser: 'sugarss',
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {},
    'cssnano': {}
  }
}
```

```js
module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use:[
                    "style-loader", 
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2
                        }
                    },
                    "postcss-loader",
                    "sass-loader"
                ]
            }
        ]
    }
}
```

postcss-loader建议使用在css-loader/style-loader后面，使用在sass-loader前面

# 将该目录设置成git仓库

```shell
# 将该目录设置成本地仓库
git init
# 为本地仓添加远程仓
git remote add origin git@github.com:YanFang150602/WebpackDemo.git
# 将本地分支关联到远程仓origin的master分支上
git branch --track origin/master
# 将编写的代码由工作区提交到暂存区
git add .
# 由暂存区提交到版本库
git commit -m "描述"
# 将本地提交的代码上传到远程仓上
git push --set-upstream origin master
git push
git push origin master
git push -u origin master
```

# plugins

plugins帮助webpack在运行到某个时刻的时候，自动做一些事情

## webpack.DefinePlugin

DefinePlugin允许我们创建全局变量，可以在编译时进行设置，因此我们可以使用该属性来设置全局变量来区分开发环境和正式环境

修改webpack的配置文件

```js
const webpack = require('webpack');

module.exports = {
    ...
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
}
```

在index.js里使用webpack.DefinePlugin定义的全局变量

```js
console.log(process.env.NODE_ENV);
```

### **理解 cross-env**

**1. 什么是cross-env呢？**
它是运行跨平台设置和使用环境变量的脚本。

**2. 它的作用是啥？**

当我们使用 NODE_ENV = production 来设置环境变量的时候，大多数windows命令会提示将会阻塞或者异常，或者，windows不支持NODE_ENV=development的这样的设置方式，会报错。package.json配置

```json
...
"scripts": {
  "dev": "NODE_ENV=development webpack-dev-server --progress --colors --devtool cheap-module-eval-source-map --hot --inline",
  "build": "NODE_ENV=production webpack --progress --colors --devtool cheap-module-source-map"
   ...
},
...
```

因此 cross-env 出现了。我们就可以使用 cross-env命令，这样我们就不必担心平台设置或使用环境变量了。也就是说 cross-env 能够提供一个设置环境变量的scripts，这样我们就能够以unix方式设置环境变量，然而在windows上也能够兼容的

要使用该命令的话，我们首先需要在我们的项目中进行安装该命令

```shell
npm install --save-dev cross-env
```

在package.json里进行配置

```json
...
"scripts": {
    "bundle": "webpack",
    "watch": "webpack --watch",
    "start": "webpack-dev-server",
    "start2": "cross-env NODE_ENV=development webpack-dev-server --env.NODE_ENV=development --config webpack.config.dev.js",
    "server": "node server.js",
    "dev": "cross-env NODE_ENV=development webpack --env.NODE_ENV=development --config webpack.config.dev.js",
    "build": "webpack --env.NODE_ENV=production"
  },
 ...
```

## html-webpack-plugin

html-webpack-plugin会在打包结束后，自动生成一个html文件，并把打包生成的js自动引入到这个html文件中

```shell
npm i html-webpack-plugin -D
```

修改webpack的配置文件

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    ...
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        ...
    ]
}
```



## clean-webpack-plugin

默认情况下，此插件将在每次成功重建后删除webpack的output.path目录中的所有文件以及所有未使用的webpack资产。

```shell
npm i clean-webpack-plugin -D
```

修改webpack的配置文件

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    ...
    plugins: [
        new CleanWebpackPlugin({
            // webpack --watch时，不要移除index.html
            cleanStaleWebpackAssets: false
        }),
        ...
    ]
}
```

# entry和output的基本配置

```js
module.exports = {
	// entry: '字符串',
    entry: {
        key: '字符串'
    },
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		// publicPath: 'http://www.cdn.com.cn'
	}
}
```



# sourceMap基本配置

```js
module.exports = {
	...
	devtool: 'none', // source-map
	...
}
```

source-map会生成一个js.map映射文件

inline-source-map不会生成一个js.map映射文件，它会以dataurl的方式编译到生成的js文件底部，定位报错代码时，可以精确到行和列

cheap-inline-source-map与inline-source-map类似，但定位报错代码时，精确到行

cheap-module-eval-source-map常用于开发环境模式

cheap-module-source-map常用于生产环境模式，会生成js.map文件

# webpack-dev-server

```shell
npm install webpack-dev-server --save-dev
```

修改webpack的配置文件

```js
module.exports = {
	...
	devServer: {
		contentBase: './dist',
		port: '8081',
		open: true // 自动打开浏览器
	}
	...
}
```

修改package.json文件

```json
...
"scripts": {
    "bundle": "webpack",
    "watch": "webpack --watch",
    "start": "webpack-dev-server",
    "dev": "webpack --env.NODE_ENV=development --config webpack.config.dev.js",
    "build": "webpack --env.NODE_ENV=production"
 }
 ...
```

## 利用express搭建开发服务环境

```shell
npm install express webpack-dev-middleware --save-dev
```

新建个server.js文件

```js
const express = require('express');
const path = require('path');
const WebpackDevMiddleWare = require('webpack-dev-middleware');
const webpack = require('webpack');
const config = require('./webpack.config.js');

const compiler = webpack(config);
const app = express();

app.use('/static', express.static(path.resolve(__dirname, 'public')));

app.use(WebpackDevMiddleWare(compiler, {
    publicPath:'/'
}));

app.listen('3000', () => {
    console.log('server is running!!!');
})

```

修改package.json文件

```json
...
  "scripts": {
    "bundle": "webpack",
    "watch": "webpack --watch",
    "start": "webpack-dev-server",
    "server": "node server.js",
    "dev": "webpack --env.NODE_ENV=development --config webpack.config.dev.js",
    "build": "webpack --env.NODE_ENV=production"
  },
...
```

## 热模块替换HMR

修改webpack的配置文件

```js
...
const webpack = require('webpack');

module.exports = {
	...
	devServer: {
		contentBase: './dist',
		port: '8081',
		open: true,
		hot: true,
		hotOnly: true
	},
	...
	plugins: [
		...
		new webpack.HotModuleReplacementPlugin()
	]
}
```

修改js文件，页面不会自动更新，css却可以，是因为css-loader里含有module.hot对css重新加载替换（HMR），若要对应修改的js也可以重新加载替换，需增加module.hot对js的判断

```js
...
if(module.hot) {
    module.hot.accept('./js/number', () => {
        document.body.removeChild(document.getElementById('number'));
        number();
    });
}
```

# Babel

## es6转换为es5

安装

```shell
npm install --save-dev babel-loader @babel/core
```

将es6启用转换es5

```shell
npm install --save-dev @babel/preset-env
```

修改webpack的配置文件

```js
module.exports = {
	module: {
		rules: [
			{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
		]
	}
}
```

## polyfill（补充低版本浏览器不支持的js）

安装

```shell
npm install --save @babel/polyfill
```

因为这是一个polyfill（将在源代码之前运行），所以我们需要它是一个依赖项，而不是devDependency

修改webpack的配置文件

```js
module.exports = {
	...
	module: {
		rules: [
			{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                    	['@babel/preset-env',{
                    		presets: '@babel/preset-env',
                    		useBuiltIn: 'usage' //当设置“useBuiltIns:”usage“时，业务js在需要时会自动导入polyfill
                    	}]
                    ]
                }
            },
            ...
		]
	}
}
```

修改业务js文件

```js
//当设置“useBuiltIns:”usage“时，在需要时自动导入polyfill。              
//请删除“import”@babel/polyfill`调用或改用“useBuiltIns:”entry'。
import '@babel/polyfill';

...
```

当设置“useBuiltIns:”usage“时，在需要时自动导入polyfill

当设置“useBuiltIns:”usage“时，在业务js里，import '@babel/polyfill'

## .babelrc

将webpack配置文件里对js的babel-loader的options配置到.babelrc文件里

新建.babelrc文件（json格式）

```json
{
    "presets": [
        [
            "@babel/preset-env", 
            {
                "useBuiltIns": "usage",
                "targets": {
                    "chrome": "67"
                }
            }
        ]
    ]
}
```

修改webpack配置文件

```js
module.exports = {
	...
	module: {
		rules: [
			{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            ...
		]
	}
}
```

# webpack打包react

安装react

```shell
npm install react react-dom --save
# 解析react语法
npm install @babel/preset-react --save-dev
```

# Tree Shaking

Tree Shaking只将js里import的内容打包，不将import的模块整个内容打包

Tree Shaking只支持ES Module

修改package.json

```json
{
  "name": "WebpackDemo",
  "version": "1.0.0",
  "description": "",
  "sideEffects": false,
  "scripts": {
...
```

sideEffects为false时，表示对所有import的模块做Tree Shaking处理

sideEffects为数组，没有为import的内容绑定变量（import 'xx.js'），Tree Shaking遇到这种情况，会忽略，不会打包进来，此时，就需要在sideEffects里配置下sideEffects: ["xx.js"]，css也如此，比如["*.css"]，表示import 'xx.css'不做Tree Shaking处理

新建math.js

```js
export const add = (a, b) => {
    console.log(a + b);
}

export const minus = (a, b) => {
    console.log(a - b);
}
```

修改webpack配置文件

1、mode: 'development'时

```js
module.exports = {
    mode: "development",
    devtool: 'cheap-module-eval-source-map',
    ...
    optimization: {
        usedExports: true
    }
}
```

2、mode: 'production'时

```js
module.exports = {
    mode: "production",
    devtool: 'cheap-module-source-map',
    ...
    //optimization: {
    //    usedExports: true
    //}
}
```

# Code Spliting

## 同步

业务代码里同步引入其他模块

```js
import _ from 'lodash';

...
```

webpack.config.comm.js增加optimization.splitChunks配置

```js
module.exports = {
	...
	optimization: {
        splitChunks: {
            chunks: 'initial', // all同步异步；initial同步；async异步
            cacheGroups: {
                lodash: {
                    // 这里经验证配置node_modules下其他模块，则会失效
                    // 失效时，走默认的name:'vendors'的cacheGroup（可以再配置个name:'vendor'的cacheGroup）
                    // 正常时，生成的文件名：lodash~入口key.js，当然也可以通过filename修改文件名
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                // nodeModules: {
                //   test: /[\\/]node_modules[\\/]/,
                //   priority: -10
                // },
                default: false
            }
        }
    }
}
```

执行命令

```shell
npm run bundle
```

效果图

此图中配置了node_modules下其他模块（test: /[\\\/]node_modules[\\\/]lodash[\\\/]/），结果失效，默认走vendors配置项

![image-20200521101010727](C:\Users\彦博\AppData\Roaming\Typora\typora-user-images\image-20200521101010727.png)

此图中，将vendors名改成了lodash，test只配置到node_modules，lodash配置项有效

![image-20200521101124235](C:\Users\彦博\AppData\Roaming\Typora\typora-user-images\image-20200521101124235.png)

## 异步

修改createHtml.js

```js
import "../style/index.css";
import "../style/scssdex.scss";
import avatar from "../image/avatar.jpg";

function createElement() {
    return import('lodash').then(({default: _}) => {
        let dom = document.createElement("div");
        dom.innerHTML = _.join(["学习webpack","第一天"]," ");
        dom.classList.add("iconfont");
        dom.classList.add("icon-xiangmuguanlix");
        return dom;
    });
}

function createImage() {
    const image = new Image();
    image.src = avatar;
    image.classList.add("transcss");
    document.body.append(image);
}

export { createElement, createImage };
```

修改index.js

```js
...
//createElement();
createElement().then(dom => {
    document.body.appendChild(dom);
});
...
```

编译后，生成了个0.js文件

![image-20200521102157034](C:\Users\彦博\AppData\Roaming\Typora\typora-user-images\image-20200521102157034.png)

修改0.js文件生成的文件名

1、安装@babel/plugin-syntax-dynamic-import

```shell
npm install --save-dev @babel/plugin-syntax-dynamic-import
```

2、在.babelrc文件里添加plugin：@babel/plugin-syntax-dynamic-import

```json
{
    "presets": [
       ...
    ],
    "plugins": ["@babel/plugin-syntax-dynamic-import"]
}
```

3、修改webpack.config.comm.js

```js
module.exports = {
	...
	optimization: {
        splitChunks: {
            chunks: 'async',// 针对异步引入的模块进行代码分割
            cacheGroups: {
                // 将vendors设置为false，否则生成的文件名含有vendors
                vendors: false,
                default: false
            }
        }
    }
}
```

4、修改createHtml.js，魔力注释magic comments

```js
...

function createElement() {
    return import(/* webpackChunkName:"lodash" */'lodash').then(({default: _}) => {
        ...
    });
}
...
```

5、编译后，文件名由0.js变成lodash.js

![image-20200521104256608](C:\Users\彦博\AppData\Roaming\Typora\typora-user-images\image-20200521104256608.png)

# optimization.splitChunks

```js
module.exports = {
	...
	optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 0,
            // 被多少个打包生成的文件给引用了
            minChunks: 1,
            maxAsyncRequests: 6,
            maxInitialRequests: 4,
            automaticNameDelimiter: '_',
            cacheGroups: {
                // 自定义个vendor的cacheGroup，分割node_modules下指定的模块
                react: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    priority: -5,
                    name: 'vendor',
                    chunks: 'all',
                    // 在webpack-dev-server时，会报错
                    filename: 'react.vendor.js'
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    filename: 'vendors.js'
                },
                default: {
                    // minChunks: 2,
                    minSize: 1000,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
}
```

# 懒加载Lazy Loading

新增lazyLoad.js文件

```js
// function createObject() {
//     return import(/* webpackChunkName:"jquery" */'jquery').then(({default: $}) => {
//         var txt1 = "<p>文本。</p>";              // 使用 HTML 标签创建文本
//         var txt2 = $("<p></p>").text("文本。");  // 使用 jQuery 创建文本
//         var txt3 = document.createElement("p");
//         txt3.innerHTML = "文本。";               // 使用 DOM 创建文本 text with DOM
//         $("#root").append(txt1,txt2,txt3);   
//     });
// }

// async定义的函数，返回的是Promise对象
async function createObject() {
    const { default: $} = await import(/* webpackChunkName:"jquery" */'jquery');
    var txt1 = "<p>文本。</p>";              // 使用 HTML 标签创建文本
    var txt2 = $("<p></p>").text("文本。");  // 使用 jQuery 创建文本
    var txt3 = document.createElement("p");
    txt3.innerHTML = "文本。";               // 使用 DOM 创建文本 text with DOM
    $("#root").append(txt1,txt2,txt3); 
}

function createObjectHandler() {
    document.addEventListener('click', () => {
        createObject().then(() => {
            console.log("click to create object");
        })
    });
}

export default createObjectHandler;
```

修改index.js

```js
...
import createObjectHandler from './js/lazyLoad';
...

...
createObjectHandler();
...
```

# css文件代码分割

## mini-css-extract-plugin

```shell
npm install --save-dev mini-css-extract-plugin
```

推荐与css-loader结合使用

将css、scss文件的rules从webpack.config.common.js移除，添加到webpack.config.dev.js文件中

修改webpack.config.prod.js

```js
...
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const prodCfg = {
	...
	module: {
		rules: [
			{
                test: /\.css$/,
                use:[
                    MiniCssExtractPlugin.loader, 
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.scss$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            }
		]
	},
    plugins: [
        new MiniCssExtractPlugin({})
    ]
}

...
```

修改package.json

```json
{
	...
	"sideEffects": [
   		"*.css"
  	],
  	"scripts": {
  		...
  	}
  	...
}
```

## optimize-css-assets-webpack-plugin

```shell
npm install optimize-css-assets-webpack-plugin --save-dev
```

修改webpack.config.prod.js文件

```js
...
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const prodCfg = {
	...
	optimization: {
        minimizer: [
            new OptimizeCssAssetsWebpackPlugin({}) // 压缩提取出来的CSS文件
        ]
    }
}
```

# performance

## hints：false

可以关闭webpack在编译时，出现的warning提示

# webpack与浏览器缓存

修改webpack的配置文件里output选项

```js
module.exports = {
	...
	output: {
		filename: '[name].[contenthash].js',
		chunkFilename: '[name].[contenthash].js'
	},
	...
}
```

contenthash，当文件修改后，webpack编译给出的一串hash值，若文件没有修改，contenthash不变

注意：编译出来的文件，存在manifact，会导致，文件没有修改，仍会出现contenthash发生变化，此时可以在webpack配置文件里增加optimization.runtimeChunk选项

```js
module.exports = {
	...
	optimization: {
		runtimeChunk: {
            name: 'runtime'
        },
		...
	}
}
```

# Shimming

## webpack.ProviderPlugin

```js
// 新增shimming.js

function testShimming() {
    $('body').text('test shimming...');
}

export default testShimming;


// 新增shimming2.js

function testShimming2() {
    const div = $('<div></div>').text('test shiming2......');
    $('body').append(div);
}

export default testShimming2;
```

```js
// 备份index.js文件，重写index.js文件

import testShimming from './js/shimming';
import testShimming2 from './js/shimming2';

testShimming();
testShimming2();
```

```js
// 修改webpack的comm配置文件

module.exports = {
	...
	plugins: [
		...
        new webpack.ProvidePlugin({
            $: 'jquery'	// 自动在使用$的模块里自动import 'jquery'
        }),
    ]
}
```

# webpack的env环境变量配置

```JS
const merge = require('webpack-merge');
const commCfg = require('./webpack.config.comm');

// 传递给module.exports不是一个{}对象，而是一个函数，并带有env参数
module.exports = (env) => {
    console.log(env);
    
    const devCfg = {
        mode: JSON.stringify(env.NODE_ENV),
        devtool: 'cheap-module-eval-source-map',
        devServer: {
            contentBase: './dist',
            port: '8082',
            open: true
        }
    };

    return merge(commCfg, devCfg);
}
```

```json
// package.json里传递--env.NODE_ENV环境变量，webpack配置文件有用到

"scripts": {
    "dev": "webpack --config ./build/webpack.config.dev.js",
    "bundle": "webpack --env.NODE_ENV=development --config ./build/webpack.config.js"
}
```

# library打包

新建了个library目录

```js
// math.js

export const add = (a, b) => {
    console.log(a + b);
}

export const minus = (a, b) => {
    console.log(a - b);
}

export const mulity = (a, b) => {
    console.log(a * b);
}

export const divi = (a, b) => {
    console.log(a / b);
}

// string.js

export const join = (a , b) => {
    return a + ' ' + b;
}

// index.js

import * as math from './math';
import * as string from './string';

export default {math, string};
```

新建个webpack配置文件

```js
// webpack.config.lib.js

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/library/index.js',
    output: {
        filename: 'library.js',
        path: path.resolve(__dirname, '../lib_dist'),
        library: 'root',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/library/index.html'
        })
    ]
}
```

在package.json添加个编译脚本

```json
"lib": "webpack --config ./build/webpack.config.lib.js"
```

## externals

```js
// 修改webpack.config.lib.js

module.exports = {
	...
    // externals: ['lodash'],
    externals: {
        lodash: {
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash',
            root: '_'
        }
    },
	...
}
```

```js
// string.js里引入lodash

import _ from 'lodash';

export const join = (a , b) => {
    return _.join([a, b], ' ');
}
```

externals，webpack在打包时，遇到lodash，将其不要打包进来

commonjs、amd这些都是表示了使用lodash的环境（require('lodash'); import _ from 'lodash'）



# 2



# 3













