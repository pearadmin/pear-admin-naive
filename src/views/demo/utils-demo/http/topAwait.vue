<script setup lang="tsx">
  import { ref } from 'vue'

  function promiseFn(data: { tag: boolean }, time = 3000) {
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
      }, time)
    })
  }

  // const res1 = await promiseFn({ tag: true }, 2000)
  // console.log(res1)

  /**
   * eg 1.
   * 顶层异步 promise().then()
   * 如果一定要使用顶层请求，可像这样去使用
   */
  const res = ref<any>({})
  const loading = ref<boolean>(true)
  promiseFn({ tag: true }, 1000).then((data) => {
    res.value = data
    loading.value = false
  })
</script>

<template>
  <PageWrapper title="setup异步" subtitle="建议使用Promise.then()而不是await xxx()">
    <!--    <pre>-->
    <!--      {{ JSON.stringify(res1, null, 4) }}-->
    <!--    </pre>-->
    <NSpin :show="loading">
      <NCard title="顶层Promise.then" subtitle="不会触发suspense Loading">
        <div>
          top promise then
          <pre>
            {{ JSON.stringify(res, null, 2) }}
          </pre>
        </div>
      </NCard>
    </NSpin>
  </PageWrapper>
</template>

<style scoped lang="less"></style>
