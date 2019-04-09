# 数据库模型(model)的使用

- [介绍](#text)
- [创建model](#create)
- [model的使用](#model)
- [setTableName() 设置分表](#settablename)

#### <a name="text">介绍</a>


　　`Model` 模型是应用程序中用于处理数据逻辑的部分；通常 `Model` 模型负责在数据库中存取数据；一般情况下，一个数据库表对应一个 `Model` 类文件；<br />


#### <a name="create">创建model</a>

　　新建 `app/Models/User.php` 类继承父类 `Cuber\Database\Model`

```php
namespace App\Models;

use Cuber\Database\Model;

class User extends Model              // 继承Model类
{

    protected $connect = 'default';   // 数据库连接 默认default

    protected $name = 'uc_user';      // 表名称

    protected $fields = [             // 字段
        'id',            // 用户id
        'username',      // 账号
        'password',      // 密码
        'status',        // 状态
        'mobile',        // 手机
        'email',         // email
        'name',          // 姓名
        'createtime',    // 创建时间
        'updatetime',    // 更新时间
    ];

}
```

#### <a name="model">model的使用</a>

　　可以直接使用查询结构器的所有方法；

```php
use App\Models\User;

User::limit(5)->get();

User::where(['id'=>1])->line();

User::where(['id'=>1])->delete();

// ...
```


#### <a name="settablename">setTableName() 设置分表</a>

　　可以随意扩充方法；如定义 `setTableName()` 方法，来实现数据库分表；代码：

```php
namespace App\Models;

use Cuber\Database\Model;

class User extends Model
{
    // ...

    public function setTableName()
    {
        $this->name = '';

        return $this;
    }
}
```
