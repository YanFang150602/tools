# Angular开始

## 安装Angular脚手架

```shell
npm install -g @angular/cli
```

## 新建Angular项目

```shell
# --skip-install跳过安装package.json里依赖的包
ng new AngularDemo --skip-install
# 进入项目
cd AngularDemo
# 安装package.json里依赖的包
npm install
```

## 新建组件component

```shell
# 在src/app目录下新增components目录
ng generate component components/header
# 命令执行后，显示：
# CREATE src/app/components/header/header.component.html (21 bytes)
# CREATE src/app/components/header/header.component.spec.ts (628 bytes)
# CREATE src/app/components/header/header.component.ts (276 bytes)
# CREATE src/app/components/header/header.component.scss (0 bytes)
# UPDATE src/app/app.module.ts (572 bytes)
```

## 新建服务service

```shell
ng generate service services/common
# 命令执行后，显示：
# CREATE src/app/services/common.service.spec.ts (357 bytes)
# CREATE src/app/services/common.service.ts (135 bytes)
```

## 新建模块module

```shell
# --flat 把这个文件app-routing.module.ts放进了 src/app 中，而不是单独的目录中。
# --module=app 告诉 CLI 把它注册到 AppModule 的 imports 数组中。
ng generate module app-routing --flat --module=app
```

## 启动项目

```shell
ng serve --open
# http://localhost:4200/
```

# 模板语法

## 类绑定

### 单个类绑定 

要创建单个类的绑定，请使用 `class` 前缀，紧跟一个点（`.`），再跟上 CSS 类名 

```html
<!-- 当绑定表达式hasFoo为真值的时候，Angular 就会加上这个类，为假值则会移除，但 undefined 是假值中的例外 -->
<div [class.foo]="hasFoo">test</div>
```

### 多个类绑定 

要想创建多个类的绑定，请使用通用的 `[class]` 形式来绑定类，而不要带点 

```html
<!--通过string绑定了hasFoo和selected两个类-->
<div [class]="hasFoo selected">test</div>

<!--通过Object绑定hasFoo和selected两个类，true添加hasFoo类，false移除selected类-->
<div [class]="{hasFoo: true, selected: false}">test</div>

<!--通过数组绑定了hasFoo和selected两个类-->
<div [class]="['hasFoo', 'selected']">test</div>
```

## 样式绑定

通过**样式绑定**来动态设置样式 

### 单个样式绑定

要想创建单个样式的绑定，请以 `style` 前缀开头，紧跟一个点（`.`），再跟着 CSS 样式的属性名 

```html
<!--
	单一样式绑定，设置width，
	属性widthValue为string/null/undefined，
	eg：widthValue = '100px'
-->
<div [style.width]="widthValue">test</div>

<!--
	带单位的单一样式绑定，设置width，
	属性widthValue为number/null/undefined
	eg: widthValue = 100
-->
<div [style.width.px]="widthValue">test</div>


```

### 多个样式绑定

要切换多个样式，直接绑定到 `[style]` 属性而不用点 

```html
<!--
	styleExpr为string类型，
	eg: styleExpr = "width: 100px; height: 100px"
-->
<div [style]="styleExpr">test</div>

<!--
	styleExpr为Obejct类型，
	eg: styleExpr = {width: '100px', height: '100px'}
-->
<div [style]="styleExpr">test</div>

<!--
	styleExpr为Array类型，
	eg: styleExpr = ['width', '100px']
-->
<div [style]="styleExpr">test</div>
```

# Angular API

## @Input

### @Input描述

