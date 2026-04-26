import styles from "./DiaryEntryCard.module.css";
import type { DiaryEntry } from "@/types/diaryEntry";
import { formatDiaryDate, getEmotionTitle } from "@/utils/diary";

interface DiaryEntryCardProps {
  entry: DiaryEntry;
  isActive: boolean;
  onClick: () => void;
}

export default function DiaryEntryCard({ entry, isActive, onClick }: DiaryEntryCardProps) {
  return (
    <button
      type="button"
      className={`${styles.card} ${isActive ? styles.active : ""}`}
      onClick={onClick}
      aria-pressed={isActive}
    >
      <div className={styles.topLine}>
        <h2 className={styles.title}>{entry.title}</h2>
        <time className={styles.date} dateTime={entry.date ?? entry.createdAt}>
          {formatDiaryDate(entry.date ?? entry.createdAt)}
        </time>
      </div>

      <ul className={styles.emotions} aria-label="Категорії запису">
        {entry.emotions.map((emotion, index) => (
          <li className={styles.emotion} key={`${getEmotionTitle(emotion)}-${index}`}>
            {getEmotionTitle(emotion)}
          </li>
        ))}
      </ul>
    </button>
  );
}