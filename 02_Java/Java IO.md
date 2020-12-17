# Java文件

File类的对象是文件或目录的路径名的抽象表示。

## 创建文件

我们可以从中创建一个` File `对象

- 路径名
- 父路径名和子路径名
- URI（统一资源标识符）

我们可以使用File类的以下构造函数之一创建一个文件：

```
File(String pathname)
File(File parent, String child)
File(String parent, String child)
File(URI uri)
```

如果我们有一个文件路径名字符串test.txt，我们可以创建一个抽象路径名作为下面的代码。

```java
File dummyFile = new File("test.txt");
```

名为test.txt的文件不必存在，以使用此语句创建File对象。

dummyFile对象表示抽象路径名，它可能指向或可能不指向文件系统中的真实文件。

File类有几个方法来处理文件和目录。

使用File对象，我们可以创建新文件，删除现有文件，重命名文件，更改文件的权限等。

File类中的isFile()和isDirectory()告诉File对象是否表示文件或目录。

## 当前工作目录

JVM的当前工作目录是根据我们如何运行java命令来设置的。

我们可以通过读取user.dir系统属性来获取JVM的当前工作目录，如下所示：

```java
String  workingDir = System.getProperty("user.dir");
```

使用`System.setProperty()`方法更改当前工作目录。

```java
System.setProperty("user.dir", "C:\\myDir");
```

要在Windows上指定C:\\ test作为user.dir系统属性值，我们运行如下所示的程序：

```
java -Duser.dir=C:\test your-java-class
```

## 文件的存在

我们可以使用File类的`exists()`方法检查File对象的抽象路径名是否存在。

```java
boolean fileExists = dummyFile.exists();
```

完整源代码

```java
import java.io.File;

public class Main {
  public static void main(String[] argv) {
    // Create a File object
    File dummyFile = new File("dummy.txt");

    // Check for the file"s existence
    boolean fileExists = dummyFile.exists();
    if (fileExists) {
      System.out.println("The dummy.txt  file exists.");
    } else {

      System.out.println("The dummy.txt  file does  not  exist.");
    }

  }
}
```

## 路径

绝对路径在文件系统上唯一标识文件。规范路径是唯一标识文件系统上文件的最简单路径。

我们可以使用`getAbsolutePath()`和`getCanonicalPath()`方法来分别获得由File对象表示的绝对路径和规范路径。

```java
import java.io.File;
import java.io.IOException;

public class Main {
  public static void main(String[] args) {
    printFilePath("dummy.txt");
    printFilePath(".." + File.separator + "notes.txt");
  }

  public static void printFilePath(String pathname) {
    File f = new File(pathname);
    System.out.println("File  Name: " + f.getName());
    System.out.println("File  exists: " + f.exists());
    System.out.println("Absolute Path: " + f.getAbsolutePath());

    try {
      System.out.println("Canonical Path: " + f.getCanonicalPath());
    }

    catch (IOException e) {
      e.printStackTrace();
    }
  }
}
```

## 文件分隔符

不同的操作系统使用不同的字符来分隔路径名中的两个部分。

例如，Windows在路径名中使用反斜杠（\）作为名称分隔符，而UNIX使用正斜杠（/）。

File类定义了一个名为分隔符Char的常量，它是系统相关的名称分隔符。

我们可以使用File.separator Char常量来获取名称分隔符作为字符。

`File.separator `常量将我们的名称分隔符作为String。

在程序中使用名称分隔符将使您的Java代码在不同的平台上工作。

# Java 文件操作

## 文件创建

我们可以使用File类的createNewFile()方法创建一个新文件：

```java
File dummyFile = new File("test.txt");
boolean fileCreated  = dummyFile.createNewFile();
```

该`createNewFile()`方法创建一个新的空文件，如果有指定名称的文件不存在。

如果文件已成功创建，则返回true;否则，返回false。如果发生I/O错误，该方法将抛出IOException。

我们还可以在默认的临时文件目录或目录中创建一个临时文件。要在默认临时目录中创建临时文件，请使用File类的`createTempFile()`静态方法，该方法接受前缀和后缀以生成临时文件名。

```java
File  tempFile = File.createTempFile("abc", ".txt");
```

## 文件夹创建

我们可以使用`mkdir()`或`mkdirs()`方法创建一个新目录。

仅当路径名中指定的父目录已存在时，`mkdir()`方法才创建目录。

```java
File newDir  = new File("C:\\users\\home");
```

只有当C:\users目录已经存在时，`newDir.mkdir()`方法才会创建主目录。

`newDir.mkdirs()`方法将创建users目录（如果它不存在于C：驱动器中），它将在C:\users目录下创建主目录。

## 文件删除

我们需要使用File类的`delete()`方法来删除文件/目录。

目录必须为空，我们才能删除它。

如果文件/目录被删除，该方法返回true; 否则，返回false。

我们还可以延迟删除文件，直到JVM通过使用`deleteOnExit()`方法终止。

如果我们在程序中创建临时文件，当程序退出时要删除，这将非常有用。

立即删除dummy.txt文件

```java
File dummyFile = new File("dummy.txt"); 
dummyFile.delete();
```

