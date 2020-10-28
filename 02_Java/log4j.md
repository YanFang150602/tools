## 项目准备

```shell
$ mvn archetype:generate -DgroupId=com.test -DartifactId=Test -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false
```

```
Test
  |-src
    |-main
      |-java
        |-com
          |-test
    |-test
  |-pom.xml
```

## `log4j`依赖

### `pom.xml`

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.test</groupId>
  <artifactId>Test</artifactId>
  <packaging>jar</packaging>
  <version>1.0-SNAPSHOT</version>
  <name>Test</name>
  <url>http://maven.apache.org</url>
  <dependencies>
    <dependency>
      <groupId>log4j</groupId>
      <artifactId>log4j</artifactId>
      <version>1.2.12</version>
    </dependency>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>3.8.1</version>
      <scope>test</scope>
    </dependency>
  </dependencies>
</project>
```

### `src/main/resources/log4j.properties`

```properties
log4j.rootLogger=DEBUG,CONSOLE,LOGFILE,
log4j.appender.CONSOLE=org.apache.log4j.ConsoleAppender
log4j.appender.CONSOLE.layout=org.apache.log4j.PatternLayout
log4j.appender.CONSOLE.layout.ConversionPattern=%-4r %-5p %d{yyyy-MM-dd HH:mm:ss} %c %m%n

log4j.appender.LOGFILE=org.apache.log4j.RollingFileAppender
log4j.appender.LOGFILE.File=Log4jTest.log
log4j.appender.LOGFILE.MaxFileSize=20KB
log4j.appender.LOGFILE.MaxBackupIndex=2
log4j.appender.LOGFILE.layout=org.apache.log4j.PatternLayout
log4j.appender.LOGFILE.layout.ConversionPattern=%-4r %-5p %d{yyyy-MM-dd HH:mm:ss} %c %m%n
```

`src/main/resources/log4j.properties`文件里的`CONSOLE`类型的`Appender`会将日志输出到控制台里

`src/main/resources/log4j.properties`文件里的`LOGFILE`类型的`Appender`会将日志记录到`log4jTest.log`文件里

## 自定义`log4j`的`Appender`

继承`log4j`公共的基类：`AppenderSkeleton`

打印日志核心方法：`abstract protected void append(LoggingEvent event)`

初始化加载资源：`public void activateOptions()`，默认实现为空

释放资源：`public void close()`

是否需要按格式输出文本：`public boolean requiresLayout()`，正常情况下我们只需要覆盖append方法，然后就可以在log4j中使用

### `com.test.log4j.HelloAppender.java`

```java
package com.test.log4j;

import org.apache.log4j.AppenderSkeleton;
import org.apache.log4j.spi.LoggingEvent;

public class HelloAppender extends AppenderSkeleton {
    private String account ;

    @Override
    protected void append(LoggingEvent event) {
        System.out.println("Hello, " + account + " : "+ event.getMessage());
    }

    @Override
    public void close() {
    }

    @Override
    public boolean requiresLayout() {
        return false;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }
}

```

### `src/main/resources/log4j.properties`（配置自定义`Appender`）

```properties
log4j.rootLogger=DEBUG,LOGFILE,Hello

log4j.appender.LOGFILE=org.apache.log4j.RollingFileAppender
log4j.appender.LOGFILE.File=Log4jTest.log
log4j.appender.LOGFILE.MaxFileSize=20KB
log4j.appender.LOGFILE.MaxBackupIndex=2
log4j.appender.LOGFILE.layout=org.apache.log4j.PatternLayout
log4j.appender.LOGFILE.layout.ConversionPattern=%-4r %-5p %d{yyyy-MM-dd HH:mm:ss} %c %m%n

log4j.appender.Hello=com.test.log4j.HelloAppender
log4j.appender.Hello.account=localhost
log4j.appender.Hello.layout=org.apache.log4j.PatternLayout
log4j.appender.Hello.layout.ConversionPattern=%-4r %-5p %d{yyyy-MM-dd HH:mm:ss} %c %m%n
```

### `com.test.log4j.HelloAppenderTest.java`测试类

```java
package com.test.log4j;

