import { ComputedRef, onMounted, ref } from 'vue'
import { Chart, View } from '@antv/g2'
import { G2ChartProps } from '@/components/AntVG2/G2Chart.vue'

export function useChart(props: ComputedRef<G2ChartProps>) {
  const data = [
    { year: '1951 年', sales: 38 },
    { year: '1952 年', sales: 52 },
    { year: '1956 年', sales: 61 },
    { year: '1957 年', sales: 145 },
    { year: '1958 年', sales: 48 },
    { year: '1959 年', sales: 38 },
    { year: '1960 年', sales: 38 },
    { year: '1962 年', sales: 38 }
  ]

  const chartRefEl = ref<Nullable<HTMLElement>>(null)

  const chart = ref<Nullable<View>>(null)

  onMounted(() => {
    if (!chart.value) {
      chart.value = new Chart({
        container: chartRefEl.value as HTMLElement,
        width: 600,
        height: 300
      })

      chart.value.data(data)
      chart.value.scale('sales', {
        nice: true
      })

      chart.value.tooltip({
        showMarkers: false
      })
      chart.value.interaction('active-region')

      chart.value.interval().position('year*sales')

      chart.value.render()
    }
  })

  return {
    chartRefEl
  }
}
