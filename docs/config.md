# 配置文件

- [介绍](#config)
- [app.php](#app)
- [.env](#env)

#### <a name="config">介绍</a>

　　`config` 目录包含了应用所有的配置文件；目录下 `config/app.php` 该文件定义了应用、数据库及缓存等相关配置；`.env` 根目录下该文件针对多服务器或多环境之间定义配置不同的值，例如生产环境和开发环境，或者多服务器之间配置不同的从库地址等；该文件不会提交到代码仓库中，通常要加入到代码管理的忽略列表中，如 `Git` 的 `.gitignore` 文件；

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
    'views' => base_path('app/views/'),

    // providers
    'providers' => [
        // ...
        App\Providers\AppServiceProvider::class,
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
        'driver'     => env('SESSION_DRIVER', 'file'),
        'connect'    => 'session',      // 存储连接实例
        'prefix'     => 'CUBERSESS_',   // 存储中的 session_id 前缀
        'table_name' => 'app_session',  // 使用数据库存储时的表名
        'cookie_key' => 'CUBERSESSID',  // Cookie中用来存储session_id的cookie_key
        'expire'     => 86400 * 7,      // 到期失效的秒数 0为永久
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
        'session' => [
            'host'     => env('DB_SESSION_HOST', '127.0.0.1'),
            'port'     => env('DB_SESSION_PORT', 3306),
            'username' => env('DB_SESSION_USERNAME', ''),
            'password' => env('DB_SESSION_PASSWORD', ''),
            'database' => env('DB_SESSION_DATABASE', ''),
            'charset'  => 'utf8mb4',
            'driver'   => 'mysql',
        ],
    ],

    // Memcache配置
    'memcache' => [
        'driver' => env('MEMCACHE_DRIVER', 'memcached'),
        'default' => [
            'host' => env('MEMCACHE_DEFAULT_HOST', '127.0.0.1'),
            'port' => env('MEMCACHE_DEFAULT_PORT', 11211),
        ],
        'session' => [],
    ],

    // Redis配置
    'redis' => [
        'default' => [
            'host'  => env('REDIS_DEFAULT_HOST', '127.0.0.1'),
            'port'  => env('REDIS_DEFAULT_PORT', 6379),
            'auth'  => env('REDIS_DEFAULT_AUTH', ''),
            'slave' => [],
        ],
        'session' => [],
    ],

    // FileCache配置
    'filecache' => [
        'default' => [
            'dir'       => base_path('storage/filecache/default/'),  // 缓存目录
            'is_subdir' => 1,                                        // 是否自动生成子级缓存目录 默认1是 0否
        ],
        'session' => [
            'dir'       => base_path('storage/filecache/session/'),
            'is_subdir' => 1,
        ],
    ],

    // 可以自定义配置
    'is_redis' => true, // 是否启用redis

    // 异常
    'error_log' => base_path('storage/logs/'),

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

Config::get('db.default'); // 获取默认数据库配置
Config::get('db');         // 获取全部数据库配置
```

使用辅助函数 `config()`
```php
config('name');
config('db.default');
config('debug');
config('is_dev', false);
```

#### <a name="env">.env</a>

　　该文件格式等同于 `php.ini` 文件；

`.env`

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

　　使用 `env()` 获取 `.env` 的值；

```php
env('DEBUG');
env('IS_REDIS', false);

env('DB_DEFAULT_HOST', '127.0.0.1');
env('DB_DEFAULT_PORT', 3306);
```
