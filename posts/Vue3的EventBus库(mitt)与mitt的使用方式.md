---
title: Vue3的EventBus库(mitt)与mitt的使用方式
description: Vue3的EventBus库(mitt)与mitt的使用方式
aside: false
date: 2023-03-02
tags:
  - Vue3
---

1、 在vue3中$on, $once, $off实例方法已经被移除，组件实例不再实现事件触发接口，所以我们熟悉的EventBus无法再使用了，但是，不要慌，有一个新的插件库（Mitt）（原理采用了发布订阅者模式实现）<br />
①安装
```vue
 npm install mitt -S
```
②main.ts初始化<br />
事件全局总线，vue3的入口文件main,ts中挂载全局属性：
```vue
import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import mitt from 'mitt'

//创建Mitt实例
const Mit = mitt();
//Typescript 注册
//由于必须要扩展ComponentCustomProperties类型才能获取类型提示
declare module 'vue'{
    export interface ComponentCustomProperties{
        $Bus:typeof Mit
    }
}

const app = createApp(App);
//vue挂载全局api                                                
app.config.globalProperties.$Bus = Mit
// 挂载到 Vue 根实例
app.use(router)
    .mount('#app');
```
父组件home组件引入A、B组件
```vue
<template>
	<div class="home_main">
		<A></A>
		<B></B>
	</div>
</template>
```
A组件使用emit传值
```vue
<template>
    <div class="a_main">
        我是A组件
        <button @click="changeEmit">修改值</button>
    </div>
</template>

<script lang='ts' setup>
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance()
const changeEmit = () => {
    instance?.proxy?.$Bus.emit('on-xin', true);
    instance?.proxy?.$Bus.emit('on-xin2', true);
    instance?.proxy?.$Bus.emit('on-xin3', true);
}
</script>

<style scoped lang="scss">
.a_main {
    width: 100%;
    height: 200px;
    background: red;
    color: #fff;
}
</style>
```
B组件使用on接收，也可用off阻止某一组件的值传递，也可以使用all.clear阻止全部emit的传递，如下
```vue
<template>
    <div class="b_main">
        我是B组件
    </div>
</template>

<script lang='ts' setup>
import { ref, getCurrentInstance } from 'vue'
type Cb = () => void
const instance = getCurrentInstance()
let Flag = ref(false)

const Bus = (str: any) => {
}
// *代表所有的事件监听
instance?.proxy?.$Bus.on('on-xin', Bus)
instance?.proxy?.$Bus.off('on-xin', Bus)  //清楚on-xin事件的emit
instance?.proxy?.$Bus.all.clear()  //清除所有的emit
</script>

<style scoped lang="scss">
.b_main {
    width: 300px;
    height: 300px;
    background: blue;
}
</style>
```