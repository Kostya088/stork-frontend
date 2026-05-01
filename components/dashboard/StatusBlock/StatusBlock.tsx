'use client';

import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/lib/store/authStore';
import { getWeeksMe, getPublicWeek } from '@/lib/api/clientApi';

import css from './StatusBlock.module.css';

const WEEK_INDEX = 1;

export default function StatusBlock() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['weeks', isAuthenticated ? 'me' : 'public', WEEK_INDEX],
    queryFn: async () => {
      if (isAuthenticated) {
        return getWeeksMe();
      }
      return getPublicWeek(WEEK_INDEX);
    },
  });

  if (isLoading) {
    return (
      <div className={css.row}>
        <div className={css.card}>
          <p className={css.label}>Тиждень</p>
          <p className={css.value}>...</p>
        </div>
        <div className={css.card}>
          <p className={css.label}>Днів до зустрічі</p>
          <p className={css.value}>...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={css.row}>
        <div className={css.card}>
          <p className={css.label}>Тиждень</p>
          <p className={css.value}>—</p>
        </div>
        <div className={css.card}>
          <p className={css.label}>Днів до зустрічі</p>
          <p className={css.value}>—</p>
        </div>
      </div>
    );
  }

  return (
    <div className={css.row}>
      <div className={css.card}>
        <p className={css.label}>Тиждень</p>
        <p className={css.value}>{data?.weekNumber ?? '—'}</p>
      </div>

      <div className={css.card}>
        <p className={css.label}>Днів до зустрічі</p>
        <p className={css.value}>
          {data?.daysUntilDue != null ? `~${data.daysUntilDue}` : '—'}
        </p>
      </div>
    </div>
  );
}