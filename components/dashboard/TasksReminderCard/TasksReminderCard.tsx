'use client';

import css from './TasksReminderCard.module.css';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Modal from '@/components/modal/Modal/Modal';
import AddTaskForm from '@/components/modal/modalForms/AddTaskForm/AddTaskForm';
import { getTasks, updateTaskStatus } from '@/lib/api/clientApi';
import type { Task } from '@/types/task';

const TasksReminderCard = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const { data: tasks = [] } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: getTasks,
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });

  const handleCreate = () => {
    if (isAuthenticated) {
      setIsModalOpen(true);
    } else {
      router.push('/login');
    }
  };

  const handleToggle = async (id: string, isDone: boolean) => {
    try {
      await updateTaskStatus(id, !isDone);

      queryClient.setQueryData<Task[]>(['tasks'], (old) => {
        if (!old) return old;

        return old.map((t) => (t._id === id ? { ...t, isDone: !isDone } : t));
      });
    } catch (e) {
      console.error(e);
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  };

  const sortedTasks = useMemo(() => {
    const active: Task[] = [];
    const done: Task[] = [];

    tasks.forEach((task) => {
      if (task.isDone) done.push(task);
      else active.push(task);
    });

    return [...active, ...done];
  }, [tasks]);

  if (!isAuthenticated) {
    return (
      <section className={css.card}>
        <div className={css.cardHeader}>
          <h2 className={css.tasksHeading}>Важливі завдання</h2>

          <button type="button" className={css.addBtn} onClick={handleCreate}>
            <svg className={css.addIcon} width="24" height="24">
              <use href="/icons/sprite.svg#icon-open-task-btn" />
            </svg>
          </button>
        </div>

        <div className={css.cardContent}>
          <p className={css.textStrong}>Наразі немає жодних завдань</p>
          <p className={css.text}>Створіть мершій нове завдання!</p>

          <button className={css.button} onClick={handleCreate}>
            Створити завдання
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={css.card}>
      <div className={css.cardHeader}>
        <h2 className={css.tasksHeading}>Важливі завдання</h2>

        <button type="button" className={css.addBtn} onClick={handleCreate}>
          <svg className={css.addIcon} width="24" height="24">
            <use href="/icons/sprite.svg#icon-open-task-btn" />
          </svg>
        </button>
      </div>

      {sortedTasks.length ? (
        <ul className={css.list}>
          {sortedTasks.map((task) => (
            <li key={task._id} className={css.item}>
              <div className={css.taskDate}>
                {task.date
                  ? new Date(task.date).toLocaleDateString('uk-UA', {
                      day: '2-digit',
                      month: '2-digit',
                    })
                  : '—'}
              </div>

              <div className={css.itemLeft}>
                <input
                  type="checkbox"
                  className={css.checkbox}
                  checked={task.isDone}
                  onChange={() => handleToggle(task._id, task.isDone)}
                />

                <p className={`${css.taskName} ${task.isDone ? css.done : ''}`}>
                  {task.name}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={css.cardContent}>
          <p className={css.textStrong}>Наразі немає жодних завдань</p>
          <p className={css.text}>Створіть перше нове завдання!</p>

          <button className={css.button} onClick={handleCreate}>
            Створити завдання
          </button>
        </div>
      )}

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <AddTaskForm
            onSuccess={() => {
              queryClient.invalidateQueries({ queryKey: ['tasks'] });
              setIsModalOpen(false);
            }}
          />
        </Modal>
      )}
    </section>
  );
};

export default TasksReminderCard;
