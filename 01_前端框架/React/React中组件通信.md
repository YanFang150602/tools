# React中组件通信

一个购物车列表的子组件，跟购物车父组件进行通信。

## 父组件传值给子组件，通过 props 传值

### src/components/Cart.js

```jsx
import React, { Component } from 'react';
// 基于类的组件
export default class Cart extends Component {
    render() {
        return (
            <table>
                <tbody>
                    {this.props.list.map(item  => (
                        <tr key={item.id}>
                            <td>名称：{item.name}</td>
                            <td>数量：{item.count}</td>
                        </tr>
                    ))} 
                </tbody>
            </table>
        );
    }
}
```

上面的代码中我们给出的是基于类的组件的传值方式，如果你更习惯于函数类型的组件创建，那在函数中直接使用属性传过来的值即可，具体代码如下：

```jsx
import React, { Component } from 'react';
//  函数类型的组件
export function Cart({list}){
    return (
        <table>
            <tbody>
                {list.map(item  => (
                <tr key={item.id}>
                    <td>名称：{item.name}</td>
                    <td>数量：{item.count}</td>
                </tr>
                ))} 
            </tbody>
        </table> 
    )
}
```

### src/components/CartSample.js

导入上一步创建的 *Cart* 组件，并通过 *props* 传值，同时在商品列后新增 加购 按钮，点击实现加入购物车效果，并展示在页面，具体代码实现如下：

```jsx
import React, { Component } from 'react';
// 基于类的组件 导入方式
import Cart from './Cart';
// 函数类型的组件 导入方式
// import { Cart } from './Cart';

export default class CartSample extends Component {
    //  状态的初始化一般放在构造器中
    constructor(props){
        super(props);
        this.state = {
            text: '',
            goods: [],
            cartList: []
        }
        this.textChange = this.textChange.bind(this)
    }
    
    // 当 input 的值 text 发生变化的时候，我们让 textChang 去切换 input 的值
    textChange (event){
        this.setState({text: event.target.value})
    }
    
    addGoods = () => {
        this.setState(prevstate => {
            // react 官方希望传入与返回的对象不应该是同一个对象
            return {
                goods: [
                    ...prevstate.goods,
                    {
                        id: prevstate.goods.length + 1,
                        name: prevstate.text
                    }
                ]
            }
        })
    }
    
    // 加购
    addToCart = (good) => {
        // 创建一个新的购物车列表
        const newCartList = [ ...this.state.cartList ]
        // 根据 商品ID 判断购物车内有无传入的商品
        const idx = newCartList.findIndex( c => c.id === good.id)
        // 找到该 idx 对应的商品 
        const item = newCartList[idx]
        if(item){
            // 如果购物车内有该商品，则商品数量 +1
            // 删除 idx 项，再新增一项，新增项的属性和 item 一样，唯独修改 count
            newCartList.splice(idx,1,{ ...item,count: item.count +1 })
        }else{
            // 如果购物车内没有该商品
            newCartList.push({...good,count:1})
        }
        //更新
        this.setState({cartList:newCartList})
    }
    
    render() {
        return (
            <div>
                {/* 事件处理 */}
                <div>
                    <input type="text" value={this.state.text} onChange={this.textChange}/> 
                    <button onClick={this.addGoods}>加入商品</button>
                </div>
                <h1>商品列表</h1>
                <ul>
                   {this.state.goods.map((good) => (
                       <li key={good.id}> 
                            {good.name} 
                            {/* 新增 加购按钮 */}
                            <button onClick={() => this.addToCart(good)}>加入购物车</button>
                        </li>
                   ))}
                </ul>
                {/* 购物车 */}
                <h1>购物车列表</h1>
                 {/* 通过 list 属性吧购物车列表传给 cart 组件 */}
                <Cart list={this.state.cartList}></Cart>
            </div>
        );
    }
}
```

## 子组件传值给父组件

在 *React* 中子组件想传值给父组件，是父组件把回调函数直接通过 属性的方式传给子组件，称之为状态提升，即把子组件的状态提升出来，派发到父组件上，告诉子组件数据发生变化时应该调用哪个函数，那要怎么实现呢？

1.继续以上面的代码为例，新增子组件中商品的数量可以加减的需求，那就要求我们把修改子组件 *Cart.js* 的代码，在数量 *count* 标签前后新增 *-* 和 *+* 的按钮，把原先 *tr* 标签中的代码改成如下：

### src/components/Cart.js

