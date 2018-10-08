# COOKIE使用

- [set() 写COOKIE](#set)
- [get() 读取COOKIE](#get)
- [del() 删除COOKIE](#del)
- [setraw() 写COOKIE](#setraw)

```php
use Cuber\Cookie\Cookie;
```

##### <a name="set">set() 写COOKIE</a>
```php
Cookie::set('key', 'value', 3600, '/', 'gocuber.com');
```

##### <a name="get">get() 读取COOKIE</a>
```php
Cookie::get('key');
```

##### <a name="del">del() 删除COOKIE</a>
```php
Cookie::del('key');
```

##### <a name="setraw">setraw() 写COOKIE</a>
　　与 set() 几乎完全相同，不同的是 setraw() 不会对 COOKIE 值进行 urlencode() URL 编码；
```php
Cookie::setraw('key', 'value', 3600, '/', 'gocuber.com');
```
