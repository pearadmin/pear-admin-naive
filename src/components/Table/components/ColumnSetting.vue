<script lang="ts">
  export default {
    name: 'ColumnSetting'
  }
</script>

<script setup lang="ts">
  import Icon from '@/components/Icon'
  import { inject, Ref } from 'vue'
  import { NTooltip, TableProps } from 'naive-ui'
  import { iconSizeInjectKey } from '../composables/useTableConfig'

  const iconSize = inject<Ref<number>>(iconSizeInjectKey)
</script>

<template>
  <NTooltip>
    <template #trigger>
      <a href="javascript:;" class="pear-admin-a">
        <Icon name="ant-design:setting-outlined" :size="iconSize"></Icon>
      </a>
    </template>
    列设置
  </NTooltip>
</template>

<style scoped lang="less"></style>
