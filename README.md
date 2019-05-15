# Cuber - 更好、更快、更强的PHP开发框架
—— The Cuber PHP Framework


## 安装

```
git clone https://github.com/gocuber/cuber.git cuber
cd cuber
composer install
```


## Hello Cuber

```php
Route::get('/', function () {
    echo 'Hello Cuber';
});
```


## Code

#### 路由

```php
// 闭包路由
Route::get('welcome', function () {
    view('welcome'); // 调用视图
});
Route::get('user/info', function () {
    return 'User@info';
});

// 控制器路由
Route::get('hello', 'Demo@hello');
```

#### 数据库

```php
DB::select("select id,name from user where id = :id", ['id'=>1001]);

DB::name('user')->where(['id'=>1001])->get();
```

#### 缓存

```php
// Redis
Redis::set('key', 'value');
Redis::get('key');
Redis::hSet('h', 'key1', 'hello');
Redis::hGet('h', 'key1');
Redis::hGetAll('h');

// Memcache
Memcache::set('key1', 'Cuber', 3600);
Memcache::get('key1'); // Cuber
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
vendor|目录包含了应用所有通过 Composer 加载的依赖


## 开发文档

- 开始
    - [安装](https://github.com/gocuber/docs/blob/master/docs/install.md)
    - [快速开始](https://github.com/gocuber/docs/blob/master/docs/quickstart.md)
- 基础
    - [目录结构](https://github.com/gocuber/docs/blob/master/docs/directory.md)
    - [配置文件](https://github.com/gocuber/docs/blob/master/docs/config.md)
    - [入口文件](https://github.com/gocuber/docs/blob/master/docs/entrance.md)
    - [优雅URL](https://github.com/gocuber/docs/blob/master/docs/rewrite.md)
    - [路由](https://github.com/gocuber/docs/blob/master/docs/route.md)
    - [请求](https://github.com/gocuber/docs/blob/master/docs/request.md)
    - [Controller 控制器](https://github.com/gocuber/docs/blob/master/docs/controller.md)
    - [View 视图模板](https://github.com/gocuber/docs/blob/master/docs/view.md)
    - [Model 模型](https://github.com/gocuber/docs/blob/master/docs/model.md)
    - [Module 模块](https://github.com/gocuber/docs/blob/master/docs/module.md)
    - [类自动加载](https://github.com/gocuber/docs/blob/master/docs/autoload.md)
    - [异常处理](https://github.com/gocuber/docs/blob/master/docs/exception.md)
    - [辅助函数](https://github.com/gocuber/docs/blob/master/docs/helper.md)
- 数据库
    - [数据库配置与使用基础](https://github.com/gocuber/docs/blob/master/docs/dbbase.md)
    - [数据库查询结构器](https://github.com/gocuber/docs/blob/master/docs/dbquery.md)
    - [数据库模型(model)的使用](https://github.com/gocuber/docs/blob/master/docs/dbmodel.md)
    - [数据库事务处理](https://github.com/gocuber/docs/blob/master/docs/dbtransaction.md)
- 缓存
    - [Cache 缓存](https://github.com/gocuber/docs/blob/master/docs/cache.md)
    - [Memcache](https://github.com/gocuber/docs/blob/master/docs/memcache.md)
    - [Redis](https://github.com/gocuber/docs/blob/master/docs/redis.md)
    - [文件缓存](https://github.com/gocuber/docs/blob/master/docs/filecache.md)
- 会话
    - [SESSION使用](https://github.com/gocuber/docs/blob/master/docs/session.md)
    - [COOKIE使用](https://github.com/gocuber/docs/blob/master/docs/cookie.md)
- CLI命令行
    - [以命令行方式运行](https://github.com/gocuber/docs/blob/master/docs/cli.md)
- 扩展
    - [使用Elasticsearch](https://github.com/gocuber/docs/blob/master/docs/elasticsearch.md)
    - [使用Parsedown](https://github.com/gocuber/docs/blob/master/docs/parsedown.md)
    - [使用PHPMailer](https://github.com/gocuber/docs/blob/master/docs/phpmailer.md)
- 核心
    - [服务容器](https://github.com/gocuber/docs/blob/master/docs/container.md)
    - [服务提供者](https://github.com/gocuber/docs/blob/master/docs/provider.md)
    - [门面(Facades)](https://github.com/gocuber/docs/blob/master/docs/facade.md)

