"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import styles from "./AddDiaryEntryForm.module.css";
import type { DiaryEntry } from "@/types/diaryEntry";
import type { Emotion } from "@/types/emotion";
import type { CreateDiaryData, UpdateDiaryData } from "@/lib/api/clientApi";
import { getEmotionId } from "@/utils/diary";

interface AddDiaryEntryFormProps {
  entry: DiaryEntry | null;
  emotions: Emotion[];
  isSubmitting: boolean;
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
    .min(1, "Введіть заголовок")
    .max(64, "Максимум 64 символи")
    .required("Введіть заголовок"),
  description: Yup.string()
    .trim()
    .min(1, "Введіть текст запису")
    .max(1000, "Максимум 1000 символів")
    .required("Введіть текст запису"),
  emotions: Yup.array()
    .of(Yup.string().required())
    .min(1, "Оберіть хоча б одну категорію")
    .max(12, "Можна обрати максимум 12 категорій")
    .required("Оберіть категорії"),
});

const fallbackEmotions: Emotion[] = [
  { _id: "inspiration", title: "Натхнення" },
  { _id: "gratitude", title: "Вдячність" },
  { _id: "anxiety", title: "Тривога" },
  { _id: "cravings", title: "Дивні бажання" },
  { _id: "nausea", title: "Нудота" },
];

export default function AddDiaryEntryForm({
  entry,
  emotions,
  isSubmitting,
  onSubmit,
}: AddDiaryEntryFormProps) {
  const emotionOptions = emotions.length > 0 ? emotions : fallbackEmotions;

  const initialValues: DiaryFormValues = {
    title: entry?.title ?? "",
    description: entry?.description ?? "",
    emotions: entry?.emotions.map(getEmotionId) ?? [],
  };

  return (
    <Formik<DiaryFormValues>
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        await onSubmit({
          title: values.title.trim(),
          description: values.description.trim(),
          emotions: values.emotions,
        });
      }}
    >
      {({ values }) => (
        <Form className={styles.form}>
          <label className={styles.fieldGroup}>
            <span className={styles.label}>Заголовок</span>
            <Field
              className={styles.input}
              name="title"
              type="text"
              placeholder="Введіть заголовок запису"
            />
            <ErrorMessage
              className={styles.error}
              name="title"
              component="span"
            />
          </label>

          <fieldset className={styles.fieldset}>
            <legend className={styles.label}>Категорії</legend>
            <div className={styles.emotionBox}>
              <p className={styles.selectHint}>Оберіть категорію</p>
              <div className={styles.emotionList}>
                {emotionOptions.map((emotion) => {
                  const checked = values.emotions.includes(emotion._id);
                  return (
                    <label
                      className={`${styles.emotionOption} ${checked ? styles.checked : ""}`}
                      key={emotion._id}
                    >
                      <Field
                        className={styles.checkbox}
                        type="checkbox"
                        name="emotions"
                        value={emotion._id}
                      />
                      <span>{emotion.title}</span>
                    </label>
                  );
                })}
              </div>
            </div>
            <ErrorMessage
              className={styles.error}
              name="emotions"
              component="span"
            />
          </fieldset>

          <label className={styles.fieldGroup}>
            <span className={styles.label}>Запис</span>
            <Field
              as="textarea"
              className={styles.textarea}
              name="description"
              placeholder="Запишіть, як ви себе відчуваєте"
            />
            <ErrorMessage
              className={styles.error}
              name="description"
              component="span"
            />
          </label>

          <button
            className={styles.submitButton}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Зберігаємо..." : "Зберегти"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
