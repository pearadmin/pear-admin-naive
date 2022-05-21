<script setup lang="ts">
  import { computed, useAttrs, useSlots } from 'vue'
  import { omit } from 'lodash-es'
  import { useRoute } from 'vue-router'

  export interface PageWrapperProps {
    title?: string
    subtitle?: string
    extra?: string
    // 'on-back'?: string
    onBack?: string
    showDefaultBreadcrumb?: boolean
    showDefaultTitle?: boolean
    onlyContent?: boolean
  }

  defineOptions({
    name: 'PageWrapper',
    inheritAttrs: false
  })

  const props = withDefaults(defineProps<PageWrapperProps>(), {
    showDefaultBreadcrumb: true,
    showDefaultTitle: true,
    onlyContent: false
  })

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

  const pageWrapperClass = computed(() => {
    return ['pear-admin-page-wrapper', attrs.class ?? {}]
  })

  // content class
  const pageContentClass = computed(() => {
    return {
      'pear-admin-page-wrapper-content': true
    }
  })

  // n page header component class
  const pageHeaderClass = computed(() => {
    return {
      'pear-admin-page-wrapper-header': true,
      'pear-admin-page-wrapper-header-only': props.onlyContent
    }
  })

  const route = useRoute()
</script>

<template>
  <div :class="pageWrapperClass">
    <NPageHeader v-bind="pageHeaderProps" :class="pageHeaderClass">
      <template v-for="slot in Object.keys(pageHeaderSlots)" :key="slot" #[slot]>
        <slot :name="slot"></slot>
      </template>
      <!-- default is => parentMenuTitle/currentMenuTitle -->
      <template v-if="props.showDefaultBreadcrumb" #header>
        <slot name="header">
          <Breadcrumb />
        </slot>
      </template>

      <!-- default is => currentMenuTitle -->
      <template v-if="props.showDefaultTitle" #title>
        <slot name="title">
          {{ route.meta.title }}
        </slot>
      </template>

      <template v-if="slots?.pageHeaderContent" #default>
        <slot name="pageHeaderContent"></slot>
      </template>
    </NPageHeader>
    <NScrollbar>
      <NElement tag="div" :class="pageContentClass">
        <slot name="default"></slot>
      </NElement>
    </NScrollbar>
  </div>
</template>

<style scoped lang="less">
  .pear-admin-page-wrapper {
    width: 100%;
    height: 100%;

    &-header {
      @apply pl-4 pt-4 pr-4 pb-0;

      &-only {
        @apply p-0;
      }
    }

    &-content {
      @apply p-4;
      background: var(--hover-color);
    }
  }
</style>
