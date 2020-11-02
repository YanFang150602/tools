# 1. 简单批处理内部命令简介

## 1)  echo 命令

打开回显或关闭请求回显功能，或显示消息。如果没有任何参数，echo 命令将显示当前回显设置。

**语法**

```
echo [{ on|off }] [message]
```

**实例**

```bat
@echo off
echo hello world
```

```bat
@echo　off
echo 1
echo.
echo 2
echo on
echo 3
pause
```

在实际应用中我们会把这条命令和重定向符号（也称为管道符号，一般用> >> ^）结合来实现输入一些命令到特定格式的文件中.这将在以后的例子中体现出来。

```bat
c:\>dir *.txt > 1.txt

c:\>dir *.txt >> 1.txt
```

## 2)  @ 命令

表示不显示@后面的命令，在入侵过程中（例如使用批处理来格式化敌人的硬盘）自然不能让对方看到你使用的命令啦。

**实例**

```bat
@echo off
```


## 3)  goto 命令

指定跳转到标签，找到标签后，程序将处理从下一行开始的命令。

**语法**

goto label （label是参数，指定所要转向的批处理程序中的行。）

**实例**

```bat
if { %1 }=={ } goto noparms
if { %2 }=={ } goto noparms（如果这里的if、%1、%2你不明白的话，先跳过去，后面会有详细的解释。）
@Rem check parameters if null show usage
:noparms
echo Usage: monitor.bat ServerIP PortNumber
goto end
```

标签的名字可以随便起，但是最好是有意义的字母啦，字母前加个：用来表示这个字母是标签，goto命令就是根据这个：来寻找下一步跳到到那里。最好有一些说明这样你别人看起来才会理解你的意图啊。

## 4)  rem 命令

注释命令，在C语言中相当与/*--------*/,它并不会被执行，只是起一个注释的作用，便于别人阅读和你自己日后修改。

**语法**

```
Rem Message
```

**实例**

```bat
@Rem Here is the description.
```

## 5) pause 命令

运行 Pause 命令时，将显示下面的消息：

```
Press any key to continue . . .
```

**实例**

```bat
@echo off
:begin
copy a:. d:\back
echo Please put a new disk into driver A
pause
goto begin
```

在这个例子中，驱动器 A 中磁盘上的所有文件均复制到d:\\back中。显示的注释提示您将另一张磁盘放入驱动器 A 时，pause 命令会使程序挂起，以便您更换磁盘，然后按任意键继续处理。

## 6) call 命令

从一个批处理程序调用另一个批处理程序，并且不终止父批处理程序。call 命令接受用作调用目标的标签。如果在脚本或批处理文件外使用 call，它将不会在命令行起作用

**语法**

```
call [[Drive:][Path] FileName [BatchParameters]] [:label [arguments]]
```

**参数**

```
[Drive: ][Path] FileName
```

指定要调用的批处理程序的位置和名称。FileName参数必须具有 .bat 或 .cmd 扩展名。

## 7) start 命令

启动单独的“命令提示符”窗口来运行指定程序或命令。如果在没有参数的情况下使用，start 将打开第二个命令提示符窗口。

**语法**

```
start ["title"] [/dPath] [/min] [/max] [{/separate |/shared}] {/low | /normal | /high | /realtime | /abovenormal | belownormal} [/B] [FileName] [parameters]
```

 **参数**

"title" 指定在“命令提示符”窗口标题栏中显示的标题。

/dpatch 指定启动目录。

/i 将 Cmd.exe 启动环境传送到新的“命令提示符”窗口。

/min 启动新的最小化窗口。

/max 启动新的最大化窗口。

/separate 在单独的内存空间启动 16 位程序。

/shared 在共享的内存空间启动 16 位程序。

/low 以空闲优先级启动应用程序。

/normal 以一般优先级启动应用程序。

/high 以高优先级启动应用程序。

/realtime 以实时优先级启动应用程序。

/abovenormal 以超出常规优先级的方式启动应用程序。

/belownormal 以低出常规优先级的方式启动应用程序。

/wait 启动应用程序，并等待其结束。

