<script lang="ts" setup>
  import { NLayout, NLayoutHeader, NLayoutContent, NLayoutFooter, NLayoutSider } from "naive-ui";
</script>
<template>
  <div class="pear-admin-layout-wrapper">
    <n-layout
      has-sider
      embedded
    >
      <n-layout-sider
        content-style="padding: 24px;"
        bordered
        inverted
        :native-scrollbar="false"
      >海淀桥</n-layout-sider>
      <n-layout
        class="pear-admin-layout-wrapper-layout"
        embedded
      >
        <n-layout-header
          class="h-12"
          inverted
        >
          header
        </n-layout-header>
        <n-layout-content
          embedded
          content-style=""
          class="h-full"
          :native-scrollbar="false"
        >
          平山道
        </n-layout-content>
        <n-layout-footer
          inverted
        >
          成府路
        </n-layout-footer>
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