"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./Breadcrumbs.module.css";

const SEGMENT_LABELS: Record<string, string> = {
  diary: "Щоденник",
  journey: "Подорож",
  profile: "Профіль",
  edit: "Редагування",
  new: "Новий запис",
};

function getLabel(segment: string): string {
  return SEGMENT_LABELS[segment] ?? segment;
}

const AUTH_PATHS = ["/login", "/register", "/profile/edit"];

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const pageCrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label = getLabel(segment);
    const isLast = index === segments.length - 1;
    return { href, label, isLast };
  });

  const crumbs = [
    { href: "/", label: "Лелека", isLast: false },
    ...(segments.length === 0
      ? [{ href: "/", label: "Мій день", isLast: true }]
      : pageCrumbs),
  ];

  return (
    <nav aria-label="breadcrumb" className={css.breadcrumbs}>
      <ol className={css.list}>
        {crumbs.map(({ href, label, isLast }, index) => (
          <li key={href + index} className={css.item}>
            {index > 0 && (
              <svg className={css.separator} width="7" height="12">
                <use href="/icons/sprite.svg#icon-chevron-right" />
              </svg>
            )}
            {isLast ? (
              <span className={css.current} aria-current="page">
                {label}
              </span>
            ) : (
              <Link href={href} className={css.link}>
                {label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}