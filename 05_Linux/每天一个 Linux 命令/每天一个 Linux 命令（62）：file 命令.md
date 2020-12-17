## 每天一个 Linux 命令（62）：file 命令

有人的地方，就有江湖。人往往是最难揣摩的。如果有一面神奇的魔镜能看出一个人的内心，世界会不会变得更加美好呢？

Linux 的世界里，file 就是这样一面魔镜，它可以看到每个文件的内心。file 命令可以识别出文件的类型和编码格式，这是其他命令所做不到的。

### 查看文件类型

开门见山，我们直接用 file 这面魔镜来看看文件的“内心”。

```shell
#不加任何选项, 直接查看poetry文件
[roc@roclinux ~]$ file poetry.txt
poetry.txt: ASCII text
```

使用不带任何选项的 file 命令，即可查看指定文件的类型信息。

在上面的例子中可以看出 poetry.txt 的文件类型为 text，编码格式为 ASCII。

```shell
#使用-b选项来查看poetry文件
[roc@roclinux ~]$ file -b poetry.txt
ASCII text
```

上面的例子中，我们使用了-b选项，可以使 file 命令的输出不出现文件名，只显示文件格式以及编码。

```shell
#使用-i选项来查看poetry文件
[roc@roclinux ~]$ file -i poetry.txt
poetry.txt: text/plain; charset=us-ascii
```

上面的例子中，我们使用了-i选项，可以输出文件的 MIME 类型字符串。

小科普，MIME 类型，即 Multipurpose Internet Mail Extensions，称为多用途互联网邮件扩展类型，用来标识和记录文件的打开方式，一些常见的类型包括：

- text/plain：普通文本。
- text/html：HTML文本。
- application/pdf：PDF文档。
- application/msword：Word文档。
- image/png：PNG图片。
- mage/jpeg：JPEG图片。
- application/x-tar：TAR文件。
- application/x-gzip：GZIP文件。

### 设置输出分隔符

从上面的例子可以看出，file 命令的输出格式是：

```
文件名：文件类型和编码格式
```

如果希望将中间的分隔符由冒号（：）改成其他符号，则可以使用-F选项来实现。

```shell
[roc@roclinux ~]$ file poetry.txt
poetry.txt: ASCII text

[roc@roclinux ~]$ file -F "=>" poetry.txt
poetry.txt=> ASCII text
```

有些同学会问，这样的功能有何意义呢？在一些自动化文件分析的脚本中，开发者为了避免分隔符和普通字符重复而造成误解析的情况，通常是会手工调整间隔符的。

### 查看软链接文件

file 命令能查看所有文件的类型信息，那么问题来了，对于一个软链接文件，file 命令是返回软链接文件本身的类型信息，还是返回软链接所指向的目标文件的类型信息呢？让我们通过试验得出结论吧：

```shell
#新建一个软链接文件
[roc@roclinux ~]$ ln -s poetry.txt poetry_s.txt

#通过file命令查看软链接文件
[roc@roclinux ~]$ file poetry_s.txt
poetry_s.txt: symbolic link to `poetry.txt'

#使用-L选项来查看软链接文件
[roc@roclinux ~]$ file -L poetry_s.txt
poetry_s.txt: ASCII text
```

试验是找到真相的最好方法。通过上面的示例，我们已经很清楚地看到了：

- 如果通过 file 命令直接查看软链接文件，则查看的就是软链接文件本身的信息。
- 如果使用-L选项来查看软链接文件，则查看的是软链接指向的目标文件的信息。

### 按照清单去工作

如果我们需要用 file 命令查看大量文件的类型信息，恰好这些文件的名称都被存储在了一个文本文件中，那么-f选项就派上用场了。

我们可以通过-f选项来指定这个文本文件，file 命令就会乖乖地去逐个查看每一个文件的类型信息，示例如下：

```shell
#文件中含有三个待查文件, 我们故意设置了一个不存在的文件, 位于最后一个
[roc@roclinux ~]$ cat poetry_list.txt
/root/book/poetry.txt 
/root/book/poetry_s.txt 
Nothing.txt

