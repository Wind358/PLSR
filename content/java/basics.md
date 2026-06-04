---
languageId: java
languageName: Java
group: Backend
accent: #d66b2a
description: 面向对象、强类型、企业级服务常用语言
topicId: basics
topicTitle: java基础语法
summary: 适用版本：Java 8+（LTS 主流版本） | 用途：编程时快速查询核心语法 | 特点：极简、实用、聚焦高频场景
order: 10
---

# Java 语法速查手册

---

## 一、基础语法规则

### 1.1 代码结构与规范

- 用 ** 大括号`{}`**划分代码块，所有语句必须以**分号`;`** 结束
- 一个`.java`文件只能有一个`public`类，且类名必须与文件名完全一致
- 程序入口：固定格式的`main`方法
- 推荐缩进：4 个空格

```java
  // 标准Hello World结构
  public class HelloWorld {
      public static void main(String[] args) {
          System.out.println("Hello Java");
      }
  }
```

  ### 1.2 注释

```java
  // 单行注释
  
  /*
   多行注释
   不能嵌套
   */
  
  /**
   * 文档注释（可生成API文档）
   * 用于类、方法、字段的说明
   * @author 作者
   * @version 版本
   */
```

  ### 1.3 标识符与关键字

  - 命名规则：字母、数字、下划线`_`、美元符`$`组成，不能以数字开头，区分大小写

  - 不能使用 Java 关键字（`public、private、static、final、class、if、for`等）

  - 强制命名规范：

    - 类名 / 接口名：`PascalCase`（大驼峰）
    - 方法名 / 变量名：`camelCase`（小驼峰）
    - 常量：`UPPER_SNAKE_CASE`（全大写 + 下划线）

    

  ### 1.4 变量与常量

  - **静态强类型**：必须先声明类型再使用

  - 变量分类：

    - 局部变量：方法 / 代码块内，必须手动初始化
    - 成员变量：类内方法外，有默认值（数值 0，布尔 false，引用 null）
    - 静态变量：`static`修饰，属于类，所有对象共享

    

  - 常量：`final`修饰，只能赋值一次

```java
  int age = 20; // 局部变量
  final double PI = 3.14159; // 常量
  static String school = "清华大学"; // 静态变量
```

  ## 二、核心数据类型

  ### 2.1 8 种基本数据类型

  |   类型    |  大小  |   默认值   |             说明             |          示例          |
  | :-------: | :----: | :--------: | :--------------------------: | :--------------------: |
  |  `byte`   | 1 字节 |     0      |           8 位整数           |     `byte b = 10;`     |
  |  `short`  | 2 字节 |     0      |          16 位整数           |    `short s = 100;`    |
  |   `int`   | 4 字节 |     0      |  32 位整数（默认整数类型）   |    `int i = 1000;`     |
  |  `long`   | 8 字节 |     0L     |     64 位整数，后缀加 L      |   `long l = 10000L;`   |
  |  `float`  | 4 字节 |    0.0f    |    单精度浮点数，后缀加 f    |   `float f = 3.14f;`   |
  | `double`  | 8 字节 |    0.0d    | 双精度浮点数（默认浮点类型） | `double d = 3.14159;`  |
  |  `char`   | 2 字节 | `'\u0000'` |      16 位 Unicode 字符      |    `char c = 'A';`     |
  | `boolean` |  1 位  |  `false`   |   布尔值，只有 true/false    | `boolean flag = true;` |

  ### 2.2 字符串（String）

  - **不可变字符序列**，修改字符串会生成新对象

```java
  String s1 = "Hello";
  String s2 = new String("World");
  
  // 常用方法
  s1.length(); // 长度
  s1.charAt(0); // 索引字符
  s1.substring(0, 3); // 切片："Hel"（左闭右开）
  s1.equals(s2); // 比较内容（必须用equals，不能用==）
  s1.equalsIgnoreCase(s2); // 忽略大小写比较
  s1.replace("l", "x"); // 替换
  s1.split(" "); // 分割
  s1.trim(); // 去除首尾空格
  String.format("Name: %s, Age: %d", "Alice", 20); // 格式化
  
  // 字符串拼接（推荐用StringBuilder，性能更高）
  StringBuilder sb = new StringBuilder();
  sb.append("Hello").append(" ").append("Java");
  String result = sb.toString();
```

  ### 2.3 数组（Array）

  - 固定长度、同类型元素的集合，长度不可变

