# 语法

```js
var txt = new String("string");
//或者更简单方式：
var txt = "string";
```

# 属性

| 属性                                                         | 描述                       |
| ------------------------------------------------------------ | -------------------------- |
| [constructor](https://www.runoob.com/jsref/jsref-constructor-string.html) | 对创建该对象的函数的引用   |
| [length](https://www.runoob.com/jsref/jsref-length-string.html) | 字符串的长度               |
| [prototype](https://www.runoob.com/jsref/jsref-prototype-string.html) | 允许您向对象添加属性和方法 |

# 方法

## charAt()：返回在指定位置的字符

charAt() 方法可返回指定位置的字符。

第一个字符位置为 0, 第二个字符位置为 1,以此类推。

**语法**

```js
string.charAt(index)
```

**参数值**

| 参数    | 描述                                                       |
| ------- | ---------------------------------------------------------- |
| *index* | 必需。表示字符串中某个位置的数字，即字符在字符串中的位置。 |

**返回值**

| 类型   | 描述                   |
| ------ | ---------------------- |
| String | 返回在指定位置的字符。 |

## concat()：连接两个或更多字符串，并返回新的字符串

concat() 方法用于连接两个或多个字符串。

该方法没有改变原有字符串，但是会返回连接两个或多个字符串新字符串。

**语法**

```
string.concat(string1, string2, ..., stringX) 
```

**参数值**

| 参数                                 | 描述                                               |
| ------------------------------------ | -------------------------------------------------- |
| *string1*, *string2*, ..., *stringX* | 必需。将被连接为一个字符串的一个或多个字符串对象。 |

**返回值**

| 类型   | 描述                                   |
| ------ | -------------------------------------- |
| String | 两个或多个字符串连接后生成的新字符串。 |

**示例**

```js
var str1="Hello ";
var str2="world!";
var str3=" Have a nice day!";
var n = str1.concat(str2,str3);
```

```
Hello world! Have a nice day!
```

## match()：查找找到一个或多个正则表达式的匹配

match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。 

**注意：** match() 方法将检索字符串 String Object，以找到一个或多个与 regexp 匹配的文本。这个方法的行为在很大程度上有赖于 regexp 是否具有标志 g。如果 regexp 没有标志 g，那么 match() 方法就只能在 stringObject 中执行一次匹配。如果没有找到任何匹配的文本， match() 将返回 null。否则，它将返回一个数组，其中存放了与它找到的匹配文本有关的信息。 

**语法**

```js
string.match(regexp)
```

**参数值**

| 参数     | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| *regexp* | 必需。规定要匹配的模式的 RegExp 对象。如果该参数不是 RegExp 对象，则需要首先把它传递给 RegExp 构造函数，将其转换为 RegExp 对象。 |

**返回值**

| 类型  | 描述                                                         |
| ----- | ------------------------------------------------------------ |
| Array | 存放匹配结果的数组。该数组的内容依赖于 regexp 是否具有全局标志 g。 如果没找到匹配结果返回 *null* 。 |

**示例**

```js
var str="The rain in SPAIN stays mainly in the plain"; 
var n=str.match(/ain/gi);
```

```
["ain", "AIN", "ain", "ain"]
```

## search()：查找与正则表达式相匹配的值

search() 方法用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串。

如果没有找到任何匹配的子串，则返回 -1。

**语法**

```js
string.search(searchvalue)
```

**参数值**

| 参数          | 描述                               |
| ------------- | ---------------------------------- |
| *searchvalue* | 必须。查找的字符串或者正则表达式。 |

**返回值**

| 类型   | 描述                                                         |
| ------ | ------------------------------------------------------------ |
| Number | 与指定查找的字符串或者正则表达式相匹配的 String 对象起始位置。 |

**示例**

```js
var str="Mr. Blue has a blue house";
document.write(str.search("blue"));		// 15
```

```js
var str="Mr. Blue has a blue house";
document.write(str.search(/blue/i));	// 4
```

## startsWith() ：查看字符串是否以指定的子字符串开头 

startsWith() 方法用于检测字符串是否以指定的子字符串开始。

如果是以指定的子字符串开头返回 true，否则 false。

startsWith() 方法对大小写敏感。

**语法**

```
string.startsWith(searchvalue, start)
```

**参数值**

| 参数          | 描述                             |
| ------------- | -------------------------------- |
| *searchvalue* | 必需，要查找的字符串。           |
| *start*       | 可选，查找的开始位置，默认为 0。 |

**返回值**

| 类型    | 描述                                                    |
| ------- | ------------------------------------------------------- |
| Boolean | 如果字符串是以指定的子字符串开头返回 true，否则 false。 |

**示例**

```js
var str = "Hello world, welcome to the Runoob.";
var n = str.startsWith("world", 6);		// true
```

## substr()：从起始索引号提取字符串中指定数目的字符

substr() 方法可在字符串中抽取从 *开始* 下标开始的指定数目的字符。

**提示：** substr() 的参数指定的是子串的开始位置和长度，因此它可以替代 substring() 和 slice() 来使用。

**注意：** substr() 方法不会改变源字符串。 

**语法**

```
string.substr(start,length)
```

**参数值**

| 参数     | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| *start*  | 必需。要抽取的子串的起始下标。必须是数值。如果是负数，那么该参数声明从字符串的尾部开始算起的位置。也就是说，-1 指字符串中最后一个字符，-2 指倒数第二个字符，以此类推。 |
| *length* | 可选。子串中的字符数。必须是数值。如果省略了该参数，那么返回从 stringObject 的开始位置到结尾的字串。 |

**返回值**

| 类型   | 描述                                                   |
| ------ | ------------------------------------------------------ |
| String | A new string containing the extracted part of the text |

**示例**

```js
var str="Hello world!";
var n=str.substr(2);	// llo world!
```

## slice() ：提取字符串的片断，并在新的字符串中返回被提取的部分

slice(start, end) 方法可提取字符串的某个部分，并以新的字符串返回被提取的部分。

使用 start（包含） 和 end（不包含） 参数来指定字符串提取的部分。

字符串中第一个字符位置为 0, 第二个字符位置为 1, 以此类推。

**提示：** 如果是负数，则该参数规定的是从字符串的尾部开始算起的位置。也就是说，-1 指字符串的最后一个字符，-2 指倒数第二个字符，以此类推。

**语法**

```js
newstring = string.slice(start,end)
```

**参数值**

| 参数    | 描述                                                         |
| ------- | ------------------------------------------------------------ |
| *start* | 必须. 要抽取的片断的起始下标。第一个字符位置为 0             |
| *end*   | 可选。 紧接着要截取的片段结尾的下标。若未指定此参数，则要提取的子串包括 start 到原字符串结尾的字符串。如果该参数是负数，那么它规定的是从字符串的尾部开始算起的位置。 |

**返回值**

| 类型   | 描述         |
| ------ | ------------ |
| String | 提取的字符串 |

**示例**

提取所有字符串:

```js
var str="Hello world!";
var n=str.slice(0);
```

```
Hello world!
```

从字符串的第3个位置提取剩余字符串:

```js
var str="Hello world!";
var n=str.slice(3);
```

```
lo world!
```

从字符串的第3个位置到第8个位置直接的字符串:

```js
var str="Hello world!";
var n=str.slice(3,8);
```

```
lo wo
```

提取最后一个字符:

```js
var str="Hello world!";
var n=str.slice(-1);
```

```
!
```

## [substring()](https://www.runoob.com/jsref/jsref-substring.html) ： 提取字符串中两个指定的索引号之间的字符

substring() 方法用于提取字符串中介于两个指定下标之间的字符。

substring() 方法返回的子串包括 *开始* 处的字符，但不包括 *结束* 处的字符。

**语法**

```
string.substring(from, to)
```

**参数值**

| 参数 | 描述                                                         |
| ---- | ------------------------------------------------------------ |
| from | 必需。一个非负的整数，规定要提取的子串的第一个字符在 string Object 中的位置。 |
| to   | 可选。一个非负的整数，比要提取的子串的最后一个字符在 string Object 中的位置多 1。 如果省略该参数，那么返回的子串会一直到字符串的结尾。 |

**返回值**

| 类型   | 描述         |
| ------ | ------------ |
| String | 提取的字符串 |

**示例**

```js
var str="Hello world!";
document.write(str.substring(3)+"<br>");
document.write(str.substring(3,7));
```

```
lo world!
lo w
```

## includes()：查找字符串中是否包含指定的子字符串 

includes() 方法用于判断字符串是否包含指定的子字符串。

如果找到匹配的字符串则返回 true，否则返回 false。

**注意：** includes() 方法区分大小写。

**语法**

```
string.includes(searchvalue, start)
```

**参数值**

| 参数          | 描述                                     |
| ------------- | ---------------------------------------- |
| *searchvalue* | 必需，要查找的字符串。                   |
| *start*       | 可选，设置从那个位置开始查找，默认为 0。 |

**返回值**

| 类型    | 描述                                            |
| ------- | ----------------------------------------------- |
| Boolean | 如果找到匹配的字符串返回 true，否则返回 false。 |

**示例**

从第 12 个索引位置开始查找字符串:

```js
var str = "Hello world, welcome to the Runoob.";
var n = str.includes("world", 12);
```

```
false
```

## replace()：在字符串中查找匹配的子串， 并替换与正则表达式匹配的子串

replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。

该方法不会改变原始字符串。

**语法**

```js
newstring = string.replace(searchvalue,newvalue)
```

**参数值**

| 参数          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| *searchvalue* | 必须。规定子字符串或要替换的模式的 RegExp 对象。 请注意，如果该值是一个字符串，则将它作为要检索的直接量文本模式，而不是首先被转换为 RegExp 对象。 |
| *newvalue*    | 必需。一个字符串值。规定了替换文本或生成替换文本的函数。     |

**返回值**

| 类型   | 描述                                                         |
| ------ | ------------------------------------------------------------ |
| String | 一个新的字符串，是用 replacement 替换了 regexp 的第一次匹配或所有匹配之后得到的。 |

**示例**

执行一个全局替换:

```js
var str="Mr Blue has a blue house and a blue car";
var n=str.replace(/blue/g,"red");
```

```
Mr Blue has a red house and a red car
```

通过 prototype 为 JavaScript 的 String 对象添加方法，来实现将所有 "Microsoft" 替换为 "Runoob"：

```js
String.prototype.replaceAll = function(search, replacement) {
	var target = this;     
	return target.replace(new RegExp(search, 'g'), replacement); 
};
```

## repeat()：复制字符串指定次数，并将它们连接在一起返回 

repeat() 方法字符串复制指定次数。 

**语法**

```
string.repeat(count)
```

**参数值**

| 参数    | 描述                     |
| ------- | ------------------------ |
| *count* | 必需，设置要复制的次数。 |

**返回值**

| 类型   | 描述                                   |
| ------ | -------------------------------------- |
| String | 返回复制指定次数并连接在一起的字符串。 |

**示例**

复制字符串 "Runoob" 两次:

```js
var str = "Runoob";
str.repeat(2);
```

```
RunoobRunoob
```

