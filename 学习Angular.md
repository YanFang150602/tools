

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

## @ViewChild

## @Output

## 新建服务service

```shell
ng generate service services/common
# 命令执行后，显示：
# CREATE src/app/services/common.service.spec.ts (357 bytes)
# CREATE src/app/services/common.service.ts (135 bytes)
```

