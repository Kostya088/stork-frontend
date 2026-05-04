'use client';

import { useId } from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

import css from './AddTaskForm.module.css';

import { createTask } from '@/lib/api/clientApi';
import { useQueryClient } from '@tanstack/react-query';
import type { Task } from '@/types/task';

type Props = {
  onSuccess?: () => void;
};

interface AddTaskFormValues {
  task: string;
  date: string;
}

const validationSchema = Yup.object({
  task: Yup.string()
    .min(2, 'Мінімум 2 символи')
    .required('Введіть назву завдання'),

  date: Yup.string().required('Оберіть дату'),
});

const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
};

export default function AddTaskForm({ onSuccess }: Props) {
  const fieldId = useId();
  const queryClient = useQueryClient();

  const initialValues: AddTaskFormValues = {
    task: '',
    date: getTodayDate(),
  };

  const onSubmit = async (
    values: AddTaskFormValues,
    { setSubmitting, resetForm }: FormikHelpers<AddTaskFormValues>,
  ) => {
    try {
      const createdTask = await createTask({
        name: values.task,
        date: values.date,
      });

      queryClient.setQueryData<Task[]>(['tasks'], (old) => [
        ...(old ?? []),
        createdTask,
      ]);

      resetForm();
      onSuccess?.();
    } catch {
      toast.error('Щось пішло не так. Спробуйте ще раз');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className={css.form}>
          <h3 className={css.title}>
            <br /> Нове завдання
          </h3>

          {/* TASK FIELD */}
          <div className={css.formField}>
            <label className={css.label} htmlFor={`${fieldId}-task`}>
              Назва завдання
            </label>

            <Field
              id={`${fieldId}-task`}
              name="task"
              className={css.input}
              type="text"
              placeholder="Прийняти вітаміни"
            />

            {touched.task && errors.task && (
              <div className={css.error}>{errors.task}</div>
            )}
          </div>

          {/* DATE FIELD */}
          <div className={css.formField}>
            <label className={css.label} htmlFor={`${fieldId}-date`}>
              Дата
            </label>

            <Field
              id={`${fieldId}-date`}
              name="date"
              className={css.input}
              type="date"
            />

            {touched.date && errors.date && (
              <div className={css.error}>{errors.date}</div>
            )}
          </div>

          {/* SUBMIT */}
          <button className={css.button} type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Збереження...' : 'Зберегти'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
