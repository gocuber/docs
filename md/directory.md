# 目录结构

- [目录结构](#directory)
- [目录说明](#explain)
    - [app](#app)
    - [bootstrap](#bootstrap)
    - [config](#config)
    - [public](#public)
    - [route](#route)
    - [storage](#storage)
    - [vendor](#vendor)

#### <a name="directory">目录结构</a>

目录|说明
:--------|:--------
app|应用目录
-- Controllers|控制器目录
-- Libs|类目录
-- Models|Model目录
-- views|视图目录
bootstrap|用于框架的启动和自动载入配置
config|目录包含了应用所有的配置文件
public|目录包含了应用入口文件 index.php 和前端资源文件（图片、JavaScript、CSS等）<br>该目录也是 Apache 或 Nginx 等 Web 服务器所指向的应用根目录
route|目录包含了应用定义的所有路由
storage|缓存文件、临时文件、Log日志等
vendor|目录包含了应用所有通过 Composer 加载的依赖

#### <a name="explain">目录说明</a>

##### <a name="app">app</a>

　　应用的核心代码位于 `app` 目录下，默认情况下，该目录位于命名空间 `App` 下，并且被 `Composer` 通过 [PSR-4 自动载入标准](https://www.php-fig.org/psr/psr-4/) 自动加载。<br>
　　`app` 目录下可自定义创建多级目录以及子目录，`Models`、`Libs` 或 `Model`、`Lib`等可自定义创建。

##### <a name="bootstrap">bootstrap</a>

　　用于框架的启动和自动载入配置。

##### <a name="config">config</a>

　　目录包含了应用所有的配置文件。

##### <a name="public">public</a>

　　目录包含了应用入口文件 `index.php` 和前端资源文件（图片、JavaScript、CSS等），该目录也是 Apache 或 Nginx 等 Web 服务器所指向的应用根目录。

##### <a name="route">route</a>

　　目录包含了应用定义的所有路由。

##### <a name="storage">storage</a>

　　缓存文件、临时文件、Log日志等。

##### <a name="vendor">vendor</a>

　　目录包含了应用所有通过 `Composer` 加载的依赖。
