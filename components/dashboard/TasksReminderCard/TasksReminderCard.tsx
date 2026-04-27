"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { useState } from "react";
import css from "./TasksReminderCard.module.css";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export default function TasksReminderCard() {
  const isAuthenticated = useAuthStore(
    (s) => s.isAuthenticated,
  );

  const mockTasks: Task[] = [
    {
      id: "1",
      title: "Випити 2л води",
      completed: false,
    },
    {
      id: "2",
      title: "Прогулянка 30 хв",
      completed: true,
    },
  ];

  const [tasks, setTasks] =
    useState<Task[]>(mockTasks);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task,
      ),
    );
  };

  const handleAddTask = () => {
    if (!isAuthenticated) {
      window.location.href = "/auth/register";
      return;
    }

    const title = prompt("Нове завдання");
    if (!title) return;

    setTasks((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title,
        completed: false,
      },
    ]);
  };

  const isEmpty = tasks.length === 0;

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
              key={task.id}
              className={css.item}
            >
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() =>
                    toggleTask(task.id)
                  }
                />
                <span
                  className={
                    task.completed
                      ? css.completed
                      : css.text
                  }
                >
                  {task.title}
                </span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
