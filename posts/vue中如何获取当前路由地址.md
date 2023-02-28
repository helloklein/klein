---
title: vue中如何获取当前路由地址
description: vue中如何获取当前路由地址
aside: false
date: 2023-01-16
tags:
  - vue
---

# 一、vue获取当前路由地址
## router和$route的区别
- $router: 路由操作对象，只写。需要对路由进行操作时使用。如路由跳转
- $route: 路由信息对象，只读。获取路由相关信息时使用。如获取当前路由地址

## 获取当前路由地址
```vue
this.$route.path
```
- 原生方法：
```vue
window.location.href
```

## 获取路由参数（query/params传参）
### query传参时：
- 路由跳转：
```vue
this.$router.push({ name: 'name', query: { id: '123', data: '456' } })
```
- 获取参数：
```vue
this.$route.query
```

### params传参时：
- 路由跳转：
```vue
this.$router.push({ name: 'name', params: { id: '123', data: '456' } })
```
- 获取参数：
```vue
this.$route.params
```
<hr />

# 二、vue实时获取路由地址
## 方式一：window.location
- 测试网址：https://sso-test.digitalblockland.com:8080/offcial/home?id=123&username=xxx

1.window.location.href（当前URL）
```vue
结果：https://sso-test.digitalblockland.com:8080/offcial/home?id=123&username=xxx
```

2.window.location.protocol（协议）
```vue
结果：https
```

3.window.location.host（域名 + 端口）
```vue
结果：sso-test.digitalblockland.com:8080
```

4.window.location.hostname（域名）
```vue
结果：sso-test.digitalblockland.com
```

5.window.location.port（端口）
```vue
结果：8080
```

6.window.location.pathname（路径部分）
```vue
结果：/offcial/home
```

7.window.location.search（请求的参数）
```vue
结果：?id=123&username=xxx
```
```vue
let url="www.baidu.com?a=1&b=2&C=3";//测试地址
/*分析：最前面是?或&，紧跟着除 ?&#以外的字符若干，然后再等号，最后再跟着除 ?&#以外的字符，并且要分组捕获到【除?&#以外的字符】*/
let reg=/[?&]([^?&#]+)=([^?&#]+)/g;
let param={};
let ret =  reg.exec(url);
while(ret){//当ret为null时表示已经匹配到最后了，直接跳出
  param[ret[1]]=ret[2];
  ret = reg.exec(url);
}
console.log(param)
```

8.window.location.origin（'?'前边的URL）
```vue
结果：https://sso-test.digitalblockland.com:8080/offcial/home
```
9.window.location.hash（获取#之后的内容）
```vue
结果：null
```

## 方式二：vue-router
### 1.this.$route的内容：
![](/router.png)
#### （1）this.$route.fullPath:
- 完成解析后的 URL，包含查询参数和 hash 的完整路径，即 “端口号/#” 之后的内容。
![](/router1.png)
#### （2）this.$route.hash
- 当前路由的 hash 值 (带 #) ，如果没有 hash 值，则为空字符串。
#### （3）this.$route.matched
- 官网说明：一个数组，包含当前路由的所有嵌套路径片段的路由记录 。路由记录就是 routes 配置数组中的对象副本 (还有在 children 数组)。
![](/router2.png)
#### （4）this.$route.meta、this.$route.name
![](/router3.png)
![](/router4.png)
#### （5）this.$route.name
- 当前路由的名称，如果有的话。
#### （6）this.$route.params
- 一个 key/value 对象，包含了动态片段和全匹配片段，如果没有路由参数，就是一个空对象。
![](/router5.png)
![](/router6.png)
#### （7）this.$route.query
- 一个 key/value 对象，表示 URL 查询参数。如果没有查询参数，则是个空对象。
![](/router7.png)
![](/router8.png)

### 2.实时获取route地址并根据地址做处理
```vue
watch: {
  $route(val) {
    //val即是this.$route
    //根据路由控制其他参数做不同处理
    if (val.path == "/xinyidai") {
      this.isCur = 5;
    } else if (val.path == "/fiProduct" || val.path == "/fiProductDetail") {
      this.isCur = 1;
    } else if (val.path == "/fiProductBx" ||val.path == "/fiProductBxDetail") {
      this.isCur = 2;
    } else if (val.path == "/stock" || val.path == "/stockDetail") {
      this.isCur = 4;
    } else {
      this.isCur = "";
    }
  },
},
```