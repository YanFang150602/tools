MySQL

mysql 8.0.20 winx64安装配置方法

# MySQL下载

下载MySQL Community Server：                   

![img](file:///C:/Users/83864/AppData/Local/Temp/msohtmlclip1/01/clip_image002.jpg)

点击Download按钮。

进入下图中

![img](file:///C:/Users/83864/AppData/Local/Temp/msohtmlclip1/01/clip_image004.jpg)

[点击No thanks, just start my download.](https://dev.mysql.com/get/Downloads/MySQL-8.0/mysql-8.0.20-winx64.zip)可以进行免登录下载

# 安装

**将下载的****zip****解压到指定目录**

![img](file:///C:/Users/83864/AppData/Local/Temp/msohtmlclip1/01/clip_image006.png)

## 配置环境变量

**系统变量****:**

MYSQL_HOME = C:\software\mysql-8.0.20-winx64

![img](file:///C:/Users/83864/AppData/Local/Temp/msohtmlclip1/01/clip_image008.jpg)

**系统变量****:**

path = %MYSQL_HOME%\bin

![img](file:///C:/Users/83864/AppData/Local/Temp/msohtmlclip1/01/clip_image009.png)

环境变量也可以不用配置，直接进入C:\software\mysql-8.0.20-winx64\bin目录下，执行mysqld、mysql命令

## my.ini

在C:\software\mysql-8.0.20-winx64目录下新建一个my.ini 用记事本打开，复制以下代码，没有my.ini ，数据库启动时无法初始化参数

[mysql]

; 设置mysql客户端默认字符集

default-character-set=utf8

[mysqld]

;设置3306端口

port = 3306 

; 设置mysql的安装目录

basedir=C://software/mysql-8.0.20-winx64

; 设置mysql数据库的数据的存放目录

datadir=C://software/mysql-8.0.20-winx64/data

; 允许最大连接数

max_connections=200

; 服务端使用的字符集默认为8比特编码的latin1字符集

character-set-server=utf8

; 创建新表时将使用的默认存储引擎

default-storage-engine=INNODB

## 注册服务

管理员命令进入CMD

![img](file:///C:/Users/83864/AppData/Local/Temp/msohtmlclip1/01/clip_image011.png)

在命令行窗口输入mysqld --install 回车:

![img](file:///C:/Users/83864/AppData/Local/Temp/msohtmlclip1/01/clip_image013.png)

服务注册成功

## 获取随机密码

**以管理员的身份打开****cmd****命令窗口，（获取初始密码，二选一）**

1、mysqld –initialize，初始化mysql的data数据目录，初始化完毕后，会在解压目录下生成一个data文件夹， 在这个文件夹下有一个.err结尾的文件，打开后会有随机生成的密码。

![img](file:///C:/Users/83864/AppData/Local/Temp/msohtmlclip1/01/clip_image015.png)

2、输入命令mysqld --initialize --console，生成随机密码

![img](file:///C:/Users/83864/AppData/Local/Temp/msohtmlclip1/01/clip_image017.png)

# 启动服务

## 通过服务列表启动服务

![img](file:///C:/Users/83864/AppData/Local/Temp/msohtmlclip1/01/clip_image019.png)

右击，启动、停止等选项，对服务可以启动、停止

![img](file:///C:/Users/83864/AppData/Local/Temp/msohtmlclip1/01/clip_image021.png)

## 通过命令启动服务

 

管理员命令net start MySQL

# 修改密码

使用随机密码登录并修改密码 ：

mysql -u root -p

修改登陆密码 ‘新密码' 替换你需要的新密码:

**ALTER** USER 'root'@'localhost' IDENTIFIED **BY** '新密码';
