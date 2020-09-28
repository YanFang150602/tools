# JavaScript 中 call()、apply()、bind() 的用法

## 简单实例

其实是一个很简单的东西，认真看十分钟就从一脸懵B 到完全 理解！

先看明白下面：

**例 1**

```js
var name = '小王', age = 17;
var obj = {
	name: '小张',
	objAge: this.age,
	myFun: function() {
		console.log(`${this.name}年龄${this.age}`);
	}
}
obj.objAge; 
obj.myFun();
```

```
 17
 小张年龄 undefined
```

**例 2**

```js
var fav = '盲僧';
function shows() {
	console.log(this.fav);
}
shows();
```

```
盲僧　
```

比较一下这两者 `this` 的差别，第一个打印里面的 `this` 指向 `obj`，第二个全局声明的 `shows()` 函数 `this` 是 `window` ；

## `call()、apply()、bind()` 都是用来重定义 `this` 这个对象的！

如：

```js
var name = '小王', age = 17;
var obj = {
	name: '小张',
	objAge: this.age,
	myFun: function() {
		console.log(`${this.name}年龄${this.age}`);
	}
}
var db = {
	name: '德玛',
	age: 99
}
obj.myFun.call(db);
obj.myFun.apply(db);
obj.myFun.bind(db)();
```

```
德玛年龄 99
德玛年龄 99
德玛年龄 99
```

以上出了 `bind` 方法后面多了个 `()` 外 ，结果返回都一致！

由此得出结论:`bind` 返回的是一个新的函数，必须调用它才会被执行。

## 对比call 、bind 、 apply 传参情况下

```js
var name = '小王', age = 17;
var obj = {
	name: '小张',
	objAge: this.age,
	myFun: function(from, to) {
		console.log(`${this.name}年龄${this.age}，来自${from}，去往${to}`);
	}
}
var db = {
	name: '德玛',
	age: 99
}
obj.myFun.call(db, '成都', '上海');
obj.myFun.apply(db, ['成都', '上海']);
obj.myFun.bind(db, '成都', '上海')();
obj.myFun.bind(db, ['成都', '上海'])();
```

```
德玛 年龄 99  来自成都，去往上海
德玛 年龄 99  来自成都，去往上海  
德玛 年龄 99  来自成都，去往上海
德玛 年龄 99  来自成都, 上海，去往undefined
```

微妙的差距！

从上面四个结果不难看出:

`call 、bind 、 apply` 这三个函数的第一个参数都是 `this` 的指向对象，第二个参数差别就来了：

`call` 的参数是直接放进去的，第二个第三个...第 n 个参数全都用逗号分隔，直接放到后面 `obj.myFun.call(db,'成都', ... ,'string' )`。

`apply` 的所有参数都必须放在一个数组里面传进去 `obj.myFun.apply(db,['成都', ..., 'string' ])`。

`bind` 除了返回是函数以外，它 的参数和 `call` 一样。

当然，三者的参数不限定是 `string` 类型，允许是各种类型，包括函数 、 `object` 等等！

