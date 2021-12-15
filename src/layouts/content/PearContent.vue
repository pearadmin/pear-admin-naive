<script setup lang="ts">
  import { refreshInjectKey } from '@/composables/useRouterViewRefresh'
  import { inject } from 'vue'

  const showView = inject(refreshInjectKey)
</script>

<template>
  <n-layout-content position="absolute" :native-scrollbar="false" class="pear-admin-content">
    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <transition name="fade-top">
          <component :is="Component" v-if="showView" />
        </transition>
      </template>
    </router-view>
  </n-layout-content>
</template>

<style scoped lang="less">
  .pear-admin-content {
    //@apply h-full;
    //min-height: calc(100vh - 140px);
    //border: 1px solid red;
    margin-top: 92px;
  }
  .app-loading {
    @apply w-full min-h-screen flex flex-col justify-center items-center;
  }
</style>
