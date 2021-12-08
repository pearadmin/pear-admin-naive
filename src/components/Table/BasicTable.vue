<script lang="ts">
  export default {
    inheritAttrs: false
  }
</script>
<script setup lang="ts">
  import { computed, ComputedRef, ref, unref, useAttrs, WritableComputedRef } from 'vue'
  import { merge, omit, pick } from 'lodash-es'
  import { TableConfigOptions, useTableConfig } from '@/components/Table/composables/useTableConfig'
  import usePagination from '@/components/Table/composables/usePagination'
  import useTableFetch from '@/components/Table/composables/useTableFetch'
  import { RowData } from 'naive-ui/es/data-table/src/interface'
  import { useColumns } from '@/components/Table/composables/useColumns'
  import { DataTableProps, PaginationProps } from 'naive-ui'
  import { BasicFormProps } from '@/components/Form/components/BasicForm.vue'
  import useForm, { UseFormMethods } from '@/components/Form/composables/useForm'
  import { DEFAULT_TABLE_FETCH } from '@/config'

  // @ts-ignore
  export interface TableFetch {
    fetchUrl: string
    immediate?: boolean
    redo?: boolean
    beforeFetch?: Fn
    afterFetch?: Fn
  }
  // @ts-ignore
  export interface BasicTableProps {
    fetch?: TableFetch
    openSearch?: boolean
    searchFormProps?: BasicFormProps
  }

  // @ts-ignore
  export interface BasicTableExpose {
    searchFormValue: WritableComputedRef<Recordable>
    handleReset: () => void
    formMethods: UseFormMethods
    setTableProps: (updProps: BasicTableProps) => void
  }

  const props = withDefaults(defineProps<BasicTableProps>(), {
    fetch: () => {
      return {
        fetchUrl: '',
        immediate: true,
        redo: false
      }
    },
    openSearch: false
  })

  const innerProps = ref<BasicTableProps>({})

  const proxyProps = computed((): BasicTableProps => {
    return merge({}, props, innerProps.value)
  })

  // 查询表头
  const {
    formRefEl: searchFormRefEl,
    modelValue: searchFormValue,
    methods: formMethods
  } = useForm(proxyProps.value.searchFormProps)

  // 分页
  const { paginationRef, resetPagination } = usePagination()

  // 请求
  const { isFetching, fetchRunner, tableData } = useTableFetch(
    proxyProps,
    paginationRef,
    searchFormValue
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
      data: columns.value.length > 0 ? (tableData.value as RowData[]) : [],
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

  // 查询
  function handleSearch() {
    unref(fetchRunner)({
      [DEFAULT_TABLE_FETCH.bodyType]: { ...searchFormValue.value }
    })
  }

  // 重置
  function handleReset() {
    formMethods.restoreValidation()
    resetPagination()
  }

  // define expose
  defineExpose<BasicTableExpose>({
    searchFormValue,
    handleReset,
    formMethods,
    setTableProps: (updProps: BasicTableProps) => {
      innerProps.value = updProps
      // 更新表头
      if (updProps.openSearch) {
        formMethods.setFormProps(updProps.searchFormProps)
      }
    }
  })
</script>

<template>
  <div class="pear-admin-table-wrapper">
    <div v-if="$slots.header" class="pear-admin-table-header">
      <NCard>
        <slot name="header"></slot>
      </NCard>
    </div>
    <div v-if="proxyProps.openSearch" class="pear-admin-table-search">
      <NCard>
        <slot name="search">
          <BasicForm ref="searchFormRefEl" :label-width="80" label-placement="left">
            <template #formAction>
              <PButton type="primary" :loading="isFetching" @click="handleSearch"> 查询 </PButton>
              <PButton :disabled="isFetching" @click="handleReset">重置</PButton>
            </template>
          </BasicForm>
        </slot>
      </NCard>
    </div>
    <div class="pear-admin-table" v-bind="wrapperAttrs">
      <div class="pear-admin-table-top">
        <n-h4 class="pear-admin-table-top-title">
          <slot name="tableTitle"></slot>
        </n-h4>
        <TableTools>
          <template #tools>
            <slot name="tools"></slot>
          </template>
        </TableTools>
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
    .pear-admin-table-header {
    }
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
      @apply mt-4;
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
          margin: 0;
        }
      }
    }
  }
</style>
