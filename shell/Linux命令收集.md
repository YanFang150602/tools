# sed 

sed 命令是利用脚本来处理文本文件。 

**sed -[]常用的参数及其作用：**
-n ：安静模式。在sed的一般用法中，所有来自文件中的数据都会被列出到屏幕上，如果加上-n，则只有经过sed特殊处理的那行（或操作）才会被列出来。
-e ：直接下命令行模式上进行sed的动作编辑。
-f ：直接将sed的动作写在一个文件内，-f filename 则可以执行file内的sed动作。
-r ：sed的动作支持的是扩展型正则表达式的语法（默认是基础正则表达式的语法）。
-i ：可直接对源文件内容进行修改。**危险操作**
-h或–help：显示帮助；
-V或–version：显示版本信息

**function有下面这些参数**
i：插入，在目标行的上面新增一行。
a：插入，在目标行的下面新增一行。
d：删除所选行。
p：打印，也就是将某个选择的数据打印出来，通常参数-p与参数-n搭配使用。
s：替换，可以直接进行替换的工作。
c：替换，c的后面可以接替字符串，这些字符串可以替换n1，n2之间的行。
w：写并追加模板块到file末尾。
W：写并追加模板块的第一行到file末尾。
!：表示后面的命令对所有没有被选定的行发生作用。
=：打印当前行号; # 把注释扩展到下一个换行符以前。
**以上参数皆不改变原文件内容**

**sed替换标记**
g ：表示行内全面替换;
x： 表示互换模板块中的文本和缓冲区中的文本;
y ：表示把一个字符翻译为另外的字符（但是不用于正则表达式）;
\1： 子串匹配标记;
& ：已匹配字符串标记;

