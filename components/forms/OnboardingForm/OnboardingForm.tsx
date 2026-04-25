"use client";

import css from "./OnboardingForm.module.css";
import { useId, useMemo, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { useRouter } from "next/navigation";

import CustomSelector from "../CustomSelector/CustomSelector";
import UserAvatarSelector from "../UserAvatarSelector/UserAvatarSelector";
import { updateMe, updateUserAvatar } from "@/lib/api/clientApi";
import type { ApiError } from "@/lib/api/api";
import type { Gender } from "@/types/user";

const OnbordingSchema = Yup.object().shape({
  gender: Yup.string()
    .oneOf(["boy", "girl", "null"], "Invalid value")
    .required("Обов'язкове поле"),
  dueDate: Yup.string()
    .matches(/^(\d{4})-(\d{2})-(\d{2})$/)
    .required("Обов'язкове поле"),
});

const genderOptions = [
  {
    value: "boy",
    label: "Хлопчик",
  },
  {
    value: "girl",
    label: "Дівчинка",
  },
  {
    value: "null",
    label: "Ще не знаю",
  },
];

interface OnbordingDraft {
  gender: Gender;
  dueDate: string;
}

const OnbordingForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const minDate = useMemo(() => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 7);
    return currentDate.toISOString().split("T")[0];
  }, []);

  const maxDate = useMemo(() => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 40 * 7);
    return currentDate.toISOString().split("T")[0];
  }, []);

  const route = useRouter();
  const prefId = useId();

  const handleSubmit = async (values: OnbordingDraft) => {
    try {
      setError("");

      const userDate = new Date(values.dueDate);
      const minAllowedDate = new Date(minDate);
      const maxAllowedDate = new Date(maxDate);

      if (userDate < minAllowedDate || userDate > maxAllowedDate) {
        setError("Please choose another date.");
        return;
      }

      await updateMe({
        dueDate: values.dueDate,
        gender: values.gender,
      });

      if (file) {
        const formData = new FormData();
        formData.set("avatar", file);
        await updateUserAvatar(formData);
      }

      route.push("/");
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          "Oops... some error",
      );
    }
  };

  return (
    <div className={css["onbordingForm"]}>
      <h2 className={css.title}>Давайте познаймимось ближче</h2>
      <UserAvatarSelector onSelectFile={setFile} />
      <Formik
        initialValues={{
          gender: null,
          dueDate: "",
        }}
        validationSchema={OnbordingSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, values }) => (
          <Form className={css.form}>
            <div className={css.fildset}>
              <label className={css.label} htmlFor={`gender${prefId}`}>
                Стать дитини
              </label>
              <div id={`gender${prefId}`}>
                <CustomSelector
                  name="gender"
                  options={genderOptions}
                  placeholder="Оберіть стать"
                />
              </div>
            </div>

            <div className={css.fildset}>
              <label className={css.label} htmlFor={`dueDate${prefId}`}>
                Планова дата пологів
              </label>
              <Field
                className={clsx(
                  css.input,
                  !values.dueDate && css.placeholderDate,
                  values.dueDate && css.filledDate,
                  errors.dueDate && css.invalid,
                )}
                id={`dueDate${prefId}`}
                name="dueDate"
                placeholder="16.07.2025"
                type="date"
                min={minDate}
                max={maxDate}
              />
              <ErrorMessage
                className={css.errorMessage}
                name="dueDate"
                component="div"
              />
            </div>

            {error && <div className={css.errorMessage}>{error}</div>}

            <button className={css.subbtn} type="submit">
              Зберегти
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OnbordingForm;
