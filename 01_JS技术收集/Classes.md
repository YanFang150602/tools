# 类私有域

类属性在默认情况下是公共的，可以被外部类检测或修改。在[ES2020 实验草案](https://github.com/tc39/proposal-class-fields) 中，增加了定义私有类字段的能力，写法是使用一个#作为前缀。

## 语法

```js
class ClassWithPrivateField {
  #privateField
}

class ClassWithPrivateMethod {
  #privateMethod() { 
    return 'hello world'
 }
}

class ClassWithPrivateStaticField {
  static #PRIVATE_STATIC_FIELD
}
```

## 例子

### 私有静态字段

私有字段可以被类的构造方法（constructor）从内部声明。

静态变量只能被静态方法调用的限制仍然成立。

```js
class ClassWithPrivateStaticField {
  static #PRIVATE_STATIC_FIELD

  static publicStaticMethod() {
    ClassWithPrivateStaticField.#PRIVATE_STATIC_FIELD = 42
    return ClassWithPrivateStaticField.#PRIVATE_STATIC_FIELD
  }
}

assert(ClassWithPrivateStaticField.publicStaticMethod() === 42)
```

在类评估时，私有静态字段被添加到类构造函数中。

私有静态字段有一个来源限制， 只有定义该私有静态字段的类能访问该字段。

这可能会导致：当使用**`this`**时出现意想不到的行为。

```js
class BaseClassWithPrivateStaticField {
  static #PRIVATE_STATIC_FIELD

  static basePublicStaticMethod() {
    this.#PRIVATE_STATIC_FIELD = 42
    return this.#PRIVATE_STATIC_FIELD
  }
}

class SubClass extends BaseClassWithPrivateStaticField { }

assertThrows(() => SubClass.basePublicStaticMethod(), TypeError)
```

### 私有实例字段

私有实例字段使用 **＃名称**（发音为“哈希名称”）声明，这些名称以 `#`开头。 `#`是名称本身的一部分， 声明和访问时也需要加上。

封装由语言强制执行。 从作用域之外引用＃名称是语法错误。

```js
class ClassWithPrivateField {
  #privateField
  
  constructor() {
    this.#privateField = 42
    this.#randomField = 666 // Syntax error
  }
}

const instance = new ClassWithPrivateField()
instance.#privateField === 42 // Syntax error
```

### 私有方法

#### 私有静态方法

像它们的公有等价方法一样，私有静态方法是在类本身而非类的实例上调用的。 像私有静态字段一样，只能从类声明内部访问它们。

私有静态方法可能是生成器方法，异步方法和异步生成器方法。

```js
class ClassWithPrivateStaticMethod {
    static #privateStaticMethod() {
        return 42
    }

    static publicStaticMethod1() {
        return ClassWithPrivateStaticMethod.#privateStaticMethod();
    }

    static publicStaticMethod2() {
        return this.#privateStaticMethod();
    }
}

assert(ClassWithPrivateStaticField.publicStaticMethod1() === 42);
assert(ClassWithPrivateStaticField.publicStaticMethod2() === 42);
```

使用**`this`**可能会导致意想不到的行为（因为`this`绑定规则适用）。

```js
class Base {
    static #privateStaticMethod() {
        return 42;
    }
    static publicStaticMethod1() {
        return Base.#privateStaticMethod();
    }
    static publicStaticMethod2() {
        return this.#privateStaticMethod();
    }
}

class Derived extends Base {}

console.log(Derived.publicStaticMethod1()); // 42
console.log(Derived.publicStaticMethod2()); // TypeError
```

#### 私有实例方法

私有实例方法是类实例上可用的方法，它们的访问方式与私有实例字段相同。

```js
class ClassWithPrivateMethod {
  #privateMethod() {
    return 'hello world'
  }

  getPrivateMessage() {
      return this.#privateMethod()
  }
}

const instance = new ClassWithPrivateMethod()
console.log(instance.getPrivateMessage())
// expected output: "hello worl​d"
```

私有实例方法可以是生成器方法，异步方法或异步生成器方法。 私有的getter和setter也是可能的：

```js
class ClassWithPrivateAccessor {
  #message

  get #decoratedMessage() {
    return `✨${this.#message}✨`
  }
  set #decoratedMessage(msg) {
    this.#message = msg
  }

  constructor() {
    this.#decoratedMessage = 'hello world'
    console.log(this.#decoratedMessage)
  }
}

