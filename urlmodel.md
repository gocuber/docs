# URLģʽ

- [����](#url)
- [��ͨģʽ](#default)
- [PATHINFOģʽ](#pathinfo)
- [����ģʽ](#compatible)
- [�Զ���ģʽ](#custom)

#### <a name="url">����</a>

����URLģʽ����Ҫ������δӷ���URL�а�·�ɲ��ֻ�ȡ�������õ��������Ͷ�����<br /><br />
����һ������·���URL��ʽ�������ģ�<br />
����http://localhost/index.php/������/����/<br /><br />
��������������д����ȥ��URL�е�����ļ���<br />
����http://localhost/������/����/<br />


�������URL��û������·�ɲ��֣���ôϵͳ����� Index �������� index ���� ���������ķ����ǵ�Ч�ģ�<br />

```php
http://localhost/
http://localhost/index/index/
```


#### <a name="default">��ͨģʽ</a>

������ͨģʽҲ��Ĭ��ģʽ����ͨ������������ `$_SERVER['REQUEST_URI']` �н�ȡ·�ɲ��֣�֧�־������������<br />
�����޸������ļ���<br />

```php
'url_model' => 1, // ��ͨģʽ
```

����URL��ַ��<br />

```php
http://localhost/index.php/index/index/
```

����������д����ȥ��URL�е�����ļ���URL��ַ��<br />

```php
http://localhost/index/index/
```

#### <a name="pathinfo">PATHINFOģʽ</a>

����PATHINFOģʽ����ͨ������������ `$_SERVER['PATH_INFO']` ֱ�ӻ�ȡ·�ɲ��֣���˱���ͨģʽ�Կ�һ�㣻����Ĭ�������ֻ����apache������<br />
�����޸������ļ���<br />

```php
'url_model' => 2, // PATHINFOģʽ
```

����URL���ʵ�ַ����ͨģʽһ����


#### <a name="compatible">����ģʽ</a>

��������ģʽ����ͨ��GET���ݲ����ķ�ʽ��ָ��·�ɣ�����������£���ϵͳ������֧����������ģʽ������£�����ʹ�ü���ģʽ����Ȼ��ϵͳ����֧����������ģʽ�������Ҳ����ʹ�ã�<br />
�����޸������ļ���<br />

```php
'url_model' => 3,   // ����ģʽ
'route_get' => 'r', // GET�������� Ĭ�� r
```

����URL��ַ��<br />

```php
http://localhost/index.php?r=index/index
```

������Ȼ����������д����ȥ��URL�е�����ļ���URL��ַ��<br />
����apache��д���� ����������д������ο�URL��д�½ڣ���

```php
RewriteRule ^(.*)$ ./index.php?r=$1 [L]
```
����URL���ʵ�ַ��<br />

```php
http://localhost/index/index/
```


#### <a name="custom">�Զ���ģʽ</a>

�����Զ���ģʽ������ͨ���Լ�д�ĺ�����������ȡ·�ɣ�<br />
�������룺<br />

```php
'url_model'  => 4, // �Զ���ģʽ
'route_func' => 'get_route', // ������������ Ĭ�� get_route

function get_route()
{
    return isset($_GET['r']) ? $_GET['r'] : '';
}
```
