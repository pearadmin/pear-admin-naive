<script setup lang="ts">
  import { ref } from 'vue'

  const value = ref([20, 70])
  const marks = {
    0: '0°C',
    20: '20°C',
    37: '37°C',
    100: '100°C'
  }
</script>

<template>
  <PageWrapper>
    <!--    <Icon name="fa:home" size="22px" spin />-->
    <!--    <Icon name="fa:dashboard" color="red" />-->
    <NCard>
      <G2Chart />
    </NCard>
  </PageWrapper>
</template>

<style scoped lang="less"></style>
