import Link from "next/link";
import css from "./AuthBar.module.css";

interface AuthBarProps {
  onLinkClick?: () => void;
}

export default function AuthBar({ onLinkClick }: AuthBarProps) {
  return (
    <div className={css.container}>
      <Link href="/register" className={`${css.link} ${css.registerLink}`} onClick={onLinkClick}>
        Зареєструватися
      </Link>
      <Link href="/login" className={`${css.link} ${css.loginLink}`} onClick={onLinkClick}>
        Увійти
      </Link>
    </div>
  );
}
