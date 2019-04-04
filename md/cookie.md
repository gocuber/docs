# COOKIE使用

- [COOKIE使用](#use)
    - [make() 创建COOKIE](#make)
    - [forever() 创建永久COOKIE](#forever)
    - [forget() 使COOKIE过期 删除COOKIE](#forget)
    - [setDefaultConfig() 设置默认COOKIE配置](#default)
    - [get() 获取COOKIE](#get)
- [COOKIE配置](#config)
- [辅助函数 cookie()](#helper)

#### <a name="use">COOKIE使用</a>

```php
use Cuber\Support\Facades\Cookie;
```

##### <a name="make">make() 创建COOKIE</a>
```php
Cookie::make('name', 'value', 3600, '/', 'gocuber.com');
```

##### <a name="forever">forever() 创建永久COOKIE</a>
```php
Cookie::forever('name', 'value', '/', 'gocuber.com');
```

##### <a name="forget">forget() 使COOKIE过期 删除COOKIE</a>
```php
Cookie::forget('name');
```

##### <a name="default">setDefaultConfig() 设置默认COOKIE配置</a>
```php
Cookie::setDefaultConfig('/', 'gocuber.com');
Cookie::make('name', 'value', 3600);
```

##### <a name="get">get() 获取COOKIE</a>
```php
Cookie::get('name');
```

#### <a name="config">`COOKIE` 配置</a>

`config/app.php`
```php
'cookie' => [
    'prefix' => '',      // cookie 前缀 默认 ''
    'domain' => null,    // cookie 域   默认 null
],
```

```
Cookie::make('name', 'value', 3600, '/', config('cookie.domain'));
```

#### <a name="helper">辅助函数 cookie()</a>

```
cookie('name', 'value', 3600, '/', config('cookie.domain'));
cookie()->get();
cookie()->setDefaultConfig()->make();
```

<br><br><br><br><br>
