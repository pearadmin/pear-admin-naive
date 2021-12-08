<script setup lang="ts">
  import { useChart } from '@/components/AntVG2/useChart'
  import { fetchChinaGdp, fetchGameChart } from './service'
  import usePromiseFn from '@/composables/usePromiseFn'
  // import { renderLineChart } from '@/views/demo/dashboard/analysis/renderChart/renderLineChart'
  import { watch } from 'vue'
  import { Chart } from '@antv/g2'
  import { renderGameChart } from '@/views/demo/dashboard/analysis/renderChart/renderGameChart'
  import { renderDynamicChart } from '@/views/demo/dashboard/analysis/renderChart/renderDynamicChart'

  // ============= chart 1 =============
  // load data
  const {
    data: data1,
    loading: loading1,
    executor: executor1
  } = usePromiseFn(fetchGameChart, {}, { immediate: true, redo: false })

  const {
    chartRefEl,
    chartInstance,
    methods: { updChartProps }
  } = useChart({
    loading: loading1.value,
    initialChartConfig: {
      autoFit: true,
      height: 500,
      padding: 100,
      syncViewPadding: true
    }
  })

  watch(loading1, (loading1) => {
    updChartProps({
      loading: loading1
    })
  })

  watch(data1, (chart1Data) => {
    renderGameChart(chartInstance.value as Chart, chart1Data)
  })

  // ============= chart2 =============
  // load data
  const {
    data: data2,
    loading: loading2,
    executor: executor2
  } = usePromiseFn(fetchChinaGdp, {}, { immediate: true, redo: false })

  const {
    chartRefEl: chartRefEl2,
    chartInstance: chartInstance2,
    methods: { updChartProps: updChartProps2 }
  } = useChart({
    loading: loading2.value,
    initialChartConfig: {
      autoFit: true,
      height: 500,
      padding: [20, 60]
    }
  })

  watch(loading2, (loading2) => {
    updChartProps2({
      loading: loading2
    })
  })

  watch(data2, (data2) => {
    renderDynamicChart(chartInstance2.value as Chart, data2)
  })
</script>

<template>
  <PageWrapper>
    <NGrid x-gap="12" :cols="2">
      <NGi>
        <NCard title="任天堂游戏销售趋势">
          <template #header-extra>
            <NSpace>
              <PButton :loading="loading1" @click="executor1">重新加载数据</PButton>
              <PButton @click="chartInstance?.render()">仅图表刷新</PButton>
            </NSpace>
          </template>
          <G2Chart ref="chartRefEl" />
        </NCard>
      </NGi>
      <NGi>
        <NCard title="动态条形图">
          <template #header-extra>
            <NSpace>
              <PButton :loading="loading2" @click="executor2">重新加载数据</PButton>
              <PButton @click="chartInstance2?.render()">仅图表刷新</PButton>
            </NSpace>
          </template>
          <G2Chart ref="chartRefEl2" />
        </NCard>
      </NGi>
    </NGrid>
  </PageWrapper>
</template>

<style scoped lang="less"></style>
