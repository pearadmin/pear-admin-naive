<script setup lang="ts">
  import { GridProps, useMessage } from 'naive-ui'
  import { usePearForm } from '@/components/Form/composables/usePearForm'
  import { FormSchema } from '@/components/Form/components/PearForm.vue'
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
    cols: 1,
    xGap: 6
  }

  const {
    registerForm,
    methods: { values, reset, validate }
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
</script>

<template>
  <PageWrapper>
    <NCard>
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
