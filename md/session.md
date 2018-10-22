# SESSION使用

- [SESSION配置](#config)
- [SESSION使用](#use)
    - [set() 写SESSION](#set)
    - [get() 获取SESSION](#get)
    - [del() 删除SESSION](#del)
    - [id() 生成一个 session_id](#id)
- [使用原始PHP操作SESSION](#php)


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
        'dir'       => BASE_PATH . 'storage/filecache/session/',  // session 文件目录
        'is_subdir' => 1,
    ],
],
```

#### <a name="use">SESSION使用</a>

　　`Cuber` 使用 `Cuber\Cache\Session` 类来操作 `SESSION`

```php
use Cuber\Cache\Session;

Session::getInstance();
Session::getInstance($session_id);
```

##### <a name="set">set() 写SESSION</a>
```php
Session::getInstance()->set('key', 'value');
```

##### <a name="get">get() 获取SESSION</a>
```php
Session::getInstance()->get('key');
Session::getInstance()->get();     // 获取全部
```

##### <a name="del">del() 删除SESSION</a>
```php
Session::getInstance()->del('key');
Session::getInstance()->del();     // 删除全部
```

##### <a name="id">id() 生成一个 session_id</a>
```php
Session::id();
```


#### <a name="php">使用原始PHP操作SESSION</a>

　　不推荐使用原始PHP操作 `SESSION`

```php
use Cuber\Session\Session;

Session::set('key', 'value'); // 写
Session::get('key');          // 获取
Session::get();               // 获取全部
Session::del('key');          // 删除
Session::del();               // 删除全部
Session::destroy();           // 销毁全部

// start() 一般情况下，不用手动调用，在使用 Session 时会自动调用
Session::start(); // session_start()

// id() 设置与获取 session_id
Session::id($id); // 设置 session_id 在使用 Session 之前调用
Session::id();    // 获取 session_id
```

<br><br><br><br><br>
