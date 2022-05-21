<script setup lang="ts">
  import { useApi } from '@/api/http'
  import { HttpDemoEnums } from '@/views/demo/utils-demo/http/service'
  import { usePearForm } from '@/components/Form/composables/usePearForm'
  import PearForm from '@/components/Form/components/PearForm.vue'
  import type { FormSchema } from '@/components/Form/components/PearForm.vue'

  const form1Schemas: FormSchema[] = [
    {
      component: 'NInput',
      model: 'keyA',
      formItemProps: {
        label: 'KeyA',
        span: 8
      }
    },
    {
      component: 'NInput',
      model: 'keyB',
      formItemProps: {
        label: 'KeyB',
        span: 8
      }
    }
  ]

  const {
    registerForm: rf1,
    methods: { values: params1 }
  } = usePearForm({
    schemas: form1Schemas,
    model: {
      keyA: '全自动挡',
      keyB: 'Tesla'
    }
  })

  const {
    loading: loading1,
    data: data1,
    executor: executor1
  } = useApi(
    {
      url: HttpDemoEnums.getData,
      method: 'post',
      data: params1
    },
    { redo: true, immediate: true, debounce: 1000 }
  )

  // demo 2
  const form2Schemas: FormSchema[] = [
    {
      component: 'NInput',
      model: 'keyA',
      formItemProps: {
        label: 'KeyA',
        span: 8
      }
    },
    {
      component: 'NInput',
      model: 'keyB',
      formItemProps: {
        label: 'KeyB',
        span: 8
      }
    }
  ]

  const {
    registerForm: rf2,
    methods: { values: params2 }
  } = usePearForm({
    schemas: form2Schemas,
    model: {
      keyA: '全手动挡',
      keyB: 'bicycle'
    }
  })

  const {
    loading: loading2,
    data: data2,
    executor: executor2
  } = useApi(
    {
      url: HttpDemoEnums.getData,
      method: 'post',
      data: params2
    },
    { redo: false, immediate: false }
  )
</script>

<template>
  <PageWrapper>
    <NSpin :show="loading1">
      <NCard title="全自动挡(初始化会请求，参数改变也会请求)">
        <NAlert type="warning">
          注意：改变参请后会马上触发请求，一般来说最好不要这么频繁。你懂的 : )
        </NAlert>
        <br />
        <PearForm @register-form="rf1" />
        结果: => {{ JSON.stringify(data1, null, 2) }}
      </NCard>
      <NButton type="primary" @click="executor1">再次触发请求</NButton>
    </NSpin>
    <NDivider />
    <NSpin :show="loading2">
      <NCard title="全手动挡(初始化不请求，参数改变也不请求)">
        <PearForm @register-form="rf2" />
        结果: => {{ JSON.stringify(data2, null, 2) }}
      </NCard>
      <NButton type="primary" @click="executor2">手动换挡</NButton>
    </NSpin>
  </PageWrapper>
</template>

<style scoped lang="less"></style>
