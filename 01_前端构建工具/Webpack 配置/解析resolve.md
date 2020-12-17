# 解析(resolve)

这些选项能设置模块如何被解析。webpack 提供合理的默认值，但是还是可能会修改一些解析的细节。关于 resolver 具体如何工作的更多解释说明，请查看[模块解析](https://www.webpackjs.com/concepts/module-resolution)。

## `resolve`

`object`

配置模块如何解析！

例如，当在 ES2015 中调用 `import "lodash"`，`resolve` 选项能够对 webpack 查找 `"lodash"` 的方式去做修改。

### `resolve.alias`

`object`

创建 `import` 或 `require` 的别名，来确保模块引入变得更简单。例如，一些位于 `src/` 文件夹下的常用模块：

```js
alias: {
  Utilities: path.resolve(__dirname, 'src/utilities/'),
  Templates: path.resolve(__dirname, 'src/templates/')
}
```

现在，替换「在导入时使用相对路径」这种方式，就像这样：

```js
import Utility from '../../utilities/utility';
```

你可以这样使用别名：

```js
import Utility from 'Utilities/utility';
```

也可以在给定对象的键后的末尾添加 `$`，以表示精准匹配：

```js
alias: {
  xyz$: path.resolve(__dirname, 'path/to/file.js')
}
```

这将产生以下结果：

```js
import Test1 from 'xyz'; // 精确匹配，所以 path/to/file.js 被解析和导入
import Test2 from 'xyz/file.js'; // 非精确匹配，触发普通解析
```

下面的表格展示了一些其他情况：

| **别名**                         | **import "xyz"**                    | **import "xyz/file.js"**          |
| -------------------------------- | ----------------------------------- | --------------------------------- |
| {}                               | /abc/node_modules/xyz/index.js      | /abc/node_modules/xyz/file.js     |
| { xyz: "/abs/path/to/file.js" }  | /abs/path/to/file.js                | error                             |
| { xyz$: "/abs/path/to/file.js" } | /abs/path/to/file.js                | /abc/node_modules/xyz/file.js     |
| { xyz: "./dir/file.js" }         | /abc/dir/file.js                    | error                             |
| { xyz$: "./dir/file.js" }        | /abc/dir/file.js                    | /abc/node_modules/xyz/file.js     |
| { xyz: "/some/dir" }             | /some/dir/index.js                  | /some/dir/file.js                 |
| { xyz$: "/some/dir" }            | /some/dir/index.js                  | /abc/node_modules/xyz/file.js     |
| { xyz: "./dir" }                 | /abc/dir/index.js                   | /abc/dir/file.js                  |
| { xyz: "modu" }                  | /abc/node_modules/modu/index.js     | /abc/node_modules/modu/file.js    |
| { xyz$: "modu" }                 | /abc/node_modules/modu/index.js     | /abc/node_modules/xyz/file.js     |
| { xyz: "modu/some/file.js" }     | /abc/node_modules/modu/some/file.js | error                             |
| { xyz: "modu/dir" }              | /abc/node_modules/modu/dir/index.js | /abc/node_modules/dir/file.js     |
| { xyz: "xyz/dir" }               | /abc/node_modules/xyz/dir/index.js  | /abc/node_modules/xyz/dir/file.js |
| { xyz$: "xyz/dir" }              | /abc/node_modules/xyz/dir/index.js  | /abc/node_modules/xyz/file.js     |

如果在 `package.json` 中定义，`index.js` 可能会被解析为另一个文件。

`/abc/node_modules` 也可能在 `/node_modules` 中解析。

### `resolve.extensions`

`array`

自动解析确定的扩展。默认值为：

```js
extensions: [".js", ".json"]
```

能够使用户在引入模块时不带扩展：

```js
import File from '../path/to/file'
```

> *使用此选项，会* **覆盖默认数组** *，这就意味着 webpack 将不再尝试使用默认扩展来解析模块。对于使用其扩展导入的模块，例如，*`import SomeFile from "./somefile.ext"`*，要想正确的解析，一个包含“\*”的字符串必须包含在数组中。*
