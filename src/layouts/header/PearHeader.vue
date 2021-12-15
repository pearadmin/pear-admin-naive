<script setup lang="ts">
  import Setting from './Setting.vue'
  import UserDropdown from './UserDropdown.vue'
  import FullScreen from './FullScreen.vue'
  import ThemeTool from '@/components/Application/Settings/ThemeTool.vue'
  import RouteTabs from '../content/RouteTabs.vue'
</script>

<template>
  <n-layout-header position="absolute" class="pear-admin-header">
    <div class="pear-admin-header-top">
      <Setting />
      <UserDropdown />
      <FullScreen />
      <ThemeTool />
    </div>
    <RouteTabs />
  </n-layout-header>
</template>

<style scoped lang="less">
  .pear-admin-header {
    @apply h-auto flex w-full flex-col;
    //width: v-bind(headerWidth);
    z-index: 9;
    &-top {
      @apply h-12 flex w-full flex-row flex-row-reverse justify-start items-center;
    }
  }
</style>
