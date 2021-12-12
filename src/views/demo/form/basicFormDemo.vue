<script setup lang="ts">
  import useForm from '@/components/Form/composables/useForm'
  import type { FormSchema } from '@/components/Form'
  import { useMessage } from 'naive-ui'

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
    cols: 1,
    xGap: 6
  }

  const { formRefEl, modelValue } = useForm({
    schemas,
    gridProps,
    model: {
      select: 'song2'
    }
  })
  const message = useMessage()
  function getFormModel() {
    message.info(JSON.stringify(modelValue.value))
  }
  function updFormValue() {
    modelValue.value.input = Math.random().toString(32).substr(5, 12)
  }
</script>

<template>
  <PageWrapper>
    <NCard>
      <BasicForm ref="formRefEl" :label-width="80" label-placement="left" />
      <NSpace>
        <NButton type="primary" @click="getFormModel"> 获取model </NButton>
        <NButton type="primary" @click="updFormValue"> 改变值 </NButton>
      </NSpace>
    </NCard>
  </PageWrapper>
</template>

<style scoped lang="less"></style>
