<script setup lang="ts">
  // import { ChartCfg } from '@antv/g2/lib/interface'
  import { useChart } from '@/components/AntVG2/composables/useChartG2'
  import { computed, ref } from 'vue'
  import { merge } from 'lodash-es'

  // @ts-ignore
  export interface G2ChartProps {
    // vue3不支持复杂类导入，先用Recordable代替
    // 后面用 extends Omit<ChartCfg, 'container'>替换
    initialChartConfig?: Recordable
  }

  const props = withDefaults(defineProps<G2ChartProps>(), {})

  const innerProps = ref<G2ChartProps>({})

  const proxyProps = computed(() => {
    return merge({}, props, innerProps.value)
  })

  const { chartRefEl } = useChart(proxyProps)
</script>

<template>
  <div id="ChartG2" ref="chartRefEl"></div>
</template>

<style scoped lang="less"></style>
