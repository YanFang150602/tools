# netstat

netstat命令用于显示网络状态。

利用netstat指令可让你得知整个Linux系统的网络情况。

**语法**

```shell
netstat [-acCeFghilMnNoprstuvVwx][-A<网络类型>][--ip]
```

**参数说明**：

- -a或--all 显示所有连线中的Socket。
- -A<网络类型>或--<网络类型> 列出该网络类型连线中的相关地址。
- -c或--continuous 持续列出网络状态。
- -C或--cache 显示路由器配置的快取信息。
- -e或--extend 显示网络其他相关信息。
- -F或--fib 显示FIB。
- -g或--groups 显示多重广播功能群组组员名单。
- -h或--help 在线帮助。
- -i或--interfaces 显示网络界面信息表单。
- -l或--listening 显示监控中的服务器的Socket。
- -M或--masquerade 显示伪装的网络连线。
- -n或--numeric 直接使用IP地址，而不通过域名服务器。
- -N或--netlink或--symbolic 显示网络硬件外围设备的符号连接名称。
- -o或--timers 显示计时器。
- -p或--programs 显示正在使用Socket的程序识别码和程序名称。
- -r或--route 显示Routing Table。
- -s或--statistice 显示网络工作信息统计表。
- -t或--tcp 显示TCP传输协议的连线状况。
- -u或--udp 显示UDP传输协议的连线状况。
- -v或--verbose 显示指令执行过程。
- -V或--version 显示版本信息。
- -w或--raw 显示RAW传输协议的连线状况。
- -x或--unix 此参数的效果和指定"-A unix"参数相同。
- --ip或--inet 此参数的效果和指定"-A inet"参数相同。

**示例**

```shell
# 显示详细的网络状况
$ netstat -a

# 显示当前户籍UDP连接状况
$ netstat -nu

# 显示UDP端口号的使用情况
$ netstat -apu

# 显示网卡列表
$ netstat -i

# 显示组播组的关系
$ netstat -g

# 显示网络统计信息
$ netstat -s
  
# 显示监听的套接口
$ netstat -l
```

# wget

wget是一个下载文件的工具，它用在命令行下。对于Linux用户是必不可少的工具，我们经常要下载一些软件或从远程服务器恢复备份到本地服务器。

 wget支持HTTP，HTTPS和FTP协议，可以使用HTTP代理。所谓的自动下载是指，wget可以在用户退出系统的之后在后台执行。这意味这你可以登录系统，启动

一个wget下载任务，然后退出系统，wget将在后台执行直到任务完成

wget 可以跟踪HTML页面上的链接依次下载来创建远程服务器的本地版本，完全重建原始站点的目录结构。这又常被称作”递归下载”。

wget 非常稳定，它在带宽很窄的情况下和不稳定网络中有很强的适应性.如果是由于网络的原因下载失败，wget会不断的尝试，直到整个文件下载完毕。如果是服

务器打断下载过程，它会再次联到服务器上从停止的地方继续下载。这对从那些限定了链接时间的服务器上下载大文件非常有用。

**语法**

```shell
wget [选项]... [URL]...
```

**示例**

```shell
# 使用wget -O下载并以不同的文件名保存(-O：下载文件到对应目录，并且修改文件名称)
wget -O wordpress.zip http://www.minjieren.com/download.aspx?id=1080
# 使用wget -b后台下载
wget -b http://www.minjieren.com/wordpress-3.1-zh_CN.zip
# 备注： 你可以使用以下命令来察看下载进度：tail -f wget-log

# 利用-spider: 模拟下载，不会下载，只是会检查是否网站是否好着
wget --spider  www.baidu.com    #不下载任何文件

# 模拟下载打印服务器响应
wget -S  www.baidu.com     # 打印服务器响应
# 设定指定次数
wget -r --tries=2  www.baidu.com       #指定尝试2次，2次后不再尝试
wget -r --tries=2 -q www.baidu.com     #指定尝试，且不打印中间结果
```

# ps

ps命令用于显示当前进程 (process) 的状态。

