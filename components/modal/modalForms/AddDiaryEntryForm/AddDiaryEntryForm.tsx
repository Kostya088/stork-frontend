'use client';

import { useEffect, useRef, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import styles from './AddDiaryEntryForm.module.css';

import type { DiaryEntry } from '@/types/diaryEntry';
import type { Emotion } from '@/types/emotion';
import type { CreateDiaryData, UpdateDiaryData } from '@/lib/api/clientApi';
import { getEmotionId } from '@/utils/diary';

interface AddDiaryEntryFormProps {
  entry: DiaryEntry | null;
  emotions: Emotion[];
  onSubmit: (data: CreateDiaryData | UpdateDiaryData) => Promise<void>;
}

interface DiaryFormValues {
  title: string;
  description: string;
  emotions: string[];
}

const validationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(1, 'Введіть заголовок')
    .max(64, 'Максимум 64 символи')
    .required('Введіть заголовок'),
  description: Yup.string()
    .trim()
    .min(1, 'Введіть текст запису')
    .max(1000, 'Максимум 1000 символів')
    .required('Введіть текст запису'),
  emotions: Yup.array()
    .of(Yup.string().required())
    .min(1, 'Оберіть хоча б одну категорію')
    .max(12)
    .required(),
});

const fallbackEmotions: Emotion[] = [
  { _id: 'inspiration', title: 'Натхнення' },
  { _id: 'gratitude', title: 'Вдячність' },
  { _id: 'anxiety', title: 'Тривога' },
  { _id: 'cravings', title: 'Дивні бажання' },
  { _id: 'nausea', title: 'Нудота' },
];

export default function AddDiaryEntryForm({
  entry,
  emotions,
  onSubmit,
}: AddDiaryEntryFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const emotionOptions = emotions.length > 0 ? emotions : fallbackEmotions;

  const initialValues: DiaryFormValues = {
    title: entry?.title ?? '',
    description: entry?.description ?? '',
    emotions: entry?.emotions.map(getEmotionId) ?? [],
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Formik<DiaryFormValues>
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        try {
          await onSubmit({
            title: values.title.trim(),
            description: values.description.trim(),
            emotions: values.emotions,
          });
        } finally {
          actions.setSubmitting(false);
        }
      }}
    >
      {({ values, isSubmitting }) => (
        <>
          {/* 🔥 ГОЛОВНИЙ ЗАГОЛОВОК */}
          <h2 className={styles.title}>Новий запис</h2>

          <Form className={styles.form}>
            {/* Заголовок */}
            <label className={styles.fieldGroup}>
              <span className={styles.label}>Заголовок</span>
              <Field
                className={styles.input}
                name="title"
                placeholder="Введіть заголовок запису"
              />
              <ErrorMessage
                name="title"
                component="span"
                className={styles.error}
              />
            </label>

            {/* Категорії */}
            <fieldset className={styles.fieldset}>
              <legend className={styles.label}>Категорії</legend>

              <div className={styles.dropdown} ref={dropdownRef}>
                <button
                  type="button"
                  className={styles.dropdownTrigger}
                  onClick={() => setIsOpen((prev) => !prev)}
                >
                  <div className={styles.selectedList}>
                    {values.emotions.length > 0 ? (
                      emotionOptions
                        .filter((e) => values.emotions.includes(e._id))
                        .map((e) => (
                          <span key={e._id} className={styles.chip}>
                            {e.title}
                          </span>
                        ))
                    ) : (
                      <span className={styles.placeholder}>
                        Оберіть категорію
                      </span>
                    )}
                  </div>

                  <span className={styles.arrow}>
                    {isOpen ? (
                      <svg width="12" height="7">
                        <use href="/icons/sprite.svg#icon-chevron-up"></use>
                      </svg>
                    ) : (
                      <svg width="12" height="7">
                        <use href="/icons/sprite.svg#icon-chevron-down"></use>
                      </svg>
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className={styles.dropdownMenu}>
                    {emotionOptions.map((emotion) => {
                      const checked = values.emotions.includes(emotion._id);

                      return (
                        <label
                          key={emotion._id}
                          className={`${styles.option} ${checked ? styles.checked : ''
                            }`}
                        >
                          <Field
                            type="checkbox"
                            name="emotions"
                            value={emotion._id}
                          />
                          {emotion.title}
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              <ErrorMessage
                name="emotions"
                component="span"
                className={styles.error}
              />
            </fieldset>

            {/* Текст */}
            <label className={styles.fieldGroup}>
              <span className={styles.label}>Запис</span>
              <Field
                as="textarea"
                className={styles.textarea}
                name="description"
                placeholder="Запишіть, як ви себе відчуваєте"
              />
              <ErrorMessage
                name="description"
                component="span"
                className={styles.error}
              />
            </label>

            {/* Кнопка */}
            <button
              className={styles.submitButton}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Зберігаємо...' : 'Зберегти'}
            </button>
          </Form>
        </>
      )}
    </Formik>
  );
}
