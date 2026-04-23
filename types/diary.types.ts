export interface Emotion {
  _id: string
  label: string
  icon: string
}

export interface DiaryEntry {
  _id: string
  userId: string
  title: string
  description: string
  date: string
  emotions: Emotion[]
  createdAt: string
  updatedAt: string
}

export interface CreateDiaryEntryDTO {
  title: string
  description: string
  date?: string
  emotions: string[]
}

export type UpdateDiaryEntryDTO = Partial<CreateDiaryEntryDTO>

export interface DiaryListResponse {
  entries: DiaryEntry[]
  total: number
}

export interface DiaryFormValues {
  title: string
  description: string
  date: string
  emotions: string[]
}