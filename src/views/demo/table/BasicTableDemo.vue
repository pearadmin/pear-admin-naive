<script setup lang="ts">
  import { TableDemoEnum } from './service'
  import type { DataTableColumn } from 'naive-ui'

  const columns: DataTableColumn[] = [
    {
      type: 'selection',
      fixed: 'left'
    },
    {
      title: 'Id',
      fixed: 'left',
      key: 'id'
    },
    {
      title: 'Name',
      key: 'name'
    },
    {
      title: 'Age',
      key: 'age'
    },
    {
      title: 'Birthday',
      key: 'birthday'
    },
    {
      title: 'Email',
      key: 'email'
    },
    {
      title: 'Address',
      key: 'city'
    },
    {
      title: 'ZIP',
      key: 'zip'
    },
    {
      title: 'CreateTime',
      key: 'createTime',
      fixed: 'right'
    }
  ]

  const fetch = {
    fetchUrl: TableDemoEnum.getTableRecords,
    beforeFetch(params) {
      console.log('before fetch', params)
      return {
        ...params.value,
        a: 1
      }
    },
    afterFetch(data) {
      return data
    }
  }
</script>

<template>
  <PageWrapper>
    <PearTable :columns="columns" virtual-scroll :fetch="fetch" open-search>
      <template #header> 表头区域 slot </template>
      <template #search> 查询区域（设置openSearch=true后才显示哈）slot </template>
      <template #tableTitle> 标准表格 </template>
      <template #tools>
        <NButton text>工具扩展区域 slot</NButton>
      </template>
    </PearTable>
  </PageWrapper>
</template>

<style scoped lang="less"></style>
