<script lang="ts" setup>
  import { NLayout } from 'naive-ui'
  import PearSider from './sider'
  import PearHeader from './header'
  import PearContent from './content'
  import PearFooter from './footer'
  import RouteTabs from './content/RouteTabs.vue'

</script>
<template>
  <div class="pear-admin-layout-wrapper">
    <n-layout has-sider embedded>
      <PearSider />
      <n-layout class="pear-admin-layout-wrapper-layout" embedded>
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
