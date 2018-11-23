# URL重写

- [Apache Rewrite规则](#apache)
- [Nginx Rewrite规则](#nginx)
- [SAE Rewrite规则](#sae)

　　默认情况下，我们访问的 `URL` 中包含 `index.php` 入口文件，为了搜索引擎更加友好，我们可以借助于 `Rewrite` 规则来隐藏 `index.php` ；

#### <a name="apache">Apache Rewrite规则</a>

　　`Apache` 的 `Rewrite` 规则，可以修改 `Apache` 配置文件 `httpd.conf` ，或新建 `.htaccess` 文件放到入口文件的同级目录下；

```php
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^(.*)$ ./index.php/$1 [L]
```

#### <a name="nginx">Nginx Rewrite规则</a>

　　`Nginx` 的 `Rewrite` 规则，`Nginx` 配置文件 `nginx.conf`；

```php
location / {
    try_files $uri $uri/ /index.php?$query_string;
}
```

　　或者

```php
location / {
    if (!-e $request_filename) {
        rewrite ^/(.*) /index.php/$1 last;
    }
}
```


#### <a name="sae">SAE Rewrite规则</a>

　　`SAE` 的 `Rewrite` 规则，配置文件 `config.yaml`；

```php
name: appname
version: 1
handle:

- rewrite: if ( !is_dir() && !is_file() ) goto "/index.php/$1"
```

　　好了，接下来我们可以访问URL：<br />
　　http://localhost/demo/welcome/<br />
　　URL重写之前的：<br />
　　http://localhost/index.php/demo/welcome/

