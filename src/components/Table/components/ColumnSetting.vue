<script lang="ts">
  export default {
    name: 'ColumnSetting'
  }
</script>

<script setup lang="ts">
  import Icon from '@/components/Icon'
  import { inject, Ref } from 'vue'
  import type { DataTableProps } from 'naive-ui'
  import { columnsInjectKey, iconSizeInjectKey } from '../composables/useTableConfig'

  const iconSize = inject<Ref<number>>(iconSizeInjectKey)

  const columns = inject<Ref<DataTableProps['columns']>>(columnsInjectKey)
</script>

<template>
  <NPopover placement="bottom-end" trigger="click">
    <template #trigger>
      <NTooltip>
        <template #trigger>
          <a href="javascript:;" class="pear-admin-a">
            <Icon name="ant-design:setting-outlined" :size="iconSize"></Icon>
          </a>
        </template>
        列设置
      </NTooltip>
    </template>
    <template #header>
      <div class="pear-admin-columns-setting-title">
        <NCheckbox>列展示</NCheckbox>
        <NElement tag="a" href="javascript:;" class="pear-admin-columns-setting-title-reset">
          重置
        </NElement>
      </div>
    </template>
    <div class="pear-admin-columns-setting-content">
      <NElement
        tag="div"
        v-for="(col, idx) in columns"
        :key="idx"
        class="pear-admin-columns-setting-content-item"
      >
        <!--        <NCheckbox>{{ col.title }}</NCheckbox>-->
        施工中
      </NElement>
    </div>
  </NPopover>
</template>

<style scoped lang="less">
  .pear-admin-columns-setting {
    ::v-deep(.n-popover .n-popover__content) {
      padding: 0px !important;
    }
    &-title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      &-reset {
        color: var(--primary-color);
      }
    }
    &-content {
      width: 180px;
      height: auto;
      background: var(--body-color);
      &-item {
        &:hover {
          background: var(--hover-color);
        }
      }
    }
  }
</style>
