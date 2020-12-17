# AngularJS 服务(Service)

## 什么是服务

在 AngularJS 中，服务是一个函数或对象，可在你的 AngularJS 应用中使用。AngularJS 内建了30 多个服务。有个 $location 服务，它可以返回当前页面的 URL 地址，与JavaScript的location对象差不多。

```js
var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $location) {
    $scope.myUrl = $location.absUrl();
});
```

> 注意： $location 服务是作为一个参数传递到 controller 中。如果要使用它，需要在 controller 中定义。

## 为什么使用服务

在很多服务中，比如\$location 服务，它可以使用 DOM 中存在的对象，类似 window.location 对象，但 window.location 对象在 AngularJS 应用中有一定的局限性。
AngularJS 会一直监控应用，处理事件变化， AngularJS 使用 $location 服务比使用 window.location 对象更好。

## AngularJS内置服务

### $http 服务

\$http 是 AngularJS 应用中最常用的服务。$http 服务向服务器发送请求，应用响应服务器传送过来的数据。

使用 $http 服务向服务器请求数据:

```js
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    $http.get("welcome.htm").then(function (response) {
        $scope.myWelcome = response.data;
    });
});
```

### $timeout 服务

AngularJS $timeout 服务对应了 JS window.setTimeout 函数。

两秒后显示信息：

```js
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $timeout) {
    $scope.myHeader = "Hello World!";
    $timeout(function () {
        $scope.myHeader = "How are you today?";
    }, 2000);
});
```

### $interval 服务

AngularJS $interval 服务对应了 JS window.setInterval 函数。

每一秒显示信息：

```js
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $interval) {
    $scope.theTime = new Date().toLocaleTimeString();
    $interval(function () {
        $scope.theTime = new Date().toLocaleTimeString();
    }, 1000);
});
```

清除定时任务：$interval.cancel

```js
var intervalEvent = $interval(intervalEventFn, intervalDelay);
$interval.cancel(intervalEvent);
```

## 创建自定义服务

### factory

factory方式创建的服务，作用就是返回一个有属性有方法的对象。也是使用最多的方式。相当于：var f = myFactory();

```js
angular.module('moduleName').factory('myFactory', [function factoryName() {
	var service = {};//定义一个Object对象'
    service.name = "张三";
    var age;//定义一个私有化的变量
    //对私有属性写getter和setter方法
    service.setAge = function(newAge){
        age = newAge;
    }
    service.getAge = function(){
        return age; 
    }
    return service;//返回这个Object对象
}]);
```

### service

通过service方法创建的服务，可以不用返回任何值，因为service方法本身返回一个构造器，系统会用new关键字来创建一个对象：var s = new myService();。

```js
angular.module('moduleName').service('myService', [function serviceName() {
       this._name = '';

       this.getName = function () {
           return this._name;
       };

       this.setName = function (name) {
           this._name = name;
       };
}]);
```

### value

定义你可以作为服务提供器注入的单个值。

```js
angular.module('moduleName',[]).value('myValue',{color:'blue',value:'17'});
```

### constant

定义你可以作为服务提供器注入的单个值。与value不同的是，全局只会有一个此对象，修改其中的一个其他引用的地方都会被改变。

```js
angular.module('moduleName',[]).constant('myConstant',{color:'blue',value:'17'});
```

### provider

通过provider方法创建的服务一定要包含\$get方法，provider注入的结果就是\$get方法返回的结果，如果不包含​\$get方法，则程序会报错。

在这几种创建服务的方法中，只有使用provider方法创建的服务才可以传进config函数，以用于在对象启用之前，对模块进行配置。但是，在config中进行配置的只能是在$get函数之外定义的变量，如：在下面定义的provider中，只有artist与thingFromConfig两个变量可以被访问到，而getArtist与getThingFromConfig两个方法是不能被在config函数中访问到的。

```js
//定义provider服务
angular.module('moduleName',[]).provider('myProvider', function () {
    this.artist = '';
    this.thingFromConfig = '';

    this.$get = function () {
        var that = this;
        return {
            getArtist: function () {
                return that.artist;
            },
            getThingFromConfig: function () {
                return that.thingFromConfig;
            }
        }
    };
});
```

## 使用自定义服务

### 在控制器中使用自定义服务

#### factory

```js
angular.module('moduleName',[]).controller('myCtrl', ['$scope', 'myFactory', function ($scope, myFactory) {
    myFactory.setAge(20);
    $scope.r =myFactory.getAge();
    alert(myFactory.name);
}]);
```

#### service

```js
angular.module('moduleName',[]).controller('myCtrl', ['$scope', 'myService', function ($scope, myService) {
    console.log(myService.getName());
}]);
```

#### provider

```js
angular.module('moduleName',[]).controller('myCtrl', ['$scope', 'myProvider', function ($scope, myProvider) {
    console.log(myProvider.getThingFromConfig());  //kingx name
}]);
```

### 在config方法中使用自定义服务

```js
angular.module('moduleName',[]).config(function (myProviderProvider) { //注意这里参数的名字服务名+Provider
    myProviderProvider.thingFromConfig = 'kingx name';
});
```

