# Redis

- [配置](#config)
- [Redis连接 Cache_Redis::connect()](#connect)
    - [master()](#master)
    - [slave()](#slave)
- [Redis 使用](#use)

#### <a name="config">配置</a>

　　配置文件 `config/app.php`

```php
'redis' => [
    'default' => [
        'host' => env('REDIS_DEFAULT_HOST', '127.0.0.1'),
        'port' => env('REDIS_DEFAULT_PORT', 6379),
        'auth' => '123456',    // 如果需要认证 配置 auth
    ],
],
```

　　与数据库一样 `Redis` 也可配置主从

```php
'redis' => [
    // default redis
    'default' => [
        'host' => env('REDIS_DEFAULT_HOST', '127.0.0.1'),
        'port' => env('REDIS_DEFAULT_PORT', 6379),
        'auth' => '123456',
        'slave' => [              // 配置 slave
            [
                'host' => 'slave1',
                'port' => 6379,
            ],
            [
                'host' => 'slave2',
                'port' => 6379,
            ],
        ],
    ],
    // user redis
    'user' => [
        // ...
    ],
],
```

#### <a name="connect">Redis连接 Cache_Redis::connect()</a>

```php
Cache_Redis::connect();        // 连接默认Redis
Cache_Redis::connect('user');  // 连接用户Redis
```

　　使用 `connect()` 连接始终返回的都是 `master` 主Redis；如果配置了 `slave` ，可以使用 `master()` 或 `slave()` 来分别连接主或从 `Redis` ；

##### <a name="master">master()</a>
```php
Cache_Redis::master();       // 连接默认 主Redis
Cache_Redis::master('user'); // 连接用户 主Redis
```

##### <a name="slave">slave()</a>
```php
Cache_Redis::slave();       // 连接默认 从Redis
Cache_Redis::slave('user'); // 连接用户 从Redis
```

　　如果没有配置 `slave` ，那么调用 `slave()` 返回的也是主 `Redis` ；实际上 `connect()` 方法第二个参数就是用来区分连接 `master` 或 `slave` ，默认值是 `master` ；

```php
/**
 * connect
 *
 * @return Cache_Redis
 */
public static function connect($conf = null, $mode = 'master'){}

/**
 * master
 *
 * @return Cache_Redis
 */
public static function master($conf = null)
{
    return self::connect($conf, 'master');
}

/**
 * slave
 *
 * @return Cache_Redis
 */
public static function slave($conf = null)
{
    return self::connect($conf, 'slave');
}
```


#### <a name="use">Redis 使用</a>

　　`Cache_Redis` 类对 `Redis` 的持久化连接做了一个封装，返回原始底层的 `Redis` 实例，接下来使用 `Redis` 的接口方法来操作 `Redis` ；

```php
$redis = Cache_Redis::connect();

// Strings

$redis->get('key');
$redis->set('key', 'value');
$redis->delete('key1', 'key2');
$redis->exists('key');
$redis->mGet(['key1', 'key2', 'key3']);

// Hashes
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

　　[Redis 权威指南参考](https://github.com/phpredis/phpredis)

