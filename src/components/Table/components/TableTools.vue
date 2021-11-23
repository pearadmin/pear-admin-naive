<script lang="ts">
  export default {
    name: 'TableTools'
  }
</script>

<script setup lang="ts">
  import { NSpace } from 'naive-ui'
  import Reload from './Reload.vue'
  import SizeSetting from './SizeSetting.vue'
  import ColumnSetting from './ColumnSetting.vue'
</script>

<template>
  <div class="pear-admin-table-tools">
    <div class="pear-admin-table-tools-content">
      <Reload />
      <SizeSetting />
      <ColumnSetting />
    </div>
  </div>
</template>

<style scoped lang="less">
  .pear-admin-table-tools {
    width: auto;
    height: auto;
    padding: 0 10px;
    &-content {
      width: auto;
      min-width: 80px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
