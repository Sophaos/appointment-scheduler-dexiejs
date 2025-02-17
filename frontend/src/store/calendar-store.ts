import { Expert } from "features/experts/expert";
import { create } from "zustand";

interface CalendarState {
  resources: Expert[] | undefined;
  isMoving: boolean;
  setResources: (resources: Expert[] | undefined) => void;
  setIsMoving: (isMoving: boolean) => void;
}

export const useCalendarStore = create<CalendarState>()((set) => ({
  resources: [],
  isMoving: false,
  setResources: (resources) => set({ resources }),
  setIsMoving: (isMoving) => set({ isMoving }),
}));
