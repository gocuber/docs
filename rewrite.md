# URL重写

- [Apache Rewrite规则](#apache)
- [Nginx Rewrite规则](#nginx)
- [SAE Rewrite规则](#sae)

　　默认情况下，我们访问的URL中包含index.php入口文件，为了搜索引擎更加友好，我们可以借助于Rewrite规则来隐藏index.php；

#### <a name="apache">Apache Rewrite规则</a>

　　Apache的Rewrite规则，可以修改Apache配置文件httpd.conf，或新建.htaccess文件放到入口文件的同级目录下；

```shell
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^(.*)$ ./index.php/$1 [L]
```

#### <a name="nginx">Nginx Rewrite规则</a>

　　Nginx的Rewrite规则，Nginx配置文件nginx.conf；

```shell
if (!-e $request_filename) {
	rewrite ^/(.*) /index.php/$1 last;
}
```


#### <a name="sae">SAE Rewrite规则</a>

　　SAE的Rewrite规则，配置文件config.yaml；

```shell
name: appname
version: 1
handle:

- rewrite: if ( !is_dir() && !is_file() ) goto "/index.php/$1"
```

　　好了，接下来我们可以访问URL：<br />
　　http://localhost/demo/welcome/<br />
　　URL重写之前的：<br />
　　http://localhost/index.php/demo/welcome/
