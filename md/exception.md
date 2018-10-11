# 异常处理

- [配置](#config)
- [Exception 异常处理类调用](#exception)

#### <a name="config">配置</a>

　　默认情况下程序异常信息不直接显示，可以在开发环境下配置 `'debug'` 值为 `true` 来显示异常信息；

`config/app.php`

```php
'debug' => env('DEBUG', true),
```

　　配置 `'error_log'` 将异常信息写到 `Log` 日志目录；

```php
'error_log' => BASE_PATH . 'storage/logs/',
```

　　如果程序抛出异常信息，将会在 `'error_log'` 目录下按天生成 `Log` 日志文件；

```php
// 20180208_app_error.log
// 20180208_mysql_error.log
// 20180208_system_error.log
// 20180208_app_cli_error.log
```

　　`'error_log'` 默认值为 `BASE_PATH . 'storage/logs/'` ，可以配置为 `false` 来关闭 `Log` 日志记录；

```php
'error_log' => false,
```


#### <a name="cubeexception">Exception 异常处理类调用</a>

`use Cuber\Support\Exception;`

```php
try {

    // ...
    throw new Exception("Class '{$class}' not found");

} catch (Exception $e) {

    $e->log(Exception::ERROR_TYPE_APP);

}
```

```php
try {

    // ...
    throw new \Exception("Class '{$class}' not found");

} catch (\Exception $e) {

    (new Exception())->log(Exception::ERROR_TYPE_APP, $e);

}
```
