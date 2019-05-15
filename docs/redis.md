# Redis

- [配置](#config)
- [Redis 连接与主从切换](#conn)
    - [connect()](#connect)
    - [master()](#master)
    - [slave()](#slave)
- [Redis 使用](#use)
    - [使用基础](#base)
    - [Pub/sub 发布订阅](#pubsub)
    - [MULTI 与 PIPELINE](#multi)

#### <a name="config">配置</a>

`config/app.php`
```php
'redis' => [
    'default' => env('REDIS_CONNECT', 'default'),                   // 默认连接
    'driver' => env('REDIS_DRIVER', 'redis'),
    'connects' => [
        'default' => [
            'host'     => env('REDIS_DEFAULT_HOST', '127.0.0.1'),
            'port'     => env('REDIS_DEFAULT_PORT', 6379),
            'auth'     => env('REDIS_DEFAULT_AUTH', ''),            // 如果需要认证 配置 auth
            'database' => 0,                                        // 数据库 默认 0
            'slave'    => [],
        ],
        'session' => [
            'host'     => 'host1',
            'port'     => 6379,
        ],
        'cache' => [
            'host'     => 'host2',
            'port'     => 6379,
        ],
    ],
],
```

　　与数据库一样 `Redis` 也可配置主从和多个实例，从库省略的字段自动继承主库配置

```php
'redis' => [
    'default' => env('REDIS_CONNECT', 'default'),
    'driver' => env('REDIS_DRIVER', 'redis'),
    'connects' => [
        'default' => [
            'host'     => env('REDIS_DEFAULT_HOST', '127.0.0.1'),
            'port'     => env('REDIS_DEFAULT_PORT', 6379),
            'auth'     => env('REDIS_DEFAULT_AUTH', ''),
            'database' => 0,
            'slave'    => [                             // 配置 slave 从库省略的字段自动继承主库配置
                ['host'=>'slave1', 'port'=>6379],
                ['host'=>'slave2', 'port'=>6379],
            ],
        ],
        'user' => [
            // ...
        ],
        // ...
    ],
],
```

#### <a name="conn">Redis 连接与主从切换</a>

　　使用 `Cuber\Support\Facades\Redis` 来操作 `Redis`。

##### <a name="connect">connect()</a>

```php
Redis::connect()->get(...);        // 连接默认Redis
Redis::get(...);                   // 连接默认Redis
Redis::connect('user')->get(...);  // 连接用户Redis
```

> `connect()` 默认连接 `Redis` 主库实例，使用 `master()` 与 `slave()` 来切换主从实例。

##### <a name="master">master()</a>
```php
Redis::master();                  // 连接默认 主Redis
Redis::connect()->master();       // 连接默认 主Redis
Redis::connect('user')->master(); // 连接用户 主Redis
```

##### <a name="slave">slave()</a>
```php
Redis::slave();                   // 连接默认 从Redis
Redis::connect()->slave();        // 连接默认 从Redis
Redis::connect('user')->slave();  // 连接用户 从Redis
```

> 如果没有配置 `slave`，那么调用 `slave()` 返回的也是 `master`。

#### <a name="use">Redis 使用</a>

　　`Redis` 类对 `Redis` 的持久化连接做了一个封装，返回原始底层的 `Redis` 实例，接下来使用 `Redis` 的接口方法来操作 `Redis` ；

##### <a name="base">使用基础</a>

```php
// Strings
Redis::get('key');
Redis::set('key', 'value');
Redis::delete('key1', 'key2');
Redis::exists('key');
Redis::mGet(['key1', 'key2', 'key3']);

Redis::connect()->get('key');
Redis::connect()->set('key', 'value');

// Hashes
$redis = Redis::connect('user');

$redis->hSet('h', 'key1', 'hello');
$redis->hGet('h', 'key1');
$redis->hKeys('h');
$redis->hVals('h');
$redis->hGetAll('h');

$redis->hIncrBy('h', 'x', 1);
$redis->hMSet('user:1', ['name' => 'Joe', 'salary' => 2000]);
$redis->hMGet('h', ['field1', 'field2']);

// Lists
$redis->lPush('key1', 'A');
$redis->blPop('key1', 'key2', 10);
$redis->brPop('key1', 'key2', 10);
$redis->rPush('key1', 'A');
$redis->lGet('key1', 0);
$redis->lGet('key1', 0);

// Sets
$redis->sAdd('key1' , 'member2', 'member3');
$redis->sCard('key1');
$redis->sMove('key1', 'key2', 'member13');
$redis->sPop('key1');
$redis->sRem('key1', 'member2', 'member3');

// Sorted sets
$redis->zAdd('key', 5, 'val5');
$redis->zRange('key', 0, -1);
$redis->zDelete('key', 'val2');

// ...
```

##### <a name="pubsub">Pub/sub 发布订阅</a>

```php
Redis::publish('chan-1', 'hello, world!');
Redis::subscribe(['chan-1', 'chan-2', 'chan-3'], 'f');
```

##### <a name="multi">MULTI 与 PIPELINE</a>

```php
$result = Redis::multi()
    ->set('key1', 'val1')
    ->get('key1')
    ->set('key2', 'val2')
    ->get('key2')
    ->exec();
```

[Redis 权威指南参考](https://github.com/phpredis/phpredis)