**sed元字符集**
^ 匹配行开始，如：/^ sed/匹配所有以sed开头的行
$ 匹配行结束，如：/sed$/匹配所有以sed结尾的行;
.： 匹配一个非换行符的任意字符，如：/s.d/匹配s后接一个任意字符，后是d;
*：匹配0个或多个字符，如：/*sed/匹配所有模板是一个或多个空格后紧跟sed的行;
[] 匹配一个指定范围内的字符，如/[ss]ed/匹配sed和Sed;
[^] 匹配一个不在指定范围内的字符，如：/[^A-RT-Z]ed/匹配不包含A-R和T-Z的一个字母开头，紧跟ed的行;
\ (…\ ) 匹配子串，保存匹配的字符，如s/(love)able/\1rs，loveable被替换成lovers;
& 保存搜索字符用来替换其他字符，如s/love/&/，love这成love;
< 匹配单词的开始，如:/\
\> 匹配单词的结束，如/love>/匹配包含以love结尾的单词的行;
x{m} 重复字符x，m次，如：/0{5}/匹配包含5个0的行;
x{m,} 重复字符x，至少m次，如：/0{5,}/匹配至少有5个0的行; x{m,n} 重复字符x，至少m次，不多于n次，如：/0{5,10}/匹配5~10个0的行;

**各参数的使用** 

对function参数的使用

打印行 : 

-n 'n1 p’		打印第n行，且原文件内容不变； 

-n ‘n1,n2 p’	打印n1到n2行，且原文件内容不变 

```shell
$cat /etc/passwd
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
sync:x:5:0:sync:/sbin:/bin/sync
shutdown:x:6:0:shutdown:/sbin:/sbin/shutdown
halt:x:7:0:halt:/sbin:/sbin/halt
mail:x:8:12:mail:/var/spool/mail:/sbin/nologin
operator:x:11:0:operator:/root:/sbin/nologin
$sed -n '2 p' /etc/passwd
bin:x:1:1:bin:/bin:/sbin/nologin
$sed -n '2p' /etc/passwd
bin:x:1:1:bin:/bin:/sbin/nologin
$sed -n '2,5p' /etc/passwd
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
```

删除行：

`-n 'n1 d' `		删除第n行，且原文件内容不变； 

`-n 'n1,n2 d' `	删除n1到n2行，且原文件内容不变 

插入行： 

`'ni 内容'' `		 第n行前添加一行内容，且原文件内容不变 ； 

`'na 内容'`		 第n行后添加一行内容，且原文件内容不变 

替换行：

`'nc 新内容' `	将第n行替换成新内容，且原文件内容不变 

替换字符

`-n 's/old/new/p' `	将文件中每行的第一个old字符换成new字符，打印出只发生变化的行，且源文件内容不变。

`-n 's/old/new/pg'`	将文件中全部的old字符换成new字符，打印出只发生变化的行，且源文件内容不变。  

**对sed动作参数的使用**

直接对源文件内容进行操作（-i） 

```shell
$cat test.txt
Hello World!
my name is word.
testyourname!
$sed -i 's/n/N/g' test.txt
$cat test.txt
Hello World!
my Name is word.
testyourName!
```

不对源文件内容进行操作（-e） 

```shell
$cat test.txt
Hello World!
my name is word.
testyourname!
$sed -e 's/n/N/g' test.txt
Hello World!
my Name is word.
testyourName!
$cat test.txt
Hello World!
my name is word.
testyourname!
```

**多点编辑**

一条sed命令，删除/etc/passwd第三行到末尾的数据，并把bash替换为blueshell

```shell
#nl 可以将输出的文件内容自动的加上行号
$nl /etc/passwd | sed -e '3,$d' -e 's/bash/blueshell/'
1  root:x:0:0:root:/root:/bin/blueshell
2  daemon:x:1:1:daemon:/usr/sbin:/bin/sh
```

-e表示多点编辑，第一个编辑命令删除/etc/passwd第三行到末尾的数据，第二条命令搜索bash替换为blueshell。

其他示例

```shell
#删除1-3行
$sed '1,3 d' sed_text
#删除带有Lane的行
$sed '/Lane/d' sed_text
#打印5-10行
$sed -n '5,10 p' sed_text
#打印带有11或12的行
$sed -n '/:1[12]\//p' sed_text
#将所有包含Jose的行都替换为JOSE HAS RETIRED，并且打印出来
$sed -n 's/Jose/JOSE HAS RETIRED/p' sed_text
#删除所有空行，\s*表示0个以上空格
$sed '/^\s*$/ d' sed_text
#利用 sed 将 regular_express.txt 内每一行结尾若为 . 则换成 !
$sed -i 's/\.$/\!/g' regular_express.txt
#利用 sed 直接在 regular_express.txt 最后一行加入 # This is a test，$ 代表的是最后一行
$sed -i '$a # This is a test' regular_express.txt
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

# tar

tar命令用于备份文件。

tar是用来建立，还原备份文件的工具程序，它可以加入，解开备份文件内的文件。

**实例**

打包且压缩文件

```shell
$ touch a.c
#压缩 a.c文件为test.tar.gz
$ tar -czvf test.tar.gz a.c
a.c
#压缩test目录，包含test目录
$ tar -czvf test-1.0.tar.gz test 
test/
test/repo/
test/repo/cfg-1.0-1.x86_64.rpm
test/vars/
test/vars/main.yml
test/action/
test/action/app.sh
test/config/
test/config/cfg-1.0-1.x86_64.rpm
test/manifest.yml
```

列出压缩文件内容

```shell
$ tar -tzvf test.tar.gz 
-rw-r--r-- root/root     0 2010-05-24 16:51:59 a.c
```

解压文件

```shell
$ tar -xzvf test.tar.gz 
a.c
#解压test-1.0.tar.gz到指定目录xtar
$ tar -xzvf test-1.0.tar.gz -C xtar
test/
test/repo/
test/repo/campus_console_config-1.0-1.x86_64.rpm
test/vars/
test/vars/main.yml
test/action/
test/action/appctl.sh
test/config/
test/config/campus_console_params-1.0-1.x86_64.rpm
test/manifest.yml
```

# find

ind 命令用来在指定目录下查找文件。任何位于参数之前的字符串都将被视为欲查找的目录名。 如果使用该命令时，不设置任何参数，则 find 命令将在当前目录下查找子目录与文件。并且将查找到的子目录和文件全部进行显示。 

**语法**

```shell
find   path   -option   [   -print ]   [ -exec   -ok   command ]   {} \;
```

**参数说明** :

find 根据下列规则判断 path 和 expression，在命令列上第一个 - ( ) , ! 之前的部份为 path，之后的是 expression。如果 path 是空字串则使用目前路径，如果 expression 是空字串则使用 -print 为预设 expression。

expression 中可使用的选项有二三十个之多，在此只介绍最常用的部份。

-mount, -xdev : 只检查和指定目录在同一个文件系统下的文件，避免列出其它文件系统中的文件

-amin n : 在过去 n 分钟内被读取过

-anewer file : 比文件 file 更晚被读取过的文件

-atime n : 在过去n天内被读取过的文件

-cmin n : 在过去 n 分钟内被修改过

-cnewer file :比文件 file 更新的文件

-ctime n : 在过去n天内被修改过的文件

-empty : 空的文件-gid n or -group name : gid 是 n 或是 group 名称是 name

-ipath p, -path p : 路径名称符合 p 的文件，ipath 会忽略大小写

-name name, -iname name : 文件名称符合 name 的文件。iname 会忽略大小写

-size n : 文件大小 是 n 单位，b 代表 512 位元组的区块，c 表示字元数，k 表示 kilo bytes，w 是二个位元组。

-type c : 文件类型是 c 的文件。

d: 目录

c: 字型装置文件

b: 区块装置文件

p: 具名贮列

f: 一般文件

l: 符号连结

s: socket

-pid n : process id 是 n 的文件

-print： find命令将匹配的文件输出到标准输出。

 -exec： find命令对匹配的文件执行该参数所给出的shell命令。相应命令的形式为'command' { } \;，注意{ }和\；之间的空格。

 -ok： 和-exec的作用相同，只不过以一种更为安全的模式来执行该参数所给出的shell命令，在执行每一个命令之前，都会给出提示，让用户来确定是否执行。 

**示例**

```shell
#查当前目录下的所有普通文件，并在-exec选项中使用ls -l命令将它们列出
$ find . -type f -exec ls -l {} \; 
-rw-r–r–    1 root      root         34928 2003-02-25   ./conf/httpd.conf 
-rw-r–r–    1 root      root         12959 2003-02-25   ./conf/magic 
-rw-r–r–    1 root      root          180 2003-02-25   ./conf.d/README 
#在/logs目录中查找更改时间在5日以前的文件并删除它们：
$ find logs -type f -mtime +5 -ok rm {} \;
#要查找磁盘中大于3M的文件：
$ find . -size +3000k -exec ls -ld {} ;
```

# xargs 

xargs 是给命令传递参数的一个过滤器，也是组合多个命令的一个工具。

xargs 可以将管道或标准输入（stdin）数据转换成命令行参数，也能够从文件的输出中读取数据。

xargs 也可以将单行或多行文本输入转换为其他格式，例如多行变单行，单行变多行。

xargs 默认的命令是 echo，这意味着通过管道传递给 xargs 的输入将会包含换行和空白，不过通过 xargs 的处理，换行和空白将被空格取代。

xargs 是一个强有力的命令，它能够捕获一个命令的输出，然后传递给另外一个命令。

之所以能用到这个命令，关键是由于很多命令不支持|管道来传递参数，而日常工作中有有这个必要，所以就有了 xargs 命令，例如：

```shell
$ find /sbin -perm +700 |ls -l       	 #这个命令是错误的
$ find /sbin -perm +700 |xargs ls -l   #这样才是正确的
```

**xargs 一般是和管道一起使用。**

**命令格式：**

```shell
some command |xargs -item  command
```

**参数：**

- -a file 从文件中读入作为sdtin
- -e flag ，注意有的时候可能会是-E，flag必须是一个以空格分隔的标志，当xargs分析到含有flag这个标志的时候就停止。
- -p 当每次执行一个argument的时候询问一次用户。
- -n num 后面加次数，表示命令在执行的时候一次用的argument的个数，默认是用所有的。
- -t 表示先打印命令，然后再执行。
- -i 或者是-I，这得看linux支持了，将xargs的每项名称，一般是一行一行赋值给 {}，可以用 {} 代替。
- -r no-run-if-empty 当xargs的输入为空的时候则停止xargs，不用再去执行了。
- -s num 命令行的最大字符数，指的是 xargs 后面那个命令的最大命令行字符数。
- -L num 从标准输入一次读取 num 行送给 command 命令。
- -l 同 -L。
- -d delim 分隔符，默认的xargs分隔符是回车，argument的分隔符是空格，这里修改的是xargs的分隔符。
- -x exit的意思，主要是配合-s使用。。
- -P 修改最大的进程数，默认是1，为0时候为as many as it can ，这个例子我没有想到，应该平时都用不到的吧。

**实例**

xargs 用作替换工具，读取输入数据重新格式化后输出。

定义一个测试文件，内有多行文本数据：

```shell
$ cat test.txt

a b c d e f g
h i j k l m n
o p q
r s t
u v w x y z
```

多行输入单行输出：

```shell
$ cat test.txt | xargs
a b c d e f g h i j k l m n o p q r s t u v w x y z
```

-n 选项多行输出：

```shell
$ cat test.txt | xargs -n3

a b c
d e f
g h i
j k l
m n o
p q r
s t u
v w x
y z
```

-d 选项可以自定义一个定界符：

```shell
$ echo "nameXnameXnameXname" | xargs -dX

name name name name
```

结合 -n 选项使用：

```shell
$ echo "nameXnameXnameXname" | xargs -dX -n2

name name
name name
```

读取 stdin，将格式化后的参数传递给命令

假设一个命令为 sk.sh 和一个保存参数的文件 arg.txt：

```shell
#!/bin/bash
#sk.sh命令内容，打印出所有参数。

echo $*
```

arg.txt文件内容：

```shell
$ cat arg.txt
aaa
bbb
ccc
```

xargs 的一个选项 -I，使用 -I 指定一个替换字符串 {}，这个字符串在 xargs 扩展时会被替换掉，当 -I 与 xargs 结合使用，每一个参数命令都会被执行一次：

```shell
$ cat arg.txt | xargs -I {} ./sk.sh -p {} -l
-p aaa -l
-p bbb -l
-p ccc -l
```

复制所有图片文件到 /data/images 目录下：

```shell
$ ls *.jpg | xargs -n1 -I {} cp {} /data/images
```

xargs 结合 find 使用

用 rm 删除太多的文件时候，可能得到一个错误信息：**/bin/rm Argument list too long.** 用 xargs 去避免这个问题：

