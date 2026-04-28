import styles from "./LoginPage.module.css";
import LoginForm from "@/components/forms/LoginForm/LoginForm";
import Link from "next/link";
import Image from "next/image";

export default function Login() {
  return (
    <div className={styles.page}>
      <Link href="/" className={styles.logoLink}>
        <svg className={styles.logoIcon} width="95" height="29">
          <use href="/icons/sprite.svg#icon-leleka-logo" />
        </svg>
      </Link>

      <div className={styles.left}>
        <LoginForm />
      </div>

      <div className={styles.right}>
        <Image
          src="/icons/login-img.jpg"
          alt="Login"
          width={720}
          height={900}
          className={styles.image}
          priority
        />
      </div>
    </div>
  );
}
