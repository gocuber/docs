# 配置文件

- [介绍](#config)
- [app.php](#app)
- [config.ini](#ini)

#### <a name="config">介绍</a>

　　`config`是Command Line Interface的缩写，即命令行界面。Cuber框架可以运行在CLI下；例如：配置crontab定时运行任务；定时备份数据，统计数据，更新缓存等；


#### <a name="example">CLI实例</a>

　　新建控制器 app/Controllers/Cron/Demo.php
```php

namespace App\Controllers\Cron;

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

　　为CLI脚本程序单独写一个入口文件`bootstrap/cli.php`

```php
require __DIR__ . '/app.php';
```

　　入口文件 cli.php 可以存放在任意目录中，尽量放到非 web 目录；<br>
　　这时我们可以在linux或windows下打开终端，进入到入口所在目录，运行：
```php
# cd /data0/vhosts/bootstrap/
# php cli.php cron/demo/welcome
```

　　终端显示：Welcome to Cuber !


#### <a name="argv">参数处理</a>
　　cli参数处理；如：php cli.php cron/demo/welcome -name "you name" -id 10

```php
namespace App\Controllers\Cron;

use Cuber\Foundation\Controller;

class Demo extends Controller
{

    public function welcome()
	{
		echo $this->_argv['-name'];
		echo $this->_argv['-id'];
	}

}
```

　　打开终端，运行：
```php
# cd /data0/vhosts/bootstrap/
# php cli.php cron/demo/welcome -name "you name" -id 10
```

　　终端显示：
```php
you name
10
```


　　CLI参数格式：
```php
php cli.php 模块/控制器/动作 -参数 值 -参数 值
```
