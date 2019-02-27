---
title: 'PM2常用命令'
date: '2018-12-26'
tags: ['Node']
categories: ['编程']
path: '/pm2-commands'
---

PM2，Production Process Manager，是一个很好用的进程管理器，有很多优秀的特性，比如平滑的服务重启、直观的进程管理和日志监控、零配置负载均衡和友好的多服务器部署

以下是PM2的一些常用命令

```bash
pm2 start app.js
# 启动app.js应用程序

pm2 start app.js -i 4
# cluster mode 模式启动4个app.js的应用实例
# 4个实例会自动进行负载均衡

pm2 start app.js --name="api"
# 启动应用程序并命名为 "api"

pm2 start app.js --watch
# 当文件变化时自动重启应用

pm2 start script.sh
# 启动 bash 脚本

pm2 list
# 列表 PM2 启动的所有的应用程序

pm2 monit
# 显示每个应用程序的CPU和内存占用情况

pm2 show [app-name]
# 显示应用程序的所有信息

pm2 logs
# 显示所有应用程序的日志

pm2 logs [app-name]
# 显示指定应用程序的日志

pm2 flush
# 清除日志

pm2 stop all
# 停止所有的应用程序

pm2 stop 0
# 停止 id为 0的指定应用程序

pm2 restart all
# 重启所有应用

pm2 reload all
# 重启 cluster mode下的所有应用

pm2 gracefulReload all
# 平滑重启 cluster mode下的所有应用

pm2 delete all
# 关闭并删除所有应用

pm2 delete 0
# 删除指定应用 id 0

pm2 scale api 10
# 把名为api的应用扩展到10个实例

pm2 reset [app-name]
# 重置重启数量

pm2 startup
# 创建开机自启动命令

pm2 save
# 保存当前应用列表

pm2 resurrect
# 重新加载保存的应用列表

pm2 update
# 保存进程，重启PM2后恢复进程

pm2 generate
# 生成示例配置文件
```

**模块扩展**
pm2支持第三方扩展，比如常用的log rotate等。可参考官方文档

```bash
pm2 module:generate [name]
# 生成示例模块

pm2 install pm2-logrotate
# 安装日志轮转模块

pm2 uninstall pm2-logrotate
# 卸载模块
```



**编程接口**
如果想把PM2跟其他自动化流程整合起来，可以参考PM2编程接口的官方文档：[PM2-API](http://pm2.keymetrics.io/docs/usage/pm2-api/)

