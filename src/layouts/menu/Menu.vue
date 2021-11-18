<script setup lang="ts">
  import { NMenu, NScrollbar } from 'naive-ui'
  import { getRoutes, getMenuOptions } from '@/router/util'

  const routes = getRoutes()

  const menus = getMenuOptions(routes)
</script>

<template>
  <NScrollbar
    style="max-height: calc(100vh - 48px)"
  >
    <n-menu :options="menus" :root-indent="16" :indent="12"></n-menu>
  </NScrollbar>
</template>

<style scoped lang="less">
  .menu-wrapper {
    max-height: calc(100vh - 48px);
  }
</style>
