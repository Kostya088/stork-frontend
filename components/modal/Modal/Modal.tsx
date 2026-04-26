"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";

import css from "./Modal.module.css";

import Image from "next/image";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void; //
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);

      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button type="button" className={css.closeButton} onClick={onClose}>
          <Image
            src="/icons/closeBtn.svg"
            alt="Close modal"
            width={24}
            height={24}
          />
        </button>
        {children}
      </div>
    </div>
  );
}
