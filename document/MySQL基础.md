# MySQL基础操作

## 一、数据库操作

### 1. 创建数据库
```sql
CREATE DATABASE database_name;
CREATE DATABASE IF NOT EXISTS database_name;  -- 如果不存在则创建
CREATE DATABASE database_name CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;  -- 指定字符集
```

### 2. 选择数据库
```sql
USE database_name;
```

### 3. 查看所有数据库
```sql
SHOW DATABASES;
```

### 4. 删除数据库
```sql
DROP DATABASE database_name;
DROP DATABASE IF EXISTS database_name;  -- 安全删除
```

### 5. 查看数据库信息
```sql
SHOW CREATE DATABASE database_name;  -- 查看创建语句
```

## 二、表操作

### 1. 创建表
```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    age INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 创建带索引的表
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(50),
    stock INT DEFAULT 0,
    INDEX idx_category (category),
    INDEX idx_price (price)
);

-- 创建带外键的表
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 2. 查看表
```sql
SHOW TABLES;  -- 查看所有表
SHOW TABLES LIKE 'user%';  -- 模糊查询表名
DESCRIBE users;  -- 查看表结构
DESC users;  -- 简写
SHOW CREATE TABLE users;  -- 查看创建表的SQL语句
SHOW FULL COLUMNS FROM users;  -- 查看表的完整列信息
```

### 3. 修改表结构
```sql
-- 添加列
ALTER TABLE users ADD COLUMN phone VARCHAR(20) AFTER email;

-- 修改列
ALTER TABLE users MODIFY COLUMN age TINYINT UNSIGNED;

-- 重命名列
ALTER TABLE users CHANGE COLUMN age user_age INT;

-- 删除列
ALTER TABLE users DROP COLUMN phone;

-- 添加索引
ALTER TABLE users ADD INDEX idx_username (username);
ALTER TABLE users ADD UNIQUE INDEX unique_email (email);

-- 添加主键
ALTER TABLE users ADD PRIMARY KEY (id);

-- 添加外键
ALTER TABLE orders ADD FOREIGN KEY (user_id) REFERENCES users(id);

-- 重命名表
ALTER TABLE users RENAME TO customers;
RENAME TABLE customers TO users;

-- 修改表字符集
ALTER TABLE users CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 4. 删除表
```sql
DROP TABLE users;
DROP TABLE IF EXISTS users;  -- 安全删除
TRUNCATE TABLE users;  -- 清空表数据，保留表结构
```

## 三、数据操作（CRUD）

### 1. 插入数据 (INSERT)
```sql
-- 插入单条数据
INSERT INTO users (username, email, age) VALUES ('张三', 'zhangsan@example.com', 25);

-- 插入多条数据
INSERT INTO users (username, email, age) VALUES 
    ('李四', 'lisi@example.com', 30),
    ('王五', 'wangwu@example.com', 28),
    ('赵六', 'zhaoliu@example.com', 35);

-- 插入忽略重复（如果存在唯一约束冲突则忽略）
INSERT IGNORE INTO users (username, email, age) VALUES ('张三', 'zhangsan@example.com', 26);

-- 插入或替换（如果存在则替换）
REPLACE INTO users (id, username, email, age) VALUES (1, '张三', 'zhangsan_new@example.com', 26);

-- 插入或更新（ON DUPLICATE KEY UPDATE）
INSERT INTO users (username, email, age) 
VALUES ('张三', 'zhangsan@example.com', 26)
ON DUPLICATE KEY UPDATE 
    email = VALUES(email),
    age = VALUES(age),
    updated_at = CURRENT_TIMESTAMP;
```

