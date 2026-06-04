---
languageId: java
languageName: Java
group: Backend
accent: #d66b2a
description: 面向对象、强类型、企业级服务常用语言
topicId: advanced
topicTitle: java进阶语法
summary: 适用版本：Java 8+（LTS 主流版本） | 补充内容：Stream 流、IO 流、多线程、反射
order: 20
---

# Java 语法速查手册（进阶补充版）

------

## 十、高频进阶语法（续）

### 10.1 Stream 流（Java 8+，集合处理首选）

Stream 是**集合的流式处理 API**，支持链式调用，简化集合的过滤、转换、聚合等操作。

- 特点：不存储数据、不修改原集合、惰性求值（只有终止操作才会执行）

#### 10.1.1 流的创建

```java
// 1. 从集合创建（最常用）
List<String> list = Arrays.asList("a", "b", "c");
Stream<String> stream = list.stream(); // 串行流
Stream<String> parallelStream = list.parallelStream(); // 并行流

// 2. 从数组创建
String[] arr = {"a", "b", "c"};
Stream<String> arrStream = Arrays.stream(arr);

// 3. 创建空流
Stream<String> emptyStream = Stream.empty();

// 4. 创建无限流
Stream<Integer> infiniteStream = Stream.iterate(0, n -> n + 2); // 0,2,4,6...
```

#### 10.1.2 常用中间操作（返回新 Stream，可链式调用）


|               方法                |                     说明                     |
| :-------------------------------: | :------------------------------------------: |
|      `filter(Predicate<T>)`       |           过滤元素，保留满足条件的           |
|       `map(Function<T, R>)`       |                 转换元素类型                 |
| `flatMap(Function<T, Stream<R>>)` | 扁平化流（将流中的每个元素转换为流，再合并） |
|            `sorted()`             |                   自然排序                   |
|      `sorted(Comparator<T>)`      |                  自定义排序                  |
|           `distinct()`            |             去重（基于 equals）              |
|          `limit(long n)`          |               截取前 n 个元素                |
|          `skip(long n)`           |               跳过前 n 个元素                |

#### 10.1.3 常用终止操作（触发计算，返回结果）


|                 方法                 |             说明              |
| :----------------------------------: | :---------------------------: |
|         `collect(Collector)`         | 将流转换为集合 / 其他数据结构 |
|         `forEach(Consumer)`          |           遍历元素            |
|              `count()`               |         返回元素个数          |
|            `findFirst()`             |  返回第一个元素（Optional）   |
|             `findAny()`              | 返回任意一个元素（Optional）  |
|        `anyMatch(Predicate)`         |  是否有任意一个元素满足条件   |
|        `allMatch(Predicate)`         |    是否所有元素都满足条件     |
|        `noneMatch(Predicate)`        |     是否没有元素满足条件      |
| `reduce(T identity, BinaryOperator)` | 归约，将流中元素聚合为一个值  |

#### 10.1.4 高频示例

```java
List<Student> students = Arrays.asList(
    new Student("Alice", 20, 90),
    new Student("Bob", 21, 85),
    new Student("Charlie", 20, 95)
);

// 1. 过滤+转换：获取年龄20岁的学生姓名
List<String> names = students.stream()
    .filter(s -> s.getAge() == 20)
    .map(Student::getName)
    .collect(Collectors.toList());

// 2. 排序：按分数降序排列
List<Student> sortedStudents = students.stream()
    .sorted(Comparator.comparingInt(Student::getScore).reversed())
    .collect(Collectors.toList());

// 3. 分组：按年龄分组
Map<Integer, List<Student>> groupByAge = students.stream()
    .collect(Collectors.groupingBy(Student::getAge));

// 4. 聚合：求平均分
double avgScore = students.stream()
    .collect(Collectors.averagingInt(Student::getScore));

// 5. 归约：求总分
int totalScore = students.stream()
    .map(Student::getScore)
    .reduce(0, Integer::sum);
```

------

### 10.2 IO 流（输入输出）

IO 流用于处理设备之间的数据传输（文件、网络、内存等）。

- 按数据类型分：**字节流**（处理所有类型数据）、**字符流**（处理文本数据）
- 按流向分：输入流（读）、输出流（写）

#### 10.2.1 核心类体系


