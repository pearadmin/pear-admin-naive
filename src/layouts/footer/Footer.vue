<script setup lang="ts">
  import { NLayoutFooter } from 'naive-ui'
</script>

<template>
  <n-layout-footer class="pear-admin-footer">
    <div>©{{ new Date().getFullYear() }} 落小梅</div>
  </n-layout-footer>
</template>

<style scoped lang="less">
  .pear-admin-footer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
  }
</style>
