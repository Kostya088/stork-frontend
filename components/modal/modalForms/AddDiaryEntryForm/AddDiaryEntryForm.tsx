'use client';

import { useEffect, useRef, useState } from 'react';
import { ErrorMessage, Field, Form, Formik, useFormikContext } from 'formik';
import * as Yup from 'yup';

import styles from './AddDiaryEntryForm.module.css';

import type { DiaryEntry } from '@/types/diaryEntry';
import type { Emotion } from '@/types/emotion';
import type { CreateDiaryData, UpdateDiaryData } from '@/lib/api/clientApi';
import { getEmotionId } from '@/utils/diary';

/* ==================== TYPES ==================== */

interface AddDiaryEntryFormProps {
  entry: DiaryEntry | null;
  emotions: Emotion[];
  isSubmitting?: boolean;
  onSubmit: (data: CreateDiaryData | UpdateDiaryData) => Promise<void>;
}

interface DiaryFormValues {
  title: string;
  description: string;
  emotions: string[];
}

/* ==================== CONSTANTS ==================== */

const STORAGE_KEY = 'diaryEntryDraft';

const fallbackEmotions: Emotion[] = [
  { _id: 'inspiration', title: 'Натхнення' },
  { _id: 'gratitude', title: 'Вдячність' },
  { _id: 'anxiety', title: 'Тривога' },
  { _id: 'cravings', title: 'Дивні бажання' },
  { _id: 'nausea', title: 'Нудота' },
];

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

/* ==================== HELPERS ==================== */

function DiaryFormWatcher() {
  const { values } = useFormikContext<DiaryFormValues>();

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    } catch {}
  }, [values]);

  return null;
}

/* ==================== COMPONENT ==================== */

export default function AddDiaryEntryForm({
  entry,
  emotions,
  isSubmitting: isParentSubmitting = false,
  onSubmit,
}: AddDiaryEntryFormProps) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const emotionOptions = emotions.length ? emotions : fallbackEmotions;

  const [initialValues] = useState<DiaryFormValues>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved && !entry) return JSON.parse(saved);
    } catch {}

    return {
      title: entry?.title ?? '',
      description: entry?.description ?? '',
      emotions: entry?.emotions.map(getEmotionId) ?? [],
    };
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
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

          sessionStorage.removeItem(STORAGE_KEY);
        } finally {
          actions.setSubmitting(false);
        }
      }}
    >
      {({ values, isSubmitting }) => {
        const isFormSubmitting = isParentSubmitting || isSubmitting;

        return (
        <>
          <h2 className={styles.title}>
            {entry ? 'Редагувати запис' : 'Новий запис'}
          </h2>

          <DiaryFormWatcher />

          <Form className={styles.form}>
            {/* TITLE */}
            <label className={styles.fieldGroup}>
              <span className={styles.label}>Заголовок</span>
              <Field
                className={styles.input}
                name="title"
                placeholder="Введіть заголовок запису"
              />
              <ErrorMessage name="title" component="span" className={styles.error} />
            </label>

            {/* CATEGORIES */}
            <fieldset className={styles.fieldset}>
              <legend className={styles.label}>Категорії</legend>

              <div className={styles.dropdown} ref={dropdownRef}>
                <button
                  type="button"
                  className={styles.dropdownTrigger}
                  onClick={() => setIsOpen(prev => !prev)}
                >
                  <div className={styles.selectedList}>
                    {values.emotions.length ? (
                      emotionOptions
                        .filter(e => values.emotions.includes(e._id))
                        .map(e => (
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
                    <svg width="12" height="7">
                      <use
                        href={`/icons/sprite.svg#${
                          isOpen ? 'icon-chevron-up' : 'icon-chevron-down'
                        }`}
                      />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div className={styles.dropdownMenu}>
                    {emotionOptions.map(emotion => {
                      const checked = values.emotions.includes(emotion._id);

                      return (
                        <label
                          key={emotion._id}
                          className={`${styles.option} ${
                            checked ? styles.checked : ''
                          }`}
                        >
                          <Field
                            className={styles.checkbox}
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

            {/* DESCRIPTION */}
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

            {/* SUBMIT */}
            <button
              className={styles.submitButton}
              type="submit"
              disabled={isFormSubmitting}
            >
              {isFormSubmitting ? 'Зберігаємо...' : 'Зберегти'}
            </button>
          </Form>
        </>
        );
      }}
    </Formik>
  );
}
