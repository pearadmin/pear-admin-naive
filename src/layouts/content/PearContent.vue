<script setup lang="tsx">
import { computed, defineAsyncComponent, defineComponent, resolveDynamicComponent } from "vue";
  import { useLayoutContextData } from '@/layouts/createLayoutContextData'

  const { provideState } = useLayoutContextData()

  const showView = computed(() => {
    return provideState.value.showView
  })
  /**
   * <router-view v-slot="{ Component }">
   *       <template v-if="Component">
   *         <transition name="fade-top">
   *           <component :is="Component" v-if="showView" />
   *         </transition>
   *       </template>
   *     </router-view>
   */
  //
  //   <router-view name="default" v-slot="{ Component, route }">
  // <transition name="fade-top" mode="out-in" :duration="300" :key="route.path">
  //   <suspense>
  //     <template #default>
  //   <component v-if="Component && showView" :is="Component" :key="route.path" />
  //   <span v-else>
  // </span>
  // </template>
  // <template #fallback>
  // <div>
  //   Loading...
  // </div>
  // </template>
  // </suspense>
  // </transition>
  // </router-view>
</script>

<template>
  <n-layout-content position="absolute" :native-scrollbar="false" class="pear-admin-content">
    <router-view name="default" v-slot="{ Component, route }">
      <transition name="fade-top" mode="out-in" :duration="300" :key="route.path">
        <suspense timeout="0">
          <template #default>
            <component v-if="Component && showView" :is="Component" :key="route.path" />
          </template>
          <template #fallback>
            <div>
              Loading...
            </div>
          </template>
        </suspense>
      </transition>
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
