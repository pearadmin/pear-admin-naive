<script setup lang="ts">
  import { NLayoutHeader } from 'naive-ui'
  import Setting from './Setting.vue'
</script>

<template>
  <n-layout-header class="pear-admin-header">
    <Setting />
  </n-layout-header>
</template>

<style scoped lang="less">
  .pear-admin-header {
    @apply h-12 w-full flex flex-row justify-end items-center;
  }
</style>
