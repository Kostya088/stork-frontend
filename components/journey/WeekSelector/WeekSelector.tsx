"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import useEmblaCarousel from "embla-carousel-react";
import clsx from "clsx";
import { getWeeksMe } from "@/lib/api/clientApi";
import css from "./WeekSelector.module.css";

interface Props {
  selectedWeek: number;
}

const TOTAL_WEEKS = 42;

export default function WeekSelector({ selectedWeek }: Props) {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["weeks", "me"],
    queryFn: getWeeksMe,
  });
  const currentWeek = data?.weekNumber ?? 1;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: "x",
    dragFree: true,

  });

  useEffect(() => {
    if (!emblaApi) return;

    const scrollToWeek = () => {
      emblaApi.scrollTo(selectedWeek - 2, false);
    };


    emblaApi.on("init", scrollToWeek);
    scrollToWeek(); 

    return () => {
      emblaApi.off("init", scrollToWeek);
    };
  }, [emblaApi, selectedWeek]);

  const weeks = Array.from({ length: TOTAL_WEEKS }, (_, i) => i + 1);

  return (
    <div className={css.wrapper}>
      <div className={css.emblaViewport} ref={emblaRef}>
        <ul className={css.list}>
          {weeks.map((w) => {
            const isPast = w < currentWeek;
            const isCurrent = w === currentWeek;
            const isFuture = w > currentWeek;
            const isSelected = w === selectedWeek;

            return (
              <li key={w} className={css.slide}>
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
      </div>
    </div>
  );
}
