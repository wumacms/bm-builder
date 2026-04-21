import { ref, watchEffect } from 'vue'

export type Theme = 'light' | 'dark'

const initTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light'
  if (localStorage.theme === 'dark') return 'dark'
  if (localStorage.theme === 'light') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// 提取为全局单例状态，确保整个应用各个组件共享这一个 theme 变量
const theme = ref<Theme>(initTheme())

if (typeof document !== 'undefined') {
  watchEffect(() => {
    const isDark = theme.value === 'dark'
    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
    localStorage.theme = theme.value
  })
}

export function useTheme() {
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  return {
    theme,
    toggleTheme
  }
}
