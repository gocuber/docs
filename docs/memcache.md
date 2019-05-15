# Memcache 缓存

- [配置](#config)
- [Memcache 缓存使用](#use)
    - [connect() 缓存连接](#connect)
    - [set() 写缓存](#set)
    - [get() 获取](#get)
    - [delete() 删除缓存](#delete)
    - [setMulti() 一次写多个](#setmulti)
    - [getMulti() 获取多个](#getmulti)
    - [deleteMulti() 删除多个](#deletemulti)
    - [increment() 增加元素的值](#increment)
    - [decrement() 减小元素的值](#decrement)
    - [add() 增加元素](#add)
    - [replace() 替换元素](#replace)
    - [close() 关闭当前memcache连接](#close)
    - [closeAll() 关闭全部memcache连接](#closeall)

#### <a name="config">配置</a>

　　配置文件 `config/app.php`

```php
'memcache' => [
    'default' => env('MEMCACHE_CONNECT', 'default'),      // 默认连接
    'driver' => env('MEMCACHE_DRIVER', 'memcached'),      // Memcache扩展 默认 memcached windows下一般为 memcache
    'connects' => [
        'default' => [
            'host' => env('MEMCACHE_DEFAULT_HOST', '127.0.0.1'),
            'port' => env('MEMCACHE_DEFAULT_PORT', 11211),
        ],
        'session' => [
            'host' => 'host1',
            'port' => 11211,
        ],
        'cache' => [
            'host' => 'host1',
            'port' => 11211,
        ],
    ],
],
```

　　可以按不同的功能模块配置，每个模块可配置一个或一组 `Memcache` ，如下：

```php
'memcache' => [
    'default' => env('MEMCACHE_CONNECT', 'default'),      // 默认连接
    'driver' => env('MEMCACHE_DRIVER', 'memcached'),      // Memcache扩展 默认 memcached windows下一般为 memcache
    'connects' => [
        // ...
        // user memcache 配置一组
        'user' => [
            ['host'=>'host1', 'port'=>11211, 'weight'=>30],
            ['host'=>'host2', 'port'=>11211, 'weight'=>70],
        ],
    ],
],
```

#### <a name="use">Memcache 缓存使用</a>

`Cuber\Support\Facades\Memcache`

##### <a name="connect">connect() 缓存连接</a>

```php
Memcache::connect()->set(...);        // 连接默认Memcache
Memcache::set(...);                   // 连接默认Memcache
Memcache::connect('user')->set(...);  // 连接用户Memcache
```

##### <a name="set">set() 写缓存</a>
```php
Memcache::set('key1', 'Cuber', 3600);  // 缓存一小时
Memcache::set('key1', 'Cuber');        // 永久缓存
Memcache::set('key1', 'Cuber', 0);     // 永久缓存
Memcache::set('key1', 'Cuber', time() + 86400);                   // 指定过期时间戳
Memcache::set('key1', 'Cuber', strtotime('2018-08-08 10:10:10');  // 指定过期时间戳
```

##### <a name="get">get() 获取</a>
```php
Memcache::get('key1');           // Cuber
Memcache::get('key2', 'Cuber');  // 指定默认值
```

##### <a name="delete">delete() 删除缓存</a>
```php
Memcache::delete('key1');       // 立即删除
Memcache::delete('key1', 3600); // 一小时后自动删除
```

##### <a name="setmulti">setMulti() 一次写多个</a>
```php
$cache = Memcache::connect();

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

##### <a name="add">add() 增加元素</a>

　　`add()` 与 `set()` 类似，但是如果 `key` 已经在服务端存在，操作会失败。

```php
if (false === $cache->add('key', 1, 3600)) {
    $cache->increment('key');
}
```

##### <a name="replace">replace() 替换元素</a>

　　`replace()` 与 `set()` 类似，但是如果服务端不存在 `key` ，操作将失败。

```php
$cache->replace('key', 1, 3600);
```

##### <a name="close">close() 关闭当前memcache连接</a>
```php
$cache->close();
```

##### <a name="closeall">closeAll() 关闭全部memcache连接</a>
```php
$cache->closeAll();
```

