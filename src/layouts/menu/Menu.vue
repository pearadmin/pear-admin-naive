<script setup lang="ts">
  import { NMenu, NScrollbar } from 'naive-ui'
  import { useMenu } from '@/layouts/menu/useMenu'
  import { ref } from 'vue'

  const {
    menuRef: menus,
    expandKeys,
    updateExpandKeys,
    currentMenu,
    updateValue
  } = useMenu()

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
      :on-update:value='updateValue'
    ></n-menu>
  </NScrollbar>
</template>

<style scoped lang="less">
  .menu-wrapper {
    max-height: calc(100vh - 48px);
  }
</style>
