'use client';
import css from './TasksReminderCard.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Modal from '@/components/modal/Modal/Modal';
import AddTaskForm from '@/components/modal/modalForms/AddTaskForm/AddTaskForm';
import { useTaskStore } from '@/lib/store/taskStore';
import { getTasks } from '@/lib/api/clientApi';
// import { getTasks } from '@/lib/api/serverApi';
// import { getTasks, updateTaskStatus } from "@/lib/api/clientApi";
// import Modal from "@/components/modal/Modal/Modal";
// import AddTaskForm from "@/components/modal/modalForms/AddTaskForm/AddTaskForm";
// import { useTaskStore } from "@/lib/store/taskStore";

const TasksReminderCard = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const tasks = useTaskStore((s) => s.tasks);

  const setTasks = useTaskStore((s) => s.setTasks);

  const { data } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data, setTasks]);

  console.log('tasksStore', tasks);

  const handleCreate = () => {
    if (isAuthenticated) {
      setIsModalOpen(true);
    } else {
      router.push('/auth/register');
    }
  };

  return (
    <div>
      <section className={css.card}>
        <div className={css.cardHeader}>
          <h2 className={css.tasksHeading}>Важливі завдання</h2>
          <button
            className={css.addBtn}
            onClick={handleCreate}
            aria-label="Додати завдання"
          >
            <svg width="24" height="24" aria-hidden="true">
              <use href="/icons/sprite.svg#icon-add" />
            </svg>
          </button>
        </div>
        {!isAuthenticated || tasks.length === 0 ? (
          <>
            <div className={css.cardContent}>
              <p className={css.text}>Наразі немає жодних завдань</p>
              <p className={css.text}>Створіть перше нове завдання!</p>
            </div>
            <button className={css.button} onClick={handleCreate}>
              Створити завдання
            </button>
          </>
        ) : (
          <ul className={css.list}>
            {tasks.map((task) => (
              <li key={task._id} className={css.item}>
                <div className={css.taskDate}>
                  {new Date(task.date).toLocaleDateString('uk-UA', {
                    day: '2-digit',
                    month: '2-digit',
                  })}
                </div>
                <div className={css.taskName}>{task.name}</div>
              </li>
            ))}
          </ul>
        )}
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <AddTaskForm
              onSuccess={() => {
                queryClient.invalidateQueries({
                  queryKey: ['tasks'],
                });
                setIsModalOpen(false);
              }}
            />
          </Modal>
        )}
      </section>
    </div>
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