在JVM终止时删除dummy.txt文件

```java
File dummyFile = new File("dummy.txt"); 
dummyFile.deleteOnExit();
```

## 文件重命名

要重命名文件，我们可以使用renameTo()方法，它使用一个File对象来表示新文件:

```java
boolean fileRenamed = oldFile.renameTo(newFile);
```

完整的源代码

```java
import java.io.File;

public class Main {
  public static void main(String[] argv) {
    // Rename old-dummy.txt to new_dummy.txt
    File oldFile = new File("old_dummy.txt");
    File newFile = new File("new_dummy.txt");

    boolean fileRenamed = oldFile.renameTo(newFile);
    if (fileRenamed) {
      System.out.println(oldFile + "  renamed  to " + newFile);
    } else {
      System.out.println("Renaming " + oldFile + "  to " + newFile
          + "  failed.");
    }

  }
}
```

如果文件的重命名成功，`renameTo()`方法返回true;否则，返回false。

我们需要检查返回值，以确保重命名成功。

## 例子

File对象是不可变的。创建后，它始终表示相同的路径名。当我们重命名文件时，旧的File对象仍然代表原始的路径名。

File对象表示路径名，而不是文件系统中的实际文件。

以下代码显示了如何进行文件创建，删除和重命名。

```java
import java.io.File;

public class Main {
  public static void main(String[] args) throws Exception {
    File newFile = new File("my_new_file.txt");
    printFileDetails(newFile);

    // Create a new file
    boolean fileCreated = newFile.createNewFile();
    if (!fileCreated) {
      System.out.println(newFile + "  could   not  be  created.");
    }
    printFileDetails(newFile);

    // Delete the new file
    newFile.delete();

    System.out.println("After deleting the new file:");
    printFileDetails(newFile);

    // recreate the file
    newFile.createNewFile();

    printFileDetails(newFile);

    // Let"s tell the JVM to delete this file on exit
    newFile.deleteOnExit();

    System.out.println("After  using deleteOnExit() method:");
    printFileDetails(newFile);

    // Create a new file and rename it
    File firstFile = new File("my_first_file.txt");
    File secondFile = new File("my_second_file.txt");

    fileCreated = firstFile.createNewFile();
    if (fileCreated || firstFile.exists()) {
      printFileDetails(firstFile);
      printFileDetails(secondFile);

      boolean renamedFlag = firstFile.renameTo(secondFile);
      if (!renamedFlag) {
        System.out.println("Could not  rename  " + firstFile);
      }
      printFileDetails(firstFile);
      printFileDetails(secondFile);
    }
  }
  public static void printFileDetails(File f) {
    System.out.println("Absolute Path: " + f.getAbsoluteFile());
    System.out.println("File exists:  " + f.exists());
  }
}
```

## 文件属性

File类包含让我们获取/设置文件和目录的属性的方法。

我们可以设置分别使用`setReadOnly()`，`setReadable()`，`setWritable()`和`setExecutable()`方法将文件设置为只读，可读，可写和可执行。

我们可以使用`lastModified()`和`setLastModified()`方法来获取和设置文件的最后修改日期和时间。

我们可以使用`isHidden()`方法检查文件是否被隐藏。

## 文件大小

我们可以使用File类的`length()`方法获取文件的大小(以字节为单位)。

```java
File myFile  = new File("myfile.txt");
long  fileLength = myFile.length();
```

如果File对象表示不存在的文件，则`length()`方法返回零。

`length()`方法的返回类型是long，而不是int。

## 列出文件和目录

我们可以使用File类的`listRoots()`静态方法获取文件系统中可用根目录的列表。 它返回一个File对象数组。

```java
File[] roots = File.listRoots();
```

以下代码显示如何列出所有可用的根目录。

```java
import java.io.File;

public class Main {
  public static void main(String[] args) {
    File[] roots = File.listRoots();
    System.out.println("List  of  root directories:");
    for (File f : roots) {
      System.out.println(f.getPath());
    }
  }
}
```

我们可以使用File类的`list()`或`listFiles()`方法列出目录中的所有文件和目录。

`list()`方法返回一个String数组，而`listFiles()`方法返回一个File数组。

我们还可以使用这些方法的文件过滤器从返回的结果中排除一些文件和目录。

以下代码显示如何列出目录中的所有文件和目录。

```java
import java.io.File;

public class Main {
  public static void main(String[] args) {
    // Change the dirPath value to list files from your directory
    String dirPath = "C:\\";

    File dir = new File(dirPath);
    File[] list = dir.listFiles();

    for (File f : list) {
      if (f.isFile()) {
        System.out.println(f.getPath() + "  (File)");
      } else if (f.isDirectory()) {
        System.out.println(f.getPath() + "  (Directory)");
      }
    }
  }
}
```

## 文件过滤器

要从列表中排除扩展名为.SYS的所有文件，我们可以使用由功能接口FileFilter的实例表示的文件过滤器来实现。

它包含一个`accept()`方法，它将File作为参数列出，如果应该列出文件，则返回true。返回false不会列出文件。

以下代码创建一个文件过滤器，将过滤扩展名为.SYS的文件。

