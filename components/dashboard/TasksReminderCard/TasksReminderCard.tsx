"use client";

import { useAuthStore } from "@/lib/store/authStore";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getTasks,
  createTask,
  updateTaskStatus,
} from "@/lib/api/clientApi";
import css from "./TasksReminderCard.module.css";

export default function TasksReminderCard() {
  const isAuthenticated = useAuthStore(
    (s) => s.isAuthenticated,
  );

  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading } =
    useQuery({
      queryKey: ["tasks"],
      queryFn: getTasks,
      enabled: isAuthenticated,
    });

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      }),
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({
      id,
      isDone,
    }: {
      id: string;
      isDone: boolean;
    }) => updateTaskStatus(id, isDone),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      }),
  });

  const handleCreate = () => {
    const name = prompt("Нове завдання");
    if (!name) return;

    createTaskMutation.mutate({
      name,
      date: new Date().toISOString(),
    });
  };

  if (isLoading) {
    return (
      <section className={css.card}>
        <p className={css.text}>
          Завантаження...
        </p>
      </section>
    );
  }

  const isEmpty = tasks.length === 0;

  return (
    <section className={css.card}>
      {/* HEADER */}
      <div className={css.header}>
        <h2 className={css.title}>
          Важливі завдання
        </h2>

        {!isEmpty && (
          <button
            className={css.addBtn}
            onClick={handleCreate}
          >
            +
          </button>
        )}
      </div>

      {/* EMPTY STATE */}
      {isEmpty ? (
        <div>
          <p className={css.emptyText}>
            Наразі немає завдань
          </p>

          <p className={css.text}>
            Створіть перше завдання
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
                    updateTaskMutation.mutate({
                      id: task._id,
                      isDone: !task.isDone,
                    })
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
                ).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
