import { create } from "zustand";

interface AppointmentState {
  isAppointmentDrawerVisible: boolean;
  setAppointmentDrawerVisibility: (isVisible: boolean) => void;
  toggleAppointmentDrawerVisibility: () => void;
}

export const useAppointmentStore = create<AppointmentState>()((set) => ({
  isAppointmentDrawerVisible: false,
  setAppointmentDrawerVisibility: (isVisible) => set({ isAppointmentDrawerVisible: isVisible }),
  toggleAppointmentDrawerVisibility: () => set((state) => ({ isAppointmentDrawerVisible: !state.isAppointmentDrawerVisible })),
}));
