# Module 模块

- [介绍](#module)
- [模块配置](#config)
- [模块路由](#route)

#### <a name="module">介绍</a>

　　通常情况下，一个网站是由多个 `Module` 模块组成，比如前台、后台、用户中心等；可以给每个模块单独配置访问域名、控制器目录、路由文件；

#### <a name="config">模块配置</a>

　　`config/app.php`

```php
'module' => [
    'admin' => [                                    // 后台模块
        'route'      => 'admin',                    // 模块路由文件 router/admin.php
        'namespace'  => 'App\\Admin\\',             // 模块控制器目录 命名空间前缀
        'domain'     => env('ADMIN_DOMAIN'),        // 模块域名
    ],
    'ucenter' => [
        'route'      => 'ucenter',
        'namespace'  => 'App\\Controllers\\Ucenter\\',
        'domain'     => env('UCENTER_DOMAIN'),
    ],
    'cron' => [
        'route'      => 'cron',
        'namespace'  => 'App\\Cron\\',
    ],
],
```


#### <a name="route">模块路由</a>

　　`router/admin.php`

```php
'module' => [
    'admin' => [                                    // 后台模块
        'route'      => 'admin',                    // 模块路由文件 router/admin.php
        'namespace'  => 'App\\Admin\\',             // 模块控制器目录 命名空间前缀
        'domain'     => env('ADMIN_DOMAIN'),        // 模块域名
    ],
    'ucenter' => [
        'route'      => 'ucenter',
        'namespace'  => 'App\\Controllers\\Ucenter\\',
        'domain'     => env('UCENTER_DOMAIN'),
    ],
    'cron' => [
        'route'      => 'cron',
        'namespace'  => 'App\\Cron\\',
    ],
],
```