<script lang="ts">
  export default {
    name: 'Reload'
  }
</script>

<script setup lang="ts">
  import { inject, Ref } from 'vue'
  import {
    fetchRunnerInjectKey,
    iconSizeInjectKey,
    TableConfigOptions
  } from '../composables/useTableConfig'

  const iconSize = inject<Ref<number>>(iconSizeInjectKey)
  const fetchRunner = inject<TableConfigOptions['fetchRunner']>(fetchRunnerInjectKey)
</script>

<template>
  <NTooltip>
    <template #trigger>
      <a href="javascript:;" class="pear-admin-a" @click.stop="fetchRunner">
        <Icon name="ant-design:reload-outlined" :size="iconSize" />
      </a>
    </template>
    刷新
  </NTooltip>
</template>

<style scoped lang="less"></style>
