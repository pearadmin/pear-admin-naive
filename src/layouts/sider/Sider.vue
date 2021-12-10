<script setup lang="ts">
  import PearMenu from '../menu'
  import AppLogo from './AppLogo.vue'
  import { computed, inject } from 'vue'
  import { useLayoutContext } from '@/layouts/useLayoutContext'

  // const collapsed = ref<boolean>(false)
  //
  // function handleCollapsed(value) {
  //   collapsed.value = value
  // }

  const themeConfig = inject('themeConfig')

  const { layoutConfig, updLayoutConfig } = useLayoutContext()

  const collapsed = computed(() => {
    return layoutConfig.value.collapsed
  })

  function handleCollapsed(val: boolean) {
    updLayoutConfig({
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