/b 启动应用程序时不必打开新的“命令提示符”窗口。除非应用程序启用 CTRL+C，否则将忽略 CTRL+C 操作。使用 CTRL+BREAK 中断应用程序。

非执行文件只要将文件名作为命令键入，即可通过其文件关联运行该文件。有关使用 assoc 和 ftype 在命令脚本中创建这些关联的详细信息，请参阅“”。

在运行的命令的第一个标记为“CMD”字符串但不包括扩展名或路径限定符时，“CMD”将被 COMSPEC 变量的值取代。这样可以防止用户从当前目录选取 cmd。

当您运行 32 位图形用户界面 (GUI) 应用程序时，cmd 不会在返回到命令提示符之前等待应用程序退出。如果从命令脚本运行应用程序，则不会发生这种新情况。在运行的命令中第一个符号不包括扩展名的情况下，Cmd.exe 使用 PATHEXT 环境变量的值确定要查找的扩展名以及查找顺序。PATHEXT 变量的默认值为：COM;.EXE;.BAT;.CMD（语法与 PATH 变量相同，使用分号分开不同元素）。当您搜索可执行文件且在任何扩展名上都没有匹配项时，start 将搜索目录名。

 **实例**

说明：如果你所在程序的路径中带有空格，那么必须用“”把路径括起来，否则系统会提示找不到XX文件，另外，在运行某些程序时，需在路径的前面加一对空白的“”，表示创建一个空白的窗口，它指向的程序是XXXXXXXX。还有就是别忘了空格。

1、当我想运行位于“D:\draw\”的“photoshop.exe”使，应该使用以下命令：

```
start "" "D:\draw\photoshop.exe"
```

表示以常规窗口运行程序

2、如果想让程序以最大化窗口运行，则使用以下命令：

```
start /max "" "D:\draw\photoshop.exe"
```

表示以最大化窗口运行程序

最小化这是这样：

```
start /min "" "D:\draw\photoshop.exe" 
```

表示以最小化窗口运行程序

3、等待某个程序允许完毕，也就是窗口关闭后，再打开下一个程序这可以这样：

```bat
start /w "" "D:\draw\photoshop.exe"

start "" cmd.exe

start /min "" "e:\t.cmd"
```

## 8) choice 命令

 使用此命令可以让用户输入一个字符，从而运行不同的命令。使用时应该加`/c:参数`，c:后应写提示可输入的字符，之间无空格。它的返回码为1234……
如: `choice /c:dme defrag,mem,end`将显示`defrag,mem,end[D,M,E]?`

**实例**

Sample.bat的内容如下:

```bat
@echo off
choice /c:dme defrag,mem,end
if errorlevel 3 goto defrag （应先判断数值最高的错误码）
if errorlevel 2 goto mem
if errotlevel 1 goto end

:defrag
c:\\dos\\defrag
goto end
:mem
mem
goto end
:end
echo good bye

```

此文件运行后，将显示 defrag,mem,end[D,M,E]? 用户可选择d m e ，然后if语句将作出判断，d表示执行标号为defrag的程序段，m表示执行标号为mem的程序段，e表示执行标号为end的程序段，每个程序段最后都以goto end将程序跳到end标号处，然后程序将显示good bye，文件结束。

 9) If 命令

if 表示将判断是否符合规定的条件，从而决定执行不同的命令。 有三种格式:

```
if "参数" == "字符串" 待执行的命令
```

