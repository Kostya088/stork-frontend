"use client";

import css from "./OnboardingForm.module.css";
import { useId, useMemo, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { useRouter } from "next/navigation";

import CustomSelector from "../CustomSelector/CustomSelector";
import UserAvatarSelector from "../UserAvatarSelector/UserAvatarSelector";

const OnbordingSchema = Yup.object().shape({
  gender: Yup.string()
    .oneOf(["Хлопчик", "Дівчинка", "null"], "Invalid value")
    .required("Обов'язкове поле"),
  dueDate: Yup.string()
    .matches(/^(\d{4})-(\d{2})-(\d{2})$/)
    .required("Обов'язкове поле"),
});

const genderOptions = [
  {
    value: "Хлопчик",
    label: "Хлопчик",
  },
  {
    value: "Дівчинка",
    label: "Дівчинка",
  },
  {
    value: "null",
    label: "Ще не знаю",
  },
];

interface OnbordingDraft {
  gender: string;
  dueDate: string;
}

const OnbordingForm = () => {
  const [file, setFile] = useState<File | null>(null);

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
    const userDate = new Date(values.dueDate);
    const minAllowedDate = new Date(minDate);
    const maxAllowedDate = new Date(maxDate);

    if (userDate < minAllowedDate || userDate > maxAllowedDate) {
      console.log("Please choose another date.");
      return;
    }

    const formData = new FormData();
    formData.set("gender", values.gender);
    formData.set("dueDate", values.dueDate);

    if (file) {
      formData.set("avatar", file);
    }

    route.push("/");
  };

  return (
    <div className={css["onbordingForm"]}>
      <h2 className={css.title}>Давайте познаймимось ближче</h2>
      <UserAvatarSelector onSelectFile={setFile} />
      <Formik
        initialValues={{
          gender: "",
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