**语法**

```bash
ps [options] [--help]
```

**参数**：

ps 的参数非常多, 在此仅列出几个常用的参数并大略介绍含义

- -A 列出所有的行程
- -w 显示加宽可以显示较多的资讯
- -au 显示较详细的资讯
- -aux 显示所有包含其他使用者的行程
- e  显示环境变量
- f  显示程序间的关系

**示例**

显示进程信息

```shell
# ps -A 
PID TTY     TIME CMD
  1 ?    00:00:02 init
  2 ?    00:00:00 kthreadd
  3 ?    00:00:00 migration/0
  4 ?    00:00:00 ksoftirqd/0
  5 ?    00:00:00 watchdog/0
  6 ?    00:00:00 events/0
  7 ?    00:00:00 cpuset
  8 ?    00:00:00 khelper
  9 ?    00:00:00 netns
……省略部分结果
31302 ?    00:00:00 sshd
31374 pts/2  00:00:00 bash
31396 pts/2  00:00:00 ps
```

显示指定用户(root)信息

```shell
# ps -u root
 PID TTY     TIME CMD
  1 ?    00:00:02 init
  2 ?    00:00:00 kthreadd
  10 ?    00:00:00 async/mgr
  11 ?    00:00:00 pm
  12 ?    00:00:00 sync_supers
  13 ?    00:00:00 bdi-default
  14 ?    00:00:00 kintegrityd/0
  15 ?    00:00:02 kblockd/0
  16 ?    00:00:00 kacpid
……省略部分结果
30487 ?    00:00:06 gnome-terminal
30488 ?    00:00:00 gnome-pty-helpe
30489 pts/0  00:00:00 bash
31302 ?    00:00:00 sshd
31374 pts/2  00:00:00 bash
31397 pts/2  00:00:00 ps
```

显示所有进程信息，连同命令行

```shell
# ps -ef 
UID    PID PPID C STIME TTY     TIME CMD
root     1   0 0 10:22 ?    00:00:02 /sbin/init
root     2   0 0 10:22 ?    00:00:00 [kthreadd]
……省略部分结果
root   31302 2095 0 17:42 ?    00:00:00 sshd: root@pts/2 
root   31374 31302 0 17:42 pts/2  00:00:00 -bash
root   31400   1 0 17:46 ?    00:00:00 /usr/bin/python /usr/sbin/aptd
root   31407 31374 0 17:48 pts/2  00:00:00 ps -ef
```

ps 与grep 常用组合用法，查找特定进程

```shell
# ps -ef | grep ssh
gec        9452  79650  0 06:05 pts/4    00:00:00 grep --color=auto ssh
root      16628      1  0 03:45 ?        00:00:00 /usr/sbin/sshd -D
```

# kill 终止进程 

```shell
有十几种控制进程的方法，下面是一些常用的方法:
kill -STOP [pid]
发送SIGSTOP (17,19,23)停止一个进程，而并不消灭这个进程。
kill -CONT [pid]
发送SIGCONT (19,18,25)重新开始一个停止的进程。
kill -KILL [pid]
发送SIGKILL (9)强迫进程立即停止，并且不实施清理操作。
kill -9 -1
终止你拥有的全部进程。
SIGKILL 和 SIGSTOP 信号不能被捕捉、封锁或者忽略，但是，其它的信号可以。所以这是你的终极武器。
```

# declare 

declare命令用于声明 shell 变量。 

