# 门面(Facades)

- [介绍](#facade)
- [门面类列表](#list)

#### <a name="facade">介绍</a>

　　通过门面类，我们可以简单、方便的使用服务容器中绑定的服务。除了门面之外，还可以直接使用辅助函数来快速调用服务。

```php
Config::get('name');
config('name');

Cookie::make('name', 'value', 3600);
cookie('name', 'value', 3600);

Request::get('id');
request('id');
request()->get('id');
```

#### <a name="list">门面类列表</a>

门面|类|服务容器绑定
:--------|:--------|:--------
App|Cuber\Foundation\Application|app
Config|Cuber\Config\Config|config
Cookie|Cuber\Cookie\Cookie|cookie
DB|Cuber\Database\DatabaseManager|db
FileCache|Cuber\FileCache\FileCache|filecache
Memcache|Cuber\Memcache\MemcacheManager|memcache
Redis|Cuber\Redis\RedisManager|redis
Request|Cuber\Support\Request|request
Route|Cuber\Foundation\Route|route
Session|Cuber\Session\SessionManager|session
View|Cuber\Foundation\View|view

<br><br><br><br><br>
