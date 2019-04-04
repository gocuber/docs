# 请求

- [请求](#use)
    - [get() GET](#get)
    - [post() POST](#post)
    - [request() REQUEST](#request)
    - [argv() CLI](#argv)
    - [param() 全部请求](#param)
    - [cookie() COOKIE](#cookie)
- [辅助函数 request()](#helper)

#### <a name="use">请求</a>

```php
use Cuber\Support\Facades\Request;
```

##### <a name="get">get() GET</a>

```php
// 获取 GET 参数
Request::get('id');
Request::get('name');

// 获取 GET 参数 指定默认值
Request::get('id', 1);
Request::get('name', 'Cuber');

// 获取全部 GET
Request::get();
```

##### <a name="post">post() POST</a>

```php
// 获取 POST 参数
Request::post('id');
Request::post('name');

// 获取 POST 参数 指定默认值
Request::post('id', 1);
Request::post('name', 'Cuber');

// 获取全部 POST
Request::post();
```

##### <a name="request">request() REQUEST</a>

```php
// 获取 REQUEST 参数
Request::request('id');
Request::request('name');

// 获取 REQUEST 参数 指定默认值
Request::request('id', 1);
Request::request('name', 'Cuber');

// 获取全部 REQUEST
Request::request();
```

##### <a name="argv">argv() CLI</a>

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

##### <a name="param">param() 全部请求</a>

　　`param()` 实际就是合并了 `GET` `POST` `CLI`

```php
// 获取请求参数
Request::param('id');
Request::param('name');

// 获取请求参数 指定默认值
Request::param('id', 1);
Request::param('name', 'Cuber');

// 获取全部
Request::param();
```

##### <a name="cookie">cookie() COOKIE</a>

```php
// 获取 COOKIE
Request::cookie('id');
Request::cookie('name');

// 获取 COOKIE 指定默认值
Request::cookie('id', 1);
Request::cookie('name', 'Cuber');

// 获取全部 COOKIE
Request::cookie();
```

#### <a name="helper">辅助函数 request()</a>

```php
request('id');
request('id', 1);

request()->param();
request()->cookie();
```

<br><br><br><br><br>
