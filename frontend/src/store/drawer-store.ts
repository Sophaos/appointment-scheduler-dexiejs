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
  toggleClientDrawerVisibility: () => void;
  toggleAppointmentDrawerVisibility: () => void;
  toggleExpertDrawerVisibility: () => void;
  toggleServiceDrawerVisibility: () => void;
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
  toggleClientDrawerVisibility: () => set((state) => ({ isClientDrawerVisible: !state.isClientDrawerVisible })),
  toggleAppointmentDrawerVisibility: () => set((state) => ({ isAppointmentDrawerVisible: !state.isAppointmentDrawerVisible })),
  toggleExpertDrawerVisibility: () => set((state) => ({ isExpertDrawerVisible: !state.isExpertDrawerVisible })),
  toggleServiceDrawerVisibility: () => set((state) => ({ isServiceDrawerVisible: !state.isServiceDrawerVisible })),
}));
