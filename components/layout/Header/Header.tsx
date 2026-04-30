"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebarStore } from "@/lib/store/sidebarStore";
import css from "./Header.module.css";

export default function Header({
  showMobileButton = false,
  hideOnDesktop = false,
  hideOnAuth = false,
}) {
  const sideBarToggle = useSidebarStore((state) => state.toggle);
  const pathname = usePathname();
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/profile/edit";

  if (hideOnAuth && isAuthPage) return null;

  return (
    <header
      className={`${css.header} ${hideOnDesktop ? css.hideOnDesktop : ""}`}
    >
      <Link href="/" className={css.logoLink}>
        <svg className={css.logoIcon} width="76" height="24">
          <use href="/icons/sprite.svg#icon-leleka-logo" />
        </svg>
      </Link>
      {showMobileButton && (
        <button
          className={css.burgerMenuButton}
          aria-label="Burger Menu"
          onClick={sideBarToggle}
        >
          <svg className={css.burgerMenuIcon} width="32" height="32">
            <use href="/icons/sprite.svg#icon-burger" />
          </svg>
        </button>
      )}
    </header>
  );
}
