import { Expert } from "features/experts/expert";
import { create } from "zustand";

interface CalendarState {
  resources: Expert[] | undefined;
  setResources: (resources: Expert[] | undefined) => void;
}

export const useCalendarStore = create<CalendarState>()((set) => ({
  resources: [],
  setResources: (resources) => set({ resources }),
}));
