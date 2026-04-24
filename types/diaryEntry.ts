export interface DiaryEntry {
  _id: string;
  userId: string;
  title: string;
  description: string;
  date: string;
  emotions: import("./emotion").Emotion[];
  createdAt: string;
  updatedAt: string;
}