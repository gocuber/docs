# 数据库查询结构器

- [查询](#select)
    - [name() 指定表名](#name)
    - [get() 查询多条记录](#get)
    - [hash() 查询多条记录](#hash)
    - [line() 查询单条记录](#line)
    - [val() 查询一个字段](#val)
    - [count() 总数 max() 最大 min() 最小 avg() 平均 sum() 求和](#count)
    - [where() 查询条件](#where)
    - [andWhere() 追加条件](#andwhere)
    - [orWhere() 追加条件](#orwhere)
    - [groupBy() 分组](#groupby)
    - [having() 子句](#having)
    - [orderBy() 排序](#orderby)
    - [offset() 与 limit() limit语句](#limit)
    - [page() 分页](#page)
    - [innerJoin() 联表查询](#innerjoin)
    - [leftJoin() 联表查询](#leftjoin)
    - [rightJoin() 联表查询](#rightjoin)
    - [field() 查询字段](#field)
    - [query() 执行查询](#query)
- [增加](#insert)
- [删除](#delete)
- [修改](#update)


#### <a name="select">查询</a>

##### <a name="name">name() 指定表名</a>
　　使用 name() 方法指定数据库表名称；

```php
DB::connect()->name('user');

DB::connect()->name('article');
```


##### <a name="get">get() 查询多条记录</a>
```php

// select id,name from user

$list = DB::connect()->name('user')->get('id,name');
print_r($list);

array(
	array('id'=>1,'name'=>'name1'),
	array('id'=>2,'name'=>'name2'),
	// ..
);
```

　　get() 方法与 select() 方法返回的结果一样；如下，返回的结果 $list 是一样的；

```php
$list = DB::connect()->select("select id,name from user");
print_r($list);

array(
	array('id'=>1,'name'=>'name1'),
	array('id'=>2,'name'=>'name2'),
	// ..
);
```


##### <a name="hash">hash() 查询多条记录</a>

　　有时候你需要以某字段做为key返回；

```php
$list = DB::connect()->name('user')->hash('id','name,date');
print_r($list);

array(
	'1' => array('name'=>'name1','date'=>'2010-10-10'),
	'2' => array('name'=>'name2','date'=>'2010-10-11'),
	// ..
);

//或者直接返回一个 key value 格式的hash数组
$list = DB::connect()->name('user')->hash('id','name');
print_r($list);

array(
	'1' => 'name1',
	'2' => 'name2',
	// ..
);
```

##### <a name="line">line() 查询单条记录</a>
```php

// select id,name from user limit 1

$line = DB::connect()->name('user')->line('id,name');
print_r($line);

array('id'=>1,'name'=>'name1');
```


##### <a name="val">val() 查询一个字段</a>
```php

// select name from user limit 1

$val = DB::connect()->name('user')->val('name');

echo $val; //name1
```


##### <a name="count">count() 总数 max() 最大 min() 最小 avg() 平均 sum() 求和</a>
```php

// count() 总数
$val = DB::connect()->name('user')->count();
// 或
$val = DB::connect()->name('user')->val('count(*)');

// max() 最大
$val = DB::connect()->name('user')->max('id');
// 或
$val = DB::connect()->name('user')->val('max(id)');

// min() 最小
$val = DB::connect()->name('user')->min('id');
// 或
$val = DB::connect()->name('user')->val('min(id)');

// avg() 平均
$val = DB::connect()->name('user')->avg('id');
// 或
$val = DB::connect()->name('user')->val('avg(id)');

// sum() 求和
$val = DB::connect()->name('user')->sum('price');
// 或
$val = DB::connect()->name('user')->val('sum(price)');

```


##### <a name="where">where() where条件</a>

　　where() 方法三种调用格式；如下：

　　一、字符串格式：
```php

	// where id = 1 and status = 1
	$db->where("id = 1 and status = 1");

```

　　二、hash格式与数组格式：
```php

	// hash格式 [ key=>value, key=>value, ... ]

	// where id = 1
	$db->where([ 'id'=>1 ]);

	// where id in (1,2)
	$db->where([ 'id'=>[1,2] ]);

	// where id in (1,2) and status = 1
	$db->where([ 'id'=>[1,2], 'status'=>1 ]);


	// 数组格式 [ [], [], ... ]

	// where id = 1
	$db->where([ ['id','=',1] ]);

	// where id > 1
	$db->where([ ['id','>',1] ]);

	// where id = 1
	$db->where([ ['id',1] ]); // " = " 可以省略

	// where id in (1,2)
	$db->where([ ['id','in',[1,2]] ]);

	// where id > 1 and status = 1
	$db->where([ ['id','>',1], ['status',1] ]);

	// where id > 1 and status = 1
	$db->where([ ['id','>',1], ['status'=>1] ]); // 可以写成 key=>value 格式

	// where id > 1 and status = 1
	$db->where([ ['id','>',1], 'status'=>1 ]);   // 又一个 key=>value 格式 KV格式可省略[]

```


　　三、组合嵌套格式：[ 'and|or', [], [] ... ]<br>
　　'and|or' 可省略，省略默认为 and，如果省略'and|or'实际上就是上面第二种格式；<br>
　　同样的上面第二种格式 加上 'and|or' 就是组合嵌套格式；<br>

```php

	// 格式 [ 'and|or', [], [] ... ]

	$db->where([ 'and', 'id'=>1, 'status'=>1 ]); // id=1 and status=1
	$db->where([ 'and', ['id','=',1], ['status','=',1] ]); // id=1 and status=1

	$db->where([ 'and', ['id',1], ['status',1] ]); // id=1 and status=1
	$db->where([ 'and', 'id'=>[1,2,3], 'status'=>1 ]); // id in (1,2,3) and status=1
	
	$db->where([ 'or', 'id'=>1, ['status','>',1] ]); // id=1 or status>1

	// 嵌套

	// where (id = 1 or status = 1) and (a = 1 or b = 1)
	$db->where([ 'and', ['or','id'=>1,'status'=>1], ['or','a'=>1,'b'=>1] ]);

	// where id>1 and (status=1 or name='name1')
	$db->where(['and', ['id','>',1], ['or','status'=>1,'name'=>'name1']]);

```


	　　相信你已经发现以上三种格式可以总结为一种：[ 'and|or', 表达式1, 表达式2 ... ]<br>
	　　'and|or' 可省略，省略默认为 and；<br>
	　　表达式可以是 字符串 或 key=>value 或 数组 []；<br>

```php

	// where a in (1,2) or b = 1
	$db->where([ 'or', ['a'=>[1,2]], ['b'=>1] ]); // key=>value

	// where a in (1,2) or b = 1
	$db->where([ 'or', 'a'=>[1,2], 'b'=>1 ]); // key=>value 可以省略 []
	
	// where a = 1 or b = 1
	$db->where([ 'or', ['a','=',1], ['b','=',1] ]); // 数组 []

	// where a = 1 or b = 1
	$db->where([ 'or', ['a',1], ['b',1] ]); // " = " 可以省略


	// 最后使用 get() line() val() 返回结果
	$line = $db->name('user')->where([ 'id'=>1, 'status'=>1 ])->line();
	print_r($line);

```

　　需要注意的是直接传字符串的时候不会对字符进行转义；除非你能确保你的sql是安全的；


##### <a name="andwhere">andWhere() 追加条件</a>
```php

	// where id = 1 and status = 1
	$db->where([ 'id'=>1 ])->andWhere([ 'status'=>1 ]);

	// where id = 1 and status = 1 and name = 'abc' and username = 'user1'
	$db->where([ 'id'=>1, 'status'=>1 ])
		->andWhere([ 'name'=>'abc' ])
		->andWhere([ 'username'=>'user1' ]);

```


##### <a name="orwhere">orWhere() 追加条件</a>
```php

	// where id = 1 or status = 1
	$db->where([ 'id'=>1 ])->orWhere([ 'status'=>1 ]);

	// where check = 1 or status = 1
	$db->where([ 'check'=>1 ])->orWhere([ 'status'=>1 ]);

```

　　where() andWhere() orWhere() 三个方法的参数是一样的；

##### <a name="groupby">groupBy() 分组</a>
```php
// group by cid
DB::connect()->name('user')->groupBy('cid')->get();

// group by cid,pid
DB::connect()->name('user')->groupBy('cid,pid')->get();
```


##### <a name="having">having() 子句</a>
```php
// group by cid having sum(price) > 1000
DB::connect()->name('user')->groupBy('cid')->having('sum(price) > 1000')->get();
```


##### <a name="orderby">orderBy() 排序</a>
```php
// order by id desc
DB::connect()->name('user')->orderBy('id desc')->get();

// order by status desc,id desc
DB::connect()->name('user')->orderBy('status desc,id desc')->get();
```

##### <a name="limit">offset() 与 limit() limit语句</a>
```php
DB::connect()->name('user')->limit(10)->get();                // limit 10
DB::connect()->name('user')->offset(20)->limit(10)->get();    // limit 20,10
```

##### <a name="page">page() 分页</a>
```php
// 查询第一页数据 每页20条
DB::connect()->name('user')->page(1, 20)->get();    // limit 0,20

// 查询第二页数据 每页20条
DB::connect()->name('user')->page(2, 20)->get();    // limit 20,20
```


##### <a name="innerjoin">innerJoin() 联表查询</a>
```php
// ... from user inner join group on user.gid = group.gid
DB::connect()->name('user')->innerJoin('group', 'user.gid = group.gid')->get();

// 多表 join
DB::connect()->name('user')
	->innerJoin('article', 'user.uid = article.uid')
	->innerJoin('class', 'user.uid = class.uid')->get();

```


##### <a name="leftjoin">leftJoin() 联表查询</a>
```php
// ... from user left join group on user.gid = group.gid
DB::connect()->name('user')->leftJoin('group', 'user.gid = group.gid')->get();
```


##### <a name="rightjoin">rightJoin() 联表查询</a>
```php
// ... from user right join group on user.gid = group.gid
DB::connect()->name('user')->rightJoin('group', 'user.gid = group.gid')->get();
```


##### <a name="field">field() 查询字段</a>
```php
// select id,name from user
DB::connect()->name('user')->field('id,name')->get();
```


##### <a name="query">query() 执行sql查询</a>

　　当需要处理大数据的时候，像 get() select() 这样的方法就不太合适了，因为它们会把所有数据都读取到内存上。为了保持较低的内存消耗，使用 query() fetch()<br />　　用法如下：

```php
$db = DB::connect();
$query = $db->name('user')->field('id,name')->where([ 'status'=>1 ])->query();
for (; $value = $db->fetch($query); ) {
    // ...
}
```

　　query() 只会执行查询sql语句；并不会返回查询结果；如果想要得到查询结果，还需使用 fetch() 方法；


#### <a name="insert">增加</a>
　　使用 `insert()` 方法增加一条记录；与之前使用基础里介绍的使用方法略有不同；其实就是两种不同的使用方法；可以直接传sql语句；也可以传一个 key=>value 字段对值 的数组；如下：
```php
// 直接写sql
$db->insert("insert into user (name,status) values ( ? , ? )", [ 'abc',1 ]);

// 或者传一个数组
$db->name('user')->insert([ 'name'=>'abc', 'status'=>1 ]);

```
　　insert() 方法返回最后插入的自增主键id，如果当前表有主键的话；如果想要插入一条空记录，返回最后 lastid 可以直接传一个空数组 insert([]) 如下：

```php
$lastid = $db->name('user')->insert([]);
```


#### <a name="delete">删除</a>
　　同样的也是两种用法
```php

$db->delete("delete from user where id= :id ", [ 'id'=>10 ]);

$db->name('user')->where([ 'id'=>10 ])->delete();
$db->name('user')->where([ 'id'=>10 ])->limit(1)->delete();

```


#### <a name="update">修改</a>
```php

$db->update("update user set status= ? where name= ? ", [ 1,'abc' ]);

$db->name('user')->where([ 'name'=>'abc' ])->update([ 'status'=>1 ]);

```

　　delete() 和 update() 方法返回影响行数；


