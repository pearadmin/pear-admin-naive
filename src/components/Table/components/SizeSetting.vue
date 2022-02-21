<script setup lang="ts">
  import { computed } from 'vue'
  import type { TableSize } from '@/components/Table/composables/useTableContext'
  import { useTableContext } from '@/components/Table/composables/useTableContext'

  const options = [
    {
      label: '紧凑',
      key: 'small'
    },
    {
      label: '默认',
      key: 'medium'
    },
    {
      label: '大号',
      key: 'large'
    }
  ]

  const { tableProvideState } = useTableContext()

  const iconSize = computed((): number => {
    return tableProvideState.value.iconSize as number
  })

  const tableSize = computed((): TableSize => {
    return tableProvideState.value.tableSize as TableSize
  })

  function changeTableSize(size: TableSize) {
    tableProvideState.value.tableSize = size
  }
</script>

<template>
  <NDropdown
    trigger="click"
    :options="options"
    placement="bottom-start"
    :value="tableSize"
    @select="changeTableSize"
  >
    <NTooltip>
      <template #trigger>
        <NButton text>
          <Icon name="ant-design:column-height-outlined" :size="iconSize" />
        </NButton>
      </template>
      密度
    </NTooltip>
  </NDropdown>
</template>

<style scoped lang="less"></style>
