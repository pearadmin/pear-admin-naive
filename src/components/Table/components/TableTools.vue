<script setup lang="ts"></script>

<template>
  <div class="pear-admin-table-tools">
    <div class="pear-admin-table-tools-content">
      <NSpace item-style="display:flex">
        <slot name="tools"></slot>
        <Reload />
        <ResizeHeight />
        <SizeSetting />
        <ColumnSetting />
      </NSpace>
    </div>
  </div>
</template>

<style scoped lang="less">
  .pear-admin-table-tools {
    width: auto;
    height: auto;
    &-content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
