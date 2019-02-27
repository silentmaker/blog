---
title: 'VS Code的几个使用tip'
date: '2017-03-02'
categories: ['编程']
path: '/several-vs-code-tips'
---

**从命令行打开当前目录**

按 Shift + Command + P，调出Command Panel 输入并选择 Install 'code' command in PATH，如果没有这条命令的话，则有可能是已经添加过了，然后再打开terminal里执行code，就可以用VS Code打开当前目录了

**自定义Snippets**

查找 Perferences -> Snippets，然后按提示选择一种语言，并且按规则创建就可以了，输入对应的 prefix 时，就会出现对应用的snippet的提示title，选中回车后就可以插入你创建的模板代码段

**快捷Build命令**

在package.json里scripts添加一个build指令，然后按Command + Shift + B，就可以通过快捷键在编辑器里直接运行 build sc

**全局符号替换**

在JS项目中，选中函数名或者变量名，按 Commmand + Shift + P 或者 F2 输入，rename symbol，按提示输入替换字符串即可，在typescript项目中很有用

**隐藏文件**

按 Shift + Command + P，输入setting json，打开编辑器设置，比如想在typescript中项目中隐藏生成的js文件，可以在`"files.exclude"`选项里添加一行：`"**/*.js": {"when": "${basename}.ts"}`

