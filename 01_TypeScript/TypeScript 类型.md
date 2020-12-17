# TypeScript Number

TypeScript 与 JavaScript 类似，支持 Number 对象。

Number 对象是原始数值的包装对象。

**语法**

```
var num = new Number(value);
```

**注意：** 如果一个参数值不能转换为一个数字将返回 NaN (非数字值)。

## Number 对象属性

下表列出了 Number 对象支持的属性：

| 序号 | 属性 & 描述                                                  |
| :--- | :----------------------------------------------------------- |
| 1.   | **MAX_VALUE**可表示的最大的数，MAX_VALUE 属性值接近于 1.79E+308。大于 MAX_VALUE 的值代表 "Infinity"。 |
| 2.   | **MIN_VALUE**可表示的最小的数，即最接近 0 的正数 (实际上不会变成 0)。最大的负数是 -MIN_VALUE，MIN_VALUE 的值约为 5e-324。小于 MIN_VALUE ("underflow values") 的值将会转换为 0。 |
| 3.   | **NaN**非数字值（Not-A-Number）。                            |
| 4.   | **NEGATIVE_INFINITY**负无穷大，溢出时返回该值。该值小于 MIN_VALUE。 |
| 5.   | **POSITIVE_INFINITY**正无穷大，溢出时返回该值。该值大于 MAX_VALUE。 |
| 6.   | **prototype**Number 对象的静态属性。使您有能力向对象添加属性和方法。 |
| 7.   | **constructor**返回对创建此对象的 Number 函数的引用。        |

```tsx
console.log("TypeScript Number 属性: "); 
console.log("最大值为: " + Number.MAX_VALUE); 
console.log("最小值为: " + Number.MIN_VALUE); 
console.log("负无穷大: " + Number.NEGATIVE_INFINITY); 
console.log("正无穷大:" + Number.POSITIVE_INFINITY);
```

编译以上代码，得到以下 JavaScript 代码：

```js
console.log("TypeScript Number 属性: ");
console.log("最大值为: " + Number.MAX_VALUE);
console.log("最小值为: " + Number.MIN_VALUE);
console.log("负无穷大: " + Number.NEGATIVE_INFINITY);
console.log("正无穷大:" + Number.POSITIVE_INFINITY);
```

输出结果为：

```
TypeScript Number 属性:
最大值为: 1.7976931348623157e+308
最小值为: 5e-324
负无穷大: -Infinity
正无穷大:Infinity
```

## NaN 实例

```tsx
var month = 0 
if( month<=0 || month >12) { 
    month = Number.NaN 
    console.log("月份是："+ month) 
} else { 
    console.log("输入月份数值正确。") 
}
```

编译以上代码，得到以下 JavaScript 代码：

```js
var month = 0;
if (month <= 0 || month > 12) {
    month = Number.NaN;
    console.log("月份是：" + month);
}
else {
    console.log("输入月份数值正确。");
}
```

输出结果为：

```
月份是：NaN
```

## prototype 实例

```tsx
function employee(id:number,name:string) { 
    this.id = id 
    this.name = name 
} 
 
var emp = new employee(123,"admin") 
employee.prototype.email = "admin@runoob.com" 
 
console.log("员工号: "+emp.id) 
console.log("员工姓名: "+emp.name) 
console.log("员工邮箱: "+emp.email)
```

编译以上代码，得到以下 JavaScript 代码：

```js
function employee(id, name) {
    this.id = id;
    this.name = name;
}
var emp = new employee(123, "admin");
employee.prototype.email = "admin@runoob.com";
console.log("员工号: " + emp.id);
console.log("员工姓名: " + emp.name);
console.log("员工邮箱: " + emp.email);
```

输出结果为：

```
员工号: 123
员工姓名: admin
员工邮箱: admin@runoob.com
```

## Number 对象方法

Number对象 支持以下方法：

