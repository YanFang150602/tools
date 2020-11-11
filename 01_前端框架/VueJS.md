# vue-cli

1、本地安装node.js

2、安装vue

Vue.js提供了两种不同的安装方式：

1）直接引入<script>的方式（此处不做介绍了）

2）Vue-cli脚手架，官方的命令行工具，用于快速构建具有热重载、vuex状态管理、router路由等配置的项目。

```bash
# 安装Vue-cli
npm install --global vue-cli
```

使用脚手架搭建工程，执行以下命令：

```bash
vue init webpack my-project
cd my-project
npm install
```

若第一步网络无法下载webpack模板，可以先去网站https://github.com/vuejs-templates下载模板，再本地离线安装。

模板下载后，解压到目录C:\Users\yanfangfang/.vue-templates下。

再执行第一步的命令，后面加上--offline

```bash
vue init webpack my-project --offline
npm run dev 
```

# 组件基础

## 基本示例

这里有一个 Vue 组件的示例：

```js
// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
```

组件是可复用的 Vue 实例，且带有一个名字：在这个例子中是 `<button-counter>`。我们可以在一个通过 `new Vue` 创建的 Vue 根实例中，把这个组件作为自定义元素来使用：

```html
<div id="components-demo">
  <button-counter></button-counter>
</div>
```

```js
new Vue({ el: '#components-demo' })
```

因为组件是可复用的 Vue 实例，所以它们与 `new Vue` 接收相同的选项，例如 `data`、`computed`、`watch`、`methods` 以及生命周期钩子等。仅有的例外是像 `el` 这样根实例特有的选项。

## 组件的复用

你可以将组件进行任意次数的复用：

```html
<div id="components-demo">
  <button-counter></button-counter>
  <button-counter></button-counter>
  <button-counter></button-counter>
</div>
```

注意当点击按钮时，每个组件都会各自独立维护它的 `count`。因为你每用一次组件，就会有一个它的新**实例**被创建。

### `data` 必须是一个函数

当我们定义这个 `<button-counter>` 组件时，你可能会发现它的 `data` 并不是像这样直接提供一个对象：

```
data: {
  count: 0
}
```

取而代之的是，**一个组件的 `data` 选项必须是一个函数**，因此每个实例可以维护一份被返回对象的独立的拷贝：

```
data: function () {
  return {
    count: 0
  }
}
```

## 组件的组织

通常一个应用会以一棵嵌套的组件树的形式来组织，例如，你可能会有页头、侧边栏、内容区等组件，每个组件又包含了其它的像导航链接、博文之类的组件。

为了能在模板中使用，这些组件必须先注册以便 Vue 能够识别。这里有两种组件的注册类型：**全局注册**和**局部注册**。至此，我们的组件都只是通过 `Vue.component` 全局注册的：

```js
Vue.component('my-component-name', {
  // ... options ...
})
```

全局注册的组件可以用在其被注册之后的任何 (通过 `new Vue`) 新创建的 Vue 根实例，也包括其组件树中的所有子组件的模板中。

