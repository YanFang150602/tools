# 本地安装git

**查看是否存在ssh密钥**

1、打开git bash

2、使用ls -al ~/.ssh查看已存在的ssh密钥：

```bash
彦博@LAPTOP-7G0LB5QQ MINGW64 ~
$ ls -al ~/.ssh
total 32
drwxr-xr-x 1 彦博 197121    0  5月 11 07:35 ./
drwxr-xr-x 1 彦博 197121    0  8月  2 08:55 ../
-rw-r--r-- 1 彦博 197121 3247  5月 11 07:35 id_rsa
-rw-r--r-- 1 彦博 197121  743  5月 11 07:35 id_rsa.pub
-rw-r--r-- 1 彦博 197121 1197  5月 11 08:58 known_hosts
```

默认情况下，公钥的文件名是下列之一：

·    *id_dsa.pub*

·    *id_ecdsa.pub*

·    *id_ed25519.pub*

·    *id_rsa.pub*

3、如果您没有现有的公钥和私钥对，或者不希望使用任何可用的来连接到GitHub，那么生成一个新的ssh密钥。

**提示：如果您收到一个~/.ssh不存在的错误，不要担心！我们将在生成新的ssh密钥时创建它。**

**生成一个新的ssh密钥**

打开git bash

将下面的文本复制粘贴到git bash，替换您的Github电子邮件地址：

```bash
$ ssh-keygen -t rsa -b 4096 -C your_email@example.com
```

如果已存在ssh密钥，可以选择将其覆盖。

拷贝id_rsa.pub文件里的内容：

```bash
$ clip < ~/.ssh/id_rsa.pub
```

向ssh代理添加ssh密钥，单击New ssh key或Add ssh key。

# 克隆仓

```bash
$ git clone -b remote_br git@rnd-isourceb.huawei.com:username/web.git
```

# 添加远程仓

```bash
$ git remote add trunk git@rnd-isourceb.huawei.com:AC_BP_trunk/ac_bp_web.git
$ git remote -v 查看远程仓信息
$ git remote show 查看本地定义的远程仓名
$ git remote show source 查看source远程仓与本地的信息
```

# 本地新建分支，并上传到远程仓上

```bash
$ git checkout -b new_local_br
# 此时git push失败，需要执行下面，在远程仓上也新建了分支，并与本地分支保持跟踪
$ git push --set-upstream origin new_remote_br
# 后面就可以直接git push
```

# 下载远程仓上的分支

```bash
$ git fetch 远程仓 远程分支
$ git checkout -b 本地分支 远程仓/远程分支
```

# 合并

```bash
$ git merge 本地另一分支
$ git checkout 本地另一分支 路径|文件名
```

**示例**

如果只是简单的将feature分支的文件f.txt copy到master分支上；

```bash
$ git checkout master
$ git checkout feature f.tx
```

# git stash

```bash
$ git stash list
$ git stash save "xxx"
$ git stash show
$ git stash apply stash@{0}
$ git stash drop stash@{0}
```

# 文件回退

```bash
#文件从暂存区回退到工作区
$ git reset HEAD  

#回退文件，将文件从暂存区回退到工作区
$ git reset HEAD filename   

#回退版本，一个^表示一个版本，可以多个，另外也可以使用 git reset HEAD～n这种形式
$ git reset HEAD^   

#意为将版本库回退1个版本，但是不仅仅是将本地版本库的头指针全部重置到指定版本，也会重置暂存区，并且会将工作区代码也回退到这个版本
$ git reset --hard HEAD～1

#意为将版本库软回退1个版本，所谓软回退表示将本地版本库的头指针全部重置到指定版本，且将这次提交之后的所有变更都移动到暂存区
$ git reset --soft HEAD～1 
```

# core.autocrlf配置说明

格式化

格式化是许多开发人员在协作时，特别是在跨平台情况下，遇到的令人头疼的细小问题。 由于编辑器的不同或者Windows程序员在跨平台项目中的文件行尾加入了回车换行符， 一些细微的空格变化会不经意地进入大家合作的工作或提交的补丁中。不用怕，Git的一些配置选项会帮助你解决这些问题。

core.autocrlf

假如你正在Windows上写程序，又或者你正在和其他人合作，他们在Windows上编程，而你却在其他系统上，在这些情况下，你可能会遇到行尾 结束符问题。 这是因为Windows使用回车和换行两个字符来结束一行，而Mac和Linux只使用换行一个字符。 虽然这是小问题，但它会极大地扰乱跨平台协作。

Git可以在你提交时自动地把行结束符CRLF转换成LF，而在签出代码时把LF转换成CRLF。用core.autocrlf来打开此项功能， 如果是在Windows系统上，把它设置成true，这样当签出代码时，LF会被转换成CRLF：

```bash
$ git config --global core.autocrlf true
```

Linux或Mac系统使用LF作为行结束符，因此你不想Git在签出文件时进行自动的转换；当一个以CRLF为行结束符的文件不小心被引入时你肯定想进行修正， 把core.autocrlf设置成input来告诉Git在提交时把CRLF转换成LF，签出时不转换：

```bash
$ git config --global core.autocrlf input
```

这样会在Windows系统上的签出文件中保留CRLF，会在Mac和Linux系统上，包括仓库中保留LF。

如果你是Windows程序员，且正在开发仅运行在Windows上的项目，可以设置false取消此功能，把回车符记录在库中：

```bash
$ git config --global core.autocrlf false
```

# 设置git全局忽略文件

此方法设置的忽略列表对当前用户本地**所有仓库**有效，但不会上传到远程仓库。

**创建.gitignore**

新建一个文件 ~/.gitignore，并添加所有仓库都需要忽略的文件列表，例如

```gitignore
build/
dist/
out/
.idea/
.gradle/
*.iml
123456
```

**设置全局有效**

```bash
git config --global core.excludesfile ~/.gitignore
```

如果仓库中还有.gitignore文件，则两者均会忽略。

# 设置git局部忽略文件

如果只是这一个项目中有部分不需要提交的内容，那么直接在项目根目录下创建一个.gitignore：

```
touch .gitignore
```

> 如果是windows，新建.gitignore会提示必须键入文件名，找一个文本编辑器(Nopepad 或者 Sublime等等)直接“保存”或者“另存为”就可以把文件保存为.gitignore啦

然后将一些不需要提交的匹配规则(一些相对路径或者通配符)，一行一个（#为注释）：

```
._*
#.DS_Store
.DS_Store
```

最后记得将这个文件添加到Git中去，这样其它的小伙伴也就不用再次加一遍啦。

# 查看某个文件的提交记录

```bash
git log --pretty=oneline 文件路径
git show commitid 文件路径
```


