# 搭建本地开发环境

本地搭建环境要费一些时间，但是你可以选择自己喜欢的编辑器来完成开发。以下是具体步骤：

1.确保你安装了较新版本的 [Node.js](https://nodejs.org/en/)。

2.按照 [Create React App 安装指南](https://react.docschina.org/docs/create-a-new-react-app.html#create-react-app)创建一个新的项目

```
npx create-react-app my-app
```

create-react-app脚手架工具创建的project name不能有大写字母：

```shell
D:\workspace\NotepadWorkspace
$ npx create-react-app ReactDemo
npx: 98 安装成功，用时 17.339 秒
Cannot create a project named "ReactDemo" because of npm naming restrictions:

- name can no longer contain capital letters

Please choose a different project name.

```

3.删除掉新项目中 `src/` 文件夹下的所有文件。

> 注意：
>
> **不要删除整个 `src` 文件夹，删除里面的源文件**。我们会在接下来的步骤中使用示例代码替换默认源文件。

```shell
cd my-app
cd src

# 如果你使用 Mac 或 Linux:
rm -f *

# 如果你使用 Windows:
del *

# 然后回到项目文件夹
cd ..
```

4.在 `src/` 文件夹中创建一个名为 `index.css` 的文件，并拷贝[这些 CSS 代码](https://codepen.io/gaearon/pen/oWWQNa?editors=0100)。

5.在 `src/` 文件夹下创建一个名为 `index.js` 的文件，并拷贝[这些 JS 代码](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)。

6.拷贝以下三行代码到 `src/` 文件夹下的 `index.js` 文件的顶部：

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
```

现在，在项目文件夹下执行 `npm start` 命令，然后在浏览器访问 `http://localhost:3000`。这样你就可以在浏览器中看见一个空的井字棋的棋盘了。

