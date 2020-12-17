# Lambda语法

使用lambda表达式的一般语法是

```
(Parameters) -> { Body }
```

`-> `分隔参数和lambda表达式主体。

参数括在括号中，与方法相同，而lambda表达式主体是用大括号括起来的代码块。

> 注意：
>
> lambda表达式主体可以有局部变量，语句。我们可以在lambda表达式主体中使用break，continue和return。我们甚至可以从lambda表达式主体中抛出异常。
>
> lambda表达式没有名称，因为它表示匿名内部类。
>
> lambda表达式的返回类型由编译器推断。
>
> lambda表达式不能像方法一样有throws子句。
>
> lambda表达式不能是泛型，而泛型在函数接口中定义。

## 显式和隐式lambda表达式

未声明其参数类型的lambda表达式称为隐式lambda表达式。

显式lambda表达式是一个lambda表达式，它声明其参数的类型。

编译器将推断用于隐式lambda表达式的参数类型

### 实例

以下代码使用单一方法创建接口，并将其用作lambda表达式类型。当创建lambda表达式时，我们声明参数` s1 `的类型为`Integer`类型。

```java
public class Main {
  public static void main(String[] args) {
    // 显式lambda表达式
    MyIntegerCalculator myIntegerCalculator = (Integer s1) -> s1 * 2;
    System.out.println("1- Result x2 : " + myIntegerCalculator.calcIt(5));
  }
}

interface MyIntegerCalculator {
  public Integer calcIt(Integer s1);
}
```

这里是没有使用类型的演示。当忽略类型时，编译器必须计算出来。

```java
public class Main {
  public static void main(String[] args) {
    MyIntegerCalculator myIntegerCalculator = (s1) -> s1 * 2;
    System.out.println("1- Result x2 : " + myIntegerCalculator.calcIt(5));
  }
}

interface MyIntegerCalculator {
  public Integer calcIt(Integer s1);
}
```

## 省略参数类型

我们可以选择省略lambda表达式中的参数类型。

在lambda表达式 `(int x, int y) -> { return x + y; }`声明的参数类型。

我们可以安全地重写lambda表达式，省略参数类型

```
(x, y) -> { return x + y; }
```

如果我们选择省略参数类型，我们必须省略所有参数的类型。

```java
public class Main {
  public static void main(String[] argv) {
    Processor stringProcessor = (str) -> str.length();
    String name = "Java Lambda";
    int length = stringProcessor.getStringLength(name);
    System.out.println(length);
  }
}

@FunctionalInterface
interface Processor {
  int getStringLength(String str);
}
```

## 单参数

对于单个参数lambda表达式，我们可以省略括号，因为我们省略了参数类型。

lambda表达式 `(String msg) -> {System.out.println(msg);}`有一切。

然后我们可以省略参数类型

```
(msg)->{System.out.println(msg);}
```

我们可以进一步省略参数类型和括号，如下所示。

```
msg -> { System.out.println(msg); }
```

```java
public class Main {
  public static void main(String[] argv) {
    Processor stringProcessor = str -> str.length();
    String name = "Java Lambda";
    int length = stringProcessor.getStringLength(name);
    System.out.println(length);
  }
}

@FunctionalInterface
interface Processor {
  int getStringLength(String str);
}
```

## 无参数

对于没有参数的lambda表达式，我们仍然需要括号。

```
() -> { System.out.println("hi"); }
```

以下示例显示如何使用` BooleanSupplier `。

```java
import java.util.function.BooleanSupplier;

public class Main {
  public static void main(String[] args) {
    BooleanSupplier bs = () -> true;
    System.out.println(bs.getAsBoolean());

    int x = 0, y= 1;
    bs = () -> x > y;
    System.out.println(bs.getAsBoolean());
  }
}
```

## final修饰符

您可以在参数声明中为表达式lambda表达式使用` final `修饰符。

以下lambda表达式使用final修饰符。

```
(final int x, final int y) -> { return x + y; }
```

我们可以只使用一个修饰符如下。

```
(int x, final int y) -> {return x + y;}
```

```java
public class Main {
  public static void main(String[] argv) {
    Processor stringProcessor = (final String str) -> str.length();
    String name = "Java Lambda";
    int length = stringProcessor.getStringLength(name);
    System.out.println(length);
  }
}

@FunctionalInterface
interface Processor {
  int getStringLength(String str);
}
```

## Lambda表达式主体

lambda表达式主体可以是块语句或单个表达式。

块语句用大括号括起来，而单个表达式可以没有大括号。

在块语句中，我们可以使用` return `语句返回值。

以下lambda表达式使用块语句并使用` return `语句返回总和。

```
(int x, int y) -> { return x + y; }
```

下面的lambda使用了一个表达式：

```
(int x, int y) -> x + y
```

表达式不需要大括号。

lambda不必返回值。以下两个lambda表达式只是将参数输出到标准输出，不返回任何内容。

