export interface BabyState {
  _id: string;
  weekNumber: number;
  analogy: string | null;
  babySize: number;
  babyWeight: number;
  image: string;
  babyActivity: string;
  babyDevelopment: string;
  interestingFact: string;
  momDailyTips: string[];
}
