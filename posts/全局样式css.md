---
title: 全局样式css
description: 全局样式css
aside: false
date: 2023-03-07
tags:
  - 项目搭建
---

## 方法一、windicss

[windicss 官网](https://windicss.org/)

### 使用 windicss

1. 安装依赖

```ts
npm i -D vite-plugin-windicss windicss
或者
yarn add -D vite-plugin-windicss windicss
```

2. vite 安装插件

- vite.config.js 文件

```ts
import WindiCSS from "vite-plugin-windicss";
export default {
  plugins: [
    WindiCSS({
      scan: {
        dirs: ["."], // all files in the cwd   cwd里的所有文件
        fileExtensions: ["vue", "js", "ts"], // also enabled scanning for js/ts   扫描什么文件
      },
    }),
  ],
};
```

- main.js 文件

```ts
import "virtual:windi.css";
```

- 根目录创建 windi.config.js|ts 文件

```ts
import { defineConfig } from "vite-plugin-windicss";

export default defineConfig({
  darkMode: "class", // or 'media'
  plugins: [createEnterPlugin()],
  theme: {
    extend: {
      zIndex: {
        "-1": "-1",
      },
      colors: {
        pink: 400,
      },
      screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1600px",
      },
    },
  },
});

/**
 * 自定义插件
 * 用于显示元素时的动画。
 * @param maxOutput maxOutput输出越大，生成的css卷就越大。
 */
function createEnterPlugin(maxOutput = 6) {
  const createCss = (index: number, d = "x") => {
    const upd = d.toUpperCase();
    return {
      [`*> .enter-${d}:nth-child(${index})`]: {
        transform: `translate${upd}(50px)`,
      },
      [`*> .-enter-${d}:nth-child(${index})`]: {
        transform: `translate${upd}(-50px)`,
      },
      [`* > .enter-${d}:nth-child(${index}),* > .-enter-${d}:nth-child(${index})`]:
        {
          "z-index": `${10 - index}`,
          opacity: "0",
          animation: `enter-${d}-animation 0.4s ease-in-out 0.3s`,
          "animation-fill-mode": "forwards",
          "animation-delay": `${(index * 1) / 10}s`,
        },
    };
  };
  const handler = ({ addBase }) => {
    const addRawCss = {};
    for (let index = 1; index < maxOutput; index++) {
      Object.assign(addRawCss, {
        ...createCss(index, "x"),
        ...createCss(index, "y"),
      });
    }
    addBase({
      ...addRawCss,
      [`@keyframes enter-x-animation`]: {
        to: {
          opacity: "1",
          transform: "translateX(0)",
        },
      },
      [`@keyframes enter-y-animation`]: {
        to: {
          opacity: "1",
          transform: "translateY(0)",
        },
      },
    });
  };
  return { handler };
}
```

## 方法二、Tailwind CSS

Tailwind CSS 是一个由 js 编写的 CSS 框架 他是基于 postCss 去解析的<br />
[Tailwind CSS 官网](https://www.tailwindcss.cn/)

对于 PostCSS 的插件使用，我们再使用的过程中一般都需要如下步骤：

1. PostCSS 配置文件 postcss.config.js，新增 tailwindcss 插件。
2. TaiWindCss 插件需要一份配置文件，比如:tailwind.config.js。<br />

[PostCSS 官网](https://www.postcss.com.cn/)

#### postCss 功能介绍

1.增强代码的可读性 （利用从 Can I Use 网站获取的数据为 CSS 规则添加特定厂商的前缀。 Autoprefixer 自动获取浏览器的流行度和能够支持的属性，并根据这些数据帮你自动为 CSS 规则添加前缀。）

2.将未来的 CSS 特性带到今天！（PostCSS Preset Env 帮你将最新的 CSS 语法转换成大多数浏览器都能理解的语法，并根据你的目标浏览器或运行时环境来确定你需要的 polyfills，此功能基于 cssdb 实现。）

3.终结全局 CSS（CSS 模块 能让你你永远不用担心命名太大众化而造成冲突，只要用最有意义的名字就行了。）

4.避免 CSS 代码中的错误（通过使用 stylelint 强化一致性约束并避免样式表中的错误。stylelint 是一个现代化 CSS 代码检查工具。它支持最新的 CSS 语法，也包括类似 CSS 的语法，例如 SCSS 。）

postCss 处理 tailWind Css 大致流程

- 将 CSS 解析成抽象语法树(AST 树)
- 读取插件配置，根据配置文件，生成新的抽象语法树
- 将 AST 树”传递”给一系列数据转换操作处理（变量数据循环生成，切套类名循环等）
- 清除一系列操作留下的数据痕迹
- 将处理完毕的 AST 树重新转换成字符串

1. 安装 Tailwind 以及其它依赖项

```ts
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
或者
yarn add -D tailwindcss@latest postcss@latest autoprefixer@latest
```

2. 生成配置文件

```ts
npx tailwindcss init -p
```

3. 修改配置文件 tailwind.config.js

2.6 版本

```ts
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

3.0 版本

```ts
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```
4. 创建一个index.css
```ts
@tailwind base;
@tailwind components;
@tailwind utilities;
```
- 在main.ts 引入

![](/f1c25cd3a4e64dcfac2039b59d2f0748.png)

![](/82e4bef02496472d8d2edf6262d29b8b.png)