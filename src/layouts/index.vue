<script lang="ts" setup>
  import PearSider from './sider'
  import PearHeader from './header'
  import PearContent from './content'
  import PearFooter from './footer'
  import RouteTabs from './content/RouteTabs.vue'
  import { provide, ref } from 'vue'
  import { useRouterViewRefresh } from '@/composables/useRouterViewRefresh'

  const themeConfig = ref<Recordable>({
    inverted: false
  })
  provide('themeConfig', themeConfig)

  // route refresh
  useRouterViewRefresh()
</script>
<template>
  <div class="pear-admin-layout-wrapper">
    <n-layout embedded has-sider>
      <PearSider />
      <n-layout embedded class="pear-admin-layout-wrapper-layout">
        <PearHeader class="mt-1" />
        <RouteTabs />
        <PearContent />
        <PearFooter />
      </n-layout>
    </n-layout>
  </div>
</template>

<style lang="less">
  .pear-admin-layout-wrapper {
    @apply w-full min-h-screen h-full;
    &-layout {
      @apply w-full min-h-screen h-full;
    }
  }
</style>
