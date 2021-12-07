import { ComputedRef, onMounted, onUnmounted, ref, watch } from 'vue'
import { Chart } from '@antv/g2'
import { G2ChartProps } from '@/components/AntVG2/G2Chart.vue'
import { isEmpty, merge } from 'lodash-es'

export function useInnerChart(props: ComputedRef<G2ChartProps>) {
  // chart config
  const initialCfg = ref<G2ChartProps['initialChartConfig']>({})

  // chart render HtmlElement
  const chartRefEl = ref<Nullable<HTMLElement>>(null)

  // chart instance
  const chart = ref<Nullable<Chart>>(null)

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
          // chart.value.destroy()
          // chart.value = new Chart(
          //   merge({}, initialCfg.value, {
          //     container: chartRefEl.value as HTMLElement
          //   })
          // )
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