一个装饰器，用来把某个类字段标记为输入属性，并提供配置元数据。 该输入属性会绑定到模板中的某个 DOM 属性。当变更检测时，Angular 会自动使用这个 DOM 属性的值来更新此数据属性。（父组件可以传递数据给子组件，包括将父组件对象也可以传递给子组件）。
### @Input使用
1、子组件里使用
```typescript
// 子组件.ts
// 引用Input
import { Input } from '@angular/cli';

// 在子组件class里使用Input
// x是自定义属性名，用在父组件调用子组件时，子组件的属性<child-selector [x]="父组件里的属性"></child-selector>
// y是直接用在子组件里的属性
@Input('x') y: any;
```
```html
<!-- 子组件模板 -->
<p>{{y}}</p>
```
2、父组件里使用
```html
<!-- 父组件模板 -->
<child-selector [x]="parentMsg"></child-selector>
```
```typescript
// 父组件.ts
// 父组件class里定义parentMsg属性
parentMsg: string = '我来自Parent Component的！';
```

## @ViewChild

## @Output



# 内部指令

## *ngFor

[`*ngFor`](https://angular.cn/guide/template-syntax#ngFor) 是一个 Angular 的复写器（repeater）指令。 它会为列表中的每项数据复写它的宿主元素。 

不要忘了 `ngFor` 前面的星号（`*`），它是该语法中的关键部分。 

##  *ngIf

 `  *ngIf`  是一个 Angular 的判断指令，值为true或false。如果页面上使用某个属性是undefined，控制台会报错，页面可能显示异常。此时可以通过 `  *ngIf` 对属性进行判断。

 `  *ngIf`  判断的值为false，那么会 从 DOM 中移除了 `  *ngIf`  的宿主元素。

# 服务

服务是在彼此不认识的类之间共享信息的好方法。

## 新建服务

1、使用Angular CLI创建服务`HeroService`

```
ng generate service hero
```

执行上面命令后，生成如下文件：`src/app/hero.service.ts`。

2、修改`src/app/hero.service.ts`，可以获取`src/app/mock-heroes.ts`里的数据

```typescript
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
    getHero(id: number): Observable<Hero> {
        return of(HEROES.find(hero => hero.id === id ));
    }

    getHeroes(): Observable<Hero[]> {
        return of(HEROES);
    }
}
```

`src/app/mock-heroes.ts`文件内容

```typescript
import { Hero } from './hero';

export const HEROES: Hero[] = [
  { id: 11, name: 'Dr Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];
```

**@Injectable()**  

标记性元数据，表示一个类可以由 `Injector` 进行创建。 `@Injectable()`  标记的类将会提供一个可注入的服务 

`@Injectable()` 装饰器会接受该服务的元数据对象，就像 `@Component()` 对组件类的作用一样。 

必须先注册一个*服务提供者*，来让服务类在依赖注入系统中可用，Angular 才能把它注入到组件中。所谓服务提供者就是某种可用来创建或交付一个服务的东西；在这里，它通过实例化 服务类，来提供该服务。 

为了确保服务类可以提供该服务，就要使用*注入器*来注册它。注入器是一个对象，负责当应用要求获取它的实例时选择和注入该提供者。默认情况下，Angular CLI 命令 `ng generate service` 会通过给 `@Injectable()` 装饰器添加 `providedIn: 'root'` 元数据的形式，用**根注入器**将服务注册成为提供者。

```ts
@Injectable({
  providedIn: 'root',
})
```

当在顶层提供该服务时，Angular 就会为服务类创建一个单一的、共享的实例，并把它注入到任何想要它的类上。 在 `@Injectable` 元数据中注册该提供者，还能允许 Angular 通过移除那些完全没有用过的服务来进行优化。 

## **使用服务**

1、`src/app/app.module.ts`里引入服务`HeroService`

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { HeroService } from './hero.service';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    HeroService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
```

2、`src/app/heroes/heroes.component.ts`组件里引入`HeroService`

```typescript
import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

    heroes: Hero[];

    constructor(private heroService: HeroService) { }

    ngOnInit(): void {
        this.getHeroes();
    }

    getHeroes(): void {
        this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
    }
}
```

# 路由

## 添加 `AppRoutingModule`

在 Angular 中，最好在一个独立的顶层模块中加载和配置路由器，它专注于路由功能，然后由根模块 `AppModule` 导入它 

**按照惯例，在用CLI创建项目时，选择路由是，这个模块类的名字叫做 `AppRoutingModule`，并且位于 `src/app` 下的 `app-routing.module.ts` 文件中**。 

`src/app/app-routing.module.ts`文件

```ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