import org.apache.log4j.Logger;
import org.junit.Test;

public class HelloAppenderTest {
    private Logger logger = Logger.getLogger(HelloAppenderTest.class.getName());

    @Test
    public void testLog() {
        logger.info("你好，HelloAppender!");
        try {
            throw new RuntimeException("我是exception");
        }catch(Exception e) {
            logger.error(e.getMessage(), e);
        }
    }
}

```

### 日志输出

`src/main/resources/log4j.properties`文件里的`Hello`类型的`Appender`会将日志输出到控制台里，如下

```
Hello, localhost : 你好，HelloAppender!
Hello, localhost : 我是exception
```

## `Logger.getLogger()`和`LogFactory.getLog()`的区别

1、`Logger.getLogger()`是使用`log4j`的方式记录日志

2、`LogFactory.getLog()`则来自`apache`的`common-logging`包

## `Log4j`介绍

### `Log4j`的架构

`log4j`系统的三大板块：日志写入器、日志输出终端、日志布局模式

`Logger`类是日志包的核心，`Logger`的名称是大小写敏感的，并且名称之间有继承关系。子名由父名做前缀，用点号`"."`分隔，如`x.y`是`x.y.z`的父亲`Logger`。`Logger`系统中有个根`logger`，是所有`logger`的祖先，它总是存在的，并且不可以通过名字获取，可以通过`Logger.getRootLogger()`来获取。获取`Logger`对象的方法很多，可以参考API文档，在某对象中，用该对象所属的类作为参数，调用`Logger.getLogger(Class clazz)`以获取`logger`对象被认为是目前所知最理智的命名`logger`方法。

### `Log4j`的日志级别（`Level`）

每个`logger`都有一个日志级别，用来控制日志的输出。未分配级别的`logger`将自动继承它最近的父`logger`的日志级别。`Logger`的由低到高级别如下：
   `ALL<DEBUG<INFO<WARN<ERROR<FATAL<OFF`

### `Log4j`的输出终端（`Appender`接口）

​    `Log4j`提供了以下几个实现：

```java
org.apache.log4j.ConsoleAppender(控制台)   
org.apache.log4j.FileAppender(文件)   
org.apache.log4j.DailyRollingFileAppender(每天都产生一个日志文件)   
org.apache.log4j.RollingFileAppender(文件大小达到指定尺寸时产生一个新的日志文件，文件名称上会自动添加数字序号。)   
org.apache.log4j.WriterAppender(将日志信息以流的格式发送到任意指定的地方)  
org.apache.log4j.ConsoleAppender(控制台)
org.apache.log4j.FileAppender(文件)
org.apache.log4j.DailyRollingFileAppender(每天都产生一个日志文件)
org.apache.log4j.RollingFileAppender(文件大小达到指定尺寸时产生一个新的日志文件，文件名称上会自动添加数字序号。)
org.apache.log4j.WriterAppender(将日志信息以流的格式发送到任意指定的地方)
```

   默认情况下，子`logger`将继承父`logger`的所有`appenders`。

### `Log4j`的输出布局模式（`Layout`接口）

   `Log4j`提供`Layout`有以下几种：

```java
org.apache.log4j.HTMLLayout（以HTML表格形式布局）   
org.apache.log4j.PatternLayout（可以灵活地指定布局模式）   
org.apache.log4j.SimpleLayout（包含日志信息的级别和信息字符串）   
org.apache.log4j.TTCCLayout（包含日志产生的时间、线程、类别等信息）  
org.apache.log4j.HTMLLayout（以HTML表格形式布局）
org.apache.log4j.PatternLayout（可以灵活地指定布局模式）
org.apache.log4j.SimpleLayout（包含日志信息的级别和信息字符串）
org.apache.log4j.TTCCLayout（包含日志产生的时间、线程、类别等信息）
```

   `Log4j`采用类似`C`语言中的`printf`函数的打印格式格式化日志信息。打印参数如下：

```
%m：输出代码中指定的消息。   
%p：输出优先级。   
%r：输入自应用启动到输出该log信息耗费的毫秒数。   
%c：输出所属的类目，通常就是所在类的全名。   
%n：输出一个回车换行符。Windows平台为“\r\n”，UNIX为“\n”。   
%d：输出日志时间点的日期或时间，默认格式为ISO8601，推荐使用“%d{ABSOLUTE}”，这个输出格式形如：“2007-05-07 18:23:23,500”，符合中国人习惯。   
%l：输出日志事件发生的位置，包括类名、线程名，以及所在代码的行数。  
%m：输出代码中指定的消息。
%c：输出所属的类目，通常就是所在类的全名。
%t：输出产生该日志线程的线程名。
%n：输出一个回车换行符。Windows平台为“\r\n”，UNIX为“\n”。
%d：输出日志时间点的日期或时间，默认格式为ISO8601，推荐使用“%d{ABSOLUTE}”，这个输出格式形如：“2007-05-07 18:23:23,500”，符合中国人习惯。
%l：输出日志事件发生的位置，包括类名、线程名，以及所在代码的行数。
%d 输出日志时间点的日期或时间，默认格式为ISO8601，也可以在其后指定格式，比如：%d{yyy-MM-dd HH:mm:ss }，输出类似：2002-10-18- 22：10：28
%f 输出日志信息所属的类的类名
%l 输出日志事件的发生位置，即输出日志信息的语句处于它所在的类的第几行
%m 输出代码中指定的信息，如log(message)中的message
%p 输出优先级，即DEBUG，INFO，WARN，ERROR，FATAL。如果是调用debug()输出的，则为DEBUG，依此类推
%r 输出自应用启动到输出该日志信息所耗费的毫秒数
```

### `Log4j`的配置

 在实际使用中，`Log4j`一般是通过配置文件配置使用的。配置文件有两种，`Java properties`和`XML`文件。一般都选用`properties`文件来配置，因为简洁易读。下面只介绍`Java properties`的配置方式。
对`Log4j`的配置就是对`rootLogger`和子`Logger`的配置。主要的配置项为：`rootLogger`、输出终端、输出布局模式，所有的配置项都必须以`log4j`开头。
配置文件的示例： 

```java
##Log4J的配置之简单使它遍及于越来越多的应用中了   
##Log4J配置文件实现了输出到控制台、文件、回滚文件、发送日志邮件、输出到数据库日志表、自定义标签等全套功能。择其一二使用就够用了。   

