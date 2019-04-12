# SESSION使用

- [介绍](#session)
- [Session配置](#config)
- [Session使用](#use)
    - [set() 设置Session](#set)
    - [delete() 删除Session](#delete)
    - [get() 获取Session](#get)
    - [id() Session ID](#id)
    - [regenerate() 重新生成 Session ID](#regenerate)
    - [辅助函数 session()](#helper)
- [添加自定义Session驱动](#driver)
    - [实现驱动](#interface)
    - [注册驱动](#register)

#### <a name="session">介绍</a>

　　`Cuber` 并没有使用 `PHP` 内置的 `Session` 功能，而是自己实现了一套更加灵活更加强大的 `Session` 机制，核心逻辑请参考 `Cuber\Session\SessionManager`，因此在应用中不要试图通过 `$_SESSION` 方式去获取应用的 `Session` 值，这是徒劳的。

　　一般情况下，`Session` 在整个请求生命周期开始和结束会自动读取 `read()` 和写入 `write()` 存储一次。不要试图多次 `write()` 写入存储。

#### <a name="config">Session配置</a>

　　`Session` 默认存储在 `file` 文件驱动中，也可以配置使用 `Redis` 或使用 `Memcache` 缓存驱动来存储 `Session`。

　　`Cuber` 可配置的驱动：

- `file` - `Session` 数据存储在 `storage/sessions/` 目录下。
- `cookie` - `Session` 数据存储在 `Cookie` 中。
- `mysql` - `Session` 数据存储在 `MySQL` 数据库中。
- `memcache` - `Session` 数据存储在 `Memcache` 缓存中。
- `redis` - `Session` 数据存储在 `Redis` 缓存中。

　　`config/app.php`

```php
// session配置
'session' => [
    'driver'  => env('SESSION_DRIVER', 'file'),  // 默认使用文件存储 session 也可以设置为 redis 或 memcache
    'connect' => 'session',                      // connent filecache key
    'prefix'  => '',
    'cookie'  => null,                           // session_id cookie key
    'time'    => null,
],

// FileCache配置
'filecache' => [
    'session' => [
        'dir'       => base_path() . 'storage/session/',  // session 文件目录
        'is_subdir' => 1,
    ],
],
```

#### <a name="use">Session使用</a>

　　`Cuber` 使用 `Cuber\Support\Facades\Session` 类来操作 `Session`

```php
use Cuber\Support\Facades\Session;
```

##### <a name="set">set() 设置 Session</a>
```php
Session::set('name', 'Cuber');
Session::set('city', 'bj');

Session::get('name'); // Cuber
```

> 请求生命周期结束会自动写入存储，你也可以手动执行 `write()` 立即写入存储。

```php
Session::set('name', 'Cuber');
Session::set('city', 'bj');
Session::write();

// 或
Session::set('name', 'Cuber')->set('city', 'bj')->write();
```

##### <a name="delete">delete() 删除 Session</a>
```php
Session::delete('name');           // 删除name
Session::delete();                 // 删除全部
```

> 请求生命周期结束会自动写入存储，你也可以手动执行 `write()` 立即写入存储。

```php
Session::delete('name')->write();  // 删除并立即写入存储
```

##### <a name="get">get() 获取 Session</a>
```php
Session::get('name');  // 获取name
Session::get();        // 获取全部

Request::session('name'); // 使用请求获取 session
```

##### <a name="id">id() Session ID</a>

　　`id()` 方法只会用在客户端不支持 `Cookie` 的情况下，或在同一端下登录不同账号的情况。

```php
$id = request('sid');
Session::id($id)->get('name');
```

　　同一个请求生命周期下处理多个 `Session ID`

```php
$sid1 = 'sid1';
$sid2 = 'sid2';

Session::id($sid1)->set('name', 's1')->set('status', 1)->write();
Session::id($sid2)->set('name', 's2')->set('status', 1)->write();

Session::id($sid1)->get(); // ['name' => 's1', 'status' => 1]
Session::id($sid2)->get(); // ['name' => 's2', 'status' => 1]
```

> 只有在同一个请求生命周期下处理多个 `Session ID` 的时候才需要手动调用 `write()` 方法，否则在一般情况下请求生命周期结束会自动写入存储。

　　使用 `createId()` 方法创建一个 `Session ID`

```php
Session::createId(); // a6f5c4bb404972d5a7afaad1d5d9f878
```

##### <a name="regenerate">regenerate() 重新生成 Session ID</a>

　　手动重新生成 `Session ID` 用于阻止 `session fixation` 攻击

```php
Session::regenerate();
```

##### <a name="helper">辅助函数 session()</a>

```php
session()->set();
session()->delete()->write();
session()->id()->get();
session()->createId();

session('name');        // 使用辅助函数获取 name
session('name', 'GO');  // 使用辅助函数获取 指定默认值
```

#### <a name="driver">添加自定义Session驱动</a>

##### <a name="interface">实现驱动</a>

　　自定义 `Session` 驱动需要实现 `SessionHandlerInterface` 接口，比如一个基于 `MongoDB` 的 `Session` 驱动实现如下：

```php
namespace App\Extensions;

use SessionHandlerInterface;

class MongoSessionHandler implements SessionHandlerInterface
{
    public function open($save_path, $session_name) {}
    public function close() {}
    public function read($session_id) {}
    public function write($session_id, $session_data) {}
    public function destroy($session_id) {}
    public function gc($maxlifetime) {}
}
```

> 注：你可以将扩展放置在任何地方，这里我们统一创建一个 `Extensions` 目录用于存放 `MongoSessionHandler`。

　　对于大多数 `Session` 驱动而言，我们只需要实现 `read` `write` `destroy` 三个方法。

##### <a name="register">注册驱动</a>

　　`Session` 驱动实现后，需要将其注册到框架。我们在服务提供者 `App\Providers\AppServiceProvider` 的 `register` 方法中注册。

　　也可以重新创建一个新的服务提供者 `App\Providers\SessionServiceProvider`

```php
namespace App\Providers;

class SessionServiceProvider
{

    /**
     * 注册应用服务
     *
     * @return void
     */
    public function register()
    {

        // 注册 session 驱动 注意前缀必须 session.
        app()->singleton('session.mongo', function () {
            return new \App\Extensions\MongoSessionHandler();
        });

    }

}
```

　　修改配置 `config/app.php`

```php
// session配置
'session' => [
    'driver'  => env('SESSION_DRIVER', 'mongo'),
    'connect' => 'session',                      // connent MongoDB key
],

// providers
'providers' => [
    // ...
    App\Providers\AppServiceProvider::class,
    App\Providers\SessionServiceProvider::class,
],
```

<br><br><br><br><br>
