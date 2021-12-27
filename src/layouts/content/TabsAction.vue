<script setup lang="ts">
  const { closeLeft, closeOther, closeRight } = defineProps<{
    closeLeft: () => void
    closeRight: () => void
    closeOther: () => void
  }>()

  const options = [
    {
      label: '关闭左侧',
      key: 'close-left'
    },
    {
      label: '关闭右侧',
      key: 'close-right'
    },
    {
      label: '关闭其它',
      key: 'close-other'
    }
  ]

  function handleSelect(key: 'close-left' | 'close-right' | 'close-other') {
    switch (key) {
      case 'close-left':
        closeLeft()
        break
      case 'close-right':
        closeRight()
        break
      case 'close-other':
        closeOther()
        break
    }
  }
</script>

<template>
  <NDropdown trigger="click" :options="options" placement="bottom-start" :on-select="handleSelect">
    <NButton text>
      <Icon name="mdi:arrow-down-drop-circle-outline" :size="19" />
    </NButton>
  </NDropdown>
</template>
