<script setup lang="ts">
  import { computed } from 'vue'
  import { useTableContext } from '@/components/Table/composables/useTableContext'

  const { tableProvideState } = useTableContext()

  const iconSize = computed((): number => {
    return tableProvideState.value.iconSize as number
  })

  const tableHeight = computed((): number => {
    return tableProvideState.value.tableHeight as number
  })

  function changeTableHeight(height: number) {
    tableProvideState.value.tableHeight = height
  }
</script>

<template>
  <NPopover placement="bottom" trigger="click" style="height: 200px">
    <template #trigger>
      <NTooltip placement="top-start">
        <template #trigger>
          <NButton text>
            <Icon name="vaadin:resize-h" :size="iconSize" />
          </NButton>
        </template>
        表格高度(当一页展示50条或更多条记录时,尝试增加高度,展示更多的数据.)
      </NTooltip>
    </template>
    <NSlider
      style="height: 200px"
      vertical
      :min="400"
      :max="1200"
      :step="100"
      :value="tableHeight"
      :on-update:value="changeTableHeight"
    />
  </NPopover>
</template>
