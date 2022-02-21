import type { ComputedRef, Ref, UnwrapRef } from 'vue'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { Chart } from '@antv/g2'
import type { G2ChartProps } from '@/components/AntVG2/G2Chart.vue'
import { isEmpty, merge } from 'lodash-es'
import { useEventListener } from '@vueuse/core'

export interface UseInnerChartReturn {
  chartRefEl: Ref<UnwrapRef<Nullable<HTMLElement>>>
  chart: Ref<UnwrapRef<Nullable<Chart>>>
}

export function useInnerChart(props: ComputedRef<G2ChartProps>): UseInnerChartReturn {
  // chart config
  const initialCfg = ref<G2ChartProps['initialChartConfig']>({})

  // chart render HtmlElement
  const chartRefEl = ref<Nullable<HTMLElement>>(null)

  // chart instance
  const chart = ref<Nullable<Chart>>(null)

  useEventListener(
    'resize',
    () => {
      if (chart.value) {
        chart.value.forceFit()
        chart.value.render()
      }
    },
    { passive: true }
  )

  /**
   * if chart initial config change reBuild chart
   */
  watch(
    () => props.value.initialChartConfig,
    (cfg) => {
      if (!isEmpty(cfg)) {
        if (!chartRefEl.value || !chart.value) {
          initialCfg.value = merge({}, cfg)
        } else {
          const width = (cfg?.width as number) ?? chart.value.width
          const height = (cfg?.height as number) ?? chart.value.width
          chart.value?.changeSize(width, height)
        }
      }
    },
    {
      immediate: true,
      deep: true
    }
  )

  onMounted(() => {
    chart.value = new Chart(
      merge({}, initialCfg.value, {
        container: chartRefEl.value as HTMLElement
      })
    )
    chart.value?.render()
  })

  onUnmounted(() => {
    chart.value?.destroy()
  })

  return {
    chartRefEl,
    chart
  }
}
