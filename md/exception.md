# 异常处理

- [配置](#config)
- [CubeException 异常处理类调用](#cubeexception)

#### <a name="config">配置</a>

　　默认情况下程序异常信息不直接显示，可以在开发环境下配置常量 APP_DEBUG 值为 true 来显示异常信息；
```php
define('APP_DEBUG', true);
```

　　配置 $_G['error_log'] 将异常信息写到log日志目录；
```php
$_G['error_log'] = APP_DIR . '../tmp/error_log/';
```

　　如果程序抛出异常信息，将会在 ['error_log'] 目录下按天生成log日志文件；
```php
// 20180208_app_error.log
// 20180208_mysql_error.log
// 20180208_system_error.log
// 20180208_app_cli_error.log
```

　　['error_log'] 默认值为 /tmp/error_log/ ，可以配置为 false 来关闭log日志记录；
```php
$_G['error_log'] = false;
```


#### <a name="cubeexception">CubeException 异常处理类调用</a>

```php
try {

	// ...
	throw new CubeException("Class '{$class}' not found");

} catch (CubeException $e) {

	$e->log(CubeException::ERROR_TYPE_APP);

}
```

```php
try {

	// ...
	throw new Exception("Class '{$class}' not found");

} catch (Exception $e) {

	(new CubeException())->log(CubeException::ERROR_TYPE_APP, $e);

}
```
