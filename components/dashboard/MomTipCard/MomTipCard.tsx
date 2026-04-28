"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/store/authStore";
import { getWeeksMe } from "@/lib/api/clientApi";
import type { WeekDashboardInfo } from "@/types/weekInfo";

import css from "./MomTipCard.module.css";

export default function MomTipCard() {
  const isAuthenticated = useAuthStore(
    (s) => s.isAuthenticated,
  );

  const { data, isLoading } =
    useQuery<WeekDashboardInfo>({
      queryKey: ["weeksMe"],
      queryFn: getWeeksMe,
      enabled: isAuthenticated,
    });

  if (isLoading) {
    return (
      <section className={css.card}>
        <p className={css.text}>
          Завантаження поради...
        </p>
      </section>
    );
  }

  if (!isAuthenticated) {
    return (
      <section className={css.card}>
        <div className={css.icon}>💡</div>

        <h2 className={css.title}>
          Порада для мами
        </h2>

        <p className={css.text}>
          Увійдіть, щоб отримувати персональні
          поради
        </p>
      </section>
    );
  }

  return (
    <section className={css.card}>
      <div className={css.icon}>💡</div>

      <h2 className={css.title}>
        Порада для мами
      </h2>

      <p className={css.text}>
        {data?.tipForMom ||
          "Не забувайте про зволоження шкіри живота та стегон."}
      </p>
    </section>
  );
}