log4j.rootLogger = DEBUG, CONSOLE,A1   
log4j.addivity.org.apache = true  

# 应用于控制台   
log4j.appender.CONSOLE = org.apache.log4j.ConsoleAppender   
log4j.appender.Threshold = DEBUG   
log4j.appender.CONSOLE.Target = System.out   
log4j.appender.CONSOLE.layout = org.apache.log4j.PatternLayout   
log4j.appender.CONSOLE.layout.ConversionPattern = [framework] % d - % c -%- 4r [ % t] %- 5p % c % x - % m % n   
#log4j.appender.CONSOLE.layout.ConversionPattern = [start] % d {DATE} [DATE] % n % p[PRIORITY] % n % x[NDC] % n % t[THREAD] n % c[CATEGORY] % n % m[MESSAGE] % n % n   

#应用于文件   
log4j.appender.FILE = org.apache.log4j.FileAppender   
log4j.appender.FILE.File = file.log   
log4j.appender.FILE.Append = false  
log4j.appender.FILE.layout = org.apache.log4j.PatternLayout   
log4j.appender.FILE.layout.ConversionPattern = [framework] % d - % c -%- 4r [ % t] %- 5p % c % x - % m % n   

# Use this layout for LogFactor 5 analysis   
# 应用于文件回滚   
log4j.appender.ROLLING_FILE = org.apache.log4j.RollingFileAppender   
log4j.appender.ROLLING_FILE.Threshold = ERROR   
log4j.appender.ROLLING_FILE.File = rolling.log   
log4j.appender.ROLLING_FILE.Append = true  
log4j.appender.ROLLING_FILE.MaxFileSize = 10KB   
log4j.appender.ROLLING_FILE.MaxBackupIndex = 1  
log4j.appender.ROLLING_FILE.layout = org.apache.log4j.PatternLayout   
log4j.appender.ROLLING_FILE.layout.ConversionPattern = [framework] % d - % c -%- 4r [ % t] %- 5p % c % x - % m % n   

