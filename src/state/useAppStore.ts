import { create } from 'zustand';

export type DeviceTier = 'high' | 'medium' | 'low';

interface AppState {
  activeProjectId: string | null;
  workScrollProgress: number;
  deviceTier: DeviceTier;
  prefersReducedMotion: boolean;
  setActiveProject: (id: string | null) => void;
  setWorkScrollProgress: (progress: number) => void;
  setDeviceTier: (tier: DeviceTier) => void;
  setPrefersReducedMotion: (value: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeProjectId: null,
  workScrollProgress: 0,
  deviceTier: 'high',
  prefersReducedMotion: false,
  setActiveProject: (id) => set({ activeProjectId: id }),
  setWorkScrollProgress: (progress) => set({ workScrollProgress: progress }),
  setDeviceTier: (tier) => set({ deviceTier: tier }),
  setPrefersReducedMotion: (value) => set({ prefersReducedMotion: value }),
}));
