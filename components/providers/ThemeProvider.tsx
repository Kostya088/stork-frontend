'use client';

import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { useAuthStore } from '@/lib/store/authStore';
import { useEffect } from 'react';

function ThemeSyncer() {
  const { setTheme } = useTheme();
  const user = useAuthStore((state) => state.user);
  const isInitializing = useAuthStore((state) => state.isInitializing);

  useEffect(() => {
    if (isInitializing) return;
    const storedTheme = user?.theme as string | undefined;
    const normalizedTheme =
      storedTheme === 'light' ? 'oasis' : (storedTheme ?? 'oasis');

    setTheme(normalizedTheme);
  }, [user?.theme, setTheme, isInitializing]);

  return null;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="oasis"
      themes={['oasis', 'blue', 'pink']}
      enableSystem={false}
    >
      <ThemeSyncer />
      {children}
    </NextThemesProvider>
  );
}
