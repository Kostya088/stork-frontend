import { Task } from '@/types/task';
import { create } from 'zustand';

interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  setTasks: (tasks: Task[]) => void;
}

export const useTaskStore = create<TaskStore>()((set) => ({
  tasks: [],
  addTask: (task: Task) => set((state) => ({ tasks: [...state.tasks, task] })),
  setTasks: (tasks: Task[]) => set(() => ({ tasks })),
}));

// interface TaskStore {
//   isAuthenticated: boolean;
//   task: Task | null;
//   setTask: (task: Task) => void;
//   clearIsAuthenticated: () => void;
// }

// export const useTaskStore = create<TaskStore>()((set) => ({
//   isAuthenticated: false,
//   task: null,
//   setTask: (task: Task) => {
//     set(() => ({ task, isAuthenticated: true }));
//   },
//   clearIsAuthenticated: () => {
//     set(() => ({ task: null, isAuthenticated: false }));
//   },
// }));
