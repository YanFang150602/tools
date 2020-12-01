# 继承

## 简介

继承是所有 OOP 语言和 Java 语言不可缺少的组成部分。

继承是java面向对象编程技术的一块基石，因为它允许创建**分等级层次**的类。继承可以理解为**一个对象从另一个对象获取属性**的过程。

如果类A是类B的父类，而类B是类C的父类，我们也称C是A的子类，类C是从类A继承而来的。在Java中，类的继承是单一继承，也就是说，一个子类只能拥有一个父类。

继承中最常使用的两个关键字是`extends`和`implements`。

这两个关键字的使用决定了一个对象和另一个对象是否是**IS-A(是一个)**关系。

通过使用这两个关键字，我们能实现一个对象获取另一个对象的属性。

所有Java的类均是由`java.lang.Object`类继承而来的，所以`Object`是所有类的祖先类，而除了`Object`外，所有类必须有一个父类。

通过过`extends`关键字可以申明一个类是继承另外一个类而来的，一般形式如下：

```java
// A.java
public class A {
    private int i;
    protected int j;
 
    public void func() {
 
    }
}
 
// B.java
public class B extends A {
}
```

以上的代码片段说明，B由A继承而来的，B是A的子类。而A是`Object`的子类，这里可以不显示地声明。

作为子类，B的实例拥有A所有的成员变量，但对于`private`的成员变量B却没有访问权限，这保障了A的封装性。

## IS-A关系

IS-A就是说：一个对象是另一个对象的一个分类。

下面是使用关键字`extends`实现继承。

```java
public class Animal{
}

public class Mammal extends Animal{
}

public class Reptile extends Animal{
}

public class Dog extends Mammal{
}
```

基于上面的例子，以下说法是正确的：

- `Animal`类是`Mammal`类的父类。
- `Animal`类是`Reptile`类的父类。
- `Mammal`类、`Reptile`类是`Animal`类的子类。
- `Dog`类既是`Mammal`类的子类，又是`Animal`类的子类。

分析以上示例中的IS-A关系，如下：

- `Mammal IS-A Animal`
- `Reptile IS-A Animal`
- `Dog IS-A Mammal`

因此 : `Dog IS-A Animal`

通过使用关键字`extends`，子类可以继承父类的除`private`属性外所有的属性。

我们通过使用`instanceof` 操作符，能够确定`Mammal IS-A Animal`

**实例**

```java
public class Dog extends Mammal{

   public static void main(String args[]){

      Animal a = new Animal();
      Mammal m = new Mammal();
      Dog d = new Dog();

      System.out.println(m instanceof Animal);
      System.out.println(d instanceof Mammal);
      System.out.println(d instanceof Animal);
   }
}
```

```
true
true
true
```

介绍完`extends`关键字之后，我们再来看下`implements`关键字是怎样使用来表示IS-A关系。

`Implements`关键字使用在类继承接口的情况下， 这种情况不能使用关键字`extends`。

**实例**

```java
public interface Animal {}

public class Mammal implements Animal{
}

public class Dog extends Mammal{
}
```

## instanceof 关键字

可以使用 `instanceof` 运算符来检验`Mammal`和`dog`对象是否是`Animal`类的一个实例。

**实例**

```java
class Mammal implements Animal{}

public class Dog extends Mammal{
   public static void main(String args[]){

      Mammal m = new Mammal();
      Dog d = new Dog();

      System.out.println(m instanceof Animal);
      System.out.println(d instanceof Mammal);
      System.out.println(d instanceof Animal);
   }
}
```

```
true
true
true
```

## HAS-A 关系

HAS-A代表类和它的成员之间的从属关系。这有助于代码的重用和减少代码的错误。

**实例**

```java
public class Vehicle{}
public class Speed{}
public class Van extends Vehicle{
	private Speed sp;
} 
```

`Van`类和`Speed`类是HAS-A关系(`Van`有一个`Speed`)，这样就不用将`Speed`类的全部代码粘贴到`Van`类中了，并且`Speed`类也可以重复利用于多个应用程序。

在面向对象特性中，用户不必担心类的内部怎样实现。

`Van`类将实现的细节对用户隐藏起来，因此，用户只需要知道怎样调用`Van`类来完成某一功能，而不必知道`Van`类是自己来做还是调用其他类来做这些工作。

Java只支持单继承，也就是说，一个类不能继承多个类。

下面的做法是**不合法**的：

```java
public class extends Animal, Mammal{
} 
```

Java只支持单继承（继承基本类和抽象类），但是我们可以用接口来实现（多继承接口来实现），脚本结构如：

```java
public class Apple extends Fruit implements Fruit1, Fruit2{    
}
```

一般我们继承基本类和抽象类用`extends`关键字，实现接口类的继承用`implements`关键字。

# 多态

## 简介

多态是同一个行为具有多个不同表现形式或形态的能力。

多态性是对象多种表现形式的体现。

比如我们说"宠物"这个对象，它就有很多不同的表达或实现，比如有小猫、小狗、蜥蜴等等。那么我到宠物店说"请给我一只宠物"，服务员给我小猫、小狗或者蜥蜴都可以，我们就说"宠物"这个对象就具备多态性。

接下来让我们通过实例来了解Java的多态。

### 实例

```java
public interface Vegetarian{}
public class Animal{}
public class Deer extends Animal implements Vegetarian{}
```

因为Deer类具有多重继承，所以它具有多态性。以上实例解析如下：

- 一个 Deer IS-A（是一个） Animal
- 一个 Deer IS-A（是一个） Vegetarian
- 一个 Deer IS-A（是一个） Deer
- 一个 Deer IS-A（是一个）Object

在Java中，所有的对象都具有多态性，因为任何对象都能通过IS-A测试的类型和Object类。

