https://segmentfault.com/a/1190000017064759

# React-Redux 中文文档

`React-Redux`是`Redux`的官方`React`绑定库。它能够使你的`React`组件从`Redux store`中读取数据，并且向`store`分发`actions`以更新数据。

**安装**

在你的React app中使用React-Redux：

```bash
npm install --save react-redux
```

## `Provider`和`connect`

React-Redux 提供`<Provider/>`组件，能够使你的整个app访问到`Redux store`中的数据：

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store';

import App from './App';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
```

`React-Redux`提供一个`connect`方法能够让你把组件和`store`连接起来。

通常你可以以下面这种方式调用`connect`方法：

```jsx
import { connect } from 'react-redux';
import { increment, decrement, reset } from './actionCreators';

// const Counter = ...

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    counter: state.counter
  };
};

const mapDispatchToProps = { increment, decrement, reset };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
```

## TodoList实例

### project目录

```
public
	|-index.html
src
	|-index.js
	|-TodoApp.js
	|-constants.js
	|-style.css
	|-components
		|-AddTodo.js
		|-Todo.js
		|-TodoList.js
		|-VisibilityFilters.js
	|-redux
		|-actions.js
		|-actionTypes.js
		|-selectors.js
		|-store.js
		|-reducers
			|-index.js
			|-todos.js
			|-visibilityFilter.js
```

#### src/index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';

import TodoApp from './TodoApp';

const rootElement = document.getElementById('root');
ReactDOM.render(<TodoApp />, rootElement);
```

#### src/styles.css

```css
.todo-app {
    font-family: sans-serif;
  }
  
  /** add todo **/
  .add-todo {
    margin-left: 0.5rem;
  }
  
  /** todo list **/
  .todo-list {
    margin-top: 1rem;
    text-align: left;
    list-style: none;
  }
  
  /** todo item **/
  .todo-item {
    font-family: monospace;
    cursor: pointer;
    line-height: 1.5;
  }
  .todo-item__text--completed {
    text-decoration: line-through;
    color: lightgray;
  }
  
  /** visibility filters **/
  .filter {
    padding: 0.3rem 0;
    margin: 0 0.3rem;
    cursor: pointer;
  }
  .filter--active {
    border-bottom: 1px solid black;
  }
```

### ReactUI组件

我们所用到的`React UI`组件如下：

- `TodoApp`：我们应用的入口组件，它`render`出`AddTodo`,`TodoList`和`VisibilityFilters`组件
- `AddTodo`：允许用户在点击`Add Todo`按钮后，向todo list中加入一个新的待办项：
  - 使用一个受控`input`监听`onChange`事件以设置`state`
  - 当用户单击`Add Todo`按钮后，该组件`dispatch`一个`action`,向`store`中添加一个新的待办项。（这个`action`是我们由`React-Redux`提供的）
- `TodoList`：渲染出待办项列表的组件：
  - 当一个`VisibilityFilter`被选择后，能够渲染出所匹配的待办项列表
- `Todo`：仅负责渲染单个`todo`待办项：
  - 渲染出待办项的内容，通过横贯线表示该项已被完成
  - 触发`onClick`事件后，`dispatch`一个能切换完成状态的`action`
- `VisibilityFilters`：渲染一个`filters`集合：_all_,_complete_ 以及 _incomplete_。单击每一项能够筛选匹配的`todos`:
  - 从父组件接收一个`activeFilter`属性以表示当前用户选择的过滤条件。选中的filter会显示出下划线。
  - 能够`dispatch`名为`setFilter`的`action`以更新已选过滤条件
- `constants`：保存我们的app所有需要的常量数据
- 最后，`index`将app渲染到DOM中

#### src/TodoApp.js

```js
import React from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import VisibilityFilters from './components/VisibilityFilters';
import './styles.css';

export default function TodoApp() {
  return (
    <div className='todo-app'>
      <h1>Todo List</h1>
      <AddTodo />
      <TodoList />
      <VisibilityFilters />
    </div>
  );
}
```

