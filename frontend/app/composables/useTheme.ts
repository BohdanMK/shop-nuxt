type ThemeMode = 'light' | 'dark'

const THEME_STORAGE_KEY = 'theme-mode'

export const useTheme = () => {
  const theme = useState<ThemeMode>('theme-mode', () => 'dark')

  const applyTheme = (mode: ThemeMode, persist = true) => {
    if (!import.meta.client) return

    document.documentElement.setAttribute('data-theme', mode)
    theme.value = mode

    if (persist) {
      localStorage.setItem(THEME_STORAGE_KEY, mode)
    }
  }

  const initTheme = () => {
    if (!import.meta.client) return

    const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    const initialMode: ThemeMode = saved === 'light' || saved === 'dark'
      ? saved
      : (systemPrefersDark ? 'dark' : 'light')

    applyTheme(initialMode, false)
  }

  const setTheme = (mode: ThemeMode) => applyTheme(mode)

  const toggleTheme = () => {
    setTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  const isDark = computed(() => theme.value === 'dark')

  return {
    theme,
    isDark,
    initTheme,
    setTheme,
    toggleTheme
  }
}
