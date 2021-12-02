<script setup lang="ts">
  import AppProvider from '@/components/AppProvider/AppProvider.vue'
</script>

<template>
  <AppProvider>
    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <transition mode="out-in">
          <suspense>
            <component :is="Component" />
            <template #fallback>
              <div class="app-loading">
                <NSpin size="large" />
                <span class="mt-10">Suspense 加载中...</span>
              </div>
            </template>
          </suspense>
        </transition>
      </template>
    </router-view>
  </AppProvider>
</template>

<style scoped lang="less">
  .app-loading {
    @apply w-full min-h-screen flex flex-col justify-center items-center;
  }
</style>
