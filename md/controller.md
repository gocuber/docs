# Controller 控制器

- [控制器简单实例](#example)
- [子模块控制器](#module)
- [命名规则](#namingrules)
- [与路由绑定](#bindroute)
- [构造方法](#construct)

#### <a name="example">控制器简单实例</a>

　　控制器是由一个或多个 `action()` 动作方法组成，控制器类文件存放在 `app/Controllers` 目录下；我们先来创建一个简单的控制器 `app/Controllers/Demo.php` 并添加一个动作方法 `welcome()`<br />代码：

```php
namespace App\Controllers;

use Cuber\Foundation\Controller;

class Demo extends Controller
{

    public function welcome()
    {
        echo 'Welcome to Cuber !';
    }

}
```

　　现在通过URL http://localhost/demo/welcome/ 来访问，会显示：`Welcome to Cuber !`<br />
　　如果你不希望某个方法被url访问使用 `private` 或 `protected` <br />代码：

```php
private function init()
{
    // ...
}
```


#### <a name="module">子模块控制器</a>

　　控制器可以按功能模块创建子级目录，例如新建一个目录 `Ucenter` 来存放用户中心模块控制器；<br />
　　新建控制器 `app/Controllers/Ucenter/User.php`<br />代码：

```php
namespace App\Controllers\Ucenter;

use Cuber\Foundation\Controller;

class User extends Controller
{

    public function show()
    {
        echo 'Hello ' . $_GET['name'];
    }

}
```

　　现在通过URL http://localhost/ucenter/user/show?name=cuber 来访问，会显示：`Hello cuber`<br />


#### <a name="namingrules">命名规则</a>

　　控制器命名规则遵循 `PSR-4`，使用 `PSR-4` 自动载入标准自动加载；控制器继承 `Cuber\Foundation\Controller` 类；<br />


#### <a name="bindroute">与路由绑定</a>

```php
Route::get('welcome', 'Demo@welcome');
```


　　访问URL http://localhost/welcome 显示：`Welcome to Cuber !`<br />


```php
Route::get('user/{name}', 'Ucenter\User@show?name={name}');
// 或
Route::get('user/{name}', function ($name = 'Cuber') {
    return 'Ucenter\User@show?name=' . $name;
});
```

　　访问URL http://localhost/user/cuber 显示：`Hello cuber`<br />

　　控制器路由格式 `'访问url', '控制器@动作?参数=值&参数=值'`<br />
　　更多路由配置参考 [URL路由](https://github.com/gocuber/guide/blob/master/md/route.md) 章节；


#### <a name="construct">构造方法</a>


　　可以在控制器中使用 `__construct()` 构造方法；但是需要注意一定要将下面这行代码写在里面；代码：


```php
namespace App\Controllers;

use Cuber\Foundation\Controller;

class Demo extends Controller
{

    public function __construct($opt = [])
    {
        parent::__construct($opt); // 调用父类构造方法

        // ...
    }

}
```
