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

  const iconMap: Record<string, string> = {
    Харчування: "food",
    Активність: "activity",
    Відпочинок: "rest",
  };

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
                    {/* <FactTitleIcon
                      className={css.factTitle}
                      aria-hidden="true"
                    /> */}

                    <p>Цікавий факт тижня</p>
                  </div>
                  <p className={css.factText}>
                    {babyQuery.data.interestingFact}
                  </p>
                </div>
              )}
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
                    {momQuery.data.comfortTips.map((t) => (
                      <li key={t.category} className={css.tipItem}>
                        <div className={css.tipIconWrapper}>
                          <svg className={css.tipIcon} aria-hidden="true">
                            <use
                              href={`/icons/sprite.svg#${iconMap[t.category] || "rest"}`}
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

// function FactTitleIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       {...props}
//     >

//       <path
//         d="M19.2389 15.0129C19.4117 14.8431 19.6151 14.7582 19.8491 14.7582C20.0831 14.7582 20.2865 14.8431 20.4592 15.0129L21.9864 16.5652C22.1562 16.7359 22.2411 16.9349 22.2411 17.1624C22.2411 17.3899 22.1561 17.5897 21.9859 17.7617C21.8157 17.9335 21.6161 18.0194 21.3871 18.0194C21.1583 18.0194 20.9582 17.9325 20.7869 17.7587L19.2407 16.2314C19.0668 16.0601 18.9799 15.8567 18.9799 15.6212C18.9799 15.3857 19.0662 15.1829 19.2389 15.0129ZM19.8967 3.09394C20.0667 3.26594 20.1516 3.46935 20.1516 3.70419C20.1516 3.93902 20.0667 4.14069 19.8967 4.30919L18.3694 5.84244C18.1957 6.01227 17.9919 6.09719 17.7579 6.09719C17.5237 6.09719 17.3214 6.01177 17.1509 5.84094C16.9771 5.6686 16.8901 5.46485 16.8901 5.22969C16.8901 4.99435 16.9771 4.79244 17.1509 4.62394L18.6971 3.09069C18.869 2.92085 19.0693 2.83594 19.2981 2.83594C19.5271 2.83594 19.7267 2.92194 19.8967 3.09394ZM4.1044 3.09369C4.27523 2.92185 4.47823 2.83594 4.7134 2.83594C4.94873 2.83594 5.15148 2.92085 5.32165 3.09069L6.8549 4.64294C7.02473 4.8146 7.10965 5.01494 7.10965 5.24394C7.10965 5.47294 7.0254 5.67244 6.8569 5.84244C6.68823 6.01227 6.48898 6.09719 6.25915 6.09719C6.02915 6.09719 5.8299 6.01227 5.6614 5.84244L4.10315 4.30919C3.93315 4.13902 3.84815 3.93685 3.84815 3.70269C3.84815 3.46869 3.93357 3.26569 4.1044 3.09369ZM4.76515 15.0144C4.93498 15.1851 5.0199 15.3881 5.0199 15.6234C5.0199 15.8586 4.93498 16.0613 4.76515 16.2314L3.2379 17.7587C3.06657 17.9325 2.86315 18.0194 2.62765 18.0194C2.39215 18.0194 2.1894 17.9349 2.0194 17.7657C1.84957 17.5964 1.76465 17.3971 1.76465 17.1679C1.76465 16.9388 1.84957 16.7379 2.0194 16.5652L3.57165 15.0129C3.74232 14.8431 3.9414 14.7582 4.1689 14.7582C4.3964 14.7582 4.59515 14.8436 4.76515 15.0144ZM8.30415 17.5869L12.0009 15.3669L15.7037 17.6124L14.7134 13.4194L17.9781 10.5749L13.6799 10.1987L11.9999 6.23194L10.3276 10.1734L6.02765 10.5559L9.2949 13.3962L8.30415 17.5869ZM11.9999 17.3582L7.4694 20.0924C7.31623 20.1916 7.15373 20.2334 6.9819 20.2177C6.81023 20.202 6.6589 20.1486 6.5279 20.0574C6.39707 19.9664 6.29857 19.8449 6.2324 19.6927C6.16623 19.5407 6.15373 19.3694 6.1949 19.1787L7.39015 14.0162L3.38565 10.5189C3.23648 10.3901 3.1464 10.2445 3.1154 10.0822C3.0844 9.91985 3.08757 9.76252 3.1249 9.61019C3.16223 9.45769 3.24823 9.32869 3.3829 9.22319C3.5174 9.11752 3.67998 9.05635 3.87065 9.03969L9.1599 8.57419L11.2041 3.69619C11.2746 3.52219 11.3845 3.39277 11.5336 3.30794C11.6828 3.22294 11.8361 3.18044 11.9936 3.18044C12.1511 3.18044 12.3061 3.22294 12.4586 3.30794C12.6111 3.39277 12.7235 3.52219 12.7956 3.69619L14.8444 8.57669L20.1351 9.03969C20.3218 9.05635 20.4824 9.11752 20.6169 9.22319C20.7516 9.32869 20.8376 9.45769 20.8749 9.61019C20.9122 9.76252 20.9164 9.91994 20.8874 10.0824C20.8584 10.2449 20.7692 10.3904 20.6199 10.5189L16.6156 14.0162L17.8106 19.1847C17.848 19.3714 17.8322 19.5402 17.7634 19.6912C17.6946 19.8422 17.5982 19.968 17.4744 20.0687C17.3457 20.1582 17.1955 20.2094 17.0236 20.2222C16.852 20.2349 16.6896 20.1936 16.5364 20.0984L11.9999 17.3582Z"
//         fill="black"
//       />
//     </svg>
//   );
// }
