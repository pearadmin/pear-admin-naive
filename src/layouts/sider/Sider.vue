<script setup lang="ts">
  import { NLayoutSider } from 'naive-ui'
  import PearMenu from '../menu'
  import AppLogo from './AppLogo.vue'
  import { ref } from "vue";

  const collapsed = ref<boolean>(false)

  function handleCollapsed (value) {
    collapsed.value = value
  }
</script>

<template>
  <NLayoutSider
    collapse-mode="width"
    :width="200"
    bordered
    show-trigger
    :collapsed="collapsed"
    :native-scrollbar="false"
    :on-update:collapsed="handleCollapsed"
  >
    <AppLogo :showTitle="!collapsed" />
    <PearMenu />
  </NLayoutSider>
</template>

<style scoped lang="less"></style>
