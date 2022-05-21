<script setup lang="ts">
  import type { ChartCfg } from '@antv/g2/lib/interface'
  import { useInnerChart } from '@/components/AntVG2/composables/useInnerChart'
  import { computed, ref } from 'vue'
  import type { Ref, UnwrapRef } from 'vue'
  import { merge } from 'lodash-es'
  import type { Chart } from '@antv/g2'

  export interface G2ChartExpose {
    chart: Ref<UnwrapRef<Nullable<Chart>>>
    updChartProps: (props: Partial<G2ChartProps>) => void
  }

  export interface G2ChartProps {
    initialChartConfig?: Omit<ChartCfg, 'container'>
    loading?: boolean
  }

  const props = withDefaults(defineProps<G2ChartProps>(), {
    loading: false,
    initialChartConfig: () => ({
      // width: 400,
      // height: 300
    })
  })

  const innerProps = ref<G2ChartProps>({})

  const proxyProps = computed((): G2ChartProps => {
    return merge({}, props, innerProps.value)
  })

  const { chartRefEl, chart } = useInnerChart(proxyProps)

  defineExpose<G2ChartExpose>({
    chart,
    updChartProps: (props: Partial<G2ChartProps>) => {
      merge(innerProps.value, props)
    }
  })
</script>

<template>
  <NSpin :show="proxyProps.loading">
    <div ref="chartRefEl"></div>
  </NSpin>
</template>

<style scoped lang="less"></style>
