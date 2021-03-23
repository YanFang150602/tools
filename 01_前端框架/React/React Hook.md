https://react.docschina.org/docs/hooks-intro.html

# Hook 简介

*Hook* 是 React 16.8 的新增特性。它可以让你**在不编写 class(函数式组件) 的情况下使用 state** 以及其他的 React 特性。

```jsx
import React, { useState } from 'react';

function Example() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
```

`useState` 是我们要学习的第一个 “Hook”，这个例子是简单演示。如果不理解也不用担心。

**你将在[下一章节](https://react.docschina.org/docs/hooks-overview.html)正式开始学习 Hook。** 这一章节，我们将会解释为什么会在 React 中加入 Hook，以及如何使用 Hook 写出更好的应用。

> 注意
>
> React 16.8.0 是第一个支持 Hook 的版本。升级时，请注意更新所有的 package，包括 React DOM。 React Native 从 [0.59 版本](https://reactnative.dev/blog/2019/03/12/releasing-react-native-059)开始支持 Hook。

## 没有破坏性改动

在我们继续之前，请记住 Hook 是：

- **完全可选的。** 你无需重写任何已有代码就可以在一些组件中尝试 Hook。但是如果你不想，你不必现在就去学习或使用 Hook。
- **100% 向后兼容的。** Hook 不包含任何破坏性改动。
- **现在可用。** Hook 已发布于 v16.8.0。

**没有计划从 React 中移除 class。** 你可以在本页[底部的章节](https://react.docschina.org/docs/hooks-intro.html#gradual-adoption-strategy)读到更多关于 Hook 的渐进策略。

**Hook 不会影响你对 React 概念的理解。** 恰恰相反，**Hook 为已知的 React 概念提供了更直接的 API**：props， state，context，refs 以及生命周期。稍后我们将看到，Hook 还提供了一种更强大的方式来组合他们。

**如果不想了解添加 Hook 的具体原因，可以直接[跳到下一章节开始学习 Hook！](https://react.docschina.org/docs/hooks-overview.html)** 当然你也可以继续阅读这一章节来了解原因，并且可以学习到如何在不重写应用的情况下使用 Hook。

## 动机

Hook 解决了我们五年来编写和维护成千上万的组件时遇到的各种各样看起来不相关的问题。无论你正在学习 React，或每天使用，或者更愿尝试另一个和 React 有相似组件模型的框架，你都可能对这些问题似曾相识。

### 在组件之间复用状态逻辑很难

React 没有提供将可复用性行为“附加”到组件的途径（例如，把组件连接到 store）。如果你使用过 React 一段时间，你也许会熟悉一些解决此类问题的方案，比如 [render props](https://react.docschina.org/docs/render-props.html) 和 [高阶组件](https://react.docschina.org/docs/higher-order-components.html)。但是这类方案需要重新组织你的组件结构，这可能会很麻烦，使你的代码难以理解。如果你在 React DevTools 中观察过 React 应用，你会发现由 providers，consumers，高阶组件，render props 等其他抽象层组成的组件会形成“嵌套地狱”。尽管我们可以[在 DevTools 过滤掉它们](https://github.com/facebook/react-devtools/pull/503)，但这说明了一个更深层次的问题：React 需要为共享状态逻辑提供更好的原生途径。

你可以使用 Hook 从组件中提取状态逻辑，使得这些逻辑可以单独测试并复用。**Hook 使你在无需修改组件结构的情况下复用状态逻辑。** 这使得在组件间或社区内共享 Hook 变得更便捷。

具体将在[自定义 Hook](https://react.docschina.org/docs/hooks-custom.html) 中对此展开更多讨论。

### 复杂组件变得难以理解

我们经常维护一些组件，组件起初很简单，但是逐渐会被状态逻辑和副作用充斥。每个生命周期常常包含一些不相关的逻辑。例如，组件常常在 `componentDidMount` 和 `componentDidUpdate` 中获取数据。但是，同一个 `componentDidMount` 中可能也包含很多其它的逻辑，如设置事件监听，而之后需在 `componentWillUnmount` 中清除。相互关联且需要对照修改的代码被进行了拆分，而完全不相关的代码却在同一个方法中组合在一起。如此很容易产生 bug，并且导致逻辑不一致。

在多数情况下，不可能将组件拆分为更小的粒度，因为状态逻辑无处不在。这也给测试带来了一定挑战。同时，这也是很多人将 React 与状态管理库结合使用的原因之一。但是，这往往会引入了很多抽象概念，需要你在不同的文件之间来回切换，使得复用变得更加困难。

为了解决这个问题，**Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据）**，而并非强制按照生命周期划分。你还可以使用 reducer 来管理组件的内部状态，使其更加可预测。

我们将在[使用 Effect Hook](https://react.docschina.org/docs/hooks-effect.html#tip-use-multiple-effects-to-separate-concerns) 中对此展开更多讨论。

### 难以理解的 class

除了代码复用和代码管理会遇到困难外，我们还发现 class 是学习 React 的一大屏障。你必须去理解 JavaScript 中 `this` 的工作方式，这与其他语言存在巨大差异。还不能忘记绑定事件处理器。没有稳定的[语法提案](https://babeljs.io/docs/en/babel-plugin-transform-class-properties/)，这些代码非常冗余。大家可以很好地理解 props，state 和自顶向下的数据流，但对 class 却一筹莫展。即便在有经验的 React 开发者之间，**对于函数组件与 class 组件的差异也存在分歧，甚至还要区分两种组件的使用场景**。

另外，React 已经发布五年了，我们希望它能在下一个五年也与时俱进。就像 [Svelte](https://svelte.dev/)，[Angular](https://angular.io/)，[Glimmer](https://glimmerjs.com/)等其它的库展示的那样，组件[预编译](https://en.wikipedia.org/wiki/Ahead-of-time_compilation)会带来巨大的潜力。尤其是在它不局限于模板的时候。最近，我们一直在使用 [Prepack](https://prepack.io/) 来试验 [component folding](https://github.com/facebook/react/issues/7323)，也取得了初步成效。但是我们发现使用 class 组件会无意中鼓励开发者使用一些让优化措施无效的方案。class 也给目前的工具带来了一些问题。例如，class 不能很好的压缩，并且会使热重载出现不稳定的情况。因此，我们想提供一个使代码更易于优化的 API。

为了解决这些问题，**Hook 使你在非 class 的情况下可以使用更多的 React 特性。** 从概念上讲，React 组件一直更像是函数。而 Hook 则拥抱了函数，同时也没有牺牲 React 的精神原则。Hook 提供了问题的解决方案，无需学习复杂的函数式或响应式编程技术。

## 渐进策略

> **总结：没有计划从 React 中移除 class。**

大部分 React 开发者会专注于开发产品，而没时间关注每一个新 API 的发布。Hook 还很新，也许等到有更多示例和教程后，再考虑学习或使用它们也不迟。

我们也明白向 React 添加新的原生概念的门槛非常高。我们为好奇的读者准备了[详细的征求意见文档](https://github.com/reactjs/rfcs/pull/68)，在文档中用更多细节深入讨论了我们推进这件事的动机，也在具体设计决策和相关先进技术上提供了额外的视角。

**最重要的是，Hook 和现有代码可以同时工作，你可以渐进式地使用他们。** 不用急着迁移到 Hook。我们建议避免任何“大规模重写”，尤其是对于现有的、复杂的 class 组件。开始“用 Hook 的方式思考”前，需要做一些思维上的转变。按照我们的经验，最好先在新的不复杂的组件中尝试使用 Hook，并确保团队中的每一位成员都能适应。在你尝试使用 Hook 后，欢迎给我们提供[反馈](https://github.com/facebook/react/issues/new)，无论好坏。

我们准备让 Hook 覆盖所有 class 组件的使用场景，但是**我们将继续为 class 组件提供支持。**在 Facebook，我们有成千上万的组件用 class 书写，我们完全没有重写它们的计划。相反，我们开始在新的代码中同时使用 Hook 和 class。

# Hook 概览

##  State Hook

这个例子用来显示一个计数器。当你点击按钮，计数器的值就会增加：

```jsx
import React, { useState } from 'react';

function Example() {
  // 声明一个叫 “count” 的 state 变量。
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

在这里，`useState` 就是一个 *Hook* 。通过在函数组件里调用它来给组件添加一些内部 state。React 会在重复渲染时保留这个 state。**`useState`** **会返回一对值**：**<u>当前状态和一个让你更新它的函数</u>**，你可以在事件处理函数中或其他一些地方调用这个函数。它类似 class 组件的 `this.setState`，但是它不会把新的 state 和旧的 state 进行合并。（我们会在[使用 State Hook](https://react.docschina.org/docs/hooks-state.html) 里展示一个对比 `useState` 和 `this.state` 的例子）。

`useState` 唯一的参数就是初始 state。在上面的例子中，我们的计数器是从零开始的，所以初始 state 就是 `0`。值得注意的是，不同于 `this.state`，这里的 state 不一定要是一个对象 —— 如果你有需要，它也可以是。这个初始 state 参数只有在第一次渲染时会被用到。

#### 声明多个 state 变量

你可以在一个组件中多次使用 State Hook:

```jsx
function ExampleWithManyStates() {
  // 声明多个 state 变量！
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  // ...
}
```

[数组解构](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring)的语法让我们在调用 `useState` 时可以给 state 变量取不同的名字。当然，这些名字并不是 `useState` API 的一部分。React 假设当你多次调用 `useState` 的时候，你能保证每次渲染时它们的调用顺序是不变的。后面我们会再次解释它是如何工作的以及在什么场景下使用。

#### 那么，什么是 Hook?

Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。Hook 不能在 class 组件中使用 —— 这使得你不使用 class 也能使用 React。（我们[不推荐](https://react.docschina.org/docs/hooks-intro.html#gradual-adoption-strategy)把你已有的组件全部重写，但是你可以在新组件里开始使用 Hook。）

React 内置了一些像 `useState` 这样的 Hook。你也可以创建你自己的 Hook 来复用不同组件之间的状态逻辑。我们会先介绍这些内置的 Hook。

## Effect Hook

你之前可能已经在 React 组件中执行过数据获取、订阅或者手动修改过 DOM。我们统一把这些操作称为“副作用”，或者简称为“作用”。

`useEffect` 就是一个 Effect Hook，给函数组件增加了操作副作用的能力。它跟 class 组件中的 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 具有相同的用途，只不过被合并成了一个 API。（我们会在[使用 Effect Hook](https://react.docschina.org/docs/hooks-effect.html) 里展示对比 `useEffect` 和这些方法的例子。）

例如，下面这个组件在 React 更新 DOM 后会设置一个页面标题：

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

当你调用 `useEffect` 时，就是在告诉 React 在完成对 DOM 的更改后运行你的“副作用”函数。由于副作用函数是在组件内声明的，所以它们可以访问到组件的 props 和 state。默认情况下，React 会在每次渲染后调用副作用函数 —— **包括**第一次渲染的时候。（我们会在[使用 Effect Hook](https://react.docschina.org/docs/hooks-effect.html) 中跟 class 组件的生命周期方法做更详细的对比。）

副作用函数还可以通过返回一个函数来指定如何“清除”副作用。例如，在下面的组件中使用副作用函数来订阅好友的在线状态，并通过取消订阅来进行清除操作：

```jsx
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

在这个示例中，React 会在组件销毁时取消对 `ChatAPI` 的订阅，然后在后续渲染时重新执行副作用函数。（如果传给 `ChatAPI` 的 `props.friend.id` 没有变化，你也可以[告诉 React 跳过重新订阅](https://react.docschina.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects)。）

跟 `useState` 一样，你可以在组件中多次使用 `useEffect` ：

```jsx
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }
  // ...
```

通过使用 Hook，你可以把组件内相关的副作用组织在一起（例如创建订阅及取消订阅），而不要把它们拆分到不同的生命周期函数里。

## Hook 使用规则

Hook 就是 JavaScript 函数，但是使用它们会有两个额外的规则：

- 只能在**函数最外层**调用 Hook。不要在循环、条件判断或者子函数中调用。
- 只能在 **React 的函数组件**中调用 Hook。不要在其他 JavaScript 函数中调用。（还有一个地方可以调用 Hook —— 就是自定义的 Hook 中，我们稍后会学习到。）

同时，我们提供了 [linter 插件](https://www.npmjs.com/package/eslint-plugin-react-hooks)来自动执行这些规则。这些规则乍看起来会有一些限制和令人困惑，但是要让 Hook 正常工作，它们至关重要。

## 自定义 Hook

有时候我们会想要在组件之间重用一些状态逻辑。目前为止，有两种主流方案来解决这个问题：[高阶组件](https://react.docschina.org/docs/higher-order-components.html)和 [render props](https://react.docschina.org/docs/render-props.html)。自定义 Hook 可以让你在不增加组件的情况下达到同样的目的。

前面，我们介绍了一个叫 `FriendStatus` 的组件，它通过调用 `useState` 和 `useEffect` 的 Hook 来订阅一个好友的在线状态。假设我们想在另一个组件里重用这个订阅逻辑。

首先，我们把这个逻辑抽取到一个叫做 `useFriendStatus` 的自定义 Hook 里：

```jsx
import React, { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

它将 `friendID` 作为参数，并返回该好友是否在线：

现在我们可以在两个组件中使用它：

```jsx
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

```jsx
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

这两个组件的 state 是完全独立的。Hook 是一种复用*状态逻辑*的方式，它不复用 state 本身。事实上 Hook 的每次*调用*都有一个完全独立的 state —— 因此你可以在单个组件中多次调用同一个自定义 Hook。

自定义 Hook 更像是一种约定而不是功能。如果函数的名字以 “`use`” 开头并调用其他 Hook，我们就说这是一个自定义 Hook。 `useSomething` 的命名约定可以让我们的 linter 插件在使用 Hook 的代码中找到 bug。

你可以创建涵盖各种场景的自定义 Hook，如表单处理、动画、订阅声明、计时器，甚至可能还有更多我们没想到的场景。我们很期待看到 React 社区会出现什么样的自定义 Hook。

## 其他 Hook

除此之外，还有一些使用频率较低的但是很有用的 Hook。比如，[`useContext`](https://react.docschina.org/docs/hooks-reference.html#usecontext) 让你不使用组件嵌套就可以订阅 React 的 Context。

```jsx
function Example() {
  const locale = useContext(LocaleContext);
  const theme = useContext(ThemeContext);
  // ...
}
```

另外 [`useReducer`](https://react.docschina.org/docs/hooks-reference.html#usereducer) 可以让你通过 reducer 来管理组件本地的复杂 state。

```jsx
function Todos() {
  const [todos, dispatch] = useReducer(todosReducer);
  // ...
```

# 使用 State Hook

[Hook 简介章节](https://react.docschina.org/docs/hooks-intro.html)中使用下面的例子介绍了 Hook：

```jsx
import React, { useState } from 'react';

function Example() {
  // 声明一个叫 "count" 的 state 变量
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

我们将通过将这段代码与一个等价的 class 示例进行比较来开始学习 Hook。

## 等价的 class 示例

如果你之前在 React 中使用过 class，这段代码看起来应该很熟悉：

```jsx
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

state 初始值为 `{ count: 0 }` ，当用户点击按钮后，我们通过调用 `this.setState()` 来增加 `state.count`。整个章节中都将使用该 class 的代码片段做示例。

## Hook 和函数组件

复习一下， React 的函数组件是这样的：

```jsx
const Example = (props) => {
  // 你可以在这使用 Hook
  return <div />;
}
```

或是这样：

```jsx
function Example(props) {
  // 你可以在这使用 Hook
  return <div />;
}
```

你之前可能把它们叫做“无状态组件”。但现在我们为它们引入了使用 React state 的能力，所以我们更喜欢叫它”函数组件”。

Hook 在 class 内部是**不**起作用的。但你可以使用它们来取代 class 。

## Hook 是什么？

在新示例中，首先引入 React 中 `useState` 的 Hook

```js
import React, { useState } from 'react';

function Example() {
  // ...
}
```

**Hook 是什么？** <u>Hook 是一个特殊的函数</u>，它可以让你“钩入” React 的特性。例如，**`useState`** 是允许你在 React 函数组件中**添加 state** 的 Hook。

**什么时候我会用 Hook？** 如果你在编写函数组件并意识到需要向其添加一些 state，以前的做法是必须将其它转化为 class。现在你可以在现有的函数组件中使用 Hook。

> 注意：
>
> 在组件中有些特殊的规则，规定什么地方能使用 Hook，什么地方不能使用。

## 声明 State 变量

在 class 中，我们通过在构造函数中设置 `this.state` 为 `{ count: 0 }` 来初始化 `count` state 为 `0`：

```jsx
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
```

在函数组件中，我们没有 `this`，所以我们不能分配或读取 `this.state`。我们直接在组件中调用 `useState` Hook：

```jsx
import React, { useState } from 'react';

function Example() {
  // 声明一个叫 “count” 的 state 变量
  const [count, setCount] = useState(0);
  // ...   
}
```

**`调用 useState` 方法的时候做了什么?** 它定义一个 “state 变量”。我们的变量叫 `count`， 但是我们可以叫他任何名字，比如 `banana`。这是一种在函数调用时保存变量的方式 —— `useState` 是一种新方法，它与 class 里面的 `this.state` 提供的功能完全相同。一般来说，在函数退出后变量就会”消失”，而 state 中的变量会被 React 保留。

**`useState` 需要哪些参数？** `useState()` 方法里面唯一的参数就是初始 state。不同于 class 的是，我们可以按照需要使用数字或字符串对其进行赋值，而不一定是对象。在示例中，只需使用数字来记录用户点击次数，所以我们传了 `0` 作为变量的初始 state。（如果我们想要在 state 中存储两个不同的变量，只需调用 `useState()` 两次即可。）

**`useState` 方法的返回值是什么？** 返回值为：**当前 state 以及更新 state 的函数**。这就是我们写 `const [count, setCount] = useState()` 的原因。这与 class 里面 `this.state.count` 和 `this.setState` 类似，唯一区别就是你需要成对的获取它们。

既然我们知道了 `useState` 的作用，我们的示例应该更容易理解了：

```jsx
import React, { useState } from 'react';

function Example() {
  // 声明一个叫 "count" 的 state 变量
  const [count, setCount] = useState(0);
  // ...  
}
```

我们声明了一个叫 `count` 的 state 变量，然后把它设为 `0`。**React 会在重复渲染时记住它当前的值**，并且提供最新的值给我们的函数。我们可以通过调用 `setCount` 来更新当前的 `count`。

> 注意
>
> 你可能想知道：为什么叫 `useState` 而不叫 `createState`?
>
> “Create” 可能不是很准确，因为 state 只在组件首次渲染的时候被创建。在下一次重新渲染时，`useState` 返回给我们当前的 state。否则它就不是 “state”了！这也是 Hook 的名字*总是*以 `use` 开头的一个原因。我们将在后面的 [Hook 规则](https://react.docschina.org/docs/hooks-rules.html)中了解原因。

## 读取 State

在 class 中显示当前的 count，我们读取 `this.state.count`：

```jsx
<p>You clicked {this.state.count} times</p>
```

在函数中，我们可以直接用 `count`:

```jsx
<p>You clicked {count} times</p>
```

## 更新 State

在 class 中，我们需要调用 `this.setState()` 来更新 `count` 值：

```jsx
 <button onClick={() => this.setState({ count: this.state.count + 1 })}>
    Click me
  </button>
```

在函数中，我们已经有了 `setCount` 和 `count` 变量，所以我们不需要 `this`:

```jsx
  <button onClick={() => setCount(count + 1)}>
    Click me
  </button>
```

## 总结

现在让我们来**仔细回顾一下学到的知识**，看下我们是否真正理解了。

```jsx
 1:  import React, { useState } from 'react';
 2:
 3:  function Example() {
 4:    const [count, setCount] = useState(0);
 5:
 6:    return (
 7:      <div>
 8:        <p>You clicked {count} times</p>
 9:        <button onClick={() => setCount(count + 1)}>
10:         Click me
11:        </button>
12:      </div>
13:    );
14:  }
```

- **第一行:** 引入 React 中的 `useState` Hook。它让我们在函数组件中存储内部 state。
- **第四行:** 在 `Example` 组件内部，我们通过调用 `useState` Hook 声明了一个新的 state 变量。它返回一对值给到我们命名的变量上。我们把变量命名为 `count`，因为它存储的是点击次数。我们通过传 `0` 作为 `useState` 唯一的参数来将其初始化为 `0`。第二个返回的值本身就是一个函数。它让我们可以更新 `count` 的值，所以我们叫它 `setCount`。
- **第九行:** 当用户点击按钮后，我们传递一个新的值给 `setCount`。React 会重新渲染 `Example` 组件，并把最新的 `count` 传给它

乍一看这似乎有点太多了。不要急于求成！如果你有不理解的地方，请再次查看以上代码并从头到尾阅读。我们保证一旦你试着”忘记” class 里面 state 是如何工作的，并用新的眼光看这段代码，就容易理解了。

### 提示：方括号有什么用？

你可能注意到我们用方括号定义了一个 state 变量：

```jsx
const [count, setCount] = useState(0);
```

等号左边名字并不是 React API 的部分，你可以自己取名字：

```jsx
const [fruit, setFruit] = useState('banana');
```

这种 JavaScript 语法叫[数组解构](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring)。它意味着我们同时创建了 `fruit` 和 `setFruit` 两个变量，`fruit` 的值为 `useState` 返回的第一个值，`setFruit` 是返回的第二个值。它等价于下面的代码：

```js
var fruitStateVariable = useState('banana'); // 返回一个有两个元素的数组
var fruit = fruitStateVariable[0]; // 数组里的第一个值
var setFruit = fruitStateVariable[1]; // 数组里的第二个值
```

当我们使用 `useState` 定义 state 变量时候，它返回一个有两个值的数组。第一个值是当前的 state，第二个值是更新 state 的函数。使用 `[0]` 和 `[1]` 来访问有点令人困惑，因为它们有特定的含义。这就是我们使用数组解构的原因。

> 注意
>
> 你可能会好奇 React 怎么知道 `useState` 对应的是哪个组件，因为我们并没有传递 `this` 给 React。

### 提示：使用多个 state 变量

将 state 变量声明为一对 `[something, setSomething]` 也很方便，因为如果我们想使用多个 state 变量，它允许我们给不同的 state 变量取不同的名称：

```jsx
function ExampleWithManyStates() {
  // 声明多个 state 变量
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: '学习 Hook' }]);
```

在以上组件中，我们有局部变量 `age`，`fruit` 和 `todos`，并且我们可以单独更新它们：

```js
function handleOrangeClick() {
    // 和 this.setState({ fruit: 'orange' }) 类似
    setFruit('orange');
  }
```

你**不必**使用多个 state 变量。State 变量可以很好地存储对象和数组，因此，你仍然可以将相关数据分为一组。然而，不像 class 中的 `this.setState`，更新 state 变量总是*替换*它而不是合并它。
