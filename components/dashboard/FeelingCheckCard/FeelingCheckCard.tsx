"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createDiary, getEmotions } from "@/lib/api/clientApi";
import type { CreateDiaryData, UpdateDiaryData } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import AddDiaryEntryModal from "@/components/diary/AddDiaryEntryModal/AddDiaryEntryModal";
import css from "./FeelingCheckCard.module.css";

export default function FeelingCheckCard() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: emotions = [] } = useQuery({
    queryKey: ["emotions"],
    queryFn: getEmotions,
    enabled: isAuthenticated && isModalOpen,
  });

  const createDiaryMutation = useMutation({
    mutationFn: createDiary,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diaries"] });
      setIsModalOpen(false);
    },
  });

  const handleClick = () => {
    if (!isAuthenticated) {
      router.push("/register");
      return;
    }

    setIsModalOpen(true);
  };

  const handleSubmit = async (data: CreateDiaryData | UpdateDiaryData) => {
    await createDiaryMutation.mutateAsync(data as CreateDiaryData);
  };

  return (
    <>
      <section className={css.card}>
        <h2 className={css.title}>Як ви себе почуваєте?</h2>

        <p className={css.text}>
          <strong>Рекомендація на сьогодні:</strong>
        </p>
        <p className={css.text}>Занотуйте незвичні відчуття у тілі.</p>

        <button type="button" className={css.button} onClick={handleClick}>
          Зробити запис у щоденник
        </button>
      </section>

      <AddDiaryEntryModal
        isOpen={isModalOpen}
        entry={null}
        emotions={emotions}
        isSubmitting={createDiaryMutation.isPending}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
}