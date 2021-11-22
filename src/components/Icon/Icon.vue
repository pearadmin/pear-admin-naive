<script setup lang="ts">
  import { computed, onMounted, ref, watch } from 'vue'
  // @ts-ignore
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
    return typeof props.size === 'number' ? `${props.size}px` : props.size
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
  <span ref="iconRefEl" :class="iconClass" :style="styles" :data-icon="name"></span>
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
    border-radius: 100%;
    min-width: 1em;
    min-height: 1em;
    display: inline-flex;
    transition: 0.3s var(--cubic-bezier-ease-in-out);
    &-spin {
      animation: spin 1s infinite linear;
    }
  }
  span.iconify {
    display: block;
    min-width: 1em;
    min-height: 1em;
    border-radius: 100%;
    transition: 0.3s var(--cubic-bezier-ease-in-out);
  }
</style>
