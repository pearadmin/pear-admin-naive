<script setup lang="ts">
  import PearMenu from '../menu'
  import AppLogo from './AppLogo.vue'
  import { computed } from 'vue'
  import { useLayoutContextData } from '@/layouts/createLayoutContextData'

  const { provideState, updateProvideState } = useLayoutContextData()

  const themeConfig = computed(() => provideState.value.theme)
  const collapsed = computed(() => provideState.value.collapsed)

  function handleCollapsed(val: boolean) {
    updateProvideState({
      collapsed: val
    })
  }
</script>

<template>
  <NLayoutSider
    class="pear-admin-layout-slider"
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

<style scoped lang="less">
  .pear-admin-layout-slider {
    z-index: 99;
  }
</style>