new ClassWithPrivateAccessor();
// expected output: "✨hello worl​d✨"
```

# 类元素

## 公有字段

静态公有字段和实例公有字段都是可编辑的，可遍历的，可配置的。它们本身不同于私有对应值（private counterparts）的是，它们参与原型的继承。

### 静态公有字段

静态公有字段在你想要创建一个只在每个类里面只存在一份，而不会存在于你创建的每个类的实例中的属性时可以用到。你可以用它存放缓存数据、固定结构数据或者其他你不想在所有实例都复制一份的数据。

静态公有字段是使用关键字 `static` 声明的。我们在声明一个类的时候，使用[Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)方法将静态公有字段添加到类的构造函数中。在类被声明之后，可以从类的构造函数访问静态公有字段。

```js
class ClassWithStaticField {
  static staticField = 'static field';
}

console.log(ClassWithStaticField.staticField);
// 预期输出值: "static field"​
```

没有设定初始化程序的字段将默认被初始化为`undefined`。

```js
class ClassWithStaticField {
  static staticField;
}

console.assert(ClassWithStaticField.hasOwnProperty('staticField'));
console.log(ClassWithStaticField.staticField);
// 预期输出值: "undefined"
```

静态公有字段不会在子类里重复初始化，但我们可以通过原型链访问它们。

```js
class ClassWithStaticField {
  static baseStaticField = 'base field';
}

class SubClassWithStaticField extends ClassWithStaticField {
  static subStaticField = 'sub class field';
}

console.log(SubClassWithStaticField.subStaticField);
// 预期输出值: "sub class field"

console.log(SubClassWithStaticField.baseStaticField);
// 预期输出值: "base field"
```

当初始化字段时，`this`指向的是类的构造函数。你可以通过名字引用构造函数，并使用`super`获取到存在的超类构造函数。

```js
class ClassWithStaticField {
  static baseStaticField = 'base static field';
  static anotherBaseStaticField = this.baseStaticField;

  static baseStaticMethod() { return 'base static method output'; }
}

class SubClassWithStaticField extends ClassWithStaticField {
  static subStaticField = super.baseStaticMethod();
}

console.log(ClassWithStaticField.anotherBaseStaticField);
// 预期输出值: "base static field"

console.log(SubClassWithStaticField.subStaticField);
// 预期输出值: "base static method output"
```

### 公有实例字段

公有实例字段存在于类的每一个实例中。通过声明一个公有字段，我们可以确保该字段一直存在，而类的定义则会更加像是自我描述。

公有实例字段可以在基类的构造过程中（构造函数主体运行前）使用[Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)添加，也可以在子类构造函数中的`super()`函数结束后添加。

```js
class ClassWithInstanceField {
  instanceField = 'instance field';
}

const instance = new ClassWithInstanceField();
console.log(instance.instanceField);
// 预期输出值: "instance field"
```

没有设定初始化程序的字段将默认被初始化为`undefined`。

```js
class ClassWithInstanceField {
  instanceField;
}

const instance = new ClassWithInstanceField();
console.assert(instance.hasOwnProperty('instanceField'));
console.log(instance.instanceField);
// 预期输出值: "undefined"
```

和属性（properties）一样，字段名可以由计算得出。

```js
const PREFIX = 'prefix';

class ClassWithComputedFieldName {
    [`${PREFIX}Field`] = 'prefixed field';
}

const instance = new ClassWithComputedFieldName();
console.log(instance.prefixField);
// 预期输出值: "prefixed field"
```

当初始化字段时，`this`指向的是类正在构造中的实例。和公共实例方法相同的是：你可以在子类中使用`super`来访问超类的原型。

```js
class ClassWithInstanceField {
  baseInstanceField = 'base field';
  anotherBaseInstanceField = this.baseInstanceField;
  baseInstanceMethod() { return 'base method output'; }
}