#应用于socket   
log4j.appender.SOCKET = org.apache.log4j.RollingFileAppender   
log4j.appender.SOCKET.RemoteHost = localhost   
log4j.appender.SOCKET.Port = 5001  
log4j.appender.SOCKET.LocationInfo = true  

# Set up for Log Facter 5  
log4j.appender.SOCKET.layout = org.apache.log4j.PatternLayout   
log4j.appender.SOCET.layout.ConversionPattern = [start] % d {DATE} [DATE] % n % p[PRIORITY] % n % x[NDC] % n % t[THREAD] % n % c[CATEGORY] % n % m[MESSAGE] % n % n   

# Log Factor 5 Appender   
log4j.appender.LF5_APPENDER = org.apache.log4j.lf5.LF5Appender   
log4j.appender.LF5_APPENDER.MaxNumberOfRecords = 2000  

# 发送日志给邮件   
log4j.appender.MAIL = org.apache.log4j.net.SMTPAppender   
log4j.appender.MAIL.Threshold = FATA   
log4j.appender.MAIL.BufferSize = 10  
log4j.appender.MAIL.From = web@www.wuset.com   
log4j.appender.MAIL.SMTPHost = www.wusetu.com   
log4j.appender.MAIL.Subject = Log4J Message   
log4j.appender.MAIL.To = web@www.wusetu.com   
log4j.appender.MAIL.layout = org.apache.log4j.PatternLayout   
log4j.appender.MAIL.layout.ConversionPattern = [framework] % d - % c -%- 4r [ % t] %- 5p % c % x - % m % n   

# 用于数据库   
log4j.appender.DATABASE = org.apache.log4j.jdbc.JDBCAppender   
log4j.appender.DATABASE.URL = jdbc:mysql://localhost:3306/test   
log4j.appender.DATABASE.driver = com.mysql.jdbc.Driver   
log4j.appender.DATABASE.user = root   
log4j.appender.DATABASE.password =   
log4j.appender.DATABASE.sql = INSERT INTO LOG4J (Message) VALUES ( ' [framework] %d - %c -%-4r [%t] %-5p %c %x - %m%n ' )   
log4j.appender.DATABASE.layout = org.apache.log4j.PatternLayout   
log4j.appender.DATABASE.layout.ConversionPattern = [framework] % d - % c -%- 4r [ % t] %- 5p % c % x - % m % n   

log4j.appender.A1 = org.apache.log4j.DailyRollingFileAppender   
log4j.appender.A1.File = SampleMessages.log4j   
log4j.appender.A1.DatePattern = yyyyMMdd - HH ' .log4j '  
log4j.appender.A1.layout = org.apache.log4j.xml.XMLLayout   

#自定义Appender   
log4j.appender.im = net.cybercorlin.util.logger.appender.IMAppender   
log4j.appender.im.host = mail.cybercorlin.net   
log4j.appender.im.username = username   
log4j.appender.im.password = password   
log4j.appender.im.recipient = corlin@cybercorlin.net   
log4j.appender.im.layout = org.apache.log4j.PatternLayout   
log4j.appender.im.layout.ConversionPattern = [framework] % d - % c -%- 4r [ % t] %- 5p % c % x - % m % n   

```
