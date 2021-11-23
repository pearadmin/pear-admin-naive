<script lang="ts">
  export default {
    name: 'SizeSetting'
  }
</script>

<script setup lang="ts">
  import Icon from '@/components/Icon'
  import { inject, Ref, ref } from 'vue'
  import { NTooltip, NDropdown, TableProps } from 'naive-ui'

  const iconSize = inject('iconSize')

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

  const tableSize = inject('tableSize') as Ref<TableProps['size']>
  const changeTableSize = inject('changeTableSize') as Fn
</script>

<template>
  <NDropdown trigger="click" :options="options" placement="bottom-start" :value="tableSize" @select='changeTableSize'>
    <NTooltip>
      <template #trigger>
        <a href="javascript:;" class="pear-admin-a">
          <Icon name="ant-design:column-height-outlined" :size="iconSize"></Icon>
        </a>
      </template>
      密度
    </NTooltip>
  </NDropdown>
</template>

<style scoped lang="less"></style>
