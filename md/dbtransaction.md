# 数据库事务处理

- [transaction() 执行一组事务](#transaction)
- [beginTransaction() 开始一个事务](#begin)
- [commit() 提交事务](#commit)
- [rollBack() 回滚事务](#rollback)


#### <a name="transaction">transaction() 执行一组事务</a>

```php
DB::connect()->transaction(function(){
    DB::connect()->insert("...");
    DB::connect()->insert("...");
    DB::connect()->update("...");
});
```

　　其中任意一条执行失败或抛出任何异常，则自动回滚整个事务；<br>

　　有时你需要更加灵活的控制事务：

#### <a name="begin">beginTransaction() 开始一个事务</a>
```php
DB::connect()->beginTransaction();
```

#### <a name="commit">commit() 提交事务</a>
```php
DB::connect()->commit();
```

#### <a name="rollback">rollBack() 回滚事务</a>
```php
DB::connect()->rollBack();
```

　　代码：
```php
$db = DB::connect();

try {

    $db->beginTransaction();  // 开始事务

    $db->insert("...");
    $db->update("...");
    // ...

    $db->commit();            // 执行成功 提交事务

} catch (Exception $e) {

    $db->rollBack();                       // 执行失败 回滚事务
    $e->log(Exception::ERROR_TYPE_MYSQL);  // 异常信息

}
```

