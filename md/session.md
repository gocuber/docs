# SESSION使用

- [SESSION使用](#use)
    - [set() 写SESSION](#set)
    - [get() 获取SESSION](#get)
    - [del() 删除SESSION](#del)
    - [destroy() 销毁全部](#destroy)
    - [start() 与 id()](#start)
- [使用Redis存储SESSION](#cache)
    - [set() 写SESSION](#cacheset)
    - [get() 获取SESSION](#cacheget)
    - [del() 删除SESSION](#cachedel)
    - [id() 生成一个 session_id](#cacheid)


#### <a name="set">SESSION使用</a>

```php
use Cuber\Session\Session;
```

##### <a name="set">set() 写SESSION</a>
```php
Session::set('key', 'value');
```

##### <a name="get">get() 获取SESSION</a>
```php
Session::get('key');
```

##### <a name="del">del() 删除SESSION</a>
```php
Session::del('key');
```

##### <a name="destroy">destroy() 销毁全部</a>
```php
Session::destroy();
```

##### <a name="start">start() 与 id()</a>
　　一般情况下，不用手动调用 `start()`，在使用 `Session` 类时会自动调用；
```php
Session::start(); // session_start()
Session::id();    // 获取 session_id
Session::id($id); // 设置 session_id
```


#### <a name="cache">使用Redis存储SESSION</a>

```php
use Cuber\Cache\Session;

Session::getInstance();
Session::getInstance($session_id);
```

##### <a name="cacheset">set() 写SESSION</a>
```php
Session::getInstance()->set('key', 'value');
```

##### <a name="cacheget">get() 获取SESSION</a>
```php
Session::getInstance()->get('key');
Session::getInstance()->get();  // 获取全部
```

##### <a name="cachedel">del() 删除SESSION</a>
```php
Session::getInstance()->del('key');
Session::getInstance()->del();  // 获取删除
```

##### <a name="cacheid">id() 生成一个 session_id</a>
```php
Session::id();
```
