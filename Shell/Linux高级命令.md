# expect
expect是一个自动化交互套件，主要应用于执行命令和程序时，系统以交互形式要求输入指定字符串，实现交互通信。

expect自动交互流程：

spawn启动指定进程---expect获取指定关键字---send向指定程序发送指定字符---执行完成退出.

注意该脚本能够执行的前提是安装了expect

```shell
yum install -y expect
```


# curl

curl 是常用的命令行工具，用来请求 Web 服务器。它的名字就是客户端（client）的 URL 工具的意思。

**语法**

```bash
curl [option] [url]
```

**参数说明**：

- -b	用来向服务器发送 Cookie。
- -c　将服务器设置的 Cookie 写入一个文件
- -d　用于发送 POST 请求的数据体，可以读取本地文本文件的数据，向服务器发送
- --data-urlencode    等同于-d，发送 POST 请求的数据体，区别在于会自动将发送的数据进行 URL 编码
- -G    用来构造 URL 的查询字符串
- -H    添加 HTTP 请求的标头
- -o     将服务器的回应保存成文件，等同于`wget`命令
- -O    将服务器回应保存成文件，并将 URL 的最后部分当作文件名
- -u    用来设置服务器认证的用户名和密码
- -v    输出通信的整个过程，用于调试
- -X    指定 HTTP 请求的方法

**示例**

```bash
# 向服务器发送 Cookie
$ curl -b 'foo1=bar;foo2=bar2' https://google.com
# 读取本地文件cookies.txt，里面是服务器设置的 Cookie
$ curl -b cookies.txt https://www.google.com
# 将服务器的 HTTP 回应所设置 Cookie 写入文本文件cookies.txt
$ curl -c cookies.txt https://www.google.com
# 发送 POST 请求的数据体
$ curl -d'login=emma＆password=123'-X POST https://google.com/login
# 或者
$ curl -d 'login=emma' -d 'password=123' -X POST  https://google.com/login
# 读取data.txt文件的内容，作为数据体向服务器发送
$ curl -d '@data.txt' https://google.com/login
# 会发出一个 GET 请求，实际请求的 URL 为https://google.com/search?q=kitties&count=20。如果省略--G，会发出一个 POST 请求。
$ curl -G -d 'q=kitties' -d 'count=20' https://google.com/search
# 数据需要 URL 编码，可以结合--data--urlencode参数
$ curl -G --data-urlencode 'comment=hello world' https://www.example.com
# 将www.example.com保存成example.html
$ curl -o example.html https://www.example.com
# 将服务器回应保存成文件，文件名为bar.html
$ curl -O https://www.example.com/foo/bar.html
# 命令设置用户名为bob，密码为12345
$ curl -u 'bob:12345' https://google.com/login
# curl 能够识别 URL 里面的用户名和密码
$ curl https://bob:12345@google.com/login
# 命令只设置了用户名，执行后，curl 会提示用户输入密码
$ curl -u 'bob' https://google.com/login
$ curl -v https://www.example.com
# 对https://www.example.com发出 POST 请求。
$ curl -X POST https://www.example.com
```


# export 

export 命令用于设置或显示环境变量。 

**语法**

```
export [-fnp][变量名称]=[变量设置值]
```

**参数说明**：

- -f 　代表[变量名称]中为函数名称。
- -n 　删除指定的变量。变量实际上并未删除，只是不会输出到后续指令的执行环境中。
- -p 　列出所有的shell赋予程序的环境变量。

export设置环境变量是暂时的，只在本次登录中有效。

通过2种方式，使命令长久有效

第一种：

修改profile文件：

```shell
$ sudo gedit /etc/profile     #该修改将对所有用户都起作用。
```

在文件里面加入:

```shell
export PATH=$PATH:/opt/ros/bin
```

```shell
# 生效，否则新加的环境变量不会生效
$ source /etc/profile
```

这个在我们的机器上是大家共用的，建议不修改这个！

第二种：

只修改自己根路径下的

修改自己home路径下的 ~/.bashrc 或 ~/.bash_profile 文件：

```shell
$ gedit ~/.bashrc  #只对本用户起作用。
```

在文件里面加入：

```
export PATH=$PATH:/opt/ros/bin
```

# awk

AWK 是一种处理文本文件的语言，是一个强大的文本分析工具。

**语法**

```shell
awk [选项参数] 'script' var=value file(s)
或
awk [选项参数] -f scriptfile var=value file(s)
```

**选项参数说明：**

- -F fs or --field-separator fs
  指定输入文件折分隔符，fs是一个字符串或者是一个正则表达式，如-F:。
- -v var=value or --asign var=value
  赋值一个用户定义变量。
