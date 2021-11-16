<script setup lang="ts">
  import { NMenu } from 'naive-ui'
  import { getRoutes, getMenuOptions } from "@/router/util";

  const routes = getRoutes()

  const menus = getMenuOptions(routes)
  // const menus = []
</script>

<template>
  <n-menu
    :options="menus"
  ></n-menu>
</template>

<style scoped lang="less"></style>
