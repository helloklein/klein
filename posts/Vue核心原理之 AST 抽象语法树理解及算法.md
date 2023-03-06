---
title: Vue 核心原理之 AST 抽象语法树理解及算法
description: Vue 核心原理之 AST 抽象语法树理解及算法
aside: false
date: 2023-03-06
tags:
  - vue
---

## AST 抽象语法树理解

1. 模版语法，通过抽象语法树 AST 进行过渡让编译工作变得简单，变成正常的 HTML 语法。
2. 抽象语法树本质上就是一个 JS 对象。
3. 抽象语法树和虚拟节点的关系，模版语法到抽象语法树 AST，渲染函数（h 函数），虚拟节点，界面。
4. 指针就是下标，不是 C 语言中的指针，C 语言中的指针可以操作内存。JS 中的指针就是一个下标位置。
5. 栈，如下所示：

- 栈（stack）又名堆栈，它是一种运算受限的线性表，仅在表尾能进行插入和删除操作。这一端被称为栈顶，相对地，把另一端称为栈底。
- 向一个栈插入新元素又称作进栈、入栈或压栈；从一个栈删除元素又称作出栈或退栈。
- 后进先出（LIFO）特点：栈中的元素，最先进栈的必定是最后出栈，后进栈的一定会先出栈。
- JavaScript 中，栈可以用数组模拟。需要限制只能使用 push()和 pop()，不能使用 unshift()和 shift()。即，数组尾是栈顶。
- 当然，可以用面向对象等手段，将栈封装的更好。

## 算法理解

1. 试输出斐波那契数列的前 10 项，即 1、1、2、3、5、8、13、21、34、55，代码如下所示：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <script>
      var cache = {};

      function fib(n) {
        if (cache.hasOwnProperty(n)) {
          return cache[n];
        }
        var v = n == 0 || n == 1 ? 1 : fib(n - 1) + fib(n - 2);
        cache[n] = v;
        return v;
      }

      for (let i = 0; i <= 9; i++) {
        console.log(fib(i));
      }
    </script>
  </body>
</html>
```

2. 转换数组的形式[1, 2, 3, [4, 5]]要变为这样的对象，代码如下所示：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <script>
      var arr = [1, 2, 3, [4, 5], [[[6], 7, 8], 9], 10];

      function convert(item) {
        if (typeof item == "number") {
          return {
            value: item,
          };
        } else if (Array.isArray(item)) {
          return {
            children: item.map((_item) => convert(_item)),
          };
        }
      }

      var o = convert(arr);
      console.log(o);
    </script>
  </body>
</html>
```

3. 试编写“智能重复”smartRepeat 函数，代码如下所示：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <script>
      function smartRepeat(templateStr) {
        var index = 0;
        var stack1 = [];
        var stack2 = [];
        var rest = templateStr;

        while (index < templateStr.length - 1) {
          rest = templateStr.substring(index);
          if (/^\d+\[/.test(rest)) {
            let times = Number(rest.match(/^(\d+)\[/)[1]);
            stack1.push(times);
            stack2.push("");
            index += times.toString().length + 1;
          } else if (/^\w+\]/.test(rest)) {
            let word = rest.match(/^(\w+)\]/)[1];
            stack2[stack2.length - 1] = word;
            index += word.length;
          } else if (rest[0] == "]") {
            let times = stack1.pop();
            let word = stack2.pop();
            stack2[stack2.length - 1] += word.repeat(times);
            index++;
          }
          console.log(index, stack1, stack2);
        }

        return stack2[0].repeat(stack1[0]);
      }

      var result = smartRepeat("3[2[3[a]1[b]]4[d]]");
      console.log(result);
    </script>
  </body>
</html>
```

4. 试寻找字符串中，连续重复次数最多的字符，代码如下所示：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <script>
      var str = "abbbccc";

      var i = 0;
      var j = 1;
      var maxRepeatCount = 0;
      var maxRepeatChar = "";

      while (i <= str.length - 1) {
        if (str[i] != str[j]) {
          if (j - i > maxRepeatCount) {
            maxRepeatCount = j - i;
            maxRepeatChar = str[i];
          }
          i = j;
        }
        j++;
      }

      console.log(
        maxRepeatChar + "重复了" + maxRepeatCount + "次，是最多的连续重复字符"
      );
    </script>
  </body>
</html>
```
