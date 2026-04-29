"use client";

import { useId, useState, useEffect, useRef } from "react";
import css from "./RegistrationForm.module.css";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { register } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { ApiError } from "@/lib/api/api";
import toast from "react-hot-toast";

export interface FormDraft {
  name: string;
  email: string;
  password: string;
}

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .max(32, "Занадто довге ім'я!")
    .required("Обов'язкове поле"),
  email: Yup.string()
    .email("Некоректний email")
    .max(64, "Занадто довгий email!")
    .required("Обов'язкове поле"),
  password: Yup.string()
    .min(8, "Занадто короткий пароль!")
    .max(123, "Надто довгий пароль!")
    .required("Обов'язкове поле"),
});

const STORAGE_KEY = "registrationFormDraft";

function RegistrationFormWatcher() {
  const { values } = useFormikContext<FormDraft>();

  useEffect(() => {
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ name: values.name, email: values.email }),
      );
    } catch {
      // ignore storage errors
    }
  }, [values.name, values.email]);

  return null;
}

const RegistrationForm = () => {
  const router = useRouter();
  const [, setError] = useState("");
  const setUser = useAuthStore((s) => s.setUser);
  const prefId = useId();
  const [initialValues, setInitialValues] = useState<FormDraft>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          name: parsed.name || "",
          email: parsed.email || "",
          password: "",
        };
      }
    } catch {
      // ignore parse errors
    }
    return { name: "", email: "", password: "" };
  });

  const handleSubmit = async (values: FormDraft) => {
    try {
      setError("");
      const user = await register(values);
      setUser(user);
      toast.success("Реєстрація пройшла успішно");
      sessionStorage.removeItem(STORAGE_KEY);
      router.push("/profile/edit");
    } catch (error) {
      toast.error("Помилка: щось пішло не так");
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          "Oops... some error",
      );
    }
  };

  return (
    <div className={css["registrationForm"]}>
      <h2 className={css.title}>Реєстрація</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors }) => (
          <>
            <RegistrationFormWatcher />
            <Form className={css.form}>
              <div className={css.fildset}>
                <label className={css.label} htmlFor={`name${prefId}`}>
                  Імʼя*
                </label>
                <Field
                  className={clsx(css.input, errors.name && css.invalid)}
                  id={`name${prefId}`}
                  name="name"
                  placeholder="Ваше імʼя"
                />
                <ErrorMessage
                  className={css.errorMessage}
                  name="name"
                  component="div"
                />
              </div>

              <div className={css.fildset}>
                <label className={css.label} htmlFor={`email${prefId}`}>
                  Пошта*
                </label>
                <Field
                  className={clsx(css.input, errors.email && css.invalid)}
                  id={`email${prefId}`}
                  name="email"
                  placeholder="hello@leleka.com"
                  type="email"
                />
                <ErrorMessage
                  className={css.errorMessage}
                  name="email"
                  component="div"
                />
              </div>
              <div className={css.fildset}>
                <label className={css.label} htmlFor={`password${prefId}`}>
                  Пароль*
                </label>
                <Field
                  className={clsx(css.input, errors.password && css.invalid)}
                  id={`password${prefId}`}
                  name="password"
                  placeholder="********"
                  type="password"
                />
                <ErrorMessage
                  className={css.errorMessage}
                  name="password"
                  component="div"
                />
              </div>

              <button className={css.subbtn} type="submit">
                Зареєструватись
              </button>
            </Form>
          </>
        )}
      </Formik>
      <p className={css.paragraph}>
        Вже маєте аккаунт?{" "}
        <Link className={css.registerLink} href="/login">
          Увійти
        </Link>
      </p>
    </div>
  );
};

export default RegistrationForm;
