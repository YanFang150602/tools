# 安装配置

1.双击Cmder.exe，即可打开；
2.将Cmder文件夹加入环境变量：
  配置环境变量：
　　新建环境变量：CMDER_HOME=cmder.exe所在目录 
　　在path中增加%CMDER_HOME% (没有bin目录，因此不需要加bin)
3.将Cmder添加到右击菜单下，打开一个管理员终端，输入 Cmder.exe /REGISTER ALL回车即可；

---------------------------------------------------------------------------------------------

# Settings/Startup里的相关配置：

1) 图标：/icon "D:\software\cmder\icons\cmder_red.ico"

2) 设置打开D盘：cmd /k d:\software\cmder\vendor\init.bat -new_console:d:D:\ 

3) 打开cmd里自带git形式的窗口：
set "PATH=%ConEmuDir%\..\..\..\Git\usr\bin;%PATH%" & %ConEmuDir%\..\..\..\Git\git-cmd.exe 
--no-cd --command=%ConEmuBaseDirShort%\conemu-msys2-64.exe /usr/bin/bash.exe 
-new_console:d:D:\workspace\ac_bp_web

4) 打开自行安装的git形式窗口并打开到D盘目录下：
cmd /c ""D:\software\Git\bin\bash" --login -i" -new_console:d:D:\

5) 在Setting->Startup->Environment里，下面文本框里输入set LC_ALL=zh_CN.UTF8来解决中文乱码问题

-----------------------------------------------------------------------------------------------

在Settings/Keys & Macro/Highlight下绑定，打开文件：
#notepad++.exe -n%1 "%3"

-----------------------------------------------------------------------------------------------

# 调整下Cmder里的配置

修改命令提示符“λ”为“$”，在Cmder文件夹下面打开vendor文件夹，打开clink.lua文件，在第46行和第48行将λ修改为$

-----------------------------------------------------------------------------------------------

默认值：
bash::bash
	cmd /c ""%ConEmuDir%\..\git-for-windows\bin\bash" --login -i"
Settings/Keys & Macro/Highlight
	far.exe /e%1:%2 "%3"

-----------------------------------------------------------------------------------------------

win + alt + p //打开设置Settings

-----------------------------------------------------------------------------------------------

# cmder修改打开路径

cmder修改打开路径，如修改{cmd::Cmder}项:
选择Startup->Task，修改{cmd::Cmder}项，把:
cmd /k "%ConEmuDir%\..\init.bat"
修改成:
cmd /k "%ConEmuDir%\..\init.bat"  -new_console:d:D:\

-----------------------------------------------------------------------------------------------

# user_aliases.cmd

修改C:\Software\Cmder\config\user_aliases.cmd，增加别名，便于使用：
note=C:\Software\Notepad++\notepad++.exe
idea=cd /d D:\IdeaWorkspace
vsc=cd /d D:\VSCodeWorkspace
gt=cd /d D:\git