class SubClassWithInstanceField extends ClassWithInstanceField {
  subInstanceField = super.baseInstanceMethod();
}

const base = new ClassWithInstanceField();
const sub = new SubClassWithInstanceField();

console.log(base.anotherBaseInstanceField);
// 预期输出值: "base field"

console.log(sub.subInstanceField);
// 预期输出值: "base method output"
```

## 公共方法

### 静态公共方法

关键字`static`将为一个类定义一个静态方法。静态方法不会在实例中被调用，而只会被类本身调用。它们经常是工具函数，比如用来创建或者复制对象。

静态方法是在类的赋值阶段用[Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)方法添加到类中的。静态方法是可编辑的、不可遍历的和可配置的。

### 公共实例方法

正如其名，公共实例方法是可以在类的实例中使用的。

```js
class ClassWithPublicInstanceMethod {
  publicMethod() {
    return 'hello world';
  }
}

const instance = new ClassWithPublicInstanceMethod();
console.log(instance.publicMethod());
// 预期输出值: "hello worl​d"
```

公共实例方法是在类的赋值阶段用[Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)方法添加到类中的。静态方法是可编辑的、不可遍历的和可配置的。

你可以使用生成器（generator）、异步和异步生成器方法。

```js
class ClassWithFancyMethods {
  *generatorMethod() { }
  async asyncMethod() { }
  async *asyncGeneratorMethod() { }
}
```

在实例的方法中，`this`指向的是实例本身，你可以使用`super`访问到超类的原型，由此你可以调用超类的方法。

```js
class BaseClass {
  msg = 'hello world';
  basePublicMethod() {
    return this.msg;
  }
}

class SubClass extends BaseClass {
  subPublicMethod() {
    return super.basePublicMethod();
  }
}

const instance = new SubClass();
console.log(instance.subPublicMethod());
// 预期输出值: "hello world"
```

`getter`和`setter`是和类的属性绑定的特殊方法，分别会在其绑定的属性被取值、赋值时调用。使用[get](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get)和[set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set)句法定义实例的公共`getter`和`setter`。

```js
class ClassWithGetSet {
  #msg = 'hello world';
  get msg() {
    return this.#msg;
  }
  set msg(x) {
    this.#msg = `hello ${x}`;
  }
}

const instance = new ClassWithGetSet();
console.log(instance.msg);
// expected output: "hello worl​d"

instance.msg = 'cake';
console.log(instance.msg);
// 预期输出值: "hello cake"
```

## 私有字段

### 静态私有字段

静态私有字段可以在类声明本身内部的构造函数上被访问到。

静态变量只能被静态方法访问的限制依然存在。

```js
class ClassWithPrivateStaticField {
  static #PRIVATE_STATIC_FIELD;

  static publicStaticMethod() {
    ClassWithPrivateStaticField.#PRIVATE_STATIC_FIELD = 42;
    return ClassWithPrivateStaticField.#PRIVATE_STATIC_FIELD;
  }
}

assert(ClassWithPrivateStaticField.publicStaticMethod() === 42);
```

静态私有字段是在类赋值的时候被添加到类构造函数中的。

静态私有字段有一个来源限制。只有定义静态私有字段的类可以访问该字段。这在使用**`this`**时，可能会导致不符合预期的行为。

```js
class BaseClassWithPrivateStaticField {
  static #PRIVATE_STATIC_FIELD;

  static basePublicStaticMethod() {
    this.#PRIVATE_STATIC_FIELD = 42;
    return this.#PRIVATE_STATIC_FIELD;
  }
}

class SubClass extends BaseClassWithPrivateStaticField { }

assertThrows(() => SubClass.basePublicStaticMethod(), TypeError);
```

### 私有实例字段

私有实例字段是通过**# names**句型（读作“哈希名称”）声明的，即为识别符加一个前缀“#”。“#”是名称的一部分，也用于访问和声明。

封装是语言强制实施的。引用不在作用域内的 # names 是语法错误。

```js
class ClassWithPrivateField {
  #privateField;
  
