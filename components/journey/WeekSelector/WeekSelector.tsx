"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { getWeeksMe } from "@/lib/api/clientApi";
import css from "./WeekSelector.module.css";

interface Props {
  selectedWeek: number;
}

const TOTAL_WEEKS = 42;

export default function WeekSelector({ selectedWeek }: Props) {
  const router = useRouter();
  const listRef = useRef<HTMLUListElement>(null);
  const activeRef = useRef<HTMLLIElement>(null);

  const { data } = useQuery({
    queryKey: ["weeks", "me"],
    queryFn: getWeeksMe,
  });
  const currentWeek = data?.weekNumber ?? 1;

  // автоскрол до обраного тижня
  useEffect(() => {
    activeRef.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [selectedWeek]);

  const weeks = Array.from({ length: TOTAL_WEEKS }, (_, i) => i + 1);

  return (
    <ul ref={listRef} className={css.list}>
      {weeks.map((w) => {
        const isPast = w < currentWeek;
        const isCurrent = w === currentWeek;
        const isFuture = w > currentWeek;
        const isSelected = w === selectedWeek;

        return (
          <li key={w} ref={isSelected ? activeRef : null}>
            <button
              type="button"
              disabled={isFuture}
              onClick={() => router.push(`/journey/${w}`)}
              className={clsx(css.weekBtn, {
                [css.past]: isPast,
                [css.current]: isCurrent,
                [css.future]: isFuture,
                [css.selected]: isSelected,
              })}
            >
              <span className={css.number}>{w}</span>
              <span className={css.label}>Тиждень</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
