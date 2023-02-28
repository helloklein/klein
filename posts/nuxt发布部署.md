---
title: nuxt发布部署
description: nuxt发布部署
aside: false
date: 2023-01-14
tags:
  - Nuxt
---

nuxt.js 提供三种部署方式，服务端渲染部署，静态应用部署，单页面应用部署。

部署前远程服务器需要安装 node，pm2，nginx

## 服务端渲染部署<hr>
nuxt.config.js 配置
```js
target: 'server', // 服务端渲染需要将target设置为server 默认是server
```

- 首先执行 build 打包

```js
npm run build
```

- 将".nuxt(隐藏项目)，static，nuxt.config.js, package.json"这四个文件放在服务器中

```js
npm run install, // 在服务器项目目录下执行安装依赖
npm run start, // 可以执行测试一下项目是否能正常启动
// 注意这边不要使用 npm run dev（开发模式）
```

如果测试没有问题就可以使用 pm2 启动项目

- 在项目根目录使用 pm2 启动项目

```js
pm2 start npm --name "project name" -- run start
```

启动起来之后执行 pm2 list 可以查看到正在守护的 pm2 进程。

## 静态应用部署<hr>

nuxt.js 可以依据路由配置将应用静态化，使得我们可以将应用部署到任何一个服务器静态站点。

nuxt.config.js 配置

```js
target: 'static',
```

- 打包生成 dist 文件

```js
npm run generate
```

最后将生成的 dist 文件放到服务器中

## 单页面应用程序部署（SPA）<hr>

nuxt generate 在 build、generate 时间内仍然需要 SSR 引擎，同时具有预渲染所有页面的优势，并具有较高的 SEO 优化和页面加载能力。内容在构建时生成。

- 将 nuxt.config.js 中的 mode 更改为 spa
- 运行 npm run build
- 将生成的 dist 文件夹部署到服务器

## nginx 配置<hr>

```js
upstream test {
  server 0.0.0.0:3000; // 你的服务地址
  keepalive 64;
}

server {
  listen 80;
  server_name baidu.com; //你的域名
  location / {
    proxy_pass http://test;
  }
}
```
