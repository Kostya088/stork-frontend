"use client";

import { useQuery } from "@tanstack/react-query";
import { getWeeksBaby, getWeeksMe } from "@/lib/api/clientApi";
import css from "./BabyTodayCard.module.css";
import Image from "next/image";

export default function BabyTodayCard() {
  const { data: week } = useQuery({
    queryKey: ["weeks", "me"],
    queryFn: getWeeksMe,
  });

  const {
    data: baby,
    // isLoading: isBabyLoading,
    // isError: isBabyError,
  } = useQuery({
    queryKey: ["weeks", "baby", week?.weekNumber],
    queryFn: () => getWeeksBaby(week!.weekNumber),
    enabled: Boolean(week?.weekNumber),
  });

  // if (isWeekLoading || isBabyLoading) {
  //   return (
  //     <section className={css.card}>
  //       <p>Завантаження...</p>
  //     </section>
  //   );
  // }

  // if (isWeekError || isBabyError || !week || !baby) {
  //   return (
  //     <section className={css.card}>
  //       <p>Не вдалося завантажити інформацію про малюка.</p>
  //     </section>
  //   );
  // }


  // TODO: remove mock after API ready
const mockWeek = {
  weekNumber: 14,
  babySize: 12,
  babyWeight: 45,
  image: "/images/avocado.png", // або будь-яка
};

const mockBaby = {
  babyActivity: "Малюк активно рухається, хоча ви ще не відчуваєте.",
  babyDevelopment:
    "У цей час тіло малюка починає вирівнюватися, м'язи розвиваються, і рухи стають більш скоординованими.",
};

const currentWeek = week ?? mockWeek;
const currentBaby = baby ?? mockBaby;

// TODO: remove mock after API ready
  return (
  <section className={css.card}>
    <h2 className={css.title}>Малюк сьогодні</h2>

    <div className={css.content}>
      <div className={css.imageWrapper}>
        <Image
          src={currentWeek.image}
          alt="Ілюстрація розміру малюка"
          className={css.image}
          width={260}
          height={180}
        />
      </div>

      <div className={css.info}>
        <p>
          <span><strong>Розмір:</strong> Приблизно {currentWeek.babySize} см</span>
        </p>
        <p>
          <span><strong>Вага:</strong> Близько {currentWeek.babyWeight} грамів</span>
        </p>
        <p>
          <span><strong>Активність:</strong> {currentBaby.babyActivity}</span>
        </p>
      </div>
    </div>

    <p className={css.description}>{currentBaby.babyDevelopment}</p>
  </section>
);
}