

# AngularJS启动

## 自动

`html`中含有`ng-app`内置指令时，在angular.js加载完后，会自动启动

## 手动

`angular.bootstrap(document, ['module.name'];)`

# AngularJS绑定JQuery

`angularjs.js`里会判断是否有导入`JQuery`，如果有导入，会将`JQuery`赋值给`angular.element`，否则使用`angularjs`里自带的`JQlite`

# $scope.$apply()

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



# Angular-ui-router

1、需要另导入angular-ui-router.js文件，必须先导入angular.js

2、试图文件里加入ui-view

```html
<!-- ui-view -->
<div ui-view></div>
```