```shell
$ find . -type f -name "*.log" -print0 | xargs -0 rm -f
```

xargs -0 将 \0 作为定界符。

统计一个源代码目录中所有 php 文件的行数：

```shell
$ find . -type f -name "*.php" -print0 | xargs -0 wc -l
```

查找所有的 jpg 文件，并且压缩它们：

```shell
$ find . -type f -name "*.jpg" -print | xargs tar -czvf images.tar.gz
```

xargs 其他应用

假如你有一个文件包含了很多你希望下载的 URL，你能够使用 xargs下载所有链接：

```shell
$ cat url-list.txt | xargs wget -c
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

# rpm

Linux rpm 命令用于管理套件。 

安装软件

```shell
# rpm -hvi dejagnu-1.4.2-10.noarch.rpm 
警告：dejagnu-1.4.2-10.noarch.rpm: V3 DSA 签名：NOKEY, key ID db42a60e
准备...           
########################################### [100%]
```

显示软件安装信息

```shell
# rpm -qi dejagnu-1.4.2-10.noarch.rpm

```

# 查看用户

```shell
cat /etc/passwd 

cat /etc/passwd | grep user_name
```

# chown 

chown只有root用户才可以使用

```shell
#将/opt/user/属主改为user
#-R 表示包括子目录、子文件统统修改属主
chown -R user:usergroup /opt/user/
```

# su

su命令用于变更为其他使用者的身份，除 root 外，需要键入该使用者的密码。

使用权限：所有使用者。

**语法**

```
su [-fmp] [-c command] [-s shell] [--help] [--version] [-] [USER [ARG]]
```

**参数说明**：

- -f 或 --fast 不必读启动档（如 csh.cshrc 等），仅用于 csh 或 tcsh
- -m -p 或 --preserve-environment 执行 su 时不改变环境变数
- -c command 或 --command=command 变更为帐号为 USER 的使用者并执行指令（command）后再变回原来使用者
- -s shell 或 --shell=shell 指定要执行的 shell （bash csh tcsh 等），预设值为 /etc/passwd 内的该使用者（USER） shell
- --help 显示说明文件
- --version 显示版本资讯
- \- -l 或 --login 这个参数加了之后，就好像是重新 login 为该使用者一样，大部份环境变数（HOME SHELL USER等等）都是以该使用者（USER）为主，并且工作目录也会改变，如果没有指定 USER ，内定是 root
- USER 欲变更的使用者帐号
- ARG 传入新的 shell 参数

**实例**

```shell
#从当前用户切换到user1
su user1

#从当前用户切换到user1
#并且执行ls命令
#-c 表示执行完ls命令后，再切回原有用户
su -c ls user1

#变更帐号为 user2 并改变工作目录至 user2 的家目录（home dir）
su - user2
```

# mkdir

mkdir命令用于建立名称为 dirName 之子目录。

**语法**

```shell
mkdir [-p] dirName
```

**参数说明**：

- -p 确保目录名称存在，不存在的就建一个。

**实例**

在当前目录下，建立一个名为 AAA 的子目录 :

```shell
mkdir AAA
```

在当前目录下的 BBB 目录中，建立一个名为 Test 的子目录。 若 BBB 目录原本不存在，则建立一个。（注：本例若不加 -p，且原本 BBB目录不存在，则产生错误。）

```shell
mkdir -p BBB/Test
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
