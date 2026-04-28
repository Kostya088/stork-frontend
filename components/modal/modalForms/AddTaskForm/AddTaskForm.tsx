"use client";

import { useState } from "react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createTask } from "@/lib/api/clientApi";

import css from "./AddTaskForm.module.css";

type Props = {
  onSuccess?: () => void;
};

export default function AddTaskForm({
  onSuccess,
}: Props) {
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const createTaskMutation = useMutation({
    mutationFn: createTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      onSuccess?.();

      setName("");
      setDate("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !date) return;

    createTaskMutation.mutate({
      name,
      date,
    });
  };

  return (
    <form
      className={css.form}
      onSubmit={handleSubmit}
    >
      <h3 className={css.title}>Нове завдання</h3>

      <input
        className={css.input}
        type="text"
        placeholder="Назва завдання"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className={css.input}
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button
        className={css.button}
        type="submit"
        disabled={createTaskMutation.isPending}
      >
        {createTaskMutation.isPending
          ? "Створення..."
          : "Створити"}
      </button>
    </form>
  );
}
