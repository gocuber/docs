# View 视图模板

- [View 简单实例](#view)
- [assign() 赋值](#assign)
- [display() 显示视图模板](#display)
- [load() 视图中加载其他视图文件](#load)

#### <a name="view">View 简单实例</a>

　　为了实现逻辑和界面分离，大部分逻辑应该被放置于控制器或模型中，而视图仅仅用于显示结果，视图文件存放在 `app/views/` 目录下；接下来，我们做一个简单的实例，控制器代码：

```php
namespace App\Controllers;

use Cuber\Foundation\Controller;

class Demo extends Controller
{

    public function welcome()
    {
        View::assign('title', 'Hello World');   // 赋值
        View::assign('date',  date('Y-m-d'));   // 赋值
        View::display('welcome');               // 显示视图模板
    }

}
```

　　创建模板文件 `app/views/welcome.php` ，代码：

```php
echo $title; // Hello World
echo $date;  // 日期
```


#### <a name="assign">assign() 赋值</a>

　　上面实例中使用了 `assign()` 方法给视图模板中赋值，传了两个参数 `assign($key, $value)` ，也可以传入一个数组；

```php
View::assign(['title' => 'Hello World', 'date' => date('Y-m-d')]);
View::display('welcome');
```

　　模板代码：

```php
echo $title; // Hello World
echo $date;  // 日期
```


#### <a name="display">display() 显示视图模板</a>

　　`display()` 方法用于调用视图模板显示；也可以调用视图同时赋值；代码：

```php
View::display('welcome', ['title' => 'Hello World', 'date' => date('Y-m-d')]); // 调用视图同时赋值
```

　　这样就可以省去 `assign()` 赋值方法；


#### <a name="load">load() 视图中加载其他视图文件</a>

　　有时需要在视图中加载其他视图文件；如公用的头尾文件等；代码：

```php
namespace App\Controllers;

use Cuber\Foundation\Controller;

class Demo extends Controller
{

    public function welcome()
    {
        $hash = [
            'menu'  => ['首页', '下载', '开发文档', '代码'],
            'title' => 'Hello World',
            'date'  => date('Y-m-d'),
        ];

        View::display('welcome', $hash); // 调用视图同时赋值
    }

}
```

　　`app/views/welcome.php` 模板代码：

```php
View::load('header');

echo $title; // Hello World
echo $date;  // 日期

// ...
```

　　`app/views/header.php` 模板代码：

```php
foreach ($menu as $value) {
    echo '<li>' . $value . '</li>';
}
```

　　`load()` 方法加载视图模板同时也可赋值；代码：

```php
View::load('header');

echo $title; // Hello World
echo $date;  // 日期

View::load('footer', ['by'=>'Cuber']); // 赋值
```

　　`display()` `load()` 方法所传的视图模板文件都是以 `.php` 为后缀；`app/views/` 目录下可以创建子级目录；代码：

`app/views/demo/welcome.php`
`app/views/global/header.php`

```php
View::display('demo/welcome');    // app/views/demo/welcome.php

View::load('global/header');      // app/views/global/header.php
```
