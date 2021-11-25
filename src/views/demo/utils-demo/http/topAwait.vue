<script setup lang="tsx">
  import { ref } from 'vue'

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

  /**
   * eg 1.
   * 顶层异步 promise().then()
   * 如果一定要使用顶层请求，可像这样去使用
   */
  const res = ref<any>({})
  promiseFn({ tag: true }).then((data) => {
    res.value = data
  })

  const topFetchData = await promiseFn({ tag: true })
</script>

<template>
  <PageWrapper title="顶层await(不建议使用)">
    <NCard>
      <div>
        top await fetch data:
        <pre>
          {{ JSON.stringify(topFetchData, null, 2) }}
          </pre>
      </div>
      <div>
        top promise then
        <pre>
          {{ JSON.stringify(res, null, 2) }}
        </pre>
      </div>
    </NCard>
  </PageWrapper>
</template>

<style scoped lang="less"></style>
