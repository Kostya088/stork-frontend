import styles from "./LoginPage.module.css";
import LoginForm from "@/components/forms/LoginForm/LoginForm";


import Image from "next/image";



export default function Login() {
   return (
    <div className={styles.page}>
      <div className={styles.left}>
        <LoginForm />
      </div>

      <div className={styles.right}>
        <Image
          src="/icons/login-img.jpg"
          alt="Login"
          fill
          className={styles.image}
          priority
        />
      </div>
    </div>
  );
}
