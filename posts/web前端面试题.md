---
title: web前端面试题
description: web前端面试题
aside: false
date: 2024-10-08
tags:
  - 面试题
---

## Vue系列
### 说说你对vue的理解
![](/mianshi1.png)
# 一、从历史说起
---
Web是World Wide Web的简称，中文译为万维网我们可以将它规划成如下的几个时代来进行理解
- 石器时代
- 文明时代
- 工业革命时代
- 百花齐放时代
#### 石器时代
石器时代指的就是我们的静态网页，可以欣赏一下1997的Apple官网
![](/mianshi2.png)
最早的网页是没有数据库的，可以理解成就是一张可以在网络上浏览的报纸，直到CGI技术的出现通过 CGI Perl 运行一小段代码与数据库或文件系统进行交互，如当时的Google（1998年）
![](/mianshi3.png)
#### 文明时代
ASP，JSP大家应该都不会太陌生，最早出现于 2005 年左右，先后出现了微软的 ASP 和 Java Server Pages [JSP] 等技术,取代了 CGI ，增强了 WEB 与服务端的交互的安全性，类似于下面这样，其实就是Java + HTML

`
<%@ page language="java" contentType="text/html; charset=utf-8"     pageEncoding="utf-8"%> <!DOCTYPE html> <html> <head>   <meta charset="utf-8">   <title>JSP demo</title> </head> <body>   <img src="http://localhost:8080/web05_session/1.jpg" width=200 height=100 /> </body> </html>
`

JSP有一个很大的缺点，就是不太灵活，因为JSP是在服务器端执行的，通常返回该客户端的就是一个HTML文本。我们每次的请求：获取的数据、内容的加载，都是服务器为我们返回渲染完成之后的 DOM，这也就使得我们开发网站的灵活度大打折扣在这种情况下，同年：Ajax火了(小细节，这里为什么说火了，因为 Ajax 技术并不是 2005 年出现的，他的雏形是 1999 年)，现在看来很常见的技术手段，在当时可是珍贵无比
#### 工业革命时代
到这里大家就更熟悉了，移动设备的普及，Jquery的出现，以及SPA（Single Page Application 单页面应用）的雏形，Backbone EmberJS AngularJS 这样一批前端框架随之出现，但当时SPA的路不好走，例如SEO问题，SPA 过多的页面、复杂场景下 View 的绑定等，都没有很好的处理经过这几年的飞速发展，节约了开发人员大量的精力、降低了开发者和开发过程的门槛，极大提升了开发效率和迭代速度，我们可以称之其为工业时代
#### 百花齐放时代
这里没有文字，放一张图感受一下
![](/mianshi4.png)
PS：这里为什么要说这么多Web的历史，我们可以看到Web技术的变化之大与快，每一种新的技术出现都是一些特定场景的解决方案，那我们今天的主角Vue又是为了解决什么呢？我们接着往下看

