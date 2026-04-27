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
  const { data: week } = useQuery<WeekInfo>({
    queryKey: ["weeks", "me"],
    queryFn: getWeeksMe,
  });

  const mockWeek = {
    weekNumber: 16,
    daysLeft: 165,
  };

  const currentWeek = week ?? mockWeek;

  return (
    <div className={css.item}>
      {type === "week" && (
        <>
          <p className={css.label}>Тиждень</p>
          <p className={css.value}>
            {currentWeek.weekNumber}
          </p>
        </>
      )}

      {type === "daysLeft" && (
        <>
          <p className={css.label}>
            Днів до зустрічі
          </p>
          <p className={css.value}>
            {currentWeek.daysLeft}
          </p>
        </>
      )}
    </div>
  );
}
