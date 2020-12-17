## 简介

Java.io 包几乎包含了所有操作输入、输出需要的类。所有这些流类代表了输入源和输出目标。

Java.io 包中的流支持很多种格式，比如：基本类型、对象、本地化字符集等等。

一个流可以理解为一个数据的序列。输入流表示从一个源读取数据，输出流表示向一个目标写数据。

Java为I/O 提供了强大的而灵活的支持，使其更广泛地应用到文件传输和网络编程中。

但本节讲述最基本的和流与 I/O 相关的功能。我们将通过一个个例子来学习这些功能。

## 读取控制台输入

Java 的控制台输入由 `System.in` 完成。

为了获得一个绑定到控制台的字符流，你可以把 `System.in` 包装在一个 BufferedReader 对象中来创建一个字符流。

下面是创建 BufferedReader 的基本语法：

```java
BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
```

BufferedReader 对象创建后，我们便可以使用 `read()` 方法从控制台读取一个字符，或者用 `readLine()` 方法读取一个字符串。

## 从控制台读取多字符输入

从 BufferedReader 对象读取一个字符要使用 `read()` 方法，它的语法如下：

```java
int read() throws IOException
```

每次调用 `read()` 方法，它从输入流读取一个字符并把该字符作为整数值返回。 当流结束的时候返回 -1。该方法抛出 IOException。

下面的程序示范了用 `read()` 方法从控制台不断读取字符直到用户输入 "q" 。

```java
// 使用 BufferedReader 在控制台读取字符

import java.io.*;

public class BRRead {
   public static void main(String args[]) throws IOException
   {
      char c;
      // 使用 System.in 创建 BufferedReader 
      BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
      System.out.println("输入字符, 按下 'q' 键退出.");
      // 读取字符
      do {
         c = (char) br.read();
         System.out.println(c);
      } while(c != 'q');
   }
}
```

以上实例编译运行结果如下：

```
输入字符, 按下 'q' 键退出.
123abcq
1
2
3
a
b
c
q
```

## 从控制台读取字符串

从标准输入读取一个字符串需要使用 BufferedReader 的 `readLine()` 方法。

它的一般格式是：

```java
String readLine() throws IOException
```

下面的程序读取和显示字符行直到你输入了单词 "end"。

```java
// 使用 BufferedReader 在控制台读取字符
import java.io.*;
public class BRReadLines {
   public static void main(String args[]) throws IOException
   {
      // 使用 System.in 创建 BufferedReader 
      BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
      String str;
      System.out.println("Enter lines of text.");
      System.out.println("Enter 'end' to quit.");
      do {
         str = br.readLine();
         System.out.println(str);
      } while(!str.equals("end"));
   }
}
```

以上实例编译运行结果如下：

```
Enter lines of text.
Enter 'end' to quit.
This is line one
This is line one
This is line two
This is line two
end
end
```

## 控制台输出

在此前已经介绍过，控制台的输出由 `print()` 和 `println()` 完成。这些方法都由类 PrintStream 定义，`System.out` 是该类对象的一个引用。

PrintStream 继承了 OutputStream 类，并且实现了方法 `write()`。这样，`write()` 也可以用来往控制台写操作。

PrintStream 定义 `write()` 的最简单格式如下所示：

```java
void write(int byteval)
```

该方法将 byteval 的低八位字节写到流中。

下面的例子用 `write()` 把字符 "A" 和紧跟着的换行符输出到屏幕：

```java
import java.io.*;

// 演示 System.out.write().
public class WriteDemo {
   public static void main(String args[]) {
      int b; 
      b = 'A';
      System.out.write(b);
      System.out.write('\n');
   }
}
```

运行以上实例在输出窗口输出 "A" 字符

```
A
```

**注意：**`write()` 方法不经常使用，因为 `print()` 和 `println()` 方法用起来更为方便。

## 文件输入输出流

如前所述，一个流被定义为一个数据序列。输入流用于从源读取数据，输出流用于向目标写数据。

下面将要讨论的两个重要的流是 FileInputStream 和 FileOutputStream：

### FileInputStream

该流用于从文件读取数据，它的对象可以用关键字 new 来创建。