```java
FileFilter filter = file ->  {
    if (file.isFile()) {
        String fileName   = file.getName().toLowerCase();
        if (fileName.endsWith(".sys"))  {
            return false;
        }
    }
    return true;
};
```

以下代码创建两个文件过滤器 - 一个仅过滤文件，另一个仅过滤目录:

```java
// Filters only  files
FileFilter fileOnlyFilter = File::isFile;

// Filters only  directories
FileFilter  dirOnlyFilter = File::isDirectory;
```

以下代码显示如何使用FileFilter过滤文件。

```java
import java.io.File;
import java.io.FileFilter;

public class Main {
  public static void main(String[] args) {
    String dirPath = "C:\\";
    File dir = new File(dirPath);

    // Create a file filter to exclude any .SYS file
    FileFilter filter = file -> {
      if (file.isFile()) {
        String fileName = file.getName().toLowerCase();
        if (fileName.endsWith(".sys")) {
          return false;
        }
      }
      return true;
    };

    File[] list = dir.listFiles(filter);

    for (File f : list) {
      if (f.isFile()) {
        System.out.println(f.getPath() + "  (File)");
      } else if (f.isDirectory()) {
        System.out.println(f.getPath() + "  (Directory)");
      }
    }
  }
}
```

# Java 输入流

抽象基本组件是InputStream类。

```
InputStream
 |
 +--FileInputStream 
 |
 +--ByteArrayInputStream 
 |
 +--PipedInputStream
 |
 +--FilterInputStream
 |
 +--BufferedInputStream 
 |
 +--PushbackInputStream 
 |
 +--DataInputStream 
 |
 +--ObjectInputStream
```

我们有FileInputStream，ByteArrayInputStream和PipedInputStream，FilterInputStream的具体类。

## 方法

超类InputStream包含从输入流读取数据的基本方法，所有具体类都支持这些方法。

对输入流的基本操作是从其读取数据。 InputStream类中定义的一些重要方法在下表中列出。

| ID   | 方法/说明                                                    |
| ---- | ------------------------------------------------------------ |
| 1    | **read()** 读取一个字节并将读取的字节作为int返回。 当到达输入流的结尾时，它返回-1。 |
| 2    | **read(byte[] buffer)** 读取最大值直到指定缓冲区的长度。 它返回在缓冲区中读取的字节数。 如果到达输入流的结尾，则返回-1。 |
| 3    | **read(byte [] buffer，int offset，int length)** 读取最大值到指定长度字节。  数据从偏移索引开始写入缓冲区。 它返回读取的字节数或-1，如果到达输入流的结束。 |
| 3    | **close()** 关闭输入流                                       |
| 4    | **available()** 返回可以从此输入流读取但不阻塞的估计字节数。 |

# Java 文件输入流

在Java I/O中，流意味着数据流。流中的数据可以是字节，字符，对象等。

要从文件读取，我们需要创建一个FileInputStream类的对象，它将表示输入流。

```java
String srcFile = "test.txt";
FileInputStream fin  = new FileInputStream(srcFile);
```

如果文件不存在，FileInputStream类的构造函数将抛出FileNotFoundException异常。要处理这个异常，我们需要将你的代码放在try-catch块中，如下所示：

```java
try  {
    FileInputStream fin  = new FileInputStream(srcFile);
}catch  (FileNotFoundException e){
    // The error  handling code  goes  here
}
```

## 读取数据

FileInputStream类有一个重载的`read()`方法从文件中读取数据。我们可以一次读取一个字节或多个字节。

`read()`方法的返回类型是int，虽然它返回一个字节值。如果到达文件的结尾，则返回-1。

我们需要将返回的int值转换为一个字节，以便从文件中读取字节。通常，我们在循环中一次读取一个字节。

最后，我们需要使用`close()`方法关闭输入流。

```java
// Close  the   input  stream 
fin.close();
```

`close()`方法可能抛出一个IOException，因此，我们需要在try-catch块中包含这个调用。

```java
try  {
    fin.close();
}catch (IOException e)  {
    e.printStackTrace();
}
```

通常，我们在try块中构造一个输入流，并在finally块中关闭它，以确保它在我们完成后总是关闭。

所有输入/输出流都可自动关闭。我们可以使用try-with-resources来创建它们的实例，所以无论是否抛出异常，它们都会自动关闭，避免需要显式地调用它们的`close()`方法。

以下代码显示使用try-with-resources创建文件输入流：

```java
String srcFile = "test.txt";
try  (FileInputStream fin  = new FileInputStream(srcFile))  {
    // Use fin to read   data from  the   file here
}
catch  (FileNotFoundException e)  {
    // Handle  the   exception here
}
```

以下代码显示了如何从文件输入流一次读取一个字节。

```java
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

public class Main {
  public static void main(String[] args) {
    String dataSourceFile = "asdf.txt";
    try (FileInputStream fin = new FileInputStream(dataSourceFile)) {

      byte byteData;
      while ((byteData = (byte) fin.read()) != -1) {
        System.out.print((char) byteData);
      }
    } catch (FileNotFoundException e) {
      ;
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
```

# Java 缓冲输入流

BufferedInputStream通过缓冲数据向输入流添加功能。