**具体创建路由语法**

使用CLI生成

```
ng generate module app-routing --flat --module=app
```

> `--flat`将文件放入`src/app`而不是其自己的文件夹中。
> `--module=app`告诉CLI在`imports`数组中注册它`AppModule`。

### 路由

`Routes`告诉路由器，当用户单击链接或将 URL 粘贴进浏览器地址栏时要显示哪个视图 

修改`src/app/app-routing.module.ts`，引用组件

```ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [{
    path: 'heroes',
    component: HeroesComponent
}, {
    path: 'messages',
    component: MessagesComponent
}, {
    path: 'dashboard',
    component: DashboardComponent
}, {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

### [`RouterModule.forRoot()`](https://angular.cn/tutorial/toh-pt5#routermoduleforroot) 

`@NgModule` 元数据会初始化路由器，并开始监听浏览器地址的变化。 

将 `RouterModule` 添加到 `AppRoutingModule` 的 `imports` 数组中，同时通过调用 `RouterModule.forRoot()` 来用这些 `routes` 配置 `AppRoutingModule` 

```ts
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

这个方法之所以叫 `forRoot()`，是因为你要在应用的顶层配置这个路由器。 `forRoot()` 方法会提供路由所需的服务提供者和指令，还会基于浏览器的当前 URL 执行首次导航。 

## 添加路由出口 `RouterOutlet`

打开 `AppComponent` 的模板，添加 `<router-outlet>` 元素。 `<router-outlet>` 会告诉路由器要在哪里显示路由的视图。 

```html
<!--src/app/app.component.html-->

<h1>{{title}}</h1>
<!--诉路由器要在哪里显示路由的视图-->
<router-outlet></router-outlet>
```

## 添加路由`routerLink`

理想情况下，用户应该能通过点击链接进行导航，而不用被迫把路由的 URL 粘贴到地址栏。

添加一个 `<nav>` 元素，并在其中放一个链接 `<a>` 元素，当点击它时，就会触发一个到组件的导航。 修改过的 `AppComponent` 模板如下：

```html
<!--src/app/app.component.html-->

<h1>{{title}}</h1>
<nav>
    <a routerLink="/heroes">Heroes</a> &nbsp;&nbsp;
</nav>
<!--诉路由器要在哪里显示路由的视图-->
<router-outlet></router-outlet>
```