  constructor() {
    this.#privateField = 42;
    this.#randomField = 666; # Syntax error
  }
}

const instance = new ClassWithPrivateField();
instance.#privateField === 42; // Syntax error
```

## 私有方法

### 静态私有方法

和静态公共方法一样，静态私有方法也是在类里面而非实例中调用的。和静态私有字段一样，它们也只能在类的声明中访问。

你可以使用生成器（generator）、异步和异步生成器方法。

静态私有方法可以是生成器、异步或者异步生成器函数。

```js
class ClassWithPrivateStaticMethod {
    static #privateStaticMethod() {
        return 42;
    }

    static publicStaticMethod() {
        return ClassWithPrivateStaticMethod.#privateStaticMethod();
    }
}

assert(ClassWithPrivateStaticMethod.publicStaticMethod() === 42);
```

### 私有实例方法

私有实例方法在类的实例中可用，它的访问方式的限制和私有实例字段相同。

```js
class ClassWithPrivateMethod {
  #privateMethod() {
    return 'hello world';
  }

  getPrivateMessage() {
      return #privateMethod();
  }
}

const instance = new ClassWithPrivateMethod();
console.log(instance.getPrivateMessage());
// 预期输出值: "hello worl​d"
```

私有实例方法可以是生成器、异步或者异步生成器函数。私有`getter`和`setter`也是可能的：

```js
class ClassWithPrivateAccessor {
  #message;

  get #decoratedMessage() {
    return `✨${this.#message}✨`;
  }
  set #decoratedMessage(msg) {
    this.#message = msg;
  }

  constructor() {
    this.#decoratedMessage = 'hello world';
    console.log(this.#decoratedMessage);
  }
}

new ClassWithPrivateAccessor();
// 预期输出值: "✨hello world✨"
```

# 构造方法

**`constructor `**是一种用于创建和初始化`class`创建的对象的特殊方法。

## 语法

```js
constructor([arguments]) { ... }
```

## 描述

在一个类中只能有一个名为 “constructor” 的特殊方法。 一个类中出现多次构造函数 (`constructor)`方法将会抛出一个 [`SyntaxError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError) 错误。

在一个构造方法中可以使用`super`关键字来调用一个父类的构造方法。

如果没有显式指定构造方法，则会添加默认的 constructor 方法。

如果不指定一个构造函数(constructor)方法, 则使用一个默认的构造函数(constructor)。

## 示例

### 使用`constructor`方法