# 二、vue是什么
---
Vue.js（/vjuː/，或简称为Vue）是一个用于创建用户界面的开源JavaScript框架，也是一个创建单页应用的Web应用框架。2016年一项针对JavaScript的调查表明，Vue有着89%的开发者满意度。在GitHub上，该项目平均每天能收获95颗星，为Github有史以来星标数第3多的项目同时也是一款流行的JavaScript前端框架，旨在更好地组织与简化Web开发。Vue所关注的核心是MVC模式中的视图层，同时，它也能方便地获取数据更新，并通过组件内部特定的方法实现视图与模型的交互PS: Vue作者尤雨溪是在为AngularJS工作之后开发出了这一框架。他声称自己的思路是提取Angular中为自己所喜欢的部分，构建出一款相当轻量的框架最早发布于2014年2月
# 三、Vue核心特性
---
#### 数据驱动（MVVM)
`MVVM`表示的是 `Model-View-ViewModel`
- Model：模型层，负责处理业务逻辑以及和服务器端进行交互
- View：视图层：负责将数据模型转化为UI展示出来，可以简单的理解为HTML页面
- ViewModel：视图模型层，用来连接Model和View，是Model和View之间的通信桥梁
![](/mianshi5.png)
#### 组件化
1. 什么是组件化一句话来说就是把图形、非图形的各种逻辑均抽象为一个统一的概念（组件）来实现开发的模式，在Vue中每一个.vue文件都可以视为一个组件2.组件化的优势
- 降低整个系统的耦合度，在保持接口不变的情况下，我们可以替换不同的组件快速完成需求，例如输入框，可以替换为日历、时间、范围等组件作具体的实现
- 调试方便，由于整个系统是通过组件组合起来的，在出现问题的时候，可以用排除法直接移除组件，或者根据报错的组件快速定位问题，之所以能够快速定位，是因为每个组件之间低耦合，职责单一，所以逻辑会比分析整个系统要简单
- 提高可维护性，由于每个组件的职责单一，并且组件在系统中是被复用的，所以对代码进行优化可获得系统的整体升级
#### 指令系统
解释：指令 (Directives) 是带有 v- 前缀的特殊属性作用：当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM
- 常用的指令
    - 条件渲染指令 v-if
    - 列表渲染指令v-for
    - 属性绑定指令v-bind
    - 事件绑定指令v-on
    - 双向数据绑定指令v-model
没有指令之前我们是怎么做的？是不是先要获取到DOM然后在....干点啥

# 四、Vue跟传统开发的区别
---
没有落地使用场景的革命不是好革命，就以一个高频的应用场景来示意吧注册账号这个需求大家应该很熟悉了，如下
![](/mianshi6.png)
用`jquery`来实现大概的思路就是选择流程dom对象，点击按钮隐藏当前活动流程dom对象，显示下一流程dom对象如下图(代码就不上了，上了就篇文章就没了..)
![](/mianshi7.png)
用`vue`来实现，我们知道`vue`基本不操作`dom`节点， 双向绑定使`dom`节点跟视图绑定后，通过修改变量的值控制`dom`节点的各类属性。所以其实现思路为：视图层使用一变量控制dom节点显示与否，点击按钮则改变该变量，如下图
![](/mianshi8.png)
总结就是：
- Vue所有的界面事件，都是只去操作数据的，Jquery操作DOM
- Vue所有界面的变动，都是根据数据自动绑定出来的，Jquery操作DOM

# 五、Vue和React对比
---
这里就做几个简单的类比吧，当然没有好坏之分，只是使用场景不同
#### 相同点
- 都有组件化思想
- 都支持服务器端渲染
- 都有Virtual DOM（虚拟dom）
- 数据驱动视图
- 都有支持native的方案：`Vue`的`weex`、`React`的`React native`
- 都有自己的构建工具：`Vue`的`vue-cli`、`React`的`Create React App`
#### 区别
- 数据流向的不同。`react`从诞生开始就推崇单向数据流，而`Vue`是双向数据流
- 数据变化的实现原理不同。`react`使用的是不可变数据，而`Vue`使用的是可变的数据
- 组件化通信的不同。`react`中我们通过使用回调函数来进行通信的，而`Vue`中子组件向父组件传递消息有两种方式：事件和回调函数
- diff算法不同。`react`主要使用diff队列保存需要更新哪些DOM，得到patch树，再统一操作批量更新DOM。`Vue` 使用双向指针，边对比，边更新DOM
---
### 说说你对SPA（单页应用）的理解?
![](/mianshi9.png)
# 一、什么是SPA
---
SPA（single-page application），翻译过来就是单页应用SPA是一种网络应用程序或网站的模型，它通过动态重写当前页面来与用户交互，这种方法避免了页面之间切换打断用户体验在单页应用中，所有必要的代码（`HTML`、`JavaScript`和`CSS`）都通过单个页面的加载而检索，或者根据需要（通常是为响应用户操作）动态装载适当的资源并添加到页面页面在任何时间点都不会重新加载，也不会将控制转移到其他页面举个例子来讲就是一个杯子，早上装的牛奶，中午装的是开水，晚上装的是茶，我们发现，变的始终是杯子里的内容，而杯子始终是那个杯子结构如下图
![](/mianshi10.png)
我们熟知的JS框架如`react`,`vue`,`angular`,`ember`都属于`SPA`

