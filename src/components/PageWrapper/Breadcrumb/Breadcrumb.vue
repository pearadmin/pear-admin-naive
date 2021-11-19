<script lang='ts'>
  export default {
    name: 'Breadcrumb'
  }
</script>

<script setup lang='ts'>
  import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui'
  import useBreadcrumb from './useBreadcrumb'

  const { matches } = useBreadcrumb()

  console.log('matches => ', matches)
</script>

<template>
  <NBreadcrumb>
    <NBreadcrumbItem
      v-for="m in matches"
      :key='m.name'
    >
      {{ m.meta.title }}
    </NBreadcrumbItem>
  </NBreadcrumb>
</template>

<style scoped lang='less'>

</style>