- -f scripfile or --file scriptfile
  从脚本文件中读取awk命令。
- -mf nnn and -mr nnn
  对nnn值设置内在限制，-mf选项限制分配给nnn的最大块数目；-mr选项限制记录的最大数目。这两个功能是Bell实验室版awk的扩展功能，在标准awk中不适用。
- -W compact or --compat, -W traditional or --traditional
  在兼容模式下运行awk。所以gawk的行为和标准的awk完全一样，所有的awk扩展都被忽略。
- -W copyleft or --copyleft, -W copyright or --copyright
  打印简短的版权信息。
- -W help or --help, -W usage or --usage
  打印全部awk选项和每个选项的简短说明。
- -W lint or --lint
  打印不能向传统unix平台移植的结构的警告。
- -W lint-old or --lint-old
  打印关于不能向传统unix平台移植的结构的警告。
- -W posix
  打开兼容模式。但有以下限制，不识别：/x、函数关键字、func、换码序列以及当fs是一个空格时，将新行作为一个域分隔符；操作符**和**=不能代替^和^=；fflush无效。
- -W re-interval or --re-inerval
  允许间隔正则表达式的使用，参考(grep中的Posix字符类)，如括号表达式[[:alpha:]]。
- -W source program-text or --source program-text
  使用program-text作为源代码，可与-f命令混用。
- -W version or --version
  打印bug报告信息的版本。

log.txt文本内容如下：

```
2 this is a test
3 Are you like awk
This's a test
10 There are orange,apple,mongo

```

用法一：

```shell
awk '{[pattern] action}' {filenames}   # 行匹配语句 awk '' 只能用单引号
```

```shell
# 每行按空格或TAB分割，输出文本中的1、4项
$ awk '{print $1,$4}' log.txt
---------------------------------------------
2 a
3 like
This's
10 orange,apple,mongo
# 格式化输出
$ awk '{printf "%-8s %-10s\n",$1,$4}' log.txt
---------------------------------------------
2        a
3        like
This's
10       orange,apple,mongo

```

用法二：

```shell
awk -F  #-F相当于内置变量FS, 指定分割字符
```

实例：

```shell
# 使用","分割
$  awk -F, '{print $1,$2}'   log.txt
---------------------------------------------
2 this is a test
3 Are you like awk
This's a test
10 There are orange apple
# 或者使用内建变量
$ awk 'BEGIN{FS=","} {print $1,$2}'     log.txt
---------------------------------------------
2 this is a test
3 Are you like awk
This's a test
10 There are orange apple
# 使用多个分隔符.先使用空格分割，然后对分割结果再使用","分割
$ awk -F '[ ,]'  '{print $1,$2,$5}'   log.txt
---------------------------------------------
2 this test
3 Are awk
This's a
10 There apple
```

用法三：

```shell
awk -v  # 设置变量
```

实例：

```shell
 $ awk -va=1 '{print $1,$1+a}' log.txt
 ---------------------------------------------
 2 3
 3 4
 This's 1
 10 11
 $ awk -va=1 -vb=s '{print $1,$1+a,$1b}' log.txt
 ---------------------------------------------
 2 3 2s
 3 4 3s
 This's 1 This'ss
 10 11 10s
```

用法四：

```shell
awk -f {awk脚本} {文件名}
```

实例：

```
 $ awk -f cal.awk log.txt

```

## 运算符

| 运算符                  | 描述                             |
| ----------------------- | -------------------------------- |
| = += -= *= /= %= ^= **= | 赋值                             |
| ?:                      | C条件表达式                      |
| \|\|                    | 逻辑或                           |
| &&                      | 逻辑与                           |
| ~ 和 !~                 | 匹配正则表达式和不匹配正则表达式 |
| < <= > >= != ==         | 关系运算符                       |
| 空格                    | 连接                             |
| + -                     | 加，减                           |
| * / %                   | 乘，除与求余                     |
| + - !                   | 一元加，减和逻辑非               |
| ^ ***                   | 求幂                             |
| ++ --                   | 增加或减少，作为前缀或后缀       |
| $                       | 字段引用                         |
| in                      | 数组成员                         |

过滤第一列大于2的行

```shell
$ awk '$1>2' log.txt    #命令
#输出
3 Are you like awk
This's a test
10 There are orange,apple,mongo
```

过滤第一列等于2的行

```shell
$ awk '$1==2 {print $1,$3}' log.txt    #命令
#输出
2 is
```

过滤第一列大于2并且第二列等于'Are'的行

```shell
$ awk '$1>2 && $2=="Are" {print $1,$2,$3}' log.txt    #命令
#输出
3 Are you
```

