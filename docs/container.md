# 服务容器

- [bind() 绑定](#bind)
- [make() 解析](#make)
- [自动注入](#auto)
- [app() 辅助函数](#helper)

　　服务容器是一个用于管理类依赖和执行依赖注入的强大工具。

#### <a name="bind">bind() 绑定</a>

绑定基础

简单的绑定
```php
$this->bind('QueryList', function ($params) {
    return new QueryList($params);
});
```

绑定一个单例
```php
$this->singleton('ElasticSearch\Api', function () {
    return new ElasticSearch\Api(app('ElasticClient'));
});
```

绑定一个已存在的对象实例
```php
$net_http = new NetHttp\Api(new HttpClient);

$this->bind('NetHttp', $net_http);
```

> 除非你已经实例了一个类，否则不推荐直接绑定对象实例，推荐使用传入一个闭包的方法来绑定，这样只有在真正使用 `make()` 的时候才会真正实例化。

绑定原始值
```php
$this->bind('app.name', 'Cuber');
$this->bind('app.dev', true);
```

#### <a name="make">make() 解析</a>

```php
$this->make('QueryList', $params);
$this->make('ElasticSearch\Api');
$this->make('NetHttp');

$this->make('app.name');  // Cuber
$this->make('app.dev');   // true
```

#### <a name="auto">自动注入</a>

毛线~~~~ 没实现~~~~~


#### <a name="helper">app() 辅助函数</a>

```php
// 绑定
app()->bind('QueryList\Api', function ($params) {
    return new QueryList\Api($params);
});

// make 解析
$ql = app('QueryList\Api', 'https://baidu.com/');
$ql->find('title')->text();

app()->bind('app.name', 'Cuber');
app('app.name');  // Cuber
```

<br><br><br><br><br>
