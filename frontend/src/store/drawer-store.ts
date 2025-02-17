import { create } from "zustand";

interface DrawerState {
  isClientDrawerVisible: boolean;
  isAppointmentDrawerVisible: boolean;
  isExpertDrawerVisible: boolean;
  isServiceDrawerVisible: boolean;
  setClientDrawerVisibility: (isVisible: boolean) => void;
  setAppointmentDrawerVisibility: (isVisible: boolean) => void;
  setExpertDrawerVisibility: (isVisible: boolean) => void;
  setServiceDrawerVisibility: (isVisible: boolean) => void;
}

export const useDrawerStore = create<DrawerState>()((set) => ({
  isClientDrawerVisible: false,
  isAppointmentDrawerVisible: false,
  isExpertDrawerVisible: false,
  isServiceDrawerVisible: false,
  setClientDrawerVisibility: (isVisible) => set({ isClientDrawerVisible: isVisible }),
  setAppointmentDrawerVisibility: (isVisible) => set({ isAppointmentDrawerVisible: isVisible }),
  setExpertDrawerVisibility: (isVisible) => set({ isExpertDrawerVisible: isVisible }),
  setServiceDrawerVisibility: (isVisible) => set({ isServiceDrawerVisible: isVisible }),
}));
