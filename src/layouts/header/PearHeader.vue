<script setup lang="ts"></script>

<template>
  <n-layout-header position="absolute" class="pear-admin-header">
    <div class="pear-admin-header-top">
      <AppSetting />
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
