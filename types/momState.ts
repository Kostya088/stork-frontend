export interface ComfortTip {
  category: string;
  tip: string;
}

export interface Feelings {
  states: string[];
  sensationDescr: string;
}

export interface MomState {
  _id: string;
  weekNumber: number;
  feelings: Feelings;
  comfortTips: ComfortTip[];
}