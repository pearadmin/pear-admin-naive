<script setup lang="ts">
  import BasicTable from '@/components/Table'
  import PageWrapper from '@/components/PageWrapper'
  import { h } from 'vue'
  import { NDataTable } from 'naive-ui'
  import { MenuApiEnum } from '@/api/moduels/fast-api/menu'

  const columns = [
    {
      type: 'selection',
      fixed: 'left'
    },
    {
      title: 'Name',
      key: 'name'
    },
    {
      title: 'Title',
      key: 'title'
    },
    {
      title: 'Icon',
      key: 'icon'
    },
    {
      title: 'Path',
      key: 'path'
    },
    {
      title: 'Type',
      key: 'type'
    },
    {
      title: 'Sort',
      key: 'sort',
      width: 100,
      fixed: 'right'
    }
  ]
</script>

<template>
  <PageWrapper>
    <BasicTable
      :columns="columns"
      :max-height="600"
      :scroll-x="1800"
      virtual-scroll
      :fetch="{
        fetchUrl: MenuApiEnum.menuRecords
      }"
    >
      <template #tableTitle>标准表格</template>
    </BasicTable>
  </PageWrapper>
</template>

<style scoped lang="less"></style>
