---
title: Vue中的动态类名（:class）、动态样式(:style)
description: Vue中的动态类名（:class）、动态样式(:style)
aside: false
date: 2023-01-15
tags:
  - vue
---

## 动态类名（:class）的一些用法
1、三元表达式判断
```vue
:class="address.length > 0 ? 'city' : 'city-gray'"

:class="{ 'is-active': form.avatar == i }"

:class="[
      sizeClass ? 'el-warning--' + sizeClass : '',
      {
        'is-no-spacing': this.noSpacingClass,
      },
    ]"
 
:class="[flexLeft ? 'expand-left' : 'expand-middle']"
```

2、单独组件中
```vue
HTML中
:class="[`startTheme-${themeConfig.label}`]"

Style中
.startTheme-green { color: green; }
.startTheme-red { color: red; }
```

## 动态样式(:style)的一些用法
1、基础用法
```vue
:style="{
      width: itemWidth + 'px',
      height: itemHeight + 'px',
      left: left + 'px',
      top: top + 'px',
    }"
```

2、结合计算属性一起使用
```vue
:style="{
      opacity,
    }"

computed: {
      opacity() {
          if (this.loading) return 0.69;
          return 1;
      },
},
```

3、三元表达式
```vue
:style="{ 'padding-top': search ? '44px' : '' }"

:style="$parent.value === id ? activeStyle : {}"
computed: {
    activeStyle() {
      return {
        color: this.$parent.activeColor,
      };
    },
},

:style="'background: url(' + require(`./img/bgCheck_${tabCheck === index ? 1 : 0}.png`) +')no-repeat'"
```

4、动态配置背景颜色、背景图片
```vue
<div
      class="main__header"
      :style="
        'background: ' +
        `${themeConfig.themeColor}` +
        ' url(' +
        require(`@/assets/themeCofing/${themeConfig.label}/personalInfo/header_bg.png`) +
        ')no-repeat center / contain;'
      "
></div>
```