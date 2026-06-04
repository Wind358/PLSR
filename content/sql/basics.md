---
languageId: sql
languageName: SQL
group: Data
accent: #2f855a
description: 关系型数据库查询、建模和分析的标准语言。
topicId: basics
topicTitle: 查询基础
summary: SELECT、JOIN、聚合、事务与索引。
order: 10
---

# SQL 查询基础

SQL 用于关系型数据库的数据查询、建模和变更。

## SELECT

```sql
SELECT id, name, created_at
FROM users
WHERE active = true
ORDER BY created_at DESC;
```

## JOIN

```sql
SELECT users.name, orders.total
FROM users
JOIN orders ON orders.user_id = users.id
WHERE orders.status = 'paid';
```

## 聚合

```sql
SELECT status, COUNT(*) AS count, SUM(total) AS revenue
FROM orders
GROUP BY status
HAVING COUNT(*) > 10;
```

## INSERT

```sql
INSERT INTO users (name, email)
VALUES ('Ada', 'ada@example.com');
```

## UPDATE

```sql
UPDATE users
SET active = false
WHERE last_login_at < '2025-01-01';
```

## 事务

```sql
BEGIN;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

COMMIT;
```

## 规范建议

- 查询字段尽量显式列出，避免长期依赖 `SELECT *`。
- 给常用过滤字段和关联字段建立索引。
- 事务中保持操作短小。
- 注意不同数据库方言的函数和类型差异。
