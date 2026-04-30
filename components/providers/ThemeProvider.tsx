'use client'

import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import { useAuthStore } from '@/lib/store/authStore'
import { useEffect } from 'react'

function ThemeSyncer() {
  const { setTheme } = useTheme()
  const user = useAuthStore((state) => state.user)

  useEffect(() => {
    setTheme(user?.theme ?? 'light')
  }, [user?.theme, setTheme])

  return null
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="light"
      themes={['light', 'blue', 'pink']}
      enableSystem={false}
    >
      <ThemeSyncer />
      {children}
    </NextThemesProvider>
  )
}
