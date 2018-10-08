# 文件缓存

- [配置](#config)
- [缓存连接 Cache_File::connect()](#connect)
- [文件缓存使用](#use)
    - [set() 写缓存](#set)
    - [get() 获取](#get)
    - [del() 删除缓存](#del)
    - [setMulti() 一次写多个](#setmulti)
    - [getMulti() 获取多个](#getmulti)
    - [delMulti() 删除多个](#delmulti)

#### <a name="config">配置</a>

　　配置文件 config.php

```php

	$_G['filecache']['default'] = array(
		'dir'       => '/tmp/filecache/default/',   // 缓存目录
	    'is_subdir' => 1,                           // 是否自动生成子集缓存目录 默认1是 0否
	);

	// 可以按不同的功能模块配置多个
	$_G['filecache']['user'] = array(
	    'dir'       => '/tmp/filecache/user/',
	    'is_subdir' => 0,
	);

```

　　为了防止缓存目录下的文件数过多，is_subdir 为1时会自动生成三层子集目录，如下：<br />
'/tmp/filecache/default/1c/59/3d/'



#### <a name="connect">缓存连接 Cache_File::connect()</a>

　　使用 Cache_File::connect() 连接文件缓存；

```php

	Cache_File::connect();
	Cache_File::connect('user');

```


#### <a name="use">文件缓存使用</a>

##### <a name="set">set() 写缓存</a>
```php

Cache_File::connect()->set('key1', 'Cuber', 3600);  // 缓存一小时

```

##### <a name="get">get() 获取</a>
```php

Cache_File::connect()->get('key1');  // Cuber

```

##### <a name="del">del() 删除缓存</a>
```php

Cache_File::connect()->del('key1');

```

##### <a name="setmulti">setMulti() 一次写多个</a>
```php

$cache = Cache_File::connect();

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

　　不推荐使用文件缓存；
