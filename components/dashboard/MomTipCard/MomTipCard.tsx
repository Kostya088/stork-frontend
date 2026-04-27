"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getWeeksMom,
  getWeeksMe,
} from "@/lib/api/clientApi";
import type { MomState } from "@/types/momState";
import css from "./MomTipCard.module.css";

export default function MomTipCard() {
  const { data: week } = useQuery({
    queryKey: ["weeks", "me"],
    queryFn: getWeeksMe,
  });

  const { data: momState } = useQuery<MomState>({
    queryKey: ["mom-state", week?.weekNumber],
    queryFn: () => getWeeksMom(week!.weekNumber),
    enabled: !!week?.weekNumber,
  });

  const mockTip = {
    text: "Не забувайте про зволоження шкіри живота та стегон спеціальними олійками, щоб попередити появу розтяжок.",
    icon: "💡",
  };

  const currentTip = momState?.tip ?? mockTip;

  return (
    <section className={css.card}>
      <h2 className={css.title}>
        Порада для мами
      </h2>

      <div className={css.content}>
        <span className={css.icon}>
          {currentTip.icon}
        </span>
        <p className={css.text}>
          {currentTip.text}
        </p>
      </div>
    </section>
  );
}
