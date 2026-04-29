'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { login } from '@/lib/api/clientApi';
import styles from './LoginForm.module.css';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import Link from 'next/link';
import clsx from 'clsx';

const schema = Yup.object({
  email: Yup.string().email('Невірний email').required("Email обов'язковий"),
  password: Yup.string().required("Пароль обов'язковий"),
});

export default function LoginForm() {
  const router = useRouter();
  const authStore = useAuthStore();

  const handleSubmit = async (
    values: { email: string; password: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string }>,
  ) => {
    try {
      const user = await login(values);

      authStore.setUser(user);

      toast.success('Успішний вхід');

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
        initialValues={{ email: '', password: '' }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
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
        )}
      </Formik>
    </div>
  );
}

// "use client";

// import { useRouter } from "next/navigation";
// import { useAuthStore } from "@/lib/store/authStore";
// import { login } from "@/lib/api/clientApi";
// import styles from "./LoginForm.module.css";
// import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
// import * as Yup from "yup";
// import toast from "react-hot-toast";
// import Link from "next/link";
// import clsx from "clsx";

// const schema = Yup.object({
//   email: Yup.string().email("Невірний email").required("Email обов'язковий"),
//   password: Yup.string().required("Пароль обов'язковий"),
// });

// export default function LoginForm() {
//   const router = useRouter();
//   const authStore = useAuthStore();

//   const handleSubmit = async (
//     values: { email: string; password: string },
//     { setSubmitting }: FormikHelpers<{ email: string; password: string }>,
//   ) => {
//     try {
//       const user = await login(values);

//       authStore.setUser(user);

//       toast.success("Успішний вхід");

//       router.push("/");
//     } catch {
//       toast.error("Невірний email або пароль");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>Вхід</h2>

//       <Formik
//         initialValues={{ email: "", password: "" }}
//         validationSchema={schema}
//         onSubmit={handleSubmit}
//       >
//         {({ isSubmitting, errors, touched }) => (
//           <Form className={styles.form}>
//             <div className={styles.field}>
//               <Field
//                 name="email"
//                 type="email"
//                 placeholder="Пошта"
//                 className={clsx(css.input, errors.email && css.invalid)}
//               />
//               <ErrorMessage
//                 name="email"
//                 component="div"
//                 className={styles.error}
//               />
//             </div>

//             <div className={styles.field}>
//               <Field
//                 name="password"
//                 type="password"
//                 placeholder="Пароль"
//                 className={clsx(css.input, errors.password && css.invalid)}
//               />
//               <ErrorMessage
//                 name="password"
//                 component="div"
//                 className={styles.error}
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className={styles.button}
//             >
//               {isSubmitting ? "Вхід..." : "Увійти"}
//             </button>

//             <p className={styles.linkText}>
//               Немає акаунту?{" "}
//               <Link href="/register" className={styles.link}>
//                 Зареєструватись
//               </Link>
//             </p>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// }
