import css from "./RegisterPage.module.css";
import clsx from "clsx";
import RegistrationForm from "@/components/forms/RegistrationForm/RegistrationForm";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <div className={css["page"]}>
      <Link href="/" className={css.logoLink}>
        <svg className={css.logoIcon} width="95" height="29">
          <use href="/icons/sprite.svg#icon-leleka-logo" />
        </svg>
      </Link>

      <div className={clsx(css.container, css.containerForm)}>
        <RegistrationForm />
      </div>
      <div className={clsx(css.container, css.containerImage)}>
        <Image
          className={css.registerImage}
          alt="leleka"
          width={720}
          height={900}
          loading="eager"
          src="/icons/register-img.jpg"
        />
      </div>
    </div>
  );
};

export default Page;
