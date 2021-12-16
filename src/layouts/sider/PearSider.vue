<script setup lang="ts">
  import { computed } from 'vue'
  import { useLayoutContextData } from '@/layouts/createLayoutContextData'

  const { provideState } = useLayoutContextData()
  const themeConfig = computed(() => provideState.value.theme)
  const collapsed = computed((): boolean => provideState.value.collapsed as boolean)
  function handleCollapsed(val: boolean) {
    provideState.value.collapsed = val
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
