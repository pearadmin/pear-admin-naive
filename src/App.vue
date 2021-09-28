<script setup lang="ts">
  import { NSpin, NConfigProvider, NMessageProvider, NDialogProvider, NNotificationProvider } from 'naive-ui'
  import { NThemeEditor, NGlobalStyle } from 'naive-ui'
  import { isDevelopment } from '@/utils/utils'
  import Interaction from '@/components/Application/Interaction/Interaction'
  import { useUiConfig } from '@/composables/useUiConfig/useUiConfig'
  const { providerAttrs } = useUiConfig()
</script>

<template>
  <n-config-provider v-bind="providerAttrs">
    <n-global-style />
    <n-theme-editor v-if="isDevelopment()" />
    <n-notification-provider>
      <n-dialog-provider>
        <n-message-provider>
          <router-view v-slot="{ Component }">
            <template v-if="Component">
              <transition mode="out-in">
                <suspense>
                  <component :is="Component" />
                  <template #fallback>
                    <div class="app-loading">
                      <n-spin size="large" />
                      <span class="mt-10">加载中...</span>
                    </div>
                  </template>
                </suspense>
                <!--        <keep-alive>-->
                <!--          <suspense>-->
                <!--            <component :is="Component"></component>-->
                <!--            <template #fallback>-->
                <!--              <div class="app-loading">-->
                <!--                <n-spin size="large" />-->
                <!--                <span class="mt-10">加载中...</span>-->
                <!--              </div>-->
                <!--            </template>-->
                <!--          </suspense>-->
                <!--        </keep-alive>-->
              </transition>
            </template>
          </router-view>
        </n-message-provider>
      </n-dialog-provider>
    </n-notification-provider>
  </n-config-provider>
</template>

<style scoped lang="less">
  .app-loading {
    @apply w-full min-h-screen flex flex-col justify-center items-center;
  }
</style>
