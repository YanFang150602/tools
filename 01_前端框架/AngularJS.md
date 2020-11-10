

# AngularJS启动

## 自动

`html`中含有`ng-app`内置指令时，在angular.js加载完后，会自动启动

## 手动

`angular.bootstrap(document, ['module.name'];)`

# AngularJS绑定JQuery

`angularjs.js`里会判断是否有导入`JQuery`，如果有导入，会将`JQuery`赋值给`angular.element`，否则使用`angularjs`里自带的`JQlite`

# `$scope.$apply()`

修改` $scope`（作用域）里的数据时，为了确保数据同步到了`angular context`中，所以经常会在后面加上` $scope.$apply()`

但是有时候会发现加上这句后，在控制台会报错：

` $apply already in progress `
` $digest already in progress` 

## 使用`$apply()`控制台报错

因为` angularjs `内部已经侦听到了修改并已经开始执行` $apply`,`$digest`函数，当我们强制执行`$apply`时会跟内部的执行过程冲突，所以报错!

## 正确使用`$apply`

这里有一条黄金法则：当我们需要在一个新的执行序列(代码片段)中运行代码时才真正需要用到它，而且当且仅当这个新的执行序列不是被`angularjs`的库的方法创建的，这个时候我们需要将代码用`$scope.apply()`包起来。

## 使用场景举例

### `setTimeout`

```html
<!doctype html>
<html>
<head>
  <title>Scopes Example</title>
  <script src="../lib/angular.js"></script>
</head>
<body>
  <div ng-app="myApp">
    <div ng-controller="MyController">My favorite childhood movie:{{movie}} </div>
  </div>
  <script>
    var module = angular.module("myApp", []);
    module.controller("MyController", ['$scope', function($scope) {
        $scope.movie = "Duck Tails";
        /* 此处的setTimeout运行后，2s后页面上并没有打印Hello Kitty的信息；
        setTimeout(function(){
            $scope.movie = "Hello Kitty";
        },2000);
        */
        setTimeout(function(){
            $scope.$apply(function(){
              $scope.movie = "Hello Kitty";
            });      
        },2000);
    }]);
  </script>
</body>
</html>
```

### 非angularjs内置指令进行操作

```html
<!doctype html>
<html>
<head>
  <title>Scopes Example</title>
  <script src="../lib/angular.js"></script>
</head>
<body>
  <div ng-app="myApp" ng-controller="MainCtrl">
     <clickable foo="foo" bar="bar" ng-click="changeValue()"></clickable>
     <clickable id="id2" foo="foo" bar="bar"></clickable>
  </div>
<script>
  var app = angular.module("myApp", []);
  app.directive('clickable', function() {
    return {
      restrict: "E",
      scope: {
        foo: '=',
        bar: '='
      },
      template: `<ul style="background-color: lightblue">
                  <li></li>
                  <li></li>
                 </ul>`,
      link: function(scope, element, attrs) {
        // 此处使用jquery进行事件绑定
      	element.bind('click', function() {
          scope.foo++;
          scope.bar++;
          // 此处使用jquery进行事件绑定，若触发，需要使用$apply()
          scope.$apply();
        });
      }
    }
  });
  app.controller('MainCtrl', function($scope) {
    $scope.foo = 0;
    $scope.bar = 0;
    $scope.changeValue = function(){
      $scope.foo++;
      $scope.bar++;
      // 此处使用angularjs的内置指令ng-click触发，不需要 $scope.$apply();
    }
  });
</script>
</body>
</html>
```

# `$scope.$watch()`

`$watch`是一个`scope`函数，用于监听模型变化，当你的模型部分发生变化时它会通知你。

```js
 $watch(watchExpression, listener, objectEquality);
```

每个参数的说明如下：

1. `watchExpression`：监听的对象，它可以是一个angular表达式如`name`,或函数如`function(){return $scope.name}`。
2. `listener`：当`watchExpression`变化时会被调用的函数或者表达式,它接收3个参数：`newValue`(新值), `oldValue`(旧值), `scope`(作用域的引用)
3. `objectEquality`：是否深度监听，如果设置为`true`,它告诉Angular检查所监控的对象中每一个属性的变化. 如果你希望监控数组的个别元素或者对象的属性而不是一个普通的值, 那么你应该使用它

 监测一个属性的变化：

```js
$scope.name = 'hello';

var watch = $scope.$watch('name',function(newValue,oldValue, scope){
        console.log(newValue);
        console.log(oldValue);
});

$timeout(function(){
        $scope.name = "world";
},1000);
```

监测多个属性：

