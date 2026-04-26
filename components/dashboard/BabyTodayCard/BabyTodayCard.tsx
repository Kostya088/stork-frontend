"use client";

import { useQuery } from "@tanstack/react-query";
import { getWeeksBaby, getWeeksMe } from "@/lib/api/clientApi";
import css from "./BabyTodayCard.module.css";
import Image from "next/image";

export default function BabyTodayCard() {
  const {
    data: week,
    isLoading: isWeekLoading,
    isError: isWeekError,
  } = useQuery({
    queryKey: ["weeks", "me"],
    queryFn: getWeeksMe,
  });

  const {
    data: baby,
    isLoading: isBabyLoading,
    isError: isBabyError,
  } = useQuery({
    queryKey: ["weeks", "baby", week?.weekNumber],
    queryFn: () => getWeeksBaby(week!.weekNumber),
    enabled: Boolean(week?.weekNumber),
  });

  if (isWeekLoading || isBabyLoading) {
    return (
      <section className={css.card}>
        <p>Завантаження...</p>
      </section>
    );
  }

  if (isWeekError || isBabyError || !week || !baby) {
    return (
      <section className={css.card}>
        <p>Не вдалося завантажити інформацію про малюка.</p>
      </section>
    );
  }

  return (
    <section className={css.card}>
      <h2 className={css.title}>Малюк сьогодні</h2>

      <div className={css.content}>
        <div className={css.imageWrapper}>
          <Image
            src={baby.image}
            alt="Ілюстрація розміру малюка"
            className={css.image}
            width={260}
            height={180}
          />
        </div>

        <div className={css.info}>
          <p>
            <span>
              <strong>Розмір:</strong> Приблизно {baby.babySize} см
            </span>
          </p>
          <p>
            <span>
              <strong>Вага:</strong> Близько {baby.babyWeight} грамів
            </span>
          </p>
          <p>
            <span>
              <strong>Активність:</strong> {baby.babyActivity}
            </span>
          </p>
        </div>
      </div>

      <p className={css.description}>{baby.babyDevelopment}</p>
    </section>
  );
}
