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

const AUTH_PATHS = ["/login", "/register", "/edit/profile"];

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (AUTH_PATHS.includes(pathname)) return null;

  if (segments.length === 0 && !AUTH_PATHS.includes(pathname)) {
    return (
      <nav aria-label="breadcrumb" className={css.breadcrumbs}>
        <ol className={css.list}>
          <li className={css.item}>
            <span className={css.link}>Лелека</span>
            <span className={css.separator}>&#8250;</span>
            <span className={css.current} aria-current="page">
              Мій день
            </span>
          </li>
        </ol>
      </nav>
    );
  }

  const pageCrumbs = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label = getLabel(segment);
    const isLast = index === segments.length - 1;
    return { href, label, isLast };
  });

  const crumbs = [
    { href: "/", label: "Лелека", isLast: segments.length === 0 },
    ...pageCrumbs,
  ];

  return (
    <nav aria-label="breadcrumb" className={css.breadcrumbs}>
      <ol className={css.list}>
        {crumbs.map(({ href, label, isLast }, index) => (
          <li key={href} className={css.item}>
            {index > 0 && <span className={css.separator}>&#8250;</span>}
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
