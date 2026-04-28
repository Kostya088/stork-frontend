"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getTasks,
  updateTaskStatus,
} from "@/lib/api/clientApi";

import Modal from "@/components/modal/Modal/Modal";
import AddTaskForm from "@/components/modal/modalForms/AddTaskForm/AddTaskForm";

import css from "./TasksReminderCard.module.css";

export default function TasksReminderCard() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const isAuthenticated = useAuthStore(
    (s) => s.isAuthenticated,
  );

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const { data: tasks = [], isLoading } =
    useQuery({
      queryKey: ["tasks"],
      queryFn: getTasks,
      enabled: isAuthenticated,
    });

  const updateTaskMutation = useMutation({
    mutationFn: ({
      id,
      isDone,
    }: {
      id: string;
      isDone: boolean;
    }) => updateTaskStatus(id, isDone),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  const requireAuth = useCallback(() => {
    if (!isAuthenticated) {
      router.push("/register");
      return false;
    }
    return true;
  }, [isAuthenticated, router]);

  const handleCreate = useCallback(() => {
    if (!requireAuth()) return;
    setIsModalOpen(true);
  }, [requireAuth]);

  const handleToggle = useCallback(
    (id: string, isDone: boolean) => {
      if (!requireAuth()) return;

      updateTaskMutation.mutate({ id, isDone });
    },
    [requireAuth, updateTaskMutation],
  );

  if (isLoading) {
    return (
      <section className={css.card}>
        <p className={css.text}>
          Завантажуємо завдання…
        </p>
      </section>
    );
  }

  const isEmpty = tasks.length === 0;

  return (
    <>
      <section className={css.card}>
        <div className={css.header}>
          <h2 className={css.title}>
            Важливі завдання
          </h2>

          <button
            className={css.addBtn}
            onClick={handleCreate}
          >
            +
          </button>
        </div>

        {isEmpty ? (
          <div>
            <p className={css.emptyText}>
              Наразі немає жодних завдань
            </p>

            <p className={css.text}>
              Створіть перше нове завдання!
            </p>

            <button
              className={css.button}
              onClick={handleCreate}
            >
              Створити завдання
            </button>
          </div>
        ) : (
          <ul className={css.list}>
            {tasks.map((task) => (
              <li
                key={task._id}
                className={css.item}
              >
                <label className={css.label}>
                  <input
                    type="checkbox"
                    className={css.checkbox}
                    checked={task.isDone}
                    onChange={() =>
                      handleToggle(
                        task._id,
                        !task.isDone,
                      )
                    }
                  />

                  <span
                    className={
                      task.isDone
                        ? css.completed
                        : css.textItem
                    }
                  >
                    {task.name}
                  </span>
                </label>

                <span className={css.date}>
                  {new Date(
                    task.date,
                  ).toLocaleDateString("uk-UA")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <AddTaskForm
          onSuccess={() => {
            queryClient.invalidateQueries({
              queryKey: ["tasks"],
            });
            setIsModalOpen(false);
          }}
        />
      </Modal>
    </>
  );
}
