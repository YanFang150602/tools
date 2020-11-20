# `async`函数

`async`函数是使用`async`关键字声明的函数。 `async`函数是[`AsyncFunction`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction)构造函数的实例， 并且其中允许使用`await`关键字。`async`和`await`关键字让我们可以用一种更简洁的方式写出基于[`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)的异步行为，而无需刻意地链式调用`promise`。

`async`函数还可以被[作为表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/async_function)来定义。

## 语法

```js
async function name([param[, param[, ... param]]]) { 
    statements 
}
```

### 参数

- `name`

  函数名称。

- `param`

  要传递给函数的参数的名称。

- `statements`

  包含函数主体的表达式。可以使用`await`机制。

- 返回值

  一个[`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)，这个`promise`要么会通过一个由`async`函数返回的值被解决，要么会通过一个从`async`函数中抛出的（或其中没有被捕获到的）异常被拒绝。

## 描述

`async`函数可能包含0个或者多个[`await`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await)表达式。await表达式会暂停整个`async`函数的执行进程并出让其控制权，只有当其等待的基于promise的异步操作被兑现或被拒绝之后才会恢复进程。promise的解决值会被当作该await表达式的返回值。使用`async` / `await`关键字就可以在异步代码中使用普通的`try` / `catch`代码块。

