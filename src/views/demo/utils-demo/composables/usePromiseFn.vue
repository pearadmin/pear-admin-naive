<script setup lang="ts">
  import { ref } from 'vue'
  import usePromiseFn from '@/composables/usePromiseFn'

  function promiseFn(data: { tag: boolean }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        data.tag
          ? resolve({
              status: 'ok',
              success: true,
              msg: '成功',
              data
            })
          : reject({
              status: 'fail',
              success: false,
              msg: '失败',
              data
            })
      }, 3000)
    })
  }

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

  function handleChangeData() {
    usePromiseFetchData.value = {
      tag: !usePromiseFetchData.value.tag,
      randomStr: Math.random().toString(32).substr(3, 12)
    }
  }
</script>

<template>
  <PageWrapper subtitle="可以使用usePromiseFn将Promise转换为hook使用">
    <template #pageHeaderContent>
      需要注意的是: 只要设置了 redo为true
      那么函数的参数可以为响应式的对象。在数据变化时，会自动再次请求。 usePromiseFn返回的 executor
      是个执行器，可以手动触发请求
    </template>
    <NCard>
      <div>
        FetchParams:
        <pre>
          {{ JSON.stringify(usePromiseFetchData, null, 2) }}
        </pre>
      </div>
      <p>Data: {{ JSON.stringify(promiseData) }}</p>
      <p>loading: {{ isLoading }}</p>
      <p>error: {{ JSON.stringify(promiseError) }}</p>
      <p>finished: {{ isFinished }}</p>
      <NSpace>
        <NButton type="primary" :loading="isLoading" @click="handleReFetch"> 手动触发 </NButton>
        <NButton type="primary" :loading="isLoading" @click="handleChangeData">
          参数改变自动重发
        </NButton>
      </NSpace>
    </NCard>
  </PageWrapper>
</template>

<style scoped lang="less"></style>
