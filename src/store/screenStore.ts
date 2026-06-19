import { create } from 'zustand';
import type { InteractionTask, CharacterSticker } from '@/types';
import { mockTasks, mockStickers } from '@/data/mockTasks';

interface ScreenState {
  tasks: InteractionTask[];
  stickers: CharacterSticker[];
  countdownSeconds: number;
  showAlert: boolean;
  alertMessage: string;
  toggleTask: (id: string) => void;
  collectSticker: (id: string) => void;
  setCountdown: (s: number) => void;
  triggerAlert: (msg: string) => void;
  dismissAlert: () => void;
  incrementParticipant: (taskId: string) => void;
}

export const useScreenStore = create<ScreenState>((set) => ({
  tasks: mockTasks,
  stickers: mockStickers,
  countdownSeconds: 14 * 60 + 32,
  showAlert: false,
  alertMessage: '',

  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed, progress: !t.completed ? 100 : t.progress } : t)),
    })),

  collectSticker: (id) =>
    set((state) => ({
      stickers: state.stickers.map((s) => (s.id === id ? { ...s, collected: true } : s)),
    })),

  setCountdown: (s) => set({ countdownSeconds: s }),

  triggerAlert: (msg) => set({ showAlert: true, alertMessage: msg }),

  dismissAlert: () => set({ showAlert: false, alertMessage: '' }),

  incrementParticipant: (taskId) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, participants: t.participants + 1 } : t)),
    })),
}));