```html
<body ng-app="app" ng-controller="first">
        <button ng-click="name='a'">1</button>
        <button ng-click="name='b'">2</button>
        <button ng-click="name='c'">3</button>
        <button ng-click="type=2">4</button>
        <button ng-click="type=3">5</button>
        <p>{{name}}</p>
    </body>
    <script type="text/javascript">
        var app = angular.module("app", []);
        app.controller("first", function($scope) {
            $scope.name = 'q';
            $scope.type = 1;

            function te() {
                console.log($scope.name+" "+ $scope.type);
            }
            $scope.$watch('name+type', function(newValue, oldValue) {
                te();
            });
        })
    </script>
```

 

 

**$watch性能问题**

太多的$watch将会导致性能问题，$watch如果不再使用，我们最好将其释放掉。

$watch函数返回一个注销监听的函数，如果我们想监控一个属性，然后在稍后注销它，可以使用下面的方式：

var watch = $scope.$watch('someModel.someProperty', callback);

//...

watch();

 

还有2个和$watch相关的函数：

$watchGroup(watchExpressions, listener);

$watchCollection(obj, listener);

# AngularJS内置服务

## $q

` $q `是`AngularJS`的一种内置服务，它可以异步地执行函数，并且当函数执行完成时或异常时它允许你使用函数的返回值或返回执行状态通知等。 

`defer`的意思是延迟，`$q.defer()` 可以创建一个`deferred`延迟对象实例，实例旨在暴露派生的`Promise` 实例，`Promise`就是一种对执行结果不确定的一种预先定义，如果成功，就`resovle`；如果失败，就`reject`，就像事先给出了一些承诺。 

1、通过`$q`服务注册一个延迟对象：

```js
var deferred = $q.defer();
```

2、成功解决`resolve`其派生的`promise`。参数`returnValue`将来会被用作`successCallback(success){}`函数的参数：

```js
deferred.resolve(returnValue)
```

3、未成功解决其派生的`promise`。参数`error`被用来说明未成功的原因。此时`deferred`实例的`promise`对象将会捕获一个任务未成功执行的错误，`  promise.catch(errorCallback(reason){}) `：

```js
deferred.reject(error);
```

4、更新`promise`的执行状态通知 ：

```js
deferred.notify("notify");
```

5、对`promise`处理 ：

```js
function getPromise(){
    var deferred = $q.defer();
    setTimeout(() => {
        deferred.resolve(returnValue);
    });
    return deferred.promise;   
}

var promise = getPromise();
promise.then((data) => {}, (error) => {}, (notify) => {}).catch();
```

# angular-ui-router

## 什么是ui-router

ui-router是AngularUI库最有用的组件之一（AngularUI库由AngularJS社区构建）。它是一个第三方路由框架，允许通过状态机制组织接口，而不是简单的URL路由。

**作用**

-  和ngRoute功能一样，可以定义在任意状态内的模板都处在<ui-view>中
-  与ngRoute不同的是，每个模板中可以包含自己的<ui-view>中，也就是我们说的嵌套路由

## 配置使用ui-router

### 导入js文件

需要注意的是：必须导入angular.min.js这个文件，且angular.min.js必须导入在angular-ui-router.min.js前面。

```html
<script type="text/javascript" src="JS/angular.min.js"></script>
<script type="text/javascript" src="JS/angular-ui-router.min.js"></script>
```

### 注入angular模块

```js
var app = angular.module('myApp', ['ui.router']);
```

注入的名字“ui.router”，可在angular-ui-router.min.js里找到。

### 定义视图

ui-view替代的是ngroute路由的ng-view

```html
<div ui-view></div>
<!-- 或者 -->
<ui-view></ui-view>
```

### 配置路由状态

和ngRoute不同的是，ngRoute路由是要设置在\$routeProvider上， 而ui-router是将状态设置在\$stateProvider上：

$stateProvider.state(stateName, stateConfig)

stateName:    字符串

stateConfig：object对象，可以设置url、template、controller等属性

```js
app.config(["$stateProvider", function ($stateProvider){    	
    $stateProvider.state("stateName", { //导航用的名字，如<a ui-sref="login">login</a>里的login
		url: '/',    //访问路径 
		template:'<div>模板内容......</div>'
	});
 }]);
```

**有三种显示template的方式**：

- template： 一个html内容字符串或一个能返回html字符串的函数；

```
template: '<h1>Home</h1>'
```

- templateUrl： 一个html模板的路径字符串或者是一个能返回URL路径字符串的函数；

```
templateUrl: 'first.html'
```

first.html

```html
<h4>First Page</h4><br />
<p>Hello, {{FirstCtrl.test}}</p>
```

- templateProvider：一个能返回URL路径字符串的函数。

```
templateProvider: function() {
	return '<h1>Second Page: {{t}}</h1>';
}
```

**两种方法加载controller**：

- 引用相应的js外部文件

```
controller: 'HomeController'
```

home.js

