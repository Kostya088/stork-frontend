import type { Emotion } from "@/types/emotion";

export function formatDiaryDate(value?: string | Date | null): string {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return new Intl.DateTimeFormat("uk-UA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function getEmotionTitle(emotion: Emotion | string): string {
  if (typeof emotion === "string") return emotion;
  return emotion.title;
}

export function getEmotionId(emotion: Emotion | string): string {
  if (typeof emotion === "string") return emotion;
  return emotion._id;
}
