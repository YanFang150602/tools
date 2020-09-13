

字符串广泛应用 在 Java 编程中，在 Java 中字符串属于对象，Java 提供了 String 类来创建和操作字符串。

# 创建字符串

创建字符串最简单的方式如下:

```java
String greeting = "菜鸟教程";
```

在代码中遇到字符串常量时，这里的值是 "**菜鸟教程**""，编译器会使用该值创建一个 String 对象。

和其它对象一样，可以使用关键字和构造方法来创建 String 对象。

String 类有 11 种构造方法，这些方法提供不同的参数来初始化字符串，比如提供一个字符数组参数:

```java
public class StringDemo{
   public static void main(String args[]){
      char[] helloArray = { 'r', 'u', 'n', 'o', 'o', 'b'};
      String helloString = new String(helloArray);  
      System.out.println( helloString );
   }
}
```

```
runoob
```

**注意:**String 类是不可改变的，所以你一旦创建了 String 对象，那它的值就无法改变了（详看笔记部分解析）。

如果需要对字符串做很多修改，那么应该选择使用 [StringBuffer & StringBuilder 类](https://www.runoob.com/java/java-stringbuffer.html)。

# 方法

## `indexOf()` 方法

indexOf() 方法有以下四种形式：

- **public int indexOf(int ch):** 返回指定字符在字符串中第一次出现处的索引，如果此字符串中没有这样的字符，则返回 -1。
- **public int indexOf(int ch, int fromIndex):** 返回从 fromIndex 位置开始查找指定字符在字符串中第一次出现处的索引，如果此字符串中没有这样的字符，则返回 -1。
- **int indexOf(String str):** 返回指定字符在字符串中第一次出现处的索引，如果此字符串中没有这样的字符，则返回 -1。
- **int indexOf(String str, int fromIndex):** 返回从 fromIndex 位置开始查找指定字符在字符串中第一次出现处的索引，如果此字符串中没有这样的字符，则返回 -1。

**语法**

```
public int indexOf(int ch )

或

public int indexOf(int ch, int fromIndex)

或

int indexOf(String str)

或

int indexOf(String str, int fromIndex)
```

**参数**

- **ch** -- 字符，Unicode 编码。
- **fromIndex** -- 开始搜索的索引位置，第一个字符是 0 ，第二个是 1 ，以此类推。
- **str** -- 要搜索的子字符串。

**返回值**

查找字符串，或字符 Unicode 编码在字符串出现的位置:

**实例**

```java
public class Main {
    public static void main(String args[]) {
        String string = "aaa456ac";  
        //查找指定字符是在字符串中的下标。在则返回所在字符串下标；不在则返回-1.  
        System.out.println(string.indexOf("b")); // indexOf(String str); 返回结果：-1，"b"不存在  
 
        // 从第四个字符位置开始往后继续查找，包含当前位置  
        System.out.println(string.indexOf("a",3));//indexOf(String str, int fromIndex); 返回结果：6  
 
        //（与之前的差别：上面的参数是 String 类型，下面的参数是 int 类型）参考数据：a-97,b-98,c-99  
 
        // 从头开始查找是否存在指定的字符  
        System.out.println(string.indexOf(99));//indexOf(int ch)；返回结果：7  
        System.out.println(string.indexOf('c'));//indexOf(int ch)；返回结果：7  
 
        //从fromIndex查找ch，这个是字符型变量，不是字符串。字符a对应的数字就是97。  
        System.out.println(string.indexOf(97,3));//indexOf(int ch, int fromIndex); 返回结果：6  
        System.out.println(string.indexOf('a',3));//indexOf(int ch, int fromIndex); 返回结果：6  
    }
}
```

```
-1
6
7
7
6
6
```

指定子字符串在字符串中第一次出现处的索引，从指定的索引开始。

```java
public class Test {
    public static void main(String args[]) {
        String Str = new String("菜鸟教程:www.runoob.com");
        String SubStr1 = new String("runoob");
        String SubStr2 = new String("com");
 
        System.out.print("查找字符 o 第一次出现的位置 :" );
        System.out.println(Str.indexOf( 'o' ));
        System.out.print("从第14个位置查找字符 o 第一次出现的位置 :" );
        System.out.println(Str.indexOf( 'o', 14 ));
        System.out.print("子字符串 SubStr1 第一次出现的位置:" );
        System.out.println( Str.indexOf( SubStr1 ));
        System.out.print("从第十五个位置开始搜索子字符串 SubStr1 第一次出现的位置 :" );
        System.out.println( Str.indexOf( SubStr1, 15 ));
        System.out.print("子字符串 SubStr2 第一次出现的位置 :" );
        System.out.println(Str.indexOf( SubStr2 ));
    }
}
```

```
查找字符 o 第一次出现的位置 :12
从第14个位置查找字符 o 第一次出现的位置 :17
子字符串 SubStr1 第一次出现的位置:9
从第十五个位置开始搜索子字符串 SubStr1 第一次出现的位置 :-1
子字符串 SubStr2 第一次出现的位置 :16
```

## `length()`字符串长度

用于获取有关对象的信息的方法称为访问器方法。

String 类的一个访问器方法是 length() 方法，它返回字符串对象包含的字符数。

```java
public class StringDemo {
    public static void main(String args[]) {
        String site = "www.runoob.com";
        int len = site.length();
        System.out.println( "菜鸟教程网址长度 : " + len );
   }
}
```

```
菜鸟教程网址长度 : 14
```

## `concat()`连接字符串

String 类提供了连接两个字符串的方法：

```java
string1.concat(string2);
```

返回 string2 连接 string1 的**新字符串**。也可以对字符串常量使用 concat() 方法，如：

```java
"我的名字是 ".concat("Runoob");
```

更常用的是使用`+`操作符来连接字符串，如：

```java
"Hello," + " runoob" + "!"
```

```
"Hello, runoob!"
```

## `charAt(int index)` 返回指定索引处的 char 值

## startsWith() 方法用于检测字符串是否以指定的前缀开始。

**语法**

```
public boolean startsWith(String prefix, int toffset)

或

public boolean startsWith(String prefix)
```

**参数**

prefix -- 前缀。

toffset -- 字符串中开始查找的位置。

**返回值**

如果字符串以指定的前缀开始，则返回 true；否则返回 false。

**实例**

```java
public class Test {
    public static void main(String args[]) {
        String Str = new String("www.runoob.com");

        System.out.print("返回值 :" );
        System.out.println(Str.startsWith("www") );
     
        System.out.print("返回值 :" );
        System.out.println(Str.startsWith("runoob") );
     
        System.out.print("返回值 :" );
        System.out.println(Str.startsWith("runoob", 4) );
    }

}
```

```
返回值 :true
返回值 :false
返回值 :true
```

## `endsWith(String suffix)`测试此字符串是否以指定的后缀结束

## `equals()` 用于将字符串与指定的对象比较

**语法**

```java
public boolean equals(Object anObject)
```

**实例**

```java
public class Test {
    public static void main(String args[]) {
        String Str1 = new String("runoob");
        String Str2 = Str1;
        String Str3 = new String("runoob");
        boolean retVal;

        retVal = Str1.equals( Str2 );
        System.out.println("返回值 = " + retVal );

        retVal = Str1.equals( Str3 );
        System.out.println("返回值 = " + retVal );
    }
}
```

```
返回值 = true
返回值 = true
```

## equalsIgnoreCase() 方法用于将字符串与指定的对象比较，不考虑大小写

**语法**

```
public boolean equalsIgnoreCase(String anotherString)
```

**参数**

- **anObject** -- 与字符串进行比较的对象。

**返回值**

如果给定对象与字符串相等，则返回 true；否则返回 false。

**实例**

```java
public class Test {
    public static void main(String args[]) {
        String Str1 = new String("runoob");
        String Str2 = Str1;
        String Str3 = new String("runoob");
        String Str4 = new String("RUNOOB");
        boolean retVal;

        retVal = Str1.equals( Str2 );
        System.out.println("返回值 = " + retVal );

        retVal = Str3.equals( Str4);
        System.out.println("返回值 = " + retVal );

        retVal = Str1.equalsIgnoreCase( Str4 );
        System.out.println("返回值 = " + retVal );
    }
}
```

```
返回值 = true
返回值 = false
返回值 = true
```

## getBytes()使用平台的默认字符集将此 String 编码为 byte 序列，并将结果存储到一个新的 byte 数组中

getBytes() 方法有两种形式：

- getBytes(String charsetName): 使用指定的字符集将字符串编码为 byte 序列，并将结果存储到一个新的 byte 数组中。


- getBytes(): 使用平台的默认字符集将字符串编码为 byte 序列，并将结果存储到一个新的 byte 数组中。


**语法**

```
public byte[] getBytes(String charsetName) throws UnsupportedEncodingException

或

public byte[] getBytes()
```

**参数**
charsetName -- 支持的字符集名称。

参数
charsetName -- 支持的字符集名称。

**返回值**
返回 byte 数组。

**实例**

```java
import java.io.*;

public class Test {
    public static void main(String args[]) {
        String Str1 = new String("runoob");

        try{
            byte[] Str2 = Str1.getBytes();
            System.out.println("返回值：" + Str2 );
            
            Str2 = Str1.getBytes( "UTF-8" );
            System.out.println("返回值：" + Str2 );
            
            Str2 = Str1.getBytes( "ISO-8859-1" );
            System.out.println("返回值：" + Str2 );
        } catch ( UnsupportedEncodingException e){
            System.out.println("不支持的字符集");
        }
    }

}
```

```
返回值：[B@7852e922
返回值：[B@4e25154f
返回值：[B@70dea4e
```

## getChars() 方法将字符从字符串复制到目标字符数组

**语法**

```
public void getChars(int srcBegin, int srcEnd, char[] dst,  int dstBegin)
```

**参数**

srcBegin -- 字符串中要复制的第一个字符的索引。

srcEnd -- 字符串中要复制的最后一个字符之后的索引。

dst -- 目标数组。

dstBegin -- 目标数组中的起始偏移量。

**返回值**

没有返回值，但会抛出 IndexOutOfBoundsException 异常。

**实例**

```java
public class Test {
    public static void main(String args[]) {
        String Str1 = new String("www.runoob.com");
        char[] Str2 = new char[6];

        try {
            Str1.getChars(4, 10, Str2, 0);
            System.out.print("拷贝的字符串为：" );
            System.out.println(Str2 );
        } catch( Exception ex) {
            System.out.println("触发异常...");
        }
    }

}
```

```
拷贝的字符串为：runoob
```

## hashCode() 方法用于返回字符串的哈希码。

字符串对象的哈希码根据以下公式计算：

```
s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]
```

使用 int 算法，这里 s[i] 是字符串的第 i 个字符，n 是字符串的长度，^ 表示求幂。空字符串的哈希值为 0。

**语法**

```
public int hashCode()
```

**返回值**

返回对象的哈希码值。

**实例**

```java
public class Test {
        public static void main(String args[]) {
                String Str = new String("www.runoob.com");
                System.out.println("字符串的哈希码为 :" + Str.hashCode() );
        }
}
```

```
字符串的哈希码为 :321005537
```

## matches() 方法用于检测字符串是否匹配给定的正则表达式。

调用此方法的 str.matches(regex) 形式与以下表达式产生的结果完全相同：

```
Pattern.matches(regex, str)
```

**语法**
public boolean matches(String regex)
**参数**
regex -- 匹配字符串的正则表达式。

**返回值**
在字符串匹配给定的正则表达式时，返回 true。

**实例**

```java
public class Test {
    public static void main(String args[]) {
        String Str = new String("www.runoob.com");

        System.out.print("返回值 :" );
        System.out.println(Str.matches("(.*)runoob(.*)"));
        
        System.out.print("返回值 :" );
        System.out.println(Str.matches("(.*)google(.*)"));
    
        System.out.print("返回值 :" );
        System.out.println(Str.matches("www(.*)"));
    }

}
```

```
返回值 :true
返回值 :false
返回值 :true
```

## replace() 方法通过用 newChar 字符替换字符串中出现的所有 oldChar 字符，并返回替换后的新字符串。

**语法**

```
public String replace(char oldChar,  char newChar)
```

**参数**

oldChar -- 原字符。

newChar -- 新字符。

**返回值**

替换后生成的新字符串。

**实例**

```java
public class Test {
    public static void main(String args[]) {
        String Str = new String("hello");

        System.out.print("返回值 :" );
        System.out.println(Str.replace('o', 'T'));
    
        System.out.print("返回值 :" );
        System.out.println(Str.replace('l', 'D'));
    }

}
```

```
返回值 :hellT
返回值 :heDDo
```

## replaceAll() 方法使用给定的参数 replacement 替换字符串所有匹配给定的正则表达式的子字符串。

**语法**

```
public String replaceAll(String regex, String replacement)
```

**参数**

regex -- 匹配此字符串的正则表达式。

newChar -- 用来替换每个匹配项的字符串。

**返回值**

成功则返回替换的字符串，失败则返回原始字符串。

**实例**

```java
public class Test {
    public static void main(String args[]) {
        String Str = new String("www.google.com");

        System.out.print("匹配成功返回值 :" );
        System.out.println(Str.replaceAll("(.*)google(.*)", "runoob" ));
        System.out.print("匹配失败返回值 :" );
        System.out.println(Str.replaceAll("(.*)taobao(.*)", "runoob" ));
    }

}
```

```
匹配成功返回值 :runoob
匹配失败返回值 :www.google.com
```

## replaceFirst() 方法使用给定的参数 replacement 替换字符串第一个匹配给定的正则表达式的子字符串。

**语法**

```
public String replaceFirst(String regex, String replacement)
```

**参数**

regex -- 匹配此字符串的正则表达式。

replacement -- 用来替换第一个匹配项的字符串。

**返回值**

成功则返回替换的字符串，失败则返回原始字符串。

**实例**

```java
public class Test {
    public static void main(String args[]) {
        String Str = new String("hello runoob，I am from runoob。");

        System.out.print("返回值 :" );
        System.out.println(Str.replaceFirst("runoob", "google" ));
        System.out.print("返回值 :" );
        System.out.println(Str.replaceFirst("(.*)runoob(.*)", "google" ));
    }

}
```

```
返回值 :hello google，I am from runoob。
返回值 :google
```

## substring() 方法返回字符串的子字符串。

**语法**

```
public String substring(int beginIndex)

或

public String substring(int beginIndex, int endIndex)
```

**参数**

beginIndex -- 起始索引（包括）, 索引从 0 开始。

endIndex -- 结束索引（不包括）。

**返回值**

子字符串。

**实例**

```java
public class Test {
    public static void main(String args[]) {
        String Str = new String("www.runoob.com");

        System.out.print("返回值 :" );
        System.out.println(Str.substring(4) );
     
        System.out.print("返回值 :" );
        System.out.println(Str.substring(4, 10) );
    }

}
```

```
返回值 :runoob.com
返回值 :runoob
```

## `toCharArray()` 方法将字符串转换为字符数组。

**语法**

```
public char[] toCharArray()
```

**返回值**

字符数组。

**实例**

```java
public class Test {
    public static void main(String args[]) {
        String Str = new String("www.runoob.com");

        System.out.print("返回值 :" );
        System.out.println( Str.toCharArray() );
    }

}
```

```
返回值 :www.runoob.com
```



# 静态方法

## `String.format()`：创建格式化字符串

我们知道输出格式化数字可以使用 printf() 和 format() 方法。

String 类使用静态方法 format() 返回一个String 对象而不是 PrintStream 对象。

String 类的静态方法 format() 能用来创建可复用的格式化字符串，而不仅仅是用于一次打印输出。

如下所示：

```java
System.out.printf("浮点型变量的值为 " +
                  "%f, 整型变量的值为 " +
                  " %d, 字符串变量的值为 " +
                  "is %s", floatVar, intVar, stringVar);
```

你也可以这样写

```java
String fs; 
fs = String.format("浮点型变量的值为 " +
                              "%f, 整型变量的值为 " +
                              " %d, 字符串变量的值为 " +
                              " %s", floatVar, intVar, stringVar);
```

