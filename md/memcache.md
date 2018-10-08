# Memcache 缓存

- [配置](#config)
- [缓存连接 Cache_Mem::connect()](#connect)
- [Memcache 缓存使用](#use)
    - [set() 写缓存](#set)
    - [get() 获取](#get)
    - [del() 删除缓存](#del)
    - [setMulti() 一次写多个](#setmulti)
    - [getMulti() 获取多个](#getmulti)
    - [delMulti() 删除多个](#delmulti)
    - [inc() 增加元素的值](#inc)
    - [dec() 减小元素的值](#dec)
    - [add() 增加元素](#add)
    - [replace() 替换元素](#replace)
    - [close() 关闭memcache连接](#close)

#### <a name="config">配置</a>

　　配置文件 config.php

```php
// 默认配置
'memcache' => [
    'default' => [
        'host' => env('MEM_DEFAULT_HOST', '127.0.0.1'),
        'port' => env('MEM_DEFAULT_PORT', 11211),
    ],
],
```

　　可以按不同的功能模块配置，每个模块可配置一个或一组Memcache，如下：


```php
// user
'memcache' => [
    'default' => [
        'host' => env('MEM_DEFAULT_HOST', '127.0.0.1'),
        'port' => env('MEM_DEFAULT_PORT', 11211),
    ],
    'user' => [
        [
            'host' => '127.0.0.1',
            'port' => 11211,
            'weight' => 30,
        ],
        [
            'host' => 'host2',
            'port' => 11211,
            'weight' => 70,
        ],
    ],
],
```


#### <a name="connect">缓存连接 Cache_Mem::connect()</a>

　　使用 Cache_Mem::connect() 连接Memcache缓存；

```php
Cache_Mem::connect();        // 连接默认Memcache
Cache_Mem::connect('user');  // 连接用户Memcache
```

　　Cache_Mem 会自动检测当前环境的扩展是Memcached还是Memcache；你也可以直接调用 Cache_Memcached 或 Cache_Memcache 类；如下：

```php
Cache_Memcached::connect();        // 连接默认Memcache
Cache_Memcached::connect('user');  // 连接用户Memcache
```


#### <a name="use">Memcache 缓存使用</a>

##### <a name="set">set() 写缓存</a>
```php
Cache_Mem::connect()->set('key1', 'Cuber', 3600);  // 缓存一小时
```

##### <a name="get">get() 获取</a>
```php
Cache_Mem::connect()->get('key1');  // Cuber
```

##### <a name="del">del() 删除缓存</a>
```php
Cache_Mem::connect()->del('key1');
```

##### <a name="setmulti">setMulti() 一次写多个</a>
```php

$cache = Cache_Mem::connect();

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

##### <a name="inc">inc() 增加元素的值</a>
```php
$cache->set('key', 0, 3600);
$cache->inc('key');     // 默认加 1
$cache->inc('key', 10);
$ret = $cache->get('key');

echo $ret; // 11
```

##### <a name="dec">dec() 减小元素的值</a>
```php
$cache->dec('key');
$ret = $cache->get('key');

echo $ret; // 10
```

##### <a name="add">add() 增加元素</a>

　　add() 与 set() 类似，但是如果 key 已经在服务端存在，操作会失败。
```php

$ret = $cache->add('key', 1, 3600);
if(false == $ret){
	$cache->inc('key');
}

```

##### <a name="replace">replace() 替换元素</a>

　　replace() 与 set() 类似，但是如果服务端不存在key，操作将失败。
```php

$cache->replace('key', 1, 3600);

```

##### <a name="close">close() 关闭memcache连接</a>
```php

$cache->close();

```