#### src/components/TodoList.js

```js
import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos }) => (
  <ul className='todo-list'>
    {todos && todos.length
      ? todos.map((todo, index) => {
          return <Todo key={`todo-${todo.id}`} todo={todo} />;
        })
      : 'No todos, yay!'}
  </ul>
);

export default TodoList;
```

#### src/components/Todo.js

```js
import React from 'react';
import cx from 'classnames';

const Todo = ({ todo }) => (
  <li
    className='todo-item'
    onClick={() => {} /** dispatches action to toggle todo */}
  >
    {todo && todo.completed ? '👌' : '👋'}{' '}
    <span
      className={cx(
        'todo-item__text',
        todo && todo.completed && 'todo-item__text--completed'
      )}
    >
      {todo.content}
    </span>
  </li>
);

export default Todo;
```

#### src/components/AddTodo.js

```js
import React from 'react';

class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: '' };
  }

  updateInput = input => {
    this.setState({ input });
  };

  handleAddTodo = () => {
    // dispatches actions to add todo
    // sets state back to empty string
  };

  render() {
    return (
      <div>
        <input
          onChange={e => this.updateInput(e.target.value)}
          value={this.state.input}
        />
        <button className='add-todo' onClick={this.handleAddTodo}>
          Add Todo
        </button>
      </div>
    );
  }
}

export default AddTodo;
```

#### src/components/VisibilityFilters.js

```js
import React from 'react';
import cx from 'classnames';
import { VISIBILITY_FILTERS } from '../constants';

const VisibilityFilters = ({ activeFilter }) => {
  return (
    <div className='visibility-filters'>
      {Object.keys(VISIBILITY_FILTERS).map(filterKey => {
        const currentFilter = VISIBILITY_FILTERS[filterKey];
        return (
          <span
            key={`visibility-filter-${currentFilter}`}
            className={cx(
              'filter',
              currentFilter === activeFilter && 'filter--active'
            )}
            onClick={() => {} /** waiting for setFilter handler*/}
          >
            {currentFilter}
          </span>
        );
      })}
    </div>
  );
};

export default VisibilityFilters;
```

#### src/constants.js

```js
export const VISIBILITY_FILTERS = {
    ALL: 'all',
    COMPLETED: 'completed',
    INCOMPLETE: 'incomplete'
};
```

#### the Redux Store