它维护一个内部缓冲区以存储从底层输入流读取的字节。

我们创建缓冲区输入流如下：

```java
String srcFile =“test.txt";
BufferedInputStream bis = new BufferedInputStream(new FileInputStream(srcFile));
```

以下代码显示如何使用BufferedInputStream从文件读取。

```java
import java.io.BufferedInputStream;
import java.io.FileInputStream;

public class Main {
  public static void main(String[] args) {
    String srcFile = "test.txt";
    try (BufferedInputStream bis = new BufferedInputStream(new FileInputStream(
        srcFile))) {
      // Read one byte at a time and display it
      byte byteData;
      while ((byteData = (byte) bis.read()) != -1) {
        System.out.print((char) byteData);
      }
    } catch (Exception e2) {
      e2.printStackTrace();
    }
  }
}
```

# Java 推回输入流

PushbackInputStream向输入流添加功能，允许我们使用其`unread()`方法推回读取的字节。

有三个版本的`unread()`方法。一个让我们推回一个字节，另外两个让我们推回多个字节。

## 例子

```java
import java.io.FileInputStream;
import java.io.PushbackInputStream;

public class Main {
  public static void main(String[] args) {
    String srcFile = "test.txt";

    try (PushbackInputStream pis = new PushbackInputStream(new FileInputStream(
        srcFile))) {
      byte byteData;
      while ((byteData = (byte) pis.read()) != -1) {
        System.out.print((char) byteData);
        pis.unread(byteData);
        // Reread the byte we unread
        byteData = (byte) pis.read();
        System.out.print((char) byteData);
      }
    } catch (Exception e2) {
      e2.printStackTrace();
    }
  }
}
```

# Java 数据输入流

DataInputStream可以从输入流中读取Java基本数据类型值。

DataInputStream类包含读取数据类型值的读取方法。例如，要读取int值，它包含一个`readInt()`方法；读取char值，它有一个`readChar()`方法等。它还支持使用`readUTF()`方法读取字符串。

## 例子

以下代码显示了如何从文件读取原始值和字符串。

```java
import java.io.DataInputStream;
import java.io.FileInputStream;

public class Main {
  public static void main(String[] args) {
    String srcFile = "primitives.dat";

    try (DataInputStream dis = new DataInputStream(new FileInputStream(srcFile))) {
      // Read the data in the same order they were written 
      int intValue = dis.readInt();
      double doubleValue = dis.readDouble();
      boolean booleanValue = dis.readBoolean();
      String msg = dis.readUTF();

      System.out.println(intValue);
      System.out.println(doubleValue);
      System.out.println(booleanValue);
      System.out.println(msg);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
```

上面的代码生成以下结果：

```
java.io.FileNotFoundException: primitives.dat (No such file or directory)
     at java.io.FileInputStream.open(Native Method)
     at java.io.FileInputStream.<init>(FileInputStream.java:146)
     at java.io.FileInputStream.<init>(FileInputStream.java:101)
     at file.main(file.java:8)
```

# Java 输出流

在抽象超类OutputStream中定义了三个重要的方法：`write()`，`flush()`和`close()`。

`write()`方法将字节写入输出流。

它有三个版本，允许我们一次写一个字节或多个字节。

`flush()`方法用于将任何缓冲的字节刷新到数据宿。

`close()`方法关闭输出流。

要使用BufferedOutputStream装饰器以更好的速度写入文件，请使用以下语句：

```java
BufferedOutputStream bos  = new BufferedOutputStream(new FileOutputStream("your output file  path"));
```

要将数据写入ByteArrayOutputStream，请使用

```java
ByteArrayOutputStream baos  = new ByteArrayOutputStream();
baos.write(buffer); // buffer is a  byte   array
```

# Java 文件输出流

## 创建输出流

要写入文件，我们需要创建一个FileOutputStream类的对象，它将表示输出流。

```java
// Create a  file  output stream
String destFile = "test.txt";
FileOutputStream fos = new FileOutputStream(destFile);
```

当写入文件时，如果文件不存在，Java会尝试创建文件。我们必须准备好处理这个异常，将代码放在try-catch块中，如下所示：

```java
try  {
    FileOutputStream fos = new FileOutputStream(srcFile);
}catch  (FileNotFoundException e){
    // Error handling code  goes  here
}
```

如果文件包含数据，数据将被擦除。为了保留现有数据并将新数据附加到文件，我们需要使用FileOutputStream类的另一个构造函数，它接受一个布尔标志，用于将新数据附加到文件。

要将数据附加到文件，请在第二个参数中传递true，使用以下代码。

```java
FileOutputStream fos = new FileOutputStream(destFile, true);
```

## 写数据

FileOutputStream类有一个重载的`write()`方法将数据写入文件。我们可以使用不同版本的方法一次写入一个字节或多个字节。

通常，我们使用FileOutputStream写入二进制数据。

要向输出流中写入诸如“Hello"的字符串，请将字符串转换为字节。

String类有一个`getBytes()`方法，该方法返回表示字符串的字节数组。我们给FileOutputStream写一个字符串如下:

```java
String text = "Hello";
byte[] textBytes = text.getBytes();
fos.write(textBytes);
```

要插入一个新行，使用line.separator系统变量如下。

```java
String lineSeparator = System.getProperty("line.separator");
fos.write(lineSeparator.getBytes());
```

我们需要使用flush()方法刷新输出流。

```java
fos.flush();
```

刷新输出流指示如果任何写入的字节被缓冲，则它们可以被写入数据宿。

关闭输出流类似于关闭输入流。我们需要使用`close()`方法关闭输出流。

```java
// Close  the   output  stream 
fos.close();
```

`close()`方法可能抛出一个IOException异常。如果我们希望自动关闭tit，请使用try-with-resources创建输出流。

以下代码显示如何将字节写入文件输出流。

```java
import java.io.File;
import java.io.FileOutputStream;

public class Main {
  public static void main(String[] args) {
    String destFile = "luci2.txt";

    // Get the line separator for the current platform
    String lineSeparator = System.getProperty("line.separator");

    String line1 = "test";
    String line2 = "test1";

    String line3 = "test2";
    String line4 = "test3";

    try (FileOutputStream fos = new FileOutputStream(destFile)) {
      fos.write(line1.getBytes()); 
      fos.write(lineSeparator.getBytes());

      fos.write(line2.getBytes());
      fos.write(lineSeparator.getBytes());

      fos.write(line3.getBytes());
      fos.write(lineSeparator.getBytes());

      fos.write(line4.getBytes());

      // Flush the written bytes to the file 
      fos.flush();

      System.out.println("Text has  been  written to "
          + (new File(destFile)).getAbsolutePath());
    } catch (Exception e2) {
      e2.printStackTrace();
    }
  }
}
```

# Java 打印流

PrintStream类是输出流的具体装饰器。

PrintStream可以以合适的格式打印任何数据类型值，基本或对象。

PrintStream可以将数据写入输出流不抛出IOException。

如果一个方法抛出一个IOException，PrintStream设置一个内部标志，而不是抛出异常给调用者。可以使用其checkError()方法检查该标志，如果在方法执行期间发生IOException，则返回true。

PrintStream具有自动刷新功能。我们可以在其构造函数中指定它应该自动刷新写入它的内容。

如果我们将auto-flush标志设置为true，当写入一个字节数组时，PrintStream将刷新它的内容，它的一个重载的`println()`方法用于写入数据，一个换行符被写入，或一个字节（‘\n’）。

```java
import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintStream;

public class Main {
  public static void main(String[] args) {
    String destFile = "luci3.txt";

    try (PrintStream ps = new PrintStream(destFile)) {
      ps.println("test");
      ps.println("test1");
      ps.println("test2");
      ps.print("test3");

      // flush the print stream
      ps.flush();

      System.out.println("Text has  been  written to "
          + (new File(destFile).getAbsolutePath()));
    } catch (FileNotFoundException e1) {
      e1.printStackTrace();
    }
  }
}
```

# Java 数据输出流

DataOutputStream可以将Java基本数据类型值写入输出流。

DataOutputStream类包含一个写入数据类型的写入方法。它支持使用`writeUTF(String text)`方法将字符串写入输出流。

要将Java原始数据类型值写入名为primitives.dat的文件，我们将按如下所示构造DataOutputStream的对象：

```java
DataOutputStream dos = new DataOutputStream(new FileOutputStream("primitives.dat"));
```

## 例子

以下代码将一个int值，一个double值，一个布尔值和一个字符串写入名为primitives.dat的文件。

```java
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileOutputStream;

public class Main {
  public static void main(String[] args) {
    String destFile = "primitives.dat";

    try (DataOutputStream dos = new DataOutputStream(new FileOutputStream(destFile))) {
      dos.writeInt(765);
      dos.writeDouble(6789.50);
      dos.writeBoolean(true);
      dos.writeUTF("Java Input/Output  is cool!");

      dos.flush();

      System.out.println("Data has  been  written to " + (new File(destFile)).getAbsolutePath());
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
```

# Java 管道

管道连接输入流和输出流。

管道 I/O基于生产者 - 消费者模式，其中生产者产生数据并且消费者消费数据。

在管道 I/O中，我们创建两个流代表管道的两端。 PipedOutputStream对象表示一端，PipedInputStream对象表示另一端。我们使用两个对象上的`connect()`方法连接两端。

我们还可以通过在创建另一个对象时将一个对象传递给构造函数来连接它们。

以下代码显示了创建和连接管道两端的两种方法：

第一种方法创建管道输入和输出流并连接它们。它使用connect方法连接两个流。

```java
PipedInputStream pis  = new PipedInputStream(); 
PipedOutputStream pos  = new PipedOutputStream(); 
pis.connect(pos); /* Connect  the   two  ends  */
```

第二种方法创建管道输入和输出流并连接它们。它通过将输入管道流传递到输出流构造器来连接两个流。

```java
PipedInputStream pis  = new PipedInputStream(); 
PipedOutputStream pos  = new PipedOutputStream(pis);
```

我们可以在连接管道的两端后生成和使用数据。

我们通过使用PipedOutputStream对象的一个`write()`方法产生数据。无论我们对管道输出流写入什么，自动变得可用于管道输入流对象进行读取。