有多种构造方法可用来创建对象。

可以使用字符串类型的文件名来创建一个输入流对象来读取文件：

```java
InputStream f = new FileInputStream("C:/java/hello");
```

也可以使用一个文件对象来创建一个输入流对象来读取文件。我们首先得使用 File() 方法来创建一个文件对象：

```java
File f = new File("C:/java/hello");
InputStream f = new FileInputStream(f);
```

创建了 InputStream 对象，就可以使用下面的方法来读取流或者进行其他的流操作。

| **序号** | **方法及描述**                                               |
| :------- | :----------------------------------------------------------- |
| 1        | **public void close() throws IOException{}** 关闭此文件输入流并释放与此流有关的所有系统资源。抛出 IOException 异常。 |
| 2        | **protected void finalize()throws IOException {}** 这个方法清除与该文件的连接。确保在不再引用文件输入流时调用其 close 方法。抛出 IOException 异常。 |
| 3        | **public int read(int r)throws IOException{}** 这个方法从 InputStream 对象读取指定字节的数据。返回为整数值。返回下一字节数据，如果已经到结尾则返回 -1。 |
| 4        | **public int read(byte[] r) throws IOException{}** 这个方法从输入流读取 `r.length` 长度的字节。返回读取的字节数。如果是文件结尾则返回 -1。 |
| 5        | **public int available() throws IOException{}** 返回下一次对此输入流调用的方法可以不受阻塞地从此输入流读取的字节数。返回一个整数值。 |

### FileOutputStream

该类用来创建一个文件并向文件中写数据。

如果该流在打开文件进行输出前，目标文件不存在，那么该流会创建该文件。

有两个构造方法可以用来创建 FileOutputStream 对象。

使用字符串类型的文件名来创建一个输出流对象：

```java
OutputStream f = new FileOutputStream("C:/java/hello")
```

也可以使用一个文件对象来创建一个输出流来写文件。我们首先得使用 File() 方法来创建一个文件对象：

```java
File f = new File("C:/java/hello");
OutputStream f = new FileOutputStream(f);
```

创建 OutputStream 对象完成后，就可以使用下面的方法来写入流或者进行其他的流操作。

| **序号** | **方法及描述**                                               |
| :------- | :----------------------------------------------------------- |
| 1        | **public void close() throws IOException{}** 关闭此文件输入流并释放与此流有关的所有系统资源。抛出 IOException 异常。 |
| 2        | **protected void finalize()throws IOException {}** 这个方法清除与该文件的连接。确保在不再引用文件输入流时调用其 close 方法。抛出 IOException 异常。 |
| 3        | **public void write(int w)throws IOException{}** 这个方法把指定的字节写到输出流中。 |
| 4        | **public void write(byte[] w)** 把指定数组中 w.length 长度的字节写到 OutputStream 中。 |

### 实例

下面是一个演示 InputStream 和 OutputStream 用法的例子：

```java
import java.io.*;
 
public class fileStreamTest {
    public static void main(String args[]) {
        try {
            byte bWrite[] = { 11, 21, 3, 40, 5 };
            OutputStream os = new FileOutputStream("test.txt");
            for (int x = 0; x < bWrite.length; x++) {
                os.write(bWrite[x]); // writes the bytes
            }
            os.close();
 
            InputStream is = new FileInputStream("test.txt");
            int size = is.available();
 
            for (int i = 0; i < size; i++) {
                System.out.print((char) is.read() + "  ");
            }
            is.close();
        } catch (IOException e) {
            System.out.print("Exception");
        }
    }
}
```

上面的程序首先创建文件 test.txt，并把给定的数字以二进制形式写进该文件，同时输出到控制台上。

以上代码由于是二进制写入，可能存在乱码，你可以使用以下代码实例来解决乱码问题：

