<script setup lang="ts">
  /**
   * 这个组件的存在意义在于
   * 因为NButton设置为Loading状态还能继续触发事件。
   * 所以让组件为Loading时，同时为disabled。这样能有效的防止重复提交的问题
   * naive ui 2.21.5 已修复
   */
  import { computed, useAttrs } from 'vue'

  const attrs = useAttrs()

  const btnProps = computed(() => {
    return {
      ...attrs
    }
  })
</script>

<template>
  <NButton v-bind="btnProps">
    <template v-for="name in Object.keys($slots)" :key="name" #[name]>
      <slot :name="name"> </slot>
    </template>
  </NButton>
</template>

<style scoped lang="less"></style>
