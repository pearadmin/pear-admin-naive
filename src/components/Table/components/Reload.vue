<script lang="ts">
  export default {
    name: 'Reload'
  }
</script>

<script setup lang="ts">
  import Icon from '@/components/Icon'
  import { inject } from 'vue'
  import { NTooltip } from 'naive-ui'

  const iconSize = inject('iconSize')
  const fetchRunner = inject('fetchRunner')
</script>

<template>
  <NTooltip>
    <template #trigger>
      <a href="javascript:;" class="pear-admin-a" @click.stop="fetchRunner">
        <Icon name="ant-design:reload-outlined" :size="iconSize"></Icon>
      </a>
    </template>
    刷新
  </NTooltip>
</template>

<style scoped lang="less"></style>
