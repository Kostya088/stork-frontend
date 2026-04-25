import styles from "./DiaryEntryDetails.module.css";
import type { DiaryEntry } from "@/types/diaryEntry";
import { formatDiaryDate, getEmotionTitle } from "@/utils/diary";

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
  isStandalone = false,
  onBack,
  onEdit,
  onDelete,
}: DiaryEntryDetailsProps) {
  if (isLoading) {
    return (
      <section className={styles.wrapper}>
        <p className={styles.placeholder}>Завантажуємо запис...</p>
      </section>
    );
  }

  if (!entry) {
    return (
      <section className={styles.wrapper}>
        {isStandalone && onBack && (
          <button className={styles.backButton} type="button" onClick={onBack}>
            ← До записів
          </button>
        )}
        <p className={styles.placeholder}>Наразі записи у щоденнику відстні</p>
      </section>
    );
  }

  return (
    <article className={styles.wrapper}>
      {isStandalone && onBack && (
        <button className={styles.backButton} type="button" onClick={onBack}>
          ← До записів
        </button>
      )}

      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{entry.title}</h1>
          <time
            className={styles.date}
            dateTime={entry.date ?? entry.createdAt}
          >
            {formatDiaryDate(entry.date ?? entry.createdAt)}
          </time>
        </div>

        <div className={styles.actions} aria-label="Дії із записом">
          <button
            className={styles.iconButton}
            type="button"
            onClick={() => onEdit(entry)}
            aria-label="Редагувати запис"
          >
            ✎
          </button>
          <button
            className={styles.iconButton}
            type="button"
            onClick={() => onDelete(entry)}
            aria-label="Видалити запис"
          >
            🗑
          </button>
        </div>
      </header>

      <div className={styles.text}>{entry.description}</div>

      <ul className={styles.emotions} aria-label="Категорії запису">
        {entry.emotions.map((emotion, index) => (
          <li
            className={styles.emotion}
            key={`${getEmotionTitle(emotion)}-${index}`}
          >
            {getEmotionTitle(emotion)}
          </li>
        ))}
      </ul>
    </article>
  );
}