我们使用PipedInputStream的`read()`方法从管道读取数据。如果数据在尝试从管道读取时不可用，则管道输入流被阻止。

管道流具有固定容量的缓冲器，以在写入管道和从管道读取之间存储数据。

我们可以设置管道容量，当我们创建它。如果管道的缓冲区已满，则尝试在管道上写入将被阻止。

以下代码创建缓冲区容量为2048字节的管道输入和输出流。

```java
PipedOutputStream pos  = new PipedOutputStream(); 
PipedInputStream pis  = new PipedInputStream(pos, 2048);
```

管道用于将数据从一个线程传输到另一个线程。两个线程之间的同步由阻塞读和写来处理。

## 例子

以下代码演示了如何使用管道 I/O。

```java
import java.io.PipedInputStream;
import java.io.PipedOutputStream;

public class Main {
  public static void main(String[] args) throws Exception {
    PipedInputStream pis = new PipedInputStream();
    PipedOutputStream pos = new PipedOutputStream();
    pos.connect(pis);

    Runnable producer = () -> produceData(pos);
    Runnable consumer = () -> consumeData(pis);
    new Thread(producer).start();
    new Thread(consumer).start();
  }

  public static void produceData(PipedOutputStream pos) {
    try {
      for (int i = 1; i <= 50; i++) {
        pos.write((byte) i);
        pos.flush();
        System.out.println("Writing: " + i);
        Thread.sleep(500);
      }
      pos.close();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
  public static void consumeData(PipedInputStream pis) {
    try {
      int num = -1;
      while ((num = pis.read()) != -1) {
        System.out.println("Reading: " + num);
      }
      pis.close();
    } catch (Exception e) {
      e.printStackTrace();
    }

  }
}
```

# Java 对象序列化

ObjectOutputStream类的一个对象用于序列化一个对象。

ObjectInputStream类的一个对象用于反序列化一个对象。

ObjectOutputStream继承自OutputStream。 ObjectInputStream继承自InputStream。

类必须实现Serializable或Externalizable接口以便序列化或反序列化。

Serializable接口是一个标记接口。

如果我们想要一个Person类的对象被序列化，我们需要声明Person类如下：

```java
public class Person   implements Serializable  {
    
}
```

Java负责处理从/向流读取/写入Serializable对象的细节。我们只需要将对象写入/读取流到流类中的一个方法。

实现Externalizable接口使我们能够更好地控制从流中读取和写入对象。

它继承Serializable接口。它声明如下：

```java
public interface  Externalizable extends Serializable  {
    void  readExternal(ObjectInput in)  throws   IOException,  ClassNotFoundException;
    void  writeExternal(ObjectOutput out) throws   IOException;
}
```

当我们从流中读取一个对象时，Java调用`readExternal()`方法。当我们向一个流写一个对象时，它调用`writeExternal()`方法。

我们必须编写逻辑来分别读取和写入`readExternal()`和`writeExternal()`方法中的对象的字段。

实现Externalizable接口的类如下所示：

```java
public class Person  implements Externalizable  {
    public void  readExternal(ObjectInput in)  throws   IOException,  ClassNotFoundException {
        // Write the logic to read the Person object fields  from  the   stream
    }    
    public void  writeExternal(ObjectOutput out) throws   IOException  {
        // Write  the   logic to write Person   object fields  to the   stream
    }
}
```

## 序列化对象

以下代码创建ObjectOutputStream类的对象，并将对象保存到person.ser文件。

```java
ObjectOutputStream oos  = new ObjectOutputStream(new FileOutputStream("person.ser"));
```

要将对象保存到ByteArrayOutputStream，我们构造一个对象输出流如下：

```java
ByteArrayOutputStream baos  = new ByteArrayOutputStream();

// Creates an  object output stream to write objects to the   byte   array  output stream
ObjectOutputStream oos  = new ObjectOutputStream(baos);
```

使用ObjectOutputStream类的`writeObject()`方法通过将对象引用作为参数传递来序列化对象，如下所示：

```java
oos.writeObject(p1);
```

最后，当我们完成将所有对象写入时，使用`close()`方法关闭对象输出流：

```java
oos.close();
```

以下代码显示如何序列化实现可序列化接口的Person类。

```java
import java.io.Serializable;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;

class Person implements Serializable {
  private String name = "Unknown";
  private String gender = "Unknown";
  private double height = Double.NaN;

  public Person(String name, String gender, double height) {
    this.name = name;
    this.gender = gender;
    this.height = height;
  }

  @Override
  public String toString() {
    return "Name: " + this.name + ", Gender:   " + this.gender + ",  Height: " + this.height;
  }
}

public class Main {
  public static void main(String[] args) {
    Person p1 = new Person("John", "Male", 1.7);
    Person p2 = new Person("Wally", "Male", 1.7);
    Person p3 = new Person("Katrina", "Female", 1.4);

    File fileObject = new File("person.ser");

    try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(fileObject))) {

      oos.writeObject(p1);
      oos.writeObject(p2);
      oos.writeObject(p3);

      // Display the serialized objects on the standard output
      System.out.println(p1);
      System.out.println(p2);
      System.out.println(p3);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
```

