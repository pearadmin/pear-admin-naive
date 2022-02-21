import type { ThemeName } from '@/store/modules/app'
import { useAppStore } from '@/store/modules/app'
import { computed, ref } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import { zhCN, dateZhCN, useOsTheme, darkTheme } from 'naive-ui'
import type { NLocale, GlobalThemeOverrides } from 'naive-ui'
import { naiveUIConfig } from '@/config/theme.config'
import type { NDateLocale } from 'naive-ui/lib/locales/date/enUS'
import type { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface'

interface ProviderAttrs {
  dateLocale: Ref<NDateLocale>
  locale: Ref<NLocale>
  theme: ComputedRef<Nullable<BuiltInGlobalTheme>>
  themeOverrides: GlobalThemeOverrides
}

export function useUiConfig() {
  const appStore = useAppStore()
  const osThemeRef = useOsTheme()

  const providerAttrs = ref<ProviderAttrs>({
    dateLocale: ref(dateZhCN),
    locale: ref(zhCN),
    theme: computed(() => {
      if (appStore.theme === 'auto') {
        return osThemeRef.value === 'dark' ? darkTheme : null
      }
      return appStore.theme === 'dark' ? darkTheme : null
    }),
    themeOverrides: naiveUIConfig
  })

  function toggleTheme(themeName: ThemeName) {
    return appStore.toggleTheme(themeName)
  }

  return {
    providerAttrs,
    toggleTheme
  }
}
