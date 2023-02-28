---
title: Vue实现验证码的60s倒计时
description: Vue实现验证码的60s倒计时
aside: false
date: 2023-01-15
tags:
  - vue
---

:::demo

```vue
<template>
  <div>
    <el-button
      v-if="show"
      type="danger"
      style="background-color: #de8080;border-color: #de8080"
      @click="getPhoneCode"
      >获取验证码</el-button
    >
    <span v-if="!show" style="color: #707070;">{{ count }}s后重新获取</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      count: "",
      timer: null,
    };
  },
  methods: {
    getPhoneCode() {
      let TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
  },
};
</script>
```
:::
