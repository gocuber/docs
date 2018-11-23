# CLI 命令行

- [介绍](#cli)
- [CLI实例](#example)
- [CLI入口文件](#page)
- [参数处理](#argv)

#### <a name="cli">介绍</a>

　　`CLI` 是 `Command Line Interface` 的缩写，即命令行界面。`Cuber` 框架可以运行在 `CLI` 下；例如：配置 `crontab` 定时运行任务；定时备份数据，统计数据，更新缓存等；

#### <a name="example">CLI实例</a>

　　`cli` 模块配置 `config/app.php`

```php
'module' => [
    // ...
    'cli' => [                          // 当以CLI命令行方式运行时会自动加载 cli 模块
        'route'       => 'cli',         // 模块路由文件
        'controllers' => 'App\\Cli\\',  // 模块控制器目录 命名空间前缀
    ],
    // ...
],
```

　　新建控制器 `app/Cli/Demo.php`

```php
namespace App\Cli;

use Cuber\Foundation\Controller;

class Demo extends Controller
{
    public function welcome()
    {
        echo 'Welcome to Cuber !';
    }
}
```

#### <a name="page">CLI入口文件</a>

　　为CLI脚本程序单独写一个入口文件 `bootstrap/cli.php`

```php
require __DIR__ . '/app.php';
```

　　入口文件 `cli.php` 可以存放在任意目录中，尽量放到非 `web` 目录；这时我们可以在 `linux` 或 `windows` 下打开终端，进入到入口所在目录，运行：

```php
cd /data0/vhosts/bootstrap/
php cli.php demo/welcome
```

　　终端显示：`Welcome to Cuber !`

#### <a name="argv">参数处理</a>

　　CLI参数处理；如：`php cli.php demo/welcome -name "you name" -id 10`

```php
namespace App\Cli;

use Cuber\Foundation\Controller;
use Cuber\Support\Facades\Request;

class Demo extends Controller
{
    public function welcome()
    {
        echo Request::argv('name') . "\n";
        echo Request::argv('id') . "\n";
    }
}
```

　　终端显示：

```php
you name
10
```

　　`CLI` 参数格式：

```php
php cli.php 控制器/动作 -参数 值 -参数 值
```

<br><br><br><br><br>
