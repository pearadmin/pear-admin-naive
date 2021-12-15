<script lang="ts" setup>
  import { useRouterViewRefresh } from '@/composables/useRouterViewRefresh'
  import { createLayoutContextData, LayoutContextData } from '@/layouts/createLayoutContextData'
  import { useLayoutBreakPoint } from '@/layouts/useLayoutBreakPoint'
  import { ref, watch } from 'vue'
  import { merge } from 'lodash-es'

  const provideState = ref<LayoutContextData>({
    collapsed: false,
    isMobile: false,
    theme: {
      inverted: true
    }
  })
  const { config } = useLayoutBreakPoint()

  const { updProvideState } = createLayoutContextData(provideState)

  watch(
    config,
    (cfg) => {
      merge(provideState.value, cfg)
      updProvideState({
        ...merge(provideState.value, cfg)
      })
    },
    { immediate: true, deep: true }
  )

  // route refresh
  useRouterViewRefresh()
</script>
<template>
  <div class="pear-admin-layout-wrapper">
    <NLayout embedded has-sider position="absolute">
      <PearSider />
      <NLayout embedded class="pear-admin-layout-wrapper-layout">
        <PearHeader />
        <PearContent />
      </NLayout>
    </NLayout>
  </div>
</template>

<style lang="less">
  .pear-admin-layout-wrapper {
    //@apply w-full min-h-screen h-full;
    &-layout {
      //@apply w-full min-h-screen h-full;
      //width: v-bind(layoutWith);
      //left: v-bind(left) !important;
      //padding-left: v-bind(left);
      //transition: 0.3s;
    }
  }
</style>
