"use client";

import { useId } from "react";
import css from "./RegistrationForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import clsx from "clsx";
import { useRouter } from "next/navigation";

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

const RegistrationForm = () => {
  const route = useRouter();
  const prefId = useId();
  const handleSubmit = (values: FormDraft) => {
    //const user = await registerUser(values);
    // setAuth(user);
    route.push("/profile/edit");
  };

  return (
    <div className={css["registrationForm"]}>
      <h2 className={css.title}>Реєстрація</h2>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ errors }) => (
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
        )}
      </Formik>
      <p className={css.paragraph}>
        Вже маєте аккаунт?
        <Link className={css.registerLink} href="/auth/login">
          Увійти
        </Link>
      </p>
    </div>
  );
};

export default RegistrationForm;
