<script lang="ts">
  export default {
    name: 'TableTools'
  }
</script>

<script setup lang="ts">
  import Reload from './Reload.vue'
  import SizeSetting from './SizeSetting.vue'
  import ColumnSetting from './ColumnSetting.vue'
  import ResizeHeight from './ResizeHeight.vue'
</script>

<template>
  <div class="pear-admin-table-tools">
    <div class="pear-admin-table-tools-content">
      <Reload />
      <ResizeHeight />
      <SizeSetting />
      <ColumnSetting />
    </div>
  </div>
</template>

<style scoped lang="less">
  .pear-admin-table-tools {
    width: auto;
    height: auto;
    &-content {
      width: auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      ::v-deep(.pear-admin-a) {
        margin-left: 10px;
      }
    }
  }
</style>
