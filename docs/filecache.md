# 文件缓存

- [配置](#config)
- [文件缓存使用](#use)
    - [connect() 缓存连接](#connect)
    - [set() 写缓存](#set)
    - [get() 获取](#get)
    - [delete() 删除缓存](#delete)
    - [setMulti() 一次写多个](#setmulti)
    - [getMulti() 获取多个](#getmulti)
    - [deleteMulti() 删除多个](#deletemulti)

#### <a name="config">配置</a>

　　配置文件 `config/app.php`

```php
'filecache' => [
    // default
    'default' => [
        'dir'       => base_path('storage/filecache/default/'),  // 缓存目录
        'is_subdir' => 1,                                        // 是否自动生成子级缓存目录 默认1是 0否
    ],
    // user
    'user' => [
        'dir'       => base_path('storage/filecache/user/'),
        'is_subdir' => 0,
    ],
],
```

　　为了防止缓存目录下的文件数过多，`'is_subdir' => 1,` 为1时会自动生成三层子级目录，如下：<br />

`storage/filecache/default/1c/59/3d/`

#### <a name="use">文件缓存使用</a>

`Cuber\Support\Facades\FileCache`

##### <a name="connect">connect() 缓存连接</a>

```php
FileCache::connect()->set(...);        // 连接default
FileCache::set(...);                   // 连接default
FileCache::connect('user')->set(...);  // 连接user
```

##### <a name="set">set() 写缓存</a>
```php
FileCache::set('key1', 'Cuber', 3600);  // 缓存一小时
```

##### <a name="get">get() 获取</a>
```php
FileCache::get('key1');  // Cuber
```

##### <a name="delete">delete() 删除缓存</a>
```php
FileCache::delete('key1');
```

##### <a name="setmulti">setMulti() 一次写多个</a>
```php
$cache = FileCache::connect();

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

##### <a name="deletemulti">deleteMulti() 删除多个</a>
```php
$cache->deleteMulti(['key1', 'key2', 'key3']);
```

> 不推荐使用文件缓存。

