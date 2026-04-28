"use client";

import { useQuery } from "@tanstack/react-query";
import { getWeeksMom } from "@/lib/api/clientApi";
import { useWeekDashboard } from "@/hooks/useWeekDashboard";
import css from "./MomTipCard.module.css";

const FALLBACK_TITLE = "Порада для мами";

type ComfortTip = {
  title?: string;
  category: string;
  tip: string;
};

export default function MomTipCard() {
  const { data: week, isLoading: isWeekLoading } =
    useWeekDashboard();

  const weekNumber = week?.weekNumber;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["mom-state", weekNumber],
    queryFn: () =>
      getWeeksMom(weekNumber as number),
    enabled: !!weekNumber,
  });

  if (isWeekLoading || isLoading) {
    return (
      <section className={css.card}>
        <p className={css.text}>
          Підбираємо для вас корисну пораду...
        </p>
      </section>
    );
  }

  if (isError || !data) {
    return (
      <section className={css.card}>
        <p className={css.text}>
          Поки що не вдалося завантажити пораду
        </p>
      </section>
    );
  }

  const tip: ComfortTip = data
    .comfortTips?.[0] ?? {
    title: FALLBACK_TITLE,
    category: "💡",
    tip: "Не забувайте про зволоження шкіри живота та стегон спеціальними олійками, щоб попередити появу розтяжок.",
  };

  return (
    <section className={css.card}>
      <h2 className={css.title}>
        {tip.title ?? FALLBACK_TITLE}
      </h2>

      <div className={css.content}>
        <span className={css.icon}>
          {tip.category}
        </span>

        <p className={css.text}>{tip.tip}</p>
      </div>
    </section>
  );
}
