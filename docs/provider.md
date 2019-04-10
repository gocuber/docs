# 服务提供者

- [COOKIE使用](#use)
    - [make() 创建COOKIE](#make)
    - [forever() 创建永久COOKIE](#forever)
    - [forget() 使COOKIE过期 删除COOKIE](#forget)
    - [setDefaultConfig() 设置默认COOKIE配置](#default)
    - [get() 获取COOKIE](#get)
- [COOKIE配置](#config)
- [辅助函数 cookie()](#helper)


#### <a name="config">`COOKIE` 配置</a>

`config/app.php`
```php
'cookie' => [
    'prefix' => '',      // cookie 前缀 默认 ''
    'domain' => null,    // cookie 域   默认 null
],
```


<br><br><br><br><br>