```js
'use strict';
//Define `C1Controller`
app.controller('HomeController', function() {
    alert('HomeController is on!');
});
```

- 内置controller的方法

```js
 controller: function() {
     this.test = 'world!';
 },
 controllerAs: 'FirstCtrl'
```

用了this.test（this指当前对象）声明并初始化变量，为了能在该状态对应页面中显示变量值，需要将controller设置别别名，controllerAs: ‘FirstCtrl’，然后在对应html模板中用{{FirstCtrl.test}}；

```js
controller: function($scope) {
	$scope.t = 'SecondController is on!';
}
```

在controller中用\$scope创建变量，在对应html模板中用{{t}}，这里$scope对应的就是该controller的作用域，所以在与其关联的html文本中，直接写出该变量即可。

### 路由切换

激活state有3种方法： 

- 调用`$state.go('stateName');`方法；

- 在html文档中\<ui-view>区域之外的地方，添加`<a ui-sref='stateName'>stateName</a>`链接，等页面渲染之后可以通过点击该链接进入所选状态所对应的页面；

- 在地址栏中输入state中定义过的url，随后Enter直接访问。

方法1： 如果需要在页面一加载时就要显示某一状态，需要在app.js后面加一下代码：

```js
app.run(function($state) {
    $state.go('stateName');
});
```

上述代码是在加载TrialApp模块的时候调用`$state.go('stateName');`，以激活stateName状态。

方法2：在html文档中\<ui-view>区域之外的地方，添加`<a ui-sref='stateName'>stateName</a>`链接，代码如下：

```html
<a ui-sref='home'>Home</a>
<br />
<a ui-sref='first'>First</a>
<br />
<a ui-sref='second'>Second</a>
```

### 简单示例

```html
<html>
  <head>   
    <title>ui-router</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!-- 导入JS -->
	<script type="text/javascript" src="JS/angular.min.js"></script>
	<script type="text/javascript" src="JS/angular-ui-router.min.js"></script>	
  </head>
  <body>	
	<div ng-app="myApp">		
		<div ui-view></div>	<!-- 视图 -->		
	</div>	
  </body>
  <script type="text/javascript">
	//定义模板，并注入ui-router
	var app = angular.module('myApp', ['ui.router']);	
	//对服务进行参数初始化，这里配stateProvider服务的视图控制
	app.config(["$stateProvider", function ($stateProvider) {    	
        $stateProvider		
            .state("home", {
                url: '/',   
                template:'<div>模板内容......</div>'
            });   
    }]);  
  </script>
</html>
```

## 嵌套路由的实现

通过url参数的设置实现路由的嵌套（父路由与子路由通过”.“连接就形成了子路由）。嵌套路由可实现多层次的ui-view。

```html
 <body >	
	<div ng-app="myApp" >
		<a ui-sref="parent">点我显示父view内容</a>
		<a ui-sref="parent.child">点我显示父view与子view内容</a>
		<div ui-view></div>	<!-- 父View -->		
	</div>	
  </body>
  
  
  <script type="text/javascript">
	var app = angular.module('myApp', ['ui.router']);	
	app.config(["$stateProvider",  function ($stateProvider) {    	
        $stateProvider		
		.state("parent", {//父路由
			url: '/parent',  
			template:'<div>parent'
					+'<div ui-view><div>'// 子View
					+'</div>'
		}) 		
	    .state("parent.child", {//子路由
			url: '/child',    
			template:'<div>child</div>'
		})     
    }]);
  </script>
```

上面的是**相对路径方式**：

'parent’将匹配…/index.html#/parent;

'parent.child’将匹配…/index.html#/parent/child。

若改成**绝对路径方式**，则需要在子url里加上^:

```js
.state("parent.child", {
	url: '^/child',    
	template:'<div>child</div>'
}) 
```

此时，'parent’将匹配…/index.html#/parent； 'parent.child’将匹配…/index.html#/child。

## 通过views实现多视图

多个视图时，使用views属性。该属性里包含了哪些ui-view，则对应的template或templateUrl里的内容就会填充该ui-view。

同一个状态下有多个视图示例：

```html
<body >    
    <div ng-app="myApp" >
        <a ui-sref="index">点我显示index内容</a>
        <div ui-view="header"></div>  
        <div ui-view="nav"></div>  
        <div ui-view="body"></div>      
    </div>  
  </body>

  <script type="text/javascript">
    var app = angular.module('myApp', ['ui.router']);   
    app.config(["$stateProvider",  function ($stateProvider) {      
        $stateProvider     
        .state("index", {
            url: '/index',  
            views:{
				'header':{template:"<div>头部内容</div>"},
				'nav':{template:"<div>菜单内容</div>"},
				'body':{template:"<div>展示内容</div>"}
			}
        });  
    }]);
  </script>
```

