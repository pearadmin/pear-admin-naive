<script lang="ts">
  export default {
    inheritAttrs: false
  }
</script>
<script setup lang="ts">
  import { NDataTable, NElement } from 'naive-ui'
  import TableTools from './components/TableTools.vue'
  import { computed, provide, useAttrs } from 'vue'
  import { omit, pick } from 'lodash-es'
  import { useTableConfig } from '@/components/Table/composables/useTableConfig'
  import usePagination from '@/components/Table/composables/usePagination'
  import useTableFetch from '@/components/Table/composables/useTableFetch'

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

  // todo 将fetchRunner注入抽到useTableConfig中
  provide('fetchRunner', fetchRunner)

  const basicTableAttrs = useAttrs()
  const { tableSize } = useTableConfig(basicTableAttrs)

  const nTableProps = computed(() => {
    return {
      ...omit(basicTableAttrs, 'class', 'style'),
      size: tableSize.value,
      pagination: paginationRef.value,
      loading: isFetching.value
    }
  })

  const wrapperAttrs = computed(() => {
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
    background: var(--td-color);
    border-radius: var(--border-radius);

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
