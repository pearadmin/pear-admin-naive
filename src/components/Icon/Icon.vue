<script setup lang="ts">
  import { computed } from 'vue'
  import { NElement } from 'naive-ui'

  export interface IconProps {
    name: string
    size?: number | string
    spin?: boolean
    color?: string
  }
  const props = withDefaults(defineProps<IconProps>(), {
    size: 16,
    spin: false
  })

  const fontSize = computed(() => {
    return typeof props.size === 'number' ? `${props.size}px` : props.size
  })

  const styles = computed(() => {
    return {
      fontSize: fontSize.value,
      color: props.color ? props.color : 'var(--primary-color)'
    }
  })

  const iconClass = computed(() => {
    return {
      iconify: true,
      'pear-icon': true,
      'pear-icon-spin': props.spin
    }
  })
</script>

<template>
  <NElement tag="span" :class="iconClass" :style="styles" :data-icon="props.name"> </NElement>
</template>

<style scoped lang="less">
  @keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    50% {
      -webkit-transform: rotate(180deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  .pear-icon {
    // script setup失效？
    //color: v-bind(color);
    //font-size: v-bind(fontSize);
    transition: 0.3s var(--cubic-bezier-ease-in-out);
    &-spin {
      animation: spin 1s infinite linear;
    }
  }
</style>
