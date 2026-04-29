'use client';
// import { useState } from "react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { createTask } from "@/lib/api/clientApi";
import { FormikHelpers } from 'formik';
import { Field, Form, Formik } from 'formik';
import { useId } from 'react';
import css from './AddTaskForm.module.css';
import { useTaskStore } from '@/lib/store/taskStore';
import { createTask } from '@/lib/api/clientApi';
import toast from 'react-hot-toast';

type Props = {
  onSuccess?: () => void;
};

interface AddTaskFormValues {
  task: string;
  date: string;
}

export default function AddTaskForm({ onSuccess }: Props) {
  const fieldId = useId();
  const addTask = useTaskStore((state) => state.addTask);

  const todayFormatted = new Date().toLocaleDateString('uk-UA');

  const initialValues: AddTaskFormValues = {
    task: '',
    date: todayFormatted,
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
      addTask(createdTask);
      onSuccess?.();
      resetForm();
    } catch {
      toast.error('Щось пішло не так');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form>
        <h3 className={css.title}>
          Нове <br /> завдання
        </h3>
        <div className={css.formFieldWrapper}>
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
          </div>

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
          </div>
        </div>

        <button
          className={css.button}
          type="submit"
          // disabled={createTaskMutation.isPending}
        >
          Зберегти
        </button>
      </Form>
    </Formik>
  );
}

// const queryClient = useQueryClient();

// const [name, setName] = useState("");
// const [date, setDate] = useState("");

// const createTaskMutation = useMutation({
//   mutationFn: createTask,

//   onSuccess: () => {
//     queryClient.invalidateQueries({
//       queryKey: ["tasks"],
//     });

//     onSuccess?.();

//     setName("");
//     setDate("");
//   },
// });

// const handleSubmit = (e: React.FormEvent) => {
//   e.preventDefault();

//   if (!name.trim() || !date) return;

//   createTaskMutation.mutate({
//     name,
//     date,
//   });
// };

// <form className={css.form} onSubmit={handleSubmit}>
//   <h3 className={css.title}>
//     Нове <br /> завдання
//   </h3>

//   <div className={css.formFieldWrapper}>
//     <div className={css.formField}>
//       <label className={css.label}>Назва завдання</label>
//       <input
//         className={css.input}
//         type="text"
//         placeholder="Прийняти вітаміни"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />
//     </div>
//     <div className={css.formField}>
//       <label className={css.label}>Дата</label>
//       <input
//         className={css.input}
//         type="date"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//       />
//     </div>
//   </div>

//   <button
//     className={css.button}
//     type="submit"
//     disabled={createTaskMutation.isPending}
//   >
//     Зберегти
//   </button>
// </form>
