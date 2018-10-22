# Module 模块

- [介绍](#module)
- [模块配置](#config)
- [模块路由](#route)

#### <a name="module">介绍</a>

　　通常情况下，一个网站是由多个 `Module` 模块组成，比如前台、后台、用户中心等；可以给每个模块单独配置访问域名、路由文件、控制器目录及视图模板目录；

#### <a name="config">模块配置</a>

　　`config/app.php`

```php
'module' => [
    'default' => [                                       // 默认模块
        'route'       => 'blog',                         // 模块路由文件
        'controllers' => 'App\\Controllers\\Blog\\',     // 模块控制器目录 命名空间前缀
        'views'       => BASE_PATH . 'app/views/blog/',  // 视图模板目录
    ],
    'cli' => [                                           // 当以CLI命令行方式运行时会自动加载 cli 模块
        'route'       => 'cli',
        'controllers' => 'App\\Controllers\\Cli\\',
    ],
    'admin' => [                                         // 后台模块
        'route'       => 'admin',
        'controllers' => 'App\\Controllers\\Admin\\',
        'views'       => BASE_PATH . 'app/views/admin/',
        'domain'      => env('ADMIN_DOMAIN'),
    ],
    'ucenter' => [                                       // 用户中心模块
        'route'       => 'ucenter',
        'controllers' => 'App\\Controllers\\Ucenter\\',
        'views'       => BASE_PATH . 'app/views/ucenter/',
        'domain'      => env('UCENTER_DOMAIN'),
    ],
],
```

　　模块控制器目录可以任意指定 如 `App\\Cli\\` `App\\Cron\\` `App\\Ucenter\\` 等，当以CLI命令行方式运行时会自动加载 `cli` 模块；

#### <a name="route">模块路由</a>

　　`route/admin.php` 可以为模块配置独立的路由文件；

```php
Route::get('{controller}/{action}', function ($controller = 'index', $action = 'index') {
    return ucfirst(strtolower($controller)) . 'Controller@' . strtolower($action) . 'Action';
});

Route::get('{all}', function () {
    ret404();
});

Route::pattern(['all'=>'.*', 'controller'=>'|[a-z]+', 'action'=>'|[a-z]+']);
```

<br><br><br><br><br>
