import { create } from 'zustand';

interface AppState {
  activeProjectId: string | null;
  workScrollProgress: number;
  setActiveProject: (id: string | null) => void;
  setWorkScrollProgress: (progress: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeProjectId: null,
  workScrollProgress: 0,
  setActiveProject: (id) => set({ activeProjectId: id }),
  setWorkScrollProgress: (progress) => set({ workScrollProgress: progress }),
}));
