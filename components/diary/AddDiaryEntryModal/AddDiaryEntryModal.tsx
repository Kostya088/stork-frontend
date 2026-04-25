"use client";

import Modal from "@/components/modals/Modal/Modal";
import AddDiaryEntryForm from "@/components/diary/AddDiaryEntryForm/AddDiaryEntryForm";
import styles from "./AddDiaryEntryModal.module.css";
import type { DiaryEntry } from "@/types/diaryEntry";
import type { Emotion } from "@/types/emotion";
import type { CreateDiaryData, UpdateDiaryData } from "@/lib/api/clientApi";

interface AddDiaryEntryModalProps {
  isOpen: boolean;
  entry: DiaryEntry | null;
  emotions: Emotion[];
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (data: CreateDiaryData | UpdateDiaryData) => Promise<void>;
}

export default function AddDiaryEntryModal({
  isOpen,
  entry,
  emotions,
  isSubmitting,
  onClose,
  onSubmit,
}: AddDiaryEntryModalProps) {
  const title = entry ? "Редагувати запис" : "Новий запис";

  return (
    <Modal isOpen={isOpen} onClose={onClose} labelledBy="diary-entry-modal-title">
      <section className={styles.box}>
        <button className={styles.closeButton} type="button" onClick={onClose} aria-label="Закрити модальне вікно">
          ×
        </button>
        <h2 id="diary-entry-modal-title" className={styles.title}>
          {title}
        </h2>
        <AddDiaryEntryForm
          entry={entry}
          emotions={emotions}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
        />
      </section>
    </Modal>
  );
}
