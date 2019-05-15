# 服务容器

- [介绍](#container)
- [绑定/解析](#use)
    - [bind() 绑定](#bind)
    - [make() 解析](#make)
- [门面类和辅助函数](#app)
    - [App 门面类](#facade)
    - [app() 辅助函数](#helper)

#### <a name="container">介绍</a>

　　服务容器是一个用于管理类依赖和执行依赖注入的强大工具。

#### <a name="use">绑定/解析</a>

##### <a name="bind">bind() 绑定</a>

绑定基础

简单的绑定
```php
$this->bind('querylist', function ($params) {
    return new QueryList($params);
});
```

绑定一个单例
```php
$this->singleton('elasticsearch.api', function () {
    return new ElasticSearch\Api(app('elasticclient'));
});
```

绑定一个已存在的对象实例
```php
$net_http = new NetHttp\Api(new HttpClient);

$this->bind('nethttp', $net_http);
```

> 除非你已经实例了一个类，否则不推荐直接绑定对象实例，推荐使用传入一个闭包的方法来绑定，这样只有在真正使用 `make()` 的时候才会真正实例化。

绑定原始值
```php
$this->bind('app.name', 'Cuber');
$this->bind('app.dev', true);
```

##### <a name="make">make() 解析</a>

```php
$this->make('querylist', [$params]);
$this->make('elasticsearch.api');
$this->make('nethttp');

$this->make('app.name');  // Cuber
$this->make('app.dev');   // true
```

#### <a name="app">门面类和辅助函数</a>

　　可以使用门面类或直接使用辅助函数来进行服务容器的绑定与解析。

##### <a name="facade">App 门面类</a>

`Cuber\Support\Facades\App`

```php
// 绑定
App::bind(...);
App::singleton(...);

// make 解析
App::make(...);
```

##### <a name="helper">app() 辅助函数</a>

```php
// 绑定
app()->bind('querylist.api', function ($params) {
    return new QueryList\Api($params);
});

// make 解析
$ql = app('querylist.api', ['https://baidu.com/']);
$ql->find('title')->text();

app()->bind('app.name', 'Cuber');
app('app.name');  // Cuber
```

<br><br><br><br><br>
