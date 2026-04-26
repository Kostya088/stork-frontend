import css from "./RegisterPage.module.css";
import clsx from "clsx";
import RegistrationForm from "@/components/forms/RegistrationForm/RegistrationForm";
import Image from "next/image";

const Page = () => {
  return (
    <div className={css["page"]}>
      <div className={clsx(css.container, css.containerForm)}>
        <RegistrationForm />
      </div>
      <div className={clsx(css.container, css.containerImage)}>
        <Image
          className={css.registerImage}
          alt="leleka"
          width={720}
          height={900}
          src="/icons/register-img.jpg"
        />
      </div>
    </div>
  );
};

export default Page;
