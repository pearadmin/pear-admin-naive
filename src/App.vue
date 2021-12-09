<script setup lang="ts">
  import AppProvider from '@/components/AppProvider/AppProvider.vue'
</script>

<template>
  <AppProvider>
    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <component :is="Component" />
      </template>
    </router-view>
  </AppProvider>
</template>

<style scoped lang="less">
  .app-loading {
    @apply w-full min-h-screen flex flex-col justify-center items-center;
  }
</style>
