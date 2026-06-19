import { create } from 'zustand';
import type { Seat, SeatFilters } from '@/types';
import { generateSeats, defaultFilters } from '@/data/mockSeats';

interface SeatState {
  seats: Seat[];
  selectedSeatIds: string[];
  filters: SeatFilters;
  activeSeatId: string | null;
  setSeats: (seats: Seat[]) => void;
  toggleSeatSelection: (seatId: string) => void;
  setActiveSeat: (seatId: string | null) => void;
  updateFilters: (updates: Partial<SeatFilters>) => void;
  resetFilters: () => void;
  clearSelection: () => void;
  initSeats: () => void;
}

export const useSeatStore = create<SeatState>((set, get) => ({
  seats: [],
  selectedSeatIds: [],
  filters: { ...defaultFilters },
  activeSeatId: null,

  setSeats: (seats) => set({ seats }),

  toggleSeatSelection: (seatId) => {
    const seat = get().seats.find((s) => s.id === seatId);
    if (!seat || seat.status === 'sold' || seat.status === 'locked' || seat.isAisle) return;

    set((state) => {
      const isSelected = state.selectedSeatIds.includes(seatId);
      const newSelected = isSelected
        ? state.selectedSeatIds.filter((id) => id !== seatId)
        : state.selectedSeatIds.length < 6
          ? [...state.selectedSeatIds, seatId]
          : state.selectedSeatIds;

      const newSeats = state.seats.map((s) =>
        s.id === seatId ? { ...s, status: (newSelected.includes(seatId) ? 'selected' : 'available') as Seat['status'] } : s,
      );
      return { selectedSeatIds: newSelected, seats: newSeats };
    });
  },

  setActiveSeat: (seatId) => set({ activeSeatId: seatId }),

  updateFilters: (updates) =>
    set((state) => ({
      filters: { ...state.filters, ...updates },
    })),

  resetFilters: () => set({ filters: { ...defaultFilters } }),

  clearSelection: () => {
    set((state) => ({
      selectedSeatIds: [],
      seats: state.seats.map((s) =>
        s.status === 'selected' ? { ...s, status: 'available' as Seat['status'] } : s,
      ),
    }));
  },

  initSeats: () => {
    if (get().seats.length === 0) {
      set({ seats: generateSeats() });
    }
  },
}));
