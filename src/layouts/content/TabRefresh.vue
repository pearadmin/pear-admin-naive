<script setup lang="ts">
  defineProps<{
    refresh: () => void
  }>()
</script>

<template>
  <NTooltip>
    <template #trigger>
      <NButton text @click.stop="refresh">
        <Icon name="mdi:reload" :size="20" />
      </NButton>
    </template>
    刷新
  </NTooltip>
</template>