| 序号 |                         方法 & 描述                          | 实例                                                         |
| :--: | :----------------------------------------------------------: | :----------------------------------------------------------- |
|  1.  |         toExponential()把对象的值转换为指数计数法。          | `//toExponential()  var num1 = 1225.30  var val = num1.toExponential();  console.log(val) // 输出： 1.2253e+3 ` |
|  2.  |      toFixed()把数字转换为字符串，并对小数点指定位数。       | `var num3 = 177.234  console.log("num3.toFixed() 为 "+num3.toFixed())    // 输出：177 console.log("num3.toFixed(2) 为 "+num3.toFixed(2))  // 输出：177.23 console.log("num3.toFixed(6) 为 "+num3.toFixed(6))  // 输出：177.234000 ` |
|  3.  |  toLocaleString()把数字转换为字符串，使用本地数字格式顺序。  | `var num = new Number(177.1234);  console.log( num.toLocaleString());  // 输出：177.1234 ` |
|  4.  |           toPrecision()把数字格式化为指定的长度。            | `var num = new Number(7.123456);  console.log(num.toPrecision());  // 输出：7.123456  console.log(num.toPrecision(1)); // 输出：7 console.log(num.toPrecision(2)); // 输出：7.1 ` |
|  5.  | toString()把数字转换为字符串，使用指定的基数。数字的基数是 2 ~ 36 之间的整数。若省略该参数，则使用基数 10。 | `var num = new Number(10);  console.log(num.toString());  // 输出10进制：10 console.log(num.toString(2)); // 输出2进制：1010 console.log(num.toString(8)); // 输出8进制：12 ` |
|  6.  |         valueOf()返回一个 Number 对象的原始数字值。          | `var num = new Number(10);  console.log(num.valueOf()); // 输出：10` |

# TypeScript String（字符串）

String 对象用于处理文本（字符串）。

**语法**

```
var txt = new String("string");
或者更简单方式：
var txt = "string";
```

## String 对象属性

下表列出了 String 对象支持的属性：

| 序号 |              属性 & 描述              |                             实例                             |
| :--: | :-----------------------------------: | :----------------------------------------------------------: |
|  1.  | constructor对创建该对象的函数的引用。 | `var str = new String( "This is string" );  console.log("str.constructor is:" + str.constructor)`输出结果：`str.constructor is:function String() { [native code] }` |
|  2.  |       length返回字符串的长度。        | `var uname = new String("Hello World")  console.log("Length "+uname.length)  // 输出 11` |
|  3.  | prototype允许您向对象添加属性和方法。 | `function employee(id:number,name:string) {     this.id = id     this.name = name  }  var emp = new employee(123,"admin")  employee.prototype.email="admin@runoob.com" // 添加属性 email console.log("员工号: "+emp.id)  console.log("员工姓名: "+emp.name)  console.log("员工邮箱: "+emp.email)` |

## String 方法

下表列出了 String 对象支持的方法：

