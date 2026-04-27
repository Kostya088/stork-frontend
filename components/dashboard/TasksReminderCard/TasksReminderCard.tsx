"use client";

import { useAuthStore } from "@/lib/store/authStore";
import {
  useMutation,
  useQuery,
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({
      id,
      completed,
    }: {
      id: string;
      completed: boolean;
    }) => updateTaskStatus(id, completed),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  const handleAddTask = async () => {
    if (!isAuthenticated) {
      window.location.href = "/auth/register";
      return;
    }

    const title = prompt("Нове завдання");
    if (!title) return;

    await createTaskMutation.mutateAsync({
      name: title,
      date: new Date().toISOString(),
    });
  };

  const toggleTask = (
    id: string,
    completed: boolean,
  ) => {
    updateTaskMutation.mutate({
      id,
      completed: !completed,
    });
  };

  const isEmpty = tasks.length === 0;

  if (isLoading) {
    return (
      <section className={css.card}>
        <p>Завантаження...</p>
      </section>
    );
  }

  return (
    <section className={css.card}>
      <div className={css.header}>
        <h2 className={css.title}>
          Важливі завдання
        </h2>

        <button
          onClick={handleAddTask}
          className={css.addBtn}
        >
          +
        </button>
      </div>

      {isEmpty ? (
        <p className={css.empty}>
          Немає активних завдань
        </p>
      ) : (
        <ul className={css.list}>
          {tasks.map((task) => (
            <li
              key={task._id}
              className={css.item}
            >
              <label>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={() =>
                    toggleTask(
                      task._id,
                      task.isDone,
                    )
                  }
                />
                <span
                  className={
                    task.isDone
                      ? css.completed
                      : css.text
                  }
                >
                  {task.name}
                </span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