以下代码片段来自 [类的实例](https://github.com/GoogleChrome/samples/blob/gh-pages/classes-es6/index.html)（[在线 demo](https://googlechrome.github.io/samples/classes-es6/index.html)）。

```js
class Square extends Polygon {
    constructor(length) {
        // 在这里, 它调用了父类的构造函数, 并将 lengths 提供给 Polygon 的"width"和"height"
        super(length, length);
        // 注意: 在派生类中, 必须先调用 super() 才能使用 "this"。
        // 忽略这个，将会导致一个引用错误。
        this.name = 'Square';
    }
    get area() {
        return this.height * this.width;
    }
    set area(value) {
        // 注意：不可使用 this.area = value
        // 否则会导致循环call setter方法导致爆栈
        this._area = value;
    }
}
```

### 另一个例子

看看这个代码片段

```js
class Polygon {
    constructor() {
        this.name = "Polygon";
    }
}

class Square extends Polygon {
    constructor() {
        super();
    }
}

class Rectangle {}

Object.setPrototypeOf(Square.prototype, Rectangle.prototype);

console.log(Object.getPrototypeOf(Square.prototype) === Polygon.prototype); //false
console.log(Object.getPrototypeOf(Square.prototype) === Rectangle.prototype); //true

let newInstance = new Square();
console.log(newInstance.name); //Polygon
```

这里，**Square**类的原型被改变，但是在正在创建一个新的正方形实例时，仍然调用前一个基类**Polygon**的构造函数。

### 默认构造方法

如前所述，如果不指定构造方法，则使用默认构造函数。对于基类，默认构造函数是：

```
constructor() {}
```

对于派生类，默认构造函数是：

```js
constructor(...args) {
  super(...args);
}
```

# extends

**`extends`**关键字用于[类声明](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/class)或者[类表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/class)中，以创建一个类，该类是另一个类的子类。

## 语法

```js
class ChildClass extends ParentClass { ... }
```

## 描述

`extends`关键字用来创建一个普通类或者内建对象的子类。

继承的`.prototype`必须是一个[`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object) 或者 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null)。

## 示例

### 使用 `extends`

第一个例子是根据名为 `Polygon` 类创建一个名为`Square`的类。这个例子是从这个[在线演示](https://googlechrome.github.io/samples/classes-es6/index.html)中提取出来的。

```js
class Square extends Polygon {
  constructor(length) {
    // Here, it calls the parent class' constructor with lengths
    // provided for the Polygon's width and height
    super(length, length);
    // Note: In derived classes, super() must be called before you
    // can use 'this'. Leaving this out will cause a reference error.
    this.name = 'Square';
  }

  get area() {
    return this.height * this.width;
  }
}
```

### 使用 `extends`与内置对象

这个示例继承了内置的[`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Date)对象。这个例子是从这个[在线演示](https://googlechrome.github.io/samples/classes-es6/index.html)中提取出来的。

```js
class myDate extends Date {
  constructor() {
    super();
  }

  getFormattedDate() {
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return this.getDate() + "-" + months[this.getMonth()] + "-" + this.getFullYear();
  }
}
```

### 扩展 `null`

可以像扩展普通类一样扩展[`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/null)，但是新对象的原型将不会继承 [`Object.prototype`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype)。

```js
class nullExtends extends null {
  constructor() {}
}

Object.getPrototypeOf(nullExtends); // Function.prototype
Object.getPrototypeOf(nullExtends.prototype) // null

new nullExtends(); //ReferenceError: this is not defined
```

# static

类（class）通过 **static** 关键字定义静态方法。不能在类的实例上调用静态方法，而应该通过类本身调用。这些通常是实用程序方法，例如创建或克隆对象的功能。

## 语法

```
static methodName() { ... }
```

## 描述

静态方法调用直接在类上进行，不能在类的实例上调用。静态方法通常用于创建实用程序函数。

## 调用静态方法

### 从另一个静态方法

静态方法调用同一个类中的其他静态方法，可使用 `this `关键字。

```js
class StaticMethodCall {
    static staticMethod() {
        return 'Static method has been called';
    }
    static anotherStaticMethod() {
        return this.staticMethod() + ' from another static method';
    }
}
StaticMethodCall.staticMethod();
// 'Static method has been called'

StaticMethodCall.anotherStaticMethod();
// 'Static method has been called from another static method'
```

### 从类的构造函数和其他方法

非静态方法中，不能直接使用 `this` 关键字来访问静态方法。而是要用类名来调用：`CLASSNAME.STATIC_METHOD_NAME()` ，或者用构造函数的属性来调用该方法： `this.constructor.STATIC_METHOD_NAME()`.

```js
class StaticMethodCall {
    constructor() {
        console.log(StaticMethodCall.staticMethod());
        // 'static method has been called.'
        console.log(this.constructor.staticMethod());
        // 'static method has been called.'
    }
    static staticMethod() {
        return 'static method has been called.';
    }
}
```

## 示例

下面的例子说明了这几点：

1. 静态方法如何在类上实现。
2. 具有静态成员的类，可以被子类化 。
3. 什么情况下静态方法可以调用，什么情况下不能调用。

```js
class Tripple {
  static tripple(n = 1) {
    return n * 3;
  }
}


class BiggerTripple extends Tripple {
  static tripple(n) {
    return super.tripple(n) * super.tripple(n);
  }
}


console.log(Tripple.tripple());// 3
console.log(Tripple.tripple(6));// 18

let tp = new Tripple();

console.log(BiggerTripple.tripple(3));// 81（不会受父类实例化的影响）
console.log(tp.tripple());// 'tp.tripple 不是一个函数'.
```

