<script setup lang="ts">
  import { computed } from 'vue'
  import { TableSize, useTableContext } from "@/components/Table/composables/useTableContext";

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

  const iconSize = computed(() => {
    return tableProvideState.value.iconSize
  })

  const tableSize = computed(() => {
    return tableProvideState.value.tableSize
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
