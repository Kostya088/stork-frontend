import OnbordingForm from '@/components/forms/OnboardingForm/OnboardingForm';
import css from './EditPage.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Page = () => {
  return (
    <div className={css.page}>
      <div className={css.container}>
        <div className={css.left}>
          <Link href="/" className={css.logoLink} aria-label="На головну сторінку">
            <svg className={css.logoIcon} width="95" height="29" aria-hidden="true">
              <use href="/icons/sprite.svg#icon-leleka-logo" />
            </svg>
          </Link>
          <OnbordingForm />
        </div>
        <div className={css.right}>
          <Image
            className={css.onbordingImage}
            alt="leleka"
            fill={true}
            sizes="50vw"
            loading="eager"
            src="/icons/profile-img.jpg"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