```java
  // 声明
  int[] arr1;
  int arr2[]; // 不推荐
  
  // 静态初始化
  int[] arr3 = {1, 2, 3, 4, 5};
  String[] arr4 = {"a", "b", "c"};
  
  // 动态初始化（指定长度，元素为默认值）
  int[] arr5 = new int[5]; // [0, 0, 0, 0, 0]
  
  // 常用操作
  arr3.length; // 长度（属性，不是方法）
  arr3[0] = 100; // 赋值
  for (int i = 0; i < arr3.length; i++) { ... } // 普通for遍历
  for (int num : arr3) { ... } // 增强for遍历（for-each）
  
  // Arrays工具类（java.util.Arrays）
  Arrays.sort(arr3); // 排序
  Arrays.toString(arr3); // 转换为字符串
  Arrays.binarySearch(arr3, 3); // 二分查找
  Arrays.copyOf(arr3, 3); // 复制前3个元素
```

  ## 三、流程控制（逻辑结构）

  ### 3.1 条件判断

```java
  // 基本if-else
  if (age >= 18) {
      System.out.println("成年");
  } else if (age >= 12) {
      System.out.println("青少年");
  } else {
      System.out.println("儿童");
  }
  
  // switch-case（支持byte/short/int/char/Enum/String）
  switch (day) {
      case 1:
          System.out.println("周一");
          break;
      case 2:
          System.out.println("周二");
          break;
      default:
          System.out.println("其他");
  }
  
  // Java 12+ switch表达式（推荐）
  String dayName = switch (day) {
      case 1 -> "周一";
      case 2 -> "周二";
      default -> "其他";
  };
  
  // 三元表达式
  String result = score >= 60 ? "及格" : "不及格";
```

  ### 3.2 循环

```java
  // 普通for循环
  for (int i = 0; i < 5; i++) {
      System.out.println(i);
  }
  
  // 增强for循环（遍历数组/集合）
  int[] arr = {1, 2, 3};
  for (int num : arr) {
      System.out.println(num);
  }
  
  // while循环
  int i = 0;
  while (i < 5) {
      System.out.println(i);
      i++;
  }
  
  // do-while循环（至少执行一次）
  int j = 0;
  do {
      System.out.println(j);
      j++;
  } while (j < 5);
```

  ### 3.3 循环控制

  - `break`：立即终止当前循环
  - `continue`：跳过当前迭代，进入下一次循环
  - 带标签的 break/continue：跳出多层循环

```java
  outer: // 标签
  for (int i = 0; i < 3; i++) {
      for (int j = 0; j < 3; j++) {
          if (j == 1) {
              break outer; // 跳出外层循环
          }
          System.out.println(i + "," + j);
      }
  }
```

  ## 四、方法（函数）

  ### 4.1 方法定义与调用

  - 方法必须定义在类内部

```java
  // 语法：[访问修饰符] [static] [final] 返回值类型 方法名(参数列表) [throws 异常] { 方法体 }
  public static int add(int a, int b) {
      return a + b; // return结束方法并返回值
  }
  
  // 无返回值用void
  public static void printHello() {
      System.out.println("Hello");
  }
  
  // 调用
  int sum = add(1, 2);
  printHello();
```

  ### 4.2 方法特性

  - **值传递**：Java 只有值传递。基本类型传值，引用类型传地址值
  - 可变参数：`类型... 参数名`，本质是数组，必须放在参数列表最后

```java
  public static int sum(int... nums) {
      int total = 0;
      for (int num : nums) {
          total += num;
      }
      return total;
  }
  sum(1, 2, 3); // 调用
```

  - 方法重载：同一个类中，方法名相同，**参数列表不同**（个数、类型、顺序），与返回值无关

```java
  public static int add(int a, int b) { return a + b; }
  public static double add(double a, double b) { return a + b; } // 重载
```

  ## 五、面向对象核心语法

  ### 5.1 类与对象

```java
  // 类定义
  public class Student {
      // 成员变量
      String name;
      int age;
  
      // 构造方法（与类名同名，无返回值）
      public Student() {} // 无参构造（默认存在，定义有参构造后消失）
  
      public Student(String name, int age) { // 有参构造
          this.name = name; // this指代当前对象
          this.age = age;
      }
  
      // 成员方法
      public void study() {
          System.out.println(name + "在学习");
      }
  }
  
  // 对象创建与使用
  Student stu = new Student("Alice", 20);
  stu.study(); // 调用方法
  System.out.println(stu.name); // 访问成员变量
```

  ### 5.2 访问修饰符

  |          修饰符           | 同类 | 同包 | 子类 | 不同包 |
  | :-----------------------: | :--: | :--: | :--: | :----: |
  |         `public`          |  ✅   |  ✅   |  ✅   |   ✅    |
  |        `protected`        |  ✅   |  ✅   |  ✅   |   ❌    |
  | `default`（包私有，不写） |  ✅   |  ✅   |  ❌   |   ❌    |
  |         `private`         |  ✅   |  ❌   |  ❌   |   ❌    |

  ### 5.3 static 关键字

  - 静态成员属于**类**，不属于对象，所有对象共享

