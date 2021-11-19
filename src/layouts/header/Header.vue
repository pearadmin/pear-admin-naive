<script setup lang="ts">
  import { NLayoutHeader } from 'naive-ui'
  import Setting from './Setting.vue'
  import UserDropdown from './UserDropdown.vue'
  import FullScreen from './FullScreen.vue'
  import ThemeTool from '@/components/Application/Settings/ThemeTool.vue'
</script>

<template>
  <n-layout-header class="pear-admin-header">
    <Setting />
    <UserDropdown />
    <FullScreen />
    <ThemeTool />
  </n-layout-header>
</template>

<style scoped lang="less">
  .pear-admin-header {
    @apply h-12 w-full flex flex-row flex-row-reverse justify-start items-center;
  }
</style>