| 序号 | 方法 & 描述                                                  | 实例                                                         |
| :--: | :----------------------------------------------------------- | :----------------------------------------------------------- |
|  1.  | charAt()返回在指定位置的字符。                               | `var str = new String("RUNOOB"); `                                                                                                                      `console.log("str.charAt(0) 为:" + str.charAt(0)); // R`                                                                                             ` console.log("str.charAt(1) 为:" + str.charAt(1)); // U`                                                                        `console.log("str.charAt(2) 为:" + str.charAt(2)); // N`                                                                                    `console.log("str.charAt(3) 为:" + str.charAt(3)); // O`                                                                                                                                  `console.log("str.charAt(4) 为:" + str.charAt(4)); // O`                                                                                                      `console.log("str.charAt(5) 为:" + str.charAt(5)); // B ` |
|  2.  | charCodeAt()返回在指定的位置的字符的 Unicode 编码。          | `var str = new String("RUNOOB");`                                                                                                                                                                                                                                                                            `console.log("str.charCodeAt(0) 为:" + str.charCodeAt(0)); // 82`                                                                                                           `console.log("str.charCodeAt(1) 为:" + str.charCodeAt(1)); // 85`                          `console.log("str.charCodeAt(2) 为:" + str.charCodeAt(2)); // 78`                                                                                                          `console.log("str.charCodeAt(3) 为:" + str.charCodeAt(3)); // 79 `                                                                                                                                            `console.log("str.charCodeAt(4) 为:" + str.charCodeAt(4)); // 79`                          `console.log("str.charCodeAt(5) 为:" + str.charCodeAt(5)); // 66 ` |
|  3.  | concat()连接两个或更多字符串，并返回新的字符串。             | `var str1 = new String( "RUNOOB" );`                                                                                                                                                  `var str2 = new String( "GOOGLE" );`                                                                                                                                                       `var str3 = str1.concat( str2 );`                                                                                                                                                `console.log("str1 + str2 : "+str3) // RUNOOBGOOGLE ` |
|  4.  | indexOf()返回某个指定的字符串值在字符串中首次出现的位置。    | `var str1 = new String( "RUNOOB" );`                                                                                                                                                                  `var index = str1.indexOf( "OO" );`                                                                                                                               `console.log("查找的字符串位置 :" + index );  // 3 ` |
|  5.  | lastIndexOf()从后向前搜索字符串，并从起始位置（0）开始计算返回字符串最后出现的位置。 | `var str1 = new String( "This is string one and again string" );`                                                                             `var index = str1.lastIndexOf( "string" ); `                                                                                                             `console.log("lastIndexOf 查找到的最后字符串位置 :" + index ); // 29`                                                                             `index = str1.lastIndexOf( "one" );`                                                                                                  `console.log("lastIndexOf 查找到的最后字符串位置 :" + index ); // 15 ` |
|  6.  | localeCompare()用本地特定的顺序来比较两个字符串。            | `var str1 = new String( "This is beautiful string" );`                                                                                                       var index = str1.localeCompare( "This is beautiful string");   console.log("localeCompare first :" + index );  // 0 ` |
|  7.  | **match()**查找找到一个或多个正则表达式的匹配。              | `var str="The rain in SPAIN stays mainly in the plain";  var n=str.match(/ain/g);  // ain,ain,ain ` |
|  8.  | replace()替换与正则表达式匹配的子串                          | `var re = /(\w+)\s(\w+)/;  var str = "zara ali";  var newstr = str.replace(re, "$2, $1");  console.log(newstr); // ali, zara ` |
|  9.  | search()检索与正则表达式相匹配的值                           | `var re = /apples/gi;  var str = "Apples are round, and apples are juicy."; if (str.search(re) == -1 ) {    console.log("Does not contain Apples" );  } else {    console.log("Contains Apples" );  }  ` |
| 10.  | slice()提取字符串的片断，并在新的字符串中返回被提取的部分。  |                                                              |
| 11.  | split()把字符串分割为子字符串数组。                          | `var str = "Apples are round, and apples are juicy.";  var splitted = str.split(" ", 3);  console.log(splitted)  // [ 'Apples', 'are', 'round,' ] ` |
| 12.  | substr()从起始索引号提取字符串中指定数目的字符。             |                                                              |
| 13.  | substring()提取字符串中两个指定的索引号之间的字符。          | `var str = "RUNOOB GOOGLE TAOBAO FACEBOOK";  console.log("(1,2): "    + str.substring(1,2));   // U console.log("(0,10): "   + str.substring(0, 10)); // RUNOOB GOO console.log("(5): "      + str.substring(5));     // B GOOGLE TAOBAO FACEBOOK ` |
| 14.  | toLocaleLowerCase()根据主机的语言环境把字符串转换为小写，只有几种语言（如土耳其语）具有地方特有的大小写映射。 | `var str = "Runoob Google";  console.log(str.toLocaleLowerCase( ));  // runoob google ` |
| 15.  | toLocaleUpperCase()据主机的语言环境把字符串转换为大写，只有几种语言（如土耳其语）具有地方特有的大小写映射。 | `var str = "Runoob Google";  console.log(str.toLocaleUpperCase( ));  // RUNOOB GOOGLE ` |
| 16.  | toLowerCase()把字符串转换为小写。                            | `var str = "Runoob Google";  console.log(str.toLowerCase( ));  // runoob google ` |
| 17.  | toString()返回字符串。                                       | `var str = "Runoob";  console.log(str.toString( )); // Runoob ` |
| 18.  | toUpperCase()把字符串转换为大写。                            | `var str = "Runoob Google";  console.log(str.toUpperCase( ));  // RUNOOB GOOGLE ` |
| 19.  | valueOf()返回指定字符串对象的原始值。                        | `var str = new String("Runoob");  console.log(str.valueOf( ));  // Runoob` |

