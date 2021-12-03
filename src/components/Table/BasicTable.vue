<script lang="ts">
  export default {
    inheritAttrs: false
  }
</script>
<script setup lang="ts">
  import TableTools from './components/TableTools.vue'
  import { computed, ComputedRef, ref, useAttrs } from 'vue'
  import { omit, pick } from 'lodash-es'
  import { TableConfigOptions, useTableConfig } from '@/components/Table/composables/useTableConfig'
  import usePagination from '@/components/Table/composables/usePagination'
  import useTableFetch from '@/components/Table/composables/useTableFetch'
  import { RowData } from 'naive-ui/es/data-table/src/interface'
  import { useColumns } from '@/components/Table/composables/useColumns'
  import { DataTableProps, PaginationProps } from 'naive-ui'

  // @ts-ignore
  export interface BasicTableProps {
    fetch?: {
      fetchUrl?: string
      immediate?: boolean
      redo?: boolean
      beforeFetch?: Fn
      afterFetch?: Fn
    }
  }

  const basicTableProps = withDefaults(defineProps<BasicTableProps>(), {
    fetch: () => {
      return {
        immediate: true,
        redo: false
      }
    }
  })

  // 分页
  const { paginationRef } = usePagination()

  // 请求
  const { isFetching, fetchRunner, tableData, fetchFinished } = useTableFetch(
    basicTableProps,
    paginationRef
  )

  // attrs
  const basicTableAttrs = useAttrs()

  // 定义可控制列
  const { columns } = useColumns(basicTableAttrs)

  const tableConfigOptions: ComputedRef<TableConfigOptions> = computed((): TableConfigOptions => {
    return {
      attrs: basicTableAttrs,
      fetchRunner,
      iconSize: ref<number>(18),
      columns
    }
  })

  // 表格高度和大小
  const { tableSize, tableHeight } = useTableConfig(tableConfigOptions)

  // n-table props
  const nTableProps = computed((): DataTableProps & Recordable => {
    return {
      scrollX: '1500',
      size: tableSize.value,
      pagination: paginationRef.value as PaginationProps,
      loading: isFetching.value,
      data: tableData.value as RowData[],
      remote: true,
      flexHeight: true,
      style: {
        height: `${tableHeight.value}px`
      },
      rowKey: (row) => row.id,
      ...omit(basicTableAttrs, 'class', 'style'),
      columns: columns.value
    }
  })

  // 最外层class 和style
  const wrapperAttrs = computed((): Recordable => {
    return pick(basicTableAttrs, 'class', 'style')
  })

  // define expose
  defineExpose({
    isFetching,
    fetchExecutor: fetchRunner,
    tableData,
    fetchFinished
  })
</script>

<template>
  <div class="pear-admin-table-wrapper">
    <div v-if="$slots.search" class="pear-admin-table-search">
      <NCard>
        <slot name="search"></slot>
      </NCard>
    </div>
    <div class="pear-admin-table" v-bind="wrapperAttrs">
      <div class="pear-admin-table-top">
        <h2 class="pear-admin-table-top-title">
          <slot name="tableTitle"></slot>
        </h2>
        <TableTools />
      </div>
      <NDataTable v-bind="nTableProps" />
    </div>
  </div>
</template>

<style scoped lang="less">
  ::v-deep(.n-data-table-wrapper) {
    border-radius: 0;
    border: 1px solid var(--border-color) !important;
  }

  .pear-admin-table-wrapper {
    width: 100%;
    height: auto;
    .pear-admin-table-search {
    }
    .pear-admin-table {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      background: var(--body-color);
      border-radius: var(--border-radius);
      padding: 0 0 5px 0;
      margin-top: 10px;
      &-top {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border-left: 1px solid var(--hover-color);
        border-right: 1px solid var(--hover-color);
        border-top: 1px solid var(--hover-color);
        border-top-left-radius: var(--border-radius);

        &-title {
          font-size: 16px;
          font-weight: 500;
        }
      }
    }
  }
</style>
