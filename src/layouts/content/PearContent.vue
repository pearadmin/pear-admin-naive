<script setup lang="tsx">
  import { computed, unref, watch } from 'vue'
  import { useLayoutContextData } from '@/layouts/createLayoutContextData'
  import { useAppStore } from '@/store/modules/app'
  import { storeToRefs } from 'pinia'
  import { useRoute } from 'vue-router'

  const { provideState } = useLayoutContextData()

  /**
   * <router-view v-slot="{ Component }">
   *       <template v-if="Component">
   *         <transition name="fade-top">
   *           <component :is="Component" v-if="showView" />
   *         </transition>
   *       </template>
   *     </router-view>
   */
  const showView = computed(() => {
    return provideState.value.showView
  })
  // store
  const appStore = useAppStore()
  // keep alive names
  const { keepAliveNames } = storeToRefs(appStore)

  const route = useRoute()

  watch(
    () => route.path,
    () => {
      const matched = route.matched
      const matchedKeys = matched
        .filter((it) => it.meta?.keepAlive)
        .map((comp) => comp.components.default.name) as string[]
      appStore.setKeepAliveNames(Array.from(new Set(unref(keepAliveNames).concat(matchedKeys))))
    },
    { immediate: true }
  )
</script>

<template>
  <n-layout-content position="absolute" :native-scrollbar="false" class="pear-admin-content">
    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <transition name="fade-top">
          <keep-alive :include="keepAliveNames">
            <component :is="Component" v-if="showView" />
          </keep-alive>
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
    //@apply w-full min-h-screen flex flex-col justify-center items-center;
  }
</style>