# 二、SPA和MPA的区别
---
上面大家已经对单页面有所了解了，下面来讲讲多页应用MPA（MultiPage-page application），翻译过来就是多页应用在`MPA`中，每个页面都是一个主页面，都是独立的当我们在访问另一个页面的时候，都需要重新加载`html`、`css`、`js`文件，公共文件则根据需求按需加载如下图
![](/mianshi11.png)

**单页应用与多页应用的区别**

|   |单页面应用（SPA）|多页面应用（MPA）|
|:-|:-|:-|
|组成|一个主页面和多个页面片段|多个主页面|
|刷新方式|局部刷新|整页刷新|
|url模式|哈希模式|历史模式|
|SEO搜索引擎优化|难实现，可使用SSR方式改善|容易实现|
|数据传递|容易|通过url、cookie、localStorage等传递|
|页面切换|速度快，用户体验良好|切换加载资源，速度慢，用户体验差|
|维护成本|相对容易|相对复杂|

**单页应用优缺点**

优点：
- 具有桌面应用的即时性、网站的可移植性和可访问性
- 用户体验好、快，内容的改变不需要重新加载整个页面
- 良好的前后端分离，分工更明确

缺点：

- 不利于搜索引擎的抓取
- 首次渲染速度相对较慢

# 三、实现一个SPA
---
**原理**
1. 监听地址栏中hash变化驱动界面变化
2. 用pushsate记录浏览器的历史，驱动界面发送变化

![](/mianshi12.png)

**实现**
`hash` 模式
核心通过监听`url`中的`hash`来进行路由跳转
```js
// 定义 Router  
class Router {  
    constructor () {  
        this.routes = {}; // 存放路由path及callback  
        this.currentUrl = '';  
          
        // 监听路由change调用相对应的路由回调  
        window.addEventListener('load', this.refresh, false);  
        window.addEventListener('hashchange', this.refresh, false);  
    }  
      
    route(path, callback){  
        this.routes[path] = callback;  
    }  
      
    push(path) {  
        this.routes[path] && this.routes[path]()  
    }  
}  
  
// 使用 router  
window.miniRouter = new Router();  
miniRouter.route('/', () => console.log('page1'))  
miniRouter.route('/page2', () => console.log('page2'))  
  
miniRouter.push('/') // page1  
miniRouter.push('/page2') // page2 
```
`history`模式
`history` 模式核心借用 `HTML5 history api`，`api` 提供了丰富的 `router` 相关属性先了解一个几个相关的api
- `history.pushState` 浏览器历史纪录添加记录
- `history.replaceState`修改浏览器历史纪录中当前纪录
- `history.popState` 当 `history` 发生变化时触发
```js
// 定义 Router  
class Router {  
    constructor () {  
        this.routes = {};  
        this.listerPopState()  
    }  
      
    init(path) {  
        history.replaceState({path: path}, null, path);  
        this.routes[path] && this.routes[path]();  
    }  
      
    route(path, callback){  
        this.routes[path] = callback;  
    }  
      
    push(path) {  
        history.pushState({path: path}, null, path);  
        this.routes[path] && this.routes[path]();  
    }  
      
    listerPopState () {  
        window.addEventListener('popstate' , e => {  
            const path = e.state && e.state.path;  
            this.routers[path] && this.routers[path]()  
        })  
    }  
}  
  
// 使用 Router  
  
window.miniRouter = new Router();  
miniRouter.route('/', ()=> console.log('page1'))  
miniRouter.route('/page2', ()=> console.log('page2'))  
  
// 跳转  
miniRouter.push('/page2')  // page2  
```