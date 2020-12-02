# 创建 library

除了打包应用程序代码，webpack 还可以用于打包 JavaScript library。以下指南适用于希望流水线化(streamline)打包策略的 library 作者。

## 创建一个 library

假设你正在编写一个名为 `webpack-numbers` 的小的 library，可以将数字 1 到 5 转换为文本表示，反之亦然，例如将 2 转换为 'two'。

### project目录结构

```diff
+  |- webpack.config.js
+  |- package.json
+  |- /src
+    |- index.js
+    |- ref.json
```

初始化 npm，安装 webpack 和 lodash：

```bash
npm init -y
npm install --save-dev webpack lodash
```

### src/ref.json

```javascript
[{
  "num": 1,
  "word": "One"
}, {
  "num": 2,
  "word": "Two"
}, {
  "num": 3,
  "word": "Three"
}, {
  "num": 4,
  "word": "Four"
}, {
  "num": 5,
  "word": "Five"
}, {
  "num": 0,
  "word": "Zero"
}]
```

### src/index.js

```js
import _ from 'lodash';
import numRef from './ref.json';

export function numToWord(num) {
  return _.reduce(numRef, (accum, ref) => {
    return ref.num === num ? ref.word : accum;
  }, '');
};

export function wordToNum(word) {
  return _.reduce(numRef, (accum, ref) => {
    return ref.word === word && word.toLowerCase() ? ref.num : accum;
  }, -1);
};
```

###  library 的使用

该 library 的使用方式如下：

```js
// ES2015 模块引入
import * as webpackNumbers from 'webpack-numbers';
// CommonJS 模块引入
var webpackNumbers = require('webpack-numbers');
// ...
// ES2015 和 CommonJS 模块调用
webpackNumbers.wordToNum('Two');
// ...
// AMD 模块引入
require(['webpackNumbers'], function ( webpackNumbers) {
  // ...
  // AMD 模块调用
  webpackNumbers.wordToNum('Two');
  // ...
});
```

用户还可以通过 script 标签来加载和使用此 library：

```html
<!doctype html>
<html>
  ...
  <script src="https://unpkg.com/webpack-numbers"></script>
  <script>
    // ...
    // 全局变量
    webpackNumbers.wordToNum('Five')
    // window 对象中的属性
    window.webpackNumbers.wordToNum('Five')
    // ...
  </script>
</html>
```

注意，我们还可以通过以下配置方式，将 library 暴露：

- global 对象中的属性，用于 Node.js。
- `this` 对象中的属性。

