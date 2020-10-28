JavaScript的 `**Array**` 对象是用于构造数组的全局对象，数组是类似于列表的高阶对象。 

# 语法

```js
var arr1 = [element0, element1, ..., elementN]
var arr2 = new Array(element0, element1[, ...[, elementN]])
var arr3 = new Array(arrayLength)
```

# 参数

`elementN`

`Array` 构造器会根据给定的元素创建一个 JavaScript 数组，但是当仅有一个参数且为数字时除外（详见下面的 `arrayLength` 参数）。注意，后面这种情况仅适用于用 `Array` 构造器创建数组，而不适用于用方括号创建的数组字面量。

`arrayLength`

一个范围在 0 到 232-1 之间的整数，此时将返回一个 `length` 的值等于 `arrayLength` 的数组对象（言外之意就是该数组此时并没有包含任何实际的元素，不能理所当然地认为它包含 `arrayLength` 个值为 `undefined` 的元素）。如果传入的参数不是有效值，则会抛出 [`RangeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RangeError) 异常。

# 描述

数组是一种类列表对象，它的原型中提供了遍历和修改元素的相关操作。JavaScript 数组的长度和元素类型都是非固定的。因为数组的长度可随时改变，并且其数据在内存中也可以不连续，所以 JavaScript 数组不一定是密集型的，这取决于它的使用方式。一般来说，数组的这些特性会给使用带来方便，但如果这些特性不适用于你的特定使用场景的话，可以考虑使用类型数组 [`TypedArray`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)。

只能用整数作为数组元素的索引，而不能用字符串。后者称为[关联数组](https://en.wikipedia.org/wiki/Associative_array)。使用非整数并通过[方括号](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_Objects#Objects_and_properties)或[点号](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Property_Accessors)来访问或设置数组元素时，所操作的并不是数组列表中的元素，而是数组对象的[属性集合](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#Properties)上的变量。数组对象的属性和数组元素列表是分开存储的，并且数组的遍历和修改操作也不能作用于这些命名属性。

## 访问数组元素

JavaScript 数组的索引是从0开始的，第一个元素的索引为0，最后一个元素的索引等于该数组的长度减1。如果指定的索引是一个无效值，JavaScript 数组并不会报错，而是会返回 `undefined`。

```js
var arr = ['this is the first element', 'this is the second element', 'this is the last element'];
console.log(arr[0]);              // 打印 'this is the first element'
console.log(arr[1]);              // 打印 'this is the second element'
console.log(arr[arr.length - 1]); // 打印 'this is the last element'
```

**在 JavaScript 中，以数字开头的属性不能用点号引用，必须用方括号。** 

```js
var years = [1950, 1960, 1970, 1980, 1990, 2000, 2010];
console.log(years.0);   // 语法错误
console.log(years[0]);  // √
renderer.3d.setTexture(model, 'character.png');     // 语法错误
renderer['3d'].setTexture(model, 'character.png');  // √
```

## length 和数字下标之间的关系 

JavaScript 数组的 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 属性和其数字下标之间有着紧密的联系。数组内置的几个方法（例如 [`join`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/join)、[`slice`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)、[`indexOf`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) 等）都会考虑 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 的值。另外还有一些方法（例如 [`push`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push)、[`splice`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) 等）还会改变 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 的值。 

```js
var fruits = [];
fruits.push('banana', 'apple', 'peach');

console.log(fruits.length); // 3
```

使用一个合法的下标为数组元素赋值，并且该下标超出了当前数组的大小的时候，解释器会同时修改 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 的值： 

```js
fruits[5] = 'mango';
console.log(fruits[5]); // 'mango'
console.log(Object.keys(fruits));  // ['0', '1', '2', '5']
console.log(fruits.length); // 6
```

也可以显式地给 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 赋一个更大的值： 

```js
fruits.length = 10;
console.log(Object.keys(fruits)); // ['0', '1', '2', '5']
console.log(fruits.length); // 10
```

为 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 赋一个更小的值则会删掉一部分元素： 

```js
fruits.length = 2;
console.log(Object.keys(fruits)); // ['0', '1']
console.log(fruits.length); // 2
```

## 正则匹配结果所返回的数组 

使用正则表达式匹配字符串可以得到一个数组。这个数组中包含本次匹配的相关信息和匹配结果。[`RegExp.exec`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec)、[`String.match`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/match)、[`String.replace`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace) 都会返回这样的数组。 

```js
// 匹配1个 d 后面紧跟着至少1个 b，再后面又跟着1个 d 的子串，
// 并且需要记住子串中匹配到的 b 和最后的 d （通过正则表达式中的分组），
// 同时在匹配时忽略大小写

myRe = /d(b+)(d)/i;
myArray = myRe.exec("cdbBdbsbz");
```

该正则匹配返回的数组包含以下属性和元素：

| 属性/元素     | 说明                                                         | 示例           |
| ------------- | ------------------------------------------------------------ | -------------- |
| `input`       | 只读属性，原始字符串                                         | cdbBdbsbz      |
| `index`       | 只读属性，匹配到的子串在原始字符串中的索引                   | 1              |
| `[0]`         | 只读元素，本次匹配到的子串                                   | dbBd           |
| `[1], ...[n]` | 只读元素，正则表达式中所指定的分组所匹配到的子串，其数量由正则中的分组数量决定，无最大上限 | [1]: bB [2]: d |

# 方法

## pop：删除最后一个元素

删除数组的最后一个元素，并返回这个元素。

## push：数组尾部添加元素

在数组的末尾增加一个或多个元素，并返回数组的新长度。 

## reverse：数组反转

颠倒数组中元素的排列顺序，即原先的第一个变为最后一个，原先的最后一个变为第一个。

## shift：删除第一个元素

删除数组的第一个元素，并返回这个元素。

## unshift：数组头部添加元素

在数组的开头增加一个或多个元素，并返回数组的新长度。

## sort：排序

对数组元素进行排序，并返回当前数组。

**语法**

```js
arr.sort([compareFunction])
```

**参数**

- `compareFunction` 可选

  用来指定按某种顺序进行排列的函数。如果省略，元素按照转换为的字符串的各个字符的Unicode位点进行排序。`firstEl`第一个用于比较的元素。`secondEl`第二个用于比较的元素。

**返回值**

排序后的数组。请注意，数组已原地排序，并且不进行复制。

**描述**

如果指明了 `compareFunction` ，那么数组会按照调用该函数的返回值排序。即 a 和 b 是两个将要被比较的元素：

- 如果 `compareFunction(a, b)` 小于 0 ，那么 a 会被排列到 b 之前；

- 如果 `compareFunction(a, b)` 等于 0 ， a 和 b 的相对位置不变。备注： ECMAScript 标准并不保证这一行为，而且也不是所有浏览器都会遵守（例如 Mozilla 在 2003 年之前的版本）；

- 如果 `compareFunction(a, b)` 大于 0 ， b 会被排列到 a 之前。
- `compareFunction(a, b)` 必须总是对相同的输入返回相同的比较结果，否则排序的结果将是不确定的。

所以，比较函数格式如下：

```js
function compare(a, b) {
  if (a < b ) {           // 按某种排序标准进行比较, a 小于 b
    return -1;
  }
  if (a > b ) {
    return 1;
  }
  // a must be equal to b
  return 0;
}
```

要比较数字而非字符串，比较函数可以简单的以 a 减 b，如下的函数将会将数组升序排列

```js
function compareNumbers(a, b) {
  return a - b;
}
```

`sort` 方法可以使用 [函数表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/function) 方便地书写：

```js
var numbers = [4, 2, 5, 1, 3];
numbers.sort(function(a, b) {
  return a - b;
});
console.log(numbers);

也可以写成：
var numbers = [4, 2, 5, 1, 3]; 
numbers.sort((a, b) => a - b); 
console.log(numbers);

// [1, 2, 3, 4, 5]
```

对象可以按照某个属性排序：

```js
var items = [
  { name: 'Edward', value: 21 },
  { name: 'Sharpe', value: 37 },
  { name: 'And', value: 45 },
  { name: 'The', value: -12 },
  { name: 'Magnetic' },
  { name: 'Zeros', value: 37 }
];

// sort by value
items.sort(function (a, b) {
  return (a.value - b.value)
});

// sort by name
items.sort(function(a, b) {
  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
});
```

**示例**

<u>使用映射改善排序</u>

`compareFunction` 可能需要对元素做多次映射以实现排序，尤其当 `compareFunction` 较为复杂，且元素较多的时候，某些 `compareFunction` 可能会导致很高的负载。使用 map 辅助排序将会是一个好主意。基本思想是首先将数组中的每个元素比较的实际值取出来，排序后再将数组恢复。

```js
// 需要被排序的数组
var list = ['Delta', 'alpha', 'CHARLIE', 'bravo'];

// 对需要排序的数字和位置的临时存储
var mapped = list.map(function(el, i) {
  return { index: i, value: el.toLowerCase() };
})

// 按照多个值排序数组
mapped.sort(function(a, b) {
  return +(a.value > b.value) || +(a.value === b.value) - 1;
});

// 根据索引得到排序的结果
var result = mapped.map(function(el){
  return list[el.index];
});
```

## splice：数组任意位置添加或删除元素

在任意的位置给数组添加或删除任意个元素。

**语法**

```js
array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
```

**参数**

- `start`

  指定修改的开始位置（从0计数）。如果超出了数组的长度，则从数组末尾开始添加内容；如果是负值，则表示从数组末位开始的第几位（从-1计数，这意味着-n是倒数第n个元素并且等价于`array.length-n`）；如果负数的绝对值大于数组的长度，则表示开始位置为第0位。

- `deleteCount` 可选

  整数，表示要移除的数组元素的个数。

  如果 `deleteCount` 大于 `start` 之后的元素的总数，则从 `start` 后面的元素都将被删除（含第 `start` 位）。

  如果 `deleteCount` 被省略了，或者它的值大于等于`array.length - start`(也就是说，如果它大于或者等于`start`之后的所有元素的数量)，那么`start`之后数组的所有元素都会被删除。

  如果 `deleteCount` 是 0 或者负数，则不移除元素。这种情况下，至少应添加一个新元素。

- `item1, item2, *...*` 可选

  要添加进数组的元素,从`start` 位置开始。如果不指定，则 `splice()` 将只删除数组元素。

**返回值**

由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。

**示例**

<u>从第 2 位开始删除 0 个元素，插入1个元素</u>

```js
var myFish = ["angel", "clown", "mandarin", "sturgeon"];
var removed = myFish.splice(2, 0, "drum");

// 运算后的 myFish: ["angel", "clown", "drum", "mandarin", "sturgeon"]
// 被删除的元素: [], 没有元素被删除
```

<u>从第 2 位开始删除 0 个元素，插入n个元素</u>

```js
var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
var removed = myFish.splice(2, 0, 'drum', 'guitar');

// 运算后的 myFish: ["angel", "clown", "drum", "guitar", "mandarin", "sturgeon"]
// 被删除的元素: [], 没有元素被删除
```

<u>从第 3 位开始删除 1 个元素</u>

```js
var myFish = ['angel', 'clown', 'drum', 'mandarin', 'sturgeon'];
var removed = myFish.splice(3, 1);

// 运算后的 myFish: ["angel", "clown", "drum", "sturgeon"]
// 被删除的元素: ["mandarin"]
```

<u>从第 2 位开始删除 1 个元素，插入1个元素</u>

```js
var myFish = ['angel', 'clown', 'drum', 'sturgeon'];
var removed = myFish.splice(2, 1, "trumpet");

// 运算后的 myFish: ["angel", "clown", "trumpet", "sturgeon"]
// 被删除的元素: ["drum"]
```

<u>从第 0 位开始删除 2 个元素，插入n个元素</u>

```js
var myFish = ['angel', 'clown', 'trumpet', 'sturgeon'];
var removed = myFish.splice(0, 2, 'parrot', 'anemone', 'blue');

// 运算后的 myFish: ["parrot", "anemone", "blue", "trumpet", "sturgeon"]
// 被删除的元素: ["angel", "clown"]
```

<u>从第 2 位开始删除 2 个元素</u>

```js
var myFish = ['parrot', 'anemone', 'blue', 'trumpet', 'sturgeon'];
var removed = myFish.splice(myFish.length - 3, 2);

// 运算后的 myFish: ["parrot", "anemone", "sturgeon"]
// 被删除的元素: ["blue", "trumpet"]
```

<u>从倒数第 2 位开始删除 1 个元素</u>

```js
var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
var removed = myFish.splice(-2, 1);

// 运算后的 myFish: ["angel", "clown", "sturgeon"]
// 被删除的元素: ["mandarin"]
```

<u>从第 2 位开始删除所有元素</u>

```js
var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
var removed = myFish.splice(2);

// 运算后的 myFish: ["angel", "clown"]
// 被删除的元素: ["mandarin", "sturgeon"]
```

## indexOf：**找出某个元素在数组中的索引** 

```js
var fruits = ['Apple', 'Banana'];
fruits.push('Mango');
// ["Apple", "Banana", "Mango"]

var pos = fruits.indexOf('Banana');
// 1
```

## **lastIndexOf** ：**找出某个元素在数组中的索引** 

`**lastIndexOf()**` 方法返回指定元素（也即有效的 JavaScript 值或变量）在数组中的最后一个的索引，如果不存在则返回 -1。从数组的后面向前查找，从 `fromIndex` 处开始。 

## join：数组转为字符串

```js
var a = ['Wind', 'Rain', 'Fire'];
var myVar1 = a.join();      // myVar1的值变为"Wind,Rain,Fire"
var myVar2 = a.join(', ');  // myVar2的值变为"Wind, Rain, Fire"
var myVar3 = a.join(' + '); // myVar3的值变为"Wind + Rain + Fire"
var myVar4 = a.join('');    // myVar4的值变为"WindRainFire"
```

## slice：**复制一个数组** 

`**slice()**` 方法返回一个新的数组对象，这一对象是一个由 `begin` 和 `end` 决定的原数组的**浅拷贝**（包括 `begin`，不包括`end`）。原始数组不会被改变。 

**语法**

```js
arr.slice([begin[, end]])
```

**参数**

- `begin` 可选

  提取起始处的索引（从 `0` 开始），从该索引开始提取原数组元素。

  如果该参数为负数，则表示从原数组中的倒数第几个元素开始提取，`slice(-2)` 表示提取原数组中的倒数第二个元素到最后一个元素（包含最后一个元素）。

  如果省略 `begin`，则 `slice` 从索引 `0` 开始。

  如果 `begin` 大于原数组的长度，则会返回空数组。

- `end` 可选

  提取终止处的索引（从 `0` 开始），在该索引处结束提取原数组元素。`slice` 会提取原数组中索引从 `begin` 到 `end` 的所有元素（包含 `begin`，但不包含 `end`）。

  `slice(1,4)` 会提取原数组中从第二个元素开始一直到第四个元素的所有元素 （索引为 1, 2, 3的元素）。

  如果该参数为负数， 则它表示在原数组中的倒数第几个元素结束抽取。 `slice(-2,-1)` 表示抽取了原数组中的倒数第二个元素到最后一个元素（不包含最后一个元素，也就是只有倒数第二个元素）。

  如果 `end` 被省略，则 `slice` 会一直提取到原数组末尾。

  如果 `end` 大于数组的长度，`slice` 也会一直提取到原数组末尾。

**返回值**

一个含有被提取元素的新数组。

**描述**

`slice` 不会修改原数组，只会返回一个浅复制了原数组中的元素的一个新数组。原数组的元素会按照下述规则拷贝：

- 如果该元素是个对象引用 （不是实际的对象），`slice` 会拷贝这个对象引用到新的数组里。两个对象引用都引用了同一个对象。如果被引用的对象发生改变，则新的和原来的数组中的这个元素也会发生改变。

- 对于字符串、数字及布尔值来说（不是 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)、[`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 或者 [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Boolean) 对象），`slice` 会拷贝这些值到新的数组里。在别的数组里修改这些字符串或数字或是布尔值，将不会影响另一个数组。

如果向两个数组任一中添加了新元素，则另一个不会受到影响。

**示例**

<u>返回现有数组的一部分</u>

```js
var fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];
var citrus = fruits.slice(1, 3);

// fruits contains ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango']
// citrus contains ['Orange','Lemon']
```

## Array.from()

从类数组对象或者可迭代对象中创建一个新的数组实例。 

**语法**

```
Array.from(arrayLike[, mapFn[, thisArg]])
```

**参数**

- `arrayLike`

  想要转换成数组的伪数组对象或可迭代对象。

- `mapFn` 可选

  如果指定了该参数，新数组中的每个元素会执行该回调函数。

- `thisArg` 可选

  可选参数，执行回调函数 `mapFn` 时 `this` 对象。

**返回值**

一个新的[`数组`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Array)实例。

**示例**

从 `String` 生成数组

```js
Array.from('foo'); 
// [ "f", "o", "o" ]
```

从 `Set` 生成数组

```js
const set = new Set(['foo', 'bar', 'baz', 'foo']);
Array.from(set);
// [ "foo", "bar", "baz" ]
```

从 `Map` 生成数组

```js
const map = new Map([[1, 2], [2, 4], [4, 8]]);
Array.from(map);
// [[1, 2], [2, 4], [4, 8]]

const mapper = new Map([['1', 'a'], ['2', 'b']]);
Array.from(mapper.values());
// ['a', 'b'];

Array.from(mapper.keys());
// ['1', '2'];
```

从类数组对象（arguments）生成数组

```js
function f() {
  return Array.from(arguments);
}

f(1, 2, 3);

// [ 1, 2, 3 ]
```

在 `Array.from` 中使用箭头函数

```js
Array.from([1, 2, 3], x => x + x);
// [2, 4, 6]

Array.from({length: 5}, (v, i) => i);
// [0, 1, 2, 3, 4]
```

Sequence generator (range)

```js
// Sequence generator function (commonly referred to as "range", e.g. Clojure, PHP etc)
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

// Generate numbers range 0..4
range(0, 4, 1);
// [0, 1, 2, 3, 4] 

// Generate numbers range 1..10 with step of 2 
range(1, 10, 2); 
// [1, 3, 5, 7, 9]

// Generate the alphabet using Array.from making use of it being ordered as a sequence
range('A'.charCodeAt(0), 'Z'.charCodeAt(0), 1).map(x => String.fromCharCode(x));
// ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
```

数组去重合并

```js
function combine(){ 
    let arr = [].concat.apply([], arguments);  //没有去重复的新数组 
    return Array.from(new Set(arr));
} 

var m = [1, 2, 2], n = [2,3,3]; 
console.log(combine(m,n));     
```

# 迭代方法

**语法**

**参数**

**返回值**

**描述**

**示例**

## forEach：数组遍历

```js
var fruits = ['Apple', 'Banana'];
fruits.forEach(function (item, index, array) {
    console.log(item, index);
});
// Apple 0
// Banana 1
```

## reduce：计算数组中的元素，返回一个值，如求和

从左到右为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。 

**语法**

```
arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
```

**参数**

`callback`

执行数组中每个值 (如果没有提供 `initialValue则第一个值除外`)的函数，包含四个参数：


- `accumulator`

  累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或`initialValue`（见于下方）。 

- `currentValue`

  数组中正在处理的元素。

- `index` 可选

  数组中正在处理的当前元素的索引。 如果提供了`initialValue`，则起始索引号为0，否则从索引1起始。

- `array`可选

  调用`reduce()`的数组

`initialValue`可选

作为第一次调用 `callback`函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。

**返回值**

函数累计处理的结果 

**描述**

`reduce`为数组中的每一个元素依次执行`callback`函数，不包括数组中被删除或从未被赋值的元素 。

回调函数第一次执行时，`accumulator` 和`currentValue`的取值有两种情况：如果调用`reduce()`时提供了`initialValue`，`accumulator`取值为`initialValue`，`currentValue`取数组中的第一个值；如果没有提供 `initialValue`，那么`accumulator`取数组中的第一个值，`currentValue`取数组中的第二个值。 

**注意：**如果没有提供`initialValue`，reduce 会从索引1的地方开始执行 callback 方法，跳过第一个索引。如果提供`initialValue`，从索引0开始。 

如果数组为空且没有提供`initialValue`，会抛出[`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError) 。如果数组仅有一个元素（无论位置如何）并且没有提供`initialValue`， 或者有提供`initialValue`但是数组为空，那么此唯一值将被返回并且`callback`不会被执行。 

提供初始值通常更安全，正如下面的例子，如果没有提供`initialValue`，则可能有四种输出：

```js
var maxCallback = ( acc, cur ) => Math.max( acc.x, cur.x );
var maxCallback2 = ( max, cur ) => Math.max( max, cur );

// reduce() 没有初始值
[ { x: 2 }, { x: 22 }, { x: 42 } ].reduce( maxCallback ); // NaN
[ { x: 2 }, { x: 22 }            ].reduce( maxCallback ); // 22
[ { x: 2 }                       ].reduce( maxCallback ); // { x: 2 }
[                                ].reduce( maxCallback ); // TypeError

// map/reduce; 这是更好的方案，即使传入空数组或更大数组也可正常执行
[ { x: 22 }, { x: 42 } ].map( el => el.x )
                        .reduce( maxCallback2, -Infinity );
```

**reduce如何运行**

```js
[0, 1, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, array){
  return accumulator + currentValue;
});
```

 callback 被调用四次，每次调用的参数和返回值如下表： 

| `callback`  | `accumulator` | `currentValue` | `currentIndex` | `array`           | return value |
| ----------- | ------------- | -------------- | -------------- | ----------------- | ------------ |
| first call  | `0`           | `1`            | `1`            | `[0, 1, 2, 3, 4]` | `1`          |
| second call | `1`           | `2`            | `2`            | `[0, 1, 2, 3, 4]` | `3`          |
| third call  | `3`           | `3`            | `3`            | `[0, 1, 2, 3, 4]` | `6`          |
| fourth call | `6`           | `4`            | `4`            | `[0, 1, 2, 3, 4]` | `10`         |

由`reduce`返回的值将是最后一次回调返回值（10）。 

## reduceRight：与reduce类似，但执行方向相反

从右到左为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，并返回最后一次回调函数的返回值。 

首次回调函数调用时的情况可汇总为此表：

| 数组内元素数量 | 是否提供 `initialValue` | 结果                                                         |
| -------------- | ----------------------- | ------------------------------------------------------------ |
| > 1            | 未提供                  | `accumulator` 为数组中（下略）最后一个元素 `currentValue` 为倒数第二个元素 |
|                | 提供                    | `accumulator` 为 `initialValue` `currentValue` 为最后一个元素 |
| = 1            | 未提供                  | 直接返回数组中的唯一一个元素                                 |
|                | 提供                    | 直接返回 `initialValue`                                      |
| = 0            | 未提供                  | 抛出 `TypeError` 错误                                        |

## keys：数组索引键

**语法**

```js
arr.keys()
```

**返回值** 

一个新的 [`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Array) 迭代器对象。

