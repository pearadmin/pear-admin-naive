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

  /**
   * eg 1.
   * 顶层异步 promise().then()
   * 如果一定要使用顶层请求，可像这样去使用
   */
  const res = ref<any>({})
  promiseFn({ tag: true }).then((data) => {
    res.value = data
  })

  // 顶层await
  const awaitData = await promiseFn({ tag: true }, 1000).catch((e) => console.log(e))
</script>

<template>
  <PageWrapper title="setup异步">
    注意：顶层异步请求不建议使用(查看效果请将源码中
    <br />
    `const awaitData = await promiseFn({ tag: true }, 100)`
    中100改成大数值,再按f5刷新会触发suspense设置的Loading)
    <NAlert type="info">
      <pre>
        const data = await xxx()
      </pre>
      而是使用
      <pre>
        xx().then((res) => {
          // todo
        })
      </pre>
      因为在await会等待当前异步执行完返回，再向下执行，会阻塞页面的渲染.
      而then则会让异步在下一个事件循环中执行。从而不阻塞页面渲染
    </NAlert>
    <NCard title="顶层使用await" subtitle="按f5刷新加载suspense Loading">
      <pre>
        {{ JSON.stringify(awaitData) }}
      </pre>
    </NCard>
    <NCard title="顶层Promise.then" subtitle="不会触发suspense Loading">
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
