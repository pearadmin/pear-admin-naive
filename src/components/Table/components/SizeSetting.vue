<script lang="ts">
  export default {
    name: 'SizeSetting'
  }
</script>

<script setup lang="ts">
  import { inject, Ref } from 'vue'
  import {
    changeTableSizeInjectKey,
    iconSizeInjectKey,
    TableSize,
    tableSizeInjectKey
  } from '../composables/useTableConfig'

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
  const iconSize = inject<Ref<number>>(iconSizeInjectKey)
  const tableSize = inject<Ref<TableSize>>(tableSizeInjectKey)
  const changeTableSize = inject<Fn>(changeTableSizeInjectKey)
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
