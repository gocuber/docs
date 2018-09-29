# Cuber
—— 更好、更快、更强的PHP开发框架

## 下载与安装

```
git clone https://github.com/gocuber/cuber.git cuber
cd cuber
composer install
```

## 创建第一个应用 Hello World

```php
Route::get('/', function () {
    echo 'Hello World';
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


###### 基础
- 目录结构
- 入口文件
- URL模式
- URL重写
- Controller 控制器
- View 视图模板
- Model 模型
- URL路由
- 类自动加载
- 开发规范
- 异常处理
###### 数据库
- 数据库配置与使用基础
- 数据库查询结构器
- 数据库模型(model)的使用
- 数据库事务处理
###### 缓存
- Memcache
- Redis
- 文件缓存
- 使用缓存存储SESSION
###### 类库及函数
- 系统函数说明
- 系统类库说明
- SESSION使用
- COOKIE使用
###### CLI命令行
- 以命令行方式运行
###### 扩展
- 使用Smarty
- 使用第三方库




