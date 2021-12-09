<script setup lang="ts">
  import PearMenu from '../menu'
  import AppLogo from './AppLogo.vue'
  import { inject, ref } from 'vue'

  const collapsed = ref<boolean>(false)

  function handleCollapsed(value) {
    collapsed.value = value
  }

  const themeConfig = inject('themeConfig')
</script>

<template>
  <NLayoutSider
    embedded
    collapse-mode="width"
    :width="200"
    bordered
    show-trigger
    :collapsed="collapsed"
    :native-scrollbar="false"
    :on-update:collapsed="handleCollapsed"
    v-bind="themeConfig"
  >
    <AppLogo :show-title="!collapsed" />
    <PearMenu />
  </NLayoutSider>
</template>

<style scoped lang="less"></style>
