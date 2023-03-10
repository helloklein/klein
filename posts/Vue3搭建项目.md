---
title: Vue3搭建项目
description: Vue3搭建项目
aside: false
date: 2023-03-07
tags:
  - 项目搭建
---

## 使用 vite 快速创建脚手架

1. 在需要创建项目文件目录下打开 cmd 运行以下命令

```ts
yarn create vite 项目名
pnpm create vite 项目名

# 使用的模板
yarn create vite 项目名 --template vue
pnpm create vite 项目名 --template vue
```

> 我这里选择 yarn
>
> - yarn create vite 项目名 --template vue
> - 选择 vue => vue-ts 回车
> - cd 进入项目
> - code ./ vscode 打开项目 然后打开终端
> - yarn install 安装依赖
> - yarn dev 运行

## 代码约束风格

```ts
# 创建文件.prettierrc
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "singleQuote": true,
  "semi": false,
  "trailingComma": "all",
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "avoid"
}
```

```ts
yarn add eslint -D
# 初始化eslint
yarn  eslint --init
```

```ts
# 文件.eslintrc.cjs
module.exports = {
  "env": {
      "browser": true,
      "es2021": true,
      "node": true
  },
  "extends": [
      "eslint:recommended",
      "plugin:vue/vue3-essential",
      "plugin:@typescript-eslint/recommended"
  ],
  "parser": "vue-eslint-parser",  //👈解析template
  "parserOptions": {
      "ecmaVersion": "latest",
      "parser": "@typescript-eslint/parser",//👈解析script
      "sourceType": "module"
  },
  "plugins": [
      "vue",
      "@typescript-eslint"
  ],
  "rules": {
    "@typescript-eslint/ban-types": ["off"],//👈
    "@typescript-eslint/no-explicit-any": ["off"],//👈允许使用any
    '@typescript-eslint/no-unused-vars': 'off'
  }
};
```

```ts
yarn add prettier -D
# 文件package.json
"scripts": {
    "lint": "eslint . --ext .vue,.js,.ts,.jsx,.tsx --fix",
    "prettier": "prettier --write  \"src/**/*.{js,json,tsx,css,less,scss,vue,html,md}\""
},
```

```ts
# 创建文件.vscode/settings.json
{
  "editor.codeActionsOnSave": {
    "source.fixAll": false,
    "source.fixAll.eslint": true
  },
  "editor.guides.bracketPairs": "active"
}
```

```ts
# 在文件.eslintignore
public
dist
*.d.ts
package.json
```

## 配置环境 env

```ts
公共的 .env
开发环境 .env.development
生产环境 .env.production
预发布环境 .env.staging

# 端口
VITE_PORT= 3100

# 开发环境读取配置文件路径
VITE_PUBLIC_PATH = /

# 开发环境代理
VITE_PROXY_DOMAIN = /api

# 开发环境路由历史模式
VITE_ROUTER_HISTORY = "hash"

# 开发环境后端地址
VITE_PROXY_DOMAIN_REAL = "http://127.0.0.1:3000"
```

## 配置 scss|less

```ts
// 安装scss
yarn add sass-loader sass -D
// 安装node/type
yarn add @node/type
```

```ts
创建全局样式文件 src/styles/main.scss
```

```ts
# vite.config.ts
import  { UserConfig, ConfigEnv,loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";

const root :string = process.cwd();

export default ({ command, mode }: ConfigEnv): UserConfig => {
  // 获取当前环境的配置
  const {VITE_PORT,VITE_PUBLIC_PATH}: any =  loadEnv(mode, root)
  return {
    base:VITE_PUBLIC_PATH,

    // 服务相关
    server:{
      https:false,
      port:VITE_PORT
    },
    plugins: [vue()],

    // 解析相关 【别名】
    resolve: {
      alias: [
        {
          find: '@',  //字符串｜正则
          replacement: resolve(__dirname, 'src')
        },
        {
          find: '@asset',  //字符串｜正则
          replacement: resolve(__dirname, 'src/assets')
        }
      ],
    },

    // css相关
    css: {
      // 引入全局scss |less 指定传递给 CSS 预处理器的选项。
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./src/styles/main.scss";'
        }
      },
    },

    // .构建相关【打包相关】
    build: {
      sourcemap: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4000
    },

    // 常量
    define: {
      //是否开发环境 可供业务代码中直接使用 const dev = __IS_DEV__ 判断当前是否开发环境
      __IS_DEV__: mode === 'development',
    }
  }
}
```
