# URL��д

- [# Apache Rewrite����](#apache)
- [# Nginx Rewrite����](#nginx)
- [# SAE Rewrite����](#sae)

����Ĭ������£����Ƿ��ʵ�URL�а���index.php����ļ���Ϊ��������������Ѻã����ǿ��Խ�����Rewrite����������index.php��


#### <a name="apache">#</a> Apache Rewrite����

����Apache��Rewrite���򣬿����޸�Apache�����ļ�httpd.conf�����½�.htaccess�ļ��ŵ�����ļ���ͬ��Ŀ¼�£�

```shell
	RewriteEngine on
	RewriteCond %{REQUEST_FILENAME} !-d
	RewriteCond %{REQUEST_FILENAME} !-f
	RewriteRule ^(.*)$ ./index.php/$1 [L]
```


#### <a name="nginx">#</a> Nginx Rewrite����
����Nginx��Rewrite����Nginx�����ļ�nginx.conf��

```shell
	if (!-e $request_filename) {
		rewrite ^/(.*) /index.php/$1 last;
	}
```


#### <a name="sae">#</a> SAE Rewrite����
����SAE��Rewrite���������ļ�config.yaml��

```shell
	name: appname
	version: 1
	handle:

	- rewrite: if ( !is_dir() && !is_file() ) goto "/index.php/$1"
```


���ˣ����������ǿ��Է���URL��<br />
http://localhost/demo/welcome/<br />
URL��д֮ǰ�ģ�<br />
http://localhost/index.php/demo/welcome/
