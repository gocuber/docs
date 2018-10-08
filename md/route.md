# URL路由

- [配置](#config)
- [路由方法](#func)
    - [get() 路由设置](#get)
    - [wildcard() 全局通配符限定](#wildcard)
    - [domain() 子域名路由组](#domain)
- [闭包路由](#closure)
    - [简单闭包](#closurebase)
    - [通配符闭包](#closurewildcard)
- [控制器路由](#controller)
    - [简单控制器路由](#controllerbase)
    - [通配符控制器路由](#controllerwildcard)
- [子域名路由组](#groupdomain)
- [默认路由与全拦截路由](#defaultall)
    - [默认路由](#default)
    - [全拦截路由](#all)


#### <a name="config">#</a> 配置

　　路由配置文件 /app/routes.php


#### <a name="func">路由方法</a>

##### <a name="get">get() 路由设置</a>


　　get() 方法三个参数：<br />
　　第一个参数：访问url；<br />
　　第二个参数：路由规则，可以是一个闭包函数，也可以指定到控制器、动作；<br />
　　第三个参数：通配符限定规则；


```php

// 简单闭包
Route::get('/', function(){
	echo 'hello';
});

// 指定到控制器
Route::get('hello', 'Demo@hello');

// 通配符限定
Route::get('detail/{id}/{name}', 'Demo@detail?id={id}&name={name}', ['id' => '[0-9]+', 'name' => '[a-z]+']);

```


##### <a name="wildcard">wildcard() 全局通配符限定</a>

　　使用 wildcard() 方法定义常用的全局约束通配符；格式 key => value ，其中 key 只能由小写字母组成，value 为正则；

```php

// 使用正则来设置通配符
Route::wildcard(array(
	'id'   => '[0-9]+',
	'name' => '[a-z]+',
	'year' => '[0-9]{4}',
	'all'  => '.*',
));

// 使用全局通配符
Route::get('detail/{id}', 'Article@detail?id={id}');

// 这样并不会覆盖全局通配符 这里的 ['id' => '[0-5]+'] 只作用于本次，只在本次有效
Route::get('class/{id}', 'Class@index?id={id}', ['id' => '[0-5]+']);

// 使用全局通配符
Route::get('news/{id}', 'News@detail?id={id}');

Route::get('{all}', function(){
	// 404
});

// ...
```


##### <a name="domain">domain() 子域名路由组</a>

　　domain() 方法用来为指定的域名设置一组路由规则，这组路由规则只在当前指定的域名下有效；例如给用户中心模块指定一个子域名 ucenter.gocuber.com

```php

Route::domain('ucenter.gocuber.com', function(){
    // ...
});

```

#### <a name="closure">闭包路由</a>
##### <a name="closurebase">简单闭包</a>

```php

// 简单闭包
Route::get('/', function(){
	echo 'hello';
});

// 调用视图
Route::get('hello', function(){
	View::display('demo_welcome');
});

// 404页
Route::get('/', function(){
	View::display('page_404');
});

```

##### <a name="closurewildcard">通配符闭包</a>

```php

Route::get('detail/{id}', function($id){
	echo $id;
});

Route::get('detail/{name}', function($name='cuber'){
	echo $name;
});

Route::get('news/{class}/{id}', function($class, $id){
	echo $class;
	echo $id;
}, ['class' => 'code|guide|demo']);

Route::get('list/{class}', function($class='code'){
	echo $class;
}, ['class' => '(code|guide|demo)?']);

// 相信你已经注意到这两条路由里的class了，他们是有区别的；

['class' => 'code|guide|demo']       // class 必须是三个其中的一个
['class' => '(code|guide|demo)']     // 同上

['class' => '(code|guide|demo)?']    // class 必须是三个其中的一个，或者没有
['class' => '(|code|guide|demo)']    // 同上
['class' => '|code|guide|demo']      // 同上

```


#### <a name="#controller">控制器路由</a>


　　控制器路由格式 '访问url', '控制器@动作?参数=值&参数=值'<br />


##### <a name="#controllerbase">简单控制器路由</a>

```php
Route::get('hello', 'Demo@welcome');

// 指定GET参数
Route::get('download', 'Article@detail?code=download');

```

##### <a name="#controllerwildcard">通配符控制器路由</a>

```php

Route::get('detail/{id}', 'Article@detail?id={id}');

Route::get('article/{class}', 'Article@{class}', ['class' => 'code|guide|demo']);

Route::get('user/{code}/{id}', 'User@get?code={code}&id={id}', ['code' => '[a-z]+']);

```


#### <a name="groupdomain">子域名路由组</a>

　　domain() 方法用来为指定的域名设置一组路由规则，这组路由规则只在当前指定的域名下有效；

```php

Route::domain('ucenter.gocuber.com', function(){

	// 这里设置的一组规则只在当前域下有效

	Route::get('hello', 'Ucenter\User@info');
	Route::get('edit', 'Ucenter\User@edit');
	// ...

});

```


#### <a name="defaultall">默认路由与全拦截路由</a>

##### <a name="default">默认路由</a>
　　默认路由 '/' ；当url中没有包含任何路由信息，如首页，就会执行 '/' 指定的控制器及动作；默认值为 'Index@index'
```php
Route::get('/', 'welcome');
```

##### <a name="all">全拦截路由</a>
　　使用通配符 ['all' => '.*'] 全部拦截
```php
Route::get('{all}', function(){}, ['all' => '.*']);
```

　　如果将这行放在 routes.php 开始，将会全部拦截所有访问，如果放在结尾，将会拦截 routes.php 中配置之外的全部访问，相当于全部访问都需要配置在 routes.php 中；

```php
// 放在开始
Route::get('{all}', function(){
	echo '停服升级中..';
}, ['all' => '.*']);

// 放在结尾
Route::get('{all}', function(){
	// page_404
}, ['all' => '.*']);
```
