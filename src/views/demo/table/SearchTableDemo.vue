<script setup lang="ts">
  import { TableDemoEnum } from './service'
  import { usePearTable } from '@/components/Table/composables/usePearTable'
  import type { FormSchema, PearFormProps } from '@/components/Form/components/PearForm.vue'
  import { useMessage } from 'naive-ui'
  import type { GridProps } from 'naive-ui'
  import { ref } from 'vue'

  const columns = [
    {
      title: 'Id',
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
      key: 'createTime'
    }
  ]

  // search
  const schemas: FormSchema[] = [
    {
      model: 'input',
      component: 'NInput',
      formItemProps: {
        label: 'Input'
      }
    },
    {
      model: 'input1',
      component: 'NInput',
      formItemProps: {
        label: 'Input'
      }
    },
    {
      model: 'input2',
      component: 'NInput',
      formItemProps: {
        label: 'Input'
      }
    },
    {
      model: 'input3',
      component: 'NInput',
      formItemProps: {
        label: 'Input'
      }
    },
    {
      model: 'select',
      component: 'NSelect',
      formItemProps: {
        label: 'Select'
      },
      componentProps: {
        options: [
          {
            label: 'Drive My Car',
            value: 'song1'
          },
          {
            label: 'Norwegian Wood',
            value: 'song2'
          },
          {
            label: "You Won't See",
            value: 'song3'
          },
          {
            label: 'Nowhere Man',
            value: 'song4'
          },
          {
            label: 'Think For Yourself',
            value: 'song5'
          },
          {
            label: 'The Word',
            value: 'song6'
          },
          {
            label: 'Michelle',
            value: 'song7'
          },
          {
            label: 'What goes on',
            value: 'song8'
          },
          {
            label: 'Girl',
            value: 'song9'
          },
          {
            label: "I'm looking through you",
            value: 'song10'
          },
          {
            label: 'In My Life',
            value: 'song11'
          },
          {
            label: 'Wait',
            value: 'song12'
          }
        ]
      }
    },
    {
      model: 'dateTime',
      component: 'NDatePicker',
      formItemProps: {
        label: 'DateTime'
      },
      componentProps: {
        type: 'datetime',
        style: {
          width: '100%'
        }
      }
    },
    {
      model: 'dateTimeRange',
      component: 'NDatePicker',
      formItemProps: {
        label: 'DTRange'
      },
      componentProps: {
        type: 'datetimerange',
        style: {
          width: '100%'
        }
      }
    }
  ]

  const gridProps: GridProps = {
    responsive: 'screen',
    collapsed: true,
    collapsedRows: 1,
    cols: '1 s:2 m:3 l:3 xl:3 xxl:3',
    xGap: 24
  }

  const searchFormProps: PearFormProps = {
    schemas,
    gridProps,
    labelWidth: 80,
    labelPlacement: 'left',
    model: {
      select: 'song1',
      input: '默认值'
    }
  }

  const fetch = ref({
    fetchUrl: TableDemoEnum.getTableRecords,
    immediate: true,
    redo: false,
    debounce: 1000,
    beforeFetch(params) {
      return params
    },
    afterFetch(data) {
      console.log('after fetch => ', data)
      return data
    }
  })

  const {
    registerTable,
    methods: { getFormValue }
  } = usePearTable({
    columns,
    searchFormProps,
    fetch,
    openSearch: true,
    virtualScroll: true
  })

  const message = useMessage()
</script>

<template>
  <PageWrapper>
    <PearTable @register-table="registerTable">
      <template #tableTitle> 标准表格 </template>
      <template #tools>
        <NButton type="warning" @click="fetch.redo = !fetch.redo">
          {{ fetch.redo ? '禁用redo' : '启用redo' }}
          {{ fetch.redo ? '' : '(参数改变时会自动触发请求，慎用！)' }}
        </NButton>
        <NButton type="primary" @click="message.info(JSON.stringify(getFormValue()))">
          获取参数
        </NButton>
      </template>
    </PearTable>
  </PageWrapper>
</template>

<style scoped lang="less"></style>
