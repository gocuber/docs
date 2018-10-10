# 数据库配置与使用基础

- [配置](#config)
- [数据库连接 DB::connect()](#connect)
- [增删查改使用基础](#curd)
    - [select() 查询](#select)
    - [insert() 增加](#insert)
    - [delete() 删除](#delete)
    - [update() 修改](#update)
    - [query() 执行SQL语句](#query)
    - [exec() 执行一条SQL返回影响行数](#exec)
    - [transaction() 执行一组事务](#transaction)
- [使用原始底层PDO](#pdo)


#### <a name="config">配置</a>

　　配置文件 `config/app.php`

```php
'db' => [
    'default' => [
        'host'     => env('DB_DEFAULT_HOST', '127.0.0.1'),  // 主库
        'port'     => env('DB_DEFAULT_PORT', 3306),         // 端口
        'username' => env('DB_DEFAULT_USERNAME', ''),       // 用户名
        'password' => env('DB_DEFAULT_PASSWORD', ''),       // 密码
        'database' => env('DB_DEFAULT_DATABASE', ''),       // 数据库名
        'charset'  => 'utf8mb4',                            // 编码
        'driver'   => 'mysql',                              // 数据库类型
    ],
],
```

　　可以配置主从库来实现读写分离，其中 `slave` 是从库配置，`slave` 从库可以配置多个，从库省略的字段自动继承主库配置，如下：

```php
'db' => [
    'default' => [
        'host'     => env('DB_DEFAULT_HOST', '127.0.0.1'),
        'port'     => env('DB_DEFAULT_PORT', 3306),
        'username' => env('DB_DEFAULT_USERNAME', ''),
        'password' => env('DB_DEFAULT_PASSWORD', ''),
        'database' => env('DB_DEFAULT_DATABASE', ''),
        'charset'  => 'utf8mb4',
        'driver'   => 'mysql',
        'slave'    => [
            [
                'host' => 'slave1',    // 从库
                'port' => 3307,        // 端口 其他字段值与主库一致可省略
            ],
            [
                'host' => 'slave2',
                'port' => 3307,
            ],
            [
                'host' => 'slave3',
                'port' => 3308,
            ],
        ],
    ],
],
```

　　一般情况下，在你的应用中会有多个数据库；

```php
'db' => [
    'default' => [
        // ...
    ],
    'user' => [
        // ...
    ],
],
```


#### <a name="connect">数据库连接 DB::connect()</a>

　　使用 `Cuber\Database\DB` 类来操作数据库；使用 `DB::connect()` 连接数据库；

```php
DB::connect();        // 连接默认数据库
DB::connect('user');  // 连接用户库
```

　　如果配置了 `slave` 从库，则默认是读写分离模式，使用 `useMaster()` 方法切换到读写主库；

```php
$db = DB::connect();

$db->useMaster(); // 切换到读写主库

$db->select();
$db->select();
// ...

$db->useMaster(false); // 切换到默认读写分离模式
```


#### <a name="curd">增删查改使用基础</a>
##### <a name="select">select() 查询</a>

```php
// where status = 1
$list = DB::connect()->select("select id,name from user where status = ?", [1]);

print_r($list);
array(
    array('id'=>1, 'name'=>'name1'),
    array('id'=>2, 'name'=>'name2'),
    // ...
);
```

　　`select()` 方法返回一个数组


```php
// where id = 10
DB::connect()->select("select id,name from user where id = :id", ['id'=>10]);

$db = DB::connect();

// where status = 1 and role = 'reg'
$db->select("... status = ? and role = ?", [1, 'reg']);

// where status = 1 and role = 'reg'
$db->select("... status = :status and role = :role", ['status'=>1, 'role'=>'reg']);
```

> `sql` 中两种写法；使用问号 `?` 或冒号 `:` 两种写法不能同时使用；


##### <a name="insert">insert() 增加</a>

```php
DB::connect()->insert("insert into user (name,status) values ( ? , ? )", ['abc', 1]);
```

　　`insert()` 方法返回最后插入的自增主键id，如果当前表有主键的话；


##### <a name="delete">delete() 删除</a>

```php
DB::connect()->delete("delete from user where id = ?", [10]);
```

##### <a name="update">update() 修改</a>

```php
DB::connect()->update("update user set status = :status where name = :name", ['status'=>1, 'name'=>'abc']);
```

　　`delete()` 和 `update()` 方法返回影响行数；


##### <a name="query">query() 执行sql语句</a>

```php
$db = DB::connect();

$db->query("insert into user (name,status) values ( ? , ? )", ['abc', 1]);

$db->query("delete from user where id = :id", ['id'=>10]);

$db->query('select ...');

$db->query('update user set ...');

$db->query("drop table user");

$db->query("truncate table user");

// ...
```

　　需要注意的是 `query()` 只会执行sql语句；如果你执行了一条select语句，他不会像 `select()` 方法那样返回一个数组；如果想要使用 `query()` 得到查询结果，还需使用 `fetch()` 方法；如下：

```php
$list = [];
$query = $db->query("select id,name from user limit 10");
for(;$value = $db->fetch($query);){
    $list[] = $value;
}

print_r($list);
```

　　上面写法等同于 `$list = $db->select("select id,name from user limit 10");`


##### <a name="exec">exec() 执行一条SQL返回影响行数</a>

　　如果你能确保 `sql` 是安全的可以直接调用 `exec()` 方法

```php
$db->exec("delete from user where id=1001");
$db->exec("truncate table user");
$db->exec("create table ...");
```

　　`exec()` 只会返回影响行数，实际上就是调用了 PDO 底层的 `exec()` 方法；如果你想执行查询，并需要后续 `fetch()` 操作的话，请使用 `query()` 方法；或直接使用 `select()` 方法；


##### <a name="transaction">`transaction()` 执行一组事务</a>

```php
DB::connect()->transaction(function(){
    DB::connect()->insert("...");
    DB::connect()->insert("...");
    DB::connect()->update("...");
});
```

　　其中任意一条执行失败或抛出任何异常，则自动回滚整个事务；有时你需要更加灵活的控制事务 `beginTransaction()` 开始一个事务 `commit()` 提交事务 `rollBack()` 回滚事务，参考后面的数据库事务处理章节；


#### <a name="pdo">使用原始底层PDO</a>

　　可以使用原始底层 `PDO` 来操作数据库；

```php
DB::connect()->getMaster(); // 返回原始底层PDO主库实例
DB::connect()->getSlave();  // 返回原始底层PDO从库实例
```
