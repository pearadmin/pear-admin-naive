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
        collapse-mode="width"
        :width="200"
        show-trigger="arrow-circle"
        content-style=""
        bordered
        :native-scrollbar="false"
      >Left Sider</n-layout-sider>
      <n-layout
        class="pear-admin-layout-wrapper-layout"
        embedded
      >
        <n-layout-header
          class="h-12"
        >
          Header
        </n-layout-header>
        <n-layout-content
          embedded
          content-style=""
          :native-scrollbar="false"
          contet-style="padding: 24px"
          class="h-full"
        >
          <router-view></router-view>
        </n-layout-content>
        <n-layout-footer
        >
          Footer
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