参数如果等于指定的字符串，则条件成立，运行命令，否则运行下一句。(注意是两个等号）eg：

```bat
if "%1"=="a" format a:
if { %1 }=={ } goto noparms
if { %2 }=={ } goto noparms
```

```
if exist 文件名　 待执行的命令
```


如果有指定的文件，则条件成立，运行命令，否则运行下一句。eg：

```bat
if exist config.sys edit config.sys
```

```
if errorlevel / if not errorlevel 数字　 待执行的命令
```

如果返回码等于指定的数字，则条件成立，运行命令，否则运行下一句。

```bat
if errorlevel 2 goto x2 　
```

DOS程序运行时都会返回一个数字给DOS，称为错误码errorlevel或称返回码，常见的返回码为0、1。eg：

## 10)for 命令

FOR这条命令基本上都被用来处理文本,但还有其他一些好用的功能!

看看他的基本格式(这里我引用的是批处理中的格式,直接在命令行只需要一个%号) 
FOR 参数 %%变量名 IN (相关文件或命令) DO 执行的命令

参数:FOR有4个参数 /d  /l  /r  /f  他们的作用我在下面用例子解释 
%%变量名 :这个变量名可以是小写a-z或者大写A-Z,他们区分大小写,FOR会把每个读取到的值给他; 
IN:命令的格式,照写就是了; 
(相关文件或命令) :FOR要把什么东西读取然后赋值给变量,看下面的例子 
do:命令的格式,照写就是了! 
执行的命令:对每个变量的值要执行什么操作就写在这.

可以在CMD输入for /?看系统提供的帮助!对照一下 
FOR %%variable IN (set) DO command [command-parameters]

%%variable 指定一个单一字母可替换的参数。 
(set)   指定一个或一组文件。可以使用通配符。 
command  指定对每个文件执行的命令。 
command-parameters 
       为特定命令指定参数或命令行开关。


现在开始讲每个参数的意思

/d 
仅为目录 
如果 Set (也就是我上面写的 "相关文件或命令") 包含通配符（* 和 ?），将对与 Set 相匹配的每个目

录（而不是指定目录中的文件组）执行指定的 Command。

系统帮助的格式:FOR /D%%variable IN (set) DO command 
他主要用于目录搜索,不会搜索文件,看这样的例子

@echo off 
for /d %%i in (*) do @echo %%i 
pause

把他保存放在C盘根目录执行,就会把C盘目录下的全部目录名字打印出来,而文件名字一个也不显示! 
在来一个,比如我们要把当前路径下文件夹的名字只有1-3个字母的打出来

@echo off 
for /d %%i in (???) do @echo %%i 
pause

这样的话如果你当前目录下有目录名字只有1-3个字母的,就会显示出来,没有就不显示了


思考题目:

@echo off 
for /d %%i in (window?) do @echo %%i 
pause

保存到C盘下执行,会显示什么呢?自己看吧! 
/D参数只能显示当前目录下的目录名字,这个大家要注意!

/R 
递归 
进入根目录树[Drive:]Path，在树的每个目录中执行for 语句。如果在 /R 后没有指定目录，则认为是

当前目录。如果 Set 只是一个句点 (.)，则只枚举目录树。 
系统帮助的格式:FOR /R[[drive:]path] %%variable IN (set) DO command

上面我们知道,/D只能显示当前路径下的目录名字,那么现在这个/R也是和目录有关,他能干嘛呢?放心他比

/D强大多了! 
他可以把当前或者你指定路径下的文件名字全部读取,注意是文件名字,有什么用看例子!

@echo off 
for /r c:\ %%i in (*.exe) do @echo %%i 
pause

咋们把这个BAT保存到D盘随便哪里然后执行,我会就会看到,他把C盘根目录,和每个目录的子目录下面全部

的EXE文件都列出来了,这里的c:\就是目录了。

再来一个 
@echo off 
for /r %%i in (*.exe) do @echo %%i 
pause

参数不一样了，这个命令前面没加那个C:\也就是搜索路径,这样他就会以当前目录为搜索路径,比如你这

个BAT你把他防灾d:\test目录下执行,那么他就会把D:\test目录和他下面的子目录的全部EXE文件列出

来!!!


/L 
迭代数值范围 
使用迭代变量设置起始值(Start#)，然后逐步执行一组范围的值，直到该值超过所设置的终止值 (End#)

。/L 将通过对 Start# 与 End# 进行比较来执行迭代变量。如果 Start# 小于 End#，就会执行该命令。

如果迭代变量超过 End#，则命令解释程序退出此循环。还可以使用负的 Step# 以递减数值的方式逐步执

行此范围内的值。例如，(1,1,5)生成序列 1 2 3 4 5，而 (5,-1,1) 则生成序列 (5 4 3 2 1)。语法是：

系统帮助的格式:for /L%% Variable in (Start#,Step#,End#) do Command

例如：

@echo off 
for /l %%i in (1,1,5) do @echo %%i 
pause

保存执行看效果,他会打印从1 2 3 4 5 这样5个数字 
(1,1,5)这个参数也就是表示从1开始每次加1直到5终止!

再看这个例子 
@echo off 
for /l %%i in (1,1,5) do start cmd 
pause

执行后是不是吓了一跳,怎么多了5个CMD窗口,呵呵!如果把那个 (1,1,5)改成 (1,1,65535)会有什么结果,

我先告诉大家,会打开65535个CMD窗口....这么多你不死机算你强!

当然我们也可以把那个startcmd改成md %%i 这样就会建立指定个目录了!!!名字为1-65535

看完这个被我赋予破坏性质的参数后,我们来看最后一个参数

/f

含有/F的for详细说明

含有/F的for有很大的用处，在批处理中使用的最多，用法如下：
格式： 
**FOR /F ["options"] %%i IN (file) DOcommand**

**FOR/F ["options"] %%i IN ("string") DO command**

**FOR/F ["options"] %%i IN ('command') DO command**

这个可能是最常用的，也是最强的命令，主要用来处理文件和一些命令的输出结果。

file代表一个或多个文件

string 代表字符串

command代表命令

["options"]可选

对于FOR /F %%i IN (file) DO command

file为文件名，按照官方的说法是，for会依次将file中的文件打开，并且在进行到下一个文件之前将每个文件读取到内存，按照每一行分成一个一个的元素，忽略空白的行，看个例子。

假如文件a.txt中有如下内容：

**第1行第1列第1行第2列第1行第3列
第2行第1列第2行第2列第2行第3列
第3行第1列第3行第2列第3行第3列**

你想显示a.txt中的内容，会用什么命令呢？当然是type，type a.txt

for也可以完成同样的命令：

for /f %%i in(a.txt) do echo %%i

还是先从括号执行，因为含有参数/f,所以for会先打开a.txt，然后读出a.txt里面的所有内容，把它作为一个集合，并且以每一行作为一个元素，所以会产生这样的集合，

**{"第1行第1列第1行第2列第1行第3列"， //第一个元素**

**"第2行第1列第2行第2列第2行第3列"， //第二个元素**

**"第3行第1列第3行第2列第3行第3列"}  //第三个元素**

集合中只有3个元素，同样用%%i依次代替每个元素，然后执行do后面的命令。

具体过程：

**用%%i代替"第1行第1列第1行第2列第1行第3列"，执行do后面的echo %%i，显示"第1行第1列第1行第2列第1行第3列"，**

**用%%i代替"第2行第1列第2行第2列第2行第3列"，执行echo %%i，显示"第2行第1列第2行第2列第2行第3列"，**

**依次，直到每个元素都代替完为止。**

为了加强理解/f的作用，请执行一下两个命令，对比即可明白：

**for/f %%i in (a.txt) do echo %%i //这个会显示a.txt里面的内容，因为/f的作用，会读出a.txt中
的内容。**

**for%%i in (a.txt) do echo %%i //而这个只会显示a.txt这个名字，并不会读取其中的内容。**

通过上面的学习，我们发现for /f会默认以每一行来作为一个元素，但是如果我们还想把每一行再分解更小的内容，该怎么办呢？不用担心，for命令还为我们提供了更详细的参数，使我们将每一行分为更小的元素成为可能。

它们就是：**delims和tokens**

delims 用来告诉for每一行应该拿什么作为分隔符，默认的分隔符是空格和tab键

比如，还是上面的文件，我们执行下面的命令：

**for/f "delims= " %%i in (a.txt) do echo %%i**

显示的结果是：

**第1行第1列
第2行第1列
第3行第1列**

为什么是这样的呢。因为这里有了delims这个参数，=后面有一个空格，意思是再将每个元素以空格分割，默认是只取分割之后的第一个元素。

执行过程是：

**将第一个元素"第1行第1列第1行第2列第1行第3列"分成三个元素："第1行第1列" "第1行第2列" "第1行第3列"，它默认只取第一个，即"第1行第1列"，然后执行do后面的命令，依次类推。**

但是这样还是有局限的，如果我们想要每一行的第二列元素，那又如何呢？

这时候，**tokens**跳出来说，我能做到。

它的作用就是当你通过delims将每一行分为更小的元素时，由它来控制要取哪一个或哪几个。

还是上面的例子，执行如下命令：

**for/f "tokens=2 delims= " %%i in (a.txt) do echo %%i**

执行结果：

**第1行第2列
第2行第2列
第3行第2列**

如果要显示第三列，那就换成tokens=3。

同时tokens支持通配符*，以及限定范围。

如果要显示第二列和第三列，则换成tokens=2,3或tokens=2-3,如果还有更多的则为：tokens=2-10之类的。

此时的命令为：

**for/f "tokens=2,3 delims= " %%i in (a.txt) do echo %%i %%j**

**怎么多出一个%%j？**

这是因为你的tokens后面要取每一行的两列，用%%i来替换第二列，用%%j来替换第三列。

并且必须是按照英文字母顺序排列的，%%j不能换成%%k，因为i后面是j

执行结果为：

**第1行第2列第1行第3列
第2行第2列第2行第3列
第3行第2列第3行第3列**

对以通配符*，就是把这一行全部或者这一行的剩余部分当作一个元素了。

比如：

**for/f "tokens=\* delims= " %%i in (a.txt) do echo %%i**

执行结果为：

**第1行第1列第1行第2列第1行第3列
第2行第1列第2行第2列第2行第3列
第3行第1列第3行第2列第3行第3列**

其实就跟for /f %%i in (a.txt) do echo %%i的执行结果是一样的。

再如：

**for/f "tokens=2,\* delims= " %%i in (a.txt) do echo %%i %%j**

执行结果为：

**第1行第2列第1行第3列
第2行第2列第2行第3列
第3行第2列第3行第3列**

用%%i代替第二列，用%%j代替剩余的所有

最后还有skip合eol，这俩个简单，skip就是要忽略文件的前多少行，而eol用来指定当一行以什么符号开始时，就忽略它。

比如：

**for/f "skip=2 tokens=\*" %%i in (a.txt) do echo %%i**

结果为:

**第3行第1列第3行第2列第3行第3列**

用skip来告诉for跳过前两行。

如果不加tokens=*的话，执行结果为：

**第3行第1列**

不知道怎么回事。

再如，当a.txt内容变成：

**.第1行第1列第1行第2列第1行第3列
\**.\**第2行第1列第2行第2列第2行第3列
第3行第1列第3行第2列第3行第3列**

执行**for /f "eol=. tokens=\*"%%i in (a.txt) do echo %%i**结果是：

**第3行第1列第3行第2列第3行第3列**

用eol来告诉for忽略以"."开头的行。

同样也必须加tokens=*，否则只会显示"第3行第1列"

# 2. 如何在批处理文件中使用参数

批处理中可以使用参数，一般从%1到 %9这九个，当有多个参数时需要用shift来移动，这种情况并不多见，我们就不考虑它了。

**实例**

fomat.bat

```bat
@echo off
if "%1"=="a" format a:
:format
@format a:/q/u/auotset
@echo please insert another disk to driver A.
@pause
@goto fomat
```

这个例子用于连续地格式化几张软盘，所以用的时候需在dos窗口输入fomat.bat a

当我们要建立一个IPC$连接地时候总要输入一大串命令，弄不好就打错了，所以我们不如把一些固定命令写入一个批处理，把肉鸡地ip password username 当着参数来赋给这个批处理，这样就不用每次都打命令了。

```bat
@echo off
@net use \\\\%1\\ipc "%2" /u:"%3" （注意哦，这里PASSWORD是第二个参数。）
@if errorlevel 1 echo connection failed
```


# 3. 如何使用组合命令(Compound Command)

## 1.&

**语法**

```
第一条命令 & 第二条命令 [& 第三条命令...]
```

用这种方法可以同时执行多条命令，而不管命令是否执行成功

**实例**

```bat
C:\>dir d: & dir c:\Software
Volume in drive D is DataDisk
Volume Serial Number is 46B4-EF9A

Directory of D:\CMN\bat

2020/09/24  10:08    <DIR>          .
2020/09/24  10:08    <DIR>          ..
2020/09/24  09:28               502 copyfiles.bat
2020/09/01  16:13               187 ctc-copyfiles.bat
2020/09/16  10:08               221 run.bat
2020/09/24  09:31               193 server.bat
2020/09/24  10:11               243 test.bat
               5 File(s)          1,346 bytes
               2 Dir(s)  205,708,722,176 bytes free
 Volume in drive C has no label.
 Volume Serial Number is A2AB-ACFC

 Directory of c:\Software

2020/09/11  15:36    <DIR>          .
2020/09/11  15:36    <DIR>          ..
2020/09/11  15:36    <DIR>          7-Zip
2020/03/24  15:38        61,251,584 AccessAgent_x64.msi
2015/08/31  11:08    <DIR>          apache-maven-3.3.3
2020/08/04  08:37    <DIR>          apache-tomcat-8.0.37
2020/09/23  14:40    <DIR>          Beyond Compare 4
2020/08/04  15:40    <DIR>          ChromePlugins
2020/08/22  08:58    <DIR>          Cmder
2020/09/15  13:44    <DIR>          D-Box
2020/09/07  10:05    <DIR>          Everything
2020/07/28  16:26    <DIR>          Git
2017/12/06  09:06    <DIR>          gradle-4.4
2020/08/07  14:02    <DIR>          Huawei
2020/08/05  11:15    <DIR>          Java
2020/07/29  11:48    <DIR>          JetBrains
2020/09/11  09:59    <DIR>          MobaXterm
2020/08/05  10:49    <DIR>          nginx-1.16.0
2020/07/28  16:29    <DIR>          nodejs
2020/08/12  14:43    <DIR>          Notepad++
2016/09/26  11:54         9,096,704 pvdriver-win10-64bit-2.2.0.314-486.exe
2020/07/28  16:19           864,256 Q-Dir.exe
2016/09/30  15:21    <DIR>          Remote Desktop Organizer v1.4.7
2020/08/04  08:28    <DIR>          tomcat
2020/09/01  10:00    <DIR>          Typora
2020/08/04  11:20    <DIR>          WinSCP
               3 File(s)     71,212,544 bytes
              23 Dir(s)  46,094,929,920 bytes free

```



## 2.&&

Usage：第一条命令 && 第二条命令[&& 第三条命令...]

用这种方法可以同时执行多条命令，当碰到执行出错的命令后将不执行后面的命令，如果一直没有出错则一直执行完所有命令；

Sample：
C:\\>dir z: && dir c:\\Ex4rch
The system cannot find the path specified.

C:\\>dir c:\\Ex4rch && dir z:
Volume in drive C has no label.
Volume Serial Number is 0078-59FB

Directory of c:\\Ex4rch

2002-05-14 23:55 <DIR> .
2002-05-14 23:55 <DIR> ..
2002-05-14 23:55 14 sometips.gif
1 File(s) 14 bytes
2 Dir(s) 768,671,744 bytes free
The system cannot find the path specified.

在做备份的时候可能会用到这种命令会比较简单，如：
dir file://192.168.0.1/database/backup.mdb&& copy file://192.168.0.1/database/backup.mdbE:\\backup
如果远程服务器上存在backup.mdb文件，就执行copy命令，若不存在该文件则不执行copy命令。这种用法可以替换IF exist了 ：）

## 3.||

Usage：第一条命令 || 第二条命令 [|| 第三条命令...]

用这种方法可以同时执行多条命令，当碰到执行正确的命令后将不执行后面的命令，如果没有出现正确的命令则一直执行完所有命令；

Sample：
C:\\Ex4rch>dir sometips.gif || del sometips.gif
Volume in drive C has no label.
Volume Serial Number is 0078-59FB

Directory of C:\\Ex4rch

2002-05-14 23:55 14 sometips.gif
1 File(s) 14 bytes
0 Dir(s) 768,696,320 bytes free

组合命令使用的例子：
sample：
@copy trojan.exe \\\\%1\\admin$\\system32 && if not errorlevel 1 echoIP %1 USER %2 PASS %3 >>victim.txt

# 4. 管道命令的使用

## 1. | 命令

Usage：第一条命令 | 第二条命令 [| 第三条命令...]
将第一条命令的结果作为第二条命令的参数来使用，记得在unix中这种方式很常见。

sample：
time /t>>D:\\IP.log
netstat -n -p tcp|find ":3389">>D:\\IP.log
start Explore


看出来了么？用于终端服务允许我们为用户自定义起始的程序，来实现让用户运行下面这个bat，以获得登录用户的IP。

 

## 2. >、>>输出重定向命令

将一条命令或某个程序输出结果的重定向到特定文件中, > 与 >>的区别在于，>会清除调原有文件中的内容后写入指定文件，而>>只会追加内容到指定文件中，而不会改动其中的内容。

sample1：
echo hello world>c:\\hello.txt (stupid example?)

sample2:
时下DLL木马盛行，我们知道system32是个捉迷藏的好地方，许多木马都削尖了脑袋往那里钻，DLL马也不例外，针对这一点我们可以在安装好系统和必要的应用程序后，对该目录下的EXE和DLL文件作一个记录：
运行CMD--转换目录到system32--dir*.exe>exeback.txt & dir *.dll>dllback.txt,
这样所有的EXE和DLL文件的名称都被分别记录到exeback.txt和dllback.txt中,
日后如发现异常但用传统的方法查不出问题时,则要考虑是不是系统中已经潜入DLL木马了.
这时我们用同样的命令将system32下的EXE和DLL文件记录到另外的exeback1.txt和dllback1.txt中,然后运行:
CMD--fc exeback.txt exeback1.txt>diff.txt & fc dllback.txtdllback1.txt>diff.txt.(用FC命令比较前后两次的DLL和EXE文件,并将结果输入到diff.txt中),这样我们就能发现一些多出来的DLL和EXE文件,然后通过查看创建时间、版本、是否经过压缩等就能够比较容易地判断出是不是已经被DLL木马光顾了。没有是最好，如果有的话也不要直接DEL掉，先用regsvr32 /u trojan.dll将后门DLL文件注销掉,再把它移到回收站里，若系统没有异常反映再将之彻底删除或者提交给杀毒软件公司。

## 3. < 、>& 、<&

< 从文件中而不是从键盘中读入命令输入。
\>& 将一个句柄的输出写入到另一个句柄的输入中。
<& 从一个句柄读取输入并将其写入到另一个句柄输出中。
这些并不常用，也就不多做介绍。

 

# 5. 如何用批处理文件来操作注册表

在入侵过程中经常会操作注册表的特定的键值来实现一定的目的，例如:为了达到隐藏后门、木马程序而删除Run下残余的键值。或者创建一个服务用以加载后门。当然我们也会修改注册表来加固系统或者改变系统的某个属性，这些都需要我们对注册表操作有一定的了解。下面我们就先学习一下如何使用.REG文件来操作注册表.(我们可以用批处理来生成一个REG文件)
关于注册表的操作，常见的是创建、修改、删除

## 1).创建

创建分为两种，一种是创建子项(Subkey)

我们创建一个文件，内容如下：

Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\hacker]

然后执行该脚本，你就已经在HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft下创建了一个名字为“hacker”的子项。

另一种是创建一个项目名称
那这种文件格式就是典型的文件格式，和你从注册表中导出的文件格式一致，内容如下：

Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run]
"Invader"="Ex4rch"
"Door"=C:\\\\WINNT\\\\system32\\\\door.exe
"Autodos"=dword:02

这样就在[HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run]下
新建了:Invader、door、about这三个项目
Invader的类型是“String Value”
door的类型是“REG SZ Value”
Autodos的类型是“DWORD Value”

## 2).修改

修改相对来说比较简单，只要把你需要修改的项目导出，然后用记事本进行修改，然后导入（regedit /s）即可。

 

## 3).删除

我们首先来说说删除一个项目名称，我们创建一个如下的文件：

Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run]
"Ex4rch"=-

执行该脚本，[HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run]下的"Ex4rch"就被删除了；
