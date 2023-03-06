---
title: Vue3中TSX和h函数的用法
description: Vue3中TSX和h函数的用法
aside: false
date: 2023-03-02
tags:
  - Vue3
---

## Vue3中TSX的用法
安装插件
```vue
npm i @vitejs/plugin-vue-jsx -D
```
### `vite.config.ts`配置
```tsx
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
})
```
注意：如果遇到项目启动报错问题TypeError: vite.createFilter is not a function的话，说明vite插件与vite版本不一致。解决npm install -D vite@^3。

## 使用方式
1、返回一个渲染函数<br />
App.tsx
```tsx
export default function () {
  return (<div>我是返回一个渲染函数的jsx写法</div>)
}
```
App.vue
```vue
<script setup lang="ts">
import TestJsx from './App'
</script>

<template>
    <test-jsx />
</template>
```
2、optionsApi
App.tsx
```tsx
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      name: '渲染函数'
    }
  },
  render() {
    return (<h1>{this.name}</h1>)
  }
})
```
3、setup函数模式
App.tsx
```tsx
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return () => <div>setup模式</div>
  }
})
```
## 基本用法
主要是介绍setup函数模式中 tsx 的用法<br />
在App.tsx中演示示例代码
### 1、插值
使用{}单括号，ref在template模式下会自动解包，tsx下不会
```tsx
export default defineComponent({
  setup() {
    const flag = ref('插值')
    return () => <div>{flag.value}</div>
  }
})
```
多个根节点Fragment
```tsx
export default defineComponent({
  setup() {
    const flag = ref('插值')
    return () => (
      <>
        <span>哈喽</span>
        <div>{flag.value}</div>
      </>
    )
  }
})
```
### 2、动态属性绑定
如果需要绑定多个属性，使用…操作符
```tsx
export default defineComponent({
  setup() {
    const flag = ref('插值')
    return () => <div name={flag.value}>{flag.value}</div>
  }
})
```
```tsx
export default defineComponent({
  setup() {
    const flag = ref('插值')
    const properties = {
        a: '属性1',
        b: '属性2'
    }
    return () => <div {...properties}>{flag.value}</div>
  }
})
```
### 3、指令
- v-show
```tsx
export default defineComponent({
  setup() {
    const flag = ref(false)
    return () => <input v-show={flag.value} />
  }
})
```
- v-model
```tsx
export default defineComponent({
  setup() {
    const flag = ref<string>('')
    return () => (
      <>
        <input v-model={flag.value} />
        <p>{flag.value}</p>
      </>
    )
  }
})
```
### 4、插槽slot
```tsx
const otherComp = (props, { slots }) => (
  <>
    <h1>{ slots.default ? slots.default() : '我是默认插槽' }</h1>
    <h2>{ slots.bar?.() }</h2>
  </>
)

export default defineComponent({
  setup() {
    const slots = {
      bar: () => <span>bar 插槽内容</span>
    }
    return () => (
      <otherComp v-slots={slots}>
        <div>新添加的默认内容</div>
      </otherComp>
    )
  }
})
```
或者
```tsx
export default defineComponent({
  setup() {
    const slots = {
      default: () => <div>新添加的默认内容</div>,
      bar: () => <span>bar 插槽内容</span>
    }
    return () => <otherComp v-slots={slots}></otherComp>
  }
})
```
### 5、条件渲染
使用if/else，三目运算符，不能使用v-if
```tsx
export default defineComponent({
  setup() {
    const flag = ref(false)
    return () => <div>{ flag.value ? '我是真的' : '我是假的' }</div>
  }
})
```
```tsx
export default defineComponent({
  setup() {
    const flag = ref(false)
    return () => {
      const divInfo = () => {
        if (flag.value) {
          return (
            <>
              <p>哈哈</p>
              <div>我是真的</div>
            </>
          )
        } else {
          return <div>我是假的</div>
        }
      }
      return [divInfo()]
    }
  }
})
```
### 6、循环
使用map函数
```tsx
export default defineComponent({
  setup() {
    const list = ['哈喽', '小马', '小羊']
    return () => (
      <>
        { list.map(i => <div>{i}</div>) }
      </>
    )
  }
})
```
### 7、事件绑定
事件绑定需要在事件名前面加上on前缀，onClick与模板中的@click等价
```tsx
export default defineComponent({
  setup() {
    const list = ['哈喽', '小马', '小羊']
    const fn = () => {
      console.log('我被点击了')
    }
    return () => (
      <>
        { list.map(i => <div onClick={() => fn()}>{i}</div>) }
      </>
    )
  }
})
```
### 8、传值prop和emit
App.tsx
```tsx
import { defineComponent, ref } from 'vue'

interface Props {
  name?: string
}
export default defineComponent({
  props: {
    name: String
  },
  emits: ['change-param'],
  setup(props: Props, { emit }) {
    const fn = ((para: string) => {
      console.log('触发了', para)
      emit('change-param', para)
    })
    return () => (
      <>
        <div>props: {props?.name}</div>
      </>
    )
  }
})
```
App.vue
```tsx
<script setup lang="ts">
import { ref } from "vue"
import TestJsx from './App'

const getParam = (v: string) => {
  console.log("父组件收到了子组件的数据", v)
}
</script>
<template>
    <test-jsx name="哈喽" @change-param="getParam" />
</template>
```

