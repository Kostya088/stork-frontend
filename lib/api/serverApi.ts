import { cookies } from "next/headers";
import { nextServer } from "./api";
import type { User } from "@/types/user";
import type { BabyState } from "@/types/babyState";
import type { MomState } from "@/types/momState";
import type { WeekInfo } from "@/types/weekInfo";
import type { DiaryEntry } from "@/types/diaryEntry";

async function getCookies() {
  const cookieStore = await cookies();
  return {
    Cookie: cookieStore.toString(),
  };
}

export async function checkSession() {
  const headers = await getCookies();
  const res = await nextServer.get("/auth/session", { headers });
  return res;
}

export async function getMe(): Promise<User> {
  const headers = await getCookies();
  const res = await nextServer.get<User>("/users/me", { headers });
  return res.data;
}

export async function getTasks() {
  const headers = await getCookies();
  const res = await nextServer.get("/tasks", { headers });
  return res.data;
}

export async function getDiaries(): Promise<DiaryEntry[]> {
  const headers = await getCookies();
  const res = await nextServer.get<DiaryEntry[]>("/diaries", { headers });
  return res.data;
}

export async function getDiaryById(id: string): Promise<DiaryEntry> {
  const headers = await getCookies();
  const res = await nextServer.get<DiaryEntry>(`/diaries/${id}`, { headers });
  return res.data;
}

export async function getWeeks(): Promise<WeekInfo[]> {
  const { data } = await nextServer.get<WeekInfo[]>("/weeks");
  return data;
}

export async function getWeeksMe(): Promise<WeekInfo> {
  const headers = await getCookies();
  const { data } = await nextServer.get<WeekInfo>("/weeks/me", { headers });
  return data;
}

export async function getWeeksBaby(week: number): Promise<BabyState> {
  const { data } = await nextServer.get<BabyState>(`/weeks/baby/${week}`);
  return data;
}

export async function getWeeksMom(week: number): Promise<MomState> {
  const { data } = await nextServer.get<MomState>(`/weeks/mom/${week}`);
  return data;
}
