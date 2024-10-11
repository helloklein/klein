<template>
  <div class="category" v-if="headers.length > 0">
    <ul class="list">
      <li class="header" v-for="(item, index) in headers" :key="index">
        <a :href="`#${item.slug}`" class="header-h1" v-if="item.level === 2">{{
          item.title
        }}</a>
        <ul>
          <li v-for="(oitem, oindex) in item.children" :key="oindex">
            <a :href="`#${oitem.slug}`" class="header-h2" v-if="oitem.level === 3">{{ oitem.title }}</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { useData } from "vitepress";
const pageData = useData();
const headers = pageData.page.value.headers;
</script>
<style scoped>
.category {
  width: 20rem;
  background: var(--vp-c-bg);
  box-shadow: 6px 6px var(--vp-c-brand);
  border: 4px solid #3f4e4f;
  color: var(--vp-c-brand-light);
  overflow-y: auto;
  max-height: 300px;
}
.list {
  padding-left: 1.25em;
  margin: 1rem 0;
  line-height: 1.7;
  list-style-type: none;
  box-sizing: border-box;
}
.header-h2 {
  display: inline-block;
  text-indent: 2em;
}
ul {
  list-style-type: none;
}
@media (min-width: 768px) {
  .category {
    max-height: 400px;
  }
}
@media (min-width: 1024px) {
  .category {
    max-height: 450px;
  }
}
@media (min-width: 1400px) {
  .category {
    position: fixed;
    right: 20px;
    max-height: 490px;
  }
}
</style>
