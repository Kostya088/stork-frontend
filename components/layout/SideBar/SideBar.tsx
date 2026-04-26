"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { useSidebarStore } from "@/lib/store/sidebarStore";
import { usePathname } from "next/navigation";
import Header from "../Header/Header";
import AuthBar from "../AuthBar/AuthBar";
import UserBar from "../UserBar/UserBar";
import css from "./SideBar.module.css";

const navLinks = [
  { href: "/", label: "Мій день", icon: "icon-calendar" },
  { href: "/journey", label: "Подорож", icon: "icon-branch" },
  { href: "/diary", label: "Щоденник", icon: "icon-book" },
  { href: "/profile", label: "Профіль", icon: "icon-profile" },
];

export function SideBarContent({ onLinkClick }: { onLinkClick?: () => void }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const getHref = (href: string) => {
    if (isAuthenticated) return href;
    if (href === "/") return "/login";
    return "/login";
  };

  return (
    <>
      <nav className={css.nav}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={getHref(link.href)}
            className={css.navLink}
            onClick={onLinkClick}
          >
            <svg className={css.navIcon}>
              <use href={`/icons/sprite.svg#${link.icon}`} />
            </svg>
            {link.label}
          </Link>
        ))}
      </nav>
      <div className={css.authSection}>
        {isAuthenticated ? <UserBar /> : <AuthBar onLinkClick={onLinkClick} />}
      </div>
    </>
  );
}

export default function SideBar() {
  const close = useSidebarStore((state) => state.close);

  return (
    <aside className={css.sidebar}>
      <Header />
      <SideBarContent onLinkClick={close} />
    </aside>
  );
}

export function DesktopSidebar() {
  const close = useSidebarStore((state) => state.close);
  const pathname = usePathname();
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/profile/edit";

  if (isAuthPage) return null;

  return (
    <aside className={css.sidebar}>
      <Header />
      <SideBarContent onLinkClick={close} />
    </aside>
  );
}

export function MobileSidebarOverlay() {
  const isOpen = useSidebarStore((state) => state.isOpen);
  const close = useSidebarStore((state) => state.close);
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register";

  useEffect(() => {
    if (isAuthPage && isOpen) {
      close();
    }
  }, [close, isAuthPage, isOpen]);

  useEffect(() => {
    if (isOpen && !isAuthPage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isAuthPage, isOpen]);

  if (!isOpen || isAuthPage) return null;

  return (
    <div className={css.overlay} onClick={close}>
      <aside className={css.sidebarMobile} onClick={(e) => e.stopPropagation()}>
        <div className={css.mobileHeader}>
          <Link href="/" className={css.logoLink}>
            <svg className={css.logoIcon} width="76" height="24">
              <use href="/icons/sprite.svg#icon-leleka-logo" />
            </svg>
          </Link>
          <button
            className={css.closeButton}
            onClick={close}
            aria-label="Закрити"
          >
            <svg className={css.closeIcon}>
              <use href="/icons/sprite.svg#icon-close" />
            </svg>
          </button>
        </div>
        <SideBarContent onLinkClick={close} />
      </aside>
    </div>
  );
}