```
(String msg)->{System.out.println(msg);}// a  block   statement
(String msg)->System.out.println(msg)   //an expression
```

```java
public class Main {
  public static void main(String[] argv) {
    Processor stringProcessor = (String str) -> str.length();
    String name = "Java Lambda";
    int length = stringProcessor.getStringLength(name);
    System.out.println(length);// www . j a  va 2  s. co m
  }
}

@FunctionalInterface
interface Processor {
  int getStringLength(String str);
}
```

# Lambda类型推断

lambda表达式表示函数接口的实例。

根据上下文，一个lambda表达式可以映射到不同的函数接口类型。

编译器推断lambda表达式的类型。

在下面的代码中有两个函数接口，` Processor `和`SecondProcessor`。

`Processor `有一个名为` getStringLength `的方法，它接受一个字符串作为参数，并返回` int `。

`SecondProcessor `有一个名为` noName `的方法，它接受一个字符串作为参数，并返回一个` int `。

从代码中，我们可以看到，我们可以为它们分配两个相同的lambda表达式。

```java
public class Main {
  public static void main(String[] argv) {
    Processor stringProcessor = (String str) -> str.length();
    SecondProcessor secondProcessor = (String str) -> str.length();
    //stringProcessor = secondProcessor; //compile error
    String name = "Java Lambda";
    int length = stringProcessor.getStringLength(name);
    System.out.println(length);
  }
}

@FunctionalInterface
interface Processor {
  int getStringLength(String str);
}

@FunctionalInterface
interface SecondProcessor {
  int noName(String str);
}
```

> 注意：
>
> `Processor `或` SecondProcessor `称为目标类型。
>
> 推断lambda表达式类型的过程称为目标类型。
>
> 编译器使用以下规则来确定lambda表达式是否可分配给其目标类型：
>
> - 它必须是一个函数接口。
> - lambda表达式的参数必须与函数接口中的抽象方法匹配。
> - lambda表达式的返回类型与函数接口中抽象方法的返回类型兼容。
> - 从lambda表达式抛出的检查异常必须与函数接口中抽象方法的已声明的throws子句兼容。

# Lambda行为参数化

我们可以将lambda表达式作为参数传递给方法。

以下代码创建了一个名为` Calculator `的函数接口。

在` Calculator `中有一个称为` calculate `的方法，它接受两个` int `参数并返回一个` int `值。

在` Main `类中有一个引擎方法，它接受函数接口`Calculator`作为参数。它从计算器调用计算方法并输出结果。``

在主方法中，我们用不同的lambda表达式调用引擎方法四次。

```java
public class Main {
  public static void main(String[] argv) {
    engine((x,y)-> x + y);
    engine((x,y)-> x * y);
    engine((x,y)-> x / y);
    engine((x,y)-> x % y);
  }
  private static void engine(Calculator calculator){
    int x = 2, y = 4;
    int result = calculator.calculate(x,y);
    System.out.println(result);
  }
}

@FunctionalInterface
interface Calculator{
  int calculate(int x, int y);
}
```

> 注意：
>
> `engine `方法的结果取决于传递给它的lambda表达式。
>
> 引擎方法的行为被参数化。
>
> 通过其参数更改方法的行为称为行为参数化。
>
> 在行为参数化中，我们将在lambda表达式中封装的逻辑传递给数据的方法。

## 行为参数化模糊性

编译器并不总是可以推断lambda表达式的类型。

一种情况是将lambda表达式传递给重载的方法。

在以下代码中有两个函数接口。 一个是` int `值计算，另一个用于` long `值。

在Main类中有称为` engine `的重载方法。 一个是期望` IntCalculator `，另一个是` LongCalculator `。

在main方法中，我们必须指定lambda表达式的参数，以指示我们要使用的重载函数的编译器。

```java
public class Main {
  public static void main(String[] argv) {
    engine((int x,int y)-> x + y);
    engine((long x, long y)-> x * y);
    engine((int x,int y)-> x / y);
    engine((long x,long y)-> x % y);
  }
  private static void engine(IntCalculator calculator){
    int x = 2, y = 4;
    int result = calculator.calculate(x,y);
    System.out.println(result);
  }
  private static void engine(LongCalculator calculator){
    long x = 2, y = 4;
    long result = calculator.calculate(x,y);
    System.out.println(result);
  }  
}

@FunctionalInterface
interface IntCalculator{
  int calculate(int x, int y);
}

@FunctionalInterface
interface LongCalculator{
  long calculate(long x, long y);
}
```

> 注意1
>
> 要解决歧义，我们可以通过指定参数的类型将隐式lambda表达式更改为explicit。这是为上面的代码做的。
>
> 或者我们可以使用cast如下。当第一次调用引擎时，我们将lambda表达式转换为`IntCalculator`。