```jsx
import React, { Component } from 'react';
// 基于类的组件
export default class Cart extends Component {
    render() {
        return (
            <table>
                <tbody>
                    {this.props.list.map(item  => (
                        <tr key={item.id}>
                            <td>名称：{item.name}</td>
                            <td>数量：
                                <button onClick={() => this.props.minus(item)}>-</button>
                                    {item.count}
                                <button onClick={() => this.props.add(item)}>+</button>
                            </td>
                        </tr>
                    ))} 
                </tbody>
            </table>
        );
    }
}
```

### src/components/CartSample.js

```jsx
import React, { Component } from 'react';
// 基于类的组件 导入方式
import Cart from './Cart';
// 函数类型的组件 导入方式
// import { Cart } from './Cart';

export default class CartSample extends Component {
    //  状态的初始化一般放在构造器中
    constructor(props){
        super(props);
        this.state = {
            text: '',
            goods: [],
            cartList: []
        }
        this.textChange = this.textChange.bind(this)
    }
    
    // 当 input 的值 text 发生变化的时候，我们让 textChang 去切换 input 的值
    textChange (event){
        this.setState({text: event.target.value})
    }
    
    addGoods = () => {
        this.setState(prevstate => {
            // react 官方希望传入与返回的对象不应该是同一个对象
            return {
                goods: [
                    ...prevstate.goods,
                    {
                        id: prevstate.goods.length + 1,
                        name: prevstate.text
                    }
                ]
            }
        })
    }
    
    // 加购
    addToCart = (good) => {
        // 创建一个新的购物车列表
        const newCartList = [ ...this.state.cartList ]
        // 根据 商品ID 判断购物车内有无传入的商品
        const idx = newCartList.findIndex( c => c.id === good.id)
        // 找到该 idx 对应的商品 
        const item = newCartList[idx]
        if(item){
            // 如果购物车内有该商品，则商品数量 +1
            // 删除 idx 项，再新增一项，新增项的属性和 item 一样，唯独修改 count
            newCartList.splice(idx,1,{ ...item,count: item.count +1 })
        }else{
            // 如果购物车内没有该商品
            newCartList.push({...good,count:1})
        }
        //更新
        this.setState({cartList:newCartList})
    }
    
    render() {
        return (
            <div>
                {/* 事件处理 */}
                <div>
                    <input type="text" value={this.state.text} onChange={this.textChange}/> 
                    <button onClick={this.addGoods}>加入商品</button>
                </div>
                <h1>商品列表</h1>
                <ul>
                   {this.state.goods.map((good) => (
                       <li key={good.id}> 
                            {good.name} 
                            {/* 新增 加购按钮 */}
                            <button onClick={() => this.addToCart(good)}>加入购物车</button>
                        </li>
                   ))}
                </ul>
                {/* 购物车 */}
                <h1>购物车列表</h1>
                 {/* 通过 list 属性吧购物车列表传给 cart 组件
                 <Cart list={this.state.cartList}></Cart>
                 */}
                {/* 原本 cart 标签新增 add 和 minus 属性 */}
				<Cart list={this.state.cartList} add={this.add} minus={this.minus}></Cart>
            </div>
        );
    }
	// 新增函数，处理数量的更新
    add = (good) =>{
        const newCartList = [ ...this.state.cartList ]
        const idx = newCartList.findIndex( c => c.id === good.id)
        const item = newCartList[idx]
        // 点击 + 按钮其实就是购物车内有该商品，然后该商品数量 +1
        newCartList.splice(idx,1,{ ...item,count: item.count +1 })
        this.setState({cartList:newCartList})
    }
    minus = (good) =>{
        const newCartList = [ ...this.state.cartList ]
        const idx = newCartList.findIndex( c => c.id === good.id)
        const item = newCartList[idx]
        // 点击 + 按钮其实就是购物车内有该商品，然后该商品数量 -1
        newCartList.splice(idx,1,{ ...item,count: item.count -1 })
        this.setState({cartList:newCartList})
    }
}
```

## 跨组件通信

主要靠的就是Context，可以直接跨过中间层的组件，减少性能消耗。

### **context**

定义: Context提供了一种方式，能够让数据在组件树中传递，而不必一级一级手动传递。

API : `createContext(defaultValue?)`。

#### App.js 简单示例

```jsx
import React, { Component, createContext } from 'react';

const BatteryContext = createContext();

//声明一个孙组件
class Leaf extends Component {
  render() {
    return (
      <BatteryContext.Consumer>
        {
          battery => <h1>Battery : {battery}</h1>
        }
      </BatteryContext.Consumer>
    )
  }
}

//声明一个子组件
class Middle extends Component {
  render() {
    return <Leaf /> 
  }
}

class App extends Component {
  render(){
    return (
      <BatteryContext.Provider value={60}>
        <Middle />
      </BatteryContext.Provider>
    );
  }
}

export default App;
```

