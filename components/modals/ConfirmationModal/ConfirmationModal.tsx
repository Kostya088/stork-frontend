"use client";

import Modal from "@/components/modals/Modal/Modal";
import styles from "./ConfirmationModal.module.css";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationModal({
  isOpen,
  title,
  confirmButtonText,
  cancelButtonText,
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} labelledBy="confirmation-modal-title">
      <div className={styles.box}>
        <button className={styles.closeButton} type="button" onClick={onCancel} aria-label="Закрити">
          <svg className={styles.closeIcon}>
            <use href="/icons/sprite.svg#icon-close" />
          </svg>
        </button>
        <h2 id="confirmation-modal-title" className={styles.title}>
          {title}
        </h2>
        <div className={styles.actions}>
          <button className={styles.cancelButton} type="button" onClick={onCancel} disabled={isLoading}>
            {cancelButtonText}
          </button>
          <button className={styles.confirmButton} type="button" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? "Зачекайте..." : confirmButtonText}
          </button>
        </div>
      </div>
    </Modal>
  );
}