<script setup lang="ts">
  import { useChart } from '@/components/AntVG2/useChart'
  import { fetchGameChart } from './service'
  import usePromiseFn from '@/composables/usePromiseFn'
  // import { renderLineChart } from '@/views/demo/dashboard/analysis/renderChart/renderLineChart'
  import { watch } from 'vue'
  import { Chart } from '@antv/g2'
  import { renderGameChart } from '@/views/demo/dashboard/analysis/renderChart/renderGameChart'

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
      // width: 800,
      height: 500,
      syncViewPadding: true
    }
  })

  watch(loading1, (loading1) => {
    updChartProps({
      loading: loading1
    })
  })

  watch(data1, (chart1Data) => {
    // renderLineChart(chartInstance.value as Chart, chart1Data)
    renderGameChart(chartInstance.value as Chart, chart1Data)
  })
</script>

<template>
  <PageWrapper>
    <NCard title="任天堂游戏销售趋势">
      <template #header-extra>
        <NSpace>
          <PButton :loading="loading1" @click="executor1">重新加载数据</PButton>
          <PButton @click="chartInstance?.render()">仅图表刷新</PButton>
        </NSpace>
      </template>
      <G2Chart ref="chartRefEl" />
    </NCard>
  </PageWrapper>
</template>

<style scoped lang="less"></style>
