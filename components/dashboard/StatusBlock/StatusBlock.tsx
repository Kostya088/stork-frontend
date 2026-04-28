"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/store/authStore";
import { getWeeksMe } from "@/lib/api/clientApi";

import css from "./StatusBlock.module.css";

export default function StatusBlock() {
  const isAuthenticated = useAuthStore(
    (s) => s.isAuthenticated,
  );

  const { data, isLoading } = useQuery({
    queryKey: ["weeksMe", isAuthenticated],
    queryFn: getWeeksMe,
    enabled: isAuthenticated,
  });

  if (!isAuthenticated || isLoading || !data) {
    return (
      <div className={css.row}>
        <div className={css.card}>
          <p className={css.label}>Тиждень</p>
          <p className={css.value}>—</p>
        </div>

        <div className={css.card}>
          <p className={css.label}>
            Днів до зустрічі
          </p>
          <p className={css.value}>—</p>
        </div>
      </div>
    );
  }

  return (
    <div className={css.row}>
      <div className={css.card}>
        <p className={css.label}>Тиждень</p>
        <p className={css.value}>
          {data?.weekNumber}
        </p>
      </div>

      <div className={css.card}>
        <p className={css.label}>
          Днів до зустрічі
        </p>
        <p className={css.value}>
          {data?.daysUntilDue}
        </p>
      </div>
    </div>
  );
}
