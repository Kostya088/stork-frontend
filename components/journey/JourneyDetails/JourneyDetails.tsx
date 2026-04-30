"use client";

import { useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { getWeeksBaby, getWeeksMom } from "@/lib/api/clientApi";
import css from "./JourneyDetails.module.css";
import Loading from "@/app/loading";

interface Props {
  weekNumber: number;
}

type Tab = "baby" | "mom";

export default function JourneyDetails({ weekNumber }: Props) {
  const [tab, setTab] = useState<Tab>("baby");

  const babyQuery = useQuery({
    queryKey: ["weeks", "baby", weekNumber],
    queryFn: () => getWeeksBaby(weekNumber),
    enabled: tab === "baby",
  });

  const momQuery = useQuery({
    queryKey: ["weeks", "mom", weekNumber],
    queryFn: () => getWeeksMom(weekNumber),
    enabled: tab === "mom",
  });

  const TIP_ICONS = ["food", "activity", "rest"] as const;


  return (
    <section className={css.section}>
      {/* Tabs */}
      <div className={css.tabs}>
        <button
          type="button"
          onClick={() => setTab("baby")}
          className={clsx(css.tab, { [css.tabActive]: tab === "baby" })}
        >
          Розвиток малюка
        </button>
        <button
          type="button"
          onClick={() => setTab("mom")}
          className={clsx(css.tab, { [css.tabActive]: tab === "mom" })}
        >
          Тіло мами
        </button>
      </div>

      {/* Розвиток малюка */}
      {tab === "baby" && (
        <div className={css.content}>
          {babyQuery.isLoading && (
            <div className={css.loaderWrapper}>
              <Loading />
            </div>
          )}
          {babyQuery.isError && (
            <p className={css.status}>Не вдалося завантажити дані малюка.</p>
          )}

          {babyQuery.data && (
            <div className={css.babyCard}>
              <div className={css.imageColumn}>
                <div className={css.imageWrapper}>
                  <Image
                    src={babyQuery.data.image}
                    alt="Ілюстрація малюка"
                    fill
                    className={css.image}
                    priority
                  />
                </div>
                {babyQuery.data.analogy && (
                  <p className={css.caption}>
                    Ваш малюк зараз розміром з {babyQuery.data.analogy}
                  </p>
                )}
              </div>

              <div className={css.textContent}>
                {babyQuery.data.babyDevelopment && (
                  <p className={css.paragraph}>
                    {babyQuery.data.babyDevelopment}
                  </p>
                )}
                {babyQuery.data.interestingFact && (
                  <div className={css.factSection}>
                    <div className={css.factWrapperCont}>
                      <svg className={css.factTitle} aria-hidden="true">
                        <use href="/icons/sprite.svg#emotion-star"></use>
                      </svg>
                      <p>Цікавий факт тижня</p>
                    </div>
                    <p className={css.factText}>
                      {babyQuery.data.interestingFact}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Тіло мами */}
      {tab === "mom" && (
        <div className={css.content}>
          {momQuery.isLoading && (
            <div className={css.loaderWrapper}>
              <Loading />
            </div>
          )}
          {momQuery.isError && (
            <p className={css.status}>Не вдалося завантажити дані.</p>
          )}
          {momQuery.data && (
            <>
              {/* Перша картка — рожева, з відчуттями */}
              <div className={clsx(css.momCard, css.momCardFeelings)}>
                <h3 className={css.cardTitle}>Як ви можете почуватись</h3>
                {momQuery.data.feelings?.states?.length > 0 && (
                  <ul className={css.tags}>
                    {momQuery.data.feelings.states.map((s) => (
                      <li key={s} className={css.tag}>
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
                {momQuery.data.feelings?.sensationDescr && (
                  <p className={css.paragraph}>
                    {momQuery.data.feelings.sensationDescr}
                  </p>
                )}
              </div>

              {/* Друга картка — світла, з порадами */}
              {momQuery.data.comfortTips?.length > 0 && (
                <div className={clsx(css.momCard, css.momCardTips)}>
                  <h3 className={css.cardTitle}>Поради для вашого комфорту</h3>
                  <ul className={css.tipsList}>
                    {momQuery.data.comfortTips.map((t, i) => (
                      <li key={t.category} className={css.tipItem}>
                        <div className={css.tipIconWrapper}>
                          <svg className={css.tipIcon} aria-hidden="true">
                            <use
                              href={`/icons/sprite.svg#${TIP_ICONS[i] ?? "rest"}`}
                            />
                          </svg>
                        </div>
                        <div className={css.tipContent}>
                          <p className={css.tipCategory}>{t.category}</p>
                          <p className={css.tipText}>{t.tip}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
}