这样没通过Middle组件来传递值，但是Leaf组件能通过context来获得属性。这就是context的基本用法。

- context不但能跨层级来传递属性值，还能在属性值发生变化的时候重渲染Consumer下面的元素，举个例子:

#### App.js 重新渲染

```jsx
import React, { Component, createContext } from 'react';

const BatteryContext = createContext();

//声明一个孙组件
class Leaf extends Component {
  render() {
    return (
      <BatteryContext.Consumer>
        {
          battery => <h1>Battery : {battery}</h1>
        }
      </BatteryContext.Consumer>
    )
  }
}

//声明一个子组件
class Middle extends Component {
  render() {
    return <Leaf />
  }
}

class App extends Component {
  state = {
    battery: 60
  }
  render() {
    const { battery } = this.state;
    return (
      <BatteryContext.Provider value={battery}>
        <button
          type="button"
          onClick={() => this.setState({ battery: battery - 1 })}
        >
          减减
        </button>
        <Middle />
      </BatteryContext.Provider>
    );
  }

}

export default App;
```

这样每次点击都会使battery得数值发生变化，从而重渲染Consumer下面的元素。

context更多使用：

- 如果有多个context变量的话，只需要把Privider嵌套进来即可，顺序不重要。接下来声明online的Provider了。

与Provider类似。Consumer也需要嵌套，顺序不重要。只要Consumer需要声明函数，所以要注意语法。

#### App.js 嵌套

```jsx
import React, { Component, createContext } from 'react';

const BatteryContext = createContext();
const OnLineContext = createContext();

//声明一个孙组件
class Leaf extends Component {
  render() {
    return (
      //与Provider类似。Consumer也需要嵌套，顺序不重要。只要Consumer需要声明函数，所以要注意语法。
      <BatteryContext.Consumer>
        {
          battery => (
            <OnLineContext.Consumer>
              {
                online => <h1>Battery : {battery} , Online : {online.toString()}</h1>
              }
            </OnLineContext.Consumer>
          )
        }
      </BatteryContext.Consumer>
    )
  }
}

//声明一个子组件
class Middle extends Component {
  render() {
    return <Leaf />
  }
}

class App extends Component {
  state = {
    battery: 60,
    online: false
  }
  render() {
    const { battery, online } = this.state;
    //接下来声明online的Provider了。如果有多个context变量的话，只需要把Privider嵌套进来即可，顺序不重要。
    return (
      <BatteryContext.Provider value={battery}>
        <OnLineContext.Provider value={online} >
          <button
            type="button"
            onClick={() => this.setState({ battery: battery - 1 })}
          >
            减减
        </button>
          <button
            type="button"
            onClick={() => this.setState({ online: !online })}
          >
            Switch
        </button>
          <Middle />
        </OnLineContext.Provider>
      </BatteryContext.Provider>
    );
  }

}

export default App;
```

-  如果Consumer向上找不到对应的Provider怎么办？其实即使找不到也不会报错，而是显示为空。那怎么设置默认值呢？

拿上面的demo举例 ，刚才我们设置的battery为60。如果Consumer向上找不到`BatteryContext.Provider`的值，我们可以这样设置默认值:

```jsx
const BatteryContext = createContext(30);
```

这样`BatteryContext.Consumer`向上找不到值，就会取默认值30。

- context不仅仅只是可以传数值，也可以传函数。

**最后再提示一下大家，不要滥用context，不然会影响组件的独立性。 如果一个组件中只使用一个Context的话，就可以使用contextType代替Consumer**

### contextType

Context会让组件变得不纯粹，因为依赖了全局变量。所以这决定了Context一般不会大规模的使用。所以一般在一个组件中使用一个Context就好。

由于Consumer的特性，里面的代码必须是这个函数的返回值。这样就显得复杂与不优雅了。那该怎么解决呢？这样**contextType**就派上用场了。

#### App.js contextType

```jsx
import React, { Component, createContext } from 'react';

const BatteryContext = createContext();

//声明一个孙组件
class Leaf extends Component {
  static contextType = BatteryContext; // static contextType = BatteryContext，前面是写死的，后面的变量是上面定义的
  render() {
    const battery = this.context;
    return<h1>Battery : {battery}</h1>
  }
}

//声明一个子组件
class Middle extends Component {
  render() {
    return <Leaf />
  }
}

class App extends Component {
  state = {
    battery: 60,
  }
  render() {
    const { battery } = this.state;
    return (
      <BatteryContext.Provider value={battery}>
        <button
          type="button"
          onClick={() => this.setState({ battery: battery - 1 })}
        >
          减减
        </button>
        <Middle />
      </BatteryContext.Provider>
    );
  }

}

export default App;
```

