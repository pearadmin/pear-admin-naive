import type { Chart } from '@antv/g2'
import type { G2ChartProps } from '@/components/AntVG2/G2Chart.vue'
import { nextTick, onMounted, ref } from 'vue'
import G2Chart from '@/components/AntVG2/G2Chart.vue'

export function useChart(options: Partial<G2ChartProps>) {
  const chartRefEl = ref<Nullable<HTMLElement & typeof G2Chart>>(null)
  const chartInstance = ref<Nullable<Chart>>(null)

  onMounted(async () => {
    chartRefEl.value?.updChartProps(options)
    await nextTick()
    chartInstance.value = chartRefEl.value?.chart as Chart
  })

  const methods = {
    getChart: async () => {
      await nextTick()
      return chartInstance.value
    },
    updChartProps: (props: Partial<G2ChartProps>) => {
      chartRefEl.value?.updChartProps(props)
    }
  }

  return {
    chartRefEl,
    chartInstance,
    methods
  }
}
