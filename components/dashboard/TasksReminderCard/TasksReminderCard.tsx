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
      router.push('/register');
    }
  };

  // ✅ FIX: стабильное обновление + защита от ошибок
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

  // =========================
  // GUEST STATE (КАК БЫЛО)
  // =========================
  if (!isAuthenticated) {
    return (
      <section className={css.card}>
        <div className={css.cardHeader}>
          <h2 className={css.tasksHeading}>Важливі завдання</h2>

          <button className={css.addBtn} onClick={handleCreate}>
            +
          </button>
        </div>

        <div className={css.cardContent}>
          <p className={css.textStrong}>Наразі немає жодних завдань</p>
          <p className={css.text}>Створіть перше нове завдання!</p>

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

        <button className={css.addBtn} onClick={handleCreate}>
          +
        </button>
      </div>

      {sortedTasks.length ? (
        <ul className={css.list}>
          {sortedTasks.map((task) => (
            <li
              // ✅ FIX: убран fallback с index (Next.js safe keys)
              key={task._id}
              className={css.item}
            >
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
                  // ✅ FIX: убрано stale state
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
        <p className={css.text}>Немає завдань</p>
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

// export default function TasksReminderCard() {
// const setTask = useTaskStore((state) => state.setTask);
// const router = useRouter();
// const queryClient = useQueryClient();

// const isAuthenticated = useAuthStore(
//   (s) => s.isAuthenticated,
// );

// const [isModalOpen, setIsModalOpen] =
//   useState(false);

// // 📦 TASKS
// const { data, isLoading } = useQuery({
//   queryKey: ["tasks"],
//   queryFn: async(=> ),
//   enabled: isAuthenticated,
// });
// console.log("DATA:", data);
// const tasks = useMemo(() => {
//   return Array.isArray(data) ? data : [];
// }, [data]);

// const updateTaskMutation = useMutation({
//   mutationFn: ({
//     id,
//     isDone,
//   }: {
//     id: string;
//     isDone: boolean;
//   }) => updateTaskStatus(id, isDone),

//   onSuccess: () => {
//     queryClient.invalidateQueries({
//       queryKey: ["tasks"],
//     });
//   },
// });

// const requireAuth = useCallback(() => {
//   if (!isAuthenticated) {
//     router.push("/register");
//     return false;
//   }
//   return true;
// }, [isAuthenticated, router]);

// const handleCreate = useCallback(() => {
//   if (!requireAuth()) return;
//   setIsModalOpen(true);
// }, [requireAuth]);

// const handleToggle = useCallback(
//   (id: string, isDone: boolean) => {
//     if (!requireAuth()) return;

//     updateTaskMutation.mutate({ id, isDone });
//   },
//   [requireAuth, updateTaskMutation],
// );

// if (isLoading) {
//   return (
//     <section className={css.card}>
//       <p className={css.text}>
//         Завантажуємо завдання…
//       </p>
//     </section>
//   );
// }

// const isEmpty = tasks.length === 0;

// return (
//   <>
//     <section className={css.card}>
//       <div className={css.header}>
//         <h2 className={css.title}>Важливі завдання</h2>

//         <button className={css.addBtn} onClick={handleCreate}>
//           +
//         </button>
//       </div>

//       {isEmpty ? (
//         <div>
//           <p className={css.emptyText}>Наразі немає жодних завдань</p>

//           <p className={css.text}>Створіть перше нове завдання!</p>

//           <button className={css.button} onClick={handleCreate}>
//             Створити завдання
//           </button>
//         </div>
//       ) : (
//         <ul className={css.list}>
//           {tasks.map((task) => (
//             <li key={task._id} className={css.item}>
//               <label className={css.label}>
//                 <input
//                   type="checkbox"
//                   className={css.checkbox}
//                   checked={task.isDone}
//                   onChange={() => handleToggle(task._id, !task.isDone)}
//                 />

//                 <span className={task.isDone ? css.completed : css.textItem}>
//                   {task.name}
//                 </span>
//               </label>

//               <span className={css.date}>
//                 {new Date(task.date).toLocaleDateString("uk-UA")}
//               </span>
//             </li>
//           ))}
//         </ul>
//       )}
//     </section>

//     <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//       <AddTaskForm
//         onSuccess={() => {
//           queryClient.invalidateQueries({
//             queryKey: ["tasks"],
//           });
//           setIsModalOpen(false);
//         }}
//       />
//     </Modal>
//   </>
// );
//   return <p>afdsfa</p>;
// }
