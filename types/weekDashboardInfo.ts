export interface WeekDashboardInfo {
  weekNumber: number;
  daysUntilDue: number;

  tipForMom: string | null;

  babyInfo: {
    gender?: "boy" | "girl" | null;
    analogy: string | null;
    image: string;
    development: string;
    size?: number;
    weight?: number;
  } | null;
}
