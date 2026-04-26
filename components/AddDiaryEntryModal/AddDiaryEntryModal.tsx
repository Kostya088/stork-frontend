'use client'

import { useEffect } from 'react'
import styles from './AddDiaryEntryModal.module.css'
import AddDiaryEntryForm from '../AddDiaryEntryForm/AddDiaryEntryForm'
import type { DiaryEntry } from '@/types/diary.types'

interface AddDiaryEntryModalProps {
  entry?: DiaryEntry
  onClose: () => void
}

export default function AddDiaryEntryModal({ entry, onClose }: AddDiaryEntryModalProps) {

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Закрити"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M8 8L24 24M24 8L8 24"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <h2 className={styles.title}>
          {entry ? 'Редагувати запис' : 'Новий запис'}
        </h2>

        <AddDiaryEntryForm entry={entry} onSuccess={onClose} />
      </div>
    </div>
  )
}