import { getMinutesDifferences } from "shared/utils/time-utils";
import { create } from "zustand";

interface AppointmentState {
  id: number;
  isAppointmentDrawerVisible: boolean;
  start: string;
  duration: number;
  isMoving: boolean;
  setId: (id: number) => void;
  setIsMoving: (isMoving: boolean) => void;
  setStart: (date: Date) => void;
  setDuration: (duration: number) => void;
  setAppointmentDrawerVisibility: (isVisible: boolean) => void;
  setAppointmentTime: (start: Date, end: Date) => void;
  toggleAppointmentDrawerVisibility: () => void;
}

export const useAppointmentStore = create<AppointmentState>()((set) => ({
  id: 0,
  isAppointmentDrawerVisible: false,
  start: "",
  duration: 30,
  isMoving: false,
  setId: (number) => set({ id: number }),
  setIsMoving: (isMoving) => set({ isMoving }),
  setStart: (date) => set({ start: date.toISOString() }),
  setDuration: (duration) => set({ duration }),
  setAppointmentTime: (start, end) => set({ start: start.toISOString(), duration: getMinutesDifferences(start, end) }),
  setAppointmentDrawerVisibility: (isVisible) => set({ isAppointmentDrawerVisible: isVisible }),
  toggleAppointmentDrawerVisibility: () => set((state) => ({ isAppointmentDrawerVisible: !state.isAppointmentDrawerVisible })),
}));
