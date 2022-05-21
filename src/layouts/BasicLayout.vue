<script lang="ts" setup>
  import { useRouterViewRefresh } from '@/composables/useRouterViewRefresh'
  import { createLayoutContextData } from '@/layouts/createLayoutContextData'
  import type { LayoutContextData } from '@/layouts/createLayoutContextData'
  import { useLayoutBreakPoint } from '@/layouts/useLayoutBreakPoint'
  import { computed, ref, watch } from 'vue'
  import { merge } from 'lodash-es'

  const provideState = ref<LayoutContextData>({
    collapsed: false,
    isMobile: false,
    showView: false,
    theme: {
      inverted: true
    },
    refreshRouterView: () => {}
  })
  const { config } = useLayoutBreakPoint()
  // route refresh
  const { showView, refreshRouterView } = useRouterViewRefresh()

  const layoutState = computed(() => {
    return {
      ...config.value,
      showView,
      refreshRouterView
    }
  })

  const { updProvideState } = createLayoutContextData(provideState)

  watch(
    layoutState,
    (cfg) => {
      merge(provideState.value, cfg)
      updProvideState({
        ...merge(provideState.value, cfg)
      })
    },
    { immediate: true, deep: true }
  )
</script>
<template>
  <NLayout embedded has-sider position="absolute">
    <PearSider />
    <NLayout embedded>
      <PearHeader />
      <PearContent />
    </NLayout>
  </NLayout>
</template>
