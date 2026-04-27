"use client";

import css from "./ConfirmationContent.module.css";

type ConfirmationContentProps = {
    title: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
};

export default function ConfirmationContent({
    title,
    confirmText = "Так",
    cancelText = "Ні",
    onConfirm,
    onCancel,
}: ConfirmationContentProps) {
    return (
        <div className={css.container}>
            <h2 className={css.title}>{title}</h2>

            <div className={css.actions}>
                <button
                    type="button"
                    className={css.cancelButton}
                    onClick={onCancel}
                >
                    {cancelText}
                </button>

                <button
                    type="button"
                    className={css.confirmButton}
                    onClick={onConfirm}
                >
                    {confirmText}
                </button>
            </div>
        </div>
    );
}