"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getWeeksMe } from "@/lib/api/clientApi";

// Если зашли на /journey без номера недели — редиректим на текущую неделю юзера.
// Если запрос упал — фолбэк на /journey/1.
export default function JourneyIndexPage() {
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["weeks", "me"],
    queryFn: getWeeksMe,
  });

  useEffect(() => {
    if (isLoading) return;
    const target = !isError && data?.weekNumber ? data.weekNumber : 1;
    router.replace(`/journey/${target}`);
  }, [data, isLoading, isError, router]);

  return <p>Завантаження...</p>;
}
