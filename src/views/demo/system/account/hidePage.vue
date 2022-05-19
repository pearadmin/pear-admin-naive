<script setup lang="ts"></script>

<template>
  <PageWrapper>
    <h2>This is hidden Page</h2>
    <n-button type="primary" @click="$router.back()">Back</n-button>
  </PageWrapper>
</template>

<style scoped lang="less"></style>
