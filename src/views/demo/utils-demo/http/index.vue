<script setup lang="tsx">
  import PButton from '@/components/Button/Button.vue'
  import { ref } from 'vue'
  import usePromiseFn from '@/composables/usePromiseFn'

  function promiseFn (data: { tag: boolean }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        data.tag ? resolve({
          status: 'ok',
          success: true,
          msg: '成功',
          data
        }) : reject({
          status: 'fail',
          success: false,
          msg: '失败',
          data
        })
      }, 3000)
    })
  }

  /**
   * eg 1.
   * 顶层异步 promise().then()
   * 如果一定要使用顶层请求，可像这样去使用
   */
  const res = ref<any>({})
  promiseFn({ tag: true }).then(data => {
    res.value = data
  })

  /**
   * eg 2.
   * 顶层 await
   * 目前不建议这么使用。
   * 1. suspense目前不建议在生产中使用
   * 2. 配合vue-router并不理想
   * 可偿试f5刷新该页面，查看Loading效果
   */
  // const showTopAwait = ref<boolean>(true)
  // const d = await promiseFn({ tag: true })

  const usePromiseFetchData = ref<Recordable>({
    tag: true
  })
  const {
    data: promiseData,
    loading: isLoading,
    error: promiseError,
    finished: isFinished,
    executor: handleReFetch
  } = usePromiseFn(promiseFn, usePromiseFetchData, { immediate: true, redo: true })

  function handleChangeData () {
    usePromiseFetchData.value = {
      tag: !usePromiseFetchData.value.tag,
      randomStr: Math.random().toString(32).substr(3, 12)
    }
  }

  function testLoading () {
    console.log('click')
  }

</script>

<template>
  <PageWrapper>
    <NCard>
      <div>
        FetchParams:
        <pre>
          {{ JSON.stringify(usePromiseFetchData, null,  2) }}
        </pre>
      </div>
      <p>Data: {{ JSON.stringify(promiseData) }}</p>
      <p>loading: {{ isLoading }}</p>
      <p>error: {{ JSON.stringify(promiseError) }}</p>
      <p>finished: {{ isFinished }}</p>
      <NSpace>
        <PButton type="primary" :loading="isLoading" @click="handleReFetch">再次请求</PButton>
        <PButton type="primary" :loading="isLoading" @click="handleChangeData">改变参数</PButton>
      </NSpace>
    </NCard>
  </PageWrapper>
</template>

<style scoped lang='less'>

</style>
