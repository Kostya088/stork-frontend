import DiaryEntryCard from "@/components/diary/DiaryEntryCard/DiaryEntryCard";
import type { DiaryEntry } from "@/types/diaryEntry";
import styles from "./DiaryList.module.css";

interface DiaryListProps {
  entries: DiaryEntry[];
  selectedEntryId: string | null;
  isLoading: boolean;
  onSelectEntry: (entry: DiaryEntry) => void;
  onCreateEntry: () => void;
}

export default function DiaryList({
  entries,
  selectedEntryId,
  isLoading,
  onSelectEntry,
  onCreateEntry,
}: DiaryListProps) {
  return (
    <section className={styles.wrapper} aria-labelledby="diary-list-title">
      <div className={styles.header}>
        <h1 id="diary-list-title" className={styles.title}>
          Ваші записи
        </h1>

        <button
          className={styles.createButton}
          type="button"
          onClick={onCreateEntry}
        >
          <span>Новий запис</span>
          <svg className={styles.addIcon} aria-hidden="true">
            <use href="/icons/sprite.svg#icon-add" />
          </svg>
        </button>
      </div>

      {isLoading ? (
        <p className={styles.status}>Завантажуємо записи...</p>
      ) : entries.length === 0 ? (
        <p className={styles.empty}>Наразі записи у щоденнику відстні</p>
      ) : (
        <ul className={styles.list}>
          {entries.map((entry) => (
            <li key={entry._id}>
              <DiaryEntryCard
                entry={entry}
                isActive={entry._id === selectedEntryId}
                onClick={() => onSelectEntry(entry)}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
