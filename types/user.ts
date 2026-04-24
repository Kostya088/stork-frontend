export type Gender = "boy" | "girl" | null;
export type Theme = "light" | "blue" | "pink";

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  gender: Gender;
  dueDate: string | null;
  theme: Theme;
  createdAt: string;
  updatedAt: string;
}