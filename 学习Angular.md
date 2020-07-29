

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

## 启动项目

```shell
ng serve --open
# http://localhost:4200/
```

# Angular API

## @Input

### @Input描述

父组件可以传递数据给子组件，包括将父组件对象也可以传递给子组件
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

## 新建服务service

```shell
ng generate service services/common
# 命令执行后，显示：
# CREATE src/app/services/common.service.spec.ts (357 bytes)
# CREATE src/app/services/common.service.ts (135 bytes)
```

