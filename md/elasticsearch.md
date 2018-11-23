# 使用Elasticsearch

#### 安装

　　`composer.json`

```php
"require": {
    "elasticsearch/elasticsearch": "~6.0"
}
```

　　或者

```php
composer require elasticsearch/elasticsearch
```

#### 实例

```php
use Elasticsearch\ClientBuilder;

// 实例化一个客户端对象
$client = ClientBuilder::create()->build();
```

[Elasticsearch 权威指南中文](https://www.elastic.co/guide/cn/elasticsearch/guide/current/index.html)<br>
[Elasticsearch-PHP 开发文档中文](https://www.elastic.co/guide/cn/elasticsearch/php/current/index.html)<br>
[Elasticsearch-PHP 快速开始中文](https://www.elastic.co/guide/cn/elasticsearch/php/current/_quickstart.html)<br>