```java
//文件名 :fileStreamTest2.java
import java.io.*;

public class fileStreamTest2{
	public static void main(String[] args) throws IOException {
		
		File f = new File("a.txt");
		FileOutputStream fop = new FileOutputStream(f);
		// 构建FileOutputStream对象,文件不存在会自动新建
		
		OutputStreamWriter writer = new OutputStreamWriter(fop, "UTF-8");
		// 构建OutputStreamWriter对象,参数可以指定编码,默认为操作系统默认编码,windows上是gbk
		
		writer.append("中文输入");
		// 写入到缓冲区
		
		writer.append("\r\n");
		//换行
		
		writer.append("English");
		// 刷新缓存冲,写入到文件,如果下面已经没有写入的内容了,直接close也会写入
		
		writer.close();
		//关闭写入流,同时会把缓冲区内容写入文件,所以上面的注释掉
		
		fop.close();
		// 关闭输出流,释放系统资源

		FileInputStream fip = new FileInputStream(f);
		// 构建FileInputStream对象
		
		InputStreamReader reader = new InputStreamReader(fip, "UTF-8");
		// 构建InputStreamReader对象,编码与写入相同

		StringBuffer sb = new StringBuffer();
		while (reader.ready()) {
			sb.append((char) reader.read());
			// 转成char加到StringBuffer对象中
		}
		System.out.println(sb.toString());
		reader.close();
		// 关闭读取流
		
		fip.close();
		// 关闭输入流,释放系统资源

	}
}
```

## 字节数组输入输出流

### ByteArrayInputStream类

字节数组输入流在内存中创建一个字节数组缓冲区，从输入流读取的数据保存在该字节数组缓冲区中。创建字节数组输入流对象有以下几种方式。

接收字节数组作为参数创建：

```java
ByteArrayInputStream bArray = new ByteArrayInputStream(byte [] a);
```

另一种创建方式是接收一个字节数组，和两个整形变量 off、len，off表示第一个读取的字节，len表示读取字节的长度。

```java
ByteArrayInputStream bArray = new ByteArrayInputStream(byte []a, int off, int len)
```

成功创建字节数组输入流对象后，可以参见以下列表中的方法，对流进行读操作或其他操作。

| 序号 | 方法描述                                                     |
| :--- | :----------------------------------------------------------- |
| 1    | **public int read()**     从此输入流中读取下一个数据字节。   |
| 2    | **public int read(byte[] r, int off, int len)** 将最多 `len` 个数据字节从此输入流读入字节数组。 |
| 3    | **public int available()** 返回可不发生阻塞地从此输入流读取的字节数。 |
| 4    | **public void mark(int read)** 设置流中的当前标记位置。      |
| 5    | **public long skip(long n)** 从此输入流中跳过 `n` 个输入字节。 |

### ByteArrayOutputStream类

字节数组输出流在内存中创建一个字节数组缓冲区，所有发送到输出流的数据保存在该字节数组缓冲区中。创建字节数组输出流对象有以下几种方式。

下面的构造方法创建一个32字节（默认大小）的缓冲区。

```java
OutputStream bOut = new ByteArrayOutputStream();
```

另一个构造方法创建一个大小为n字节的缓冲区。

```java
OutputStream bOut = new ByteArrayOutputStream(int a)
```

成功创建字节数组输出流对象后，可以参见以下列表中的方法，对流进行写操作或其他操作。

| 序号 | 方法描述                                                     |
| :--- | :----------------------------------------------------------- |
| 1    | **public void reset()** 将此字节数组输出流的 `count` 字段重置为零，从而丢弃输出流中目前已累积的所有数据输出。 |
| 2    | **public byte[] toByteArray()** 创建一个新分配的字节数组。数组的大小和当前输出流的大小，内容是当前输出流的拷贝。 |
| 3    | **public String toString()** 将缓冲区的内容转换为字符串，根据平台的默认字符编码将字节转换成字符。 |
| 4    | **public void write(int w)**  将指定的字节写入此字节数组输出流。 |
| 5    | **public void write(byte []b, int of, int len)**  将指定字节数组中从偏移量 `off` 开始的 `len` 个字节写入此字节数组输出流。 |
| 6    | **public void writeTo(OutputStream outSt)** 将此字节数组输出流的全部内容写入到指定的输出流参数中。 |

### 实例

下面的例子演示了ByteArrayInputStream 和 ByteArrayOutputStream的使用：

