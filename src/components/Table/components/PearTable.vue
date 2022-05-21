<script setup lang="ts">
  import type { DataTableColumn, DataTableColumns, PaginationProps } from 'naive-ui'
  import { computed, onMounted, ref, useAttrs, watch } from 'vue'
  import type { Ref } from 'vue'
  import { merge, omit, pick } from 'lodash-es'
  import usePagination from '@/components/Table/composables/usePagination'
  import { usePearForm } from '@/components/Form/composables/usePearForm'
  import type { UseFormMethods } from '@/components/Form/composables/usePearForm'
  import { get } from '@vueuse/core'
  import type { MaybeRef } from '@vueuse/core'
  import { useTableRequest } from '@/components/Table/composables/useTableRequest'
  import {
    NOT_RENDER_KEYS,
    useTableBaseConfig
  } from '@/components/Table/composables/useTableBaseConfig'
  import { createTableContext } from '@/components/Table/composables/useTableContext'
  // import { UseFormMethods } from '@/components/Form/composables/useForm'
  import type { PearFormProps } from '@/components/Form/components/PearForm.vue'
  import { useSearchFormExpand } from '@/components/Table/composables/useSearchFormExpand'

  // types
  export interface TableFetch {
    fetchUrl?: string
    immediate?: boolean
    redo?: boolean
    debounce?: number
    beforeFetch?: (payload: Ref<Recordable>) => MaybeRef<Recordable>
    afterFetch?: (payload: Recordable) => Recordable
  }
  export interface PearTableProps {
    columns?: Array<DataTableColumn>
    size?: 'small' | 'medium' | 'large'
    virtualScroll?: boolean
    // other todo:
    // 自定义
    fetch?: TableFetch
    openSearch?: boolean
    searchFormProps?: PearFormProps
  }

  export interface PearTableExpose {
    searchFormValue: Ref<Recordable>
    handleReset: () => void
    formMethods: UseFormMethods
    updTableProps: (updProps: MaybeRef<Partial<PearTableProps>>) => void
  }

  export interface PearTableEmits {
    (e: 'register-table', PearTableExpose): void
  }

  const emit = defineEmits<PearTableEmits>()
  const attrs = useAttrs()
  const props = withDefaults(defineProps<PearTableProps>(), {
    columns: () => [],
    size: 'medium',
    openSearch: false
  })

  const innerProps = ref<Partial<PearTableProps>>({})

  const proxyProps = computed((): PearTableProps => {
    return merge({}, props, innerProps.value)
  })

  // 表格高度，大小，工具栏图标大小，列设置
  const { tableSize, tableHeight, iconSize, columns } = useTableBaseConfig(proxyProps)

  // form
  const { registerForm, methods: formMethods } = usePearForm(get(proxyProps, 'searchFormProps'))

  // 展开收起
  const { gridCollapsed, handleToggleFormExpand } = useSearchFormExpand(proxyProps)

  watch(
    gridCollapsed,
    (val) => {
      formMethods.updFormProps({
        gridProps: {
          collapsed: val
        }
      })
    },
    { immediate: true }
  )

  // 分页
  const { paginationRef, resetPagination } = usePagination()

  // 请求
  const { data, loading, executor } = useTableRequest({
    pagination: paginationRef,
    fetchParams: formMethods.values,
    props: proxyProps
  })

  // 注入给子级使用
  createTableContext({
    tableSize,
    tableHeight,
    iconSize,
    columns,
    fetchRunner: executor
  })

  const renderColumns = computed((): DataTableColumns => {
    const cols: DataTableColumns = []
    columns.value.forEach((it) => {
      if (it.visible || (it.type && NOT_RENDER_KEYS.includes(it.type))) {
        cols.push(it)
      }
    })
    return cols
  })

  // 最外层class 和style
  const wrapperAttrs = computed((): Recordable => {
    return pick(proxyProps.value, 'class', 'style')
  })

  const bindTableProps = computed(() => {
    return {
      columns: get(renderColumns),
      scrollX: '1500',
      size: get(tableSize),
      pagination: get(paginationRef) as PaginationProps,
      loading: get(loading),
      data: get(data),
      remote: true,
      flexHeight: true,
      style: {
        height: `${get(tableHeight)}px`
      },
      rowKey: (row) => row.id,
      ...omit(get(proxyProps), 'schemas', 'fetch', 'openSearch', 'columns', 'size'),
      ...omit(attrs, 'class', 'style')
    }
  })

  // 查询
  function handleSearch() {
    get(executor)()
  }

  // 重置
  function handleReset() {
    formMethods.restoreValidation()
    resetPagination()
  }

  const tableExpose: PearTableExpose = {
    searchFormValue: formMethods.values,
    handleReset,
    formMethods,
    updTableProps: (updProps: Partial<PearTableProps>) => {
      merge(innerProps.value, updProps)
      // 更新表头
      if (updProps.openSearch) {
        formMethods.updFormProps(updProps.searchFormProps)
      }
    }
  }

  // define expose
  defineExpose<PearTableExpose>(tableExpose)

  onMounted(() => {
    emit('register-table', tableExpose)
  })
</script>

<template>
  <div class="pear-admin-table-wrapper">
    <div v-if="$slots.header" class="pear-admin-table-header">
      <NCard>
        <slot name="header"></slot>
      </NCard>
    </div>
    <div v-if="proxyProps.openSearch" key="tableSearch" class="pear-admin-table-search">
      <NCard>
        <slot name="search">
          <PearForm @register-form="registerForm">
            <template #formAction>
              <NButton type="primary" :loading="loading" @click="handleSearch"> 查询 </NButton>
              <NButton @click="handleReset">重置</NButton>
              <div
                v-if="proxyProps?.searchFormProps?.gridProps?.collapsed"
                @click="handleToggleFormExpand"
              >
                <NButton v-if="!gridCollapsed" text icon-placement="right">
                  收起
                  <template #icon>
                    <Icon name="ic:twotone-expand-less" />
                  </template>
                </NButton>
                <NButton v-else text icon-placement="right">
                  展开
                  <template #icon>
                    <Icon name="ic:round-expand-more" />
                  </template>
                </NButton>
              </div>
            </template>
          </PearForm>
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
      <NDataTable v-bind="bindTableProps" />
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
