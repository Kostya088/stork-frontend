import OnbordingForm from "@/components/forms/OnboardingForm/OnboardingForm";
import css from "./EditPage.module.css";
import clsx from "clsx";
import Image from "next/image";

const Page = () => {
  return (
    <div className={css["page"]}>
      <div className={clsx(css.container, css.containerForm)}>
        <OnbordingForm />
      </div>
      <div
        className={clsx(css.container, css.containerImage)}
        style={{ position: "relative" }}
      >
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