应用的`Redux`部分遵循[`Redux`官方文档建议模式](https://cn.redux.js.org/docs/api)进行搭建：

- Store：

  - `todos`：标准化的todos的`reducer`。包含了`byIds`的待办项`map`对象结构，和一个包含了所有待办项id的`allIds`数组
  - `visibilityFilters`：简单的字符串`all`, `completed`, or `incomplete`.

- Action Creators：

  - `addTodo`：创建增添待办项的`action`。接收一个`string`变量`content`，返回`ADD_TODO`类型的action，以及一个`payload`对象（包含了自增的`id`和`content`属性）
  - `toggleTodo`：创建一个切换待办项的`action`。只接收一个`number`类型的变量`id`，返回`TOGGLE_TODO`类型action以及仅含`id`属性的`payload`对象。
  - `setFilter`：创建设置app当前过滤条件的`action`。接收一个`string`类型变量`filter`返回一个`SET_FILTER`类型action一集一个包含`filter`自身的`payload`对象。

- Reducers

  - `todos` reducer：

    ```
    - 在接收到`ADD_TODO` action时，将`id`追加到`allIds`数组，并且更新`byIds`
    - 在接收到`TOGGLE_TODO` action时，切换`completed`状态
    ```

  - `VisibilityFilters reducer`：在接收到`SET_FILTER`action 时负责更新`VISIBILITY_FILTERS`状态

- Action Types

  - 使用一个`actionTypes.js`文件来保存所有的`action types`常量，以便复用

- Selectores

  - `getTodoList`：从`todos` store中返回`allIds`列表
  - `getTodoById`：通过`id`查询store中的todo项
  - `getTodos`：有点复杂。它接收`allIds`数组中的所有`id`，找到每一个对应的`byIds`中的`todo`，返回最终的`todos`数组
  - `getTodosByVisibilityFilter`：根据筛选条件过滤todos

你可以查看上面这些UI组件的和尚未连接的`Redux Store`[源码](https://codesandbox.io/s/6vwyqrpqk3)

### 创建Store

首先我们需要让`store`成为我们app中可访问的对象。为此，我们将用`React-Redux`提供给我们的`<Provider/>`组件包裹我们的根组件

#### src/index.js

```js
import React from 'react';
import ReactDOM from 'react-dom';

import TodoApp from './TodoApp';

import { Provider } from 'react-redux';
import store from './redux/store';

const rootElement = document.getElementById('root');
ReactDOM.render(<Provider store={store}><TodoApp /></Provider>, rootElement);
```

要注意到`store`是以一个`prop`由`<Provider/>`传递到被包裹的`<TodoApp/>`中的。

### 连接组件

`React-Redux`提供一个`connect`方法使你可以从`Redux store`中读取数据（以及当store更新后，重新读取数据）

`connect`方法接收两个参数，都是可选参数：

- `mapStateToProps`：每当`store state`发生变化时，就被调用。接收整个`store state`，并且返回一个该组件所需要的数据对象
- `mapDispatchToProps`：这个参数可以是一个**函数**或**对象**
  - 如果是一个函数，一旦该组件被创建，就会被调用。接收`dispatch`作为一个参数，并且返回一个能够使用`dispatch`来分发actions的若干函数组成的对象
  - 如果是一个action creators构成的对象，每一个action creator将会转化为一个`prop function`并会在调用时自动分发actions。**注意：** 我们建议使用这种形式。

通常，你可以这样去`connect`：

```js
const mapStateToProps = (state, ownProps) => ({
  // ... 从state中处理的一些数据，以及可选的ownProps
});

const mapDispatchToProps = {
  // ... 通常是action creators构成的对象
};

// `connect`返回一个新的函数，可以接收一个待包装的组件
const connectToStore = connect(
  mapStateToProps,
  mapDispatchToProps
);
// 上面的函数能够返回一个已经包装、连接过的组件
const ConnectedComponent = connectToStore(Component);

// 我们通常写成一条语句如下：
connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
```

下面让我们开始编写`<AddTodo/>`。它要能够触发`store`的变化从而增加新的`todos`。因此，他要能够向store `dispatch` actions。下面就是具体流程。

我们的`addTodo` action创建函数如下所示：

把它传递到`connect`，我们的组件就能够以一个`prop`接收到它。并且一旦我们调用，它就能够自动的分发`actions`。

## 使用 React-Redux

### Connect：使用`mapStateToProps`抽取数据

作为传递给`connect`的第一个参数，`mapStateToProps`用来从store中选择被连接的组件所需要的部分数据。常以`mapState`缩写来表示。

- 每当store state改变时就被调用
- 接收整个store state，并且返回一个组件需要的数据对象

### 声明`mapStateToProps`

`mapStateToProps`应该声明为一个方法：

```js
function mapStateToProps(state, ownProps?)
```

接收的第一个参数是`state`，可选的第二个参数时`ownProps`，然后返回一个被连接组件所需要的数据的纯对象。

这个方法应作为第一个参数传递给`connect`，并且会在每次`Redux store state`改变时被调用。如果你不希望订阅`store`，那么请传递`null`或者`undefined`替代`mapStateToProps`作为`connect`的第一个参数。

> **无论`mapStateToProps`是使用`function`关键字声明的`(function mapState(state) { } )` 还是以一个箭头函数`(const mapState = (state) => { } )` 的形式定义的**——它都能够以同样的方式生效。

#### 参数

1. `state`
2. `ownProps`（可选）

**`state`**

 `mapStateToProps`的第一个参数是整个Redux store state对象（与`store.getState()`方法返回的值相同）。因此第一个参数通常命名为`state`（当然你也可以选择别的名字，但是叫`store`就不推荐了——因为它是`state`值而不是`store`实例）

`mapStateToProps`方法至少要传递`state`参数。

#### src/components/TodoList.js

```js
import React from 'react';
import Todo from './Todo';

import { connect } from 'react-redux';

const TodoList = ({ todos }) => (
    <ul className='todo-list'>
        {todos && todos.length
            ? todos.map((todo, index) => {
                return <Todo key={`todo-${todo.id}`} todo={todo} />;
            })
            : 'No todos, yay!'}
    </ul>
);


function mapStateToProps(state) {
    const { todos } = state;
    return { todoList: todos.allIds };
};

export default connect(mapStateToProps)(TodoList);
```

**`ownProps`（可选）**

如果你的组件需要用自身的`props`数据以从store中检索出数据，你可以传入第二个参数，`ownProps`。这个参数将包含所有传递给由`connect`生成的包装组件的`props`。

#### 返回值

你的`mapStateToProps`方法应该返回一个包含了组件用到的数据的纯对象：

- 每一个对象中的字段都将作为你组件的一个`prop`
- 字段中的值用来判断你的组件是否需要重新渲染

eg：

```js
function mapStateToProps(state) {
  return {
    a : 42,
    todos : state.todos,
    filter : state.visibilityFilter
  }
}
```

组件会接收: props.a, props.todos,以及 props.filter

> 注意：在一些高级场景中，你可能需要更多地对于渲染性能的控制，`mapStateToProps`也可以返回一个方法。在这种情况下，那个所返回的方法会做为一个特定组件实例的最终的`mapStateToProps`。这样一来，你就可以对每个实例进行`memoization`。参考[高级用法]()部分以获取更多信息。也可以看[PR #279](https://github.com/reduxjs/react-redux/pull/279)以及上面增加的测试。但**大部分应用根本不需要这样做**

### 使用指南

#### 让`mapStateToProps`改造从store中取出的数据

`mapStateToProps`方法能够，且应该，做更多的事情，而不仅仅是返回一个`state.someSlice`。**他们有责任去改造组建所需要的store中的数据**。比如说，返回一个特定`prop`名称的值，从state树中不同部分取出数据片段并合并为一个整体，以及以不同的方式转化store。

#### 使用Selector方法去抽取和转化数据

我们强烈建议使用`selector`方法去封装抽取state树中的特定位置的值。`Memoized selector`方法也在提高应用性能上起到了关键作用。（参考本页以下部分：[高级用法：性能]()以获取更多关于为何以及如何使用selectors的细节）

#### `mapStateToProps`方法应该足够快

一旦store改变了，**所有**被连接组件中的**所有**的`mapStateToProps`方法都会运行。因此，你的`mapStateToProps`方法一定要足够快。这也意味着缓慢的`mapStateToProps`方法会成为你应用的一个潜在瓶颈。

作为“重塑数据”想法的一部分，`mapStateToProps`方法经常需要以各种方式来转化数据（比如过滤数组，遍历IDs数组映射到对应的对象，或者从Immutable.js对象中抽取纯js值）。这些转化的开销通常很高昂，不仅表现在运行转化操作的开销上，也表现在判断最终是否要更新组件上。如果的确需要考虑性能问题了，那么要确保你的这些转化只发生在所输入的值发生变化的时候。

##### `mapStateToProps`方法应该纯净且同步

正如Redux Reducer，一个`mapStateToProps`方法应该是100%纯净的并且是同步的。他应该仅接受`state`（以及`ownProps`）作为参数，然后以`props`形式返回组件所需要的数据。他**不**应该触发任何异步操作，如AJAX请求数据，方法也不能声明为`async`形式。

#### `mapStateToProps`和性能

##### 返回值决定你的组件是否需要更新

React-Redux 内部实现了`shouldComponentUpdate`方法以便在组件用到的数据发生变化后能够精确地重新渲染。默认地，React-Redux使用“`===`”对`mapStateToProps`返回的对象的每一个字段逐一对比，以判断内容是否发生了改变。但凡有一个字段改变了，你的组件就会被重新渲染以便接收更新过的`props`值。注意到，返回一个相同引用的突变对象（mutated object）是一个常见错误，因为这会导致你的组件不能如期重新渲染。

总结一下传入`mapStateToProps`参数来抽取store中的数据的`connect`方法包装过的组件行为：

| <span/>                     | `state=>stateProps`      | `(state,ownProps)=>stateProps`                     |
| --------------------------- | ------------------------ | -------------------------------------------------- |
| `mapStateToProps`运行条件： | store `state` 发生改变   | store `state`发生改变 或 任何`ownProps`字段改变    |
| 组件重新渲染条件            | 任何`stateProps`字段改变 | 任何`stateProps`字段改变 或 任何`ownProps`字段改变 |

##### 仅在需要时返回新的对象引用

React-Redux进行浅比较来检查`mapStateToProps`的结果是否改变了。返回一个新对象或数组引用十分容易操作，但会造成你的组件在数据没变的情况下也重新渲染。

很多常见的操作都会返回新对象或数组引用：

- 创建新的数组：使用`someArray.map()`或者`someArray.filter()`
- 合并数组：`array.concat`
- 截取数组：`array.slice`
- 复制值：`Object.assgin`
- 使用扩展运算符：`{...oldState,...newData}`

把这些操作放在`memeoized selector functions`中确保它们只在输入值变化后运行。这样也能够确保如果输入值没有改变，`mapStateToProps`仍然返回与之前的相同值，然后`connect`就能够跳过重渲染过程。

##### 仅在数据改变时运行开销大的操作

转化数据经常开销很大（并且通常会创建一个新的对象引用）。为了使你的`mapStateToProps`方法足够快，你应该**仅**在**相关**数据改变时重新运行这些复杂的转化。

有下面几种形式来达到这样的目的：

- 一些转化可以在action创建函数或者reducer中运算，然后可以把转化过的数据储存在store中
- 转换也可以在组件的`render()`生命周期中完成
- 如果转化必须要在`mapStateToProps`方法中完成，那么我们建议使用[memoized selector functions](https://react-redux.js.org/docs/using-react-redux/connect-extracting-data-with-mapstatetoprops)以确保转化仅发生在输入的数据变化时。

### `Connect`: 使用`mapDispatchToProps`分发actions

作为第二个传入`connect`的参数，`mapDispatchToProps`可以实现向store中分发acions。

`dispatch`是Redux store实例的一个方法，你会通过`store.dispatch`来分发一个action。**这也是唯一触发一个state变化的途径**。

使用React-Redux后，你的组件就不再需要直接和store打交道了——`connect`会为你完成这件任务，React-Redux提供了两种可以分发actions的方式：

- 默认地，一个已连接组件可以接收`props.dispatch`然后自己分发actions
- `connect`能够接收一个`mapDispatchToProps`作为第二个参数，这将让你能够创建dispatch调用方法，然后把这些方法作为props传递给你的组件。

#### 分发（Dispatching）的途径

##### 默认：作为一个prop的`dispatch`

如果你不为`connect()`指明第二个参数，你的组件会默认接收`dispatch`。比如：

```js
connect()(MyComponent);
// 与下面语句等价
connect(
  null,
  null
)(MyComponent);

// 或者
connect(mapStateToProps /** 没有第二个参数 */)(MyComponent);
```

一旦你以这种方式连接了你的组件，你的组件就会接收`props.dispatch`。你可以用它来向store中分发actions。

```js
function Counter({ count, dispatch }) {
  return (
    <div>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
      <span>{count}</span>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "RESET" })}>reset</button>
    </div>
  );
}
```

##### 提供一个`mapDispatchToProps`参数

提供一个`mapDispatchToProps`参数能够让你指明你的组件所实际需要分发的那些actions。它允许你提供action分发函数作为props，这样一来，你不用再进行`props.dispatch(() => increment())`调用，你可以直接`props.increment()`。你这么做是出于下面几个原因：
