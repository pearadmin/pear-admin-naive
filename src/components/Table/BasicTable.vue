<script lang="ts">
  export default {
    inheritAttrs: false
  }
</script>
<script setup lang="ts">
  import { DataTableProps, NDataTable, NElement, PaginationProps } from 'naive-ui'
  import TableTools from './components/TableTools.vue'
  import { computed, ComputedRef, provide, ref, useAttrs, watch } from 'vue'
  import { omit, pick } from 'lodash-es'
  import { TableConfigOptions, useTableConfig } from '@/components/Table/composables/useTableConfig'
  import usePagination from '@/components/Table/composables/usePagination'
  import useTableFetch from '@/components/Table/composables/useTableFetch'
  import { RowData } from 'naive-ui/es/data-table/src/interface'
  import { useColumns } from '@/components/Table/composables/useColumns'

  // @ts-ignore
  export interface BasicTableProps {
    fetch?: {
      fetchUrl?: string
      immediate?: boolean
      beforeFetch?: Fn
      afterFetch?: Fn
    }
  }

  const basicTableProps = withDefaults(defineProps<BasicTableProps>(), {
    fetch: () => {
      return {
        immediate: true
      }
    }
  })

  const { paginationRef } = usePagination()
  const { isFetching, fetchFinished, fetchRunner, tableData } = useTableFetch(
    basicTableProps,
    paginationRef
  )

  const basicTableAttrs = useAttrs()

  const { columns } = useColumns(basicTableAttrs)

  const tableConfigOptions: ComputedRef<TableConfigOptions> = computed((): TableConfigOptions => {
    return {
      attrs: basicTableAttrs,
      fetchRunner,
      iconSize: ref<number>(18),
      columns
    }
  })

  const { tableSize, tableHeight } = useTableConfig(tableConfigOptions)


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

  const wrapperAttrs = computed((): Recordable => {
    return pick(basicTableAttrs, 'class', 'style')
  })
</script>

<template>
  <div class="pear-admin-table" v-bind="wrapperAttrs">
    <div class="pear-admin-table-top">
      <h2 class="pear-admin-table-top-title">
        <slot name="tableTitle"></slot>
      </h2>
      <TableTools></TableTools>
    </div>
    <NDataTable v-bind="nTableProps"></NDataTable>
  </div>
</template>

<style scoped lang="less">
  ::v-deep(.n-data-table-wrapper) {
    border-radius: 0;
    border: 1px solid var(--border-color) !important;
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
</style>