### 2. 查询数据 (SELECT)
```sql
-- 查询所有列
SELECT * FROM users;

-- 查询指定列
SELECT id, username, email FROM users;

-- 条件查询
SELECT * FROM users WHERE age > 25;
SELECT * FROM users WHERE age BETWEEN 20 AND 30;
SELECT * FROM users WHERE username LIKE '张%';  -- 张开头
SELECT * FROM users WHERE username LIKE '%三';  -- 三结尾
SELECT * FROM users WHERE username LIKE '%张%';  -- 包含张
SELECT * FROM users WHERE username NOT LIKE '张%';  -- 不是张开头

-- IN 操作符
SELECT * FROM users WHERE age IN (25, 30, 35);
SELECT * FROM users WHERE age NOT IN (25, 30, 35);

-- NULL 值判断
SELECT * FROM users WHERE phone IS NULL;
SELECT * FROM users WHERE phone IS NOT NULL;

-- 多重条件
SELECT * FROM users WHERE age > 25 AND email LIKE '%@example.com';
SELECT * FROM users WHERE age < 20 OR age > 40;

-- 排序
SELECT * FROM users ORDER BY age ASC;  -- 升序
SELECT * FROM users ORDER BY age DESC;  -- 降序
SELECT * FROM users ORDER BY age DESC, username ASC;  -- 多重排序

-- 限制结果
SELECT * FROM users LIMIT 10;  -- 前10条
SELECT * FROM users LIMIT 5, 10;  -- 从第6条开始，取10条（跳过前5条）
SELECT * FROM users LIMIT 10 OFFSET 5;  -- 同上

-- 去重
SELECT DISTINCT age FROM users;

-- 聚合函数
SELECT COUNT(*) FROM users;  -- 总行数
SELECT COUNT(DISTINCT age) FROM users;  -- 不同年龄数量
SELECT AVG(age) FROM users;  -- 平均年龄
SELECT SUM(age) FROM users;  -- 年龄总和
SELECT MAX(age) FROM users;  -- 最大年龄
SELECT MIN(age) FROM users;  -- 最小年龄

-- 分组查询
SELECT age, COUNT(*) as count FROM users GROUP BY age;
SELECT age, COUNT(*) as count FROM users GROUP BY age HAVING count > 1;

-- 别名
SELECT u.username AS name, u.email AS mail FROM users AS u;

-- 连接查询
-- 内连接
SELECT u.username, o.order_date, o.total_amount 
FROM users u 
INNER JOIN orders o ON u.id = o.user_id;

-- 左连接
SELECT u.username, o.order_date, o.total_amount 
FROM users u 
LEFT JOIN orders o ON u.id = o.user_id;

-- 右连接
SELECT u.username, o.order_date, o.total_amount 
FROM users u 
RIGHT JOIN orders o ON u.id = o.user_id;

-- 子查询
SELECT * FROM users WHERE age > (SELECT AVG(age) FROM users);
SELECT username FROM users WHERE id IN (SELECT DISTINCT user_id FROM orders);

-- EXISTS
SELECT * FROM users u WHERE EXISTS (
    SELECT 1 FROM orders o WHERE o.user_id = u.id
);

-- UNION
SELECT username FROM users WHERE age < 20
UNION
SELECT username FROM users WHERE age > 40;

-- CASE WHEN
SELECT 
    username,
    age,
    CASE 
        WHEN age < 20 THEN '少年'
        WHEN age BETWEEN 20 AND 30 THEN '青年'
        WHEN age BETWEEN 31 AND 50 THEN '中年'
        ELSE '老年'
    END AS age_group
FROM users;
```

### 3. 更新数据 (UPDATE)
```sql
-- 更新所有行
UPDATE users SET updated_at = CURRENT_TIMESTAMP;

-- 条件更新
UPDATE users SET age = 26 WHERE username = '张三';

-- 更新多个字段
UPDATE users SET 
    age = age + 1,
    updated_at = CURRENT_TIMESTAMP 
WHERE username = '张三';

-- 使用子查询更新
UPDATE users u
JOIN (
    SELECT user_id, COUNT(*) as order_count 
    FROM orders 
    GROUP BY user_id
) o ON u.id = o.user_id
SET u.order_count = o.order_count
WHERE u.id = 1;

-- 限制更新数量
UPDATE users SET status = 'active' WHERE status = 'inactive' LIMIT 10;
```

### 4. 删除数据 (DELETE)
```sql
-- 删除所有数据（慎用！）
DELETE FROM users;

-- 条件删除
DELETE FROM users WHERE age > 100;

-- 限制删除数量
DELETE FROM users WHERE status = 'inactive' LIMIT 100;

-- 删除重复数据
DELETE u1 FROM users u1
INNER JOIN users u2 
WHERE 
    u1.id > u2.id AND 
    u1.email = u2.email;  -- 保留id最小的
```

## 四、索引操作

### 1. 创建索引
```sql
-- 创建普通索引
CREATE INDEX idx_age ON users(age);

-- 创建唯一索引
CREATE UNIQUE INDEX idx_email ON users(email);

-- 创建复合索引
CREATE INDEX idx_name_age ON users(username, age);

-- 创建全文索引（适用于文本搜索）
CREATE FULLTEXT INDEX idx_content ON articles(content);

-- 创建空间索引
CREATE SPATIAL INDEX idx_location ON places(location);
```

### 2. 查看索引
```sql
SHOW INDEX FROM users;
SHOW INDEXES FROM users;
```

### 3. 删除索引
```sql
DROP INDEX idx_age ON users;
ALTER TABLE users DROP INDEX idx_email;
```

## 五、事务操作

```sql
-- 开始事务
START TRANSACTION;
-- 或
BEGIN;

-- 执行SQL操作
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- 提交事务
COMMIT;

-- 回滚事务
ROLLBACK;

-- 设置保存点
SAVEPOINT sp1;
-- 回滚到保存点
ROLLBACK TO SAVEPOINT sp1;
-- 释放保存点
RELEASE SAVEPOINT sp1;
```