declare为shell指令，在第一种语法中可用来声明变量并设置变量的属性([rix]即为变量的属性），在第二种语法中

可用来显示shell函数。若不加上任何参数，则会显示全部的shell变量与函数(与执行set指令的效果相同)。 

**语法**

```shell
declare [+/-][rxi][变量名称=设置值] 或 declare -f
```

**参数说明**：

- +/- 　"-"可用来指定变量的属性，"+"则是取消变量所设的属性。
- -f 　仅显示函数。
- r 　将变量设置为只读。
- x 　指定的变量会成为环境变量，可供shell以外的程序来使用，和export的作用类似 。
- i 　声明一个整型 。
- a    声明一个数组 。
- p    查看变量的被声明的类型 。

**示例**

声明整数型变量

```shell
# 声明整数型变量
$ declare -i ab
# 改变变量内容
$ ab=56 
# 显示变量内容
$ echo $ab 
56
```

改变变量属性

```shell
# 声明整数型变量
$ declare -i ef
# 变量赋值（整数值）
$ ef=1
# 显示变量内容
$ echo $ef
1
# 变量赋值（文本值）
$ ef="wer" 
$ echo $ef 
0
# 取消变量属性
$ declare +i ef 
$ ef="wer"
$ echo $ef
wer
```

设置变量只读

```shell
# 设置变量为只读
$ declare -r ab
# 改变变量内容
$ ab=88 
-bash: ab: 只读变量
# 显示变量内容
$ echo $ab 
56
```

声明数组变量

```shell
# 声明数组变量
$ declare -a cd='([0]="a" [1]="b" [2]="c")' 
$ echo ${cd[1]}
b //显示变量内容
# 显示整个数组变量内容
$ echo ${cd[@]} 
a b c
```

显示函数

```shell
$ declare -f
command_not_found_handle () 
{ 
  if [ -x /usr/lib/command-not-found ]; then
    /usr/bin/python /usr/lib/command-not-found -- $1;
    return $?;
  else
    if [ -x /usr/share/command-not-found ]; then
      /usr/bin/python /usr/share/command-not-found -- $1;
      return $?;
    else
      return 127;
    fi;
  fi
}
```

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

# chmod

Linux/Unix 的文件调用权限分为三级 : 文件拥有者、群组、其他。利用 chmod 可以藉以控制文件如何被他人所调用。

**使用权限** : 所有使用者

**语法**

```shell
chmod [-cfvR] [--help] [--version] mode file...
```

**参数说明**

mode : 权限设定字串，格式如下 :

```
[ugoa...][[+-=][rwxX]...][,...]
```

其中：

- u 表示该文件的拥有者，g 表示与该文件的拥有者属于同一个群体(group)者，o 表示其他以外的人，a 表示这三者皆是。
- \+ 表示增加权限、- 表示取消权限、= 表示唯一设定权限。
- r 表示可读取，w 表示可写入，x 表示可执行，X 表示只有当该文件是个子目录或者该文件已经被设定过为可执行。

其他参数说明：

- -c : 若该文件权限确实已经更改，才显示其更改动作
- -f : 若该文件权限无法被更改也不要显示错误讯息
- -v : 显示权限变更的详细资料
- -R : 对目前目录下的所有文件与子目录进行相同的权限变更(即以递回的方式逐个变更)
- --help : 显示辅助说明
- --version : 显示版本

**示例**

将文件 file1.txt 设为所有人皆可读取 :

```shell
chmod ugo+r file1.txt
```

将文件 file1.txt 设为所有人皆可读取 :

```shell
chmod a+r file1.txt
```

将文件 file1.txt 与 file2.txt 设为该文件拥有者，与其所属同一个群体者可写入，但其他以外的人则不可写入 :

```shell
chmod ug+w,o-w file1.txt file2.txt
```

将 ex1.py 设定为只有该文件拥有者可以执行 :

```shell
chmod u+x ex1.py
```

将目前目录下的所有文件与子目录皆设为任何人可读取 :

```shell
chmod -R a+r *
```

此外chmod也可以用数字来表示权限如 :

```shell
chmod 777 file
```

语法为：

```shell
chmod abc file
```

其中a,b,c各为一个数字，分别表示User、Group、及Other的权限。

r=4，w=2，x=1

- 若要rwx属性则4+2+1=7；
- 若要rw-属性则4+2=6；
- 若要r-x属性则4+1=5。

```shell
chmod a=rwx file
```

和

```shell
chmod 777 file
```

效果相同

```shell
chmod ug=rwx,o=x file
```

和

```shell
chmod 771 file
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