#使用-f选项执行file命令
[roc@roclinux ~]$ file -f poetry_list.txt
/root/book/poetry.txt:   ASCII text
/root/book/poetry_s.txt: symbolic link to `poetry.txt'
Nothing.txt: ERROR: cannot open `Nothing.txt ' (No such file or directory)
```

在上面的例子中，poetry_list.txt 包含了 3 行内容：

- poetry.txt。
- 指向poetry.txt的软链接poetry_s.txt。
- Nothing.txt，一个明显不存在的文件。

从结果可以看出，前两个如期输出了类型信息，最后一个也如期报了错误。

### -z 选项，想说爱你不容易

一次偶然的机会，我在 man file 中发现了-z选项，原文解释是“Try to look inside compressed files”，看来 file 还可以查看压缩文件内部的文件。

那为什么要用“Try to”这样的字样呢，为了弄明白这个细节，于是，我的试验开始了。

第一轮试验开始，我们先来试验“一个未经压缩的 tar 包”：

 

```shell
#制作一个未经压缩的tar包
[roc@roclinux ~]$ tar -cvf poetry.tar poetry.txt poetry_s.txt
poetry.txt 
poetry_s.txt 

#尝试使用-z选项
[roc@roclinux ~]$ file -z poetry.tar
poetry.tar: POSIX tar archive (GNU)
```

似乎并不尽如人意，file 只是看出 poetry.tar 是一个 tar 包，并没有深入到 tar 包内部，第一轮试验宣告失败。

马上进入第二轮试验，我们看看一个经过 gzip 压缩过的 tar 包情况如何？

```shell
#制作一个tar.gz包
[roc@roclinux ~]$ tar -czvf poetry.tar.gz poetry.txt poetry_s.txt
poetry.txt
poetry_s.txt

#使用-z选项查看
[roc@roclinux ~]$ file -z poetry.tar.gz
poetry.tar.gz: POSIX tar archive (GNU) (gzip compressed data, from Unix, last modified: Tue Mar  1 17:43:59 2016)
```

输出的信息稍微丰富了一些，但还是停留在 tar 包的文件类型的层面，仍然没有窥探到里面的 poetry.txt 和 poetry_s.txt 文件。第二轮试验也宣告失败。

那 bzip2 压缩的 tar 包是否 OK 呢？我们又赶快进入了第三轮试验。

```shell
#制作一个.tar.bz2文件
[roc@roclinux ~]$ tar -cjvf poetry.tar.bz2 poetry.txt poetry_s.txt
poetry.txt
poetry_s.txt

#使用-z选项查看
[roc@roclinux ~]$ file -z poetry.tar.bz2
poetry.tar.bz2: POSIX tar archive (GNU) (bzip2 compressed data, block size = 900k)
```

如你所见，第三轮试验仍然是失败的。我已经开始怀疑人生了。信念让我坚持，不能服输。哈哈，就这样，我们再次踏上征程。我怀疑file只能窥探到单个文件压缩的情况，于是，第四轮试验开始了。

```shell
#制作一个只包含1个文件的bz2文件
[roc@roclinux ~]$ bzip2 -c poetry.txt > poetry.bz2

#使用-z选项查看
[roc@roclinux ~]$ file -z poetry.bz2
poetry.bz2: ASCII text (bzip2 compressed data, block size = 900k)
```

结果依然让我失望，这到底是要闹哪样啊？到了这步田地，也就剩下单个 gzip 压缩文件的情况没有尝试了，我再碰碰运气吧，如果-z选项还是不能如愿地显示压缩文件包含文件的类型信息，我就打算给 file 的作者写邮件投诉了。

于是，第五轮试验开始了。

```shell
#制作一个仅包含1个文件的gz文件
[roc@roclinux ~]$ gzip -c poetry.txt > poetry.gz

#尝试用-z选项查看, 竟然查出结果了, 看到了ASCII text字样
[roc@roclinux ~]$ file -z poetry.gz
poetry.gz: ASCII text (gzip compressed data, was "poetry.txt", from Unix, last modified: Tue Mar  1 19:01:22 2016)

#再试试没有-z选项的情况, 确实没有探测出ASCII text类型
[roc@roclinux ~]$ file poetry.gz
poetry.gz: gzip compressed data, was "poetry.txt", from Unix, last modified: Tue Mar  1 19:01:22 2016
```

终于，终于，我们终于成功了，我们通过试验找到了答案。

直到这步我们才知道，man 中 -z 选项的解释虽然是“Try to look inside compressed files”，但其实只支持对 gzip 包内部文件的窥探，而对于 tar、tar.gz、tar.bz2 和 bz2 包全部都不支持。

大胆猜测，file 的作者可能是迫于开发时间的压力，仅仅支持了 gzip 的情况，但是又不希望未来仅支持这一种压缩类型，因此写上“Try to”，为日后的扩展留下了可能性。