```java
import java.io.*;
public class ByteStreamTest {
   public static void main(String args[])throws IOException {
      ByteArrayOutputStream bOutput = new ByteArrayOutputStream(12);
      while( bOutput.size()!= 10 ) {
         // 获取用户输入
         bOutput.write(System.in.read()); 
      }
      byte b [] = bOutput.toByteArray();
      System.out.println("Print the content");
      for(int x= 0 ; x < b.length; x++) {
          // 打印字符
          System.out.print((char)b[x]  + "   ");
      }
       System.out.println("   ");
       int c;
       ByteArrayOutputStream bInput = new ByteArrayOutputStream(b);
       System.out.println("Converting characters to Upper case " );
       for(int y = 0 ; y < 1; y++ ) {
           while(( c= bInput.read())!= -1) {
               System.out.println(Character.toUpperCase((char)c)); 
           }
           bInput.reset();
       }
   }
} 
```

以上实例编译运行结果如下：

```
asdfghjkly
Print the content
a   s   d   f   g   h   j   k   l   y
Converting characters to Upper case
A
S
D
F
G
H
J
K
L
Y
```

## 数据输入输出流

### DataInputStream类

数据输入流允许应用程序以与机器无关方式从底层输入流中读取基本 Java 数据类型。

下面的构造方法用来创建数据输入流对象。

```java
DataInputStream dis = DataInputStream(InputStream in);
```

另一种创建方式是接收一个字节数组，和两个整形变量 off、len，off表示第一个读取的字节，len表示读取字节的长度。

| 序号 | 方法描述                                                     |
| :--- | :----------------------------------------------------------- |
| 1    | **public final int read(byte[] r, int off, int len)throws IOException** 从所包含的输入流中将 `len` 个字节读入一个字节数组中。如果len为-1，则返回已读字节数。 |
| 2    | **Public final int read(byte [] b)throws IOException** 从所包含的输入流中读取一定数量的字节，并将它们存储到缓冲区数组 `b` 中。 |
| 3    | **public final Boolean readBooolean()throws IOException,** **public final byte readByte()throws IOException,** **public final short readShort()throws IOException** **public final Int readInt()throws IOException**从输入流中读取字节，返回输入流中两个字节作为对应的基本数据类型返回值。 |
| 4    | **public String readLine() throws IOException** 从输入流中读取下一文本行。 |

### DataOutputStream类

数据输出流允许应用程序以与机器无关方式将Java基本数据类型写到底层输出流。

下面的构造方法用来创建数据输出流对象。

```java
DataOutputStream out = DataOutputStream(OutputStream  out);
```

创建对象成功后，可以参照以下列表给出的方法，对流进行写操作或者其他操作。

| 序号 | 方法描述                                                     |
| :--- | :----------------------------------------------------------- |
| 1    | **public final void write(byte[] w, int off, int len)throws IOException** 将指定字节数组中从偏移量 `off` 开始的 `len` 个字节写入此字节数组输出流。 |
| 2    | **Public final int write(byte [] b)throws IOException** 将指定的字节写入此字节数组输出流。 |
| 3    | **public final void writeBooolean()throws IOException,** **public final void writeByte()throws IOException,** **public final void writeShort()throws IOException,** **public final void writeInt()throws IOException**这些方法将指定的基本数据类型以字节的方式写入到输出流。 |
| 4    | **Public void flush()throws IOException**  刷新此输出流并强制写出所有缓冲的输出字节。 |
| 5    | **public final void writeBytes(String s) throws IOException** 将字符串以字节序列写入到底层的输出流，字符串中每个字符都按顺序写入，并丢弃其高八位。 |

### 实例

下面的例子演示了DataInputStream和DataOutputStream的使用，该例从文本文件test.txt中读取5行，并转换成大写字母，最后保存在另一个文件test1.txt中。

```java
import java.io.*;

public class Test{
   public static void main(String args[])throws IOException{

      DataInputStream d = new DataInputStream(new FileInputStream("test.txt"));

      DataOutputStream out = new DataOutputStream(new FileOutputStream("test1.txt"));

      String count;
      while((count = d.readLine()) != null){
          String u = count.toUpperCase();
          System.out.println(u);
          out.writeBytes(u + "  ,");
      }
      d.close();
      out.close();
   }
}
```