**示例**

索引迭代器会包含那些没有对应元素的索引

```js
var arr = ["a", , "c"];
var sparseKeys = Object.keys(arr);
var denseKeys = [...arr.keys()];
console.log(sparseKeys); // ['0', '2']
console.log(denseKeys);  // [0, 1, 2]
```

## values：数组每个索引的值 

**语法**

```js
arr.values()
```

**返回值**

一个新的 [`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Array) 迭代对象。

**示例**

使用 `for...of` 循环进行迭代

```js
let arr = ['w', 'y', 'k', 'o', 'p'];
let eArr = arr.values();

for (let letter of eArr) {
  console.log(letter);
} //"w" "y "k" "o" "p"
```

**Array.prototype.values** 是 **Array.prototype[Symbol.iterator]** 的默认实现。

```js
Array.prototype.values === Array.prototype[Symbol.iterator]  // true 
```

使用 `.next()` 迭代

```js
var arr = ['a', 'b', 'c', 'd', 'e'];
var iterator = arr.values(); 
iterator.next();               // Object { value: "a", done: false }
iterator.next().value;         // "b"
iterator.next()["value"];      // "c"
iterator.next();               // Object { value: "d", done: false }
iterator.next();               // Object { value: "e", done: false }
iterator.next();               // Object { value: undefined, done: true } 
iteraroe.next().value;         // undefined
```

一次性：数组迭代器是一次性的，或者说临时对象

例子：

```js
var arr = ['a', 'b', 'c', 'd', 'e'];
 var iterator = arr.values();
 for (let letter of iterator) {
 console.log(letter); 
} //"a" "b" "c" "d"
for (let letter of iterator) {
console.log(letter);
} // undefined
```

**解释:** 当 `next().done=true` 或 `currentIndex>length` 时， `for..of` 循环结束。

**值**: 数组迭代器中存储的是原数组的地址，而不是数组元素值。

```js
var arr = ['a', 'b', 'c', 'd', 'e']; 
var iterator = arr.values();
console.log(iterator); // Array Iterator {  }
iterator.next().value; // "a"
arr[1] = 'n';                 
iterator.next().value; //  "n"
```

如果数组中元素改变，那么迭代器的值也会改变

## filter：数组过滤

`**filter()**` 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。  

**描述**

`filter` 为数组中的每个元素调用一次 `callback` 函数，并利用所有使得 `callback` 返回 true 或[等价于 true 的值](https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy)的元素创建一个新数组。`callback` 只会在已经赋值的索引上被调用，对于那些已经被删除或者从未被赋值的索引不会被调用。那些没有通过 `callback` 测试的元素会被跳过，不会被包含在新数组中。

`callback` 被调用时传入三个参数：

1. 元素的值
2. 元素的索引
3. 被遍历的数组本身

如果为 `filter` 提供一个 `thisArg` 参数，则它会被作为 `callback` 被调用时的 `this` 值。否则，`callback` 的 `this` 值在非严格模式下将是全局对象，严格模式下为 `undefined`。`callback` 函数最终观察到的 `this` 值是根据[通常函数所看到的 "this"的规则](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)确定的。

`filter` 不会改变原数组，它返回过滤后的新数组。

`filter` 遍历的元素范围在第一次调用 `callback` 之前就已经确定了。在调用 `filter` 之后被添加到数组中的元素不会被 `filter` 遍历到。如果已经存在的元素被改变了，则他们传入 `callback` 的值是 `filter` 遍历到它们那一刻的值。被删除或从来未被赋值的元素不会被遍历到。

**示例**

筛选排除所有较小的值

下例使用 `filter` 创建了一个新数组，该数组的元素由原数组中值大于 10 的元素组成。

```js
function isBigEnough(element) {
  return element >= 10;
}
var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
// filtered is [12, 130, 44] 
```

在数组中搜索

下例使用 `filter()` 根据搜索条件来过滤数组内容。

```js
var fruits = ['apple', 'banana', 'grapes', 'mango', 'orange'];

/**
 * Array filters items based on search criteria (query)
 */
function filterItems(query) {
  return fruits.filter(function(el) {
      return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
  })
}

console.log(filterItems('ap')); // ['apple', 'grapes']
console.log(filterItems('an')); // ['banana', 'mango', 'orange'] 
```

## every：测试数组元素，都满足返回true

`**every()**` 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。 

**描述**

`every` 方法为数组中的每个元素执行一次 `callback` 函数，直到它找到一个会使 `callback` 返回 `false`的元素。如果发现了一个这样的元素，`every` 方法将会立即返回 `false`。否则，`callback` 为每一个元素返回 `true`，`every` 就会返回 `true`。`callback` 只会为那些已经被赋值的索引调用。不会为那些被删除或从未被赋值的索引调用。

`callback` 在被调用时可传入三个参数：元素值，元素的索引，原数组。

如果为 `every` 提供一个 `thisArg` 参数，则该参数为调用 `callback` 时的 `this` 值。如果省略该参数，则 `callback` 被调用时的 `this` 值，在非严格模式下为全局对象，在严格模式下传入 `undefined`。详见 `this` 条目。

`every` 不会改变原数组。

`every` 遍历的元素范围在第一次调用 `callback` 之前就已确定了。在调用 `every` 之后添加到数组中的元素不会被 `callback` 访问到。如果数组中存在的元素被更改，则他们传入 `callback` 的值是 `every` 访问到他们那一刻的值。那些被删除的元素或从来未被赋值的元素将不会被访问到。

`every` 和数学中的"所有"类似，当所有的元素都符合条件才会返回`true`。正因如此，若传入一个空数组，无论如何都会返回 `true`。（这种情况属于[无条件正确](http://en.wikipedia.org/wiki/Vacuous_truth)：正因为一个[空集合](https://en.wikipedia.org/wiki/Empty_set#Properties)没有元素，所以它其中的所有元素都符合给定的条件。)

**示例**

检测所有数组元素的大小

下例检测数组中的所有元素是否都大于 10。

```js
function isBigEnough(element, index, array) {
  return element >= 10;
}
[12, 5, 8, 130, 44].every(isBigEnough);   // false
[12, 54, 18, 130, 44].every(isBigEnough); // true
```

## some：测试数组元素，有一个满足就返回true

`**some()**` 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。 

**描述**

`some()` 为数组中的每一个元素执行一次 `callback` 函数，直到找到一个使得 callback 返回一个“真值”（即可转换为布尔值 true 的值）。如果找到了这样一个值，`some()` 将会立即返回 `true`。否则，`some()` 返回 `false`。`callback` 只会在那些”有值“的索引上被调用，不会在那些被删除或从来未被赋值的索引上调用。

`callback` 被调用时传入三个参数：元素的值，元素的索引，被遍历的数组。

如果一个`thisArg`参数提供给some()，它将被用作调用的 `callback`的 `this` 值。否则， 它的 `this` value将是 `undefined`。`this`的值最终通过callback来观察，根据 [the usual rules for determining the `this` seen by a function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)的this判定规则来确定。

`some()` 被调用时不会改变数组。

`some()` 遍历的元素的范围在第一次调用 `callback`. 前就已经确定了。在调用 `some()` 后被添加到数组中的值不会被 `callback` 访问到。如果数组中存在且还未被访问到的元素被 `callback` 改变了，则其传递给 `callback` 的值是 `some()` 访问到它那一刻的值。已经被删除的元素不会被访问到。

**示例**

测试数组元素的值

下面的例子检测在数组中是否有元素大于 10。

```js
function isBiggerThan10(element, index, array) {
  return element > 10;
}

[2, 5, 8, 1, 4].some(isBiggerThan10);  // false
[12, 5, 8, 1, 4].some(isBiggerThan10); // true
```

## find：查找元素

找到第一个满足测试函数的元素并返回那个元素的值，如果找不到，则返回 `undefined`。 

**语法**

```
arr.find(callback[, thisArg])
```

**参数**

`callback`

- `element`

  当前遍历到的元素。

- `index`可选

  当前遍历到的索引。

- `array`可选

  数组本身。

`thisArg`可选

执行回调时用作`this` 的对象。

**返回值**

数组中第一个满足所提供测试函数的元素的值，否则返回 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)。 

**示例**

```js
var inventory = [
    {name: 'apples', quantity: 2},
    {name: 'bananas', quantity: 0},
    {name: 'cherries', quantity: 5}
];

function findCherries(fruit) { 
    return fruit.name === 'cherries';
}

console.log(inventory.find(findCherries)); // { name: 'cherries', quantity: 5 }
```

## findeIndex：查找元素的索引

找到第一个满足测试函数的元素并返回那个元素的索引，如果找不到，则返回 `-1`。 

**语法**

```
arr.findIndex(callback[, thisArg])
```

**参数**

`callback`

- `element`

  当前元素。

- `index`

  当前元素的索引。

- `array`

  调用`findIndex`的数组。

`thisArg`

可选。执行`callback`时作为`this`对象的值.

**返回值**

 数组中通过提供测试函数的第一个元素的**索引**。否则，返回-1 

**示例**

查找数组中素数的元素的索引（如果不存在素数，则返回-1）。 

```js
function isPrime(element, index, array) {
  var start = 2;
  while (start <= Math.sqrt(element)) {
    if (element % start++ < 1) {
      return false;
    }
  }
  return element > 1;
}

console.log([4, 6, 8, 12].findIndex(isPrime)); // -1, not found
console.log([4, 6, 7, 12].findIndex(isPrime)); // 2
```

## **entries**：返回一个新的**Array Iterator**对象 

**示例**

1、 Array Iterator

```js
var arr = ["a", "b", "c"];
var iterator = arr.entries();
console.log(iterator);

/*Array Iterator {}
         __proto__:Array Iterator
         next:ƒ next()
         Symbol(Symbol.toStringTag):"Array Iterator"
         __proto__:Object
*/
```

2、iterator.next()

```js
var arr = ["a", "b", "c"]; 
var iterator = arr.entries();
console.log(iterator.next());

/*{value: Array(2), done: false}
          done:false
          value:(2) [0, "a"]
           __proto__: Object
*/
// iterator.next()返回一个对象，对于有元素的数组，
// 是next{ value: Array(2), done: false }；
// next.done 用于指示迭代器是否完成：在每次迭代时进行更新而且都是false，
// 直到迭代器结束done才是true。
// next.value是一个["key","value"]的数组，是返回的迭代器中的元素值。
```

3、iterator.next方法运行

```js
var arr = ["a", "b", "c"];
var iter = arr.entries();
var a = [];

// for(var i=0; i< arr.length; i++){   // 实际使用的是这个 
for(var i=0; i< arr.length+1; i++){    // 注意，是length+1，比数组的长度大
    var tem = iter.next();             // 每次迭代时更新next
    console.log(tem.done);             // 这里可以看到更新后的done都是false
    if(tem.done !== true){             // 遍历迭代器结束done才是true
        console.log(tem.value);
        a[i]=tem.value;
    }
}
    
console.log(a);                         // 遍历完毕，输出next.value的数组
```

4、二维数组按行排序

```js
function sortArr(arr) {
    var goNext = true;
    var entries = arr.entries();
    while (goNext) {
        var result = entries.next();
        if (result.done !== true) {
            result.value[1].sort((a, b) => a - b);
            goNext = true;
        } else {
            goNext = false;
        }
    }
    return arr;
}

var arr = [[1,34],[456,2,3,44,234],[4567,1,4,5,6],[34,78,23,1]];
sortArr(arr);

/*(4) [Array(2), Array(5), Array(5), Array(4)]
    0:(2) [1, 34]
    1:(5) [2, 3, 44, 234, 456]
    2:(5) [1, 4, 5, 6, 4567]
    3:(4) [1, 23, 34, 78]
    length:4
    __proto__:Array(0)
*/
```

5、使用[for…of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) 循环

```js
var arr = ["a", "b", "c"];
var iterator = arr.entries();
// undefined

for (let e of iterator) {
    console.log(e);
}

// [0, "a"] 
// [1, "b"] 
// [2, "c"]
```