```java
public class Main {
  public static void main(String[] argv) {
    engine((IntCalculator) ((x,y)-> x + y));
    engine((long x, long y)-> x * y);
    engine((int x,int y)-> x / y);
    engine((long x,long y)-> x % y);
  }
  private static void engine(IntCalculator calculator){
    int x = 2, y = 4;
    int result = calculator.calculate(x,y);
    System.out.println(result);
  }
  private static void engine(LongCalculator calculator){
    long x = 2, y = 4;
    long result = calculator.calculate(x,y);
    System.out.println(result);
  }  
}

@FunctionalInterface
interface IntCalculator{
  int calculate(int x, int y);
}

@FunctionalInterface
interface LongCalculator{
  long calculate(long x, long y);
}
```

> 注意2
>
> 或者我们可以避免直接使用lambda表达式作为参数。我们可以将lambda表达式分配给一个函数接口，然后将该变量传递给该方法。下面的代码显示了这种技术。

```java
public class Main {
  public static void main(String[] argv) {
    IntCalculator iCal = (x,y)-> x + y;
    engine(iCal);
    engine((long x, long y)-> x * y);
    engine((int x,int y)-> x / y);
    engine((long x,long y)-> x % y);
  }
  private static void engine(IntCalculator calculator){
    int x = 2, y = 4;
    int result = calculator.calculate(x,y);
    System.out.println(result);
  }
  private static void engine(LongCalculator calculator){
    long x = 2, y = 4;
    long result = calculator.calculate(x,y);
    System.out.println(result);
  }  
}

@FunctionalInterface
interface IntCalculator{
  int calculate(int x, int y);
}

@FunctionalInterface
interface LongCalculator{
  long calculate(long x, long y);
}
```

# Lambda表达式上下文

lambda表达式可以只在以下四种环境中使用。

- 赋值上下文
- 方法调用上下文
- 返回上下文
- 转换上下文

## 赋值上下文

lambda表达式可以显示在赋值运算符的右侧。

```java
public class Main {
  public static void main(String[] argv) {
    Calculator iCal = (x,y)-> x + y;
    System.out.println(iCal.calculate(1, 2));
  }
}

@FunctionalInterface
interface Calculator{
  int calculate(int x, int y);
}
```

## 方法调用上下文

我们可以使用lambda表达式作为方法或构造函数的参数。

```java
public class Main {
  public static void main(String[] argv) {
    engine((x,y)-> x / y);
  }
  private static void engine(Calculator calculator){
    long x = 2, y = 4;
    long result = calculator.calculate(x,y);
    System.out.println(result);
  }  
}

@FunctionalInterface
interface Calculator{
  long calculate(long x, long y);
}
```

## 返回上下文

我们可以在return语句中使用lambda表达式，其目标类型在方法返回类型中声明。

```java
public class Main {
  public static void main(String[] argv) {
    System.out.println(create().calculate(2, 2));
  }
  private static Calculator create(){
    return (x,y)-> x / y;
  }  
}

@FunctionalInterface
interface Calculator{
  long calculate(long x, long y);
}
```

## 转换上下文

我们可以使用一个lambda表达式前面加一个cast（强制类型转换）。在转换中指定的类型是其目标类型。

```java
public class Main {
  public static void main(String[] argv) {
    engine((IntCalculator) ((x,y)-> x + y));
  }
  private static void engine(IntCalculator calculator){
    int x = 2, y = 4;
    int result = calculator.calculate(x,y);
    System.out.println(result);
  }
  private static void engine(LongCalculator calculator){
    long x = 2, y = 4;
    long result = calculator.calculate(x,y);
    System.out.println(result);
  }  
}

@FunctionalInterface
interface IntCalculator{
  int calculate(int x, int y);
}

@FunctionalInterface
interface LongCalculator{
  long calculate(long x, long y);
}
```

# 函数式接口

函数式接口是具有一个方法的接口，用作lambda表达式的类型。

```java
public interface ActionListener extends EventListener {
    public void actionPerformed(ActionEvent event);
}
```

`ActionListener `只有一个方法`actionPerformed`。它是一个函数式接口。无论调用什么单一方法，只要Java编译器具有兼容的方法签名，Java编译器就会将其匹配到您的lambda表达式。

lambda表达式表示函数式接口的实例。

lambda表达式的类型是一个函数式接口类型。

`(String str) -> str.length()` str.length() 获取一个String参数并返回其长度。

它的类型可以是任何具有抽象方法的函数接口类型，它使用String作为参数并返回int。

以下是这种函数式接口的示例:

```java
@FunctionalInterface
interface Processor  {
    int  getStringLength(String str);
}
```

我们可以为其函数式接口实例赋值lambda表达式。

```java
Processor stringProcessor = (String str) -> str.length();
```

## 实例

在下面的代码中，我们为其函数接口赋值一个lambda表达式。然后我们通过调用函数接口中定义的方法来执行lambda表达式，并传入一个参数。

