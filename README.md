# Cuber - 更好、更快、更强的PHP开发框架
—— The Cuber PHP Framework


## 安装

```
git clone https://github.com/gocuber/cuber.git cuber
cd cuber
composer install
```

## 创建第一个应用

```php
Route::get('/', function () {
    echo 'Hello Cuber';
});
```

## 目录结构

目录|说明
:--------|:--------
app|应用目录
-- Controllers|控制器目录
-- Libs|类目录
-- Models|Model目录
-- views|视图目录
bootstrap|用于框架的启动和自动载入配置
config|目录包含了应用所有的配置文件
public|目录包含了应用入口文件 index.php 和前端资源文件（图片、JavaScript、CSS等）<br>该目录也是 Apache 或 Nginx 等 Web 服务器所指向的应用根目录
route|目录包含了应用定义的所有路由
storage|缓存文件、临时文件、log日志等
vendor|Composer加载的依赖


## 开发文档

- 开始
    - [简介](https://github.com/gocuber/guide/blob/master/md/about.md)
    - [安装](https://github.com/gocuber/guide/blob/master/md/install.md)
    - [创建第一个应用](https://github.com/gocuber/guide/blob/master/md/app.md)
- 基础
    - [目录结构](https://github.com/gocuber/guide/blob/master/md/directory.md)
    - [入口文件](https://github.com/gocuber/guide/blob/master/md/entrance.md)
    - [URL模式](https://github.com/gocuber/guide/blob/master/md/urlmodel.md)
    - [URL重写](https://github.com/gocuber/guide/blob/master/md/rewrite.md)
    - [Controller 控制器](https://github.com/gocuber/guide/blob/master/md/controller.md)
    - [View 视图模板](https://github.com/gocuber/guide/blob/master/md/view.md)
    - [Model 模型](https://github.com/gocuber/guide/blob/master/md/model.md)
    - [URL路由](https://github.com/gocuber/guide/blob/master/md/route.md)
    - [类自动加载](https://github.com/gocuber/guide/blob/master/md/autoload.md)
    - [异常处理](https://github.com/gocuber/guide/blob/master/md/exception.md)
- 数据库
    - [数据库配置与使用基础](https://github.com/gocuber/guide/blob/master/md/dbbase.md)
    - [数据库查询结构器](https://github.com/gocuber/guide/blob/master/md/dbquery.md)
    - [数据库模型(model)的使用](https://github.com/gocuber/guide/blob/master/md/dbmodel.md)
    - [数据库事务处理](https://github.com/gocuber/guide/blob/master/md/dbtransaction.md)
- 缓存
    - [Memcache](https://github.com/gocuber/guide/blob/master/md/memcache.md)
    - [Redis](https://github.com/gocuber/guide/blob/master/md/redis.md)
    - [文件缓存](https://github.com/gocuber/guide/blob/master/md/filecache.md)
- 类库及函数
    - [SESSION使用](https://github.com/gocuber/guide/blob/master/md/session.md)
    - [COOKIE使用](https://github.com/gocuber/guide/blob/master/md/cookie.md)
- CLI命令行
    - [以命令行方式运行](https://github.com/gocuber/guide/blob/master/md/cli.md)



