import OnbordingForm from "@/components/forms/OnboardingForm/OnboardingForm";
import css from "./EditPage.module.css";
import clsx from "clsx";

const Page = () => {
  return (
    <div className={css["page"]}>
      <div className={clsx(css.container, css.containerForm)}>
        <OnbordingForm />
      </div>
      <div className={clsx(css.container, css.containerImage)}>
        <img
          className={css.onbordingImage}
          alt="leleka"
          width={720}
          height={900}
          src="https://abrakadabra.fun/uploads/posts/2021-12/thumbs/1640528661_1-abrakadabra-fun-p-serii-chelovek-na-avu-1.png"
        />
      </div>
    </div>
  );
};

export default Page;
