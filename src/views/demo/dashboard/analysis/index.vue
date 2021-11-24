<script setup lang="ts">
import Icon from '@/components/Icon'
import PageWrapper from '@/components/PageWrapper'
import { NCard, NSlider, NSpace } from 'naive-ui'
import { ref } from 'vue'

const value = ref([20, 70])
const marks =  {
  0: '0°C',
    20: '20°C',
    37: '37°C',
    100: '100°C'
}
</script>

<template>
  <PageWrapper>
    <Icon name="fa:home" size="22px" spin></Icon>
    <Icon name="fa:dashboard" color="red"></Icon>
    <NCard>
      <n-slider v-model:value="value" :step="10" />
    </NCard>
    <NCard style='height: 300px; width: 300px'>
      <NSlider v-model:value="value" :step="10" vertical ></NSlider>
    </NCard>
    <n-space style="height: 300px; justify-content: center;">
      <n-slider :default-value="77" vertical />
      <n-slider :default-value="20" vertical reverse />
      <n-slider :default-value="30" vertical disabled />
      <n-slider v-model:value="value" :marks="marks" vertical range />
    </n-space>
  </PageWrapper>
</template>

<style scoped lang="less"></style>
