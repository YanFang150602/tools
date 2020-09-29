## 准备项目

```shell
$ mkdir TSWebpackTemplate
$ cd TSWebpackTemplate
$ npm init -y
```

## 安装依赖

```shell
$ npm install webpack webpack-cli --save-dev
$ npm install ts-loader --save-dev
$ npm install typescript --save-dev

$ npm install webpack-dev-server --save-dev
$ npm install html-webpack-plugin --save-dev
$ npm install clean-webpack-plugin --save-dev
```

## 配置文件

### `build/webpack.config.js`

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/index.tsx'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js'
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: '../dist',
        port: '8085',
        open: true,
        hot: true,
        hotOnly: true
    }
};
```

### `tsconfig.json`

```json
{
    "compilerOptions": {
        "module": "commonjs",
        "noImplicitAny": true,
        "removeComments": true,
        "preserveConstEnums": true,
        "sourceMap": true
    },
    "include": [
        "src/**/*"
    ],
    "exclude": [
        "node_modules"
    ]
}
```

### `package.json`

```json
{
  "name": "TSWebpackTemplate",
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
  "devDependencies": {
    "clean-webpack-plugin": "^3.0.0",
    "html-webpack-plugin": "^4.5.0",
    "ts-loader": "^8.0.4",
    "typescript": "^4.0.3",
    "webpack": "^4.44.2",
    "webpack-cli": "^3.3.12",
    "webpack-dev-server": "^3.11.0"
  }
}

```

## 源文件

### `src/index.html`

```html
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>
```

### `src/index.tsx`

```tsx
class Student {
    private name:string;
    private age:number;

    constructor(name:string, age:number) {
        this.name = name;
        this.age = age;
    }

    doHomework(): void {
        console.log(`${this.name}开始做作业！`);
    }
}

const me = new Student('天天', 10);
me.doHomework();
```

