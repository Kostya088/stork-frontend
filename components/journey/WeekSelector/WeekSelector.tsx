'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import useEmblaCarousel from 'embla-carousel-react';
import clsx from 'clsx';
import { getWeeksMe } from '@/lib/api/clientApi';
import css from './WeekSelector.module.css';

interface Props {
  selectedWeek: number;
}

const TOTAL_WEEKS = 42;

export default function WeekSelector({ selectedWeek }: Props) {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ['weeks', 'me'],
    queryFn: getWeeksMe,
  });

  const currentWeek = data?.weekNumber ?? 1;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: 'x',
    dragFree: true,
  });

  useEffect(() => {
    if (!emblaApi) return;

    const scrollToWeek = () => {
      // чуть смещаем, чтобы выбранная неделя была не в самом краю
      emblaApi.scrollTo(Math.max(selectedWeek - 2, 0), false);
    };

    emblaApi.on('init', scrollToWeek);
    scrollToWeek();

    return () => {
      emblaApi.off('init', scrollToWeek);
    };
  }, [emblaApi, selectedWeek]);

  const weeks = Array.from({ length: TOTAL_WEEKS }, (_, i) => i + 1);

  return (
    <div className={css.wrapper}>
      <div className={css.emblaViewport} ref={emblaRef}>
        <ul className={css.list}>
          {weeks.map((w) => {
            let stateClass = '';

            if (w > currentWeek) {
              stateClass = css.future;
            } else if (w === selectedWeek) {
              stateClass = css.current;
            } else {
              stateClass = css.past;
            }

            return (
              <li key={w} className={css.slide}>
                <button
                  type="button"
                  onClick={() => {
                    if (w <= currentWeek && w !== selectedWeek) {
                      router.push(`/journey/${w}`);
                    }
                  }}
                  className={clsx(css.weekBtn, stateClass)}
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
