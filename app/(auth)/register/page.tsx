import styles from './RegisterPage.module.css';
import RegistrationForm from '@/components/forms/RegistrationForm/RegistrationForm';
import Link from 'next/link';
import Image from 'next/image';

export default function Register() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link href="/" className={styles.logoLink}>
            <svg className={styles.logoIcon} width="95" height="29">
              <use href="/icons/sprite.svg#icon-leleka-logo" />
            </svg>
          </Link>
          <RegistrationForm />
        </div>

        <div className={styles.right}>
          <Image
            src="/icons/register-img.jpg"
            alt="Register"
            width={720}
            height={900}
            className={styles.image}
            priority
          />
        </div>
      </div>
    </div>
  );
}
