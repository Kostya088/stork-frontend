import type {
  DiaryEntry,
  DiaryListResponse,
  CreateDiaryEntryDTO,
  UpdateDiaryEntryDTO,
} from '@/types/diary.types'

const BASE_URL = '/api/diaries'

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Невідома помилка' }))
    throw new Error(error.message || `Помилка: ${res.status}`)
  }
  return res.json()
}

export const getDiaryEntries = async (): Promise<DiaryListResponse> => {
  const res = await fetch(BASE_URL, { credentials: 'include' })
  return handleResponse<DiaryListResponse>(res)
}

export const createDiaryEntry = async (
  data: CreateDiaryEntryDTO
): Promise<DiaryEntry> => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  })
  return handleResponse<DiaryEntry>(res)
}

export const updateDiaryEntry = async (
  id: string,
  data: UpdateDiaryEntryDTO
): Promise<DiaryEntry> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  })
  return handleResponse<DiaryEntry>(res)
}

export const deleteDiaryEntry = async (
  id: string
): Promise<{ message: string; id: string }> => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  })
  return handleResponse(res)
}