## 内建变量

| 变量        | 描述                                                       |
| ----------- | ---------------------------------------------------------- |
| $n          | 当前记录的第n个字段，字段间由FS分隔                        |
| $0          | 完整的输入记录                                             |
| ARGC        | 命令行参数的数目                                           |
| ARGIND      | 命令行中当前文件的位置(从0开始算)                          |
| ARGV        | 包含命令行参数的数组                                       |
| CONVFMT     | 数字转换格式(默认值为%.6g)ENVIRON环境变量关联数组          |
| ERRNO       | 最后一个系统错误的描述                                     |
| FIELDWIDTHS | 字段宽度列表(用空格键分隔)                                 |
| FILENAME    | 当前文件名                                                 |
| FNR         | 各文件分别计数的行号                                       |
| FS          | 字段分隔符(默认是任何空格)                                 |
| IGNORECASE  | 如果为真，则进行忽略大小写的匹配                           |
| NF          | 一条记录的字段的数目                                       |
| NR          | 已经读出的记录数，就是行号，从1开始                        |
| OFMT        | 数字的输出格式(默认值是%.6g)                               |
| OFS         | 输出记录分隔符（输出换行符），输出时用指定的符号代替换行符 |
| ORS         | 输出记录分隔符(默认值是一个换行符)                         |
| RLENGTH     | 由match函数所匹配的字符串的长度                            |
| RS          | 记录分隔符(默认是一个换行符)                               |
| RSTART      | 由match函数所匹配的字符串的第一个位置                      |
| SUBSEP      | 数组下标分隔符(默认值是/034)                               |

```shell
$ awk 'BEGIN{printf "%4s %4s %4s %4s %4s %4s %4s %4s %4s\n","FILENAME","ARGC","FNR","FS","NF","NR","OFS","ORS","RS";printf "---------------------------------------------\n"} {printf "%4s %4s %4s %4s %4s %4s %4s %4s %4s\n",FILENAME,ARGC,FNR,FS,NF,NR,OFS,ORS,RS}'  log.txt
FILENAME ARGC  FNR   FS   NF   NR  OFS  ORS   RS
---------------------------------------------
log.txt    2    1         5    1
log.txt    2    2         5    2
log.txt    2    3         3    3
log.txt    2    4         4    4
$ awk -F\' 'BEGIN{printf "%4s %4s %4s %4s %4s %4s %4s %4s %4s\n","FILENAME","ARGC","FNR","FS","NF","NR","OFS","ORS","RS";printf "---------------------------------------------\n"} {printf "%4s %4s %4s %4s %4s %4s %4s %4s %4s\n",FILENAME,ARGC,FNR,FS,NF,NR,OFS,ORS,RS}'  log.txt
FILENAME ARGC  FNR   FS   NF   NR  OFS  ORS   RS
---------------------------------------------
log.txt    2    1    '    1    1
log.txt    2    2    '    1    2
log.txt    2    3    '    2    3
log.txt    2    4    '    1    4
# 输出顺序号 NR, 匹配文本行号
$ awk '{print NR,FNR,$1,$2,$3}' log.txt
---------------------------------------------
1 1 2 this is
2 2 3 Are you
3 3 This's a test
4 4 10 There are
# 指定输出分割符
$  awk '{print $1,$2,$5}' OFS=" $ "  log.txt
---------------------------------------------
2 $ this $ test
3 $ Are $ awk
This's $ a $
10 $ There $
```

## 使用正则，字符串匹配

```shell
# 输出第二列包含 "th"，并打印第二列与第四列
$ awk '$2 ~ /th/ {print $2,$4}' log.txt
---------------------------------------------
this a
```

**~ 表示模式开始。// 中是模式。**

```shell
# 输出包含 "re" 的行
$ awk '/re/ ' log.txt
---------------------------------------------
3 Are you like awk
10 There are orange,apple,mongo
```

------

## 忽略大小写

```shell
$ awk 'BEGIN{IGNORECASE=1} /this/' log.txt
---------------------------------------------
2 this is a test
This's a test
```

------

## 模式取反

```shell
$ awk '$2 !~ /th/ {print $2,$4}' log.txt
---------------------------------------------
Are like
a
There orange,apple,mongo
$ awk '!/th/ {print $2,$4}' log.txt
---------------------------------------------
Are like
a
There orange,apple,mongo
```

------

## awk脚本

关于 awk 脚本，我们需要注意两个关键词 BEGIN 和 END。

- BEGIN{ 这里面放的是执行前的语句 }
- END {这里面放的是处理完所有的行后要执行的语句 }
- {这里面放的是处理每一行时要执行的语句}

