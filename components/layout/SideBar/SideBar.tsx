'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import { useSidebarStore } from '@/lib/store/sidebarStore';
import { usePathname } from 'next/navigation';
import Header from '../Header/Header';
import AuthBar from '../AuthBar/AuthBar';
import UserBar from '../UserBar/UserBar';
import css from './SideBar.module.css';

const navLinks = [
  { href: '/', label: 'Мій день', icon: 'icon-calendar' },
  { href: '/journey', label: 'Подорож', icon: 'icon-branch' },
  { href: '/diary', label: 'Щоденник', icon: 'icon-book' },
  { href: '/profile', label: 'Профіль', icon: 'icon-profile' },
];

export function SideBarContent({ onLinkClick }: { onLinkClick?: () => void }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isInitializing = useAuthStore((state) => state.isInitializing);
  const pathname = usePathname();

  const getHref = (href: string) => {
    if (isAuthenticated) return href;
    if (href === '/') return '/login';
    return '/login';
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className={css.nav} aria-label="Головна навігація">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={getHref(link.href)}
            className={`${css.navLink} ${
              isActive(link.href) ? css.active : ''
            }`}
            onClick={onLinkClick}
            aria-current={isActive(link.href) ? 'page' : undefined}
          >
            <svg className={css.navIcon} aria-hidden="true">
              <use href={`/icons/sprite.svg#${link.icon}`} />
            </svg>
            {link.label}
          </Link>
        ))}
      </nav>
      
      <div className={css.authSection}>
        {isInitializing ? (
          <div className={css.authPlaceholder} aria-hidden="true" />
        ) : isAuthenticated ? (
          <UserBar />
        ) : (
          <AuthBar onLinkClick={onLinkClick} />
        )}
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
    pathname === '/login' ||
    pathname === '/register' ||
    pathname === '/profile/edit';

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
  const isAuthPage = pathname === '/login' || pathname === '/register';

  const [isClosing, setIsClosing] = useState(false);
  const shouldRender = isOpen || isClosing;

  useEffect(() => {
    if (isAuthPage && isOpen) {
      close();
    }
  }, [close, isAuthPage, isOpen]);

  useEffect(() => {
    if (shouldRender && !isAuthPage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAuthPage, shouldRender]);

  if (!shouldRender || isAuthPage) return null;

  const handleClose = () => {
    if (isClosing) return;

    setIsClosing(true);
    window.setTimeout(() => {
      close();
      setIsClosing(false);
    }, 300);
  };

  return (
    <div
      className={`${css.overlay} ${isClosing ? css.overlayClosing : ''}`}
      onClick={handleClose}
    >
      <aside
        className={`${css.sidebarMobile} ${isClosing ? css.sidebarMobileClosing : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={css.mobileHeader}>
          <Link
            href="/"
            className={css.logoLink}
            onClick={handleClose}
            aria-label="На головну сторінку"
          >
            <svg
              className={css.logoIcon}
              width="95"
              height="29"
              aria-hidden="true"
            >
              <use href="/icons/sprite.svg#icon-leleka-logo" />
            </svg>
          </Link>
          <button
            className={css.closeButton}
            onClick={handleClose}
            aria-label="Закрити меню"
          >
            <svg className={css.closeIcon} aria-hidden="true">
              <use href="/icons/sprite.svg#icon-close" />
            </svg>
          </button>
        </div>
        <SideBarContent onLinkClick={handleClose} />
      </aside>
    </div>
  );
}
