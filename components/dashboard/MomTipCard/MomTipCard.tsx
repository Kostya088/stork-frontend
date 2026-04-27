"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getWeeksMom,
  getWeeksMe,
} from "@/lib/api/clientApi";
import type { MomState } from "@/types/momState";
import css from "./MomTipCard.module.css";

export default function MomTipCard() {
  const {
    data: week,
    isLoading: weekLoading,
    isError: weekError,
  } = useQuery({
    queryKey: ["weeks", "me"],
    queryFn: getWeeksMe,
  });

  const weekNumber = week?.weekNumber;

  const {
    data: momState,
    isLoading: momLoading,
    isError: momError,
  } = useQuery<MomState>({
    queryKey: ["mom-state", weekNumber],
    queryFn: () =>
      getWeeksMom(weekNumber as number),
    enabled: !!weekNumber,
  });

  if (weekLoading || momLoading) {
    return (
      <section className={css.card}>
        <p className={css.text}>
          Завантаження...
        </p>
      </section>
    );
  }

  if (weekError || momError || !momState) {
    return (
      <section className={css.card}>
        <p className={css.text}>
          Не вдалося завантажити пораду для мами
        </p>
      </section>
    );
  }

  return (
    <section className={css.card}>
      <h2 className={css.title}>
        Порада для мами
      </h2>

      <div className={css.content}>
        <span className={css.icon}>
          {momState.tip.icon}
        </span>

        <p className={css.text}>
          {momState.tip.text}
        </p>
      </div>
    </section>
  );
}
