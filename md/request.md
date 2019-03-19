# 请求

`use Cuber\Support\Facades\Request;`

#### $_GET

```php
// 获取 $_GET 参数
Request::get('id');
Request::get('name');

// 获取 $_GET 参数 指定默认值
Request::get('id', 1);
Request::get('name', 'Cuber');

// 获取全部 $_GET
Request::get();
```

#### $_POST

```php
// 获取 $_POST 参数
Request::post('id');
Request::post('name');

// 获取 $_POST 参数 指定默认值
Request::post('id', 1);
Request::post('name', 'Cuber');

// 获取全部 $_POST
Request::post();
```

#### $_REQUEST

```php
// 获取 $_REQUEST 参数
Request::request('id');
Request::request('name');

// 获取 $_REQUEST 参数 指定默认值
Request::request('id', 1);
Request::request('name', 'Cuber');

// 获取全部 $_REQUEST
Request::request();
```

#### CLI参数

```php
// 获取 CLI 参数
Request::argv('id');
Request::argv('name');

// 获取 CLI 参数 指定默认值
Request::argv('id', 1);
Request::argv('name', 'Cuber');

// 获取全部 CLI
Request::argv();
```

#### 辅助函数 request()

```php
request('id');
request('id', 1);

request()->get();
request()->argv();
```

<br><br><br><br><br>
