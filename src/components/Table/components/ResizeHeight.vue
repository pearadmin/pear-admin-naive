<script lang="ts">
  export default {
    name: 'ResizeHeight'
  }
</script>

<script setup lang="ts">
  import { inject, Ref } from 'vue'
  import {
    changeTableHeightInjectKey,
    iconSizeInjectKey,
    tableHeightInjectKey
  } from '../composables/useTableConfig'

  const iconSize = inject<Ref<number>>(iconSizeInjectKey)
  const tableHeight = inject<Ref<number>>(tableHeightInjectKey)
  const changeTableHeight = inject<Fn>(changeTableHeightInjectKey)
</script>

<template>
  <NPopover placement="bottom" trigger="click" style="height: 200px">
    <template #trigger>
      <NTooltip placement="top-start">
        <template #trigger>
          <a href="javascript:;" class="pear-admin-a">
            <Icon name="vaadin:resize-h" :size="iconSize" />
          </a>
        </template>
        表格高度(当一页展示50条或更多条记录时,尝试增加高度,展示更多的数据.)
      </NTooltip>
    </template>
    <NSlider
      vertical
      :min="400"
      :max="1200"
      :step="100"
      :value="tableHeight"
      :on-update:value="changeTableHeight"
    />
  </NPopover>
</template>

<style scoped lang="less"></style>
