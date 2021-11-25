<script setup lang="ts">
  import { useApi } from '@/api/http'
  import { HttpDemoEnums } from '@/views/demo/utils-demo/http/service'
  import { ref } from 'vue'

  const params1 = ref<Recordable>({
    a: '我是请求参数a',
    b: '我是请求参数b'
  })

  const {
    loading: loading1,
    data: data1,
    execute: execute1
  } = useApi(
    HttpDemoEnums.getData,
    {
      method: 'post',
      data: params1
    },
    { refetch: true }
  )
</script>

<template>
  <PageWrapper>
    <NSpin :show="loading1">
      注意：改变后会马上触发请求，一般来说最好不要这么频繁。你懂的 : )
      <NInput v-model:value="params1.a"></NInput>
      <NInput v-model:value="params1.b"></NInput>
      <NCard title="立即请求">
        结果：
        <pre>
          {{ JSON.stringify(data1, null, 2) }}
        </pre>
        <PButton @click="execute1">再次请求，且手动</PButton>
      </NCard>
    </NSpin>
  </PageWrapper>
</template>

<style scoped lang="less"></style>