## Vue3自动引入插件
插件：unplugin-auto-import/vite<br />
vite.config.ts配置
```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), AutoImport({
    imports: ['vue'],
    dts: 'src/auto-import.d.ts'
  })]
  }
})
```
配置完成之后，使用ref，reactive等无须import 导入，可以直接使用。

## Vue3中函数式编程：h函数
vue的编写风格主要有template模板方式、JSX/TSX方式、还有函数式编程，用到的是 h 函数。<br />
h函数接收三个参数
- type：元素的类型
- propsOrChildren：数据对象，主要表示props，attrs，dom props，class，style，onClick等
- children：子节点<br />
h函数有多种组合方式
```tsx
// 除了类型必填以外，其他的参数都是可选的
h('div')
h('div', { id: 'foo' })

// attribute 和 property 都能在 prop 中书写
// Vue 会自动将它们分配到正确的位置
h('div', { class: 'bar', innerHTML: 'hello' })

// props modifiers such as .prop and .attr can be added
// with '.' and `^' prefixes respectively
h('div', { '.name': 'some-name', '^width': '100' })

// 类与样式可以像在模板中一样
// 用数组或对象的形式书写
h('div', { class: [foo, { bar }], style: { color: 'red' } })

// 事件监听器应以 onXxx 的形式书写
h('div', { onClick: () => {} })

// children 可以是一个字符串
h('div', { id: 'foo' }, 'hello')

// 没有 props 时可以省略不写
h('div', 'hello')
h('div', [h('span', 'hello')])

// children 数组可以同时包含 vnodes 与字符串
h('div', ['hello', h('span', 'hello')])
```
示例：包含props、emit传递参数，插槽的使用方法
```tsx
<template>
  <div>
    <Btn title="我是传递过来的标题" @on-emit-click="getBtn">
      <template #default>default</template>
      <template #footer>footer</template>
    </Btn>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
type Prop = {
  title: string
}

const Btn = (props: Prop, ctx: any) => {
  return h(
    'div',
    {
      style: {
        background: 'red',
        width: '200px',
        height: '100px',
        display: 'flex',
        'flex-direction': 'column',
        'align-items': 'center',
        'justify-content': 'center',
      },
      onClick: () => {
        ctx.emit('on-emit-click', '哈哈哈哈')
      }
    },
    [
      props?.title,
      h(
        'div',
        {
          style: {
            color: 'blue'
          },
        },
        ctx.slots.default(),
      ),
      h(
        'div',
        {
          style: {
            color: 'green'
          },
        },
        ctx.slots.footer(),
      ),
    ],
  )
}
const getBtn = (str: string) => {
  console.log(str)
}
</script>
```