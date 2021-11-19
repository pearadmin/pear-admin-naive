<script lang="ts">
  export default {
    name: 'PageWrapper',
    inheritAttrs: false
  }
</script>

<script setup lang="ts">
  import { NPageHeader, NBreadcrumb, NBreadcrumbItem, NLayoutContent } from 'naive-ui'
  import type { PageHeaderPorps } from 'naive-ui'
  import { computed, useAttrs, useSlots } from 'vue'
  import { omit } from 'lodash-es'

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

  const pageHeaderSlots = omit(slots, 'default')
  console.log(slots)

  const pageHeaderClass = computed(() => {
    return ['pear-admin-page-wrapper', attrs.class ?? {}]
  })
</script>

<template>
  <div :class="pageHeaderClass">
    <NPageHeader v-bind="pageHeaderProps" class="pear-admin-page-wrapper-header">
      <template v-for="slot in Object.keys(pageHeaderSlots)" :key="slot" #[slot]>
        <slot :name="slot"></slot>
      </template>
      <slot name="pageHeaderContent"></slot>
    </NPageHeader>
    <n-layout-content
      embedded
      content-style="padding: 16px"
      class="pear-admin-page-wrapper-content"
    >
      <slot name="default"></slot>
    </n-layout-content>
  </div>
</template>

<style scoped lang="less">
  .pear-admin-page-wrapper {
    width: 100%;
    height: auto;
    &-header {
      padding: 5px 16px 0px;
    }
    &-content {
    }
  }
</style>
