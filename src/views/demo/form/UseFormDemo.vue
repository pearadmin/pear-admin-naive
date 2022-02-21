<script setup lang="ts">
  import type { GridProps } from 'naive-ui'
  import { useMessage } from 'naive-ui'
  import { usePearForm } from '@/components/Form/composables/usePearForm'
  import type { FormSchema } from '@/components/Form/components/PearForm.vue'
  import { ref } from 'vue'

  // rPasswordFormItemRef
  const rPasswordFormItemRef = ref<any>({})
  const schemas: FormSchema[] = [
    {
      model: 'input',
      component: 'NInput',
      formItemProps: {
        label: 'NInput'
      }
    },
    {
      model: 'age',
      component: 'NInput',
      formItemProps: {
        label: '年龄'
      }
    },
    {
      model: 'password',
      component: 'NInput',
      formItemProps: {
        label: '密码'
      },
      componentProps: {
        'on-input': handlePasswordInput,
        type: 'password'
      }
    },
    {
      model: 'reenteredPassword',
      component: 'NInput',
      formItemProps: {
        label: '重复密码',
        first: true,
        ref: (el) => {
          el && (rPasswordFormItemRef.value = el)
        }
      },
      componentProps: {
        type: 'password',
        disabled: (values) => {
          return !values.password
        }
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
    cols: 1
  }

  const {
    registerForm,
    methods: { values, reset, validate, updFormProps }
  } = usePearForm({
    labelWidth: 80,
    labelPlacement: 'left',
    schemas,
    gridProps,
    model: {
      age: 'abcd',
      select: 'song2'
    },
    rules: {
      age: [
        {
          required: true,
          validator(rule, value) {
            if (!value) {
              return new Error('需要年龄')
            } else if (!/^\d*$/.test(value)) {
              return new Error('年龄应该为整数')
            } else if (Number(value) < 18) {
              return new Error('年龄应该超过十八岁')
            }
            return true
          },
          trigger: ['input', 'blur']
        }
      ],
      password: [
        {
          required: true,
          message: '请输入密码'
        }
      ],
      reenteredPassword: [
        {
          required: true,
          message: '请再次输入密码',
          trigger: ['input', 'blur']
        },
        {
          validator: validatePasswordStartWith,
          message: '两次密码输入不一致',
          trigger: 'input'
        },
        {
          validator: validatePasswordSame,
          message: '两次密码输入不一致',
          trigger: ['blur', 'password-input']
        }
      ]
    }
  })

  function validatePasswordStartWith(rule, value) {
    return (
      values.value.password &&
      values.value.password.startsWith(value) &&
      values.value.password.length >= value.length
    )
  }
  function validatePasswordSame(rule, value) {
    return value === values.value.password
  }

  function handlePasswordInput() {
    if (values.value.reenteredPassword) {
      rPasswordFormItemRef.value.validate({ trigger: 'password-input' })
    }
  }

  const message = useMessage()
  function getFormModel() {
    message.info(JSON.stringify(values.value))
  }
  function updFormValue() {
    values.value.input = Math.random().toString(32).substr(5, 12)
  }

  function handleValidateButtonClick(e) {
    e.preventDefault()
    validate((errors) => {
      if (!errors) {
        message.success('验证成功')
      } else {
        console.log(errors)
        message.error('验证失败')
      }
    })
  }

  // dynamic label width
  const labelWidthRef = ref<number>(80)
  function toggleLabelWidth(val: number) {
    labelWidthRef.value = val
    updFormProps({
      labelWidth: val
    })
  }

  // col
  const colRef = ref<number>(1)
  function toggleCol(col: number) {
    if (!col) {
      return
    }
    colRef.value = col
    updFormProps({
      labelWidth: 80,
      gridProps: {
        cols: col
      }
    })
  }

  // disable form
  function disableForm(val: boolean) {
    updFormProps({
      disabled: !val
    })
  }

  // label placement
  function labelAlign(val: boolean) {
    updFormProps({
      labelAlign: val ? 'left' : 'right'
    })
  }
</script>

<template>
  <PageWrapper>
    <NCard>
      <NSpace align="center">
        <n-switch size="large" :on-update:value="disableForm" :default-value="true">
          <template #checked>启用表单</template>
          <template #unchecked>禁用表单</template>
        </n-switch>
        <n-switch size="large" :on-update:value="labelAlign" :default-value="false">
          <template #checked>label居左</template>
          <template #unchecked>label居右</template>
        </n-switch>
        <n-input-group>
          <n-input-group-label>labelWidth:</n-input-group-label>
          <n-input-number
            v-model:value="labelWidthRef"
            :style="{ width: '33%' }"
            :on-update:value="toggleLabelWidth"
            placeholder="最小值"
            :min="80"
            :max="150"
          />
        </n-input-group>
        <n-input-group>
          <n-input-group-label>一行</n-input-group-label>
          <n-input-number
            v-model:value="colRef"
            :style="{ width: '33%' }"
            :on-update:value="toggleCol"
            placeholder="最小值"
            :min="1"
            :max="12"
          />
          <n-input-group-label>列</n-input-group-label>
        </n-input-group>
      </NSpace>
      <NDivider />
      <PearForm @register-form="registerForm" />
      <NSpace>
        <NButton type="primary" @click="getFormModel"> 获取model </NButton>
        <NButton type="primary" @click="updFormValue"> 改变值 </NButton>
        <NButton type="primary" @click="reset"> 重置 </NButton>
        <NButton
          type="warning"
          :disabled="values.age === null"
          round
          @click="handleValidateButtonClick"
        >
          验证
        </NButton>
      </NSpace>
    </NCard>
  </PageWrapper>
</template>

<style scoped lang="less"></style>