```java
public class Main {
  public static void main(String[] argv) {
    Processor stringProcessor = (String str) -> str.length();
    String name = "Java Lambda";
    int length = stringProcessor.getStringLength(name);
    System.out.println(length);

  }
}

@FunctionalInterface
interface Processor {
  int getStringLength(String str);
}
```

> 注意
>
> lambda表达式本身不能用作独立的表达式。
>
> lambda表达式的类型由编译器推断。

## Java函数式接口定义

函数式接口是具有一个抽象方法的接口。

我们不能使用以下类型的方法来声明一个函数式接口：

- 默认方法
- 静态方法
- 从Object类继承的方法

一个函数式接口可以重新声明Object类中的方法。该方法不被视为抽象方法。因此，我们可以声明lambda表达式使用的另一种方法。

考虑` java.util `包中的Comparator类，如下所示:

```java
package java.util;

@FunctionalInterface
public interface  Comparator<T> {
   // An  abstract method  declared in the functional interface 
   int compare(T  o1,   T  o2);

   // Re-declaration of the equals() method in the Object class 
   boolean equals(Object  obj);

   ...
}
```

Comparator接口有两个抽象方法：` compare()`和` equals()`。

`equals()`方法是Object类中的` equals()`方法的重新声明。

## @FunctionalInterface注释

`@FunctionalInterface `注释在java.lang包中定义。我们可以选择使用它来标记一个函数式接口。

如果注释` @FunctionalInterface `在非函数式接口或其他类型（如类）上注释，则会发生编译时错误。

具有一个抽象方法的接口仍然是一个功能接口，即使我们不用` @FunctionalInterface `注释。

```java
public class Main {
  public static void main(String[] argv) {
    Processor stringProcessor = (String str) -> str.length();
    String name = "Java Lambda";
    int length = stringProcessor.getStringLength(name);
    System.out.println(length);

  }
}

@FunctionalInterface
interface Processor {
  int getStringLength(String str);
}
```

## 通用函数式接口

我们可以使用类型参数与函数式接口来创建通用函数式接口。

以下代码创建具有一个类型参数T的通用函数式参数函数接口。

```java
@FunctionalInterface
public interface  Comparator<T> {
    int compare(T o1, T o2);
}
```

以下代码使用抽象通用方法定义非通用函数式接口：

```java
@FunctionalInterface
public interface  Processor {
   <T> void  process(T[] list);
}
```

## Java Buildin函数式接口

Java 8在包java.util.function中有函数式接口

### 函数

表示接受类型`T`的参数并返回类型`R`的结果的函数。

```java
public interface Function<T,R>{
   ...
   public R apply(T t);
   ...
}
```

### BiFunction

表示一个函数，它接受类型T和U的两个参数，并返回类型R的结果。

```java
public interface BiFunction<T,U,R>{
   ...
   public R apply(T t, U u);
   ...
}
```

### 谓词

表示为指定参数返回` true `或` false `的布尔函数。

```java
public interface Predicate<T> {
   ...
   public boolean test(T  t);
   ...
}
```

### BiPredicate

表示为两个指定的参数返回` true `或` false `的布尔函数。

```java
public interface BiPredicate<T,U>{
   ...
   public boolean test(T t, U u);
   ...   
}
```

### Consumer

表示接受参数并且不返回结果的操作。

```java
public interface Consumer<T>{
   ...
   public void accept(T t);
   ...
}
```

### BiConsumer

表示接受两个参数并且不返回结果的操作。

```java
public interface BiConsumer<T,U>{
   ...   
   public void accept(T t, U  u);
   ...   
}
```

### Supplier

表示返回类型T的值的函数。

```java
public interface Supplier<T>{
   ...
    public T get();
   ...
}
```

### UnaryOperator

表示接受参数并返回相同类型的结果的函数。

```java
public interface UnaryOperator<T>{
   ...
   public T  apply(T t);
   ...
}
```

### BinaryOperator

表示一个函数，它接受两个参数并返回相同类型的结果。

```java
public interface BinaryOperator<T>{
   ...
   public T apply(T t1, T t2);
   ...
}  
```

> 注意2
>
> 上述通用buildin函数式接口都是更专用的函数式接口的通用版本。
>
> 例如，` IntConsumer `是` Consumer<T> `的专用版本。

# Java交叉类型

Java 8引入了一种称为交集类型的新类型。

交叉类型是多种类型的交叉。

交叉路口类型可能在投射中显示为目标类型。

在两种类型之间使用`Type1 & Type2`，以表示类型1，类型2的交集的新类型。

## 实例

以下代码使用具有交集类型的转型，创建一个新的合成类型，它是所有类型的子类型。

它创建两个接口，Calculator是一个功能接口，可以与lambda表达式一起使用。另一个称为` NonFunction `，它不是函数接口。 为了创建一个lambda表达式并赋值给` NonFunction `，我们使用`& `来创建新的子类型。

交叉路口类型`NonFunction & Calculator`是一个函数接口。