## 六、视图操作

```sql
-- 创建视图
CREATE VIEW user_orders_view AS
SELECT u.username, o.order_date, o.total_amount
FROM users u
JOIN orders o ON u.id = o.user_id;

-- 查看视图
SELECT * FROM user_orders_view;

-- 创建或替换视图
CREATE OR REPLACE VIEW user_orders_view AS
SELECT u.username, u.email, o.order_date, o.total_amount
FROM users u
JOIN orders o ON u.id = o.user_id;

-- 查看视图定义
SHOW CREATE VIEW user_orders_view;

-- 删除视图
DROP VIEW user_orders_view;
```

## 七、存储过程和函数

### 1. 创建存储过程
```sql
DELIMITER //

CREATE PROCEDURE GetUserByAge(IN min_age INT, IN max_age INT)
BEGIN
    SELECT * FROM users 
    WHERE age BETWEEN min_age AND max_age
    ORDER BY age ASC;
END //

DELIMITER ;

-- 调用存储过程
CALL GetUserByAge(20, 30);
```

### 2. 创建函数
```sql
DELIMITER //

CREATE FUNCTION GetUserCountByAgeRange(min_age INT, max_age INT) 
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE user_count INT;
    SELECT COUNT(*) INTO user_count 
    FROM users 
    WHERE age BETWEEN min_age AND max_age;
    RETURN user_count;
END //

DELIMITER ;

-- 使用函数
SELECT GetUserCountByAgeRange(20, 30);
```

## 八、用户和权限管理

```sql
-- 创建用户
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
CREATE USER 'username'@'%' IDENTIFIED BY 'password';  -- 允许任何主机

-- 修改密码
ALTER USER 'username'@'localhost' IDENTIFIED BY 'new_password';

-- 授予权限
GRANT SELECT, INSERT, UPDATE ON database_name.* TO 'username'@'localhost';
GRANT ALL PRIVILEGES ON database_name.* TO 'username'@'localhost';

-- 授予创建用户的权限
GRANT CREATE USER ON *.* TO 'admin'@'localhost';

-- 查看权限
SHOW GRANTS FOR 'username'@'localhost';

-- 撤销权限
REVOKE INSERT ON database_name.* FROM 'username'@'localhost';

-- 删除用户
DROP USER 'username'@'localhost';
```

## 九、备份和恢复

```sql
-- 导出数据库（命令行）
mysqldump -u username -p database_name > backup.sql

-- 导出特定表
mysqldump -u username -p database_name table1 table2 > backup.sql

-- 导入数据库
mysql -u username -p database_name < backup.sql

-- 导出数据到CSV
SELECT * INTO OUTFILE '/tmp/users.csv'
FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
FROM users;

-- 从CSV导入数据
LOAD DATA INFILE '/tmp/users.csv'
INTO TABLE users
FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;  -- 忽略标题行
```

## 十、实用技巧和最佳实践

### 1. 性能优化
```sql
-- 使用EXPLAIN分析查询
EXPLAIN SELECT * FROM users WHERE age > 25;

-- 强制使用索引
SELECT * FROM users FORCE INDEX (idx_age) WHERE age > 25;

-- 优化表
OPTIMIZE TABLE users;

-- 分析表
ANALYZE TABLE users;

-- 检查表
CHECK TABLE users;

-- 修复表
REPAIR TABLE users;
```

### 2. 系统信息查询
```sql
-- 查看MySQL版本
SELECT VERSION();

-- 查看当前用户
SELECT USER();

-- 查看当前数据库
SELECT DATABASE();

-- 查看服务器状态
SHOW STATUS;

-- 查看系统变量
SHOW VARIABLES LIKE 'max_connections';
SHOW VARIABLES LIKE '%timeout%';
```

### 3. 时间处理
```sql
-- 当前时间
SELECT NOW();      -- 日期时间
SELECT CURDATE();  -- 日期
SELECT CURTIME();  -- 时间

-- 日期格式化
SELECT DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%s');
SELECT DATE_FORMAT(NOW(), '%W, %M %d, %Y');

-- 日期计算
SELECT DATE_ADD(NOW(), INTERVAL 1 DAY);
SELECT DATE_SUB(NOW(), INTERVAL 1 MONTH);
SELECT DATEDIFF('2024-12-31', '2024-01-01');

-- 提取日期部分
SELECT YEAR(NOW()), MONTH(NOW()), DAY(NOW());
SELECT HOUR(NOW()), MINUTE(NOW()), SECOND(NOW());
```

这些是 MySQL 的基础操作，涵盖了数据库管理的各个方面。建议在实际使用时根据具体需求选择合适的方法，并注意数据安全。