## 配置镜像站

```bash
npm config set registry=http://registry.npm.taobao.org
```

## 显示所有配置信息

```bash
npm config list
```

## 移除node_modules

```bash
npm install rimraf -g
rimraf node_modules
```

## `package.json`

**package.json 属性说明：**

- name：这个很好理解，就是package的名称。不过需要注意的是，name有长度限制(虽然一般都不会超)，而且name不能以 【点】 或者 【下划线】开头，name中不能有大写字母。这个是每一个package必须的。在业务代码中，通过require(${name})就可以引入对应的程序包了；
- version：package的版本。对于业务项目来说，这个往往不太重要，但是如果你要发布自己的项目，这个就显得十分重要了。name和version共同决定了唯一一份代码。npm是用[npm-semver](https://docs.npmjs.com/cli/v6/using-npm/semver)来解析版本号的。我们一般见到的都是大版本.次要版本.小版本这种版本号，比如16.1.0。版本号的规则、含义其实蛮多的，可以参考[这篇文章](https://segmentfault.com/a/1190000011368506)。；
- description：包的描述。开发组件库时必需，简明的向库的使用者介绍这个库是干嘛的。对整个代码结构的描述。告诉代码包使用者可以在哪里找到对应的文件，对于公司的业务项目，这个配置项一般无所谓；
- files：数组。表示代码包下载安装完成时包括的所有文件。
- author : 包的作者，它的值是你在 https://npmjs.org 网站的有效账户名，遵循“账户名<邮件>”的规则，例如：zhangsan zhangsan@163.com；可以为字符串，对象。
- contributors ：包的其他贡献者；author的数组。
- main : 指定了程序的主入口文件，这个字段的默认值是模块根目录下面的 index.js；代码入口。这个十分重要，特别是对于组件库。当你想在node_modules中修改你使用的某个组件库的代码时，首先在node_modules中找到这个组件库，第一眼就是要看这个main，找到组件库的入口文件。在这个入口文件中再去修改代码吧。
- keywords : 关键词。一个字符串数组，对这个npm包的介绍。组件库必需，便于使用者在npm中搜索。对于公司业务项目，这个配置一般无所谓。
- homepage： 包的官网URL；项目主页。对于开发组件库来说挺有用的。
- bugs：开发者的联系方式，代码库的issues地址等。如果代码使用者发现了bug，可以通过这个配置项找到提bug的地方。
- license：开源协议。对于开源组件库，这个十分重要。之前react还因为这事儿没少被社区嫌弃。开源协议略微复杂，用[阮一峰前辈](http://www.ruanyifeng.com/blog/2011/05/how_to_choose_free_software_licenses.html)的一张图来说明一下吧。注：图里少了ISC, ISC和BSD差不多
- config：用于添加命令行的环境变量。具体用法见[这里](https://docs.npmjs.com/cli/v6/using-npm/config)。
- bundledDependencies：数组，打包时的依赖。如果配置了bundledDependencies，在项目中执行 npm pack将项目打包时，最后生成的.tgz包中，会包含bundledDependencies中配置的依赖。bundledDependencies中的依赖必须在devDependencies或者dependencies中声明过。
- peerDependencies: 指定当前组件的依赖以其版本。如果组件使用者在项目中安装了其他版本的同一依赖，会提示报错。
- engines：指定项目所依赖的node环境、npm版本等。
- private：如果设为true，无法通过npm publish发布代码。
- bin：用来指定各个内部命令对应的可执行文件的路径。具体用法这里不多讲了。详情可以点击[这里](https://docs.npmjs.com/cli/v6/configuring-npm/package-json)。
- scripts：指定了运行脚本命令的npm命令行缩写。十分重要。
  来看一个例子：

```javascript
"scripts": {
    "dev": "NODE_ENV=dev webpack-dev-server --progress --hot --host 0.0.0.0 --port 8089",
    "test": "NODE_ENV=test webpack --config webpack.test.config.js --progress",
    "online": "NODE_ENV=production webpack --config webpack.online.config.js --progress",
    "build": "webpack",
    "node": "node server.js"
  },
```

在命令行输入：npm run dev , 对应的命令就会被执行。这里有一个地方需要注意，当执行npm run xxx的时候，node_modules/.bin/目录会在运行时被加入系统的PATH变量。上面的例子，当我们在命令行输入：npm run build时，其实真正执行的命令是node_modules/.bin/webpack而不是webpack。所以，当你的webpack并未全局安装时，直接在命令行输入：webpack是会报错的。因为你的webapck是安装在node_modules/.bin/下面的。

- repository : 对于组件库很有用。让组件库使用者找到你的代码库地址。这个配置项会直接在组件库的npm首页生效。
  例子:

```javascript
"repository": {
   "type": "git",
   "url": "git+https://github.com/CoyPan/react-scroll-to-show-cb.git"
},
```

- devDependencies：项目的依赖。通过`npm run install --save-dev`安装的包会出现在这里。主要是在开发过程中依赖的一些工具。用法与dependencies相似。
- dependencies：项目的依赖。通过`npm install --save`安装的包会出现在这里。注意，不要把测试工具、代码转换器或者打包工具等放在这里。当你在命令行里面使用`npm install react --save`时，react就会出现在dependencies。默认是安装最新的版本。如果想安装某个特定的版本，可以`npm install react@15.6.2`。以下的dependencies，格式都是合法的，

```javascript
"dependencies" : { 
    "foo" : "1.0.0 - 2.9999.9999",
    "bar" : "&gt;=1.0.2 &lt;2.1.2",
    "baz" : "&gt;1.0.2 &lt;=2.3.4",
    "boo" : "2.0.1",
    "qux" : "&lt;1.0.0 || &gt;=2.3.1 &lt;2.4.5 || &gt;=2.5.2 &lt;3.0.0",
    "asd" : "http://asdf.com/asdf.tar.gz",
    "til" : "~1.2",
    "elf" : "~1.2.3",
    "two" : "2.x",
    "thr" : "3.3.x",
    "lat" : "latest",
    "dyl" : "file:../dyl"
  }
```

我们常见的是下面这些：

```javascript
"dependencies": {
    "foo": "1.0.0", // 指定了就是1.0.0版本
    "bar": "~1.2.2", // 安装版本号不低于1.2.2的1.2.x的最新版本，例如:1.2.3， 1.2.4等等。1.2.1 ，1.3.x 等就不行了
    "baz": "ˆ1.2.2", // 安装版本号不低于1.2.2的1.x.x的最新版本，例如: 1.2.7，1.3.1，1.7.8等。1.2.1 ，2.0.0 等就不行了。注意，如果配置是^0.x.x，则和~0.x.x的效果一样。                
    "lat": "latest"  // 安装最新版本
}
```

dependencies 还可以像下面这样配置：

```javascript
"dependencies": {
    "foo": "git+ssh://git@github.com:foo/foo.git#v1.0.1",
}
```

foo组件的地址为：`git+ssh://{foo代码库的ssh地址}#v{foo的版本号}`

这样的配置在下面这种场景十分有用：

组内的许多项目都有同一个功能，把这个功能抽出来做成组件是很自然的想法。但是每个项目都有自己的代码库，公司也没有内部的npm库，组件应该放在哪里呢？可以专门为组件新建一个代码仓库，将组件放在这里开发、迭代。这样，各个项目都可以引用该组件：只需要在dependencies中将组件配置成上述的形式。至于组件的版本，可以通过git tag来控制。

dependencies还有其他的配置方式，具体在这里[查看](https://docs.npmjs.com/cli/v6/configuring-npm/package-json)。

**每个项目的根目录下面，一般都有一个 package.json 文件，定义了这个项目所需要的各种模块，以及项目的配置信息（比如名称、版本、许可证等元数据）。`npm install` 命令根据这个配置文件，自动下载所需的模块，也就是配置项目所需的运行和开发环境。package.json 文件可以手工编写，也可以使用 `npm init` 命令自动生成。**

## `package-lock.json`

package-lock.json 是在 `npm install` 时候生成的一份文件，用以记录当前状态下实际安装的各个 npm package 的具体来源和版本号。

package-lock.json 文件的作用锁定安装时的包的版本号，并且需要上传到 git，以保证其他人在 `npm install` 时大家的依赖能保证一致。

存在的意义主要有 4 点：

- 在团队开发中，确保每个团队成员安装的依赖版本是一致的。否则因为依赖版本不一致导致的效果差异，一般很难查出来。
- 通常 node_modules 目录都不会提交到代码库，因此要回溯到某一天的状态是不可能的。但现在 node_modules 目录和 package.json 以及 package-lock.json 是一一对应的。所以如果开发者想回退到之前某一天的目录状态，只要把这两个文件回退到那一天的状态，再 `npm i` 就行了。
- 因为 package-lock.json 已经足以描述 node_modules 的大概信息（尤其是深层嵌套依赖），所以通过这个文件就可以查阅某个依赖包是被谁依赖进来的，而不用去翻 node_modules 目录（事实上现在目录结构打平而非嵌套，翻也翻不出来了）。
- 在安装过程中，npm 内部会检查 node_modules 目录中已有的依赖包，并和 package-lock.json 进行比较。如果重复，则跳过安装，能大大优化安装时间。

## 版本号           

指定版本：比如1.2.2，遵循“大版本.次要版本.小版本”的格式规定，安装时只安装指定版本。

(1) 波浪号（tilde）+指定版本：比如~1.2.2，表示安装1.2.x的最新版本（不低于1.2.2），但是不安装1.3.x，也就是说安装时不改变大版本号和次要版本号。
(2) 插入号（caret）+指定版本：比如ˆ1.2.2，表示安装1.x.x的最新版本（不低于1.2.2），但是不安装2.x.x，也就是说安装时不改变大版本号。需要注意的是，如果大版本号为0，则插入号的行为与波浪号相同，这是因为此时处于开发阶段，即使是次要版本号变动，也可能带来程序的不兼容。
(3) latest：安装最新版本
所以建议使用~来标记版本号，这样可以保证项目不会出现大的问题，也能保证包中的小 bug 可以得到修复。

### `npm install`某版本

如果我们的记不清楚具体的版本号，我们可以加通配符即可

```bash
npm install webpack@3.x.x -g
npm install webpack@3.1.x -g
```

