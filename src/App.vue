<script setup lang="ts">
  import { NSpin } from 'naive-ui'
</script>

<template>
  <router-view v-slot="{ Component }">
    <template v-if="Component">
      <transition mode="out-in">
        <suspense>
          <component :is="Component" />
          <template #fallback>
            <div class="app-loading">
              <n-spin size="large" />
              <span class="mt-10">加载中...</span>
            </div>
          </template>
        </suspense>
        <!--        <keep-alive>-->
        <!--          <suspense>-->
        <!--            <component :is="Component"></component>-->
        <!--            <template #fallback>-->
        <!--              <div class="app-loading">-->
        <!--                <n-spin size="large" />-->
        <!--                <span class="mt-10">加载中...</span>-->
        <!--              </div>-->
        <!--            </template>-->
        <!--          </suspense>-->
        <!--        </keep-alive>-->
      </transition>
    </template>
  </router-view>
</template>

<style scoped lang="less">
  .app-loading {
    @apply w-full min-h-screen flex flex-col justify-center items-center;
  }
</style>