以上实例编译运行结果如下：

```
THIS IS TEST 1  ,
THIS IS TEST 2  ,
THIS IS TEST 3  ,
THIS IS TEST 4  ,
THIS IS TEST 5  ,
```

## 文件和I/O

还有一些关于文件和 I/O 的类，我们也需要知道：

### File类

Java文件类以抽象的方式代表文件名和目录路径名。该类主要用于文件和目录的创建、文件的查找和文件的删除等。

File对象代表磁盘中实际存在的文件和目录。通过以下构造方法创建一个File对象。

通过给定的父抽象路径名和子路径名字符串创建一个新的File实例。

```java
File(File parent, String child);
```

通过将给定路径名字符串转换成抽象路径名来创建一个新 File 实例。

```java
File(String pathname) 
```

根据 parent 路径名字符串和 child 路径名字符串创建一个新 File 实例。

```java
File(String parent, String child) 
```

通过将给定的 file: URI 转换成一个抽象路径名来创建一个新的 File 实例。

```java
File(URI uri) 
```

创建File对象成功后，可以使用以下列表中的方法操作文件。

| 序号 | 方法描述                                                     |
| :--- | :----------------------------------------------------------- |
| 1    | **public String getName()** 返回由此抽象路径名表示的文件或目录的名称。 |
| 2    | **public String getParent()****、**  返回此抽象路径名的父路径名的路径名字符串，如果此路径名没有指定父目录，则返回 `null`。 |
| 3    | **public File getParentFile()** 返回此抽象路径名的父路径名的抽象路径名，如果此路径名没有指定父目录，则返回 `null`。 |
| 4    | **public String getPath()** 将此抽象路径名转换为一个路径名字符串。 |
| 5    | **public boolean isAbsolute()** 测试此抽象路径名是否为绝对路径名。 |
| 6    | **public String getAbsolutePath()** 返回抽象路径名的绝对路径名字符串。 |
| 7    | **public boolean canRead()** 测试应用程序是否可以读取此抽象路径名表示的文件。 |
| 8    | **public boolean canWrite()** 测试应用程序是否可以修改此抽象路径名表示的文件。 |
| 9    | **public boolean exists()** 测试此抽象路径名表示的文件或目录是否存在。 |
| 10   | **public boolean isDirectory()** 测试此抽象路径名表示的文件是否是一个目录。 |
| 11   | **public boolean isFile()** 测试此抽象路径名表示的文件是否是一个标准文件。 |
| 12   | **public long lastModified()** 返回此抽象路径名表示的文件最后一次被修改的时间。 |
| 13   | **public long length()** 返回由此抽象路径名表示的文件的长度。 |
| 14   | **public boolean createNewFile() throws IOException** 当且仅当不存在具有此抽象路径名指定的名称的文件时，原子地创建由此抽象路径名指定的一个新的空文件。 |
| 15   | **public boolean delete()**  删除此抽象路径名表示的文件或目录。 |
| 16   | **public void deleteOnExit()** 在虚拟机终止时，请求删除此抽象路径名表示的文件或目录。 |
| 17   | **public String[] list()** 返回由此抽象路径名所表示的目录中的文件和目录的名称所组成字符串数组。 |
| 18   | **public String[] list(FilenameFilter filter)** 返回由包含在目录中的文件和目录的名称所组成的字符串数组，这一目录是通过满足指定过滤器的抽象路径名来表示的。 |
| 19   | **public File[] listFiles()**  返回一个抽象路径名数组，这些路径名表示此抽象路径名所表示目录中的文件。 |
| 20   | **public File[] listFiles(FileFilter filter)** 返回表示此抽象路径名所表示目录中的文件和目录的抽象路径名数组，这些路径名满足特定过滤器。 |
| 21   | **public boolean mkdir()** 创建此抽象路径名指定的目录。      |
| 22   | **public boolean mkdirs()** 创建此抽象路径名指定的目录，包括创建必需但不存在的父目录。 |
| 23   | **public boolean renameTo(File dest)**  重新命名此抽象路径名表示的文件。 |
| 24   | **public boolean setLastModified(long time)** 设置由此抽象路径名所指定的文件或目录的最后一次修改时间。 |
| 25   | **public boolean setReadOnly()** 标记此抽象路径名指定的文件或目录，以便只可对其进行读操作。 |
| 26   | **public static File createTempFile(String prefix, String suffix, File directory) throws IOException** 在指定目录中创建一个新的空文件，使用给定的前缀和后缀字符串生成其名称。 |
| 27   | **public static File createTempFile(String prefix, String suffix) throws IOException** 在默认临时文件目录中创建一个空文件，使用给定前缀和后缀生成其名称。 |
| 28   | **public int compareTo(File pathname)** 按字母顺序比较两个抽象路径名。 |
| 29   | **public int compareTo(Object o)** 按字母顺序比较抽象路径名与给定对象。 |
| 30   | **public boolean equals(Object obj)** 测试此抽象路径名与给定对象是否相等。 |
| 31   | **public String toString()**  返回此抽象路径名的路径名字符串。 |

