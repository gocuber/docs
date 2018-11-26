# 配置文件

- [介绍](#config)
- [app.php](#app)
- [config.ini](#ini)

#### <a name="config">介绍</a>

　　`config` 目录包含了应用所有的配置文件；目录下一般会有两个文件，`config/app.php` 定义了应用、数据库及缓存等相关配置；`config/config.ini` 该文件针对多服务器或多环境之间定义配置不同的值，例如生产环境和开发环境，或者多服务器之间配置不同的从库地址等；该文件不会提交到代码仓库中，通常要加入到代码管理的忽略列表中，如 `Git` 的 `.gitignore` 文件；

#### <a name="app">app.php</a>

`config/app.php`

```php
return [

    'name' => 'Cuber',

    'timezone' => 'PRC',

    'charset' => 'utf-8',

    'debug' => env('DEBUG', false),

    // controllers namespace prefix
    'controllers_namespace' => 'App\\Controllers\\',

    // models namespace prefix
    'models_namespace' => 'App\\Models\\',

    // views dir
    'views' => base_path() . 'app/views/',

    // alias
    'alias' => [
        'Route' => 'Cuber\\Foundation\\Route',
        'View'  => 'Cuber\\Foundation\\View',
    ],

    // 模块配置
    'module' => [
        'default' => [
            'route'       => 'app',
            'controllers' => 'App\\Controllers\\',
        ],
        'cli' => [
            'route'       => 'cli',
            'controllers' => 'App\\Cli\\',
        ],
    ],

    // cookie配置
    'cookie' => [
        'prefix' => null,  // cookie 前缀
        'domain' => null,  // cookie 域
    ],

    // session配置
    'session' => [
        'driver'  => env('SESSION_DRIVER', 'file'),
        'connect' => 'session',
        'prefix'  => '',
        'cookie'  => null,    // session_id cookie key
        'time'    => null,
    ],

    // 数据库配置
    'db' => [
        'default' => [
            'host'     => env('DB_DEFAULT_HOST', '127.0.0.1'),
            'port'     => env('DB_DEFAULT_PORT', 3306),
            'username' => env('DB_DEFAULT_USERNAME', ''),
            'password' => env('DB_DEFAULT_PASSWORD', ''),
            'database' => env('DB_DEFAULT_DATABASE', ''),
            'charset'  => 'utf8mb4',
            'driver'   => 'mysql',
            'slave'    => [],
        ],
    ],

    // Memcache配置
    'memcache' => [
        'default' => [
            'host' => env('MEM_DEFAULT_HOST', '127.0.0.1'),
            'port' => env('MEM_DEFAULT_PORT', 11211),
        ],
    ],

    // Redis配置
    'redis' => [
        'default' => [
            'host'  => env('REDIS_DEFAULT_HOST', '127.0.0.1'),
            'port'  => env('REDIS_DEFAULT_PORT', 6379),
            'auth'  => env('REDIS_DEFAULT_AUTH', ''),
            'slave' => [],
        ],
    ],

    // 可以自定义配置
    'is_redis' => true, // 是否启用redis

    // 异常
    'error_log' => base_path() . 'storage/logs/',

    // authcode
    'authcode' => env('AUTH_CODE', ''),

    // rsa
    'rsa' => [],

    // ...

];
```

`use Cuber\Support\Facades\Config;`

```php
Config::get('name');             // Cuber
Config::get('is_redis', true);   // true
Config::get('charset', 'utf-8'); // utf-8
Config::debug();                 // true

Config::db('default');     // 获取默认数据库配置
Config::get('db.default'); // 同上
Config::db(null);          // 获取全部数据库配置
Config::get('db');         // 同上

Config::mem('default');
Config::redis('default');
```

#### <a name="ini">config.ini</a>

　　该文件格式等同于 `php.ini` 文件；

`config/config.ini`

```php
; database default config
DB_DEFAULT_HOST     = "127.0.0.1"
DB_DEFAULT_PORT     = "3306"
DB_DEFAULT_USERNAME = "root"
DB_DEFAULT_PASSWORD = "123456"
DB_DEFAULT_DATABASE = "db_blog"

; database slave config
DB_DEFAULT_SLAVE = "slave1:3306,slave2:3306,slave3:3306"

; memcache
MEM_DEFAULT_HOST = "127.0.0.1"
MEM_DEFAULT_PORT = "11211"

; redis
REDIS_DEFAULT_HOST = "127.0.0.1"
REDIS_DEFAULT_PORT = "6379"

; DEBUG
DEBUG = true
```

　　使用 `env()` 获取 `config/config.ini` 的值；

```php
env('DEBUG');
env('IS_REDIS', false);

env('DB_DEFAULT_HOST', '127.0.0.1');
env('DB_DEFAULT_PORT', 3306);
```