[`routerLink` 属性](https://angular.cn/tutorial/toh-pt5#routerlink)的值为 `"/heroes"`，路由器会用它来匹配出指向 `HeroesComponent` 的路由。 `routerLink` 是 [`RouterLink` 指令](https://angular.cn/api/router/RouterLink)的选择器，它会把用户的点击转换为路由器的导航操作。 它是 `RouterModule` 中的另一个公共指令。

**组件模板里也可以使用` routerLink `** ，eg：

修改过的` DashboardComponent `模板如下：

```html
<!-- src/app/dashboard/dashboard.component.html -->

<h3>Top Heroes</h3>
<div class="grid grid-pad">
    <a *ngFor="let hero of heroes" class="col-1-4" >
        <div class="module hero">
            <a routerLink="/detail/{{hero.id}}"><h4>{{hero.name}}</h4></a>
        </div>
    </a>
</div>
```

app-routing.module.ts里增加个路由配置：

```typescript
const routes: Routes = [{
    /* ... */
}, {
    path: 'detail/:id',
    component: HeroDetailComponent
}];
```

## 添加默认路由

当应用启动时，浏览器的地址栏指向了网站的根路径。 它没有匹配到任何现存路由，因此路由器也不会导航到任何地方。 `<router-outlet>` 下方是空白的。 

修改app-routing.module.ts，添加默认路由

```ts
const routes: Routes = [{
    path: '', // 默认
    redirectTo: '/dashboard',
    pathMatch: 'full'
}, {
    /* ... */
}];
```

## 组件支持路由

`src/app/hero-detail/hero-detail.component.ts`组件里引入`ActivatedRoute、Location`

```ts
import { Component, OnInit, Input } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
    hero: Hero;

    constructor(private heroService: HeroService, private activatedRoute: ActivatedRoute, private location: Location) { }

    ngOnInit(): void {
        this.getHero();
    }
}
```

把 `ActivatedRoute`、 `Location` 服务注入到构造函数中 ，将它们的值保存到私有变量里 ，只在组件里使用。

[`ActivatedRoute`](https://angular.cn/api/router/ActivatedRoute) 保存着到这个组件实例的路由信息， 这个组件对从 URL 中提取的路由参数感兴趣。  

[`location`](https://angular.cn/api/common/Location) 是一个 Angular 的服务，用来与浏览器打交道。 

**组件从路由中提取参数**，`src/app/hero-detail/hero-detail.component.ts`的`class`添加方法`getHero()`

```ts
getHero(): void {
  // +'123'可以将字符串123转换数字123
  const id = +this.route.snapshot.paramMap.get('id');
  this.heroService.getHero(id)
    .subscribe(hero => this.hero = hero);
}
```

`route.snapshot` 是一个路由信息的静态快照，抓取自组件刚刚创建完毕之后。 

`paramMap` 是一个从 URL 中提取的路由参数值的字典。 `"id"` 对应的值就是要从URL里获取的 `id`。 

路由参数总会是字符串。 JavaScript 的 (+) 操作符会把字符串转换成数字 

**原路返回**，`src/app/hero-detail/hero-detail.component.ts`的`class`添加方法`goBack()`

```ts
goBack(): void {
  this.location.back();
}
```

# HTTP服务

## 启用 HTTP 服务

`HttpClient` 是 Angular 通过 HTTP 与远程服务器通讯的机制。 

要让 `HttpClient` 在应用中随处可用，需要两个步骤。

1、用导入语句把`HttpClientModule`添加到根模块 `AppModule` 中，修改`src/app/app.module.ts`：

```ts
import { HttpClientModule } from '@angular/common/http';
```

2、仍然在 `AppModule` 中，把 `HttpClientModule` 添加到 `imports` 数组中： 

```ts
@NgModule({
  imports: [
    HttpClientModule,
  ],
})
```

## 通过 `HttpClient` 发送请求

1、在 `src/app/hero.service.ts`中导入 `HttpClient` 和 `HttpHeaders` ：

```ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
```

2、仍然在  `src/app/hero.service.ts`中，在`class`中把 `HttpClient` 注入到构造函数中一个名叫 `http` 的私有属性中。 

```ts
constructor(private http: HttpClient) {
}
```

3、仍然在  `src/app/hero.service.ts`中，修改`getHeroes()`，使用` http`属性发送请求

```ts
private heroesUrl = 'api/heroes'; 

getHeroes(): Observable<Hero[]> {
 	 return this.http.get<Hero[]>(this.heroesUrl)
}
```

# 注意

## npm install时失败

执行npm install后，失败

```shell
$ npm install
npm WARN registry Using stale data from https://registry.npm.taobao.org/ because the host is inaccessible -- are you offline?
npm WARN registry Using stale data from https://registry.npm.taobao.org/ due to a request error during revalidation.
npm ERR! code ENOTFOUND
npm ERR! errno ENOTFOUND
npm ERR! network request to https://registry.npm.taobao.org/@angular%2fanimations failed, reason: getaddrinfo ENOTFOUND registry.npm.taobao.org
npm ERR! network This is a problem related to network connectivity.
npm ERR! network In most cases you are behind a proxy or have bad network settings.
npm ERR! network
npm ERR! network If you are behind a proxy, please make sure that the
npm ERR! network 'proxy' config is set properly.  See: 'npm help config'

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\彦博\AppData\Roaming\npm-cache\_logs\2020-08-02T01_11_54_679Z-debug.log

# 再次执行npm install，还是失败：
$ npm install
npm WARN deprecated request@2.88.2: request has been deprecated, see https://github.com/request/request/issues/3142
npm WARN deprecated chokidar@2.1.8: Chokidar 2 will break on node v14+. Upgrade to chokidar 3 with 15x less dependencies.
npm WARN deprecated har-validator@5.1.5: this library is no longer supported
npm ERR! Unexpected end of JSON input while parsing near '...de","version":"4.2.6"'

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\彦博\AppData\Roaming\npm-cache\_logs\2020-08-02T01_13_05_409Z-debug.log
```

解决

```shell
$ npm cache clean --force
# 这回 npm install成功
$ npm install
npm WARN deprecated chokidar@2.1.8: Chokidar 2 will break on node v14+. Upgrade to chokidar 3 with 15x less dependencies.
npm WARN deprecated request@2.88.2: request has been deprecated, see https://github.com/request/request/issues/3142
npm WARN deprecated fsevents@1.2.13: fsevents 1 will break on node v14+ and could be using insecure binaries. Upgrade to fsevents 2.
npm WARN deprecated har-validator@5.1.5: this library is no longer supported
npm WARN deprecated urix@0.1.0: Please see https://github.com/lydell/urix#deprecated
npm WARN deprecated resolve-url@0.2.1: https://github.com/lydell/resolve-url#deprecated

> core-js@3.6.4 postinstall c:\development\VSCodeWorkspace\AngularDemo\node_modules\core-js
> node -e "try{require('./postinstall')}catch(e){}"

Thank you for using core-js ( https://github.com/zloirock/core-js ) for polyfilling JavaScript standard library!

The project needs your help! Please consider supporting of core-js on Open Collective or Patreon:
> https://opencollective.com/core-js
> https://www.patreon.com/zloirock

Also, the author of core-js ( https://github.com/zloirock ) is looking for a good job -)


> @angular/cli@10.0.5 postinstall c:\development\VSCodeWorkspace\AngularDemo\node_modules\@angular\cli
> node ./bin/postinstall/script.js

npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN notsup Unsupported engine for watchpack-chokidar2@2.0.0: wanted: {"node":"<8.10.0"} (current: {"node":"12.16.3","npm":"6.14.4"})
npm WARN notsup Not compatible with your version of node/npm: watchpack-chokidar2@2.0.0
npm WARN sass-loader@8.0.2 requires a peer of node-sass@^4.0.0 but none is installed. You must install peer dependencies yourself.
npm WARN sass-loader@8.0.2 requires a peer of fibers@>= 3.1.0 but none is installed. You must install peer dependencies yourself.
npm WARN webpack-subresource-integrity@1.4.1 requires a peer of html-webpack-plugin@^2.21.0 || ~3 || >=4.0.0-alpha.2 <5 but none is installed. You must install peer dependencies yourself.
npm WARN ws@7.3.1 requires a peer of bufferutil@^4.0.1 but none is installed. You must install peer dependencies yourself.
npm WARN ws@7.3.1 requires a peer of utf-8-validate@^5.0.2 but none is installed. You must install peer dependencies yourself.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.13 (node_modules\webpack-dev-server\node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.13: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.13 (node_modules\watchpack-chokidar2\node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.13: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@2.1.3 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.1.3: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

added 1458 packages from 1215 contributors in 120.549s

59 packages are looking for funding
  run `npm fund` for details

```

## 双向绑定 `FormsModule`

**[(ngModel)]** 是 Angular 的双向数据绑定语法。 

ngModel属于一个可选模块 `FormsModule`，必须自行添加此模块才能使用该指令 ：

1、打开`AppModule` (`src/app/app.module.ts`) 从 `@angular/forms` 库中导入 `FormsModule` 符号 ；

2、把 `FormsModule` 添加到 `@NgModule` 元数据的 `imports` 数组中，`imports` 是该应用所需外部模块的列表 。

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## 每个组件都必须声明在（且只能声明在）一个 [NgModule](https://angular.cn/guide/ngmodules) 中 

Angular CLI 在生成 组件的时候就自动把它加到了 `AppModule` 中 ；

`AppModule` 声明了应用中的所有组件 。



