"use client";

import { useQuery } from "@tanstack/react-query";
import { getWeeksMe } from "@/lib/api/clientApi";
import type { WeekDashboardInfo } from "@/lib/api/clientApi";

export function useWeekDashboard() {
  return useQuery<WeekDashboardInfo>({
    queryKey: ["week-dashboard"],
    queryFn: getWeeksMe,
    staleTime: 1000 * 60 * 5,
  });
}
