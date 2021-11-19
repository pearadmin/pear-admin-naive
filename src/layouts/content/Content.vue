<script setup lang="ts">
  import { NLayoutContent } from 'naive-ui'
  import RouteTabs from './RouteTabs.vue'
</script>

<template>
  <n-layout-content
    embedded
    content-style=""
    :native-scrollbar="false"
    contet-style="padding: 24px"
    class="h-full"
  >
    <RouteTabs></RouteTabs>
    <router-view></router-view>
  </n-layout-content>
</template>

<style scoped lang="less"></style>