# TypeScript Array(数组)

数组对象是使用单独的变量名来存储一系列的值。

数组非常常用。

假如你有一组数据（例如：网站名字），存在单独变量如下所示：

var site1="Google"; var site2="Runoob"; var site3="Taobao";

如果有 10 个、100 个这种方式就变的很不实用，这时我们可以使用数组来解决：

var sites:string[];  sites = ["Google","Runoob","Taobao"]

这样看起来就简洁多了。

TypeScript 声明数组的语法格式如下所示：

```
var array_name[:datatype];        //声明 
array_name = [val1,val2,valn..]   //初始化
```

或者直接在声明时初始化：

```
var array_name[:data type] = [val1,val2…valn]
```

如果数组声明时未设置类型，则会被认为是 any 类型，在初始化时根据第一个元素的类型来推断数组的类型。

**实例**

创建一个 number 类型的数组：

```
var numlist:number[] = [2,4,6,8]
```

索引值第一个为 0，我们可以根据索引值来访问数组元素：

```tsx
var sites:string[]; 
sites = ["Google","Runoob","Taobao"] 
console.log(sites[0]); 
console.log(sites[1]);
```

编译以上代码，得到以下 JavaScript 代码：

```js
var sites;
sites = ["Google", "Runoob", "Taobao"];
console.log(sites[0]);
console.log(sites[1]);
```

输出结果为：

```
Google
Runoob
```

以下实例我们在声明时直接初始化：

```tsx
var nums:number[] = [1,2,3,4] 
console.log(nums[0]); 
console.log(nums[1]); 
console.log(nums[2]); 
console.log(nums[3]);
```

输出结果为：

```
1 
2 
3 
4 
```

## Array 对象

我们也可以使用 Array 对象创建数组。

Array 对象的构造函数接受以下两种值：

- 表示数组大小的数值。
- 初始化的数组列表，元素使用逗号分隔值。

**实例**

指定数组初始化大小：

```tsx
var arr_names:number[] = new Array(4)  
 
for(var i = 0; i<arr_names.length; i++) { 
        arr_names[i] = i * 2 
        console.log(arr_names[i]) 
}
```

编译以上代码，得到以下 JavaScript 代码：

```js
var arr_names = new Array(4);
for (var i = 0; i < arr_names.length; i++) {
        arr_names[i] = i * 2;
        console.log(arr_names[i]);
}
```

输出结果为：

```
0
2
4
6
```

以下实例我们直接初始化数组元素：

```tsx
var sites:string[] = new Array("Google","Runoob","Taobao","Facebook") 
 
for(var i = 0;i<sites.length;i++) { 
        console.log(sites[i]) 
}
```

编译以上代码，得到以下 JavaScript 代码：

```js
var sites = new Array("Google", "Runoob", "Taobao", "Facebook");
for (var i = 0; i < sites.length; i++) {
        console.log(sites[i]);
}
```

## 数组解构

我们也可以把数组元素赋值给变量，如下所示：

