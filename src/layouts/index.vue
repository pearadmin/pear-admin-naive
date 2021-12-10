<script lang="ts" setup>
  import PearSider from './sider'
  import PearHeader from './header'
  import PearContent from './content'
  import PearFooter from './footer'
  import { provide, ref } from 'vue'
  import { useRouterViewRefresh } from '@/composables/useRouterViewRefresh'
  import { createLayoutContext } from '@/layouts/createLayoutContext'

  const themeConfig = ref<Recordable>({
    inverted: true
  })
  provide('themeConfig', themeConfig)

  // create layout context
  createLayoutContext()

  // route refresh
  useRouterViewRefresh()
</script>
<template>
  <div class="pear-admin-layout-wrapper">
    <n-layout embedded has-sider position="absolute">
      <PearSider />
      <n-layout embedded class="pear-admin-layout-wrapper-layout">
        <div style="height: 92px"></div>
        <PearHeader />
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
      //width: v-bind(layoutWith);
      //left: v-bind(left) !important;
      //padding-left: v-bind(left);
      //transition: 0.3s;
    }
  }
</style>