```java
public class Main {
  public static void main(String[] argv) {
    NonFunction nonFunction = (NonFunction & Calculator) (x,y)-> x + y;
  }  
}

@FunctionalInterface
interface Calculator{
  long calculate(long x, long y);
}

interface  NonFunction{
}
```

以下代码通过将` java.io.Serializable `标记接口与我们自己的功能接口相交来创建交集类型。

```java
public class Main {
  public static void main(String[] argv) {

    java.io.Serializable ser = (java.io.Serializable & Calculator) (x,y)-> x + y;
  }  
}

@FunctionalInterface
interface Calculator{
  long calculate(long x, long y);
}
```

以这种方式，我们使一个lambda表达式可序列化。

# 函数接口

`Function<T, R>` 接口有六个特殊化：

- `IntFunction<R>`
- `LongFunction<R>`
- `DoubleFunction<R>`
- `ToIntFunction<T>`
- `ToLongFunction<T>`
- `ToDoubleFunction<T>`

`IntFunction<R>, LongFunction<R>, 和 DoubleFunction<R>`分别以int，long和double作为参数，它们的返回值在类型R中。

`ToIntFunction<T>, ToLongFunction<T>, 和 ToDoubleFunction<T>` 取T类型的参数，并分别返回int，long和double。

## 辅助方法

`Function `接口包含以下默认和静态方法:

```
default <V> Function<T,V> andThen(Function<? super  R,? extends V> after)
default <V> Function<V,R> compose(Function<? super  V,? extends T> before)
static <T> Function<T,T> identity()
```

`andThen()`创建一个` Function `，调用当前函数和指定的函数后得到结果。

`compose()`创建一个` Function `，该函数调用指定的函数，然后调用当前函数并返回结果。

`identify()`创建一个返回其参数的函数。

# 谓词接口

`谓词`接口包含以下默认和静态方法。

我们可以使用NOT，AND和OR方法来创建基于其他谓词的谓词。

```
default  Predicate<T> negate()
default  Predicate<T> and(Predicate<? super T> other)
default  Predicate<T> or(Predicate<?  super T> other)
static <T> Predicate<T> isEqual(Object  targetRef)
```

`negate()`否定原始谓词的谓词。

`and()`组合两个具有短路逻辑AND的谓词。

`or()`组合了具有短路逻辑或的两个谓词。

`isEqual()`返回一个谓词，根据Objects.equals(Object，Object)测试两个参数是否相等。

我们可以链接上述方法来创建复杂谓词。

## 实例

以下示例显示如何使用` Predicate `。

```js
import java.util.function.Predicate;

public class Main {

  public static void main(String[] args) {
    Predicate<String> i  = (s)-> s.length() > 5;
   
    System.out.println(i.test("www.w3cschool.cn "));
  }
}
```

# 静态方法引用

lambda表达式表示在函数接口中定义的匿名函数。

方法引用使用现有方法创建lambda表达式。

方法引用的一般语法是

```
Qualifier::MethodName
```

两个连续的冒号充当分隔符。

`MethodName `是方法的名称。

`限定符`告诉在哪里找到方法引用。

## 实例

例如，我们可以使用` String::length `从` String `类引用length方法。这里` String `是限定符，` length `是方法名。

我们只需要指定方法名。

无需指定方法的参数类型和返回类型。

方法引用的目标类型是功能接口。它确定方法的签名并在必要时解析重载的方法。

## 方法引用类型

有六种类型的方法引用。

- TypeName::staticMethod - 引用类的静态方法，接口或枚举
- objectRef::instanceMethod - 引用实例方法
- ClassName::instanceMethod - 从类中引用实例方法
- TypeName.super::instanceMethod - 从对象的父类型引用实例方法
- ClassName::new - 引用一个类的构造函数
- ArrayTypeName::new - 对指定数组类型的构造函数的引用

## 静态方法引用

静态方法引用允许我们使用静态方法作为lambda表达式。

静态方法可以在类，接口或枚举中定义。

以下代码定义了两个lambda表达式。

第一个lambda表达式`func1`是通过定义输入参数x并提供lambda表达式主体来创建的。基本上，这是创建lambda表达式的正常方式。

第二个lambda表达式`func2`是通过从Integer类引用静态方法创建的。

```js
import java.util.function.Function;

public class Main {
  public static void main(String[] argv) {
    // Using  a  lambda  expression
    Function<Integer, String> func1  = x -> Integer.toBinaryString(x);
    System.out.println(func1.apply(10));

    // Using  a  method  reference
    Function<Integer, String> func2  = Integer::toBinaryString;
    System.out.println(func2.apply(10));
  }  
}
```

从Integer类的静态方法的签名如下。

```js
static String toBinaryString(int i)
```

## 实例2

以下代码显示了如何使用Integer.sum作为lambda表达式。

