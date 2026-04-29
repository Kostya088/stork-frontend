import { nextClient } from './api';
import type { Task } from '@/types/task';
import type { DiaryEntry } from '@/types/diaryEntry';
import type { Emotion } from '@/types/emotion';
import type { User } from '@/types/user';
import type { BabyState } from '@/types/babyState';
import type { MomState } from '@/types/momState';
import type { WeekDashboardInfo, WeekInfo } from '@/types/weekInfo';

export async function getTasks(): Promise<Task[]> {
  const { data } = await nextClient.get<Task[]>('/tasks');
  return data;
}

export type CreateTaskData = Pick<Task, 'name' | 'date'>;

export async function createTask(data: CreateTaskData): Promise<Task> {
  const { data: task } = await nextClient.post<Task>('/tasks', data);
  return task;
}

export async function updateTaskStatus(
  id: string,
  isDone: boolean,
): Promise<Task> {
  const { data } = await nextClient.patch<Task>(`/tasks/${id}/status`, {
    isDone,
  });
  return data;
}

export async function deleteTask(id: string): Promise<void> {
  await nextClient.delete(`/tasks/${id}`);
}

export async function getDiaries(): Promise<DiaryEntry[]> {
  const { data } = await nextClient.get<DiaryEntry[]>('/diaries');
  return data;
}

export async function getDiaryById(id: string): Promise<DiaryEntry> {
  const { data } = await nextClient.get<DiaryEntry>(`/diaries/${id}`);
  return data;
}

export type CreateDiaryData = Pick<
  DiaryEntry,
  'title' | 'description' | 'emotions'
>;

export async function createDiary(data: CreateDiaryData): Promise<DiaryEntry> {
  const { data: diary } = await nextClient.post<DiaryEntry>('/diaries', data);
  return diary;
}

export type UpdateDiaryData = Partial<CreateDiaryData>;

export async function updateDiary(
  id: string,
  data: UpdateDiaryData,
): Promise<DiaryEntry> {
  const { data: diary } = await nextClient.patch<DiaryEntry>(
    `/diaries/${id}`,
    data,
  );
  return diary;
}

export async function deleteDiary(id: string): Promise<void> {
  await nextClient.delete(`/diaries/${id}`);
}

export async function getEmotions(): Promise<Emotion[]> {
  const { data } = await nextClient.get<Emotion[]>('/emotions');
  return data;
}

export async function getMe(): Promise<User> {
  const { data } = await nextClient.get<User>('/users/me');
  return data;
}

export type UpdateUserData = Partial<Pick<User, 'name' | 'dueDate' | 'gender'>>;

export async function updateMe(data: UpdateUserData): Promise<User> {
  const { data: user } = await nextClient.patch<User>('/users/me', data);
  return user;
}

export async function updateUserAvatar(formData: FormData): Promise<User> {
  const { data } = await nextClient.patch<User>('/users/me/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
}

export type Theme = 'light' | 'blue' | 'pink';

export async function updateUserTheme(theme: Theme): Promise<User> {
  const { data } = await nextClient.patch<User>('/users/me/theme', { theme });
  return data;
}

export async function getWeeks(): Promise<WeekInfo[]> {
  const { data } = await nextClient.get<WeekInfo[]>('/weeks');
  return data;
}

export async function getWeeksBaby(week: number): Promise<BabyState> {
  const { data } = await nextClient.get<BabyState>(`/weeks/baby/${week}`);
  return data;
}

export async function getWeeksMom(week: number): Promise<MomState> {
  const { data } = await nextClient.get<MomState>(`/weeks/mom/${week}`);
  return data;
}

export async function getPublicWeek(week = 1): Promise<WeekDashboardInfo> {
  const { data } = await nextClient.get<WeekDashboardInfo>(
    `/weeks?week=${week}`,
  );
  return data;
}

export async function getWeeksMe(): Promise<WeekDashboardInfo> {
  const { data } = await nextClient.get<WeekDashboardInfo>('/weeks/me');
  return data;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export async function login(data: LoginRequest): Promise<User> {
  const { data: user } = await nextClient.post<User>('/auth/login', data);
  return user;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  dueDate?: string;
  gender?: 'boy' | 'girl';
}

export async function register(data: RegisterRequest): Promise<User> {
  const { data: user } = await nextClient.post<User>('/auth/register', data);
  return user;
}

export async function logout(): Promise<void> {
  await nextClient.post('/auth/logout');
}

interface CheckSessionResponse {
  success: boolean;
}

export async function checkSession(): Promise<CheckSessionResponse> {
  const { data } = await nextClient.get<CheckSessionResponse>('/auth/session');
  return data;
}
