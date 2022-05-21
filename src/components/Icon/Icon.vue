<script setup lang="ts">
  import { computed, onMounted, ref, watch } from 'vue'
  import Iconify from '@purge-icons/generated'

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
    return `${props.size}px`
  })

  const styles = computed(() => {
    return {
      fontSize: fontSize.value,
      color: props.color ? props.color : 'inherit'
    }
  })

  const iconClass = computed(() => {
    return {
      'pear-icon': true,
      'pear-icon-spin': props.spin
    }
  })

  const iconRefEl = ref<Nullable<HTMLElement>>(null)

  watch(
    () => props.name,
    () => {
      update()
    },
    { flush: 'post' }
  )

  async function update() {
    const el = iconRefEl.value as Element
    if (el) {
      const svg = Iconify.renderSVG(props.name, {})
      if (svg) {
        el.textContent = ''
        el.appendChild(svg)
      } else {
        const span = document.createElement('span')
        span.className = 'iconify'
        span.dataset.icon = props.name
        el.textContent = ''
        el.appendChild(span)
      }
    }
  }

  onMounted(() => {
    update()
  })
</script>

<template>
  <i ref="iconRefEl" :class="iconClass" :style="styles" :data-icon="name"></i>
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
    min-height: 1em;
    min-width: 1em;
    line-height: 1em;
    text-align: center;
    display: inline-block;
    position: relative;
    fill: currentColor;
    transform: translateZ(0);
    transition: 0.3s var(--cubic-bezier-ease-in-out);
    &-spin {
      animation: spin 1s infinite linear;
    }
  }
  span.iconify {
    //display: block;
    display: inline-flex;
    min-width: 1em;
    min-height: 1em;
    border-radius: 100%;
    transition: 0.3s var(--cubic-bezier-ease-in-out);
  }
</style>
