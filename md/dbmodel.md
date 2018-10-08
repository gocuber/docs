# 数据库模型(model)的使用

- [介绍](#text)
- [创建model](#create)
- [model的使用](#model)
- [setTableName() 设置分表](#settablename)

#### <a name="text">介绍</a>


　　Model 模型是应用程序中用于处理数据逻辑的部分；<br />
　　通常模型负责在数据库中存取数据；<br />
　　一般情况下，一个数据库表对应一个 model 类文件；<br />
<br />
　　直接实例化或使用 DB::model() 来调用model类文件；<br />



#### <a name="create">创建model</a>

　　新建 User 类继承父类 Model；<br />
<br />
　　代码如下：



```php

namespace App\Models;

use Cuber\Database\Model;

class User extends Model                  // 继承Model类
{

    protected $_key        = 'default';   // 数据库config key 默认default

    protected $_name       = 'uc_user';   // 表名称

    protected $_primarykey = 'id';        // 主键

    protected $_fields = [                // 字段
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

　　实例化或使用 DB::model() 来调用model类文件；<br />
　　代码：


```php
DB::model('User')->getFields();

DB::model('User')->get();

DB::model('User')->where()->line();

DB::model('User')->delete();

(new App\Models\User())->getFields();

// ...
```


#### <a name="settablename">setTableName() 设置分表</a>
　　可以随意扩充方法；如定义 setTableName() 方法，来实现数据库分表；代码：
```php

namespace App\Models;

use Cuber\Database\Model;

class User extends Model
{
    // ...

    public function setTableName()
    {
        $this->_name = $tablename;

        return $this;
    }
}

```
