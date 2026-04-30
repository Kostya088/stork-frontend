"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createDiary, getEmotions } from "@/lib/api/clientApi";
import type { CreateDiaryData, UpdateDiaryData } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import Modal from "@/components/modal/Modal/Modal";
import AddDiaryEntryForm from "@/components/modal/modalForms/AddDiaryEntryForm/AddDiaryEntryForm";
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
      router.push("/login");
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddDiaryEntryForm
          entry={null}
          emotions={emotions}
          isSubmitting={createDiaryMutation.isPending}
          onSubmit={handleSubmit}
        />
      </Modal>
    </>
  );
}