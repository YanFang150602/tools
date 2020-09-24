[angularjs 一篇文章看懂自定义指令directive](https://www.cnblogs.com/echolun/p/11564103.html)

#  介绍

在angularjs开发中，指令的使用是无处无在的，我们习惯使用指令来拓展HTML；那么如何理解指令呢，你可以把它理解成在DOM元素上运行的函数，它可以帮助我们拓展DOM元素的功能。比如最常用`ng-click`可以让一个元素能监听`click`事件，这里你可能就有疑问了，同样都是监听为什么不直接使用`click`事件呢，angular提供的事件指令与传统指令有什么区别？我们来看一个例子：

```html
<body ng-controller="myCtrl as vm">
    <div class="demo">
        <p ng-bind="vm.name"></p>
        <button ng-click="vm.changeA()" class="col1">buttonA</button>
        <button class="btnB col2" onclick="a()">buttonB</button>
    </div>
</body>
```

```js
angular.module('myApp', [])
    .controller('myCtrl', function () {
        let vm = this;
        vm.name = '听风是风';

        //通过angularjs指令绑定事件
        vm.changeA = function () {
            vm.name = 'echo';
        };

        //使用原生的js绑定方式
        let btn = document.querySelector(".btnB");
        btn.onclick = function () {
            vm.name = '时间跳跃';
        };
    });
```

分别使用angularjs提供的事件指令与传统事件来通过按钮点击，修改文本的内容。

很奇怪，只有`ng-click`成功修改了文本内容，传统的事件并不能做到这一点，怎么解决呢？其实我们手动添加`$apply`方法就可以了，代码如下：

```js
let btn = document.querySelector(".btnB");
btn.onclick = function () {
    $scope.$apply(function () {
        vm.name = '时间跳跃';
    });
};
```

我们从这个例子可以知道，**当我们使用angularjs指令时，`ng-click`除了事件响应还做了脏检测，当数据发生变化通知视图重新渲染。**准确来说，angular会将执行行为放入到`$apply`中进行调用，如果数据发生了变化，`$apply`会通知`$digest`循环，从而调用所有 `watcher`，从而达到视图更新的目的。（说了这么多，只是为了说明官方指令与传统事件的区别）。

angularjs官方提供的指令繁多，例如事件类`ng-click`，`ng-change`，样式类`ng-class`，`ng-style`等等。

# 创建一个简单的指令

在angularjs还未更新出`component`时，我们一般会使用`directive`开发自定义指令或者组件，也正因为`directive`功能的强大，导致指令与组件概念含糊不清，所以才有后面用于做组件的`component`。

`directive`是直接用于操作`dom`的函数，它甚至能直接改变`dom`的结构，我们从一个最简单的`directive`开始：

```html
<body ng-controller="MainCtrl as vm">
    <echo></echo>
</body>
```

```js
angular.module('myApp', [])
    .controller('MainCtrl', function () {
    })
    .directive('echo',function(){
        return{
            restrict:'E',
            replace:true,
            template:'<div>你好，我是听风是风。</div>'
        }     
    });
```

我们已经实现了一个非常简单的指令(组件)，现在我们可以在页面中尽情复用它。

当然angularjs自定义指令其实拥有很多灵活的属性，用于完成更复杂的功能，一个完整的`directive`模板结构应该是这样，属性看着有点多，没关系，接下来我们针对属性一一细说。

```js
angular.module('myApp', []).directive('directiveName', function () {
    return {
        restrict: String,
        priority: Number,
        terminal: Boolean,
        template: ' String or Template Function',
        templateUrl: String,
        replace: 'Boolean or String',
        scope: 'Boolean or Object',
        transclude: Boolean,
        controller: function (scope, element, attrs, transclude, otherInjectables) {},
        controllerAs: String,
        require: String,
        link: function (scope, iElement, iAttrs) {},
        compile: function (tElement, tAttrs, transclude) {
            return {
                pre: function (scope, iElement, iAttrs, controller) {},
                post: function (scope, iElement, iAttrs, controller) {}
            };
            //或 return function postLink() {} 
        }
    };
});
```

#  指令参数详解

## 1.`restrict`  /rɪˈstrɪkt/ 限制；约束；

`restrict`表示指令在DOM中能以哪种形式被声明，是一个可选值，可选值范围：

E 元素

A 属性

C 类名

M 注释

四个值，如果不使用此属性则默认值为EA，以下四种表现相同：

```html
<!-- E -->
<echo></echo> 
<!-- A -->
<div echo></div>
<!-- C -->
<div class="echo"></div>
<!-- M -->
<!-- directive:echo -->
```

`restrict`的值可单个使用或者多个组合使用，比如`restrict:'E'`即表示只允许使用元素来声明组件，而`restrict:'EACM'`则表示你可以使用四种方式的任一一种来声明组件。

## 2.`priority` /praɪˈɒrəti/ 优先权

`priority`值为数字，表示指令的优先级，若一个`DOM`上存在多个指令时，优先级高的指令先执行，注意此属性只在指令作为`DOM`属性时起作用，我们来看个例子：

```html
<div echo demo></div>
```

```js
angular.module('myApp', [])
    .controller('MainCtrl', function () {})
    .directive('echo', function () {
        return {
            restrict: 'EACM',
            priority: 10,
            controller:function(){
                console.log('我的优先级是10')
            }
        }
    })
    .directive('demo', function () {
        return {
            restrict: 'EACM',
            priority: 20,
            controller:function(){
                console.log('我的优先级是20')
            }
        }
    })
```

可以看到优先级更好的指令优先执行，若两个指令优先级相同时，声明在前的指令会先执行，`ngRepeat`的优先级为1000，它是所有内置指令中优先级最高的指令。大多数情况下我们会忽略此属性，默认即为0；

## 3.`terminal` /ˈtɜːmɪnl/

`terminal`值为布尔值，用于决定优先级低于自己的指令是否还执行，例如上方例子中，我们为`demo`指令添加`terminal:true`，那么`echo`指令不会执行。

## 4.`template` /ˈtempleɪt/ 模板

`template`的值是一段`HTML`文本或一个函数，`HTML`文本的例子上文已有展示，这里简单说下值为函数的情况，我们来看个例子：

```html
<div echo name="听风是风"></div>
```

```js
angular.module('myApp', [])
    .controller('MainCtrl', function () {})
    .directive('echo', function () {
        return {
            restrict: 'EACM',
            template: function (tElement, tAttrs) {
                console.log(tElement,tAttrs);
                return '<div>你好，我是' + tAttrs.name + '</div>'
            }
        }
    })
```

`template`函数接受两个参数，`tElement`和`tAttrs`，这里我们分别输出两个属性，可以看到`tElement`表示正在使用此指令的`DOM`元素，而`tAttrs`包含了使用此指令`DOM`元素上的所有属性。

所以在上述例子中，我们在`DOM`上添加了一个`name`属性，而在函数中我们通过`tAttrs.name`访问了此属性的值。

由于`templateUrl`相对`template`对于模板的处理更优雅，所以一般不会使用`template`。

## 5.`templateUrl` 模板路径

相对`template`直接将模板代码写在指令中，`templateUrl`推荐将模板代码另起文件保存，而这里保存对文件路径的引用；当然`templateUrl`同样支持函数，用法与`template`相同就我们来看一个简单的例子：

```js
angular.module('myApp', [])
    .controller('MainCtrl', function () {})
    .directive('echo', function () {
        return {
            restrict: 'EACM',
            templateUrl: 'template/echo-template.html'
        }
    })
```

```html
<!-- template/echo-template.html -->
<div>
	<span>我是听风就是雨</sapn>
</div>
```

特别注意，在使用`template`与`templateUrl`的模板文件时，如果你使用了`replace:true`属性(后面会介绍)，且模板代码`DOM`结构有多层，请记住使用一个父级元素包裹你所有`DOM`结构，否则会报错，因为angularjs模板只支持拥有一个根元素。

正确：

```html
<div>
    <span>我是听风是风</span>
    <span>好好学习天天向上</span>
</div>
```

错误：

```html
<span>我是听风是风</span>
<span>好好学习天天向上</span>
```

其次，在使用`templateUrl`时，需要在本地启动服务器来运行你的angular项目，否则在加载模板时会报错。如果你不知道怎么搭建本地服务，推荐npm 中的 live-server，使用非常简单，详情请百度。

## 6.`replace` /rɪˈpleɪs/ 替换

`replace`值为布尔值，用于决定指令模板是否替换声明指令的`DOM`元素，默认为`false`，我们来看两个简单的例子，首先指令作为元素：

```html
<echo></echo>
```

值为`false`：

```html
<echo>
	<div>
        <span>我是听风就是雨</sapn>
    </div>
<echo>
```

值为true：

```html
<div>
	<span>我是听风就是雨</sapn>
</div>
```

可以看到当为true时，echo元素直接被全部替换。

我们再来看看指令作为属性：

```html
<div echo>
    <span>欢迎来到听风是风的博客</span>
</div>
```

值为false：

```html
<div echo>
    <div>
        <span>听风就是雨</span>
    </div>
</div>
```

值为true：

```html
<div echo>
    <span>我是听风就是雨</sapn>
</div>
```

可以看到，当指令作为属性时，`replace`值为`false`只替换声明指令`DOM`的子元素为模板元素，当值为`true`时，整个元素都被替换成模板元素，同时还保留了属性`echo`。

## 7.`scope` [skəʊp] 作用域

`scope`属性用于决定指令作用域与父级作用域的关系，可选值有布尔值或者一个对象，默认为`false`，我们一个个介绍。

当 `scope:flase` 时，表示指令不创建额外的作用域，默认继承使用父级作用域，所以指令中能正常使用和修改父级中所有变量和方法，我们来看个简单的例子：

```html
<body ng-controller="myCtrl">
    我是父：<input type="text" ng-model="num">
    <div echo></div>
</body>
```

```js
angular.module('myApp', [])
    .controller('myCtrl', function ($scope) {
        let vm = this;
        $scope.num = 100;

    }).directive('echo', function () {
        return {
            restrict: 'EACM',
            scope: false,
            template: '<div>我是子：<input type="text" ng-model="num"><div>',
            replace: true
        }
    })
```

可以看到指令完全继承了父作用域，共用了一份数据，不管我们修改父或者子指令，这份数据都将同步改变并影响彼此，这就是继承不隔离。

当 `scope:true` 时表示指令创建自己的作用域，但仍然会继承父作用域，说直白点就是，指令自己有的就用自己的，没有的就找父级拿，同一份数据父级能影响指令，但指令却无法反向影响父级，这就是继承但隔离。

```js
angular.module('myApp', [])
    .controller('myCtrl', function ($scope) {
        let vm = this;
        $scope.num = 100;
        $scope.name = 'echo';

    }).directive('echo', function () {
        return {
            restrict: 'EACM',
            scope: true,
            template: '<div>我是子：<input type="text" ng-model="num">我的名字是：{{name}}<div>',
            replace: true,
            controller:function ($scope) {
                $scope.name = '听风是风';
            }
        }
    })
```

可以看到父子作用域都有name属性，但指令中还是使用了自身的属性，其次，指令中没有的num属性继承自父级，当修改父级时子会同步改变，但反之父不会改变，最有趣的是一旦修改了子，父级也无法再影响子。

当 `scope:{}` 时，表示指令创建一个隔离作用域，此时指令作用域不再继承父作用域，两边的数据不再互通。

说到这，你是否会觉得不隔离直接使用父级作用域会更方便，从使用角度来说确实如此。但实际开发中，我们自定义的指令往往会在各种上下文中使用，只有保证指令拥有隔离作用域，不会关心和不影响上下文，这样才能极大提升指令复用性。

那么问题又来了，如果我指令需要使用父级作用域的数据怎么办？有隔离自然有解决方案，这就得使用绑定策略了。angularjs中directive的绑定策略分为三种，`@ = &` ，一一介绍。

`@`通常用于传递字符串，注意，使用`@`传递过去的一定得是字符串，而且`@`属于单向绑定，即父修改能影响指令，但指令修改不会反向影响父，我们来看个例子：

```html
<body ng-controller="myCtrl">
    <input type="text" ng-model="data">
    <echo my-name="{{data}}"></echo>
</body>
```

```js

angular.module('myApp', [])
    .controller('myCtrl', function ($scope) {
        $scope.data = 'echo';
    }).directive('echo', function () {
        return {
            restrict: 'EACM',
            scope: {
                myName:"@"
            },
            template: '<div><input type="text" ng-model="myName"><div>',
            replace: true,
        }
    })
```

注意，我在指令上通过`my-name`属性来传递这个对象，但在指令`scope`中我们接受数据时得改为小驼峰`myName`，其次请留意**`data`两侧加了{{}}包裹**，使用`@`时这是必要的。

`=` 用于传递各类数据，字符串，对象，数组等等，而且是双向绑定，即不管修改父还是子，这份数据都会被修改，我们将上方代码的`@`改为 `=` ，同时做小部分调整，具体效果如下：

```HTML
<body ng-controller="myCtrl">
    <input type="text" ng-model="data">
    <echo my-name="data"></echo>
</body>
```

```JS
angular.module('myApp', [])
    .controller('myCtrl', function ($scope) {
        $scope.data = 'echo'

    }).directive('echo', function () {
        return {
            restrict: 'EACM',
            scope: {
                myName: "="
            },
            template: '<div><input type="text" ng-model="myName"><div>',
            replace: true,
        }
    })
```

请注意，指令上**传递data时两边并未使用{{}}包裹**，这与`@`传值还是有很大区别。

`&` 用于传递父作用域中声明的方法，也就是通过`&`我们可以在指令中直接使用父的方法，我们来看个例子：

```HTML
<body ng-controller="myCtrl">
    <input type="text" ng-model="data">
    <echo my-name="sayName(data)"></echo>
</body>
```

```JS
angular.module('myApp', [])
    .controller('myCtrl', function ($scope) {
        $scope.sayName = function (name) {
            console.log(name);
        };

    }).directive('echo', function () {
        return {
            restrict: 'EACM',
            scope: {
                myName: "&"
            },
            template: '<div><button ng-click="myName()">点我</button><div>',
            replace: true,
        }
    })
```

这有点类似于为指令提供了一个点击的入口，当点击指令时实际执行的是父上面的方法，而这个方法本质上不属于指令，所以我们没办法传递指令的值给这个方法，上方的例子传递的也是父作用域的值。

## 8.`controller` [kənˈtrəʊlə(r)] 控制器

我们都知道angular中控制器是很重要的一部分，我们常常在控制器操作数据通过`scope`作为桥梁以达到更新视图变化的目的，很明显指令拥有自己的`scope`，当然拥有自己的`controller`控制器也不是什么奇怪的事情。

`controller`的值可以是一个函数，或者一个字符串，如果是字符串指令会在应用中查找与字符串同名的构造函数作为自己的控制器函数，我们来看一个非常有趣的例子：

```HTML
<body ng-controller="myCtrl as vm">
    <input type="text" ng-model="name">
    <div echo name="echo" age="26"></div>
</body>
```

```JS
angular.module('myApp', [])
    .controller('myCtrl', function ($scope) {
        let vm = this;
        $scope.name = '听风是风';

    }).directive('echo', function () {
        return {
            restrict: 'EACM',
            scope: {},
            template: '<div><input type="text" ng-model="name"><div>',
            replace: true,
            controller: 'myCtrl'
        }
    })
```

在上述例子中，我们在父作用域声明了一个变量`name`，有趣的是我们并未对指令传递`name`属性，甚至还为指令添加了隔离作用域，但是因为指令的`controller`的值使用了与父作用域控制器相同的名字`myCtrl`，导致指令中也拥有了相同的`controller`，同样拥有了自己`name`属性，但这两个`name`属性互不干扰，毕竟有隔离作用域的存在。

如果控制器的值是一个函数，那就更简单了，还是上面的例子我们只是改改`controller`的值，如下：

```JS
angular.module('myApp', [])
    .controller('myCtrl', function ($scope) {
        let vm = this;
        $scope.name = '听风是风';

    }).directive('echo', function () {
        return {
            restrict: 'EACM',
            scope: {},
            template: '<div><input type="text" ng-model="name"><div>',
            replace: true,
            controller: function ($scope, $element, $attrs) {
                console.log($element);
                console.log($attrs);
                $scope.name = 'echo';
            }
        }
    })
```

当然指令的`controller`的形参不止一个`scope`，一共有`$scope,$element,$attrs,$transclude`四个，我们一一介绍(指令属性还真是多...)。

`$scope`：指令当前的作用域，所有在`scope`上绑定的属性方法，在指令中都可以随意使用，在上面的例子中我们已经有所展示。

`$element`：使用指令的当前元素，比如上面的例子，因为`echo`指令是加在`div`元素上，我们直接输出`$element`属性，可以看到就是`div`.

`$attrs`：使用指令当前元素上的属性，还是上面的例子，同样输出它：

```
Y [div.ng-isolate-scope]
	0: div.ng-isolate-scope
	length: 1
	__proto__: Object(0)
echo.directive.html:24 
w {$attr: {…}, $$element: Y(1), echo: "", name: "echo", age: "26"}
	$$element: Y [div.ng-isolate-scope]
	$attr: {echo: "echo", name: "name", age: "age"}
		age: "26"
		echo: ""
		name: "echo"
	age: "age"
	echo: "echo"
	name: "name
```

`$transclude`：链接函数，用于克隆和操作`DOM`元素，没错，通过此方法我们甚至能在`controller`中操作`dom`，注意，如果要使用此方法得保证`transclude`属性值为`true`，来看个简单的例子：

```html
<body ng-controller="myCtrl">
    <div attr="www.baidu.com" echo>
        点我跳转百度
    </div>
</body>
```

```js
angular.module('myApp', [])
    .controller('myCtrl', function ($scope) {

    }).directive('echo', function () {
        return {
            restrict: 'EACM',
            scope: {
                myName: "&"
            },
            transclude: true,//若想使用$transclude方法请设置为true
            controller: function ($scope, $element, $attrs, $transclude) {
                $transclude(function (clone) {
                    var a = angular.element('<a>');
                    a.attr('href',$attrs.attr);//取得div上的attr属性并设置给a
                    a.text(clone.text());// 通过clone属性可以获取指令嵌入内容，包括文本，元素名等等，已经过JQ封装，这里获取文本并添加给a
                    $element.append(a); // 将a添加到指令所在元素内
                })
            }
        }
    })
```

如果对于angularjs生命周期稍有了解，应该都知道angular会在`compile`阶段编译`dom`，在`link`链接阶段绑定事件，所以官方一般是推荐在`compile`阶段操作`DOM`，而非`controller`内部。

## 9.`transclude`

在上文`controlle`介绍中我们已经知道如果想在`controller`中使用`$transclude`方法必须设置`transclude`为`true`，这里我们来介绍下此属性。

`transclude`的值为布尔值，默认`flase`，我们知道指令的模板总是会替换掉使用指令`DOM`的子元素，看个例子回顾下`replace`属性：

```html
<body ng-controller="myCtrl">
    <div echo>
        <span>我是听风</span>
    </div>
</body>
```

```js
angular.module('myApp', [])
    .controller('myCtrl', function ($scope) {

    }).directive('echo', function () {
        return {
            restrict: 'EA',
            template: '<p>我是echo</p>',
            replace: false,
        }
    })
```

`div`元素使用了`echo`指令，因为`replace`设置为`false`，所以`div`元素会被保留，但`div`的子元素`span`会被替换为指令模板`p`元素：

```html
<div echo>
	<p>我是echo</p>
</div>
```

那如果我想保留`div`的子元素`span`怎么，这里就可以使用`transclude`属性做到这一点，另外`transclude`通常与`ng-transclude`指令一起使用，我们再来看一个例子：

```html
<body ng-controller="myCtrl">
    <div echo>
        <span>我是听风</span>
    </div>
</body>
```

```js
angular.module('myApp', [])
    .controller('myCtrl', function ($scope) {

    }).directive('echo', function () {
        return {
            restrict: 'EA',
            template: '<p>我是echo<span ng-transclude></span></p>',
            replace: false,
            transclude:true
        }
    })
```

可以看到原`div`中的子元素`span`被成功保留加入到了指令模板中添加了`ng-transclude`指令的元素中。

```html
<div echo>
	<p>
		我是echo
		<span ng-transclude>
        	<span class="ng-scope">我是听风</span>
    	</span>
    </p>
</div>
```

## 10.`controllerAs`

`controllerAs`用于设置控制器的别名，我们都知道angularjs在1.2版本之后，对于数据绑定提供了额外一种方式，第一种是绑定在`scope`上，第二种是使用`controller as vm`类似的写法，绑定在`this`上。我们来看个简单的例子：

```html
<body ng-controller="myCtrl as vm">
    <input type="text" ng-model="name1">
    <div>{{name1}}</div>
    <input type="text" ng-model="vm.name2">
    <div>{{vm.name2}}</div>
</body>
```

```js
angular.module('myApp', [])
    .controller('myCtrl', function ($scope) {
        $scope.name1 = 'echo';
        this.name2 = '听风是风';
    })
```

可以看到两种绑定效果完全一致，那么在指令中也有控制器，我们也可以通过`this`来绑定数据，而`controllerAs`定义的字段就是我们在模板上访问数据的前缀：

```html
<body ng-controller="myCtrl">
    <div echo></div>
</body>
```

```js
angular.module('myApp', [])
    .controller('myCtrl', function ($scope) {

    }).directive('echo', function () {
        return {
            restrict: 'EA',
            template: '<p>{{vm.name}}</p>',
            controllerAs:'vm',
            controller:function (){
                this.name = '听风是风！';
            }
        }
    })
```

## 11.`require` [rɪˈkwaɪə(r)] 需求

对于指令开发，`link`函数和`controller`中都可以定义指令需要的属性或方法，但如果这个属性或方法只是本指令使用，你可以定义在指令的`link`函数中，但如果这个属性方法你想在别的指令中也使用，推荐定义在`controller`中。

而`require`属性就是用来引用其它指令的`controller`，`require`的值可以是一个字符串或者一个数组，字符串就是其它指令名字，而数组就是包含多个指令名的数组，我们来看一个简单的例子：

```html
<body ng-controller="myCtrl">
    <div echo1>
        <div echo2></div>
    </div>
</body>
```

```js
angular.module('myApp', [])
    .controller('myCtrl', function ($scope) {

    }).directive('echo1', function () {
        return {
            restrict: 'EA',
            controller: function ($scope) {
                this.sayAge = function () {
                    console.log(26);
                }
            },
        }
    }).directive('echo2', function () {
        return {
            restrict: 'EA',
            scope:{},
            require: '^echo1',
            link:function (scope, elem, attrs, controller) {
                controller.sayAge();//26
            }
        }
    })
```

上述例子中，我们在指令`echo1`的控制器中定义了一个`sayName`方法，注意得绑定`this`上；而在指令`echo2`中，我们`require`了指令`echo1`，这样我们就能通过`link`函数的第四个参数访问到`echo1`的控制器中的所有属性方法（绑在`this`上的），达到方法复用。

有没有注意到`require`的字符串前面有一个 `^` 标志，`require`的值一共可以以四种前缀来修饰，我们分别解释：

### 1.无前缀

如果没有前缀，指令将会在自身所提供的控制器中进行查找，如果没有找到任何控制器（或具有指定名字的指令）就抛出一个错误。我们来看一个简单的例子：

```js
angular.module('myApp', [])
    .controller('myCtrl', function ($scope) {

    }).directive('echo2', function () {
        return {
            restrict: 'EA',
            scope: {},
            require: 'echo2',//require自己
            controller: function () {
                this.sayName = function () {
                    console.log('听风是风');
                }
            },
            link: function (scope, elem, attrs, controller) {
                controller.sayName() //听风是风
            }
        }
    })
```

这个例子中我们让指令`require`自己，从而让`link`函数中能访问自己`controller`中的方法。

### 2.^

如果添加了`^`前缀，指令会在自身以及父级指令链中查找`require`参数所指定的指令的控制器，如果没找到报错。

### 3.?

同样是在当前指令中找，如果没找到会将`null`传给`link`函数的第四个参数。与不加前缀的区别是提供`null`从而不报错。

### 4.?^

`?`与`^`的组合，从当前找，如果没找到去上层找，如果没找到就提供`null`。

### 5.^^

Angular 1.5.6版本之后新增，表示跳过自身直接从父级开始找，找不到报错。

## 12.link 链接函数

我们在前面介绍其它属性时已经有粗略提及`link`函数了，在`link`函数中我们也能像在`controller`中一样为模板绑定事件，更新视图等。看个简单的例子：

```js
angular.module('myApp', [])
    .controller('myCtrl', function ($scope) {
    }).directive('echo2', function () {
        return {
            restrict: 'EA',
            scope: {},
            template:'<div ng-click="vm.sayName()">点我输出{{name}}</div>',
            controllerAs:'vm',
            controller: function () {
                this.sayName = function () {
                    console.log('听风是风');
                }
            },
            link: function (scope, elem, attrs, controller) {
                scope.name = '听风是风';
            }
        }
    })
```

`link`函数拥有四个参数，`scope`表示指令的作用域，在`scope`上绑定的数据在模板上都能直接访问使用。`elem`表示当前使用指令的`DOM`元素，`attrs`表示当前使用指令`DOM`元素上的属性，这三点与前面介绍指令`controller`参数一致。第四个参数`controller`表示指令中`require`的指令的`controller`，前面已经有例子展示，注意，如果指令没有`require`其它指令，那么第四个参数就是指令自身的作用域，看个例子：

```js
.directive('echo1', function () {
    return {
        restrict: 'EACM',
        replace: true,
        controller: function ($scope) {
            $scope.name = 'echo';
            this.name1 = 'echo1';
        },
        link: function (scope, ele, att, ctrl) {
            console.log(ctrl);
            console.log(scope.name); // echo
            console.log(ctrl.name1); // echo1
        }
    }
})
```

那么现在我们知道了，在`link`里面`scope`能直接访问自身`controller`中`scope`的属性，而`this`上的属性，同样能通过第四个参数访问，前期是没`require`其它指令。

 指令的控制器`controller`和`link`函数可以进行互换。控制器主要是用来提供可在指令间复用的行为，但链接函数只能在当前内部指令中定义行为，且无法在指令间复用。简单点说`link`函数可以将指令互相隔离开来，而`controller`则定义可复用的行为。

13.compile 编译函数

如果你想在指令模板编译之前操作`DOM`，那么`compile`函数将会起作用，但出于安全问题一般不推荐这么做。同样不推荐在`compile`中进行`DOM`方法绑定与数据监听，这些行为最好都交给`link`或者`controller`来完成。

其次`compile`和`link`互斥，如果你在一个指令同时使用了`compile`和`link`，那么`link`函数不会执行。

# 总结

总结一个星期，导致文章篇幅有点长，耗时久一方面是知识点确实多，其次是对于指令我也有很多地方需要重新细化理解，这篇文章确实算是系统学习的一个过程。

在文章结尾我只是粗略提及了`link`与`compile`函数，对于angularjs的高级用法，理解这两兄弟由其重要，所以我打算另起一篇文章专门用来介绍`link`，`compile`与`controller`的区别，顺带介绍angularjs的生命周期。

使用指令或组件一定离不开生命周期钩子函数，关于钩子函数的介绍，我也会另起一篇文章，这两篇文章都会在一周内完成，也算是给自己一个小目标。

那么本文就写到这了。

如果你好奇`controller`，`link`，`compile`有何区别，`preLink`与`postLink`又有何不同，以及它们的执行先后感兴趣，欢迎阅读博主 [angularjs link compile与controller的区别详解，了解angular生命周期](https://www.cnblogs.com/echolun/p/11674869.html) 这篇博客，对你一定有所帮助。

如果你对于`directive`的好兄弟`component`有兴趣，可以阅读博主这篇文章 [一篇文章看懂angularjs component组件](https://www.cnblogs.com/echolun/p/11804520.html)

如果你对于`component`与`directive`使用有所混淆，可以阅读博主这篇文章 [angularjs中directive指令与component组件有什么区别？](https://www.cnblogs.com/echolun/p/11804515.html)