访问一个对象的唯一方法就是通过引用型变量。

引用型变量只能有一种类型，一旦被声明，引用型变量的类型就不能被改变了。

引用型变量不仅能够被重置为其他对象，前提是这些对象没有被声明为final。还可以引用和它类型相同的或者相兼容的对象。它可以声明为类类型或者接口类型。

当我们将引用型变量应用于Deer对象的引用时，下面的声明是合法的：

```java
Deer d = new Deer();
Animal a = d;
Vegetarian v = d;
Object o = d;
```

所有的引用型变量d,a,v,o都指向堆中相同的Deer对象。

## 虚方法

我们将介绍在Java中，当设计类时，被重写的方法的行为怎样影响多态性。

我们已经讨论了方法的重写，也就是子类能够重写父类的方法。

当子类对象调用重写的方法时，调用的是子类的方法，而不是父类中被重写的方法。

要想调用父类中被重写的方法，则必须使用关键字super。

### Employee.java

```java
public class Employee
{
   private String name;
   private String address;
   private int number;
   public Employee(String name, String address, int number)
   {
      System.out.println("Constructing an Employee");
      this.name = name;
      this.address = address;
      this.number = number;
   }
   public void mailCheck()
   {
      System.out.println("Mailing a check to " + this.name + " " + this.address);
   }
   public String toString()
   {
      return name + " " + address + " " + number;
   }
   public String getName()
   {
      return name;
   }
   public String getAddress()
   {
      return address;
   }
   public void setAddress(String newAddress)
   {
      address = newAddress;
   }
   public int getNumber()
   {
     return number;
   }
}
```

### Salary.java：继承Employee类

```java
public class Salary extends Employee
{
   private double salary; //Annual salary
   public Salary(String name, String address, int number, double
      salary)
   {
       super(name, address, number);
       setSalary(salary);
   }
   public void mailCheck()
   {
       System.out.println("Within mailCheck of Salary class ");
       System.out.println("Mailing check to " + getName()
       + " with salary " + salary);
   }
   public double getSalary()
   {
       return salary;
   }
   public void setSalary(double newSalary)
   {
       if(newSalary >= 0.0)
       {
          salary = newSalary;
       }
   }
   public double computePay()
   {
      System.out.println("Computing salary pay for " + getName());
      return salary/52;
   }
}
```

### VirtualDemo.java

```java
public class VirtualDemo
{
   public static void main(String [] args)
   {
      Salary s = new Salary("Mohd Mohtashim", "Ambehta, UP", 3, 3600.00);
      Employee e = new Salary("John Adams", "Boston, MA", 2, 2400.00);
      System.out.println("Call mailCheck using Salary reference --");
      s.mailCheck();
      System.out.println("\n Call mailCheck using Employee reference--");
      e.mailCheck();
    }
}
```

以上实例编译运行结果如下：

```
Constructing an Employee
Constructing an Employee
Call mailCheck using Salary reference --
Within mailCheck of Salary class
Mailing check to Mohd Mohtashim with salary 3600.0

Call mailCheck using Employee reference--
Within mailCheck of Salary class
Mailing check to John Adams with salary 2400.0
```

例子中，我们实例化了两个Salary对象。一个使用Salary引用s，另一个使用Employee引用。

编译时，编译器检查到`mailCheck()`方法在Salary类中的声明。

在调用`s.mailCheck()`时，Java虚拟机(JVM)调用Salary类的`mailCheck()`方法。

因为e是Employee的引用，所以调用e的`mailCheck()`方法则有完全不同的结果。

当编译器检查`e.mailCheck()`方法时，编译器检查到Employee类中的`mailCheck()`方法。

在编译的时候，编译器使用Employee类中的`mailCheck()`方法验证该语句， 但是在运行的时候，Java虚拟机(JVM)调用的是Salary类中的`mailCheck()`方法。

该行为被称为虚拟方法调用，该方法被称为虚拟方法。

Java中所有的方法都能以这种方式表现，借此，重写的方法能在运行时调用，不管编译的时候源代码中引用变量是什么数据类型。

# 封装

## 简介

在面向对象程式设计方法中，封装（英语：Encapsulation）是指，一种将抽象性函式接口的实作细节部份包装、隐藏起来的方法。

封装可以被认为是一个保护屏障，防止该类的代码和数据被外部类定义的代码随机访问。

要访问该类的代码和数据，必须通过严格的接口控制。

封装最主要的功能在于我们能修改自己的实现代码，而不用修改那些调用我们代码的程序片段。

适当的封装可以让程式码更容易理解与维护，也加强了程式码的安全性。

让我们来看一个java封装类的例子：

### EncapTest.java

```java
public class EncapTest{

   private String name;
   private String idNum;
   private int age;

   public int getAge(){
      return age;
   }

   public String getName(){
      return name;
   }

   public String getIdNum(){
      return idNum;
   }

   public void setAge( int newAge){
      age = newAge;
   }

   public void setName(String newName){
      name = newName;
   }

   public void setIdNum( String newId){
      idNum = newId;
   }
}
```

以上实例中public方法是外部类访问该类成员变量的入口。

通常情况下，这些方法被称为getter和setter方法。

因此，任何要访问类中私有成员变量的类都要通过这些getter和setter方法。

通过如下的例子说明EncapTest类的变量怎样被访问：

### RunEncap.java

```java
public class RunEncap{

   public static void main(String args[]){
      EncapTest encap = new EncapTest();
      encap.setName("James");
      encap.setAge(20);
      encap.setIdNum("12343ms");

      System.out.print("Name : " + encap.getName() + " Age : "+ encap.getAge());
    }
}
```

以上代码编译运行结果如下：

```
Name : James Age : 20
```