|  类型  |  输入流基类   |   输出流基类   |                          常用实现类                          |
| :----: | :-----------: | :------------: | :----------------------------------------------------------: |
| 字节流 | `InputStream` | `OutputStream` | `FileInputStream`、`FileOutputStream`、`BufferedInputStream`、`BufferedOutputStream` |
| 字符流 |   `Reader`    |    `Writer`    | `FileReader`、`FileWriter`、`BufferedReader`、`BufferedWriter` |

#### 10.2.2 字节流（处理二进制文件：图片、视频、音频等）

```java
// 文件复制示例（推荐用缓冲流，性能更高）
try (
    // Java 7+ try-with-resources：自动关闭资源，无需手动finally
    BufferedInputStream bis = new BufferedInputStream(new FileInputStream("source.jpg"));
    BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream("target.jpg"))
) {
    byte[] buffer = new byte[1024];
    int len;
    while ((len = bis.read(buffer)) != -1) {
        bos.write(buffer, 0, len);
    }
} catch (IOException e) {
    e.printStackTrace();
}
```

#### 10.2.3 字符流（处理文本文件：txt、java 等）

```java
// 读取文本文件
try (BufferedReader br = new BufferedReader(new FileReader("test.txt"))) {
    String line;
    while ((line = br.readLine()) != null) { // 按行读取
        System.out.println(line);
    }
} catch (IOException e) {
    e.printStackTrace();
}

// 写入文本文件
try (BufferedWriter bw = new BufferedWriter(new FileWriter("test.txt"))) {
    bw.write("Hello Java");
    bw.newLine(); // 换行
    bw.write("第二行内容");
} catch (IOException e) {
    e.printStackTrace();
}
```

#### 10.2.4 Files 工具类（Java 7+，简化文件操作）

```java
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

// 读取所有行
List<String> lines = Files.readAllLines(Paths.get("test.txt"));

// 写入文件
Files.write(Paths.get("test.txt"), "Hello Java".getBytes());

// 复制文件
Files.copy(Paths.get("source.txt"), Paths.get("target.txt"));

// 删除文件
Files.delete(Paths.get("test.txt"));

// 判断文件是否存在
boolean exists = Files.exists(Paths.get("test.txt"));
```

------

### 10.3 多线程

多线程允许程序同时执行多个任务，提高 CPU 利用率。

#### 10.3.1 创建线程的三种方式

1. **继承 Thread 类**

```java
public class MyThread extends Thread {
    @Override
    public void run() {
        // 线程执行的任务
        for (int i = 0; i < 5; i++) {
            System.out.println(Thread.currentThread().getName() + ": " + i);
        }
    }
}

// 启动线程
MyThread t1 = new MyThread();
t1.start(); // 调用start()方法启动线程，不能直接调用run()
```

1. **实现 Runnable 接口**（推荐，避免单继承限制）

```java
public class MyRunnable implements Runnable {
    @Override
    public void run() {
        // 线程执行的任务
    }
}

// 启动线程
Thread t2 = new Thread(new MyRunnable());
t2.start();
```

1. **实现 Callable 接口**（带返回值，可抛出异常）

```java
public class MyCallable implements Callable<Integer> {
    @Override
    public Integer call() throws Exception {
        // 线程执行的任务，返回结果
        return 100;
    }
}

// 启动线程
FutureTask<Integer> futureTask = new FutureTask<>(new MyCallable());
Thread t3 = new Thread(futureTask);
t3.start();

// 获取返回值（会阻塞，直到线程执行完毕）
Integer result = futureTask.get();
```

#### 10.3.2 线程常用方法


|           方法           |               说明               |
| :----------------------: | :------------------------------: |
|        `start()`         |             启动线程             |
|         `run()`          |        线程执行的任务逻辑        |
| `Thread.currentThread()` |         获取当前线程对象         |
| `getName()`/`setName()`  |       获取 / 设置线程名称        |
|   `sleep(long millis)`   | 线程休眠指定毫秒数（不会释放锁） |
|         `join()`         |        等待该线程执行完毕        |
|      `interrupt()`       |             中断线程             |
|       `isAlive()`        |         判断线程是否存活         |

#### 10.3.3 线程安全（synchronized 关键字）

当多个线程同时操作共享资源时，会出现线程安全问题，使用`synchronized`解决。

```java
// 1. 同步方法
public synchronized void sellTicket() {
    if (ticketCount > 0) {
        System.out.println(Thread.currentThread().getName() + "卖出第" + ticketCount + "张票");
        ticketCount--;
    }
}

// 2. 同步代码块（更灵活）
public void sellTicket() {
    synchronized (this) { // 锁对象，通常用this或共享资源
        if (ticketCount > 0) {
            System.out.println(Thread.currentThread().getName() + "卖出第" + ticketCount + "张票");
            ticketCount--;
        }
    }
}
```