完整的 library 配置和相关代码请参阅 [webpack library 示例](https://github.com/kalcifer/webpack-library-example)。

## 基本配置

现在，让我们以某种方式打包这个 library，能够实现以下几个目标：

- 不打包 `lodash`，而是使用 `externals` 来 require 用户加载好的 lodash。
- 设置 library 的名称为 `webpack-numbers`.
- 将 library 暴露为一个名为 `webpackNumbers`的变量。
- 能够访问其他 Node.js 中的 library。

此外，用户应该能够通过以下方式访问 library：

- ES2015 模块。例如 `import webpackNumbers from 'webpack-numbers'`。
- CommonJS 模块。例如 `require('webpack-numbers')`.
- 全局变量，当通过 `script` 脚本引入时

我们可以从这个基本的 webpack 配置开始：

**webpack.config.js**

```js
var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack-numbers.js'
  }
};
```

### 外部化 lodash

现在，如果执行 `webpack`，你会发现创建了一个非常巨大的文件。如果你查看这个文件，会看到 lodash 也被打包到代码中。在这种场景中，我们更倾向于把 `lodash` 当作 `peerDependency`。也就是说，用户应该已经将 `lodash` 安装好。因此，你可以放弃对外部 library 的控制，而是将控制权让给使用 library 的用户。

这可以使用 `externals` 配置来完成：

#### webpack.config.js - externals

```diff
  var path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'webpack-numbers.js'
-   }
+   },
+   externals: {
+     lodash: {
+       commonjs: 'lodash',
+       commonjs2: 'lodash',
+       amd: 'lodash',
+       root: '_'
+     }
+   }
  };
```

这意味着你的 library 需要一个名为 `lodash` 的依赖，这个依赖在用户的环境中必须存在且可用。

> 注意，如果你计划只是将 library 用作另一个 webpack bundle 中的依赖模块，则可以将 `externals` 指定为数组。

### 外部扩展的限制

对于从一个依赖目录中，调用多个文件的 library：

```js
import A from 'library/one';
import B from 'library/two';

// ...
```

无法通过在 externals 中指定 `library` 目录的方式，将它们从 bundle 中排除。你需要逐个排除它们，或者使用正则表达式排除。

```js
externals: [
  'library/one',
  'library/two',
  // Everything that starts with "library/"
  /^library\/.+$/
]
```

### 暴露 library

对于用途广泛的 library，我们希望它能够兼容不同的环境，例如 CommonJS，AMD，Node.js 或者作为一个全局变量。为了让你的 library 能够在各种用户环境(consumption)中可用，需要在 `output` 中添加 `library` 属性：

#### webpack.config.js - library

```diff
  var path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
-     filename: 'webpack-numbers.js'
+     filename: 'webpack-numbers.js',
+     library: 'webpackNumbers'
    },
    externals: {
      lodash: {
        commonjs: 'lodash',
        commonjs2: 'lodash',
        amd: 'lodash',
        root: '_'
      }
    }
  };
```

> 注意，`library` 设置绑定到 `entry` 配置。对于大多数库，指定一个入口起点就足够了。虽然[构建多个库](https://github.com/webpack/webpack/tree/master/examples/multi-part-library)也是也可以的，然而还可以直接通过将[主入口脚本(index script)](https://stackoverflow.com/questions/34072598/es6-exporting-importing-in-index-file)暴露部分导出，来作为单个入口起点则相对简单。**不推荐**使用`数组`作为库的 `entry`。

当你在 import 引入模块时，这可以将你的 library bundle 暴露为名为 `webpackNumbers` 的全局变量。为了让 library 和其他环境兼容，还需要在配置文件中添加 `libraryTarget` 属性。这是可以控制 library 如何以不同方式暴露的选项。

#### webpack.config.js - libraryTarget

```diff
  var path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'webpack-numbers.js',
-     library: 'webpackNumbers'
+     library: 'webpackNumbers',
+     libraryTarget: 'umd'
    },
    externals: {
      lodash: {
        commonjs: 'lodash',
        commonjs2: 'lodash',
        amd: 'lodash',
        root: '_'
      }
    }
  };
```

可以通过以下方式暴露 library：

- 变量：作为一个全局变量，通过 `script` 标签来访问（`libraryTarget:'var'`）。
- this：通过 `this` 对象访问（`libraryTarget:'this'`）。
- window：通过 `window` 对象访问，在浏览器中（`libraryTarget:'window'`）。
- UMD：在 AMD 或 CommonJS 的 `require` 之后可访问（`libraryTarget:'umd'`）。

如果设置了 `library` 但没设置 `libraryTarget`，则 `libraryTarget` 默认为 `var`，详细说明请查看 [output 配置文档](https://www.webpackjs.com/configuration/output)。查看 [`output.libraryTarget`](https://www.webpackjs.com/configuration/output#output-librarytarget)，以获取所有可用选项的详细列表。

> 在 webpack 3.5.5 中，使用 `libraryTarget: { root:'_' }` 将无法正常工作（参考 [issue 4824](https://github.com/webpack/webpack/issues/4824)) 所述）。然而，可以设置 `libraryTarget: { var: '_' }` 来将 library 作为全局变量。

### library相关说明

#### library

`string` 或 `object`（从 webpack 3.1.0 开始；用于 `libraryTarget: "umd"`）

`output.library` 的值的作用，取决于[`output.libraryTarget`](https://www.webpackjs.com/configuration/output/#output-librarytarget) 选项的值；完整的详细信息请查阅该章节。注意，`output.libraryTarget` 的默认选项是 `var`，所以如果使用以下配置选项：

```js
output: {
  library: "MyLibrary"
}
```

如果生成的输出文件，是在 HTML 页面中作为一个 script 标签引入，则变量 `MyLibrary` 将与入口文件的返回值绑定。

#### libraryTarget

> 默认值： `"var"`

配置如何暴露 library。可以使用下面的选项中的任意一个。注意，此选项与分配给 [`output.library`](https://www.webpackjs.com/configuration/output/#output-library) 的值一同使用。对于下面的所有示例，都假定将 `output.library` 的值配置为 `MyLibrary`。

> *注意，下面的示例代码中的* `_entry_return_` *是入口起点返回的值。在 bundle 本身中，它是从入口起点、由 webpack 生成的函数的输出结果。*

##### 暴露为一个变量

这些选项将入口起点的返回值（例如，入口起点的任何导出值），在 bundle 包所引入的位置，赋值给 output.library 提供的变量名。

- `libraryTarget: "var"` - （默认值）当 library 加载完成，**入口起点的返回值**将分配给一个变量：

```js
var MyLibrary = _entry_return_;

// 在一个单独的 script……
MyLibrary.doSomething();
```

> *当使用此选项时，将* `output.library` *设置为空，会因为没有变量导致无法赋值。*

- `libraryTarget: "assign"` - 这将产生一个隐含的全局变量，可能会潜在地重新分配到全局中已存在的值（谨慎使用）。.

```js
MyLibrary = _entry_return_;
```

> 注意，如果 `MyLibrary` 在作用域中未在前面代码进行定义，则你的 library 将被设置在全局作用域内。

> *当使用此选项时，将* `output.library` *设置为空，将产生一个破损的输出 bundle。*

##### 通过在对象上赋值暴露

这些选项将入口起点的返回值（例如，入口起点的任何导出值）赋值给一个特定对象的属性（此名称由 `output.library` 定义）下。

如果 `output.library` 未赋值为一个非空字符串，则默认行为是，将入口起点返回的所有属性都赋值给一个对象（此对象由 `output.libraryTarget` 特定），通过如下代码片段：

```js
(function(e, a) {
	for(var i in a)
		e[i] = a[i];
}(${output.libraryTarget}, _entry_return_));
```

> *注意，不设置* `output.library` *将导致由入口起点返回的所有属性，都会被赋值给给定的对象；这里并不会检查现有的属性名是否存在。*

- `libraryTarget: "this"` - **入口起点的返回值**将分配给 this 的一个属性（此名称由 `output.library` 定义）下，`this` 的含义取决于你：

```js
this["MyLibrary"] = _entry_return_;

// 在一个单独的 script……
this.MyLibrary.doSomething();
MyLibrary.doSomething(); // 如果 this 是 window
```

- `libraryTarget: "window"` - **入口起点的返回值**将使用 `output.library` 中定义的值，分配给 `window` 对象的这个属性下。

```js
window["MyLibrary"] = _entry_return_;

window.MyLibrary.doSomething();
```

- `libraryTarget: "global"` - **入口起点的返回值**将使用 `output.library` 中定义的值，分配给 `global` 对象的这个属性下。

```js
global["MyLibrary"] = _entry_return_;

global.MyLibrary.doSomething();
```

- `libraryTarget: "commonjs"` - **入口起点的返回值**将使用 `output.library` 中定义的值，分配给 exports 对象。这个名称也意味着，模块用于 CommonJS 环境：

```js
exports["MyLibrary"] = _entry_return_;

require("MyLibrary").doSomething();
```

##### 模块定义系统

这些选项将导致 bundle 带有更完整的模块头部，以确保与各种模块系统的兼容性。根据 `output.libraryTarget` 选项不同，`output.library` 选项将具有不同的含义。

- `libraryTarget: "commonjs2"` - **入口起点的返回值**将分配给 `module.exports` 对象。这个名称也意味着模块用于 CommonJS 环境：

```js
module.exports = _entry_return_;
```

```js
require("MyLibrary").doSomething();
```

注意，`output.library` 会被省略，因此对于此特定的 `output.libraryTarget`，无需再设置 `output.library` 。

- `libraryTarget: "amd"` - 将你的 library 暴露为 AMD 模块。

AMD 模块要求入口 chunk（例如使用 `<script>` 标签加载的第一个脚本）通过特定的属性定义，例如 `define` 和 `require`，它们通常由 RequireJS 或任何兼容的模块加载器提供（例如 almond）。否则，直接加载生成的 AMD bundle 将导致报错，如 `define is not defined`。

所以，使用以下配置……

```js
output: {
  library: "MyLibrary",
  libraryTarget: "amd"
}
```

生成的 output 将会使用 "MyLibrary" 作为模块名定义，即

```js
define("MyLibrary", [], function() {
  return _entry_return_; // 此模块返回值，是入口 chunk 返回的值
});
```

可以在 script 标签中，将 bundle 作为一个模块整体引入，并且可以像这样调用 bundle：

```js
require(['MyLibrary'], function(MyLibrary) {
  // 使用 library 做一些事……
});
```

如果 `output.library` 未定义，将会生成以下内容。

```js
define([], function() {
  return _entry_return_; // 此模块返回值，是入口 chunk 返回的值
});
```

如果直接加载 `<script>` 标签，此 bundle 无法按预期运行，或者根本无法正常运行（在 almond loader 中）。只能通过文件的实际路径，在 RequireJS 兼容的异步模块加载器中运行，因此在这种情况下，如果这些设置直接暴露在服务器上，那么 `output.path` 和 `output.filename` 对于这个特定的设置可能变得很重要。

- `libraryTarget: "umd"` - 将你的 library 暴露为所有的模块定义下都可运行的方式。它将在 CommonJS, AMD 环境下运行，或将模块导出到 global 下的变量。了解更多请查看 [UMD 仓库](https://github.com/umdjs/umd)。

在这个例子中，你需要 `library` 属性来命名你的模块：

```js
output: {
  library: "MyLibrary",
  libraryTarget: "umd"
}
```

最终输出如下：

```js
(function webpackUniversalModuleDefinition(root, factory) {
  if(typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if(typeof define === 'function' && define.amd)
    define([], factory);
  else if(typeof exports === 'object')
    exports["MyLibrary"] = factory();
  else
    root["MyLibrary"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
  return _entry_return_; // 此模块返回值，是入口 chunk 返回的值
});
```

注意，省略 `library` 会导致将入口起点返回的所有属性，直接赋值给 root 对象，就像[对象分配章节](https://www.webpackjs.com/configuration/output/#expose-via-object-assignment)。例如：

```js
output: {
  libraryTarget: "umd"
}
```

输出结果如下：

```js
(function webpackUniversalModuleDefinition(root, factory) {
  if(typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if(typeof define === 'function' && define.amd)
    define([], factory);
  else {
    var a = factory();
    for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
  }
})(typeof self !== 'undefined' ? self : this, function() {
  return _entry_return_; // 此模块返回值，是入口 chunk 返回的值
});
```

从 webpack 3.1.0 开始，你可以将 `library` 指定为一个对象，用于给每个 target 起不同的名称：

```js
output: {
  library: {
    root: "MyLibrary",
    amd: "my-library",
    commonjs: "my-common-library"
  },
  libraryTarget: "umd"
}
```

##### 其他 Targets

`libraryTarget: "jsonp"` - 这将把入口起点的返回值，包裹到一个 jsonp 包装容器中

```
MyLibrary(_entry_return_);
```

你的 library 的依赖将由 [`externals`](https://www.webpackjs.com/configuration/externals/) 配置定义。

### 最终步骤

遵循[生产环境指南](https://www.webpackjs.com/guides/production)中的步骤，来优化生产环境下的输出。那么，我们还需要通过设置 `package.json` 中的 `main` 字段，添加生成 bundle 的文件路径。

#### package.json

```json
{
  ...
  "main": "dist/webpack-numbers.js",
  ...
}
```

或者，按照这里的[指南](https://github.com/dherman/defense-of-dot-js/blob/master/proposal.md#typical-usage)添加为标准模块：

```json
{
  ...
  "module": "src/index.js",
  ...
}
```

键(key) `main` 是指 [`package.json` 标准](https://docs.npmjs.com/files/package.json#main)，以及 `module` 是 [一个](https://github.com/dherman/defense-of-dot-js/blob/master/proposal.md)[提案](https://github.com/rollup/rollup/wiki/pkg.module)，此提案允许 JavaScript 生态系统升级使用 ES2015 模块，而不会破坏向后兼容性。

> `module` 属性应指向一个使用 ES2015 模块语法的脚本，但不包括浏览器或 Node.js 尚不支持的其他语法特性。这使得 webpack 本身就可以解析模块语法，如果用户只用到 library 的某些部分，则允许通过 [tree shaking](https://webpack.js.org/guides/tree-shaking/) 打包更轻量的包。

现在你可以[将其发布为一个 npm 包](https://docs.npmjs.com/getting-started/publishing-npm-packages)，并且在 [unpkg.com](https://unpkg.com/#/) 找到它并分发给你的用户。

> 为了暴露和 library 关联着的样式表，你应该使用 [`ExtractTextPlugin`](https://www.webpackjs.com/plugins/extract-text-webpack-plugin)。然后，用户可以像使用其他样式表一样使用和加载这些样式表。
