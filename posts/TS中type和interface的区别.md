---
title: TS 中 type 和 interface 的区别
description: TS 中 type 和 interface 的区别
aside: false
date: 2023-03-03
tags:
  - typescript
---

## 概念
### 1、interface 接口
> 接口主要用于类型检查，它只是一个结构契约，定义了具有相似的名称和类型的对象结构。除此之外，接口还可以定义方法和事件。
### 2、type (alias)类型别名
> 不同于 interface 只能定义对象类型，type 声明还可以定义基础类型、联合类型或交叉类型。

## 差异点
### 1. 定义类型的范围
> interface 只能定义对象类型, 而 type 声明可以声明任何类型，包括基础类型、联合类型或交叉类型。

- 基本类型
```typescript
type Person = string;
```
- 联合类型
```typescript
interface Dog {
  name: string;
}
interface Cat {
  age: number;
}
type animal = Dog | Cat;
```
- 元组
```typescript
interface Dog {
  name: string;
}
interface Cat {
  age: number;
}
type animal = [Dog, Cat];
```
### 2. 扩展性
> 接口可以 extends、implements,从而扩展多个接口或类。类型没有扩展功能，只能交叉合并。
- interface extends interface
```typescript
interface Person {
  name: string;
}
interface User extends Person {
  age: number;
}
```
- interface extends type
```typescript
type Person = { name: string };
interface User extends Person {
  age: number;
}
```
#### type 使用交叉类型&来合并不同成员的类型
- type & type
```typescript
type Person = { name: string };
type User = Person & { age: number };
```
- type & interface
```typescript
interface Person {
  name: string;
}
type User = { age: number } & Person;
```
### 3. 合并声明
> 定义两个相同名称的接口会合并声明，定义两个同名的 type 会出现异常。

```typescript
interface Person {
  name: string;
}
interface Person {
  age: number;
}
// 合并为:interface Person { name: string age: number}

type User = {
  name: string;
};
type User = {
  age: number;
};
// 声明重复报错：标识符“User”重复。
```
### 4. type 可以获取 typeof 返回的值作为类型
```typescript
let div = document.createElement("div");
type B = typeof div; // HTMLDivElement
```