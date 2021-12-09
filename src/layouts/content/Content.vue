<script setup lang="ts">
  import { refreshInjectKey } from '@/composables/useRouterViewRefresh'
  import { inject } from 'vue'

  const showView = inject(refreshInjectKey)
</script>

<template>
  <n-layout-content :native-scrollbar="false" class="pear-admin-content">
    <template v-if="showView">
      <router-view v-slot="{ Component }">
        <template v-if="Component">
          <transition name="fade-top">
            <suspense>
              <component :is="Component" />
              <template #fallback>
                <div class="app-loading">
                  <NSpin size="large" />
                  <span class="mt-10"> 页面加载完成了！但是在执行顶层的Await函数 </span>
                </div>
              </template>
            </suspense>
          </transition>
        </template>
      </router-view>
    </template>
    <template v-else>
      <div class="app-loading">
        <NSpin size="large" />
        <span class="mt-10"> Page Loading </span>
      </div>
    </template>
  </n-layout-content>
</template>

<style scoped lang="less">
  .pear-admin-content {
    @apply h-full;
    min-height: calc(100vh - 140px);
  }
  .app-loading {
    @apply w-full min-h-screen flex flex-col justify-center items-center;
  }
</style>
