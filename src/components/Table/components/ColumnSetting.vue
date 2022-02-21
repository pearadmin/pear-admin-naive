<script setup lang="ts">
  import { ref, reactive, watch, computed } from 'vue'
  import { NOT_RENDER_KEYS } from '@/components/Table/composables/useColumns'
  import type { PTableColumns } from '@/components/Table/composables/useColumns'
  import { useTableContext } from '@/components/Table/composables/useTableContext'

  const { tableProvideState } = useTableContext()

  const iconSize = computed((): number => {
    return tableProvideState.value.iconSize as number
  })

  const columns = ref<PTableColumns[]>([])
  watch(
    () => tableProvideState.value.columns,
    (cols) => {
      columns.value = cols as PTableColumns[]
    },
    { immediate: true }
  )

  const settingCols = ref<PTableColumns[]>([])

  const globalState = reactive<{
    checked: boolean
    indeterminate: boolean
  }>({
    checked: true,
    indeterminate: false
  })

  function setStatus(cols: PTableColumns[]): void {
    const isAllChecked = cols.every((it) => it.visible)
    // const isIndeterminate = cols.some((it) => !it.visible)
    const isAllUnChecked = cols.every((it) => !it.visible)
    if (isAllChecked) {
      globalState.checked = true
      globalState.indeterminate = false
    } else if (isAllUnChecked) {
      globalState.checked = false
      globalState.indeterminate = false
    } else {
      globalState.checked = false
      globalState.indeterminate = true
    }
  }

  watch(
    columns,
    (cols) => {
      if (cols.length > 0) {
        settingCols.value = [...cols]
      }
    },
    { immediate: true }
  )

  watch(
    settingCols,
    (cols) => {
      setStatus(cols)
    },
    { immediate: true, deep: true }
  )

  function handleReset() {
    handleUpdateGlobalCheck(true)
  }

  function handleUpdateGlobalCheck(val: boolean) {
    globalState.checked = val
    settingCols.value.forEach((it) => {
      it.visible = val
    })
  }

  function handleChangeCheckedItem(val: boolean, col: PTableColumns) {
    col.visible = val
  }
</script>

<template>
  <NPopover placement="bottom-end" trigger="click">
    <template #trigger>
      <NTooltip>
        <template #trigger>
          <NButton text>
            <Icon name="ant-design:setting-outlined" :size="iconSize" />
          </NButton>
        </template>
        列设置
      </NTooltip>
    </template>
    <template #header>
      <div class="pear-admin-columns-setting-title">
        <NCheckbox
          :checked="globalState.checked"
          :indeterminate="globalState.indeterminate"
          :on-update:checked="handleUpdateGlobalCheck"
        >
          列展示
        </NCheckbox>
        <n-a @click.stop="handleReset">重置</n-a>
      </div>
    </template>
    <div class="pear-admin-columns-setting-content">
      <NSpace vertical>
        <template v-for="col in settingCols" :key="col?.key">
          <NCheckbox
            v-if="!col.type || !NOT_RENDER_KEYS.includes(col.type)"
            v-model:checked="col.visible"
            :on-update:checked="(val) => handleChangeCheckedItem(val, col)"
          >
            {{ col?.title }}
          </NCheckbox>
        </template>
      </NSpace>
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
    }

    &-content {
      width: 180px;
      height: auto;
    }
  }
</style>
