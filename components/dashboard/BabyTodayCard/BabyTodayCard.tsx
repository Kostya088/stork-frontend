"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/store/authStore";
import { getPublicWeek, getWeeksMe } from "@/lib/api/clientApi";
import css from "./BabyTodayCard.module.css";

export default function BabyTodayCard() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const {
    data: currentWeek,
    isLoading: isCurrentWeekLoading,
    isError: isCurrentWeekError,
  } = useQuery({
    queryKey: ["weeks", "me"],
    queryFn: getWeeksMe,
    enabled: isAuthenticated,
  });

  const {
    data: publicWeek,
    isLoading: isPublicWeekLoading,
    isError: isPublicWeekError,
  } = useQuery({
    queryKey: ["weeks", "public", 1],
    queryFn: () => getPublicWeek(1),
    enabled: !isAuthenticated,
  });

  const weekData = isAuthenticated ? currentWeek : publicWeek;
  const babyInfo = weekData?.babyInfo;

  if (
    (isAuthenticated && isCurrentWeekLoading) ||
    (!isAuthenticated && isPublicWeekLoading)
  ) {
    return (
      <section className={css.card}>
        <p className={css.status}>Завантаження...</p>
      </section>
    );
  }

  if (
    (isAuthenticated && isCurrentWeekError) ||
    (!isAuthenticated && isPublicWeekError) ||
    !babyInfo
  ) {
    return (
      <section className={css.card}>
        <p className={css.status}>
          Не вдалося завантажити інформацію про малюка.
        </p>
      </section>
    );
  }

  return (
  <section className={css.card}>
    <h2 className={css.title}>Малюк сьогодні</h2>

    <div className={css.content}>
      <div className={css.imageWrapper}>
        <Image
          src={babyInfo.image}
          alt="Ілюстрація розміру малюка"
          className={css.image}
          width={257}
          height={194}
          priority
        />
      </div>

      <div className={css.info}>
        <p>
          <strong>Розмір:</strong> Приблизно {babyInfo.babySize} см
        </p>

        <p>
          <strong>Вага:</strong> Близько {babyInfo.babyWeight} грамів.
        </p>

        <p>
          <strong>Активність:</strong> {babyInfo.babyActivity}
        </p>
      </div>
    </div>

    <p className={css.description}>{babyInfo.babyDevelopment}</p>
  </section>
);
}