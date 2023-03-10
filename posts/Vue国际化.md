---
title: Vue国际化
description: Vue国际化
aside: false
date: 2023-03-07
tags:
  - 项目搭建
---

[Vue-I18n官网](https://kazupon.github.io/vue-i18n/zh/installation.html)
## 安装I18n
```ts
yarn add vue-i18n@next
OR
pnpm add vue-i18n@next
```

## 1.创建文件
```ts
src
  └─ I18n
  |   └──language
  |   |   └──zh.ts //中文
  |   |   └──en.ts //英文
  |   └──index.ts
```
#### 文件内容
- /src/I18n/index.ts
```ts
//index.js
import {createI18n,I18n} from 'vue-i18n'
import zh from './language/zh'
import en from './language/en'
const i18n:I18n = createI18n({
	locale:  'zh',//默认中文
	messages:{
      zh,en
  },
  fallbackLocale: "en", //备用设置
})

// 此函数只是配合i18n Ally插件来进行国际化智能提示，并无实际意义（只对提示起作用），如果不需要国际化可删除
export const $t = (key: string) => key;

export default i18n
```
- zh.ts
```ts
export default{
	title:{
		home:'首页',
    login: '登录'
	},
	btn:{
		login:"登录"
	}
}
```
- en.ts
```ts
export default{
	title:{
		home:'home',
    login: 'login'
	},
	btn:{
		login:"login"
	}
}
```
## 2.修改src/main.ts
```ts
import { createApp } from 'vue'
import App from './App.vue'
import i18n from '@/I18n' // 引入刚才创建的I18文件
const app  = createApp(App)
app.use(i18n) // 引入刚才创建的I18文件
app.mount('#app')
```

## 3.可以简单使用了
```vue
<template>
  <div @click="seleLanguage('zh')">zh</div>
  <div @click="seleLanguage('en')">en</div>
  {{$t('title.home')}}
  {{$t('title.login')}}
  {{$t('btn.login')}}
</template>

<script setup lang="ts" name="HomeView">
import i18n from "@/I18n";
import loginApi  from "@/api/modules/loginApi";

function seleLanguage(indexValue:string) {
    i18n.global.locale = indexValue;
}
</script>

<style scoped></style>
```

## 4.vscodeI18插件
建议安装 【i18n Ally】 配置vscode文件 .vscode/settings
```ts
{
  // ...其他配置项
  // I18n插件提示 start
  "i18n-ally.localesPaths": ["src/I18n/language"], //这里写放zh.ts的路径
  "i18n-ally.keystyle": "nested",
  "i18n-ally.sortKeys": true,
  "i18n-ally.namespace": true,
  "i18n-ally.enabledParsers": ["yaml", "js","ts"], // zh en文件的后缀 
  "i18n-ally.sourceLanguage": "en", //翻译源语言
  "i18n-ally.displayLanguage": "zh", //翻译语言
  "i18n-ally.enabledFrameworks": ["vue"]
  // I18n插件提示 end
  // ...其他配置项
}
```