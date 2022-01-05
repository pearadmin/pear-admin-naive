<script setup lang="ts">
  import { useRouter } from 'vue-router'

  const router = useRouter()

  function go() {
    router.push('/system/hidePage')
  }
</script>

<template>
  <PageWrapper>
    <div>
      abcdefg account
      <NButton @click="go"> CLick </NButton>
    </div>
  </PageWrapper>
</template>

<style scoped lang="less"></style>