## 反序列化对象

以下代码显示如何创建ObjectInputStream类的对象，并从person.ser文件读取对象。

```java
ObjectInputStream ois  = new ObjectInputStream(new FileInputStream("person.ser"));
```

要从ByteArrayInputStream读取对象，请按如下所示创建对象输出流：

```java
ObjectInputStream ois  = new ObjectInputStream(Byte-Array-Input-Stream-Reference);
```

使用ObjectInputStream类的`readObject()`方法来反序列化对象。

```java
Object obj  = oos.readObject();
```

最后，关闭对象输入流如下:

```java
ois.close();
```

以下代码显示如何从文件读取对象。

```java
import java.io.File;
import java.io.FileInputStream;
import java.io.ObjectInputStream;

public class Main {
  public static void main(String[] args) {
    File fileObject = new File("person.ser");

    try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(
        fileObject))) {

      Person p1 = (Person) ois.readObject();
      Person p2 = (Person) ois.readObject();
      Person p3 = (Person) ois.readObject();

      System.out.println(p1);
      System.out.println(p2);
      System.out.println(p3);

    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
```

## 可外化对象序列化

要序列化和反序列化可外部化对象，请实现Externalizable接口。

```java
import java.io.Externalizable;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInput;
import java.io.ObjectInputStream;
import java.io.ObjectOutput;
import java.io.ObjectOutputStream;

class PersonExt implements Externalizable {
  private String name = "Unknown";
  private String gender = "Unknown";
  private double height = Double.NaN;

  public PersonExt() {
  }

  public PersonExt(String name, String gender, double height) {
    this.name = name;
    this.gender = gender;
    this.height = height;
  }
  public String toString() {
    return "Name: " + this.name + ", Gender:   " + this.gender + ",  Height: " + this.height;
  }

  public void readExternal(ObjectInput in) throws IOException, ClassNotFoundException {
    this.name = in.readUTF();
    this.gender = in.readUTF();
  }

  public void writeExternal(ObjectOutput out) throws IOException {
    out.writeUTF(this.name);
    out.writeUTF(this.gender);
  }
}

public class Main {
  public static void main(String[] args) {
    PersonExt p1 = new PersonExt("John", "Male", 6.7);
    PersonExt p2 = new PersonExt("Wally", "Male", 5.7);
    PersonExt p3 = new PersonExt("Katrina", "Female", 5.4);

    File fileObject = new File("personext.ser");

    try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(fileObject))) {
      oos.writeObject(p1);
      oos.writeObject(p2);
      oos.writeObject(p3);

      System.out.println(p1);
      System.out.println(p2);
      System.out.println(p3);
    } catch (IOException e1) {
      e1.printStackTrace();
    }

    fileObject = new File("personext.ser");

    try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(fileObject))) {

      p1 = (PersonExt)ois.readObject();
      p2 = (PersonExt)ois.readObject();
      p3 = (PersonExt)ois.readObject();

      // Let"s display the objects that are read
      System.out.println(p1);
      System.out.println(p2);
      System.out.println(p3);

      // Print the input path
      System.out.println("Objects were  read   from  " + fileObject.getAbsolutePath());
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
```

# Java 阅读器和写入器

Java阅读器和写入器是基于字符的流。

当我们要从数据源读取基于字符的数据时，使用读取器。当我们想要写基于字符的数据时使用写入器。

如果我们有一个流提供字节，我们想通过将这些字节解码为字符读取字符，我们应该使用InputStreamReader类。

例如，如果我们有一个名为iso的InputStream对象，并且我们想要获取一个Reader对象实例，我们可以这样做:

```java
Reader  reader = new InputStreamReader(iso);
```

如果我们知道在基于字节的流中使用的编码，我们可以在创建Reader对象时指定它，如下所示:

```java
Reader  reader = new InputStreamReader(iso,  "US-ASCII");
```

类似地，我们可以创建一个Writer对象，从基于字节的输出流中吐出字符，如下所示，假设oso是一个OutputStream对象:

以下代码使用平台默认编码从OutputStream创建Writer对象。

```java
Writer writer  = new OutputStreamWriter(oso);
```

使用“US-ASCII"编码从OutputStream创建Writer对象

```java
Writer writer  = new OutputStreamWriter(oso,  "US-ASCII");
```

样本

```java
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;

public class Main {
  public static void main(String[] args) {
    String destFile = "test.txt";

    try (BufferedWriter bw = new BufferedWriter(new FileWriter(destFile))) {
      bw.append("test");
      bw.newLine();
      bw.append("test1");
      bw.newLine();
      bw.append("test2");
      bw.newLine();
      bw.append("test3");
      
      bw.flush();
    }  catch (Exception e2) {
      e2.printStackTrace();
    }
  }
}
```

以下代码从test.txt文件中读取文本。

```java
import java.io.BufferedReader;
import java.io.FileReader;

public class Main {
  public static void main(String[] args) throws Exception{
    String srcFile = "test.txt";
    BufferedReader br = new BufferedReader(new FileReader(srcFile));
    String text = null;

    while ((text = br.readLine()) != null) {
      System.out.println(text);
    }
    br.close();
  }
}
```