```java
  public class Student {
      static String school = "清华大学"; // 静态变量
      String name;
  
      // 静态方法
      public static void printSchool() {
          System.out.println(school);
          // 不能访问非静态成员（name）
      }
  }
  
  // 调用
  System.out.println(Student.school);
  Student.printSchool();
```

  ### 5.4 继承

  - Java**单继承**，一个类只能有一个直接父类

```java
  // 父类
  public class Person {
      String name;
      public void eat() {
          System.out.println("吃饭");
      }
  }
  
  // 子类继承父类
  public class Student extends Person {
      int studentId;
      public void study() {
          System.out.println("学习");
      }
  }
  
  // 使用
  Student stu = new Student();
  stu.name = "Alice"; // 继承父类成员
  stu.eat(); // 继承父类方法
  stu.study(); // 子类自己的方法
```

  - 方法重写（Override）：子类方法与父类方法名、参数列表、返回值完全相同

    - 访问权限不能更严格
    - 不能抛出更宽泛的异常
    - 用`@Override`注解标识

    

  - `super`关键字：指代父类对象，用于访问父类成员、调用父类构造方法

  ### 5.5 接口

  - 接口是方法的集合，Java 8 + 支持默认方法和静态方法

```java
  // 接口定义
  public interface Flyable {
      // 常量（默认public static final）
      int MAX_SPEED = 1000;
  
      // 抽象方法（默认public abstract）
      void fly();
  
      // 默认方法（Java 8+）
      default void land() {
          System.out.println("降落");
      }
  }
  
  // 实现接口
  public class Bird implements Flyable {
      @Override
      public void fly() {
          System.out.println("鸟在飞");
      }
  }
```

  ### 5.6 抽象类

  - 包含抽象方法的类必须声明为抽象类，抽象类不能实例化

```java
  public abstract class Animal {
      // 抽象方法（只有声明，没有实现）
      public abstract void makeSound();
  
      // 普通方法
      public void breathe() {
          System.out.println("呼吸");
      }
  }
  
  // 子类必须实现所有抽象方法
  public class Dog extends Animal {
      @Override
      public void makeSound() {
          System.out.println("汪汪汪");
      }
  }
```

  ## 六、异常处理

  ### 6.1 异常体系

  - 根类：

    ```
    Throwable
    ```

    - `Error`：系统级错误，无法处理（如 OOM）

    - ```
      Exception
      ```

      ：程序异常，可处理

      - 受检异常：必须显式处理（如`IOException`）
      - 非受检异常：运行时异常，无需强制处理（如`NullPointerException`）


  ### 6.2 异常处理语法

```java
  try {
      // 可能出错的代码
      int result = 10 / 0;
  } catch (ArithmeticException e) {
      // 捕获特定异常
      System.out.println("除数不能为零");
      e.printStackTrace(); // 打印异常栈信息
  } catch (Exception e) {
      // 捕获所有异常（必须放在最后）
      System.out.println("发生错误：" + e.getMessage());
  } finally {
      // 无论是否异常都会执行（用于释放资源）
      System.out.println("执行完毕");
  }
  
  // 声明方法可能抛出的异常
  public void readFile() throws IOException {
      // 可能抛出IOException的代码
  }
  
  // 主动抛出异常
  throw new IllegalArgumentException("参数错误");
```

  ## 七、集合框架（核心数据结构）

  ### 7.1 集合体系概览

  - 单列集合：根接口

    ```
    Collection
    ```

    - `List`：有序、可重复
    - `Set`：无序、不可重复
    - `Queue`：队列（先进先出）

  - 双列集合：根接口`Map`（键值对，键唯一）

  ### 7.2 常用 List 实现类

  |    实现类    | 底层结构 |            特点            | 适用场景 |
  | :----------: | :------: | :------------------------: | :------: |
  | `ArrayList`  | 动态数组 | 查询快，增删慢，非线程安全 | 频繁查询 |
  | `LinkedList` | 双向链表 | 查询慢，增删快，非线程安全 | 频繁增删 |