#### 实例

下面的实例演示了File对象的使用：

```java
import java.io.File;
public class DirList {
   public static void main(String args[]) {
      String dirname = "/java";
      File f1 = new File(dirname);
      if (f1.isDirectory()) {
         System.out.println( "Directory of " + dirname);
         String s[] = f1.list();
         for (int i=0; i < s.length; i++) {
             File f = new File(dirname + "/" + s[i]);
             if (f.isDirectory()) {
                 System.out.println(s[i] + " is a directory");
             } else {
                 System.out.println(s[i] + " is a file");
             }
         }
      } else {
          System.out.println(dirname + " is not a directory");
      }
   }
} 
```

以上实例编译运行结果如下：

```
Directory of /mysql
bin is a directory
lib is a directory
demo is a directory
test.txt is a file
README is a file
index.html is a file
include is a directory
```

### FileReader类

FileReader类从InputStreamReader类继承而来。该类按字符读取流中数据。可以通过以下几种构造方法创建需要的对象。

在给定从中读取数据的 File 的情况下创建一个新 FileReader。

```
FileReader(File file)
```

在给定从中读取数据的 FileDescriptor 的情况下创建一个新 FileReader。

```
FileReader(FileDescriptor fd) 
```

在给定从中读取数据的文件名的情况下创建一个新 FileReader。

```
FileReader(String fileName) 
```

创建FIleReader对象成功后，可以参照以下列表里的方法操作文件。

| 序号 | 文件描述                                                     |
| :--- | :----------------------------------------------------------- |
| 1    | **public int read() throws IOException** 读取单个字符，返回一个int型变量代表读取到的字符 |
| 2    | **public int read(char [] c, int offset, int len)** 读取字符到c数组，返回读取到字符的个数 |

#### 实例

```java
import java.io.*;
public class FileRead{
   public static void main(String args[])throws IOException{
      File file = new File("Hello1.txt");
      // 创建文件
      file.createNewFile();
      // creates a FileWriter Object
      FileWriter writer = new FileWriter(file); 
      // 向文件写入内容
      writer.write("This\n is\n an\n example\n"); 
      writer.flush();
      writer.close();
      // 创建 FileReader 对象
      FileReader fr = new FileReader(file); 
      char [] a = new char[50];
      fr.read(a); // 读取数组中的内容
      for(char c : a)
          System.out.print(c); // 一个一个打印字符
      fr.close();
   }
}
```

以上实例编译运行结果如下：

```
This
is
an
example
```

### FileWriter类

FileWriter类从OutputStreamWriter类继承而来。该类按字符向流中写入数据。可以通过以下几种构造方法创建需要的对象。

在给出 File 对象的情况下构造一个 FileWriter 对象。

```
FileWriter(File file)
```

在给出 File 对象的情况下构造一个 FileWriter 对象。

```
 FileWriter(File file, boolean append)
```

构造与某个文件描述符相关联的 FileWriter 对象。

```
FileWriter(FileDescriptor fd)
```

在给出文件名的情况下构造 FileWriter 对象，它具有指示是否挂起写入数据的 boolean 值。

```
FileWriter(String fileName, boolean append)
```

创建FileWriter对象成功后，可以参照以下列表里的方法操作文件。