**`await`关键字只在`async`函数内有效**。如果你在`async`函数体之外使用它，就会抛出语法错误 [`SyntaxError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError) 。

`async`/`await`的目的为了简化使用基于promise的API时所需的语法。`async`/`await`的行为就好像搭配使用了生成器和promise。

**`async`函数一定会返回一个promise对象**。如果一个`async`函数的返回值看起来不是promise，那么它将会被隐式地包装在一个promise中。

例如，如下代码:

```js
async function foo() {
   return 1
}
```

等价于:

```js
function foo() {
   return Promise.resolve(1)
}
```

`async`函数的函数体可以被看作是由0个或者多个await表达式分割开来的。从第一行代码直到（并包括）第一个await表达式（如果有的话）都是同步运行的。这样的话，一个不含await表达式的`async`函数是会同步运行的。然而，如果函数体内有一个await表达式，`async`函数就一定会异步执行。

例如：

```js
async function foo() {
   await 1
}
```

等价于

```js
function foo() {
   return Promise.resolve(1).then(() => undefined)
}
```

在await表达式之后的代码可以被认为是存在在链式调用的then回调中。

## 示例

### 简单例子

```js
var resolveAfter2Seconds = function() {
  console.log("starting slow promise");
  return new Promise(resolve => {
    setTimeout(function() {
      resolve("slow");
      console.log("slow promise is done");
    }, 2000);
  });
};

var resolveAfter1Second = function() {
  console.log("starting fast promise");
  return new Promise(resolve => {
    setTimeout(function() {
      resolve("fast");
      console.log("fast promise is done");
    }, 1000);
  });
};

var sequentialStart = async function() {
  console.log('==SEQUENTIAL START==');

  // 1. Execution gets here almost instantly
  const slow = await resolveAfter2Seconds();
  console.log(slow); // 2. this runs 2 seconds after 1.

  const fast = await resolveAfter1Second();
  console.log(fast); // 3. this runs 3 seconds after 1.
}

var concurrentStart = async function() {
  console.log('==CONCURRENT START with await==');
  const slow = resolveAfter2Seconds(); // starts timer immediately
  const fast = resolveAfter1Second(); // starts timer immediately

  // 1. Execution gets here almost instantly
  console.log(await slow); // 2. this runs 2 seconds after 1.
  console.log(await fast); // 3. this runs 2 seconds after 1., immediately after 2., since fast is already resolved
}

var concurrentPromise = function() {
  console.log('==CONCURRENT START with Promise.all==');
  return Promise.all([resolveAfter2Seconds(), resolveAfter1Second()]).then((messages) => {
    console.log(messages[0]); // slow
    console.log(messages[1]); // fast
  });
}

var parallel = async function() {
  console.log('==PARALLEL with await Promise.all==');
  
  // Start 2 "jobs" in parallel and wait for both of them to complete
  await Promise.all([
      (async()=>console.log(await resolveAfter2Seconds()))(),
      (async()=>console.log(await resolveAfter1Second()))()
  ]);
}

// This function does not handle errors. See warning below!
var parallelPromise = function() {
  console.log('==PARALLEL with Promise.then==');
  resolveAfter2Seconds().then((message)=>console.log(message));
  resolveAfter1Second().then((message)=>console.log(message));
}

sequentialStart(); // after 2 seconds, logs "slow", then after 1 more second, "fast"

// wait above to finish
setTimeout(concurrentStart, 4000); // after 2 seconds, logs "slow" and then "fast"

// wait again
setTimeout(concurrentPromise, 7000); // same as concurrentStart

// wait again
setTimeout(parallel, 10000); // truly parallel: after 1 second, logs "fast", then after 1 more second, "slow"

// wait again
setTimeout(parallelPromise, 13000); // same as parallel
```

#### `await` and parallelism(并行)

在`sequentialStart`中，程序在第一个`await`停留了2秒，然后又在第二个`await`停留了1秒。直到第一个计时器结束后，第二个计时器才被创建。程序需要3秒执行完毕。

在 `concurrentStart`中，两个计时器被同时创建，然后执行`await`。这两个计时器同时运行，这意味着程序完成运行只需要2秒，而不是3秒,即最慢的计时器的时间。

但是 `await `仍旧是顺序执行的，第二个 `await` 还是得等待第一个执行完。在这个例子中，这使得先运行结束的输出出现在最慢的输出之后。

如果你希望并行执行两个或更多的任务，你必须像在`parallel`中一样使用`await Promise.all([job1(), job2()])`。

#### `async`/`await和`Promise#then对比以及错误处理

大多数`async`函数也可以使用Promises编写。但是，在错误处理方面，`async`函数更容易捕获异常错误

上面例子中的`concurrentStart`函数和`concurrentPromise`函数在功能上都是等效的。在`concurrentStart`函数中，如果任一`await`ed调用失败，它将自动捕获异常，`async`函数执行中断，并通过隐式返回Promise将错误传递给调用者。

在Promise例子中这种情况同样会发生，该函数必须负责返回一个捕获函数完成的`Promise`。在`concurrentPromise`函数中，这意味着它从`Promise.all([]).then()`返回一个Promise。事实上，在此示例的先前版本忘记了这样做！

但是，`async`函数仍有可能然可能错误地忽略错误。
以`parallel` `async`函数为例。 如果它没有等待`await`（或返回）`Promise.all([])`调用的结果，则不会传播任何错误。
虽然`parallelPromise`函数示例看起来很简单，但它根本不会处理错误！ 这样做需要一个类似于`return ``Promise.all([])`处理方式。

### 使用`async`函数重写 promise 链

返回 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)的 API 将会产生一个 promise 链，它将函数肢解成许多部分。例如下面的代码：

```js
function getProcessedData(url) {
  return downloadData(url) // 返回一个 promise 对象
    .catch(e => {
      return downloadFallbackData(url)  // 返回一个 promise 对象
    })
    .then(v => {
      return processDataInWorker(v); // 返回一个 promise 对象
    });
}
```

可以重写为单个`async`函数：

```js
async function getProcessedData(url) {
  let v;
  try {
    v = await downloadData(url); 
  } catch (e) {
    v = await downloadFallbackData(url);
  }
  return processDataInWorker(v);
}
```

注意，在上述示例中，`return` 语句中没有 `await` 操作符，因为 `async function` 的返回值将被隐式地传递给 `Promise.resolve`。

**`return await promiseValue;` 与 `return promiseValue;的比较`**

返回值`隐式的传递给`[`Promise.resolve`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)，并不意味着`return await promiseValue;和return promiseValue;`在功能上相同。

看下下面重写的上面代码，在`processDataInWorker`抛出异常时返回了null：

```js
async function getProcessedData(url) {
  let v;
  try {
    v = await downloadData(url);
  } catch(e) {
    v = await downloadFallbackData(url);
  }
  try {
    return await processDataInWorker(v); // 注意 `return await` 和单独 `return` 的比较
  } catch (e) {
    return null;
  }
}
```

简单地写上`return processDataInworker(v);`将导致在`processDataInWorker(v)`出错时function返回值为[`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)`而不是`返回null。`return foo;`和`return await foo;`，有一些细微的差异:`return foo;`不管`foo`是promise还是rejects都将会直接返回`foo。相反地，`如果`foo`是一个[`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)，`return await foo;`将等待`foo`执行(resolve)或拒绝(reject)，如果是拒绝，将会在返回前抛出异常。
