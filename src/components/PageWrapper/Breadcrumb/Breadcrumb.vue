<script setup lang="ts">
  import useBreadcrumb from './useBreadcrumb'

  const { matches } = useBreadcrumb()
</script>

<template>
  <NBreadcrumb>
    <NBreadcrumbItem v-for="m in matches" :key="m.name">
      {{ m.meta.title }}
    </NBreadcrumbItem>
  </NBreadcrumb>
</template>

<style scoped lang="less"></style>
