'use client'

import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import styles from './AddDiaryEntryForm.module.css'
import { diaryValidationSchema, diaryInitialValues } from '@/validation/diaryValidation'
import { useCreateDiaryEntry, useUpdateDiaryEntry } from '@/hooks/diary/useDiaryQueries'
import type { DiaryEntry, DiaryFormValues } from '@/types/diary.types'

const EMOTIONS_LIST = [
  { _id: '1', label: 'Натхнення' },
  { _id: '2', label: 'Вдячність' },
  { _id: '3', label: 'Тривога' },
  { _id: '4', label: 'Дивні бажання' },
  { _id: '5', label: 'Нудота' },
  { _id: '6', label: 'Любов' },
  { _id: '7', label: 'Радість' },
  { _id: '8', label: 'Щастя' },
]

interface AddDiaryEntryFormProps {
  entry?: DiaryEntry
  onSuccess: () => void
}

export default function AddDiaryEntryForm({ entry, onSuccess }: AddDiaryEntryFormProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { mutate: createEntry, isPending: isCreating } = useCreateDiaryEntry()
  const { mutate: updateEntry, isPending: isUpdating } = useUpdateDiaryEntry()
  const isPending = isCreating || isUpdating

  const initialValues: DiaryFormValues = entry
    ? {
        title: entry.title,
        description: entry.description,
        date: entry.date,
        emotions: entry.emotions.map((e) => e._id),
      }
    : diaryInitialValues

  const handleSubmit = (values: DiaryFormValues) => {
    if (entry) {
      updateEntry({ id: entry._id, data: values }, { onSuccess })
    } else {
      createEntry(values, { onSuccess })
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={diaryValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className={styles.form}>

          <div className={styles.field}>
            <label className={styles.label}>Заголовок</label>
            <Field
              name="title"
              type="text"
              placeholder="Введіть заголовок запису"
              className={styles.input}
            />
            <ErrorMessage name="title" component="p" className={styles.error} />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Категорії</label>
            <div className={styles.dropdownWrapper}>
              <button
                type="button"
                className={styles.dropdownTrigger}
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              >
                {values.emotions.length > 0 ? (
                  <div className={styles.selectedTags}>
                    {values.emotions.map((id) => {
                      const emotion = EMOTIONS_LIST.find((e) => e._id === id)
                      return emotion ? (
                        <span key={id} className={styles.selectedTag}>
                          {emotion.label}
                        </span>
                      ) : null
                    })}
                  </div>
                ) : (
                  <span className={styles.placeholder}>Оберіть категорію</span>
                )}
                <span className={`${styles.arrow} ${isDropdownOpen ? styles.arrowUp : ''}`}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6l4 4 4-4" stroke="currentColor"
                      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>

              {isDropdownOpen && (
                <ul className={styles.dropdown}>
                  {EMOTIONS_LIST.map((emotion) => (
                    <li key={emotion._id} className={styles.dropdownItem}>
                      <label className={`${styles.checkboxLabel} ${
                        values.emotions.includes(emotion._id) ? styles.checked : ''
                      }`}>
                        <input
                          type="checkbox"
                          className={styles.checkboxInput}
                          checked={values.emotions.includes(emotion._id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFieldValue('emotions', [...values.emotions, emotion._id])
                            } else {
                              setFieldValue(
                                'emotions',
                                values.emotions.filter((id) => id !== emotion._id)
                              )
                            }
                          }}
                        />
                        <span className={styles.checkboxCustom} />
                        <span className={styles.emotionLabel}>{emotion.label}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <ErrorMessage name="emotions" component="p" className={styles.error} />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Запис</label>
            <Field
              name="description"
              as="textarea"
              placeholder="Запишіть, як ви себе відчуваєте"
              className={styles.textarea}
            />
            <ErrorMessage name="description" component="p" className={styles.error} />
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isPending}
          >
            {isPending ? 'Збереження...' : 'Зберегти'}
          </button>

        </Form>
      )}
    </Formik>
  )
}