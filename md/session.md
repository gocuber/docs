# SESSION使用

- [set() 写SESSION](#set)
- [get() 读取SESSION](#get)
- [del() 删除SESSION](#del)
- [destroy() 销毁全部](#destroy)
- [start() 与 id()](#start)

```php
use Cuber\Session\Session;
```

##### <a name="set">set() 写SESSION</a>
```php
Session::set('key', 'value');
```

##### <a name="get">get() 读取COOKIE</a>
```php
Session::get('key');
```

##### <a name="del">del() 删除COOKIE</a>
```php
Session::del('key');
```

##### <a name="destroy">destroy() 销毁全部</a>
```php
Session::destroy();
```

##### <a name="start">start() 与 id()</a>
　　一般情况下，不用手动调用start()，在使用Session类时会自动调用；
```php
Session::start(); // session_start()
Session::id();    // 获取 session_id
Session::id($id); // 设置 session_id
```