将基于字节的流转换为基于字符的流是直接的。

如果我们有一个InputStream对象，我们可以通过将它包装在InputStreamReader对象中来获取一个Reader对象，如下所示:

```java
InputStream is = create your InputStream object here; 
Reader reader = new InputStreamReader(is);
```

要从InputStream对象构造BufferedReader对象，我们可以这样做:

```java
InputStream is = create your  InputStream object here; 
BufferedReader br  = new BufferedReader(new InputStreamReader(is));
```

我们可以从OutputStream对象构造一个Writer对象，如下所示:

```java
OutputStream os  = create your  OutputStream object here; Writer writer  = new OutputStreamWriter(os);
```

## 例子

```java
import java.io.FileReader;
import java.io.BufferedReader;
import java.io.Reader;
import java.io.FilterReader;
import java.io.IOException;

class LowerCaseReader extends FilterReader {
  public LowerCaseReader(Reader in) {
    super(in);
  }
  @Override
  public int read(char[] cbuf, int off, int len) throws IOException {
    int count = super.read(cbuf, off, len);
    if (count != -1) {
      // Convert all read characters to lowercase 
      int limit = off + count;
      for (int i = off; i < limit; i++) {
        cbuf[i] = Character.toLowerCase(cbuf[i]);
      }
    }
    return count;
  }
}
public class Main {
  public static void main(String[] args) throws Exception {
    String fileName = "test.txt";
    LowerCaseReader lcr = new LowerCaseReader(new FileReader(fileName));
    int c = -1;
    while ((c = lcr.read()) != -1) {
      System.out.print((char) c);
    }
    lcr.close();
    BufferedReader br = new BufferedReader(new LowerCaseReader(new FileReader(
        fileName)));
    String str = null;
    while ((str = br.readLine()) != null) {
      System.out.println(str);
    }
    br.close();
  }
}
```

# Java 随机访问文件

使用随机访问文件，我们可以从文件读取以及写入文件。

使用文件输入和输出流的读取和写入是顺序过程。

使用随机访问文件，我们可以在文件中的任何位置读取或写入。

RandomAccessFile类的一个对象可以进行随机文件访问。我们可以读/写字节和所有原始类型的值到一个文件。

RandomAccessFile可以使用其`readUTF()`和`writeUTF()`方法处理字符串。

RandomAccessFile类不在InputStream和OutputStream类的类层次结构中。

## 模式

可以在四种不同的访问模式中创建随机访问文件。访问模式值是一个字符串。它们列出如下：

| 模式  | 含义                                                         |
| ----- | ------------------------------------------------------------ |
| "r"   | 文件以只读模式打开。                                         |
| "rw"  | 该文件以读写模式打开。 如果文件不存在，则创建该文件。        |
| "rws" | 该文件以读写模式打开。 对文件的内容及其元数据的任何修改立即被写入存储设备。 |
| "rwd" | 该文件以读写模式打开。 对文件内容的任何修改立即写入存储设备。 |

## 读和写

我们通过指定文件名和访问模式来创建RandomAccessFile类的实例。

```
RandomAccessFile  raf = new RandomAccessFile("randomtest.txt", "rw");
```

随机访问文件具有文件指针，当我们从其读取数据或向其写入数据时，该文件指针向前移动。

文件指针是我们下一次读取或写入将开始的光标。

其值指示光标与文件开头的距离（以字节为单位）。

我们可以通过使用其`getFilePointer()`方法来获取文件指针的值。

当我们创建一个RandomAccessFile类的对象时，文件指针被设置为零。

我们可以使用`seek()`方法将文件指针设置在文件中的特定位置。

RandomAccessFile的`length()`方法返回文件的当前长度。我们可以通过使用其`setLength()`方法来扩展或截断文件。

## 例子

以下代码显示如何使用RandomAccessFile对象读取和写入文件。

```java
import java.io.File;
import java.io.IOException;
import java.io.RandomAccessFile;

public class Main {
  public static void main(String[] args) throws IOException {
    String fileName = "randomaccessfile.txt";
    File fileObject = new File(fileName);

    if (!fileObject.exists()) {
      initialWrite(fileName);
    }
    readFile(fileName);
    readFile(fileName);
  }

  public static void readFile(String fileName) throws IOException {
    RandomAccessFile raf = new RandomAccessFile(fileName, "rw");
    int counter = raf.readInt();
    String msg = raf.readUTF();

    System.out.println(counter);
    System.out.println(msg);
    incrementReadCounter(raf);
    raf.close();
  }

  public static void incrementReadCounter(RandomAccessFile raf)
      throws IOException {
    long currentPosition = raf.getFilePointer();
    raf.seek(0);
    int counter = raf.readInt();
    counter++;
    raf.seek(0);
    raf.writeInt(counter);
    raf.seek(currentPosition);
  }

  public static void initialWrite(String fileName) throws IOException {
    RandomAccessFile raf = new RandomAccessFile(fileName, "rw");
    raf.writeInt(0);
    raf.writeUTF("Hello world!");
    raf.close();
  }
}
```
