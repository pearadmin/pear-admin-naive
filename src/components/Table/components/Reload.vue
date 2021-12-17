<script setup lang="ts">
  import { computed } from 'vue'
  import { useTableContext } from '@/components/Table/composables/useTableContext'
  import { get } from '@vueuse/core'

  const { tableProvideState } = useTableContext()

  const iconSize = computed((): number => {
    return tableProvideState.value.iconSize as number
  })

  function handleRefresh() {
    get(tableProvideState.value.fetchRunner)()
  }
</script>

<template>
  <NTooltip>
    <template #trigger>
      <NButton text @click.stop="handleRefresh">
        <Icon name="ant-design:reload-outlined" :size="iconSize" />
      </NButton>
    </template>
    刷新
  </NTooltip>
</template>

<style scoped lang="less"></style>
