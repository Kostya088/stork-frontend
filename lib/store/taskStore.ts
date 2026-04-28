import {Task } from "@/types/task";
import { create } from "zustand";

interface TaskStore {
  isAuthenticated: boolean;
  task: Task | null;
  setTask: (task: Task) => void;
  clearIsAuthenticated: () => void;
}

export const useTaskStore = create<TaskStore>()((set) => ({
  isAuthenticated: false,
 task: null,
  setTask: (task: Task) => {
    set(() => ({ task, isAuthenticated: true }));
  },
  clearIsAuthenticated: () => {
    set(() => ({task: null, isAuthenticated: false }));
  },
}));
