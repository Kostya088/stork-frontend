"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { login } from "@/lib/api/clientApi";
import styles from "./LoginForm.module.css";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import toast from "react-hot-toast";

const schema = Yup.object({
  email: Yup.string()
    .email("Невірний email")
    .required("Email обов'язковий"),
  password: Yup.string().required("Пароль обов'язковий"),
});

export default function LoginForm() {
  const router = useRouter();
  const authStore = useAuthStore();

  const handleSubmit = async (
    values: { email: string; password: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string }>
  ) => {

console.log("LOGIN VALUES:", values);

    try {
      const user = await login(values);

      authStore.setUser(user);

      toast.success("Успішний вхід");

      router.push("/");
    } catch (err) {
      console.error(err);
      toast.error("Помилка входу");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Вхід</h2>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.field}>
              <Field
                name="email"
                type="email"
                placeholder="Пошта"
                className={styles.input}
              />
              <ErrorMessage name="email" component="div" className={styles.error} />
            </div>

            <div className={styles.field}>
              <Field
                name="password"
                type="password"
                placeholder="Пароль"
                className={styles.input}
              />
              <ErrorMessage name="password" component="div" className={styles.error} />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.button}
            >
              {isSubmitting ? "Loading..." : "Увійти"}
            </button>

            <p className={styles.linkText}>
              Немає акаунту?{" "}
              <Link href="/register" className={styles.link}>
                Зареєструватись
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}