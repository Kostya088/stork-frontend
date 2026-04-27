"use client";

import { useQuery } from "@tanstack/react-query";
import { getWeeksMe } from "@/lib/api/clientApi";
import type { WeekInfo } from "@/types/weekInfo";
import css from "./StatusBlock.module.css";

export default function StatusBlock({
  type,
}: {
  type: "week" | "daysLeft";
}) {
  const {
    data: week,
    isLoading,
    isError,
  } = useQuery<WeekInfo>({
    queryKey: ["weeks", "me"],
    queryFn: getWeeksMe,
  });

  if (isLoading) {
    return (
      <div className={css.item}>
        <p className={css.label}>
          Завантаження...
        </p>
      </div>
    );
  }

  if (isError || !week) {
    return (
      <div className={css.item}>
        <p className={css.label}>Немає даних</p>
      </div>
    );
  }

  return (
    <div className={css.item}>
      {type === "week" && (
        <>
          <p className={css.label}>Тиждень</p>
          <p className={css.value}>
            {week.weekNumber}
          </p>
        </>
      )}

      {type === "daysLeft" && (
        <>
          <p className={css.label}>
            Днів до зустрічі
          </p>
          <p className={css.value}>
            {week.daysRemaining}
          </p>
        </>
      )}
    </div>
  );
}
