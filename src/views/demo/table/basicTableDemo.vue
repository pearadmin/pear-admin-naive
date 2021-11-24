<script setup lang="ts">
  import BasicTable from '@/components/Table'
  import PageWrapper from '@/components/PageWrapper'
  import { h } from 'vue'
  import { NDataTable } from 'naive-ui'
  import { MenuApiEnum } from '@/api/moduels/fast-api/menu'
  import { TableDemoEnum } from './service'

  const columns = [
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
      console.log('beform fetch', params)
      return {
        ...params,
        a: 1,
      }
    }
  }
</script>

<template>
  <PageWrapper>
    <BasicTable
      :columns="columns"
      virtual-scroll
      :fetch="fetch"
    >
      <template #tableTitle>标准表格</template>
    </BasicTable>
  </PageWrapper>
</template>

<style scoped lang="less">
</style>
