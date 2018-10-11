# URL模式

- [介绍](#url)
- [普通模式](#default)
- [PATHINFO模式](#pathinfo)
- [兼容模式](#compatible)
- [自定义模式](#custom)

#### <a name="url">介绍</a>

　　URL模式，主要介绍如何从访问URL中把路由部分获取出来；得到控制器和动作；<br /><br />
　　一般情况下访问URL格式是这样的：<br />
　　http://localhost/index.php/控制器/动作/<br /><br />
　　可以配置重写规则去掉URL中的入口文件：<br />
　　http://localhost/控制器/动作/<br /><br />


　　如果URL中没有输入路由部分，那么系统会访问 `Index` 控制器和 `index` 动作 ；因此下面的访问是等效的：<br />

```php
http://localhost/
http://localhost/index/index/
```


#### <a name="default">普通模式</a>

　　普通模式也是默认模式，是通过服务器变量 `$_SERVER['REQUEST_URI']` 中截取路由部分；支持绝大多数环境；<br />
　　修改配置文件：<br />

```php
'url_model' => 1, // 普通模式
```

　　URL地址：<br />

```php
http://localhost/index.php/index/index/
```

　　配置重写规则去掉URL中的入口文件，URL地址：<br />

```php
http://localhost/index/index/
```

#### <a name="pathinfo">PATHINFO模式</a>

　　PATHINFO模式，是通过服务器变量 `$_SERVER['PATH_INFO']` 直接获取路由部分，因此比普通模式稍快一点；但是默认情况下只兼容 `Apache` 环境；<br />
　　修改配置文件：<br />

```php
'url_model' => 2, // PATHINFO模式
```

　　URL访问地址与普通模式一样；


#### <a name="compatible">兼容模式</a>

　　兼容模式，是通过GET传递参数的方式来指定路由；极特殊情况下，当系统环境不支持以上两种模式的情况下，可以使用兼容模式；当然，系统环境支持以上两种模式的情况下也可以使用；<br />
　　修改配置文件：<br />

```php
'url_model' => 3,   // 兼容模式
'route_get' => 'r', // GET参数名称 默认 r
```

　　URL地址：<br />

```php
http://localhost/index.php?r=index/index
```

　　当然可以配置重写规则去掉URL中的入口文件，URL地址：<br />
　　`Apache` 重写规则 （完整的重写规则请参考 [URL重写](https://github.com/gocuber/guide/blob/master/md/rewrite.md) 章节）：

```php
RewriteRule ^(.*)$ ./index.php?r=$1 [L]
```
　　URL访问地址：<br />

```php
http://localhost/index/index/
```


#### <a name="custom">自定义模式</a>

　　自定义模式，就是通过自己写的函数方法来获取路由；<br />
　　代码：<br />

```php
'url_model'  => 4,           // 自定义模式
'route_func' => 'get_route', // 函数方法名称 默认 get_route

function get_route()
{
    return isset($_GET['r']) ? $_GET['r'] : '';
}
```

