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
    showDefaultBreadcrumb?: boolean
    showDefaultTitle?: boolean
  }

  const props = withDefaults(defineProps<PageWrapperProps>(), {
    showDefaultBreadcrumb: true,
    showDefaultTitle: true
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

  // hack: fix .n-page-header default margin-top: 20px
  const onlyContent = computed(() => {
    return (
      Object.keys(pageHeaderSlots).length === 1 &&
      !!Reflect.get(pageHeaderSlots, 'pageHeaderContent')
    )
  })

  // deep content style
  const nPageHeaderContentMarginTop = computed(() => {
    return onlyContent.value ? '0' : '20px'
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
      'pear-admin-page-wrapper-header-no__padding': onlyContent.value
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
      <template v-if="showDefaultBreadcrumb" #header>
        <slot name="header">
          <Breadcrumb />
        </slot>
      </template>

      <!-- default is => currentMenuTitle -->
      <template v-if="showDefaultTitle" #title>
        <slot name="title">
          {{ route.meta.title }}
        </slot>
      </template>

      <template v-if="slots?.pageHeaderContent" #default>
        <slot name="pageHeaderContent"></slot>
      </template>
    </NPageHeader>
    <NElement tag="div" :class="pageContentClass">
      <slot name="default"></slot>
    </NElement>
  </div>
</template>

<style scoped lang="less">
  ::v-deep(.n-page-header-content) {
    margin-top: v-bind(nPageHeaderContentMarginTop);
  }
  .pear-admin-page-wrapper {
    width: 100%;
    height: auto;
    &-header {
      //padding: 8px 8px 0;
      @apply pl-4 pt-4 pr-4 pb-0;
      &-no__padding {
        padding: 0;
      }
    }
    &-content {
      @apply p-4;
      background: var(--hover-color);
    }
  }
</style>
