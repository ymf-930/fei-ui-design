import type { Ref } from 'vue'
export interface ConfigProviderInjection {
  mergedThemeNameRef: Ref<string | undefined>
  mergedThemeRef: Ref<object | undefined>
}