```java
import java.util.function.BiFunction;

public class Main {
  public static void main(String[] argv) {

    // Uses a lambda expression
    BiFunction<Integer, Integer, Integer> func1 = (x, y) -> Integer.sum(x, y);
    System.out.println(func1.apply(2, 3));

    // Uses a method reference
    BiFunction<Integer, Integer, Integer> func2 = Integer::sum;
    System.out.println(func2.apply(2, 3));

  }
}
```

## 重载中的静态方法引用

我们可以在静态方法引用中使用重载的静态方法。

当重载方法时，我们必须更加注意方法签名和相应的函数接口。

在下面的列表中，我们有来自Integer类的三个版本的valueOf()。

```java
static Integer valueOf(int i)
static Integer  valueOf(String s)
static Integer  valueOf(String s, int radix)
```

以下代码显示了如何使用不同的目标函数接口与重载的Integer.valueOf()静态方法。

```java
import java.util.function.BiFunction;
import java.util.function.Function;

public class Main{
  public static void main(String[] argv){
    // Uses  Integer.valueOf(int)
    Function<Integer, Integer> func1  = Integer::valueOf;

    // Uses  Integer.valueOf(String)
    Function<String, Integer> func2  = Integer::valueOf;

    // Uses  Integer.valueOf(String, int)
    BiFunction<String, Integer,  Integer> func3  = Integer::valueOf;

    System.out.println(func1.apply(7)); 
    System.out.println(func2.apply("7")); 
    System.out.println(func3.apply("101010101010", 2));
  }
}
```

# 实例方法引用

我们可以通过两种方式获得一个实例方法引用，从对象实例或从类名。

基本上我们有以下两种形式。

- instance::MethodName
- ClassName::MethodName

这里`实例`表示任何对象实例。` ClassName `是的名称类，例如` String `，` Integer `。

`实例`和` ClassName `称为接收器。更具体地说，` instance `被称为有界接收器，而` ClassName `被称为无界接收器。

我们称为实例有界接收器，因为接收器被限制到实例。

`ClassName `是未经过排队的接收器，因为接收器以后有界。

## 绑定实例方法引用

绑定接收器接收器具有以下形式：

```
instance::MethodName
```

在下面的代码中，我们使用buildin系统函数接口Supplier作为lambda表达式类型。

首先，我们以正常的方式定义一个lambda表达式。 lambda表达式不接受参数，并返回字符串 'w3cschool.cn' 的长度，

我们使用 'w3cschool.cn' 创建一个String实例，并使用它的length方法作为实例方法引用。

绑定意味着我们已经指定了实例。

以下示例显示如何使用没有参数的绑定接收器和方法来创建实例方法引用。

```java
import java.util.function.Supplier;

public class Main{
  public static void main(String[] argv){
    Supplier<Integer> supplier  = () ->  "www.w3cschool.cn".length(); 
    System.out.println(supplier.get());
    
    
    Supplier<Integer> supplier1  = "www.w3cschool.cn"::length; 
    System.out.println(supplier1.get());
  }
}
```

## 例1

以下示例显示如何使用绑定接收器和方法与参数创建实例方法引用。

```java
import java.util.function.Consumer;

public class Main{
  public static void main(String[] argv){
    Util util = new Util();
    
    Consumer<String> consumer  = str ->  util.print(str);
    consumer.accept("Hello"); 
    

    Consumer<String> consumer1  = util::print;
    consumer1.accept("www.w3cschool.cn");
    
    util.debug();
  }
}
class Util{
  private int count=0;
  public void print(String s){
    System.out.println(s);
    count++;
  }
  public void debug(){
    System.out.println("count:" + count);
  }
}
```

## 未绑定实例方法引用

未绑定的接收器使用以下语法

```
ClassName::instanceMethod
```

它与我们用来引用静态方法的语法相同。

从以下代码，我们可以看到输入类型是ClassName的类型。

在下面的代码中，我们使用` String:length `，因为函数接口的输入类型为` String `。

lambda表达式在使用时获取输入。

以下代码使用String length方法作为unbind实例方法引用。

String length方法通常在字符串值实例上调用，并返回字符串实例的长度。因此，输入是String类型，输出是int类型，这是匹配buildin函数功能接口。

每次我们调用` str Length Func `，我们传入一个字符串值，并从传递的字符串值中调用length方法。

```java
import java.util.function.Function;

public class Main{
  public static void main(String[] argv){
    Function<String,  Integer> strLengthFunc = String::length; 
    String name ="www.w3cschool.cn";
    int len   =  strLengthFunc.apply(name); 
    System.out.println("name  = "  +  name + ", length = "  + len);
    
    name ="www.www.w3cschool.cn";
    len   =  strLengthFunc.apply(name); 
    System.out.println("name  = "  +  name + ", length = "  + len);

  }
}
```

## 例2

下面的代码定义了一个具有称为append的静态方法的类Util。

`append `方法接受两个` String `类型参数，并返回一个` String `类型的结果。

然后使用` append `方法创建一个lambda表达式并赋值给Java buildin `BiFunction `函数接口。

