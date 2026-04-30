// Компонент для рендеру div-а "Форма профіля"
'use client';

import { updateMe } from '@/lib/api/clientApi';
import { User } from '@/types/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import toast from 'react-hot-toast';
import Select from 'react-select';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import css from './ProfileEditForm.module.css';

const schemaUserForm = yup.object().shape({
  name: yup.string().required("Ім'я обов'язкове"),
  gender: yup.string().oneOf(['boy', 'girl', ''], 'Оберіть стать'),
  dueDate: yup
    .date()
    .min(new Date(), 'Дата має бути в майбутньому')
    .required("Дата обов'язкова"),
});

type GenderChildren = 'boy' | 'girl' | '';

interface ProfileEditFormProps {
  user: User | null;
}

interface FormDataValues {
  name: string;
  email: string;
  gender: GenderChildren;
  dueDate: string;
}

const optionsForForm = [
  { value: '', label: 'Ще не знаю' },
  { value: 'boy', label: 'Хлопчик' },
  { value: 'girl', label: 'Дівчинка' },
];

export default function ProfileEditForm({ user }: ProfileEditFormProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateMe,
    onSuccess: () => {
      toast.success('Дані успішно оновлено');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const handleSubmit = async (values: FormDataValues) => {
    mutation.mutate({
      name: values.name,
      gender: values.gender === '' ? null : values.gender,
      dueDate: values.dueDate,
    });
  };

  const initialValues: FormDataValues = {
    name: user?.name ?? 'Дані не отримано',
    email: user?.email ?? '',
    gender: user?.gender ?? '',
    dueDate: user?.dueDate ?? '',
  };

  return (
    <div className={css.mainWrapper}>
      <Formik<FormDataValues>
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schemaUserForm}
        enableReinitialize
      >
        {({ values, setFieldValue, resetForm, dirty }) => (
          <Form className={css.formWrapper}>
            <div className={css.inputWrapper}>
              <label htmlFor="name-Id" className={css.label}>
                Імʼя
              </label>
              <Field
                type="text"
                name="name"
                id="name-Id"
                className={css.input}
              />
              <ErrorMessage
                name="name"
                component="div"
                className={css.errorMessage}
              />
            </div>

            <div className={`${css.inputWrapper} ${css.email}`}>
              <label htmlFor="email-Id" className={css.label}>
                Пошта
              </label>
              <Field
                type="email"
                disabled
                name="email"
                id="email-Id"
                className={css.input}
              />
            </div>

            <div className={css.inputWrapper}>
              <label htmlFor="gender-Id" className={css.label}>
                Стать дитини
              </label>
              <Select
                options={optionsForForm}
                placeholder="Стать дитини"
                className={css.genderSelect}
                classNamePrefix="gender"
                value={optionsForForm.find(
                  (option) => option.value === values.gender,
                )}
                onChange={(optionsForForm) =>
                  setFieldValue('gender', optionsForForm?.value)
                }
              />
            </div>

            <div className={css.inputWrapper}>
              <label htmlFor="dueDate-Id" className={css.label}>
                Планована дата пологів
              </label>
              <DatePicker
                selected={values.dueDate ? new Date(values.dueDate) : null}
                onChange={(date: Date | null) =>
                  setFieldValue(
                    'dueDate',
                    date ? date.toISOString().split('T')[0] : '',
                  )
                }
                className={css.inputDate}
                dateFormat="dd.MM.yyyy"
                popperPlacement="top-start"
                name="dueDate"
                id="dueDate-Id"
              />
              <ErrorMessage
                name="dueDate"
                component="div"
                className={css.errorMessage}
              />
            </div>

            <div className={css.buttonWrapper}>
              <button
                type="button"
                onClick={() => resetForm()}
                className={css.buttonCancel}
              >
                Відмінити зміни
              </button>
              <button
                type="submit"
                disabled={!dirty || mutation.isPending}
                className={css.buttonSave}
              >
                Зберігти зміни
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
