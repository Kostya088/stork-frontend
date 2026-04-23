import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import {
  getDiaryEntries,
  createDiaryEntry,
  updateDiaryEntry,
  deleteDiaryEntry,
} from '@/lib/api/diaryApi'
import type { CreateDiaryEntryDTO, UpdateDiaryEntryDTO } from '@/types/diary.types'

const DIARY_QUERY_KEY = ['diaryEntries'] as const

export const useDiaryEntries = () => {
  return useQuery({
    queryKey: DIARY_QUERY_KEY,
    queryFn: getDiaryEntries,
    staleTime: 60 * 1000,
  })
}

export const useCreateDiaryEntry = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateDiaryEntryDTO) => createDiaryEntry(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DIARY_QUERY_KEY })
      toast.success('Запис створено!')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Помилка при створенні запису')
    },
  })
}

export const useUpdateDiaryEntry = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDiaryEntryDTO }) =>
      updateDiaryEntry(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DIARY_QUERY_KEY })
      toast.success('Запис оновлено!')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Помилка при оновленні')
    },
  })
}

export const useDeleteDiaryEntry = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteDiaryEntry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DIARY_QUERY_KEY })
      toast.success('Запис видалено!')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Помилка при видаленні')
    },
  })
}