#### 10.3.4 线程池（实际开发首选，避免频繁创建销毁线程）

线程池复用线程，管理线程生命周期，提高性能。

```java
// 1. 常用线程池（Executors工具类）
ExecutorService fixedThreadPool = Executors.newFixedThreadPool(5); // 固定大小线程池
ExecutorService cachedThreadPool = Executors.newCachedThreadPool(); // 缓存线程池
ExecutorService singleThreadExecutor = Executors.newSingleThreadExecutor(); // 单线程池
ScheduledExecutorService scheduledThreadPool = Executors.newScheduledThreadPool(3); // 定时任务线程池

// 2. 提交任务
fixedThreadPool.execute(new MyRunnable()); // 无返回值
Future<Integer> future = fixedThreadPool.submit(new MyCallable()); // 有返回值

// 3. 关闭线程池
fixedThreadPool.shutdown(); // 等待所有任务执行完毕后关闭
```

------

### 10.4 反射

反射允许程序在**运行时**获取类的信息（属性、方法、构造方法等），并动态操作对象。是很多框架（Spring、MyBatis）的核心基础。

#### 10.4.1 核心类


|      类       |           说明           |
| :-----------: | :----------------------: |
|    `Class`    |    代表类的字节码对象    |
| `Constructor` |     代表类的构造方法     |
|   `Method`    |       代表类的方法       |
|    `Field`    | 代表类的字段（成员变量） |

#### 10.4.2 获取 Class 对象的三种方式

```java
// 1. 类名.class（最常用，最安全）
Class<Student> clazz1 = Student.class;

// 2. 对象.getClass()
Student stu = new Student();
Class<? extends Student> clazz2 = stu.getClass();

// 3. Class.forName("全类名")（动态加载，框架常用）
Class<?> clazz3 = Class.forName("com.example.Student");
```

#### 10.4.3 操作构造方法（创建对象）

```java
// 获取无参构造方法
Constructor<Student> constructor = clazz1.getConstructor();
// 创建对象
Student student = constructor.newInstance();

// 获取有参构造方法
Constructor<Student> constructor2 = clazz1.getConstructor(String.class, int.class);
// 创建对象
Student student2 = constructor2.newInstance("Alice", 20);
```

#### 10.4.4 操作方法（调用方法）

```java
// 获取public方法（包括父类继承的）
Method studyMethod = clazz1.getMethod("study");
// 调用方法：对象.invoke(对象实例, 方法参数)
studyMethod.invoke(student);

// 获取所有方法（包括private，不包括父类）
Method privateMethod = clazz1.getDeclaredMethod("privateMethod");
// 打破封装（访问私有方法必须设置）
privateMethod.setAccessible(true);
privateMethod.invoke(student);
```

#### 10.4.5 操作字段（访问 / 修改属性）

```java
// 获取public字段
Field nameField = clazz1.getField("name");
// 设置字段值
nameField.set(student, "Bob");
// 获取字段值
String name = (String) nameField.get(student);

// 获取private字段
Field ageField = clazz1.getDeclaredField("age");
// 打破封装
ageField.setAccessible(true);
ageField.set(student, 21);
int age = (int) ageField.get(student);
```

------

## 十一、其他常用语法

### 11.1 注解（Annotation）

注解是代码的标记，可在编译期、运行期被读取，用于配置和元数据。

```java
// 自定义注解
@Target(ElementType.METHOD) // 注解作用目标
@Retention(RetentionPolicy.RUNTIME) // 注解保留策略
public @interface MyAnnotation {
    String value() default ""; // 注解属性
}

// 使用注解
@MyAnnotation("test")
public void test() {}
```

### 11.2 包装类

Java 为 8 种基本数据类型提供了对应的包装类，实现了基本类型和对象的转换。


| 基本类型 |  包装类   |
| :------: | :-------: |
|   byte   |   Byte    |
|  short   |   Short   |
|   int    |  Integer  |
|   long   |   Long    |
|  float   |   Float   |
|  double  |  Double   |
|   char   | Character |
| boolean  |  Boolean  |

```java
// 自动装箱：基本类型 -> 包装类
Integer i = 10;
// 自动拆箱：包装类 -> 基本类型
int j = i;

// 字符串转基本类型
int num = Integer.parseInt("123");
// 基本类型转字符串
String str = Integer.toString(123);
```