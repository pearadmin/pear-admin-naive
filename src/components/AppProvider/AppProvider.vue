<script setup lang="ts">
  import { isDevelopment } from '@/utils/utils'
  import { useUiConfig } from '@/composables/useUiConfig/useUiConfig'
  import {
    OuterMessage,
    OuterNotification,
    OuterDialog
  } from '@/components/AppProvider/OuterFeedback'
  import { useUserStore } from '@/store/modules/userInfo'

  const { providerAttrs } = useUiConfig()

  const userStore = useUserStore()

  // reload menu
  userStore.setUserMenuRoutes()
</script>
<template>
  <n-config-provider v-bind="providerAttrs">
    <n-global-style />
    <n-theme-editor v-if="isDevelopment()" />
    <n-dialog-provider>
      <OuterDialog />
      <n-notification-provider>
        <OuterNotification />
        <NMessageProvider>
          <OuterMessage />
          <slot name="default"></slot>
        </NMessageProvider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>
<style scoped lang="less"></style>