append方法的签名与`BiFunction `函数接口中定义的抽象方法的签名相匹配。

```java
import java.util.function.BiFunction;

public class Main{
  public static void main(String[] argv){
    BiFunction<String,  String,String> strFunc = Util::append; 
    String name ="www.w3cschool.cn";
    String s=  strFunc.apply(name,"hi"); 
    System.out.println(s);
  }
}
class Util{
  public static String append(String s1,String s2){
    return s1+s2;
  }  
}
```

## 超类型实例方法引用

关键字` super `仅在实例上下文中使用，引用覆盖的方法。

我们可以用下面的语法来创建是指在父类型的实例方法的方法引用。

```
ClassName.super::instanceMethod
```

下面的代码定义了一个称为` ParentUtil `的父类。在` ParentUtil `中有一个名为` append `的方法，它将两个String值附加在一起。

然后创建一个名为` Util `的子类并扩展` ParentUtil `。

在` Util `类中，覆盖` append `方法。

在Util的构造函数中，我们创建两个lambda表达式，一个是使用Util的append方法，另一个是使用ParentUtil类的append方法。

我们使用` this::append `引用当前类，同时使用` Util.super::append `从父类引用方法。

```java
import java.util.function.BiFunction;

public class Main{
  public static void main(String[] argv){
    new Util();
  }
}
class Util extends ParentUtil{
  
  public Util(){
    BiFunction<String,  String,String> strFunc = this::append; 
    String name ="www.w3cschool.cn";
    String s=  strFunc.apply(name," hi"); 
    System.out.println(s);
    
    strFunc = Util.super::append; 
    name ="www.w3cschool.cn";
    s=  strFunc.apply(name," Java Lambda Tutorial"); 
    System.out.println(s);

  }
  
  @Override
  public String append(String s1,String s2){
    System.out.println("child append");
    return s1+s2;
  }  
}
class ParentUtil{
  public String append(String s1,String s2){
    System.out.println("parent append");
    return s1+s2;
  }  
}
```

# 构造函数引用

我们可以使用构造函数创建一个lambda表达式。

使用构造函数引用的语法是：

```
ClassName::new
```

关键字new指的是类的构造函数。编译器根据上下文选择一个构造函数。

```java
import java.util.function.Function;
import java.util.function.Supplier;

public class Main{
  public static void main(String[] argv){
    Supplier<String> func1  = () ->  new String();
    System.out.println("Empty String:"+func1.get());
    
    Function<String,String> func2  = str ->  new String(str);
    
    System.out.println(func2.apply("www.w3cschool.cn"));

    Supplier<String> func3  = String::new;
    System.out.println("Empty String:"+func3.get());
    
    Function<String,String> func4  = String::new;
    System.out.println(func4.apply("www.w3cschool.cn"));
  }
}
```

## 数组构造函数引用

我们可以使用数组构造函数创建一个数组如下。

```
ArrayTypeName::new
```

`int [] :: new `是调用` new int [] `。` new int [] `需要一个` int `类型值作为数组长度，因此` int [] :: new `需要一个` int `类型输入值。

以下代码使用数组构造函数引用创建一个int数组。

```java
import java.util.Arrays;
import java.util.function.IntFunction;

public class Main{
  public static void main(String[] argv){
    IntFunction<int[]> arrayCreator1 = size ->  new int[size];
    // Creates an  int array of  five  elements
    int[] intArray1  = arrayCreator1.apply(5);
    System.out.println(Arrays.toString(intArray1));

    IntFunction<int[]> arrayCreator2 = int[]::new;
    int[] intArray2 = arrayCreator2.apply(5); 
    System.out.println(Arrays.toString(intArray2));
  }
}
```

## 例2

通过使用` Function< Integer，Array Type> `，我们可以在声明中指定数组类型。

```java
import java.util.Arrays;
import java.util.function.Function;

public class Main{
  public static void main(String[] argv){
    Function<Integer,int[]>  arrayCreator3 = int[]::new;
    int[] intArray  = arrayCreator3.apply(5); 
    System.out.println(Arrays.toString(intArray));
  }
}
```

## 例3

我们可以在创建二维数组时指定第一维的长度。

```java
import java.util.Arrays;
import java.util.function.IntFunction;

public class Main{
  public static void main(String[] argv){
    IntFunction<int[][]> TwoDimArrayCreator  = int[][]::new;
    int[][] intArray = TwoDimArrayCreator.apply(5); 
    // Creates an  int[5][]  array
    intArray[0] = new int[5]; 
    intArray[1] = new int[5];
    intArray[2] = new int[5];
    intArray[3] = new int[5];
    intArray[4] = new int[5];
    
    System.out.println(Arrays.deepToString(intArray));
  }
}
```

# 通用方法引用

我们可以通过指定实际的类型参数来在方法引用中使用通用方法。

语法如下：

```
ClassName::<TypeName>methodName
```

通用构造函数引用的语法：

```
ClassName<TypeName>::new
```

