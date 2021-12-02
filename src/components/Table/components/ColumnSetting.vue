<script lang="ts">
  export default {
    name: 'ColumnSetting'
  }
</script>

<script setup lang="ts">
  import Icon from '@/components/Icon'
  import { inject, ref, Ref, watch } from 'vue'
  import type { DataTableColumn } from 'naive-ui'
  import { columnsInjectKey, iconSizeInjectKey } from '../composables/useTableConfig'
  import { getColumns } from '@/components/Table/helper'

  // @ts-ignore
  export interface CustomTableColumn extends DataTableColumn {
    visible?: Ref<boolean>
  }
  // @ts-ignore
  export type ColumnsSetting = CustomTableColumn[]

  const iconSize = inject<Ref<number>>(iconSizeInjectKey)

  const columns = inject<Ref<ColumnsSetting>>(columnsInjectKey)

  const leftColumns = ref<ColumnsSetting>([])
  const centerColumns = ref<ColumnsSetting>([])
  const rightColumns = ref<ColumnsSetting>([])

  watch(
    () => columns,
    (cols) => {
      const { left, center, right } = getColumns(cols?.value)
      leftColumns.value = left
      centerColumns.value = center
      rightColumns.value = right
    },
    { immediate: true }
  )
</script>

<template>
  <NPopover placement="bottom-end" trigger="click">
    <template #trigger>
      <NTooltip>
        <template #trigger>
          <a href="javascript:;" class="pear-admin-a">
            <Icon name="ant-design:setting-outlined" :size="iconSize" />
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
      <div v-if="leftColumns.length > 0" class="left col">
        <p>固定左侧</p>
        <div
          v-for="(lCol, lIndex) in leftColumns"
          :key="lCol.key || lCol.type || lIndex"
          class="col-setting-checkbox"
        >
          <NCheckbox v-model:checked="lCol.visible">{{ lCol.title }}</NCheckbox>
          <Icon name="mdi:format-vertical-align-top" color="var(--primary-color)" />
          <Icon name="mdi:format-vertical-align-bottom" color="var(--primary-color)" />
        </div>
      </div>
      <div class="center col">
        <p v-if="leftColumns.length !== 0 || rightColumns.length !== 0">不固定</p>
        <div
          v-for="(cCol, cIndex) in centerColumns"
          :key="cCol.key || cCol.type || cIndex"
          class="col-setting-checkbox"
        >
          <NCheckbox v-model:checked="cCol.visible">{{ cCol.title }}</NCheckbox>
        </div>
      </div>
      <div v-if="rightColumns.length > 0" class="right col">
        <p>固定右侧</p>
        <div
          v-for="(rCol, rIndex) in rightColumns"
          :key="rCol.key || rCol.type || rIndex"
          class="col-setting-checkbox"
        >
          <NCheckbox v-model:checked="rCol.visible">{{ rCol.title }}</NCheckbox>
        </div>
      </div>
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

      .col {
        padding: 2px 0;
        .col-setting-checkbox {
          padding: 3px 0;
          cursor: pointer;
        }
      }
      .left {
      }

      .center {
      }

      .right {
      }
    }
  }
</style>
