# SESSION使用

- [SESSION配置](#config)
- [SESSION使用](#use)
    - [set() 写SESSION](#set)
    - [get() 获取SESSION](#get)
    - [del() 删除SESSION](#del)
    - [createId() 生成一个 session_id](#id)


#### <a name="config">SESSION配置</a>

　　`SESSION` 默认存储在文件中，也可以配置使用 `Redis` 或 使用 `Memcache` 缓存来存储 `SESSION` <br><br>

　　`config/app.php`

```php
// session配置
'session' => [
    'driver'  => env('SESSION_DRIVER', 'file'),  // 默认使用文件存储 session 也可以设置为 redis 或 memcache
    'connect' => 'session',                      // connent filecache key
    'prefix'  => '',
    'cookie'  => null,                           // session_id cookie key
    'time'    => null,
],

// FileCache配置
'filecache' => [
    'session' => [
        'dir'       => base_path() . 'storage/filecache/session/',  // session 文件目录
        'is_subdir' => 1,
    ],
],
```

#### <a name="use">SESSION使用</a>

　　`Cuber` 使用 `Cuber\Support\Facades\Session` 类来操作 `SESSION`

```php
use Cuber\Support\Facades\Session;
```

##### <a name="set">set() 写SESSION</a>
```php
Session::set('key', 'value');
```

##### <a name="get">get() 获取SESSION</a>
```php
Session::get('key');
Session::get();     // 获取全部
```

##### <a name="del">del() 删除SESSION</a>
```php
Session::del('key');
Session::del();     // 删除全部
```

##### <a name="id">createId() 生成一个 session_id</a>
```php
$id = Session::createId();

Session::id($id)->set('key', 'value');
Session::id($id)->get('key');
```

<br><br><br><br><br>
