---
title: css控制单行或者多行文本超出显示省略号
description: css控制单行或者多行文本超出显示省略号
aside: false
date: 2023-01-28
tags:
  - css
---

## 1.单行文本
使用text-overflow：ellipsis属性

text-overflow: clip|ellipsis|string;

clip：修剪文本。

ellipsis：显示省略符号来代表被修剪的文本。

string：使用给定的字符串来代表被修剪的文本。

示例：
css:
```js
p{
  overflow: hidden;/*超出部分隐藏*/
  text-overflow:ellipsis;/* 超出部分显示省略号 */
  white-space: nowrap;/*规定段落中的文本不进行换行 */
  width: 250px;/*需要配合宽度来使用*/
  border: 1px solid red;
  font-size: 30px;
}
```
html:
```js
<p>单行文本超出部分显示省略号我是mdzz</p>
```
效果图：
![](/1216172.png)

## 2.多行文本显示省略号，省略号在段尾
方法一：

```js
p{
　display: -webkit-box;
　-webkit-box-orient: vertical;
　-webkit-line-clamp: 3;
　overflow: hidden;
　width: 250px;
　border: 1px solid red;
　font-size: 30px;
}
```

因使用了WebKit的CSS扩展属性，该方法适用于WebKit浏览器及移动端；

注：<br />
1、-webkit-line-clamp用来限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他的WebKit属性。常见结合属性：<br />
2、display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。<br />
3、-webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。

效果图：
![](/1216173.png)

方法二：省略号在中间，根据伪类来设置背景遮挡文字
适用范围：<br />
该方法适用范围广，但文字未超出行的情况下也会出现省略号,可结合js优化该方法。
注：

1.将height设置为line-height的整数倍，防止超出的文字露出。

2.给p::after添加渐变背景可避免文字只显示一半。

3.由于ie6-7不显示content内容，所以要添加标签兼容ie6-7（如：```<span>…<span/>```）；兼容ie8需要将::after替换成:after。

```js
p{
　position: relative;
　line-height: 20px; //可变
　max-height: 80px;//可变
　overflow: hidden;
　width: 240px;//可变
　border: 1px solid red;
}
p::after{
　content: "...";
　position: absolute;
　bottom: 0;
　font-size: 18px;
　right: 7px; //可变
　padding-right: 124px;//可变
　　//兼容性处理
　background: -webkit-linear-gradient(left, transparent, #fff 0%);
　background: -o-linear-gradient(right, transparent, #fff 0%);
　background: -moz-linear-gradient(right, transparent, #fff 0%);
　background: linear-gradient(to right, transparent, #fff 0%);
}
```
效果图：
![](/1216174.png)