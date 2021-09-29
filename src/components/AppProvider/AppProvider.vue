<script setup lang="ts">
  import { NConfigProvider, NMessageProvider, NDialogProvider, NNotificationProvider } from 'naive-ui'
  import { NThemeEditor, NGlobalStyle } from 'naive-ui'
  import { isDevelopment } from '@/utils/utils'
  import { useUiConfig } from '@/composables/useUiConfig/useUiConfig'
  import { OuterMessage, OuterNotification } from '@/components/AppProvider/OuterFeedback'

  const { providerAttrs } = useUiConfig()
</script>
<template>
  <n-config-provider v-bind="providerAttrs">
    <n-global-style />
    <n-theme-editor v-if="isDevelopment()" />
    <n-dialog-provider>
      <n-notification-provider>
        <OuterNotification></OuterNotification>
        <NMessageProvider>
          <OuterMessage></OuterMessage>
          <slot slot="default"></slot>
        </NMessageProvider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>
<style scoped lang="less"></style>