```tsx
var arr:number[] = [12,13] 
var[x,y] = arr // 将数组的两个元素赋值给变量 x 和 y
console.log(x) 
console.log(y)
```

编译以上代码，得到以下 JavaScript 代码：

```js
var arr = [12, 13];
var x = arr[0], y = arr[1]; // 将数组的两个元素赋值给变量 x 和 y
console.log(x);
console.log(y);
```

输出结果为：

```
12
13
```

## 数组迭代

我们可以使用 for 语句来循环输出数组的各个元素：

```tsx
var j:any; 
var nums:number[] = [1001,1002,1003,1004] 
 
for(j in nums) { 
    console.log(nums[j]) 
}
```

编译以上代码，得到以下 JavaScript 代码：

```js
var j;
var nums = [1001, 1002, 1003, 1004];
for (j in nums) {
    console.log(nums[j]);
}
```

输出结果为：

```
1001
1002
1003
1004
```

## 多维数组

一个数组的元素可以是另外一个数组，这样就构成了多维数组（Multi-dimensional Array）。

最简单的多维数组是二维数组，定义方式如下：

```
var arr_name:datatype[][]=[ [val1,val2,val3],[v1,v2,v3] ]
```

**实例**

定义一个二维数组，每一个维度的数组有三个元素。

```tsx
var multi:number[][] = [[1,2,3],[23,24,25]]  
console.log(multi[0][0]) 
console.log(multi[0][1]) 
console.log(multi[0][2]) 
console.log(multi[1][0]) 
console.log(multi[1][1]) 
console.log(multi[1][2])
```

编译以上代码，得到以下 JavaScript 代码：

```js
var multi = [[1, 2, 3], [23, 24, 25]];
console.log(multi[0][0]);
console.log(multi[0][1]);
console.log(multi[0][2]);
console.log(multi[1][0]);
console.log(multi[1][1]);
console.log(multi[1][2]);
```

输出结果为：

```
1
2
3
23
24
25
```

## 数组在函数中的使用

### 作为参数传递给函数

```tsx
var sites:string[] = new Array("Google","Runoob","Taobao","Facebook") 
 
function disp(arr_sites:string[]) {
        for(var i = 0;i<arr_sites.length;i++) { 
                console.log(arr_sites[i]) 
        }  
}  
disp(sites);
```

输出结果为：

```
Google
Runoob
Taobao
Facebook
```

### 作为函数的返回值

```tsx
function disp():string[] { 
        return new Array("Google", "Runoob", "Taobao", "Facebook");
} 
 
var sites:string[] = disp() 
for(var i in sites) { 
        console.log(sites[i]) 
}
```

输出结果为：

```
Google
Runoob
Taobao
Facebook
```

# TypeScript 元组

我们知道数组中元素的数据类型都一般是相同的（any[] 类型的数组可以不同），如果存储的元素数据类型不同，则需要使用元组。

元组中允许存储不同类型的元素，元组可以作为参数传递给函数。

创建元组的语法格式如下：

```
var tuple_name = [value1,value2,value3,…value n]
```

**实例**

声明一个元组并初始化：

```
var mytuple = [10,"Runoob"];
```

或者我们可以先声明一个空元组，然后再初始化：

```
var mytuple = []; 
mytuple[0] = 120 
mytuple[1] = 234
```

## 访问元组

元组中元素使用索引来访问，第一个元素的索引值为 0，第二个为 1，以此类推第 n 个为 n-1，语法格式如下:

```
tuple_name[index]
```

**实例**

以下实例定义了元组，包含了数字和字符串两种类型的元素：

```tsx
var mytuple = [10,"Runoob"]; // 创建元组
console.log(mytuple[0]) 
console.log(mytuple[1])
```

输出结果为：

```
10
Runoob
```

## 元组运算

我们可以使用以下两个函数向元组添加新元素或者删除元素：

- push() 向元组添加元素，添加在最后面。
- pop() 从元组中移除元素（最后一个），并返回移除的元素。

