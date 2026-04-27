"use client";

import { useWeekDashboard } from "@/hooks/useWeekDashboard";
import css from "./StatusBlock.module.css";

type StatusType = "week" | "daysUntilDue";

type StatusBlockProps = {
  type: StatusType;
};

export default function StatusBlock({
  type,
}: StatusBlockProps) {
  const { data, isLoading, isError } =
    useWeekDashboard();

  if (isLoading) {
    return (
      <div className={css.item}>
        <p className={css.label}>
          Завантаження...
        </p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className={css.item}>
        <p className={css.label}>Немає даних</p>
      </div>
    );
  }

  const config = {
    week: {
      label: "Тиждень",
      value: data.weekNumber,
    },
    daysUntilDue: {
      label: "Днів до зустрічі",
      value: data.daysUntilDue,
    },
  };

  const current = config[type];

  return (
    <div className={css.item}>
      <p className={css.label}>{current.label}</p>
      <p className={css.value}>{current.value}</p>
    </div>
  );
}
