import Link from "next/link";
import css from "./Header.module.css";

export default function Header({ showMobileButton = false, hideOnDesktop = false }) {
  return (
    <header className={`${css.header} ${hideOnDesktop ? css.hideOnDesktop : ''}`}>
      <Link href="/" className={css.logoLink}>
        <svg className={css.logoIcon} width="76" height="24">
          <use href="/icons/sprite.svg#icon-leleka-logo" />
        </svg>
      </Link>
      {showMobileButton && (
        <button className={css.burgerMenuButton} aria-label="Burger Menu">
          <svg className={css.burgerMenuIcon} width="32" height="32">
            <use href="/icons/sprite.svg#icon-burger" />
          </svg>
        </button>
      )}
    </header>
  );
}