| 序号 | 方法描述                                                     |
| :--- | :----------------------------------------------------------- |
| 1    | **public void write(int c) throws IOException** 写入单个字符c。 |
| 2    | **public void write(char [] c, int offset, int len)** 写入字符数组中开始为offset长度为len的某一部分。 |
| 3    | **public void write(String s, int offset, int len)** 写入字符串中开始为offset长度为len的某一部分。 |

#### 实例

```java
import java.io.*;
public class FileRead{
   public static void main(String args[])throws IOException{
      File file = new File("Hello1.txt");
      // 创建文件
      file.createNewFile();
      // creates a FileWriter Object
      FileWriter writer = new FileWriter(file); 
      // 向文件写入内容
      writer.write("This\n is\n an\n example\n"); 
      writer.flush();
      writer.close();
      //创建 FileReader 对象
      FileReader fr = new FileReader(file); 
      char [] a = new char[50];
      fr.read(a); // 从数组中读取内容
      for(char c : a)
          System.out.print(c); // 一个个打印字符
      fr.close();
   }
}
```

以上实例编译运行结果如下：

```
This
is
an
example
```

## Java中的目录

### 创建目录

File 类中有两个方法可以用来创建文件夹：

- `mkdir( )` 方法创建一个文件夹，成功则返回 true，失败则返回 false。失败表明 File 对象指定的路径已经存在，或者由于整个路径还不存在，该文件夹不能被创建。
- `mkdirs( )` 方法创建一个文件夹和它的所有父文件夹。

下面的例子创建 "/tmp/user/java/bin" 文件夹：

```java
import java.io.File;

public class CreateDir {
   public static void main(String args[]) {
      String dirname = "/tmp/user/java/bin";
      File d = new File(dirname);
      // 现在创建目录
      d.mkdirs();
  }
}
```

编译并执行上面代码来创建目录 "/tmp/user/java/bin"。

**注意：**Java 在 UNIX 和 Windows 自动按约定分辨文件路径分隔符。如果你在 Windows 版本的 Java 中使用分隔符(/) ，路径依然能够被正确解析。

### 读取目录

一个目录其实就是一个 File 对象，它包含其他文件和文件夹。

如果创建一个 File 对象并且它是一个目录，那么调用 `isDirectory( )` 方法会返回 true。

可以通过调用该对象上的 `list()` 方法，来提取它包含的文件和文件夹的列表。

下面展示的例子说明如何使用 `list()` 方法来检查一个文件夹中包含的内容：

```java
import java.io.File;

public class DirList {
   public static void main(String args[]) {
      String dirname = "/tmp";
      File f1 = new File(dirname);
      if (f1.isDirectory()) {
         System.out.println( "Directory of " + dirname);
         String s[] = f1.list();
         for (int i=0; i < s.length; i++) {             
            File f = new File(dirname + "/" + s[i]);             
            if (f.isDirectory()) {                
                System.out.println(s[i] + "是一个目录");             
            } else {
                System.out.println(s[i] + "是一个文件");
             }
        }
     } else {
          System.out.println(dirname + "不是一个目录");
     }
  }
}
```

以上实例编译运行结果如下：

```
目录 /tmp
bin 是一个目录
lib 是一个目录
demo 是一个目录
test.txt 是一个文件
README 是一个文件
index.html 是一个文件
include 是一个目录
```

### 删除目录或文件

删除文件可以使用 `java.io.File.delete()` 方法。

以下代码会删除目录 /tmp/java/，需要注意的是当删除某一目录时，必须保证该目录下没有其他文件才能正确删除，否则将删除失败。

测试目录结构：

```
/tmp/java/
|-- 1.log
|-- test
```

```java
import java.io.File;
public class DeleteFileDemo {
    public static void main(String args[]) {
        // 这里修改为自己的测试目录
        File folder = new File("/tmp/java/");
        deleteFolder(folder);
    }
    // 删除文件及目录
    public static void deleteFolder(File folder) {
        File[] files = folder.listFiles();
        if (files != null) {
            for (File f : files) {
                if (f.isDirectory()) {
                    deleteFolder(f);
                } else {
                    f.delete();
                }
            }
        }
        folder.delete();
    }
}
```

