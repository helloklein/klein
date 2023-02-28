---
title: CSS图片预加载的几种方式
description: CSS图片预加载的几种方式
aside: false
date: 2023-01-28
tags:
  - css
---

![](/20230128113108.png)

在开发的过程，我们经常会遇到这样的要求，当鼠标hover上去的时候，更改菜单的背景。如果没有进行图片预加载的话，会出现闪烁。那么拥有1px的眼睛的设计师们不会放过你的。为什么会出现这张情况？因为hover的时候，图片才会去加载。

首先我们要知道一点：如果图片在使用之前就已经请求过了，那么再次使用的时候，就不会再去请求（ps：图片路径一样）。下面讲实现方式

## 1.使用纯的css进行图片预加载
```js
body:after {
    content: "";
    display: block;
    position: absolute;
    background: url("../image/manage/help/help_item2_01.png?v=201707241359") no-repeat -10000px -1000px,url("../image/manage/help/help_item2_02.png?v=201707241359") no-repeat -10000px -1000px
    width: 0;
    height: 0
}
```
原理是加载了该图片，但是我们不显示在可视范围内。这种方式极其简单。但是也有一个致命的弱点，图片跟随文档一同加载，有时候我们为了提高文档的加载速度，那么这种方式方式就不适合了。

## 2.使用纯javascript进行图片预加载
```js
//存放图片路径的数组
var imgSrcArr = [
    'imgsrc1',
    'imgsrc2',
    'imgsrc3',
    'imgsrc4'
];

var imgWrap = [];

function preloadImg(arr) {
    for(var i =0; i< arr.length ;i++) {
        imgWrap[i] = new Image();
        imgWrap[i].src = arr[i];
    }
}

preloadImg(imgSrcArr);

//或者延迟的文档加载完毕在加载图片

$(function () {
    preloadImg(imgSrcArr);
})
```

## 3.使用css+js方式进行图片预加载
```js
.preload-img:after{
    content:"",
    background: url("../image/manage/help/help_item2_01.png?v=201707241359") no-repeat -10000px -1000px,url("../image/manage/help/help_item2_02.png?v=201707241359") no-repeat -10000px -1000px
}
/*
    比如我们写了上面的这样一个类，但是页面中没有用到，我们在文档加载完毕之后，给某个元素添加该类
*/
$(function(){
    $("#target").addClass("preload-img")
})
```

## 4.使用ajax方式进行图片预加载
```js
$(function(){
    $.get('图片的路径');
})
```