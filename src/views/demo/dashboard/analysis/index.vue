<script setup lang="ts">
  import { useChart } from '@/components/AntVG2/useChart'
  import { onUnmounted, watch } from 'vue'
  import type { Chart } from '@antv/g2'
  import { renderDynamicChart } from '@/views/demo/dashboard/analysis/renderChart/renderDynamicChart'
  import { useApi } from '@/api/http'

  // ============= chart =============
  // load data
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
    data2 && renderDynamicChart(chartInstance2.value as Chart, data2)
  })

  onUnmounted(() => {
    if (window['interval']) {
      clearInterval(window['interval'])
    }
  })
</script>

<template>
  <PageWrapper>
    <NGrid x-gap="12" cols="1 s:2 m:4 l:4 xl:4 2xl:4" responsive="screen">
      <NGi>
        <NCard>
          <NStatistic label="统计数据" :value="99">
            <template #prefix>
              <Icon name="noto-v1:beaming-face-with-smiling-eyes" :size="18" />
            </template>
            <template #suffix>/ 100</template>
          </NStatistic>
        </NCard>
      </NGi>
      <NGi>
        <NCard>
          <NStatistic label="统计数据" :value="99">
            <template #prefix>
              <Icon name="noto-v1:alien" :size="18" />
            </template>
            <template #suffix>/ 100</template>
          </NStatistic>
        </NCard>
      </NGi>
      <NGi>
        <NCard>
          <NStatistic label="统计数据" :value="99">
            <template #prefix>
              <Icon name="noto-v1:anguished-face" :size="18" />
            </template>
            <template #suffix>/ 100</template>
          </NStatistic>
        </NCard>
      </NGi>
      <NGi>
        <NCard>
          <NStatistic label="统计数据" :value="99">
            <template #prefix>
              <Icon name="fxemoji:circledideographsecret" :size="18" />
            </template>
            <template #suffix>/ 100</template>
          </NStatistic>
        </NCard>
      </NGi>
    </NGrid>
    <NGrid x-gap="12" cols="1 s:2 m:4 l:8 xl:8 2xl:8" responsive="screen" class="mt-4">
      <NGi>
        <NCard
          :content-style="{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center'
          }"
        >
          <Icon name="vscode-icons:file-type-vite" size="24" />
          <NGradientText type="error">Vite</NGradientText>
        </NCard>
      </NGi>
      <NGi>
        <NCard
          :content-style="{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center'
          }"
        >
          <Icon name="vscode-icons:file-type-vue" size="24" />
          <NGradientText type="success">Vue</NGradientText>
        </NCard>
      </NGi>
      <NGi>
        <NCard
          :content-style="{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center'
          }"
        >
          <Icon name="vscode-icons:file-type-typescript" size="24" />
          <NGradientText type="error">Typescript</NGradientText>
        </NCard>
      </NGi>
      <NGi>
        <NCard
          :content-style="{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center'
          }"
        >
          <Icon name="vscode-icons:file-type-jar" size="24" />
          <NGradientText type="error">Java</NGradientText>
        </NCard>
      </NGi>
      <NGi>
        <NCard
          :content-style="{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center'
          }"
        >
          <Icon name="vscode-icons:file-type-nginx" size="24" />
          <NGradientText type="error">Nginx</NGradientText>
        </NCard>
      </NGi>
      <NGi>
        <NCard
          :content-style="{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center'
          }"
        >
          <Icon name="vscode-icons:file-type-precommit" size="24" />
          <NGradientText type="error">^_^</NGradientText>
        </NCard>
      </NGi>
      <NGi>
        <NCard
          :content-style="{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center'
          }"
        >
          <Icon name="fxemoji:nooneunder18symbol" size="24" />
          <NGradientText type="error">o_o</NGradientText>
        </NCard>
      </NGi>
      <NGi>
        <NCard
          :content-style="{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center'
          }"
        >
          <Icon name="fxemoji:thumbsup" size="24" />
          <NGradientText type="error">Good</NGradientText>
        </NCard>
      </NGi>
    </NGrid>
    <NGrid x-gap="12" :cols="1" class="mt-4">
      <NGi>
        <NCard title="动态条形图">
          <template #header-extra>
            <NSpace>
              <NButton :loading="loading2" @click="executor2">重新加载数据</NButton>
              <NButton @click="chartInstance2?.render()">仅图表刷新</NButton>
            </NSpace>
          </template>
          <G2Chart ref="chartRefEl2" />
        </NCard>
      </NGi>
    </NGrid>
  </PageWrapper>
</template>

<style scoped lang="less"></style>
