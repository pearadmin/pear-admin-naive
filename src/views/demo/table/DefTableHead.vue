<script setup lang="ts">
  import { TableDemoEnum } from './service'
  import { usePearTable } from '@/components/Table/composables/usePearTable'
  import type { FormSchema, PearFormProps } from '@/components/Form/components/PearForm.vue'
  import type { GridProps } from 'naive-ui'
  import { ref } from 'vue'
  import { usePearForm } from '@/components/Form/composables/usePearForm'
  import type { TableFetch } from '@/components/Table/components/PearTable.vue'
  import type { Ref } from 'vue'

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
    collapsed: false,
    cols: '1 s:2 m:3 l:3 xl:3 xxl:3',
    xGap: 24
  }

  const searchFormProps: PearFormProps = {
    schemas,
    gridProps,
    labelWidth: 100,
    model: {
      select: 'song1',
      input: '默认值'
    }
  }

  const {
    registerForm,
    methods: { values: formValues }
  } = usePearForm(searchFormProps)

  const fetch = ref<Partial<TableFetch>>({
    fetchUrl: TableDemoEnum.getTableRecords,
    immediate: true,
    redo: false,
    beforeFetch(params: Ref<Recordable>) {
      return {
        ...params.value,
        ...formValues.value
      }
    },
    afterFetch(data: Recordable) {
      console.log('after fetch => ', data)
      return data
    }
  })

  const { registerTable } = usePearTable({
    columns,
    fetch,
    openSearch: true,
    virtualScroll: true
  })
</script>

<template>
  <PageWrapper>
    <PearTable @register-table="registerTable">
      <template #tableTitle> 标准表格 </template>
      <template #search>
        <PearForm @register-form="registerForm">
          <template #formAction>
            <NButton type="primary">我是自定义的</NButton>
            <NButton type="primary">好巧，我也是</NButton>
          </template>
        </PearForm>
      </template>
    </PearTable>
  </PageWrapper>
</template>

<style scoped lang="less"></style>
