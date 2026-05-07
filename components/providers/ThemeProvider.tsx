'use client';

import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { useAuthStore } from '@/lib/store/authStore';
import { useEffect } from 'react';

function ThemeSyncer() {
  const { setTheme } = useTheme();
  const user = useAuthStore((state) => state.user);
  const userTheme = user?.theme as string | undefined;
  const isInitializing = useAuthStore((state) => state.isInitializing);

  useEffect(() => {
    if (isInitializing) return;
    if (!user) return;

    const normalizedTheme =
      userTheme === 'light' ? 'oasis' : (userTheme ?? 'oasis');

    setTheme(normalizedTheme);
  }, [user, userTheme, setTheme, isInitializing]);

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
