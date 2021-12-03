<script setup lang="ts">
  import { TableDemoEnum } from './service'
  import useForm from '@/components/Form/composables/useForm'
  import { FormAction, FormSchema } from '@/components/Form/components/BasicForm.vue'
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
        label: 'Input',
        span: 8
      }
    },
    {
      model: 'select',
      component: 'NSelect',
      formItemProps: {
        label: 'Select',
        span: 8
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
        label: 'DateTime',
        span: 8
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
        label: 'DTRange',
        span: 8
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
    cols: 24,
    xGap: 12
  }
  const { formRefEl, modelValue, restoreValidation } = useForm({
    schemas,
    gridProps,
    model: {
      select: 'song2'
    }
  })

  const fetch = {
    fetchUrl: TableDemoEnum.getTableRecords,
    // immediate: false,
    // redo: true,
    beforeFetch(params) {
      console.log('before fetch => ', params)
      return {
        ...params,
        ...modelValue.value
      }
    },
    afterFetch(data) {
      console.log('after fetch => ', data)
      return data
    }
  }

  // todo:: create useTable
  const tableRefEl = ref<Nullable<HTMLElement>>(null)

  const formAction: FormAction = [
    {
      label: '查询',
      handler: async () => {
        // @see https://github.com/vuejs/vue-next/issues/4397
        // @ts-ignore
        await tableRefEl.value.fetchExecutor()
      },
      buttonProps: {
        type: 'primary',
        // @ts-ignore
        loading: tableRefEl.value?.isFetching
      }
    },
    {
      label: '重置',
      handler: () => {
        console.log('重置')
        restoreValidation()
      }
    }
  ]
</script>

<template>
  <PageWrapper>
    <BasicTable ref="tableRefEl" :columns="columns" virtual-scroll :fetch="fetch">
      <template #search>
        <BasicForm
          ref="formRefEl"
          :label-width="60"
          label-placement="left"
          :form-action="formAction"
        />
      </template>
      <template #tableTitle> 标准表格 </template>
    </BasicTable>
  </PageWrapper>
</template>

<style scoped lang="less"></style>