## 例子

以下代码使用通用的Arrays.asList方法创建lambda表达式，并将参数设置为String。

```java
import java.util.Arrays;
import java.util.List;
import java.util.function.Function;

public class Main{
  public static void main(String[] argv){
    Function<String[],List<String>> asList = Arrays::<String>asList;
    
    System.out.println(asList.apply(new String[]{"a","b","c"}));
  }
}
```

# Lambda表达式作用域

lambda表达式不定义自己的范围。

如果我们在lambda中使用关键字` this `和` super `表达式在方法中，它们的行为与我们在该方法中使用它们一样。

## 例子

以下代码从lambda表达式输出this。这在lambda表达式中是指外部类不是lambda表达式本身。

```java
import java.util.function.Function;

public class Main {
  public Main(){
    Function<String,String> func1 = x -> {System.out.println(this);return x ;};
    System.out.println(func1.apply(""));
  }
  public String toString(){
    return "Main";
  }
  public static void main(String[] argv) {
    new Main();
  }
}
```

## 例2

Main方法中的第一行具有` x `的变量定义。

如果我们删除注释，我们会得到编译时错误，因为它与lambda表达式的变量定义冲突。

这是另一个演示，显示lambda表达式与其外部方法具有相同的范围。 lambda表达式不会创建自己的作用域。

```java
import java.util.function.Function;

public class Main {
  public Main(){
    //int x= 0;
    Function<String,String> func1 = x -> {System.out.println(this);return x ;};
    System.out.println(func1.apply(""));
  }
  public String toString(){
    return "Main";
  }
  public static void main(String[] argv) {
    new Main();
  }
}
```

# Lambda变量捕获

lambda表达式可以访问最终局部变量或局部非最终初始化只有一次的变量。

## 例子

下面的代码显示我们可以访问和使用最终的局部变量。

```java
import java.util.function.Function;

public class Main {
  public static void main(String[] argv) {
    final String x = "Hello"; 
    Function<String,String> func1 = y -> {return y + " "+ x ;};
    System.out.println(func1.apply("w3cschool.cn"));

  }
}
```

## 例2

下面的代码有一个变量x，它不是final，只能初始化一次。我们仍然可以在lambda表达式中使用它。

```java
import java.util.function.Function;

public class Main {
  public static void main(String[] argv) {
    String x = "Hello"; 
    
    Function<String,String> func1 = y -> {return y + " "+ x ;};
    System.out.println(func1.apply("w3cschool.cn"));
    
  }
}
```

## 例3

下面的代码显示我们不能改变在lambda表达式之外定义的值。

```java
import java.util.function.Function;

public class Main {
  public static void main(String[] argv) {
    String x = "Hello"; 
    
    Function<String,String> func1 = y -> {/*x="a";*/ return y + " "+ x ;};
    System.out.println(func1.apply("w3cschool.cn"));
    
  }
}
```

## 例4

我们可以更改lambda表达式中的非局部变量。

```java
import java.util.function.Function;

public class Main {
  static String x = "Hello"; 
  public static void main(String[] argv) {

    
    Function<String,String> func1 = y -> {x="a"; return y + " "+ x ;};
    System.out.println(func1.apply("w3cschool.cn"));
    
  }
}
```

# Lambda主体语句

我们可以使用` break `，` continue `，` return `和` throw `在lambda表达式主体中的语句。

我们不能使用跳转语句做非局部跳转。

## 例子

以下代码显示如何使用break语句退出lambda表达式中的for循环。

```java
import java.util.function.Function;

public class Main {

  public static void main(String[] argv) {
    Function<String,String> func1 = y -> {
      for(int i=0;i<10;i++){
        System.out.println(i);
        if(i == 4){
          break;
        }
      }
      return y + " from www.w3cschool.cn" ;
    };
    System.out.println(func1.apply("hi"));
    
  }
}
```

## 例2

我们不能在lambda表达式中使用break语句，以跳出到lambda表达式之外的for循环。

```java
import java.util.function.Function;

public class Main {

  public static void main(String[] argv) {
    for(int i=0;i<10;i++){
      System.out.println(i);
      if(i == 4){

        Function<String,String> func1 = y -> {
          //break;
          return y + " from www.w3cschool.cn" ;
        };
        System.out.println(func1.apply("hi"));

      }
    } 
  }
}
```

# 递归Lambda

我们可以在创建递归lambda表达式时使用方法引用。

## 例子

以下代码以正常方式创建递归函数，然后使用递归函数作为方法引用来创建lambda表达式。最后的lambda表达式成为递归。

```java
import java.util.function.IntFunction;

public class Main {
  public static void main(String[] args) {
    IntFunction<Long> factorialCalc = Main::factorial;
    System.out.println(factorialCalc.apply(10));
  }
  public static long factorial(int n) {
    if (n == 0) {
      return 1;
    } else {
      return n * factorial(n - 1);
    }
  }
}
```