## ui-view的定位

@的作用 是用来绝对定位view，即说明该ui-view属于哪个模板。如：'header@index’表示名为header的view属于index模板。绝对和相对路径的效果一样，请看如下代码：

```html
<body >    
    <div ng-app="myApp" >
        <a ui-sref="index">show index</a>
		<a ui-sref="index.content1">content111111</a>
		<a ui-sref="index.content2">content222222</a>
		<div ui-view="index"><div>             
    </div>  
  </body>

  <script type="text/javascript">
    var app = angular.module('myApp', ['ui.router']);   
    app.config(["$stateProvider",  function ($stateProvider) {      
        $stateProvider     
        .state("index", {
            url: '/index',  
            views:{
				'index':{template:"<div><div ui-view='header'></div>  <div ui-view='nav'></div> <div ui-view='body'></div>  </div>"},
				//这里必须要绝对定位
				'header@index':{template:"<div>头部内容header</div>"},
				'nav@index':{template:"<div>菜单内容nav</div>"},
				'body@index':{template:"<div>展示内容contents</div>"}
			}
        })    
		//绝对定位
		.state("index.content1", {
            url: '/content1',  
            views:{
				'body@index':{template:"<div>content11111111111111111</div>"}
				//'body@index'表时名为body的view使用index模板
			}
        })	
		//相对定位：该状态的里的名为body的ui-view为相对路径下的（即没有说明具体是哪个模板下的）
		.state("index.content2", {
            url: '/content2',  
            views:{
				'body':{template:"<div>content2222222222222222222</div>"}//
			}
        })		
           
    }]);

  </script>
```

由上面代码可知，相对定位不能找到的ui-view需要用@来绝对定位。

## URL路由传参（通过$stateParams服务获取参数）

有url：'/index/:id', 和 url： '/index/{id}',两种形式传参：

```html
<body >    
    <div ng-app="myApp" >
        <a ui-sref="index({id:30})">show index</a>    
		<a ui-sref="test({username:'peter'})">show test</a>
		<div ui-view></div>
    </div>  
  </body>

  <script type="text/javascript">
    var app = angular.module('myApp', ['ui.router']);   
    app.config(["$stateProvider",  function ($stateProvider) {      
        $stateProvider     
		.state("home", {
            url: '/',  
			template:"<div>homePage</div>"
           
        })
		.state("index", {
            url: '/index/:id',  
			template:"<div>indexcontent</div>",
            controller:function($stateParams){
				alert($stateParams.id)
			}
        })	
		.state("test", {
            url: '/test/:username',  
			template:"<div>testContent</div>",
            controller:function($stateParams){
				alert($stateParams.username)
			}
        })			
           
    }]);

  </script>
```

## Resolve（预载入）

使用预载入功能，开发者可以预先载入一系列依赖或者数据，然后注入到控制器中。在ngRoute中resolve选项可以允许开发者在路由到达前载入数据保证（promises）。在使用这个选项时比使用angular-route有更大的自由度。

预载入选项需要一个对象，这个对象的key即要注入到控制器的依赖，这个对象的value为需要被载入的factory服务。

如果传入的时字符串，angular-route会试图匹配已经注册的服务。如果传入的是函数，该函数将会被注入，并且该函数返回的值便是控制器的依赖之一。如果该函数返回一个数据保证（promise），这个数据保证将在控制器被实例化前被预先载入并且数据会被注入到控制器中。

```html
<body >    
    <div ng-app="myApp" >
        <a ui-sref="index">show index</a>    
		<div ui-view></div>
    </div>  
  </body>

  <script type="text/javascript">
    var app = angular.module('myApp', ['ui.router']);   
    app.config(["$stateProvider",  function ($stateProvider) {      
        $stateProvider     
		.state("home", {
            url: '/',  
			template:"<div>homePage</div>"
           
        })
		.state("index", {
            url: '/index/{id}',  
			template:"<div>indexcontent</div>",
			resolve: {
				//这个函数的值会被直接返回，因为它不是数据保证
				user: function() {
				  return {
					name: "peter",
					email: "audiogroup@qq.com"
				  }
				},
				//这个函数为数据保证, 因此它将在控制器被实例化之前载入。
				detail: function($http) {
				  return $http({
					method: 'JSONP',
					url: '/current_details'
				  });
				},
				//前一个数据保证也可作为依赖注入到其他数据保证中！（这个非常实用）
				myId: function($http, detail) {
				  $http({
					method: 'GET',
					url: 'http://facebook.com/api/current_user',
					params: {
					  email: currentDetails.data.emails[0]
					}
				  })
				}
			},
            controller:function(user,detail,myId$scope){
				alert(user.name)
				alert(user.email)
				console.log(detail)
			}
        })					
           
    }]);

  </script>
```

