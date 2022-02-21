<script setup lang="ts">
  import { fetchGameChart } from './service'
  import { useChart } from '@/components/AntVG2/useChart'
  import { onUnmounted, watch } from 'vue'
  import { renderGameChart } from '@/views/demo/components/antvG2/renderGameChart'
  import type { Chart } from '@antv/g2'
  import usePromiseFn from '@/composables/usePromiseFn'
  import { renderDynamicChart } from '@/views/demo/dashboard/analysis/renderChart/renderDynamicChart'
  import { useApi } from '@/api/http'
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
      height: 600
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

  // ==================== chart 2 ==============
  const {
    data: data2,
    loading: loading2,
    executor: executor2
  } = useApi(
    {
      url: '/dashboard/getGDP',
      method: 'get'
    },
    { immediate: true, redo: false }
  )

  const {
    chartRefEl: chartRefEl2,
    chartInstance: chartInstance2,
    methods: { updChartProps: updChartProps2 }
  } = useChart({
    loading: loading2.value,
    initialChartConfig: {
      autoFit: true,
      height: 600
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

  onUnmounted(() => {
    if (window['interval']) {
      clearInterval(window['interval'])
    }
  })
</script>

<template>
  <PageWrapper>
    <NGrid x-gap="12" cols="1 s:1 m:1 l:2 xl:2 xxl:2" responsive="screen">
      <NGi>
        <NCard title="任天堂游戏销售趋势">
          <template #header-extra>
            <NSpace>
              <NButton :loading="loading1" @click="executor1">Reload</NButton>
              <NButton @click="chartInstance?.render()">Refresh</NButton>
            </NSpace>
          </template>
          <G2Chart ref="chartRefEl" />
        </NCard>
      </NGi>
      <NGi>
        <NCard title="动态条形图">
          <template #header-extra>
            <NSpace>
              <NButton :loading="loading2" @click="executor2">Reload</NButton>
              <NButton @click="chartInstance2?.render()">Refresh</NButton>
            </NSpace>
          </template>
          <G2Chart ref="chartRefEl2" />
        </NCard>
      </NGi>
    </NGrid>
  </PageWrapper>
</template>

<style scoped lang="less"></style>
