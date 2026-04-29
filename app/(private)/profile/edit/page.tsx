import OnbordingForm from "@/components/forms/OnboardingForm/OnboardingForm";
import css from "./EditPage.module.css";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <div className={css.page}>
      <Link href="/" className={css.logoLink}>
        <svg className={css.logoIcon} width="95" height="29">
          <use href="/icons/sprite.svg#icon-leleka-logo" />
        </svg>
      </Link>

      <div className={css.container}>
        <OnbordingForm />
      </div>
      <div className={css.containerImage}>
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
  );
};

export default Page;
