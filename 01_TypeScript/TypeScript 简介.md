输出结果为：

```
Hello
Hello
World
**Hello World**
```

输出结果为：

```
10
Runoob
```

输出结果为：

```
Google
Runoob
Taobao
Facebook
```

输出结果为：

```
Google
Runoob
Taobao
Facebook
```

输出结果为：

```
12 是一个数字
Tom 是一个字符串
```

单个参数 **()** 是可选的：编译以上代码，得到以下 JavaScript 代码：TypeScript 是 JavaScript 的一个超集，支持 ECMAScript 6 标准（[ES6 教程](https://www.runoob.com/w3cnote/es6-tutorial.html)）。

# TypeScript 简介

## 语言特性

TypeScript 是一种给 JavaScript 添加特性的语言扩展。增加的功能包括：

- 类型批注和编译时类型检查
- 类型推断
- 类型擦除
- 接口
- 枚举
- Mixin
- 泛型编程
- 名字空间
- 元组
- Await

## JavaScript 与 TypeScript 的区别

TypeScript 是 JavaScript 的超集，扩展了 JavaScript 的语法，因此现有的 JavaScript 代码可与 TypeScript 一起工作无需任何修改，TypeScript 通过类型注解提供编译时的静态类型检查。

TypeScript 可处理已有的 JavaScript 代码，并只对其中的 TypeScript 代码进行编译。

```ts
const hello : string = "Hello World!"
console.log(hello)
```

# TypeScript 安装

NPM 安装 TypeScript

```
npm install -g typescript
```

安装完成后我们可以使用 **tsc** 命令来执行 TypeScript 的相关代码，以下是查看版本号：

```
$ tsc -v
Version 3.2.2
```

然后我们新建一个 test.ts 的文件，代码如下：

```ts
var message:string = "Hello World";
console.log(message)
```

通常我们使用 **.ts** 作为 TypeScript 代码文件的扩展名。

然后执行以下命令将 TypeScript 转换为 JavaScript 代码：

```
tsc test.ts
```

这时候再当前目录下（与 test.ts 同一目录）就会生成一个 test.js 文件，代码如下：

```ts
var message = "Hello World"; 
console.log(message);
```

使用 node 命令来执行 test.js 文件：

```
$ node test.js 
Hello World
```

# TypeScript 基础语法

TypeScript 程序由以下几个部分组成：

- 模块
- 函数
- 变量
- 语句和表达式
- 注释

## 空白和换行

TypeScript 会忽略程序中出现的空格、制表符和换行符。

空格、制表符通常用来缩进代码，使代码易于阅读和理解。

## TypeScript 区分大小写

TypeScript 区分大写和小写字符。

## 分号是可选的

每行指令都是一段语句，你可以使用分号或不使用， 分号在 TypeScript 中是可选的，建议使用。

以下代码都是合法的：

```ts
console.log("Runoob")
console.log("Google");
```

如果语句写在同一行则一定需要使用分号来分隔，否则会报错，如：

```tsx
console.log("Runoob");console.log("Google");
```

## TypeScript 注释

注释是一个良好的习惯，虽然很多程序员讨厌注释，但还是建议你在每段代码写上文字说明。

注释可以提高程序的可读性。

注释可以包含有关程序一些信息，如代码的作者，有关函数的说明等。

编译器会忽略注释。

TypeScript 支持两种类型的注释

- **单行注释 ( // )** − 在 // 后面的文字都是注释内容。
- **多行注释 (/\* \*/)** − 这种注释可以跨越多行。

注释实例：

```
// 这是一个单行注释
 
/* 
 这是一个多行注释 
 这是一个多行注释 
 这是一个多行注释 
*/
```

------

## TypeScript 与面向对象

面向对象是一种对现实世界理解和抽象的方法。

TypeScript 是一种面向对象的编程语言。

面向对象主要有两个概念：对象和类。

- **对象**：对象是类的一个实例（**对象不是找个女朋友**），有状态和行为。例如，一条狗是一个对象，它的状态有：颜色、名字、品种；行为有：摇尾巴、叫、吃等。
- **类**：类是一个模板，它描述一类对象的行为和状态。
- **方法**：方法是类的操作的实现步骤。

TypeScript 面向对象编程实例：

```ts
class Site {
    name():void {
    	console.log("Runoob")
    }
}
var obj = new Site();
obj.name();
```

以上实例定义了一个类 Site，该类有一个方法 name()，该方法在终端上输出字符串 Runoob。

new 关键字创建类的对象，该对象调用方法 name()。

编译后生成的 JavaScript 代码如下：

```js
var Site = /** @class */ (function () {
    function Site() {    }
    Site.prototype.name = function () {
        console.log("Runoob");
    };
    return Site;
}());
var obj = new Site();
obj.name();
```

执行以上 JavaScript 代码，输出结果如下:

```
Runoob
```

# TypeScript 基础类型

TypeScript 包含的数据类型如下表:

| 数据类型   | 关键字    | 描述                                                         |
| :--------- | :-------- | :----------------------------------------------------------- |
| 任意类型   | any       | 声明为 any 的变量可以赋予任意类型的值。                      |
| 数字类型   | number    | 双精度 64 位浮点值。它可以用来表示整数和分数。                                                                                                                                      `let binaryLiteral: number = 0b1010; // 二进制`                                                                                                                           `let octalLiteral: number = 0o744;    // 八进制 `                                                                                                                      `let decLiteral: number = 6;    // 十进制 `                                                                                                                                       `let hexLiteral: number = 0xf00d;    // 十六进制` |
| 字符串类型 | string    | 一个字符系列，使用单引号（**'**）或双引号（**"**）来表示字符串类型。反引号（**`**）来定义多行文本和内嵌表达式。                            `let name: string = "Runoob"; `                                                                                                                                                         `let years: number = 5; `                                                                                                                                                                          `let words: string = ``您好，今年是 ${ name } 发布 ${ years + 1} 周年``;` |
| 布尔类型   | boolean   | 表示逻辑值：true 和 false。`let flag: boolean = true;`       |
| 数组类型   | 无        | 声明变量为数组。                                                                                                                                                                                            `// 在元素类型后面加上[]`                                                                                                                                                                                `let arr: number[] = [1, 2]; // 或者使用数组泛型`                                                                                                                           ` let arr: Array<number> = [1, 2];` |
| 元组       | 无        | 元组类型用来表示已知元素数量和类型的数组，各元素的类型不必相同，对应位置的类型需要相同。                                                   `let x: [string, number]; `                                                                                                                                                                    `x = ['Runoob', 1];    // 运行正常 `                                                                                                                                                      `x = [1, 'Runoob'];    // 报错 `                                                                                                                                  `console.log(x[0]);    // 输出 Runoob` |
| 枚举       | enum      | 枚举类型用于定义数值集合。                                                                                                                                                                             `enum Color {Red, Green, Blue}; `                                                                                                                                                     `let c: Color = Color.Blue; `                                                                                                                                               `console.log(c);    // 输出 2` |
| void       | void      | 用于标识方法返回值的类型，表示该方法没有返回值。                                                                                                                     `function hello(): void { alert("Hello Runoob");}` |
| null       | null      | 表示对象值缺失。                                             |
| undefined  | undefined | 用于初始化变量为一个未定义的值                               |
| never      | never     | never 是其它类型（包括 null 和 undefined）的子类型，代表从不会出现的值。 |

**注意：**TypeScript 和 JavaScript 没有整数类型。

## Any 类型

任意值是 TypeScript 针对编程时类型不明确的变量使用的一种数据类型，它常用于以下三种情况。

1、变量的值会动态改变时，比如来自用户的输入，任意值类型可以让这些变量跳过编译阶段的类型检查，示例代码如下：

```ts
let x: any = 1;         // 数字类型
x = 'I am who I am';    // 字符串类型
x = false;              // 布尔类型
```

改写现有代码时，任意值允许在编译时可选择地包含或移除类型检查，示例代码如下：

```tsx
let x: any = 4;
x.ifItExists();    // 正确，ifItExists方法在运行时可能存在，但这里并不会检查
x.toFixed();       // 正确
```

定义存储各种类型数据的数组时，示例代码如下：

```ts
let arrayList: any[] = [1, false, 'fine'];
arrayList[1] = 100;
```

## Null 和 Undefined

**null**

在 JavaScript 中 null 表示 "什么都没有"。

null是一个只有一个值的特殊类型。表示一个空对象引用。

用 typeof 检测 null 返回是 object。

**undefined**

在 JavaScript 中, undefined 是一个没有设置值的变量。

typeof 一个没有值的变量会返回 undefined。

Null 和 Undefined 是其他任何类型（包括 void）的子类型，可以赋值给其它类型，如数字类型，此时，赋值后的类型会变成 null 或 undefined。而在TypeScript中启用严格的空校验（--strictNullChecks）特性，就可以使得null 和 undefined 只能被赋值给 void 或本身对应的类型，示例代码如下：

```tsx
// 启用 --strictNullChecks
let x: number;
x = 1;            // 运行正确
x = undefined;    // 运行错误
x = null;         // 运行错误
```

上面的例子中变量 x 只能是数字类型。如果一个类型可能出现 null 或 undefined， 可以用 | 来支持多种类型，示例代码如下：

```tsx
// 启用 --strictNullChecks
let x: number | null | undefined;
x = 1;            // 运行正确
x = undefined;    // 运行正确
x = null;         // 运行正确
```

## never 类型

never 是其它类型（包括 null 和 undefined）的子类型，代表从不会出现的值。这意味着声明为 never 类型的变量只能被 never 类型所赋值，在函数中它通常表现为抛出异常或无法执行到终止点（例如无限循环），示例代码如下：

```tsx
let x: never;
let y: number;

// 运行错误，数字类型不能转为 never 类型
x = 123;

// 运行正确，never 类型可以赋值给 never类型
x = (()=>{ throw new Error('exception')})();

// 运行正确，never 类型可以赋值给 数字类型
y = (()=>{ throw new Error('exception')})();

// 返回值为 never 的函数可以是抛出异常的情况
function error(message: string): never {
    throw new Error(message);
}

// 返回值为 never 的函数可以是无法被执行到的终止点的情况
function loop(): never {
    while (true) {}
}
```

# TypeScript 变量声明

变量是一种使用方便的占位符，用于引用计算机内存地址。

我们可以把变量看做存储数据的容器。

TypeScript 变量的命名规则：

- 变量名称可以包含数字和字母。
- 除了下划线 **_** 和美元 **$** 符号外，不能包含其他特殊字符，包括空格。
- 变量名不能以数字开头。

变量使用前必须先声明，我们可以使用 var 来声明变量。

我们可以使用以下四种方式来声明变量：

声明变量的类型及初始值：

```
var [变量名] : [类型] = 值;
```

例如：

```tsx
var uname:string = "Runoob";
```

声明变量的类型，但没有初始值，变量值会设置为 undefined：

```
var [变量名] : [类型];
```

例如：

```tsx
var uname:string;
```

声明变量并初始值，但不设置类型，该变量可以是任意类型：

```
var [变量名] = 值;
```

例如：

```tsx
var uname = "Runoob";
```

声明变量没有设置类型和初始值，类型可以是任意类型，默认初始值为 undefined：

```
var [变量名];
```

例如：

```tsx
var uname;
```

实例

```tsx
var uname:string = "Runoob";
var score1:number = 50;
var score2:number = 42.50
var sum = score1 + score2
console.log("名字: "+uname)
console.log("第一个科目成绩: "+score1)
console.log("第二个科目成绩: "+score2)
console.log("总成绩: "+sum)
```

**注意：**变量不要使用 name 否则会与 DOM 中的全局 window 对象下的 name 属性出现了重名。

使用 tsc 命令编译以上代码，得到如下 JavaScript 代码：

```js
var uname = "Runoob";
var score1 = 50;
var score2 = 42.50;
var sum = score1 + score2;
console.log("名字: " + uname);
console.log("第一个科目成绩: " + score1);
console.log("第二个科目成绩: " + score2);
console.log("总成绩: " + sum);
```

执行该 JavaScript 代码输出结果为：

```
名字: Runoob
第一个科目成绩: 50
第二个科目成绩: 42.5
总成绩: 92.5
```

TypeScript 遵循强类型，如果将不同的类型赋值给变量会编译错误，如下实例：

```ts
var num:number = "hello"     // 这个代码会编译错误
```

------

## 类型断言（Type Assertion）

类型断言可以用来手动指定一个值的类型，即允许变量从一种类型更改为另一种类型。

语法格式：

```
<类型>值
```

或:

```
值 as 类型
```

实例

```tsx
var str = '1'  
var str2:number = <number> <any> str   //str、str2 是 string 类型 
console.log(str2)
```

### TypeScript 是怎么确定单个断言是否足够

当 S 类型是 T 类型的子集，或者 T 类型是 S 类型的子集时，S 能被成功断言成 S。这是为了在进行类型断言时提供额外的安全性，完全毫无根据的断言是危险的，如果你想这么做，你可以使用 any。

它之所以不被称为**类型转换**，是因为转换通常意味着某种运行时的支持。但是，类型断言纯粹是一个编译时语法，同时，它也是一种为编译器提供关于如何分析代码的方法。

编译后，以上代码会生成如下 JavaScript 代码：

```js
var str = '1';
var str2 = str;  //str、str2 是 string 类型
console.log(str2);
```

执行输出结果为：

```
1
```

------

## 类型推断

当类型没有给出时，TypeScript 编译器利用类型推断来推断类型。

如果由于缺乏声明而不能推断出类型，那么它的类型被视作默认的动态 any 类型。

```js
var num = 2;    // 类型推断为 number
console.log("num 变量的值为 "+num); 
num = "12";    // 编译错误
console.log(num);
```

- 第一行代码声明了变量 num 并=设置初始值为 2。 注意变量声明没有指定类型。因此，程序使用类型推断来确定变量的数据类型，第一次赋值为 2，**num** 设置为 number 类型。

- 第三行代码，当我们再次为变量设置字符串类型的值时，这时编译会错误。因为变量已经设置为了 number 类型。

  ```
  error TS2322: Type '"12"' is not assignable to type 'number'.
  ```

------

## 变量作用域

变量作用域指定了变量定义的位置。

程序中变量的可用性由变量作用域决定。

TypeScript 有以下几种作用域：

- **全局作用域** − 全局变量定义在程序结构的外部，它可以在你代码的任何位置使用。
- **类作用域** − 这个变量也可以称为 **字段**。类变量声明在一个类里头，但在类的方法外面。 该变量可以通过类的对象来访问。类变量也可以是静态的，静态的变量可以通过类名直接访问。
- **局部作用域** − 局部变量，局部变量只能在声明它的一个代码块（如：方法）中使用。

以下实例说明了三种作用域的使用：

```ts
var global_num = 12          // 全局变量
class Numbers { 
   num_val = 13;             // 实例变量
   static sval = 10;         // 静态变量
   
   storeNum():void { 
      var local_num = 14;    // 局部变量
   } 
} 
console.log("全局变量为: "+global_num)  
console.log(Numbers.sval)   // 静态变量
var obj = new Numbers(); 
console.log("实例变量: "+obj.num_val)
```

以上代码使用 tsc 命令编译为 JavaScript 代码为：

```js
var global_num = 12; // 全局变量
var Numbers = /** @class */ (function () {
    function Numbers() {
        this.num_val = 13; // 实例变量
    }
    Numbers.prototype.storeNum = function () {
        var local_num = 14; // 局部变量
    };
    Numbers.sval = 10; // 静态变量
    return Numbers;
}());
console.log("全局变量为: " + global_num);
console.log(Numbers.sval); // 静态变量
var obj = new Numbers();
console.log("实例变量: " + obj.num_val);
```

执行以上 JavaScript 代码，输出结果为：

```
全局变量为: 12
10
实例变量: 13
```

如果我们在方法外部调用局部变量 local_num，会报错：

```
error TS2322: Could not find symbol 'local_num'.
```

# TypeScript 运算符

运算符用于执行程序代码运算，会针对一个以上操作数项目来进行运算。

考虑以下计算：

```
7 + 5 = 12
```

以上实例中 7、5 和 12 是操作数。

运算符 **+** 用于加值。

运算符 **=** 用于赋值。

TypeScript 主要包含以下几种运算：

- 算术运算符
- 逻辑运算符
- 关系运算符
- 按位运算符
- 赋值运算符
- 三元/条件运算符
- 字符串运算符
- 类型运算符

## 位运算符

位操作是程序设计中对位模式按位或二进制数的一元和二元操作。

| 运算符 | 描述                                                         | 例子        | 类似于       | 结果 | 十进制 |
| :----- | :----------------------------------------------------------- | :---------- | :----------- | :--- | :----- |
| &      | AND，按位与处理两个长度相同的二进制数，两个相应的二进位都为 1，该位的结果值才为 1，否则为 0。 | x = 5 & 1   | 0101 & 0001  | 0001 | 1      |
| \|     | OR，按位或处理两个长度相同的二进制数，两个相应的二进位中只要有一个为 1，该位的结果值为 1。 | x = 5 \| 1  | 0101 \| 0001 | 0101 | 5      |
| ~      | 取反，取反是一元运算符，对一个二进制数的每一位执行逻辑反操作。使数字 1 成为 0，0 成为 1。 | x = ~ 5     | ~0101        | 1010 | -6     |
| ^      | 异或，按位异或运算，对等长二进制模式按位或二进制数的每一位执行逻辑异按位或操作。操作的结果是如果某位不同则该位为 1，否则该位为 0。 | x = 5 ^ 1   | 0101 ^ 0001  | 0100 | 4      |
| <<     | 左移，把 << 左边的运算数的各二进位全部左移若干位，由 << 右边的数指定移动的位数，高位丢弃，低位补 0。 | x = 5 << 1  | 0101 << 1    | 1010 | 10     |
| >>     | 右移，把 >> 左边的运算数的各二进位全部右移若干位，>> 右边的数指定移动的位数。 | x = 5 >> 1  | 0101 >> 1    | 0010 | 2      |
| >>>    | 无符号右移，与有符号右移位类似，除了左边一律使用0 补位。     | x = 2 >>> 1 | 0010 >>> 1   | 0001 | 1      |

实例

```tsx
var a:number = 2;   // 二进制 10 
var b:number = 3;   // 二进制 11
    
var result; 
        
result = (a & b);     
console.log("(a & b) => ",result)
            
result = (a | b);          
console.log("(a | b) => ",result)  
        
result = (a ^ b);  
console.log("(a ^ b) => ",result);
    
result = (~b); 
console.log("(~b) => ",result);
 
result = (a << b); 
console.log("(a << b) => ",result); 
 
result = (a >> b); 
console.log("(a >> b) => ",result);
 
result = (a >>> 1); 
console.log("(a >>> 1) => ",result);
```

使用 **tsc** 命令编译以上代码得到如下 JavaScript 代码：

```js
var a = 2; // 二进制 10 
var b = 3; // 二进制 11
var result;
result = (a & b);
console.log("(a & b) => ", result);
result = (a | b);
console.log("(a | b) => ", result);
result = (a ^ b);
console.log("(a ^ b) => ", result);
result = (~b);
console.log("(~b) => ", result);
result = (a << b);
console.log("(a << b) => ", result);
result = (a >> b);
console.log("(a >> b) => ", result);
result = (a >>> 1);
console.log("(a >>> 1) => ", result);
```

执行以上 JavaScript 代码，输出结果为：

```
(a & b) =>  2
(a | b) =>  3
(a ^ b) =>  1
(~b) =>  -4
(a << b) =>  16
(a >> b) =>  0
(a >>> 1) =>  1
```

## 类型运算符

### typeof 运算符

typeof 是一元运算符，返回操作数的数据类型。

查看以下实例:

```tsx
var num = 12 
console.log(typeof num);   //输出结果: number
```

使用 tsc 命令编译以上代码得到如下 JavaScript 代码：

```js
var num = 12;
console.log(typeof num); //输出结果: number
```

以上实例输出结果如下：

```
number
```

### instanceof

instanceof 运算符用于判断对象是否为指定的类型，后面章节我们会具体介绍它。

# TypeScript 条件语句

通常在写代码时，您总是需要为不同的决定来执行不同的动作。您可以在代码中使用条件语句来完成该任务。

在 TypeScript 中，我们可使用以下条件语句：

- **if 语句** - 只有当指定条件为 true 时，使用该语句来执行代码
- **if...else 语句** - 当条件为 true 时执行代码，当条件为 false 时执行其他代码
- **if...else if....else 语句**- 使用该语句来选择多个代码块之一来执行
- **switch 语句** - 使用该语句来选择多个代码块之一来执行

# TypeScript 循环

## for 循环

TypeScript for 循环用于多次执行一个语句序列，简化管理循环变量的代码。

**语法**

语法格式如下所示：

```
for ( init; condition; increment ){
    statement(s);
}
```

下面是 for 循环的控制流程解析：

1. **init** 会首先被执行，且只会执行一次。这一步允许您声明并初始化任何循环控制变量。您也可以不在这里写任何语句，只要有一个分号出现即可。
2. 接下来，会判断 **condition**。如果为 true，则执行循环主体。如果为 false，则不执行循环主体，且控制流会跳转到紧接着 for 循环的下一条语句。
3. 在执行完 for 循环主体后，控制流会跳回上面的 **increment** 语句。该语句允许您更新循环控制变量。该语句可以留空，只要在条件后有一个分号出现即可。
4. 条件再次被判断。如果为 true，则执行循环，这个过程会不断重复（循环主体，然后增加步值，再然后重新判断条件）。在条件变为 false 时，for 循环终止。

在这里，statement(s) 可以是一个单独的语句，也可以是几个语句组成的代码块。

condition 可以是任意的表达式，当条件为 true 时执行循环，当条件为 false 时，退出循环。

## for...in 循环

for...in 语句用于一组值的集合或列表进行迭代输出。

**语法**

语法格式如下所示：

```
for (var val in list) { 
    //语句 
}
```

val 需要为 string 或 any 类型。

## for…of 、forEach、every 和 some 循环

此外，TypeScript 还支持 for…of 、forEach、every 和 some 循环。

for...of 语句创建一个循环来迭代可迭代的对象。在 ES6 中引入的 for...of 循环，以替代 for...in 和 forEach() ，并支持新的迭代协议。for...of 允许你遍历 Arrays（数组）, Strings（字符串）, Maps（映射）, Sets（集合）等可迭代的数据结构等。

## while 循环

while 语句在给定条件为 true 时，重复执行语句或语句组。循环主体执行之前会先测试条件。

**语法**

语法格式如下所示：

```
while(condition)
{
   statement(s);
}
```

在这里，statement(s) 可以是一个单独的语句，也可以是几个语句组成的代码块。

condition 可以是任意的表达式，当条件为 true 时执行循环。 当条件为 false 时，程序流将退出循环。

## do...while 循环

不像 **for** 和 **while** 循环，它们是在循环头部测试循环条件。**do...while** 循环是在循环的尾部检查它的条件。

**语法**

语法格式如下所示：

```
do
{
   statement(s);
}while( condition );
```

请注意，条件表达式出现在循环的尾部，所以循环中的 statement(s) 会在条件被测试之前至少执行一次。

如果条件为 true，控制流会跳转回上面的 do，然后重新执行循环中的 statement(s)。这个过程会不断重复，直到给定条件变为 false 为止。

## break 语句

**break** 语句有以下两种用法：

1. 当 **break** 语句出现在一个循环内时，循环会立即终止，且程序流将继续执行紧接着循环的下一条语句。
2. 它可用于终止 **switch** 语句中的一个 case。

如果您使用的是嵌套循环（即一个循环内嵌套另一个循环），break 语句会停止执行最内层的循环，然后开始执行该块之后的下一行代码。

**语法**

语法格式如下所示：

```
break;
```

## continue 语句

**continue** 语句有点像 **break** 语句。但它不是强制终止，continue 会跳过当前循环中的代码，强迫开始下一次循环。

对于 **for** 循环，**continue** 语句执行后自增语句仍然会执行。对于 **while** 和 **do...while** 循环，**continue** 语句重新执行条件判断语句。

**语法**

语法格式如下所示：

```
continue;
```

## 无限循环

无限循环就是一直在运行不会停止的循环。 for 和 while 循环都可以创建无限循环。

for 创建无限循环语法格式：

```
for(;;) { 
   // 语句
}
```

实例

```
for(;;) { 
   console.log("这段代码会不停的执行") 
}
```

while 创建无限循环语法格式：

```
while(true) { 
   // 语句
} 
```

实例

```
while(true) { 
   console.log("这段代码会不停的执行") 
}
```

