<script setup lang="ts">
  import { computed } from 'vue'
  import { useTableContext } from '@/components/Table/composables/useTableContext'

  const { tableProvideState } = useTableContext()

  const iconSize = computed(() => {
    return tableProvideState.value.iconSize
  })

  const fetchRunner = computed(() => {
    return tableProvideState.value.fetchRunner
  })
</script>

<template>
  <NTooltip>
    <template #trigger>
      <NButton text @click.stop="fetchRunner">
        <Icon name="ant-design:reload-outlined" :size="iconSize" />
      </NButton>
    </template>
    刷新
  </NTooltip>
</template>

<style scoped lang="less"></style>
