<script setup lang="ts">
  import { NLayoutSider } from 'naive-ui'
  import PearMenu from '../menu'
</script>

<template>
  <NLayoutSider
    collapse-mode="width"
    :width="200"
    show-trigger="arrow-circle"
    content-style=""
    bordered
    :native-scrollbar="false"
  >
    <PearMenu />
  </NLayoutSider>
</template>

<style scoped lang="less"></style>
