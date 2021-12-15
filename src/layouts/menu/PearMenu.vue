<script setup lang="ts">
  import { useMenu } from '@/layouts/menu/useMenu'
  import { computed } from 'vue'
  import { useLayoutContextData } from '@/layouts/createLayoutContextData'

  const { menuRef: menus, expandKeys, updateExpandKeys, currentMenu, updateValue } = useMenu()

  // const themeConfig = inject('themeConfig')
  const { provideState } = useLayoutContextData()
  const themeConfig = computed(() => {
    return provideState.value.theme
  })
</script>

<template>
  <NScrollbar style="max-height: calc(100vh - 48px)">
    <n-menu
      :options="menus"
      :root-indent="16"
      :indent="12"
      :expanded-keys="expandKeys"
      :on-update:expanded-keys="updateExpandKeys"
      :value="currentMenu"
      :on-update:value="updateValue"
      v-bind="themeConfig"
    />
  </NScrollbar>
</template>

<style scoped lang="less">
  .menu-wrapper {
    max-height: calc(100vh - 48px);
  }
</style>
