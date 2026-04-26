"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getWeeksBaby, getWeeksMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./BabyTodayCard.module.css";

const defaultBaby = {
  weekNumber: 1,
  babySize: 0,
  babyWeight: 0,
  image: "https://ftp.goit.study/img/lehlehka/6895ce04a5c677999ed2af25.webp",
  babyActivity:
    "На цьому етапі вагітності ще немає. Тиждень відраховується від першого дня останньої менструації, коли організм тільки готується до можливого зачаття.",
  babyDevelopment:
    "Фактично, на першому тижні вагітності запліднення ще не відбулося. Організм жінки проходить через менструацію та починає готувати домінантний фолікул, з якого згодом вийде яйцеклітина, готова до запліднення. Це підготовчий етап.",
};

export default function BabyTodayCard() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const {
    data: week,
    isLoading: isWeekLoading,
    isError: isWeekError,
  } = useQuery({
    queryKey: ["weeks", "me"],
    queryFn: getWeeksMe,
    enabled: isAuthenticated,
  });

  const weekNumber = week?.weekNumber;

  const {
    data: baby,
    isLoading: isBabyLoading,
    isError: isBabyError,
  } = useQuery({
    queryKey: ["weeks", "baby", weekNumber],
    queryFn: () => getWeeksBaby(weekNumber!),
    enabled: isAuthenticated && Boolean(weekNumber),
  });

  if (isAuthenticated && (isWeekLoading || isBabyLoading)) {
    return (
      <section className={css.card}>
        <p className={css.status}>Завантаження...</p>
      </section>
    );
  }

  if (isAuthenticated && (isWeekError || isBabyError || !baby)) {
    return (
      <section className={css.card}>
        <p className={css.status}>
          Не вдалося завантажити інформацію про малюка.
        </p>
      </section>
    );
  }

  const currentBaby = isAuthenticated ? baby! : defaultBaby;

  return (
    <section className={css.card}>
      <h2 className={css.title}>Малюк сьогодні</h2>

      <div className={css.content}>
        <div className={css.imageWrapper}>
          <Image
            src={currentBaby.image}
            alt="Ілюстрація розміру малюка"
            className={css.image}
            width={257}
            height={194}
          />
        </div>

        <div className={css.info}>
          <p>
            <strong>Розмір:</strong> Приблизно {currentBaby.babySize} см
          </p>
          <p>
            <strong>Вага:</strong> Близько {currentBaby.babyWeight} грамів.
          </p>
          <p>
            <strong>Активність:</strong> {currentBaby.babyActivity}
          </p>
        </div>
      </div>

      <p className={css.description}>{currentBaby.babyDevelopment}</p>
    </section>
  );
}