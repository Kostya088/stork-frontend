import { BabyState } from "./babyState";


export interface WeekInfo {
  weekNumber: number;
  daysRemaining: number;
  analogy: string;
  babySize: number;
  babyWeight: number;
  image: string;
}

export interface WeekDashboardInfo {
  weekNumber: number;
  daysUntilDue: number;
  tipForMom: string | null;
  babyInfo:
    | (Pick<
        BabyState,
        | "image"
        | "babySize"
        | "babyWeight"
        | "babyActivity"
        | "babyDevelopment"
      > & {
        analogy?: string | null;
      })
    | null;
}