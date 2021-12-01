<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'ThemeTool'
  })
</script>
<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import type { ThemeName } from '@/store/modules/app'
  import { useAppStore } from '@/store/modules/app'
  import { useUiConfig } from '@/composables/useUiConfig/useUiConfig'
  import { getMenuRecords } from '@/api/moduels/fast-api/menu'

  const options = [
    {
      label: '亮色',
      value: 'light'
    },
    {
      label: '暗色',
      value: 'dark'
    },
    {
      label: '跟随系统',
      value: 'auto'
    }
  ]

  const appStore = useAppStore()
  const { toggleTheme } = useUiConfig()

  const value = ref<ThemeName>('auto')

  watch(
    () => appStore.theme,
    (theme: ThemeName) => {
      value.value = theme
    },
    {
      immediate: true
    }
  )

  const currentThemeName = computed(() => {
    const item = options.find((item) => item.value === value.value)
    return item?.label
  })

  function handleToggle(key: string) {
    toggleTheme(key as ThemeName)
  }
</script>
<template>
  <div>
    <n-popselect
      :value="value"
      :options="options"
      trigger="click"
      :api="getMenuRecords"
      @update:value="handleToggle"
    >
      <n-button round> 主题: {{ currentThemeName }} </n-button>
    </n-popselect>
  </div>
</template>
