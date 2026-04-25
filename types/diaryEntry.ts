import type { Emotion } from "./emotion";

export interface DiaryEntry {
  _id: string;
  userId: string;
  title: string;
  description: string;
  date: string;
  emotions: Array<Emotion | string>;
  createdAt: string;
  updatedAt: string;
}