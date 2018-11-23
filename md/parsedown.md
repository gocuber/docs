# 使用parsedown

#### 安装

　　`composer.json`

```php
"require": {
    "erusev/parsedown": "~1.7",
}
```

　　或者

```php
composer require erusev/parsedown
```

#### 实例

```php
$Parsedown = new Parsedown();

echo $Parsedown->text('Hello _Parsedown_!'); # prints: <p>Hello <em>Parsedown</em>!</p>
// you can also parse inline markdown only
echo $Parsedown->line('Hello _Parsedown_!'); # prints: Hello <em>Parsedown</em>!
```

[GitHub](https://github.com/erusev/parsedown)
