export function useSiteChrome() {
  const desktopOpen = useState('site-sidebar-desktop', () => true)
  const mobileOpen = useState('site-sidebar-mobile', () => false)
  const searchOpen = useState('site-search-open', () => false)
  const searchQuery = useState('site-search-query', () => '')
  const theme = useState<'light' | 'dark'>('site-theme', () => 'light')

  function isDesktop() {
    return import.meta.client && window.matchMedia('(min-width: 1024px)').matches
  }

  function toggleSidebar() {
    if (isDesktop()) desktopOpen.value = !desktopOpen.value
    else mobileOpen.value = !mobileOpen.value
  }

  function closeMobileSidebar() {
    mobileOpen.value = false
  }

  function openSearch() {
    searchOpen.value = true
  }

  function closeSearch() {
    searchOpen.value = false
  }

  function applyTheme(value: 'light' | 'dark') {
    if (!import.meta.client) return
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(value)
    root.style.colorScheme = value
  }

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    applyTheme(theme.value)
    localStorage.setItem('site-theme', theme.value)
  }

  function restoreTheme() {
    const stored = localStorage.getItem('site-theme')
    if (stored === 'light' || stored === 'dark') theme.value = stored
    applyTheme(theme.value)
  }

  return {
    desktopOpen,
    mobileOpen,
    searchOpen,
    searchQuery,
    theme,
    toggleSidebar,
    closeMobileSidebar,
    openSearch,
    closeSearch,
    toggleTheme,
    restoreTheme,
  }
}
