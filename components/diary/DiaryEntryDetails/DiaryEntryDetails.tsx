import type { DiaryEntry } from "@/types/diaryEntry";
import { formatDiaryDate, getEmotionTitle } from "@/utils/diary";
import styles from "./DiaryEntryDetails.module.css";

interface DiaryEntryDetailsProps {
  entry: DiaryEntry | null;
  isLoading: boolean;
  isStandalone?: boolean;
  onBack?: () => void;
  onEdit: (entry: DiaryEntry) => void;
  onDelete: (entry: DiaryEntry) => void;
}

export default function DiaryEntryDetails({
  entry,
  isLoading,
  onEdit,
  onDelete,
}: DiaryEntryDetailsProps) {
  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.placeholder}>Завантажуємо запис...</p>
      </div>
    );
  }

  if (!entry) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.placeholder}>
          Наразі записи у щоденнику відстні
        </p>
      </div>
    );
  }

  return (
    <article className={styles.wrapper}>

      <div className={styles.meta}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{entry.title}</h1>

          <button
            className={styles.iconButton}
            type="button"
            onClick={() => onEdit(entry)}
            aria-label="Редагувати запис"
          >
            <svg className={styles.icon} aria-hidden="true">
              <use href="/icons/sprite.svg#icon-edit-square" />
            </svg>
          </button>
        </div>

        <div className={styles.dateRow}>
          <time
            className={styles.date}
            dateTime={entry.date ?? entry.createdAt}
          >
            {formatDiaryDate(entry.date ?? entry.createdAt)}
          </time>

          <button
            className={styles.iconButton}
            type="button"
            onClick={() => onDelete(entry)}
            aria-label="Видалити запис"
          >
            <svg className={styles.icon} aria-hidden="true">
              <use href="/icons/sprite.svg#icon-delete-forever" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.text}>{entry.description}</div>

      <ul className={styles.emotions} aria-label="Емоції запису">
        {entry.emotions.map((emotion, index) => (
          <li
            className={styles.emotion}
            key={`${getEmotionTitle(emotion)}-${index}`}
            title={getEmotionTitle(emotion)}
          >
            {getEmotionTitle(emotion)}
          </li>
        ))}
      </ul>
    </article>
  );
}
