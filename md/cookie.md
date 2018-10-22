# COOKIE使用

- [COOKIE使用](#use)
    - [set() 写COOKIE](#set)
    - [get() 获取COOKIE](#get)
    - [del() 删除COOKIE](#del)
    - [setraw() 写COOKIE](#setraw)

#### <a name="set">COOKIE使用</a>

```php
use Cuber\Cookie\Cookie;
```

　　`COOKIE` 配置 `config/app.php`

```php
'cookie' => [
    'prefix' => '',      // cookie 前缀 默认 ''
    'domain' => null,    // cookie 域   默认 null
],
```

##### <a name="set">set() 写COOKIE</a>
```php
Cookie::set('key', 'value', 3600, '/', 'gocuber.com');
```

##### <a name="get">get() 获取COOKIE</a>
```php
Cookie::get('key');
```

##### <a name="del">del() 删除COOKIE</a>
```php
Cookie::del('key');
```

##### <a name="setraw">setraw() 写COOKIE</a>
　　与 `set()` 几乎完全相同，不同的是 `setraw()` 不会对 `COOKIE` 值进行 `urlencode()` URL编码；
```php
Cookie::setraw('key', 'value', 3600, '/', 'gocuber.com');
```

<br><br><br><br><br>