到目前为止，关于组件注册你需要了解的就这些了，如果你阅读完本页内容并掌握了它的内容，我们会推荐你再回来把[组件注册](https://cn.vuejs.org/v2/guide/components-registration.html)读完。

## [通过 Prop 向子组件传递数据](https://cn.vuejs.org/v2/guide/components.html#通过-Prop-向子组件传递数据)

Prop 是你可以在组件上注册的一些自定义 attribute。当一个值传递给一个 prop attribute 的时候，它就变成了那个组件实例的一个 property。

```js
Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})
```

一个组件默认可以拥有任意数量的 prop，任何值都可以传递给任何 prop。在上述模板中，你会发现我们能够在组件实例中访问这个值，就像访问 `data` 中的值一样。

一个 prop 被注册之后，你就可以像这样把数据作为一个自定义 attribute 传递进来：

```html
<blog-post title="My journey with Vue"></blog-post>
<blog-post title="Blogging with Vue"></blog-post>
<blog-post title="Why Vue is so fun"></blog-post>
```

然而在一个典型的应用中，你可能在 `data` 里有一个博文的数组：

```js
new Vue({
  el: '#blog-post-demo',
  data: {
    posts: [
      { id: 1, title: 'My journey with Vue' },
      { id: 2, title: 'Blogging with Vue' },
      { id: 3, title: 'Why Vue is so fun' }
    ]
  }
})
```

并想要为每篇博文渲染一个组件：

```html
<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title"
></blog-post>
```

如上所示，你会发现我们可以使用 `v-bind` 来动态传递 prop。这在你一开始不清楚要渲染的具体内容，比如[从一个 API 获取博文列表](https://codesandbox.io/s/github/vuejs/vuejs.org/tree/master/src/v2/examples/vue-20-component-blog-post-example)的时候，是非常有用的。

到目前为止，关于 prop 你需要了解的大概就这些了，如果你阅读完本页内容并掌握了它的内容，我们会推荐你再回来把 [prop](https://cn.vuejs.org/v2/guide/components-props.html) 读完。

## 单个根元素

当构建一个 `<blog-post>` 组件时，你的模板最终会包含的东西远不止一个标题：

```html
<h3>{{ title }}</h3>
```

最最起码，你会包含这篇博文的正文：

```html
<h3>{{ title }}</h3>
<div v-html="content"></div>
```

然而如果你在模板中尝试这样写，Vue 会显示一个错误，并解释道 **every component must have a single root element (每个组件必须只有一个根元素)**。你可以将模板的内容包裹在一个父元素内，来修复这个问题，例如：

```html
<div class="blog-post">
  <h3>{{ title }}</h3>
  <div v-html="content"></div>
</div>
```

看起来当组件变得越来越复杂的时候，我们的博文不只需要标题和内容，还需要发布日期、评论等等。为每个相关的信息定义一个 prop 会变得很麻烦：

```html
<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title"
  v-bind:content="post.content"
  v-bind:publishedAt="post.publishedAt"
  v-bind:comments="post.comments"
></blog-post>
```

所以是时候重构一下这个 `<blog-post>` 组件了，让它变成接受一个单独的 `post` prop：

```html
<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:post="post"
></blog-post>
```

```js
Vue.component('blog-post', {
  props: ['post'],
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <div v-html="post.content"></div>
    </div>
  `
})
```

现在，不论何时为 `post` 对象添加一个新的 property，它都会自动地在 `<blog-post>` 内可用。

## 监听子组件事件

在我们开发 `<blog-post>` 组件时，它的一些功能可能要求我们和父级组件进行沟通。例如我们可能会引入一个辅助功能来放大博文的字号，同时让页面的其它部分保持默认的字号。

在其父组件中，我们可以通过添加一个 `postFontSize` 数据 property 来支持这个功能：

```js
new Vue({
  el: '#blog-posts-events-demo',
  data: {
    posts: [/* ... */],
    postFontSize: 1
  }
})
```

它可以在模板中用来控制所有博文的字号：

```html
<div id="blog-posts-events-demo">
  <div :style="{ fontSize: postFontSize + 'em' }">
    <blog-post
      v-for="post in posts"
      v-bind:key="post.id"
      v-bind:post="post"
    ></blog-post>
  </div>
</div>
```

现在我们在每篇博文正文之前添加一个按钮来放大字号：

```js
Vue.component('blog-post', {
  props: ['post'],
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <button>
        Enlarge text
      </button>
      <div v-html="post.content"></div>
    </div>
  `
})
```

问题是这个按钮不会做任何事：

```html
<button>
  Enlarge text
</button>
```

当点击这个按钮时，我们需要告诉父级组件放大所有博文的文本。幸好 Vue 实例提供了一个自定义事件的系统来解决这个问题。父级组件可以像处理 native DOM 事件一样通过 `v-on` 监听子组件实例的任意事件：

```html
<blog-post
  ...
  v-on:enlarge-text="postFontSize += 0.1"
></blog-post>
```

同时子组件可以通过调用内建的 [**`$emit`** 方法](https://cn.vuejs.org/v2/api/#vm-emit)并传入事件名称来触发一个事件：

```html
<button v-on:click="$emit('enlarge-text')">
  Enlarge text
</button>
```

有了这个 `v-on:enlarge-text="postFontSize += 0.1"` 监听器，父级组件就会接收该事件并更新 `postFontSize` 的值。

### 使用事件抛出一个值

有的时候用一个事件来抛出一个特定的值是非常有用的。例如我们可能想让 `<blog-post>` 组件决定它的文本要放大多少。这时可以使用 `$emit` 的第二个参数来提供这个值：

```html
<button v-on:click="$emit('enlarge-text', 0.1)">
  Enlarge text
</button>
```

然后当在父级组件监听这个事件的时候，我们可以通过 `$event` 访问到被抛出的这个值：

```html
<blog-post
  ...
  v-on:enlarge-text="postFontSize += $event"
></blog-post>
```

或者，如果这个事件处理函数是一个方法：

```html
<blog-post
  ...
  v-on:enlarge-text="onEnlargeText"
></blog-post>
```

那么这个值将会作为第一个参数传入这个方法：

```js
methods: {
  onEnlargeText: function (enlargeAmount) {
    this.postFontSize += enlargeAmount
  }
}
```

### [在组件上使用 `v-model`](https://cn.vuejs.org/v2/guide/components.html#在组件上使用-v-model)

自定义事件也可以用于创建支持 `v-model` 的自定义输入组件。记住：

```html
<input v-model="searchText">
```

等价于：

```html
<input
  v-bind:value="searchText"
  v-on:input="searchText = $event.target.value"
>
```

当用在组件上时，`v-model` 则会这样：

```html
<custom-input
  v-bind:value="searchText"
  v-on:input="searchText = $event"
></custom-input>
```

为了让它正常工作，这个组件内的 `<input>` 必须：

- 将其 `value` attribute 绑定到一个名叫 `value` 的 prop 上
- 在其 `input` 事件被触发时，将新的值通过自定义的 `input` 事件抛出

写成代码之后是这样的：

```js
Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
})
```

现在 `v-model` 就应该可以在这个组件上完美地工作起来了：

```html
<custom-input v-model="searchText"></custom-input>
```

到目前为止，关于组件自定义事件你需要了解的大概就这些了，如果你阅读完本页内容并掌握了它的内容，我们会推荐你再回来把[自定义事件](https://cn.vuejs.org/v2/guide/components-custom-events.html)读完。

## [通过插槽分发内容](https://cn.vuejs.org/v2/guide/components.html#通过插槽分发内容)

和 HTML 元素一样，我们经常需要向一个组件传递内容，像这样：

```html
<alert-box>
  Something bad happened.
</alert-box>
```

幸好，Vue 自定义的 `<slot>` 元素让这变得非常简单：

```js
Vue.component('alert-box', {
  template: `
    <div class="demo-alert-box">
      <strong>Error!</strong>
      <slot></slot>
    </div>
  `
})
```

如你所见，我们只要在需要的地方加入插槽就行了——就这么简单！

到目前为止，关于插槽你需要了解的大概就这些了，如果你阅读完本页内容并掌握了它的内容，我们会推荐你再回来把[插槽](https://cn.vuejs.org/v2/guide/components-slots.html)读完。

## 动态组件

有的时候，在不同组件之间进行动态切换是非常有用的，比如在一个多标签的界面里。

上述内容可以通过 Vue 的 `<component>` 元素加一个特殊的 `is` attribute 来实现：

```html
<!-- 组件会在 变量currentTabComponent 改变时改变 -->
<component v-bind:is="currentTabComponent"></component>
```

在上述示例中，`currentTabComponent` 可以是

- 已注册组件的名字

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Dynamic Components Example</title>
    <script src="https://unpkg.com/vue"></script>
    <style>
      .tab-button {
        padding: 6px 10px;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        border: 1px solid #ccc;
        cursor: pointer;
        background: #f0f0f0;
        margin-bottom: -1px;
        margin-right: -1px;
      }
      .tab-button:hover {
        background: #e0e0e0;
      }
      .tab-button.active {
        background: #e0e0e0;
      }
      .tab {
        border: 1px solid #ccc;
        padding: 10px;
      }
    </style>
  </head>
  <body>
    <div id="dynamic-component-demo" class="demo">
      <button
        v-for="tab in tabs"
        v-bind:key="tab"
        v-bind:class="['tab-button', { active: currentTab === tab }]"
        v-on:click="currentTab = tab"
      >
        {{ tab }}
      </button>

      <component v-bind:is="currentTabComponent" class="tab"></component>
    </div>

    <script>
      Vue.component("tab-home", {
        template: "<div>Home component</div>"
      });
      Vue.component("tab-posts", {
        template: "<div>Posts component</div>"
      });
      Vue.component("tab-archive", {
        template: "<div>Archive component</div>"
      });

      new Vue({
        el: "#dynamic-component-demo",
        data: {
          currentTab: "Home",
          tabs: ["Home", "Posts", "Archive"]
        },
        computed: {
          currentTabComponent: function() {
            return "tab-" + this.currentTab.toLowerCase();
          }
        }
      });
    </script>
  </body>
</html>
```

- 一个组件的选项对象

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Dynamic Components Example</title>
    <script src="https://unpkg.com/vue"></script>
    <style>
      .tab-button {
        padding: 6px 10px;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        border: 1px solid #ccc;
        cursor: pointer;
        background: #f0f0f0;
        margin-bottom: -1px;
        margin-right: -1px;
      }
      .tab-button:hover {
        background: #e0e0e0;
      }
      .tab-button.active {
        background: #e0e0e0;
      }
      .tab {
        border: 1px solid #ccc;
        padding: 10px;
      }
    </style>
  </head>
  <body>
    <div id="dynamic-component-demo" class="demo">
      <button
        v-for="tab in tabs"
        v-bind:key="tab.name"
        v-bind:class="['tab-button', { active: currentTab.name === tab.name }]"
        v-on:click="currentTab = tab"
      >
        {{ tab.name }}
      </button>

      <component v-bind:is="currentTab.component" class="tab"></component>
    </div>

    <script>
      var tabs = [
        {
          name: "Home",
          component: {
            template: "<div>Home component</div>"
          }
        },
        {
          name: "Posts",
          component: {
            template: "<div>Posts component</div>"
          }
        },
        {
          name: "Archive",
          component: {
            template: "<div>Archive component</div>"
          }
        }
      ];

      new Vue({
        el: "#dynamic-component-demo",
        data: {
          tabs: tabs,
          currentTab: tabs[0]
        }
      });
    </script>
  </body>
</html>
```

请留意，这个 attribute 可以用于常规 HTML 元素，但这些元素将被视为组件，这意味着所有的 attribute **都会作为 DOM attribute 被绑定**。对于像 `value` 这样的 property，若想让其如预期般工作，你需要使用 [`.prop` 修饰器](https://cn.vuejs.org/v2/api/#v-bind)。

到目前为止，关于动态组件你需要了解的大概就这些了，如果你阅读完本页内容并掌握了它的内容，我们会推荐你再回来把[动态和异步组件](https://cn.vuejs.org/v2/guide/components-dynamic-async.html)读完。

## 解析 DOM 模板时的注意事项

有些 HTML 元素，诸如 `<ul>`、`<ol>`、`<table>` 和 `<select>`，对于哪些元素可以出现在其内部是有严格限制的。而有些元素，诸如 `<li>`、`<tr>` 和 `<option>`，只能出现在其它某些特定的元素内部。

这会导致我们使用这些有约束条件的元素时遇到一些问题。例如：

```html
<table>
  <blog-post-row></blog-post-row>
</table>
```

这个自定义组件 `<blog-post-row>` 会被作为无效的内容提升到外部，并导致最终渲染结果出错。幸好这个特殊的 `is` attribute 给了我们一个变通的办法：

```html
<table>
  <tr is="blog-post-row"></tr>
</table>
```

需要注意的是**如果我们从以下来源使用模板的话，这条限制是\*不存在\*的**：

- 字符串 (例如：`template: '...'`)
- 单文件组件 (`.vue`)
- \<script type="text/x-template">

# 组件注册

## 组件名

在注册一个组件的时候，我们始终需要给它一个名字。比如在全局注册的时候我们已经看到了：

```js
Vue.component('my-component-name', { /* ... */ })
```

该组件名就是 `Vue.component` 的第一个参数。

**[组件名大小写](https://cn.vuejs.org/v2/guide/components-registration.html#组件名大小写)**

定义组件名的方式有两种：

- 使用 kebab-case

```js
Vue.component('my-component-name', { /* ... */ })
```

当使用 kebab-case (短横线分隔命名) 定义一个组件时，你也必须在引用这个自定义元素时使用 kebab-case，例如 `<my-component-name>`。

- 使用 PascalCase

```js
Vue.component('MyComponentName', { /* ... */ })
```

当使用 PascalCase (首字母大写命名) 定义一个组件时，你在引用这个自定义元素时两种命名法都可以使用。也就是说 `<my-component-name>` 和 `<MyComponentName>` 都是可接受的。注意，尽管如此，直接在 DOM (即非字符串的模板) 中使用时只有 kebab-case 是有效的。

## [全局注册](https://cn.vuejs.org/v2/guide/components-registration.html#全局注册)

到目前为止，我们只用过 `Vue.component` 来创建组件：

```js
Vue.component('my-component-name', {
  // ... 选项 ...
})
```

这些组件是**全局注册的**。也就是说它们在**注册之后**可以**用在任何**新创建的 Vue 根实例 (`new Vue`) 的**模板**中。比如：

```js
Vue.component('component-a', { /* ... */ })
Vue.component('component-b', { /* ... */ })
Vue.component('component-c', { /* ... */ })

new Vue({ el: '#app' })
```

```html
<div id="app">
  <component-a></component-a>
  <component-b></component-b>
  <component-c></component-c>
</div>
```

在所有子组件中也是如此，也就是说这三个组件*在各自内部*也都可以相互使用。

## [局部注册](https://cn.vuejs.org/v2/guide/components-registration.html#局部注册)

全局注册往往是不够理想的。比如，如果你使用一个像 webpack 这样的构建系统，全局注册所有的组件意味着即便你已经不再使用一个组件了，它仍然会被包含在你最终的构建结果中。这造成了用户下载的 JavaScript 的无谓的增加。

在这些情况下，你可以通过一个**普通的 JavaScript 对象来定义组件**：

```js
var ComponentA = { /* ... */ }
var ComponentB = { /* ... */ }
var ComponentC = { /* ... */ }
```

然后在 `components` 选项中定义你想要使用的组件：

```js
new Vue({
  el: '#app',
  components: {
    'component-a': ComponentA,
    'component-b': ComponentB
  }
})
```

对于 `components` 对象中的每个 property 来说，其 property 名就是自定义元素的名字，其 property 值就是这个组件的选项对象。

注意**局部注册的组件在其子组件中\*不可用\***。例如，如果你希望 `ComponentA` 在 `ComponentB` 中可用，则你需要这样写：

```js
var ComponentA = { /* ... */ }

var ComponentB = {
  components: {
    'component-a': ComponentA
  },
  // ...
}
```

或者如果你通过 Babel 和 webpack 使用 ES2015 模块，那么代码看起来更像：

```js
import ComponentA from './ComponentA.vue'

export default {
  components: {
    ComponentA
  },
  // ...
}
```

注意在 ES2015+ 中，在对象中放一个类似 `ComponentA` 的变量名其实是 `ComponentA: ComponentA` 的缩写，即这个变量名同时是：

- 用在模板中的自定义元素的名称
- 包含了这个组件选项的变量名

## [模块系统](https://cn.vuejs.org/v2/guide/components-registration.html#模块系统)

如果你没有通过 `import`/`require` 使用一个模块系统，也许可以暂且跳过这个章节。如果你使用了，那么我们会为你提供一些特殊的使用说明和注意事项。

### [在模块系统中局部注册](https://cn.vuejs.org/v2/guide/components-registration.html#在模块系统中局部注册)

如果你还在阅读，说明你使用了诸如 Babel 和 webpack 的模块系统。在这些情况下，我们推荐创建一个 `components` 目录，并将每个组件放置在其各自的文件中。

然后你需要在局部注册之前导入每个你想使用的组件。例如，在一个假设的 `ComponentB.js` 或 `ComponentB.vue` 文件中：

```js
import ComponentA from './ComponentA'
import ComponentC from './ComponentC'

export default {
  components: {
    ComponentA,
    ComponentC
  },
  // ...
}
```

现在 `ComponentA` 和 `ComponentC` 都可以在 `ComponentB` 的模板中使用了。

### [基础组件的自动化全局注册](https://cn.vuejs.org/v2/guide/components-registration.html#基础组件的自动化全局注册)

可能你的许多组件只是包裹了一个输入框或按钮之类的元素，是相对通用的。我们有时候会把它们称为[基础组件](https://cn.vuejs.org/v2/style-guide/#基础组件名-强烈推荐)，它们会在各个组件中被频繁的用到。

所以会导致很多组件里都会有一个包含基础组件的长列表：

```js
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'
import BaseInput from './BaseInput.vue'

export default {
  components: {
    BaseButton,
    BaseIcon,
    BaseInput
  }
}
```

而只是用于模板中的一小部分：

```html
<BaseInput
  v-model="searchText"
  @keydown.enter="search"
/>
<BaseButton @click="search">
  <BaseIcon name="search"/>
</BaseButton>
```

如果你恰好使用了 webpack (或在内部使用了 webpack 的 [Vue CLI 3+](https://github.com/vuejs/vue-cli))，那么就可以使用 `require.context` 只全局注册这些非常通用的基础组件。这里有一份可以让你在应用入口文件 (比如 `src/main.js`) 中全局导入基础组件的示例代码：

```js
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  // 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})
```

记住**全局注册的行为必须在根 Vue 实例 (通过 `new Vue`) 创建之前发生**。[这里](https://github.com/chrisvfritz/vue-enterprise-boilerplate/blob/master/src/components/_globals.js)有一个真实项目情景下的示例。

# \<router-link>

  `<router-link>` 组件支持用户在具有路由功能的应用中 (点击) 导航。 通过 to 属性指定目标地址，默认渲染成带有正确链接的` <a>` 标签，可以通过配置 tag 属性生成别的标签.。另外，当目标路由成功激活时，链接元素自动设置一个表示激活的 CSS 类名。

`<router-link>` 比起写死的` <a href="..."> `会好一些，理由如下：

1) 无论是 HTML5 history 模式还是 hash 模式，它的表现行为一致，所以，当你要切换路由模式，或者在 IE9 降级使用 hash 模式，无须作任何变动。

2) 在 HTML5 history 模式下，router-link 会守卫点击事件，让浏览器不再重新加载页面。

3) 当你在 HTML5 history 模式下使用 base 选项之后，所有的 to 属性都不需要写 (基路径) 了。

### 属性

#### to

类型: string | Location

required

表示目标路由的链接。当被点击后，内部会立刻把 to 的值传到 router.push()，所以这个值可以是一个字符串或者是描述目标位置的对象。

eg:

```html
<!-- 字符串 -->
<router-link to="home">Home</router-link>

<!-- 使用 v-bind 的 JS 表达式 -->
<router-link v-bind:to="'home'">Home</router-link>

<!-- 不写 v-bind 也可以，就像绑定别的属性一样 -->
<router-link :to="'home'">Home</router-link>

<!-- 同上 -->
<router-link :to="{ path: 'home' }">Home</router-link>

<!-- 命名的路由 -->
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>

<!-- 带查询参数，下面的结果为 /register?plan=private -->
<router-link :to="{ path: 'register', query: { plan: 'private' }}">Register</router-link>

```

#### replace

类型: boolean

默认值: false

设置 replace 属性的话，当点击时，会调用 router.replace() 而不是 router.push()，于是导航后不会留下 history 记录。

eg:

```html
<router-link :to="{ path: '/abc'}" replace></router-link>
```

#### append

类型: boolean

默认值: false

设置 append 属性后，则在当前 (相对) 路径前添加基路径。例如，我们从 /a 导航到一个相对路径 b，如果没有配置 append，则路径为 /b，如果配了，则为 /a/b

eg:

```html
<router-link :to="{ path: 'relative/path'}" append></router-link>
```

#### tag

类型: string

默认值: "a"

有时候想要 <router-link> 渲染成某种标签，例如 <li>。 于是我们使用 tag prop 类指定何种标签，同样它还是会监听点击，触发导航。

eg:

```html
<router-link to="/foo" tag="li">foo</router-link>
<!-- 渲染结果 -->
<li>foo</li>
```

#### exact

类型: boolean

默认值: false

"是否激活" 默认类名的依据是 inclusive match (全包含匹配)。 举个例子，如果当前的路径是 /a 开头的，那么 <router-link to="/a"> 也会被设置 CSS 类名。

eg:

按照这个规则，每个路由都会激活<router-link to="/">！想要链接使用 "exact 匹配模式"，则使用 exact 属性：

```html
<!-- 这个链接只会在地址为 / 的时候被激活 -->
<router-link to="/" exact>
```

# \<router-view>

 \<router-view> 组件是一个 functional 组件，渲染路径匹配到的视图组件。\<router-view> 渲染的组件还可以内嵌自己的\<router-view>，根据嵌套路径，渲染嵌套组件。

其他属性 (非 router-view 使用的属性) 都直接传给渲染的组件， 很多时候，每个路由的数据都是包含在路由参数中。

因为它也是个组件，所以可以配合\<transition> 和\<keep-alive> 使用。如果两个结合一起用，要确保在内层使用\<keep-alive>：

```html
<transition>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</transition>
```

### 属性

#### name

类型: string

默认值: "default"

如果 `<router-view>`设置了名称，则会渲染对应的路由配置中 components 下的相应组件。查看 命名视图 中的例子。

# [Vue单页面应用，以及两种路由模式优缺点](https://www.cnblogs.com/hudeam/p/13058151.html)

优点: 良好的交互体验,用户不需要刷新页面,页面显示流畅, 良好的前后端工作分离模式,减轻服务器压力,

缺点: 不利于SEO,初次加载耗时比较多

## hash模式

vue-router默认的是hash模式，使用URL的hash来模拟一个完整的URL,于是当URL改变的时候,页面不会重新加载,也就是单页应用了,当#后面的hash发生变化,不会导致浏览器向服务器发出请求,浏览器不发出请求就不会刷新页面,并且会触发hasChange这个事件,通过监听hash值的变化来实现更新页面部分内容的操作

对于hash模式会创建hashHistory对象,在访问不同的路由的时候,会发生两件事:
HashHistory.push()将新的路由添加到浏览器访问的历史的栈顶,和HasHistory.replace()替换到当前栈顶的路由

## history模式

主要使用HTML5的pushState()和replaceState()这两个api来实现的,pushState()可以改变url地址且不会发送请求,replaceState()可以读取历史记录栈,还可以对浏览器记录进行修改

window.history.pushState(stateObject, title, URL)
window.history.replaceState(stateObject, title, URL)

区别：

前面的hashchange，你只能改变#后面的url片段。而pushState设置的新URL可以是与当前URL同源的任意URL。
history模式则会将URL修改得就和正常请求后端的URL一样,如后端没有配置对应/user/id的路由处理，则会返回404错误，需要后端在服务端设置，如果 URL 匹配不到任何静态资源，则返回同一个 `index.html` 页面，这个页面就是你 app 依赖的页面。找不到静态资源的情况，重定向到依赖也买年

# vuex

在`vuex`里面，`state`里面是存放数据的（类似于`vue`里面的`data`），`mutations`里面存放的是各种函数方法，用来改变`state`里面的数据的方法。

## state

`state`里面的数据在使用的时候，一般是挂在`computed`里面的，因为如果你挂在`data`上面，只会赋值一次，不会跟着`vuex`里面的变化而同步变化，当然也可以通过`watch $store`去解决这个问题，如下：

```js
computed: {
    hasBg(){
        return this.$store.state.hasBg
    }
}
```

```js
watch : {
    '$store.state.hasBg' : {
        handler(newVal,oldVal){
            console.log(newVal)
        }
    }
}
```

接着再说mapState

## mapState

`mapState`，作用就是可以在`computed`里面少写一些代码，使用如下:

```js
import { mapState } from 'vuex'
......
computed : mapState({
    //vuex里的数据，两种写法：
    leftFocus : 'leftFocus',
    hasBg : (state) => state.hasBg,
    ......
})
```

`...mapState`，这个就是`...`的用法，使用之后变得更加方便：

```js
import { mapState } from 'vuex'
......
computed : {
    ...mapState({
        leftFocus:'leftFocus',
        loadingNum:'loadingNum',
        hasBg:'hasBg'
    }),
    ......
}
```

`mapState`里面或者直接写成：

```js
import { mapState } from 'vuex'
......
computed : {
    ...mapState([
        'leftFocus',
        'loadingNum',
        'hasBg'
    ]),
    ......
}

```

## mutation

```js
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
```

```js
// 组件,根组件里已注册store
this.$store.commit('increment')
```

**Mutation 必须是同步函数**

## mapMutation

`mapMutations` 和 `mapState` 用法一样，`mapMutations`是用来存放`vuex`里面的`mutations`函数的，如下：

```js
import {mapMutations} from 'vuex'
......
methods : {
    ...mapMutations([
        'updateBg'
    ]),
}
```

使用 `mapMutations` 辅助函数将组件中的 `methods` 映射为 `store.commit` 调用（需要在根节点注入 `store`）。

```js
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```

# vue-i18n

仓库地址：https://github.com/kazupon/vue-i18n

兼容性：
支持 Vue.js 2.x 以上版本

安装方法：（此处只演示 npm）
npm install vue-i18n

-----------------------------------------------------------------

使用方法：
1、在 main.js 中引入 vue-i18n （前提是要先引入 vue）

```js
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
```

2、准备本地的翻译信息

```js
const messages = {
  zh: {
    message: {
      hello: '好好学习，天天向上！'
    }
  },
  en: {
    message: {
      hello: 'good good study, day day up!'
    }
  }
}
```

3、创建带有选项的 VueI18n 实例

```js
const i18n = new VueI18n({
    locale: 'en', // 语言标识
    messages
})
```

4、把 i18n 挂载到 vue 根实例上

```js
const app = new Vue({
    router,
    i18n,
    ...App
}).$mount('#app')
```

5、在 HTML 模板中使用

```html
<div id="app">
  <h1 style="font-size: 16px; text-align: center;">{{ $t("message.hello") }}</h1>
</div>
```

我们刚才定的语言标识是 “en” 英语，现在改成 “zh” 中文:

```js
const i18n = new VueI18n({
    locale: 'zh', // 语言标识
    messages
})
```

这样就可以轻松实现国际化了，实际开发中，页面内容肯定是很多的，我们可以把对应语言的信息保存为不同的 json对象

```js
const i18n = new VueI18n({
    locale: 'en',  // 语言标识
    messages: {
        'zh': require('./common/lang/zh'),
        'en': require('./common/lang/en')
    }
})
```

```js
// zh.js
// 注意：一定是 exports，不是 export，否则会报错，报错信息是下列的中的内容不是 string
module.exports = {
  message: {
    title: '运动品牌'
  },
  placeholder: {
      enter: '请输入您喜欢的品牌'
  },
  brands: {
    nike: '耐克',
    adi: '阿迪达斯',
    nb: '新百伦',
    ln: '李宁'
  }
}

// en.js
module.exports = {
  message: {
    title: 'Sport Brands'
  },
  placeholder: {
    enter: 'Please type in your favorite brand'
  },
  brands: {
    nike: 'Nike',
    adi: 'Adidas',
    nb: 'New Banlance',
    ln: 'LI Ning'
  }
}
```

接下来，在HTML 模板中使用，要特别注意在 js 中的国际化写法
// HTML

```html
<div id="app">
  <div style="margin: 20px;">
    <h1>{{$t("message.title")}}</h1>
    <input style="width: 300px;" class="form-control" :placeholder="$t('placeholder.enter')">
    <ul>
      <li v-for="brand in brands">{{brand}}</li>
    </ul>
  </div>
</div>
```

// JS

```js
data () {
  return {
    brands: [
        this.$t('brands.nike'), 
        this.$t('brands.adi'), 
        this.$t('brands.nb'), 
        this.$t('brands.ln')
    ]
  }
}
```

-----------------------------------------------------------------

在上面的操作中，我们都是通过手动修改 locale 的属性值来切换语言，实际上，更希望浏览器自动识别，这里可以借助于 cookie
1、新建一个 cookie.js 文件，用于读取cookie

```js
function getCookie(name,defaultValue) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return defaultValue;
}
export {
  getCookie
}
```

2、在 main.js 中引入这个js，并通过 PLAY_LANG 属性来获取浏览器的语言

```js
const i18n = new VueI18n({
  locale: getCookie('PLAY_LANG','zh'),// 语言标识
  messages: {
    'zh': require('./common/lang/zh'),
    'en': require('./common/lang/en')
  }
})
```

这里需要注意两个极易出错的地方：
（1）将 $t() 写成了 $()
（2）json 中在同一个对象里有同名属性

vue-i18n 提供了一个全局配置参数叫 “locale”，通过改变 locale 的值可以实现不同语种的切换
下面的案例借用了 Element UI 的弹窗样式，上面的步骤不再赘述，直接上核心代码
// template

```html
<h2>{{$t('test')}}</h2>
<button type="button" class="btn btn-success" @click="changeLocale">中文/EN</button>
```

// js方法

```js
changeLocale () {
  this.$confirm(this.$t('layer.toggle'), this.$t('layer.tips'), {
    confirmButtonText: this.$t('button.ok'),
    cancelButtonText: this.$t('button.cancel'),
    type: 'warning'
  }).then(() => {
     let locale = this.$i18n.locale
     locale === 'zh' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'zh'
  }).catch(() => {
    this.$message({
      type: 'info',
    })
  })
}
```

在配合 Element-UI 一起使用时，会有2个问题：
（1）页面刷新后，通过按钮切换的语言还原成了最初的语言，无法保存
（2）框架内部自带的提示文字无法更改，比如像时间选择框内部中的提示文字
关于第一个问题，可以在初始化VueI18n实例时，通过 localStorage 来为 locale 对象赋值

```js
const i18n = new VueI18n({
  locale: localStorage.getItem('locale') || 'zh',
  messages 
})
```

在切换语言的时候可以缓存不同的语言选项，并且可以长期保存，不会因为刷新网页而改变locale 的属性值

<div class="lang">
  <el-dropdown>
    <i class="iconfont icon-language4"></i>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="toggleLang('zh')" :disabled="$i18n.locale == 'zh'">中文</el-dropdown-item>
      <el-dropdown-item @click.native="toggleLang('en')" :disabled="$i18n.locale == 'en'">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</div>

```js
toggleLang(lang) {
  if(lang == 'zh'){
    localStorage.setItem('locale', 'zh')
    this.$i18n.locale = localStorage.getItem('locale')
    this.$message({
      message: '切换为中文！',
      type: 'success'
    })
  } else if (lang == 'en') {
    localStorage.setItem('locale', 'en')
    this.$i18n.locale = localStorage.getItem('locale')
    this.$message({
      message: 'Switch to English!',
      type: 'success'
   })
  }
}
```

关于第二个问题，更改Element 组件内部语言，这里还涉及到 手动处理 vue-i18n@6.x 兼容性问题。官网已经做了详细介绍，这里依葫芦画瓢跟着实现一下

```js
// i18n.js
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import locale from 'element-ui/lib/locale';
import zh from './langs/zh'
import en from './langs/en'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
Vue.use(VueI18n)
const messages = {
  en: Object.assign(en, enLocale),
  zh: Object.assign(zh, zhLocale)
}
console.log(messages.zh)
const i18n = new VueI18n({
  locale: localStorage.getItem('locale') || 'zh',
  messages 
})
locale.i18n((key, value) => i18n.t(key, value)) //为了实现element插件的多语言切换
export default i18n
```

照如上把国际化文件都整合到一起，避免main.js 中大段引入相关代码。main.js 中与 i18n 相关的就只剩两行代码

```js
import i18n from './i18n/i18n'// 1行
window.app = new Vue({
  el: '#app',
  router,
  store,
  i18n, // 2行
  components: { App },
  template: '<App/>'
})
```

# 非父子Bus通信

vue 2 使用Bus.js进行兄弟(非父子)组件通信 简单案例
vue2中废弃了`$dispatch`和`$broadcast`分发和广播事件的方法。父子组件中可以用`props`和`$emit()`进行通信。如何实现非父子组件间的通信，可以通过实例一个vue实例Bus作为媒介，要相互通信的兄弟组件之中，都引入Bus，之后通过分别调用Bus事件触发和监听来实现组件之间的通信和参数传递。


首先需要在任意地方添加一个bus.js

在bus.js里面 写入下面信息

```js
import Vue from 'vue'
export default new Vue();
```

在需要通信的组件里都引入Bus.js
如果你的bus.js是自定义一个bus的文件，那from后面就改成你的所放的位置

```js
import Bus from './bus.js'
```

接下来就是要组件通信了
添加一个 触发 `#emit`的事件按钮

```vue
<template>
  <div id="emit"><button @click="bus">按钮</button></div>
</template>
<script>
import Bus from './bus.js' 
export default { 
  data() {
    return {
      message: ''"
    }
  },
  methods: {
   bus() {
      Bus.$emit('msg', '我要传给兄弟组件们，你收到没有')
   }
}}
</script>
```

打开要和`$emit`通信的另外一个组件
在钩子函数中监听`msg`事件

```vue
<template>
  <div id="on">
    <p>{{message}}</p>
  </div>
</template>
<script>
import Bus from './bus.js'
export default {
  data() {
    return {
      message:  ''
    }
  },
  mounted() {
    let self = this
    Bus.$on('msg', (e) => {
      self.message = e;
      console.log(`传来的数据是：${e}`)
    })
  }
}
</script>
```

最后 `<p>` 会显示来自 `$emit`传来的信息

# vue中v-model使用计算属性，双向绑定失效

在vue中v-model绑定了一个值到val中，用到了计算属性监测val的变化，但是使用了computed之后，v-model的双向绑定失效

```html
<div class="flex f7" style="width: 0" v-if="isIos || isAndroid">
    <input
    	class="f7"
        type="text"
        v-model="getAddress"
        :placeholder="$t('withdraw.adsToast')"/>
    <div class="f1 img-cont" @click="scan()">
     	<img src="../../assets/img/ic-withdrawAds.png" class="ic-ads"/>
    </div>
</div> 
```

<div class = "flex f7" style = "width: 0" v-if="isIos || isAndroid">
    <input class = "f7" type = "text" v-model = "getAddress" :placeholder = "$t('withdraw.adsToast')"/>
    <div class = "f1 img-cont" @click = "scan()">
     <img src = "../../assets/img/ic-withdrawAds.png"
             class = "ic-ads"/>
    </div></div> 


```js
computed: {
    getAddress: {
        get: function () {
            if(this.$store.state.updateAddress){
            	this.address = this.$store.state.updateAddress
            }
            return this.address
        }
    }
}
```

输入地址之后再输入下面其他input值，地址值变为空，打印this.address为空

后来在计算属性中加入get和set解决了双向绑定问题

```js
computed: {
    getAddress: {
        get: function () {
            if(this.$store.state.updateAddress){
            	this.address = this.$store.state.updateAddress
            }
            return this.address
        },
        set: function (value) {
            this.address = value
        }
    }
}
```

### v-model基础用法

(详见[https://cn.vuejs.org/v2/guide/forms.html#%E5%9F%BA%E7%A1%80%E7%94%A8%E6%B3%95](https://cn.vuejs.org/v2/guide/forms.html#基础用法))

你可以用 v-model 指令在表单` <input>`、`<textarea>` 及 `<select>` 元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。尽管有些神奇，但 `v-model` 本质上不过是语法糖。它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理。

`v-model` 会忽略所有表单元素的 `value`、`checked`、`selected` 特性的初始值而总是将 Vue 实例的数据作为数据来源。你应该通过 JavaScript 在组件的 data 选项中声明初始值。

`v-model` 在内部为不同的输入元素使用不同的属性并抛出不同的事件：

- `text` 和 `textarea` 元素使用 `value` 属性和 `input` 事件；

- `checkbox` 和 `radio` 使用 `checked` 属性和 `change` 事件；

- `select` 字段将 `value` 作为 `prop` 并将 `change` 作为事件。

对于需要使用输入法 (如中文、日文、韩文等) 的语言，你会发现 `v-model` 不会在输入法组合文字过程中得到更新。如果你也想处理这个过程，请使用 `input` 事件。

在文本区域插值 (`<textarea>{{text}}</textarea>`) 并不会生效，应用 `v-model `来代替。

# 注意点

1、`computed`里配的属性，如果依赖了其他属性，给该属性赋值时，注意添加`setter`方法；
2、`this.$nextTrick(function(){});` Vue实例里属性都响应over后，会触发其中的回调函数；
