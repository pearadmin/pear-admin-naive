<script lang="ts">
  export default {
    name: 'PageWrapper',
    inheritAttrs: false
  }
</script>

<script setup lang="ts">
  import { computed, useAttrs, useSlots } from 'vue'
  import { omit } from 'lodash-es'
  import { useRoute } from 'vue-router'

  // @ts-ignore
  export interface PageWrapperProps {
    title?: string
    subtitle?: string
    extra?: string
    'on-back'?: string
  }

  const props = defineProps<PageWrapperProps>()

  const pageHeaderProps = computed(() => {
    return {
      title: props?.title,
      subtitle: props?.subtitle,
      extra: props?.extra,
      'on-back': props?.['on-back']
    }
  })

  const slots = useSlots()
  const attrs = useAttrs()

  const pageHeaderSlots = omit(slots, 'default', 'header', 'title')

  const pageHeaderClass = computed(() => {
    return ['pear-admin-page-wrapper', attrs.class ?? {}]
  })

  const route = useRoute()
</script>

<template>
  <div :class="pageHeaderClass">
    <NPageHeader v-bind="pageHeaderProps" class="pear-admin-page-wrapper-header">
      <template v-for="slot in Object.keys(pageHeaderSlots)" :key="slot" #[slot]>
        <slot :name="slot"></slot>
      </template>
      <!-- default is => parentMenuTitle/currentMenuTitle -->
      <template #header>
        <slot name="header">
          <Breadcrumb />
        </slot>
      </template>

      <!-- default is => currentMenuTitle -->
      <template #title>
        <slot name="title">
          {{ route.meta.title }}
        </slot>
      </template>

      <template v-if="slots?.pageHeaderContent" #default>
        <slot name="pageHeaderContent"></slot>
      </template>
    </NPageHeader>
    <NElement tag="div" class="pear-admin-page-wrapper-content">
      <slot name="default"></slot>
    </NElement>
  </div>
</template>

<style scoped lang="less">
  .pear-admin-page-wrapper {
    width: 100%;
    height: auto;
    &-header {
      padding: 8px 8px 0px;
    }
    &-content {
      @apply p-4;
      background: var(--hover-color);
    }
  }
</style>
