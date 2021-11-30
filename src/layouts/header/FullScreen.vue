<script lang="ts">
  export default {
    name: 'FullScreen'
  }
</script>

<script setup lang="ts">
  import { NElement, NTooltip } from 'naive-ui'
  import Icon from '@/components/Icon'

  import { useFullscreen } from '@vueuse/core'
  import { computed, watch } from 'vue'

  const { isFullscreen, toggle } = useFullscreen()

  const iconName = computed(() => {
    return isFullscreen.value ? 'ic:baseline-fullscreen-exit' : 'ic:baseline-fullscreen'
  })
</script>

<template>
  <NTooltip placement="bottom" trigger="hover">
    <template #trigger>
      <NElement tag="div" class="pear-admin-fullscreen" placement="bottom-end" @click="toggle">
        <Icon v-if="isFullscreen" name="ic:baseline-fullscreen-exit" :size="18"></Icon>
        <Icon v-else name="ic:baseline-fullscreen" :size="18"></Icon>
      </NElement>
    </template>
    全屏
  </NTooltip>
</template>

<style scoped lang="less">
  .pear-admin-fullscreen {
    @apply h-full flex flex-row justify-center items-center;
    padding: 0 10px;
    cursor: pointer;
    &:hover {
      background: var(--hover-color);
    }
  }
</style>