```java
  // 常用方法
  List<String> list = new ArrayList<>();
  list.add("a"); // 添加元素
  list.add(1, "b"); // 指定位置添加
  list.get(0); // 获取元素
  list.set(0, "x"); // 修改元素
  list.remove(0); // 删除元素
  list.size(); // 大小
  list.contains("a"); // 是否包含
  list.isEmpty(); // 是否为空
  
  // 遍历
  for (String s : list) {
      System.out.println(s);
  }
  list.forEach(s -> System.out.println(s)); // Lambda遍历
```

  ### 7.3 常用 Set 实现类

  |  实现类   | 底层结构 |                   特点                    |
  | :-------: | :------: | :---------------------------------------: |
  | `HashSet` |  哈希表  |        无序，非线程安全，允许 null        |
  | `TreeSet` |  红黑树  | 有序（自然排序 / 自定义排序），非线程安全 |

```java
  Set<String> set = new HashSet<>();
  set.add("a");
  set.add("a"); // 自动去重
  set.remove("a");
  set.contains("a");
```

  ### 7.4 常用 Map 实现类

  |     实现类      |          底层结构          |              特点               |
  | :-------------: | :------------------------: | :-----------------------------: |
  |    `HashMap`    | 哈希表 + 红黑树（Java 8+） | 无序，键值允许 null，非线程安全 |
  |    `TreeMap`    |           红黑树           |       键有序，非线程安全        |
  | `LinkedHashMap` |     哈希表 + 双向链表      |    保持插入顺序，非线程安全     |

```java
  Map<String, Integer> map = new HashMap<>();
  map.put("Alice", 20); // 添加键值对
  map.get("Alice"); // 获取值
  map.remove("Alice"); // 删除
  map.containsKey("Alice"); // 判断键是否存在
  map.keySet(); // 获取所有键
  map.values(); // 获取所有值
  map.entrySet(); // 获取所有键值对
  
  // 遍历
  for (Map.Entry<String, Integer> entry : map.entrySet()) {
      System.out.println(entry.getKey() + ":" + entry.getValue());
  }
  map.forEach((k, v) -> System.out.println(k + ":" + v)); // Lambda遍历
```

  ## 八、常用内置工具类

  ### 8.1 Math 类

```java
  Math.abs(-10); // 绝对值
  Math.max(1, 2); // 最大值
  Math.min(1, 2); // 最小值
  Math.pow(2, 3); // 幂运算
  Math.sqrt(4); // 平方根
  Math.random(); // 0-1随机数
  Math.round(3.14); // 四舍五入
```

  ### 8.2 日期时间类（Java 8+，推荐）

  - 替代旧的`Date`和`Calendar`类

  ```java
  import java.time.*;
  import java.time.format.DateTimeFormatter;
  
  LocalDate date = LocalDate.now(); // 当前日期
  LocalTime time = LocalTime.now(); // 当前时间
  LocalDateTime dateTime = LocalDateTime.now(); // 当前日期时间
  
  LocalDate birthday = LocalDate.of(2000, 1, 1); // 指定日期
  date.plusDays(7); // 加7天
  date.minusMonths(1); // 减1个月
  
  // 格式化
  DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
  String str = dateTime.format(formatter);
  LocalDateTime parse = LocalDateTime.parse("2024-01-01 12:00:00", formatter);
  ```

  ## 九、高频进阶语法

  ### 9.1 枚举（Enum）

  ```java
  // 定义
  public enum Season {
      SPRING, SUMMER, AUTUMN, WINTER
  }
  
  // 使用
  Season s = Season.SPRING;
  System.out.println(s.ordinal()); // 索引：0
  System.out.println(Season.valueOf("SPRING")); // 字符串转枚举
  ```

  ### 9.2 Lambda 表达式（Java 8+）

  - 简化函数式接口（只有一个抽象方法的接口）的实现

  ```java
  // 匿名内部类写法
  list.forEach(new Consumer<String>() {
      @Override
      public void accept(String s) {
          System.out.println(s);
      }
  });
  
  // Lambda写法
  list.forEach(s -> System.out.println(s));
  ```

  ### 9.3 泛型（Generic）

  - 类型安全，避免强制类型转换

  ```java
  // 泛型类
  public class Box<T> {
      private T content;
      public T getContent() { return content; }
      public void setContent(T content) { this.content = content; }
  }
  
  // 使用
  Box<String> box = new Box<>();
  box.setContent("Hello");
  String content = box.getContent();
  ```
