<script setup lang="ts">
  import { usePearForm } from '@/components/Form/composables/usePearForm'
  defineOptions({
    name: 'KeepAlive'
  })
  const {
    registerForm,
    methods: { values: formValue }
  } = usePearForm({
    schemas: [
      {
        component: 'NInput',
        model: 'inputValue',
        formItemProps: {
          label: 'Input'
        }
      },
      {
        component: 'NSelect',
        model: 'selectValue',
        formItemProps: {
          label: 'Select'
        },
        componentProps: {
          options: [
            {
              label: 'select 1',
              value: '1'
            },
            {
              label: 'select 2',
              value: '2'
            }
          ]
        }
      }
    ],
    labelWidth: 80,
    labelPlacement: 'left',
    model: {
      inputValue: '',
      selectValue: ''
    }
  })
</script>

<template>
  <PageWrapper>
    <PearForm @register-form="registerForm" />
    <div>
      {{ formValue }}
    </div>
  </PageWrapper>
</template>

<style lang="less" scoped></style>