假设有这么一个文件（学生成绩表）：

```shell
$ cat score.txt
Marry   2143 78 84 77
Jack    2321 66 78 45
Tom     2122 48 77 71
Mike    2537 87 97 95
Bob     2415 40 57 62
```

我们的 awk 脚本如下：

```shell
$ cat cal.awk
#!/bin/awk -f
#运行前
BEGIN {
    math = 0
    english = 0
    computer = 0
 
    printf "NAME    NO.   MATH  ENGLISH  COMPUTER   TOTAL\n"
    printf "---------------------------------------------\n"
}
#运行中
{
    math+=$3
    english+=$4
    computer+=$5
    printf "%-6s %-6s %4d %8d %8d %8d\n", $1, $2, $3,$4,$5, $3+$4+$5
}
#运行后
END {
    printf "---------------------------------------------\n"
    printf "  TOTAL:%10d %8d %8d \n", math, english, computer
    printf "AVERAGE:%10.2f %8.2f %8.2f\n", math/NR, english/NR, computer/NR
}
```

```shell
$ awk -f cal.awk score.txt
NAME    NO.   MATH  ENGLISH  COMPUTER   TOTAL
---------------------------------------------
Marry  2143     78       84       77      239
Jack   2321     66       78       45      189
Tom    2122     48       77       71      196
Mike   2537     87       97       95      279
Bob    2415     40       57       62      159
---------------------------------------------
  TOTAL:       319      393      350
AVERAGE:     63.80    78.60    70.00
```

# linux中export与source的作用

首先说明两个概念：

父shell与子shell，从shellA中启动一个shell，称之为shellB。 shellA为父shell，shellB为子shell。

最容易理解的情况就是在一个shell中执行一个gnome-terminal命令（不同桌面环境命令不一样），弹出一个新的shell

最常见的情况是在当前shell下执行脚本，这个脚本实际上是在子shell中执行的

这里用最常见的情况举例：在当前shell下执行脚本

现在有三个脚本

```shell
#exp1.sh
var="hello,world"
```

```shell
#exp2.sh
var="hello,world"
export var
```

```shell
#test.sh
echo $var
```

实验1：

```shell
$ source exp1.sh
$ echo $var
hello,world
$ bash test.sh
```

实验2：

```shell
$ source exp2.sh
$ echo $var
hello,world
$ bash test.sh
hello,world
```

可以看到在当前shell下执行echo $var是没有任何问题的，但是执行bash test.sh时，实验1是没有任何输出（找不到var这个变量）。实验2 echo $var也是没有任何问题的，因为实验2中exp2.sh加入了export，所以var变成了环境变量，var对子shell是可见的。而实验1中由于没有export var，所以var是个局部变量，并不能被子shell看到。

 linux中在 profile 或者 bashrc 或者其他类似的文件中设置环境变量时（比如PATH），如果没有export，那么只能在直接启动的shell中起作用，如果在当前shell下运行脚本或者直接启动一个子shell，因为实际上是局部变量，子shell看不见的。

**Linux source命令：**

通常用法：source filepath 或 . filepath

功能：使当前shell读入路径为filepath的shell文件并依次执行文件中的所有语句，通常用于重新执行刚修改的初始化文件，使之立即生效，而不必注销并重新登录。例如，当我们修改了/etc/profile文件，并想让它立刻生效，而不用重新登录，就可以使用source命令，如source /etc/profile。

source命令(从 C Shell 而来)是bash shell的内置命令；点命令(.)，就是个点符号(从Bourne Shell而来)是source的另一名称。这从用法中也能看出来。

**source filepath 与 sh filepath 、./filepath的区别****：**

1. 当shell脚本具有可执行权限时，用sh filepath与./filepath是没有区别的。./filepath是因为当前目录没有在PATH中，所有"."是用来表示当前目录的。
2. sh filepath 会重新建立一个子shell，在子shell中执行脚本里面的语句，该子shell继承父shell的环境变量，但子shell是新建的，其改变的变量不会被带回父shell，除非使用export。
3. source filename其实只是简单地读取脚本里面的语句依次在当前shell里面执行，没有建立新的子shell。那么脚本里面所有新建、改变变量的语句都会保存在当前shell里面。

**举例说明：**

1. 新建一个test.sh脚本，内容为:A=1；
2. 修改其可执行权限：chmod +x test.sh；
3. 运行sh test.sh后，echo $A，显示为空，因为A=1并未传回给当前shell；
4. 运行./test.sh后，也是一样的效果；
5. 运行source test.sh 或者 . test.sh，然后echo $A，则会显示1，说明A=1的变量在当前shell中；
