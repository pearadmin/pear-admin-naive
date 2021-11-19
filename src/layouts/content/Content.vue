<script setup lang="ts">
  import { NLayoutContent } from 'naive-ui'
  import RouteTabs from './RouteTabs.vue'
</script>

<template>
  <n-layout-content
    embedded
    content-style=""
    :native-scrollbar="false"
    class="pear-admin-content"
  >
    <router-view></router-view>
  </n-layout-content>
</template>

<style scoped lang="less">
  .pear-admin-content {
    @apply h-full;
    height: calc(100vh - 140px);
  }
</style>
