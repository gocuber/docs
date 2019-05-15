# Cache 缓存

- [配置](#config)
- [Cache 缓存使用](#use)
    - [store() 连接存储](#store)
    - [set() 写缓存](#set)
    - [get() 获取](#get)
    - [delete() 删除缓存](#delete)
    - [setMulti() 一次写多个](#setmulti)
    - [getMulti() 获取多个](#getmulti)
    - [deleteMulti() 删除多个](#deletemulti)
    - [increment() 增加元素的值](#increment)
    - [decrement() 减小元素的值](#decrement)
    - [辅助函数 cache()](#helper)
- [添加自定义存储驱动](#driver)
    - [实现驱动](#interface)
    - [注册驱动](#register)

#### <a name="config">配置</a>

　　`Cache` 缓存默认使用 `file` 文件存储，也可以配置使用 `Redis`、`Memcache` 或使用数据库存储。

`config/app.php`

```php
'cache' => [
    'default' => env('CACHE_STORE', 'file'),      // 默认连接的存储
    'stores' => [
        'file' => [
            'driver'  => 'file',
            'connect' => 'cache',
        ],
        'memcache' => [
            'driver'  => 'memcache',
            'connect' => 'cache',
        ],
        'mysql' => [
            'driver'  => 'mysql',
            'connect' => 'cache',
            'table'   => 'app_cache',
        ],
        'redis' => [
            'driver'  => 'redis',
            'connect' => 'cache',
        ],
    ],
    'prefix' => '',   // 缓存key前缀
],

'filecache' => [
    'default' => env('FILE_CONNECT', 'default'),
    'connects' => [
        // ...
        'cache' => [
            'dir'    => base_path('storage/cache/'),
            'subdir' => 1,
        ],
    ],
],

'memcache' => [
    'default' => env('MEMCACHE_CONNECT', 'default'),
    'driver' => env('MEMCACHE_DRIVER', 'memcached'),
    'connects' => [
        // ...
        'cache' => [
            'host' => 'host1',
            'port' => 11211,
        ],
    ],
],

'db' => [
    // ...
],

'redis' => [
    // ...
],
```

#### <a name="use">Cache 缓存使用</a>

`Cuber\Support\Facades\Cache`

```php
use Cuber\Support\Facades\Cache;
```

##### <a name="store">store() 连接存储</a>

```php
Cache::store()->set(...);         // 连接默认存储
Cache::set(...);                  // 连接默认存储
Cache::store('redis')->set(...);  // 使用Redis存储
```

##### <a name="set">set() 写缓存</a>
```php
Cache::set('key1', 'Cuber', 3600);  // 缓存一小时
Cache::set('key1', 'Cuber');        // 永久缓存
```

##### <a name="get">get() 获取</a>
```php
Cache::get('key1');           // Cuber
Cache::get('key2', 'Cuber');  // 指定默认值
```

##### <a name="delete">delete() 删除缓存</a>
```php
Cache::delete('key1');
```

##### <a name="setmulti">setMulti() 一次写多个</a>
```php
$cache = Cache::store();

$items = [
    'key1' => 'Cuber1',
    'key2' => 'Cuber2',
    'key3' => 'Cuber3',
];

$cache->setMulti($items, 3600);  // 缓存一小时
```

##### <a name="getmulti">getMulti() 获取多个</a>
```php
$data = $cache->getMulti(['key1', 'key2', 'key3']);

print_r($data);
array(
    'key1' => 'Cuber1',
    'key2' => 'Cuber2',
    'key3' => 'Cuber3',
);
```

##### <a name="delmulti">delMulti() 删除多个</a>
```php
$cache->delMulti(['key1', 'key2', 'key3']);
```

##### <a name="increment">increment() 增加元素的值</a>
```php
$cache->set('key', 0, 3600);
$cache->increment('key');      // 默认加 1
$cache->increment('key', 10);
$cache->get('key');            // 11
```

##### <a name="decrement">decrement() 减小元素的值</a>
```php
$cache->decrement('key');
$cache->get('key');            // 10
```

##### <a name="helper">辅助函数 cache()</a>

```php
cache(['key'=>'value'], 3600);
cache('key');                 // value
cache('name', 'GO');          // GO

cache()->set('key', 0);
cache()->increment('key');
```

#### <a name="driver">添加自定义存储驱动</a>

##### <a name="interface">实现驱动</a>

　　自定义存储驱动需要实现 `Cuber\Cache\Store` 接口，比如一个基于 `MongoDB` 的存储驱动实现如下：

```php
namespace App\Extensions;

use Cuber\Cache\Store;

class MongoCache implements Store
{
    public function set($key, $value, $expire) {}
    public function get($key) {}
    public function delete($key) {}
    public function setMulti(array $keys, $expire) {}
    public function getMulti(array $keys) {}
    public function deleteMulti(array $keys) {}
    public function increment($key, $value = 1) {}
    public function decrement($key, $value = 1) {}
}
```

> 注：你可以将扩展放置在任何地方，这里我们统一创建一个 `Extensions` 目录用于存放 `MongoCache`。

##### <a name="register">注册驱动</a>

　　存储驱动实现后，需要将其注册到框架。我们在服务提供者 `App\Providers\AppServiceProvider` 的 `register` 方法中注册。

　　也可以重新创建一个新的服务提供者 `App\Providers\CacheServiceProvider`

```php
namespace App\Providers;

class CacheServiceProvider
{

    /**
     * 注册应用服务
     *
     * @return void
     */
    public function register()
    {

        // 注册缓存存储驱动 注意前缀必须 cache.
        app()->singleton('cache.mongo', function () {
            return new \App\Extensions\MongoCache();
        });

    }

}
```

　　修改配置 `config/app.php`

```php
// 配置
'cache' => [
    'default' => env('CACHE_STORE', 'mongo'),
    'stores' => [
        'mongo' => [
            'driver'  => 'mongo',
            'connect' => 'cache',
        ],
        // ...
    ],
    'prefix' => '',
],

// providers
'providers' => [
    // ...
    App\Providers\AppServiceProvider::class,
    App\Providers\CacheServiceProvider::class,
],

// MongoDB ...
```

<br><br><br><br><br>
