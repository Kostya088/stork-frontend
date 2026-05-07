'use client';

import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/lib/store/authStore';
import { getWeeksMe, getPublicWeek } from '@/lib/api/clientApi';
import type { WeekDashboardInfo } from '@/types/weekInfo';

import css from './MomTipCard.module.css';

export default function MomTipCard() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isInitializing = useAuthStore((s) => s.isInitializing);

  const { data, isLoading } = useQuery<WeekDashboardInfo>({
    queryKey: ['weeks', isAuthenticated ? 'me' : 'public', 1],
    queryFn: () => (isAuthenticated ? getWeeksMe() : getPublicWeek(1)),
    enabled: !isInitializing,
  });

  if (isInitializing || isLoading) {
    return (
      <section className={css.card}>
        <p className={css.text}>Завантаження поради...</p>
      </section>
    );
  }

  return (
    <section className={css.card}>
      <h2 className={css.title}>Порада для мами</h2>

      <p className={css.text}>
        {data?.tipForMom ||
          'Не забувайте про зволоження шкіри живота та стегон.'}
      </p>
    </section>
  );
}
