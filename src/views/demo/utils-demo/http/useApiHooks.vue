<script setup lang="ts">
  import { useApi } from '@/api/http'
  import { HttpDemoEnums } from '@/views/demo/utils-demo/http/service'
  import { ref } from 'vue'

  const params1 = ref<{
    keyA: string,
    keyB: string
  }>({
    keyA: 'keyA',
    keyB: 'keyB'
  })

  const {
    loading: loading1,
    data: data1,
    executor: execute1
  } = useApi(
    {
      url: HttpDemoEnums.getData,
      method: 'post',
      data: params1
    },
    { redo: false, immediate: false }
  )

  const params2 = ref<{
    keyA: string,
    keyB: string
  }>({
    keyA: '全自动无刹车',
    keyB: 'Tesla'
  })

  const {
    loading: loading2,
    data: data2,
    executor: execute2
  } = useApi({
    url: HttpDemoEnums.getData,
    method: 'post',
    data: params2
  }, { redo: true, immediate: true })
</script>

<template>
  <PageWrapper>
    <NSpin :show="loading1">
      <NCard title="全手动挡(初始化不请求，参数改变也不请求)">
        <NInput v-model:value="params1.keyA"></NInput>
        <NInput v-model:value="params1.keyB"></NInput>
          <pre>
          结果: => {{ JSON.stringify(data1, null, 2) }}
        </pre>
        <NButton type="primary" @click="execute1">手动换挡</NButton>
      </NCard>
    </NSpin>
    <NDivider></NDivider>
    <NSpin :show="loading2">
      <NCard title="全自动挡(初始化会请求，参数改变也会请求)">
        <NAlert type="warning">注意：改变参请后会马上触发请求，一般来说最好不要这么频繁。你懂的 : )</NAlert>
        <NInput v-model:value="params2.keyA"></NInput>
        <NInput v-model:value="params2.keyB"></NInput>
        <pre>
          结果: => {{ JSON.stringify(data2, null, 2) }}
        </pre>
      </NCard>
    </NSpin>
  </PageWrapper>
</template>

<style scoped lang="less"></style>
