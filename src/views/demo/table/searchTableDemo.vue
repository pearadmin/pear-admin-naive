<script setup lang="ts">
  import { TableDemoEnum } from './service'
  // import useForm from '@/components/Form/composables/useForm'
  import { FormSchema } from '@/components/Form/components/BasicForm.vue'
  // import { useTable } from '@/components/Table/composables/useTable'
  // import { Ref, ref } from 'vue'

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
  const gridProps = {
    cols: 3,
    xGap: 12
  }

  const searchFormProps = {
    schemas,
    gridProps,
    model: {
      select: 'song2'
    }
  }

  const fetch = {
    fetchUrl: TableDemoEnum.getTableRecords,
    // immediate: false,
    // redo: true,
    beforeFetch(params) {
      console.log('before fetch => ', params)
      return {
        ...params
      }
    },
    afterFetch(data) {
      console.log('after fetch => ', data)
      return data
    }
  }

  // const { tableRefEl } = useTable({
  //   searchFormProps,
  //   fetch,
  //   openSearch: true
  // })
</script>

<template>
  <PageWrapper>
    <BasicTable
      ref="tableRefEl"
      :columns="columns"
      virtual-scroll
      :fetch="fetch"
      open-search
      :search-form-props="searchFormProps"
    >
      <template #tableTitle> 标准表格 </template>
      <template #tools>
        <NButton type="primary">工具按钮1</NButton>
        <NButton type="error">工具按钮2</NButton>
      </template>
    </BasicTable>
  </PageWrapper>
</template>

<style scoped lang="less"></style>
