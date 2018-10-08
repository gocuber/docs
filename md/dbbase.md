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

　　配置文件 config.php

```php

	// 默认数据库配置
	$_G['db']['default'] = array(
		'host'     => '192.168.0.1',         // 主库
		'port'     => 3306,                  // 端口
		'username' => 'root',                // 用户名
		'password' => '',                    // 密码
		'database' => 'db_cuber',            // 数据库名
		'charset'  => 'utf8',                // 编码
		'driver'   => 'mysql',               // 数据库类型
		'slave'    => array(                 // 从库
			'host'  => '192.168.0.2',
			'port'  => 3306,
		),
	);

```

　　可以配置主从库来实现读写分离，其中 slave 是从库配置，slave 从库可以配置多个，如下：

```php

	// 默认数据库配置
	$_G['db']['default'] = array(
		'host'     => '192.168.0.1',
		'port'     => 3306,
		'username' => 'root',
		'password' => '***',
		'database' => 'db_cube',
		'charset'  => 'utf8',
		'driver'   => 'mysql',
		'slave'    => array(
			array('host' => 'slave1', 'port' => 3306),    // slave1
			array('host' => 'slave2', 'port' => 3306),    // slave2 slave3 slave4 ...
		),
	);

```

　　一般情况下，在你的应用中会有多个数据库；

```php

	// user用户库
	$_G['db']['user'] = array(
		// ...
	);

	// stat统计库
	$_G['db']['stat'] = array(
		// ...
	);

```


#### <a name="connect">数据库连接 DB::connect()</a>

　　使用 DB 类来操作数据库；使用 DB::connect() 连接数据库；

```php

	DB::connect();        // 连接默认数据库
	DB::connect('user');  // 连接用户库
	DB::connect('stat');  // 连接统计库

```

　　如果配置了 slave 从库，则默认是读写分离模式，使用 useMaster() 方法切换到读写主库；

```php

	// 切换到读写主库
	$db = DB::connect()->useMaster();

	$db->select();
	$db->select();
	// ...

	$db->useMaster(false); // 切换到默认读写分离模式

```


#### <a name="curd">增删查改使用基础</a>
##### <a name="select">select() 查询</a>

```php

	// where status = 1
	$list = DB::connect()->select("select id,name from user where status = ? ", [ 1 ]);

	print_r($list);

	array(
		array('id'=>1, 'name'=>'name1'),
		array('id'=>2, 'name'=>'name2'),
		// ...
	);

```

　　select()方法返回一个数组


```php

	// where id = 10
	DB::connect()->select("select id,name from user where id = :id ", [ 'id'=>10 ]);


	$db = DB::connect();

	// where status = 1 and role = 'reg'
	$db->select("... status = ? and role = ? ", [ 1,'reg' ]);

	// where status = 1 and role = 'reg'
	$db->select("... status = :status and role = :role ", [ 'status'=>1, 'role'=>'reg' ]);

```

　　sql中两种写法；使用问号 ? 或冒号 : 两种写法不能同时使用；


##### <a name="insert">insert() 增加</a>

```php

	DB::connect()->insert("insert into user (name,status) values ( ? , ? )", [ 'abc', 1 ]);

```

　　insert()方法返回最后插入的自增主键id，如果当前表有主键的话；



##### <a name="delete">delete() 删除</a>

```php

	DB::connect()->delete("delete from user where id = ?", [ 10 ]);

```

##### <a name="update">update() 修改</a>

```php

	DB::connect()->update("update user set status = :status where name = :name ", [ 'status'=>1, 'name'=>'abc' ]);

```

　　delete() 和 update() 方法返回影响行数；


##### <a name="query">query() 执行sql语句</a>

```php

	$db = DB::connect();
	
	$db->query("insert into user (name,status) values ( ? , ? )", [ 'abc', 1 ]);

	$db->query("delete from user where id = :id ", [ 'id'=>10 ]);

	$db->query('select ...');

	$db->query('update user set ...');

	$db->query("drop table user");

	$db->query("truncate table user");

	// ...

```

　　需要注意的是 query() 只会执行sql语句；如果你执行了一条select语句，他不会像 select() 方法那样返回一个数组；如果想要使用 query() 得到查询结果，还需使用 fetch() 方法；如下：

```php

	$list = array();
	$query = $db->query("select id,name from user limit 10");
	for(;$value = $db->fetch($query);){
		$list[] = $value;
	}

	print_r($list);

	// 上面写法等同于 $db->select("select id,name from user limit 10");

```

　　以上代码跟下面返回的结果 $list 是一样的；

```php
	$list = $db->select("select id,name from user limit 10");
	print_r($list);
```


##### <a name="exec">exec() 执行一条SQL返回影响行数</a>

　　如果你能确保sql是安全的可以直接调用 exec() 方法

```php
	$db->exec("delete from user where id=1001");
	$db->exec("truncate table user");
	$db->exec("create table ...");
```

　　exec() 只会返回影响行数，实际上就是调用了 PDO 底层的 exec() 方法；如果你想执行查询，并需要后续 fetch() 操作的话，请使用 query() 方法；或直接使用 select() 方法；



##### <a name="transaction">transaction() 执行一组事务</a>

```php

	DB::connect()->transaction(function(){
		DB::connect()->insert("...");
		DB::connect()->insert("...");
		DB::connect()->update("...");
	});

```
　　其中任意一条执行失败或抛出任何异常，则自动回滚整个事务；有时你需要更加灵活的控制事务 beginTransaction() 开始一个事务 commit() 提交事务 rollBack() 回滚事务，参考后面的数据库事务处理章节；


#### <a name="pdo">使用原始底层PDO</a>
　　可以使用原始底层PDO来操作数据库；

```php

	DB::connect()->getMaster(); // 返回原始底层PDO主库实例
	DB::connect()->getSlave();  // 返回原始底层PDO从库实例

```

