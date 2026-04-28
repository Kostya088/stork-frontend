"use client";

import { useWeekDashboard } from "@/hooks/useWeekDashboard";
import css from "./StatusBlock.module.css";

export default function StatusBlock() {
  const { data, isLoading, isError } =
    useWeekDashboard();

  if (isLoading) {
    return (
      <div className={css.row}>
        <div className={css.card}>
          Завантаження...
        </div>
        <div className={css.card}>
          Завантаження...
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className={css.row}>
        <div className={css.card}>
          Немає даних
        </div>
        <div className={css.card}>
          Немає даних
        </div>
      </div>
    );
  }

  return (
    <div className={css.row}>
      <div className={css.card}>
        <p className={css.label}>Тиждень</p>
        <p className={css.value}>
          {data.weekNumber}
        </p>
      </div>

      <div className={css.card}>
        <p className={css.label}>
          Днів до зустрічі
        </p>
        <p className={css.value}>
          {data.daysUntilDue}
        </p>
      </div>
    </div>
  );
}
