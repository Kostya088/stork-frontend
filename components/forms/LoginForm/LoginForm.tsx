'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { login } from '@/lib/api/clientApi';
import styles from './LoginForm.module.css';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikHelpers,
  useFormikContext,
} from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import Link from 'next/link';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

const schema = Yup.object({
  email: Yup.string().email('Невірний email').required("Email обов'язковий"),
  password: Yup.string().required("Пароль обов'язковий"),
});

const STORAGE_KEY = 'loginFormDraft';

function LoginFormWatcher() {
  const { values } = useFormikContext<{ email: string; password: string }>();

  useEffect(() => {
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ email: values.email }),
      );
    } catch {
      // ignore storage errors
    }
  }, [values.email]);

  return null;
}

export default function LoginForm() {
  const router = useRouter();
  const authStore = useAuthStore();
  const [initialValues, setInitialValues] = useState(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          email: parsed.email || '',
          password: '',
        };
      }
    } catch {
      // ignore parse errors
    }
    return { email: '', password: '' };
  });

  const handleSubmit = async (
    values: { email: string; password: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string }>,
  ) => {
    try {
      const user = await login(values);

      authStore.setUser(user);

      toast.success('Успішний вхід');

      sessionStorage.removeItem(STORAGE_KEY);

      router.push('/');
    } catch {
      toast.error('Невірний email або пароль');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Вхід</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, errors, touched }) => (
          <>
            <LoginFormWatcher />
            <Form className={styles.form}>
              {/* EMAIL */}
              <div className={styles.field}>
                <Field
                  name="email"
                  type="email"
                  placeholder="Пошта"
                  className={clsx(
                    styles.input,
                    errors.email && touched.email && styles.inputError,
                  )}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.error}
                />
              </div>

              {/* PASSWORD */}
              <div className={styles.field}>
                <Field
                  name="password"
                  type="password"
                  placeholder="Пароль"
                  className={clsx(
                    styles.input,
                    errors.password && touched.password && styles.inputError,
                  )}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.error}
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.button}
              >
                {isSubmitting ? 'Вхід...' : 'Увійти'}
              </button>

              {/* LINK */}
              <p className={styles.linkText}>
                Немає акаунту?{' '}
                <Link href="/register" className={styles.registerLink}>
                  Зареєструватись
                </Link>
              </p>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
}