```tsx
var mytuple = [10,"Hello","World","typeScript"]; 
console.log("添加前元素个数："+mytuple.length)    // 返回元组的大小
 
mytuple.push(12)                                    // 添加到元组中
console.log("添加后元素个数："+mytuple.length) 
console.log("删除前元素个数："+mytuple.length) 
console.log(mytuple.pop()+" 元素从元组中删除") // 删除并返回删除的元素
        
console.log("删除后元素个数："+mytuple.length)
```

输出结果为：

```
添加前元素个数：4
添加后元素个数：5
删除前元素个数：5
12 元素从元组中删除
删除后元素个数：4
```

## 更新元组

元组是可变的，这意味着我们可以对元组进行更新操作：

```tsx
var mytuple = [10, "Runoob", "Taobao", "Google"]; // 创建一个元组
console.log("元组的第一个元素为：" + mytuple[0]) 
 
// 更新元组元素
mytuple[0] = 121     
console.log("元组中的第一个元素更新为："+ mytuple[0])
```

输出结果为：

```
元组的第一个元素为：10
元组中的第一个元素更新为：121
```

## 解构元组

我们也可以把元组元素赋值给变量，如下所示：

```tsx
var a =[10,"Runoob"] 
var [b,c] = a 
console.log( b )    
console.log( c )
```

输出结果为：

```
10
Runoob
```

# TypeScript 联合类型

联合类型（Union Types）可以通过管道(|)将变量设置多种类型，赋值时可以根据设置的类型来赋值。

**注意**：只能赋值指定的类型，如果赋值其它类型就会报错。

创建联合类型的语法格式如下：

```
Type1|Type2|Type3 
```

**实例**

声明一个联合类型：

```tsx
var val:string|number 
val = 12 
console.log("数字为 "+ val) 
val = "Runoob" 
console.log("字符串为 " + val)
```

编译以上代码，得到以下 JavaScript 代码：

```js
var val;
val = 12;
console.log("数字为 " + val);
val = "Runoob";
console.log("字符串为 " + val);
```

输出结果为：

```
数字为 12
字符串为 Runoob
```

如果赋值其它类型就会报错：

```
var val:string|number 
val = true 
```

也可以将联合类型作为函数参数使用：

```tsx
function disp(name:string|string[]) { 
        if(typeof name == "string") { 
                console.log(name) 
        } else { 
                var i; 
                for(i = 0;i<name.length;i++) { 
                console.log(name[i])
                } 
        } 
} 
disp("Runoob") 
console.log("输出数组....") 
disp(["Runoob","Google","Taobao","Facebook"])
```

编译以上代码，得到以下 JavaScript 代码：

```js
function disp(name) {
        if (typeof name == "string") {
                console.log(name);
        }
        else {
                var i;
                for (i = 0; i < name.length; i++) {
                console.log(name[i]);
                }
        }
}
disp("Runoob");
console.log("输出数组....");
disp(["Runoob", "Google", "Taobao", "Facebook"]);
```

输出结果为：

```
Runoob
输出数组....
Runoob
Google
Taobao
Facebook
```

------

## 联合类型数组

我们也可以将数组声明为联合类型：

```tsx
var arr:number[]|string[]; 
var i:number; 
arr = [1,2,4] 
console.log("**数字数组**")  
 
for(i = 0;i<arr.length;i++) { 
   console.log(arr[i]) 
}  
 
arr = ["Runoob","Google","Taobao"] 
console.log("**字符串数组**")  
 
for(i = 0;i<arr.length;i++) { 
   console.log(arr[i]) 
}
```

编译以上代码，得到以下 JavaScript 代码：

```js
var arr;
var i;
arr = [1, 2, 4];
console.log("**数字数组**");
for (i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}
arr = ["Runoob", "Google", "Taobao"];
console.log("**字符串数组**");
for (i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}
```

输出结果为：

```
**数字数组**
1
2
4
**字符串数组**
Runoob
Google
Taobao
```

