# 快速开始

#### Hello Cuber

```php
Route::get('/', function () {
    echo 'Hello Cuber';
});
```

#### 调用视图模板

```php
Route::get('/', function () {
    view('index', ['name'=>'Cuber']);
});
```

`app/views/index.php`
```php
Hello <?php echo $name;?>
```

#### 控制器

```php
Route::get('/', 'Index@index');
```

`app/Controllers/Index.php`
```php
namespace App\Controllers;

use Cuber\Foundation\Controller;

class Index extends Controller
{

    public function index()
    {
        echo 'Hello Cuber';
    }

}
```

#### 查询数据库

```php
namespace App\Controllers;

use Cuber\Foundation\Controller;
use Cuber\Support\Facades\DB;

class Index extends Controller
{

    public function index()
    {
        $user = DB::name('user')->where(['status'=>1])->get();

        view('index', ['user'=>$user]);
    }

}
```

`app/views/index.php`
```php
<?php
if (!empty($user)) {
    foreach ($user as $value) {
        print_r($value);
    }
}
?>
```
