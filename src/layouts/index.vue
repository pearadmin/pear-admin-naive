<script lang="ts" setup>
  import { NLayout } from 'naive-ui'
  import PearSider from './sider'
  import PearHeader from './header'
  import PearContent from './content'
  import PearFooter from './footer'
  import RouteTabs from './content/RouteTabs.vue'
  import { provide, ref } from 'vue'

  const themeConfig = ref<Recordable>({
    inverted: false
  })
  provide('themeConfig', themeConfig)
</script>
<template>
  <div class="pear-admin-layout-wrapper">
    <n-layout embedded has-sider>
      <PearSider />
      <n-layout embedded class="pear-admin-layout-wrapper-layout">
        <PearHeader />
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
