# 服务提供者

- [介绍](#provider)
- [配置](#config)
- [使用](#use)
    - [register() 方法](#register)
    - [创建服务提供者](#create)

#### <a name="provider">介绍</a>

　　服务提供者是用来注册服务的，进行服务容器绑定，一个提供者可以注册多个服务。

#### <a name="config">配置</a>

`config/app.php`

```php
'providers' => [
    // ...
    App\Providers\AppServiceProvider::class,
],
```

#### <a name="use">使用</a>

##### <a name="register">register() 方法</a>

```php
namespace App\Providers;

class AppServiceProvider
{

    /**
     * 注册应用服务
     *
     * @return void
     */
    public function register()
    {

        // 注册单例服务
        app()->singleton('elasticsearch.api', function () {
            return new \App\Extensions\Elasticsearch();
        });

        // 注册服务
        app()->bind('elasticsearch', function () {
            return new \App\Extensions\ElasticsearchManager(app('elasticsearch.api'));
        });

    }

}
```

##### <a name="create">创建服务提供者</a>

```php
'providers' => [
    // ...
    App\Providers\AppServiceProvider::class,
    App\Providers\SessionServiceProvider::class,
],
```

```php
namespace App\Providers;

class SessionServiceProvider
{

    /**
     * 注册应用服务
     *
     * @return void
     */
    public function register()
    {

        // ...

    }

}
```


<br><br><br><br><br>
